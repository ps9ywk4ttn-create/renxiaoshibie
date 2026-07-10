import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";
import {
  addDays,
  analyzePickingWorkbook,
  buildShiftWindow,
  completeWindow,
  downloadNativeWmsPickOrderExport,
  FIXED_UTC_OFFSET_HOURS,
  pad2,
} from "./wms_export_core.mjs";
import { addPickQuantityTrendAnalysis } from "./pick_quantity_trend.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const projectRoot = path.resolve(__dirname, "..");
export const day1Dir = path.join(projectRoot, "day-1人效");
export const day1RawDir = path.join(day1Dir, "每日原始文件");
export const day1JsonPath = path.join(day1Dir, "day-1人效.json");
export const day1WorkbookPath = path.join(day1Dir, "day-1人效.xlsx");
export const day1LogPath = path.join(day1Dir, "自动拉取日志.log");

function round1(value) {
  if (value == null || !Number.isFinite(Number(value))) return null;
  return Math.round(Number(value) * 10) / 10;
}

function piecesPerHour(quantity, minutes) {
  const qty = Number(quantity || 0);
  const min = Number(minutes || 0);
  if (!qty || !min) return null;
  return round1(qty / (min / 60));
}

export function todayFixedOffset() {
  const shifted = new Date(Date.now() + FIXED_UTC_OFFSET_HOURS * 3600 * 1000);
  return `${shifted.getUTCFullYear()}-${pad2(shifted.getUTCMonth() + 1)}-${pad2(shifted.getUTCDate())}`;
}

export function defaultDay1BusinessDate() {
  return addDays(todayFixedOffset(), -1);
}

export function day1WindowForDate(date) {
  return completeWindow(buildShiftWindow({
    date,
    shift: "custom",
    taskMode: "pick",
    startDate: date,
    startTime: "15:00",
    endDate: addDays(date, 1),
    endTime: "03:00",
  }));
}

export async function ensureDay1Dirs() {
  await fs.mkdir(day1RawDir, { recursive: true });
}

async function appendDay1Log(message) {
  await fs.mkdir(day1Dir, { recursive: true });
  await fs.appendFile(day1LogPath, `[${new Date().toISOString()}] ${message}\n`, "utf8");
}

export async function loadDay1History() {
  try {
    const text = await fs.readFile(day1JsonPath, "utf8");
    const parsed = JSON.parse(text);
    return {
      version: 1,
      updatedAt: parsed.updatedAt || "",
      people: Array.isArray(parsed.people) ? parsed.people : [],
      daily: Array.isArray(parsed.daily) ? parsed.daily : [],
    };
  } catch (error) {
    if (error.code === "ENOENT") return { version: 1, updatedAt: "", people: [], daily: [] };
    throw error;
  }
}

function typeDurationByPerson(analysis) {
  const byPerson = new Map();
  for (const row of analysis.orderDurations || []) {
    if (row.statusGroup !== "已拣选" || row.durationMinutes == null) continue;
    if (!byPerson.has(row.person)) {
      byPerson.set(row.person, {
        singleEfficiencyDurationMinutes: 0,
        singleBatchEfficiencyDurationMinutes: 0,
        multiEfficiencyDurationMinutes: 0,
      });
    }
    const item = byPerson.get(row.person);
    if (row.pickingOrderType === "single") item.singleEfficiencyDurationMinutes += Number(row.durationMinutes || 0);
    if (row.pickingOrderType === "singleBatch") item.singleBatchEfficiencyDurationMinutes += Number(row.durationMinutes || 0);
    if (row.pickingOrderType === "multi") item.multiEfficiencyDurationMinutes += Number(row.durationMinutes || 0);
  }
  return byPerson;
}

