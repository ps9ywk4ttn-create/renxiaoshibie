import { execFileSync } from "node:child_process";

const OUTPUT_COLUMNS = [
  ["inboundOrderNo", "入库单号"],
  ["ownerName", "货主名称"],
  ["productCode", "货品编码"],
  ["productBarcode", "货品条码"],
  ["productName", "货品名称"],
  ["expectedQty", "应收数量"],
  ["receivedQty", "实收数量"],
  ["unreceivedQty", "未收数量"],
  ["inventoryType", "库存类型"],
  ["arriveTime", "arrivetime"],
  ["dueTime", "duetime"],
];

const FIELD_ALIASES = {
  inboundOrderNo: ["入库单号", "inboundorderno", "inboundorder"],
  ownerName: ["货主名称", "ownername", "owner"],
  productCode: ["货品编码", "productcode", "itemcode", "sku"],
  productBarcode: ["货品条码", "productbarcode", "barcode", "bar code"],
  productName: ["货品名称", "productname", "itemname", "sku name"],
  expectedQty: ["应收数量", "expectedqty", "expectedquantity", "shouldreceiveqty"],
  receivedQty: ["实收数量", "receivedqty", "receivedquantity", "actualreceivedqty"],
  unreceivedQty: ["未收数量", "unreceivedqty", "unreceivedquantity", "notreceivedqty"],
  inventoryType: ["库存类型", "inventorytype", "stocktype"],
  arriveTime: ["arrivetime", "arrivedtime", "arrived time"],
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
    maxBuffer: 1024 * 1024 * 100,
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

function aliasSet(field) {
  return new Set((FIELD_ALIASES[field] || []).map(normalizeHeader));
}

function mapHeader(header) {
  const indexes = {};
  for (const [field] of OUTPUT_COLUMNS) {
    if (field === "dueTime") continue;
    const aliases = aliasSet(field);
    const index = header.findIndex((cell) => aliases.has(normalizeHeader(cell)));
    if (index >= 0) indexes[field] = index;
  }
  return indexes;
}

function findHeader(rows) {
  let best = null;
  rows.slice(0, 20).forEach((row, rowIndex) => {
    const indexes = mapHeader(row);
    const score = Object.keys(indexes).length;
    if (!best || score > best.score) best = { row, rowIndex, indexes, score };
  });
  return best;
}

function excelSerialToDate(value) {
  const serial = Number(value);
  if (!Number.isFinite(serial) || serial <= 0) return null;
  const ms = Math.round((serial - 25569) * 86400000);
  return new Date(ms);
}

function parseDateParts(value) {
  const text = String(value ?? "").trim();
  if (!text || text === "-") return null;

  if (/^\d+(\.\d+)?$/.test(text)) return excelSerialToDate(text);

  let match = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[ T]+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/.exec(text);
  if (match) {
    const [, year, month, day, hour = "0", minute = "0", second = "0"] = match;
    return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second)));
  }

  match = /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})(?:[ T]+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/.exec(text);
  if (match) {
    const [, day, month, year, hour = "0", minute = "0", second = "0"] = match;
    return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second)));
  }

  return null;
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function formatDateTime(date) {
  if (!(date instanceof Date) || !Number.isFinite(date.getTime())) return "";
  return [
    date.getUTCFullYear(),
    pad2(date.getUTCMonth() + 1),
    pad2(date.getUTCDate()),
  ].join("-") + ` ${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())}:${pad2(date.getUTCSeconds())}`;
}

function dueTimeFromArriveTime(value) {
  const arrived = parseDateParts(value);
  if (!arrived) return { arriveTime: String(value ?? "").trim(), dueTime: "", dueTimeMs: Number.POSITIVE_INFINITY };
  const due = new Date(arrived.getTime() + 40 * 60 * 60 * 1000);
  return {
    arriveTime: formatDateTime(arrived),
    dueTime: formatDateTime(due),
    dueTimeMs: due.getTime(),
  };
}

export function analyzeInboundEfficiencyWorkbook(filePath) {
  const rows = readRows(filePath);
  if (!rows.length) throw new Error("文件内容为空");

  const headerInfo = findHeader(rows);
  const requiredFields = OUTPUT_COLUMNS.map(([field]) => field).filter((field) => field !== "dueTime");
  const missing = requiredFields.filter((field) => headerInfo?.indexes[field] == null);
  if (missing.length) {
    const missingLabels = missing.map((field) => OUTPUT_COLUMNS.find(([key]) => key === field)?.[1] || field);
    throw new Error(`文件缺少列：${missingLabels.join("、")}`);
  }

  const dataRows = rows.slice(headerInfo.rowIndex + 1);
  const tableRows = dataRows
    .filter((row) => row.some((cell) => String(cell ?? "").trim() !== ""))
    .map((row) => {
      const arrive = dueTimeFromArriveTime(row[headerInfo.indexes.arriveTime]);
      return {
        inboundOrderNo: String(row[headerInfo.indexes.inboundOrderNo] ?? "").trim(),
        ownerName: String(row[headerInfo.indexes.ownerName] ?? "").trim(),
        productCode: String(row[headerInfo.indexes.productCode] ?? "").trim(),
        productBarcode: String(row[headerInfo.indexes.productBarcode] ?? "").trim(),
        productName: String(row[headerInfo.indexes.productName] ?? "").trim(),
        expectedQty: String(row[headerInfo.indexes.expectedQty] ?? "").trim(),
        receivedQty: String(row[headerInfo.indexes.receivedQty] ?? "").trim(),
        unreceivedQty: String(row[headerInfo.indexes.unreceivedQty] ?? "").trim(),
        inventoryType: String(row[headerInfo.indexes.inventoryType] ?? "").trim(),
        arriveTime: arrive.arriveTime,
        dueTime: arrive.dueTime,
        dueTimeMs: arrive.dueTimeMs,
      };
    })
    .sort((left, right) => left.dueTimeMs - right.dueTimeMs)
    .map(({ dueTimeMs, ...row }) => row);

  return {
    columns: OUTPUT_COLUMNS.map(([key, label]) => ({ key, label })),
    rows: tableRows,
    summary: {
      totalRows: tableRows.length,
      missingDueTimeRows: tableRows.filter((row) => !row.dueTime).length,
    },
  };
}
