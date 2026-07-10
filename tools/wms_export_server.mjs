import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import {
  addDays,
  analyzePickingWorkbook,
  buildShiftWindow,
  buildWeekWindows,
  completeWindow,
  exportDay,
  exportWeek,
  pad2,
  weekNumberForDate,
  weekStartForYearWeek,
} from "./wms_export_core.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const appDir = path.join(rootDir, "app");
const port = Number(process.env.PORT || 5317);
const defaultAnalysisPath = "/Users/kakarot/Downloads/_260613_020.xlsx.xlsx";
const uploadDir = path.join(rootDir, "导入分析文件");

function json(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  res.end(body);
}

function ensureWorkspacePath(rawPath) {
  const resolved = path.resolve(String(rawPath || ""));
  if (!resolved.startsWith(rootDir)) {
    throw new Error("文件路径不在当前工作区内");
  }
  return resolved;
}

function ensureReadableWorkbookPath(rawPath) {
  const resolved = path.resolve(String(rawPath || ""));
  const downloadsDir = path.resolve(process.env.HOME || "/Users/kakarot", "Downloads");
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

function todayFixedOffset() {
  const shifted = new Date(Date.now() - 4 * 3600 * 1000);
  return `${shifted.getUTCFullYear()}-${pad2(shifted.getUTCMonth() + 1)}-${pad2(shifted.getUTCDate())}`;
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

function previewDay(payload) {
  return completeWindow(buildShiftWindow(payload));
}

function previewWeek(payload) {
  return buildWeekWindows(payload);
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
    if (req.method === "GET" && url.pathname === "/api/bootstrap") {
      const today = todayFixedOffset();
      const week = defaultWeek();
      const weekStart = weekStartForYearWeek(week.year, week.week);
      json(res, 200, {
        today,
        defaultYear: week.year,
        defaultWeek: week.week,
        defaultWeekStart: weekStart,
        defaultWeekEnd: addDays(weekStart, 6),
        defaultAnalysisPath,
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
      const filePath = ensureReadableWorkbookPath(body.filePath || defaultAnalysisPath);
      await fs.access(filePath);
      json(res, 200, analyzePickingWorkbook(filePath));
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
      json(res, 200, analyzePickingWorkbook(filePath));
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/open-analysis-folder") {
      const body = await readBody(req);
      const filePath = ensureReadableWorkbookPath(body.path || defaultAnalysisPath);
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
    json(res, 500, {
      error: error.message || String(error),
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
}

const server = http.createServer(route);
server.listen(port, "127.0.0.1", () => {
  console.log(`人效计算模型已启动: http://127.0.0.1:${port}`);
});
