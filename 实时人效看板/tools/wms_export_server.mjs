import http from "node:http";
import { createHash, randomBytes } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile, execFileSync } from "node:child_process";
import { hostname, platform, userInfo } from "node:os";
import {
  addDays,
  buildShiftWindow,
  buildWeekWindows,
  completeWindow,
  analyzeEmptyLocationsFromExports,
  downloadInboundPutawayTaskExport,
  downloadNativeWmsPickOrderExport,
  downloadWmsInventoryLocationExport,
  downloadWmsLocationExport,
  exportDay,
  exportEmptyLocationWorkbook,
  exportPickingAnalysisWorkbook,
  exportWeek,
  pad2,
  queryWmsInventoryByLocation,
  queryWmsInventoryBySku,
  queryWmsWaybill,
  weekNumberForDate,
  weekStartForYearWeek,
} from "./wms_export_core.mjs";
import { exportReleaseAssistantWorkbook } from "./release_assistant.mjs";
import { analyzeInboundEfficiencyWorkbook } from "./inbound_efficiency.mjs";
import { analyzePackingStatusWorkbook } from "./packing_status.mjs";
import {
  analyzeWithDay1Productivity,
  day1JsonPath,
  day1WorkbookPath,
  loadDay1History,
} from "./day1_productivity.mjs";
import {
  addPickQuantityTrendAnalysis,
  attachPickQuantityTrend,
  loadPickQuantityTrendHistory,
  pickQuantityTrendJsonPath,
  pickQuantityTrendWorkbookPath,
} from "./pick_quantity_trend.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const appDir = path.join(rootDir, "app");
const qrScriptPath = path.join(__dirname, "qr_svg.py");
const port = Number(process.env.PORT || 5317);
const licenseApiUrl = String(process.env.LICENSE_API_URL || process.env.AUTH_API_URL || "").replace(/\/+$/, "");
const licenseAppId = String(process.env.LICENSE_APP_ID || "realtime-efficiency-dashboard");
const deviceSalt = String(process.env.LICENSE_DEVICE_SALT || "realtime-efficiency-device-v1");
const downloadsDir = path.resolve(process.env.HOME || "/Users/kakarot", "Downloads");
const uploadDir = path.join(rootDir, "导入分析文件");
const inboundUploadDir = path.join(rootDir, "入库实时看板导入");
const inboundEfficiencyUploadDir = path.join(rootDir, "入库实效看板导入");
const packingStatusUploadDir = path.join(rootDir, "打包状态分析导入");
const analysisExportDir = downloadsDir;
const releaseAssistantUploadDir = path.join(rootDir, "放单助手导入");
const releaseAssistantExportDir = downloadsDir;
const nightShiftRosterFile = path.join(rootDir, "night_shift_roster.json");
const emptyLocationZonesFile = path.join(rootDir, "empty_location_zones.json");
const emptyLocationExportDir = path.join(rootDir, "空库位导出");
const exceptionMasterFile = path.join(rootDir, "异常处理总表.csv");
const exceptionMasterWorkbookFile = path.join(rootDir, "异常处理总表.xls");
const qrSvgCache = new Map();
const qrSvgInflight = new Map();
const licenseSessions = new Map();
const exceptionMasterColumns = [
  ["type", "处理类型"],
  ["sku", "SKU"],
  ["ownerName", "货主名称"],
  ["displacedPickLocation", "异位拣选库位"],
  ["displacedPickQuantity", "异位拣选数量"],
  ["originalPickLocation", "原始拣选库位"],
  ["originalPickShortageQuantity", "原始拣选库位缺货数量"],
  ["originalPickAvailableQty", "原始拣选库位可用库存"],
  ["reduceLocation", "需要调减库位"],
  ["reduceQuantity", "需要调减数量"],
  ["damageLocation", "转残库位"],
  ["damageQuantity", "转残数量"],
  ["createdAt", "创建时间"],
];

function json(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  res.end(body);
}

function tryExecText(command, args = []) {
  try {
    return execFileSync(command, args, {
      encoding: "utf8",
      maxBuffer: 256 * 1024,
      timeout: 3000,
      windowsHide: true,
    }).trim();
  } catch {
    return "";
  }
}

