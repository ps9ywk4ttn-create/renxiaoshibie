import { execFileSync } from "node:child_process";

const FIELD_ALIASES = {
  batchNo: ["任务批次号", "taskbatchno", "taskbatchnumber"],
  taskType: ["任务类型", "tasktype"],
  pickOrderNumber: ["关联单据号", "拣选单号", "pickordernumber", "pickorder"],
  person: ["操作人", "operator", "operatorname", "user"],
  status: ["任务状态", "taskstatus", "status"],
  containerCode: ["容器编码", "容器号", "containercode", "container"],
  startTime: ["开始时间", "starttime", "startedtime"],
  endTime: ["完成时间", "endtime", "completedtime", "finishtime"],
  completedQuantity: ["完成数量", "完成数", "completedquantity", "completedqty"],
};

function xmlText(value) {
  return String(value ?? "")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", "\"")
    .replaceAll("&apos;", "'");
}

function normalizeHeader(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[()[\]{}_\-/:：.]/g, "")
    .trim();
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
    // Fall through to sheet1.
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

function readRows(filePath) {
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

function mapHeader(header) {
  const indexes = {};
  for (const [field, aliases] of Object.entries(FIELD_ALIASES)) {
    const aliasSet = new Set(aliases.map(normalizeHeader));
    const index = header.findIndex((cell) => aliasSet.has(normalizeHeader(cell)));
    if (index >= 0) indexes[field] = index;
  }
  return indexes;
}

function findHeader(rows) {
  let best = null;
  rows.slice(0, 20).forEach((row, rowIndex) => {
    const indexes = mapHeader(row);
    const score = Object.keys(indexes).length;
    if (!best || score > best.score) best = { rowIndex, indexes, score };
  });
  return best;
}

function excelSerialToMs(value) {
  const serial = Number(value);
  if (!Number.isFinite(serial) || serial <= 0) return null;
  return Math.round((serial - 25569) * 86400000);
}

function parseDateMs(value) {
  const text = String(value ?? "").trim();
  if (!text || text === "-") return null;
  if (/^\d+(\.\d+)?$/.test(text)) return excelSerialToMs(text);

  let match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})[ T]+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/i.exec(text);
  if (match) {
    const [, month, day, year, hourText, minute, second = "0", meridiem] = match;
    let hour = Number(hourText);
    if (/PM/i.test(meridiem) && hour < 12) hour += 12;
    if (/AM/i.test(meridiem) && hour === 12) hour = 0;
    return Date.UTC(Number(year), Number(month) - 1, Number(day), hour, Number(minute), Number(second));
  }

  match = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[ T]+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/.exec(text);
  if (match) {
    const [, year, month, day, hour = "0", minute = "0", second = "0"] = match;
    return Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
  }

  match = /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})(?:[ T]+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/.exec(text);
  if (match) {
    const [, day, month, year, hour = "0", minute = "0", second = "0"] = match;
    return Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
  }

  return null;
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function formatDateTime(ms) {
  if (!Number.isFinite(ms)) return "";
  const date = new Date(ms);
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())} ${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())}:${pad2(date.getUTCSeconds())}`;
}

function durationMinutes(startMs, endMs) {
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs < startMs) return null;
  return (endMs - startMs) / 60000;
}

function formatHoursMinutes(minutes) {
  if (!Number.isFinite(minutes)) return "-";
  const safe = minutes > 0 ? Math.max(1, Math.round(minutes)) : 0;
  const hours = Math.floor(safe / 60);
  const mins = safe % 60;
  if (hours > 0) return `${hours}小时${mins}分钟`;
  return `${mins}分钟`;
}

function numeric(value) {
  const text = String(value ?? "").replace(/,/g, "").trim();
  const number = Number(text);
  return Number.isFinite(number) ? number : 0;
}

function formatEfficiency(quantity, minutes) {
  if (!Number.isFinite(minutes) || minutes <= 0) return "";
  const value = quantity / (minutes / 60);
  return Number.isFinite(value) ? Math.round(value * 10) / 10 : "";
}

function text(row, indexes, field) {
  return String(row[indexes[field]] ?? "").trim();
}

export function analyzePackingStatusWorkbook(filePath) {
  const rows = readRows(filePath);
  if (!rows.length) throw new Error("文件内容为空");

  const headerInfo = findHeader(rows);
  const required = ["pickOrderNumber", "person", "status", "containerCode", "startTime", "endTime", "completedQuantity"];
  const missing = required.filter((field) => headerInfo?.indexes[field] == null);
  if (missing.length) throw new Error(`文件缺少列：${missing.join("、")}`);

  const completedRows = rows
    .slice(headerInfo.rowIndex + 1)
    .map((row, sourceIndex) => {
      const startMs = parseDateMs(text(row, headerInfo.indexes, "startTime"));
      const endMs = parseDateMs(text(row, headerInfo.indexes, "endTime"));
      const quantity = numeric(text(row, headerInfo.indexes, "completedQuantity"));
      const minutes = durationMinutes(startMs, endMs);
      return {
        sourceIndex,
        batchNo: text(row, headerInfo.indexes, "batchNo"),
        taskType: text(row, headerInfo.indexes, "taskType"),
        pickOrderNumber: text(row, headerInfo.indexes, "pickOrderNumber"),
        person: text(row, headerInfo.indexes, "person"),
        status: text(row, headerInfo.indexes, "status"),
        containerCode: text(row, headerInfo.indexes, "containerCode"),
        startTime: text(row, headerInfo.indexes, "startTime"),
        endTime: text(row, headerInfo.indexes, "endTime"),
        startTimeText: formatDateTime(startMs),
        endTimeText: formatDateTime(endMs),
        startMs,
        endMs,
        completedQuantity: quantity,
        durationMinutes: minutes,
        durationText: formatHoursMinutes(minutes),
        orderEfficiency: formatEfficiency(quantity, minutes),
      };
    })
    .filter((row) => row.status === "已完成")
    .filter((row) => !row.taskType || row.taskType.includes("复核"))
    .filter((row) => row.person && row.pickOrderNumber)
    .sort((a, b) => (a.person.localeCompare(b.person, "zh-Hans-CN", { numeric: true, sensitivity: "base" })
      || Number(a.startMs ?? Number.POSITIVE_INFINITY) - Number(b.startMs ?? Number.POSITIVE_INFINITY)
      || a.sourceIndex - b.sourceIndex));

  const peopleMap = new Map();
  for (const row of completedRows) {
    if (!peopleMap.has(row.person)) peopleMap.set(row.person, []);
    peopleMap.get(row.person).push(row);
  }

  const people = [...peopleMap.entries()].map(([person, details]) => {
    const sortedDetails = details.sort((a, b) => (
      Number(a.startMs ?? Number.POSITIVE_INFINITY) - Number(b.startMs ?? Number.POSITIVE_INFINITY)
      || a.sourceIndex - b.sourceIndex
    ));
    let previous = null;
    const enriched = sortedDetails.map((row) => {
      const gapMinutes = previous ? durationMinutes(previous.endMs, row.startMs) : null;
      previous = row;
      return {
        ...row,
        gapMinutes,
        gapText: gapMinutes == null ? "-" : formatHoursMinutes(gapMinutes),
      };
    });
    const totalQuantity = enriched.reduce((sum, row) => sum + Number(row.completedQuantity || 0), 0);
    const totalMinutes = enriched.reduce((sum, row) => sum + Number(row.durationMinutes || 0), 0);
    return {
      person,
      completedOrders: enriched.length,
      completedQuantity: totalQuantity,
      totalDurationText: formatHoursMinutes(totalMinutes),
      averageEfficiency: formatEfficiency(totalQuantity, totalMinutes),
      details: enriched,
    };
  }).sort((a, b) => b.completedOrders - a.completedOrders || b.completedQuantity - a.completedQuantity || a.person.localeCompare(b.person, "zh-Hans-CN"));

  return {
    people,
    summary: {
      completedOrders: completedRows.length,
      people: people.length,
      completedQuantity: people.reduce((sum, row) => sum + row.completedQuantity, 0),
    },
  };
}
