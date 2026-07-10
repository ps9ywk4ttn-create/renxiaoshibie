const state = {
  busy: false,
  analysisPath: "",
  rawWmsFileItem: null,
  lastResult: null,
  nightRosterNames: [],
  emptyLocationZones: [],
  emptyLocationQueryResult: null,
  selectedEmptyLocationZones: new Set(),
  emptyLocationSelectionDragging: false,
  emptyLocationSelectionMoved: false,
  emptyLocationSelectionSuppressClick: false,
  emptyLocationPointerDownZone: "",
  emptyLocationPointerDownWasSelected: false,
  authRole: "",
  authUser: "",
  authSession: "",
  authRequired: false,
  authConfigLoaded: false,
  appReady: false,
  activeToolView: "realtime",
  activeOutboundAnalysis: "picking",
  outboundPickingSnapshot: null,
  viewStatuses: {
    realtime: { text: "本地服务已启动", error: false },
    inbound: { text: "本地服务已启动", error: false },
    inboundEfficiency: { text: "本地服务已启动", error: false },
  },
  quantityTrendScope: "",
  quantityTrendType: "total",
  inventoryBarcodeItems: [],
  lastLocationQueryLocation: "",
  inventoryHighlightLocation: "",
  inventoryLowercaseMode: false,
  inventoryShiftActive: false,
  currentInventorySku: "",
  currentInventoryRows: [],
  currentInventoryPrintQuantity: "",
  lastWaybillResult: null,
  activeInventoryQuantityContext: null,
  displacedPickFlow: null,
  waybillOutOfStockFlow: null,
  attributeChangeFlow: null,
  exceptionRecords: [],
  activeExceptionDetailType: "",
  activeExceptionDetailRows: [],
  activeExceptionDetailColumns: [],
  activeExceptionDetailWindowText: "",
  releaseAssistantFileItem: null,
  releaseAssistantLastSelectedIndex: null,
  releaseAssistantHandledPointerSelection: false,
  releaseAssistantShiftPressed: false,
  releaseAssistantCopyPending: false,
  inboundWindow: null,
  inboundRawFileItem: null,
  inboundEfficiencyFile: null,
  packingStatusFile: null,
  exceptionShiftDate: "",
  exceptionShiftMode: "night",
  exceptionShiftSettings: {
    dayStartTime: "04:00",
    dayEndTime: "17:30",
    nightStartTime: "17:30",
    nightEndTime: "04:00",
  },
};

const $ = (selector) => document.querySelector(selector);
const APP_VERSION = "v1.1.193";
const ADMIN_PASSWORD = "kakarot";
const AUTH_STORAGE_KEY = "realtime-efficiency-role";
const EXCEPTION_SHIFT_SETTINGS_STORAGE_KEY = "realtime-efficiency-exception-shift-settings";
const WAYBILL_QUERY_MAX_LENGTH = 22;
const OVERTIME_OPEN_ORDER_EXCLUDE_MINUTES = 150;
const DEFAULT_EXCEPTION_SHIFT_SETTINGS = {
  dayStartTime: "04:00",
  dayEndTime: "17:30",
  nightStartTime: "17:30",
  nightEndTime: "04:00",
};

const el = {
  loginScreen: $("#loginScreen"),
  userLoginView: $("#userLoginView"),
  adminLoginView: $("#adminLoginView"),
  loginModeText: $("#loginModeText"),
  userAccount: $("#userAccount"),
  userPassword: $("#userPassword"),
  adminPassword: $("#adminPassword"),
  userLoginButton: $("#userLoginButton"),
  adminLoginButton: $("#adminLoginButton"),
  backUserLogin: $("#backUserLogin"),
  loginMessage: $("#loginMessage"),
  adminLoginMessage: $("#adminLoginMessage"),
  appShell: $("#appShell"),
  appTitle: $("#appTitle"),
  appSubtitle: $("#appSubtitle"),
  topbarActions: $(".topbar-actions"),
  releaseAssistantTopActions: $("#releaseAssistantTopActions"),
  realtimeView: $("#realtimeView"),
  inboundView: $("#inboundView"),
  inboundEfficiencyView: $("#inboundEfficiencyView"),
  inboundEfficiencyDropZone: $("#inboundEfficiencyDropZone"),
  inboundEfficiencyAlertPanel: $("#inboundEfficiencyAlertPanel"),
  inboundEfficiencyFileInput: $("#inboundEfficiencyFileInput"),
  inboundEfficiencyFileResult: $("#inboundEfficiencyFileResult"),
  emptyLocationButton: $("#emptyLocationButton"),
  emptyLocationShell: $("#emptyLocationShell"),
  emptyLocationBackButton: $("#emptyLocationBackButton"),
  emptyLocationResultExportButton: $("#emptyLocationResultExportButton"),
  emptyLocationQueryButton: $("#emptyLocationQueryButton"),
  emptyLocationExportButton: $("#emptyLocationExportButton"),
  emptyLocationResult: $("#emptyLocationResult"),
  emptyLocationView: $("#emptyLocationView"),
  emptyLocationZoneButton: $("#emptyLocationZoneButton"),
  emptyLocationZoneModal: $("#emptyLocationZoneModal"),
  emptyLocationZoneText: $("#emptyLocationZoneText"),
  emptyLocationZoneCount: $("#emptyLocationZoneCount"),
  emptyLocationZoneList: $("#emptyLocationZoneList"),
  emptyLocationZoneClose: $("#emptyLocationZoneClose"),
  emptyLocationZoneAddLine: $("#emptyLocationZoneAddLine"),
  emptyLocationZoneSaveClose: $("#emptyLocationZoneSaveClose"),
  exceptionView: $("#exceptionView"),
  releaseAssistantView: $("#releaseAssistantView"),
  releaseAssistantDropZone: $("#releaseAssistantDropZone"),
  releaseAssistantFileInput: $("#releaseAssistantFileInput"),
  releaseAssistantResult: $("#releaseAssistantResult"),
  releaseAssistantFloatingActions: $("#releaseAssistantFloatingActions"),
  releaseAssistantOrderStats: $("#releaseAssistantOrderStats"),
  releaseAssistantZoneChart: $("#releaseAssistantZoneChart"),
  releaseAssistantZoneSummary: $("#releaseAssistantZoneSummary"),
  releaseAssistantSelectedCount: $("#releaseAssistantSelectedCount"),
  releaseAssistantCancelCopy: $("#releaseAssistantCancelCopy"),
  releaseAssistantResetSelection: $("#releaseAssistantResetSelection"),
  releaseAssistantCopySelected: $("#releaseAssistantCopySelected"),
  toolTabs: document.querySelectorAll("[data-tool-view]"),
  roleBadge: $("#roleBadge"),
  logoutButton: $("#logoutButton"),
  analysisForm: $("#analysisForm"),
  analysisFileInput: $("#analysisFileInput"),
  analysisFolderInput: $("#analysisFolderInput"),
  dropZone: $("#dropZone"),
  pickAnalysisFile: $("#pickAnalysisFile"),
  pickAnalysisFolder: $("#pickAnalysisFolder"),
  wmsBusinessDate: $("#wmsBusinessDate"),
  fetchWmsAnalysis: $("#fetchWmsAnalysis"),
  refreshWmsAnalysis: $("#refreshWmsAnalysis"),
  downloadRawWmsFile: $("#downloadRawWmsFile"),
  runAnalysis: $("#runAnalysis"),
  analysisContent: $("#analysisContent"),
  previewTableWrap: $(".table-wrap"),
  resultArea: $("#resultArea"),
  refreshPreview: $("#refreshPreview"),
  previewTitle: $("#previewTitle"),
  previewSubtitle: $("#previewSubtitle"),
  outboundPanelActions: $("#outboundPanelActions"),
  packingStatusAnalysisTab: $("#packingStatusAnalysisTab"),
  packingStatusPanel: $("#packingStatusPanel"),
  packingStatusDropZone: $("#packingStatusDropZone"),
  packingStatusInput: $("#packingStatusInput"),
  packingStatusResult: $("#packingStatusResult"),
  metrics: $("#metrics"),
  appStatus: $("#appStatus"),
  nightRosterButton: $("#nightRosterButton"),
  nightRosterModal: $("#nightRosterModal"),
  nightRosterText: $("#nightRosterText"),
  nightRosterCount: $("#nightRosterCount"),
  nightRosterClose: $("#nightRosterClose"),
  nightRosterAddLine: $("#nightRosterAddLine"),
  nightRosterSaveClose: $("#nightRosterSaveClose"),
  exportCurrentShift: $("#exportCurrentShift"),
  exportAll: $("#exportAll"),
  resultText: $("#resultText"),
  fileList: $("#fileList"),
  waybillQueryButton: $("#waybillQueryButton"),
  waybillQueryInput: $("#waybillQueryInput"),
  inventoryQueryButton: $("#inventoryQueryButton"),
  inventoryQueryInput: $("#inventoryQueryInput"),
  locationQueryButton: $("#locationQueryButton"),
  locationQueryInput: $("#locationQueryInput"),
  exceptionExportButton: $("#exceptionExportButton"),
  exceptionResetButton: $("#exceptionResetButton"),
  exceptionFixedActions: $(".exception-fixed-actions"),
  exceptionShiftControls: $("#exceptionShiftControls"),
  exceptionSopActions: $("#exceptionSopActions"),
  inboundDateControl: $("#inboundDateControl"),
  inboundBusinessDate: $("#inboundBusinessDate"),
  inboundWindowText: $("#inboundWindowText"),
  fetchInboundTaskList: $("#fetchInboundTaskList"),
  inboundResultArea: $("#inboundResultArea"),
  inboundResultText: $("#inboundResultText"),
  inboundSummaryStats: $("#inboundSummaryStats"),
  inboundPeopleStats: $("#inboundPeopleStats"),
  inboundPeopleDetails: $("#inboundPeopleDetails"),
  inboundFileList: $("#inboundFileList"),
  exceptionShiftSettingsButton: $("#exceptionShiftSettingsButton"),
  exceptionShiftDate: $("#exceptionShiftDate"),
  exceptionShiftButtons: document.querySelectorAll("[data-exception-shift-mode]"),
  clearCacheButton: $("#clearCacheButton"),
  exceptionShiftSettingsModal: $("#exceptionShiftSettingsModal"),
  exceptionDayStartTime: $("#exceptionDayStartTime"),
  exceptionDayEndTime: $("#exceptionDayEndTime"),
  exceptionNightStartTime: $("#exceptionNightStartTime"),
  exceptionNightEndTime: $("#exceptionNightEndTime"),
  exceptionShiftSettingsCancel: $("#exceptionShiftSettingsCancel"),
  exceptionShiftSettingsSave: $("#exceptionShiftSettingsSave"),
  exceptionDetailModal: $("#exceptionDetailModal"),
  exceptionDetailTitle: $("#exceptionDetailTitle"),
  exceptionDetailMeta: $("#exceptionDetailMeta"),
  exceptionDetailContent: $("#exceptionDetailContent"),
  exceptionDetailExport: $("#exceptionDetailExport"),
  exceptionDetailClose: $("#exceptionDetailClose"),
  exceptionResult: $("#exceptionResult"),
  qrPreviewModal: $("#qrPreviewModal"),
  qrPreviewClose: $("#qrPreviewClose"),
  qrPreviewPrint: $("#qrPreviewPrint"),
  qrPreviewCard: $("#qrPreviewCard"),
  qrPreviewContent: $("#qrPreviewContent"),
};

function cleanErrorMessage(message, fallback = "操作失败") {
  const raw = String(message || fallback)
    .replace(/\\"/g, "\"")
    .replace(/\\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const executionMatch = raw.match(/execution error:\s*(.*?)(?:\s*\(-?\d+\))?\s*$/i);
  const direct = executionMatch?.[1]?.trim() || raw;
  const text = `${direct} ${raw}`.toLowerCase();

  if (direct.includes("未获得授权将Apple事件发送给Safari") || raw.includes("(-1743)")) {
    return "macOS 没有允许当前程序控制 Safari，请在 系统设置 > 隐私与安全性 > 自动化 里允许后再拉取 WMS";
  }
  if (direct.includes("WMS 拣选单页面")) {
    return "Safari 里没有找到 WMS 拣选单页面，请先打开 出库管理 > 拣选单";
  }
  if (direct.includes("已登录的 WMS 标签页")) {
    return "Safari 里没有找到已登录的 WMS 标签页，请先在 Safari 打开并登录 WMS";
  }
  if (direct.includes("登录已超时") || direct.includes("请重新登录")) {
    return "WMS 登录已超时，请先在 Safari 的 WMS 页面重新登录";
  }
  if (text.includes("no permission") || text.includes("code 10000") || raw.includes("无权限")) {
    return "WMS 返回无权限：请确认当前账号有“拣选单导出”权限";
  }
  if (text.includes("osascript") || text.includes("command failed")) {
    return "WMS 拉取失败：请确认 Safari 已打开 WMS 拣选单页面并已登录";
  }

  return direct.length > 180 ? `${direct.slice(0, 180)}...` : direct;
}

function statusViewKey(view = state.activeToolView) {
  if (view === "inboundEfficiency") return "inboundEfficiency";
  if (view === "emptyLocation") return "inboundEfficiency";
  return view === "inbound" ? "inbound" : "realtime";
}

function renderActiveStatus() {
  if (!el.appStatus) return;
  const key = statusViewKey();
  const status = state.viewStatuses[key] || state.viewStatuses.realtime;
  el.appStatus.textContent = status.error ? cleanErrorMessage(status.text) : status.text;
  el.appStatus.classList.toggle("is-error", Boolean(status.error));
  el.appStatus.hidden = state.activeToolView === "exception" || state.activeToolView === "releaseAssistant";
}

function setStatus(text, error = false, view = state.activeToolView) {
  const key = statusViewKey(view);
  state.viewStatuses[key] = { text, error };
  if (key === statusViewKey()) renderActiveStatus();
}

function placeReleaseAssistantRoleActions(isReleaseAssistant) {
  if (!el.releaseAssistantTopActions || !el.topbarActions || !el.roleBadge || !el.logoutButton) return;

  if (isReleaseAssistant) {
    el.releaseAssistantTopActions.hidden = false;
    el.releaseAssistantTopActions.append(el.roleBadge, el.logoutButton);
    return;
  }

  el.releaseAssistantTopActions.hidden = true;
  el.topbarActions.insertBefore(el.logoutButton, el.appStatus || null);
  el.topbarActions.insertBefore(el.roleBadge, el.logoutButton);
}

function setToolView(view) {
  const activeView = view === "inbound" || view === "inboundEfficiency" || view === "emptyLocation" || view === "exception" || view === "releaseAssistant" ? view : "realtime";
  state.activeToolView = activeView;
  if (el.realtimeView) el.realtimeView.hidden = activeView !== "realtime";
  if (el.inboundView) el.inboundView.hidden = activeView !== "inbound";
  if (el.inboundEfficiencyView) el.inboundEfficiencyView.hidden = activeView !== "inboundEfficiency";
  if (el.emptyLocationView) el.emptyLocationView.hidden = activeView !== "emptyLocation";
  if (el.exceptionView) el.exceptionView.hidden = activeView !== "exception";
  if (el.releaseAssistantView) el.releaseAssistantView.hidden = activeView !== "releaseAssistant";
  renderActiveStatus();
  if (el.exceptionShiftControls) el.exceptionShiftControls.hidden = activeView !== "exception";
  if (el.exceptionSopActions) el.exceptionSopActions.hidden = activeView !== "exception";
  if (el.inboundDateControl) el.inboundDateControl.hidden = activeView !== "inbound";
  if (el.appTitle) {
    const title = activeView === "inbound"
      ? "入库实时看板"
      : activeView === "inboundEfficiency"
        ? "入库实效看板"
        : activeView === "emptyLocation"
          ? "空库位"
          : activeView === "exception"
            ? "异常处理工具"
            : activeView === "releaseAssistant"
              ? "放单助手"
              : "出库实时看板";
    el.appTitle.innerHTML = `${title} <span class="app-version">${APP_VERSION}</span>`;
  }
  if (el.appSubtitle) {
    el.appSubtitle.textContent = activeView === "realtime" ? "实时分析拣选任务：已分配 / 拣选中 / 已拣选" : "";
  }
  placeReleaseAssistantRoleActions(activeView === "releaseAssistant");
  el.toolTabs?.forEach((button) => {
    const activeTabView = activeView === "emptyLocation" ? "inboundEfficiency" : activeView;
    const isActive = button.dataset.toolView === activeTabView;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });
  if (activeView === "releaseAssistant") setTimeout(() => el.releaseAssistantDropZone?.focus(), 0);
  if (activeView === "inboundEfficiency") setTimeout(() => el.inboundEfficiencyDropZone?.focus(), 0);
  if (activeView === "emptyLocation") loadEmptyLocationZones().catch(() => setStatus("库区读取失败", true, "emptyLocation"));
}

function setOutboundAnalysisMode(mode, options = {}) {
  const nextMode = mode === "packing" ? "packing" : "picking";
  if (state.activeOutboundAnalysis === nextMode && !options.force) return;

  if (nextMode === "packing") {
    state.outboundPickingSnapshot = {
      title: el.previewTitle?.textContent || "",
      subtitle: el.previewSubtitle?.textContent || "",
      panelActionsHidden: Boolean(el.outboundPanelActions?.hidden),
      metricsHidden: Boolean(el.metrics?.hidden),
      analysisContentHidden: Boolean(el.analysisContent?.hidden),
      previewTableWrapHidden: Boolean(el.previewTableWrap?.hidden),
      resultAreaHidden: Boolean(el.resultArea?.hidden),
      refreshPreviewHidden: Boolean(el.refreshPreview?.hidden),
    };
  }

  state.activeOutboundAnalysis = nextMode;
  const isPacking = nextMode === "packing";
  if (el.packingStatusAnalysisTab) {
    el.packingStatusAnalysisTab.textContent = isPacking ? "拣选状态分析" : "打包状态分析";
    el.packingStatusAnalysisTab.classList.toggle("is-active", isPacking);
  }

  if (isPacking) {
    if (el.previewTitle) el.previewTitle.textContent = "打包状态分析";
    if (el.previewSubtitle) el.previewSubtitle.textContent = "";
    if (el.outboundPanelActions) el.outboundPanelActions.hidden = true;
    if (el.metrics) el.metrics.hidden = true;
    if (el.analysisContent) el.analysisContent.hidden = true;
    if (el.previewTableWrap) el.previewTableWrap.hidden = true;
    if (el.resultArea) el.resultArea.hidden = true;
    if (el.refreshPreview) el.refreshPreview.hidden = true;
    if (el.packingStatusPanel) el.packingStatusPanel.hidden = false;
    setTimeout(() => el.packingStatusDropZone?.focus(), 0);
    return;
  }

  const snapshot = options.restore === false ? null : state.outboundPickingSnapshot;
  if (el.packingStatusPanel) el.packingStatusPanel.hidden = true;
  if (snapshot) {
    if (el.previewTitle) el.previewTitle.textContent = snapshot.title || "拣选状态分析";
    if (el.previewSubtitle) el.previewSubtitle.textContent = snapshot.subtitle;
    if (el.outboundPanelActions) el.outboundPanelActions.hidden = snapshot.panelActionsHidden;
    if (el.metrics) el.metrics.hidden = snapshot.metricsHidden;
    if (el.analysisContent) el.analysisContent.hidden = snapshot.analysisContentHidden;
    if (el.previewTableWrap) el.previewTableWrap.hidden = snapshot.previewTableWrapHidden;
    if (el.resultArea) el.resultArea.hidden = snapshot.resultAreaHidden;
    if (el.refreshPreview) el.refreshPreview.hidden = snapshot.refreshPreviewHidden;
  } else {
    if (el.outboundPanelActions) el.outboundPanelActions.hidden = false;
    if (el.metrics) el.metrics.hidden = false;
    if (el.analysisContent) el.analysisContent.hidden = false;
  }
  state.outboundPickingSnapshot = null;
}

function isAdminRole() {
  return state.authRole === "admin";
}

function roleLabel() {
  if (isAdminRole()) return "管理员版";
  return state.authUser ? `用户版：${state.authUser}` : "用户版";
}

function applyRoleUi() {
  const loggedIn = state.authRole === "user" || state.authRole === "admin";
  if (el.loginScreen) el.loginScreen.hidden = loggedIn;
  if (el.appShell) el.appShell.hidden = !loggedIn;
  document.body.dataset.role = state.authRole || "guest";
  if (el.roleBadge) el.roleBadge.textContent = roleLabel();
  document.querySelectorAll(".admin-only").forEach((node) => {
    node.hidden = !isAdminRole();
  });
  updateActionAvailability();
}

function showUserLogin(message = "") {
  state.authRole = "";
  state.authUser = "";
  state.authSession = "";
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  if (el.loginScreen) el.loginScreen.hidden = false;
  if (el.appShell) el.appShell.hidden = true;
  if (el.userLoginView) el.userLoginView.hidden = false;
  if (el.adminLoginView) el.adminLoginView.hidden = true;
  if (el.loginModeText) el.loginModeText.textContent = state.authRequired ? "账号登录" : "用户登录";
  if (el.userAccount) {
    el.userAccount.value = "";
    el.userAccount.disabled = !state.authRequired;
    el.userAccount.closest(".login-field").hidden = !state.authRequired;
  }
  if (el.userPassword) el.userPassword.value = "";
  if (el.adminPassword) el.adminPassword.value = "";
  if (el.loginMessage) el.loginMessage.textContent = message;
  if (el.adminLoginMessage) el.adminLoginMessage.textContent = "";
  document.body.dataset.role = "guest";
  setTimeout(() => (state.authRequired ? el.userAccount : el.userPassword)?.focus(), 0);
}

function showAdminLogin() {
  if (el.userLoginView) el.userLoginView.hidden = true;
  if (el.adminLoginView) el.adminLoginView.hidden = false;
  if (el.loginMessage) el.loginMessage.textContent = "";
  if (el.adminLoginMessage) el.adminLoginMessage.textContent = "";
  if (el.userPassword) el.userPassword.value = "";
  if (el.adminPassword) el.adminPassword.value = "";
  setTimeout(() => el.adminPassword?.focus(), 0);
}

function readStoredAuth() {
  const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;
  if (raw === "user" || raw === "admin") return { role: raw };
  try {
    const parsed = JSON.parse(raw);
    return parsed && (parsed.role === "user" || parsed.role === "admin") ? parsed : null;
  } catch {
    return null;
  }
}

async function loadAuthConfig() {
  if (state.authConfigLoaded) return;
  try {
    const config = await api("/api/auth/config");
    state.authRequired = Boolean(config.required);
  } catch {
    state.authRequired = false;
  } finally {
    state.authConfigLoaded = true;
  }
}

async function enterRole(role, options = {}) {
  state.authRole = role;
  state.authUser = options.username || "";
  state.authSession = options.session || "";
  sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
    role,
    username: state.authUser,
    session: state.authSession,
  }));
  applyRoleUi();
  await initAppData();
  setStatus(`${roleLabel()}已进入`);
}

async function enterUserRole() {
  const username = el.userAccount?.value.trim() || "";
  const password = el.userPassword?.value || "";
  if (!state.authRequired && password.trim() === ADMIN_PASSWORD) {
    showAdminLogin();
    return;
  }
  if (state.authRequired) {
    if (!username || !password) {
      if (el.loginMessage) el.loginMessage.textContent = "请输入账号和密码";
      (username ? el.userPassword : el.userAccount)?.focus();
      return;
    }
    try {
      if (el.loginMessage) el.loginMessage.textContent = "正在验证";
      const result = await api("/api/auth/login", { username, password });
      await enterRole(result.role === "admin" ? "admin" : "user", {
        username: result.username || username,
        session: result.session || "",
      });
    } catch (error) {
      if (el.loginMessage) el.loginMessage.textContent = cleanErrorMessage(error.message, "登录失败");
      el.userPassword?.focus();
    }
    return;
  }
  await enterRole("user", { username: username || "本机用户" });
}

async function enterAdminRole() {
  if (state.authRequired) {
    if (el.adminLoginMessage) el.adminLoginMessage.textContent = "云端授权已开启，请用账号登录";
    return;
  }
  if (el.adminPassword?.value !== ADMIN_PASSWORD) {
    if (el.adminLoginMessage) el.adminLoginMessage.textContent = "管理员密码错误";
    el.adminPassword?.focus();
    return;
  }
  await enterRole("admin");
}

function logout() {
  showUserLogin();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function withLicenseSession(url) {
  if (!state.authSession || !url || !url.startsWith("/")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}licenseSession=${encodeURIComponent(state.authSession)}`;
}

function copyButtonHtml(value, label = "复制") {
  const text = String(value || "").trim();
  if (!text) return "";
  return `
    <button class="copy-value-button" type="button" data-copy-value="${escapeHtml(text)}" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}">
      <svg class="copy-icon" aria-hidden="true" viewBox="0 0 20 20" focusable="false">
        <rect x="8" y="4" width="8" height="8" rx="1.5"></rect>
        <rect x="4" y="8" width="8" height="8" rx="1.5"></rect>
      </svg>
      <svg class="copy-done" aria-hidden="true" viewBox="0 0 20 20" focusable="false">
        <circle cx="10" cy="10" r="9"></circle>
        <path d="M6.2 10.3 8.8 13l5-6"></path>
      </svg>
      <span class="copy-tooltip" aria-hidden="true">复制成功</span>
    </button>
  `;
}

function fallbackCopyText(value) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function copyTextToClipboard(value) {
  const text = String(value || "").trim();
  if (!text) return;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopyText(text));
    return;
  }
  fallbackCopyText(text);
}

function markCopyButtonCopied(button) {
  if (!button) return;
  button.classList.add("is-copied");
  clearTimeout(button._copyStateTimer);
  button._copyStateTimer = setTimeout(() => {
    button.classList.remove("is-copied");
  }, 1200);
}

function formatNumber(value) {
  if (value === "" || value == null || !Number.isFinite(Number(value))) return "-";
  return Number(value).toLocaleString("zh-CN");
}

function formatMinutes(value) {
  if (value === "" || value == null || !Number.isFinite(Number(value))) return "-";
  return `${Number(value).toLocaleString("zh-CN")} 分钟`;
}

function formatHours(value) {
  if (value === "" || value == null || !Number.isFinite(Number(value))) return "-";
  return `${Number(value).toLocaleString("zh-CN", { maximumFractionDigits: 1 })} 小时`;
}

function formatPiecesPerHour(value) {
  if (value === "" || value == null || !Number.isFinite(Number(value))) return "-";
  return `${Number(value).toLocaleString("zh-CN", { maximumFractionDigits: 1 })} 件/小时`;
}

function formatOrderQuantity(rows, quantity) {
  return `${formatNumber(rows)} 单 / ${formatNumber(quantity)} 件`;
}

function formatEightHourEfficiency(row) {
  if (row.skipEightHourEfficiency) return "不计算";
  return formatPiecesPerHour(row.eightHourEfficiencyPerHour);
}

function formatWaitDuration(value) {
  if (value === "" || value == null || !Number.isFinite(Number(value))) return "-";
  const minutes = Math.max(0, Math.round(Number(value)));
  if (minutes <= 60) return `${formatNumber(minutes)} 分钟`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${formatNumber(hours)}小时${formatNumber(rest)}分钟` : `${formatNumber(hours)}小时`;
}

function statusBadge(status) {
  const safe = escapeHtml(status || "-");
  const cls = status === "已拣选" ? "badge picked" : status === "拣选中" ? "badge picking" : "badge assigned";
  return `<span class="${cls}">${safe}</span>`;
}

function setBusy(isBusy, view = state.activeToolView) {
  state.busy = isBusy;
  document.querySelectorAll("button").forEach((button) => {
    button.disabled = isBusy;
  });
  if (!isBusy) updateActionAvailability();
  if (isBusy) setStatus("正在处理", false, view);
}

function updateActionAvailability() {
  if (el.downloadRawWmsFile) el.downloadRawWmsFile.disabled = !isAdminRole() || !state.rawWmsFileItem;
  if (el.runAnalysis) el.runAnalysis.disabled = !state.analysisPath;
  if (el.exportCurrentShift) el.exportCurrentShift.disabled = !isAdminRole() || !state.analysisPath;
  if (el.exportAll) el.exportAll.disabled = !isAdminRole() || !state.analysisPath;
  if (el.nightRosterButton) el.nightRosterButton.disabled = !isAdminRole();
  if (el.clearCacheButton) el.clearCacheButton.disabled = !isAdminRole();
}