function collectDeviceParts() {
  const parts = [
    `platform:${platform()}`,
    `host:${hostname()}`,
    `user:${userInfo().username || ""}`,
  ];

  if (platform() === "darwin") {
    const ioreg = tryExecText("ioreg", ["-rd1", "-c", "IOPlatformExpertDevice"]);
    const uuid = ioreg.match(/"IOPlatformUUID"\s=\s"([^"]+)"/)?.[1] || "";
    const serial = ioreg.match(/"IOPlatformSerialNumber"\s=\s"([^"]+)"/)?.[1] || "";
    parts.push(`mac_uuid:${uuid}`, `mac_serial:${serial}`);
  } else if (platform() === "win32") {
    const guidText = tryExecText("reg", ["query", "HKLM\\SOFTWARE\\Microsoft\\Cryptography", "/v", "MachineGuid"]);
    const machineGuid = guidText.match(/MachineGuid\s+REG_SZ\s+([^\r\n]+)/i)?.[1]?.trim() || "";
    const uuidText = tryExecText("wmic", ["csproduct", "get", "UUID"]);
    const biosUuid = uuidText.split(/\r?\n/).map((line) => line.trim()).find((line) => /^[0-9a-f-]{20,}$/i.test(line)) || "";
    parts.push(`win_machine_guid:${machineGuid}`, `win_bios_uuid:${biosUuid}`);
  } else {
    parts.push(
      `machine_id:${tryExecText("cat", ["/etc/machine-id"])}`,
      `dbus_machine_id:${tryExecText("cat", ["/var/lib/dbus/machine-id"])}`
    );
  }

  return parts.filter((part) => !part.endsWith(":"));
}

function currentDeviceInfo() {
  const parts = collectDeviceParts();
  const id = createHash("sha256").update(`${deviceSalt}\n${parts.join("\n")}`).digest("hex");
  return {
    id,
    label: `${hostname()} / ${platform()}`,
  };
}

function licenseSessionToken() {
  return randomBytes(32).toString("base64url");
}

function rememberLicenseSession(session, user) {
  licenseSessions.set(session, {
    username: user.username,
    role: user.role,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
  });
}

function activeLicenseSession(req, url) {
  if (!licenseApiUrl) return { ok: true, role: "user" };
  const token = req.headers["x-license-session"] || url.searchParams.get("licenseSession") || "";
  const session = licenseSessions.get(String(token));
  if (!session || session.expiresAt < Date.now()) {
    if (token) licenseSessions.delete(String(token));
    return null;
  }
  session.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  return session;
}

function routeAllowsGuest(method, pathname) {
  return (method === "GET" && pathname === "/api/auth/config")
    || (method === "POST" && pathname === "/api/auth/login");
}

function ensureLicensedRequest(req, url) {
  if (!licenseApiUrl || !url.pathname.startsWith("/api/") || routeAllowsGuest(req.method, url.pathname)) return;
  if (!activeLicenseSession(req, url)) {
    throw Object.assign(new Error("请先登录授权账号"), { statusCode: 401 });
  }
}