function dailyPeopleFromAnalysis(analysis, businessDate, sourceFile, windowSpec) {
  const typeDurations = typeDurationByPerson(analysis);
  return (analysis.people || []).map((person) => {
    const typeDuration = typeDurations.get(person.person) || {};
    const singleMinutes = round1(typeDuration.singleEfficiencyDurationMinutes || 0);
    const singleBatchMinutes = round1(typeDuration.singleBatchEfficiencyDurationMinutes || 0);
    const multiMinutes = round1(typeDuration.multiEfficiencyDurationMinutes || 0);
    return {
      businessDate,
      person: person.person,
      sourceFile,
      windowStart: windowSpec.startDisplay,
      windowEnd: windowSpec.endDisplay,
      rows: Number(person.rows || 0),
      completedRows: Number(person.completedRows || 0),
      completedQuantity: Number(person.completedQuantity || 0),
      efficiencyDurationMinutes: Number(person.efficiencyDurationMinutes || 0),
      activeEfficiencyPerHour: person.activeEfficiencyPerHour,
      firstStartTime: person.firstStartTime || "",
      lastEndTime: person.lastEndTime || "",
      spanMinutes: person.spanMinutes,
      spanEfficiencyPerHour: person.spanEfficiencyPerHour,
      eightHourEfficiencyPerHour: person.eightHourEfficiencyPerHour,
      skipEightHourEfficiency: Boolean(person.skipEightHourEfficiency),
      excludeEfficiency: Boolean(person.excludeEfficiency),
      efficiencyExcludedReason: person.efficiencyExcludedReason || "",
      completedSingleRows: Number(person.completedSingleRows || 0),
      completedSingleBatchRows: Number(person.completedSingleBatchRows || 0),
      completedMultiRows: Number(person.completedMultiRows || 0),
      completedSingleQuantity: Number(person.completedSingleQuantity || 0),
      completedSingleBatchQuantity: Number(person.completedSingleBatchQuantity || 0),
      completedMultiQuantity: Number(person.completedMultiQuantity || 0),
      singleEfficiencyDurationMinutes: singleMinutes,
      singleBatchEfficiencyDurationMinutes: singleBatchMinutes,
      multiEfficiencyDurationMinutes: multiMinutes,
      singleActiveEfficiencyPerHour: piecesPerHour(person.completedSingleQuantity, singleMinutes),
      singleBatchActiveEfficiencyPerHour: piecesPerHour(person.completedSingleBatchQuantity, singleBatchMinutes),
      multiActiveEfficiencyPerHour: piecesPerHour(person.completedMultiQuantity, multiMinutes),
    };
  });
}

function aggregatePeople(daily) {
  const byPerson = new Map();
  for (const day of daily) {
    for (const row of day.people || []) {
      if (!byPerson.has(row.person)) {
        byPerson.set(row.person, {
          person: row.person,
          days: new Set(),
          firstBusinessDate: row.businessDate,
          lastBusinessDate: row.businessDate,
          rows: 0,
          completedRows: 0,
          completedQuantity: 0,
          efficiencyDurationMinutes: 0,
          spanMinutes: 0,
          eightHourDays: 0,
          completedSingleRows: 0,
          completedSingleBatchRows: 0,
          completedMultiRows: 0,
          completedSingleQuantity: 0,
          completedSingleBatchQuantity: 0,
          completedMultiQuantity: 0,
          singleEfficiencyDurationMinutes: 0,
          singleBatchEfficiencyDurationMinutes: 0,
          multiEfficiencyDurationMinutes: 0,
        });
      }
      const item = byPerson.get(row.person);
      item.days.add(row.businessDate);
      if (row.businessDate < item.firstBusinessDate) item.firstBusinessDate = row.businessDate;
      if (row.businessDate > item.lastBusinessDate) item.lastBusinessDate = row.businessDate;
      item.rows += Number(row.rows || 0);
      if (row.excludeEfficiency) continue;
      item.completedRows += Number(row.completedRows || 0);
      item.completedQuantity += Number(row.completedQuantity || 0);
      item.efficiencyDurationMinutes += Number(row.efficiencyDurationMinutes || 0);
      item.spanMinutes += Number(row.spanMinutes || 0);
      if (!row.skipEightHourEfficiency && Number(row.completedQuantity || 0) > 0) item.eightHourDays += 1;
      item.completedSingleRows += Number(row.completedSingleRows || 0);
      item.completedSingleBatchRows += Number(row.completedSingleBatchRows || 0);
      item.completedMultiRows += Number(row.completedMultiRows || 0);
      item.completedSingleQuantity += Number(row.completedSingleQuantity || 0);
      item.completedSingleBatchQuantity += Number(row.completedSingleBatchQuantity || 0);
      item.completedMultiQuantity += Number(row.completedMultiQuantity || 0);
      item.singleEfficiencyDurationMinutes += Number(row.singleEfficiencyDurationMinutes || 0);
      item.singleBatchEfficiencyDurationMinutes += Number(row.singleBatchEfficiencyDurationMinutes || 0);
      item.multiEfficiencyDurationMinutes += Number(row.multiEfficiencyDurationMinutes || 0);
    }
  }

  return [...byPerson.values()].map((item) => {
    const dayCount = item.days.size;
    return {
      ...item,
      days: dayCount,
      efficiencyDurationMinutes: round1(item.efficiencyDurationMinutes) || 0,
      spanMinutes: round1(item.spanMinutes) || 0,
      singleEfficiencyDurationMinutes: round1(item.singleEfficiencyDurationMinutes) || 0,
      singleBatchEfficiencyDurationMinutes: round1(item.singleBatchEfficiencyDurationMinutes) || 0,
      multiEfficiencyDurationMinutes: round1(item.multiEfficiencyDurationMinutes) || 0,
      activeEfficiencyPerHour: piecesPerHour(item.completedQuantity, item.efficiencyDurationMinutes),
      spanEfficiencyPerHour: piecesPerHour(item.completedQuantity, item.spanMinutes),
      eightHourEfficiencyPerHour: item.eightHourDays ? round1(item.completedQuantity / (item.eightHourDays * 8)) : null,
      singleActiveEfficiencyPerHour: piecesPerHour(item.completedSingleQuantity, item.singleEfficiencyDurationMinutes),
      singleBatchActiveEfficiencyPerHour: piecesPerHour(item.completedSingleBatchQuantity, item.singleBatchEfficiencyDurationMinutes),
      multiActiveEfficiencyPerHour: piecesPerHour(item.completedMultiQuantity, item.multiEfficiencyDurationMinutes),
    };
  }).sort((a, b) => Number(b.activeEfficiencyPerHour ?? -1) - Number(a.activeEfficiencyPerHour ?? -1)
    || Number(b.completedQuantity || 0) - Number(a.completedQuantity || 0)
    || a.person.localeCompare(b.person, "zh-Hans-CN"));
}