async function api(path, body) {
  const headers = body ? { "content-type": "application/json" } : {};
  if (state.authSession) headers["x-license-session"] = state.authSession;
  const response = await fetch(path, {
    method: body ? "POST" : "GET",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(cleanErrorMessage(data.error, "请求失败"));
  return data;
}

async function uploadAnalysisFile(file) {
  if (!file) return;
  if (!/\.xlsx?(\.xlsx?)?$/i.test(file.name)) {
    throw new Error("只能分析 .xls / .xlsx 文件");
  }

  const response = await fetch(`/api/analyze/upload?name=${encodeURIComponent(file.name)}`, {
    method: "POST",
    headers: {
      "content-type": "application/octet-stream",
      ...(state.authSession ? { "x-license-session": state.authSession } : {}),
    },
    body: file,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "上传分析失败");
  state.analysisPath = data.source?.filePath || "";
  state.rawWmsFileItem = null;
  await loadNightRoster();
  renderAnalysis(data);
  updateActionAvailability();
  setStatus("分析完成");
}

function setReleaseAssistantRowSelected(checkbox, checked) {
  if (checkbox.disabled) return;
  const row = checkbox.closest("tr");
  checkbox.checked = checked;
  row?.classList.toggle("is-release-row-selected", checked);
  if (!row || row.classList.contains("is-release-row-copy-confirmed")) return;

  if (state.releaseAssistantCopyPending && checked) {
    row.classList.add("is-release-row-copied", "is-release-row-copy-pending");
  } else if (!checked && row.classList.contains("is-release-row-copy-pending")) {
    row.classList.remove("is-release-row-copied", "is-release-row-copy-pending");
  }
}

function selectedReleaseAssistantCheckboxes() {
  return [...(el.releaseAssistantResult?.querySelectorAll(".release-row-checkbox:checked:not(:disabled)") || [])];
}

function releaseAssistantRows() {
  return [...(el.releaseAssistantResult?.querySelectorAll("tr[data-release-row-index]") || [])];
}

function releaseAssistantPendingCopyRows() {
  return [...(el.releaseAssistantResult?.querySelectorAll(".is-release-row-copy-pending") || [])];
}

function releaseAssistantRowsForZoneCode(code) {
  return releaseAssistantRows().filter((row) => {
    return row.dataset.releaseZoneCode === code && !row.classList.contains("is-release-row-copy-confirmed");
  });
}

function releaseAssistantPendingRowsForZoneCode(code) {
  return releaseAssistantRowsForZoneCode(code).filter((row) => row.classList.contains("is-release-row-copy-pending"));
}

function releaseAssistantOrdersFromRows(rows) {
  return rows.map((row) => row.querySelector(".release-row-checkbox")?.dataset.releaseOrder || "").filter(Boolean);
}

function releaseAssistantPendingCopyOrders() {
  return releaseAssistantOrdersFromRows(releaseAssistantPendingCopyRows());
}

function clearReleaseAssistantUnlockedSelection() {
  selectedReleaseAssistantCheckboxes().forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.closest("tr")?.classList.remove("is-release-row-selected");
  });
  state.releaseAssistantLastSelectedIndex = null;
}

function updateReleaseAssistantSelectedCount() {
  const count = selectedReleaseAssistantCheckboxes().length;
  if (el.releaseAssistantSelectedCount) el.releaseAssistantSelectedCount.textContent = `已选 ${count} 条`;
  if (el.releaseAssistantCopySelected) el.releaseAssistantCopySelected.disabled = count === 0;
}

function resetReleaseAssistantCopyButton() {
  state.releaseAssistantCopyPending = false;
  if (el.releaseAssistantCopySelected) el.releaseAssistantCopySelected.textContent = "选择";
  if (el.releaseAssistantCancelCopy) el.releaseAssistantCancelCopy.hidden = true;
}

function syncReleaseAssistantCopyPendingState() {
  if (!releaseAssistantPendingCopyRows().length) {
    resetReleaseAssistantCopyButton();
    return;
  }
  state.releaseAssistantCopyPending = true;
  if (el.releaseAssistantCopySelected) el.releaseAssistantCopySelected.textContent = "复制";
  if (el.releaseAssistantCancelCopy) el.releaseAssistantCancelCopy.hidden = false;
}

function clearReleaseAssistantCopiedRows(includeConfirmed = true) {
  const selector = includeConfirmed ? ".is-release-row-copied" : ".is-release-row-copy-pending";
  el.releaseAssistantResult?.querySelectorAll(selector).forEach((row) => {
    if (!includeConfirmed && row.classList.contains("is-release-row-copy-confirmed")) return;
    row.classList.remove("is-release-row-copied");
    row.classList.remove("is-release-row-copy-pending");
  });
  if (includeConfirmed) {
    el.releaseAssistantResult?.querySelectorAll(".is-release-row-copy-confirmed").forEach((row) => {
      row.classList.remove("is-release-row-copy-confirmed");
      const checkbox = row.querySelector(".release-row-checkbox");
      if (checkbox) checkbox.disabled = false;
    });
  }
  resetReleaseAssistantCopyButton();
}

async function writeReleaseAssistantOrdersToClipboard(orders) {
  const text = orders.join("\n");
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}

async function writeReleaseAssistantPendingCopyToClipboard() {
  await writeReleaseAssistantOrdersToClipboard(releaseAssistantPendingCopyOrders());
}

function markReleaseAssistantRowsPendingCopy(rows, options = {}) {
  const replace = options.replace !== false;
  if (replace) {
    clearReleaseAssistantCopiedRows(false);
    clearReleaseAssistantUnlockedSelection();
  }
  rows.forEach((row) => {
    const checkbox = row.querySelector(".release-row-checkbox");
    if (!checkbox || checkbox.disabled) return;
    checkbox.checked = true;
    row.classList.add("is-release-row-selected", "is-release-row-copied", "is-release-row-copy-pending");
  });
  state.releaseAssistantCopyPending = true;
  if (el.releaseAssistantCopySelected) el.releaseAssistantCopySelected.textContent = "复制";
  if (el.releaseAssistantCancelCopy) el.releaseAssistantCancelCopy.hidden = false;
  updateReleaseAssistantSelectedCount();
  renderReleaseAssistantZoneSummary();
}

function unmarkReleaseAssistantRowsPendingCopy(rows) {
  rows.forEach((row) => {
    const checkbox = row.querySelector(".release-row-checkbox");
    if (checkbox && !checkbox.disabled) checkbox.checked = false;
    row.classList.remove("is-release-row-selected", "is-release-row-copied", "is-release-row-copy-pending");
  });
  state.releaseAssistantLastSelectedIndex = null;
  syncReleaseAssistantCopyPendingState();
  updateReleaseAssistantSelectedCount();
  renderReleaseAssistantZoneSummary();
}

function resetReleaseAssistantSelection() {
  state.releaseAssistantFileItem = null;
  state.releaseAssistantLastSelectedIndex = null;
  state.releaseAssistantCopyPending = false;
  clearReleaseAssistantCopiedRows();
  if (el.releaseAssistantFloatingActions) el.releaseAssistantFloatingActions.hidden = true;
  if (el.releaseAssistantOrderStats) el.releaseAssistantOrderStats.hidden = true;
  if (el.releaseAssistantZoneChart) el.releaseAssistantZoneChart.hidden = true;
  if (el.releaseAssistantZoneSummary) el.releaseAssistantZoneSummary.hidden = true;
  if (el.releaseAssistantResult) {
    el.releaseAssistantResult.hidden = true;
    el.releaseAssistantResult.innerHTML = "";
  }
  el.releaseAssistantView?.classList.remove("has-release-assistant-result", "is-release-assistant-dragover");
  if (el.releaseAssistantFileInput) el.releaseAssistantFileInput.value = "";
  updateReleaseAssistantSelectedCount();
  setTimeout(() => el.releaseAssistantDropZone?.focus(), 0);
}

function releaseAssistantSidePanelMetrics() {
  const summary = el.releaseAssistantZoneSummary;
  const tableWrap = el.releaseAssistantResult?.querySelector(".release-assistant-table-wrap");
  const panelWidth = summary?.getBoundingClientRect().width || 300;
  const tableRect = tableWrap?.getBoundingClientRect();
  const targetLeft = tableRect ? tableRect.right + 12 : window.innerWidth - panelWidth - 18;
  const viewTop = el.releaseAssistantView?.getBoundingClientRect().top;
  const top = Math.max(12, Math.round(Number.isFinite(viewTop) ? viewTop : tableRect?.top || 12));
  const left = Math.min(window.innerWidth - panelWidth - 18, Math.max(12, targetLeft));
  return { left: Math.round(left), top, width: panelWidth };
}

function positionReleaseAssistantFloatingActions() {
  const actions = el.releaseAssistantFloatingActions;
  if (!actions || actions.hidden) return;

  const metrics = releaseAssistantSidePanelMetrics();
  const chart = el.releaseAssistantZoneChart;
  const chartRect = chart && !chart.hidden ? chart.getBoundingClientRect() : null;
  const actionWidth = actions.getBoundingClientRect().width || 234;
  const left = metrics.left + (metrics.width - actionWidth) / 2;
  actions.style.left = `${Math.round(Math.min(window.innerWidth - actionWidth - 12, Math.max(12, left)))}px`;
  actions.style.top = `${Math.round(chartRect ? chartRect.bottom + 14 : metrics.top)}px`;
  actions.style.transform = "none";
}

function positionReleaseAssistantOrderStats() {
  const stats = el.releaseAssistantOrderStats;
  const actions = el.releaseAssistantFloatingActions;
  if (!stats || stats.hidden || !actions || actions.hidden) return;

  const actionRect = actions.getBoundingClientRect();
  const statsWidth = stats.getBoundingClientRect().width || 260;
  const left = Math.min(window.innerWidth - statsWidth - 18, actionRect.right + 18);
  stats.style.left = `${Math.round(Math.max(12, left))}px`;
  stats.style.top = `${Math.round(actionRect.top)}px`;
  stats.style.transform = "none";
}

function positionReleaseAssistantZoneChart() {
  const chart = el.releaseAssistantZoneChart;
  if (!chart || chart.hidden) return;

  const metrics = releaseAssistantSidePanelMetrics();
  const topbarRect = document.querySelector(".topbar")?.getBoundingClientRect();
  const viewRect = el.releaseAssistantView?.getBoundingClientRect();
  const top = Math.max(12, Math.round((topbarRect?.top || 0) + 12));
  const bottomLimit = Math.max(top + 86, Math.round((viewRect?.top || top + 110) - 12));
  const right = 30;
  const minWidth = 300;
  const left = Math.min(metrics.left, Math.max(12, window.innerWidth - minWidth - right));
  const width = Math.max(minWidth, window.innerWidth - left - right);
  chart.style.left = `${Math.round(left)}px`;
  chart.style.top = `${top}px`;
  chart.style.width = `${Math.round(width)}px`;
  chart.style.maxHeight = `${Math.floor(bottomLimit - top)}px`;
  chart.style.transform = "none";
}

function positionReleaseAssistantZoneSummary() {
  const summary = el.releaseAssistantZoneSummary;
  if (!summary || summary.hidden) return;

  const metrics = releaseAssistantSidePanelMetrics();
  const actions = el.releaseAssistantFloatingActions;
  const actionsRect = actions && !actions.hidden ? actions.getBoundingClientRect() : null;
  const top = Math.round((actionsRect?.bottom || metrics.top) + (actionsRect ? 12 : 0));
  const maxHeight = Math.max(160, window.innerHeight - top);
  summary.style.left = `${metrics.left}px`;
  summary.style.top = `${top}px`;
  summary.style.maxHeight = `${Math.floor(maxHeight)}px`;
  summary.style.transform = "none";
}

function selectReleaseAssistantRange(checkbox, checked, shiftKey = false) {
  if (!checkbox) return;

  const currentIndex = Number(checkbox.dataset.releaseRowIndex);
  if (checkbox.disabled) return;
  if (shiftKey && state.releaseAssistantLastSelectedIndex != null && Number.isFinite(currentIndex)) {
    const start = Math.min(state.releaseAssistantLastSelectedIndex, currentIndex);
    const end = Math.max(state.releaseAssistantLastSelectedIndex, currentIndex);
    el.releaseAssistantResult?.querySelectorAll(".release-row-checkbox").forEach((item) => {
      const index = Number(item.dataset.releaseRowIndex);
      if (!item.disabled && index >= start && index <= end) setReleaseAssistantRowSelected(item, checked);
    });
  } else {
    setReleaseAssistantRowSelected(checkbox, checked);
  }

  if (Number.isFinite(currentIndex)) state.releaseAssistantLastSelectedIndex = currentIndex;
  syncReleaseAssistantCopyPendingState();
  updateReleaseAssistantSelectedCount();
  renderReleaseAssistantZoneSummary();
}

function releaseAssistantEventTarget(event) {
  return event.target instanceof Element ? event.target : event.target?.parentElement || null;
}

function releaseAssistantPrimaryZone(value) {
  return String(value ?? "").split(/[，,]/)[0].trim();
}

function releaseAssistantZoneCodes(value) {
  const text = String(value ?? "")
    .replace(/[\[\]]/g, " ")
    .replace(/[，,]/g, " ");
  return [...text.matchAll(/\b(?:\d{1,3}-\d{1,3}|SK[A-Z0-9-]*|V[A-Z0-9-]*)\b/gi)]
    .map((match) => match[0].toUpperCase());
}

function releaseAssistantSingleZoneCode(value) {
  const uniqueCodes = [...new Set(releaseAssistantZoneCodes(value))];
  return uniqueCodes.length === 1 ? uniqueCodes[0] : "";
}

function releaseAssistantFirstZoneCode(value) {
  return releaseAssistantZoneCodes(releaseAssistantPrimaryZone(value))[0] || "";
}

function releaseAssistantCompareZoneCodes(a, b) {
  return a.localeCompare(b, "zh-CN", { numeric: true, sensitivity: "base" });
}

function releaseAssistantOrderStats() {
  const rows = releaseAssistantRows();
  let total = 0;
  let crossZone = 0;
  let confirmed = 0;
  rows.forEach((row) => {
    if (row.dataset.releaseZoneCode) total += 1;
    else crossZone += 1;
    if (row.classList.contains("is-release-row-copy-confirmed")) confirmed += 1;
  });
  return { hasRows: rows.length > 0, total, crossZone, confirmed };
}

function renderReleaseAssistantOrderStats() {
  const stats = el.releaseAssistantOrderStats;
  if (!stats) return;

  const data = releaseAssistantOrderStats();
  if (!data.hasRows) {
    stats.hidden = true;
    stats.innerHTML = "";
    return;
  }

  stats.hidden = false;
  stats.innerHTML = `
    <span>总单数 <b>${formatNumber(data.total)}</b></span>
    <span>跨区 <b>${formatNumber(data.crossZone)}</b></span>
    <span>已确认 <b>${formatNumber(data.confirmed)}</b></span>
  `;
  requestAnimationFrame(positionReleaseAssistantOrderStats);
}

function releaseAssistantZoneChartItems() {
  const groups = new Map();
  releaseAssistantRows().forEach((row) => {
    const zone = row.dataset.releaseChartZone || "";
    if (!zone) return;
    if (!groups.has(zone)) groups.set(zone, { total: 0, confirmed: false });
    const group = groups.get(zone);
    if (row.classList.contains("is-release-row-copy-confirmed")) {
      group.confirmed = true;
      return;
    }
    group.total += 1;
  });
  return [...groups.entries()]
    .filter(([, item]) => item.total > 0)
    .map(([zone, item]) => ({ zone, total: item.total, confirmed: item.confirmed }))
    .sort((a, b) => releaseAssistantCompareZoneCodes(a.zone, b.zone));
}

function renderReleaseAssistantZoneChart() {
  const chart = el.releaseAssistantZoneChart;
  if (!chart) return;

  const items = releaseAssistantZoneChartItems();
  if (!items.length) {
    chart.hidden = true;
    chart.innerHTML = "";
    return;
  }

  const maxTotal = Math.max(...items.map((item) => item.total), 1);
  const middleTotal = Math.round(maxTotal / 2);
  chart.hidden = false;
  chart.innerHTML = `
    <div class="release-assistant-zone-chart-plot">
      <div class="release-assistant-zone-chart-y-axis">
        <span>${formatNumber(maxTotal)}</span>
        <span>${formatNumber(middleTotal)}</span>
        <span>0</span>
      </div>
      <div class="release-assistant-zone-chart-bars">
        ${items.map((item) => {
          const ratio = Math.max(6, Math.round((item.total / maxTotal) * 100));
          const rowClass = item.confirmed ? " release-assistant-zone-chart-row-confirmed" : "";
          return `
            <div class="release-assistant-zone-chart-row${rowClass}">
              <em>${formatNumber(item.total)}</em>
              <i><b style="height: ${ratio}%"></b></i>
              <span>${escapeHtml(item.zone)}</span>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
  requestAnimationFrame(positionReleaseAssistantZoneChart);
}

function releaseAssistantZoneSummaryGroups() {
  const groups = new Map();
  el.releaseAssistantResult?.querySelectorAll("tr[data-release-row-index]").forEach((row) => {
    if (row.classList.contains("is-release-row-copy-confirmed")) return;
    const code = row.dataset.releaseZoneCode || "";
    if (!code) return;
    const zone = code.split("-")[0];
    if (!groups.has(zone)) groups.set(zone, new Map());
    const codes = groups.get(zone);
    if (!codes.has(code)) codes.set(code, { total: 0, selected: 0, copied: 0 });
    const item = codes.get(code);
    const checkbox = row.querySelector(".release-row-checkbox");
    item.total += 1;
    if (row.classList.contains("is-release-row-copy-pending")) item.copied += 1;
    else if (checkbox?.checked) item.selected += 1;
  });
  return [...groups.entries()].sort(([zoneA], [zoneB]) => releaseAssistantCompareZoneCodes(zoneA, zoneB));
}

function renderReleaseAssistantZoneSummary() {
  const summary = el.releaseAssistantZoneSummary;
  renderReleaseAssistantZoneChart();
  renderReleaseAssistantOrderStats();
  if (!summary) return;

  const groups = releaseAssistantZoneSummaryGroups();
  if (!groups.length) {
    summary.hidden = true;
    summary.innerHTML = "";
    return;
  }

  summary.hidden = false;
  summary.innerHTML = groups.map(([zone, codes]) => `
    <section class="release-assistant-zone-summary-group">
      <strong>${escapeHtml(zone)}</strong>
      <div>
        ${[...codes.entries()].sort(([codeA], [codeB]) => releaseAssistantCompareZoneCodes(codeA, codeB)).map(([code, item]) => {
          const status = item.copied ? `已选择${formatNumber(item.copied)}单` : item.selected ? `已选择${formatNumber(item.selected)}单` : "";
          const action = item.copied ? "cancel" : "copy";
          const actionText = item.copied ? "取消" : "选择";
          return `
            <span>
              <span class="release-assistant-zone-total">${escapeHtml(code)}（<b>${formatNumber(item.total)}</b>单）</span>
              <em>${escapeHtml(status)}</em>
              <button type="button" data-release-zone-action="${action}" data-release-zone-copy="${escapeHtml(code)}">${actionText}</button>
            </span>
          `;
        }).join("")}
      </div>
    </section>
  `).join("");
  requestAnimationFrame(() => {
    positionReleaseAssistantZoneChart();
    positionReleaseAssistantFloatingActions();
    positionReleaseAssistantOrderStats();
    positionReleaseAssistantZoneSummary();
  });
}

function shouldHandleReleaseAssistantRowSelection(event) {
  if (state.activeToolView !== "releaseAssistant") return;

  const target = releaseAssistantEventTarget(event);
  if (!target) return;

  const row = target.closest("#releaseAssistantResult tr[data-release-row-index]");
  if (!row || target.closest("a, button")) return;

  const checkbox = row.querySelector(".release-row-checkbox");
  if (!checkbox || checkbox.disabled || row.classList.contains("is-release-row-copy-confirmed")) return;

  return { checkbox };
}

function handleReleaseAssistantPointerSelection(event) {
  if (event.button !== 0) return;

  const selection = shouldHandleReleaseAssistantRowSelection(event);
  if (!selection) return;

  event.preventDefault();
  event.stopPropagation();
  state.releaseAssistantHandledPointerSelection = true;
  selectReleaseAssistantRange(selection.checkbox, !selection.checkbox.checked, event.shiftKey || state.releaseAssistantShiftPressed);
}

function handleReleaseAssistantClickSelection(event) {
  if (state.releaseAssistantHandledPointerSelection) {
    event.preventDefault();
    event.stopPropagation();
    state.releaseAssistantHandledPointerSelection = false;
    return;
  }

  const selection = shouldHandleReleaseAssistantRowSelection(event);
  if (!selection) return;

  event.preventDefault();
  event.stopPropagation();
  selectReleaseAssistantRange(selection.checkbox, !selection.checkbox.checked, event.shiftKey || state.releaseAssistantShiftPressed);
}

function renderReleaseAssistantResult(data) {
  const fileItem = data?.fileItem;
  const table = Array.isArray(data?.table) ? data.table : [];
  const [headers = ["A列", "X列"], ...rows] = table;
  state.releaseAssistantFileItem = fileItem || null;
  state.releaseAssistantLastSelectedIndex = null;
  state.releaseAssistantCopyPending = false;
  if (!el.releaseAssistantResult) return;
  if (!fileItem && !table.length) {
    el.releaseAssistantResult.hidden = true;
    el.releaseAssistantResult.innerHTML = "";
    if (el.releaseAssistantOrderStats) el.releaseAssistantOrderStats.hidden = true;
    if (el.releaseAssistantZoneChart) el.releaseAssistantZoneChart.hidden = true;
    return;
  }

  el.releaseAssistantResult.hidden = false;
  if (el.releaseAssistantFloatingActions) el.releaseAssistantFloatingActions.hidden = false;
  clearReleaseAssistantCopiedRows();
  el.releaseAssistantView?.classList.add("has-release-assistant-result");
  el.releaseAssistantResult.classList.remove("is-error-text");
  el.releaseAssistantResult.innerHTML = `
    <div class="release-assistant-result-head">
      <div>
        <strong>${escapeHtml(fileItem?.name || "处理结果")}</strong>
        <span>${escapeHtml(data.source?.rows ?? rows.length)} 行；已按 X 列排序；只保留 A 列和 X 列</span>
      </div>
    </div>
    <div class="release-assistant-table-wrap">
      <table class="release-assistant-table">
        <thead>
          <tr>
            <th>${escapeHtml(headers[0] || "A列")}</th>
            <th>${escapeHtml(headers[1] || "X列")}</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row, index) => {
            const zone = releaseAssistantPrimaryZone(row?.[1]);
            const previousZone = releaseAssistantPrimaryZone(rows[index - 1]?.[1]);
            const rowClass = index > 0 && zone !== previousZone ? " class=\"is-release-zone-break\"" : "";
            const zoneCode = releaseAssistantSingleZoneCode(row?.[1]);
            const zoneCodeAttribute = zoneCode ? ` data-release-zone-code="${escapeHtml(zoneCode)}"` : "";
            const chartZoneAttribute = zoneCode ? ` data-release-chart-zone="${escapeHtml(zoneCode)}"` : "";
            return `
              <tr data-release-row-index="${index}"${rowClass}${zoneCodeAttribute}${chartZoneAttribute}>
                <td>
                  <div class="release-assistant-select-cell">
                    <input class="release-row-checkbox" type="checkbox" data-release-row-index="${index}" data-release-order="${escapeHtml(row?.[0] ?? "")}">
                    <span>${escapeHtml(row?.[0] ?? "")}</span>
                  </div>
                </td>
                <td>${escapeHtml(row?.[1] ?? "")}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
    <span>页面已显示完整结果。</span>
  `;
  updateReleaseAssistantSelectedCount();
  renderReleaseAssistantZoneSummary();
  requestAnimationFrame(() => {
    positionReleaseAssistantZoneChart();
    positionReleaseAssistantFloatingActions();
    positionReleaseAssistantOrderStats();
    positionReleaseAssistantZoneSummary();
  });
}

function renderReleaseAssistantError(message) {
  if (!el.releaseAssistantResult) return;
  el.releaseAssistantView?.classList.remove("has-release-assistant-result");
  if (el.releaseAssistantFloatingActions) el.releaseAssistantFloatingActions.hidden = true;
  if (el.releaseAssistantOrderStats) el.releaseAssistantOrderStats.hidden = true;
  if (el.releaseAssistantZoneChart) el.releaseAssistantZoneChart.hidden = true;
  if (el.releaseAssistantZoneSummary) el.releaseAssistantZoneSummary.hidden = true;
  el.releaseAssistantResult.hidden = false;
  el.releaseAssistantResult.classList.add("is-error-text");
  el.releaseAssistantResult.innerHTML = `<strong>${escapeHtml(cleanErrorMessage(message, "处理失败"))}</strong>`;
}

async function uploadReleaseAssistantFile(file) {
  if (!file) return;
  if (!/\.xlsx(\.xlsx)?$/i.test(file.name)) {
    throw new Error("只能拖入 .xlsx / .xlsx.xlsx 文件");
  }

  const response = await fetch(`/api/release-assistant/upload?name=${encodeURIComponent(file.name)}`, {
    method: "POST",
    headers: {
      "content-type": "application/octet-stream",
      ...(state.authSession ? { "x-license-session": state.authSession } : {}),
    },
    body: file,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "放单助手处理失败");
  renderReleaseAssistantResult(data);
  setStatus("放单助手处理完成");
}

function confirmReleaseAssistantCopy() {
  const rows = releaseAssistantPendingCopyRows();
  rows.forEach((row) => {
    const checkbox = row.querySelector(".release-row-checkbox");
    if (!checkbox?.checked) {
      row.classList.remove("is-release-row-copied", "is-release-row-copy-pending");
      return;
    }
    row.classList.add("is-release-row-copied", "is-release-row-copy-confirmed");
    row.classList.remove("is-release-row-copy-pending", "is-release-row-selected");
    checkbox.checked = false;
    checkbox.disabled = true;
  });
  state.releaseAssistantLastSelectedIndex = null;
  resetReleaseAssistantCopyButton();
  updateReleaseAssistantSelectedCount();
  renderReleaseAssistantZoneSummary();
}

async function copySelectedReleaseAssistantOrders() {
  if (state.releaseAssistantCopyPending) {
    confirmReleaseAssistantCopy();
    return;
  }

  const checkboxes = selectedReleaseAssistantCheckboxes();
  const rows = checkboxes.map((checkbox) => checkbox.closest("tr")).filter(Boolean);
  const orders = releaseAssistantOrdersFromRows(rows);
  if (!orders.length) return;

  markReleaseAssistantRowsPendingCopy(rows);
  await writeReleaseAssistantPendingCopyToClipboard();
}

async function cancelReleaseAssistantCopy() {
  unmarkReleaseAssistantRowsPendingCopy(releaseAssistantPendingCopyRows());
  if (navigator.clipboard?.writeText) await navigator.clipboard.writeText("");
}

async function copyReleaseAssistantZoneOrders(code) {
  const rows = releaseAssistantRowsForZoneCode(code);
  const orders = releaseAssistantOrdersFromRows(rows);
  if (!orders.length) return;

  markReleaseAssistantRowsPendingCopy(rows, { replace: false });
  await writeReleaseAssistantPendingCopyToClipboard();
}

async function cancelReleaseAssistantZoneCopy(code) {
  const rows = releaseAssistantPendingRowsForZoneCode(code);
  if (!rows.length) return;

  unmarkReleaseAssistantRowsPendingCopy(rows);
  await writeReleaseAssistantPendingCopyToClipboard();
}

async function handleReleaseAssistantZoneCopyAction(code, action) {
  if (action === "cancel") {
    await cancelReleaseAssistantZoneCopy(code);
    return;
  }

  await copyReleaseAssistantZoneOrders(code);
}

function firstExcelFile(files) {
  return [...files]
    .filter((file) => /\.xlsx?(\.xlsx?)?$/i.test(file.name))
    .sort((a, b) => (b.lastModified || 0) - (a.lastModified || 0))[0] || null;
}

function rosterNamesFromText() {
  const seen = new Set();
  return el.nightRosterText.value.split(/\r?\n/).map((line) => line.trim()).filter((name) => {
    if (!name || seen.has(name)) return false;
    seen.add(name);
    return true;
  });
}

function updateRosterCount() {
  el.nightRosterCount.textContent = `${formatNumber(rosterNamesFromText().length)} 人`;
}

async function openNightRoster() {
  try {
    const data = await api("/api/night-shift-roster");
    el.nightRosterText.value = (data.names || []).join("\n");
    updateRosterCount();
    el.nightRosterModal.hidden = false;
    el.nightRosterText.focus();
    setStatus("本班次名单已打开");
  } catch (error) {
    setStatus("名单读取失败", true);
  }
}

async function saveNightRosterAndClose() {
  try {
    const names = rosterNamesFromText();
    const data = await api("/api/night-shift-roster", { names });
    state.nightRosterNames = data.names || [];
    el.nightRosterText.value = state.nightRosterNames.join("\n");
    updateRosterCount();
    el.nightRosterModal.hidden = true;
    if (state.lastResult) renderAnalysis(state.lastResult);
    setStatus(`本班次名单已保存：${formatNumber((data.names || []).length)} 人`);
  } catch (error) {
    setStatus("名单保存失败", true);
  }
}

function emptyLocationZonesFromText() {
  const seen = new Set();
  return el.emptyLocationZoneText.value.split(/\r?\n/).map((line) => line.trim()).filter((zone) => {
    if (!zone || seen.has(zone)) return false;
    seen.add(zone);
    return true;
  });
}

function updateEmptyLocationZoneCount() {
  if (el.emptyLocationZoneCount) el.emptyLocationZoneCount.textContent = `${formatNumber(emptyLocationZonesFromText().length)} 个`;
}

function renderEmptyLocationZoneButtons(zones = state.emptyLocationZones) {
  if (!el.emptyLocationZoneList) return;
  const items = Array.isArray(zones) ? zones : [];
  const activeZones = new Set(items);
  [...state.selectedEmptyLocationZones].forEach((zone) => {
    if (!activeZones.has(zone)) state.selectedEmptyLocationZones.delete(zone);
  });
  el.emptyLocationZoneList.innerHTML = items.map((zone) => `
    <button class="empty-location-zone-item ${state.selectedEmptyLocationZones.has(zone) ? "is-selected" : ""}" type="button" data-empty-location-zone="${escapeHtml(zone)}" aria-pressed="${state.selectedEmptyLocationZones.has(zone) ? "true" : "false"}">${escapeHtml(zone)}</button>
  `).join("");
}

function setEmptyLocationZoneSelected(button, selected) {
  const zone = String(button?.dataset.emptyLocationZone || "").trim();
  if (!zone) return;
  if (selected) {
    state.selectedEmptyLocationZones.add(zone);
  } else {
    state.selectedEmptyLocationZones.delete(zone);
  }
  button.classList.toggle("is-selected", selected);
  button.setAttribute("aria-pressed", selected ? "true" : "false");
}

function emptyLocationZoneButtonFromEvent(event) {
  return event.target?.closest?.(".empty-location-zone-item") || null;
}

function handleEmptyLocationZonePointerDown(event) {
  if (event.button !== 0) return;
  const button = emptyLocationZoneButtonFromEvent(event);
  if (!button) return;
  event.preventDefault();
  const zone = String(button.dataset.emptyLocationZone || "");
  state.emptyLocationSelectionDragging = true;
  state.emptyLocationSelectionMoved = false;
  state.emptyLocationSelectionSuppressClick = false;
  state.emptyLocationPointerDownZone = zone;
  state.emptyLocationPointerDownWasSelected = state.selectedEmptyLocationZones.has(zone);
  setEmptyLocationZoneSelected(button, !state.emptyLocationPointerDownWasSelected);
}

function handleEmptyLocationZonePointerOver(event) {
  if (!state.emptyLocationSelectionDragging || !(event.buttons & 1)) return;
  const button = emptyLocationZoneButtonFromEvent(event);
  if (!button) return;
  const zone = String(button.dataset.emptyLocationZone || "");
  if (zone && zone !== state.emptyLocationPointerDownZone) state.emptyLocationSelectionMoved = true;
  setEmptyLocationZoneSelected(button, !state.emptyLocationPointerDownWasSelected);
}

function finishEmptyLocationZoneSelection() {
  if (!state.emptyLocationSelectionDragging) return;
  state.emptyLocationSelectionSuppressClick = state.emptyLocationSelectionMoved;
  state.emptyLocationSelectionDragging = false;
  state.emptyLocationSelectionMoved = false;
}

function handleEmptyLocationZoneClick(event) {
  const button = emptyLocationZoneButtonFromEvent(event);
  if (!button) return;
  const zone = String(button.dataset.emptyLocationZone || "");
  if (state.emptyLocationSelectionSuppressClick) {
    state.emptyLocationSelectionSuppressClick = false;
    return;
  }
  if (state.emptyLocationPointerDownZone === zone && state.emptyLocationPointerDownWasSelected) {
    setEmptyLocationZoneSelected(button, false);
    return;
  }
  setEmptyLocationZoneSelected(button, true);
}

function selectedEmptyLocationZones() {
  const active = state.emptyLocationZones.filter((zone) => state.selectedEmptyLocationZones.has(zone));
  const extra = [...state.selectedEmptyLocationZones].filter((zone) => !active.includes(zone));
  return [...active, ...extra];
}

function setEmptyLocationQueryView(active) {
  el.emptyLocationShell?.classList.toggle("is-query-result", active);
  if (el.emptyLocationBackButton) el.emptyLocationBackButton.hidden = !active;
  if (el.emptyLocationResultExportButton) el.emptyLocationResultExportButton.hidden = !active;
  if (el.emptyLocationResult) el.emptyLocationResult.hidden = !active;
}

function resetEmptyLocationQueryView() {
  state.emptyLocationQueryResult = null;
  setEmptyLocationQueryView(false);
  if (el.emptyLocationResult) el.emptyLocationResult.innerHTML = "";
  setStatus("本地服务已启动", false, "emptyLocation");
}

function emptyLocationQualifiedTable(analysis) {
  const rows = analysis?.rows || [];
  return `
    <section class="empty-location-qualified">
      <div class="empty-location-qualified-head">
        <strong>符合标准的库位</strong>
        <span>${formatNumber(analysis?.emptyCount ?? rows.length)} 个</span>
      </div>
      ${rowsTable([
        { label: "库区", value: (row) => row.zoneName || "-" },
        { label: "库位编码", value: (row) => row.locationCode || "-" },
        { label: "可用库存", value: (row) => row.availableQty === "" ? "无记录" : formatNumber(row.availableQty) },
        { label: "判断", value: (row) => row.reason || "-" },
        { label: "库位状态", value: (row) => row.locationStatus || "-" },
        { label: "库位类型", value: (row) => row.locationType || "-" },
      ], rows, { compact: true, emptyText: "没有符合标准的库位" })}
    </section>
  `;
}

function emptyLocationResultHtml(data) {
  const fileItems = [
    { title: "库位原表", count: data?.total || 0, fileItem: data?.rawFileItem },
    { title: "库位库存原表", count: data?.inventoryTotal || 0, fileItem: data?.inventoryRawFileItem },
  ].filter((item) => item.fileItem);
  if (!fileItems.length) return `<div class="empty-state">没有生成库位原表</div>`;
  const zones = Array.isArray(data.zones) ? data.zones : [];
  return `
    <div class="empty-location-result-head">
      <strong>WMS 原表</strong>
      <span>${formatNumber(fileItems.length)} 个文件</span>
    </div>
    <div class="empty-location-result-zones">
      ${zones.map((zone) => `<span>${escapeHtml(zone)}</span>`).join("")}
    </div>
    <div class="empty-location-file-list">
      ${fileItems.map(({ title, count, fileItem }) => `
        <div class="file-card empty-location-file-card">
          <div>
            <strong>${escapeHtml(title)}：${escapeHtml(fileItem.name)}</strong>
            <span>${formatNumber(count)} 条 · ${escapeHtml(fileItem.path)}</span>
          </div>
          <div class="file-actions">
            <a href="${escapeHtml(withLicenseSession(fileItem.downloadUrl))}">下载原表</a>
          </div>
        </div>
      `).join("")}
      </div>
    ${emptyLocationQualifiedTable(data.emptyLocations)}
  `;
}

function renderEmptyLocationQueryResult(data, errorMessage = "") {
  if (!el.emptyLocationResult) return;
  if (errorMessage) {
    el.emptyLocationResult.innerHTML = `<div class="empty-location-result-error">${escapeHtml(errorMessage)}</div>`;
    return;
  }
  el.emptyLocationResult.innerHTML = emptyLocationResultHtml(data);
}

function emptyLocationDownloadUrl(url) {
  const resolved = withLicenseSession(url);
  if (!resolved) return "";
  try {
    return new URL(resolved, window.location.href).href;
  } catch {
    return resolved;
  }
}

function triggerDownload(url) {
  const href = emptyLocationDownloadUrl(url);
  if (!href) return;
  const link = document.createElement("a");
  link.href = href;
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

async function exportEmptyLocationRows() {
  const rows = state.emptyLocationQueryResult?.emptyLocations?.rows || [];
  if (!rows.length) {
    setStatus("没有可导出的空库位", true, "emptyLocation");
    return;
  }
  const button = el.emptyLocationResultExportButton;
  const oldText = button?.textContent || "导出";
  if (button) button.textContent = "导出中";
  setBusy(true, "emptyLocation");
  try {
    const data = await api("/api/empty-location/export", { rows });
    triggerDownload(data.fileItem?.downloadUrl);
    setStatus(`空库位已导出：${data.fileItem?.name || ""}`, false, "emptyLocation");
  } catch (error) {
    setStatus(error.message || "空库位导出失败", true, "emptyLocation");
  } finally {
    if (button) button.textContent = oldText;
    setBusy(false, "emptyLocation");
  }
}

async function queryEmptyLocationFiles() {
  const zones = selectedEmptyLocationZones();
  if (!zones.length) {
    setStatus("请先选择库区", true, "emptyLocation");
    return;
  }
  setEmptyLocationQueryView(true);
  if (el.emptyLocationResult) el.emptyLocationResult.innerHTML = `<div class="empty-location-result-loading">正在拉取 WMS 库位原表</div>`;
  setBusy(true, "emptyLocation");
  try {
    const data = await api("/api/empty-location/query", { zones });
    state.emptyLocationQueryResult = data;
    renderEmptyLocationQueryResult(data);
    setStatus(`WMS 原表已导出：符合标准 ${formatNumber(data.emptyLocations?.emptyCount || 0)} 个`, false, "emptyLocation");
  } catch (error) {
    renderEmptyLocationQueryResult(null, error.message || "库位原表导出失败");
    setStatus(error.message || "库位原表导出失败", true, "emptyLocation");
  } finally {
    setBusy(false, "emptyLocation");
  }
}

async function loadEmptyLocationZones() {
  const data = await api("/api/empty-location-zones");
  state.emptyLocationZones = data.zones || [];
  renderEmptyLocationZoneButtons();
  return state.emptyLocationZones;
}

async function openEmptyLocationZones() {
  try {
    await loadEmptyLocationZones();
    el.emptyLocationZoneText.value = state.emptyLocationZones.join("\n");
    updateEmptyLocationZoneCount();
    el.emptyLocationZoneModal.hidden = false;
    el.emptyLocationZoneText.focus();
    setStatus("库区更新已打开", false, "emptyLocation");
  } catch (error) {
    setStatus("库区读取失败", true, "emptyLocation");
  }
}

async function saveEmptyLocationZonesAndClose() {
  try {
    const zones = emptyLocationZonesFromText();
    const data = await api("/api/empty-location-zones", { zones });
    state.emptyLocationZones = data.zones || [];
    el.emptyLocationZoneText.value = state.emptyLocationZones.join("\n");
    updateEmptyLocationZoneCount();
    renderEmptyLocationZoneButtons();
    el.emptyLocationZoneModal.hidden = true;
    setStatus(`库区已保存：${formatNumber((data.zones || []).length)} 个`, false, "emptyLocation");
  } catch (error) {
    setStatus("库区保存失败", true, "emptyLocation");
  }
}

async function loadNightRoster() {
  const data = await api("/api/night-shift-roster");
  state.nightRosterNames = data.names || [];
  return state.nightRosterNames;
}

function rosterIndex(person) {
  return state.nightRosterNames.findIndex((name) => name === person);
}

function isRosterPerson(person) {
  return state.nightRosterNames.length === 0 || rosterIndex(person) >= 0;
}

function isRosterListedPerson(person) {
  return state.nightRosterNames.length > 0 && rosterIndex(person) >= 0;
}

function sortByNightRoster(rows) {
  if (!state.nightRosterNames.length) return rows;
  return [...rows].sort((a, b) => {
    const ai = rosterIndex(a.person);
    const bi = rosterIndex(b.person);
    if (ai >= 0 && bi >= 0) return ai - bi;
    if (ai >= 0) return -1;
    if (bi >= 0) return 1;
    return a.person.localeCompare(b.person, "zh-Hans-CN");
  });
}

function sortByEfficiencyRank(rows) {
  return [...rows].sort((a, b) => {
    const aOutsider = isRosterPerson(a.person) ? 0 : 1;
    const bOutsider = isRosterPerson(b.person) ? 0 : 1;
    if (aOutsider !== bOutsider) return aOutsider - bOutsider;
    return Number(b.activeEfficiencyPerHour ?? -1) - Number(a.activeEfficiencyPerHour ?? -1)
      || Number(b.completedQuantity || 0) - Number(a.completedQuantity || 0)
      || a.person.localeCompare(b.person, "zh-Hans-CN");
  });
}

function currentShiftEfficiencyRows(rows) {
  if (!state.nightRosterNames.length) {
    return sortByEfficiencyRank(rows)
      .filter((row) => Number(row.completedQuantity || 0) > 0 && !row.excludeEfficiency);
  }

  const byPerson = new Map(rows.map((row) => [row.person, row]));
  return sortByEfficiencyRank(state.nightRosterNames.map((name) => byPerson.get(name) || { person: name }));
}

function sortByMultiOrder(rows) {
  return [...rows].sort((a, b) => {
    const aOutsider = isRosterPerson(a.person) ? 0 : 1;
    const bOutsider = isRosterPerson(b.person) ? 0 : 1;
    if (aOutsider !== bOutsider) return aOutsider - bOutsider;
    const aHasMulti = Number(a.multiOrderRows || 0) > 0 ? 0 : 1;
    const bHasMulti = Number(b.multiOrderRows || 0) > 0 ? 0 : 1;
    if (aHasMulti !== bHasMulti) return aHasMulti - bHasMulti;
    return Number(b.multiOrderRows || 0) - Number(a.multiOrderRows || 0)
      || Number(b.rows || 0) - Number(a.rows || 0)
      || a.person.localeCompare(b.person, "zh-Hans-CN");
  });
}

function summarizeMetricPeople(people) {
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
    completedQuantity: people.reduce((sum, row) => sum + Number(row.completedQuantity || 0), 0),
    assignedOnlyPeople: people.filter((row) => row.assignedRows > 0 && row.pickingRows === 0).length,
  };
}

const QUANTITY_TREND_TYPES = [
  { key: "total", label: "总数", quantityKey: "completedQuantity", rowsKey: "completedRows" },
  { key: "single", label: "Single", quantityKey: "completedSingleQuantity", rowsKey: "completedSingleRows" },
  { key: "singleBatch", label: "Single Batch", quantityKey: "completedSingleBatchQuantity", rowsKey: "completedSingleBatchRows" },
  { key: "multi", label: "Multi", quantityKey: "completedMultiQuantity", rowsKey: "completedMultiRows" },
];

function quantityTrendType(type) {
  return QUANTITY_TREND_TYPES.find((item) => item.key === type) || QUANTITY_TREND_TYPES[0];
}

function scopedTrendPeople(day, scope) {
  const people = day?.people || [];
  if (!state.nightRosterNames.length || scope === "all") return people;
  if (scope === "current") return people.filter((row) => isRosterListedPerson(row.person));
  if (scope === "other") return people.filter((row) => !isRosterListedPerson(row.person));
  return people;
}

function quantityTrendMetric(day, scope, typeKey) {
  if (scope === "all" && day?.totals?.byType?.[typeKey]) {
    return {
      quantity: Number(day.totals.byType[typeKey].quantity || 0),
      rows: Number(day.totals.byType[typeKey].rows || 0),
    };
  }
  const type = quantityTrendType(typeKey);
  return scopedTrendPeople(day, scope).reduce((sum, row) => ({
    quantity: sum.quantity + Number(row[type.quantityKey] || 0),
    rows: sum.rows + Number(row[type.rowsKey] || 0),
  }), { quantity: 0, rows: 0 });
}

function addYmdDays(ymd, days) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(ymd || ""));
  if (!match) return "";
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]) + days));
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function inboundWindowForDate(date) {
  const startDate = String(date || "").trim();
  const endDate = addYmdDays(startDate, 1);
  if (!startDate || !endDate) return null;
  return {
    businessDate: startDate,
    start: `${startDate} 00:00:00`,
    end: `${endDate} 00:00:00`,
    startDate,
    startTime: "00:00:00",
    endDate,
    endTime: "00:00:00",
  };
}

function updateInboundWindow() {
  const windowSpec = inboundWindowForDate(el.inboundBusinessDate?.value);
  state.inboundWindow = windowSpec;
  if (el.inboundView) {
    el.inboundView.dataset.inboundStart = windowSpec?.start || "";
    el.inboundView.dataset.inboundEnd = windowSpec?.end || "";
  }
  if (el.inboundWindowText) {
    el.inboundWindowText.textContent = windowSpec
      ? `${windowSpec.start} 到 ${windowSpec.end}`
      : "请选择入库日期";
  }
  return windowSpec;
}

function inboundSummaryValue(summary, key) {
  const value = Number(summary?.[key] ?? 0);
  return Number.isFinite(value) ? value : 0;
}

function renderInboundSummaryStats(summary) {
  if (!el.inboundSummaryStats) return;
  if (!summary) {
    el.inboundSummaryStats.hidden = true;
    el.inboundSummaryStats.innerHTML = "";
    return;
  }
  const totalTasks = inboundSummaryValue(summary, "totalTasks");
  const completedTasks = inboundSummaryValue(summary, "completedTasks");
  const pendingTasks = inboundSummaryValue(summary, "pendingTasks");
  el.inboundSummaryStats.hidden = false;
  el.inboundSummaryStats.innerHTML = `
    <div class="inbound-summary-card">
      <span>总任务数</span>
      <strong>${formatNumber(totalTasks)}</strong>
    </div>
    <div class="inbound-summary-card">
      <span>已完成数量</span>
      <strong>${formatNumber(completedTasks)}</strong>
    </div>
    <div class="inbound-summary-card">
      <span>待完成数量</span>
      <strong>${formatNumber(pendingTasks)}</strong>
    </div>
  `;
}

function renderInboundPeopleStats(summary) {
  if (!el.inboundPeopleStats) return;
  const people = Array.isArray(summary?.people) ? summary.people : [];
  if (!people.length) {
    el.inboundPeopleStats.hidden = true;
    el.inboundPeopleStats.innerHTML = "";
    return;
  }
  el.inboundPeopleStats.hidden = false;
  el.inboundPeopleStats.innerHTML = `
    <h4>每个人任务数-上架件数</h4>
    <div class="inbound-people-grid">
      ${people.map((person) => `
        <div class="inbound-person-card">
          <span>${escapeHtml(person.person || "-")}</span>
          <strong>${formatNumber(person.totalTasks || 0)} - ${formatNumber(person.putawayQty || 0)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderInboundPeopleDetails(summary) {
  if (!el.inboundPeopleDetails) return;
  const peopleDetails = Array.isArray(summary?.peopleDetails) ? summary.peopleDetails : [];
  if (!peopleDetails.length) {
    el.inboundPeopleDetails.hidden = true;
    el.inboundPeopleDetails.innerHTML = "";
    return;
  }
  el.inboundPeopleDetails.hidden = false;
  el.inboundPeopleDetails.innerHTML = `
    <h4>每个人任务明细</h4>
    ${peopleDetails.map((person) => `
      <section class="inbound-person-detail">
        <div class="inbound-person-detail-head">
          <strong>${escapeHtml(person.person || "-")}</strong>
          <span>${formatNumber(person.totalTasks || 0)} 个任务</span>
        </div>
        <div class="inbound-detail-table-wrap">
          <table class="inbound-detail-table">
            <thead>
              <tr>
                <th>任务批次号</th>
                <th>容器</th>
                <th>目标库位</th>
                <th>计划数量</th>
                <th>完成数量</th>
                <th>开始时间</th>
                <th>结束时间</th>
                <th>耗时</th>
                <th>两单间隔</th>
              </tr>
            </thead>
            <tbody>
              ${(person.tasks || []).map((task) => `
                <tr>
                  <td>${escapeHtml(task.taskBatchNo || "-")}</td>
                  <td>${escapeHtml(task.containerCode || "-")}</td>
                  <td>${escapeHtml(task.targetLocation || "-")}</td>
                  <td>${escapeHtml(task.planQty || "-")}</td>
                  <td>${escapeHtml(task.finishedQty || "-")}</td>
                  <td>${escapeHtml(task.startTime || "-")}</td>
                  <td>${escapeHtml(task.endTime || "-")}</td>
                  <td>${escapeHtml(task.durationText || "-")}</td>
                  <td>${escapeHtml(task.gapText || "-")}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `).join("")}
  `;
}

function renderInboundRawWorkbookAnalysis(summary) {
  renderInboundSummaryStats(summary);
  renderInboundPeopleStats(summary);
  renderInboundPeopleDetails(summary);
}

function renderInboundTaskResult(data) {
  const fileItem = data?.rawFileItem;
  const windowSpec = data?.window || state.inboundWindow || {};
  state.inboundRawFileItem = fileItem || null;
  if (!el.inboundResultArea) return;
  el.inboundResultArea.hidden = false;
  if (el.inboundResultText) {
    const start = windowSpec.startDisplay || state.inboundWindow?.start || "-";
    const end = windowSpec.endDisplay || state.inboundWindow?.end || "-";
    el.inboundResultText.textContent = `任务类型：上架/收货上架；状态：空；创建时间：${start} 到 ${end}`;
  }
  renderInboundRawWorkbookAnalysis(data?.summary);
  if (el.inboundFileList) {
    el.inboundFileList.innerHTML = fileItem ? `
      <li>
        <div class="file-card">
          <div>
            <strong>${escapeHtml(fileItem.name)}</strong>
            <span>${escapeHtml(fileItem.path)}</span>
          </div>
          <div class="file-actions">
            <a href="${escapeHtml(withLicenseSession(fileItem.downloadUrl))}">下载</a>
          </div>
        </div>
      </li>
    ` : "";
  }
}

function renderInboundEfficiencyFile(file, errorMessage = "") {
  state.inboundEfficiencyFile = file || null;
  if (!el.inboundEfficiencyFileResult) return;

  if (errorMessage) {
    el.inboundEfficiencyView?.classList.remove("has-inbound-efficiency-result");
    if (el.inboundEfficiencyAlertPanel) {
      el.inboundEfficiencyAlertPanel.hidden = true;
      el.inboundEfficiencyAlertPanel.innerHTML = "";
    }
    el.inboundEfficiencyFileResult.hidden = false;
    el.inboundEfficiencyFileResult.classList.add("is-error-text");
    el.inboundEfficiencyFileResult.innerHTML = `<strong>${escapeHtml(cleanErrorMessage(errorMessage, "处理失败"))}</strong>`;
    return;
  }

  if (!file) {
    el.inboundEfficiencyView?.classList.remove("has-inbound-efficiency-result");
    if (el.inboundEfficiencyAlertPanel) {
      el.inboundEfficiencyAlertPanel.hidden = true;
      el.inboundEfficiencyAlertPanel.innerHTML = "";
    }
    el.inboundEfficiencyFileResult.hidden = true;
    el.inboundEfficiencyFileResult.classList.remove("is-error-text");
    el.inboundEfficiencyFileResult.innerHTML = "";
    return;
  }

  el.inboundEfficiencyFileResult.hidden = false;
  el.inboundEfficiencyFileResult.classList.remove("is-error-text");
  el.inboundEfficiencyFileResult.innerHTML = `
    <div class="file-card">
      <div>
        <strong>${escapeHtml(file.name)}</strong>
        <span>正在分析</span>
      </div>
    </div>
  `;
}

function parseInboundEfficiencyDateTime(value) {
  const match = /^(\d{4})-(\d{1,2})-(\d{1,2})[ T]+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/.exec(String(value || "").trim());
  if (!match) return null;
  const [, year, month, day, hour, minute, second = "0"] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
  return Number.isFinite(date.getTime()) ? date : null;
}

function inboundEfficiencyNextNoonDeadline(now = new Date()) {
  const deadline = new Date(now);
  deadline.setDate(deadline.getDate() + 1);
  deadline.setHours(12, 0, 0, 0);
  return deadline;
}

function inboundEfficiencyWarningInfo(rows) {
  const now = new Date();
  const deadline = inboundEfficiencyNextNoonDeadline(now);
  const warningRows = rows.filter((row) => {
    const due = parseInboundEfficiencyDateTime(row?.dueTime);
    return due && due.getTime() <= deadline.getTime();
  });
  const orderNos = [...new Set(warningRows.map((row) => String(row?.inboundOrderNo || "").trim()).filter(Boolean))];
  return { now, deadline, warningRows, orderNos };
}

function isInboundEfficiencyWarningRow(row, deadline) {
  const due = parseInboundEfficiencyDateTime(row?.dueTime);
  return Boolean(due && due.getTime() <= deadline.getTime());
}

function renderInboundEfficiencyAlert(info) {
  if (!el.inboundEfficiencyAlertPanel) return;
  el.inboundEfficiencyAlertPanel.hidden = false;
  el.inboundEfficiencyAlertPanel.innerHTML = `
    <div class="inbound-efficiency-alert-head">
      <div>
        <strong>次日12点前超时</strong>
        <span>当前 ${escapeHtml(formatLocalDateTime(info.now))} / 截止 ${escapeHtml(formatLocalDateTime(info.deadline))}</span>
      </div>
      <div class="inbound-efficiency-alert-count">
        <strong>${formatNumber(info.warningRows.length)}</strong>
        <span>条</span>
      </div>
    </div>
    <div class="inbound-efficiency-alert-orders">
      ${info.orderNos.length
        ? info.orderNos.map((orderNo) => `
          <div class="inbound-efficiency-alert-order-row">
            <strong>${escapeHtml(orderNo)}</strong>
            <span></span>
          </div>
        `).join("")
        : `
          <div class="inbound-efficiency-alert-order-row">
            <strong>无</strong>
            <span></span>
          </div>
        `}
    </div>
  `;
}

function renderInboundEfficiencyResult(data) {
  state.inboundEfficiencyFile = data?.source || null;
  if (!el.inboundEfficiencyFileResult) return;
  const columns = Array.isArray(data?.columns) ? data.columns : [];
  const rows = Array.isArray(data?.rows) ? data.rows : [];
  const source = data?.source || {};
  const warning = inboundEfficiencyWarningInfo(rows);
  el.inboundEfficiencyView?.classList.add("has-inbound-efficiency-result");
  el.inboundEfficiencyDropZone?.classList.remove("is-dragover");
  renderInboundEfficiencyAlert(warning);
  el.inboundEfficiencyFileResult.hidden = false;
  el.inboundEfficiencyFileResult.classList.remove("is-error-text");
  el.inboundEfficiencyFileResult.innerHTML = `
    <div class="inbound-efficiency-result-head">
      <div>
        <strong>${escapeHtml(source.name || "入库实效分析")}</strong>
        <span>共 ${formatNumber(rows.length)} 行，duetime = arrivetime + 40小时</span>
      </div>
      <button id="inboundEfficiencyReset" class="secondary-action inbound-efficiency-reset" type="button">重置</button>
    </div>
    <div class="inbound-efficiency-table-wrap">
      <table class="inbound-efficiency-table">
        <thead>
          <tr>
            ${columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr class="${isInboundEfficiencyWarningRow(row, warning.deadline) ? "is-inbound-efficiency-warning-row" : ""}">
              ${columns.map((column) => `<td>${escapeHtml(row[column.key] ?? "")}</td>`).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function resetInboundEfficiencyResult() {
  state.inboundEfficiencyFile = null;
  el.inboundEfficiencyView?.classList.remove("has-inbound-efficiency-result");
  el.inboundEfficiencyDropZone?.classList.remove("is-dragover");
  if (el.inboundEfficiencyFileInput) el.inboundEfficiencyFileInput.value = "";
  renderInboundEfficiencyFile(null);
  setStatus("本地服务已启动", false, "inboundEfficiency");
  setTimeout(() => el.inboundEfficiencyDropZone?.focus(), 0);
}

async function uploadInboundEfficiencyFile(file) {
  if (!file) return;
  if (!/\.xlsx(\.xlsx)?$/i.test(file.name)) {
    throw new Error("只能拖入 .xlsx / .xlsx.xlsx 文件");
  }

  const response = await fetch(`/api/inbound-efficiency/upload?name=${encodeURIComponent(file.name)}`, {
    method: "POST",
    headers: {
      "content-type": "application/octet-stream",
      ...(state.authSession ? { "x-license-session": state.authSession } : {}),
    },
    body: file,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "入库实效分析失败");
  renderInboundEfficiencyResult(data);
  setStatus("入库实效分析完成", false, "inboundEfficiency");
}

async function handleInboundEfficiencyFiles(files, emptyMessage) {
  const file = firstExcelFile(files || []);
  if (!file) {
    renderInboundEfficiencyFile(null, emptyMessage);
    setStatus(emptyMessage, true, "inboundEfficiency");
    return;
  }
  setBusy(true, "inboundEfficiency");
  try {
    renderInboundEfficiencyFile(file);
    await uploadInboundEfficiencyFile(file);
  } catch (error) {
    renderInboundEfficiencyFile(null, error.message);
    setStatus(error.message || "入库实效分析失败", true, "inboundEfficiency");
  } finally {
    setBusy(false, "inboundEfficiency");
  }
}

function renderPackingStatusResult(data, errorText = "") {
  if (!el.packingStatusResult) return;
  if (errorText) {
    el.packingStatusResult.hidden = false;
    el.packingStatusResult.innerHTML = `<div class="empty-state is-error-text">${escapeHtml(errorText)}</div>`;
    return;
  }
  if (!data) {
    el.packingStatusResult.hidden = true;
    el.packingStatusResult.innerHTML = "";
    return;
  }

  const people = Array.isArray(data.people) ? data.people : [];
  const summary = data.summary || {};
  el.packingStatusResult.hidden = false;
  el.packingStatusResult.innerHTML = `
    <section class="packing-status-summary">
      <div><span>已完成复核单</span><strong>${formatNumber(summary.completedOrders)}</strong></div>
      <div><span>复核人员</span><strong>${formatNumber(summary.people)}</strong></div>
      <div><span>完成数量</span><strong>${formatNumber(summary.completedQuantity)}</strong></div>
    </section>
    ${people.length ? people.map((person) => `
      <section class="analysis-section packing-person-section">
        <div class="section-title">
          <h3>${escapeHtml(person.person)}</h3>
          <span>${formatNumber(person.completedOrders)} 单 / ${formatNumber(person.completedQuantity)} 件 / 平均 ${formatPiecesPerHour(person.averageEfficiency)}</span>
        </div>
        ${rowsTable([
          { label: "序", value: (row, index) => index + 1 },
          { label: "拣选单号", value: (row) => row.pickOrderNumber },
          { label: "容器号", value: (row) => row.containerCode },
          { label: "开始时间", value: (row) => row.startTimeText || row.startTime || "-" },
          { label: "完成时间", value: (row) => row.endTimeText || row.endTime || "-" },
          { label: "每单用时", value: (row) => row.durationText },
          { label: "两单间隔", value: (row) => row.gapText },
          { label: "完成数量", value: (row) => formatNumber(row.completedQuantity) },
          { label: "单内件效", value: (row) => formatPiecesPerHour(row.orderEfficiency) },
        ], person.details || [], { compact: true, emptyText: "没有已完成复核明细" })}
      </section>
    `).join("") : `<div class="empty-state">没有已完成复核明细</div>`}
  `;
}

async function uploadPackingStatusFile(file) {
  if (!file) return;
  if (!/\.xlsx(\.xlsx)?$/i.test(file.name)) {
    throw new Error("只能拖入 .xlsx / .xlsx.xlsx 文件");
  }

  const response = await fetch(`/api/packing-status/upload?name=${encodeURIComponent(file.name)}`, {
    method: "POST",
    headers: {
      "content-type": "application/octet-stream",
      ...(state.authSession ? { "x-license-session": state.authSession } : {}),
    },
    body: file,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "打包状态分析失败");
  state.packingStatusFile = file;
  renderPackingStatusResult(data);
  setStatus("打包状态分析完成", false, "realtime");
}

async function handlePackingStatusFiles(files, emptyMessage) {
  const file = firstExcelFile(files || []);
  if (!file) {
    renderPackingStatusResult(null, emptyMessage);
    setStatus(emptyMessage, true, "realtime");
    return;
  }
  setBusy(true, "realtime");
  try {
    await uploadPackingStatusFile(file);
  } catch (error) {
    renderPackingStatusResult(null, error.message);
    setStatus(error.message || "打包状态分析失败", true, "realtime");
  } finally {
    setBusy(false, "realtime");
  }
}

function fillQuantityTrendDates(series) {
  if (series.length < 2) return series;
  const first = series[0].date;
  const last = series[series.length - 1].date;
  if (!addYmdDays(first, 0) || !addYmdDays(last, 0)) return series;
  const byDate = new Map(series.map((row) => [row.date, row]));
  const filled = [];
  let current = first;
  let guard = 0;
  while (current && current <= last && guard < 370) {
    filled.push(byDate.get(current) || {
      date: current,
      quantity: null,
      rows: null,
      hasData: false,
    });
    current = addYmdDays(current, 1);
    guard += 1;
  }
  return filled.length ? filled : series;
}

function quantityTrendSeries(result, scope, typeKey) {
  const series = [...(result?.pickQuantityTrend?.daily || [])]
    .sort((a, b) => String(a.businessDate).localeCompare(String(b.businessDate)))
    .map((day) => {
      const metric = quantityTrendMetric(day, scope, typeKey);
      return {
        date: day.businessDate,
        quantity: metric.quantity,
        rows: metric.rows,
        hasData: true,
      };
    });
  return fillQuantityTrendDates(series);
}

function niceTickStep(maxValue, targetIntervals = 8) {
  const raw = Math.max(1, Number(maxValue || 0) / targetIntervals);
  const power = 10 ** Math.floor(Math.log10(raw));
  const normalized = raw / power;
  const nice = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 2.5 ? 2.5 : normalized <= 5 ? 5 : 10;
  return nice * power;
}

function quantityTrendChart(series) {
  const values = series.filter((row) => row.hasData !== false).map((row) => Number(row.quantity || 0));
  const maxValue = Math.max(1, ...values);
  const tickStep = niceTickStep(maxValue);
  const yMax = Math.max(tickStep, Math.ceil(maxValue / tickStep) * tickStep);
  const yTicks = [];
  for (let value = 0; value <= yMax + tickStep / 2; value += tickStep) {
    yTicks.push(Math.round(value * 10) / 10);
  }
  const rotateLabels = series.length > 14;
  const width = 760;
  const height = rotateLabels ? 246 : 230;
  const left = 64;
  const right = 18;
  const top = 18;
  const bottom = rotateLabels ? 58 : 44;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const xFor = (index) => left + (series.length <= 1 ? plotWidth / 2 : (plotWidth * index) / (series.length - 1));
  const yFor = (value) => top + plotHeight - (plotHeight * Number(value || 0)) / yMax;
  const pointSegments = [];
  let currentPoints = [];
  series.forEach((row, index) => {
    if (row.hasData === false) {
      if (currentPoints.length) pointSegments.push(currentPoints);
      currentPoints = [];
      return;
    }
    currentPoints.push(`${xFor(index).toFixed(1)},${yFor(row.quantity).toFixed(1)}`);
  });
  if (currentPoints.length) pointSegments.push(currentPoints);
  const barWidth = Math.max(4, Math.min(24, plotWidth / Math.max(1, series.length) * 0.45));

  return `
    <svg class="quantity-trend-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="已拣选数量走势">
      ${yTicks.map((value) => {
        const y = yFor(value);
        return `
          <line class="y-grid" x1="${left}" y1="${y.toFixed(1)}" x2="${width - right}" y2="${y.toFixed(1)}" />
          <text class="y-label" x="${left - 8}" y="${(y + 4).toFixed(1)}">${formatNumber(value)}</text>
        `;
      }).join("")}
      <line class="axis-line" x1="${left}" y1="${top + plotHeight}" x2="${width - right}" y2="${top + plotHeight}" />
      <line class="axis-line" x1="${left}" y1="${top}" x2="${left}" y2="${top + plotHeight}" />
      ${series.map((row, index) => {
        if (row.hasData === false) return "";
        const x = xFor(index);
        const y = yFor(row.quantity);
        const h = top + plotHeight - y;
        return `<rect x="${(x - barWidth / 2).toFixed(1)}" y="${y.toFixed(1)}" width="${barWidth.toFixed(1)}" height="${h.toFixed(1)}" />`;
      }).join("")}
      ${pointSegments.map((points) => `<polyline points="${points.join(" ")}" />`).join("")}
      ${series.map((row, index) => (row.hasData === false ? "" : `<circle cx="${xFor(index).toFixed(1)}" cy="${yFor(row.quantity).toFixed(1)}" r="3.2"><title>${escapeHtml(row.date)}：${formatNumber(row.quantity)} 件</title></circle>`)).join("")}
      ${series.map((row, index) => {
        const x = xFor(index);
        const y = height - (rotateLabels ? 10 : 12);
        const transform = rotateLabels ? ` transform="rotate(-35 ${x.toFixed(1)} ${y.toFixed(1)})"` : "";
        return `<text class="x-label${rotateLabels ? " is-rotated" : ""}" x="${x.toFixed(1)}" y="${y.toFixed(1)}"${transform}>${escapeHtml(String(row.date || "").slice(5))}</text>`;
      }).join("")}
    </svg>
  `;
}

function quantityTrendPanel(result, scope) {
  if (state.quantityTrendScope !== scope) return "";
  const type = quantityTrendType(state.quantityTrendType);
  const series = quantityTrendSeries(result, scope, type.key);
  const dataSeries = series.filter((row) => row.hasData !== false);
  const latest = dataSeries[dataSeries.length - 1] || null;
  const max = dataSeries.reduce((best, row) => (Number(row.quantity || 0) > Number(best?.quantity || 0) ? row : best), null);
  const rangeText = series.length ? `${series[0].date} 至 ${series[series.length - 1].date}` : "暂无数据";
  const scopeLabel = scope === "current" ? "本班次" : scope === "other" ? "其他班次" : "全部";

  return `
    <div class="quantity-trend-panel">
      <div class="quantity-trend-head">
        <strong>${escapeHtml(scopeLabel)} ${escapeHtml(type.label)} 已拣选数量走势</strong>
        <span>${escapeHtml(rangeText)}</span>
      </div>
      <div class="quantity-trend-kpis">
        <div><span>最新数量</span><strong>${formatNumber(latest?.quantity)}</strong></div>
        <div><span>最高数量</span><strong>${formatNumber(max?.quantity)}</strong></div>
        <div><span>天数</span><strong>${formatNumber(series.length)}</strong></div>
      </div>
      ${series.length ? quantityTrendChart(series) : `<div class="empty-state">暂无已拣选数量走势</div>`}
      ${rowsTable([
        { label: "日期", value: (row) => row.date },
        { label: "已拣选数量", value: (row) => formatNumber(row.quantity) },
        { label: "已拣选单", value: (row) => formatNumber(row.rows) },
      ], [...series].reverse().slice(0, 14), {
        compact: true,
        emptyText: "暂无已拣选数量走势",
      })}
    </div>
  `;
}

function quantityTrendButtons(scope) {
  return `
    <div class="metric-breakdown-row is-trend-row">
      <strong>走势</strong>
      ${QUANTITY_TREND_TYPES.map((type) => {
        const active = state.quantityTrendScope === scope && state.quantityTrendType === type.key;
        return `<span><button class="quantity-trend-button ${active ? "is-active" : ""}" type="button" data-quantity-trend-scope="${escapeHtml(scope)}" data-quantity-trend-type="${escapeHtml(type.key)}">${escapeHtml(type.label)}</button></span>`;
      }).join("")}
    </div>
  `;
}

function metricCards(totals, options = {}) {
  const scope = options.scope || "all";
  const breakdownRows = [
    ["总单数", totals.rows, totals.singleOrderRows, totals.singleBatchOrderRows, totals.multiOrderRows],
    ["总数量", totals.quantityOfPick, totals.singleQuantity, totals.singleBatchQuantity, totals.multiQuantity],
    ["已分配", totals.assignedRows, totals.assignedSingleRows, totals.assignedSingleBatchRows, totals.assignedMultiRows],
    ["已分配数量", totals.assignedQuantity, totals.assignedSingleQuantity, totals.assignedSingleBatchQuantity, totals.assignedMultiQuantity],
    ["拣选中", totals.pickingRows, totals.pickingSingleRows, totals.pickingSingleBatchRows, totals.pickingMultiRows],
    ["拣选中数量", totals.pickingQuantity, totals.pickingSingleQuantity, totals.pickingSingleBatchQuantity, totals.pickingMultiQuantity],
    ["已拣选", totals.pickedRows, totals.completedSingleRows, totals.completedSingleBatchRows, totals.completedMultiRows],
    ["已拣选数量", totals.completedQuantity, totals.completedSingleQuantity, totals.completedSingleBatchQuantity, totals.completedMultiQuantity],
  ];

  return `
    <div class="metric-section">
      <div class="metric-section-title">订单明细</div>
      <div class="metric-breakdown">
        <div class="metric-breakdown-row is-head">
          <span>指标</span>
          <span>总数</span>
          <span>Single</span>
          <span>Single Batch</span>
          <span>Multi</span>
        </div>
        ${breakdownRows.map(([label, total, single, singleBatch, multi]) => `
          <div class="metric-breakdown-row">
            <strong>${escapeHtml(label)}</strong>
            <span>${formatNumber(total)}</span>
            <span>${formatNumber(single)}</span>
            <span>${formatNumber(singleBatch)}</span>
            <span>${formatNumber(multi)}</span>
          </div>
        `).join("")}
        ${quantityTrendButtons(scope)}
      </div>
      ${quantityTrendPanel(options.result, scope)}
    </div>
    <div class="metric-people-row">
      <span>只已分配人员</span>
      <strong>${formatNumber(totals.assignedOnlyPeople)}</strong>
    </div>
  `;
}

function metricGroup(label, note, totals, className = "", options = {}) {
  return `
    <section class="metric-group ${className}">
      <div class="metric-group-head">
        <strong>${escapeHtml(label)}</strong>
        <span>${escapeHtml(note)}</span>
      </div>
      <div class="metric-grid">
        ${metricCards(totals, options)}
      </div>
    </section>
  `;
}

function renderAnalysisMetrics(result) {
  if (!state.nightRosterNames.length) {
    el.metrics.classList.remove("is-grouped");
    el.metrics.innerHTML = metricCards(result.totals, { scope: "all", result });
    return;
  }

  const currentPeople = result.people.filter((person) => isRosterListedPerson(person.person));
  const otherPeople = result.people.filter((person) => !isRosterListedPerson(person.person));
  const activeRosterNames = state.nightRosterNames.filter((name) => result.people.some((person) => person.person === name));
  el.metrics.classList.add("is-grouped");
  el.metrics.innerHTML = `
    ${metricGroup("本班次", `名单 ${formatNumber(state.nightRosterNames.length)} 人 / 有数据 ${formatNumber(activeRosterNames.length)} 人`, summarizeMetricPeople(currentPeople), "is-current", { scope: "current", result })}
    ${metricGroup("其他班次", `名单外 ${formatNumber(otherPeople.length)} 人`, summarizeMetricPeople(otherPeople), "is-other", { scope: "other", result })}
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
          ${rows.map((row, index) => `
            <tr class="${options.rowClass ? options.rowClass(row) : ""}">
              ${headers.map((header) => {
                const raw = typeof header.value === "function" ? header.value(row, index) : row[header.key];
                const html = header.cellHtml ? header.cellHtml(row, index) : (header.html ? raw : escapeHtml(raw ?? ""));
                return `<td>${html}</td>`;
              }).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function overallActiveEfficiency(result) {
  const people = (result?.people || []).filter((row) => !row.excludeEfficiency);
  const completedQuantity = people.reduce((sum, row) => sum + Number(row.completedQuantity || 0), 0);
  const activeMinutes = people.reduce((sum, row) => sum + Number(row.efficiencyDurationMinutes || 0), 0);
  if (!completedQuantity || !activeMinutes) return null;
  return Math.round((completedQuantity / (activeMinutes / 60)) * 10) / 10;
}

function historicalEfficiencyForProgress(row, result, order) {
  if (order?.pickingOrderType === "singleBatch") {
    const singleBatch = Number(row.day1SingleBatchActiveEfficiencyPerHour || 0);
    if (singleBatch > 0) return { value: singleBatch, source: "day-1 Single Batch" };
  }
  if (order?.pickingOrderType === "multi") {
    const multi = Number(row.day1MultiActiveEfficiencyPerHour || 0);
    if (multi > 0) return { value: multi, source: "day-1 Multi" };
  }
  if (order?.pickingOrderType === "single") {
    const single = Number(row.day1SingleActiveEfficiencyPerHour || 0);
    if (single > 0) return { value: single, source: "day-1 Single" };
  }
  const day1 = Number(row.day1ActiveEfficiencyPerHour || 0);
  if (day1 > 0) return { value: day1, source: "day-1人效" };
  const personal = Number(row.activeEfficiencyPerHour || 0);
  if (personal > 0 && !row.excludeEfficiency) return { value: personal, source: "个人历史" };
  const overall = overallActiveEfficiency(result);
  if (overall > 0) return { value: overall, source: "全场历史" };
  return null;
}

function activePickingOrder(row, result) {
  return (result?.orderDurations || [])
    .filter((order) => order.person === row.person && order.statusGroup === "拣选中" && order.startedAtMs != null)
    .sort((a, b) => Number(b.startedAtMs || 0) - Number(a.startedAtMs || 0) || String(a.pickOrderNumber || "").localeCompare(String(b.pickOrderNumber || "")))[0] || null;
}

function pickingProgressCell(row, result) {
  const pickingRows = Number(row.pickingRows || 0);
  if (pickingRows !== 1) return formatNumber(row.pickingRows);

  const order = activePickingOrder(row, result);
  const history = historicalEfficiencyForProgress(row, result, order);
  const quantity = Number(order?.quantityOfPick || row.pickingQuantity || 0);
  const elapsedMinutes = order ? minutesBetweenMs(order.startedAtMs, result?.source?.analyzedAtMs) : null;
  if (order?.excludedFromEfficiency || Number(elapsedMinutes || 0) > OVERTIME_OPEN_ORDER_EXCLUDE_MINUTES) {
    return `<div class="picking-progress-cell is-muted is-danger"><strong>${formatNumber(row.pickingRows)}</strong><span>超时不计</span></div>`;
  }
  if (!order || !history || !quantity || elapsedMinutes == null) {
    return `<div class="picking-progress-cell is-muted"><strong>${formatNumber(row.pickingRows)}</strong><span>历史不足</span></div>`;
  }

  const expectedMinutes = (quantity / history.value) * 60;
  if (!Number.isFinite(expectedMinutes) || expectedMinutes <= 0) {
    return `<div class="picking-progress-cell is-muted"><strong>${formatNumber(row.pickingRows)}</strong><span>历史不足</span></div>`;
  }

  const percent = Math.max(0, Math.round((elapsedMinutes / expectedMinutes) * 100));
  const width = Math.min(100, percent);
  const level = percent > 100 ? "is-danger" : percent >= 80 ? "is-warn" : "";
  const title = `${history.source} ${formatPiecesPerHour(history.value)}，当前 ${formatNumber(quantity)} 件，预计 ${formatMinutes(Math.round(expectedMinutes * 10) / 10)}，已用 ${formatMinutes(elapsedMinutes)}`;
  return `
    <div class="picking-progress-cell ${level}">
      <strong>${formatNumber(row.pickingRows)}</strong>
      <div class="picking-progress-bar" title="${escapeHtml(title)}">
        <span style="width: ${width}%"></span>
      </div>
      <em>${formatNumber(percent)}%</em>
    </div>
  `;
}

function formatZoneCodes(row) {
  const zones = Array.isArray(row.pickingZoneCodes) ? row.pickingZoneCodes : row.pickingZones;
  if (Array.isArray(zones) && zones.length) return zones.join(", ");
  if (row.zoneCode) return row.zoneCode;
  return "-";
}

function releaseReminderBadge(reminder) {
  if (!reminder) return `<span class="release-reminder-empty">-</span>`;
  const cls = reminder.assignedRows === 0 ? "is-danger" : "is-warn";
  const text = reminder.assignedRows === 0 ? "放单" : "备单";
  return `<span class="release-reminder-badge ${cls}" title="${escapeHtml(reminder.status)}">${text}</span>`;
}

function releaseReminderTableRowClass(row, reminderMap) {
  const reminder = reminderMap.get(row.person);
  return [
    isRosterPerson(row.person) ? "" : "roster-outsider-row",
    reminder ? "has-release-reminder" : "",
    reminder?.severity || "",
  ].filter(Boolean).join(" ");
}

function personTable(rows, emptyText, options = {}) {
  const sortedRows = options.sortMode === "multi" ? sortByMultiOrder(rows) : sortByNightRoster(rows);
  const releaseReminderMap = options.includeReleaseReminder
    ? new Map(releaseReminderRows(options.releaseReminderResult || state.lastResult || {}).map((row) => [row.person, row]))
    : new Map();
  const headers = [
    { label: "人员", value: (row) => row.person },
    { label: "总单数", value: (row) => formatNumber(row.rows) },
    { label: "已分配单", value: (row) => formatNumber(row.assignedRows) },
    options.progressResult
      ? { label: "拣选中单", value: (row) => pickingProgressCell(row, options.progressResult), html: true }
      : { label: "拣选中单", value: (row) => formatNumber(row.pickingRows) },
    { label: "已拣选单", value: (row) => formatNumber(row.completedRows) },
  ];
  if (options.includeReleaseReminder) {
    headers.unshift({ label: "提醒", value: (row) => releaseReminderBadge(releaseReminderMap.get(row.person)), html: true });
  }
  if (options.includeOrderType) {
    headers.push(
      { label: "Single Order", value: (row) => formatNumber(row.singleOrderRows) },
      { label: "Single Batch", value: (row) => formatNumber(row.singleBatchOrderRows) },
      { label: "Multi Order", value: (row) => formatNumber(row.multiOrderRows) },
    );
  }
  headers.push(
    { label: "已分配数量", value: (row) => formatNumber(row.assignedQuantity) },
    { label: "拣选中数量", value: (row) => formatNumber(row.pickingQuantity) },
    ...(options.includePickingZone ? [{ label: "拣选中库区", value: (row) => formatZoneCodes(row) }] : []),
    { label: "已拣选数量", value: (row) => formatNumber(row.completedQuantity) },
    { label: "拣选次数", value: (row) => formatNumber(row.numberOfPicks) },
    { label: "库位数", value: (row) => formatNumber(row.invLocationNum) },
    { label: "容器", value: (row) => row.containers.join(", ") || "-" },
  );
  return rowsTable(headers, sortedRows, {
    emptyText,
    rowClass: (row) => (options.includeReleaseReminder
      ? releaseReminderTableRowClass(row, releaseReminderMap)
      : (isRosterPerson(row.person) ? "" : "roster-outsider-row")),
  });
}

function efficiencyTable(rows, emptyText) {
  const sortedRows = currentShiftEfficiencyRows(rows);
  return rowsTable([
    { label: "班次", value: (row) => shiftText(row.person) },
    { label: "人员", value: (row) => row.person },
    { label: "已拣选件数", value: (row) => formatNumber(row.completedQuantity) },
    { label: "已拣选单", value: (row) => formatNumber(row.completedRows) },
    { label: "单内总工时", value: (row) => formatHours(row.efficiencyDurationHours) },
    { label: "总人效", value: (row) => formatPiecesPerHour(row.activeEfficiencyPerHour) },
    { label: "Single人效", value: (row) => formatPiecesPerHour(row.singleActiveEfficiencyPerHour) },
    { label: "Single Batch人效", value: (row) => formatPiecesPerHour(row.singleBatchActiveEfficiencyPerHour) },
    { label: "Multi人效", value: (row) => formatPiecesPerHour(row.multiActiveEfficiencyPerHour) },
    { label: "首单开始", value: (row) => row.firstStartTime || "-" },
    { label: "末单结束", value: (row) => row.lastEndTime || "-" },
    { label: "跨度工时", value: (row) => formatHours(row.spanHours) },
    { label: "跨度人效", value: (row) => formatPiecesPerHour(row.spanEfficiencyPerHour) },
    { label: "8小时人效", value: (row) => formatEightHourEfficiency(row) },
  ], sortedRows, {
    emptyText,
    compact: true,
    rowClass: (row) => (isRosterPerson(row.person) ? "" : "roster-outsider-row"),
  });
}

function lastCompletedOrderByPerson(result) {
  const latest = new Map();
  for (const row of result.orderDurations.filter((item) => item.endedAtMs != null)) {
    const current = latest.get(row.person);
    if (!current || row.endedAtMs > current.endedAtMs) latest.set(row.person, row);
  }
  return latest;
}

function assignedNotPickingTable(result) {
  const latestCompleted = lastCompletedOrderByPerson(result);
  const rows = sortByNightRoster(result.assignedOnlyPeople).map((person) => {
    const lastCompleted = latestCompleted.get(person.person);
    return {
      ...person,
      lastCompleted,
      waitMinutes: lastCompleted ? minutesBetweenMs(lastCompleted.endedAtMs, result.source.analyzedAtMs) : null,
    };
  }).sort((a, b) => {
    const aOutsider = isRosterPerson(a.person) ? 0 : 1;
    const bOutsider = isRosterPerson(b.person) ? 0 : 1;
    if (aOutsider !== bOutsider) return aOutsider - bOutsider;
    return Number(b.waitMinutes ?? -1) - Number(a.waitMinutes ?? -1)
      || a.person.localeCompare(b.person, "zh-Hans-CN");
  });

  return rowsTable([
    { label: "等待时间", value: (row) => formatWaitDuration(row.waitMinutes) },
    { label: "人员", value: (row) => row.person },
    { label: "上一单开始", value: (row) => row.lastCompleted?.startTime || "-" },
    { label: "上一单结束", value: (row) => row.lastCompleted?.endTime || "-" },
    { label: "已分配", value: (row) => formatOrderQuantity(row.assignedRows, row.assignedQuantity) },
    { label: "已拣选", value: (row) => formatOrderQuantity(row.completedRows, row.completedQuantity) },
  ], rows, {
    emptyText: "没有有分配但未在拣选的人",
    compact: true,
    rowClass: (row) => (isRosterPerson(row.person) ? "" : "roster-outsider-row"),
  });
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

function durationText(row, analyzedAtMs) {
  if (row.durationMinutes != null) return formatMinutes(row.durationMinutes);
  if (!row.startTime || row.startTime === "-") return "未开始";
  if (!row.endTime || row.endTime === "-") {
    const minutes = Math.max(0, Math.round(((Number(analyzedAtMs) - row.startedAtMs) / 60000) * 10) / 10);
    return `进行中 ${formatMinutes(minutes)}`;
  }
  return "";
}

function gapBetweenText(previous, current) {
  if (!previous || !current || current.startedAtMs == null) return "";
  if (previous.endedAtMs != null) {
    return `完成间隔 ${formatMinutes(Math.round(((current.startedAtMs - previous.endedAtMs) / 60000) * 10) / 10)}`;
  }
  if (previous.startedAtMs != null) {
    return `开始间隔 ${formatMinutes(Math.round(((current.startedAtMs - previous.startedAtMs) / 60000) * 10) / 10)}`;
  }
  return "";
}

function timelineGapRow(previous, current) {
  const gap = gapBetweenText(previous, current);
  if (!gap) return "";
  return `
    <tr class="timeline-gap-row">
      <td colspan="9">
        <div class="timeline-gap-track">
          <span class="timeline-gap-cell">${escapeHtml(gap)}</span>
        </div>
      </td>
    </tr>
  `;
}

function minutesBetweenMs(startMs, endMs) {
  if (startMs == null || endMs == null) return null;
  return Math.max(0, Math.round(((Number(endMs) - Number(startMs)) / 60000) * 10) / 10);
}

function attentionLevel(minutes) {
  if (minutes == null) return "";
  if (minutes > 12) return "is-danger";
  if (minutes >= 8) return "is-warn";
  return "";
}

function timePill(minutes) {
  return `<span class="time-pill ${attentionLevel(minutes)}">${escapeHtml(formatMinutes(minutes))}</span>`;
}

function shiftText(person) {
  return isRosterPerson(person) ? "本班次" : "其他班次";
}

function attentionRowClass(row) {
  return [
    isRosterPerson(row.person) ? "" : "roster-outsider-row",
    attentionLevel(row.minutes),
  ].filter(Boolean).join(" ");
}

function sortAttentionRows(rows) {
  return [...rows].sort((a, b) => {
    const aOutsider = isRosterPerson(a.person) ? 0 : 1;
    const bOutsider = isRosterPerson(b.person) ? 0 : 1;
    if (aOutsider !== bOutsider) return aOutsider - bOutsider;
    return Number(b.minutes ?? -1) - Number(a.minutes ?? -1)
      || a.person.localeCompare(b.person, "zh-Hans-CN")
      || String(a.order || "").localeCompare(String(b.order || ""));
  });
}

function releaseReminderRows(result) {
  const personMap = new Map((result.people || []).map((person) => [person.person, person]));
  const startedPeople = new Set((result.orderDurations || [])
    .filter((row) => row.startedAtMs != null)
    .map((row) => row.person));
  const names = state.nightRosterNames.length
    ? state.nightRosterNames
    : (result.people || []).map((person) => person.person);

  return names
    .map((name) => {
      if (!startedPeople.has(name)) return null;
      const person = personMap.get(name) || { person: name };
      const assignedRows = Number(person.assignedRows || 0);
      if (assignedRows > 1) return null;

      return {
        person: name,
        assignedRows,
        assignedQuantity: Number(person.assignedQuantity || 0),
        pickingRows: Number(person.pickingRows || 0),
        pickingQuantity: Number(person.pickingQuantity || 0),
        completedRows: Number(person.completedRows || 0),
        completedQuantity: Number(person.completedQuantity || 0),
        status: assignedRows === 0 ? "已分配 0，马上放单" : "只剩 1 单，准备放单",
        severity: assignedRows === 0 ? "is-danger" : "is-warn",
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      const ai = rosterIndex(a.person);
      const bi = rosterIndex(b.person);
      return a.assignedRows - b.assignedRows
        || Number(b.pickingRows || 0) - Number(a.pickingRows || 0)
        || (ai >= 0 && bi >= 0 ? ai - bi : 0)
        || a.person.localeCompare(b.person, "zh-Hans-CN");
    });
}

function releaseReminderRowClass(row) {
  return row.severity || "";
}

function ordersByPerson(result) {
  const rowsByPerson = new Map();
  for (const row of result.orderDurations) {
    if (!rowsByPerson.has(row.person)) rowsByPerson.set(row.person, []);
    rowsByPerson.get(row.person).push(row);
  }
  return rowsByPerson;
}

function assignedIdlePeopleRows(result) {
  const personMap = new Map(result.people.map((person) => [person.person, person]));
  const rowsByPerson = ordersByPerson(result);
  const rows = [];

  for (const [person, orders] of rowsByPerson) {
    if (state.nightRosterNames.length && !isRosterListedPerson(person)) continue;
    const summary = personMap.get(person);
    if (!summary || summary.assignedRows <= 0 || summary.pickingRows > 0) continue;

    const assignedOrders = orders
      .filter((row) => row.statusGroup === "已分配")
      .sort((a, b) => (a.createdAtMs ?? 0) - (b.createdAtMs ?? 0) || a.pickOrderNumber.localeCompare(b.pickOrderNumber));
    const completedOrders = orders
      .filter((row) => row.endedAtMs != null)
      .sort((a, b) => b.endedAtMs - a.endedAtMs || a.pickOrderNumber.localeCompare(b.pickOrderNumber));
    const lastCompleted = completedOrders[0];
    const firstAssigned = assignedOrders[0];
    const minutes = lastCompleted ? minutesBetweenMs(lastCompleted.endedAtMs, result.source.analyzedAtMs) : null;

    rows.push({
      person,
      order: firstAssigned?.pickOrderNumber || "-",
      assignedRows: summary.assignedRows,
      assignedQuantity: summary.assignedQuantity,
      lastCompletedOrder: lastCompleted?.pickOrderNumber || "-",
      lastStartedTime: lastCompleted?.startTime || "-",
      lastCompletedTime: lastCompleted?.endTime || "-",
      minutes,
      status: lastCompleted ? "上单完成后未开始下一单" : "暂无上一单完成记录",
    });
  }

  return sortAttentionRows(rows);
}

function pickingConcurrencyRiskRows(result) {
  return sortAttentionRows((result.people || [])
    .filter((person) => {
      if (state.nightRosterNames.length && !isRosterListedPerson(person.person)) return false;
      return Number(person.pickingRows || 0) > 1;
    })
    .map((person) => ({
      person: person.person,
      pickingRows: person.pickingRows,
      pickingQuantity: person.pickingQuantity,
      assignedRows: person.assignedRows,
      completedRows: person.completedRows,
      completedQuantity: person.completedQuantity,
      minutes: Number(person.pickingRows || 0),
      status: "拣选中单大于 1",
    })));
}

function focusAttentionSections(result) {
  const releaseRows = releaseReminderRows(result);
  const waitingRows = assignedIdlePeopleRows(result);
  const concurrencyRows = pickingConcurrencyRiskRows(result);

  return `
    <section class="analysis-section attention-section">
        <div class="section-title">
          <h3>当前空档风险</h3>
          <span>需放单 ${formatNumber(releaseRows.length)} 人 / 空档 ${formatNumber(waitingRows.length)} 人 / 拣选中异常 ${formatNumber(concurrencyRows.length)} 人</span>
        </div>
        ${releaseRows.length ? `
          <div class="risk-subtitle">需放单提醒</div>
          ${rowsTable([
            { label: "班次", value: (row) => shiftText(row.person) },
            { label: "人员", value: (row) => row.person },
            { label: "已分配单", value: (row) => formatNumber(row.assignedRows) },
            { label: "已分配数量", value: (row) => formatNumber(row.assignedQuantity) },
            { label: "拣选中单", value: (row) => formatNumber(row.pickingRows) },
            { label: "拣选中数量", value: (row) => formatNumber(row.pickingQuantity) },
            { label: "已拣选单", value: (row) => formatNumber(row.completedRows) },
            { label: "已拣选数量", value: (row) => formatNumber(row.completedQuantity) },
            { label: "状态", value: (row) => row.status },
          ], releaseRows, {
            compact: true,
            rowClass: releaseReminderRowClass,
          })}
        ` : ""}
        ${concurrencyRows.length ? `
          <div class="risk-subtitle">拣选中异常</div>
          ${rowsTable([
            { label: "班次", value: (row) => shiftText(row.person) },
            { label: "人员", value: (row) => row.person },
            { label: "拣选中单", value: (row) => formatNumber(row.pickingRows) },
            { label: "拣选中数量", value: (row) => formatNumber(row.pickingQuantity) },
            { label: "已分配单", value: (row) => formatNumber(row.assignedRows) },
            { label: "已拣选单", value: (row) => formatNumber(row.completedRows) },
            { label: "已拣选数量", value: (row) => formatNumber(row.completedQuantity) },
            { label: "状态", value: (row) => row.status },
          ], concurrencyRows, {
            compact: true,
            rowClass: () => "is-danger",
          })}
        ` : ""}
        <div class="risk-subtitle">已分配但未在拣选</div>
        ${rowsTable([
          { label: "班次", value: (row) => shiftText(row.person) },
          { label: "人员", value: (row) => row.person },
          { label: "已分配单", value: (row) => formatNumber(row.assignedRows) },
          { label: "已分配数量", value: (row) => formatNumber(row.assignedQuantity) },
          { label: "上一单开始", value: (row) => row.lastStartedTime },
          { label: "上单完成", value: (row) => row.lastCompletedTime },
          { label: "人空档", value: (row) => timePill(row.minutes), html: true },
          { label: "状态", value: (row) => row.status },
        ], waitingRows, {
          compact: true,
          emptyText: "没有有分配但未在拣选的人",
          rowClass: attentionRowClass,
        })}
    </section>
  `;
}

function personTimelineSections(result) {
  if (!result.orderDurations.length) return `<div class="empty-state">没有单据数据</div>`;
  const rowsByPerson = new Map();
  for (const row of result.orderDurations) {
    if (!rowsByPerson.has(row.person)) rowsByPerson.set(row.person, []);
    rowsByPerson.get(row.person).push(row);
  }

  return sortByNightRoster(result.people).map((person) => {
    const rows = (rowsByPerson.get(person.person) || [])
      .sort(timelineOrderSort);
    if (!rows.length) return "";

    return `
      <div class="timeline-person ${isRosterPerson(person.person) ? "" : "roster-outsider-card"}">
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
            <colgroup>
              <col class="timeline-col-seq">
              <col class="timeline-col-order">
              <col class="timeline-col-zone">
              <col class="timeline-col-status">
              <col class="timeline-col-qty">
              <col class="timeline-col-start">
              <col class="timeline-col-end">
              <col class="timeline-col-duration">
              <col class="timeline-col-gap">
            </colgroup>
            <thead>
              <tr>
                <th>序</th>
                <th>单号</th>
                <th>库区</th>
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
                  <td>${escapeHtml(row.zoneCode || "-")}</td>
                  <td>${statusBadge(row.statusGroup)}</td>
                  <td>${formatNumber(row.quantityOfPick)}</td>
                  <td>${escapeHtml(row.startTime && row.startTime !== "-" ? row.startTime : "未开始")}</td>
                  <td>${escapeHtml(row.endTime && row.endTime !== "-" ? row.endTime : "未完成")}</td>
                  <td>${escapeHtml(durationText(row, result.source.analyzedAtMs))}</td>
                  <td class="timeline-gap-placeholder"></td>
                </tr>
                ${timelineGapRow(row, rows[index + 1])}
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }).join("");
}

function renderAnalysis(result) {
  setOutboundAnalysisMode("picking", { restore: false });
  state.lastResult = result;
  renderAnalysisMetrics(result);
  el.previewTitle.textContent = "拣选状态分析";
  el.previewSubtitle.textContent = `${result.source.filePath} / ${result.source.rows} 条 / ${result.source.createdMin || "-"} 至 ${result.source.createdMax || "-"}`;
  if (el.previewTableWrap) el.previewTableWrap.hidden = true;
  if (el.resultArea) el.resultArea.hidden = true;
  if (el.refreshPreview) el.refreshPreview.hidden = true;

  el.analysisContent.innerHTML = `
    ${focusAttentionSections(result)}

	    <section class="analysis-section">
	      <div class="section-title">
	        <h3>每个人人效</h3>
	        <span>单内工时 / 首单到末单 / 8小时，结果都是件/小时</span>
	      </div>
	      ${efficiencyTable(result.people, "没有可计算人效的已拣选数据")}
	    </section>

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
        ${personTable(result.pickingPeople, "没有拣选中的人", { progressResult: result, includePickingZone: true })}
      </div>

      <div class="analysis-section">
        <div class="section-title">
          <h3>已分配但未在拣选的人</h3>
          <span>${formatNumber(result.assignedOnlyPeople.length)} 人</span>
        </div>
        ${assignedNotPickingTable(result)}
      </div>
    </section>

    <section class="analysis-section">
      <div class="section-title">
        <h3>每个人状态汇总</h3>
        <span>已分配/拣选中/已拣选按开始和完成时间判断</span>
      </div>
      ${personTable(result.people, "没有人员数据", { includeReleaseReminder: true, releaseReminderResult: result, includeOrderType: true, sortMode: "multi" })}
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

function renderExportResult(data) {
  if (!data?.fileItem) return;
  el.resultArea.hidden = false;
  el.resultText.textContent = `${data.scope === "current" ? "本班次" : "全部"}Excel 导出完成`;
  el.fileList.innerHTML = `
    <li>
      <div class="file-card">
        <div>
          <strong>${escapeHtml(data.fileItem.name)}</strong>
          <span>${escapeHtml(data.fileItem.path)}</span>
        </div>
        <div class="file-actions">
          <a href="${escapeHtml(withLicenseSession(data.fileItem.downloadUrl))}">下载</a>
        </div>
      </div>
    </li>
  `;
}

function clearClientCacheState() {
  state.analysisPath = "";
  state.rawWmsFileItem = null;
  state.lastResult = null;
  state.quantityTrendScope = "";
  state.quantityTrendType = "total";
  state.inventoryBarcodeItems = [];
  state.lastLocationQueryLocation = "";
  state.inventoryHighlightLocation = "";
  state.currentInventorySku = "";
  state.currentInventoryRows = [];
  state.activeInventoryQuantityContext = null;
  state.inboundRawFileItem = null;
  state.exceptionRecords = [];
  closeInventoryQuantityActions();
  clearInventoryActionFlow();
  closeExceptionDetailModal();
  closeQrPreview();

  if (el.previewTitle) el.previewTitle.textContent = "待导出窗口";
  if (el.previewSubtitle) el.previewSubtitle.textContent = "缓存已清除，等待重新拉取";
  if (el.previewTableWrap) el.previewTableWrap.hidden = true;
  if (el.refreshPreview) el.refreshPreview.hidden = true;
  if (el.resultArea) el.resultArea.hidden = false;
  if (el.resultText) el.resultText.textContent = "缓存已清除，总表已保留";
  if (el.fileList) el.fileList.innerHTML = "";
  if (el.inboundResultText) el.inboundResultText.textContent = "尚未拉取";
  renderInboundRawWorkbookAnalysis(null);
  if (el.inboundFileList) el.inboundFileList.innerHTML = "";
  if (el.analysisContent) el.analysisContent.innerHTML = `<div class="empty-state">缓存已清除</div>`;
  if (el.exceptionResult) {
    el.exceptionResult.hidden = true;
    el.exceptionResult.classList.remove("is-error-text");
    el.exceptionResult.innerHTML = "";
  }
  updateActionAvailability();
}

async function clearDashboardCache() {
  if (!isAdminRole()) return;
  const originalText = el.clearCacheButton?.textContent || "清除缓存";
  setBusy(true);
  try {
    await api("/api/cache/clear", { ok: true });
    clearClientCacheState();
    setStatus("缓存已清除，总表已保留");
    if (el.clearCacheButton) {
      el.clearCacheButton.textContent = "已清除";
      setTimeout(() => {
        if (el.clearCacheButton) el.clearCacheButton.textContent = originalText;
      }, 1200);
    }
  } catch (error) {
    setStatus(error.message || "清除缓存失败", true);
  } finally {
    setBusy(false);
  }
}

function downloadExcelFile(fileItem) {
  if (!fileItem?.downloadUrl) return;
  const link = document.createElement("a");
  link.href = withLicenseSession(fileItem.downloadUrl);
  link.download = fileItem.name || "拣选分析.xlsx";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll("\"", "\"\"")}"`;
}

function formatLocalDateTime(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function downloadTextFile(filename, content, mimeType = "text/csv;charset=utf-8") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function downloadHtmlExcelFile(filename, title, columns, rows) {
  const safeTitle = escapeHtml(title);
  const headerCells = columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("");
  const bodyRows = rows.map((row) => `
    <tr>
      ${columns.map((column) => `<td>${escapeHtml(column.value(row))}</td>`).join("")}
    </tr>
  `).join("");
  const colgroup = columns.map((_, index) => `<col style="width:${index === 0 ? 220 : 150}px">`).join("");
  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    table { border-collapse: collapse; font-family: "Microsoft YaHei", Arial, sans-serif; font-size: 14pt; }
    th, td { border: 1px solid #b7c6d6; padding: 4px 8px; mso-number-format: "\\@"; white-space: nowrap; }
    th { background: #eef3f6; font-weight: 700; text-align: left; }
    .sheet-title { border: 1px solid #b7c6d6; background: #fff; font-size: 22pt; font-weight: 800; text-align: left; }
  </style>
</head>
<body>
  <table>
    <colgroup>${colgroup}</colgroup>
    <tr><td class="sheet-title" colspan="${columns.length}">${safeTitle}</td></tr>
    <tr>${headerCells}</tr>
    ${bodyRows}
  </table>
</body>
</html>`;
  downloadTextFile(filename, html, "application/vnd.ms-excel;charset=utf-8");
}

function flashExceptionExportButton(text) {
  if (!el.exceptionExportButton) return;
  const original = el.exceptionExportButton.textContent;
  el.exceptionExportButton.textContent = text;
  clearTimeout(el.exceptionExportButton._flashTimer);
  el.exceptionExportButton._flashTimer = setTimeout(() => {
    el.exceptionExportButton.textContent = original;
  }, 1200);
}

async function saveExceptionRecord(record) {
  state.exceptionRecords.push(record);
  try {
    await api("/api/exception/record", { record });
  } catch (error) {
    flashExceptionExportButton("写入失败");
  }
}

async function exportExceptionRecords() {
  try {
    const data = await api("/api/exception/master");
    downloadExcelFile(data.fileItem);
    flashExceptionExportButton("已导出");
  } catch (error) {
    flashExceptionExportButton("导出失败");
  }
}

function parseClockMinutes(value, fallback) {
  const match = String(value || "").trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return fallback;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (!Number.isInteger(hours) || !Number.isInteger(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return fallback;
  return hours * 60 + minutes;
}

function localDateAtMinutes(baseDate, minutes) {
  const date = new Date(baseDate);
  date.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);
  return date;
}

function localDateAddDays(baseDate, days) {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + days);
  return date;
}

function formatDateYmd(date) {
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseYmdDate(value) {
  const match = String(value || "").trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return Number.isNaN(date.getTime()) ? null : date;
}

function recurringShiftWindow(startMinutes, endMinutes, now = new Date()) {
  const intervals = [-2, -1, 0].map((offset) => {
    const base = localDateAddDays(now, offset);
    const start = localDateAtMinutes(base, startMinutes);
    const endBase = endMinutes <= startMinutes ? localDateAddDays(base, 1) : base;
    const end = localDateAtMinutes(endBase, endMinutes);
    return { start, end };
  });
  const active = intervals.find((item) => now >= item.start && now < item.end);
  if (active) return { ...active, end: now, active: true };
  const completed = intervals
    .filter((item) => item.end <= now)
    .sort((a, b) => b.end - a.end)[0];
  return completed ? { ...completed, active: false } : { start: intervals[0].start, end: now, active: true };
}

function fixedExceptionShiftWindow(dateText, mode, startMinutes, endMinutes) {
  const base = parseYmdDate(dateText);
  if (!base) return null;
  const start = localDateAtMinutes(base, startMinutes);
  const endBase = endMinutes <= startMinutes ? localDateAddDays(base, 1) : base;
  const end = localDateAtMinutes(endBase, endMinutes);
  return {
    start,
    end,
    active: false,
    mode,
    label: mode === "night" ? "夜班" : "白班",
  };
}

function currentExceptionShiftWindow(now = new Date()) {
  const settings = state.exceptionShiftSettings || {};
  const mode = state.exceptionShiftMode === "day" ? "day" : "night";
  const startMinutes = parseClockMinutes(
    mode === "night" ? settings.nightStartTime : settings.dayStartTime,
    mode === "night" ? 17 * 60 + 30 : 4 * 60,
  );
  const endMinutes = parseClockMinutes(
    mode === "night" ? settings.nightEndTime : settings.dayEndTime,
    mode === "night" ? 4 * 60 : 17 * 60 + 30,
  );
  const selectedWindow = fixedExceptionShiftWindow(state.exceptionShiftDate, mode, startMinutes, endMinutes);
  if (selectedWindow) return selectedWindow;
  const window = recurringShiftWindow(startMinutes, endMinutes, now);
  return {
    ...window,
    mode,
    label: mode === "night" ? "夜班" : "白班",
  };
}

function defaultExceptionShiftDate() {
  const settings = state.exceptionShiftSettings || {};
  const mode = state.exceptionShiftMode === "day" ? "day" : "night";
  const startMinutes = parseClockMinutes(
    mode === "night" ? settings.nightStartTime : settings.dayStartTime,
    mode === "night" ? 17 * 60 + 30 : 4 * 60,
  );
  const endMinutes = parseClockMinutes(
    mode === "night" ? settings.nightEndTime : settings.dayEndTime,
    mode === "night" ? 4 * 60 : 17 * 60 + 30,
  );
  const window = recurringShiftWindow(startMinutes, endMinutes);
  return formatDateYmd(window.start);
}

function syncExceptionShiftControls() {
  if (!state.exceptionShiftDate) state.exceptionShiftDate = defaultExceptionShiftDate();
  if (el.exceptionShiftDate) el.exceptionShiftDate.value = state.exceptionShiftDate;
  el.exceptionShiftButtons?.forEach((button) => {
    const active = button.dataset.exceptionShiftMode === state.exceptionShiftMode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function normalizeExceptionShiftSettings(settings) {
  return {
    ...DEFAULT_EXCEPTION_SHIFT_SETTINGS,
    ...(settings || {}),
  };
}

function loadExceptionShiftSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(EXCEPTION_SHIFT_SETTINGS_STORAGE_KEY) || "{}");
    state.exceptionShiftSettings = normalizeExceptionShiftSettings(saved);
  } catch (error) {
    state.exceptionShiftSettings = normalizeExceptionShiftSettings(state.exceptionShiftSettings);
  }
}

function saveExceptionShiftSettings(settings) {
  state.exceptionShiftSettings = normalizeExceptionShiftSettings(settings);
  localStorage.setItem(EXCEPTION_SHIFT_SETTINGS_STORAGE_KEY, JSON.stringify(state.exceptionShiftSettings));
}

function syncExceptionShiftSettingsInputs() {
  const settings = normalizeExceptionShiftSettings(state.exceptionShiftSettings);
  if (el.exceptionDayStartTime) el.exceptionDayStartTime.value = settings.dayStartTime;
  if (el.exceptionDayEndTime) el.exceptionDayEndTime.value = settings.dayEndTime;
  if (el.exceptionNightStartTime) el.exceptionNightStartTime.value = settings.nightStartTime;
  if (el.exceptionNightEndTime) el.exceptionNightEndTime.value = settings.nightEndTime;
}

function openExceptionShiftSettings() {
  syncExceptionShiftSettingsInputs();
  if (el.exceptionShiftSettingsModal) el.exceptionShiftSettingsModal.hidden = false;
}

function closeExceptionShiftSettings() {
  if (el.exceptionShiftSettingsModal) el.exceptionShiftSettingsModal.hidden = true;
}

function confirmExceptionShiftSettings() {
  saveExceptionShiftSettings({
    dayStartTime: el.exceptionDayStartTime?.value || DEFAULT_EXCEPTION_SHIFT_SETTINGS.dayStartTime,
    dayEndTime: el.exceptionDayEndTime?.value || DEFAULT_EXCEPTION_SHIFT_SETTINGS.dayEndTime,
    nightStartTime: el.exceptionNightStartTime?.value || DEFAULT_EXCEPTION_SHIFT_SETTINGS.nightStartTime,
    nightEndTime: el.exceptionNightEndTime?.value || DEFAULT_EXCEPTION_SHIFT_SETTINGS.nightEndTime,
  });
  closeExceptionShiftSettings();
  syncExceptionShiftControls();
  refreshActiveExceptionDetail();
}

function refreshActiveExceptionDetail() {
  if (!state.activeExceptionDetailType) return;
  showExceptionActionDetails(state.activeExceptionDetailType);
}

function setExceptionDetailModal(type, window, records) {
  const columns = exceptionDetailColumns(type);
  const windowText = exceptionWindowText(window);
  state.activeExceptionDetailType = type;
  state.activeExceptionDetailRows = records;
  state.activeExceptionDetailColumns = columns;
  state.activeExceptionDetailWindowText = windowText;
  if (el.exceptionDetailTitle) el.exceptionDetailTitle.textContent = `${type}明细`;
  if (el.exceptionDetailMeta) el.exceptionDetailMeta.textContent = `${windowText} / ${formatNumber(records.length)} 条`;
  if (el.exceptionDetailContent) {
    el.exceptionDetailContent.innerHTML = `
      <div class="exception-detail-table">
        ${rowsTable(columns, records, { compact: true, emptyText: `没有${type}记录` })}
      </div>
    `;
  }
  if (el.exceptionDetailModal) el.exceptionDetailModal.hidden = false;
}

function closeExceptionDetailModal() {
  if (el.exceptionDetailModal) el.exceptionDetailModal.hidden = true;
  state.activeExceptionDetailType = "";
  state.activeExceptionDetailRows = [];
  state.activeExceptionDetailColumns = [];
  state.activeExceptionDetailWindowText = "";
}

function flashExceptionDetailExportButton(text) {
  if (!el.exceptionDetailExport) return;
  const original = el.exceptionDetailExport.textContent;
  el.exceptionDetailExport.textContent = text;
  clearTimeout(el.exceptionDetailExport._flashTimer);
  el.exceptionDetailExport._flashTimer = setTimeout(() => {
    el.exceptionDetailExport.textContent = original;
  }, 1200);
}

function exportCurrentExceptionDetail() {
  const type = state.activeExceptionDetailType;
  const rows = state.activeExceptionDetailRows || [];
  const columns = state.activeExceptionDetailColumns || [];
  if (!type || !columns.length) {
    flashExceptionDetailExportButton("无明细");
    return;
  }
  const shiftName = state.exceptionShiftMode === "day" ? "白班" : "夜班";
  const dateText = state.exceptionShiftDate || formatDateYmd(new Date());
  downloadHtmlExcelFile(`${type}明细_${shiftName}_${dateText}.xls`, `${type}明细`, columns, rows);
  flashExceptionDetailExportButton("已导出");
}

function parseExceptionCreatedAt(value) {
  const text = String(value || "").trim();
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?/);
  if (match) {
    const [, year, month, day, hour, minute, second = "0"] = match;
    const date = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
    return Number.isNaN(date.getTime()) ? null : date;
  }
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? null : date;
}

function exceptionWindowText(window) {
  return `${window.label} ${formatLocalDateTime(window.start)} - ${formatLocalDateTime(window.end)}`;
}

function exceptionActionType(buttonOrType) {
  const text = typeof buttonOrType === "string" ? buttonOrType : String(buttonOrType?.textContent || "").trim();
  if (text === "异位拣选") return "异位拣选";
  if (text === "拣选无货") return "拣选无货";
  if (text === "属性变更") return "属性变更";
  return "";
}

function exceptionRecordMatchesType(record, type) {
  const recordType = String(record?.type || "").trim();
  if (type === "拣选无货") return recordType === "拣选无货" || recordType === "面单无货";
  return recordType === type;
}

function exceptionDetailColumns(type) {
  const columns = {
    "异位拣选": [
      ["sku", "SKU"],
      ["ownerName", "货主名称"],
      ["displacedPickLocation", "异位拣选库位"],
      ["displacedPickQuantity", "异位拣选数量"],
      ["originalPickLocation", "原始拣选库位"],
      ["originalPickShortageQuantity", "原始拣选库位缺货数量"],
      ["originalPickAvailableQty", "原始拣选库位可用库存"],
      ["reduceLocation", "需要调减库位"],
      ["reduceQuantity", "需要调减数量"],
      ["createdAt", "创建时间"],
    ],
    "拣选无货": [
      ["sku", "SKU"],
      ["originalPickLocation", "原始拣选库位"],
      ["originalPickShortageQuantity", "原始拣选库位缺货数量"],
      ["originalPickAvailableQty", "原始拣选库位可用库存"],
      ["reduceLocation", "需要调减库位"],
      ["reduceQuantity", "需要调减数量"],
      ["createdAt", "创建时间"],
    ],
    "属性变更": [
      ["sku", "SKU"],
      ["ownerName", "货主名称"],
      ["damageLocation", "转残库位"],
      ["damageQuantity", "转残数量"],
      ["createdAt", "创建时间"],
    ],
  };
  return (columns[type] || []).map(([key, label]) => {
    const copyableDetailCell = (type === "异位拣选" || type === "属性变更")
      && (key === "sku" || key === "ownerName" || key.toLowerCase().includes("location"));
    return {
      key,
      label,
      value: (row) => exceptionDetailCellValue(row, key),
      cellHtml: copyableDetailCell
        ? (row) => exceptionDetailCopyCell(exceptionDetailCellValue(row, key), label)
        : null,
    };
  });
}

async function showExceptionActionDetails(actionButton) {
  const type = exceptionActionType(actionButton);
  if (!type) return;
  const window = currentExceptionShiftWindow();
  try {
    const data = await api("/api/exception/records");
    const records = (Array.isArray(data.records) ? data.records : [])
      .filter((record) => exceptionRecordMatchesType(record, type))
      .filter((record) => {
        const createdAt = parseExceptionCreatedAt(record.createdAt);
        return createdAt && createdAt >= window.start && createdAt <= window.end;
      });
    setExceptionDetailModal(type, window, records);
  } catch (error) {
    state.activeExceptionDetailType = type;
    state.activeExceptionDetailRows = [];
    state.activeExceptionDetailColumns = exceptionDetailColumns(type);
    state.activeExceptionDetailWindowText = exceptionWindowText(window);
    if (el.exceptionDetailTitle) el.exceptionDetailTitle.textContent = `${type}明细`;
    if (el.exceptionDetailMeta) el.exceptionDetailMeta.textContent = state.activeExceptionDetailWindowText;
    if (el.exceptionDetailContent) el.exceptionDetailContent.innerHTML = `<div class="empty-state is-error-text">${escapeHtml(cleanErrorMessage(error.message, "读取明细失败"))}</div>`;
    if (el.exceptionDetailModal) el.exceptionDetailModal.hidden = false;
  }
}

function stringifyCell(value) {
  if (value == null || value === "") return "-";
  if (typeof value === "object") return JSON.stringify(value);
  return value;
}

function exceptionDetailOwnerName(row) {
  const saved = stringifyCell(row?.ownerName);
  if (saved !== "-") return saved;
  const rowSku = String(row?.sku || "").trim();
  const currentSku = String(state.currentInventorySku || "").trim();
  if (rowSku && currentSku && rowSku === currentSku) {
    const ownerName = currentInventoryOwnerName();
    if (ownerName) return ownerName;
  }
  return "-";
}

function exceptionDetailCellValue(row, key) {
  if (key === "ownerName") return exceptionDetailOwnerName(row);
  return stringifyCell(row?.[key]);
}

function exceptionDetailCopyCell(value, label) {
  const text = stringifyCell(value);
  const copyText = value == null || value === "" || text === "-" ? "" : text;
  return `
    <div class="exception-detail-copy-cell">
      <span>${escapeHtml(text)}</span>
      ${copyButtonHtml(copyText, `复制${label} ${text}`)}
    </div>
  `;
}

function currentInventoryOwnerName() {
  return firstInventoryValue(state.currentInventoryRows || [], ["owner_name", "ownerName", "cargo_owner_name", "cargoOwnerName"]);
}

function pickInventoryValue(row, keys) {
  for (const key of keys) {
    if (row?.[key] != null && row[key] !== "") return stringifyCell(row[key]);
  }
  const normalized = Object.fromEntries(Object.entries(row || {}).map(([key, value]) => [key.toLowerCase().replaceAll("_", ""), value]));
  for (const key of keys) {
    const value = normalized[key.toLowerCase().replaceAll("_", "")];
    if (value != null && value !== "") return stringifyCell(value);
  }
  return "-";
}

function pickInventoryValueByPattern(row, pattern) {
  for (const [key, value] of Object.entries(row || {})) {
    if (pattern.test(key) && value != null && value !== "") return stringifyCell(value);
  }
  return "-";
}

function inventoryLocationText(row) {
  const value = pickInventoryValue(row, [
    "location_code",
    "locationCode",
    "location",
    "location_name",
    "locationName",
    "location_no",
    "locationNo",
    "inventory_location",
    "inventoryLocation",
    "inventory_location_code",
    "inventoryLocationCode",
    "warehouse_location_code",
    "warehouseLocationCode",
    "warehouse_location",
    "warehouseLocation",
    "storage_location",
    "storageLocation",
    "bin_code",
    "binCode",
    "bin",
  ]);
  return value !== "-" ? value : pickInventoryValueByPattern(row, /location|库位|bin/i);
}

function inventoryRowClass(row) {
  const target = String(state.inventoryHighlightLocation || "").trim().toUpperCase();
  if (!target) return "";
  const location = String(inventoryLocationText(row) || "").trim().toUpperCase();
  return location === target ? "inventory-highlight-row" : "";
}

function firstInventoryValue(rows, keys) {
  for (const row of rows) {
    const value = pickInventoryValue(row, keys);
    if (value && value !== "-") return value;
  }
  return "";
}

function locationInventoryQueryButtonHtml(value) {
  const text = String(value || "").trim();
  if (!text || text === "-") return escapeHtml(text || "");
  return `<button class="location-item-code-button" type="button" data-item-code="${escapeHtml(text)}" aria-label="用 ${escapeHtml(text)} 查询库存">${escapeHtml(text)}</button>`;
}

function locationInventoryBarcodeHtml(value) {
  const parts = String(value || "").split(",").map((part) => part.trim()).filter(Boolean);
  if (!parts.length) return "";
  return parts.map((part) => locationInventoryQueryButtonHtml(part)).join(`<span class="barcode-separator">,</span>`);
}

function waybillInventoryQueryButtonHtml(value, quantity = "") {
  const text = String(value || "").trim();
  if (!text || text === "-") return escapeHtml(text || "");
  const qty = String(quantity || "").trim();
  return `<button class="waybill-item-query-button" type="button" data-item-code="${escapeHtml(text)}" data-waybill-quantity="${escapeHtml(qty)}" aria-label="用 ${escapeHtml(text)} 查询库存">${escapeHtml(text)}</button>`;
}

function waybillBarcodeHtml(value, quantity = "") {
  const parts = String(value || "").split(",").map((part) => part.trim()).filter(Boolean);
  if (!parts.length) return "";
  return parts.map((part) => waybillInventoryQueryButtonHtml(part, quantity)).join(`<span class="barcode-separator">,</span>`);
}

function inventoryQuantityActionHtml(value, kind, row) {
  const text = String(value ?? "").trim();
  if (!text || text === "-") return escapeHtml(text || "");
  const numeric = Number(text.replaceAll(",", ""));
  if (!Number.isFinite(numeric) || numeric <= 0) return escapeHtml(text);
  const location = inventoryLocationText(row);
  return `
    <button class="inventory-quantity-action-button" type="button" data-quantity-kind="${escapeHtml(kind)}" data-quantity-value="${escapeHtml(text)}" data-location="${escapeHtml(location)}" aria-label="处理${escapeHtml(kind === "available" ? "可用库存" : "占用库存")} ${escapeHtml(text)}">
      ${escapeHtml(text)}
    </button>
  `;
}

function inventoryLocationPrintButtonHtml(location, itemCode = "", quantity = "") {
  const text = String(location || "").trim();
  if (!text || text === "-") return "";
  const code = String(itemCode || "").trim();
  const qty = String(quantity || "").trim();
  const baseAttrs = `data-location="${escapeHtml(text)}" data-item-code="${escapeHtml(code)}" data-print-quantity="${escapeHtml(qty)}"`;
  return `
    <span class="inventory-location-print-actions">
      <button class="inventory-location-print-button" type="button" data-print-mode="location" ${baseAttrs} aria-label="打印库位 ${escapeHtml(text)}">打印库位</button>
      <button class="inventory-location-print-button" type="button" data-print-mode="sku" ${baseAttrs} aria-label="打印SKU ${escapeHtml(code)}">打印SKU</button>
      <button class="inventory-location-print-button" type="button" data-print-mode="all" ${baseAttrs} aria-label="打印库位和SKU ${escapeHtml(text)} ${escapeHtml(code)}">打印全部</button>
    </span>
  `;
}

function inventoryColumns(rows, options = {}) {
  const showLocationPrint = Boolean(options.showLocationPrint);
  const printQuantity = String(options.printQuantity || "").trim();
  return [
    { label: "库位", html: true, value: (row) => {
      const location = inventoryLocationText(row);
      if (location === "-") return "-";
      const itemCode = pickInventoryValue(row, ["item_code", "itemCode", "goods_code", "goodsCode"]);
      return `
        <span class="inventory-location-cell ${showLocationPrint ? "has-print" : ""}">
          <button class="inventory-location-qr-button" type="button" data-qr-src="${escapeHtml(withLicenseSession(`/api/qr?code=${encodeURIComponent(location)}`))}" data-qr-code="${escapeHtml(location)}" aria-label="放大库位二维码 ${escapeHtml(location)}">${escapeHtml(location)}</button>
          ${copyButtonHtml(location, `复制库位 ${location}`)}
          ${showLocationPrint ? inventoryLocationPrintButtonHtml(location, itemCode, printQuantity) : ""}
        </span>
      `;
    } },
    { label: "可用库存", html: true, value: (row) => inventoryQuantityActionHtml(pickInventoryValue(row, ["available_qty", "availableQty", "available_quantity", "availableQuantity", "available_num", "availableNum"]), "available", row) },
    { label: "占用库存", html: true, value: (row) => inventoryQuantityActionHtml(pickInventoryValue(row, ["occupied_qty", "occupiedQty", "occupy_qty", "occupyQty", "occupied_quantity", "occupiedQuantity"]), "occupied", row) },
  ];
}

function locationInventoryColumns() {
  return [
    { label: "货品编码", html: true, value: (row) => {
      const code = pickInventoryValue(row, ["item_code", "itemCode", "goods_code", "goodsCode"]);
      return locationInventoryQueryButtonHtml(code);
    } },
    { label: "货品条码", html: true, value: (row) => locationInventoryBarcodeHtml(pickInventoryValue(row, ["barcode", "bar_code", "barCode", "goods_barcode", "goodsBarcode"])) },
    { label: "可用库存", value: (row) => pickInventoryValue(row, ["available_qty", "availableQty", "available_quantity", "availableQuantity"]) },
    { label: "占用库存", value: (row) => pickInventoryValue(row, ["occupied_qty", "occupiedQty", "occupy_qty", "occupyQty", "occupied_quantity", "occupiedQuantity"]) },
  ];
}

function pickWaybillValue(row, keys) {
  return pickInventoryValue(row, keys);
}

function formatWaybillInventoryType(row) {
  const label = pickWaybillValue(row, ["inventory_type_name", "inventoryTypeName", "inventory_quality_name", "inventoryQualityName"]);
  if (label) return label;
  const value = pickWaybillValue(row, ["inventory_type", "inventoryType", "inventory_quality", "inventoryQuality"]);
  if (String(value) === "1") return "良品";
  return value;
}

function waybillColumns() {
  return [
    { label: "货品编码", html: true, value: (row) => waybillInventoryQueryButtonHtml(
      pickWaybillValue(row, ["item_code", "itemCode", "goods_code", "goodsCode", "sku", "sku_id", "skuId"]),
      pickWaybillValue(row, ["quantity", "qty", "goods_count", "goodsCount", "item_qty", "itemQty", "expect_qty", "expectQty"]),
    ) },
    { label: "货品条码", html: true, value: (row) => waybillBarcodeHtml(
      pickWaybillValue(row, ["item_bar_code", "itemBarCode", "item_barcode", "itemBarcode", "barcode", "bar_code", "barCode", "goods_barcode", "goodsBarcode", "barcodes", "barcode_list", "barcodeList"]),
      pickWaybillValue(row, ["quantity", "qty", "goods_count", "goodsCount", "item_qty", "itemQty", "expect_qty", "expectQty"]),
    ) },
    { label: "数量", value: (row) => pickWaybillValue(row, ["quantity", "qty", "goods_count", "goodsCount", "item_qty", "itemQty", "expect_qty", "expectQty"]) },
    { label: "货主名称", value: (row) => pickWaybillValue(row, ["owner_name", "ownerName", "cargo_owner_name", "cargoOwnerName", "merchant_name", "merchantName", "multi_owner_name", "multiOwnerName"]) },
  ];
}

function setExceptionResult(html, isError = false, options = {}) {
  if (!el.exceptionResult) return;
  if (!options.keepDetailSelection) state.activeExceptionDetailType = "";
  closeInventoryQuantityActions();
  state.displacedPickFlow = null;
  state.waybillOutOfStockFlow = null;
  state.attributeChangeFlow = null;
  el.exceptionResult.hidden = false;
  el.exceptionResult.classList.toggle("is-error-text", isError);
  el.exceptionResult.innerHTML = html;
  el.exceptionResult.scrollIntoView({ block: "nearest" });
  fitInventorySideText();
}

function openInventoryQuantityActions(button) {
  if (!el.exceptionFixedActions || !button) return;
  document.querySelector(".inventory-quantity-action-button.is-selected")?.classList.remove("is-selected");
  button.classList.add("is-selected");
  state.activeInventoryQuantityContext = {
    kind: button.dataset.quantityKind || "",
    value: button.dataset.quantityValue || "",
    location: button.dataset.location || "",
  };
  el.exceptionFixedActions.classList.add("is-inventory-quantity-open");
  el.exceptionFixedActions.dataset.quantityKind = button.dataset.quantityKind || "";
  el.exceptionFixedActions.dataset.quantityValue = button.dataset.quantityValue || "";
  el.exceptionFixedActions.dataset.location = button.dataset.location || "";
}

function closeInventoryQuantityActions() {
  el.exceptionFixedActions?.classList.remove("is-inventory-quantity-open");
  if (el.exceptionFixedActions) {
    delete el.exceptionFixedActions.dataset.quantityKind;
    delete el.exceptionFixedActions.dataset.quantityValue;
    delete el.exceptionFixedActions.dataset.location;
  }
  document.querySelector(".inventory-quantity-action-button.is-selected")?.classList.remove("is-selected");
}

function clearInventoryActionFlow() {
  state.displacedPickFlow = null;
  state.waybillOutOfStockFlow = null;
  state.attributeChangeFlow = null;
  el.exceptionResult?.querySelector(".inventory-action-flow-panel")?.remove();
}

function fitInventorySideText() {
  const productName = document.querySelector(".inventory-side-card-main .inventory-side-fit-text");
  if (!productName) return;
  requestAnimationFrame(() => {
    productName.style.fontSize = "";
    productName.style.lineHeight = "";
    const card = productName.closest(".inventory-side-card");
    if (!card) return;
    const cardStyles = getComputedStyle(card);
    const label = card.querySelector(".inventory-side-label");
    const gap = Number.parseFloat(cardStyles.rowGap || cardStyles.gap || "0") || 0;
    const availableHeight = card.clientHeight
      - Number.parseFloat(cardStyles.paddingTop || "0")
      - Number.parseFloat(cardStyles.paddingBottom || "0")
      - (label?.offsetHeight || 0)
      - gap;
    for (let size = 20; size >= 12; size -= 1) {
      productName.style.fontSize = `${size}px`;
      productName.style.lineHeight = size <= 14 ? "1.1" : "1.14";
      if (productName.scrollHeight <= availableHeight + 1) break;
    }
  });
}

function inventoryAvailableValue(row) {
  const raw = pickInventoryValue(row, ["available_qty", "availableQty", "available_quantity", "availableQuantity", "available_num", "availableNum"]);
  const numeric = Number(String(raw || "0").replaceAll(",", ""));
  return {
    raw: raw === "-" ? "0" : String(raw ?? "0"),
    numeric: Number.isFinite(numeric) ? numeric : 0,
  };
}

function inventoryOccupiedValue(row) {
  const raw = pickInventoryValue(row, ["occupied_qty", "occupiedQty", "occupy_qty", "occupyQty", "occupied_quantity", "occupiedQuantity"]);
  const numeric = Number(String(raw || "0").replaceAll(",", ""));
  return {
    raw: raw === "-" ? "0" : String(raw ?? "0"),
    numeric: Number.isFinite(numeric) ? numeric : 0,
  };
}

function numericInventoryValue(value) {
  const numeric = Number(String(value ?? "").replaceAll(",", ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

function currentInventoryLocationStockOptions(excludeLocation = "") {
  const excluded = String(excludeLocation || "").trim().toUpperCase();
  const byLocation = new Map();
  for (const row of state.currentInventoryRows || []) {
    const location = inventoryLocationText(row);
    if (!location || location === "-") continue;
    if (location.toUpperCase() === excluded) continue;
    const available = inventoryAvailableValue(row);
    const occupied = inventoryOccupiedValue(row);
    const previous = byLocation.get(location) || { available: 0, occupied: 0 };
    byLocation.set(location, {
      available: previous.available + available.numeric,
      occupied: previous.occupied + occupied.numeric,
    });
  }
  return Array.from(byLocation.entries()).map(([location, stock]) => ({
    location,
    available: stock.available,
    occupied: stock.occupied,
  }));
}

function currentInventoryLocationOptions(excludeLocation = "") {
  return currentInventoryLocationStockOptions(excludeLocation).map(({ location, available }) => ({ location, available }));
}

function currentInventoryLocationOption(location) {
  const target = String(location || "").trim().toUpperCase();
  if (!target) return null;
  return currentInventoryLocationOptions().find((item) => item.location.toUpperCase() === target) || null;
}

function highlightedInventoryLocation() {
  const target = String(state.inventoryHighlightLocation || "").trim().toUpperCase();
  if (!target) return "";
  const match = currentInventoryLocationOption(target);
  return match?.location || "";
}

function sortedDamageLocationOptions() {
  const options = currentInventoryLocationStockOptions();
  return [...options].sort((a, b) => (b.available - a.available) || (a.occupied - b.occupied));
}

function renderInventoryActionFlowPanel(html) {
  if (!el.exceptionResult) return;
  el.exceptionResult.querySelector(".inventory-action-flow-panel")?.remove();
  const head = el.exceptionResult.querySelector(".exception-result-head");
  if (head) {
    head.insertAdjacentHTML("afterend", html);
  } else {
    el.exceptionResult.insertAdjacentHTML("afterbegin", html);
  }
  const panel = el.exceptionResult.querySelector(".inventory-action-flow-panel");
  requestAnimationFrame(() => {
    panel?.scrollIntoView({ block: "start", behavior: "smooth" });
  });
}

function inventoryFlowHeader(title, backTarget = "") {
  return `
    <div class="inventory-flow-header">
      <div class="inventory-flow-header-actions">
        ${backTarget ? `<button class="inventory-flow-back-button" type="button" data-flow-back="${escapeHtml(backTarget)}">返回</button>` : ""}
        <button class="inventory-flow-cancel-button" type="button">取消</button>
      </div>
      <strong>${escapeHtml(title)}</strong>
      <span></span>
    </div>
  `;
}

function inventoryLocationOptionHtml(item, mode) {
  return `
    <button class="inventory-flow-location-option" type="button" data-flow-mode="${escapeHtml(mode)}" data-location="${escapeHtml(item.location)}">
      <span class="inventory-flow-location-code">${escapeHtml(item.location)}</span>
      <span class="inventory-flow-select-box" aria-hidden="true"></span>
      <span class="inventory-flow-location-stock">可用库存 ${formatNumber(item.available)}</span>
    </button>
  `;
}

function inventoryDamageLocationOptionHtml(item) {
  return `
    <button class="inventory-flow-location-option" type="button" data-flow-mode="attribute-change-location" data-location="${escapeHtml(item.location)}">
      <span class="inventory-flow-location-code">${escapeHtml(item.location)}</span>
      <span class="inventory-flow-select-box" aria-hidden="true"></span>
      <span class="inventory-flow-location-stock">可用 ${formatNumber(item.available)} / 占用 ${formatNumber(item.occupied)}</span>
    </button>
  `;
}

function renderDisplacedPickLocationStep() {
  const options = currentInventoryLocationOptions();
  renderInventoryActionFlowPanel(`
    <div class="inventory-action-flow-panel">
      ${inventoryFlowHeader("请选择异位拣选库位")}
      <div class="inventory-flow-location-list">
        ${options.length ? options.map((item) => inventoryLocationOptionHtml(item, "displaced")).join("") : `<div class="empty-state">没有可选库位</div>`}
      </div>
    </div>
  `);
}

function renderDisplacedPickOriginalStep() {
  const flow = state.displacedPickFlow;
  if (!flow?.displacedLocation) return;
  const options = currentInventoryLocationOptions(flow.displacedLocation);
  renderInventoryActionFlowPanel(`
    <div class="inventory-action-flow-panel">
      ${inventoryFlowHeader("请选择原始拣选库位", flow.skipDisplacedStep ? "" : "displaced")}
      <div class="inventory-flow-summary">异位拣选库位：<strong>${escapeHtml(flow.displacedLocation)}</strong></div>
      <div class="inventory-flow-location-list">
        ${options.length ? options.map((item) => inventoryLocationOptionHtml(item, "original")).join("") : `<div class="empty-state">没有可选原始库位</div>`}
      </div>
    </div>
  `);
}

function renderDisplacedPickQuantityStep() {
  const flow = state.displacedPickFlow;
  if (!flow?.displacedLocation || !flow?.originalLocation) return;
  const displacedAvailable = currentInventoryLocationOption(flow.displacedLocation)?.available ?? 0;
  renderInventoryActionFlowPanel(`
    <div class="inventory-action-flow-panel">
      ${inventoryFlowHeader("输入拣选数量", flow.skipOriginalStep ? "" : "original")}
      <div class="inventory-flow-summary">
        <span>异位拣选库位：<strong>${escapeHtml(flow.displacedLocation)}</strong></span>
        <span>可用库存：<strong>${formatNumber(displacedAvailable)}</strong></span>
        <span>原始拣选库位：<strong>${escapeHtml(flow.originalLocation)}</strong></span>
      </div>
      <div class="inventory-flow-error" hidden></div>
      <div class="inventory-flow-quantity-buttons">
        ${[1, 2, 3, 4, 5].map((quantity) => `<button class="inventory-flow-quantity-button" type="button" data-quantity="${quantity}">${quantity}</button>`).join("")}
      </div>
      <input class="inventory-flow-quantity-input" type="text" inputmode="numeric" autocomplete="off" placeholder="输入大于 5 的数量，回车确认">
    </div>
  `);
  el.exceptionResult?.querySelector(".inventory-flow-quantity-input")?.focus();
}

function showInventoryFlowError(message) {
  const errorBox = el.exceptionResult?.querySelector(".inventory-flow-error");
  if (!errorBox) return;
  errorBox.textContent = message;
  errorBox.hidden = false;
}

function renderWaybillOutOfStockLocationStep() {
  const options = currentInventoryLocationOptions();
  renderInventoryActionFlowPanel(`
    <div class="inventory-action-flow-panel">
      ${inventoryFlowHeader("请选择原始拣选库位")}
      <div class="inventory-flow-location-list">
        ${options.length ? options.map((item) => inventoryLocationOptionHtml(item, "waybill-out-of-stock-original")).join("") : `<div class="empty-state">没有可选库位</div>`}
      </div>
    </div>
  `);
}

function renderWaybillOutOfStockQuantityStep() {
  const flow = state.waybillOutOfStockFlow;
  if (!flow?.originalLocation) return;
  renderInventoryActionFlowPanel(`
    <div class="inventory-action-flow-panel">
      ${inventoryFlowHeader("请选择缺货数量", flow.skipLocationStep ? "" : "waybill-out-of-stock-location")}
      <div class="inventory-flow-summary">
        <span>原始拣选库位：<strong>${escapeHtml(flow.originalLocation)}</strong></span>
        <span>可用库存：<strong>${formatNumber(flow.originalAvailable)}</strong></span>
      </div>
      <div class="inventory-flow-quantity-buttons">
        ${[1, 2, 3, 4, 5].map((quantity) => `<button class="inventory-flow-quantity-button" type="button" data-quantity="${quantity}">${quantity}</button>`).join("")}
      </div>
      <input class="inventory-flow-quantity-input" type="text" inputmode="numeric" autocomplete="off" placeholder="输入大于 5 的数量，回车确认">
    </div>
  `);
  el.exceptionResult?.querySelector(".inventory-flow-quantity-input")?.focus();
}

function renderAttributeChangeQuantityStep() {
  const flow = state.attributeChangeFlow;
  if (!flow?.damageLocation) return;
  renderInventoryActionFlowPanel(`
    <div class="inventory-action-flow-panel">
      ${inventoryFlowHeader("请选择转残数量", "attribute-change-location")}
      <div class="inventory-flow-summary">
        <span>转残库位：<strong>${escapeHtml(flow.damageLocation)}</strong></span>
        <span>可用库存：<strong>${formatNumber(flow.damageAvailable)}</strong></span>
        <span>占用库存：<strong>${formatNumber(flow.damageOccupied)}</strong></span>
      </div>
      <div class="inventory-flow-quantity-buttons">
        ${[1, 2, 3, 4, 5].map((quantity) => `<button class="inventory-flow-quantity-button" type="button" data-quantity="${quantity}">${quantity}</button>`).join("")}
      </div>
      <input class="inventory-flow-quantity-input" type="text" inputmode="numeric" autocomplete="off" placeholder="输入大于 5 的数量，回车确认">
    </div>
  `);
  el.exceptionResult?.querySelector(".inventory-flow-quantity-input")?.focus();
}

function renderAttributeChangeLocationStep() {
  const options = sortedDamageLocationOptions();
  renderInventoryActionFlowPanel(`
    <div class="inventory-action-flow-panel">
      ${inventoryFlowHeader("请选择转残库位")}
      <div class="inventory-flow-location-list">
        ${options.length ? options.map((item) => inventoryDamageLocationOptionHtml(item)).join("") : `<div class="empty-state">没有可选库位</div>`}
      </div>
    </div>
  `);
}

function beginDisplacedPickFlow() {
  const sku = state.currentInventorySku || el.inventoryQueryInput?.value.trim() || "";
  if (!sku || !(state.currentInventoryRows || []).length) return;
  const clickedLocation = state.activeInventoryQuantityContext?.location || "";
  const clickedOption = currentInventoryLocationOption(clickedLocation);
  const displacedLocation = clickedOption?.location || "";
  const highlighted = highlightedInventoryLocation();
  closeInventoryQuantityActions();
  state.waybillOutOfStockFlow = null;
  state.displacedPickFlow = {
    sku,
    quantityKind: state.activeInventoryQuantityContext?.kind || "",
    clickedQuantity: state.activeInventoryQuantityContext?.value || "",
    displacedLocation,
    originalLocation: highlighted,
    skipDisplacedStep: Boolean(displacedLocation),
    skipOriginalStep: Boolean(highlighted),
  };
  if (displacedLocation && highlighted) {
    renderDisplacedPickQuantityStep();
    return;
  }
  if (displacedLocation) {
    renderDisplacedPickOriginalStep();
    return;
  }
  renderDisplacedPickLocationStep();
}

function beginWaybillOutOfStockFlow() {
  const sku = state.currentInventorySku || el.inventoryQueryInput?.value.trim() || "";
  if (!sku || !(state.currentInventoryRows || []).length) return;
  closeInventoryQuantityActions();
  state.displacedPickFlow = null;
  state.attributeChangeFlow = null;
  const highlighted = highlightedInventoryLocation();
  const highlightedOption = currentInventoryLocationOption(highlighted);
  const clickedLocation = state.activeInventoryQuantityContext?.location || "";
  const clickedOption = currentInventoryLocationOption(clickedLocation);
  const originalOption = highlightedOption || clickedOption;
  state.waybillOutOfStockFlow = {
    sku,
    originalLocation: originalOption?.location || "",
    originalAvailable: originalOption?.available ?? "",
    skipLocationStep: Boolean(originalOption?.location),
  };
  if (state.waybillOutOfStockFlow.skipLocationStep) {
    renderWaybillOutOfStockQuantityStep();
    return;
  }
  renderWaybillOutOfStockLocationStep();
}

function beginAttributeChangeFlow() {
  const sku = state.currentInventorySku || el.inventoryQueryInput?.value.trim() || "";
  if (!sku || !(state.currentInventoryRows || []).length) return;
  const quantityKind = state.activeInventoryQuantityContext?.kind || "";
  const clickedQuantity = state.activeInventoryQuantityContext?.value || "";
  closeInventoryQuantityActions();
  state.displacedPickFlow = null;
  state.waybillOutOfStockFlow = null;
  state.attributeChangeFlow = {
    sku,
    quantityKind,
    clickedQuantity,
    damageLocation: "",
    damageAvailable: "",
    damageOccupied: "",
  };
  renderAttributeChangeLocationStep();
}

function selectDisplacedPickLocation(button) {
  if (!state.displacedPickFlow) return;
  const location = String(button?.dataset.location || "").trim();
  if (!location) return;
  state.displacedPickFlow.displacedLocation = location;
  renderDisplacedPickOriginalStep();
}

function selectOriginalPickLocation(button) {
  if (!state.displacedPickFlow) return;
  const location = String(button?.dataset.location || "").trim();
  if (!location) return;
  state.displacedPickFlow.originalLocation = location;
  renderDisplacedPickQuantityStep();
}

function selectWaybillOutOfStockLocation(button) {
  if (!state.waybillOutOfStockFlow) return;
  const location = String(button?.dataset.location || "").trim();
  if (!location) return;
  const option = currentInventoryLocationOption(location);
  state.waybillOutOfStockFlow.originalLocation = option?.location || location;
  state.waybillOutOfStockFlow.originalAvailable = option?.available ?? "";
  renderWaybillOutOfStockQuantityStep();
}

function selectAttributeChangeLocation(button) {
  if (!state.attributeChangeFlow) return;
  const location = String(button?.dataset.location || "").trim();
  if (!location) return;
  const option = currentInventoryLocationStockOptions().find((item) => item.location.toUpperCase() === location.toUpperCase());
  state.attributeChangeFlow.damageLocation = option?.location || location;
  state.attributeChangeFlow.damageAvailable = option?.available ?? "";
  state.attributeChangeFlow.damageOccupied = option?.occupied ?? "";
  renderAttributeChangeQuantityStep();
}

async function completeDisplacedPick(quantity) {
  const flow = state.displacedPickFlow;
  const numeric = Number(String(quantity || "").replace(/\D/g, ""));
  if (!flow || !Number.isFinite(numeric) || numeric <= 0) return;
  const originalOption = currentInventoryLocationOption(flow.originalLocation);
  const originalAvailable = numericInventoryValue(originalOption?.available);
  const displacedOption = currentInventoryLocationOption(flow.displacedLocation);
  const displacedAvailable = numericInventoryValue(displacedOption?.available);
  if (numeric > displacedAvailable) {
    showInventoryFlowError(`拣选数量不能大于异位拣选库位可用库存 ${formatNumber(displacedAvailable)}`);
    return;
  }
  await saveExceptionRecord({
    type: "异位拣选",
    sku: flow.sku,
    ownerName: currentInventoryOwnerName(),
    displacedPickLocation: flow.displacedLocation,
    displacedPickQuantity: numeric,
    originalPickLocation: flow.originalLocation,
    originalPickShortageQuantity: numeric,
    originalPickAvailableQty: originalAvailable,
    reduceLocation: flow.displacedLocation,
    reduceQuantity: numeric,
    clickedQuantityKind: flow.quantityKind,
    clickedQuantity: flow.clickedQuantity,
    createdAt: new Date().toISOString(),
  });
  if (Number.isFinite(originalAvailable) && originalAvailable > 1) {
    await saveExceptionRecord({
      reduceLocation: flow.originalLocation,
      reduceQuantity: originalAvailable,
      createdAt: "",
    });
  }
  clearInventoryActionFlow();
}

function completeWaybillOutOfStock(quantity) {
  const flow = state.waybillOutOfStockFlow;
  const numeric = Number(String(quantity || "").replace(/\D/g, ""));
  if (!flow || !Number.isFinite(numeric) || numeric <= 0) return;
  const originalAvailable = Number(String(flow.originalAvailable ?? "").replaceAll(",", ""));
  const reduceQuantity = Number.isFinite(originalAvailable) && originalAvailable > 0 ? originalAvailable : "";
  saveExceptionRecord({
    type: "拣选无货",
    sku: flow.sku,
    originalPickLocation: flow.originalLocation,
    originalPickShortageQuantity: numeric,
    originalPickAvailableQty: flow.originalAvailable,
    reduceLocation: reduceQuantity === "" ? "" : flow.originalLocation,
    reduceQuantity,
    createdAt: new Date().toISOString(),
  });
  clearInventoryActionFlow();
}

function completeAttributeChange(quantity) {
  const flow = state.attributeChangeFlow;
  const numeric = Number(String(quantity || "").replace(/\D/g, ""));
  if (!flow || !Number.isFinite(numeric) || numeric <= 0) return;
  saveExceptionRecord({
    type: "属性变更",
    sku: flow.sku,
    ownerName: currentInventoryOwnerName(),
    damageLocation: flow.damageLocation,
    damageQuantity: numeric,
    clickedQuantityKind: flow.quantityKind,
    clickedQuantity: flow.clickedQuantity,
    createdAt: new Date().toISOString(),
  });
  clearInventoryActionFlow();
}

function completeInventoryFlowQuantity(quantity) {
  if (state.attributeChangeFlow) {
    completeAttributeChange(quantity);
    return;
  }
  if (state.waybillOutOfStockFlow) {
    completeWaybillOutOfStock(quantity);
    return;
  }
  completeDisplacedPick(quantity);
}

function handleInventoryFlowBack(button) {
  const target = button?.dataset.flowBack || "";
  if (target === "displaced") renderDisplacedPickLocationStep();
  if (target === "original") renderDisplacedPickOriginalStep();
  if (target === "waybill-out-of-stock-location") renderWaybillOutOfStockLocationStep();
  if (target === "attribute-change-location") renderAttributeChangeLocationStep();
}

function renderInventoryResult(data, inputSku = "", options = {}) {
  const rows = Array.isArray(data.rows) ? data.rows : [];
  const totalText = data.total === "" || data.total == null ? rows.length : data.total;
  const querySku = String(inputSku || data.sku || "").trim();
  const printQuantity = options.returnToWaybill && state.lastWaybillResult ? String(options.printQuantity || "").trim() : "";
  const productImage = data.product?.imageUrl || "";
  const productName = firstInventoryValue(rows, ["item_name", "itemName", "goods_name", "goodsName"]);
  const ownerName = firstInventoryValue(rows, ["owner_name", "ownerName", "cargo_owner_name", "cargoOwnerName"]);
  const barcodes = uniqueBarcodeItems(data.product?.barcodes);
  state.inventoryBarcodeItems = barcodes;
  state.currentInventorySku = querySku;
  state.currentInventoryRows = rows;
  state.currentInventoryPrintQuantity = printQuantity;
  setExceptionResult(`
    <div class="exception-result-head">
      <div class="inventory-result-title">
        ${options.returnToWaybill && state.lastWaybillResult ? `<button class="waybill-inventory-back-button secondary-action" type="button">返回</button>` : ""}
        <strong>库存查询结果</strong>
        <div class="inventory-query-copy-row">
          <span class="inventory-query-value">
            <span class="inventory-query-code">${escapeHtml(querySku || "-")}</span>
          </span>
          ${copyButtonHtml(querySku, `复制查询值 ${querySku}`)}
        </div>
      </div>
      <div class="product-image-box">
        ${productImage ? `<img src="${escapeHtml(productImage)}" alt="产品图片">` : `<span>产品图片</span>`}
      </div>
      <div class="inventory-side-info" aria-label="库存扩展信息">
        <div class="inventory-side-card inventory-side-card-main">
          <span class="inventory-side-label">货品名称</span>
          <strong class="inventory-side-fit-text" title="${escapeHtml(productName || "-")}">${escapeHtml(productName || "-")}</strong>
        </div>
        <div class="inventory-side-card inventory-side-card-sub">
          <div class="inventory-side-card-title">
            <span class="inventory-side-label">货主名称</span>
            ${copyButtonHtml(ownerName, `复制货主名称 ${ownerName}`)}
          </div>
          <strong title="${escapeHtml(ownerName || "-")}">${escapeHtml(ownerName || "-")}</strong>
        </div>
      </div>
    </div>
    ${rowsTable(inventoryColumns(rows, { showLocationPrint: true, printQuantity }), rows, { compact: true, emptyText: "没有库存数据", rowClass: inventoryRowClass })}
  `);
}

function renderLocationResult(data) {
  const rows = Array.isArray(data.rows) ? data.rows : [];
  const totalText = data.total === "" || data.total == null ? rows.length : data.total;
  state.inventoryBarcodeItems = barcodeItemsFromInventoryRows(rows);
  const location = data.location || "-";
  state.lastLocationQueryLocation = location;
  state.inventoryHighlightLocation = "";
  setExceptionResult(`
    <div class="exception-result-head is-location-output">
      <strong>库位查询输出</strong>
      <span class="location-result-code">${escapeHtml(location)}</span>
      <span>${formatNumber(totalText)} 条</span>
    </div>
    ${rowsTable(locationInventoryColumns(), rows, { compact: true, emptyText: "没有库位库存数据" })}
  `);
}

function openQrPreview(button) {
  const code = button?.dataset.qrCode || "";
  if (!code) return;
  renderQrPreview([{ code }], "single");
}

function openLocationQrPreview(button) {
  const location = button?.dataset.qrCode || "";
  if (!location) return;
  renderQrPreview([
    { code: location },
    ...state.inventoryBarcodeItems.slice(0, 3).map((item) => ({ code: item.code })),
  ], "location-grid");
}

function renderQrPreview(items, mode) {
  if (!el.qrPreviewModal || !el.qrPreviewCard || !el.qrPreviewContent) return;
  const normalized = uniqueCodes(items.map((item) => item.code));
  if (!normalized.length) return;
  el.qrPreviewCard.classList.toggle("is-location-grid", mode === "location-grid");
  el.qrPreviewCard.classList.toggle("is-single", mode !== "location-grid");
  if (el.qrPreviewPrint) el.qrPreviewPrint.hidden = mode !== "location-grid";
  el.qrPreviewContent.className = mode === "location-grid" ? "qr-preview-grid" : "qr-preview-single";
  if (mode === "location-grid") {
    const slots = [normalized[0], normalized[1], normalized[2], normalized[3]];
    el.qrPreviewContent.innerHTML = slots.map((code, index) => {
      if (!code) return `<div class="qr-preview-slot is-empty" aria-hidden="true"></div>`;
      return qrPreviewSlotHtml(code, index === 0 ? "库位" : "货品");
    }).join("");
  } else {
    el.qrPreviewContent.innerHTML = qrPreviewSlotHtml(normalized[0], "");
  }
  el.qrPreviewModal.hidden = false;
}

function closeQrPreview() {
  if (!el.qrPreviewModal || !el.qrPreviewContent) return;
  el.qrPreviewModal.hidden = true;
  el.qrPreviewContent.innerHTML = "";
  if (el.qrPreviewPrint) el.qrPreviewPrint.hidden = true;
}

function qrPreviewSlotHtml(code, label) {
  const id = `qr-print-${Math.random().toString(36).slice(2)}`;
  return `
    <div class="qr-preview-slot" data-print-code="${escapeHtml(code)}" data-print-label="${escapeHtml(label || "二维码")}">
      <img src="${escapeHtml(withLicenseSession(`/api/qr?code=${encodeURIComponent(code)}`))}" alt="二维码 ${escapeHtml(code)}">
      ${label ? `
        <label class="qr-preview-kind" for="${id}">
          <span>${escapeHtml(label)}</span>
          <input id="${id}" class="qr-print-checkbox" type="checkbox" checked>
        </label>
      ` : ""}
      <strong>${escapeHtml(code)}</strong>
    </div>
  `;
}

function flashQrPreviewPrint(text) {
  if (!el.qrPreviewPrint) return;
  const original = el.qrPreviewPrint.textContent || "打印";
  el.qrPreviewPrint.textContent = text;
  clearTimeout(el.qrPreviewPrint._flashTimer);
  el.qrPreviewPrint._flashTimer = setTimeout(() => {
    if (el.qrPreviewPrint) el.qrPreviewPrint.textContent = original;
  }, 1200);
}

function selectedQrPrintItems() {
  return Array.from(el.qrPreviewContent?.querySelectorAll(".qr-preview-slot:not(.is-empty)") || [])
    .filter((slot) => slot.querySelector(".qr-print-checkbox")?.checked)
    .map((slot) => ({
      code: slot.dataset.printCode || "",
      label: slot.dataset.printLabel || "二维码",
    }))
    .filter((item) => item.code);
}

function openFourByTwoQrPrint(items, title) {
  const normalized = (Array.isArray(items) ? items : [])
    .map((item) => ({
      code: String(item?.code || "").trim(),
      label: String(item?.label || "二维码").trim() || "二维码",
      extra: String(item?.extra || "").trim(),
    }))
    .filter((item) => item.code);
  if (!normalized.length) return false;
  const pages = [];
  for (let index = 0; index < normalized.length; index += 2) {
    pages.push(normalized.slice(index, index + 2));
  }
  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)}</title>
  <style>
    @page { size: 2.75in 1.25in; margin: 0; }
    * { box-sizing: border-box; }
    html,
    body {
      margin: 0;
      padding: 0;
      width: 2.75in;
      height: 1.25in;
      overflow: hidden;
      background: #fff;
      color: #111820;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
    }
    .label-sheet {
      width: 2.75in;
      height: 1.25in;
      padding: 0.012in 0.018in;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.018in;
      overflow: hidden;
    }
    .label-sheet + .label-sheet {
      break-before: page;
      page-break-before: always;
    }
    .label-block {
      break-inside: avoid;
      min-width: 0;
      min-height: 0;
      padding: 0;
      border: 0;
      display: grid;
      justify-items: center;
      align-content: center;
      gap: 0.004in;
      overflow: hidden;
    }
    .label-block.is-empty {
      border-color: transparent;
    }
    .label-qr {
      width: 0.82in;
      height: 0.82in;
      object-fit: contain;
      image-rendering: pixelated;
    }
    .label-title {
      display: none;
    }
    .label-code {
      max-width: 100%;
      color: #111820;
      font-size: 11pt;
      font-weight: 900;
      line-height: 0.95;
      text-align: center;
      white-space: nowrap;
      overflow-wrap: normal;
    }
    .label-extra {
      display: block;
      margin-left: 0;
      color: #111820;
      font-size: 9.5pt;
      font-weight: 900;
      line-height: 0.9;
      text-align: center;
      white-space: nowrap;
    }
    @media print {
      html,
      body {
        width: 2.75in;
        height: 1.25in;
        overflow: hidden;
      }
    }
  </style>
</head>
<body>
  ${pages.map((page) => `
    <div class="label-sheet">
      ${[page[0], page[1]].map((item) => item ? `
        <section class="label-block">
          <div class="label-title">${escapeHtml(item.label)}</div>
          <img class="label-qr" src="${escapeHtml(withLicenseSession(`/api/qr?code=${encodeURIComponent(item.code)}`))}" alt="${escapeHtml(item.label)}二维码">
          <div class="label-code">${escapeHtml(item.code)}</div>
          ${item.extra ? `<div class="label-extra">${escapeHtml(item.extra)}</div>` : ""}
        </section>
      ` : `<section class="label-block is-empty"></section>`).join("")}
    </div>
  `).join("")}
  <script>
    (function() {
      function done() {
        try { window.close(); } catch (error) {}
      }
      function fitText() {
        document.querySelectorAll(".label-code, .label-extra").forEach(function(node) {
          var maxWidth = node.parentElement ? node.parentElement.clientWidth : node.clientWidth;
          var size = parseFloat(window.getComputedStyle(node).fontSize);
          while (node.scrollWidth > maxWidth && size > 8) {
            size -= 0.5;
            node.style.fontSize = size + "px";
          }
        });
      }
      window.addEventListener("afterprint", function() {
        setTimeout(done, 120);
      });
      window.addEventListener("load", function() {
        setTimeout(function() {
          fitText();
          window.focus();
          window.print();
          setTimeout(done, 20000);
        }, 180);
      });
    })();
  </script>
</body>
</html>`;
  const printWindow = window.open("", title, "popup,width=430,height=780");
  if (!printWindow) return false;
  const doc = printWindow.document;
  if (!doc) {
    try { printWindow.close(); } catch (error) {}
    return false;
  }
  doc.open();
  doc.write(html);
  doc.close();
  return true;
}

function printQrPreviewSelection() {
  const items = selectedQrPrintItems();
  if (!items.length) {
    flashQrPreviewPrint("先选择");
    return;
  }
  const title = `二维码打印_${formatLocalDateTime().replace(/[^\d]/g, "").slice(0, 14)}`;
  if (!openFourByTwoQrPrint(items, title)) {
    flashQrPreviewPrint("被拦截");
    return;
  }
  flashQrPreviewPrint("已打开");
}

function printInventoryLocationItemLabel(button) {
  const location = String(button?.dataset.location || "").trim();
  const itemCode = String(button?.dataset.itemCode || state.currentInventorySku || el.inventoryQueryInput?.value || "").trim();
  const quantity = String(button?.dataset.printQuantity || state.currentInventoryPrintQuantity || "").trim();
  const mode = button?.dataset.printMode || "all";
  const items = [];
  if ((mode === "location" || mode === "all") && location) {
    items.push({ label: "库位", code: location });
  }
  if ((mode === "sku" || mode === "all") && itemCode) {
    items.push({ label: "货品编码", code: itemCode, extra: quantity ? `${quantity} pcs` : "" });
  }
  if (!items.length) return;
  const title = mode === "location"
    ? `库位标签_${location}`
    : mode === "sku"
      ? `货品标签_${itemCode}`
      : `库位货品标签_${location}_${itemCode}`;
  if (!openFourByTwoQrPrint(items, title)) {
    alert("打印窗口被浏览器拦截");
  }
}

function uniqueCodes(codes) {
  const seen = new Set();
  const result = [];
  for (const code of codes) {
    const value = String(code || "").trim();
    if (!value || seen.has(value)) continue;
    seen.add(value);
    result.push(value);
  }
  return result;
}

function formatLocationInputValue(value) {
  const upper = String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  let body = upper.startsWith("CPE") ? upper.slice(3) : upper;
  body = body.slice(0, 8);
  const parts = ["CPE"];
  if (body.length) parts.push(body.slice(0, 3));
  if (body.length > 3) parts.push(body.slice(3, 6));
  if (body.length > 6) parts.push(body.slice(6, 8));
  return body.length ? parts.join("-") : (upper.startsWith("CPE") ? "CPE-" : "");
}

function normalizePastedLocationBody(value) {
  let clean = String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (clean.startsWith("CPE")) clean = clean.slice(3);
  return clean.slice(0, 8);
}

function formatInventoryInputText(value) {
  const clean = String(value || "").replace(/[^A-Za-z0-9-]/g, "");
  return (state.inventoryLowercaseMode || state.inventoryShiftActive) ? clean.toLowerCase() : clean.toUpperCase();
}

function insertInventoryInputText(text) {
  if (!el.inventoryQueryInput) return;
  const formatted = formatInventoryInputText(text);
  if (!formatted) return;
  const input = el.inventoryQueryInput;
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? start;
  input.value = `${input.value.slice(0, start)}${formatted}${input.value.slice(end)}`;
  const caret = start + formatted.length;
  input.setSelectionRange(caret, caret);
}

function normalizeInventoryInput() {
  if (!el.inventoryQueryInput) return;
  const input = el.inventoryQueryInput;
  const cursor = input.selectionStart ?? input.value.length;
  const beforeCursor = input.value.slice(0, cursor);
  const formatted = formatInventoryInputText(input.value);
  if (input.value === formatted) return;
  const formattedBeforeCursor = formatInventoryInputText(beforeCursor);
  input.value = formatted;
  const caret = Math.min(formattedBeforeCursor.length, formatted.length);
  input.setSelectionRange(caret, caret);
}

function handleInventoryBeforeInput(event) {
  if (event.target !== el.inventoryQueryInput) return;
  const inputType = String(event.inputType || "");
  if (!inputType.startsWith("insert")) return;
  if (event.isComposing || inputType.toLowerCase().includes("composition")) {
    event.preventDefault();
    return;
  }
  if (!event.data) return;
  event.preventDefault();
  insertInventoryInputText(event.data);
}

function handleInventoryPaste(event) {
  if (event.target !== el.inventoryQueryInput) return;
  const text = event.clipboardData?.getData("text") || "";
  event.preventDefault();
  insertInventoryInputText(text);
}

function handleInventoryKeydown(event) {
  state.inventoryShiftActive = event.shiftKey;
  if (event.key === "CapsLock") {
    state.inventoryLowercaseMode = !state.inventoryLowercaseMode;
    return;
  }
  if (event.key === "Enter") queryInventory();
}

function handleInventoryKeyup(event) {
  state.inventoryShiftActive = event.shiftKey;
}

function setLocationInputCaret(position = 4) {
  if (!el.locationQueryInput || el.locationQueryInput.value !== "CPE-" && !el.locationQueryInput.value.startsWith("CPE-")) return;
  const caret = Math.min(Math.max(position, 4), el.locationQueryInput.value.length);
  el.locationQueryInput.setSelectionRange(caret, caret);
}

function seedLocationInput() {
  if (!el.locationQueryInput || el.locationQueryInput.value) return;
  el.locationQueryInput.value = "CPE-";
  setLocationInputCaret();
}

function normalizeLocationInput() {
  if (!el.locationQueryInput) return;
  const formatted = formatLocationInputValue(el.locationQueryInput.value);
  if (el.locationQueryInput.value !== formatted) {
    el.locationQueryInput.value = formatted;
    el.locationQueryInput.setSelectionRange(formatted.length, formatted.length);
  } else if (formatted.startsWith("CPE-") && (el.locationQueryInput.selectionStart || 0) < 4) {
    setLocationInputCaret();
  }
}

function blockLocationNonEnglishInput(event) {
  if (event.target !== el.locationQueryInput) return;
  const inputType = String(event.inputType || "");
  if (!inputType.startsWith("insert")) return;
  if (event.isComposing || inputType.toLowerCase().includes("composition")) {
    event.preventDefault();
    return;
  }
  const data = String(event.data || "");
  if (data && !/^[A-Za-z0-9-]+$/.test(data)) event.preventDefault();
}

function handleLocationPaste(event) {
  if (event.target !== el.locationQueryInput) return;
  event.preventDefault();
  const body = normalizePastedLocationBody(event.clipboardData?.getData("text") || "");
  el.locationQueryInput.value = body ? formatLocationInputValue(`CPE${body}`) : "CPE-";
  el.locationQueryInput.setSelectionRange(el.locationQueryInput.value.length, el.locationQueryInput.value.length);
}

function placeLocationCaretAfterPrefix() {
  if (!el.locationQueryInput) return;
  seedLocationInput();
  if (!el.locationQueryInput.value.startsWith("CPE-")) return;
  const start = el.locationQueryInput.selectionStart || 0;
  if (el.locationQueryInput.value === "CPE-" || start < 4) setLocationInputCaret();
}

function keepLocationCaretAfterPrefix() {
  if (!el.locationQueryInput || !el.locationQueryInput.value.startsWith("CPE-")) return;
  const start = el.locationQueryInput.selectionStart || 0;
  if (start < 4) setLocationInputCaret();
}

function clearLocationInputOnDelete(event) {
  if (!el.locationQueryInput || !["Backspace", "Delete"].includes(event.key)) return;
  if (el.locationQueryInput.value !== "CPE-") return;
  const selectionLength = Math.abs((el.locationQueryInput.selectionEnd || 0) - (el.locationQueryInput.selectionStart || 0));
  if (selectionLength) return;
  event.preventDefault();
  el.locationQueryInput.value = "";
}

function uniqueBarcodeItems(items) {
  const seen = new Set();
  const result = [];
  for (const item of Array.isArray(items) ? items : []) {
    const code = String(item?.code || "").trim();
    if (!code || seen.has(code)) continue;
    seen.add(code);
    result.push({
      type: String(item?.type || "条码").trim() || "条码",
      code,
    });
  }
  return result;
}

function barcodeItemsFromInventoryRows(rows) {
  const seen = new Set();
  const result = [];
  const add = (type, code) => {
    const value = String(code || "").trim();
    if (!value || seen.has(value)) return;
    seen.add(value);
    result.push({ type, code: value });
  };
  for (const row of rows) {
    add("货品编码", pickInventoryValue(row, ["item_code", "itemCode", "goods_code", "goodsCode"]));
    for (const code of String(pickInventoryValue(row, ["barcode", "bar_code", "barCode", "goods_barcode", "goodsBarcode"]) || "").split(",")) {
      add("货品条码", code);
    }
  }
  return result;
}

function renderWaybillResult(data, inputWaybill = "") {
  const rows = Array.isArray(data.detailRows) ? data.detailRows : (Array.isArray(data.rows) ? data.rows : []);
  const totalText = data.total === "" || data.total == null ? rows.length : data.total;
  const queryWaybill = String(inputWaybill || data.waybill || "").trim();
  state.lastWaybillResult = { data, inputWaybill: queryWaybill };
  setExceptionResult(`
    <div class="exception-result-head waybill-result-head">
      <div class="waybill-result-title">
        <strong>面单查询结果</strong>
        <div class="waybill-query-copy-row">
          <div class="waybill-query-value">
            <div class="waybill-query-code">${escapeHtml(queryWaybill || "-")}</div>
          </div>
          ${copyButtonHtml(queryWaybill, `复制面单号 ${queryWaybill}`)}
        </div>
      </div>
      <span class="waybill-result-count">${formatNumber(totalText)} 条</span>
    </div>
    ${rowsTable(waybillColumns(), rows, { compact: true, emptyText: "未查询到出库单明细" })}
  `);
}

function normalizeWaybillInput() {
  if (!el.waybillQueryInput) return "";
  const raw = String(el.waybillQueryInput.value || "").trim();
  const next = raw.length > WAYBILL_QUERY_MAX_LENGTH ? raw.slice(-WAYBILL_QUERY_MAX_LENGTH) : raw;
  if (next !== el.waybillQueryInput.value) {
    el.waybillQueryInput.value = next;
    if (document.activeElement === el.waybillQueryInput) {
      el.waybillQueryInput.setSelectionRange(next.length, next.length);
    }
  }
  return next;
}

async function queryWaybill() {
  const waybill = normalizeWaybillInput();
  if (!waybill) {
    setExceptionResult(`<div class="empty-state is-error-text">请输入面单号</div>`, true);
    el.waybillQueryInput?.focus();
    return;
  }
  setBusy(true);
  setExceptionResult(`<div class="empty-state">正在查询面单</div>`);
  try {
    renderWaybillResult(await api("/api/exception/waybill", { waybill }), waybill);
  } catch (error) {
    setExceptionResult(`<div class="empty-state is-error-text">${escapeHtml(error.message || "面单查询失败")}</div>`, true);
  } finally {
    setBusy(false);
  }
}

async function queryInventory(options = {}) {
  const opts = options && typeof options === "object" && !("target" in options) ? options : {};
  const sku = String(opts.sku || el.inventoryQueryInput?.value || "").trim();
  if (!sku) {
    setExceptionResult(`<div class="empty-state is-error-text">请输入 SKU</div>`, true);
    el.inventoryQueryInput?.focus();
    return;
  }
  state.inventoryHighlightLocation = opts.highlightLocation ? String(opts.highlightLocation).trim() : "";
  state.currentInventoryPrintQuantity = opts.returnToWaybill ? String(opts.printQuantity || "").trim() : "";

  setBusy(true);
  setExceptionResult(`<div class="empty-state">正在查询库存</div>`);
  try {
    renderInventoryResult(await api("/api/exception/inventory", { sku }), sku, {
      returnToWaybill: Boolean(opts.returnToWaybill),
      printQuantity: state.currentInventoryPrintQuantity,
    });
  } catch (error) {
    setExceptionResult(`<div class="empty-state is-error-text">${escapeHtml(error.message || "库存查询失败")}</div>`, true);
  } finally {
    setBusy(false);
  }
}

function queryInventoryFromLocationItem(button) {
  const sku = String(button?.dataset.itemCode || "").trim();
  if (!sku) return;
  const highlightLocation = state.lastLocationQueryLocation || el.locationQueryInput?.value.trim() || "";
  if (el.inventoryQueryInput) el.inventoryQueryInput.value = sku;
  if (el.locationQueryInput) el.locationQueryInput.value = "";
  queryInventory({
    sku,
    highlightLocation,
  });
}

function queryInventoryFromWaybillItem(button) {
  const sku = String(button?.dataset.itemCode || "").trim();
  const printQuantity = String(button?.dataset.waybillQuantity || "").trim();
  if (!sku) return;
  if (el.inventoryQueryInput) el.inventoryQueryInput.value = sku;
  if (el.locationQueryInput) el.locationQueryInput.value = "";
  queryInventory({
    sku,
    returnToWaybill: true,
    printQuantity,
  });
}

function restoreWaybillResult() {
  const snapshot = state.lastWaybillResult;
  if (!snapshot) return;
  if (el.waybillQueryInput) el.waybillQueryInput.value = snapshot.inputWaybill || "";
  renderWaybillResult(snapshot.data, snapshot.inputWaybill);
}

function resetExceptionTool() {
  closeInventoryQuantityActions();
  clearInventoryActionFlow();
  if (el.waybillQueryInput) el.waybillQueryInput.value = "";
  if (el.inventoryQueryInput) el.inventoryQueryInput.value = "";
  if (el.locationQueryInput) el.locationQueryInput.value = "";
  state.inventoryBarcodeItems = [];
  state.lastLocationQueryLocation = "";
  state.inventoryHighlightLocation = "";
  state.currentInventorySku = "";
  state.currentInventoryRows = [];
  state.currentInventoryPrintQuantity = "";
  state.lastWaybillResult = null;
  state.activeInventoryQuantityContext = null;
  state.inventoryLowercaseMode = false;
  state.inventoryShiftActive = false;
  if (el.exceptionResult) {
    el.exceptionResult.hidden = true;
    el.exceptionResult.classList.remove("is-error-text");
    el.exceptionResult.innerHTML = "";
  }
  closeExceptionDetailModal();
  closeQrPreview();
}

async function queryLocationInventory() {
  normalizeLocationInput();
  const location = el.locationQueryInput?.value.trim();
  if (!location || location === "CPE-") {
    setExceptionResult(`<div class="empty-state is-error-text">请输入库位</div>`, true);
    el.locationQueryInput?.focus();
    return;
  }
  if (el.inventoryQueryInput) el.inventoryQueryInput.value = "";
  state.inventoryLowercaseMode = false;
  state.inventoryShiftActive = false;

  setBusy(true);
  setExceptionResult(`<div class="empty-state">正在查询库位</div>`);
  try {
    renderLocationResult(await api("/api/exception/location", { location }));
  } catch (error) {
    setExceptionResult(`<div class="empty-state is-error-text">${escapeHtml(error.message || "库位查询失败")}</div>`, true);
  } finally {
    setBusy(false);
  }
}

async function exportAnalysis(scope) {
  if (!state.analysisPath) {
    setStatus("请先拉取 WMS 或拖入 Excel 文件", true);
    return;
  }

  setBusy(true);
  try {
    const data = await api("/api/analyze/export", { filePath: state.analysisPath, scope });
    renderExportResult(data);
    downloadExcelFile(data.fileItem);
    setStatus(`${scope === "current" ? "本班次" : "全部"}Excel 已下载`);
  } catch (error) {
    setStatus(error.message || "导出失败", true);
  } finally {
    setBusy(false);
  }
}

async function fetchWmsAnalysis() {
  const date = el.wmsBusinessDate?.value;
  if (!date) {
    setStatus("请选择 WMS 日期", true);
    return;
  }

  setBusy(true, "realtime");
  try {
    const data = await api("/api/wms/picking-day", { date });
    state.analysisPath = data.rawFileItem?.path || "";
    state.rawWmsFileItem = data.rawFileItem || null;
    await loadNightRoster();
    renderAnalysis(data.analysis);
    updateActionAvailability();
    setStatus("WMS 原始文件已拉取并分析", false, "realtime");
  } catch (error) {
    setStatus(error.message || "WMS 拉取失败", true, "realtime");
  } finally {
    setBusy(false);
  }
}

async function fetchInboundTaskList() {
  const windowSpec = updateInboundWindow();
  const date = el.inboundBusinessDate?.value;
  if (!date || !windowSpec) {
    setStatus("请选择入库日期", true, "inbound");
    return;
  }

  setBusy(true, "inbound");
  try {
    const data = await api("/api/wms/inbound-task-day", { date });
    renderInboundTaskResult(data);
    setStatus("入库任务列表已拉取", false, "inbound");
  } catch (error) {
    setStatus(error.message || "入库任务列表拉取失败", true, "inbound");
  } finally {
    setBusy(false);
  }
}

function downloadRawWmsFile() {
  if (!state.rawWmsFileItem) {
    setStatus("还没有 WMS 原始文件", true);
    return;
  }
  downloadExcelFile(state.rawWmsFileItem);
  setStatus("WMS 原始文件已下载");
}

async function submitAnalysis(event) {
  if (event) event.preventDefault();
  if (!state.analysisPath) {
    setStatus("请先拉取 WMS 或拖入 Excel 文件", true);
    return;
  }
  setBusy(true);
  try {
    const result = await api("/api/analyze/picking", { filePath: state.analysisPath });
    await loadNightRoster();
    renderAnalysis(result);
    setStatus("分析完成");
  } catch (error) {
    setOutboundAnalysisMode("picking", { restore: false });
    setStatus("分析失败", true);
    el.previewTitle.textContent = "拣选状态分析";
    el.previewSubtitle.textContent = error.message;
    el.analysisContent.innerHTML = `<div class="empty-state is-error-text">${escapeHtml(error.message)}</div>`;
  } finally {
    setBusy(false);
  }
}

async function handleSelectedFiles(files, emptyMessage) {
  setBusy(true);
  try {
    const file = firstExcelFile(files);
    if (!file) throw new Error(emptyMessage);
    await uploadAnalysisFile(file);
  } catch (error) {
    setStatus("分析失败", true);
    el.analysisContent.innerHTML = `<div class="empty-state is-error-text">${escapeHtml(error.message)}</div>`;
  } finally {
    setBusy(false);
  }
}

async function handleReleaseAssistantFiles(files, emptyMessage) {
  setBusy(true);
  try {
    const file = firstExcelFile(files);
    if (!file) throw new Error(emptyMessage);
    await uploadReleaseAssistantFile(file);
  } catch (error) {
    setStatus("放单助手处理失败", true);
    renderReleaseAssistantError(error.message);
  } finally {
    setBusy(false);
  }
}

function bindEvents() {
  el.toolTabs?.forEach((button) => {
    button.addEventListener("click", () => setToolView(button.dataset.toolView));
  });
  el.emptyLocationButton?.addEventListener("click", () => setToolView("emptyLocation"));
  el.emptyLocationBackButton?.addEventListener("click", resetEmptyLocationQueryView);
  el.emptyLocationResultExportButton?.addEventListener("click", exportEmptyLocationRows);
  el.emptyLocationQueryButton?.addEventListener("click", queryEmptyLocationFiles);
  el.emptyLocationZoneButton?.addEventListener("click", openEmptyLocationZones);
  el.packingStatusAnalysisTab?.addEventListener("click", () => {
    setOutboundAnalysisMode(state.activeOutboundAnalysis === "packing" ? "picking" : "packing");
  });
  el.packingStatusDropZone?.addEventListener("click", () => el.packingStatusInput?.click());
  el.packingStatusDropZone?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      el.packingStatusInput?.click();
    }
  });
  ["dragenter", "dragover"].forEach((type) => {
    el.packingStatusDropZone?.addEventListener(type, (event) => {
      event.preventDefault();
      el.packingStatusDropZone.classList.add("is-dragover");
    });
  });
  ["dragleave", "drop"].forEach((type) => {
    el.packingStatusDropZone?.addEventListener(type, (event) => {
      event.preventDefault();
      el.packingStatusDropZone.classList.remove("is-dragover");
    });
  });
  el.packingStatusDropZone?.addEventListener("drop", (event) => handlePackingStatusFiles(event.dataTransfer.files, "没有找到 Excel 文件"));
  el.packingStatusInput?.addEventListener("change", async () => {
    await handlePackingStatusFiles(el.packingStatusInput.files, "没有选择 Excel 文件");
    el.packingStatusInput.value = "";
  });

  el.releaseAssistantDropZone?.addEventListener("click", () => el.releaseAssistantFileInput?.click());
  el.releaseAssistantDropZone?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      el.releaseAssistantFileInput?.click();
    }
  });
  ["dragenter", "dragover"].forEach((type) => {
    el.releaseAssistantDropZone?.addEventListener(type, (event) => {
      event.preventDefault();
      el.releaseAssistantDropZone.classList.add("is-dragover");
    });
  });
  ["dragleave", "drop"].forEach((type) => {
    el.releaseAssistantDropZone?.addEventListener(type, (event) => {
      event.preventDefault();
      el.releaseAssistantDropZone.classList.remove("is-dragover");
    });
  });
  el.releaseAssistantDropZone?.addEventListener("drop", (event) => {
    handleReleaseAssistantFiles(event.dataTransfer.files, "没有找到 Excel 文件");
  });
  el.releaseAssistantFileInput?.addEventListener("change", async () => {
    await handleReleaseAssistantFiles(el.releaseAssistantFileInput.files, "没有选择 Excel 文件");
    el.releaseAssistantFileInput.value = "";
  });
  el.inboundEfficiencyDropZone?.addEventListener("click", () => el.inboundEfficiencyFileInput?.click());
  el.inboundEfficiencyDropZone?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      el.inboundEfficiencyFileInput?.click();
    }
  });
  ["dragenter", "dragover"].forEach((type) => {
    el.inboundEfficiencyDropZone?.addEventListener(type, (event) => {
      event.preventDefault();
      el.inboundEfficiencyDropZone.classList.add("is-dragover");
    });
  });
  ["dragleave", "drop"].forEach((type) => {
    el.inboundEfficiencyDropZone?.addEventListener(type, (event) => {
      event.preventDefault();
      el.inboundEfficiencyDropZone.classList.remove("is-dragover");
    });
  });
  el.inboundEfficiencyDropZone?.addEventListener("drop", (event) => {
    handleInboundEfficiencyFiles(event.dataTransfer.files, "没有找到 Excel 文件");
  });
  el.inboundEfficiencyFileInput?.addEventListener("change", async () => {
    await handleInboundEfficiencyFiles(el.inboundEfficiencyFileInput.files, "没有选择 Excel 文件");
    el.inboundEfficiencyFileInput.value = "";
  });
  el.inboundEfficiencyFileResult?.addEventListener("click", (event) => {
    if (event.target.closest("#inboundEfficiencyReset")) resetInboundEfficiencyResult();
  });
  el.releaseAssistantCopySelected?.addEventListener("click", async () => {
    try {
      await copySelectedReleaseAssistantOrders();
    } catch (error) {
      renderReleaseAssistantError(error.message);
    }
  });
  el.releaseAssistantCancelCopy?.addEventListener("click", async () => {
    try {
      await cancelReleaseAssistantCopy();
    } catch {
      clearReleaseAssistantCopiedRows();
    }
  });
  el.releaseAssistantZoneSummary?.addEventListener("click", async (event) => {
    const target = releaseAssistantEventTarget(event);
    const button = target?.closest("[data-release-zone-copy]");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    try {
      await handleReleaseAssistantZoneCopyAction(button.dataset.releaseZoneCopy || "", button.dataset.releaseZoneAction || "copy");
    } catch (error) {
      renderReleaseAssistantError(error.message);
    }
  });
  el.releaseAssistantResetSelection?.addEventListener("click", resetReleaseAssistantSelection);
  el.releaseAssistantResult?.addEventListener("mousedown", handleReleaseAssistantPointerSelection, true);
  el.releaseAssistantResult?.addEventListener("click", handleReleaseAssistantClickSelection, true);
  ["dragenter", "dragover"].forEach((type) => {
    el.releaseAssistantView?.addEventListener(type, (event) => {
      if (state.activeToolView !== "releaseAssistant" || event.target.closest("#releaseAssistantDropZone")) return;
      event.preventDefault();
      el.releaseAssistantView.classList.add("is-release-assistant-dragover");
    });
  });
  ["dragleave", "drop"].forEach((type) => {
    el.releaseAssistantView?.addEventListener(type, (event) => {
      if (state.activeToolView !== "releaseAssistant" || event.target.closest("#releaseAssistantDropZone")) return;
      event.preventDefault();
      el.releaseAssistantView.classList.remove("is-release-assistant-dragover");
    });
  });
  el.releaseAssistantView?.addEventListener("drop", (event) => {
    if (state.activeToolView !== "releaseAssistant" || event.target.closest("#releaseAssistantDropZone")) return;
    handleReleaseAssistantFiles(event.dataTransfer.files, "没有找到 Excel 文件");
  });

  el.metrics?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-quantity-trend-type]");
    if (!button) return;
    state.quantityTrendScope = button.dataset.quantityTrendScope || "all";
    state.quantityTrendType = button.dataset.quantityTrendType || "total";
    if (state.lastResult) renderAnalysisMetrics(state.lastResult);
  });

  el.userPassword.addEventListener("input", () => {
    if (el.userPassword.value.trim() === ADMIN_PASSWORD) showAdminLogin();
  });
  el.userPassword.addEventListener("keydown", (event) => {
    if (event.key === "Enter") enterUserRole();
  });
  el.userLoginButton.addEventListener("click", enterUserRole);
  el.adminPassword.addEventListener("keydown", (event) => {
    if (event.key === "Enter") enterAdminRole();
  });
  el.adminLoginButton.addEventListener("click", enterAdminRole);
  el.backUserLogin.addEventListener("click", () => showUserLogin());
  el.logoutButton.addEventListener("click", logout);
  el.analysisForm.addEventListener("submit", submitAnalysis);
  el.inboundBusinessDate?.addEventListener("input", updateInboundWindow);
  el.inboundBusinessDate?.addEventListener("change", updateInboundWindow);
  el.fetchInboundTaskList?.addEventListener("click", fetchInboundTaskList);
  el.fetchWmsAnalysis.addEventListener("click", fetchWmsAnalysis);
  el.refreshWmsAnalysis.addEventListener("click", fetchWmsAnalysis);
  el.downloadRawWmsFile.addEventListener("click", downloadRawWmsFile);
  el.exportCurrentShift.addEventListener("click", () => exportAnalysis("current"));
  el.exportAll.addEventListener("click", () => exportAnalysis("all"));
  el.waybillQueryButton?.addEventListener("click", queryWaybill);
  el.waybillQueryInput?.addEventListener("input", normalizeWaybillInput);
  el.waybillQueryInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") queryWaybill();
  });
  el.inventoryQueryButton?.addEventListener("click", queryInventory);
  el.inventoryQueryInput?.addEventListener("beforeinput", handleInventoryBeforeInput);
  el.inventoryQueryInput?.addEventListener("paste", handleInventoryPaste);
  el.inventoryQueryInput?.addEventListener("compositionstart", (event) => event.preventDefault());
  el.inventoryQueryInput?.addEventListener("compositionupdate", (event) => event.preventDefault());
  el.inventoryQueryInput?.addEventListener("compositionend", (event) => {
    event.preventDefault();
    normalizeInventoryInput();
  });
  el.inventoryQueryInput?.addEventListener("keydown", handleInventoryKeydown);
  el.inventoryQueryInput?.addEventListener("keyup", handleInventoryKeyup);
  el.inventoryQueryInput?.addEventListener("input", normalizeInventoryInput);
  el.exceptionExportButton?.addEventListener("click", exportExceptionRecords);
  el.exceptionResetButton?.addEventListener("click", resetExceptionTool);
  el.exceptionShiftSettingsButton?.addEventListener("click", openExceptionShiftSettings);
  el.clearCacheButton?.addEventListener("click", clearDashboardCache);
  el.exceptionShiftSettingsCancel?.addEventListener("click", closeExceptionShiftSettings);
  el.exceptionShiftSettingsSave?.addEventListener("click", confirmExceptionShiftSettings);
  el.exceptionShiftSettingsModal?.addEventListener("click", (event) => {
    if (event.target === el.exceptionShiftSettingsModal) closeExceptionShiftSettings();
  });
  el.exceptionDetailExport?.addEventListener("click", exportCurrentExceptionDetail);
  el.exceptionDetailClose?.addEventListener("click", closeExceptionDetailModal);
  el.exceptionDetailModal?.addEventListener("click", (event) => {
    const copyButton = event.target.closest(".copy-value-button");
    if (copyButton) {
      copyTextToClipboard(copyButton.dataset.copyValue || "");
      markCopyButtonCopied(copyButton);
      return;
    }
    if (event.target === el.exceptionDetailModal) closeExceptionDetailModal();
  });
  el.qrPreviewPrint?.addEventListener("click", printQrPreviewSelection);
  el.exceptionShiftDate?.addEventListener("change", () => {
    state.exceptionShiftDate = el.exceptionShiftDate.value || defaultExceptionShiftDate();
    syncExceptionShiftControls();
    refreshActiveExceptionDetail();
  });
  el.exceptionShiftButtons?.forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.exceptionShiftMode === "day" ? "day" : "night";
      if (state.exceptionShiftMode === mode) return;
      state.exceptionShiftMode = mode;
      if (!state.exceptionShiftDate) state.exceptionShiftDate = defaultExceptionShiftDate();
      syncExceptionShiftControls();
      refreshActiveExceptionDetail();
    });
  });
  el.exceptionFixedActions?.addEventListener("click", (event) => {
    const actionButton = event.target.closest(".exception-fixed-action");
    if (!actionButton) return;
    if (!el.exceptionFixedActions?.classList.contains("is-inventory-quantity-open")) {
      showExceptionActionDetails(actionButton);
      return;
    }
    const actionType = exceptionActionType(actionButton);
    if (actionType === "异位拣选") beginDisplacedPickFlow();
    if (actionType === "拣选无货") beginWaybillOutOfStockFlow();
    if (actionType === "属性变更") beginAttributeChangeFlow();
  });
  el.locationQueryButton?.addEventListener("click", queryLocationInventory);
  el.locationQueryInput?.addEventListener("beforeinput", blockLocationNonEnglishInput);
  el.locationQueryInput?.addEventListener("paste", handleLocationPaste);
  el.locationQueryInput?.addEventListener("compositionstart", (event) => event.preventDefault());
  el.locationQueryInput?.addEventListener("compositionupdate", (event) => event.preventDefault());
  el.locationQueryInput?.addEventListener("compositionend", (event) => {
    event.preventDefault();
    normalizeLocationInput();
    keepLocationCaretAfterPrefix();
  });
  el.locationQueryInput?.addEventListener("focus", placeLocationCaretAfterPrefix);
  el.locationQueryInput?.addEventListener("pointerup", () => requestAnimationFrame(placeLocationCaretAfterPrefix));
  el.locationQueryInput?.addEventListener("click", () => requestAnimationFrame(placeLocationCaretAfterPrefix));
  el.locationQueryInput?.addEventListener("keydown", clearLocationInputOnDelete);
  el.locationQueryInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") queryLocationInventory();
  });
  el.locationQueryInput?.addEventListener("keyup", keepLocationCaretAfterPrefix);
  el.locationQueryInput?.addEventListener("input", normalizeLocationInput);
  el.exceptionResult?.addEventListener("click", (event) => {
    const copyButton = event.target.closest(".copy-value-button");
    if (copyButton) {
      copyTextToClipboard(copyButton.dataset.copyValue || "");
      markCopyButtonCopied(copyButton);
      return;
    }
    const flowBackButton = event.target.closest(".inventory-flow-back-button");
    if (flowBackButton) {
      handleInventoryFlowBack(flowBackButton);
      return;
    }
    const flowCancelButton = event.target.closest(".inventory-flow-cancel-button");
    if (flowCancelButton) {
      clearInventoryActionFlow();
      return;
    }
    const flowLocationButton = event.target.closest(".inventory-flow-location-option");
    if (flowLocationButton) {
      if (flowLocationButton.dataset.flowMode === "displaced") selectDisplacedPickLocation(flowLocationButton);
      if (flowLocationButton.dataset.flowMode === "original") selectOriginalPickLocation(flowLocationButton);
      if (flowLocationButton.dataset.flowMode === "waybill-out-of-stock-original") selectWaybillOutOfStockLocation(flowLocationButton);
      if (flowLocationButton.dataset.flowMode === "attribute-change-location") selectAttributeChangeLocation(flowLocationButton);
      return;
    }
    const flowQuantityButton = event.target.closest(".inventory-flow-quantity-button");
    if (flowQuantityButton) {
      completeInventoryFlowQuantity(flowQuantityButton.dataset.quantity || "");
      return;
    }
    const quantityButton = event.target.closest(".inventory-quantity-action-button");
    if (quantityButton) {
      openInventoryQuantityActions(quantityButton);
      return;
    }
    const waybillBackButton = event.target.closest(".waybill-inventory-back-button");
    if (waybillBackButton) {
      restoreWaybillResult();
      return;
    }
    const waybillItemButton = event.target.closest(".waybill-item-query-button");
    if (waybillItemButton) {
      queryInventoryFromWaybillItem(waybillItemButton);
      return;
    }
    const itemCodeButton = event.target.closest(".location-item-code-button");
    if (itemCodeButton) {
      queryInventoryFromLocationItem(itemCodeButton);
      return;
    }
    const locationPrintButton = event.target.closest(".inventory-location-print-button");
    if (locationPrintButton) {
      printInventoryLocationItemLabel(locationPrintButton);
      return;
    }
    const locationButton = event.target.closest(".inventory-location-qr-button");
    if (locationButton) {
      openLocationQrPreview(locationButton);
      return;
    }
  });
  el.exceptionResult?.addEventListener("input", (event) => {
    const input = event.target.closest(".inventory-flow-quantity-input");
    if (!input) return;
    input.value = input.value.replace(/\D/g, "");
  });
  el.exceptionResult?.addEventListener("keydown", (event) => {
    const input = event.target.closest(".inventory-flow-quantity-input");
    if (!input || event.key !== "Enter") return;
    const quantity = Number(input.value || 0);
    if (quantity > 5) completeInventoryFlowQuantity(quantity);
  });
  document.addEventListener("click", (event) => {
    if (!el.exceptionFixedActions?.classList.contains("is-inventory-quantity-open")) return;
    if (event.target.closest(".inventory-quantity-action-button")) return;
    if (event.target.closest(".exception-fixed-actions")) return;
    closeInventoryQuantityActions();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Shift") state.releaseAssistantShiftPressed = true;
  });
  document.addEventListener("keyup", (event) => {
    if (event.key === "Shift") state.releaseAssistantShiftPressed = false;
  });
  window.addEventListener("blur", () => {
    state.releaseAssistantShiftPressed = false;
    state.releaseAssistantHandledPointerSelection = false;
  });
  el.qrPreviewClose?.addEventListener("click", closeQrPreview);
  el.qrPreviewModal?.addEventListener("click", (event) => {
    if (event.target === el.qrPreviewModal) closeQrPreview();
  });
  el.nightRosterButton.addEventListener("click", openNightRoster);
  el.nightRosterClose.addEventListener("click", saveNightRosterAndClose);
  el.nightRosterSaveClose.addEventListener("click", saveNightRosterAndClose);
  el.nightRosterAddLine.addEventListener("click", () => {
    const needsNewline = el.nightRosterText.value && !el.nightRosterText.value.endsWith("\n");
    el.nightRosterText.value = `${el.nightRosterText.value}${needsNewline ? "\n" : ""}`;
    el.nightRosterText.focus();
    updateRosterCount();
  });
  el.nightRosterText.addEventListener("input", updateRosterCount);
  el.nightRosterModal.addEventListener("click", (event) => {
    if (event.target === el.nightRosterModal) saveNightRosterAndClose();
  });
  el.emptyLocationZoneClose?.addEventListener("click", saveEmptyLocationZonesAndClose);
  el.emptyLocationZoneSaveClose?.addEventListener("click", saveEmptyLocationZonesAndClose);
  el.emptyLocationZoneAddLine?.addEventListener("click", () => {
    const needsNewline = el.emptyLocationZoneText.value && !el.emptyLocationZoneText.value.endsWith("\n");
    el.emptyLocationZoneText.value = `${el.emptyLocationZoneText.value}${needsNewline ? "\n" : ""}`;
    el.emptyLocationZoneText.focus();
    updateEmptyLocationZoneCount();
  });
  el.emptyLocationZoneText?.addEventListener("input", updateEmptyLocationZoneCount);
  el.emptyLocationZoneModal?.addEventListener("click", (event) => {
    if (event.target === el.emptyLocationZoneModal) saveEmptyLocationZonesAndClose();
  });
  el.emptyLocationZoneList?.addEventListener("pointerdown", handleEmptyLocationZonePointerDown);
  el.emptyLocationZoneList?.addEventListener("pointerover", handleEmptyLocationZonePointerOver);
  el.emptyLocationZoneList?.addEventListener("click", handleEmptyLocationZoneClick);
  document.addEventListener("pointerup", finishEmptyLocationZoneSelection);
  document.addEventListener("pointercancel", finishEmptyLocationZoneSelection);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && el.qrPreviewModal && !el.qrPreviewModal.hidden) closeQrPreview();
    if (event.key === "Escape" && el.exceptionDetailModal && !el.exceptionDetailModal.hidden) closeExceptionDetailModal();
    if (event.key === "Escape" && el.exceptionShiftSettingsModal && !el.exceptionShiftSettingsModal.hidden) closeExceptionShiftSettings();
    if (event.key === "Escape" && !el.nightRosterModal.hidden) saveNightRosterAndClose();
    if (event.key === "Escape" && el.emptyLocationZoneModal && !el.emptyLocationZoneModal.hidden) saveEmptyLocationZonesAndClose();
  });
  window.addEventListener("resize", () => {
    positionReleaseAssistantZoneChart();
    positionReleaseAssistantFloatingActions();
    positionReleaseAssistantOrderStats();
    positionReleaseAssistantZoneSummary();
  });
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

  el.dropZone.addEventListener("drop", (event) => handleSelectedFiles(event.dataTransfer.files, "没有找到 Excel 文件"));
  el.analysisFileInput.addEventListener("change", async () => {
    await handleSelectedFiles(el.analysisFileInput.files, "没有选择 Excel 文件");
    el.analysisFileInput.value = "";
  });
  el.analysisFolderInput.addEventListener("change", async () => {
    await handleSelectedFiles(el.analysisFolderInput.files, "文件夹里没有 Excel 文件");
    el.analysisFolderInput.value = "";
  });
}