async function loginWithLicenseServer(credentials) {
  const username = String(credentials.username || "").trim();
  const password = String(credentials.password || "");
  if (!username || !password) throw new Error("请输入账号和密码");

  if (!licenseApiUrl) {
    const session = licenseSessionToken();
    rememberLicenseSession(session, { username, role: "user" });
    return { ok: true, username, role: "user", session, localOnly: true };
  }

  const device = currentDeviceInfo();
  let response;
  try {
    response = await fetch(`${licenseApiUrl}/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        appId: licenseAppId,
        username,
        password,
        deviceId: device.id,
        deviceLabel: device.label,
      }),
    });
  } catch {
    throw new Error("授权服务器连接失败，请检查网络或 LICENSE_API_URL");
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) {
    throw new Error(data.error || "账号验证失败");
  }

  const role = data.role === "admin" ? "admin" : "user";
  const session = licenseSessionToken();
  rememberLicenseSession(session, { username: data.username || username, role });
  return {
    ok: true,
    username: data.username || username,
    role,
    session,
    bound: Boolean(data.bound),
  };
}

function ensureWorkspacePath(rawPath) {
  const resolved = path.resolve(String(rawPath || ""));
  if (!resolved.startsWith(rootDir) && !resolved.startsWith(downloadsDir)) {
    throw new Error("文件路径不在当前工作区或 Downloads 内");
  }
  return resolved;
}

function ensureReadableWorkbookPath(rawPath) {
  const value = String(rawPath || "").trim();
  if (!value) throw new Error("请先拉取 WMS 或拖入 Excel 文件");
  const resolved = path.resolve(value);
  if (!resolved.startsWith(rootDir) && !resolved.startsWith(downloadsDir)) {
    throw new Error("只能分析当前工作区或 Downloads 里的 Excel 文件");
  }
  if (!/\.xlsx?(\.xlsx?)?$/i.test(resolved)) {
    throw new Error("请选择 .xls 或 .xlsx 文件");
  }
  return resolved;
}

function fileInfo(filePath) {
  const resolved = ensureWorkspacePath(filePath);
  return {
    name: path.basename(resolved),
    path: resolved,
    downloadUrl: `/api/download?path=${encodeURIComponent(resolved)}`,
  };
}

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll("\"", "\"\"")}"`;
}

function htmlCell(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;");
}

function formatLocalDateTime(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function parseCsvLine(line) {
  const cells = [];
  let text = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (quoted) {
      if (char === "\"") {
        if (line[index + 1] === "\"") {
          text += "\"";
          index += 1;
        } else {
          quoted = false;
        }
      } else {
        text += char;
      }
    } else if (char === "," ) {
      cells.push(text);
      text = "";
    } else if (char === "\"" && text === "") {
      quoted = true;
    } else {
      text += char;
    }
  }
  cells.push(text);
  return cells;
}

function parseLocalDateTime(value) {
  const match = String(value || "").trim().match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?/);
  if (!match) return null;
  const [, year, month, day, hour, minute, second = "0"] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
  return Number.isNaN(date.getTime()) ? null : date;
}

function ymd(date) {
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function localDatePlusDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function exceptionShiftKey(createdAt) {
  const date = parseLocalDateTime(createdAt);
  if (!date) return "";
  const minutes = date.getHours() * 60 + date.getMinutes();
  if (minutes >= 17 * 60 + 30) return ymd(date);
  if (minutes < 4 * 60) return ymd(localDatePlusDays(date, -1));
  return ymd(date);
}

async function ensureExceptionMasterFile() {
  const header = exceptionMasterColumns.map(([, label]) => csvCell(label)).join(",");
  try {
    const text = await fs.readFile(exceptionMasterFile, "utf8");
    const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/);
    const existingHeader = parseCsvLine(lines[0] || "");
    const expectedHeader = exceptionMasterColumns.map(([, label]) => label);
    if (existingHeader.length === expectedHeader.length && existingHeader.every((label, index) => label === expectedHeader[index])) return;

    const migratedLines = lines.slice(1).filter((line) => line.trim()).map((line) => {
      const cells = parseCsvLine(line);
      const byLabel = new Map(existingHeader.map((label, index) => [label, cells[index] ?? ""]));
      return exceptionMasterColumns.map(([, label]) => csvCell(byLabel.get(label) ?? "")).join(",");
    });
    await fs.writeFile(exceptionMasterFile, `\uFEFF${header}\n${migratedLines.length ? `${migratedLines.join("\n")}\n` : ""}`, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    await fs.writeFile(exceptionMasterFile, `\uFEFF${header}\n`, "utf8");
  }
}

async function appendExceptionMasterRecord(record) {
  await ensureExceptionMasterFile();
  const hasCreatedAt = Object.prototype.hasOwnProperty.call(record, "createdAt");
  const normalized = {
    ...record,
    createdAt: hasCreatedAt ? formatLocalDateTime(record.createdAt) : formatLocalDateTime(new Date()),
  };
  const line = exceptionMasterColumns.map(([key]) => csvCell(normalized[key])).join(",");
  await fs.appendFile(exceptionMasterFile, `${line}\n`, "utf8");
  return writeExceptionMasterWorkbook();
}

async function readExceptionMasterRecords() {
  await ensureExceptionMasterFile();
  const text = await fs.readFile(exceptionMasterFile, "utf8");
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim());
  if (lines.length <= 1) return [];
  return lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    return Object.fromEntries(exceptionMasterColumns.map(([key], index) => [key, cells[index] ?? ""]));
  });
}

