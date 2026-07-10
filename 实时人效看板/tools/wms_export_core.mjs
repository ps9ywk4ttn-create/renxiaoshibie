import { execFileSync } from "node:child_process";
import { writeFileSync, unlinkSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

export const WMS_EXPORT_ENDPOINT = "/api/v1/supply_chain_wms/pc/export/export_file";
export const WMS_EXPORT_TASK_ENDPOINT = "/api/v1/supply_chain_wms/pc/export/list_task";
export const WMS_EXPORT_TYPE = "biz_task";
export const WMS_PICK_ORDER_EXPORT_TYPE = "outbound_picking_list";
export const WMS_LOCATION_EXPORT_TYPE = "location";
export const WMS_INVENTORY_LOCATION_EXPORT_TYPE = "inventory_location";
export const WMS_PICK_ORDER_PAGE_PATH = "/outbound/pick-management/picking-list-management";
export const WMS_INVENTORY_PAGE_PATH = "/inventory-management/inventory/search";
export const WMS_LOCATION_LIST_ENDPOINT = "/api/v1/supply_chain_wms/pc/base/list_location";
export const WMS_INBOUND_PUTAWAY_TASK_TYPE = "put_away";
export const WMS_TASK_BATCH_ENDPOINT = "/api/v1/supply_chain_wms/pc/base/task/list_task_batch";
export const WMS_PICK_ORDER_STATUS_LIST = [350, 301, 302, 701, 702];
export const WMS_PICK_ORDER_TYPE_LIST = [1, 3, 4, 5, 7, 9, 10];
export const FIXED_UTC_OFFSET_HOURS = -4;
const IDLE_EIGHT_HOUR_SKIP_MINUTES = 90;
const EIGHT_HOUR_SKIP_CUTOFF_HOUR = 2;
const EIGHT_HOUR_SKIP_CUTOFF_MINUTE = 30;
const EIGHT_HOUR_SKIP_START_AFTER_HOUR = 22;
const OVERTIME_OPEN_ORDER_EXCLUDE_MINUTES = 150;
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

export function runSafariJsonRequest(endpoint, body, targetPath = "") {
  const bodyJson = JSON.stringify(body);
  const js = `(()=>{const pageText=document.body.innerText||"";if(pageText.includes("登录已超时")||pageText.includes("请重新登录"))return JSON.stringify({status:0,loginExpired:true,text:"WMS 登录已超时，请先在 Safari 的 WMS 页面重新登录"});const xhr=new XMLHttpRequest();xhr.open('POST','${endpoint}',false);xhr.setRequestHeader('content-type','application/json');xhr.send(${JSON.stringify(bodyJson)});return JSON.stringify({status:xhr.status,text:xhr.responseText});})()`;
  const openPickOrderJs = `(()=>{const isVisible=(el)=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0};const isPick=(el)=>(el.innerText||el.textContent||"").trim()==="拣选单";const el=[...document.querySelectorAll("div,span,a,li,p,button")].find((item)=>isPick(item)&&isVisible(item));if(!el)return JSON.stringify({clicked:false,url:location.href,title:document.title});el.click();return JSON.stringify({clicked:true,url:location.href,title:document.title});})()`;
  const targetFirstScript = targetPath ? `
  repeat with w in windows
    repeat with t in tabs of w
      if ((URL of t) as string) contains "wms-ttp.tiktokw.us" and ((URL of t) as string) contains ${JSON.stringify(targetPath)} then
        return do JavaScript ${JSON.stringify(js)} in t
      end if
    end repeat
  end repeat
  repeat with w in windows
    repeat with t in tabs of w
      if ((URL of t) as string) contains "wms-ttp.tiktokw.us" then
        do JavaScript ${JSON.stringify(openPickOrderJs)} in t
        delay 1
        if ((URL of t) as string) contains ${JSON.stringify(targetPath)} then
          return do JavaScript ${JSON.stringify(js)} in t
        end if
      end if
    end repeat
  end repeat
  error "Safari 里没有找到 WMS 拣选单页面，请先打开 出库管理 > 拣选单"` : `
  repeat with w in windows
    repeat with t in tabs of w
      if ((URL of t) as string) contains "wms-ttp.tiktokw.us" then
        return do JavaScript ${JSON.stringify(js)} in t
      end if
    end repeat
  end repeat
  error "Safari 里没有找到已登录的 WMS 标签页"`;
  const appleScript = `with timeout of 30 seconds
tell application "Safari"
${targetFirstScript}
end tell
end timeout`;
  const out = execFileSync("osascript", ["-e", appleScript], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 80,
  }).trim();
  const response = JSON.parse(out);
  if (response.loginExpired) {
    throw new Error(response.text || "WMS 登录已超时，请先在 Safari 的 WMS 页面重新登录");
  }
  if (response.status !== 200) {
    throw new Error(`WMS request failed: HTTP ${response.status} ${response.text.slice(0, 500)}`);
  }
  const parsed = JSON.parse(response.text);
  if (parsed.code !== 0) {
    if (Number(parsed.code) === 10000 && String(parsed.msg || "").toLowerCase().includes("permission")) {
      throw new Error("WMS 返回无权限：已尝试切到拣选单页面，请确认当前账号有“拣选单导出”权限");
    }
    throw new Error(`WMS API returned code ${parsed.code}: ${response.text.slice(0, 500)}`);
  }
  return parsed;
}

export function runSafariJsonRequestInWmsPage(endpoint, body, targetPath = "", missingMessage = "Safari 里没有找到已登录的 WMS 标签页") {
  const bodyJson = JSON.stringify(body);
  const js = `(()=>{const pageText=document.body.innerText||"";if(pageText.includes("登录已超时")||pageText.includes("请重新登录"))return JSON.stringify({status:0,loginExpired:true,text:"WMS 登录已超时，请先在 Safari 的 WMS 页面重新登录"});const xhr=new XMLHttpRequest();xhr.open('POST','${endpoint}',false);xhr.setRequestHeader('content-type','application/json');xhr.send(${JSON.stringify(bodyJson)});return JSON.stringify({status:xhr.status,text:xhr.responseText});})()`;
  const targetScript = targetPath ? `
  repeat with w in windows
    repeat with t in tabs of w
      if ((URL of t) as string) contains "wms-ttp.tiktokw.us" and ((URL of t) as string) contains ${JSON.stringify(targetPath)} then
        return do JavaScript ${JSON.stringify(js)} in t
      end if
    end repeat
  end repeat
  error ${JSON.stringify(missingMessage)}` : `
  repeat with w in windows
    repeat with t in tabs of w
      if ((URL of t) as string) contains "wms-ttp.tiktokw.us" then
        return do JavaScript ${JSON.stringify(js)} in t
      end if
    end repeat
  end repeat
  error ${JSON.stringify(missingMessage)}`;
  const appleScript = `with timeout of 30 seconds
tell application "Safari"
${targetScript}
end tell
end timeout`;
  const out = execFileSync("osascript", ["-e", appleScript], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 80,
  }).trim();
  const response = JSON.parse(out);
  if (response.loginExpired) {
    throw new Error(response.text || "WMS 登录已超时，请先在 Safari 的 WMS 页面重新登录");
  }
  if (response.status !== 200) {
    throw new Error(`WMS request failed: HTTP ${response.status} ${response.text.slice(0, 500)}`);
  }
  const parsed = JSON.parse(response.text);
  if (parsed.code !== 0) {
    throw new Error(`WMS API returned code ${parsed.code}: ${response.text.slice(0, 500)}`);
  }
  return parsed;
}

const WMS_INVENTORY_CAPTURE_KEY = "__realtime_efficiency_inventory_request__";
const WMS_INVENTORY_LIST_ENDPOINT = "/api/v1/supply_chain_wms/pc/base/inventory/list_inventory";
const WMS_PRODUCT_LIST_ENDPOINT = "/api/v1/supply_chain_wms/pc/base/list_goods_info";
const WMS_WAYBILL_LIST_ENDPOINT = "/api/v1/supply_chain_wms/pc/outbound/list_consignment_outbound_order";
const WMS_WAYBILL_DETAIL_ENDPOINT = "/api/v1/supply_chain_wms/pc/outbound/get_consignment_outbound_order_detail";
const WMS_PRODUCT_BARCODE_LOOKUP_KEYS = [
  "goods_barcode_list",
  "barcode_list",
  "bar_code_list",
  "goods_barcode",
  "barcode",
];

function appleScriptStringAssignments(name, value) {
  const chunks = String(value).match(/[\s\S]{1,700}/g) || [""];
  return chunks.map((chunk, index) => {
    const op = index === 0 ? `set ${name} to` : `set ${name} to ${name} &`;
    return `${op} ${JSON.stringify(chunk)}`;
  }).join("\n");
}

function runSafariInventoryPageScript(js, missingMessage = "Safari 里没有找到已登录的 WMS 页面") {
  const tmpScriptPath = path.join("/tmp", `wms-inventory-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}.applescript`);
  const tmpJsPath = path.join("/tmp", `wms-inventory-js-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}.js`);
  const appleScript = `with timeout of 30 seconds
set js to do shell script ("cat " & quoted form of ${JSON.stringify(tmpJsPath)})
tell application "Safari"
  repeat with w in windows
    repeat with t in tabs of w
      if ((URL of t) as string) contains "wms-ttp.tiktokw.us" then
        return do JavaScript js in t
      end if
    end repeat
  end repeat
  error ${JSON.stringify(missingMessage)}
end tell
end timeout`;
  writeFileSync(tmpJsPath, String(js), "utf8");
  writeFileSync(tmpScriptPath, appleScript, "utf8");
  try {
    return execFileSync("osascript", [tmpScriptPath], {
      encoding: "utf8",
      maxBuffer: 1024 * 1024 * 80,
      timeout: 30 * 1000,
    }).trim();
  } finally {
    try {
      unlinkSync(tmpScriptPath);
    } catch {
      // best effort cleanup
    }
    try {
      unlinkSync(tmpJsPath);
    } catch {
      // best effort cleanup
    }
  }
}

function runSafariWmsJsonPost(endpoint, body, missingMessage) {
  const bodyText = JSON.stringify(body);
  const js = `(()=>{const pageText=document.body.innerText||"";if(pageText.includes("登录已超时")||pageText.includes("请重新登录"))return JSON.stringify({status:0,loginExpired:true,text:"WMS 登录已超时，请先在 Safari 的 WMS 页面重新登录"});const xhr=new XMLHttpRequest();xhr.open("POST",${JSON.stringify(endpoint)},false);xhr.setRequestHeader("content-type","application/json");xhr.send(${JSON.stringify(bodyText)});return JSON.stringify({status:xhr.status,text:xhr.responseText});})()`;
  const response = JSON.parse(runSafariInventoryPageScript(js, missingMessage));
  if (response.loginExpired) throw new Error(response.text || "WMS 登录已超时，请先在 Safari 的 WMS 页面重新登录");
  return response;
}

function parseWmsJsonResponse(response, label) {
  if (response.status !== 200) throw new Error(`WMS ${label}失败：HTTP ${response.status}`);
  const parsed = JSON.parse(response.text);
  if (parsed.code !== 0) throw new Error(parsed.msg || `WMS ${label}失败：code ${parsed.code}`);
  return parsed;
}

function findSuccessfulWmsPost(candidates, label, missingMessage = "Safari 里没有找到已登录的 WMS 页面") {
  const errors = [];
  for (const candidate of candidates) {
    try {
      const response = runSafariWmsJsonPost(candidate.endpoint, candidate.body, missingMessage);
      try {
        return {
          parsed: parseWmsJsonResponse(response, label),
          endpoint: candidate.endpoint,
          requestBody: candidate.body,
        };
      } catch (error) {
        errors.push(`${candidate.endpoint}: ${error.message}`);
      }
    } catch (error) {
      errors.push(`${candidate.endpoint}: ${error.message}`);
    }
  }
  throw new Error(`WMS ${label}接口暂未匹配成功：${errors.join("；")}`);
}

