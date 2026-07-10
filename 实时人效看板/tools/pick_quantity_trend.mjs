import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";
import { addDays } from "./wms_export_core.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const projectRoot = path.resolve(__dirname, "..");
export const pickQuantityTrendDir = path.join(projectRoot, "拣选数量走势汇总");
export const pickQuantityTrendJsonPath = path.join(pickQuantityTrendDir, "拣选数量走势汇总.json");
export const pickQuantityTrendWorkbookPath = path.join(pickQuantityTrendDir, "拣选数量走势汇总.xlsx");
const day1JsonPath = path.join(projectRoot, "day-1人效", "day-1人效.json");

function number(value) {
  const parsed = Number(value || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function localBusinessDateFromText(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2})/.exec(String(value || ""));
  if (!match) return "";
  const ymd = `${match[1]}-${match[2]}-${match[3]}`;
  return Number(match[4]) < 3 ? addDays(ymd, -1) : ymd;
}

export function inferPickQuantityBusinessDate(analysis, explicitDate = "") {
  const value = String(explicitDate || "").trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  return localBusinessDateFromText(analysis?.source?.createdMin)
    || localBusinessDateFromText(analysis?.source?.analyzedAt)
    || "";
}

function peopleFromAnalysis(analysis, businessDate, sourceFile) {
  return (analysis.people || [])
    .filter((row) => number(row.completedQuantity) > 0 || number(row.completedRows) > 0)
    .map((row) => ({
      businessDate,
      person: row.person,
      sourceFile,
      completedRows: number(row.completedRows),
      completedQuantity: number(row.completedQuantity),
      completedSingleRows: number(row.completedSingleRows),
      completedSingleQuantity: number(row.completedSingleQuantity),
      completedSingleBatchRows: number(row.completedSingleBatchRows),
      completedSingleBatchQuantity: number(row.completedSingleBatchQuantity),
      completedMultiRows: number(row.completedMultiRows),
      completedMultiQuantity: number(row.completedMultiQuantity),
    }));
}

function totalsFromPeople(people) {
  const totals = people.reduce((sum, row) => ({
    completedRows: sum.completedRows + number(row.completedRows),
    completedQuantity: sum.completedQuantity + number(row.completedQuantity),
    completedSingleRows: sum.completedSingleRows + number(row.completedSingleRows),
    completedSingleQuantity: sum.completedSingleQuantity + number(row.completedSingleQuantity),
    completedSingleBatchRows: sum.completedSingleBatchRows + number(row.completedSingleBatchRows),
    completedSingleBatchQuantity: sum.completedSingleBatchQuantity + number(row.completedSingleBatchQuantity),
    completedMultiRows: sum.completedMultiRows + number(row.completedMultiRows),
    completedMultiQuantity: sum.completedMultiQuantity + number(row.completedMultiQuantity),
  }), {
    completedRows: 0,
    completedQuantity: 0,
    completedSingleRows: 0,
    completedSingleQuantity: 0,
    completedSingleBatchRows: 0,
    completedSingleBatchQuantity: 0,
    completedMultiRows: 0,
    completedMultiQuantity: 0,
  });

  return {
    ...totals,
    byType: {
      total: { rows: totals.completedRows, quantity: totals.completedQuantity },
      single: { rows: totals.completedSingleRows, quantity: totals.completedSingleQuantity },
      singleBatch: { rows: totals.completedSingleBatchRows, quantity: totals.completedSingleBatchQuantity },
      multi: { rows: totals.completedMultiRows, quantity: totals.completedMultiQuantity },
    },
  };
}

function normalizeDay(day) {
  const businessDate = String(day.businessDate || "").trim();
  const people = Array.isArray(day.people)
    ? day.people.map((row) => ({
      businessDate,
      person: String(row.person || "").trim(),
      sourceFile: day.sourceFile || row.sourceFile || "",
      completedRows: number(row.completedRows),
      completedQuantity: number(row.completedQuantity),
      completedSingleRows: number(row.completedSingleRows),
      completedSingleQuantity: number(row.completedSingleQuantity),
      completedSingleBatchRows: number(row.completedSingleBatchRows),
      completedSingleBatchQuantity: number(row.completedSingleBatchQuantity),
      completedMultiRows: number(row.completedMultiRows),
      completedMultiQuantity: number(row.completedMultiQuantity),
    })).filter((row) => row.person)
    : [];

  return {
    businessDate,
    generatedAt: day.generatedAt || "",
    sourceFile: day.sourceFile || "",
    sourceRows: number(day.sourceRows),
    createdMin: day.createdMin || "",
    createdMax: day.createdMax || "",
    totals: totalsFromPeople(people),
    people,
  };
}

async function seedFromDay1History() {
  try {
    const text = await fs.readFile(day1JsonPath, "utf8");
    const parsed = JSON.parse(text);
    const daily = (parsed.daily || [])
      .map((day) => normalizeDay({
        businessDate: day.businessDate,
        generatedAt: day.generatedAt || parsed.updatedAt || "",
        sourceFile: day.sourceFile || "",
        sourceRows: day.totals?.rows || 0,
        people: day.people || [],
      }))
      .filter((day) => day.businessDate);
    return {
      version: 1,
      updatedAt: parsed.updatedAt || "",
      source: "day-1人效",
      daily,
    };
  } catch (error) {
    if (error.code === "ENOENT") {
      return { version: 1, updatedAt: "", source: "", daily: [] };
    }
    throw error;
  }
}

