import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

export const WMS_EXPORT_ENDPOINT = "/api/v1/supply_chain_wms/pc/export/export_file";
export const WMS_EXPORT_TASK_ENDPOINT = "/api/v1/supply_chain_wms/pc/export/list_task";
export const WMS_EXPORT_TYPE = "biz_task";
export const FIXED_UTC_OFFSET_HOURS = -4;
export const EXPORT_POLL_MS = 1000;
export const EXPORT_TIMEOUT_MS = 90 * 1000;

const shiftRootMap = {
  day: "YQN白班出库数据",
  night: "YQN夜班出库数据",
  custom: "YQN自定义出库数据",
};

const taskModeMap = {
  pick: {
    label: "出库拣选",
    folder: "出库数据",
    taskTypeList: ["pick"],
  },
  review: {
    label: "出库复核",
    folder: "出库复核数据",
    taskTypeList: ["review"],
  },
};

const shiftLabelMap = {
  day: "白班",
  night: "夜班",
  custom: "自定义",
};

export function pad2(value) {
  return String(value).padStart(2, "0");
}

export function parseYmd(ymd) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
  if (!match) throw new Error(`Invalid date: ${ymd}`);
  return { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
}

export function ymdFromUtcDate(date) {
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`;
}

export function addDays(ymd, days) {
  const { year, month, day } = parseYmd(ymd);
  return ymdFromUtcDate(new Date(Date.UTC(year, month - 1, day + days)));
}

export function monthKeyForDate(ymd) {
  const { year, month } = parseYmd(ymd);
  return `${year}-${pad2(month)}`;
}

export function mmdd(ymd) {
  const { month, day } = parseYmd(ymd);
  return `${pad2(month)}-${pad2(day)}`;
}

export function epochFromFixedOffset(ymd, time) {
  const normalized = time.length === 5 ? `${time}:00` : time;
  const offset = `${FIXED_UTC_OFFSET_HOURS < 0 ? "-" : "+"}${pad2(Math.abs(FIXED_UTC_OFFSET_HOURS))}:00`;
  const timestamp = Date.parse(`${ymd}T${normalized}${offset}`);
  if (Number.isNaN(timestamp)) throw new Error(`Invalid datetime: ${ymd} ${time}`);
  return Math.floor(timestamp / 1000);
}

export function formatEpochFixedOffset(seconds) {
  if (!seconds) return "";
  const shifted = new Date((seconds + FIXED_UTC_OFFSET_HOURS * 3600) * 1000);
  return [
    shifted.getUTCFullYear(),
    pad2(shifted.getUTCMonth() + 1),
    pad2(shifted.getUTCDate()),
  ].join("-") + ` ${pad2(shifted.getUTCHours())}:${pad2(shifted.getUTCMinutes())}:${pad2(shifted.getUTCSeconds())}`;
}

export function sundayOnOrBefore(ymd) {
  const { year, month, day } = parseYmd(ymd);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() - date.getUTCDay());
  return ymdFromUtcDate(date);
}

export function weekStartForYearWeek(year, week) {
  const jan1 = new Date(Date.UTC(Number(year), 0, 1));
  const firstSunday = new Date(jan1);
  firstSunday.setUTCDate(jan1.getUTCDate() - jan1.getUTCDay());
  firstSunday.setUTCDate(firstSunday.getUTCDate() + (Number(week) - 1) * 7);
  return ymdFromUtcDate(firstSunday);
}

export function weekNumberForDate(ymd) {
  const { year } = parseYmd(ymd);
  const start = new Date(Date.UTC(year, 0, 1));
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());
  const current = new Date(Date.UTC(parseYmd(ymd).year, parseYmd(ymd).month - 1, parseYmd(ymd).day));
  return Math.floor((current - start) / (7 * 24 * 3600 * 1000)) + 1;
}

export function weekFolderLabel(year, week) {
  const start = weekStartForYearWeek(year, week);
  const end = addDays(start, 6);
  return `${year}-W${pad2(week)}_${mmdd(start)}至${mmdd(end)}`;
}

export function taskModeConfig(taskMode = "pick") {
  return taskModeMap[taskMode] || taskModeMap.pick;
}

export function buildShiftWindow({ date, shift, taskMode = "pick", startDate, startTime, endDate, endTime }) {
  const taskConfig = taskModeConfig(taskMode);
  if (shift === "day") {
    return {
      shift,
      shiftLabel: shiftLabelMap.day,
      taskMode,
      taskLabel: taskConfig.label,
      businessDate: date,
      startDate: date,
      startTime: "04:00",
      endDate: date,
      endTime: "17:30",
    };
  }

  if (shift === "night") {
    return {
      shift,
      shiftLabel: shiftLabelMap.night,
      taskMode,
      taskLabel: taskConfig.label,
      businessDate: date,
      startDate: addDays(date, -1),
      startTime: "17:30",
      endDate: date,
      endTime: "04:00",
    };
  }

  return {
    shift: "custom",
    shiftLabel: shiftLabelMap.custom,
    taskMode,
    taskLabel: taskConfig.label,
    businessDate: date,
    startDate,
    startTime,
    endDate,
    endTime,
  };
}

export function completeWindow(windowSpec) {
  const startEpoch = epochFromFixedOffset(windowSpec.startDate, windowSpec.startTime);
  const endEpoch = epochFromFixedOffset(windowSpec.endDate, windowSpec.endTime);
  if (endEpoch <= startEpoch) {
    throw new Error("结束时间必须晚于开始时间");
  }
  return {
    ...windowSpec,
    startEpoch,
    endEpoch,
    startDisplay: formatEpochFixedOffset(startEpoch),
    endDisplay: formatEpochFixedOffset(endEpoch),
  };
}

export function buildWeekWindows({ year, week, shift, taskMode = "pick", customStartTime = "17:30", customEndTime = "04:00" }) {
  const weekStart = weekStartForYearWeek(year, week);
  const windows = [];
  const taskConfig = taskModeConfig(taskMode);

  if (shift === "night") {
    for (let i = 0; i < 7; i += 1) {
      const startDate = addDays(weekStart, i);
      const businessDate = addDays(weekStart, i + 1);
      windows.push(completeWindow({
        shift: "night",
        shiftLabel: shiftLabelMap.night,
        taskMode,
        taskLabel: taskConfig.label,
        businessDate,
        startDate,
        startTime: "17:30",
        endDate: businessDate,
        endTime: "04:00",
      }));
    }
    return windows;
  }

  if (shift === "day") {
    for (let i = 0; i < 7; i += 1) {
      const date = addDays(weekStart, i);
      windows.push(completeWindow({
        shift: "day",
        shiftLabel: shiftLabelMap.day,
        taskMode,
        taskLabel: taskConfig.label,
        businessDate: date,
        startDate: date,
        startTime: "04:00",
        endDate: date,
        endTime: "17:30",
      }));
    }
    return windows;
  }

  for (let i = 0; i < 7; i += 1) {
    const startDate = addDays(weekStart, i);
    const endDate = customEndTime <= customStartTime ? addDays(startDate, 1) : startDate;
    windows.push(completeWindow({
      shift: "custom",
      shiftLabel: shiftLabelMap.custom,
      taskMode,
      taskLabel: taskConfig.label,
      businessDate: endDate,
      startDate,
      startTime: customStartTime,
      endDate,
      endTime: customEndTime,
    }));
  }
  return windows;
}

export function outputRootForShift(shift) {
  return path.resolve(shiftRootMap[shift] || shiftRootMap.custom);
}

export function outputRootForWindow(windowSpec) {
  const taskFolder = taskModeConfig(windowSpec.taskMode).folder;
  const shiftLabel = shiftLabelMap[windowSpec.shift] || shiftLabelMap.custom;
  return path.resolve(`YQN${shiftLabel}${taskFolder}`);
}

export function outputPathsForDay(windowSpec, forcedWeek) {
  const year = forcedWeek?.year ?? parseYmd(windowSpec.businessDate).year;
  const week = forcedWeek?.week ?? weekNumberForDate(windowSpec.businessDate);
  const root = outputRootForWindow(windowSpec);
  const month = monthKeyForDate(windowSpec.businessDate);
  const weekFolder = weekFolderLabel(year, week);
  const dir = path.join(root, month, weekFolder, windowSpec.businessDate);
  return { root, month, week, weekFolder, dir };
}

export function outputPathsForWeek(year, week, shift, taskMode = "pick") {
  const taskConfig = taskModeConfig(taskMode);
  const root = path.resolve(`YQN${shiftLabelMap[shift] || "自定义"}${taskConfig.folder}`);
  const start = weekStartForYearWeek(year, week);
  const month = monthKeyForDate(start);
  const weekFolder = weekFolderLabel(year, week);
  const dir = path.join(root, month, weekFolder);
  const file = path.join(dir, `YQN${shiftLabelMap[shift] || "自定义"}${taskConfig.label}周表_${year}-W${pad2(week)}.xlsx`);
  return { root, month, weekFolder, dir, file };
}

export function runSafariJsonRequest(endpoint, body) {
  const bodyJson = JSON.stringify(body);
  const js = `(()=>{const xhr=new XMLHttpRequest();xhr.open('POST','${endpoint}',false);xhr.setRequestHeader('content-type','application/json');xhr.send(${JSON.stringify(bodyJson)});return JSON.stringify({status:xhr.status,text:xhr.responseText});})()`;
  const appleScript = `with timeout of 30 seconds
tell application "Safari"
  repeat with w in windows
    repeat with t in tabs of w
      if ((URL of t) as string) contains "wms-ttp.tiktokw.us" then
        return do JavaScript ${JSON.stringify(js)} in t
      end if
    end repeat
  end repeat
  error "Safari 里没有找到已登录的 WMS 标签页"
end tell
end timeout`;
  const out = execFileSync("osascript", ["-e", appleScript], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 80,
  }).trim();
  const response = JSON.parse(out);
  if (response.status !== 200) {
    throw new Error(`WMS request failed: HTTP ${response.status} ${response.text.slice(0, 500)}`);
  }
  const parsed = JSON.parse(response.text);
  if (parsed.code !== 0) {
    throw new Error(`WMS API returned code ${parsed.code}: ${response.text.slice(0, 500)}`);
  }
  return parsed;
}

export function productivityFromTotals(totals, workHours) {
  const hours = Number(workHours || 0);
  if (!hours || hours <= 0) return "";
  if (totals.actualQty === "" || totals.actualQty == null) return "";
  const pieces = Number(totals.actualQty);
  if (!Number.isFinite(pieces)) return "";
  return Number((pieces / hours).toFixed(2));
}

export function buildWmsTaskRequest(windowSpec) {
  const taskConfig = taskModeConfig(windowSpec.taskMode);
  return {
    cond: {
      status_list: [500],
      finish_time_range: {
        start_time: windowSpec.startEpoch,
        end_time: windowSpec.endEpoch,
      },
      task_type_list: taskConfig.taskTypeList,
    },
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function unwrapExportTask(response) {
  const data = response?.data ?? response;
  if (data?.task) return data.task;
  if (data?.export_task) return data.export_task;
  if (Array.isArray(data?.task_list) && data.task_list[0]) return data.task_list[0];
  if (data?.task_id) return data;
  return null;
}

function isCompletedExportTask(task) {
  return Boolean(task?.url && task?.file_name);
}

function isFailedExportTask(task) {
  return [400, 4].includes(Number(task?.task_status ?? task?.status));
}

function taskFileExtension(task) {
  return ({ 1: "xls", 2: "xlsx", 3: "csv" })[Number(task?.file_type)] || "xlsx";
}

function originalTaskFileName(task) {
  const base = String(task?.file_name || "").trim();
  if (!base) throw new Error("WMS 导出任务没有返回文件名");
  return `${base}.${taskFileExtension(task)}`.replaceAll("/", "_");
}

async function downloadUrlToFile(url, filePath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`WMS 文件下载失败: HTTP ${response.status}`);
  }
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(filePath, buffer);
}

async function listRecentExportTasks() {
  const response = runSafariJsonRequest(WMS_EXPORT_TASK_ENDPOINT, {
    type_list: [WMS_EXPORT_TYPE],
    pagination: { page: 1, size: 20 },
  });
  return response?.data?.task_list || response?.task_list || [];
}

function sameExportTask(candidate, initialTask) {
  if (!candidate || !initialTask) return false;
  if (candidate.task_no && initialTask.task_no) return candidate.task_no === initialTask.task_no;
  if (candidate.file_name && initialTask.file_name && candidate.create_time && initialTask.create_time) {
    return candidate.file_name === initialTask.file_name && Number(candidate.create_time) === Number(initialTask.create_time);
  }
  return false;
}

export async function downloadNativeWmsExport(windowSpec, outputDir) {
  const listReq = buildWmsTaskRequest(windowSpec);
  const exportResponse = runSafariJsonRequest(WMS_EXPORT_ENDPOINT, {
    export_type: WMS_EXPORT_TYPE,
    list_req_json: JSON.stringify(listReq),
  });
  let task = unwrapExportTask(exportResponse);
  if (!task?.task_no && !isCompletedExportTask(task)) {
    throw new Error("WMS 没有返回导出任务编号");
  }

  const deadline = Date.now() + EXPORT_TIMEOUT_MS;
  while (!isCompletedExportTask(task)) {
    if (isFailedExportTask(task)) {
      throw new Error(`WMS 导出失败: ${task?.file_name || task?.task_no || ""}`);
    }
    if (Date.now() > deadline) {
      throw new Error("WMS 导出超时，还没拿到下载链接");
    }
    await sleep(EXPORT_POLL_MS);
    const tasks = await listRecentExportTasks();
    task = tasks.find((item) => sameExportTask(item, task)) || task;
  }

  const fileName = originalTaskFileName(task);
  const filePath = path.join(outputDir, fileName);
  await downloadUrlToFile(task.url, filePath);
  return { task, fileName, filePath };
}

function escapeXmlText(value) {
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
    return [...xml.matchAll(/<si\b[\s\S]*?<\/si>/g)].map(([si]) => {
      const parts = [...si.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((match) => escapeXmlText(match[1]));
      return parts.join("");
    });
  } catch {
    return [];
  }
}

function readFirstWorksheetXml(filePath) {
  try {
    const workbookXml = unzipText(filePath, "xl/workbook.xml");
    const relId = /<sheet\b[^>]*r:id="([^"]+)"/.exec(workbookXml)?.[1];
    if (relId) {
      const relsXml = unzipText(filePath, "xl/_rels/workbook.xml.rels");
      const relMatch = new RegExp(`<Relationship[^>]*Id="${relId}"[^>]*Target="([^"]+)"`).exec(relsXml);
      if (relMatch?.[1]) {
        const target = relMatch[1].startsWith("/") ? relMatch[1].slice(1) : `xl/${relMatch[1]}`;
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
    return [...cellXml.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((match) => escapeXmlText(match[1])).join("");
  }
  const raw = /<v[^>]*>([\s\S]*?)<\/v>/.exec(cellXml)?.[1] ?? "";
  if (type === "s") return sharedStrings[Number(raw)] ?? "";
  return escapeXmlText(raw);
}