function queryOpenWmsProductInfoByBody(value, body, { requireBarcodeMatch = false, lookupSource = "" } = {}) {
  try {
    const bodyText = JSON.stringify(body);
    const js = `(()=>{const key=${JSON.stringify(WMS_INVENTORY_CAPTURE_KEY)};const previous=localStorage.getItem(key)||"";const pageText=document.body.innerText||"";if(pageText.includes("登录已超时")||pageText.includes("请重新登录"))return JSON.stringify({status:0,loginExpired:true,text:"WMS 登录已超时，请先在 Safari 的 WMS 页面重新登录"});const xhr=new XMLHttpRequest();xhr.open("POST",${JSON.stringify(WMS_PRODUCT_LIST_ENDPOINT)},false);xhr.setRequestHeader("content-type","application/json");xhr.send(${JSON.stringify(bodyText)});if(previous)localStorage.setItem(key,previous);else localStorage.removeItem(key);return JSON.stringify({status:xhr.status,text:xhr.responseText});})()`;
    const response = JSON.parse(runSafariInventoryPageScript(js));
    if (response.status !== 200) return null;
    const parsed = JSON.parse(response.text);
    if (parsed.code !== 0) return null;
    const goodsList = Array.isArray(parsed?.data?.goods_list) ? parsed.data.goods_list : [];
    const goods = requireBarcodeMatch
      ? goodsList.find((item) => productInfoHasBarcode(item, value))
      : goodsList[0];
    if (!goods) return null;
    return {
      ...normalizeWmsProductInfo(goods),
      lookupSource,
      lookupValue: String(value || "").trim(),
      requestBody: body,
    };
  } catch {
    return null;
  }
}

function queryOpenWmsProductInfoByBarcode(value) {
  for (const key of WMS_PRODUCT_BARCODE_LOOKUP_KEYS) {
    const requestValue = key.endsWith("_list") ? [value] : value;
    const product = queryOpenWmsProductInfoByBody(value, {
      [key]: requestValue,
      pagination: { page: 1, size: 20 },
    }, {
      requireBarcodeMatch: true,
      lookupSource: key,
    });
    if (product) return product;
  }
  return null;
}

function hasProductDisplayData(product) {
  return Boolean(product?.imageUrl || product?.barcodes?.length);
}

function queryOpenWmsProductInfo(sku) {
  const value = String(sku || "").trim();
  if (!value) return null;
  const byGoodsCode = queryOpenWmsProductInfoByBody(value, {
    goods_code_list: [value],
    pagination: { page: 1, size: 20 },
  }, {
    lookupSource: "goods_code_list",
  });
  if (hasProductDisplayData(byGoodsCode)) return byGoodsCode;
  return queryOpenWmsProductInfoByBarcode(value) || byGoodsCode;
}

function productInfoBarcodeValues(goods) {
  const result = [];
  const add = (value) => {
    const code = String(value || "").trim();
    if (code) result.push(code);
  };
  add(goods?.goods_barcode);
  add(goods?.barcode);
  add(goods?.bar_code);
  for (const item of goods?.barcode_info_list || []) add(item?.barcode);
  for (const item of goods?.whc_barcode_info_list || []) add(item?.barcode);
  return result.flatMap((value) => String(value).split(",").map((code) => code.trim()).filter(Boolean));
}

function productInfoHasBarcode(goods, barcode) {
  const target = String(barcode || "").trim().toUpperCase();
  if (!target) return false;
  return productInfoBarcodeValues(goods).some((value) => value.toUpperCase() === target);
}

function normalizeWmsProductInfo(goods) {
  const barcodes = [];
  const seen = new Set();
  const addBarcode = (type, code) => {
    const value = String(code || "").trim();
    if (!value || seen.has(value)) return;
    seen.add(value);
    barcodes.push({ type, code: value });
  };
  addBarcode("FBT商品ID", goods.goods_id);
  for (const item of goods.barcode_info_list || []) {
    addBarcode(barcodeTypeLabel(item.barcode_type), item.barcode);
  }
  for (const item of goods.whc_barcode_info_list || []) {
    addBarcode(barcodeTypeLabel(item.barcode_type, "仓采集条码"), item.barcode);
  }
  if (barcodes.length <= 1) {
    for (const code of String(goods.goods_barcode || "").split(",")) {
      addBarcode("货品条码", code);
    }
  }
  return {
    imageUrl: goods.picture || goods.appearance_picture || goods.measurement_picture || "",
    barcodes,
    goodsName: goods.goods_name || "",
  };
}

function barcodeTypeLabel(type, fallback = "货品条码") {
  return ({
    1: "GTIN",
    2: "UPC",
    3: "GTIN",
    4: "仓采集条码",
    5: "货品条码",
    6: "FBT商品ID",
  })[Number(type)] || fallback;
}

function queryDirectWmsInventoryBySku(sku) {
  const bodyText = JSON.stringify({ item_code_list: [sku], pagination: { page: 1, size: 200 } });
  const js = `(()=>{const pageText=document.body.innerText||"";if(pageText.includes("登录已超时")||pageText.includes("请重新登录"))return JSON.stringify({status:0,loginExpired:true,text:"WMS 登录已超时，请先在 Safari 的 WMS 页面重新登录"});const xhr=new XMLHttpRequest();xhr.open("POST",${JSON.stringify(WMS_INVENTORY_LIST_ENDPOINT)},false);xhr.setRequestHeader("content-type","application/json");xhr.send(${JSON.stringify(bodyText)});return JSON.stringify({status:xhr.status,text:xhr.responseText});})()`;
  const response = JSON.parse(runSafariInventoryPageScript(js));
  if (response.loginExpired) throw new Error(response.text || "WMS 登录已超时，请先在 Safari 的 WMS 页面重新登录");
  if (response.status !== 200) throw new Error(`WMS 库存查询失败：HTTP ${response.status}`);
  const parsed = JSON.parse(response.text);
  if (parsed.code !== 0) throw new Error(parsed.msg || `WMS 库存查询失败：code ${parsed.code}`);
  return parsed;
}

function queryDirectWmsInventoryByLocation(locationCode) {
  const bodyText = JSON.stringify({ inventory_location_code_list: [locationCode], pagination: { page: 1, size: 200 } });
  const js = `(()=>{const pageText=document.body.innerText||"";if(pageText.includes("登录已超时")||pageText.includes("请重新登录"))return JSON.stringify({status:0,loginExpired:true,text:"WMS 登录已超时，请先在 Safari 的 WMS 页面重新登录"});const xhr=new XMLHttpRequest();xhr.open("POST",${JSON.stringify(WMS_INVENTORY_LIST_ENDPOINT)},false);xhr.setRequestHeader("content-type","application/json");xhr.send(${JSON.stringify(bodyText)});return JSON.stringify({status:xhr.status,text:xhr.responseText});})()`;
  const response = JSON.parse(runSafariInventoryPageScript(js));
  if (response.loginExpired) throw new Error(response.text || "WMS 登录已超时，请先在 Safari 的 WMS 页面重新登录");
  if (response.status !== 200) throw new Error(`WMS 库位查询失败：HTTP ${response.status}`);
  const parsed = JSON.parse(response.text);
  if (parsed.code !== 0) throw new Error(parsed.msg || `WMS 库位查询失败：code ${parsed.code}`);
  return parsed;
}

function queryDirectWmsWaybill(waybill) {
  const baseBody = { pagination: { page: 1, size: 20 }, without_detail: false };
  const candidates = [
    { tracking_nos: [waybill] },
    { original_tracking_nos: [waybill] },
  ].map((body) => ({ ...body, ...baseBody }));
  const errors = [];
  let firstSuccess = null;
  for (const requestBody of candidates) {
    try {
      const bodyText = JSON.stringify(requestBody);
      const js = `(()=>{const pageText=document.body.innerText||"";if(pageText.includes("登录已超时")||pageText.includes("请重新登录"))return JSON.stringify({status:0,loginExpired:true,text:"WMS 登录已超时，请先在 Safari 的 WMS 页面重新登录"});const xhr=new XMLHttpRequest();xhr.open("POST",${JSON.stringify(WMS_WAYBILL_LIST_ENDPOINT)},false);xhr.setRequestHeader("content-type","application/json");xhr.send(${JSON.stringify(bodyText)});return JSON.stringify({status:xhr.status,text:xhr.responseText});})()`;
      const response = JSON.parse(runSafariInventoryPageScript(js));
      if (response.loginExpired) throw new Error(response.text || "WMS 登录已超时，请先在 Safari 的 WMS 页面重新登录");
      if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
      const parsed = JSON.parse(response.text);
      if (parsed.code !== 0) throw new Error(parsed.msg || `code ${parsed.code}`);
      const rows = firstObjectArray(parsed?.data ?? parsed) || [];
      const total = firstTotal(parsed?.data ?? parsed);
      if (rows.length && Number(total) > baseBody.pagination.size) throw new Error("WMS 返回全量结果，已拦截无效面单字段");
      const result = { parsed, requestBody };
      if (!firstSuccess) firstSuccess = result;
      if (rows.length) return result;
    } catch (error) {
      errors.push(error.message || String(error));
    }
  }
  if (firstSuccess) return firstSuccess;
  throw new Error(`WMS 面单查询失败：${errors[0] || "未知错误"}`);
}

function extractWmsField(row, keys) {
  if (!row || typeof row !== "object") return "";
  for (const key of keys) {
    const value = row[key];
    if (value != null && value !== "") return String(value).trim();
  }
  const normalized = Object.fromEntries(Object.entries(row).map(([key, value]) => [key.toLowerCase().replaceAll("_", ""), value]));
  for (const key of keys) {
    const value = normalized[key.toLowerCase().replaceAll("_", "")];
    if (value != null && value !== "") return String(value).trim();
  }
  return "";
}

function queryDirectWmsWaybillDetail(orderRow) {
  const consignmentOrderNo = extractWmsField(orderRow, [
    "consignment_order_no",
    "consignmentOrderNo",
    "consignment_outbound_order_no",
    "consignmentOutboundOrderNo",
    "consign_order_no",
    "consignOrderNo",
    "outbound_order_no",
    "outboundOrderNo",
    "order_no",
    "orderNo",
  ]);
  if (!consignmentOrderNo) throw new Error("WMS 面单查询失败：没有识别到交易发货单号");
  const requestBody = { consignment_order_no: consignmentOrderNo };
  const warehouseCode = extractWmsField(orderRow, ["warehouse_code", "warehouseCode"]);
  if (warehouseCode) requestBody.warehouse_code = warehouseCode;
  const bodyText = JSON.stringify(requestBody);
  const js = `(()=>{const pageText=document.body.innerText||"";if(pageText.includes("登录已超时")||pageText.includes("请重新登录"))return JSON.stringify({status:0,loginExpired:true,text:"WMS 登录已超时，请先在 Safari 的 WMS 页面重新登录"});const xhr=new XMLHttpRequest();xhr.open("POST",${JSON.stringify(WMS_WAYBILL_DETAIL_ENDPOINT)},false);xhr.setRequestHeader("content-type","application/json");xhr.send(${JSON.stringify(bodyText)});return JSON.stringify({status:xhr.status,text:xhr.responseText});})()`;
  const response = JSON.parse(runSafariInventoryPageScript(js));
  if (response.loginExpired) throw new Error(response.text || "WMS 登录已超时，请先在 Safari 的 WMS 页面重新登录");
  if (response.status !== 200) throw new Error(`WMS 面单详情查询失败：HTTP ${response.status}`);
  const parsed = JSON.parse(response.text);
  if (parsed.code !== 0) throw new Error(parsed.msg || `WMS 面单详情查询失败：code ${parsed.code}`);
  return { parsed, requestBody, consignmentOrderNo };
}