async function initAppData() {
  if (state.appReady) return;
  if (el.previewTableWrap) el.previewTableWrap.hidden = true;
  if (el.resultArea) el.resultArea.hidden = true;
  if (el.refreshPreview) el.refreshPreview.hidden = true;
  try {
    const boot = await api("/api/bootstrap");
    await loadNightRoster();
    if (el.wmsBusinessDate) el.wmsBusinessDate.value = boot.wmsBusinessDate || boot.today || "";
    if (el.inboundBusinessDate) el.inboundBusinessDate.value = boot.today || "";
    updateInboundWindow();
    state.analysisPath = "";
    state.rawWmsFileItem = null;
    setOutboundAnalysisMode("picking", { restore: false, force: true });
    updateActionAvailability();
    el.previewTitle.textContent = "拣选状态分析";
    el.previewSubtitle.textContent = "选择日期后拉取 WMS，或拖入 Excel 文件";
    state.appReady = true;
    setStatus("本地服务已启动");
  } catch (error) {
    setOutboundAnalysisMode("picking", { restore: false, force: true });
    setStatus("本地服务异常", true);
    el.previewTitle.textContent = "拣选状态分析";
    el.previewSubtitle.textContent = error.message;
  }
}

async function init() {
  if (window.location.protocol === "file:") {
    setStatus("正在打开本地服务");
    el.previewTitle.textContent = "拣选状态分析";
    el.previewSubtitle.textContent = "正在跳转到 http://127.0.0.1:5317/";
    window.location.replace("http://127.0.0.1:5317/");
    return;
  }

  bindEvents();
  await loadAuthConfig();
  loadExceptionShiftSettings();
  syncExceptionShiftControls();
  setToolView("realtime");
  const storedAuth = readStoredAuth();
  if (storedAuth && (!state.authRequired || storedAuth.session)) {
    state.authRole = storedAuth.role;
    state.authUser = storedAuth.username || "";
    state.authSession = storedAuth.session || "";
    applyRoleUi();
    await initAppData();
  } else {
    showUserLogin();
  }
}

init();
