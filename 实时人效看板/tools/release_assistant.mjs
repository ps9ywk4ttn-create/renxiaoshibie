import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

function xmlText(value) {
  return String(value ?? "")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", "\"")
    .replaceAll("&apos;", "'");
}

function columnIndexFromCellRef(ref) {
  const letters = String(ref || "").replace(/[^A-Z]/gi, "").toUpperCase();
  let index = 0;
  for (const letter of letters) index = index * 26 + letter.charCodeAt(0) - 64;
  return index - 1;
}

function unzipText(filePath, innerPath) {
  return execFileSync("unzip", ["-p", filePath, innerPath], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 80,
    stdio: ["ignore", "pipe", "ignore"],
  });
}

function readSharedStrings(filePath) {
  try {
    const xml = unzipText(filePath, "xl/sharedStrings.xml");
    return [...xml.matchAll(/<(?:\w+:)?si\b[\s\S]*?<\/(?:\w+:)?si>/g)].map(([si]) => (
      [...si.matchAll(/<(?:\w+:)?t[^>]*>([\s\S]*?)<\/(?:\w+:)?t>/g)]
        .map((match) => xmlText(match[1]))
        .join("")
    ));
  } catch {
    return [];
  }
}

function readFirstWorksheetXml(filePath) {
  try {
    const workbookXml = unzipText(filePath, "xl/workbook.xml");
    const relId = /<(?:\w+:)?sheet\b[^>]*r:id="([^"]+)"/.exec(workbookXml)?.[1];
    if (relId) {
      const relsXml = unzipText(filePath, "xl/_rels/workbook.xml.rels");
      const relMatch = new RegExp(`<Relationship[^>]*Id="${relId}"[^>]*Target="([^"]+)"`).exec(relsXml);
      if (relMatch?.[1]) {
        const rawTarget = relMatch[1];
        const target = rawTarget.startsWith("/") ? rawTarget.slice(1) : `xl/${rawTarget}`;
        return unzipText(filePath, target.replace("xl//", "xl/"));
      }
    }
  } catch {
    // Fall through to the normal first-sheet path.
  }
  return unzipText(filePath, "xl/worksheets/sheet1.xml");
}

function cellText(cellXml, sharedStrings) {
  const type = /\bt="([^"]+)"/.exec(cellXml)?.[1];
  if (type === "inlineStr") {
    return [...cellXml.matchAll(/<(?:\w+:)?t[^>]*>([\s\S]*?)<\/(?:\w+:)?t>/g)]
      .map((match) => xmlText(match[1]))
      .join("");
  }
  const raw = /<(?:\w+:)?v[^>]*>([\s\S]*?)<\/(?:\w+:)?v>/.exec(cellXml)?.[1] ?? "";
  if (type === "s") return sharedStrings[Number(raw)] ?? "";
  return xmlText(raw);
}

function readReleaseAssistantRows(filePath) {
  const sharedStrings = readSharedStrings(filePath);
  const sheetXml = readFirstWorksheetXml(filePath);
  return [...sheetXml.matchAll(/<(?:\w+:)?row\b[\s\S]*?<\/(?:\w+:)?row>/g)].map(([rowXml]) => {
    const cells = [];
    for (const cellMatch of rowXml.matchAll(/<(?:\w+:)?c\b([^>]*)>([\s\S]*?)<\/(?:\w+:)?c>/g)) {
      const attrs = cellMatch[1];
      const ref = /\br="([^"]+)"/.exec(attrs)?.[1];
      const index = columnIndexFromCellRef(ref);
      cells[index >= 0 ? index : cells.length] = cellText(cellMatch[0], sharedStrings);
    }
    return cells;
  }).filter((row) => row.some((cell) => String(cell ?? "").trim() !== ""));
}

function compareX(leftValue, rightValue) {
  const left = String(leftValue ?? "").trim();
  const right = String(rightValue ?? "").trim();
  if (!left && !right) return 0;
  if (!left) return 1;
  if (!right) return -1;

  const leftNumber = Number(left.replace(/,/g, ""));
  const rightNumber = Number(right.replace(/,/g, ""));
  if (Number.isFinite(leftNumber) && Number.isFinite(rightNumber)) return leftNumber - rightNumber;
  return left.localeCompare(right, "zh-CN", { numeric: true, sensitivity: "base" });
}

function writeSheet(workbook, name, matrix) {
  const sheet = workbook.worksheets.add(name);
  const columnCount = Math.max(1, ...matrix.map((row) => row.length));
  const normalized = matrix.map((row) => [...row, ...Array(Math.max(0, columnCount - row.length)).fill("")]);
  sheet.getRangeByIndexes(0, 0, normalized.length, columnCount).values = normalized;
}

export async function exportReleaseAssistantWorkbook({ filePath, outputDir }) {
  const rows = readReleaseAssistantRows(filePath);
  if (!rows.length) throw new Error("文件内容为空");
  if (!rows.some((row) => row.length > 23)) throw new Error("文件里没有 X 列");

  const header = rows[0] || [];
  const sortedRows = rows
    .slice(1)
    .map((row, index) => ({ row, index }))
    .sort((left, right) => compareX(left.row[23], right.row[23]) || left.index - right.index)
    .map((item) => item.row);
  const matrix = [
    [header[0] || "A列", header[23] || "X列"],
    ...sortedRows.map((row) => [row[0] ?? "", row[23] ?? ""]),
  ];

  const workbook = Workbook.create();
  writeSheet(workbook, "放单助手", matrix);

  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const baseName = path.basename(filePath).replace(/\.xlsx(\.xlsx)?$/i, "").replace(/[^0-9A-Za-z\u4e00-\u9fa5_-]+/g, "_");
  const outDir = outputDir || path.join(path.dirname(path.resolve(filePath)), "导出文件");
  const outPath = path.join(outDir, `放单助手_${baseName}_${stamp}.xlsx`);
  await fs.mkdir(outDir, { recursive: true });
  const xlsx = await SpreadsheetFile.exportXlsx(workbook);
  await xlsx.save(outPath);
  return {
    filePath: outPath,
    table: matrix,
    source: {
      filePath: path.resolve(filePath),
      rows: sortedRows.length,
      sortColumn: "X",
      keptColumns: ["A", "X"],
    },
  };
}