function installWmsInventoryCapture() {
  const js = `(()=>{const key=${JSON.stringify(WMS_INVENTORY_CAPTURE_KEY)};const version="2026-06-19-product-info";if(window.__realtimeEfficiencyInventoryCaptureInstalled&&window.__realtimeEfficiencyInventoryCaptureVersion===version)return JSON.stringify({installed:true,hasTemplate:!!localStorage.getItem(key)});window.__realtimeEfficiencyInventoryCaptureInstalled=true;window.__realtimeEfficiencyInventoryCaptureVersion=version;const isInventory=(url,body,response)=>{const u=String(url||"").toLowerCase();if(!u.includes("/api/"))return false;if(u.includes("list_goods_info")||u.includes("search_template")||u.includes("/export/")||u.includes("/config/"))return false;const text=[url,body,response].map(v=>String(v||"")).join(" ").toLowerCase();return u.includes("inventory")||u.includes("stock")||text.includes("库存");};const inputValues=()=>[...document.querySelectorAll("input,textarea")].map(el=>String(el.value||"").trim()).filter(Boolean);const remember=(item)=>{try{localStorage.setItem(key,JSON.stringify({...item,inputValues:inputValues(),capturedAt:new Date().toISOString(),pageUrl:location.href,title:document.title}));}catch(e){}};const NativeXHR=window.XMLHttpRequest;function WrappedXHR(){const xhr=new NativeXHR();let method="GET";let url="";let body="";const open=xhr.open;xhr.open=function(m,u,...rest){method=m||"GET";url=String(u||"");return open.call(xhr,m,u,...rest)};const send=xhr.send;xhr.send=function(payload){body=payload==null?"":String(payload);xhr.addEventListener("loadend",()=>{const response=String(xhr.responseText||"");if(xhr.status>=200&&xhr.status<300&&isInventory(url,body,response))remember({kind:"xhr",method,url,body,status:xhr.status,response:response.slice(0,2000)});});return send.call(xhr,payload)};return xhr}window.XMLHttpRequest=WrappedXHR;const nativeFetch=window.fetch;if(nativeFetch){window.fetch=async function(input,init={}){const url=typeof input==="string"?input:String(input&&input.url||"");const method=String(init&&init.method||"GET");const body=init&&init.body==null?"":String(init.body||"");const res=await nativeFetch.apply(this,arguments);try{const clone=res.clone();const text=await clone.text();if(res.status>=200&&res.status<300&&isInventory(url,body,text))remember({kind:"fetch",method,url,body,status:res.status,response:text.slice(0,2000)});}catch(e){}return res}}return JSON.stringify({installed:true,hasTemplate:!!localStorage.getItem(key)});})()`;
  return JSON.parse(runSafariInventoryPageScript(js));
}

function readWmsInventoryTemplate() {
  const js = `JSON.stringify({template:localStorage.getItem(${JSON.stringify(WMS_INVENTORY_CAPTURE_KEY)})||""})`;
  const response = JSON.parse(runSafariInventoryPageScript(js));
  const template = response.template ? JSON.parse(response.template) : null;
  if (!isCapturedInventoryTemplate(template)) return null;
  return template;
}

function isCapturedInventoryTemplate(template) {
  const url = String(template?.url || "").toLowerCase();
  const body = String(template?.body || "").toLowerCase();
  if (!url.includes("/api/")) return false;
  if (url.includes("list_goods_info") || url.includes("search_template") || url.includes("/export/") || url.includes("/config/")) return false;
  return url.includes("inventory") || url.includes("stock") || body.includes("inventory") || body.includes("stock") || body.includes("库存");
}

function replaceCapturedSku(value, sku, capturedValues) {
  if (typeof value === "string") {
    return capturedValues.has(value.trim()) ? sku : value;
  }
  if (Array.isArray(value)) return value.map((item) => replaceCapturedSku(item, sku, capturedValues));
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => {
    const keyLooksLikeSku = /sku|goods|product|barcode|code|货品|条码/i.test(key);
    if (keyLooksLikeSku && typeof item === "string") return [key, sku];
    if (keyLooksLikeSku && Array.isArray(item) && item.every((v) => typeof v === "string")) return [key, [sku]];
    return [key, replaceCapturedSku(item, sku, capturedValues)];
  }));
}

function buildInventoryRequestFromTemplate(template, sku) {
  const capturedValues = new Set((template.inputValues || []).map((value) => String(value || "").trim()).filter(Boolean));
  let bodyText = template.body || "";
  try {
    const parsed = JSON.parse(bodyText);
    bodyText = JSON.stringify(replaceCapturedSku(parsed, sku, capturedValues));
  } catch {
    for (const value of capturedValues) {
      bodyText = bodyText.split(value).join(sku);
    }
  }
  let url = template.url || "";
  for (const value of capturedValues) {
    url = url.split(encodeURIComponent(value)).join(encodeURIComponent(sku)).split(value).join(sku);
  }
  return { method: template.method || "POST", url, bodyText };
}

function runCapturedWmsRequest(request) {
  const js = `(()=>{const pageText=document.body.innerText||"";if(pageText.includes("登录已超时")||pageText.includes("请重新登录"))return JSON.stringify({status:0,loginExpired:true,text:"WMS 登录已超时，请先在 Safari 的 WMS 页面重新登录"});const xhr=new XMLHttpRequest();xhr.open(${JSON.stringify(request.method)},${JSON.stringify(request.url)},false);if(${JSON.stringify(request.bodyText)}!=="")xhr.setRequestHeader("content-type","application/json");xhr.send(${JSON.stringify(request.bodyText)}||null);return JSON.stringify({status:xhr.status,text:xhr.responseText});})()`;
  const response = JSON.parse(runSafariInventoryPageScript(js));
  if (response.loginExpired) throw new Error(response.text || "WMS 登录已超时，请先在 Safari 的 WMS 页面重新登录");
  if (response.status !== 200) throw new Error(`WMS 库存查询失败：HTTP ${response.status}`);
  const parsed = JSON.parse(response.text);
  if (parsed.code !== 0) throw new Error(parsed.msg || `WMS 库存查询失败：code ${parsed.code}`);
  return parsed;
}

function firstObjectArray(value) {
  if (!value || typeof value !== "object") return null;
  if (Array.isArray(value)) {
    return value.every((item) => item && typeof item === "object" && !Array.isArray(item)) ? value : null;
  }
  const preferredKeys = [
    "inventory_list",
    "inventoryList",
    "inventory",
    "stock_list",
    "stockList",
    "list",
    "items",
    "rows",
    "records",
    "data_list",
    "dataList",
  ];
  for (const key of preferredKeys) {
    const rows = firstObjectArray(value[key]);
    if (rows) return rows;
  }
  for (const child of Object.values(value)) {
    const rows = firstObjectArray(child);
    if (rows) return rows;
  }
  return null;
}

function firstTotal(value) {
  if (!value || typeof value !== "object") return "";
  for (const key of ["total", "total_count", "totalCount", "count"]) {
    const total = Number(value[key]);
    if (Number.isFinite(total)) return total;
  }
  for (const child of Object.values(value)) {
    const total = firstTotal(child);
    if (total !== "") return total;
  }
  return "";
}

function looksLikeWaybillDetailRow(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) return false;
  return [
    "item_code",
    "itemCode",
    "goods_code",
    "goodsCode",
    "sku",
    "sku_id",
    "skuId",
    "item_barcode",
    "itemBarcode",
    "item_bar_code",
    "itemBarCode",
    "barcode",
    "bar_code",
    "barCode",
    "goods_barcode",
    "goodsBarcode",
    "goods_name",
    "goodsName",
    "item_name",
    "itemName",
    "quantity",
    "qty",
    "goods_count",
    "goodsCount",
    "item_qty",
    "itemQty",
    "delivery_qty",
    "deliveryQty",
    "shipped_qty",
    "shippedQty",
  ].some((key) => row[key] != null && row[key] !== "");
}

function firstWaybillDetailRows(value) {
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value)) {
    const rows = value.filter(looksLikeWaybillDetailRow);
    return rows.length ? rows : [];
  }
  const preferredKeys = [
    "detail_list",
    "detailList",
    "outbound_order_detail_list",
    "outboundOrderDetailList",
    "consignment_outbound_detail_list",
    "consignmentOutboundDetailList",
    "outbound_detail_list",
    "outboundDetailList",
    "order_detail_list",
    "orderDetailList",
    "goods_detail_list",
    "goodsDetailList",
    "goods_list",
    "goodsList",
    "item_list",
    "itemList",
    "items",
    "list",
    "rows",
    "records",
  ];
  for (const key of preferredKeys) {
    const rows = firstWaybillDetailRows(value[key]);
    if (rows.length) return rows;
  }
  for (const child of Object.values(value)) {
    const rows = firstWaybillDetailRows(child);
    if (rows.length) return rows;
  }
  return [];
}

export function queryWmsInventoryBySku(sku) {
  const value = String(sku || "").trim();
  if (!value) throw new Error("请输入 SKU");
  const response = queryDirectWmsInventoryBySku(value);
  const data = response?.data ?? response;
  const rows = firstObjectArray(data);
  if (!rows) {
    throw new Error("WMS 返回了结果，但没有识别到库存列表");
  }
  return {
    sku: value,
    endpoint: WMS_INVENTORY_LIST_ENDPOINT,
    total: firstTotal(data),
    rows,
    product: queryOpenWmsProductInfo(value),
    rawData: data,
  };
}

export function queryWmsInventoryByLocation(locationCode) {
  const value = String(locationCode || "").trim().toUpperCase();
  if (!value || value === "CPE-") throw new Error("请输入库位");
  const response = queryDirectWmsInventoryByLocation(value);
  const data = response?.data ?? response;
  const rows = firstObjectArray(data);
  if (!rows) {
    throw new Error("WMS 返回了结果，但没有识别到库位库存列表");
  }
  return {
    location: value,
    endpoint: WMS_INVENTORY_LIST_ENDPOINT,
    requestBody: { inventory_location_code_list: [value], pagination: { page: 1, size: 200 } },
    total: firstTotal(data),
    rows,
    rawData: data,
  };
}

