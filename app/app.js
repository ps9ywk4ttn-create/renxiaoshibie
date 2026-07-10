const state = {
  activeTab: "analysis",
  dayTaskMode: "pick",
  weekTaskMode: "pick",
  dayShift: "night",
  weekShift: "night",
  busy: false,
  fileItems: [],
  lastResult: null,
  analysisPath: "",
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const el = {
  tabs: $$(".tab"),
  forms: {
    day: $("#dayForm"),
    week: $("#weekForm"),
    analysis: $("#analysisForm"),
  },
  dayDate: $("#dayDate"),
  dayStartDate: $("#dayStartDate"),
  dayStartTime: $("#dayStartTime"),
  dayEndDate: $("#dayEndDate"),
  dayEndTime: $("#dayEndTime"),
  dayWorkHours: $("#dayWorkHours"),
  weekYear: $("#weekYear"),
  weekNumber: $("#weekNumber"),
  weekStartTime: $("#weekStartTime"),
  weekEndTime: $("#weekEndTime"),
  weekWorkHours: $("#weekWorkHours"),
  analysisFileInput: $("#analysisFileInput"),
  analysisFolderInput: $("#analysisFolderInput"),
  dropZone: $("#dropZone"),
  pickAnalysisFile: $("#pickAnalysisFile"),
  pickAnalysisFolder: $("#pickAnalysisFolder"),
  analysisContent: $("#analysisContent"),
  previewTableWrap: $(".table-wrap"),
  resultArea: $("#resultArea"),
  refreshPreview: $("#refreshPreview"),
  previewTitle: $("#previewTitle"),
  previewSubtitle: $("#previewSubtitle"),
  previewHead: $("#previewHead"),
  previewBody: $("#previewBody"),
  metrics: $("#metrics"),
  appStatus: $("#appStatus"),
  resultText: $("#resultText"),
  fileList: $("#fileList"),
};

function addDays(ymd, days) {
  const [year, month, day] = ymd.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

function setStatus(text, error = false) {
  el.appStatus.textContent = text;
  el.appStatus.classList.toggle("is-error", error);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatNumber(value) {
  if (value === "" || value == null || !Number.isFinite(Number(value))) return "-";
  return Number(value).toLocaleString("zh-CN");
}

function formatMinutes(value) {
  if (value === "" || value == null || !Number.isFinite(Number(value))) return "-";
  return `${Number(value).toLocaleString("zh-CN")} 分钟`;
}

function statusBadge(status) {
  const safe = escapeHtml(status || "-");
  const cls = status === "已拣选" ? "badge picked" : status === "拣选中" ? "badge picking" : "badge assigned";
  return `<span class="${cls}">${safe}</span>`;
}

function setBusy(isBusy) {
  state.busy = isBusy;
  $$("button").forEach((button) => {
    if (!button.classList.contains("tab") && !button.classList.contains("segment")) button.disabled = isBusy;
  });
  setStatus(isBusy ? "正在处理" : "本地服务已启动");
}

async function api(path, body, options = {}) {
  const controller = new AbortController();
  const timeoutMs = options.timeoutMs || 0;
  const timer = timeoutMs ? window.setTimeout(() => controller.abort(), timeoutMs) : null;
  try {
    const response = await fetch(path, {
      method: body ? "POST" : "GET",
      headers: body ? { "content-type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "请求失败");
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("导出超时，已停止等待 WMS 返回");
    }
    throw error;
  } finally {
    if (timer) window.clearTimeout(timer);
  }
}

async function uploadAnalysisFile(file) {
  if (!file) return;
  if (!/\.xlsx?(\.xlsx?)?$/i.test(file.name)) {
    throw new Error("只能分析 .xls / .xlsx 文件");
  }
  const response = await fetch(`/api/analyze/upload?name=${encodeURIComponent(file.name)}`, {
    method: "POST",
    headers: { "content-type": "application/octet-stream" },
    body: file,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "上传分析失败");
  state.analysisPath = data.source?.filePath || "";
  renderAnalysis(data);
  setStatus("分析完成");
}

function firstExcelFile(files) {
  return [...files]
    .filter((file) => /\.xlsx?(\.xlsx?)?$/i.test(file.name))
    .sort((a, b) => (b.lastModified || 0) - (a.lastModified || 0))[0] || null;
}

function selectTab(tab) {
  state.activeTab = tab;
  el.tabs.forEach((button) => button.classList.toggle("is-active", button.dataset.tab === tab));
  Object.entries(el.forms).forEach(([key, form]) => form.classList.toggle("is-active", key === tab));
  renderPreview();
}

function markShift(scope, shift) {
  state[`${scope}Shift`] = shift;
  $$(`.segmented[data-scope="${scope}"] .segment`).forEach((button) => {
    button.classList.toggle("is-active", button.dataset.shift === shift);
  });
}

function markTaskMode(scope, taskMode) {
  state[`${scope}TaskMode`] = taskMode;
  $$(`.segmented[data-scope="${scope}Task"] .segment`).forEach((button) => {
    button.classList.toggle("is-active", button.dataset.taskMode === taskMode);
  });
  renderPreview();
}

function applyDayShift(shift) {
  markShift("day", shift);
  const date = el.dayDate.value;
  if (!date) return;

  if (shift === "day") {
    el.dayStartDate.value = date;
    el.dayStartTime.value = "04:00";
    el.dayEndDate.value = date;
    el.dayEndTime.value = "17:30";
  } else if (shift === "night") {
    el.dayStartDate.value = addDays(date, -1);
    el.dayStartTime.value = "17:30";
    el.dayEndDate.value = date;
    el.dayEndTime.value = "04:00";
  }
  renderPreview();
}

function applyWeekShift(shift) {
  markShift("week", shift);
  if (shift === "day") {
    el.weekStartTime.value = "04:00";
    el.weekEndTime.value = "17:30";
  } else if (shift === "night") {
    el.weekStartTime.value = "17:30";
    el.weekEndTime.value = "04:00";
  }
  renderPreview();
}

function dayPayload() {
  return {
    date: el.dayDate.value,
    taskMode: state.dayTaskMode,
    shift: state.dayShift,
    startDate: el.dayStartDate.value,
    startTime: el.dayStartTime.value,
    endDate: el.dayEndDate.value,
    endTime: el.dayEndTime.value,
    workHours: el.dayWorkHours.value,
  };
}

function weekPayload() {
  return {
    year: Number(el.weekYear.value),
    week: Number(el.weekNumber.value),
    taskMode: state.weekTaskMode,
    shift: state.weekShift,
    customStartTime: el.weekStartTime.value,
    customEndTime: el.weekEndTime.value,
    workHours: el.weekWorkHours.value,
  };
}

function table(headers, rows) {
  el.previewHead.innerHTML = `<tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr>`;
  el.previewBody.innerHTML = rows.map((row) => (
    `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`
  )).join("");
}

function resetMetrics() {
  el.metrics.innerHTML = `
    <div class="metric"><span>任务行数</span><strong>-</strong></div>
    <div class="metric"><span>总件数</span><strong>-</strong></div>
    <div class="metric"><span>总工时</span><strong>-</strong></div>
    <div class="metric"><span>人效</span><strong>-</strong></div>
  `;
}

function renderMetrics(totals) {
  el.metrics.innerHTML = `
    <div class="metric"><span>任务行数</span><strong>${totals.rows}</strong></div>
    <div class="metric"><span>总件数</span><strong>${totals.totalPieces ?? totals.actualQty}</strong></div>
    <div class="metric"><span>总工时</span><strong>${totals.workHours || "-"}</strong></div>
    <div class="metric"><span>人效</span><strong>${totals.productivity || "-"}</strong></div>
  `;
}

function renderAnalysisMetrics(result) {
  const totals = result.totals;
  el.metrics.innerHTML = `
    <div class="metric"><span>总单数</span><strong>${formatNumber(totals.rows)}</strong></div>
    <div class="metric"><span>已分配</span><strong>${formatNumber(totals.assignedRows)}</strong></div>
    <div class="metric"><span>拣选中</span><strong>${formatNumber(totals.pickingRows)}</strong></div>
    <div class="metric"><span>已拣选</span><strong>${formatNumber(totals.pickedRows)}</strong></div>
    <div class="metric"><span>已拣选数量</span><strong>${formatNumber(totals.completedQuantity)}</strong></div>
    <div class="metric"><span>只已分配人员</span><strong>${formatNumber(totals.assignedOnlyPeople)}</strong></div>
  `;
}

function rowsTable(headers, rows, options = {}) {
  const emptyText = options.emptyText || "没有数据";
  if (!rows.length) return `<div class="empty-state">${escapeHtml(emptyText)}</div>`;
  return `
    <div class="analysis-table-wrap">
      <table class="${options.compact ? "compact" : ""}">
        <thead>
          <tr>${headers.map((header) => `<th>${escapeHtml(header.label)}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              ${headers.map((header) => {
                const raw = typeof header.value === "function" ? header.value(row) : row[header.key];
                const html = header.html ? raw : escapeHtml(raw ?? "");
                return `<td>${html}</td>`;
              }).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function personTable(rows, emptyText) {
  return rowsTable([
    { label: "人员", value: (row) => row.person },
    { label: "总单数", value: (row) => formatNumber(row.rows) },
    { label: "已分配单", value: (row) => formatNumber(row.assignedRows) },
    { label: "拣选中单", value: (row) => formatNumber(row.pickingRows) },
    { label: "已拣选单", value: (row) => formatNumber(row.completedRows) },
    { label: "已分配数量", value: (row) => formatNumber(row.assignedQuantity) },
    { label: "拣选中数量", value: (row) => formatNumber(row.pickingQuantity) },
    { label: "已拣选数量", value: (row) => formatNumber(row.completedQuantity) },
    { label: "拣选次数", value: (row) => formatNumber(row.numberOfPicks) },
    { label: "库位数", value: (row) => formatNumber(row.invLocationNum) },
    { label: "容器", value: (row) => row.containers.join(", ") || "-" },
  ], rows, { emptyText });
}

function timeSortValue(row) {
  return row.startedAtMs ?? row.createdAtMs ?? 0;
}

function durationText(row, analyzedAtMs) {
  if (row.durationMinutes != null) return formatMinutes(row.durationMinutes);
  if (!row.startTime || row.startTime === "-") return "未开始";
  if (!row.endTime || row.endTime === "-") {
    const minutes = Math.max(0, Math.round(((Number(analyzedAtMs) - row.startedAtMs) / 60000) * 10) / 10);
    return `进行中 ${formatMinutes(minutes)}`;
  }
  return "-";
}

function gapText(previous, current) {
  if (!previous) return "-";
  if (current.startedAtMs == null) return "本单未开始";
  if (previous.endedAtMs != null) {
    return `完成间隔 ${formatMinutes(Math.round(((current.startedAtMs - previous.endedAtMs) / 60000) * 10) / 10)}`;
  }
  if (previous.startedAtMs != null) {
    return `开始间隔 ${formatMinutes(Math.round(((current.startedAtMs - previous.startedAtMs) / 60000) * 10) / 10)}`;
  }
  return "-";
}

function personTimelineSections(result) {
  if (!result.orderDurations.length) return `<div class="empty-state">没有单据数据</div>`;
  const rowsByPerson = new Map();
  for (const row of result.orderDurations.filter((item) => item.startedAtMs != null)) {
    if (!rowsByPerson.has(row.person)) rowsByPerson.set(row.person, []);
    rowsByPerson.get(row.person).push(row);
  }

  return result.people.filter((person) => person.startedRows > 0).map((person) => {
    const rows = (rowsByPerson.get(person.person) || [])
      .sort((a, b) => timeSortValue(a) - timeSortValue(b) || a.pickOrderNumber.localeCompare(b.pickOrderNumber));
    if (!rows.length) return "";

    return `
      <div class="timeline-person">
        <div class="timeline-person-head">
          <div>
            <strong>${escapeHtml(person.person)}</strong>
            <span>已拣选 ${formatNumber(person.completedRows)} 单 / ${formatNumber(person.completedQuantity)} 件</span>
          </div>
          <div class="timeline-person-stats">
            <span>总单 ${formatNumber(person.rows)}</span>
            <span>拣选中 ${formatNumber(person.pickingRows)}</span>
            <span>已分配 ${formatNumber(person.assignedRows)}</span>
          </div>
        </div>
        <div class="analysis-table-wrap timeline-table-wrap">
          <table class="compact timeline-table">
            <thead>
              <tr>
                <th>序</th>
                <th>单号</th>
                <th>状态</th>
                <th>数量</th>
                <th>开始</th>
                <th>完成</th>
                <th>单内时间</th>
                <th>上单间隔</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map((row, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${escapeHtml(row.pickOrderNumber)}</td>
                  <td>${statusBadge(row.statusGroup)}</td>
                  <td>${formatNumber(row.quantityOfPick)}</td>
                  <td>${escapeHtml(row.startTime && row.startTime !== "-" ? row.startTime : "未开始")}</td>
                  <td>${escapeHtml(row.endTime && row.endTime !== "-" ? row.endTime : "未完成")}</td>
                  <td>${escapeHtml(durationText(row, result.source.analyzedAtMs))}</td>
                  <td>${escapeHtml(gapText(rows[index - 1], row))}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }).join("");
}

function renderAnalysis(result) {
  state.lastResult = { mode: "analysis", result };
  renderAnalysisMetrics(result);
  el.previewTitle.textContent = "拣选状态分析";
  el.previewSubtitle.textContent = `${result.source.filePath} / ${result.source.rows} 条 / ${result.source.createdMin || "-"} 至 ${result.source.createdMax || "-"}`;
  el.previewTableWrap.hidden = true;
  el.resultArea.hidden = true;
  el.refreshPreview.hidden = true;

  el.analysisContent.innerHTML = `
    <section class="analysis-section">
      <div class="section-title">
        <h3>规则</h3>
        <span>人员字段：${escapeHtml(result.rules.personField)}</span>
      </div>
      <div class="rule-grid">
        <div><strong>拣选中</strong><span>${escapeHtml(result.rules.pickingStatus)}</span></div>
        <div><strong>已分配</strong><span>${escapeHtml(result.rules.assignedStatus)}</span></div>
        <div><strong>已拣选</strong><span>${escapeHtml(result.rules.pickedStatus)}</span></div>
        <div><strong>数量</strong><span>${escapeHtml(result.rules.quantityField)}</span></div>
        <div><strong>耗时/间隔</strong><span>${escapeHtml(result.rules.durationFormula)}；${escapeHtml(result.rules.gapFormula)}</span></div>
      </div>
    </section>

    <section class="analysis-grid">
      <div class="analysis-section">
        <div class="section-title">
          <h3>拣选中的人</h3>
          <span>${formatNumber(result.pickingPeople.length)} 人</span>
        </div>
        ${personTable(result.pickingPeople, "没有拣选中的人")}
      </div>

      <div class="analysis-section">
        <div class="section-title">
          <h3>已分配但未在拣选的人</h3>
          <span>${formatNumber(result.assignedOnlyPeople.length)} 人</span>
        </div>
        ${personTable(result.assignedOnlyPeople, "没有只处于已分配的人")}
      </div>
    </section>

    <section class="analysis-section">
      <div class="section-title">
        <h3>每个人状态汇总</h3>
        <span>已分配/拣选中/已拣选按开始和完成时间判断</span>
      </div>
      ${personTable(result.people, "没有人员数据")}
    </section>

    <section class="analysis-section">
      <div class="section-title">
        <h3>每个人拣选时间</h3>
        <span>无完成时间按当前分析时间 ${escapeHtml(result.source.analyzedAt || "-")} 计算进行中时间</span>
      </div>
      <div class="timeline-list">
        ${personTimelineSections(result)}
      </div>
    </section>
  `;
}

function selectedWorkHours(mode) {
  return mode === "week" ? el.weekWorkHours.value : el.dayWorkHours.value;
}

function totalsForDisplay(result) {
  const totals = { ...result.totals };
  const workHours = selectedWorkHours(result.mode);
  const hours = Number(workHours || 0);
  totals.workHours = workHours === "" || workHours == null ? "" : hours;
  totals.productivity = hours > 0 ? Number(((totals.totalPieces ?? totals.actualQty) / hours).toFixed(2)) : "";
  return totals;
}

async function renderPreview() {
  if (state.activeTab === "analysis") {
    el.previewTableWrap.hidden = true;
    el.resultArea.hidden = true;
    el.refreshPreview.hidden = true;
    if (!state.lastResult || state.lastResult.mode !== "analysis") {
      resetMetrics();
      el.previewTitle.textContent = "拣选状态分析";
      el.previewSubtitle.textContent = "按 Delegator 统计人员；非拣选中统一归为已分配";
    }
    return;
  }

  try {
    el.previewTableWrap.hidden = false;
    el.resultArea.hidden = false;
    el.refreshPreview.hidden = false;
    el.analysisContent.innerHTML = "";
    resetMetrics();
    if (state.activeTab === "day") {
      const data = await api("/api/preview/day", dayPayload());
      const item = data.window;
      el.previewTitle.textContent = "日表窗口";
      el.previewSubtitle.textContent = `${item.taskLabel} / ${item.shiftLabel} / 完成时间：${item.startDisplay} - ${item.endDisplay}`;
      table(["任务类型", "归属日期", "班次", "开始", "结束"], [[item.taskLabel, item.businessDate, item.shiftLabel, item.startDisplay, item.endDisplay]]);
      return;
    }

    const data = await api("/api/preview/week", weekPayload());
    el.previewTitle.textContent = "周表窗口";
    if (data.windows.length) {
      el.previewSubtitle.textContent = `完成时间：${data.windows[0].startDisplay} - ${data.windows[data.windows.length - 1].endDisplay}`;
    }
    table(
      ["序号", "任务类型", "归属日期", "班次", "开始", "结束"],
      data.windows.map((item, index) => [index + 1, item.taskLabel, item.businessDate, item.shiftLabel, item.startDisplay, item.endDisplay]),
    );
  } catch (error) {
    table(["错误"], [[error.message]]);
  }
}

function escapeAttr(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function renderFiles(fileItems) {
  state.fileItems = fileItems || [];
  el.fileList.innerHTML = state.fileItems.map((file, index) => `
    <li class="file-card">
      <div>
        <strong>${file.name}</strong>
        <span>已保存文件</span>
      </div>
      <div class="file-actions">
        <button type="button" data-open-index="${index}">打开 Excel</button>
        <button type="button" data-folder-index="${index}">打开文件夹</button>
        <a href="${escapeAttr(file.downloadUrl)}">下载 Excel</a>
      </div>
    </li>
  `).join("");
}

function renderResult(result) {
  state.lastResult = result;
  const warning = result.totals?.warning ? `；${result.totals.warning}` : "";
  if (result.mode === "week") {
    el.resultText.textContent = `周表已输出：${result.primaryFileItem.name}${warning}`;
  } else {
    el.resultText.textContent = `WMS 原文件已输出：${result.primaryFileItem.name}${warning}`;
  }
  renderFiles(result.fileItems);
  renderMetrics(totalsForDisplay(result));
}

function refreshMetricsOnly() {
  if (!state.lastResult || state.lastResult.mode !== state.activeTab) return;
  renderMetrics(totalsForDisplay(state.lastResult));
}

async function revealFile(index) {
  const file = state.fileItems[index];
  if (!file) return;
  await api("/api/reveal", { path: file.path });
}

async function openFile(index) {
  const file = state.fileItems[index];
  if (!file) return;
  await api("/api/open-file", { path: file.path });
}

async function openFolder(index) {
  const file = state.fileItems[index];
  if (!file) return;
  await api("/api/open-folder", { path: file.path });
}

async function submitDay(event) {
  event.preventDefault();
  setBusy(true);
  try {
    const result = await api("/api/export/day", dayPayload(), { timeoutMs: 100000 });
    renderResult(result);
  } catch (error) {
    setStatus("导出失败", true);
    el.resultText.textContent = error.message;
  } finally {
    setBusy(false);
  }
}

async function submitWeek(event) {
  event.preventDefault();
  setBusy(true);
  try {
    const result = await api("/api/export/week", weekPayload(), { timeoutMs: 100000 });
    renderResult(result);
  } catch (error) {
    setStatus("导出失败", true);
    el.resultText.textContent = error.message;
  } finally {
    setBusy(false);
  }
}

async function submitAnalysis(event) {
  if (event) event.preventDefault();
  setBusy(true);
  try {
    const result = await api("/api/analyze/picking", { filePath: state.analysisPath });
    renderAnalysis(result);
    setStatus("分析完成");
  } catch (error) {
    setStatus("分析失败", true);
    el.previewTitle.textContent = "拣选状态分析";
    el.previewSubtitle.textContent = error.message;
    el.analysisContent.innerHTML = `<div class="empty-state is-error-text">${escapeHtml(error.message)}</div>`;
  } finally {
    setBusy(false);
  }
}

function bindEvents() {
  el.tabs.forEach((button) => button.addEventListener("click", () => selectTab(button.dataset.tab)));
  $$(".segmented[data-scope=\"dayTask\"] .segment").forEach((button) => {
    button.addEventListener("click", () => markTaskMode("day", button.dataset.taskMode));
  });
  $$(".segmented[data-scope=\"weekTask\"] .segment").forEach((button) => {
    button.addEventListener("click", () => markTaskMode("week", button.dataset.taskMode));
  });
  $$(".segmented[data-scope=\"day\"] .segment").forEach((button) => {
    button.addEventListener("click", () => applyDayShift(button.dataset.shift));
  });
  $$(".segmented[data-scope=\"week\"] .segment").forEach((button) => {
    button.addEventListener("click", () => applyWeekShift(button.dataset.shift));
  });
  el.dayDate.addEventListener("change", () => applyDayShift(state.dayShift));
  [el.dayStartDate, el.dayStartTime, el.dayEndDate, el.dayEndTime].forEach((input) => {
    input.addEventListener("input", () => {
      markShift("day", "custom");
      renderPreview();
    });
  });
  el.dayWorkHours.addEventListener("input", refreshMetricsOnly);
  [el.weekYear, el.weekNumber, el.weekStartTime, el.weekEndTime].forEach((input) => {
    input.addEventListener("input", () => {
      if (input === el.weekStartTime || input === el.weekEndTime) markShift("week", "custom");
      renderPreview();
    });
  });
  el.weekWorkHours.addEventListener("input", refreshMetricsOnly);
  el.refreshPreview.addEventListener("click", renderPreview);
  el.forms.day.addEventListener("submit", submitDay);
  el.forms.week.addEventListener("submit", submitWeek);
  el.forms.analysis.addEventListener("submit", submitAnalysis);
  el.pickAnalysisFile.addEventListener("click", () => el.analysisFileInput.click());
  el.pickAnalysisFolder.addEventListener("click", () => el.analysisFolderInput.click());
  el.dropZone.addEventListener("click", () => el.analysisFileInput.click());
  el.dropZone.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      el.analysisFileInput.click();
    }
  });
  ["dragenter", "dragover"].forEach((type) => {
    el.dropZone.addEventListener(type, (event) => {
      event.preventDefault();
      el.dropZone.classList.add("is-dragover");
    });
  });
  ["dragleave", "drop"].forEach((type) => {
    el.dropZone.addEventListener(type, (event) => {
      event.preventDefault();
      el.dropZone.classList.remove("is-dragover");
    });
  });
  el.dropZone.addEventListener("drop", async (event) => {
    setBusy(true);
    try {
      const file = firstExcelFile(event.dataTransfer.files);
      if (!file) throw new Error("没有找到 Excel 文件");
      await uploadAnalysisFile(file);
    } catch (error) {
      setStatus("分析失败", true);
      el.analysisContent.innerHTML = `<div class="empty-state is-error-text">${escapeHtml(error.message)}</div>`;
    } finally {
      setBusy(false);
    }
  });
  el.analysisFileInput.addEventListener("change", async () => {
    setBusy(true);
    try {
      const file = firstExcelFile(el.analysisFileInput.files);
      if (!file) throw new Error("没有选择 Excel 文件");
      await uploadAnalysisFile(file);
    } catch (error) {
      setStatus("分析失败", true);
      el.analysisContent.innerHTML = `<div class="empty-state is-error-text">${escapeHtml(error.message)}</div>`;
    } finally {
      el.analysisFileInput.value = "";
      setBusy(false);
    }
  });
  el.analysisFolderInput.addEventListener("change", async () => {
    setBusy(true);
    try {
      const file = firstExcelFile(el.analysisFolderInput.files);
      if (!file) throw new Error("文件夹里没有 Excel 文件");
      await uploadAnalysisFile(file);
    } catch (error) {
      setStatus("分析失败", true);
      el.analysisContent.innerHTML = `<div class="empty-state is-error-text">${escapeHtml(error.message)}</div>`;
    } finally {
      el.analysisFolderInput.value = "";
      setBusy(false);
    }
  });
  el.fileList.addEventListener("click", async (event) => {
    const openButton = event.target.closest("[data-open-index]");
    const folderButton = event.target.closest("[data-folder-index]");
    const revealButton = event.target.closest("[data-reveal-index]");
    const button = openButton || folderButton || revealButton;
    if (!button) return;
    try {
      if (openButton) await openFile(Number(openButton.dataset.openIndex));
      if (folderButton) await openFolder(Number(folderButton.dataset.folderIndex));
      if (revealButton) await revealFile(Number(revealButton.dataset.revealIndex));
    } catch (error) {
      el.resultText.textContent = error.message;
    }
  });
}

async function init() {
  bindEvents();
  try {
    const boot = await api("/api/bootstrap");
    el.dayDate.value = boot.today;
    el.weekYear.value = boot.defaultYear;
    el.weekNumber.value = boot.defaultWeek;
    state.analysisPath = boot.defaultAnalysisPath || "";
    applyDayShift("night");
    applyWeekShift("night");
    selectTab(state.activeTab);
    if (state.activeTab === "analysis" && state.analysisPath) await submitAnalysis();
  } catch (error) {
    setStatus("本地服务异常", true);
    table(["错误"], [[error.message]]);
  }
}

init();