export function readXlsxRows(filePath) {
  const sharedStrings = readSharedStrings(filePath);
  const sheetXml = readFirstWorksheetXml(filePath);
  return [...sheetXml.matchAll(/<row\b[\s\S]*?<\/row>/g)].map(([rowXml]) => {
    const cells = [];
    for (const cellMatch of rowXml.matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
      const attrs = cellMatch[1];
      const ref = /\br="([^"]+)"/.exec(attrs)?.[1];
      const index = columnIndexFromCellRef(ref);
      cells[index >= 0 ? index : cells.length] = cellText(cellMatch[0], sharedStrings);
    }
    return cells;
  }).filter((row) => row.some((cell) => String(cell ?? "").trim() !== ""));
}

export function totalsFromRawWorkbook(filePath) {
  const rows = readXlsxRows(filePath);
  const headerIndex = rows.findIndex((row) => row.some((cell) => isFinishedQtyHeader(cell)));
  const header = rows[headerIndex] || rows[0] || [];
  const qtyIndex = header.findIndex((cell) => isFinishedQtyHeader(cell));
  const dataRows = rows.slice((headerIndex >= 0 ? headerIndex : 0) + 1);
  const actualQty = qtyIndex >= 0
    ? dataRows.reduce((sum, row) => sum + Number(String(row[qtyIndex] ?? "").replace(/,/g, "") || 0), 0)
    : 0;
  return {
    rows: dataRows.length,
    actualQty,
    totalPieces: actualQty,
  };
}