export function queryWmsWaybill(waybill) {
  const value = String(waybill || "").trim();
  if (!value) throw new Error("请输入面单号");
  const { parsed, requestBody } = queryDirectWmsWaybill(value);
  const listData = parsed?.data ?? parsed;
  const orderRows = firstObjectArray(listData) || [];
  const orderRow = orderRows[0] || null;
  if (!orderRow) {
    return {
      waybill: value,
      endpoint: WMS_WAYBILL_LIST_ENDPOINT,
      requestBody,
      total: 0,
      rows: [],
      orderRows,
      rawData: listData,
    };
  }
  const detail = queryDirectWmsWaybillDetail(orderRow);
  const detailData = detail.parsed?.data ?? detail.parsed;
  const detailRows = firstWaybillDetailRows(detailData);
  return {
    waybill: value,
    endpoint: WMS_WAYBILL_DETAIL_ENDPOINT,
    requestBody: detail.requestBody,
    listEndpoint: WMS_WAYBILL_LIST_ENDPOINT,
    listRequestBody: requestBody,
    consignmentOrderNo: detail.consignmentOrderNo,
    order: orderRow,
    orderRows,
    total: detailRows.length,
    rows: detailRows,
    detailRows,
    rawData: detailData,
    listRawData: listData,
  };
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

export function buildWmsPickOrderRequest(windowSpec) {
  return {
    pick_order_status: WMS_PICK_ORDER_STATUS_LIST,
    create_time: {
      start_time: windowSpec.startEpoch,
      end_time: windowSpec.endEpoch,
    },
    pick_order_type_list: WMS_PICK_ORDER_TYPE_LIST,
    zone_pick_moding_list: [1],
  };
}

export function buildInboundPutawayTaskRequest(windowSpec) {
  return {
    cond: {
      task_type_list: [WMS_INBOUND_PUTAWAY_TASK_TYPE],
      create_time_range: {
        start_time: windowSpec.startEpoch,
        end_time: windowSpec.endEpoch,
      },
    },
    pagination: {
      page: 1,
      size: 20,
    },
  };
}

export function normalizeWmsLocationZones(zones) {
  const seen = new Set();
  return (Array.isArray(zones) ? zones : [zones])
    .map((zone) => String(zone || "").trim())
    .filter((zone) => {
      if (!zone || seen.has(zone)) return false;
      seen.add(zone);
      return true;
    });
}

export function buildWmsLocationRequest(zones, pageSize = 20) {
  const zoneList = normalizeWmsLocationZones(zones);
  if (!zoneList.length) throw new Error("请先选择库区");
  return {
    zone_code_list: zoneList,
    pagination: {
      page: 1,
      size: pageSize,
    },
  };
}

export function buildWmsInventoryLocationRequest(zones, pageSize = 20) {
  const zoneList = normalizeWmsLocationZones(zones);
  if (!zoneList.length) throw new Error("请先选择库区");
  return {
    query_type: 1,
    inventory_zone_code_list: zoneList,
    pagination: {
      page: 1,
      size: pageSize,
    },
  };
}

export function queryWmsLocationListByZones(zones, pageSize = 3) {
  const request = buildWmsLocationRequest(zones, pageSize);
  const response = runSafariJsonRequestInWmsPage(WMS_LOCATION_LIST_ENDPOINT, request);
  const data = response?.data ?? response;
  const rows = data?.location_list || data?.list || data?.items || [];
  const total = Number(data?.pagination?.total_count ?? data?.pagination?.total ?? data?.total ?? rows.length);
  return {
    request,
    rows,
    total: Number.isFinite(total) ? total : rows.length,
  };
}

export function queryWmsInventoryLocationListByZones(zones, pageSize = 3) {
  const request = buildWmsInventoryLocationRequest(zones, pageSize);
  const response = runSafariJsonRequestInWmsPage(WMS_INVENTORY_LIST_ENDPOINT, request);
  const data = response?.data ?? response;
  const rows = data?.inventory_list || data?.list || data?.items || [];
  const total = Number(data?.pagination?.total_count ?? data?.pagination?.total ?? data?.total ?? rows.length);
  return {
    request,
    rows,
    total: Number.isFinite(total) ? total : rows.length,
  };
}

export function queryInboundPutawayTaskList(windowSpec, pageSize = 3) {
  const request = buildInboundPutawayTaskRequest(windowSpec);
  request.pagination = { page: 1, size: pageSize };
  const response = runSafariJsonRequest(WMS_TASK_BATCH_ENDPOINT, request);
  const data = response?.data ?? response;
  const rows = data?.task_batch_list || [];
  const total = Number(data?.pagination?.total_count ?? data?.pagination?.total ?? data?.total ?? rows.length);
  return {
    request,
    rows,
    total: Number.isFinite(total) ? total : rows.length,
  };
}

export function listInboundPutawayTaskRows(windowSpec) {
  const pageSize = 200;
  const rows = [];
  let total = 0;
  for (let page = 1; page <= 200; page += 1) {
    const request = buildInboundPutawayTaskRequest(windowSpec);
    request.pagination = { page, size: pageSize };
    const response = runSafariJsonRequest(WMS_TASK_BATCH_ENDPOINT, request);
    const data = response?.data ?? response;
    const pageRows = data?.task_batch_list || [];
    total = Number(data?.pagination?.total_count ?? data?.pagination?.total ?? data?.total ?? total);
    rows.push(...pageRows);
    if (!pageRows.length || pageRows.length < pageSize || (total && rows.length >= total)) break;
  }
  return {
    rows,
    total: Number.isFinite(total) && total ? total : rows.length,
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

async function listRecentExportTasks(exportType, targetPath = "") {
  const response = runSafariJsonRequest(WMS_EXPORT_TASK_ENDPOINT, {
    type_list: [exportType],
    pagination: { page: 1, size: 20 },
  }, targetPath);
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

async function downloadWmsExport(exportType, listReq, outputDir) {
  const targetPath = exportType === WMS_PICK_ORDER_EXPORT_TYPE ? WMS_PICK_ORDER_PAGE_PATH : "";
  const exportResponse = runSafariJsonRequest(WMS_EXPORT_ENDPOINT, {
    export_type: exportType,
    list_req_json: JSON.stringify(listReq),
  }, targetPath);
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
    const tasks = await listRecentExportTasks(exportType, targetPath);
    task = tasks.find((item) => sameExportTask(item, task)) || task;
  }

  const fileName = originalTaskFileName(task);
  const filePath = path.join(outputDir, fileName);
  await downloadUrlToFile(task.url, filePath);
  return { task, fileName, filePath };
}

export async function downloadNativeWmsExport(windowSpec, outputDir) {
  return downloadWmsExport(WMS_EXPORT_TYPE, buildWmsTaskRequest(windowSpec), outputDir);
}

export async function downloadNativeWmsPickOrderExport(windowSpec, outputDir) {
  return downloadWmsExport(WMS_PICK_ORDER_EXPORT_TYPE, buildWmsPickOrderRequest(windowSpec), outputDir);
}

export async function downloadWmsLocationExport(zones, outputDir) {
  const preview = queryWmsLocationListByZones(zones);
  const exported = await downloadWmsExport(WMS_LOCATION_EXPORT_TYPE, buildWmsLocationRequest(zones), outputDir);
  return { ...exported, preview };
}

export async function downloadWmsInventoryLocationExport(zones, outputDir) {
  const preview = queryWmsInventoryLocationListByZones(zones);
  const exported = await downloadWmsExport(WMS_INVENTORY_LOCATION_EXPORT_TYPE, buildWmsInventoryLocationRequest(zones), outputDir);
  return { ...exported, preview };
}

export async function downloadInboundPutawayTaskExport(windowSpec, outputDir) {
  const preview = queryInboundPutawayTaskList(windowSpec);
  const exported = await downloadWmsExport(WMS_EXPORT_TYPE, buildInboundPutawayTaskRequest(windowSpec), outputDir);
  const summary = inboundTaskSummaryFromRawWorkbook(exported.filePath);
  return { ...exported, preview, summary };
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

function normalizeHeaderCell(value) {
  return String(value ?? "").trim().toLowerCase().replace(/[\s_:\-：（）(),，/]+/g, "");
}

function findHeaderColumn(header, names) {
  const targets = names.map(normalizeHeaderCell);
  return header.findIndex((cell) => targets.includes(normalizeHeaderCell(cell)));
}

function requiredHeaderColumn(header, names, fileLabel) {
  const index = findHeaderColumn(header, names);
  if (index < 0) throw new Error(`${fileLabel}缺少列：${names[0]}`);
  return index;
}

function numberFromWorkbookCell(value) {
  const text = String(value ?? "").replace(/,/g, "").trim();
  if (!text) return 0;
  const number = Number(text);
  return Number.isFinite(number) ? number : 0;
}

export function analyzeEmptyLocationsFromExports(locationFilePath, inventoryLocationFilePath) {
  const locationRows = readXlsxRows(locationFilePath);
  const inventoryRows = readXlsxRows(inventoryLocationFilePath);
  const locationHeader = locationRows[0] || [];
  const inventoryHeader = inventoryRows[0] || [];
  const locationZoneIndex = requiredHeaderColumn(locationHeader, ["库区名称", "Zone Name", "zone_name"], "库位原表");
  const locationCodeIndex = requiredHeaderColumn(locationHeader, ["库位编码", "Location Code", "location_code"], "库位原表");
  const locationStatusIndex = findHeaderColumn(locationHeader, ["库位状态", "Location Status", "location_status"]);
  const locationTypeIndex = findHeaderColumn(locationHeader, ["库位类型", "Location Type", "location_type"]);
  const inventoryLocationIndex = requiredHeaderColumn(inventoryHeader, ["库位编码", "库位", "Location", "Location Code", "inventory_location_code"], "库位库存原表");
  const availableIndex = requiredHeaderColumn(inventoryHeader, ["可用库存", "Available Inventory", "Available Qty", "available_qty"], "库位库存原表");

  const inventoryByLocation = new Map();
  for (const row of inventoryRows.slice(1)) {
    const locationCode = String(row[inventoryLocationIndex] ?? "").trim();
    if (!locationCode) continue;
    const current = inventoryByLocation.get(locationCode) || { availableQty: 0, rows: 0 };
    current.availableQty += numberFromWorkbookCell(row[availableIndex]);
    current.rows += 1;
    inventoryByLocation.set(locationCode, current);
  }

  const rows = [];
  const seenLocations = new Set();
  for (const row of locationRows.slice(1)) {
    const locationCode = String(row[locationCodeIndex] ?? "").trim();
    if (!locationCode || seenLocations.has(locationCode)) continue;
    seenLocations.add(locationCode);
    const inventory = inventoryByLocation.get(locationCode);
    if (inventory && inventory.availableQty !== 0) continue;
    rows.push({
      zoneName: String(row[locationZoneIndex] ?? "").trim(),
      locationCode,
      availableQty: inventory ? inventory.availableQty : "",
      reason: inventory ? "可用库存为0" : "无库存记录",
      locationStatus: locationStatusIndex >= 0 ? String(row[locationStatusIndex] ?? "").trim() : "",
      locationType: locationTypeIndex >= 0 ? String(row[locationTypeIndex] ?? "").trim() : "",
    });
  }

  return {
    totalLocations: seenLocations.size,
    inventoryLocations: inventoryByLocation.size,
    emptyCount: rows.length,
    rows,
  };
}

function compactDateTimeForFile(date = new Date()) {
  return [
    String(date.getFullYear()).slice(2),
    pad2(date.getMonth() + 1),
    pad2(date.getDate()),
    "_",
    pad2(date.getHours()),
    pad2(date.getMinutes()),
    pad2(date.getSeconds()),
  ].join("");
}

function emptyLocationExportMatrix(rows) {
  return [
    ["库区", "库位编码", "可用库存", "判断", "库位状态", "库位类型"],
    ...rows.map((row) => [
      row.zoneName || "",
      row.locationCode || "",
      row.availableQty === "" ? "无记录" : Number(row.availableQty || 0),
      row.reason || "",
      row.locationStatus || "",
      row.locationType || "",
    ]),
  ];
}

export async function exportEmptyLocationWorkbook({ rows = [], outputDir }) {
  const workbook = Workbook.create();
  writeWorkbookSheet(workbook, "空库位", emptyLocationExportMatrix(rows));
  const outDir = outputDir || path.resolve("空库位导出");
  await fs.mkdir(outDir, { recursive: true });
  const filePath = path.join(outDir, `空库位_${compactDateTimeForFile()}.xlsx`);
  const xlsx = await SpreadsheetFile.exportXlsx(workbook);
  await xlsx.save(filePath);
  return { filePath };
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

function inboundStatusHeaderIndex(header) {
  const names = new Set(["task status", "任务状态", "状态"]);
  return header.findIndex((cell) => names.has(text(cell).toLowerCase()));
}

function inboundHeaderIndex(header, names) {
  const normalized = new Set(names.map((name) => String(name).trim().toLowerCase()));
  return header.findIndex((cell) => normalized.has(text(cell).toLowerCase()));
}

function inboundTaskStatusGroup(value) {
  const status = text(value).toLowerCase();
  if (!status) return "";
  if (status === "finished" || status === "已完成" || status === "500" || status.includes("status_500")) return "completed";
  if (status === "created" || status === "已创建" || status === "100" || status.includes("status_100")) return "created";
  return "";
}

function inboundRawTable(filePath) {
  const rows = readXlsxRows(filePath);
  const headerIndex = rows.findIndex((row) => inboundStatusHeaderIndex(row) >= 0);
  const header = rows[headerIndex] || rows[0] || [];
  const dataRows = rows.slice((headerIndex >= 0 ? headerIndex : 0) + 1)
    .filter((row) => row.some((cell) => text(cell) !== ""));
  return { header, dataRows };
}

function inboundCell(row, index) {
  return index >= 0 ? text(row[index]) : "";
}

function formatHoursMinutes(value) {
  if (value == null || !Number.isFinite(Number(value))) return "-";
  const minutes = Math.max(0, Math.round(Number(value)));
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${hours}小时${rest}分钟`;
}

export function inboundTaskSummaryFromRawWorkbook(filePath) {
  const { header, dataRows } = inboundRawTable(filePath);
  const statusIndex = inboundStatusHeaderIndex(header);
  const operatorIndex = inboundHeaderIndex(header, ["operator", "操作人"]);
  const containerIndex = inboundHeaderIndex(header, ["container code", "容器"]);
  const targetIndex = inboundHeaderIndex(header, ["target location", "目标库位", "目标库区"]);
  const startIndex = inboundHeaderIndex(header, ["start time", "开始时间"]);
  const completeIndex = inboundHeaderIndex(header, ["complete time", "完成时间", "结束时间"]);
  const batchIndex = inboundHeaderIndex(header, ["task batch number", "任务批次号"]);
  const planQtyIndex = inboundHeaderIndex(header, ["plan qty", "计划数量", "预期数量"]);
  const finishedQtyIndex = inboundHeaderIndex(header, ["finished qty", "完成数量", "实际数量"]);
  let completed = 0;
  let created = 0;
  const people = new Map();
  const byPerson = new Map();

  if (statusIndex >= 0) {
    for (const row of dataRows) {
      const group = inboundTaskStatusGroup(row[statusIndex]);
      if (group === "completed") completed += 1;
      if (group === "created") created += 1;
      const person = inboundCell(row, operatorIndex) || "未分配";
      const planQty = inboundCell(row, planQtyIndex);
      const finishedQty = inboundCell(row, finishedQtyIndex);
      const item = people.get(person) || { person, totalTasks: 0, completedTasks: 0, pendingTasks: 0, putawayQty: 0 };
      item.totalTasks += 1;
      item.putawayQty += parseNumber(finishedQty);
      if (group === "completed") item.completedTasks += 1;
      if (group === "created") item.pendingTasks += 1;
      people.set(person, item);

      const startTime = inboundCell(row, startIndex);
      const endTime = inboundCell(row, completeIndex);
      const startedAtMs = parseWmsDateTime(startTime);
      const endedAtMs = parseWmsDateTime(endTime);
      const task = {
        taskBatchNo: inboundCell(row, batchIndex),
        containerCode: inboundCell(row, containerIndex),
        targetLocation: inboundCell(row, targetIndex),
        planQty,
        finishedQty,
        startTime: startTime || "-",
        endTime: endTime || "-",
        startedAtMs,
        endedAtMs,
        durationMinutes: minutesBetweenClamped(startedAtMs, endedAtMs),
        durationText: formatHoursMinutes(minutesBetweenClamped(startedAtMs, endedAtMs)),
        gapMinutes: null,
        gapText: "-",
      };
      if (!byPerson.has(person)) byPerson.set(person, []);
      byPerson.get(person).push(task);
    }
  }

  const peopleList = [...people.values()]
    .sort((a, b) => b.totalTasks - a.totalTasks || a.person.localeCompare(b.person, "zh-Hans-CN"));
  const peopleDetails = peopleList.map((person) => {
    const tasks = [...(byPerson.get(person.person) || [])].sort((a, b) => {
      const left = a.startedAtMs ?? a.endedAtMs ?? 0;
      const right = b.startedAtMs ?? b.endedAtMs ?? 0;
      return left - right || a.taskBatchNo.localeCompare(b.taskBatchNo);
    });
    for (let index = 0; index < tasks.length; index += 1) {
      const previous = tasks[index - 1];
      const current = tasks[index];
      if (!previous) continue;
      current.gapMinutes = minutesBetweenClamped(previous.endedAtMs, current.startedAtMs);
      current.gapText = formatHoursMinutes(current.gapMinutes);
    }
    return { ...person, tasks };
  });

  return {
    totalTasks: dataRows.length,
    completedTasks: completed,
    pendingTasks: created,
    people: peopleList,
    peopleDetails,
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

function recordText(record, keys) {
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(record, key)) return text(record[key]);
  }
  return "";
}

function parseDateTimeParts(value) {
  const raw = text(value);
  if (!raw || raw === "-") return null;

  let match = /^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(raw);
  if (match) {
    const [, day, month, year, hour, minute, second = "00"] = match;
    return { year: Number(year), month: Number(month), day: Number(day), hour: Number(hour), minute: Number(minute), second: Number(second) };
  }

  match = /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(raw);
  if (match) {
    const [, year, month, day, hour, minute, second = "00"] = match;
    return { year: Number(year), month: Number(month), day: Number(day), hour: Number(hour), minute: Number(minute), second: Number(second) };
  }

  return null;
}

function parseWmsDateTime(value, timeZoneMode = "fixed") {
  const raw = text(value);
  if (!raw || raw === "-") return null;

  const parts = parseDateTimeParts(raw);
  if (parts) {
    const utcMs = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
    return timeZoneMode === "utc" ? utcMs : utcMs - FIXED_UTC_OFFSET_HOURS * 3600 * 1000;
  }

  const parsed = Date.parse(raw);
  return Number.isNaN(parsed) ? null : parsed;
}

function minutesBetween(startMs, endMs) {
  if (startMs == null || endMs == null) return null;
  return Math.round(((endMs - startMs) / 60000) * 10) / 10;
}

function piecesPerHour(quantity, minutes) {
  const qty = Number(quantity || 0);
  const mins = Number(minutes || 0);
  if (!qty || !mins || !Number.isFinite(qty) || !Number.isFinite(mins)) return null;
  return Math.round((qty / (mins / 60)) * 10) / 10;
}

function localShiftCutoffMs(ms) {
  if (ms == null) return null;
  const shifted = new Date(ms + FIXED_UTC_OFFSET_HOURS * 3600 * 1000);
  const cutoffDay = shifted.getUTCHours() >= 15 ? shifted.getUTCDate() + 1 : shifted.getUTCDate();
  const localCutoffUtcMs = Date.UTC(
    shifted.getUTCFullYear(),
    shifted.getUTCMonth(),
    cutoffDay,
    EIGHT_HOUR_SKIP_CUTOFF_HOUR,
    EIGHT_HOUR_SKIP_CUTOFF_MINUTE,
    0,
  );
  return localCutoffUtcMs - FIXED_UTC_OFFSET_HOURS * 3600 * 1000;
}

function isLocalTimeAfter(ms, hour, minute = 0) {
  if (ms == null) return false;
  const shifted = new Date(ms + FIXED_UTC_OFFSET_HOURS * 3600 * 1000);
  const valueMinutes = shifted.getUTCHours() * 60 + shifted.getUTCMinutes() + shifted.getUTCSeconds() / 60;
  return valueMinutes > hour * 60 + minute;
}

function shouldSkipEightHourEfficiency(item, analyzedAtMs) {
  if (!item.completedQuantity || item.lastEndedAtMs == null) return false;
  if (isLocalTimeAfter(item.firstStartedAtMs, EIGHT_HOUR_SKIP_START_AFTER_HOUR)) return true;
  if (item.pickingRows > 0) return false;
  if (item.latestStartedAtMs != null && item.latestStartedAtMs > item.lastEndedAtMs) return false;

  const idleMinutes = minutesBetween(item.lastEndedAtMs, analyzedAtMs);
  if (idleMinutes == null || idleMinutes < IDLE_EIGHT_HOUR_SKIP_MINUTES) return false;

  const idleTriggerMs = item.lastEndedAtMs + IDLE_EIGHT_HOUR_SKIP_MINUTES * 60 * 1000;
  const cutoffMs = localShiftCutoffMs(item.lastEndedAtMs);
  return cutoffMs != null && idleTriggerMs <= cutoffMs;
}

function roundHours(minutes) {
  if (minutes == null || !Number.isFinite(Number(minutes))) return null;
  return Math.round((Number(minutes) / 60) * 10) / 10;
}

function minutesLabel(value) {
  if (value == null || !Number.isFinite(value)) return "-";
  return `${value}`;
}

function formatParsedDateTime(ms) {
  if (ms == null) return "";
  const date = new Date(ms + FIXED_UTC_OFFSET_HOURS * 3600 * 1000);
  return [
    date.getUTCFullYear(),
    pad2(date.getUTCMonth() + 1),
    pad2(date.getUTCDate()),
  ].join("-") + ` ${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())}:${pad2(date.getUTCSeconds())}`;
}

function formatDisplayDateTime(ms) {
  if (ms == null) return "";
  const date = new Date(ms + FIXED_UTC_OFFSET_HOURS * 3600 * 1000);
  return [
    pad2(date.getUTCDate()),
    pad2(date.getUTCMonth() + 1),
    date.getUTCFullYear(),
  ].join("/") + ` ${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())}:${pad2(date.getUTCSeconds())}`;
}

function displayWmsDateTime(rawValue, parsedMs, timeZoneMode) {
  const raw = text(rawValue);
  if (!raw || raw === "-") return raw;
  return timeZoneMode === "utc" && parsedMs != null ? formatDisplayDateTime(parsedMs) : raw;
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

const pickedStatusOverrides = new Set([
  "已拣选",
  "复核中",
  "复核完成",
  "Picked",
  "Rechecking",
  "Rechecked",
  "wms_export_PickOrderStatus_302",
  "wms_export_PickOrderStatus_701",
  "wms_export_PickOrderStatus_702",
]);

function pickingMethodCode(value) {
  const raw = text(value);
  if (!raw || raw === "-") return "";
  const match = /(\d+)$/.exec(raw);
  return match?.[1] || raw;
}

function pickingOrderType({ pickingMethodCode: methodCode, packageQuantity, quantityOfPick, numberOfPicks }) {
  if (
    Number(packageQuantity || 0) >= 8
    && Number(quantityOfPick || 0) >= 8
    && Number(packageQuantity || 0) === Number(quantityOfPick || 0)
    && Number(numberOfPicks || 0) === 1
  ) {
    return "singleBatch";
  }
  if (methodCode === "2") return "single";
  return "multi";
}

function recordsForType(records, orderType, statusGroup = "") {
  return records.filter((record) => record.pickingOrderType === orderType && (!statusGroup || record.statusGroup === statusGroup));
}

function countForType(records, orderType, statusGroup = "") {
  return recordsForType(records, orderType, statusGroup).length;
}

function quantityForType(records, orderType, statusGroup = "") {
  return recordsForType(records, orderType, statusGroup).reduce((sum, record) => sum + record.quantityOfPick, 0);
}

function summarizePeople(records, analyzedAtMs) {
  const people = new Map();

  for (const record of records) {
    if (!people.has(record.person)) {
      people.set(record.person, {
        person: record.person,
        rows: 0,
        pickingRows: 0,
        assignedRows: 0,
        quantityOfPick: 0,
        singleOrderRows: 0,
        singleBatchOrderRows: 0,
        multiOrderRows: 0,
        singleQuantity: 0,
        singleBatchQuantity: 0,
        multiQuantity: 0,
        assignedSingleRows: 0,
        assignedSingleBatchRows: 0,
        assignedMultiRows: 0,
        assignedSingleQuantity: 0,
        assignedSingleBatchQuantity: 0,
        assignedMultiQuantity: 0,
        pickingSingleRows: 0,
        pickingSingleBatchRows: 0,
        pickingMultiRows: 0,
        pickingSingleQuantity: 0,
        pickingSingleBatchQuantity: 0,
        pickingMultiQuantity: 0,
        completedSingleRows: 0,
        completedSingleBatchRows: 0,
        completedMultiRows: 0,
        completedSingleQuantity: 0,
        completedSingleBatchQuantity: 0,
        completedMultiQuantity: 0,
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
        efficiencyRows: 0,
        efficiencyDurationMinutes: 0,
        efficiencyDurationHours: null,
        singleEfficiencyRows: 0,
        singleEfficiencyDurationMinutes: 0,
        singleEfficiencyDurationHours: null,
        singleBatchEfficiencyRows: 0,
        singleBatchEfficiencyDurationMinutes: 0,
        singleBatchEfficiencyDurationHours: null,
        multiEfficiencyRows: 0,
        multiEfficiencyDurationMinutes: 0,
        multiEfficiencyDurationHours: null,
        spanMinutes: null,
        spanHours: null,
        firstStartTime: "",
        lastEndTime: "",
        firstStartedAtMs: null,
        lastEndedAtMs: null,
        latestStartedAtMs: null,
        latestStartTime: "",
        activeEfficiencyPerHour: null,
        singleActiveEfficiencyPerHour: null,
        singleBatchActiveEfficiencyPerHour: null,
        multiActiveEfficiencyPerHour: null,
        spanEfficiencyPerHour: null,
        eightHourEfficiencyPerHour: null,
        skipEightHourEfficiency: false,
        eightHourEfficiencyText: "",
        excludeEfficiency: false,
        efficiencyExcludedReason: "",
        overtimeOpenRows: 0,
        overtimeOpenQuantity: 0,
        overtimeOpenMaxMinutes: null,
        containers: new Set(),
        pickingZones: new Set(),
      });
    }

    const item = people.get(record.person);
    item.rows += 1;
    item.quantityOfPick += record.quantityOfPick;
    const isSingleOrder = record.pickingOrderType === "single";
    const isSingleBatchOrder = record.pickingOrderType === "singleBatch";
    const isMultiOrder = record.pickingOrderType === "multi";
    if (isSingleOrder) {
      item.singleOrderRows += 1;
      item.singleQuantity += record.quantityOfPick;
    } else if (isSingleBatchOrder) {
      item.singleBatchOrderRows += 1;
      item.singleBatchQuantity += record.quantityOfPick;
    } else if (isMultiOrder) {
      item.multiOrderRows += 1;
      item.multiQuantity += record.quantityOfPick;
    }
    item.numberOfPicks += record.numberOfPicks;
    item.invLocationNum += record.invLocationNum;
    item.packageQuantity += record.packageQuantity;
    if (record.container) item.containers.add(record.container);
    if (record.startedAtMs != null) {
      item.startedRows += 1;
      item.startedQuantity += record.quantityOfPick;
      if (item.latestStartedAtMs == null || record.startedAtMs > item.latestStartedAtMs) {
        item.latestStartedAtMs = record.startedAtMs;
        item.latestStartTime = record.startTime;
      }
    }
    if (record.durationMinutes != null) {
      item.durationRows += 1;
      item.durationMinutes += record.durationMinutes;
    }

    if (record.statusGroup === "已分配") {
      item.assignedRows += 1;
      item.assignedQuantity += record.quantityOfPick;
      if (isSingleOrder) {
        item.assignedSingleRows += 1;
        item.assignedSingleQuantity += record.quantityOfPick;
      } else if (isSingleBatchOrder) {
        item.assignedSingleBatchRows += 1;
        item.assignedSingleBatchQuantity += record.quantityOfPick;
      } else if (isMultiOrder) {
        item.assignedMultiRows += 1;
        item.assignedMultiQuantity += record.quantityOfPick;
      }
    } else if (record.statusGroup === "拣选中") {
      item.pickingRows += 1;
      item.pickingQuantity += record.quantityOfPick;
      if (record.excludedFromEfficiency) {
        item.excludeEfficiency = true;
        item.efficiencyExcludedReason = "进行中单超过2.5小时未结束";
        item.overtimeOpenRows += 1;
        item.overtimeOpenQuantity += record.quantityOfPick;
        item.overtimeOpenMaxMinutes = Math.max(Number(item.overtimeOpenMaxMinutes || 0), Number(record.openElapsedMinutes || 0));
      }
      if (isSingleOrder) {
        item.pickingSingleRows += 1;
        item.pickingSingleQuantity += record.quantityOfPick;
      } else if (isSingleBatchOrder) {
        item.pickingSingleBatchRows += 1;
        item.pickingSingleBatchQuantity += record.quantityOfPick;
      } else if (isMultiOrder) {
        item.pickingMultiRows += 1;
        item.pickingMultiQuantity += record.quantityOfPick;
      }
      if (record.zoneCode) item.pickingZones.add(record.zoneCode);
    } else if (record.statusGroup === "已拣选") {
      item.completedRows += 1;
      item.completedQuantity += record.quantityOfPick;
      if (isSingleOrder) {
        item.completedSingleRows += 1;
        item.completedSingleQuantity += record.quantityOfPick;
      } else if (isSingleBatchOrder) {
        item.completedSingleBatchRows += 1;
        item.completedSingleBatchQuantity += record.quantityOfPick;
      } else if (isMultiOrder) {
        item.completedMultiRows += 1;
        item.completedMultiQuantity += record.quantityOfPick;
      }
      if (record.startedAtMs != null && record.endedAtMs != null && record.durationMinutes != null) {
        item.efficiencyRows += 1;
        item.efficiencyDurationMinutes += record.durationMinutes;
        if (isSingleOrder) {
          item.singleEfficiencyRows += 1;
          item.singleEfficiencyDurationMinutes += record.durationMinutes;
        } else if (isSingleBatchOrder) {
          item.singleBatchEfficiencyRows += 1;
          item.singleBatchEfficiencyDurationMinutes += record.durationMinutes;
        } else if (isMultiOrder) {
          item.multiEfficiencyRows += 1;
          item.multiEfficiencyDurationMinutes += record.durationMinutes;
        }
        if (item.firstStartedAtMs == null || record.startedAtMs < item.firstStartedAtMs) {
          item.firstStartedAtMs = record.startedAtMs;
          item.firstStartTime = record.startTime;
        }
        if (item.lastEndedAtMs == null || record.endedAtMs > item.lastEndedAtMs) {
          item.lastEndedAtMs = record.endedAtMs;
          item.lastEndTime = record.endTime;
        }
      }
    }
  }

  return [...people.values()].map((item) => {
    const spanMinutes = item.firstStartedAtMs != null && item.lastEndedAtMs != null ? minutesBetween(item.firstStartedAtMs, item.lastEndedAtMs) : null;
    const skipEightHourEfficiency = shouldSkipEightHourEfficiency(item, analyzedAtMs);
    const efficiencyDurationMinutes = item.efficiencyRows ? Math.round(item.efficiencyDurationMinutes * 10) / 10 : 0;
    const singleEfficiencyDurationMinutes = item.singleEfficiencyRows ? Math.round(item.singleEfficiencyDurationMinutes * 10) / 10 : 0;
    const singleBatchEfficiencyDurationMinutes = item.singleBatchEfficiencyRows ? Math.round(item.singleBatchEfficiencyDurationMinutes * 10) / 10 : 0;
    const multiEfficiencyDurationMinutes = item.multiEfficiencyRows ? Math.round(item.multiEfficiencyDurationMinutes * 10) / 10 : 0;
    const excludeEfficiency = Boolean(item.excludeEfficiency);
    return {
      ...item,
      containers: [...item.containers],
      pickingZones: [...item.pickingZones],
      pickingZoneCodes: [...item.pickingZones],
      avgDurationMinutes: item.durationRows ? Math.round((item.durationMinutes / item.durationRows) * 10) / 10 : null,
      efficiencyDurationMinutes,
      efficiencyDurationHours: item.efficiencyRows ? roundHours(efficiencyDurationMinutes) : null,
      singleEfficiencyDurationMinutes,
      singleEfficiencyDurationHours: item.singleEfficiencyRows ? roundHours(singleEfficiencyDurationMinutes) : null,
      singleBatchEfficiencyDurationMinutes,
      singleBatchEfficiencyDurationHours: item.singleBatchEfficiencyRows ? roundHours(singleBatchEfficiencyDurationMinutes) : null,
      multiEfficiencyDurationMinutes,
      multiEfficiencyDurationHours: item.multiEfficiencyRows ? roundHours(multiEfficiencyDurationMinutes) : null,
      spanMinutes,
      spanHours: spanMinutes != null ? roundHours(spanMinutes) : null,
      activeEfficiencyPerHour: excludeEfficiency ? null : piecesPerHour(item.completedQuantity, efficiencyDurationMinutes),
      singleActiveEfficiencyPerHour: excludeEfficiency ? null : piecesPerHour(item.completedSingleQuantity, singleEfficiencyDurationMinutes),
      singleBatchActiveEfficiencyPerHour: excludeEfficiency ? null : piecesPerHour(item.completedSingleBatchQuantity, singleBatchEfficiencyDurationMinutes),
      multiActiveEfficiencyPerHour: excludeEfficiency ? null : piecesPerHour(item.completedMultiQuantity, multiEfficiencyDurationMinutes),
      spanEfficiencyPerHour: excludeEfficiency || spanMinutes == null ? null : piecesPerHour(item.completedQuantity, spanMinutes),
      eightHourEfficiencyPerHour: item.completedQuantity && !skipEightHourEfficiency && !excludeEfficiency ? Math.round((item.completedQuantity / 8) * 10) / 10 : null,
      skipEightHourEfficiency,
      eightHourEfficiencyText: excludeEfficiency ? "不计人效" : skipEightHourEfficiency ? "不计算" : "",
    };
  }).sort((a, b) => b.completedRows - a.completedRows || b.pickingRows - a.pickingRows || b.quantityOfPick - a.quantityOfPick || a.person.localeCompare(b.person, "zh-Hans-CN"));
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
  const analyzedAtMs = Date.now();
  const rows = readXlsxRows(filePath);
  const headerIndex = firstHeaderIndex(rows);
  if (headerIndex < 0) {
    if (!rows.length) {
      throw new Error("Excel 文件为空，没有可分析的拣选单数据");
    }
    throw new Error("没有找到拣选任务表头：需要 PickOrderNumber / PickOrderStatus / QuantityOfPick");
  }

  const header = rows[headerIndex].map((cell) => text(cell));
  const dataRows = rows.slice(headerIndex + 1);
  const records = dataRows.map((row, index) => rowObject(header, row, headerIndex + index + 2))
    .filter((record) => Object.keys(record).some((key) => key !== "_excelRow" && text(record[key]) !== ""))
    .map((record) => {
      const isUtcExport = Object.prototype.hasOwnProperty.call(record, "Created time")
        || Object.prototype.hasOwnProperty.call(record, "Picking start time")
        || Object.prototype.hasOwnProperty.call(record, "Picking completion time");
      const timeZoneMode = isUtcExport ? "utc" : "fixed";
      const delegator = text(record.Delegator);
      const operator = recordText(record, ["操作人", "Operator"]);
      const person = delegator || operator || "未填写人员";
      const createdRaw = recordText(record, ["创建时间", "Created time"]);
      const startRaw = recordText(record, ["拣选开始时间", "Picking start time"]);
      const endRaw = recordText(record, ["拣选完成时间", "Picking completion time"]);
      const createdAtMs = parseWmsDateTime(createdRaw, timeZoneMode);
      const startedAtMs = parseWmsDateTime(startRaw, timeZoneMode);
      const endedAtMs = parseWmsDateTime(endRaw, timeZoneMode);
      const createdTime = displayWmsDateTime(createdRaw, createdAtMs, timeZoneMode);
      const startTime = displayWmsDateTime(startRaw, startedAtMs, timeZoneMode);
      const endTime = displayWmsDateTime(endRaw, endedAtMs, timeZoneMode);
      const rawStatus = text(record.PickOrderStatus);
      const statusGroup = pickedStatusOverrides.has(rawStatus)
        ? "已拣选"
        : startedAtMs == null ? "已分配" : endedAtMs == null ? "拣选中" : "已拣选";
      const durationMinutes = minutesBetween(startedAtMs, endedAtMs);
      const openElapsedMinutes = startedAtMs != null && endedAtMs == null ? minutesBetween(startedAtMs, analyzedAtMs) : null;
      const excludedFromEfficiency = openElapsedMinutes != null && openElapsedMinutes > OVERTIME_OPEN_ORDER_EXCLUDE_MINUTES;

      let durationStatus = "可计算";
      if (startedAtMs == null && endedAtMs == null) {
        durationStatus = "无开始时间、无结束时间";
      } else if (startedAtMs == null) {
        durationStatus = "无开始时间";
      } else if (excludedFromEfficiency) {
        durationStatus = "未完成超过2.5小时，不计人效";
      } else if (endedAtMs == null) {
        durationStatus = "未完成，无结束时间";
      }

      const packageQuantity = parseNumber(record.PackageQuantity);
      const quantityOfPick = parseNumber(record.QuantityOfPick);
      const pickingMethod = recordText(record, ["PickingMethod", "拣选模式"]);
      const pickingMethodCodeValue = pickingMethodCode(pickingMethod);
      const numberOfPicks = parseNumber(record.NumberOfPicks);
      const orderType = pickingOrderType({
        pickingMethodCode: pickingMethodCodeValue,
        packageQuantity,
        quantityOfPick,
        numberOfPicks,
      });

      return {
        excelRow: record._excelRow,
        pickOrderNumber: text(record.PickOrderNumber),
        waveOrderNumber: text(record.WaveOrderNumber),
        person,
        delegator,
        operator,
        container: recordText(record, ["拣选容器", "Pick Container"]),
        zoneCode: recordText(record, ["ZoneCode", "zonecode", "Zone Code", "库区"]),
        rawStatus,
        statusGroup,
        packageQuantity,
        quantityOfPick,
        pickingMethod,
        pickingMethodCode: pickingMethodCodeValue,
        pickingOrderType: orderType,
        numberOfPicks,
        invLocationNum: parseNumber(record.InvLocationNum),
        createdTime,
        startTime,
        endTime,
        createdAtMs,
        startedAtMs,
        endedAtMs,
        durationMinutes,
        openElapsedMinutes,
        excludedFromEfficiency,
        durationLabel: minutesLabel(durationMinutes),
        durationStatus,
      };
    });

  const people = summarizePeople(records, analyzedAtMs);
  const pickingPeople = people.filter((item) => item.pickingRows > 0);
  const pickedPeople = people.filter((item) => item.completedRows > 0);
  const assignedPeople = people.filter((item) => item.assignedRows > 0);
  const assignedOnlyPeople = people.filter((item) => item.assignedRows > 0 && item.pickingRows === 0);
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
      pickedStatus: "拣选开始时间和拣选完成时间都有；复核中/复核完成也按已拣选",
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
      assignedQuantity: records.filter((record) => record.statusGroup === "已分配").reduce((sum, record) => sum + record.quantityOfPick, 0),
      pickingQuantity: records.filter((record) => record.statusGroup === "拣选中").reduce((sum, record) => sum + record.quantityOfPick, 0),
      singleOrderRows: countForType(records, "single"),
      singleBatchOrderRows: countForType(records, "singleBatch"),
      multiOrderRows: countForType(records, "multi"),
      singleQuantity: quantityForType(records, "single"),
      singleBatchQuantity: quantityForType(records, "singleBatch"),
      multiQuantity: quantityForType(records, "multi"),
      assignedSingleRows: countForType(records, "single", "已分配"),
      assignedSingleBatchRows: countForType(records, "singleBatch", "已分配"),
      assignedMultiRows: countForType(records, "multi", "已分配"),
      assignedSingleQuantity: quantityForType(records, "single", "已分配"),
      assignedSingleBatchQuantity: quantityForType(records, "singleBatch", "已分配"),
      assignedMultiQuantity: quantityForType(records, "multi", "已分配"),
      pickingSingleRows: countForType(records, "single", "拣选中"),
      pickingSingleBatchRows: countForType(records, "singleBatch", "拣选中"),
      pickingMultiRows: countForType(records, "multi", "拣选中"),
      pickingSingleQuantity: quantityForType(records, "single", "拣选中"),
      pickingSingleBatchQuantity: quantityForType(records, "singleBatch", "拣选中"),
      pickingMultiQuantity: quantityForType(records, "multi", "拣选中"),
      completedSingleRows: countForType(records, "single", "已拣选"),
      completedSingleBatchRows: countForType(records, "singleBatch", "已拣选"),
      completedMultiRows: countForType(records, "multi", "已拣选"),
      completedSingleQuantity: quantityForType(records, "single", "已拣选"),
      completedSingleBatchQuantity: quantityForType(records, "singleBatch", "已拣选"),
      completedMultiQuantity: quantityForType(records, "multi", "已拣选"),
      numberOfPicks: sumBy(records, "numberOfPicks"),
      invLocationNum: sumBy(records, "invLocationNum"),
      startedRows: records.filter((record) => record.startedAtMs != null).length,
      startedQuantity: records.filter((record) => record.startedAtMs != null).reduce((sum, record) => sum + record.quantityOfPick, 0),
      completedRows: records.filter((record) => record.statusGroup === "已拣选").length,
      completedQuantity: records.filter((record) => record.statusGroup === "已拣选").reduce((sum, record) => sum + record.quantityOfPick, 0),
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

function formatExportWaitDuration(value) {
  if (value == null || !Number.isFinite(Number(value))) return "-";
  const minutes = Math.max(0, Math.round(Number(value)));
  if (minutes <= 60) return `${minutes} 分钟`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}小时${rest}分钟` : `${hours}小时`;
}

function minutesBetweenClamped(startMs, endMs) {
  if (startMs == null || endMs == null) return null;
  return Math.max(0, Math.round(((Number(endMs) - Number(startMs)) / 60000) * 10) / 10);
}

function exportPersonInScope(person, rosterSet, scope) {
  if (scope === "all") return true;
  return rosterSet.has(person);
}

function exportScopedPeople(result, rosterSet, scope) {
  return result.people.filter((person) => exportPersonInScope(person.person, rosterSet, scope));
}

function exportScopedRows(result, rosterSet, scope) {
  return result.orderDurations.filter((row) => exportPersonInScope(row.person, rosterSet, scope));
}

function exportShiftLabel(person, rosterSet) {
  if (!rosterSet.size) return "全部";
  return rosterSet.has(person) ? "本班次" : "其他班次";
}

function exportScopedTotals(people) {
  return {
    rows: people.reduce((sum, row) => sum + Number(row.rows || 0), 0),
    quantityOfPick: people.reduce((sum, row) => sum + Number(row.quantityOfPick || 0), 0),
    singleOrderRows: people.reduce((sum, row) => sum + Number(row.singleOrderRows || 0), 0),
    singleBatchOrderRows: people.reduce((sum, row) => sum + Number(row.singleBatchOrderRows || 0), 0),
    multiOrderRows: people.reduce((sum, row) => sum + Number(row.multiOrderRows || 0), 0),
    singleQuantity: people.reduce((sum, row) => sum + Number(row.singleQuantity || 0), 0),
    singleBatchQuantity: people.reduce((sum, row) => sum + Number(row.singleBatchQuantity || 0), 0),
    multiQuantity: people.reduce((sum, row) => sum + Number(row.multiQuantity || 0), 0),
    assignedSingleRows: people.reduce((sum, row) => sum + Number(row.assignedSingleRows || 0), 0),
    assignedSingleBatchRows: people.reduce((sum, row) => sum + Number(row.assignedSingleBatchRows || 0), 0),
    assignedMultiRows: people.reduce((sum, row) => sum + Number(row.assignedMultiRows || 0), 0),
    assignedSingleQuantity: people.reduce((sum, row) => sum + Number(row.assignedSingleQuantity || 0), 0),
    assignedSingleBatchQuantity: people.reduce((sum, row) => sum + Number(row.assignedSingleBatchQuantity || 0), 0),
    assignedMultiQuantity: people.reduce((sum, row) => sum + Number(row.assignedMultiQuantity || 0), 0),
    pickingSingleRows: people.reduce((sum, row) => sum + Number(row.pickingSingleRows || 0), 0),
    pickingSingleBatchRows: people.reduce((sum, row) => sum + Number(row.pickingSingleBatchRows || 0), 0),
    pickingMultiRows: people.reduce((sum, row) => sum + Number(row.pickingMultiRows || 0), 0),
    pickingSingleQuantity: people.reduce((sum, row) => sum + Number(row.pickingSingleQuantity || 0), 0),
    pickingSingleBatchQuantity: people.reduce((sum, row) => sum + Number(row.pickingSingleBatchQuantity || 0), 0),
    pickingMultiQuantity: people.reduce((sum, row) => sum + Number(row.pickingMultiQuantity || 0), 0),
    completedSingleRows: people.reduce((sum, row) => sum + Number(row.completedSingleRows || 0), 0),
    completedSingleBatchRows: people.reduce((sum, row) => sum + Number(row.completedSingleBatchRows || 0), 0),
    completedMultiRows: people.reduce((sum, row) => sum + Number(row.completedMultiRows || 0), 0),
    completedSingleQuantity: people.reduce((sum, row) => sum + Number(row.completedSingleQuantity || 0), 0),
    completedSingleBatchQuantity: people.reduce((sum, row) => sum + Number(row.completedSingleBatchQuantity || 0), 0),
    completedMultiQuantity: people.reduce((sum, row) => sum + Number(row.completedMultiQuantity || 0), 0),
    assignedRows: people.reduce((sum, row) => sum + Number(row.assignedRows || 0), 0),
    pickingRows: people.reduce((sum, row) => sum + Number(row.pickingRows || 0), 0),
    pickedRows: people.reduce((sum, row) => sum + Number(row.completedRows || 0), 0),
    assignedQuantity: people.reduce((sum, row) => sum + Number(row.assignedQuantity || 0), 0),
    pickingQuantity: people.reduce((sum, row) => sum + Number(row.pickingQuantity || 0), 0),
    pickedQuantity: people.reduce((sum, row) => sum + Number(row.completedQuantity || 0), 0),
    assignedOnlyPeople: people.filter((row) => row.assignedRows > 0 && row.pickingRows === 0).length,
  };
}

function exportRowsByPerson(rows) {
  const byPerson = new Map();
  for (const row of rows) {
    if (!byPerson.has(row.person)) byPerson.set(row.person, []);
    byPerson.get(row.person).push(row);
  }
  return byPerson;
}

function timelineStatusRank(row) {
  if (row.statusGroup === "已拣选") return 1;
  if (row.statusGroup === "拣选中") return 2;
  return 3;
}

function timelineSortValue(row) {
  return row.startedAtMs ?? row.createdAtMs ?? 0;
}

function timelineOrderSort(a, b) {
  return timelineStatusRank(a) - timelineStatusRank(b)
    || timelineSortValue(a) - timelineSortValue(b)
    || a.pickOrderNumber.localeCompare(b.pickOrderNumber);
}

function exportLastCompletedByPerson(rows) {
  const latest = new Map();
  for (const row of rows.filter((item) => item.endedAtMs != null)) {
    const current = latest.get(row.person);
    if (!current || row.endedAtMs > current.endedAtMs) latest.set(row.person, row);
  }
  return latest;
}

function exportRiskRows(result, rosterSet, scope) {
  const scopedPeople = exportScopedPeople(result, rosterSet, scope);
  const scopedRows = exportScopedRows(result, rosterSet, scope);
  const latestCompleted = exportLastCompletedByPerson(scopedRows);
  return scopedPeople
    .filter((person) => person.assignedRows > 0 && person.pickingRows === 0)
    .map((person) => {
      const last = latestCompleted.get(person.person);
      const waitMinutes = last ? minutesBetweenClamped(last.endedAtMs, result.source.analyzedAtMs) : null;
      return {
        shift: exportShiftLabel(person.person, rosterSet),
        person: person.person,
        assignedRows: person.assignedRows,
        assignedQuantity: person.assignedQuantity,
        lastStart: last?.startTime || "-",
        lastEnd: last?.endTime || "-",
        waitMinutes,
        waitText: formatExportWaitDuration(waitMinutes),
        status: last ? "上单完成后未开始下一单" : "暂无上一单完成记录",
      };
    })
    .sort((a, b) => {
      if (a.shift !== b.shift) return a.shift === "本班次" ? -1 : 1;
      return Number(b.waitMinutes ?? -1) - Number(a.waitMinutes ?? -1) || a.person.localeCompare(b.person, "zh-Hans-CN");
    });
}

function exportMultiOrderSortRows(people) {
  return [...people].sort((a, b) => {
    const aHasMulti = Number(a.multiOrderRows || 0) > 0 ? 0 : 1;
    const bHasMulti = Number(b.multiOrderRows || 0) > 0 ? 0 : 1;
    if (aHasMulti !== bHasMulti) return aHasMulti - bHasMulti;
    return Number(b.multiOrderRows || 0) - Number(a.multiOrderRows || 0)
      || Number(b.rows || 0) - Number(a.rows || 0)
      || a.person.localeCompare(b.person, "zh-Hans-CN");
  });
}

function exportPersonMatrix(people, options = {}) {
  const headers = ["人员", "总单数", "已分配单", "拣选中单", "已拣选单"];
  if (options.includeShift) headers.unshift("班次");
  if (options.includeOrderType) headers.push("Single Order", "Single Batch", "Multi Order");
  headers.push("已分配数量", "拣选中数量");
  if (options.includePickingZone) headers.push("拣选中库区");
  headers.push("已拣选数量", "拣选次数", "库位数", "容器");
  return [
    headers,
    ...people.map((row) => {
      const values = [
        row.person,
        row.rows,
        row.assignedRows,
        row.pickingRows,
        row.completedRows,
      ];
      if (options.includeShift) values.unshift(exportShiftLabel(row.person, options.rosterSet || new Set()));
      if (options.includeOrderType) values.push(row.singleOrderRows, row.singleBatchOrderRows, row.multiOrderRows);
      values.push(
        row.assignedQuantity,
        row.pickingQuantity,
      );
      if (options.includePickingZone) values.push((row.pickingZoneCodes || row.pickingZones || []).join(", ") || "-");
      values.push(
        row.completedQuantity,
        row.numberOfPicks,
        row.invLocationNum,
        row.containers.join(", ") || "-",
      );
      return values;
    }),
  ];
}

function exportEfficiencySortRows(people) {
  return [...people]
    .filter((row) => Number(row.completedQuantity || 0) > 0 && !row.excludeEfficiency)
    .sort((a, b) => Number(b.activeEfficiencyPerHour ?? -1) - Number(a.activeEfficiencyPerHour ?? -1)
      || Number(b.completedQuantity || 0) - Number(a.completedQuantity || 0)
      || a.person.localeCompare(b.person, "zh-Hans-CN"));
}

function exportEfficiencyMatrix(people) {
  const rows = exportEfficiencySortRows(people);
  return [
    ["人员", "已拣选件数", "已拣选单", "单内总工时", "总人效(件/小时)", "Single件", "Single人效(件/小时)", "Single Batch件", "Single Batch人效(件/小时)", "Multi件", "Multi人效(件/小时)", "首单开始", "末单结束", "跨度工时", "跨度人效(件/小时)", "8小时人效(件/小时)"],
    ...rows.map((row) => [
      row.person,
      row.completedQuantity,
      row.completedRows,
      row.efficiencyDurationHours ?? "-",
      row.activeEfficiencyPerHour ?? "-",
      row.completedSingleQuantity,
      row.singleActiveEfficiencyPerHour ?? "-",
      row.completedSingleBatchQuantity,
      row.singleBatchActiveEfficiencyPerHour ?? "-",
      row.completedMultiQuantity,
      row.multiActiveEfficiencyPerHour ?? "-",
      row.firstStartTime || "-",
      row.lastEndTime || "-",
      row.spanHours ?? "-",
      row.spanEfficiencyPerHour ?? "-",
      row.skipEightHourEfficiency ? "不计算" : row.eightHourEfficiencyPerHour ?? "-",
    ]),
  ];
}

function exportAssignedNotPickingMatrix(result, people, scopedRows, rosterSet = new Set()) {
  const latestCompleted = exportLastCompletedByPerson(scopedRows);
  const rows = people
    .filter((person) => person.assignedRows > 0 && person.pickingRows === 0)
    .map((person) => {
      const last = latestCompleted.get(person.person);
      const waitMinutes = last ? minutesBetweenClamped(last.endedAtMs, result.source.analyzedAtMs) : null;
      return { person, last, waitMinutes };
    })
    .sort((a, b) => {
      const aShift = exportShiftLabel(a.person.person, rosterSet);
      const bShift = exportShiftLabel(b.person.person, rosterSet);
      if (aShift !== bShift) return aShift === "本班次" ? -1 : 1;
      return Number(b.waitMinutes ?? -1) - Number(a.waitMinutes ?? -1) || a.person.person.localeCompare(b.person.person, "zh-Hans-CN");
    });

  const includeShift = rosterSet.size > 0;
  const headers = ["等待时间", "人员", "上一单开始", "上一单结束", "已分配单", "已分配数量", "已拣选单", "已拣选数量", "容器"];
  if (includeShift) headers.unshift("班次");
  return [
    headers,
    ...rows.map(({ person, last, waitMinutes }) => {
      const values = [
        formatExportWaitDuration(waitMinutes),
        person.person,
        last?.startTime || "-",
        last?.endTime || "-",
        person.assignedRows,
        person.assignedQuantity,
        person.completedRows,
        person.completedQuantity,
        person.containers.join(", ") || "-",
      ];
      if (includeShift) values.unshift(exportShiftLabel(person.person, rosterSet));
      return values;
    }),
  ];
}

function exportOrderDurationsMatrix(rows, analyzedAtMs) {
  const byPerson = exportRowsByPerson(rows);
  const matrix = [["人员", "序", "单号", "库区", "状态", "数量", "开始", "完成", "单内时间", "上单间隔", "容器"]];

  for (const [person, personRows] of byPerson) {
    const sorted = [...personRows].sort(timelineOrderSort);
    sorted.forEach((row, index) => {
      let duration = "-";
      if (row.durationMinutes != null) duration = `${row.durationMinutes} 分钟`;
      else if (row.startedAtMs != null && row.endedAtMs == null) duration = `进行中 ${formatExportWaitDuration(minutesBetweenClamped(row.startedAtMs, analyzedAtMs))}`;
      else if (row.startedAtMs == null) duration = "未开始";

      matrix.push([
        person,
        index + 1,
        row.pickOrderNumber,
        row.zoneCode || "-",
        row.statusGroup,
        row.quantityOfPick,
        row.startTime && row.startTime !== "-" ? row.startTime : "未开始",
        row.endTime && row.endTime !== "-" ? row.endTime : "未完成",
        duration,
        "",
        row.container || "-",
      ]);

      const next = sorted[index + 1];
      if (next?.startedAtMs != null) {
        let gap = "";
        if (row.endedAtMs != null) gap = `完成间隔 ${formatExportWaitDuration(minutesBetweenClamped(row.endedAtMs, next.startedAtMs))}`;
        else if (row.startedAtMs != null) gap = `开始间隔 ${formatExportWaitDuration(minutesBetweenClamped(row.startedAtMs, next.startedAtMs))}`;
        if (gap) matrix.push([person, "", "", "", "", "", "", "", "", gap, ""]);
      }
    });
  }
  return matrix;
}

function writeWorkbookSheet(workbook, name, matrix) {
  const sheet = workbook.worksheets.add(name);
  const rows = matrix.length ? matrix : [[""]];
  const columnCount = Math.max(1, ...rows.map((row) => row.length));
  const normalized = rows.map((row) => [...row, ...Array(Math.max(0, columnCount - row.length)).fill("")]);
  sheet.getRangeByIndexes(0, 0, normalized.length, columnCount).values = normalized;
}

function overviewMetricRows(totals) {
  return [
    ["总单数", totals.rows, totals.singleOrderRows, totals.singleBatchOrderRows, totals.multiOrderRows],
    ["总数量", totals.quantityOfPick, totals.singleQuantity, totals.singleBatchQuantity, totals.multiQuantity],
    ["已分配", totals.assignedRows, totals.assignedSingleRows, totals.assignedSingleBatchRows, totals.assignedMultiRows],
    ["已分配数量", totals.assignedQuantity, totals.assignedSingleQuantity, totals.assignedSingleBatchQuantity, totals.assignedMultiQuantity],
    ["拣选中", totals.pickingRows, totals.pickingSingleRows, totals.pickingSingleBatchRows, totals.pickingMultiRows],
    ["拣选中数量", totals.pickingQuantity, totals.pickingSingleQuantity, totals.pickingSingleBatchQuantity, totals.pickingMultiQuantity],
    ["已拣选", totals.pickedRows, totals.completedSingleRows, totals.completedSingleBatchRows, totals.completedMultiRows],
    ["已拣选数量", totals.pickedQuantity, totals.completedSingleQuantity, totals.completedSingleBatchQuantity, totals.completedMultiQuantity],
    ["已分配但未在拣选人数", totals.assignedOnlyPeople],
  ];
}

function exportOverviewMatrix({ result, rosterSet, scope, label, totals }) {
  const rows = [
    ["导出范围", label],
    ["源文件", result.source.filePath],
    ["分析时间", result.source.analyzedAt],
    ["名单人数", rosterSet.size],
    [],
    ["指标", "总数", "Single", "Single Batch", "Multi"],
    ...overviewMetricRows(totals),
  ];

  if (scope === "all" && rosterSet.size) {
    const currentTotals = exportScopedTotals(result.people.filter((person) => rosterSet.has(person.person)));
    const otherTotals = exportScopedTotals(result.people.filter((person) => !rosterSet.has(person.person)));
    rows.push(
      [],
      ["班次拆分", "指标", "总数", "Single", "Single Batch", "Multi"],
      ...overviewMetricRows(currentTotals).map((row) => ["本班次", ...row]),
      [],
      ...overviewMetricRows(otherTotals).map((row) => ["其他班次", ...row]),
    );
  }

  return rows;
}

export async function exportPickingAnalysisWorkbook({ filePath, rosterNames = [], scope = "all", outputDir }) {
  const rosterSet = new Set(rosterNames.map((name) => String(name).trim()).filter(Boolean));
  if (scope === "current" && !rosterSet.size) {
    throw new Error("本班次名单为空，请先更新本班次名单");
  }

  const result = analyzePickingWorkbook(filePath);
  const people = exportScopedPeople(result, rosterSet, scope);
  const rows = exportScopedRows(result, rosterSet, scope);
  const totals = exportScopedTotals(people);
  const label = scope === "current" ? "本班次" : "全部";
  const workbook = Workbook.create();

  writeWorkbookSheet(workbook, "总览", exportOverviewMatrix({ result, rosterSet, scope, label, totals }));

	  writeWorkbookSheet(workbook, scope === "all" ? "空档风险" : "当前空档风险", [
    ["班次", "等待时间", "人员", "上一单开始", "上一单结束", "已分配单", "已分配数量", "状态"],
    ...exportRiskRows(result, rosterSet, scope).map((row) => [
      row.shift,
      row.waitText,
      row.person,
      row.lastStart,
      row.lastEnd,
      row.assignedRows,
      row.assignedQuantity,
      row.status,
    ]),
	  ]);

	  writeWorkbookSheet(workbook, "每个人人效", exportEfficiencyMatrix(people));
	  writeWorkbookSheet(workbook, "拣选中的人", exportPersonMatrix(people.filter((person) => person.pickingRows > 0), { includeShift: rosterSet.size > 0, rosterSet, includePickingZone: true }));
	  writeWorkbookSheet(workbook, "已分配未拣选", exportAssignedNotPickingMatrix(result, people, rows, rosterSet));
	  writeWorkbookSheet(workbook, "每个人状态汇总", exportPersonMatrix(exportMultiOrderSortRows(people), { includeShift: rosterSet.size > 0, rosterSet, includeOrderType: true }));
  writeWorkbookSheet(workbook, "每个人拣选时间", exportOrderDurationsMatrix(rows, result.source.analyzedAtMs));

  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const outDir = outputDir || path.join(path.dirname(path.resolve(filePath)), "导出文件");
  const outPath = path.join(outDir, `${label}拣选分析_${stamp}.xlsx`);
  await fs.mkdir(outDir, { recursive: true });
  const xlsx = await SpreadsheetFile.exportXlsx(workbook);
  await xlsx.save(outPath);
  return { filePath: outPath, scope, source: result.source, totals };
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