async function saveDay1Workbook(history) {
  const workbook = Workbook.create();
  const summary = [
    ["人员", "历史天数", "日期范围", "已拣选件数", "已拣选单", "单内总分钟", "day-1单内人效", "跨度总分钟", "day-1跨度人效", "8小时人效", "Single单", "Single件", "Single人效", "Single Batch单", "Single Batch件", "Single Batch人效", "Multi单", "Multi件", "Multi人效"],
    ...history.people.map((row) => [
      row.person,
      row.days,
      `${row.firstBusinessDate} 至 ${row.lastBusinessDate}`,
      row.completedQuantity,
      row.completedRows,
      row.efficiencyDurationMinutes,
      row.activeEfficiencyPerHour ?? "-",
      row.spanMinutes,
      row.spanEfficiencyPerHour ?? "-",
      row.eightHourEfficiencyPerHour ?? "-",
      row.completedSingleRows,
      row.completedSingleQuantity,
      row.singleActiveEfficiencyPerHour ?? "-",
      row.completedSingleBatchRows,
      row.completedSingleBatchQuantity,
      row.singleBatchActiveEfficiencyPerHour ?? "-",
      row.completedMultiRows,
      row.completedMultiQuantity,
      row.multiActiveEfficiencyPerHour ?? "-",
    ]),
  ];
  const daily = [
    ["日期", "人员", "已拣选件数", "已拣选单", "单内分钟", "单内人效", "首单开始", "末单结束", "跨度分钟", "跨度人效", "8小时人效", "Single单", "Single件", "Single人效", "Single Batch单", "Single Batch件", "Single Batch人效", "Multi单", "Multi件", "Multi人效", "源文件"],
    ...history.daily.flatMap((day) => (day.people || []).map((row) => [
      day.businessDate,
      row.person,
      row.completedQuantity,
      row.completedRows,
      row.efficiencyDurationMinutes,
      row.activeEfficiencyPerHour ?? "-",
      row.firstStartTime || "-",
      row.lastEndTime || "-",
      row.spanMinutes ?? "-",
      row.spanEfficiencyPerHour ?? "-",
      row.eightHourEfficiencyPerHour ?? "-",
      row.completedSingleRows,
      row.completedSingleQuantity,
      row.singleActiveEfficiencyPerHour ?? "-",
      row.completedSingleBatchRows,
      row.completedSingleBatchQuantity,
      row.singleBatchActiveEfficiencyPerHour ?? "-",
      row.completedMultiRows,
      row.completedMultiQuantity,
      row.multiActiveEfficiencyPerHour ?? "-",
      day.sourceFile,
    ])),
  ];

  writeSheet(workbook, "day-1人效", summary);
  writeSheet(workbook, "每日明细", daily);
  const xlsx = await SpreadsheetFile.exportXlsx(workbook);
  await xlsx.save(day1WorkbookPath);
  await fs.rm(`${day1WorkbookPath}.inspect.ndjson`, { force: true });
}

function writeSheet(workbook, name, matrix) {
  const sheet = workbook.worksheets.add(name);
  const columnCount = Math.max(1, ...matrix.map((row) => row.length));
  const normalized = matrix.map((row) => [...row, ...Array(Math.max(0, columnCount - row.length)).fill("")]);
  sheet.getRangeByIndexes(0, 0, normalized.length, columnCount).values = normalized;
}