export async function loadPickQuantityTrendHistory() {
  try {
    const text = await fs.readFile(pickQuantityTrendJsonPath, "utf8");
    const parsed = JSON.parse(text);
    return {
      version: 1,
      updatedAt: parsed.updatedAt || "",
      source: parsed.source || "拣选数量走势汇总",
      daily: Array.isArray(parsed.daily) ? parsed.daily.map(normalizeDay).filter((day) => day.businessDate) : [],
    };
  } catch (error) {
    if (error.code === "ENOENT") return seedFromDay1History();
    throw error;
  }
}

function writeSheet(workbook, name, matrix) {
  const sheet = workbook.worksheets.add(name);
  const columnCount = Math.max(1, ...matrix.map((row) => row.length));
  const normalized = matrix.map((row) => [...row, ...Array(Math.max(0, columnCount - row.length)).fill("")]);
  sheet.getRangeByIndexes(0, 0, normalized.length, columnCount).values = normalized;
}

async function saveTrendWorkbook(history) {
  const workbook = Workbook.create();
  const daily = [
    ["日期", "总已拣选数量", "总已拣选单", "Single数量", "Single单", "Single Batch数量", "Single Batch单", "Multi数量", "Multi单", "源文件"],
    ...history.daily.map((day) => [
      day.businessDate,
      day.totals.completedQuantity,
      day.totals.completedRows,
      day.totals.completedSingleQuantity,
      day.totals.completedSingleRows,
      day.totals.completedSingleBatchQuantity,
      day.totals.completedSingleBatchRows,
      day.totals.completedMultiQuantity,
      day.totals.completedMultiRows,
      day.sourceFile,
    ]),
  ];
  const people = [
    ["日期", "人员", "总已拣选数量", "总已拣选单", "Single数量", "Single单", "Single Batch数量", "Single Batch单", "Multi数量", "Multi单", "源文件"],
    ...history.daily.flatMap((day) => day.people.map((row) => [
      day.businessDate,
      row.person,
      row.completedQuantity,
      row.completedRows,
      row.completedSingleQuantity,
      row.completedSingleRows,
      row.completedSingleBatchQuantity,
      row.completedSingleBatchRows,
      row.completedMultiQuantity,
      row.completedMultiRows,
      day.sourceFile,
    ])),
  ];
  writeSheet(workbook, "每日汇总", daily);
  writeSheet(workbook, "人员每日", people);
  const xlsx = await SpreadsheetFile.exportXlsx(workbook);
  await xlsx.save(pickQuantityTrendWorkbookPath);
  await fs.rm(`${pickQuantityTrendWorkbookPath}.inspect.ndjson`, { force: true });
}

export async function savePickQuantityTrendHistory(history) {
  const daily = (history.daily || [])
    .map(normalizeDay)
    .filter((day) => day.businessDate)
    .sort((a, b) => a.businessDate.localeCompare(b.businessDate));
  const next = {
    version: 1,
    updatedAt: new Date().toISOString(),
    source: "拣选数量走势汇总",
    daily,
  };
  await fs.mkdir(pickQuantityTrendDir, { recursive: true });
  await fs.writeFile(pickQuantityTrendJsonPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  await saveTrendWorkbook(next);
  return next;
}

function preferredTrendDay(candidate, existing) {
  if (!existing) return candidate;
  const candidateQuantity = number(candidate.totals?.completedQuantity);
  const existingQuantity = number(existing.totals?.completedQuantity);
  if (candidateQuantity !== existingQuantity) return candidateQuantity > existingQuantity ? candidate : existing;

  const candidateRows = number(candidate.totals?.completedRows);
  const existingRows = number(existing.totals?.completedRows);
  if (candidateRows !== existingRows) return candidateRows > existingRows ? candidate : existing;

  const candidateSourceRows = number(candidate.sourceRows);
  const existingSourceRows = number(existing.sourceRows);
  if (candidateSourceRows !== existingSourceRows) return candidateSourceRows > existingSourceRows ? candidate : existing;

  const candidateCreatedMax = String(candidate.createdMax || "");
  const existingCreatedMax = String(existing.createdMax || "");
  if (candidateCreatedMax !== existingCreatedMax) return candidateCreatedMax > existingCreatedMax ? candidate : existing;

  return candidate;
}

export async function addPickQuantityTrendAnalysis({ analysis, businessDate = "", filePath = "" }) {
  const day = inferPickQuantityBusinessDate(analysis, businessDate);
  if (!day) return loadPickQuantityTrendHistory();
  const sourceFile = path.resolve(filePath || analysis?.source?.filePath || "");
  const people = peopleFromAnalysis(analysis, day, sourceFile);
  const history = await loadPickQuantityTrendHistory();
  const dailyEntry = normalizeDay({
    businessDate: day,
    generatedAt: new Date().toISOString(),
    sourceFile,
    sourceRows: analysis?.source?.rows || 0,
    createdMin: analysis?.source?.createdMin || "",
    createdMax: analysis?.source?.createdMax || "",
    people,
  });
  const existing = (history.daily || []).find((item) => item.businessDate === day);
  history.daily = (history.daily || []).filter((item) => item.businessDate !== day);
  history.daily.push(preferredTrendDay(dailyEntry, existing ? normalizeDay(existing) : null));
  return savePickQuantityTrendHistory(history);
}

export function attachPickQuantityTrend(analysis, history) {
  const daily = (history?.daily || []).map(normalizeDay);
  return {
    ...analysis,
    pickQuantityTrend: {
      available: daily.length > 0,
      updatedAt: history?.updatedAt || "",
      jsonPath: daily.length ? pickQuantityTrendJsonPath : "",
      workbookPath: daily.length ? pickQuantityTrendWorkbookPath : "",
      daily,
    },
  };
}