async function writeExceptionMasterWorkbook() {
  const records = await readExceptionMasterRecords();
  const shiftIndexes = new Map();
  const reduceOnlyKeys = new Set(["reduceLocation", "reduceQuantity"]);
  const isReduceOnlyRecord = (record) => Boolean(record.reduceLocation || record.reduceQuantity)
    && exceptionMasterColumns.every(([key]) => reduceOnlyKeys.has(key) || !String(record[key] ?? "").trim());
  const rows = records.map((record, index) => {
    const key = exceptionShiftKey(record.createdAt) || "__unknown__";
    if (!shiftIndexes.has(key)) shiftIndexes.set(key, shiftIndexes.size);
    return {
      record,
      className: shiftIndexes.get(key) % 2 === 0 ? "shift-a" : "shift-b",
      hasExtraReduceRow: record.type === "异位拣选" && isReduceOnlyRecord(records[index + 1] || {}),
    };
  });
  const headers = exceptionMasterColumns.map(([, label]) => label);
  const displacedLinkedKeys = new Set(["displacedPickLocation", "displacedPickQuantity", "reduceLocation", "reduceQuantity"]);
  const rowHtml = (record, className, hasExtraReduceRow) => {
    const reduceOnly = isReduceOnlyRecord(record);
    const displacedOriginalKeys = new Set(["originalPickLocation", "originalPickAvailableQty"]);
    return `<tr class="${className}">${exceptionMasterColumns.map(([key]) => {
      const value = record[key];
      const isReduceOnlyCell = reduceOnly && reduceOnlyKeys.has(key) && String(value ?? "").trim();
      const isDisplacedOriginalCell = record.type === "异位拣选" && displacedOriginalKeys.has(key) && String(value ?? "").trim();
      const isDisplacedLinkedCell = hasExtraReduceRow && displacedLinkedKeys.has(key) && String(value ?? "").trim();
      const cellClass = isReduceOnlyCell || isDisplacedOriginalCell
        ? ` class="reduce-only-cell"`
        : isDisplacedLinkedCell ? ` class="displaced-linked-cell"` : "";
      return `<td${cellClass}>${htmlCell(value)}</td>`;
    }).join("")}</tr>`;
  };
  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    table { border-collapse: collapse; font-family: Arial, "Microsoft YaHei", sans-serif; font-size: 12pt; }
    th, td { border: 1px solid #b7c6d6; padding: 8px 12px; mso-number-format: "\\@"; white-space: nowrap; }
    th { background: #dfeaf1; color: #1f3442; font-weight: 700; }
    .shift-a td { background: #eaf4ff; }
    .shift-b td { background: #fff3e6; }
    .reduce-only-cell { color: #c23b32; font-weight: 700; }
    .displaced-linked-cell { color: #1769aa; font-weight: 700; }
  </style>
</head>
<body>
  <table>
    <thead><tr>${headers.map((header) => `<th>${htmlCell(header)}</th>`).join("")}</tr></thead>
    <tbody>
      ${rows.map(({ record, className, hasExtraReduceRow }) => rowHtml(record, className, hasExtraReduceRow)).join("\n      ")}
    </tbody>
  </table>
</body>
</html>`;
  await fs.writeFile(exceptionMasterWorkbookFile, html, "utf8");
  return fileInfo(exceptionMasterWorkbookFile);
}

function todayFixedOffset() {
  const shifted = new Date(Date.now() - 4 * 3600 * 1000);
  return `${shifted.getUTCFullYear()}-${pad2(shifted.getUTCMonth() + 1)}-${pad2(shifted.getUTCDate())}`;
}

function wmsDefaultBusinessDate() {
  const shifted = new Date(Date.now() - 4 * 3600 * 1000);
  const today = `${shifted.getUTCFullYear()}-${pad2(shifted.getUTCMonth() + 1)}-${pad2(shifted.getUTCDate())}`;
  return shifted.getUTCHours() < 3 ? addDays(today, -1) : today;
}

function defaultWeek() {
  const today = todayFixedOffset();
  return { year: Number(today.slice(0, 4)), week: weekNumberForDate(today) };
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const text = Buffer.concat(chunks).toString("utf8");
  return text ? JSON.parse(text) : {};
}

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

function compactErrorText(value) {
  return String(value || "")
    .replace(/\\"/g, "\"")
    .replace(/\\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractAppleScriptError(rawText) {
  const text = compactErrorText(rawText);
  const executionMatch = text.match(/execution error:\s*(.*?)(?:\s*\(-?\d+\))?\s*$/i);
  if (executionMatch?.[1]) return compactErrorText(executionMatch[1]);

  const matches = [...text.matchAll(/error\s+"([^"]+)"/g)];
  const last = matches[matches.length - 1]?.[1];
  return last ? compactErrorText(last) : "";
}

function publicErrorMessage(error) {
  const raw = compactErrorText(error?.message || error);
  const extracted = extractAppleScriptError(raw);
  const direct = extracted || raw;
  const text = `${direct} ${raw}`.toLowerCase();

  if (direct.includes("未获得授权将Apple事件发送给Safari") || raw.includes("(-1743)")) {
    return "macOS 没有允许当前程序控制 Safari，请在 系统设置 > 隐私与安全性 > 自动化 里允许后再拉取 WMS";
  }
  if (direct.includes("WMS 拣选单页面")) {
    return "Safari 里没有找到 WMS 拣选单页面，请先打开 出库管理 > 拣选单";
  }
  if (direct.includes("已登录的 WMS 标签页") || direct.includes("已登录的 WMS 页面")) {
    return "Safari 里没有找到已登录的 WMS 标签页，请先在 Safari 打开并登录 WMS";
  }
  if (direct.includes("登录已超时") || direct.includes("请重新登录")) {
    return "WMS 登录已超时，请先在 Safari 的 WMS 页面重新登录";
  }
  if (text.includes("no permission") || text.includes("code 10000") || raw.includes("无权限")) {
    return "WMS 返回无权限：请确认当前账号有“拣选单导出”权限";
  }
  if (text.includes("osascript") || text.includes("command failed")) {
    return "WMS 拉取失败：请确认 Safari 已打开并登录 WMS";
  }

  const publicText = direct || raw || "请求失败";
  return publicText.length > 180 ? `${publicText.slice(0, 180)}...` : publicText;
}

function qrSvgForCode(code) {
  const value = String(code || "").trim();
  if (!value) throw new Error("缺少二维码内容");
  if (qrSvgCache.has(value)) return Promise.resolve(qrSvgCache.get(value));
  if (qrSvgInflight.has(value)) return qrSvgInflight.get(value);
  const promise = new Promise((resolve, reject) => {
    execFile("python3", [qrScriptPath, value], { encoding: "buffer", maxBuffer: 512 * 1024, timeout: 5000 }, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }
      qrSvgCache.set(value, stdout);
      resolve(stdout);
    });
  }).finally(() => qrSvgInflight.delete(value));
  qrSvgInflight.set(value, promise);
  return promise;
}

async function readNightShiftRoster() {
  try {
    const text = await fs.readFile(nightShiftRosterFile, "utf8");
    const parsed = JSON.parse(text);
    return Array.isArray(parsed.names) ? uniqueNightShiftNames(parsed.names) : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

function uniqueNightShiftNames(names) {
  const seen = new Set();
  return names.map((name) => String(name).trim()).filter((name) => {
    if (!name || seen.has(name)) return false;
    seen.add(name);
    return true;
  });
}

async function saveNightShiftRoster(names) {
  const cleaned = uniqueNightShiftNames(names);
  await fs.writeFile(nightShiftRosterFile, `${JSON.stringify({ names: cleaned }, null, 2)}\n`, "utf8");
  return cleaned;
}

function uniqueEmptyLocationZones(zones) {
  const seen = new Set();
  return zones.map((zone) => String(zone).trim()).filter((zone) => {
    if (!zone || seen.has(zone)) return false;
    seen.add(zone);
    return true;
  });
}

async function readEmptyLocationZones() {
  try {
    const text = await fs.readFile(emptyLocationZonesFile, "utf8");
    const parsed = JSON.parse(text);
    return Array.isArray(parsed.zones) ? uniqueEmptyLocationZones(parsed.zones) : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function saveEmptyLocationZones(zones) {
  const cleaned = uniqueEmptyLocationZones(zones);
  await fs.writeFile(emptyLocationZonesFile, `${JSON.stringify({ zones: cleaned }, null, 2)}\n`, "utf8");
  return cleaned;
}

function previewDay(payload) {
  return completeWindow(buildShiftWindow(payload));
}

function previewWeek(payload) {
  return buildWeekWindows(payload);
}

function wmsPickingWindowForDate(date) {
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

function wmsInboundTaskWindowForDate(date) {
  return completeWindow({
    businessDate: date,
    shift: "inbound-day",
    shiftLabel: "入库自然日",
    taskLabel: "上架/收货上架",
    startDate: date,
    startTime: "00:00",
    endDate: addDays(date, 1),
    endTime: "00:00",
  });
}

function publicResult(result) {
  return {
    ...result,
    fileItems: result.files.map(fileInfo),
    primaryFile: result.primaryFile,
    primaryFileItem: fileInfo(result.primaryFile),
    folder: result.folder,
  };
}

async function clearDirectory(dir) {
  const resolved = path.resolve(dir);
  if (!resolved.startsWith(rootDir)) {
    throw new Error("清理目录不在当前工作区内");
  }
  await fs.rm(resolved, { recursive: true, force: true });
  await fs.mkdir(resolved, { recursive: true });
  return path.relative(rootDir, resolved) || path.basename(resolved);
}

async function clearRuntimeCache() {
  qrSvgCache.clear();
  qrSvgInflight.clear();
  const targets = [
    uploadDir,
    path.join(rootDir, "导出文件"),
  ];
  const cleared = [];
  for (const target of targets) {
    cleared.push(await clearDirectory(target));
  }
  return {
    cleared,
    kept: [
      path.basename(exceptionMasterFile),
      path.basename(exceptionMasterWorkbookFile),
      path.basename(nightShiftRosterFile),
      path.basename(path.dirname(day1JsonPath)),
      path.basename(path.dirname(pickQuantityTrendJsonPath)),
    ],
  };
}

async function serveStatic(req, res) {
  const url = new URL(req.url, "http://localhost");
  const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const resolved = path.resolve(appDir, `.${pathname}`);
  if (!resolved.startsWith(appDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  try {
    const data = await fs.readFile(resolved);
    const ext = path.extname(resolved).toLowerCase();
    const type = {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "application/javascript; charset=utf-8",
      ".svg": "image/svg+xml",
      ".png": "image/png",
      ".pdf": "application/pdf",
    }[ext] || "application/octet-stream";
    res.writeHead(200, { "content-type": type });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}

async function route(req, res) {
  const url = new URL(req.url, "http://localhost");

  try {
    ensureLicensedRequest(req, url);

    if (req.method === "GET" && url.pathname === "/api/auth/config") {
      json(res, 200, {
        required: Boolean(licenseApiUrl),
        appId: licenseAppId,
      });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/auth/login") {
      json(res, 200, await loginWithLicenseServer(await readBody(req)));
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/bootstrap") {
      const today = todayFixedOffset();
      const wmsBusinessDate = wmsDefaultBusinessDate();
      const week = defaultWeek();
      const weekStart = weekStartForYearWeek(week.year, week.week);
      json(res, 200, {
        today,
        wmsBusinessDate,
        defaultYear: week.year,
        defaultWeek: week.week,
        defaultWeekStart: weekStart,
        defaultWeekEnd: addDays(weekStart, 6),
      });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/preview/day") {
      json(res, 200, { window: previewDay(await readBody(req)) });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/preview/week") {
      json(res, 200, { windows: previewWeek(await readBody(req)) });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/export/day") {
      json(res, 200, publicResult(await exportDay(await readBody(req))));
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/export/week") {
      json(res, 200, publicResult(await exportWeek(await readBody(req))));
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/analyze/picking") {
      const body = await readBody(req);
      const filePath = ensureReadableWorkbookPath(body.filePath);
      await fs.access(filePath);
      const analysis = await analyzeWithDay1Productivity(filePath);
      const trendHistory = await addPickQuantityTrendAnalysis({
        businessDate: body.businessDate || "",
        filePath,
        analysis,
      });
      json(res, 200, attachPickQuantityTrend(analysis, trendHistory));
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/wms/picking-day") {
      const body = await readBody(req);
      const date = String(body.date || todayFixedOffset());
      const windowSpec = wmsPickingWindowForDate(date);
      const exported = await downloadNativeWmsPickOrderExport(windowSpec, uploadDir);
      const analysis = await analyzeWithDay1Productivity(exported.filePath);
      const trendHistory = await addPickQuantityTrendAnalysis({
        businessDate: date,
        filePath: exported.filePath,
        analysis,
      });
      json(res, 200, {
        window: windowSpec,
        rawFileItem: fileInfo(exported.filePath),
        analysis: attachPickQuantityTrend(analysis, trendHistory),
      });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/wms/inbound-task-day") {
      const body = await readBody(req);
      const date = String(body.date || todayFixedOffset());
      const windowSpec = wmsInboundTaskWindowForDate(date);
      const exported = await downloadInboundPutawayTaskExport(windowSpec, inboundUploadDir);
      json(res, 200, {
        window: windowSpec,
        rawFileItem: fileInfo(exported.filePath),
        preview: exported.preview,
        summary: exported.summary,
      });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/exception/inventory") {
      const body = await readBody(req);
      json(res, 200, queryWmsInventoryBySku(body.sku));
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/exception/waybill") {
      const body = await readBody(req);
      json(res, 200, queryWmsWaybill(body.waybill));
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/exception/location") {
      const body = await readBody(req);
      json(res, 200, queryWmsInventoryByLocation(body.location));
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/exception/record") {
      const body = await readBody(req);
      json(res, 200, { fileItem: await appendExceptionMasterRecord(body.record || body) });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/exception/records") {
      json(res, 200, { records: await readExceptionMasterRecords() });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/exception/master") {
      json(res, 200, { fileItem: await writeExceptionMasterWorkbook() });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/cache/clear") {
      json(res, 200, await clearRuntimeCache());
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/qr") {
      const svg = await qrSvgForCode(url.searchParams.get("code"));
      res.writeHead(200, {
        "content-type": "image/svg+xml; charset=utf-8",
        "cache-control": "public, max-age=86400",
      });
      res.end(svg);
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/release-assistant/upload") {
      const rawName = decodeURIComponent(url.searchParams.get("name") || "release-assistant.xlsx");
      if (!/\.xlsx(\.xlsx)?$/i.test(rawName)) {
        throw new Error("只能拖入 .xlsx / .xlsx.xlsx 文件");
      }
      const safeName = rawName.replace(/[\\/:\0]/g, "_");
      const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
      const filePath = path.join(releaseAssistantUploadDir, `${stamp}_${safeName}`);
      const buffer = await readRawBody(req);
      if (!buffer.length) throw new Error("文件内容为空");
      await fs.mkdir(releaseAssistantUploadDir, { recursive: true });
      await fs.writeFile(filePath, buffer);
      const result = await exportReleaseAssistantWorkbook({
        filePath,
        outputDir: releaseAssistantExportDir,
      });
      json(res, 200, {
        ...result,
        fileItem: fileInfo(result.filePath),
      });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/inbound-efficiency/upload") {
      const rawName = decodeURIComponent(url.searchParams.get("name") || "inbound-efficiency.xlsx");
      if (!/\.xlsx(\.xlsx)?$/i.test(rawName)) {
        throw new Error("只能拖入 .xlsx / .xlsx.xlsx 文件");
      }
      const safeName = rawName.replace(/[\\/:\0]/g, "_");
      const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
      const filePath = path.join(inboundEfficiencyUploadDir, `${stamp}_${safeName}`);
      const buffer = await readRawBody(req);
      if (!buffer.length) throw new Error("文件内容为空");
      await fs.mkdir(inboundEfficiencyUploadDir, { recursive: true });
      await fs.writeFile(filePath, buffer);
      const result = analyzeInboundEfficiencyWorkbook(filePath);
      json(res, 200, {
        ...result,
        source: fileInfo(filePath),
      });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/packing-status/upload") {
      const rawName = decodeURIComponent(url.searchParams.get("name") || "packing-status.xlsx");
      if (!/\.xlsx(\.xlsx)?$/i.test(rawName)) {
        throw new Error("只能拖入 .xlsx / .xlsx.xlsx 文件");
      }
      const safeName = rawName.replace(/[\\/:\0]/g, "_");
      const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
      const filePath = path.join(packingStatusUploadDir, `${stamp}_${safeName}`);
      const buffer = await readRawBody(req);
      if (!buffer.length) throw new Error("文件内容为空");
      await fs.mkdir(packingStatusUploadDir, { recursive: true });
      await fs.writeFile(filePath, buffer);
      json(res, 200, {
        ...analyzePackingStatusWorkbook(filePath),
        source: fileInfo(filePath),
      });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/analyze/upload") {
      const rawName = decodeURIComponent(url.searchParams.get("name") || "picking.xlsx");
      if (!/\.xlsx?(\.xlsx?)?$/i.test(rawName)) {
        throw new Error("只能导入 .xls 或 .xlsx 文件");
      }
      const safeName = rawName.replace(/[\\/:\0]/g, "_");
      const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
      const filePath = path.join(uploadDir, `${stamp}_${safeName}`);
      const buffer = await readRawBody(req);
      if (!buffer.length) throw new Error("文件内容为空");
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(filePath, buffer);
      const analysis = await analyzeWithDay1Productivity(filePath);
      const trendHistory = await addPickQuantityTrendAnalysis({ filePath, analysis });
      json(res, 200, attachPickQuantityTrend(analysis, trendHistory));
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/day1-productivity") {
      const history = await loadDay1History();
      json(res, 200, {
        available: history.people.length > 0,
        updatedAt: history.updatedAt || "",
        people: history.people,
        daily: history.daily.map((item) => ({
          businessDate: item.businessDate,
          sourceFile: item.sourceFile,
          people: (item.people || []).length,
        })),
        workbookItem: history.people.length ? fileInfo(day1WorkbookPath) : null,
        jsonItem: history.people.length ? fileInfo(day1JsonPath) : null,
      });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/pick-quantity-trend") {
      const history = await loadPickQuantityTrendHistory();
      json(res, 200, {
        available: history.daily.length > 0,
        updatedAt: history.updatedAt || "",
        daily: history.daily,
        workbookItem: history.daily.length ? fileInfo(pickQuantityTrendWorkbookPath) : null,
        jsonItem: history.daily.length ? fileInfo(pickQuantityTrendJsonPath) : null,
      });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/analyze/export") {
      const body = await readBody(req);
      const filePath = ensureReadableWorkbookPath(body.filePath);
      await fs.access(filePath);
      const result = await exportPickingAnalysisWorkbook({
        filePath,
        rosterNames: await readNightShiftRoster(),
        scope: body.scope === "current" ? "current" : "all",
        outputDir: analysisExportDir,
      });
      json(res, 200, {
        ...result,
        fileItem: fileInfo(result.filePath),
      });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/night-shift-roster") {
      json(res, 200, { names: await readNightShiftRoster() });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/night-shift-roster") {
      const body = await readBody(req);
      const names = Array.isArray(body.names)
        ? body.names
        : String(body.text || "").split(/\r?\n/);
      json(res, 200, { names: await saveNightShiftRoster(names) });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/empty-location-zones") {
      json(res, 200, { zones: await readEmptyLocationZones() });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/empty-location-zones") {
      const body = await readBody(req);
      const zones = Array.isArray(body.zones)
        ? body.zones
        : String(body.text || "").split(/\r?\n/);
      json(res, 200, { zones: await saveEmptyLocationZones(zones) });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/empty-location/query") {
      const body = await readBody(req);
      const zones = uniqueEmptyLocationZones(body.zones || []);
      if (!zones.length) throw Object.assign(new Error("请先选择库区"), { statusCode: 400 });
      const locationExported = await downloadWmsLocationExport(zones, emptyLocationExportDir);
      const inventoryExported = await downloadWmsInventoryLocationExport(zones, emptyLocationExportDir);
      const emptyLocations = analyzeEmptyLocationsFromExports(locationExported.filePath, inventoryExported.filePath);
      json(res, 200, {
        zones,
        total: locationExported.preview?.total ?? 0,
        inventoryTotal: inventoryExported.preview?.total ?? 0,
        emptyLocations,
        preview: locationExported.preview,
        inventoryPreview: inventoryExported.preview,
        rawFileItem: fileInfo(locationExported.filePath),
        inventoryRawFileItem: fileInfo(inventoryExported.filePath),
      });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/empty-location/export") {
      const body = await readBody(req);
      const rows = Array.isArray(body.rows) ? body.rows : [];
      if (!rows.length) throw Object.assign(new Error("没有可导出的空库位"), { statusCode: 400 });
      const exported = await exportEmptyLocationWorkbook({ rows, outputDir: emptyLocationExportDir });
      json(res, 200, { fileItem: fileInfo(exported.filePath) });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/open-analysis-folder") {
      const body = await readBody(req);
      const filePath = ensureReadableWorkbookPath(body.path);
      await fs.access(filePath);
      await new Promise((resolve, reject) => {
        execFile("open", ["-R", filePath], (error) => (error ? reject(error) : resolve()));
      });
      json(res, 200, { ok: true });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/download") {
      const filePath = ensureWorkspacePath(url.searchParams.get("path"));
      const data = await fs.readFile(filePath);
      const encodedName = encodeURIComponent(path.basename(filePath));
      const ext = path.extname(filePath).toLowerCase();
      const contentType = {
        ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ".xls": "application/vnd.ms-excel",
        ".csv": "text/csv; charset=utf-8",
      }[ext] || "application/octet-stream";
      res.writeHead(200, {
        "content-type": contentType,
        "content-disposition": `attachment; filename*=UTF-8''${encodedName}`,
      });
      res.end(data);
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/reveal") {
      const body = await readBody(req);
      const filePath = ensureWorkspacePath(body.path);
      await new Promise((resolve, reject) => {
        execFile("open", ["-R", filePath], (error) => (error ? reject(error) : resolve()));
      });
      json(res, 200, { ok: true });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/open-file") {
      const body = await readBody(req);
      const filePath = ensureWorkspacePath(body.path);
      await new Promise((resolve, reject) => {
        execFile("open", [filePath], (error) => (error ? reject(error) : resolve()));
      });
      json(res, 200, { ok: true });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/open-folder") {
      const body = await readBody(req);
      const targetPath = ensureWorkspacePath(body.path);
      const stats = await fs.stat(targetPath);
      const folderPath = stats.isDirectory() ? targetPath : path.dirname(targetPath);
      await new Promise((resolve, reject) => {
        execFile("open", [folderPath], (error) => (error ? reject(error) : resolve()));
      });
      json(res, 200, { ok: true });
      return;
    }

    await serveStatic(req, res);
  } catch (error) {
    json(res, error.statusCode || 500, {
      error: publicErrorMessage(error),
      detail: process.env.NODE_ENV === "development" ? error.stack || String(error) : undefined,
    });
  }
}

const server = http.createServer(route);
server.listen(port, "127.0.0.1", () => {
  console.log(`实时人效看板已启动: http://127.0.0.1:${port}`);
});