export async function saveDay1History(history) {
  const daily = [...(history.daily || [])].sort((a, b) => a.businessDate.localeCompare(b.businessDate));
  const next = {
    version: 1,
    updatedAt: new Date().toISOString(),
    people: aggregatePeople(daily),
    daily,
  };
  await fs.mkdir(day1Dir, { recursive: true });
  await fs.writeFile(day1JsonPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  await saveDay1Workbook(next);
  return next;
}

export async function addAnalysisToDay1History({ businessDate, filePath, windowSpec, analysis }) {
  const history = await loadDay1History();
  const dailyEntry = {
    businessDate,
    generatedAt: new Date().toISOString(),
    sourceFile: path.resolve(filePath),
    window: {
      startDisplay: windowSpec.startDisplay,
      endDisplay: windowSpec.endDisplay,
      startEpoch: windowSpec.startEpoch,
      endEpoch: windowSpec.endEpoch,
    },
    totals: analysis.totals,
    people: dailyPeopleFromAnalysis(analysis, businessDate, path.resolve(filePath), windowSpec),
  };
  history.daily = (history.daily || []).filter((item) => item.businessDate !== businessDate);
  history.daily.push(dailyEntry);
  return saveDay1History(history);
}

export async function pullDay1BusinessDate(businessDate) {
  await ensureDay1Dirs();
  const windowSpec = day1WindowForDate(businessDate);
  const rawOutputDir = path.join(day1RawDir, businessDate);
  const exported = await downloadNativeWmsPickOrderExport(windowSpec, rawOutputDir);
  const analysis = analyzePickingWorkbook(exported.filePath);
  await addPickQuantityTrendAnalysis({
    businessDate,
    filePath: exported.filePath,
    analysis,
  });
  const history = await addAnalysisToDay1History({
    businessDate,
    filePath: exported.filePath,
    windowSpec,
    analysis,
  });
  await appendDay1Log(`OK ${businessDate} ${exported.filePath}`);
  return { businessDate, window: windowSpec, rawFile: exported.filePath, history };
}

export async function pullDay1Range(fromDate, toDate) {
  const results = [];
  let current = fromDate;
  while (current <= toDate) {
    results.push(await pullDay1BusinessDate(current));
    current = addDays(current, 1);
  }
  return results;
}

export function attachDay1Productivity(analysis, history) {
  const people = Array.isArray(history?.people) ? history.people : [];
  const byPerson = new Map(people.map((row) => [row.person, row]));
  const withPeople = (analysis.people || []).map((person) => {
    const day1 = byPerson.get(person.person);
    return {
      ...person,
      day1ActiveEfficiencyPerHour: day1?.activeEfficiencyPerHour ?? null,
      day1SingleActiveEfficiencyPerHour: day1?.singleActiveEfficiencyPerHour ?? null,
      day1SingleBatchActiveEfficiencyPerHour: day1?.singleBatchActiveEfficiencyPerHour ?? null,
      day1MultiActiveEfficiencyPerHour: day1?.multiActiveEfficiencyPerHour ?? null,
      day1CompletedQuantity: day1?.completedQuantity ?? 0,
      day1CompletedRows: day1?.completedRows ?? 0,
      day1Days: day1?.days ?? 0,
    };
  });
  const personMap = new Map(withPeople.map((person) => [person.person, person]));
  return {
    ...analysis,
    people: withPeople,
    pickingPeople: (analysis.pickingPeople || []).map((person) => personMap.get(person.person) || person),
    pickedPeople: (analysis.pickedPeople || []).map((person) => personMap.get(person.person) || person),
    assignedPeople: (analysis.assignedPeople || []).map((person) => personMap.get(person.person) || person),
    assignedOnlyPeople: (analysis.assignedOnlyPeople || []).map((person) => personMap.get(person.person) || person),
    day1Productivity: {
      available: people.length > 0,
      updatedAt: history?.updatedAt || "",
      people: people.length,
      workbookPath: people.length ? day1WorkbookPath : "",
      jsonPath: people.length ? day1JsonPath : "",
    },
  };
}

export async function analyzeWithDay1Productivity(filePath) {
  const analysis = analyzePickingWorkbook(filePath);
  return attachDay1Productivity(analysis, await loadDay1History());
}

export async function runDay1Job(options = {}) {
  const from = options.from || options.date || defaultDay1BusinessDate();
  const to = options.to || options.date || from;
  try {
    const results = from === to
      ? [await pullDay1BusinessDate(from)]
      : await pullDay1Range(from, to);
    await appendDay1Log(`DONE ${from} to ${to}`);
    return results;
  } catch (error) {
    await appendDay1Log(`ERROR ${from} to ${to} ${error.stack || error.message}`);
    throw error;
  }
}