export function safeTotalsFromRawWorkbook(filePath) {
  try {
    return totalsFromRawWorkbook(filePath);
  } catch (error) {
    return {
      rows: "",
      actualQty: "",
      totalPieces: "",
      warning: `文件已保存，人效读取失败: ${error.message || String(error)}`,
    };
  }
}

function text(value) {
  return String(value ?? "").trim();
}

function parseNumber(value) {
  const normalized = text(value).replace(/,/g, "");
  if (!normalized || normalized === "-") return 0;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseWmsDateTime(value) {
  const raw = text(value);
  if (!raw || raw === "-") return null;

  let match = /^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(raw);
  if (match) {
    const [, day, month, year, hour, minute, second = "00"] = match;
    return Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
  }

  match = /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(raw);
  if (match) {
    const [, year, month, day, hour, minute, second = "00"] = match;
    return Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
  }

  const parsed = Date.parse(raw);
  return Number.isNaN(parsed) ? null : parsed;
}

function minutesBetween(startMs, endMs) {
  if (startMs == null || endMs == null) return null;
  return Math.round(((endMs - startMs) / 60000) * 10) / 10;
}

function minutesLabel(value) {
  if (value == null || !Number.isFinite(value)) return "-";
  return `${value}`;
}

function formatParsedDateTime(ms) {
  if (ms == null) return "";
  const date = new Date(ms);
  return [
    date.getUTCFullYear(),
    pad2(date.getUTCMonth() + 1),
    pad2(date.getUTCDate()),
  ].join("-") + ` ${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())}:${pad2(date.getUTCSeconds())}`;
}

function firstHeaderIndex(rows) {
  const required = new Set(["PickOrderNumber", "PickOrderStatus", "QuantityOfPick"]);
  return rows.findIndex((row) => {
    const cells = new Set(row.map((cell) => text(cell)));
    return [...required].filter((header) => cells.has(header)).length >= 2;
  });
}

function rowObject(header, row, rowNumber) {
  const record = { _excelRow: rowNumber };
  header.forEach((key, index) => {
    if (text(key)) record[text(key)] = row[index] ?? "";
  });
  return record;
}

function sumBy(rows, key) {
  return rows.reduce((sum, row) => sum + Number(row[key] || 0), 0);
}

function summarizePeople(records) {
  const people = new Map();

  for (const record of records) {
    if (!people.has(record.person)) {
      people.set(record.person, {
        person: record.person,
        rows: 0,
        pickingRows: 0,
        assignedRows: 0,
        quantityOfPick: 0,
        pickingQuantity: 0,
        assignedQuantity: 0,
        numberOfPicks: 0,
        invLocationNum: 0,
        packageQuantity: 0,
        startedRows: 0,
        startedQuantity: 0,
        completedRows: 0,
        completedQuantity: 0,
        durationRows: 0,
        durationMinutes: 0,
        avgDurationMinutes: null,
        containers: new Set(),
      });
    }

    const item = people.get(record.person);
    item.rows += 1;
    item.quantityOfPick += record.quantityOfPick;
    item.numberOfPicks += record.numberOfPicks;
    item.invLocationNum += record.invLocationNum;
    item.packageQuantity += record.packageQuantity;
    if (record.container) item.containers.add(record.container);
    if (record.startedAtMs != null) {
      item.startedRows += 1;
      item.startedQuantity += record.quantityOfPick;
    }
    if (record.endedAtMs != null) {
      item.completedRows += 1;
      item.completedQuantity += record.quantityOfPick;
    }
    if (record.durationMinutes != null) {
      item.durationRows += 1;
      item.durationMinutes += record.durationMinutes;
    }

    if (record.statusGroup === "已分配") {
      item.assignedRows += 1;
      item.assignedQuantity += record.quantityOfPick;
    } else if (record.statusGroup === "拣选中") {
      item.pickingRows += 1;
      item.pickingQuantity += record.quantityOfPick;
    }
  }

  return [...people.values()].map((item) => ({
    ...item,
    containers: [...item.containers],
    avgDurationMinutes: item.durationRows ? Math.round((item.durationMinutes / item.durationRows) * 10) / 10 : null,
  })).sort((a, b) => b.completedRows - a.completedRows || b.pickingRows - a.pickingRows || b.quantityOfPick - a.quantityOfPick || a.person.localeCompare(b.person, "zh-Hans-CN"));
}

function buildGapRows(records) {
  const byPerson = new Map();
  for (const record of records) {
    if (!byPerson.has(record.person)) byPerson.set(record.person, []);
    byPerson.get(record.person).push(record);
  }

  const rows = [];
  for (const [person, personRecords] of byPerson) {
    const sorted = [...personRecords].sort((a, b) => {
      const left = a.startedAtMs ?? a.createdAtMs ?? 0;
      const right = b.startedAtMs ?? b.createdAtMs ?? 0;
      return left - right || a.pickOrderNumber.localeCompare(b.pickOrderNumber);
    });

    for (let index = 1; index < sorted.length; index += 1) {
      const previous = sorted[index - 1];
      const current = sorted[index];
      const gapMinutes = minutesBetween(previous.endedAtMs, current.startedAtMs);
      let status = "可计算";
      if (previous.endedAtMs == null && current.startedAtMs == null) {
        status = "上一单无结束时间，下一单无开始时间";
      } else if (previous.endedAtMs == null) {
        status = "上一单无结束时间";
      } else if (current.startedAtMs == null) {
        status = "下一单无开始时间";
      }

      rows.push({
        person,
        previousOrder: previous.pickOrderNumber,
        previousEndTime: previous.endTime,
        nextOrder: current.pickOrderNumber,
        nextStartTime: current.startTime,
        gapMinutes,
        gapLabel: minutesLabel(gapMinutes),
        status,
      });
    }
  }

  return rows.sort((a, b) => a.person.localeCompare(b.person, "zh-Hans-CN"));
}

export function analyzePickingWorkbook(filePath) {
  const analyzedAtMs = Date.now() + FIXED_UTC_OFFSET_HOURS * 3600 * 1000;
  const rows = readXlsxRows(filePath);
  const headerIndex = firstHeaderIndex(rows);
  if (headerIndex < 0) {
    throw new Error("没有找到拣选任务表头：需要 PickOrderNumber / PickOrderStatus / QuantityOfPick");
  }

  const header = rows[headerIndex].map((cell) => text(cell));
  const dataRows = rows.slice(headerIndex + 1);
  const records = dataRows.map((row, index) => rowObject(header, row, headerIndex + index + 2))
    .filter((record) => Object.keys(record).some((key) => key !== "_excelRow" && text(record[key]) !== ""))
    .map((record) => {
      const delegator = text(record.Delegator);
      const operator = text(record["操作人"]);
      const person = delegator || operator || "未填写人员";
      const startTime = text(record["拣选开始时间"]);
      const endTime = text(record["拣选完成时间"]);
      const startedAtMs = parseWmsDateTime(startTime);
      const endedAtMs = parseWmsDateTime(endTime);
      const rawStatus = text(record.PickOrderStatus);
      const statusGroup = startedAtMs == null ? "已分配" : endedAtMs == null ? "拣选中" : "已拣选";
      const durationMinutes = minutesBetween(startedAtMs, endedAtMs);

      let durationStatus = "可计算";
      if (startedAtMs == null && endedAtMs == null) {
        durationStatus = "无开始时间、无结束时间";
      } else if (startedAtMs == null) {
        durationStatus = "无开始时间";
      } else if (endedAtMs == null) {
        durationStatus = "未完成，无结束时间";
      }

      return {
        excelRow: record._excelRow,
        pickOrderNumber: text(record.PickOrderNumber),
        waveOrderNumber: text(record.WaveOrderNumber),
        person,
        delegator,
        operator,
        container: text(record["拣选容器"]),
        rawStatus,
        statusGroup,
        packageQuantity: parseNumber(record.PackageQuantity),
        quantityOfPick: parseNumber(record.QuantityOfPick),
        numberOfPicks: parseNumber(record.NumberOfPicks),
        invLocationNum: parseNumber(record.InvLocationNum),
        createdTime: text(record["创建时间"]),
        startTime,
        endTime,
        createdAtMs: parseWmsDateTime(record["创建时间"]),
        startedAtMs,
        endedAtMs,
        durationMinutes,
        durationLabel: minutesLabel(durationMinutes),
        durationStatus,
      };
    });

  const people = summarizePeople(records);
  const pickingPeople = people.filter((item) => item.pickingRows > 0);
  const pickedPeople = people.filter((item) => item.completedRows > 0);
  const assignedPeople = people.filter((item) => item.assignedRows > 0);
  const assignedOnlyPeople = people.filter((item) => item.assignedRows > 0 && item.pickingRows === 0 && item.completedRows === 0);
  const gapRows = buildGapRows(records);

  const sourceTimes = records.map((record) => record.createdAtMs).filter((value) => value != null);
  const durationRows = records.filter((record) => record.durationMinutes != null);
  const calculableGaps = gapRows.filter((row) => row.gapMinutes != null);

  return {
    source: {
      filePath: path.resolve(filePath),
      headerRow: headerIndex + 1,
      columns: header.length,
      rows: records.length,
      analyzedAtMs,
      analyzedAt: formatParsedDateTime(analyzedAtMs),
      createdMin: sourceTimes.length ? formatParsedDateTime(Math.min(...sourceTimes)) : "",
      createdMax: sourceTimes.length ? formatParsedDateTime(Math.max(...sourceTimes)) : "",
    },
    rules: {
      assignedStatus: "没有拣选开始时间",
      pickingStatus: "有拣选开始时间，没有拣选完成时间",
      pickedStatus: "拣选开始时间和拣选完成时间都有",
      personField: "优先 Delegator，空时使用 操作人",
      quantityField: "QuantityOfPick",
      durationFormula: "拣选完成时间 - 拣选开始时间",
      gapFormula: "下一单拣选开始时间 - 上一单拣选完成时间",
    },
    totals: {
      rows: records.length,
      pickingRows: records.filter((record) => record.statusGroup === "拣选中").length,
      assignedRows: records.filter((record) => record.statusGroup === "已分配").length,
      pickedRows: records.filter((record) => record.statusGroup === "已拣选").length,
      people: people.length,
      pickingPeople: pickingPeople.length,
      pickedPeople: pickedPeople.length,
      assignedPeople: assignedPeople.length,
      assignedOnlyPeople: assignedOnlyPeople.length,
      packageQuantity: sumBy(records, "packageQuantity"),
      quantityOfPick: sumBy(records, "quantityOfPick"),
      numberOfPicks: sumBy(records, "numberOfPicks"),
      invLocationNum: sumBy(records, "invLocationNum"),
      startedRows: records.filter((record) => record.startedAtMs != null).length,
      startedQuantity: records.filter((record) => record.startedAtMs != null).reduce((sum, record) => sum + record.quantityOfPick, 0),
      completedRows: records.filter((record) => record.endedAtMs != null).length,
      completedQuantity: records.filter((record) => record.endedAtMs != null).reduce((sum, record) => sum + record.quantityOfPick, 0),
      durationRows: durationRows.length,
      gapRows: gapRows.length,
      calculableGaps: calculableGaps.length,
      missingEndRows: records.filter((record) => record.endedAtMs == null).length,
      missingStartRows: records.filter((record) => record.startedAtMs == null).length,
    },
    people,
    pickingPeople,
    pickedPeople,
    assignedPeople,
    assignedOnlyPeople,
    orderDurations: records.sort((a, b) => {
      const left = b.startedAtMs ?? b.createdAtMs ?? 0;
      const right = a.startedAtMs ?? a.createdAtMs ?? 0;
      return left - right || a.pickOrderNumber.localeCompare(b.pickOrderNumber);
    }),
    gaps: gapRows,
  };
}

export async function exportWeekWorkbook({ year, week, shift, windows, dailyResults, rows, filePath, workHours = "" }) {
  const totals = summarizeRawMatrix(rows);
  const productivity = productivityFromTotals(totals, workHours);
  const workbook = Workbook.create();
  const weekSheet = workbook.worksheets.add("Sheet1");
  const weekMatrix = rows;
  const columnCount = Math.max(1, ...weekMatrix.map((row) => row.length));
  const normalizedMatrix = weekMatrix.map((row) => [...row, ...Array(Math.max(0, columnCount - row.length)).fill("")]);
  weekSheet.getRangeByIndexes(0, 0, normalizedMatrix.length, columnCount).values = normalizedMatrix;

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const xlsx = await SpreadsheetFile.exportXlsx(workbook);
  await xlsx.save(filePath);
  return { ...totals, totalPieces: totals.actualQty, workHours: workHours === "" || workHours == null ? "" : Number(workHours), productivity };
}

export function summarizeRawMatrix(matrix) {
  const header = matrix[0] || [];
  const qtyIndex = header.findIndex((cell) => isFinishedQtyHeader(cell));
  const dataRows = matrix.slice(1);
  const actualQty = qtyIndex >= 0
    ? dataRows.reduce((sum, row) => sum + Number(String(row[qtyIndex] ?? "").replace(/,/g, "") || 0), 0)
    : 0;
  return {
    rows: dataRows.length,
    actualQty,
    totalPieces: actualQty,
  };
}

function isFinishedQtyHeader(value) {
  const text = String(value ?? "").trim().toLowerCase().replace(/\s+/g, " ");
  return text === "完成数量" || text === "finished qty" || text === "finished quantity";
}

export async function exportDay(payload) {
  const windowSpec = completeWindow(buildShiftWindow(payload));
  const paths = outputPathsForDay(windowSpec);
  const exported = await downloadNativeWmsExport(windowSpec, paths.dir);
  const rawTotals = safeTotalsFromRawWorkbook(exported.filePath);
  const totals = {
    ...rawTotals,
    workHours: payload.workHours === "" || payload.workHours == null ? "" : Number(payload.workHours),
    productivity: productivityFromTotals(rawTotals, payload.workHours),
  };
  return {
    mode: "day",
    window: windowSpec,
    totals,
    files: [exported.filePath],
    primaryFile: exported.filePath,
    folder: paths.dir,
  };
}

export async function exportWeek(payload) {
  const windows = buildWeekWindows(payload);
  const weeklyPaths = outputPathsForWeek(payload.year, payload.week, payload.shift, payload.taskMode);
  const dailyResults = [];
  const allRows = [];
  let header = null;

  for (const windowSpec of windows) {
    const dailyPaths = outputPathsForDay(windowSpec, { year: payload.year, week: payload.week });
    const exported = await downloadNativeWmsExport(windowSpec, dailyPaths.dir);
    const rawRows = readXlsxRows(exported.filePath);
    const headerIndex = rawRows.findIndex((row) => row.some((cell) => isFinishedQtyHeader(cell)));
    const fileHeader = rawRows[headerIndex >= 0 ? headerIndex : 0] || [];
    const fileRows = rawRows.slice((headerIndex >= 0 ? headerIndex : 0) + 1);
    if (!header) header = fileHeader;
    const rowTotals = totalsFromRawWorkbook(exported.filePath);
    dailyResults.push({ window: windowSpec, file: exported.filePath, totals: rowTotals });
    allRows.push(...fileRows);
  }

  const weeklyRows = [header || [], ...allRows];
  const weeklyTotals = await exportWeekWorkbook({
    year: payload.year,
    week: payload.week,
    shift: payload.shift,
    windows,
    dailyResults,
    rows: weeklyRows,
    filePath: weeklyPaths.file,
    workHours: payload.workHours,
  });

  return {
    mode: "week",
    windows,
    totals: weeklyTotals,
    daily: dailyResults.map(({ window, totals }) => ({ window, totals })),
    files: [weeklyPaths.file, ...dailyResults.map((item) => item.file)],
    primaryFile: weeklyPaths.file,
    folder: weeklyPaths.dir,
  };
}
