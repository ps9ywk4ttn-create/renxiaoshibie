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
  locationFreeInput: false,
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
  selectedAttributeChangeRows: new Set(),
  attributeChangeBatchRunning: false,
  attributeChangeBatchResults: new Map(),
  attributeChangeBatchMessage: "",
  attributeChangeBatchError: "",
  attributeChangeBatchToken: "",
  attributeChangeDeletingRecordId: "",
  releaseAssistantFileItem: null,
  releaseAssistantLastSelectedIndex: null,
  releaseAssistantHandledPointerSelection: false,
  releaseAssistantShiftPressed: false,
  releaseAssistantCopyPending: false,
  releaseAssistantZonePreviewTarget: null,
  releaseAssistantWaveZonesLoaded: false,
  releaseAssistantWaveZonesLoading: false,
  releaseAssistantPeopleStatusLoading: false,
  releaseAssistantPeopleStatusProgressLoading: false,
  releaseAssistantPeopleStatusRefreshStage: "",
  releaseAssistantPeopleStatusRefreshStartedAt: 0,
  releaseAssistantPeopleStatusRefreshElapsedMs: 0,
  releaseAssistantPeopleStatusRefreshTimer: null,
  releaseAssistantPeopleStatusProgressRequestId: 0,
  releaseAssistantPeopleStatusProgressWatchdog: null,
  releaseAssistantPeopleStatusRenderPending: false,
  releaseAssistantPeopleStatusRequestId: 0,
  releaseAssistantPeopleStatusBusinessDate: "",
  releaseAssistantPeopleStatusAnalysis: null,
  releaseAssistantPeopleStatusWaveCockpit: null,
  releaseAssistantSowingTaskSummary: null,
  releaseAssistantSowingStatusError: "",
  releaseAssistantPackingDetailOpen: false,
  releaseAssistantPeopleStatusError: "",
  releaseAssistantPeopleStatusPromise: null,
  releaseAssistantPeopleStatusQueuedForcePromise: null,
  releaseAssistantWaveOperator: "",
  releaseAssistantSelectedWaveZones: new Set(),
  releaseAssistantActiveSinglePickingZones: new Set(),
  releaseAssistantAssignedSingleZones: new Set(),
  releaseAssistantActiveSinglePickingZonesError: "",
  releaseAssistantWaveZoneDragActive: false,
  releaseAssistantWaveZoneDragSelecting: true,
  releaseAssistantWaveZoneDragPointerId: null,
  releaseAssistantWaveZoneDragVisited: new Set(),
  releaseAssistantWaveZoneSuppressClick: false,
  releaseAssistantReleaseMode: "",
  releaseAssistantWaveQueryLoading: false,
  releaseAssistantWaveQueryKey: "",
  releaseAssistantWaveQueryExpiresAt: 0,
  releaseAssistantWaveTotalPackages: 0,
  releaseAssistantWaveBatchSummaryLoading: false,
  releaseAssistantWaveBatchSummaryMessage: "",
  releaseAssistantWaveReleaseLoading: false,
  releaseAssistantWaveReleaseMessage: "",
  releaseAssistantWaveReleaseError: false,
  releaseAssistantWaveReleasedWaveNos: new Set(),
  releaseAssistantWaveBatchSummarySubmittedKeys: new Set(),
  releaseAssistantWaveBatchSummaryWaveByKey: new Map(),
  releaseAssistantWaveSummaryData: null,
  releaseAssistantWaveConfirmationNo: "",
  releaseAssistantWaveConfirmationRequestId: 0,
  releaseAssistantWaveConfirmationLoading: false,
  releaseAssistantWaveConfirmationRow: null,
  releaseAssistantWaveConfirmationError: "",
  releaseAssistantWaveConfirmationActionRequestId: 0,
  releaseAssistantWaveConfirmationActionLoading: "",
  releaseAssistantWaveConfirmationActionPending: "",
  releaseAssistantWaveConfirmationActionMessage: "",
  releaseAssistantWaveConfirmationActionError: false,
  releaseAssistantWaveAutoScrollRequestId: 0,
  releaseAssistantWaveQualityLoading: false,
  releaseAssistantWaveQualityRequestId: 0,
  releaseAssistantWaveQualityOpen: false,
  releaseAssistantWaveQualityPage: 1,
  releaseAssistantWaveQualitySize: 20,
  releaseAssistantWaveQualityData: null,
  releaseAssistantWaveQualityError: "",
  releaseAssistantWavePickListLoading: false,
  releaseAssistantWavePickListRequestId: 0,
  releaseAssistantWavePickListOpen: false,
  releaseAssistantWavePickListPage: 1,
  releaseAssistantWavePickListSize: 50,
  releaseAssistantWavePickListData: null,
  releaseAssistantWavePickListError: "",
  releaseAssistantWaveManageOpen: false,
  releaseAssistantWaveManageRequestId: 0,
  releaseAssistantWaveManageLoading: false,
  releaseAssistantWaveManagePage: 1,
  releaseAssistantWaveManageSize: 50,
  releaseAssistantWaveManageData: null,
  releaseAssistantWaveManageError: "",
  releaseAssistantWaveManageMessage: "",
  releaseAssistantWaveManageSelected: new Set(),
  releaseAssistantWaveManageLastIndex: null,
  releaseAssistantWaveManageRunning: false,
  releaseAssistantWaveManageRunningAction: "",
  releaseAssistantCancelPickOpen: false,
  releaseAssistantCancelPickControlsCollapsed: false,
  releaseAssistantCancelPickRequestId: 0,
  releaseAssistantCancelPickLoading: false,
  releaseAssistantCancelPickPage: 1,
  releaseAssistantCancelPickSize: 500,
  releaseAssistantCancelPickData: null,
  releaseAssistantCancelPickError: "",
  releaseAssistantCancelPickMessage: "",
  releaseAssistantCancelPickSelected: new Set(),
  releaseAssistantCancelPickMatrixSortMode: "",
  releaseAssistantCancelPickTableSortMode: "",
  releaseAssistantCancelPickFitFrame: 0,
  releaseAssistantCancelPickLastIndex: null,
  releaseAssistantCancelPickCardRangeAnchor: "",
  releaseAssistantCancelPickCardActionAnchor: "",
  releaseAssistantCancelPickCardDragActive: false,
  releaseAssistantCancelPickCardDragPointerId: null,
  releaseAssistantCancelPickCardSuppressClick: false,
  releaseAssistantCancelPickCardRangePointerId: null,
  releaseAssistantCancelPickCardDragSourcePickOrderNo: "",
  releaseAssistantCancelPickCardDragSourcePickOrderNos: [],
  releaseAssistantCancelPickCardDragSourceWasSelected: false,
  releaseAssistantCancelPickCardDragSelectionSnapshot: new Set(),
  releaseAssistantCancelPickCardDragCaptureElement: null,
  releaseAssistantCancelPickCardDragPreviewElement: null,
  releaseAssistantCancelPickCardDragPreviewFrame: 0,
  releaseAssistantCancelPickCardDragMoved: false,
  releaseAssistantCancelPickCardDragStartX: 0,
  releaseAssistantCancelPickCardDragStartY: 0,
  releaseAssistantCancelPickCardDragClientX: 0,
  releaseAssistantCancelPickCardDragClientY: 0,
  releaseAssistantCancelPickCardDropMode: false,
  releaseAssistantCancelPickCardDropPerson: "",
  releaseAssistantCancelPickRunning: false,
  releaseAssistantPickPriorityRunning: 0,
  releaseAssistantAssignPickerOpen: false,
  releaseAssistantAssignPickerRequestId: 0,
  releaseAssistantAssignPickerLoading: false,
  releaseAssistantAssignPickerError: "",
  releaseAssistantAssignPickerBusinessDate: "",
  releaseAssistantAssignPickerAnalysis: null,
  releaseAssistantAssignPickerSelected: new Set(),
  releaseAssistantAssignPickerInputNames: new Set(),
  releaseAssistantAssignPickerSearch: "",
  releaseAssistantAssignPickerRunning: false,
  releaseAssistantAssignPickerResultBlocked: false,
  releaseAssistantAssignPickerPosition: null,
  releaseAssistantAssignPickerDrag: null,
  releaseAssistantNextShiftRosterNames: [],
  releaseAssistantNextShiftRosterOffNames: new Set(),
  releaseAssistantNextShiftRosterSelected: new Set(),
  releaseAssistantNextShiftRosterLoading: false,
  releaseAssistantNextShiftRosterSaving: false,
  releaseAssistantNextShiftPickerOpen: false,
  releaseAssistantNextShiftPickerRequestId: 0,
  releaseAssistantNextShiftPickerLoading: false,
  releaseAssistantNextShiftPickerSubmitting: false,
  releaseAssistantNextShiftPickerError: "",
  releaseAssistantNextShiftPickerMessage: "",
  releaseAssistantNextShiftPickerActivePerson: "",
  releaseAssistantNextShiftPickerPosition: null,
  releaseAssistantNextShiftPickerDrag: null,
  wmsAccountModalOpen: false,
  wmsAccountRoles: [],
  wmsAccountRolesLoading: false,
  wmsAccountSubmitting: false,
  wmsAccountLastCreated: null,
  wmsAccountRecordsOpen: false,
  wmsAccountRecordsLoading: false,
  wmsAccountRecordsRefreshPending: false,
  wmsAccountRecords: [],
  wmsAccountRecordsTotal: 0,
  wmsAccountRecordsError: "",
  barcodeGeneratorOpen: false,
  barcodeGeneratorQuantity: 1,
  inboundWindow: null,
  inboundRawFileItem: null,
  inboundEfficiencyFile: null,
  packingStatusFile: null,
  waveCockpitRequestId: 0,
  waveCockpitSummary: null,
  pickingProgressRequestId: 0,
  exceptionShiftDate: "",
  exceptionShiftMode: "night",
  exceptionShiftSettings: {
    dayStartTime: "04:00",
    dayEndTime: "17:30",
    nightStartTime: "17:30",
    nightEndTime: "04:00",
  },
  henryLabelText: "Label to Henry",
};

const $ = (selector) => document.querySelector(selector);
const APP_VERSION = "v1.1.392";
const ADMIN_PASSWORD = "kakarot";
const AUTH_STORAGE_KEY = "realtime-efficiency-role";
const EXCEPTION_SHIFT_SETTINGS_STORAGE_KEY = "realtime-efficiency-exception-shift-settings";
const HENRY_LABEL_TEXT_STORAGE_KEY = "realtime-efficiency-henry-label-text";
const WMS_ACCOUNT_LAST_CREATED_STORAGE_KEY = "realtime-efficiency-wms-account-last-created-v4";
const WMS_ACCOUNT_LEGACY_STORAGE_KEYS = [
  "realtime-efficiency-wms-account-last-created-v2",
  "realtime-efficiency-wms-account-last-created-v3",
];
const WMS_ACCOUNT_FIXED_PASSWORD = "Aa123456";
const WMS_ACCOUNT_REPRINT_TTL_MS = 30 * 60 * 1000;
const WAYBILL_QUERY_MAX_LENGTH = 22;
const OVERTIME_OPEN_ORDER_EXCLUDE_MINUTES = 150;
const WMS_PICKING_PROGRESS_REQUEST_TIMEOUT_MS = 35_000;
const WMS_PICKING_PROGRESS_WATCHDOG_MS = 37_000;
const WMS_STATUS_BASE_REQUEST_TIMEOUT_MS = 45_000;
const WMS_STATUS_AUX_REQUEST_TIMEOUT_MS = 30_000;
const WMS_PICK_ORDER_MATRIX_REQUEST_TIMEOUT_MS = 35_000;
const DEFAULT_EXCEPTION_SHIFT_SETTINGS = {
  dayStartTime: "04:00",
  dayEndTime: "17:30",
  nightStartTime: "17:30",
  nightEndTime: "04:00",
};
const ATTRIBUTE_CHANGE_TARGET_LOCATION = "DMG-003";

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
  desktopWmsLoginButton: $("#desktopWmsLoginButton"),
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
  outboundEfficiencyView: $("#outboundEfficiencyView"),
  releaseAssistantDropZone: $("#releaseAssistantDropZone"),
  releaseAssistantFileInput: $("#releaseAssistantFileInput"),
  releaseAssistantPeopleStatus: $("#releaseAssistantPeopleStatus"),
  releaseAssistantResult: $("#releaseAssistantResult"),
  releaseAssistantFloatingActions: $("#releaseAssistantFloatingActions"),
  releaseAssistantOrderStats: $("#releaseAssistantOrderStats"),
  releaseAssistantZoneChart: $("#releaseAssistantZoneChart"),
  releaseAssistantZoneSummary: $("#releaseAssistantZoneSummary"),
  releaseAssistantWaveOperatorList: $("#releaseAssistantWaveOperatorList"),
  releaseAssistantWaveZoneList: $("#releaseAssistantWaveZoneList"),
  releaseAssistantWaveZoneRefresh: $("#releaseAssistantWaveZoneRefresh"),
  releaseAssistantWaveZoneButtons: $("#releaseAssistantWaveZoneButtons"),
  releaseAssistantReleaseModeButtons: $("#releaseAssistantReleaseModeButtons"),
  releaseAssistantWaveResult: $("#releaseAssistantWaveResult"),
  releaseAssistantWaveManageModal: $("#releaseAssistantWaveManageModal"),
  releaseAssistantWaveManageClose: $("#releaseAssistantWaveManageClose"),
  releaseAssistantWaveManageMeta: $("#releaseAssistantWaveManageMeta"),
  releaseAssistantWaveManageSelectedCount: $("#releaseAssistantWaveManageSelectedCount"),
  releaseAssistantWaveManageConfirmAll: $("#releaseAssistantWaveManageConfirmAll"),
  releaseAssistantWaveManageCancelAll: $("#releaseAssistantWaveManageCancelAll"),
  releaseAssistantWaveManageRefresh: $("#releaseAssistantWaveManageRefresh"),
  releaseAssistantWaveManageNotice: $("#releaseAssistantWaveManageNotice"),
  releaseAssistantWaveManageContent: $("#releaseAssistantWaveManageContent"),
  releaseAssistantCancelPickModal: $("#releaseAssistantCancelPickModal"),
  releaseAssistantCancelPickClose: $("#releaseAssistantCancelPickClose"),
  releaseAssistantCancelPickMeta: $("#releaseAssistantCancelPickMeta"),
  releaseAssistantCancelPickSelectedCount: $("#releaseAssistantCancelPickSelectedCount"),
  releaseAssistantCancelPickStatusSummary: $("#releaseAssistantCancelPickStatusSummary"),
  releaseAssistantCancelPickStickyControls: $("#releaseAssistantCancelPickStickyControls"),
  releaseAssistantCancelPickCollapse: $("#releaseAssistantCancelPickCollapse"),
  releaseAssistantPackingDetailModal: $("#releaseAssistantPackingDetailModal"),
  releaseAssistantPackingDetailClose: $("#releaseAssistantPackingDetailClose"),
  releaseAssistantPackingDetailMeta: $("#releaseAssistantPackingDetailMeta"),
  releaseAssistantPackingDetailContent: $("#releaseAssistantPackingDetailContent"),
  releaseAssistantCancelPickClearSelection: $("#releaseAssistantCancelPickClearSelection"),
  releaseAssistantAssignNextShiftPicker: $("#releaseAssistantAssignNextShiftPicker"),
  releaseAssistantAssignPicker: $("#releaseAssistantAssignPicker"),
  releaseAssistantCancelAssignPicker: $("#releaseAssistantCancelAssignPicker"),
  releaseAssistantAssignPickerPanel: $("#releaseAssistantAssignPickerPanel"),
  releaseAssistantCancelPickAll: $("#releaseAssistantCancelPickAll"),
  releaseAssistantCancelPickRefresh: $("#releaseAssistantCancelPickRefresh"),
  releaseAssistantCancelPickMatrixRefresh: $("#releaseAssistantCancelPickMatrixRefresh"),
  releaseAssistantCancelPickNotice: $("#releaseAssistantCancelPickNotice"),
  releaseAssistantCancelPickNoticeText: $("#releaseAssistantCancelPickNoticeText"),
  releaseAssistantCancelPickPeopleStatus: $("#releaseAssistantCancelPickPeopleStatus"),
  releaseAssistantCancelPickContent: $("#releaseAssistantCancelPickContent"),
  releaseAssistantNextShiftRosterModal: $("#releaseAssistantNextShiftRosterModal"),
  releaseAssistantNextShiftRosterText: $("#releaseAssistantNextShiftRosterText"),
  releaseAssistantNextShiftRosterCards: $("#releaseAssistantNextShiftRosterCards"),
  releaseAssistantNextShiftRosterSelectedCount: $("#releaseAssistantNextShiftRosterSelectedCount"),
  releaseAssistantNextShiftRosterCancelAllOff: $("#releaseAssistantNextShiftRosterCancelAllOff"),
  releaseAssistantNextShiftRosterOff: $("#releaseAssistantNextShiftRosterOff"),
  releaseAssistantNextShiftRosterCount: $("#releaseAssistantNextShiftRosterCount"),
  releaseAssistantNextShiftRosterClose: $("#releaseAssistantNextShiftRosterClose"),
  releaseAssistantNextShiftRosterAddLine: $("#releaseAssistantNextShiftRosterAddLine"),
  releaseAssistantNextShiftRosterSaveClose: $("#releaseAssistantNextShiftRosterSaveClose"),
  releaseAssistantNextShiftPickerFloat: $("#releaseAssistantNextShiftPickerFloat"),
  releaseAssistantNextShiftPickerFloatHeader: $("#releaseAssistantNextShiftPickerFloatHeader"),
  releaseAssistantNextShiftPickerFloatMeta: $("#releaseAssistantNextShiftPickerFloatMeta"),
  releaseAssistantNextShiftPickerFloatClose: $("#releaseAssistantNextShiftPickerFloatClose"),
  releaseAssistantNextShiftPickerFloatSelectedCount: $("#releaseAssistantNextShiftPickerFloatSelectedCount"),
  releaseAssistantNextShiftPickerFloatSubmit: $("#releaseAssistantNextShiftPickerFloatSubmit"),
  releaseAssistantNextShiftPickerFloatNotice: $("#releaseAssistantNextShiftPickerFloatNotice"),
  releaseAssistantNextShiftPickerFloatList: $("#releaseAssistantNextShiftPickerFloatList"),
  wmsAccountModal: $("#wmsAccountModal"),
  wmsAccountClose: $("#wmsAccountClose"),
  wmsAccountForm: $("#wmsAccountForm"),
  wmsAccountUserAccount: $("#wmsAccountUserAccount"),
  wmsAccountUserName: $("#wmsAccountUserName"),
  wmsAccountRoleList: $("#wmsAccountRoleList"),
  wmsAccountNotice: $("#wmsAccountNotice"),
  wmsAccountSubmit: $("#wmsAccountSubmit"),
  wmsAccountRecordsOpen: $("#wmsAccountRecordsOpen"),
  wmsAccountRecordsModal: $("#wmsAccountRecordsModal"),
  wmsAccountRecordsClose: $("#wmsAccountRecordsClose"),
  wmsAccountRecordsRefresh: $("#wmsAccountRecordsRefresh"),
  wmsAccountRecordsMeta: $("#wmsAccountRecordsMeta"),
  wmsAccountRecordsContent: $("#wmsAccountRecordsContent"),
  barcodeGeneratorModal: $("#barcodeGeneratorModal"),
  barcodeGeneratorClose: $("#barcodeGeneratorClose"),
  barcodeGeneratorInput: $("#barcodeGeneratorInput"),
  barcodeGeneratorQuickQuantity: $("#barcodeGeneratorQuickQuantity"),
  barcodeGeneratorCustomQuantity: $("#barcodeGeneratorCustomQuantity"),
  barcodeGeneratorQuantityStatus: $("#barcodeGeneratorQuantityStatus"),
  barcodeGeneratorNotice: $("#barcodeGeneratorNotice"),
  barcodeGeneratorPreview: $("#barcodeGeneratorPreview"),
  barcodeGeneratorPrint: $("#barcodeGeneratorPrint"),
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
  releaseAssistantQuickButton: $("#releaseAssistantQuickButton"),
  scrollTopButton: $("#scrollTopButton"),
  scrollBottomButton: $("#scrollBottomButton"),
  downloadRawWmsFile: $("#downloadRawWmsFile"),
  runAnalysis: $("#runAnalysis"),
  analysisContent: $("#analysisContent"),
  efficiencyContent: $("#efficiencyContent"),
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
  shortPickScanButton: $("#shortPickScanButton"),
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
  henryLabelEditModal: $("#henryLabelEditModal"),
  henryLabelEditInput: $("#henryLabelEditInput"),
  henryLabelEditCancel: $("#henryLabelEditCancel"),
  henryLabelEditSave: $("#henryLabelEditSave"),
  exceptionDetailModal: $("#exceptionDetailModal"),
  exceptionDetailTitle: $("#exceptionDetailTitle"),
  exceptionDetailMeta: $("#exceptionDetailMeta"),
  exceptionDetailContent: $("#exceptionDetailContent"),
  exceptionDetailExport: $("#exceptionDetailExport"),
  exceptionDetailClose: $("#exceptionDetailClose"),
  exceptionDetailSelectAll: $("#exceptionDetailSelectAll"),
  exceptionDetailBatchDamage: $("#exceptionDetailBatchDamage"),
  exceptionResult: $("#exceptionResult"),
  qrPreviewModal: $("#qrPreviewModal"),
  qrPreviewClose: $("#qrPreviewClose"),
  qrPreviewPrint: $("#qrPreviewPrint"),
  qrPreviewCard: $("#qrPreviewCard"),
  qrPreviewContent: $("#qrPreviewContent"),
};

const nativeFetch = window.fetch.bind(window);
let pendingRequestCount = 0;

function renderRequestWaiting() {
  const overlay = $("#requestWaitingOverlay");
  if (!overlay) return;
  overlay.hidden = pendingRequestCount <= 0;
  document.body.classList.toggle("is-request-waiting", pendingRequestCount > 0);
}

window.fetch = async (...args) => {
  pendingRequestCount += 1;
  renderRequestWaiting();
  try {
    return await nativeFetch(...args);
  } finally {
    pendingRequestCount = Math.max(0, pendingRequestCount - 1);
    renderRequestWaiting();
  }
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
  const windowsDesktop = window.realtimeDesktop?.platform === "win32";
  const wmsPageName = windowsDesktop ? "App 内置 WMS 登录窗口" : "Safari 的 WMS 页面";

  if (direct.includes("未获得授权将Apple事件发送给Safari") || raw.includes("(-1743)")) {
    return "macOS 没有允许当前程序控制 Safari，请在 系统设置 > 隐私与安全性 > 自动化 里允许后再拉取 WMS";
  }
  if (direct.includes("WMS 拣选单页面")) {
    return windowsDesktop ? `请先在${wmsPageName}完成登录` : "Safari 里没有找到已登录的 WMS 标签页";
  }
  if (direct.includes("已登录的 WMS 标签页") || direct.includes("已登录的 WMS 页面")) {
    return windowsDesktop ? `请先在${wmsPageName}完成登录` : "Safari 里没有找到已登录的 WMS 标签页，请先在 Safari 打开并登录 WMS";
  }
  if (direct.includes("登录已超时") || direct.includes("请重新登录")) {
    return `WMS 登录已超时，请先在${wmsPageName}重新登录`;
  }
  if (text.includes("no permission") || text.includes("code 10000") || raw.includes("无权限")) {
    return "WMS 返回无权限：请确认当前账号有“拣选单导出”权限";
  }
  if (text.includes("osascript") || text.includes("command failed")) {
    return windowsDesktop ? `WMS 拉取失败：请确认已在${wmsPageName}登录` : "WMS 拉取失败：请确认 Safari 已打开并登录 WMS";
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
  const activeView = view === "inbound" || view === "inboundEfficiency" || view === "emptyLocation" || view === "exception" || view === "releaseAssistant" || view === "outboundEfficiency" ? view : "realtime";
  state.activeToolView = activeView;
  if (el.realtimeView) el.realtimeView.hidden = activeView !== "realtime";
  if (el.inboundView) el.inboundView.hidden = activeView !== "inbound";
  if (el.inboundEfficiencyView) el.inboundEfficiencyView.hidden = activeView !== "inboundEfficiency";
  if (el.emptyLocationView) el.emptyLocationView.hidden = activeView !== "emptyLocation";
  if (el.exceptionView) el.exceptionView.hidden = activeView !== "exception";
  if (el.releaseAssistantView) el.releaseAssistantView.hidden = activeView !== "releaseAssistant";
  if (el.outboundEfficiencyView) el.outboundEfficiencyView.hidden = activeView !== "outboundEfficiency";
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
              : activeView === "outboundEfficiency"
                ? "出库效率看板"
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
  if (activeView === "releaseAssistant") {
    setTimeout(() => el.releaseAssistantDropZone?.focus(), 0);
    loadReleaseAssistantWaveZones();
    renderReleaseAssistantPeopleStatus();
  }
  if (activeView === "inboundEfficiency") setTimeout(() => el.inboundEfficiencyDropZone?.focus(), 0);
  if (activeView === "emptyLocation") loadEmptyLocationZones().catch(() => setStatus("库区读取失败", true, "emptyLocation"));
}

async function navigateReleaseAssistantTool(view) {
  const targetView = view === "exception" ? "exception" : "realtime";
  if (state.releaseAssistantCancelPickOpen) {
    closeReleaseAssistantCancelPickOrders();
    if (state.releaseAssistantCancelPickOpen) return;
  }
  setToolView(targetView);
  window.scrollTo({ top: 0, behavior: "auto" });
  if (targetView === "realtime") {
    await fetchWmsAnalysis();
  }
}

function setOutboundAnalysisMode(mode, options = {}) {
  const nextMode = mode === "packing" ? "packing" : "picking";
  if (state.activeOutboundAnalysis === nextMode && !options.force) return;

  if (nextMode === "packing") {
    state.outboundPickingSnapshot = {
      title: window.dashboardI18n?.sourceText(el.previewTitle) || el.previewTitle?.textContent || "",
      subtitle: window.dashboardI18n?.sourceText(el.previewSubtitle) || el.previewSubtitle?.textContent || "",
      panelActionsHidden: Boolean(el.outboundPanelActions?.hidden),
      metricsHidden: Boolean(el.metrics?.hidden),
      analysisContentHidden: Boolean(el.analysisContent?.hidden),
      efficiencyContentHidden: Boolean(el.efficiencyContent?.hidden),
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
    if (el.efficiencyContent) el.efficiencyContent.hidden = true;
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
    if (el.efficiencyContent) el.efficiencyContent.hidden = snapshot.efficiencyContentHidden;
    if (el.previewTableWrap) el.previewTableWrap.hidden = snapshot.previewTableWrapHidden;
    if (el.resultArea) el.resultArea.hidden = snapshot.resultAreaHidden;
    if (el.refreshPreview) el.refreshPreview.hidden = snapshot.refreshPreviewHidden;
  } else {
    if (el.outboundPanelActions) el.outboundPanelActions.hidden = false;
    if (el.metrics) el.metrics.hidden = false;
    if (el.analysisContent) el.analysisContent.hidden = false;
    if (el.efficiencyContent) el.efficiencyContent.hidden = !state.lastResult;
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

function isHostedWebPage() {
  const host = String(window.location.hostname || "").toLowerCase();
  return Boolean(host) && host !== "localhost" && host !== "127.0.0.1" && host !== "::1";
}

function configuredLocalApiBase() {
  try {
    return String(localStorage.getItem("realtimeDashboardApiBase") || "").trim().replace(/\/+$/, "");
  } catch {
    return "";
  }
}

function defaultLocalApiBase() {
  return "http://127.0.0.1:5317";
}

function isGithubPagesHost() {
  return String(window.location.hostname || "").toLowerCase().endsWith(".github.io");
}

function resolveApiUrl(path) {
  const url = String(path || "");
  if (!url.startsWith("/")) return url;
  const configured = configuredLocalApiBase();
  if (configured) return `${configured}${url}`;
  return url;
}

function resolveHostedFallbackApiUrl(path, primaryUrl) {
  const url = String(path || "");
  if (!isHostedWebPage() || !url.startsWith("/api/") || primaryUrl === url) return "";
  if (isGithubPagesHost()) return "";
  return url;
}

function todayYmdForWebFallback() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function staticWebFallbackData(path, body) {
  if (!isHostedWebPage()) return null;
  const apiPath = String(path || "").split("?")[0].replace(/^\/api/, "");
  if (apiPath === "/auth/config") return { required: false };
  if (apiPath === "/bootstrap") {
    const today = todayYmdForWebFallback();
    return { today, wmsBusinessDate: today, webMode: true };
  }
  if (apiPath === "/night-shift-roster") return { names: Array.isArray(body?.names) ? body.names : [] };
  if (apiPath === "/empty-location-zones") return { zones: Array.isArray(body?.zones) ? body.zones : [] };
  return null;
}

function withLicenseSession(url) {
  if (!state.authSession || !url || !url.startsWith("/")) return resolveApiUrl(url);
  const separator = url.includes("?") ? "&" : "?";
  return resolveApiUrl(`${url}${separator}licenseSession=${encodeURIComponent(state.authSession)}`);
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

function personTimelineId(value) {
  const text = String(value || "").trim();
  const encoded = Array.from(text).map((character) => character.codePointAt(0).toString(16)).join("-");
  return `person-timeline-${encoded || "empty"}`;
}

function copyablePersonHtml(value, options = {}) {
  const text = String(value || "").trim() || "-";
  const copyValue = text === "-" ? "" : text;
  const className = String(options.className || "").trim();
  const personText = options.jump && copyValue
    ? `<button class="person-jump-button" type="button" data-person-jump="${escapeHtml(copyValue)}" title="查看 ${escapeHtml(copyValue)} 的拣选时间">${escapeHtml(text)}</button>`
    : `<span class="copyable-person-text">${escapeHtml(text)}</span>`;
  return `
    <span class="copyable-person-name${className ? ` ${escapeHtml(className)}` : ""}">
      ${personText}
      ${copyButtonHtml(copyValue, `复制人员 ${text}`)}
    </span>
  `;
}

function handleCopyValueButtonClick(event) {
  const copyButton = event.target.closest(".copy-value-button");
  if (!copyButton) return;
  event.preventDefault();
  event.stopPropagation();
  copyTextToClipboard(copyButton.dataset.copyValue || "");
  markCopyButtonCopied(copyButton);
}

function selectedTextForCopyShortcut() {
  const active = document.activeElement;
  if (active && typeof active.value === "string") {
    try {
      const start = active.selectionStart;
      const end = active.selectionEnd;
      if (typeof start === "number" && typeof end === "number" && end > start) {
        return active.value.slice(start, end);
      }
    } catch {
      // Some input types expose value but not text selection.
    }
  }
  return String(window.getSelection?.() || "");
}

function handleCopyShortcut(event) {
  if (event.defaultPrevented || event.altKey || event.shiftKey) return;
  if (!(event.metaKey || event.ctrlKey) || String(event.key || "").toLowerCase() !== "c") return;
  if (!selectedTextForCopyShortcut()) return;
  try {
    if (document.execCommand("copy")) event.preventDefault();
  } catch {
    // Let the browser or WebView default copy path run if execCommand is unavailable.
  }
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

async function api(path, body, options = {}) {
  const headers = body ? { "content-type": "application/json" } : {};
  if (state.authSession) headers["x-license-session"] = state.authSession;
  const timeoutMs = Math.max(0, Number(options.timeoutMs) || 0);
  const controller = timeoutMs ? new AbortController() : null;
  const timeoutId = controller
    ? window.setTimeout(() => controller.abort(), timeoutMs)
    : null;
  try {
    const primaryUrl = resolveApiUrl(path);
    const fallbackUrl = resolveHostedFallbackApiUrl(path, primaryUrl);
    const urls = fallbackUrl ? [primaryUrl, fallbackUrl] : [primaryUrl];
    let lastError = null;
    for (const url of urls) {
      try {
        const response = await fetch(url, {
          method: body ? "POST" : "GET",
          headers,
          body: body ? JSON.stringify(body) : undefined,
          signal: controller?.signal,
        });
        const data = await response.json();
        if (!response.ok) {
          const error = new Error(cleanErrorMessage(data.error, "请求失败"));
          error.status = response.status;
          throw error;
        }
        return data;
      } catch (error) {
        lastError = error;
        if (!fallbackUrl || url === fallbackUrl) throw error;
      }
    }
    throw lastError || new Error("请求失败");
  } catch (error) {
    if (controller?.signal.aborted) {
      throw new Error(
        options.timeoutMessage
        || `请求超过 ${Math.ceil(timeoutMs / 1000)} 秒，已停止`,
      );
    }
    if (error?.status) throw error;
    const fallbackData = staticWebFallbackData(path, body);
    if (fallbackData) return fallbackData;
    if (isHostedWebPage() && String(path || "").startsWith("/api/")) {
      throw new Error("网页版接口暂时不可用，请刷新页面后重试");
    }
    throw error;
  } finally {
    if (timeoutId) window.clearTimeout(timeoutId);
  }
}

function setWmsAccountNotice(text = "", error = false) {
  if (!el.wmsAccountNotice) return;
  const message = String(text || "").trim();
  el.wmsAccountNotice.hidden = !message;
  el.wmsAccountNotice.textContent = message;
  el.wmsAccountNotice.classList.toggle("is-error", Boolean(error));
}

function wmsAccountRecordRoleNames(record = {}) {
  const roleNames = (Array.isArray(record?.roles) ? record.roles : [])
    .map((role) => String(role?.roleName || role?.roleId || "").trim())
    .filter(Boolean);
  if (roleNames.length) return [...new Set(roleNames)];
  return [...new Set((Array.isArray(record?.roleIds) ? record.roleIds : [])
    .map((roleId) => String(roleId || "").trim())
    .filter(Boolean))];
}

function renderWmsAccountRecords() {
  if (!el.wmsAccountRecordsContent) return;
  if (el.wmsAccountRecordsMeta) {
    el.wmsAccountRecordsMeta.textContent = state.wmsAccountRecordsLoading
      ? "正在读取已验证的账号记录…"
      : state.wmsAccountRecordsError
        ? "记录读取失败"
        : `共 ${Number(state.wmsAccountRecordsTotal || 0).toLocaleString("zh-CN")} 条已验证记录`;
  }
  if (el.wmsAccountRecordsRefresh) {
    el.wmsAccountRecordsRefresh.disabled = state.wmsAccountRecordsLoading;
    el.wmsAccountRecordsRefresh.textContent = state.wmsAccountRecordsLoading ? "读取中…" : "刷新";
  }
  if (state.wmsAccountRecordsLoading && !state.wmsAccountRecords.length) {
    el.wmsAccountRecordsContent.innerHTML = '<div class="wms-account-records-status">正在读取账号创建记录…</div>';
    return;
  }
  if (state.wmsAccountRecordsError) {
    el.wmsAccountRecordsContent.innerHTML = `
      <div class="wms-account-records-status is-error">${escapeHtml(state.wmsAccountRecordsError)}</div>
    `;
    return;
  }
  if (!state.wmsAccountRecords.length) {
    el.wmsAccountRecordsContent.innerHTML = '<div class="wms-account-records-status">暂无创建记录</div>';
    return;
  }
  el.wmsAccountRecordsContent.innerHTML = `
    <div class="wms-account-records-table-wrap">
      <table class="wms-account-records-table">
        <thead>
          <tr>
            <th>创建时间</th>
            <th>用户账号</th>
            <th>用户名称</th>
            <th>用户角色</th>
            <th>密码状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${state.wmsAccountRecords.map((record, index) => {
            const roles = wmsAccountRecordRoleNames(record);
            return `
              <tr>
                <td>${escapeHtml(formatLocalDateTime(Number(record?.verifiedAt || record?.createdAt)))}</td>
                <td><strong>${escapeHtml(record?.userAccount || "-")}</strong></td>
                <td>${escapeHtml(record?.userName || "-")}</td>
                <td>${escapeHtml(roles.join("、") || "-")}</td>
                <td><span class="is-verified">已验证</span></td>
                <td>
                  <button class="wms-account-record-print" type="button" data-wms-account-record-print="${index}">重新打印</button>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

async function loadWmsAccountRecords(force = false) {
  if (state.wmsAccountRecordsLoading) {
    if (force) state.wmsAccountRecordsRefreshPending = true;
    return;
  }
  if (state.wmsAccountRecords.length && !force) {
    renderWmsAccountRecords();
    return;
  }
  state.wmsAccountRecordsLoading = true;
  state.wmsAccountRecordsError = "";
  renderWmsAccountRecords();
  try {
    const result = await api("/api/wms-account/records", null, {
      timeoutMs: 15_000,
      timeoutMessage: "读取账号创建记录超时，请重试",
    });
    state.wmsAccountRecords = Array.isArray(result?.records) ? result.records : [];
    state.wmsAccountRecordsTotal = Number(result?.total || state.wmsAccountRecords.length);
  } catch (error) {
    state.wmsAccountRecords = [];
    state.wmsAccountRecordsTotal = 0;
    state.wmsAccountRecordsError = cleanErrorMessage(error?.message, "读取账号创建记录失败");
  } finally {
    state.wmsAccountRecordsLoading = false;
    renderWmsAccountRecords();
    if (state.wmsAccountRecordsRefreshPending) {
      state.wmsAccountRecordsRefreshPending = false;
      void loadWmsAccountRecords(true);
    }
  }
}

function openWmsAccountRecordsModal() {
  if (!el.wmsAccountRecordsModal) return;
  state.wmsAccountRecordsOpen = true;
  el.wmsAccountRecordsModal.hidden = false;
  renderWmsAccountRecords();
  void loadWmsAccountRecords(true);
}

function closeWmsAccountRecordsModal() {
  if (!el.wmsAccountRecordsModal) return;
  state.wmsAccountRecordsOpen = false;
  el.wmsAccountRecordsModal.hidden = true;
}

function reprintWmsAccountRecord(index) {
  const record = state.wmsAccountRecords[Number(index)];
  if (!record) return;
  const opened = printWmsAccountCredential({
    userAccount: String(record?.userAccount || "").trim(),
    userName: String(record?.userName || "").trim(),
    roleIds: Array.isArray(record?.roleIds) ? record.roleIds : [],
    password: WMS_ACCOUNT_FIXED_PASSWORD,
    passwordVerified: true,
    passwordSource: "fixed_verified",
  });
  if (!opened) {
    setStatus("打印窗口未能打开，请允许打印窗口后重试", true);
  }
}

function selectedWmsAccountRoleIds() {
  return Array.from(el.wmsAccountRoleList?.querySelectorAll("input[data-wms-role-id]:checked") || [])
    .map((input) => String(input.dataset.wmsRoleId || "").trim())
    .filter(Boolean);
}

function updateWmsAccountSubmitAvailability() {
  if (!el.wmsAccountSubmit) return;
  const hasRoles = state.wmsAccountRoles.length > 0;
  el.wmsAccountSubmit.disabled = state.wmsAccountRolesLoading || state.wmsAccountSubmitting || !hasRoles;
  el.wmsAccountSubmit.textContent = state.wmsAccountSubmitting
    ? "正在创建并设置密码…"
    : state.wmsAccountLastCreated
      ? "重新打印"
      : "确认并打印";
  if (el.wmsAccountClose) el.wmsAccountClose.disabled = state.wmsAccountSubmitting;
}

function renderWmsAccountRoles() {
  if (!el.wmsAccountRoleList) return;
  if (state.wmsAccountRolesLoading) {
    el.wmsAccountRoleList.innerHTML = '<p class="wms-account-role-status">正在从 WMS 接口读取角色…</p>';
    updateWmsAccountSubmitAvailability();
    return;
  }
  if (!state.wmsAccountRoles.length) {
    el.wmsAccountRoleList.innerHTML = '<p class="wms-account-role-status is-error">没有读取到可用角色</p>';
    updateWmsAccountSubmitAvailability();
    return;
  }
  const selectedRoleIds = new Set(
    (Array.isArray(state.wmsAccountLastCreated?.roleIds) ? state.wmsAccountLastCreated.roleIds : [])
      .map((roleId) => String(roleId || "").trim())
      .filter(Boolean),
  );
  el.wmsAccountRoleList.innerHTML = state.wmsAccountRoles.map((role) => {
    const roleId = String(role?.roleId || "").trim();
    const roleName = String(role?.roleName || roleId).trim();
    const roleDesc = String(role?.roleDesc || "").trim();
    return `
      <label class="wms-account-role-option">
        <input type="checkbox" data-wms-role-id="${escapeHtml(roleId)}" ${selectedRoleIds.has(roleId) ? "checked" : ""}>
        <span>
          <strong>${escapeHtml(roleName)}</strong>
          ${roleDesc ? `<small>${escapeHtml(roleDesc)}</small>` : ""}
        </span>
      </label>
    `;
  }).join("");
  updateWmsAccountSubmitAvailability();
}

async function loadWmsAccountRoles(force = false) {
  if (state.wmsAccountRolesLoading) return;
  if (state.wmsAccountRoles.length && !force) {
    renderWmsAccountRoles();
    return;
  }
  state.wmsAccountRolesLoading = true;
  setWmsAccountNotice("");
  renderWmsAccountRoles();
  try {
    const result = await api("/api/wms-account/roles", null, {
      timeoutMs: 35_000,
      timeoutMessage: "读取 WMS 用户角色超时，请重试",
    });
    state.wmsAccountRoles = Array.isArray(result?.roles) ? result.roles : [];
    if (!state.wmsAccountRoles.length) throw new Error("WMS 没有返回可用角色");
  } catch (error) {
    state.wmsAccountRoles = [];
    setWmsAccountNotice(cleanErrorMessage(error?.message, "读取 WMS 用户角色失败"), true);
  } finally {
    state.wmsAccountRolesLoading = false;
    renderWmsAccountRoles();
  }
}

function resetWmsAccountCreatedResult() {
  if (!state.wmsAccountLastCreated) return;
  state.wmsAccountLastCreated = null;
  try { window.localStorage.removeItem(WMS_ACCOUNT_LAST_CREATED_STORAGE_KEY); } catch {}
  setWmsAccountNotice("");
  updateWmsAccountSubmitAvailability();
}

function isVerifiedWmsAccountResult(result) {
  return Boolean(
    String(result?.userAccount || "").trim()
    && String(result?.password || "") === WMS_ACCOUNT_FIXED_PASSWORD
    && result?.passwordVerified === true
    && String(result?.passwordSource || "") === "fixed_verified",
  );
}

function storedWmsAccountCreatedResult() {
  try {
    WMS_ACCOUNT_LEGACY_STORAGE_KEYS.forEach((storageKey) => window.localStorage.removeItem(storageKey));
    const result = JSON.parse(window.localStorage.getItem(WMS_ACCOUNT_LAST_CREATED_STORAGE_KEY) || "null");
    const verifiedResult = result ? { ...result, password: WMS_ACCOUNT_FIXED_PASSWORD } : null;
    const verifiedAt = Number(result?.verifiedAt || 0);
    if (
      !isVerifiedWmsAccountResult(verifiedResult)
      || !Number.isFinite(verifiedAt)
      || Date.now() - verifiedAt > WMS_ACCOUNT_REPRINT_TTL_MS
    ) {
      window.localStorage.removeItem(WMS_ACCOUNT_LAST_CREATED_STORAGE_KEY);
      return null;
    }
    return {
      ...result,
      userAccount: String(result.userAccount).trim(),
      password: WMS_ACCOUNT_FIXED_PASSWORD,
      userName: String(result?.userName || "").trim(),
      roleIds: Array.isArray(result?.roleIds) ? result.roleIds.map(String) : [],
    };
  } catch {
    return null;
  }
}

function storeWmsAccountCreatedResult(result) {
  if (!isVerifiedWmsAccountResult(result)) return false;
  try {
    window.localStorage.setItem(WMS_ACCOUNT_LAST_CREATED_STORAGE_KEY, JSON.stringify({
      userAccount: String(result?.userAccount || "").trim(),
      userName: String(result?.userName || "").trim(),
      roleIds: Array.isArray(result?.roleIds) ? result.roleIds : [],
      passwordSource: "fixed_verified",
      passwordVerified: true,
      verifiedAt: Number(result?.verifiedAt || Date.now()),
    }));
    return true;
  } catch {
    return false;
  }
}

function openWmsAccountModal() {
  if (!el.wmsAccountModal) return;
  state.wmsAccountModalOpen = true;
  state.wmsAccountLastCreated = storedWmsAccountCreatedResult();
  el.wmsAccountModal.hidden = false;
  el.wmsAccountForm?.reset();
  if (state.wmsAccountLastCreated) {
    if (el.wmsAccountUserAccount) el.wmsAccountUserAccount.value = state.wmsAccountLastCreated.userAccount;
    if (el.wmsAccountUserName) el.wmsAccountUserName.value = state.wmsAccountLastCreated.userName;
    setWmsAccountNotice(`账号 ${state.wmsAccountLastCreated.userAccount} 已创建，可直接重新打印`);
  } else {
    setWmsAccountNotice("");
  }
  renderWmsAccountRoles();
  void loadWmsAccountRoles();
  window.setTimeout(() => el.wmsAccountUserAccount?.focus(), 0);
}

function closeWmsAccountModal() {
  if (!el.wmsAccountModal || state.wmsAccountSubmitting) return;
  state.wmsAccountModalOpen = false;
  state.wmsAccountLastCreated = null;
  el.wmsAccountModal.hidden = true;
  setWmsAccountNotice("");
}

function wmsAccountCredentialPrintHtml(result) {
  if (!isVerifiedWmsAccountResult(result)) return "";
  const userAccount = String(result?.userAccount || "").trim();
  const password = String(result?.password || "").trim();
  const accountQr = new URL(
    withLicenseSession(`/api/qr?code=${encodeURIComponent(userAccount)}`),
    window.location.href,
  ).href;
  const passwordQr = new URL(
    withLicenseSession(`/api/qr?code=${encodeURIComponent(password)}`),
    window.location.href,
  ).href;
  const nativePrint = Boolean(window.webkit?.messageHandlers?.macPrint);
  const browserScript = nativePrint ? "" : `
    <script>
      (() => {
        const printNow = () => { window.focus(); window.print(); };
        const images = Array.from(document.images || []);
        if (!images.some((image) => !image.complete)) setTimeout(printNow, 180);
        else Promise.all(images.map((image) => image.complete ? Promise.resolve() : new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        }))).then(() => setTimeout(printNow, 180));
        window.addEventListener("afterprint", () => setTimeout(() => window.close(), 120));
      })();
    </script>`;
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>WMS账号_${escapeHtml(userAccount)}</title>
  <style>
    @page { size: 4in 6in; margin: 0; }
    * { box-sizing: border-box; }
    html, body { margin: 0; width: 4in; height: 6in; overflow: hidden; background: #fff; color: #111820; }
    body { padding: .18in; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", sans-serif; }
    main { width: 100%; height: 100%; display: grid; grid-template-rows: 1fr 1fr; gap: .12in; }
    section { min-height: 0; border: 2px solid #172126; border-radius: .12in; padding: .12in .16in; display: grid; grid-template-columns: minmax(0, 1fr) 1.62in; grid-template-rows: auto 1fr; column-gap: .12in; align-items: center; overflow: hidden; }
    h1 { grid-column: 1 / -1; margin: 0 0 .04in; font-size: 17pt; line-height: 1; }
    .value { min-width: 0; font-size: 22pt; line-height: 1.08; font-weight: 950; overflow-wrap: anywhere; }
    .password .value { font-size: 26pt; }
    img { width: 1.58in; height: 1.58in; object-fit: contain; image-rendering: pixelated; }
  </style>
</head>
<body>
  <main>
    <section class="account">
      <h1>用户账号</h1>
      <div class="value">${escapeHtml(userAccount)}</div>
      <img src="${escapeHtml(accountQr)}" alt="用户账号二维码">
    </section>
    <section class="password">
      <h1>密码</h1>
      <div class="value">${escapeHtml(password)}</div>
      <img src="${escapeHtml(passwordQr)}" alt="密码二维码">
    </section>
  </main>
  ${browserScript}
</body>
</html>`;
}

function printWmsAccountCredential(result) {
  if (!isVerifiedWmsAccountResult(result)) return false;
  const userAccount = String(result?.userAccount || "").trim();
  const password = String(result?.password || "").trim();
  if (!userAccount || !password) return false;
  const title = `WMS账号_${userAccount}`;
  const nativePrint = window.webkit?.messageHandlers?.macPrint;
  if (nativePrint) {
    try {
      nativePrint.postMessage({
        type: "account",
        title,
        userAccount,
        password,
        licenseSession: state.authSession,
      });
      return true;
    } catch {
      // Continue with the browser print fallback.
    }
  }
  const html = wmsAccountCredentialPrintHtml(result);
  const printWindow = window.open("", title, "popup,width=520,height=820");
  if (!printWindow?.document) {
    try { printWindow?.close(); } catch {}
    return false;
  }
  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  return true;
}

const CODE128_PATTERNS = [
  "212222","222122","222221","121223","121322","131222","122213","122312","132212","221213","221312","231212",
  "112232","122132","122231","113222","123122","123221","223211","221132","221231","213212","223112","312131",
  "311222","321122","321221","312212","322112","322211","212123","212321","232121","111323","131123","131321",
  "112313","132113","132311","211313","231113","231311","112133","112331","132131","113123","113321","133121",
  "313121","211331","231131","213113","213311","213131","311123","311321","331121","312113","312311","332111",
  "314111","221411","431111","111224","111422","121124","121421","141122","141221","112214","112412","122114",
  "122411","142112","142211","241211","221114","413111","241112","134111","111242","121142","121241","114212",
  "124112","124211","411212","421112","421211","212141","214121","412121","111143","111341","131141","114113",
  "114311","411113","411311","113141","114131","311141","411131","211412","211214","211232","2331112",
];

function code128BValues(text) {
  const value = String(text || "");
  if (!value) throw new Error("请输入条码内容");
  const data = [...value].map((character) => {
    const code = character.charCodeAt(0);
    if (code < 32 || code > 126) throw new Error("Code 128 条码仅支持英文、数字和常用英文符号");
    return code - 32;
  });
  let checksum = 104;
  data.forEach((code, index) => { checksum += code * (index + 1); });
  return [104, ...data, checksum % 103, 106];
}

function code128SvgMarkup(text, className = "") {
  const patterns = code128BValues(text).map((value) => CODE128_PATTERNS[value]);
  const quietZone = 12;
  const patternWidth = patterns.reduce((sum, pattern) => (
    sum + [...pattern].reduce((width, digit) => width + Number(digit), 0)
  ), 0);
  const totalWidth = patternWidth + quietZone * 2;
  let x = quietZone;
  const bars = [];
  patterns.forEach((pattern) => {
    [...pattern].forEach((digit, index) => {
      const width = Number(digit);
      if (index % 2 === 0) bars.push(`<rect x="${x}" y="0" width="${width}" height="100"/>`);
      x += width;
    });
  });
  return `<svg${className ? ` class="${escapeHtml(className)}"` : ""} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} 100" preserveAspectRatio="none" role="img" aria-label="Code 128 条码"><rect width="${totalWidth}" height="100" fill="#fff"/><g fill="#000">${bars.join("")}</g></svg>`;
}

function barcodeGeneratorValue() {
  return String(el.barcodeGeneratorInput?.value || "").trim();
}

function syncBarcodeGeneratorQuantity() {
  const quantity = Math.max(1, Math.min(500, Math.trunc(Number(state.barcodeGeneratorQuantity) || 1)));
  state.barcodeGeneratorQuantity = quantity;
  el.barcodeGeneratorQuickQuantity?.querySelectorAll("[data-barcode-quantity]").forEach((button) => {
    button.classList.toggle("is-selected", Number(button.dataset.barcodeQuantity) === quantity);
  });
  if (el.barcodeGeneratorQuantityStatus) el.barcodeGeneratorQuantityStatus.textContent = `已确认：${quantity} 份`;
}

function renderBarcodeGeneratorPreview() {
  if (!el.barcodeGeneratorPreview) return;
  const value = barcodeGeneratorValue();
  if (el.barcodeGeneratorNotice) el.barcodeGeneratorNotice.textContent = "";
  if (!value) {
    el.barcodeGeneratorPreview.innerHTML = "<span>输入内容后显示条码</span>";
    if (el.barcodeGeneratorPrint) el.barcodeGeneratorPrint.disabled = true;
    return;
  }
  try {
    el.barcodeGeneratorPreview.innerHTML = `
      <div class="barcode-generator-label-preview">
        ${code128SvgMarkup(value)}
        <strong>${escapeHtml(value)}</strong>
      </div>
    `;
    if (el.barcodeGeneratorPrint) el.barcodeGeneratorPrint.disabled = false;
  } catch (error) {
    el.barcodeGeneratorPreview.innerHTML = "<span>无法生成预览</span>";
    if (el.barcodeGeneratorNotice) el.barcodeGeneratorNotice.textContent = error.message || "条码内容无效";
    if (el.barcodeGeneratorPrint) el.barcodeGeneratorPrint.disabled = true;
  }
}

function openBarcodeGeneratorModal() {
  if (!el.barcodeGeneratorModal) return;
  state.barcodeGeneratorOpen = true;
  state.barcodeGeneratorQuantity = 1;
  el.barcodeGeneratorModal.hidden = false;
  if (el.barcodeGeneratorInput) el.barcodeGeneratorInput.value = "";
  if (el.barcodeGeneratorCustomQuantity) el.barcodeGeneratorCustomQuantity.value = "";
  syncBarcodeGeneratorQuantity();
  renderBarcodeGeneratorPreview();
  window.setTimeout(() => el.barcodeGeneratorInput?.focus(), 0);
}

function closeBarcodeGeneratorModal() {
  state.barcodeGeneratorOpen = false;
  if (el.barcodeGeneratorModal) el.barcodeGeneratorModal.hidden = true;
}

function confirmBarcodeGeneratorCustomQuantity() {
  const quantity = Math.trunc(Number(el.barcodeGeneratorCustomQuantity?.value));
  if (!Number.isFinite(quantity) || quantity < 6 || quantity > 500) {
    if (el.barcodeGeneratorNotice) el.barcodeGeneratorNotice.textContent = "请输入 6–500 的打印数量，并按回车确认";
    return false;
  }
  state.barcodeGeneratorQuantity = quantity;
  if (el.barcodeGeneratorNotice) el.barcodeGeneratorNotice.textContent = "";
  syncBarcodeGeneratorQuantity();
  return true;
}

function barcodePrintDocument(value, quantity) {
  const page = `
    <section class="label">
      ${code128SvgMarkup(value)}
      <strong>${escapeHtml(value)}</strong>
    </section>
  `;
  return `<!doctype html><html><head><meta charset="utf-8"><title>条码_${escapeHtml(value)}</title><style>
    @page { size: 6in 4in landscape; margin: 0; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #fff; color: #000; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    .label { width: 6in; height: 4in; padding: .18in .22in; display: grid; grid-template-rows: minmax(0, 1fr) auto; gap: .12in; align-items: stretch; page-break-after: always; overflow: hidden; }
    .label:last-child { page-break-after: auto; }
    svg { width: 100%; height: 100%; min-height: 0; }
    strong { display: block; text-align: center; font-size: 28pt; line-height: 1.05; font-weight: 900; overflow-wrap: anywhere; }
  </style></head><body>${Array.from({ length: quantity }, () => page).join("")}<script>
    window.addEventListener("load", () => setTimeout(() => { window.focus(); window.print(); }, 160));
    window.addEventListener("afterprint", () => setTimeout(() => window.close(), 100));
  </script></body></html>`;
}

function printGeneratedBarcode() {
  const value = barcodeGeneratorValue();
  try {
    code128BValues(value);
  } catch (error) {
    if (el.barcodeGeneratorNotice) el.barcodeGeneratorNotice.textContent = error.message || "条码内容无效";
    return;
  }
  const quantity = state.barcodeGeneratorQuantity;
  const printWindow = window.open("", `条码_${Date.now()}`, "popup,width=900,height=650");
  if (!printWindow?.document) {
    if (el.barcodeGeneratorNotice) el.barcodeGeneratorNotice.textContent = "打印窗口打开失败";
    return;
  }
  printWindow.document.open();
  printWindow.document.write(barcodePrintDocument(value, quantity));
  printWindow.document.close();
}

async function submitWmsAccountForm(event) {
  event?.preventDefault();
  if (state.wmsAccountSubmitting) return;
  if (state.wmsAccountLastCreated) {
    const opened = printWmsAccountCredential(state.wmsAccountLastCreated);
    setWmsAccountNotice(
      opened ? "账号已创建，已重新打开 4×6 打印" : "账号已创建，但打印窗口未能打开，请允许打印窗口后重试",
      !opened,
    );
    return;
  }
  const userAccount = String(el.wmsAccountUserAccount?.value || "").trim().toLowerCase();
  const userName = String(el.wmsAccountUserName?.value || "").trim();
  const roleIds = selectedWmsAccountRoleIds();
  if (!userAccount) {
    setWmsAccountNotice("请输入用户账号", true);
    el.wmsAccountUserAccount?.focus();
    return;
  }
  if (!userName) {
    setWmsAccountNotice("请输入用户名称", true);
    el.wmsAccountUserName?.focus();
    return;
  }
  if (!roleIds.length) {
    setWmsAccountNotice("请至少选择一个用户角色", true);
    return;
  }

  state.wmsAccountSubmitting = true;
  setWmsAccountNotice("正在创建 WMS 账号、设置固定密码并登录验证…");
  updateWmsAccountSubmitAvailability();
  try {
    const result = await api("/api/wms-account/create", { userAccount, userName, roleIds }, {
      timeoutMs: 150_000,
      timeoutMessage: "WMS 创建账号或固定密码登录验证超时；已停止打印，请先确认账号状态",
    });
    const verifiedResult = {
      ...result,
      password: WMS_ACCOUNT_FIXED_PASSWORD,
      verifiedAt: Number(result?.verifiedAt) || Date.now(),
    };
    if (!isVerifiedWmsAccountResult(verifiedResult)) {
      throw new Error("WMS 没有返回固定密码登录验证结果，已停止打印");
    }
    if (Array.isArray(result?.nightShiftRosterNames)) {
      state.nightRosterNames = result.nightShiftRosterNames;
      if (el.nightRosterText) el.nightRosterText.value = state.nightRosterNames.join("\n");
      updateRosterCount();
    }
    state.wmsAccountLastCreated = verifiedResult;
    storeWmsAccountCreatedResult(verifiedResult);
    state.wmsAccountRecords = [];
    state.wmsAccountRecordsTotal = 0;
    state.wmsAccountRecordsError = "";
    if (state.wmsAccountRecordsOpen) void loadWmsAccountRecords(true);
    const opened = printWmsAccountCredential(verifiedResult);
    const rosterError = String(result?.nightShiftRosterError || "").trim();
    setWmsAccountNotice(
      rosterError
        ? `账号 ${result.userAccount} 已创建并验证，但用户账号加入本班次名单失败：${rosterError}`
        : opened
        ? `账号 ${result.userAccount} 已创建，固定密码已通过 WMS 登录验证，已打开 4×6 打印`
        : `账号 ${result.userAccount} 已创建，固定密码已通过 WMS 登录验证；打印未打开，请点击“重新打印”`,
      Boolean(rosterError) || !opened,
    );
  } catch (error) {
    setWmsAccountNotice(cleanErrorMessage(error?.message, "创建 WMS 账号失败"), true);
  } finally {
    state.wmsAccountSubmitting = false;
    updateWmsAccountSubmitAvailability();
  }
}

function releaseAssistantWaveZoneKey(value) {
  return String(value || "").trim().toUpperCase();
}

function renderReleaseAssistantWaveZones(zones, message = "", operators = ["相等", "包含", "不包含", "完全包含"]) {
  if (!el.releaseAssistantWaveZoneList) return;
  const items = Array.isArray(zones) ? zones : [];
  if (el.releaseAssistantWaveOperatorList) {
    el.releaseAssistantWaveOperatorList.innerHTML = `
      <span>筛选条件</span>
      <div class="release-assistant-wave-filter-options">
        ${(Array.isArray(operators) ? operators : []).map((operator) => `
          <button
            class="${state.releaseAssistantWaveOperator === operator ? "is-selected" : ""}"
            type="button"
            data-release-wave-operator="${escapeHtml(operator)}"
            aria-pressed="${state.releaseAssistantWaveOperator === operator ? "true" : "false"}"
          >${escapeHtml(operator)}</button>
        `).join("")}
      </div>
      <div class="release-assistant-wave-command-buttons">
        <button id="releaseAssistantWaveQuery" class="release-assistant-wave-query-button" type="button">查询</button>
        <button id="releaseAssistantWaveReset" class="release-assistant-wave-reset-button" type="button">重置</button>
        <button id="releaseAssistantWaveManage" class="release-assistant-wave-manage-button" type="button">波次管理</button>
        <button id="releaseAssistantCancelPickOrders" class="release-assistant-wave-cancel-pick-button" type="button">拣选单管理</button>
      </div>
    `;
  }
  el.releaseAssistantWaveZoneList.innerHTML = `
    <span>库区</span>
    <div class="release-assistant-wave-zone-options">
      ${items.map((zone) => {
        const selected = state.releaseAssistantSelectedWaveZones.has(zone);
        const activeSinglePicking = state.releaseAssistantActiveSinglePickingZones.has(
          releaseAssistantWaveZoneKey(zone),
        );
        const assignedSingle = state.releaseAssistantAssignedSingleZones.has(
          releaseAssistantWaveZoneKey(zone),
        );
        const statusTitle = [
          activeSinglePicking ? "拣选中普通单件" : "",
          assignedSingle ? "已分配普通单件" : "",
        ].filter(Boolean).join("、");
        return `
          <button
            class="${selected ? "is-selected" : ""}${activeSinglePicking ? " is-active-single-picking" : ""}${assignedSingle ? " is-assigned-single" : ""}${String(zone).length > 5 ? " is-wide" : ""}"
            type="button"
            data-release-wave-zone="${escapeHtml(zone)}"
            aria-pressed="${selected ? "true" : "false"}"
            ${statusTitle ? `title="当前有${escapeHtml(statusTitle)}"` : ""}
          >${escapeHtml(zone)}</button>
        `;
      }).join("")}
      ${message ? `<em>${escapeHtml(message)}</em>` : ""}
    </div>
  `;
  syncReleaseAssistantWaveQueryButton();
}

function syncReleaseAssistantWaveSelections() {
  el.releaseAssistantWaveOperatorList?.querySelectorAll("[data-release-wave-operator]").forEach((button) => {
    const selected = button.dataset.releaseWaveOperator === state.releaseAssistantWaveOperator;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });
  el.releaseAssistantWaveZoneList?.querySelectorAll("[data-release-wave-zone]").forEach((button) => {
    const selected = state.releaseAssistantSelectedWaveZones.has(button.dataset.releaseWaveZone || "");
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });
}

function handleReleaseAssistantWaveSelection(event) {
  if (event.target.closest("#releaseAssistantWaveQuery")) {
    queryReleaseAssistantWaveSummary();
    return;
  }
  if (event.target.closest("#releaseAssistantWaveReset")) {
    resetReleaseAssistantWaveSelections();
    return;
  }
  if (event.target.closest("#releaseAssistantWaveManage")) {
    openReleaseAssistantWaveManage();
    return;
  }
  if (event.target.closest("#releaseAssistantCancelPickOrders")) {
    openReleaseAssistantCancelPickOrders();
    return;
  }
  const operatorButton = event.target.closest("[data-release-wave-operator]");
  if (operatorButton) {
    const operator = operatorButton.dataset.releaseWaveOperator || "";
    state.releaseAssistantWaveOperator = state.releaseAssistantWaveOperator === operator ? "" : operator;
    syncReleaseAssistantWaveSelections();
    return;
  }
  const zoneButton = event.target.closest("[data-release-wave-zone]");
  if (!zoneButton) return;
  if (state.releaseAssistantWaveZoneSuppressClick) {
    state.releaseAssistantWaveZoneSuppressClick = false;
    event.preventDefault();
    return;
  }
  const zone = zoneButton.dataset.releaseWaveZone || "";
  if (!zone) return;
  if (state.releaseAssistantSelectedWaveZones.has(zone)) {
    state.releaseAssistantSelectedWaveZones.delete(zone);
  } else {
    state.releaseAssistantSelectedWaveZones.add(zone);
  }
  syncReleaseAssistantWaveSelections();
}

function applyReleaseAssistantWaveZoneDragSelection(button) {
  const zone = button?.dataset?.releaseWaveZone || "";
  if (!zone || state.releaseAssistantWaveZoneDragVisited.has(zone)) return;
  state.releaseAssistantWaveZoneDragVisited.add(zone);
  if (state.releaseAssistantWaveZoneDragSelecting) {
    state.releaseAssistantSelectedWaveZones.add(zone);
  } else {
    state.releaseAssistantSelectedWaveZones.delete(zone);
  }
  button.classList.toggle("is-selected", state.releaseAssistantWaveZoneDragSelecting);
  button.setAttribute("aria-pressed", state.releaseAssistantWaveZoneDragSelecting ? "true" : "false");
}

function handleReleaseAssistantWaveZonePointerDown(event) {
  const button = event.target.closest("[data-release-wave-zone]");
  if (
    !button
    || event.button !== 0
    || (event.pointerType && event.pointerType !== "mouse")
  ) return;
  const zone = button.dataset.releaseWaveZone || "";
  if (!zone) return;
  event.preventDefault();
  state.releaseAssistantWaveZoneDragActive = true;
  state.releaseAssistantWaveZoneDragSelecting = !state.releaseAssistantSelectedWaveZones.has(zone);
  state.releaseAssistantWaveZoneDragPointerId = event.pointerId;
  state.releaseAssistantWaveZoneDragVisited.clear();
  el.releaseAssistantWaveZoneList?.classList.add("is-dragging");
  applyReleaseAssistantWaveZoneDragSelection(button);
}

function handleReleaseAssistantWaveZonePointerMove(event) {
  if (
    !state.releaseAssistantWaveZoneDragActive
    || event.pointerId !== state.releaseAssistantWaveZoneDragPointerId
  ) return;
  if ((event.buttons & 1) !== 1) {
    finishReleaseAssistantWaveZoneDrag(event);
    return;
  }
  const button = event.target.closest("[data-release-wave-zone]");
  if (button && el.releaseAssistantWaveZoneList?.contains(button)) {
    applyReleaseAssistantWaveZoneDragSelection(button);
  }
}

function finishReleaseAssistantWaveZoneDrag(event) {
  if (
    !state.releaseAssistantWaveZoneDragActive
    || (
      event?.pointerId != null
      && event.pointerId !== state.releaseAssistantWaveZoneDragPointerId
    )
  ) return;
  state.releaseAssistantWaveZoneDragActive = false;
  state.releaseAssistantWaveZoneDragPointerId = null;
  state.releaseAssistantWaveZoneDragVisited.clear();
  state.releaseAssistantWaveZoneSuppressClick = true;
  el.releaseAssistantWaveZoneList?.classList.remove("is-dragging");
  window.setTimeout(() => {
    state.releaseAssistantWaveZoneSuppressClick = false;
  }, 0);
}

function resetReleaseAssistantWaveSelections() {
  if (
    state.releaseAssistantWaveQueryLoading
    || state.releaseAssistantWaveBatchSummaryLoading
    || state.releaseAssistantWaveReleaseLoading
    || state.releaseAssistantWaveConfirmationActionLoading
  ) return;
  state.releaseAssistantWaveOperator = "";
  state.releaseAssistantSelectedWaveZones.clear();
  state.releaseAssistantReleaseMode = "";
  state.releaseAssistantWaveQueryKey = "";
  state.releaseAssistantWaveQueryExpiresAt = 0;
  state.releaseAssistantWaveTotalPackages = 0;
  state.releaseAssistantWaveBatchSummaryMessage = "";
  state.releaseAssistantWaveReleaseMessage = "";
  state.releaseAssistantWaveReleaseError = false;
  state.releaseAssistantWaveSummaryData = null;
  clearReleaseAssistantWaveConfirmation();
  syncReleaseAssistantWaveSelections();
  syncReleaseAssistantReleaseModeSelection();
  if (el.releaseAssistantWaveResult) {
    el.releaseAssistantWaveResult.innerHTML = "";
    el.releaseAssistantWaveResult.hidden = true;
    el.releaseAssistantWaveResult.classList.remove("is-error");
  }
  syncReleaseAssistantWaveQueryButton();
}

async function loadReleaseAssistantWaveZones(force = false) {
  if (state.releaseAssistantWaveZonesLoading) return;
  if (state.releaseAssistantWaveZonesLoaded && !force) return;
  let zoneLoadError = "";
  state.releaseAssistantWaveZonesLoading = true;
  syncReleaseAssistantWaveZoneRefreshState();
  renderReleaseAssistantWaveZones([], "正在从 WMS 接口读取…");
  try {
    const data = await api(`/api/release-assistant/wave-zone-options${force ? `?refresh=${Date.now()}` : ""}`);
    const zones = Array.isArray(data.zones) ? data.zones : [];
    const operators = Array.isArray(data.operators) ? data.operators : [];
    const activeSinglePickingZonesError = String(data.activeSinglePickingZonesError || "").trim();
    const currentZoneKeys = new Set(zones.map(releaseAssistantWaveZoneKey).filter(Boolean));
    if (activeSinglePickingZonesError) {
      state.releaseAssistantActiveSinglePickingZones = new Set(
        [...state.releaseAssistantActiveSinglePickingZones].filter((zone) => currentZoneKeys.has(zone)),
      );
      state.releaseAssistantAssignedSingleZones = new Set(
        [...state.releaseAssistantAssignedSingleZones].filter((zone) => currentZoneKeys.has(zone)),
      );
    } else {
      state.releaseAssistantActiveSinglePickingZones = new Set(
        (Array.isArray(data.pickingSingleZones) ? data.pickingSingleZones : [])
          .map(releaseAssistantWaveZoneKey)
          .filter((zone) => zone && currentZoneKeys.has(zone)),
      );
      state.releaseAssistantAssignedSingleZones = new Set(
        (Array.isArray(data.assignedSingleZones) ? data.assignedSingleZones : [])
          .map(releaseAssistantWaveZoneKey)
          .filter((zone) => zone && currentZoneKeys.has(zone)),
      );
    }
    state.releaseAssistantActiveSinglePickingZonesError = activeSinglePickingZonesError;
    if (!operators.includes(state.releaseAssistantWaveOperator)) state.releaseAssistantWaveOperator = "";
    const activeZones = new Set(zones);
    state.releaseAssistantSelectedWaveZones.forEach((zone) => {
      if (!activeZones.has(zone)) state.releaseAssistantSelectedWaveZones.delete(zone);
    });
    state.releaseAssistantWaveZonesLoaded = true;
    renderReleaseAssistantWaveZones(zones, zones.length ? "" : "WMS 未返回库区", operators);
  } catch (error) {
    zoneLoadError = error.message || "WMS 库区读取失败";
    renderReleaseAssistantWaveZones([], zoneLoadError);
  } finally {
    state.releaseAssistantWaveZonesLoading = false;
    syncReleaseAssistantWaveZoneRefreshState();
    if (el.releaseAssistantWaveZoneRefresh) {
      el.releaseAssistantWaveZoneRefresh.title = zoneLoadError
        ? `WMS 库区刷新失败：${zoneLoadError}`
        : state.releaseAssistantActiveSinglePickingZonesError
          ? `WMS 库区已刷新；已分配/拣选中普通单件库区刷新失败：${state.releaseAssistantActiveSinglePickingZonesError}`
          : "刷新 WMS 库区及已分配/拣选中普通单件库区";
    }
  }
}

function syncReleaseAssistantReleaseModeSelection() {
  el.releaseAssistantReleaseModeButtons?.querySelectorAll("[data-release-mode]").forEach((button) => {
    const selected = button.dataset.releaseMode === state.releaseAssistantReleaseMode;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });
}

function handleReleaseAssistantReleaseModeSelection(event) {
  const button = event.target.closest("[data-release-mode]");
  if (!button) return;
  state.releaseAssistantReleaseMode = button.dataset.releaseMode || "";
  syncReleaseAssistantReleaseModeSelection();
}

function syncReleaseAssistantWaveQueryButton() {
  const button = el.releaseAssistantWaveOperatorList?.querySelector("#releaseAssistantWaveQuery");
  if (button) {
    button.disabled = state.releaseAssistantWaveQueryLoading
      || state.releaseAssistantWaveBatchSummaryLoading
      || state.releaseAssistantWaveReleaseLoading
      || Boolean(state.releaseAssistantWaveConfirmationActionLoading);
    button.textContent = state.releaseAssistantWaveQueryLoading ? "查询中…" : "查询";
  }
  const resetButton = el.releaseAssistantWaveOperatorList?.querySelector("#releaseAssistantWaveReset");
  if (resetButton) {
    resetButton.disabled = state.releaseAssistantWaveQueryLoading
      || state.releaseAssistantWaveBatchSummaryLoading
      || state.releaseAssistantWaveReleaseLoading
      || Boolean(state.releaseAssistantWaveConfirmationActionLoading);
  }
}

function syncReleaseAssistantWaveBatchSummaryButton() {
  const button = el.releaseAssistantWaveResult?.querySelector("#releaseAssistantWaveBatchSummary");
  if (button) {
    button.disabled = state.releaseAssistantWaveBatchSummaryLoading
      || state.releaseAssistantWaveReleaseLoading
      || !state.releaseAssistantWaveQueryKey
      || state.releaseAssistantWaveBatchSummarySubmittedKeys.has(state.releaseAssistantWaveQueryKey)
      || state.releaseAssistantWaveTotalPackages <= 0;
    button.textContent = state.releaseAssistantWaveBatchSummaryLoading ? "汇总中…" : "批量汇总";
  }
  const releaseButton = el.releaseAssistantWaveResult?.querySelector("#releaseAssistantWaveRelease");
  if (releaseButton) {
    releaseButton.disabled = state.releaseAssistantWaveReleaseLoading
      || state.releaseAssistantWaveQueryLoading
      || state.releaseAssistantWaveBatchSummaryLoading
      || Boolean(state.releaseAssistantWaveConfirmationActionLoading)
      || !state.releaseAssistantWaveQueryKey
      || state.releaseAssistantWaveTotalPackages <= 0;
    releaseButton.textContent = state.releaseAssistantWaveReleaseLoading ? "放单中…" : "放单";
  }
}

function clearReleaseAssistantWaveConfirmation() {
  state.releaseAssistantWaveConfirmationRequestId += 1;
  state.releaseAssistantWaveConfirmationNo = "";
  state.releaseAssistantWaveConfirmationLoading = false;
  state.releaseAssistantWaveConfirmationRow = null;
  state.releaseAssistantWaveConfirmationError = "";
  state.releaseAssistantWaveConfirmationActionRequestId += 1;
  state.releaseAssistantWaveConfirmationActionLoading = "";
  state.releaseAssistantWaveConfirmationActionPending = "";
  state.releaseAssistantWaveConfirmationActionMessage = "";
  state.releaseAssistantWaveConfirmationActionError = false;
  state.releaseAssistantWaveQualityRequestId += 1;
  state.releaseAssistantWaveQualityLoading = false;
  state.releaseAssistantWaveQualityOpen = false;
  state.releaseAssistantWaveQualityPage = 1;
  state.releaseAssistantWaveQualityData = null;
  state.releaseAssistantWaveQualityError = "";
  state.releaseAssistantWavePickListRequestId += 1;
  state.releaseAssistantWavePickListLoading = false;
  state.releaseAssistantWavePickListOpen = false;
  state.releaseAssistantWavePickListPage = 1;
  state.releaseAssistantWavePickListData = null;
  state.releaseAssistantWavePickListError = "";
}

function releaseAssistantWaveDisplayValue(value) {
  if (value === "" || value == null) return "-";
  return String(value);
}

function releaseAssistantWaveTemplateLabel(row) {
  return `${row?.waveTemplateName || "-"} (${row?.waveTemplateVersion || "-"})`;
}

function releaseAssistantWaveQualityMetricLabel(metric) {
  if (!metric || typeof metric !== "object") return releaseAssistantWaveDisplayValue(metric);
  const current = releaseAssistantWaveDisplayValue(metric.currentValue);
  const history = releaseAssistantWaveDisplayValue(metric.historyValue);
  const percentage = metric.changePercentage === "" || metric.changePercentage == null
    ? ""
    : `${metric.changeType === 1 ? "↑" : metric.changeType === 2 ? "↓" : ""}${metric.changePercentage}%`;
  return `${current} / ${history}${percentage ? ` ${percentage}` : ""}`;
}

function releaseAssistantWavePickStatusLabel(status) {
  const labels = {
    300: "待拣选",
    301: "拣选中",
    302: "已拣选",
    303: "库内异常",
    350: "已分配",
    600: "已取消",
    651: "Prep 待处理",
    652: "Prep 待打印",
    658: "Prep 异常",
    701: "分区拣选中",
    702: "分区拣选完成",
    708: "分区拣选异常",
  };
  return labels[Number(status)] || releaseAssistantWaveDisplayValue(status);
}

function releaseAssistantCancelPickStatusLabel(status) {
  return Number(status) === 303 ? "待拣选" : releaseAssistantWavePickStatusLabel(status);
}

function releaseAssistantPickPriorityLabel(priority) {
  const labels = {
    100: "普通",
    200: "紧急",
    300: "非常紧急",
  };
  return labels[Number(priority)] || "-";
}

function releaseAssistantWavePagerMarkup(scope, data = {}) {
  const page = Math.max(1, Number(data.page) || 1);
  const size = Math.max(1, Number(data.size) || 20);
  const total = Math.max(0, Number(data.total) || 0);
  const totalPages = Math.max(1, Math.ceil(total / size));
  if (totalPages <= 1) return "";
  return `
    <div class="release-assistant-wave-pager">
      <button
        type="button"
        data-release-wave-confirmation-action="${escapeHtml(scope)}-prev"
        ${page <= 1 ? "disabled" : ""}
      >上一页</button>
      <span>第 ${formatNumber(page)} / ${formatNumber(totalPages)} 页 · 共 ${formatNumber(total)} 条</span>
      <button
        type="button"
        data-release-wave-confirmation-action="${escapeHtml(scope)}-next"
        ${page >= totalPages ? "disabled" : ""}
      >下一页</button>
    </div>
  `;
}

function releaseAssistantWaveQualityMarkup() {
  if (!state.releaseAssistantWaveQualityOpen) return "";
  if (state.releaseAssistantWaveQualityLoading) {
    return `<div class="release-assistant-wave-subpanel"><div class="release-assistant-wave-subpanel-message">正在读取波次质量…</div></div>`;
  }
  if (state.releaseAssistantWaveQualityError) {
    return `
      <div class="release-assistant-wave-subpanel is-error">
        <div class="release-assistant-wave-subpanel-head">
          <strong>检查波次质量</strong>
          <button type="button" data-release-wave-confirmation-action="close-quality">关闭</button>
        </div>
        <div class="release-assistant-wave-subpanel-message">${escapeHtml(state.releaseAssistantWaveQualityError)}</div>
      </div>
    `;
  }
  const data = state.releaseAssistantWaveQualityData || {};
  const wave = data.wave || {};
  const rows = Array.isArray(data.rows) ? data.rows : [];
  const page = Math.max(1, Number(data.page) || state.releaseAssistantWaveQualityPage || 1);
  const size = Math.max(1, Number(data.size) || state.releaseAssistantWaveQualitySize || 20);
  return `
    <div class="release-assistant-wave-subpanel">
      <div class="release-assistant-wave-subpanel-head">
        <div>
          <strong>检查波次质量</strong>
          <span>波次号：${escapeHtml(wave.waveNo || state.releaseAssistantWaveConfirmationNo || "-")} · 开始时间：${escapeHtml(wave.startTime || "-")} · 结束时间：${escapeHtml(wave.endTime || "-")}</span>
        </div>
        <button type="button" data-release-wave-confirmation-action="close-quality">关闭</button>
      </div>
      <div class="release-assistant-wave-subtable-wrap">
        <table class="release-assistant-wave-detail-table is-quality-table">
          <thead>
            <tr>
              <th>序号</th>
              <th>拣选单号</th>
              <th>波次策略</th>
              <th>波次模板名称</th>
              <th>拣选任务批次号</th>
              <th>操作类型</th>
              <th>拣选类型</th>
              <th>Auto Rebin</th>
              <th>打包类型</th>
              <th>包裹数量</th>
              <th>货品总数</th>
              <th>库位总数</th>
              <th>件数总计</th>
              <th>虚拟库区总数</th>
              <th>库区总数</th>
              <th>巷道总数</th>
              <th>单位巷道距离拣选密度</th>
              <th>库区密度</th>
              <th>巷道密度</th>
              <th>虚拟库区密度</th>
              <th>拣选距离</th>
              <th>拣选单拆分算法</th>
            </tr>
          </thead>
          <tbody>
            ${rows.length ? rows.map((row, index) => `
              <tr>
                <td>${formatNumber(((page - 1) * size) + index + 1)}</td>
                <td>${escapeHtml(row.pickOrderNo || "-")}</td>
                <td>${escapeHtml(row.waveStrategyName || "-")}</td>
                <td>${escapeHtml(releaseAssistantWaveTemplateLabel(row))}</td>
                <td>${escapeHtml(row.taskBatchNo || "-")}</td>
                <td>${escapeHtml(row.operationTypeLabel || "-")}</td>
                <td>${escapeHtml(row.pickingTypeLabel || "-")}</td>
                <td>${escapeHtml(row.autoRebinKey || "-")}</td>
                <td>${escapeHtml(row.packingTypeLabel || "-")}</td>
                <td>${escapeHtml(releaseAssistantWaveQualityMetricLabel(row.packageQuantity))}</td>
                <td>${escapeHtml(releaseAssistantWaveQualityMetricLabel(row.totalGoods))}</td>
                <td>${escapeHtml(releaseAssistantWaveQualityMetricLabel(row.totalLocations))}</td>
                <td>${escapeHtml(releaseAssistantWaveQualityMetricLabel(row.totalUnits))}</td>
                <td>${escapeHtml(releaseAssistantWaveQualityMetricLabel(row.totalVirtualZones))}</td>
                <td>${escapeHtml(releaseAssistantWaveQualityMetricLabel(row.totalZones))}</td>
                <td>${escapeHtml(releaseAssistantWaveQualityMetricLabel(row.totalAisles))}</td>
                <td>${escapeHtml(releaseAssistantWaveQualityMetricLabel(row.unitAisleDistancePickDensity))}</td>
                <td>${escapeHtml(releaseAssistantWaveQualityMetricLabel(row.zoneDensity))}</td>
                <td>${escapeHtml(releaseAssistantWaveQualityMetricLabel(row.aisleDensity))}</td>
                <td>${escapeHtml(releaseAssistantWaveQualityMetricLabel(row.virtualZoneDensity))}</td>
                <td>${escapeHtml(releaseAssistantWaveDisplayValue(row.pickingDistance))}</td>
                <td>${escapeHtml(row.splitAlgorithmLabel || "-")}</td>
              </tr>
            `).join("") : `<tr><td colspan="22" class="release-assistant-wave-empty-cell">该波次暂无质量明细</td></tr>`}
          </tbody>
        </table>
      </div>
      ${releaseAssistantWavePagerMarkup("quality", data)}
    </div>
  `;
}

function releaseAssistantWavePickListMarkup() {
  if (!state.releaseAssistantWavePickListOpen) return "";
  if (state.releaseAssistantWavePickListLoading) {
    return `<div class="release-assistant-wave-subpanel"><div class="release-assistant-wave-subpanel-message">正在读取拣选单…</div></div>`;
  }
  if (state.releaseAssistantWavePickListError) {
    return `
      <div class="release-assistant-wave-subpanel is-error">
        <div class="release-assistant-wave-subpanel-head">
          <strong>拣选单</strong>
          <button type="button" data-release-wave-confirmation-action="close-pick-list">关闭</button>
        </div>
        <div class="release-assistant-wave-subpanel-message">${escapeHtml(state.releaseAssistantWavePickListError)}</div>
      </div>
    `;
  }
  const data = state.releaseAssistantWavePickListData || {};
  const rows = Array.isArray(data.rows) ? data.rows : [];
  return `
    <div class="release-assistant-wave-subpanel">
      <div class="release-assistant-wave-subpanel-head">
        <div>
          <strong>拣选单</strong>
          <span>共 ${formatNumber(data.total ?? rows.length)} 条</span>
        </div>
        <button type="button" data-release-wave-confirmation-action="close-pick-list">关闭</button>
      </div>
      <div class="release-assistant-wave-subtable-wrap">
        <table class="release-assistant-wave-detail-table is-pick-list-table">
          <thead>
            <tr>
              <th>拣选单号</th>
              <th>包裹数量</th>
              <th>拣选件数</th>
              <th>操作类型</th>
              <th>拣选类型</th>
              <th>拣选优先级</th>
              <th>创建人</th>
              <th>指派人</th>
              <th>拣选人</th>
              <th>库区</th>
            </tr>
          </thead>
          <tbody>
            ${rows.length ? rows.map((row) => `
              <tr>
                <td>${escapeHtml(row.pickOrderNo || "-")}</td>
                <td>${formatNumber(row.packageCount)}</td>
                <td>${formatNumber(row.pickItemCount)}</td>
                <td>${escapeHtml(row.operationTypeLabel || "-")}</td>
                <td>${escapeHtml(row.pickingTypeLabel || "-")}</td>
                <td>${escapeHtml(row.priorityLabel || "-")}</td>
                <td>${escapeHtml(row.creator || "-")}</td>
                <td>${escapeHtml(row.assignedOperator || "-")}</td>
                <td>${escapeHtml(row.operator || "-")}</td>
                <td>${escapeHtml(Array.isArray(row.zones) && row.zones.length ? row.zones.join("、") : "-")}</td>
              </tr>
            `).join("") : `<tr><td colspan="10" class="release-assistant-wave-empty-cell">该波次暂无拣选单</td></tr>`}
          </tbody>
        </table>
      </div>
      ${releaseAssistantWavePagerMarkup("pick-list", data)}
    </div>
  `;
}

function releaseAssistantCancelPickRows() {
  return Array.isArray(state.releaseAssistantCancelPickData?.rows)
    ? state.releaseAssistantCancelPickData.rows
    : [];
}

function releaseAssistantCancelPickNumber(value) {
  if (value === "" || value == null) return "-";
  return formatNumber(value);
}

function releaseAssistantCancelPickTextCompare(leftValue, rightValue) {
  const left = String(leftValue || "");
  const right = String(rightValue || "");
  return left.localeCompare(right, "en", {
    numeric: true,
    sensitivity: "base",
  }) || left.localeCompare(right, "en", {
    numeric: true,
    sensitivity: "variant",
  });
}

function releaseAssistantCancelPickCardMarkup(row, rowIndex, assignedOrderCount = 0) {
  const pickOrderNo = String(row?.pickOrderNo || "").trim();
  const status = Number(row?.status);
  const isPending = status === 303;
  const canCancel = row?.canCancel !== false && Boolean(pickOrderNo);
  const canAdjustPriority = row?.canAdjustPriority === true && Boolean(pickOrderNo);
  const canSelect = canCancel || row?.canAssign === true || canAdjustPriority;
  const selectionDisabledReason = canSelect
    ? ""
    : (
      row?.cancelDisabledReason
      || row?.assignDisabledReason
      || row?.priorityDisabledReason
      || "当前拣选单不可操作"
    );
  const cancelDisabledReason = canCancel
    ? ""
    : (row?.cancelDisabledReason || "当前拣选单不可取消");
  const zones = releaseAssistantCancelPickCanonicalZones(row);
  const zoneText = zones.length ? zones.join("、") : "-";
  const zoneCount = new Set(zones).size;
  const assignedPerson = String(row?.operator || row?.assignedOperator || "-").trim() || "-";
  const priority = Number(row?.priority) || 0;
  const priorityLabel = String(
    row?.priorityLabel || releaseAssistantPickPriorityLabel(priority),
  ).trim() || "-";
  const selected = state.releaseAssistantCancelPickSelected.has(pickOrderNo);
  return `
    <div
      class="release-assistant-pick-order-card-slot"
      data-cancel-pick-card-slot="${escapeHtml(pickOrderNo)}"
      data-cancel-pick-sort-zone="${escapeHtml(zones.join(" ¦ "))}"
      data-cancel-pick-sort-person="${escapeHtml(String(row?.operator || row?.assignedOperator || "").trim())}"
    >
      <article
        class="release-assistant-pick-order-card ${isPending ? "is-pending" : "is-assigned"}${canSelect ? " is-selectable" : ""}${selected ? " is-selected" : ""}"
        data-cancel-pick-card-no="${escapeHtml(pickOrderNo)}"
        data-cancel-pick-card-key="${escapeHtml(pickOrderNo)}"
        data-cancel-pick-card-order-nos="${escapeHtml(encodeURIComponent(JSON.stringify([pickOrderNo])))}"
        data-cancel-pick-row-click-index="${rowIndex}"
        aria-selected="${selected ? "true" : "false"}"
      >
        <div class="release-assistant-pick-order-card-inner">
          <header>
            <input
              type="checkbox"
              data-cancel-pick-row-index="${rowIndex}"
              aria-label="选择拣选单 ${escapeHtml(pickOrderNo)}"
              ${selected && canSelect ? "checked" : ""}
              ${canSelect ? "" : "disabled"}
              title="${escapeHtml(selectionDisabledReason)}"
            >
            <strong title="${escapeHtml(pickOrderNo)}">${escapeHtml(pickOrderNo || "-")}</strong>
          </header>
          <div class="release-assistant-pick-order-card-main">
            <div class="release-assistant-pick-order-card-details${isPending ? "" : " has-assignee"}">
              <div class="release-assistant-pick-order-card-zones">
                <div class="release-assistant-pick-order-card-zone-heading">
                  <b>库区</b>
                  <strong>(${escapeHtml(formatNumber(zoneCount))})</strong>
                </div>
                <p class="release-assistant-pick-order-card-zone-text" title="${escapeHtml(zoneText)}">${escapeHtml(zoneText)}</p>
              </div>
              ${isPending ? "" : `
                <p
                  class="release-assistant-pick-order-card-assignee"
                  aria-label="分配人 ${escapeHtml(assignedPerson)}"
                ><span title="${escapeHtml(assignedPerson)}">${escapeHtml(assignedPerson)}</span><strong>(${escapeHtml(formatNumber(assignedOrderCount))})</strong></p>
              `}
            </div>
            <footer>
              <strong
                class="release-assistant-pick-order-card-count"
                aria-label="订单件数 ${escapeHtml(releaseAssistantCancelPickNumber(row?.pickItemCount))}"
              >${escapeHtml(releaseAssistantCancelPickNumber(row?.pickItemCount))}</strong>
              <span class="release-assistant-pick-order-card-footer-actions">
                ${isPending ? `
                  <button
                    type="button"
                    data-cancel-pick-order="${escapeHtml(pickOrderNo)}"
                    data-cancel-pick-row-index="${rowIndex}"
                    ${canCancel ? "" : "disabled"}
                    title="${escapeHtml(cancelDisabledReason)}"
                  >取消</button>
                ` : ""}
                <span
                  class="release-assistant-pick-order-card-priority${priority ? ` is-${priority}` : ""}"
                  aria-label="优先级 ${escapeHtml(priorityLabel)}"
                  title="优先级：${escapeHtml(priorityLabel)}"
                >${escapeHtml(priorityLabel)}</span>
              </span>
            </footer>
          </div>
        </div>
      </article>
    </div>
  `;
}

function releaseAssistantCancelPickCanonicalZones(row) {
  return [...new Set(
    (Array.isArray(row?.zones) ? row.zones : [])
      .map((zone) => String(zone || "").trim())
      .filter(Boolean),
  )].sort(releaseAssistantCancelPickTextCompare);
}

function releaseAssistantCancelPickSortPerson(row) {
  return String(row?.operator || row?.assignedOperator || "").trim();
}

function releaseAssistantCancelPickCompareOptionalText(leftValue, rightValue) {
  const left = String(leftValue || "").trim();
  const right = String(rightValue || "").trim();
  if (!left && right) return 1;
  if (left && !right) return -1;
  return releaseAssistantCancelPickTextCompare(left, right);
}

function releaseAssistantCancelPickCompareZoneLists(leftValue, rightValue) {
  const left = Array.isArray(leftValue) ? leftValue : [];
  const right = Array.isArray(rightValue) ? rightValue : [];
  if (!left.length && right.length) return 1;
  if (left.length && !right.length) return -1;
  const limit = Math.min(left.length, right.length);
  for (let index = 0; index < limit; index += 1) {
    const order = releaseAssistantCancelPickTextCompare(left[index], right[index]);
    if (order) return order;
  }
  return left.length - right.length;
}

function releaseAssistantCancelPickCompareIndexedRows(left, right, sortMode = "") {
  if (sortMode !== "zone" && sortMode !== "person") {
    return (Number(left?.rowIndex) || 0) - (Number(right?.rowIndex) || 0);
  }
  const leftZones = Array.isArray(left?.zones)
    ? left.zones
    : releaseAssistantCancelPickCanonicalZones(left?.row);
  const rightZones = Array.isArray(right?.zones)
    ? right.zones
    : releaseAssistantCancelPickCanonicalZones(right?.row);
  const leftPerson = left?.person != null
    ? String(left.person)
    : releaseAssistantCancelPickSortPerson(left?.row);
  const rightPerson = right?.person != null
    ? String(right.person)
    : releaseAssistantCancelPickSortPerson(right?.row);
  const primaryOrder = sortMode === "zone"
    ? releaseAssistantCancelPickCompareZoneLists(leftZones, rightZones)
    : releaseAssistantCancelPickCompareOptionalText(leftPerson, rightPerson);
  if (primaryOrder) return primaryOrder;
  const secondaryOrder = sortMode === "zone"
    ? releaseAssistantCancelPickCompareOptionalText(leftPerson, rightPerson)
    : releaseAssistantCancelPickCompareZoneLists(leftZones, rightZones);
  if (secondaryOrder) return secondaryOrder;
  const pickOrderNoOrder = releaseAssistantCancelPickTextCompare(
    left?.row?.pickOrderNo,
    right?.row?.pickOrderNo,
  );
  if (pickOrderNoOrder) return pickOrderNoOrder;
  return (Number(left?.rowIndex) || 0) - (Number(right?.rowIndex) || 0);
}

function releaseAssistantCancelPickIndexedRows(rows = [], sortMode = "") {
  const indexedRows = (Array.isArray(rows) ? rows : [])
    .map((row, rowIndex) => ({
      row,
      rowIndex,
      zones: releaseAssistantCancelPickCanonicalZones(row),
      person: releaseAssistantCancelPickSortPerson(row),
    }));
  if (sortMode !== "zone" && sortMode !== "person") return indexedRows;
  return [...indexedRows].sort((left, right) => (
    releaseAssistantCancelPickCompareIndexedRows(left, right, sortMode)
  ));
}

function releaseAssistantCancelPickSortButtonsMarkup(scope, activeMode = "") {
  const normalizedScope = scope === "table" ? "table" : "matrix";
  return `
    <span class="release-assistant-cancel-pick-sort-actions is-${normalizedScope}" aria-label="展示排序">
      <button
        type="button"
        data-cancel-pick-sort-scope="${normalizedScope}"
        data-cancel-pick-sort-mode="zone"
        class="${activeMode === "zone" ? "is-active" : ""}"
        aria-pressed="${activeMode === "zone" ? "true" : "false"}"
      >按库区排序</button>
      <button
        type="button"
        data-cancel-pick-sort-scope="${normalizedScope}"
        data-cancel-pick-sort-mode="person"
        class="${activeMode === "person" ? "is-active" : ""}"
        aria-pressed="${activeMode === "person" ? "true" : "false"}"
      >按人名排序</button>
    </span>
  `;
}

function syncReleaseAssistantCancelPickSortButtons(scope, activeMode) {
  el.releaseAssistantCancelPickModal
    ?.querySelectorAll(`[data-cancel-pick-sort-scope="${scope}"]`)
    .forEach((button) => {
      const active = button.dataset.cancelPickSortMode === activeMode;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
}

function applyReleaseAssistantCancelPickMatrixSort(sortMode) {
  const root = el.releaseAssistantCancelPickContent;
  if (!root || (sortMode !== "zone" && sortMode !== "person")) return;
  root.querySelectorAll(".release-assistant-pick-order-card-list").forEach((list) => {
    const slots = [...list.children]
      .filter((child) => child.matches?.("[data-cancel-pick-card-slot]"))
      .map((slot, index) => ({ slot, index }));
    slots.sort((left, right) => {
      const key = sortMode === "zone" ? "cancelPickSortZone" : "cancelPickSortPerson";
      const primaryOrder = releaseAssistantCancelPickCompareOptionalText(
        left.slot.dataset[key],
        right.slot.dataset[key],
      );
      if (primaryOrder) return primaryOrder;
      const secondaryKey = sortMode === "zone" ? "cancelPickSortPerson" : "cancelPickSortZone";
      const secondaryOrder = releaseAssistantCancelPickCompareOptionalText(
        left.slot.dataset[secondaryKey],
        right.slot.dataset[secondaryKey],
      );
      if (secondaryOrder) return secondaryOrder;
      const pickOrderOrder = releaseAssistantCancelPickTextCompare(
        left.slot.dataset.cancelPickCardSlot,
        right.slot.dataset.cancelPickCardSlot,
      );
      return pickOrderOrder || left.index - right.index;
    });
    slots.forEach(({ slot }) => list.append(slot));
  });
  syncReleaseAssistantCancelPickSortButtons("matrix", sortMode);
  syncReleaseAssistantCancelPickCardActions();
}

function applyReleaseAssistantCancelPickTableSort(sortMode) {
  const root = el.releaseAssistantCancelPickContent;
  const tbody = root?.querySelector(".release-assistant-cancel-pick-table tbody");
  if (!tbody || (sortMode !== "zone" && sortMode !== "person")) return;
  const rows = releaseAssistantCancelPickIndexedRows(
    releaseAssistantCancelPickRows(),
    sortMode,
  );
  const elementByRowIndex = new Map(
    [...tbody.querySelectorAll("tr[data-cancel-pick-row-click-index]")]
      .map((rowElement) => [
        Number(rowElement.dataset.cancelPickRowClickIndex),
        rowElement,
      ]),
  );
  rows.forEach(({ rowIndex }, tableIndex) => {
    const rowElement = elementByRowIndex.get(rowIndex);
    if (!rowElement) return;
    rowElement.dataset.cancelPickTableIndex = String(tableIndex);
    const checkbox = rowElement.querySelector("input[data-cancel-pick-row-index]");
    if (checkbox) checkbox.dataset.cancelPickTableIndex = String(tableIndex);
    tbody.append(rowElement);
  });
  syncReleaseAssistantCancelPickSortButtons("table", sortMode);
}

function releaseAssistantCancelPickBatchGroups(items = [], sortMode = "") {
  const groups = new Map();
  (Array.isArray(items) ? items : []).forEach(({ row, rowIndex }) => {
    const pickOrderNo = String(row?.pickOrderNo || "").trim();
    if (!pickOrderNo) return;
    const zones = releaseAssistantCancelPickCanonicalZones(row);
    const zoneKey = zones.join("\u001f") || "-";
    const assignedPerson = String(
      row?.operator || row?.assignedOperator || "",
    ).trim();
    const priority = Number(row?.priority) || 0;
    const groupKey = JSON.stringify([zoneKey, assignedPerson, priority]);
    if (!groups.has(groupKey)) {
      groups.set(groupKey, {
        key: groupKey,
        zones,
        assignedPerson,
        priority,
        priorityLabel: String(
          row?.priorityLabel || releaseAssistantPickPriorityLabel(priority),
        ).trim() || "-",
        items: [],
      });
    }
    groups.get(groupKey).items.push({ row, rowIndex });
  });
  return [...groups.values()]
    .map((group) => ({
      ...group,
      items: [...group.items].sort((left, right) => (
        releaseAssistantCancelPickTextCompare(
          left?.row?.pickOrderNo,
          right?.row?.pickOrderNo,
        )
      )),
    }))
    .sort((left, right) => {
      if (sortMode === "zone") {
        const zoneOrder = releaseAssistantCancelPickCompareZoneLists(
          left?.zones,
          right?.zones,
        );
        if (zoneOrder) return zoneOrder;
        const personOrder = releaseAssistantCancelPickCompareOptionalText(
          left?.assignedPerson,
          right?.assignedPerson,
        );
        if (personOrder) return personOrder;
      } else if (sortMode === "person") {
        const personOrder = releaseAssistantCancelPickCompareOptionalText(
          left?.assignedPerson,
          right?.assignedPerson,
        );
        if (personOrder) return personOrder;
        const zoneOrder = releaseAssistantCancelPickCompareZoneLists(
          left?.zones,
          right?.zones,
        );
        if (zoneOrder) return zoneOrder;
      } else {
        const personOrder = releaseAssistantCancelPickTextCompare(
          left?.assignedPerson,
          right?.assignedPerson,
        );
        if (personOrder) return personOrder;
        const zoneOrder = releaseAssistantCancelPickTextCompare(
          (left?.zones || []).join("\u001f"),
          (right?.zones || []).join("\u001f"),
        );
        if (zoneOrder) return zoneOrder;
      }
      const priorityOrder = (Number(right?.priority) || 0) - (Number(left?.priority) || 0);
      if (priorityOrder) return priorityOrder;
      return releaseAssistantCancelPickTextCompare(
        left?.items?.[0]?.row?.pickOrderNo,
        right?.items?.[0]?.row?.pickOrderNo,
      );
    });
}

function releaseAssistantCancelPickBatchCardMarkup(group) {
  const items = Array.isArray(group?.items) ? group.items : [];
  const pickOrderNos = [...new Set(
    items.map(({ row }) => String(row?.pickOrderNo || "").trim()).filter(Boolean),
  )];
  if (!pickOrderNos.length) return "";
  const rows = items.map(({ row }) => row);
  const pickOrderCount = pickOrderNos.length;
  const pickItemCounts = rows.map((row) => (
    row?.pickItemCount !== ""
      && row?.pickItemCount != null
      && Number.isFinite(Number(row.pickItemCount))
      ? Number(row.pickItemCount)
      : null
  ));
  const totalPickItemCount = pickItemCounts.every((value) => value != null)
    ? pickItemCounts.reduce((sum, value) => sum + value, 0)
    : null;
  const totalPickItemCountLabel = totalPickItemCount == null
    ? "-"
    : formatNumber(totalPickItemCount);
  const firstRow = rows[0] || {};
  const status = Number(firstRow?.status);
  const isPending = status === 303;
  const canSelect = rows.every((row) => (
    row?.canCancel !== false
    || row?.canAssign === true
    || row?.canAdjustPriority === true
  ));
  const selectedCount = pickOrderNos.filter((pickOrderNo) => (
    state.releaseAssistantCancelPickSelected.has(pickOrderNo)
  )).length;
  const allSelected = selectedCount === pickOrderNos.length;
  const partiallySelected = selectedCount > 0 && !allSelected;
  const firstPickOrderNo = pickOrderNos[0];
  const zoneText = Array.isArray(group?.zones) && group.zones.length
    ? group.zones.join("、")
    : "-";
  const assignedPerson = String(group?.assignedPerson || "").trim() || "-";
  const priority = Number(group?.priority) || 0;
  const priorityLabel = String(
    group?.priorityLabel || releaseAssistantPickPriorityLabel(priority),
  ).trim() || "-";
  const selectionDisabledReason = canSelect
    ? ""
    : "该爆品组合分组中包含当前不可操作的拣选单";
  const encodedPickOrderNos = encodeURIComponent(JSON.stringify(pickOrderNos));
  return `
    <div
      class="release-assistant-pick-order-card-slot"
      data-cancel-pick-card-slot="${escapeHtml(firstPickOrderNo)}"
      data-cancel-pick-sort-zone="${escapeHtml((group?.zones || []).join(" ¦ "))}"
      data-cancel-pick-sort-person="${escapeHtml(String(group?.assignedPerson || "").trim())}"
    >
      <article
        class="release-assistant-pick-order-card is-batch-group ${isPending ? "is-pending" : "is-assigned"}${canSelect ? " is-selectable" : ""}${allSelected ? " is-selected" : ""}${partiallySelected ? " is-partial" : ""}"
        data-cancel-pick-card-no="${escapeHtml(firstPickOrderNo)}"
        data-cancel-pick-card-key="${escapeHtml(group?.key || firstPickOrderNo)}"
        data-cancel-pick-card-order-nos="${escapeHtml(encodedPickOrderNos)}"
        aria-selected="${allSelected ? "true" : partiallySelected ? "mixed" : "false"}"
      >
        <div class="release-assistant-pick-order-card-inner">
          <header>
            <input
              type="checkbox"
              data-cancel-pick-card-select
              aria-label="选择爆品组合库区 ${escapeHtml(zoneText)}，拣选单量 ${escapeHtml(formatNumber(pickOrderCount))}，总件数 ${escapeHtml(totalPickItemCountLabel)}"
              ${allSelected && canSelect ? "checked" : ""}
              ${canSelect ? "" : "disabled"}
              title="${escapeHtml(selectionDisabledReason)}"
            >
            <strong class="release-assistant-batch-card-zone" title="${escapeHtml(zoneText)}">${escapeHtml(zoneText)}</strong>
          </header>
          <div class="release-assistant-batch-card-main">
            <div class="release-assistant-batch-card-metrics">
              <p class="release-assistant-batch-card-count">
                <span>单量</span>
                <strong>${escapeHtml(formatNumber(pickOrderCount))}</strong>
              </p>
              <p class="release-assistant-batch-card-pieces">
                <span>总件数</span>
                <strong>${escapeHtml(totalPickItemCountLabel)}</strong>
              </p>
            </div>
            <p class="release-assistant-batch-card-picker">
              <span>拣选人</span>
              <strong title="${escapeHtml(assignedPerson)}">${escapeHtml(assignedPerson)}</strong>
            </p>
            <footer>
              <span
                class="release-assistant-pick-order-card-priority${priority ? ` is-${priority}` : ""}"
                aria-label="优先级 ${escapeHtml(priorityLabel)}"
                title="优先级：${escapeHtml(priorityLabel)}"
              >${escapeHtml(priorityLabel)}</span>
            </footer>
          </div>
        </div>
      </article>
    </div>
  `;
}

function fitReleaseAssistantPickOrderCards() {
  const root = el.releaseAssistantCancelPickContent;
  if (!root) return;
  root.querySelectorAll(".release-assistant-pick-order-card-zone-text").forEach((zoneText) => {
    if (!zoneText.clientWidth || !zoneText.clientHeight) return;
    let minimum = 3;
    let maximum = 18;
    const fits = () => (
      zoneText.scrollWidth <= zoneText.clientWidth + 1
      && zoneText.scrollHeight <= zoneText.clientHeight + 1
    );
    zoneText.style.fontSize = `${minimum}px`;
    while (!fits() && minimum > 0.125) {
      minimum /= 2;
      zoneText.style.fontSize = `${minimum}px`;
    }
    let best = minimum;
    for (let index = 0; index < 11; index += 1) {
      const candidate = (minimum + maximum) / 2;
      zoneText.style.fontSize = `${candidate}px`;
      if (fits()) {
        best = candidate;
        minimum = candidate;
      } else {
        maximum = candidate;
      }
    }
    zoneText.style.fontSize = `${best.toFixed(2)}px`;
  });
}

function resolveReleaseAssistantCancelPickCardActionAnchor(preferred = "") {
  const selected = state.releaseAssistantCancelPickSelected;
  const preferredPickOrderNo = String(preferred || "").trim();
  if (preferredPickOrderNo && selected.has(preferredPickOrderNo)) {
    state.releaseAssistantCancelPickCardActionAnchor = preferredPickOrderNo;
    return preferredPickOrderNo;
  }
  const current = String(state.releaseAssistantCancelPickCardActionAnchor || "").trim();
  if (current && selected.has(current)) return current;
  const selectedPickOrderNos = [...selected];
  const fallback = selectedPickOrderNos[selectedPickOrderNos.length - 1] || "";
  state.releaseAssistantCancelPickCardActionAnchor = fallback;
  return fallback;
}

function syncReleaseAssistantCancelPickCardActions() {
  const root = el.releaseAssistantCancelPickContent;
  const actions = root?.querySelector("[data-cancel-pick-card-actions]");
  if (!root || !actions) return;
  const anchor = resolveReleaseAssistantCancelPickCardActionAnchor();
  const slot = [...root.querySelectorAll("[data-cancel-pick-card-slot]")]
    .find((candidate) => (
      candidate.dataset.cancelPickCardSlot === anchor
      || releaseAssistantCancelPickCardPickOrderNos(
        candidate.querySelector(".release-assistant-pick-order-card"),
      ).includes(anchor)
    ));
  if (
    !anchor
    || !slot
    || state.releaseAssistantCancelPickCardDragActive
  ) {
    actions.hidden = true;
    return;
  }
  slot.append(actions);
  actions.hidden = false;
  const clearButton = actions.querySelector("[data-cancel-pick-card-clear]");
  const assignButton = actions.querySelector("[data-cancel-pick-card-assign]");
  if (clearButton) {
    clearButton.disabled = Boolean(el.releaseAssistantCancelPickClearSelection?.disabled);
  }
  if (assignButton) {
    assignButton.disabled = Boolean(el.releaseAssistantAssignPicker?.disabled);
    assignButton.textContent = el.releaseAssistantAssignPicker?.textContent || "指定拣选人";
    assignButton.title = el.releaseAssistantAssignPicker?.title || "";
  }
}

function releaseAssistantCancelPickCardOverviewMarkup(rows = []) {
  const indexedRows = (Array.isArray(rows) ? rows : []).map((row, rowIndex) => ({
    row,
    rowIndex,
    zones: releaseAssistantCancelPickCanonicalZones(row),
    person: releaseAssistantCancelPickSortPerson(row),
  }));
  const matrixSortMode = state.releaseAssistantCancelPickMatrixSortMode;
  const assignedOrderCounts = new Map();
  indexedRows.forEach(({ row }) => {
    if (Number(row?.status) !== 350) return;
    const person = String(row?.operator || row?.assignedOperator || "").trim();
    if (!person) return;
    assignedOrderCounts.set(person, (assignedOrderCounts.get(person) || 0) + 1);
  });
  const statusSpecs = [
    { status: 303, title: "待拣选", statusClass: "is-pending" },
    { status: 350, title: "已分配", statusClass: "is-assigned" },
  ];
  const operationSpecs = [
    { operationType: 60, title: "混合包裹" },
    { operationType: 40, title: "普通单件" },
    { operationType: 20, title: "爆品组合", groupedByZone: true },
  ];
  return `
    <section class="release-assistant-pick-order-overview" aria-label="拣选单订单矩阵">
      <div class="release-assistant-pick-order-overview-head">
        <strong>订单矩阵</strong>
        <span>点击可多选 · Shift 起点到终点按范围处理 · 拖到上方人名松手即分配 · 爆品组合按库区汇总单量及总件数</span>
        ${releaseAssistantCancelPickSortButtonsMarkup("matrix", matrixSortMode)}
      </div>
      <div class="release-assistant-pick-order-status-list">
        ${statusSpecs.map((statusSpec) => {
          const statusItems = indexedRows.filter(({ row }) => (
            Number(row?.status) === statusSpec.status
          ));
          const lanes = operationSpecs.map((operationSpec) => {
            const matchingItems = statusItems.filter(({ row }) => (
              Number(row?.operationType) === operationSpec.operationType
            ));
            const items = matrixSortMode === "zone" || matrixSortMode === "person"
              ? [...matchingItems].sort((left, right) => (
                releaseAssistantCancelPickCompareIndexedRows(
                  left,
                  right,
                  matrixSortMode,
                )
              ))
              : operationSpec.operationType === 60
                ? [...matchingItems].sort((left, right) => (
                  releaseAssistantCancelPickCanonicalZones(left?.row).length
                  - releaseAssistantCancelPickCanonicalZones(right?.row).length
                  || left.rowIndex - right.rowIndex
                ))
                : matchingItems;
            return {
              title: operationSpec.title,
              groupedByZone: operationSpec.groupedByZone === true,
              items,
              groups: operationSpec.groupedByZone
                ? releaseAssistantCancelPickBatchGroups(items, matrixSortMode)
                : [],
            };
          });
          return `
            <section class="release-assistant-pick-order-status ${statusSpec.statusClass}">
              <header>
                <strong>${escapeHtml(statusSpec.title)}</strong>
                <span>${formatNumber(statusItems.length)} 单</span>
              </header>
              <div class="release-assistant-pick-order-lanes">
                ${lanes.map((lane) => `
                  <div class="release-assistant-pick-order-lane">
                    <div class="release-assistant-pick-order-lane-label">
                      <strong>${escapeHtml(lane.title)}</strong>
                      <span>${formatNumber(lane.items.length)} 单</span>
                    </div>
                    <div class="release-assistant-pick-order-card-list">
                      ${lane.groupedByZone
                        ? lane.groups.length
                          ? lane.groups
                            .map((group) => releaseAssistantCancelPickBatchCardMarkup(group))
                            .join("")
                          : `<em>暂无</em>`
                        : lane.items.length
                          ? lane.items.map(({ row, rowIndex }) => {
                          const person = String(row?.operator || row?.assignedOperator || "").trim();
                          return releaseAssistantCancelPickCardMarkup(
                            row,
                            rowIndex,
                            assignedOrderCounts.get(person) || 0,
                          );
                          }).join("")
                          : `<em>暂无</em>`}
                    </div>
                  </div>
                `).join("")}
              </div>
            </section>
          `;
        }).join("")}
      </div>
      <div class="release-assistant-pick-order-card-actions" data-cancel-pick-card-actions hidden>
        <button type="button" data-cancel-pick-card-clear>取消全部选择</button>
        <button type="button" data-cancel-pick-card-assign>指定拣选人</button>
      </div>
    </section>
  `;
}

function releaseAssistantAssignPickerGroups(analysis = state.releaseAssistantAssignPickerAnalysis) {
  if (!analysis) return { picking: [], waiting: [] };
  const picking = sortByNightRoster(
    (Array.isArray(analysis.pickingPeople) ? analysis.pickingPeople : [])
      .filter((row) => String(row?.person || "").trim()),
  );
  const pickingNames = new Set(
    picking.map((row) => personIdentityKey(row?.person)).filter(Boolean),
  );
  const waiting = assignedNotPickingRows(analysis)
    .filter((row) => {
      const person = String(row?.person || "").trim();
      return person && !pickingNames.has(personIdentityKey(person));
    });
  return { picking, waiting };
}

function releaseAssistantAssignPickerPersonClass(row, analysis) {
  if (row?.completedAwaitingAssignment) return "is-completed-awaiting";
  const realtimeClass = activePickingPersonClass(row, analysis);
  if (realtimeClass) return realtimeClass;
  return Number(row?.pickingRows || 0) > 0 ? "is-picking-neutral" : "is-assigned-waiting";
}

function releaseAssistantAssignPickerProgress(row, analysis) {
  const order = activePickingOrder(row, analysis);
  const progress = order?.liveTaskProgress || row?.pickingProgress || null;
  const pickedQuantity = Math.max(0, Number(progress?.pickedQuantity) || 0);
  const expectedQuantity = Math.max(0, Number(progress?.expectedQuantity) || 0);
  const hasDetail = expectedQuantity > 0;
  const loading = Boolean(analysis?.livePickingTaskProgressLoading) && !hasDetail;
  const suppliedPercent = progress?.progressPercent;
  const percent = suppliedPercent !== "" && suppliedPercent != null && Number.isFinite(Number(suppliedPercent))
    ? Math.max(0, Math.round(Number(suppliedPercent)))
    : hasDetail
      ? Math.max(0, Math.round((pickedQuantity / expectedQuantity) * 100))
      : 0;
  const progressAtMs = Number(
    analysis?.livePickingTaskProgress?.fetchedAtMs
    || analysis?.source?.analyzedAtMs
    || Date.now(),
  );
  const elapsedMinutes = hasDetail && order
    ? minutesBetweenMs(order.startedAtMs, progressAtMs)
    : null;
  const elapsedLabel = elapsedMinutes == null
    ? "-"
    : formatNumber(Math.max(0, Math.round(Number(elapsedMinutes) || 0)));
  const label = hasDetail
    ? `${formatNumber(pickedQuantity)}/${formatNumber(expectedQuantity)} · ${elapsedLabel}`
    : loading ? "读取中" : "无明细";
  return {
    pickedQuantity,
    expectedQuantity,
    elapsedMinutes,
    hasDetail,
    loading,
    label,
    percent,
    width: Math.min(100, percent),
  };
}

function releaseAssistantAssignPickerCandidateMarkup(row, analysis) {
  const person = String(row?.person || "").trim();
  if (!person) return "";
  const selected = state.releaseAssistantAssignPickerSelected.has(person);
  const progress = releaseAssistantAssignPickerProgress(row, analysis);
  const personClass = releaseAssistantAssignPickerPersonClass(row, analysis);
  return `
    <button
      class="release-assistant-assign-picker-person ${personClass}${selected ? " is-selected" : ""}"
      type="button"
      data-assign-picker-person="${escapeHtml(person)}"
      aria-pressed="${selected ? "true" : "false"}"
      ${state.releaseAssistantAssignPickerRunning
        || state.releaseAssistantAssignPickerResultBlocked ? "disabled" : ""}
    >
      <strong class="release-assistant-assign-picker-person-name">${escapeHtml(person)}</strong>
      <span class="release-assistant-assign-picker-quantities">
        <span><em>已分配单数</em><b>${formatNumber(row?.assignedRows)}</b></span>
      </span>
      <span class="release-assistant-assign-picker-progress">
        <span
          class="release-assistant-assign-picker-progress-bar${progress.loading ? " is-loading" : ""}"
          title="${escapeHtml(progress.hasDetail ? `实时进度 ${progress.label}，${formatNumber(progress.percent)}%` : progress.label)}"
        >
          <i style="width: ${progress.width}%"></i>
          <b>${escapeHtml(progress.label)}</b>
        </span>
        <em>${progress.hasDetail ? `${formatNumber(progress.percent)}%` : progress.loading ? "…" : "—"}</em>
      </span>
    </button>
  `;
}

function releaseAssistantPeopleStatusPersonMarkup(row, analysis, mode) {
  const person = String(row?.person || "").trim();
  if (!person) return "";
  const assignedRows = Math.max(0, Number(row?.assignedRows) || 0);
  const personClass = releaseAssistantAssignPickerPersonClass(row, analysis);
  if (mode === "waiting") {
    return `
      <article
        class="release-assistant-people-status-person ${personClass}"
        data-people-status-drop-person="${escapeHtml(person)}"
      >
        <div class="release-assistant-people-status-person-head">
          <strong title="${escapeHtml(person)}">${escapeHtml(person)}</strong>
          <b title="已分配单数">${formatNumber(assignedRows)} 单</b>
        </div>
        <span class="release-assistant-people-status-wait">${escapeHtml(formatWaitDuration(row?.waitMinutes))}</span>
      </article>
    `;
  }
  const activeOrder = activePickingOrder(row, analysis);
  const currentSingleZone = activeOrder?.pickingOrderType === "single"
    ? String(activeOrder?.zoneCode || "").trim()
    : "";
  const progress = releaseAssistantAssignPickerProgress(row, analysis);
  const progressClass = progress.hasDetail && progress.percent > 100
    ? " is-progress-danger"
    : progress.hasDetail && progress.percent >= 80
      ? " is-progress-warn"
      : "";
  return `
    <article
      class="release-assistant-people-status-person ${personClass}${progressClass}"
      data-people-status-drop-person="${escapeHtml(person)}"
    >
      <div class="release-assistant-people-status-person-head">
        <strong title="${escapeHtml(person)}">${escapeHtml(person)}</strong>
        ${currentSingleZone ? `
          <span
            class="release-assistant-people-status-single-zone"
            title="当前 Single 拣选单库区：${escapeHtml(currentSingleZone)}"
          >${escapeHtml(currentSingleZone)}</span>
        ` : ""}
        <b title="已分配单数">${formatNumber(assignedRows)} 单</b>
      </div>
      <div class="release-assistant-people-status-progress">
        <span
          class="${progress.loading ? "is-loading" : ""}"
          title="${escapeHtml(progress.hasDetail ? `拣选数量/预期数量 · 已进行分钟：${progress.label}，${formatNumber(progress.percent)}%` : progress.label)}"
        >
          <i style="width: ${progress.width}%"></i>
          <b>${escapeHtml(progress.label)}</b>
        </span>
        <em>${progress.hasDetail ? `${formatNumber(progress.percent)}%` : progress.loading ? "…" : "—"}</em>
      </div>
    </article>
  `;
}

function releaseAssistantPeopleStatusRefreshing() {
  return Boolean(
    state.releaseAssistantPeopleStatusLoading
    || state.releaseAssistantPeopleStatusProgressLoading
  );
}

function releaseAssistantCancelPickStatusCounts(summary, sowingTaskSummary) {
  const hasWaveCockpitSummary = Array.isArray(summary?.sections);
  const cards = (hasWaveCockpitSummary ? summary.sections : [])
    .flatMap((section) => (
      Array.isArray(section?.cards) ? section.cards : []
    ));
  const countsForStatus = (orderStatus) => {
    if (!hasWaveCockpitSummary) {
      return {
        total: null,
        single: null,
        multi: null,
      };
    }
    const metrics = cards
      .filter((card) => Number(card?.orderStatus) === orderStatus)
      .flatMap((card) => (
        Array.isArray(card?.metrics) ? card.metrics : []
      ));
    const countByType = (operationType) => metrics
      .filter((metric) => Number(metric?.operationType) === operationType)
      .reduce(
        (total, metric) => total + Math.max(0, Number(metric?.orderCount) || 0),
        0,
      );
    return {
      total: metrics.reduce(
        (total, metric) => total + Math.max(0, Number(metric?.orderCount) || 0),
        0,
      ),
      single: countByType(40),
      multi: countByType(60),
    };
  };
  const sowingMetric = (key) => (
    sowingTaskSummary
    && Number.isFinite(Number(sowingTaskSummary[key]))
  )
    ? Math.max(0, Number(sowingTaskSummary[key]))
    : null;
  const picked = countsForStatus(302);
  picked.multi = sowingMetric("pickedMultiPackage48Count");
  return {
    picking: countsForStatus(301),
    picked,
    sowing: {
      pending: sowingMetric("pendingCount"),
      inProgress: sowingMetric("inProgressCount"),
      completed: sowingMetric("completedCount"),
    },
    packing: {
      single: sowingMetric("packingSingleCount"),
      multi: sowingMetric("packingMultiOperatorCount"),
      multiDuplicate: sowingMetric("packingMultiDuplicateCount"),
    },
  };
}

function releaseAssistantCancelPickStatusMetric(label, value, duplicateValue = null) {
  const displayValue = value == null
    ? "—"
    : `${formatNumber(value)}${
      duplicateValue == null ? "" : `（${formatNumber(duplicateValue)}）`
    }`;
  return `
    <span>
      ${escapeHtml(label)}
      <b>${displayValue}</b>
    </span>
  `;
}

function renderReleaseAssistantCancelPickStatusSummary() {
  const host = el.releaseAssistantCancelPickStatusSummary;
  if (!host) return;
  const summary = state.releaseAssistantPeopleStatusWaveCockpit;
  const counts = releaseAssistantCancelPickStatusCounts(
    summary,
    state.releaseAssistantSowingTaskSummary,
  );
  host.innerHTML = `
    <article class="release-assistant-cancel-pick-status-item is-picking">
      <strong>拣选中</strong>
      ${releaseAssistantCancelPickStatusMetric("Single", counts?.picking.single)}
      ${releaseAssistantCancelPickStatusMetric("Multi", counts?.picking.multi)}
    </article>
    <article class="release-assistant-cancel-pick-status-item is-picked">
      <strong>已拣选</strong>
      ${releaseAssistantCancelPickStatusMetric("Single", counts?.picked.single)}
      ${releaseAssistantCancelPickStatusMetric("Multi", counts?.picked.multi)}
    </article>
    <article class="release-assistant-cancel-pick-status-item is-sowing">
      <strong>播种</strong>
      ${releaseAssistantCancelPickStatusMetric("待播种", counts?.sowing.pending)}
      ${releaseAssistantCancelPickStatusMetric("播种中", counts?.sowing.inProgress)}
      ${releaseAssistantCancelPickStatusMetric("播种完成", counts?.sowing.completed)}
    </article>
    <button
      class="release-assistant-cancel-pick-status-item is-packing"
      type="button"
      data-packing-detail-open
      aria-haspopup="dialog"
      title="查看打包中每个人的实时进度"
    >
      <strong>打包中</strong>
      ${releaseAssistantCancelPickStatusMetric("Single", counts?.packing.single)}
      ${releaseAssistantCancelPickStatusMetric(
        "Multi",
        counts?.packing.multi,
        counts?.packing.multiDuplicate,
      )}
    </button>
  `;
  host.classList.toggle("is-loading", releaseAssistantPeopleStatusRefreshing());
  if (state.releaseAssistantPackingDetailOpen) {
    renderReleaseAssistantPackingDetailModal();
  }
}

function releaseAssistantPackingDetailMetricMarkup(personName, type, detail) {
  if (!detail) return "";
  const actualQuantity = Math.max(0, Number(detail?.actualQuantity) || 0);
  const expectedQuantity = Math.max(0, Number(detail?.expectedQuantity) || 0);
  const rawPercent = detail?.progressPercent;
  const suppliedPercent = rawPercent == null || rawPercent === ""
    ? Number.NaN
    : Number(rawPercent);
  const hasProgress = expectedQuantity > 0 && Number.isFinite(suppliedPercent);
  const percent = hasProgress
    ? Math.max(0, Math.round(suppliedPercent))
    : null;
  const width = percent == null ? 0 : Math.min(100, percent);
  const rawElapsedMinutes = detail?.elapsedMinutes;
  const elapsedMinutes = rawElapsedMinutes == null || rawElapsedMinutes === ""
    ? Number.NaN
    : Number(rawElapsedMinutes);
  const hasElapsed = Number.isFinite(elapsedMinutes) && elapsedMinutes >= 0;
  const progressLabel = expectedQuantity > 0
    ? `${formatNumber(actualQuantity)}/${formatNumber(expectedQuantity)}${
      hasElapsed ? ` · ${formatNumber(Math.round(elapsedMinutes))}` : ""
    }`
    : "无计划数量";
  const progressClass = percent != null && percent > 100
    ? " is-progress-danger"
    : percent != null && percent >= 80
      ? " is-progress-warn"
      : "";
  return `
    <article class="release-assistant-packing-detail-person${progressClass}">
      <header>
        <strong>${escapeHtml(personName)}</strong>
        <span>${escapeHtml(type)} · ${formatNumber(detail?.taskCount)} 条</span>
      </header>
      <div class="release-assistant-people-status-progress">
        <span title="${escapeHtml(
          expectedQuantity > 0
            ? `完成数量/计划数量 · 已进行分钟：${progressLabel}`
            : "WMS 未返回计划数量",
        )}">
          <i style="width: ${width}%"></i>
          <b>${escapeHtml(progressLabel)}</b>
        </span>
        <em>${percent == null ? "—" : `${formatNumber(percent)}%`}</em>
      </div>
    </article>
  `;
}

function renderReleaseAssistantPackingDetailModal() {
  const modal = el.releaseAssistantPackingDetailModal;
  if (!modal) return;
  modal.hidden = !state.releaseAssistantPackingDetailOpen;
  if (!state.releaseAssistantPackingDetailOpen) return;
  const summary = state.releaseAssistantSowingTaskSummary;
  const people = Array.isArray(summary?.packingPeopleDetails)
    ? summary.packingPeopleDetails
    : [];
  const singlePeople = people.filter((person) => person?.single);
  const multiPeople = people.filter((person) => person?.multi);
  if (el.releaseAssistantPackingDetailMeta) {
    el.releaseAssistantPackingDetailMeta.textContent = summary
      ? `WMS 出库复核 · 处理中 · ${formatNumber(people.length)} 人 · 更新于 ${summary.fetchedAt || "-"}`
      : "尚未读取打包中明细，请先刷新状态";
  }
  const groupMarkup = (label, rows, detailKey) => `
    <section class="release-assistant-packing-detail-group is-${detailKey.toLowerCase()}">
      <header>
        <strong>${escapeHtml(label)}</strong>
        <span>${formatNumber(rows.length)} 人 · ${formatNumber(
          rows.reduce(
            (total, person) => total + Math.max(
              0,
              Number(person?.[detailKey]?.taskCount) || 0,
            ),
            0,
          ),
        )} 条</span>
      </header>
      <div class="release-assistant-packing-detail-grid">
        ${rows.length
          ? rows.map((person) => releaseAssistantPackingDetailMetricMarkup(
            person?.name || "-",
            label,
            person?.[detailKey],
          )).join("")
          : `<div class="empty-state">暂无 ${escapeHtml(label)} 打包中任务</div>`}
      </div>
    </section>
  `;
  if (el.releaseAssistantPackingDetailContent) {
    el.releaseAssistantPackingDetailContent.innerHTML = summary
      ? `
        ${groupMarkup("Single", singlePeople, "single")}
        ${groupMarkup("Multi", multiPeople, "multi")}
      `
      : `<div class="empty-state">尚未读取打包中明细，请点击“刷新状态”后重试</div>`;
  }
}

function openReleaseAssistantPackingDetailModal() {
  if (!el.releaseAssistantPackingDetailModal) return;
  state.releaseAssistantPackingDetailOpen = true;
  el.releaseAssistantCancelPickModal?.setAttribute("inert", "");
  renderReleaseAssistantPackingDetailModal();
  el.releaseAssistantPackingDetailClose?.focus();
}

function closeReleaseAssistantPackingDetailModal(options = {}) {
  if (!state.releaseAssistantPackingDetailOpen) return;
  state.releaseAssistantPackingDetailOpen = false;
  renderReleaseAssistantPackingDetailModal();
  const nextShiftRosterOpen = Boolean(
    el.releaseAssistantNextShiftRosterModal
    && !el.releaseAssistantNextShiftRosterModal.hidden
  );
  el.releaseAssistantCancelPickModal?.toggleAttribute(
    "inert",
    nextShiftRosterOpen,
  );
  if (options.restoreFocus !== false) {
    el.releaseAssistantCancelPickStatusSummary
      ?.querySelector("[data-packing-detail-open]")
      ?.focus();
  }
}

function releaseAssistantPeopleStatusElapsedLabel(value = state.releaseAssistantPeopleStatusRefreshElapsedMs) {
  const seconds = Math.max(0, Number(value) || 0) / 1000;
  return seconds < 10 ? `${seconds.toFixed(1)} 秒` : `${Math.round(seconds)} 秒`;
}

function updateReleaseAssistantPeopleStatusElapsed() {
  if (state.releaseAssistantPeopleStatusRefreshStartedAt > 0) {
    state.releaseAssistantPeopleStatusRefreshElapsedMs = Math.max(
      0,
      Date.now() - state.releaseAssistantPeopleStatusRefreshStartedAt,
    );
  }
  const label = releaseAssistantPeopleStatusElapsedLabel();
  [
    el.releaseAssistantPeopleStatus,
    el.releaseAssistantCancelPickPeopleStatus,
  ].forEach((host) => {
    host?.querySelectorAll("[data-people-status-refresh-elapsed]").forEach((node) => {
      node.textContent = label;
    });
  });
}

function syncReleaseAssistantPeopleStatusElapsedTimer() {
  if (releaseAssistantPeopleStatusRefreshing()) {
    if (!state.releaseAssistantPeopleStatusRefreshStartedAt) {
      state.releaseAssistantPeopleStatusRefreshStartedAt = Date.now();
      state.releaseAssistantPeopleStatusRefreshElapsedMs = 0;
    }
    updateReleaseAssistantPeopleStatusElapsed();
    if (!state.releaseAssistantPeopleStatusRefreshTimer) {
      state.releaseAssistantPeopleStatusRefreshTimer = window.setInterval(
        updateReleaseAssistantPeopleStatusElapsed,
        200,
      );
    }
    return;
  }
  if (state.releaseAssistantPeopleStatusRefreshTimer) {
    window.clearInterval(state.releaseAssistantPeopleStatusRefreshTimer);
    state.releaseAssistantPeopleStatusRefreshTimer = null;
  }
  state.releaseAssistantPeopleStatusRefreshStartedAt = 0;
}

function clearReleaseAssistantPeopleStatusProgressWatchdog() {
  if (!state.releaseAssistantPeopleStatusProgressWatchdog) return;
  window.clearTimeout(state.releaseAssistantPeopleStatusProgressWatchdog);
  state.releaseAssistantPeopleStatusProgressWatchdog = null;
}

function finishReleaseAssistantPeopleStatusProgress(result, requestId, errorMessage = "") {
  if (
    state.releaseAssistantPeopleStatusAnalysis !== result
    || state.releaseAssistantPeopleStatusProgressRequestId !== requestId
  ) return false;
  clearReleaseAssistantPeopleStatusProgressWatchdog();
  result.livePickingTaskProgressLoading = false;
  state.releaseAssistantPeopleStatusProgressLoading = false;
  state.releaseAssistantPeopleStatusRefreshStage = "";
  if (errorMessage) {
    state.releaseAssistantPeopleStatusError =
      `人员结果已更新；${errorMessage}，请点击“刷新状态”重试`;
  }
  renderReleaseAssistantPeopleStatus();
  syncReleaseAssistantWaveZoneRefreshState();
  if (state.releaseAssistantCancelPickOpen) syncReleaseAssistantCancelPickSelection();
  return true;
}

function armReleaseAssistantPeopleStatusProgressWatchdog(result, requestId) {
  clearReleaseAssistantPeopleStatusProgressWatchdog();
  if (!result || !requestId || !state.releaseAssistantPeopleStatusProgressLoading) return;
  state.releaseAssistantPeopleStatusProgressWatchdog = window.setTimeout(() => {
    finishReleaseAssistantPeopleStatusProgress(
      result,
      requestId,
      "实时拣选进度读取超过 37 秒，已停止刷新",
    );
  }, WMS_PICKING_PROGRESS_WATCHDOG_MS);
}

function releaseAssistantPeopleStatusRefreshMarkup() {
  if (!releaseAssistantPeopleStatusRefreshing()) return "";
  const stage = state.releaseAssistantPeopleStatusRefreshStage || "base";
  const hasResult = Boolean(state.releaseAssistantPeopleStatusAnalysis);
  const text = stage === "progress"
    ? "人员结果已展示，正在读取实时拣选进度"
    : hasResult
      ? "正在刷新人员状态，当前结果继续展示"
      : "正在读取当日人员状态";
  return `
    <div class="release-assistant-people-status-refresh is-${escapeHtml(stage)}">
      <div>
        <strong>${escapeHtml(text)}</strong>
        <span>已用时 <em data-people-status-refresh-elapsed>${escapeHtml(releaseAssistantPeopleStatusElapsedLabel())}</em></span>
      </div>
      <span class="release-assistant-people-status-refresh-track" aria-hidden="true"><i></i></span>
    </div>
  `;
}

function releaseAssistantPeopleStatusMarkup() {
  const analysis = state.releaseAssistantPeopleStatusAnalysis;
  const refreshMarkup = releaseAssistantPeopleStatusRefreshMarkup();
  if (!analysis) {
    const text = state.releaseAssistantPeopleStatusLoading
      ? "正在读取当日实时人员状态…"
      : state.releaseAssistantPeopleStatusError || "暂无实时人员状态";
    return `
      <section class="release-assistant-people-status is-empty${refreshMarkup ? " is-refreshing" : ""}${state.releaseAssistantPeopleStatusError ? " is-error" : ""}">
        ${refreshMarkup || escapeHtml(text)}
      </section>
    `;
  }
  const groups = releaseAssistantAssignPickerGroups(analysis);
  const pickingMarkup = groups.picking
    .map((row) => releaseAssistantPeopleStatusPersonMarkup(row, analysis, "picking"))
    .join("");
  const waitingMarkup = groups.waiting
    .map((row) => releaseAssistantPeopleStatusPersonMarkup(row, analysis, "waiting"))
    .join("");
  const errorMarkup = state.releaseAssistantPeopleStatusError
    ? `
      <div class="release-assistant-people-status-error" role="status">
        ${escapeHtml(state.releaseAssistantPeopleStatusError)}
      </div>
    `
    : "";
  return `
    <section class="release-assistant-people-status${releaseAssistantPeopleStatusRefreshing() ? " is-loading" : ""}${state.releaseAssistantPeopleStatusError ? " is-error" : ""}">
      ${refreshMarkup}
      ${errorMarkup}
      <section class="release-assistant-people-status-group is-picking">
        <header>
          <strong>拣选中</strong>
          <span>${formatNumber(groups.picking.length)} 人</span>
        </header>
        <div class="release-assistant-people-status-list">
          ${pickingMarkup || "<em>暂无</em>"}
        </div>
      </section>
      <section class="release-assistant-people-status-group is-waiting">
        <header>
          <strong>已分配未拣选</strong>
          <span>${formatNumber(groups.waiting.length)} 人</span>
        </header>
        <div class="release-assistant-people-status-list">
          ${waitingMarkup || "<em>暂无</em>"}
        </div>
      </section>
    </section>
  `;
}

function renderReleaseAssistantPeopleStatus() {
  if (state.releaseAssistantCancelPickCardDragActive) {
    state.releaseAssistantPeopleStatusRenderPending = true;
    return;
  }
  state.releaseAssistantPeopleStatusRenderPending = false;
  const markup = releaseAssistantPeopleStatusMarkup();
  [
    el.releaseAssistantPeopleStatus,
    el.releaseAssistantCancelPickPeopleStatus,
  ].forEach((host) => {
    if (!host) return;
    host.innerHTML = markup;
    host.classList.toggle("is-loading", state.releaseAssistantPeopleStatusLoading);
    host.title = state.releaseAssistantPeopleStatusError || "";
  });
  renderReleaseAssistantCancelPickStatusSummary();
  syncReleaseAssistantPeopleStatusElapsedTimer();
}

function syncReleaseAssistantPeopleStatusAnalysis(
  analysis,
  businessDate = "",
  progressRequestId = 0,
) {
  if (!analysis) return;
  clearReleaseAssistantPeopleStatusProgressWatchdog();
  state.releaseAssistantPeopleStatusAnalysis = analysis;
  state.releaseAssistantPeopleStatusBusinessDate = String(businessDate || "").trim();
  state.releaseAssistantPeopleStatusProgressRequestId = Number(progressRequestId) || 0;
  state.releaseAssistantPeopleStatusProgressLoading = Boolean(
    analysis.livePickingTaskProgressLoading,
  );
  state.releaseAssistantPeopleStatusRefreshStage =
    state.releaseAssistantPeopleStatusProgressLoading ? "progress" : "";
  if (state.releaseAssistantPeopleStatusProgressLoading) {
    state.releaseAssistantPeopleStatusRefreshStartedAt = Date.now();
    state.releaseAssistantPeopleStatusRefreshElapsedMs = 0;
  }
  state.releaseAssistantPeopleStatusError = "";
  renderReleaseAssistantPeopleStatus();
  armReleaseAssistantPeopleStatusProgressWatchdog(
    analysis,
    state.releaseAssistantPeopleStatusProgressRequestId,
  );
  syncReleaseAssistantWaveZoneRefreshState();
  if (state.releaseAssistantCancelPickOpen) syncReleaseAssistantCancelPickSelection();
}

function syncReleaseAssistantWaveZoneRefreshState() {
  if (!el.releaseAssistantWaveZoneRefresh) return;
  const loading = state.releaseAssistantWaveZonesLoading;
  el.releaseAssistantWaveZoneRefresh.disabled = loading;
  el.releaseAssistantWaveZoneRefresh.textContent = loading ? "刷新中…" : "刷新";
}

async function loadReleaseAssistantPeopleStatus(options = {}) {
  const force = options.force === true;
  if (!force && state.releaseAssistantPeopleStatusAnalysis) {
    renderReleaseAssistantPeopleStatus();
    return state.releaseAssistantPeopleStatusAnalysis;
  }
  if (state.releaseAssistantPeopleStatusPromise) {
    if (force) {
      if (state.releaseAssistantPeopleStatusQueuedForcePromise) {
        return state.releaseAssistantPeopleStatusQueuedForcePromise;
      }
      const activePromise = state.releaseAssistantPeopleStatusPromise;
      const queuedPromise = Promise.resolve(activePromise)
        .catch(() => null)
        .then(() => {
          if (
            state.releaseAssistantPeopleStatusQueuedForcePromise
            === queuedPromise
          ) {
            state.releaseAssistantPeopleStatusQueuedForcePromise = null;
          }
          return loadReleaseAssistantPeopleStatus({ force: true });
        });
      state.releaseAssistantPeopleStatusQueuedForcePromise = queuedPromise;
      return queuedPromise;
    }
    return state.releaseAssistantPeopleStatusPromise;
  }
  const requestId = ++state.releaseAssistantPeopleStatusRequestId;
  state.pickingProgressRequestId += 1;
  clearReleaseAssistantPeopleStatusProgressWatchdog();
  if (state.releaseAssistantPeopleStatusAnalysis) {
    state.releaseAssistantPeopleStatusAnalysis.livePickingTaskProgressLoading = false;
  }
  state.releaseAssistantPeopleStatusLoading = true;
  state.releaseAssistantPeopleStatusProgressLoading = false;
  state.releaseAssistantPeopleStatusProgressRequestId = 0;
  state.releaseAssistantPeopleStatusRefreshStage = "base";
  state.releaseAssistantPeopleStatusRefreshStartedAt = Date.now();
  state.releaseAssistantPeopleStatusRefreshElapsedMs = 0;
  state.releaseAssistantPeopleStatusError = "";
  state.releaseAssistantSowingStatusError = "";
  renderReleaseAssistantPeopleStatus();
  syncReleaseAssistantWaveZoneRefreshState();
  if (state.releaseAssistantCancelPickOpen) syncReleaseAssistantCancelPickSelection();

  const promise = (async () => {
    try {
      let businessDate = String(el.wmsBusinessDate?.value || "").trim();
      if (!businessDate) {
        const bootstrap = await api("/api/bootstrap");
        if (requestId !== state.releaseAssistantPeopleStatusRequestId) return null;
        businessDate = String(
          bootstrap?.wmsBusinessDate || bootstrap?.today || "",
        ).trim();
        if (el.wmsBusinessDate && businessDate) {
          el.wmsBusinessDate.value = businessDate;
        }
      }
      if (requestId !== state.releaseAssistantPeopleStatusRequestId) return null;
      if (!businessDate) throw new Error("无法确定当前 WMS 业务日期");
      state.releaseAssistantPeopleStatusBusinessDate = businessDate;
      return await refreshWmsAnalysisForDate(businessDate, {
        syncReleaseAssistantPeopleStatus: true,
        releaseAssistantPeopleStatusRequestId: requestId,
      });
    } catch (error) {
      if (requestId === state.releaseAssistantPeopleStatusRequestId) {
        state.releaseAssistantPeopleStatusProgressLoading = false;
        state.releaseAssistantPeopleStatusRefreshStage = "";
        state.releaseAssistantPeopleStatusError = error.message || "当日实时人员状态读取失败";
      }
      return null;
    } finally {
      if (requestId === state.releaseAssistantPeopleStatusRequestId) {
        state.releaseAssistantPeopleStatusLoading = false;
        if (!state.releaseAssistantPeopleStatusProgressLoading) {
          state.releaseAssistantPeopleStatusRefreshStage = "";
        }
        renderReleaseAssistantPeopleStatus();
        syncReleaseAssistantWaveZoneRefreshState();
        if (state.releaseAssistantCancelPickOpen) syncReleaseAssistantCancelPickSelection();
      }
      if (state.releaseAssistantPeopleStatusPromise === promise) {
        state.releaseAssistantPeopleStatusPromise = null;
      }
    }
  })();
  state.releaseAssistantPeopleStatusPromise = promise;
  return promise;
}

function releaseAssistantAssignPickerRosterNames() {
  const seen = new Set();
  return (Array.isArray(state.nightRosterNames) ? state.nightRosterNames : [])
    .map((name) => String(name || "").trim())
    .filter((name) => {
      if (!name) return false;
      const key = personIdentityKey(name);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function releaseAssistantAssignPickerSearchKey(value) {
  return personIdentityKey(value);
}

function releaseAssistantAssignPickerSearchMatches() {
  const query = releaseAssistantAssignPickerSearchKey(
    state.releaseAssistantAssignPickerSearch,
  );
  if (!query) return [];
  return releaseAssistantAssignPickerRosterNames()
    .filter((name) => (
      !state.releaseAssistantAssignPickerInputNames.has(name)
      && !state.releaseAssistantAssignPickerSelected.has(name)
      && releaseAssistantAssignPickerSearchKey(name).includes(query)
    ))
    .sort((left, right) => {
      const leftStarts = releaseAssistantAssignPickerSearchKey(left).startsWith(query) ? 0 : 1;
      const rightStarts = releaseAssistantAssignPickerSearchKey(right).startsWith(query) ? 0 : 1;
      return leftStarts - rightStarts;
    })
    .slice(0, 12);
}

function releaseAssistantAssignPickerHasUnconfirmedInputNames() {
  return [...state.releaseAssistantAssignPickerInputNames]
    .some((name) => !state.releaseAssistantAssignPickerSelected.has(name));
}

function syncReleaseAssistantAssignPickerSearch(options = {}) {
  const host = el.releaseAssistantAssignPickerPanel?.querySelector(
    "[data-assign-picker-search-host]",
  );
  if (!host) return;
  const busy = state.releaseAssistantAssignPickerRunning
    || state.releaseAssistantAssignPickerResultBlocked;
  const error = el.releaseAssistantAssignPickerPanel?.querySelector(
    "[data-assign-picker-input-error]",
  );
  if (error) {
    error.textContent = state.releaseAssistantAssignPickerError;
    error.hidden = !state.releaseAssistantAssignPickerError;
  }
  const chips = host.querySelector("[data-assign-picker-input-chips]");
  if (chips) {
    chips.innerHTML = [...state.releaseAssistantAssignPickerInputNames].map((name) => {
      const confirmed = state.releaseAssistantAssignPickerSelected.has(name);
      return `
        <span class="release-assistant-assign-picker-input-chip${confirmed ? " is-confirmed" : ""}">
          <span>${escapeHtml(name)}</span>
          <button
            type="button"
            data-assign-picker-input-remove="${escapeHtml(name)}"
            aria-label="删除 ${escapeHtml(name)}"
            title="删除 ${escapeHtml(name)}"
            ${busy ? "disabled" : ""}
          >×</button>
        </span>
      `;
    }).join("");
  }
  const input = host.querySelector("[data-assign-picker-search-input]");
  if (input) {
    if (input.value !== state.releaseAssistantAssignPickerSearch) {
      input.value = state.releaseAssistantAssignPickerSearch;
    }
    input.disabled = busy;
    input.placeholder = state.releaseAssistantAssignPickerInputNames.size
      ? "继续输入拣选人"
      : "输入本班次拣选人";
  }
  const confirm = host.querySelector("[data-assign-picker-input-confirm]");
  if (confirm) {
    const hasQuery = Boolean(String(state.releaseAssistantAssignPickerSearch || "").trim());
    confirm.disabled = busy
      || hasQuery
      || !releaseAssistantAssignPickerHasUnconfirmedInputNames();
    confirm.title = hasQuery
      ? "请先从提示中选择姓名"
      : confirm.disabled && !busy
        ? "输入框内没有待确认的姓名"
        : "加入待分配拣选人";
  }
  const suggestions = host.querySelector("[data-assign-picker-suggestions]");
  if (suggestions) {
    const query = String(state.releaseAssistantAssignPickerSearch || "").trim();
    const matches = releaseAssistantAssignPickerSearchMatches();
    suggestions.hidden = !query;
    suggestions.innerHTML = !query
      ? ""
      : matches.length
        ? matches.map((name) => `
            <button
              type="button"
              role="option"
              data-assign-picker-suggestion="${escapeHtml(name)}"
            >
              ${escapeHtml(name)}
            </button>
          `).join("")
        : `<span>本班次名单中没有可添加的匹配姓名</span>`;
  }
  if (options.focus) {
    requestAnimationFrame(() => {
      el.releaseAssistantAssignPickerPanel
        ?.querySelector("[data-assign-picker-search-input]")
        ?.focus();
    });
  }
}

function addReleaseAssistantAssignPickerInputName(person) {
  const requestedName = String(person || "").trim();
  const rosterName = releaseAssistantAssignPickerRosterNames()
    .find((name) => name === requestedName);
  if (!rosterName) return;
  state.releaseAssistantAssignPickerInputNames.add(rosterName);
  state.releaseAssistantAssignPickerSearch = "";
  state.releaseAssistantAssignPickerError = "";
  syncReleaseAssistantAssignPickerSelection();
  syncReleaseAssistantCancelPickSelection();
  syncReleaseAssistantAssignPickerSearch({ focus: true });
}

function removeReleaseAssistantAssignPickerInputName(person) {
  const name = String(person || "").trim();
  if (!name) return;
  state.releaseAssistantAssignPickerInputNames.delete(name);
  state.releaseAssistantAssignPickerSelected.delete(name);
  state.releaseAssistantAssignPickerSearch = "";
  state.releaseAssistantAssignPickerError = "";
  syncReleaseAssistantAssignPickerSelection();
  syncReleaseAssistantCancelPickSelection();
  syncReleaseAssistantAssignPickerSearch({ focus: true });
}

function confirmReleaseAssistantAssignPickerInputNames() {
  const pendingNames = [...state.releaseAssistantAssignPickerInputNames]
    .filter((name) => !state.releaseAssistantAssignPickerSelected.has(name));
  if (!pendingNames.length) return;
  const nextSelected = new Set(state.releaseAssistantAssignPickerSelected);
  pendingNames.forEach((name) => nextSelected.add(name));
  if (nextSelected.size > state.releaseAssistantCancelPickSelected.size) {
    state.releaseAssistantAssignPickerError = "拣选人数不能多于已选择的拣选单数量";
    renderReleaseAssistantAssignPickerPanel();
    syncReleaseAssistantCancelPickSelection();
    syncReleaseAssistantAssignPickerSearch({ focus: true });
    return;
  }
  pendingNames.forEach((name) => state.releaseAssistantAssignPickerSelected.add(name));
  state.releaseAssistantAssignPickerSearch = "";
  state.releaseAssistantAssignPickerError = "";
  syncReleaseAssistantAssignPickerSelection();
  syncReleaseAssistantCancelPickSelection();
  syncReleaseAssistantAssignPickerSearch({ focus: true });
}

function syncReleaseAssistantAssignPickerSelection() {
  const selected = state.releaseAssistantAssignPickerSelected;
  el.releaseAssistantAssignPickerPanel?.querySelectorAll("[data-assign-picker-person]").forEach((button) => {
    const isSelected = selected.has(String(button.dataset.assignPickerPerson || "").trim());
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", isSelected ? "true" : "false");
  });
  const count = el.releaseAssistantAssignPickerPanel?.querySelector("[data-assign-picker-selected-count]");
  if (count) count.textContent = `已选择 ${formatNumber(selected.size)} 人`;
  syncReleaseAssistantAssignPickerSearch();
  syncReleaseAssistantAssignPickerFloatControls();
}

function syncReleaseAssistantAssignPickerFloatControls() {
  const panel = el.releaseAssistantAssignPickerPanel;
  if (!panel || !state.releaseAssistantAssignPickerOpen) return;
  const selectedOrderCount = state.releaseAssistantCancelPickSelected.size;
  const selectedPersonCount = state.releaseAssistantAssignPickerSelected.size;
  const selectedRows = releaseAssistantCancelPickRows().filter((row) => (
    state.releaseAssistantCancelPickSelected.has(String(row?.pickOrderNo || ""))
  ));
  const allSelectedAssignable = selectedOrderCount > 0
    && selectedRows.length === selectedOrderCount
    && selectedRows.every((row) => row?.canAssign !== false);
  const tooManyPeople = selectedPersonCount > selectedOrderCount;
  const hasPendingInput = releaseAssistantAssignPickerHasUnconfirmedInputNames()
    || Boolean(String(state.releaseAssistantAssignPickerSearch || "").trim());
  if (
    state.releaseAssistantAssignPickerError === "拣选人数不能多于已选择的拣选单数量"
    && !tooManyPeople
  ) {
    state.releaseAssistantAssignPickerError = "";
    const error = panel.querySelector("[data-assign-picker-input-error]");
    if (error) {
      error.textContent = "";
      error.hidden = true;
    }
  }
  const meta = panel.querySelector("[data-assign-picker-order-count]");
  if (meta) {
    meta.textContent = `已选择 ${formatNumber(selectedOrderCount)} 条拣选单 · ${formatNumber(selectedPersonCount)} 人`;
  }
  const submit = panel.querySelector("[data-assign-picker-float-submit]");
  if (submit) {
    const busy = state.releaseAssistantAssignPickerRunning
      || state.releaseAssistantCancelPickLoading;
    submit.disabled = busy
      || state.releaseAssistantAssignPickerResultBlocked
      || !selectedOrderCount
      || !selectedPersonCount
      || !allSelectedAssignable
      || tooManyPeople
      || hasPendingInput
      || Boolean(state.releaseAssistantAssignPickerError);
    submit.textContent = state.releaseAssistantAssignPickerRunning ? "分配中…" : "分配";
    submit.title = !selectedOrderCount
      ? "请先选择拣选单"
      : !allSelectedAssignable
        ? "所选拣选单中包含不支持指定拣选人的记录"
        : !selectedPersonCount
          ? "请选择拣选人"
          : tooManyPeople
            ? "拣选人数不能多于已选择的拣选单数量"
            : hasPendingInput
              ? "请先选择并确认输入框内的拣选人"
              : state.releaseAssistantAssignPickerError;
  }
  const close = panel.querySelector("[data-assign-picker-float-close]");
  if (close) close.disabled = state.releaseAssistantAssignPickerRunning;
}

function resetReleaseAssistantAssignPicker() {
  const drag = state.releaseAssistantAssignPickerDrag;
  const dragHandle = el.releaseAssistantAssignPickerPanel?.querySelector(
    "[data-assign-picker-drag-handle]",
  );
  if (drag && dragHandle?.hasPointerCapture?.(drag.pointerId)) {
    dragHandle.releasePointerCapture(drag.pointerId);
  }
  state.releaseAssistantAssignPickerRequestId += 1;
  state.releaseAssistantAssignPickerOpen = false;
  state.releaseAssistantAssignPickerLoading = false;
  state.releaseAssistantAssignPickerError = "";
  state.releaseAssistantAssignPickerBusinessDate = "";
  state.releaseAssistantAssignPickerAnalysis = null;
  state.releaseAssistantAssignPickerSelected.clear();
  state.releaseAssistantAssignPickerInputNames.clear();
  state.releaseAssistantAssignPickerSearch = "";
  state.releaseAssistantAssignPickerRunning = false;
  state.releaseAssistantAssignPickerResultBlocked = false;
  state.releaseAssistantAssignPickerDrag = null;
  renderReleaseAssistantAssignPickerPanel();
}

function positionReleaseAssistantAssignPickerFloat(
  position = state.releaseAssistantAssignPickerPosition,
) {
  const panel = el.releaseAssistantAssignPickerPanel;
  if (!panel || panel.hidden) return;
  const margin = 8;
  const rect = panel.getBoundingClientRect();
  const maxLeft = Math.max(margin, window.innerWidth - rect.width - margin);
  const maxTop = Math.max(margin, window.innerHeight - rect.height - margin);
  const requestedLeft = Number(position?.left);
  const requestedTop = Number(position?.top);
  const left = Math.min(
    maxLeft,
    Math.max(
      margin,
      Number.isFinite(requestedLeft) ? requestedLeft : (window.innerWidth - rect.width) / 2,
    ),
  );
  const top = Math.min(
    maxTop,
    Math.max(margin, Number.isFinite(requestedTop) ? requestedTop : 72),
  );
  panel.style.left = `${Math.round(left)}px`;
  panel.style.top = `${Math.round(top)}px`;
  state.releaseAssistantAssignPickerPosition = { left, top };
}

function startReleaseAssistantAssignPickerDrag(event) {
  const panel = el.releaseAssistantAssignPickerPanel;
  const handle = event.target.closest("[data-assign-picker-drag-handle]");
  if (
    event.button !== 0
    || !panel
    || panel.hidden
    || !state.releaseAssistantAssignPickerOpen
    || !handle
    || event.target.closest("button, input, select, textarea, a, label")
  ) return;
  const rect = panel.getBoundingClientRect();
  state.releaseAssistantAssignPickerDrag = {
    pointerId: event.pointerId,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
  };
  handle.classList.add("is-dragging");
  handle.setPointerCapture?.(event.pointerId);
  event.preventDefault();
}

function moveReleaseAssistantAssignPickerDrag(event) {
  const drag = state.releaseAssistantAssignPickerDrag;
  const panel = el.releaseAssistantAssignPickerPanel;
  if (!drag || !panel || drag.pointerId !== event.pointerId) return;
  const margin = 8;
  const rect = panel.getBoundingClientRect();
  const left = Math.min(
    Math.max(margin, window.innerWidth - rect.width - margin),
    Math.max(margin, event.clientX - drag.offsetX),
  );
  const top = Math.min(
    Math.max(margin, window.innerHeight - rect.height - margin),
    Math.max(margin, event.clientY - drag.offsetY),
  );
  panel.style.left = `${Math.round(left)}px`;
  panel.style.top = `${Math.round(top)}px`;
  state.releaseAssistantAssignPickerPosition = { left, top };
}

function finishReleaseAssistantAssignPickerDrag(event) {
  const drag = state.releaseAssistantAssignPickerDrag;
  if (!drag || (event?.pointerId != null && drag.pointerId !== event.pointerId)) return;
  const handle = el.releaseAssistantAssignPickerPanel?.querySelector(
    "[data-assign-picker-drag-handle]",
  );
  state.releaseAssistantAssignPickerDrag = null;
  handle?.classList.remove("is-dragging");
  if (handle?.hasPointerCapture?.(drag.pointerId)) {
    handle.releasePointerCapture(drag.pointerId);
  }
}

function renderReleaseAssistantAssignPickerPanel() {
  const panel = el.releaseAssistantAssignPickerPanel;
  if (!panel) return;
  const previousInput = panel.querySelector("[data-assign-picker-search-input]");
  const restoreInputFocus = document.activeElement === previousInput;
  const restoreSelectionStart = restoreInputFocus ? previousInput.selectionStart : null;
  const restoreSelectionEnd = restoreInputFocus ? previousInput.selectionEnd : null;
  panel.hidden = !state.releaseAssistantAssignPickerOpen;
  if (!state.releaseAssistantAssignPickerOpen) {
    panel.innerHTML = "";
    return;
  }

  const floatBarMarkup = `
    <header
      class="release-assistant-assign-picker-float-bar"
      data-assign-picker-drag-handle
    >
      <div>
        <strong>指定拣选人</strong>
        <span data-assign-picker-order-count>
          已选择 ${formatNumber(state.releaseAssistantCancelPickSelected.size)} 条拣选单
          · ${formatNumber(state.releaseAssistantAssignPickerSelected.size)} 人
        </span>
      </div>
      <div class="release-assistant-assign-picker-float-actions">
        <button type="button" data-assign-picker-float-submit disabled>分配</button>
        <button
          class="icon-button"
          type="button"
          data-assign-picker-float-close
          aria-label="关闭指定拣选人"
          title="关闭"
        >×</button>
      </div>
    </header>
  `;
  const analysis = state.releaseAssistantAssignPickerAnalysis;
  const groups = releaseAssistantAssignPickerGroups(analysis);
  const pickingMarkup = groups.picking
    .map((row) => releaseAssistantAssignPickerCandidateMarkup(row, analysis))
    .join("");
  const waitingMarkup = groups.waiting
    .map((row) => releaseAssistantAssignPickerCandidateMarkup(row, analysis))
    .join("");
  const analyzedAt = String(analysis?.source?.analyzedAt || "").trim();
  panel.innerHTML = `
    ${floatBarMarkup}
    <div class="release-assistant-assign-picker-scroll">
      <div class="release-assistant-assign-picker-head">
        <div>
          <strong>选择拣选人</strong>
          <span>
            当日 ${escapeHtml(state.releaseAssistantAssignPickerBusinessDate || "-")}
            · ${state.releaseAssistantAssignPickerLoading ? "正在刷新…" : `更新于 ${escapeHtml(analyzedAt || "-")}`}
            · 点击姓名可多选，再点取消
          </span>
        </div>
        <div class="release-assistant-assign-picker-search" data-assign-picker-search-host>
          <div class="release-assistant-assign-picker-search-control">
            <label class="release-assistant-assign-picker-search-field">
              <span data-assign-picker-input-chips></span>
              <input
                type="text"
                data-assign-picker-search-input
                value="${escapeHtml(state.releaseAssistantAssignPickerSearch)}"
                placeholder="输入本班次拣选人"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="none"
                spellcheck="false"
                aria-label="输入本班次拣选人"
              >
            </label>
            <button type="button" data-assign-picker-input-confirm disabled>确认</button>
          </div>
          <div
            class="release-assistant-assign-picker-suggestions"
            data-assign-picker-suggestions
            role="listbox"
            aria-label="本班次匹配姓名"
            hidden
          ></div>
        </div>
        <b data-assign-picker-selected-count>已选择 ${formatNumber(state.releaseAssistantAssignPickerSelected.size)} 人</b>
      </div>
      <div
        class="release-assistant-assign-picker-error"
        data-assign-picker-input-error
        ${state.releaseAssistantAssignPickerError ? "" : "hidden"}
      >${escapeHtml(state.releaseAssistantAssignPickerError)}</div>
      <div class="release-assistant-assign-picker-groups">
        <section>
          <div class="release-assistant-assign-picker-group-head">
            <strong>拣选中的人</strong>
            <span>${formatNumber(groups.picking.length)} 人</span>
          </div>
          <div class="release-assistant-assign-picker-people">
            ${pickingMarkup || `<span class="release-assistant-assign-picker-empty">没有拣选中的人</span>`}
          </div>
        </section>
        <section>
          <div class="release-assistant-assign-picker-group-head">
            <strong>已分配但未在拣选的人</strong>
            <span>${formatNumber(groups.waiting.length)} 人</span>
          </div>
          <div class="release-assistant-assign-picker-people">
            ${waitingMarkup || `<span class="release-assistant-assign-picker-empty">当前没有等待人员</span>`}
          </div>
        </section>
      </div>
    </div>
  `;
  syncReleaseAssistantAssignPickerSelection();
  positionReleaseAssistantAssignPickerFloat();
  if (restoreInputFocus) {
    requestAnimationFrame(() => {
      const input = panel.querySelector("[data-assign-picker-search-input]");
      if (!input || input.disabled) return;
      input.focus({ preventScroll: true });
      if (restoreSelectionStart != null && restoreSelectionEnd != null) {
        input.setSelectionRange(restoreSelectionStart, restoreSelectionEnd);
      }
    });
  }
}

function releaseAssistantWaveManageRows() {
  return Array.isArray(state.releaseAssistantWaveManageData?.rows)
    ? state.releaseAssistantWaveManageData.rows
    : [];
}

function releaseAssistantWaveManageNumber(value) {
  return value === "" || value == null ? "-" : formatNumber(value);
}

function releaseAssistantWaveManageTotalPages(data = state.releaseAssistantWaveManageData) {
  const total = Math.max(0, Number(data?.total) || 0);
  const size = Math.max(1, Number(data?.size) || state.releaseAssistantWaveManageSize || 50);
  return Math.max(1, Number(data?.totalPages) || Math.ceil(total / size) || 1);
}

function releaseAssistantWaveManageCanCancel(row) {
  const waveNo = String(row?.waveNo || "").trim();
  const status = Number(row?.status);
  return Boolean(waveNo)
    && status === 20
    && Number(row?.outboundOrderCount) > 0
    && row?.canCancel !== false;
}

function releaseAssistantWaveManageEligibleRows() {
  return releaseAssistantWaveManageRows().filter(releaseAssistantWaveManageCanCancel);
}

function syncReleaseAssistantWaveManageSelection() {
  const rows = releaseAssistantWaveManageRows();
  const eligibleRows = releaseAssistantWaveManageEligibleRows();
  const selected = state.releaseAssistantWaveManageSelected;
  const busy = state.releaseAssistantWaveManageLoading || state.releaseAssistantWaveManageRunning;

  el.releaseAssistantWaveManageContent?.querySelectorAll("input[data-wave-manage-row-index]").forEach((checkbox) => {
    const row = rows[Number(checkbox.dataset.waveManageRowIndex)];
    const waveNo = String(row?.waveNo || "").trim();
    const canCancel = releaseAssistantWaveManageCanCancel(row);
    checkbox.checked = canCancel && selected.has(waveNo);
    checkbox.disabled = busy || !canCancel;
    checkbox.closest("tr")?.classList.toggle("is-selected", checkbox.checked);
  });

  const selectAll = el.releaseAssistantWaveManageContent?.querySelector("[data-wave-manage-select-all]");
  if (selectAll) {
    const selectedOnPage = eligibleRows.filter((row) => selected.has(String(row.waveNo))).length;
    selectAll.checked = eligibleRows.length > 0 && selectedOnPage === eligibleRows.length;
    selectAll.indeterminate = selectedOnPage > 0 && selectedOnPage < eligibleRows.length;
    selectAll.disabled = busy || !eligibleRows.length;
  }

  if (el.releaseAssistantWaveManageSelectedCount) {
    el.releaseAssistantWaveManageSelectedCount.textContent = `已选择 ${formatNumber(selected.size)} 条`;
  }
  if (el.releaseAssistantWaveManageConfirmAll) {
    el.releaseAssistantWaveManageConfirmAll.disabled = busy || !selected.size;
    el.releaseAssistantWaveManageConfirmAll.textContent = (
      state.releaseAssistantWaveManageRunningAction === "confirm"
    )
      ? "确认中…"
      : selected.size
        ? `批量确认（${formatNumber(selected.size)}）`
        : "批量确认";
  }
  if (el.releaseAssistantWaveManageCancelAll) {
    el.releaseAssistantWaveManageCancelAll.disabled = busy || !selected.size;
    el.releaseAssistantWaveManageCancelAll.textContent = (
      state.releaseAssistantWaveManageRunningAction === "cancel"
    )
      ? "取消中…"
      : selected.size
        ? `批量取消（${formatNumber(selected.size)}）`
        : "批量取消";
  }
  if (el.releaseAssistantWaveManageRefresh) {
    el.releaseAssistantWaveManageRefresh.disabled = busy;
    el.releaseAssistantWaveManageRefresh.textContent = state.releaseAssistantWaveManageLoading
      ? "读取中…"
      : "刷新";
  }
  if (el.releaseAssistantWaveManageClose) {
    el.releaseAssistantWaveManageClose.disabled = busy;
  }
  el.releaseAssistantWaveManageContent?.querySelectorAll("[data-wave-manage-confirm]").forEach((button) => {
    const row = rows[Number(button.dataset.waveManageRowIndex)];
    button.disabled = busy || !releaseAssistantWaveManageCanCancel(row);
  });
  el.releaseAssistantWaveManageContent?.querySelectorAll("[data-wave-manage-cancel]").forEach((button) => {
    const row = rows[Number(button.dataset.waveManageRowIndex)];
    button.disabled = busy || !releaseAssistantWaveManageCanCancel(row);
  });
  el.releaseAssistantWaveManageContent?.querySelectorAll("[data-wave-manage-page]").forEach((button) => {
    button.disabled = button.disabled || busy;
  });
}

function renderReleaseAssistantWaveManageModal() {
  if (!el.releaseAssistantWaveManageModal) return;
  el.releaseAssistantWaveManageModal.hidden = !state.releaseAssistantWaveManageOpen;
  if (!state.releaseAssistantWaveManageOpen) return;

  const data = state.releaseAssistantWaveManageData;
  const rows = releaseAssistantWaveManageRows();
  const page = Math.max(1, Number(data?.page) || state.releaseAssistantWaveManagePage || 1);
  const size = Math.max(1, Number(data?.size) || state.releaseAssistantWaveManageSize || 50);
  const total = Math.max(0, Number(data?.total) || 0);
  const totalPages = releaseAssistantWaveManageTotalPages(data);

  if (el.releaseAssistantWaveManageMeta) {
    el.releaseAssistantWaveManageMeta.textContent = state.releaseAssistantWaveManageLoading && !data
      ? "正在从 WMS 接口读取已创建波次…"
      : `WMS 已创建波次 · 共 ${formatNumber(total)} 条 · 第 ${formatNumber(page)} / ${formatNumber(totalPages)} 页`;
  }

  if (el.releaseAssistantWaveManageNotice) {
    const noticeParts = [];
    if (state.releaseAssistantWaveManageRunning) {
      const runningLabel = state.releaseAssistantWaveManageRunningAction === "confirm"
        ? "确认"
        : "取消";
      noticeParts.push(`正在调用 WMS ${runningLabel}波次，请勿重复操作…`);
    }
    if (state.releaseAssistantWaveManageMessage) {
      noticeParts.push(state.releaseAssistantWaveManageMessage);
    }
    if (state.releaseAssistantWaveManageError) {
      noticeParts.push(state.releaseAssistantWaveManageError);
    }
    el.releaseAssistantWaveManageNotice.textContent = noticeParts.join("；");
    el.releaseAssistantWaveManageNotice.hidden = !noticeParts.length;
    el.releaseAssistantWaveManageNotice.classList.toggle(
      "is-error",
      Boolean(state.releaseAssistantWaveManageError),
    );
    el.releaseAssistantWaveManageNotice.classList.toggle(
      "is-success",
      Boolean(state.releaseAssistantWaveManageMessage) && !state.releaseAssistantWaveManageError,
    );
  }

  if (el.releaseAssistantWaveManageContent) {
    if (state.releaseAssistantWaveManageLoading && !data) {
      el.releaseAssistantWaveManageContent.innerHTML = `
        <div class="release-assistant-wave-manage-empty">正在读取 WMS 已创建波次…</div>
      `;
    } else if (state.releaseAssistantWaveManageError && !data) {
      el.releaseAssistantWaveManageContent.innerHTML = `
        <div class="release-assistant-wave-manage-empty is-error">${escapeHtml(state.releaseAssistantWaveManageError)}</div>
      `;
    } else {
      el.releaseAssistantWaveManageContent.innerHTML = `
        <div class="release-assistant-wave-manage-table-wrap">
          <table class="release-assistant-wave-manage-table">
            <thead>
              <tr>
                <th class="is-selection">
                  <input type="checkbox" data-wave-manage-select-all aria-label="全选当前页已创建波次">
                </th>
                <th>序号</th>
                <th>波次单号</th>
                <th>出库单量</th>
                <th>包裹数量</th>
                <th>拣选单数量</th>
                <th>创建人</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              ${rows.length ? rows.map((row, rowIndex) => {
                const waveNo = String(row?.waveNo || "").trim();
                const canCancel = releaseAssistantWaveManageCanCancel(row);
                const selected = state.releaseAssistantWaveManageSelected.has(waveNo);
                const disabledReason = canCancel
                  ? ""
                  : "当前波次不可确认或取消";
                const serial = (page - 1) * size + rowIndex + 1;
                return `
                  <tr class="${selected ? "is-selected" : ""}">
                    <td class="is-selection">
                      <input
                        type="checkbox"
                        data-wave-manage-row-index="${rowIndex}"
                        aria-label="选择波次 ${escapeHtml(waveNo)}"
                        ${selected && canCancel ? "checked" : ""}
                        ${canCancel ? "" : "disabled"}
                        title="${escapeHtml(disabledReason)}"
                      >
                    </td>
                    <td>${formatNumber(serial)}</td>
                    <td class="is-wave-no" title="${escapeHtml(waveNo)}">${escapeHtml(waveNo || "-")}</td>
                    <td>${escapeHtml(releaseAssistantWaveManageNumber(row?.outboundOrderCount))}</td>
                    <td>${escapeHtml(releaseAssistantWaveManageNumber(row?.packageCount))}</td>
                    <td>${escapeHtml(releaseAssistantWaveManageNumber(row?.pickOrderCount))}</td>
                    <td title="${escapeHtml(row?.creator || "-")}">${escapeHtml(row?.creator || "-")}</td>
                    <td title="${escapeHtml(row?.createTime || "-")}">${escapeHtml(row?.createTime || "-")}</td>
                    <td>
                      <div class="release-assistant-wave-manage-actions">
                        <button
                          type="button"
                          class="is-confirm"
                          data-wave-manage-confirm="${escapeHtml(waveNo)}"
                          data-wave-manage-row-index="${rowIndex}"
                          ${canCancel ? "" : "disabled"}
                          title="${escapeHtml(disabledReason)}"
                        >确认</button>
                        <button
                          type="button"
                          class="is-cancel"
                          data-wave-manage-cancel="${escapeHtml(waveNo)}"
                          data-wave-manage-row-index="${rowIndex}"
                          ${canCancel ? "" : "disabled"}
                          title="${escapeHtml(disabledReason)}"
                        >取消</button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join("") : `
                <tr><td colspan="9" class="release-assistant-wave-manage-empty-cell">没有已创建波次</td></tr>
              `}
            </tbody>
          </table>
        </div>
        <div class="release-assistant-wave-manage-pager">
          <span>共 ${formatNumber(total)} 条</span>
          <div>
            <button type="button" data-wave-manage-page="${page - 1}" ${page <= 1 ? "disabled" : ""}>上一页</button>
            <strong>${formatNumber(page)} / ${formatNumber(totalPages)}</strong>
            <button type="button" data-wave-manage-page="${page + 1}" ${page >= totalPages ? "disabled" : ""}>下一页</button>
          </div>
        </div>
      `;
    }
  }
  syncReleaseAssistantWaveManageSelection();
}

async function loadReleaseAssistantWaveManage(options = {}) {
  const page = Math.max(1, Math.trunc(Number(options.page) || state.releaseAssistantWaveManagePage || 1));
  const resetSelection = options.resetSelection !== false;
  const preserveNotice = options.preserveNotice === true;
  if (resetSelection) {
    state.releaseAssistantWaveManageSelected.clear();
    state.releaseAssistantWaveManageLastIndex = null;
  }
  if (!preserveNotice) {
    state.releaseAssistantWaveManageMessage = "";
    state.releaseAssistantWaveManageError = "";
  }
  state.releaseAssistantWaveManagePage = page;
  state.releaseAssistantWaveManageLoading = true;
  state.releaseAssistantWaveManageData = null;
  const requestId = ++state.releaseAssistantWaveManageRequestId;
  renderReleaseAssistantWaveManageModal();
  try {
    const data = await api("/api/release-assistant/wave-management/list", {
      page,
      size: state.releaseAssistantWaveManageSize,
    });
    if (
      requestId !== state.releaseAssistantWaveManageRequestId
      || !state.releaseAssistantWaveManageOpen
    ) return;
    const totalPages = releaseAssistantWaveManageTotalPages(data);
    if (page > totalPages) {
      state.releaseAssistantWaveManageLoading = false;
      await loadReleaseAssistantWaveManage({
        page: totalPages,
        resetSelection: true,
        preserveNotice,
      });
      return;
    }
    state.releaseAssistantWaveManageData = data;
    if (!resetSelection) {
      const active = new Set(
        (Array.isArray(data?.rows) ? data.rows : [])
          .filter(releaseAssistantWaveManageCanCancel)
          .map((row) => String(row.waveNo || "").trim())
          .filter(Boolean),
      );
      state.releaseAssistantWaveManageSelected.forEach((waveNo) => {
        if (!active.has(waveNo)) state.releaseAssistantWaveManageSelected.delete(waveNo);
      });
      state.releaseAssistantWaveManageLastIndex = null;
    }
  } catch (error) {
    if (
      requestId !== state.releaseAssistantWaveManageRequestId
      || !state.releaseAssistantWaveManageOpen
    ) return;
    const detail = error.message || "WMS 已创建波次读取失败";
    const priorNotice = [
      state.releaseAssistantWaveManageMessage,
      state.releaseAssistantWaveManageError,
    ].filter(Boolean).join("；");
    state.releaseAssistantWaveManageError = preserveNotice && priorNotice
      ? `${priorNotice}；列表刷新失败：${detail}`
      : detail;
    if (preserveNotice) state.releaseAssistantWaveManageMessage = "";
  } finally {
    if (requestId === state.releaseAssistantWaveManageRequestId) {
      state.releaseAssistantWaveManageLoading = false;
      renderReleaseAssistantWaveManageModal();
    }
  }
}

function openReleaseAssistantWaveManage() {
  if (
    !el.releaseAssistantWaveManageModal
    || state.releaseAssistantWaveManageRunning
    || state.releaseAssistantCancelPickOpen
    || state.releaseAssistantWaveConfirmationActionLoading
  ) return;
  state.releaseAssistantWaveManageOpen = true;
  state.releaseAssistantWaveManagePage = 1;
  state.releaseAssistantWaveManageData = null;
  state.releaseAssistantWaveManageError = "";
  state.releaseAssistantWaveManageMessage = "";
  state.releaseAssistantWaveManageSelected.clear();
  state.releaseAssistantWaveManageLastIndex = null;
  state.releaseAssistantWaveManageRunningAction = "";
  renderReleaseAssistantWaveManageModal();
  el.releaseAssistantWaveManageClose?.focus();
  loadReleaseAssistantWaveManage({ page: 1, resetSelection: true });
}

function closeReleaseAssistantWaveManage() {
  if (state.releaseAssistantWaveManageLoading || state.releaseAssistantWaveManageRunning) return;
  state.releaseAssistantWaveManageRequestId += 1;
  state.releaseAssistantWaveManageOpen = false;
  state.releaseAssistantWaveManageLoading = false;
  state.releaseAssistantWaveManageData = null;
  state.releaseAssistantWaveManageSelected.clear();
  state.releaseAssistantWaveManageLastIndex = null;
  state.releaseAssistantWaveManageRunningAction = "";
  renderReleaseAssistantWaveManageModal();
}

function selectReleaseAssistantWaveManageRange(rowIndex, checked) {
  const rows = releaseAssistantWaveManageRows();
  const anchor = state.releaseAssistantWaveManageLastIndex;
  const start = Number.isInteger(anchor) ? Math.min(anchor, rowIndex) : rowIndex;
  const end = Number.isInteger(anchor) ? Math.max(anchor, rowIndex) : rowIndex;
  for (let index = start; index <= end; index += 1) {
    const row = rows[index];
    if (!releaseAssistantWaveManageCanCancel(row)) continue;
    const waveNo = String(row.waveNo || "").trim();
    if (checked) state.releaseAssistantWaveManageSelected.add(waveNo);
    else state.releaseAssistantWaveManageSelected.delete(waveNo);
  }
}

function releaseAssistantWaveManageResultList(result, keys) {
  for (const key of keys) {
    if (Array.isArray(result?.[key])) {
      return [...new Set(result[key].map((value) => String(value || "").trim()).filter(Boolean))];
    }
  }
  return [];
}

async function cancelReleaseAssistantManagedWaveNos(waveNos) {
  if (state.releaseAssistantWaveManageRunning || state.releaseAssistantWaveManageLoading) return;
  const unique = [...new Set((Array.isArray(waveNos) ? waveNos : [])
    .map((value) => String(value || "").trim())
    .filter(Boolean))];
  if (!unique.length) return;

  state.releaseAssistantWaveManageRunning = true;
  state.releaseAssistantWaveManageRunningAction = "cancel";
  state.releaseAssistantWaveManageMessage = "";
  state.releaseAssistantWaveManageError = "";
  renderReleaseAssistantWaveManageModal();
  let shouldRefresh = false;
  try {
    const result = await api("/api/release-assistant/wave-management/cancel", {
      waveNos: unique,
    });
    const succeeded = releaseAssistantWaveManageResultList(result, [
      "successWaveNos",
      "successWaveList",
      "succeededWaveNos",
      "succeeded",
    ]);
    const failed = releaseAssistantWaveManageResultList(result, [
      "failedWaveNos",
      "failWaveList",
      "failureWaveNos",
      "failed",
    ]);
    const reportedUnknown = releaseAssistantWaveManageResultList(result, [
      "unknownWaveNos",
      "unknownWaveList",
      "unknown",
    ]);
    const classified = new Set([...succeeded, ...failed, ...reportedUnknown]);
    const unknown = [...new Set([
      ...reportedUnknown,
      ...unique.filter((waveNo) => !classified.has(waveNo)),
    ])];

    succeeded.forEach((waveNo) => state.releaseAssistantWaveManageSelected.delete(waveNo));
    shouldRefresh = succeeded.length > 0;
    state.releaseAssistantWaveManageMessage = succeeded.length
      ? `已取消 ${formatNumber(succeeded.length)} 个波次`
      : "";
    const errors = [];
    if (failed.length) {
      errors.push(
        `${formatNumber(failed.length)} 个波次取消失败：${failed.slice(0, 6).join("、")}${failed.length > 6 ? "…" : ""}`,
      );
    }
    if (unknown.length) {
      errors.push(
        `${formatNumber(unknown.length)} 个取消结果待确认：${unknown.slice(0, 6).join("、")}${unknown.length > 6 ? "…" : ""}`,
      );
    }
    state.releaseAssistantWaveManageError = errors.join("；");
  } catch (error) {
    state.releaseAssistantWaveManageError = error.message || "取消波次失败";
  } finally {
    state.releaseAssistantWaveManageRunning = false;
    state.releaseAssistantWaveManageRunningAction = "";
    state.releaseAssistantWaveManageLastIndex = null;
    if (state.releaseAssistantWaveManageOpen && shouldRefresh) {
      await loadReleaseAssistantWaveManage({
        page: state.releaseAssistantWaveManagePage,
        resetSelection: false,
        preserveNotice: true,
      });
    } else {
      renderReleaseAssistantWaveManageModal();
    }
  }
}

async function confirmReleaseAssistantManagedWaveNos(waveNos) {
  if (state.releaseAssistantWaveManageRunning || state.releaseAssistantWaveManageLoading) return;
  const unique = [...new Set((Array.isArray(waveNos) ? waveNos : [])
    .map((value) => String(value || "").trim())
    .filter(Boolean))];
  if (!unique.length) return;

  state.releaseAssistantWaveManageRunning = true;
  state.releaseAssistantWaveManageRunningAction = "confirm";
  state.releaseAssistantWaveManageMessage = "";
  state.releaseAssistantWaveManageError = "";
  renderReleaseAssistantWaveManageModal();

  const succeeded = [];
  const failed = [];
  const unknown = [];
  try {
    for (const waveNo of unique) {
      try {
        const result = await api("/api/release-assistant/wave-confirmation/action", {
          waveNo,
          action: "confirm",
        });
        const successWaveNos = releaseAssistantWaveManageResultList(result, [
          "successWaveNos",
          "successWaveList",
          "succeededWaveNos",
          "succeeded",
        ]);
        const failedWaveNos = releaseAssistantWaveManageResultList(result, [
          "failedWaveNos",
          "failWaveList",
          "failureWaveNos",
          "failed",
        ]);
        if (successWaveNos.includes(waveNo) && !failedWaveNos.includes(waveNo)) {
          succeeded.push(waveNo);
        } else if (failedWaveNos.includes(waveNo)) {
          failed.push(waveNo);
        } else {
          unknown.push(waveNo);
        }
      } catch (error) {
        failed.push(waveNo);
      }
    }

    succeeded.forEach((waveNo) => state.releaseAssistantWaveManageSelected.delete(waveNo));
    state.releaseAssistantWaveManageMessage = succeeded.length
      ? `已确认 ${formatNumber(succeeded.length)} 个波次`
      : "";
    const errors = [];
    if (failed.length) {
      errors.push(
        `${formatNumber(failed.length)} 个波次确认失败：${failed.slice(0, 6).join("、")}${failed.length > 6 ? "…" : ""}`,
      );
    }
    if (unknown.length) {
      errors.push(
        `${formatNumber(unknown.length)} 个确认结果待确认：${unknown.slice(0, 6).join("、")}${unknown.length > 6 ? "…" : ""}`,
      );
    }
    state.releaseAssistantWaveManageError = errors.join("；");
  } finally {
    state.releaseAssistantWaveManageRunning = false;
    state.releaseAssistantWaveManageRunningAction = "";
    state.releaseAssistantWaveManageLastIndex = null;
    if (state.releaseAssistantWaveManageOpen && succeeded.length) {
      const remainingSelectedWaveNos = [...state.releaseAssistantWaveManageSelected];
      await loadReleaseAssistantWaveManage({
        page: state.releaseAssistantWaveManagePage,
        resetSelection: false,
        preserveNotice: true,
      });
      remainingSelectedWaveNos.forEach((waveNo) => {
        state.releaseAssistantWaveManageSelected.add(waveNo);
      });
      renderReleaseAssistantWaveManageModal();
    } else {
      renderReleaseAssistantWaveManageModal();
    }
  }
}

function handleReleaseAssistantWaveManageClick(event) {
  if (event.target === el.releaseAssistantWaveManageModal) {
    closeReleaseAssistantWaveManage();
    return;
  }
  if (event.target.closest("#releaseAssistantWaveManageClose")) {
    closeReleaseAssistantWaveManage();
    return;
  }
  if (event.target.closest("#releaseAssistantWaveManageRefresh")) {
    loadReleaseAssistantWaveManage({
      page: state.releaseAssistantWaveManagePage,
      resetSelection: true,
    });
    return;
  }
  const confirmAll = event.target.closest("#releaseAssistantWaveManageConfirmAll");
  if (confirmAll && !confirmAll.disabled) {
    confirmReleaseAssistantManagedWaveNos([...state.releaseAssistantWaveManageSelected]);
    return;
  }
  const cancelAll = event.target.closest("#releaseAssistantWaveManageCancelAll");
  if (cancelAll && !cancelAll.disabled) {
    cancelReleaseAssistantManagedWaveNos([...state.releaseAssistantWaveManageSelected]);
    return;
  }
  const pageButton = event.target.closest("[data-wave-manage-page]");
  if (pageButton && !pageButton.disabled) {
    loadReleaseAssistantWaveManage({
      page: Number(pageButton.dataset.waveManagePage),
      resetSelection: true,
    });
    return;
  }
  const selectAll = event.target.closest("[data-wave-manage-select-all]");
  if (selectAll && !selectAll.disabled) {
    releaseAssistantWaveManageEligibleRows().forEach((row) => {
      const waveNo = String(row.waveNo || "").trim();
      if (selectAll.checked) state.releaseAssistantWaveManageSelected.add(waveNo);
      else state.releaseAssistantWaveManageSelected.delete(waveNo);
    });
    state.releaseAssistantWaveManageLastIndex = null;
    syncReleaseAssistantWaveManageSelection();
    return;
  }
  const checkbox = event.target.closest("[data-wave-manage-row-index]");
  if (checkbox?.matches("input[type='checkbox']") && !checkbox.disabled) {
    const rowIndex = Number(checkbox.dataset.waveManageRowIndex);
    const row = releaseAssistantWaveManageRows()[rowIndex];
    if (!releaseAssistantWaveManageCanCancel(row)) return;
    const waveNo = String(row.waveNo || "").trim();
    if (event.shiftKey && Number.isInteger(state.releaseAssistantWaveManageLastIndex)) {
      selectReleaseAssistantWaveManageRange(rowIndex, checkbox.checked);
    } else if (checkbox.checked) {
      state.releaseAssistantWaveManageSelected.add(waveNo);
    } else {
      state.releaseAssistantWaveManageSelected.delete(waveNo);
    }
    state.releaseAssistantWaveManageLastIndex = rowIndex;
    syncReleaseAssistantWaveManageSelection();
    return;
  }
  const confirmButton = event.target.closest("[data-wave-manage-confirm]");
  if (confirmButton && !confirmButton.disabled) {
    confirmReleaseAssistantManagedWaveNos([confirmButton.dataset.waveManageConfirm || ""]);
    return;
  }
  const cancelButton = event.target.closest("[data-wave-manage-cancel]");
  if (cancelButton && !cancelButton.disabled) {
    cancelReleaseAssistantManagedWaveNos([cancelButton.dataset.waveManageCancel || ""]);
  }
}

function releaseAssistantCancelPickTotalPages(data = state.releaseAssistantCancelPickData) {
  const total = Math.max(0, Number(data?.total) || 0);
  const size = Math.max(1, Number(data?.size) || state.releaseAssistantCancelPickSize || 500);
  return Math.max(1, Number(data?.totalPages) || Math.ceil(total / size) || 1);
}

function releaseAssistantCancelPickEligibleRows() {
  return releaseAssistantCancelPickRows().filter((row) => (
    row?.canCancel !== false
    || row?.canAssign === true
    || row?.canAdjustPriority === true
  ) && row?.pickOrderNo);
}

function renderReleaseAssistantCancelPickNotice() {
  if (
    !el.releaseAssistantCancelPickNotice
    || !el.releaseAssistantCancelPickNoticeText
  ) return;
  const noticeParts = [
    `已选择 ${formatNumber(state.releaseAssistantCancelPickSelected.size)} 个拣选单`,
  ];
  if (state.releaseAssistantCancelPickRunning) {
    noticeParts.push("正在调用 WMS 取消拣选单，请勿重复操作…");
  }
  if (
    state.releaseAssistantAssignPickerRunning
    && !state.releaseAssistantNextShiftPickerSubmitting
  ) {
    noticeParts.push("正在调用 WMS 指定拣选人，请勿重复操作…");
  }
  if (state.releaseAssistantNextShiftPickerSubmitting) {
    noticeParts.push("正在为下个班次人员分配拣选单，请勿重复操作…");
  }
  if (state.releaseAssistantPickPriorityRunning) {
    noticeParts.push(
      `正在调用 WMS 调整为${releaseAssistantPickPriorityLabel(state.releaseAssistantPickPriorityRunning)}…`,
    );
  }
  if (state.releaseAssistantCancelPickMessage) {
    noticeParts.push(state.releaseAssistantCancelPickMessage);
  }
  if (state.releaseAssistantCancelPickError) {
    noticeParts.push(state.releaseAssistantCancelPickError);
  }
  el.releaseAssistantCancelPickNoticeText.textContent = noticeParts.join("；");
  el.releaseAssistantCancelPickNotice.hidden = false;
  el.releaseAssistantCancelPickNotice.classList.toggle(
    "is-error",
    Boolean(state.releaseAssistantCancelPickError),
  );
  el.releaseAssistantCancelPickNotice.classList.toggle(
    "is-success",
    Boolean(state.releaseAssistantCancelPickMessage)
      && !state.releaseAssistantCancelPickError,
  );
}

function syncReleaseAssistantCancelPickCollapse() {
  const collapsed = Boolean(state.releaseAssistantCancelPickControlsCollapsed);
  el.releaseAssistantCancelPickStickyControls?.classList.toggle(
    "is-top-collapsed",
    collapsed,
  );
  if (el.releaseAssistantCancelPickCollapse) {
    el.releaseAssistantCancelPickCollapse.setAttribute(
      "aria-expanded",
      String(!collapsed),
    );
    el.releaseAssistantCancelPickCollapse.textContent =
      collapsed ? "展开 ▼" : "折叠 ▲";
    el.releaseAssistantCancelPickCollapse.title =
      collapsed ? "展开上方状态区域" : "折叠上方状态区域";
  }
}

function toggleReleaseAssistantCancelPickCollapse() {
  state.releaseAssistantCancelPickControlsCollapsed =
    !state.releaseAssistantCancelPickControlsCollapsed;
  syncReleaseAssistantCancelPickCollapse();
}

function syncReleaseAssistantCancelPickSelection() {
  const rows = releaseAssistantCancelPickRows();
  const eligibleRows = releaseAssistantCancelPickEligibleRows();
  const selected = state.releaseAssistantCancelPickSelected;
  renderReleaseAssistantCancelPickNotice();
  syncReleaseAssistantNextShiftPickerWithPickSelection();
  const selectedRows = rows.filter((row) => selected.has(String(row?.pickOrderNo || "")));
  const allSelectedAssignable = selected.size > 0
    && selectedRows.length === selected.size
    && selectedRows.every((row) => row?.canAssign !== false);
  const allSelectedCancelable = selected.size > 0
    && selectedRows.length === selected.size
    && selectedRows.every((row) => row?.canCancel !== false);
  const allSelectedPrioritizable = selected.size > 0
    && selectedRows.length === selected.size
    && selectedRows.every((row) => row?.canAdjustPriority === true);
  const priorityRunning = Number(state.releaseAssistantPickPriorityRunning) || 0;
  const hasPendingInput = releaseAssistantAssignPickerHasUnconfirmedInputNames()
    || Boolean(String(state.releaseAssistantAssignPickerSearch || "").trim());
  const assignPickerOpen = state.releaseAssistantAssignPickerOpen;
  const assignPickerBusy = state.releaseAssistantAssignPickerRunning;
  const assignPickerHasTooManyPeople = state.releaseAssistantAssignPickerSelected.size
    > selected.size;
  if (
    state.releaseAssistantAssignPickerError === "拣选人数不能多于已选择的拣选单数量"
    && !assignPickerHasTooManyPeople
  ) {
    state.releaseAssistantAssignPickerError = "";
  }
  const nextShiftRosterOpen = Boolean(
    el.releaseAssistantNextShiftRosterModal
    && !el.releaseAssistantNextShiftRosterModal.hidden
  );
  const packingDetailOpen = state.releaseAssistantPackingDetailOpen;
  const nextShiftRosterBusy = state.releaseAssistantNextShiftRosterLoading
    || state.releaseAssistantNextShiftRosterSaving
    || nextShiftRosterOpen;
  const nextShiftPickerSubmitting = state.releaseAssistantNextShiftPickerSubmitting;
  if (el.releaseAssistantCancelPickModal) {
    el.releaseAssistantCancelPickModal.toggleAttribute(
      "inert",
      nextShiftRosterOpen || packingDetailOpen,
    );
  }
  el.releaseAssistantCancelPickContent?.querySelectorAll("input[data-cancel-pick-row-index]").forEach((checkbox) => {
    const row = rows[Number(checkbox.dataset.cancelPickRowIndex)];
    const pickOrderNo = String(row?.pickOrderNo || "");
    const canSelect = Boolean(pickOrderNo)
      && (
        row?.canCancel !== false
        || row?.canAssign === true
        || row?.canAdjustPriority === true
      );
    checkbox.checked = canSelect && selected.has(pickOrderNo);
    checkbox.disabled = !canSelect
      || state.releaseAssistantCancelPickLoading
      || state.releaseAssistantCancelPickRunning
      || Boolean(priorityRunning)
      || assignPickerBusy
      || nextShiftPickerSubmitting
      || nextShiftRosterBusy;
    const selectionRoot = checkbox.closest("[data-cancel-pick-row-click-index]");
    selectionRoot?.classList.toggle("is-selected", checkbox.checked);
    selectionRoot?.setAttribute("aria-selected", checkbox.checked ? "true" : "false");
  });
  const rowsByPickOrderNo = new Map(rows.map((row) => [
    String(row?.pickOrderNo || "").trim(),
    row,
  ]));
  el.releaseAssistantCancelPickContent
    ?.querySelectorAll("input[data-cancel-pick-card-select]")
    .forEach((checkbox) => {
      const card = checkbox.closest(".release-assistant-pick-order-card");
      const pickOrderNos = releaseAssistantCancelPickCardPickOrderNos(card);
      const groupRows = pickOrderNos.map((pickOrderNo) => rowsByPickOrderNo.get(pickOrderNo));
      const canSelect = pickOrderNos.length > 0
        && groupRows.length === pickOrderNos.length
        && groupRows.every((row) => row && (
          row?.canCancel !== false
          || row?.canAssign === true
          || row?.canAdjustPriority === true
        ));
      const selectedCount = pickOrderNos.filter((pickOrderNo) => selected.has(pickOrderNo)).length;
      const allSelected = canSelect && selectedCount === pickOrderNos.length;
      const partiallySelected = selectedCount > 0 && !allSelected;
      checkbox.checked = allSelected;
      checkbox.indeterminate = partiallySelected;
      checkbox.disabled = !canSelect
        || state.releaseAssistantCancelPickLoading
        || state.releaseAssistantCancelPickRunning
        || Boolean(priorityRunning)
        || assignPickerBusy
        || nextShiftPickerSubmitting
        || nextShiftRosterBusy;
      card?.classList.toggle("is-selected", allSelected);
      card?.classList.toggle("is-partial", partiallySelected);
      card?.setAttribute(
        "aria-selected",
        allSelected ? "true" : partiallySelected ? "mixed" : "false",
      );
    });
  const selectAll = el.releaseAssistantCancelPickContent?.querySelector("[data-cancel-pick-select-all]");
  if (selectAll) {
    const selectedOnPage = eligibleRows.filter((row) => selected.has(row.pickOrderNo)).length;
    selectAll.checked = eligibleRows.length > 0 && selectedOnPage === eligibleRows.length;
    selectAll.indeterminate = selectedOnPage > 0 && selectedOnPage < eligibleRows.length;
    selectAll.disabled = !eligibleRows.length
      || state.releaseAssistantCancelPickLoading
      || state.releaseAssistantCancelPickRunning
      || Boolean(priorityRunning)
      || assignPickerBusy
      || nextShiftPickerSubmitting
      || nextShiftRosterBusy;
  }
  if (el.releaseAssistantCancelPickSelectedCount) {
    el.releaseAssistantCancelPickSelectedCount.textContent = `已选择 ${formatNumber(selected.size)} 条`;
  }
  if (el.releaseAssistantCancelPickClearSelection) {
    el.releaseAssistantCancelPickClearSelection.disabled = !selected.size
      || state.releaseAssistantCancelPickRunning
      || state.releaseAssistantAssignPickerRunning
      || Boolean(priorityRunning)
      || nextShiftPickerSubmitting
      || nextShiftRosterBusy;
  }
  if (el.releaseAssistantAssignNextShiftPicker) {
    el.releaseAssistantAssignNextShiftPicker.disabled = state.releaseAssistantCancelPickRunning
      || state.releaseAssistantAssignPickerRunning
      || Boolean(priorityRunning)
      || assignPickerOpen
      || nextShiftPickerSubmitting
      || nextShiftRosterBusy
      || state.releaseAssistantNextShiftPickerLoading
      || state.releaseAssistantNextShiftPickerOpen;
    el.releaseAssistantAssignNextShiftPicker.textContent = nextShiftPickerSubmitting
      ? "分配中…"
      : state.releaseAssistantNextShiftRosterLoading
        ? "读取名单中…"
        : state.releaseAssistantNextShiftRosterSaving
          ? "保存名单中…"
          : state.releaseAssistantNextShiftPickerLoading
            ? "读取人员中…"
            : "指定下个班次拣选人";
    el.releaseAssistantAssignNextShiftPicker.title = selected.size
      ? `为已选择的 ${formatNumber(selected.size)} 条拣选单选择下个班次拣选人`
      : "更新下个班次拣选人名单";
  }
  if (el.releaseAssistantAssignPicker) {
    el.releaseAssistantAssignPicker.disabled = !selected.size
      || !allSelectedAssignable
      || state.releaseAssistantCancelPickLoading
      || state.releaseAssistantCancelPickRunning
      || Boolean(priorityRunning)
      || assignPickerBusy
      || nextShiftPickerSubmitting
      || state.releaseAssistantNextShiftPickerOpen
      || nextShiftRosterBusy
      || (assignPickerOpen && !state.releaseAssistantAssignPickerSelected.size)
      || (assignPickerOpen && assignPickerHasTooManyPeople)
      || (assignPickerOpen && hasPendingInput)
      || (assignPickerOpen && Boolean(state.releaseAssistantAssignPickerError))
      || state.releaseAssistantAssignPickerResultBlocked;
    el.releaseAssistantAssignPicker.textContent = state.releaseAssistantAssignPickerRunning
      ? "分配中…"
      : assignPickerOpen && state.releaseAssistantAssignPickerSelected.size
          ? "分配"
          : "指定拣选人";
    el.releaseAssistantAssignPicker.title = selected.size && !allSelectedAssignable
      ? "所选拣选单中包含不支持指定拣选人的记录"
      : assignPickerOpen && assignPickerHasTooManyPeople
        ? "拣选人数不能多于已选择的拣选单数量"
        : assignPickerOpen && hasPendingInput
          ? "请先选择并确认输入框内的拣选人"
          : "";
  }
  if (el.releaseAssistantCancelAssignPicker) {
    el.releaseAssistantCancelAssignPicker.hidden = !assignPickerOpen;
    el.releaseAssistantCancelAssignPicker.disabled = state.releaseAssistantCancelPickRunning
      || Boolean(priorityRunning)
      || assignPickerBusy
      || nextShiftPickerSubmitting
      || nextShiftRosterBusy;
  }
  if (el.releaseAssistantCancelPickAll) {
    el.releaseAssistantCancelPickAll.hidden = assignPickerOpen;
    el.releaseAssistantCancelPickAll.disabled = !selected.size
      || !allSelectedCancelable
      || state.releaseAssistantCancelPickLoading
      || state.releaseAssistantCancelPickRunning
      || Boolean(priorityRunning)
      || assignPickerBusy
      || nextShiftPickerSubmitting
      || nextShiftRosterBusy;
    el.releaseAssistantCancelPickAll.textContent = state.releaseAssistantCancelPickRunning
      ? "取消中…"
      : selected.size ? `全部取消（${formatNumber(selected.size)}）` : "全部取消";
    el.releaseAssistantCancelPickAll.title = selected.size && !allSelectedCancelable
      ? "所选拣选单中包含不支持取消的记录"
      : "";
  }
  if (el.releaseAssistantCancelPickRefresh) {
    el.releaseAssistantCancelPickRefresh.disabled =
      state.releaseAssistantPeopleStatusLoading
      || state.releaseAssistantPeopleStatusProgressLoading;
    el.releaseAssistantCancelPickRefresh.textContent =
      state.releaseAssistantPeopleStatusLoading
      || state.releaseAssistantPeopleStatusProgressLoading
        ? "状态刷新中…"
        : "刷新状态";
  }
  if (el.releaseAssistantCancelPickMatrixRefresh) {
    el.releaseAssistantCancelPickMatrixRefresh.disabled =
      state.releaseAssistantCancelPickLoading
      || state.releaseAssistantCancelPickRunning
      || Boolean(priorityRunning)
      || assignPickerBusy
      || nextShiftPickerSubmitting
      || nextShiftRosterBusy;
    el.releaseAssistantCancelPickMatrixRefresh.textContent =
      state.releaseAssistantCancelPickLoading
        ? "矩阵刷新中…"
        : "矩阵刷新";
  }
  if (el.releaseAssistantCancelPickClose) {
    el.releaseAssistantCancelPickClose.disabled = state.releaseAssistantCancelPickRunning
      || state.releaseAssistantAssignPickerRunning
      || Boolean(priorityRunning)
      || nextShiftPickerSubmitting
      || nextShiftRosterBusy;
  }
  el.releaseAssistantCancelPickModal?.querySelectorAll("[data-pick-order-priority]").forEach((button) => {
    const priority = Number(button.dataset.pickOrderPriority);
    const label = releaseAssistantPickPriorityLabel(priority);
    button.disabled = !selected.size
      || !allSelectedPrioritizable
      || state.releaseAssistantCancelPickLoading
      || state.releaseAssistantCancelPickRunning
      || Boolean(priorityRunning)
      || assignPickerBusy
      || assignPickerOpen
      || nextShiftPickerSubmitting
      || nextShiftRosterBusy;
    button.textContent = priorityRunning === priority ? `${label}调整中…` : label;
    button.title = selected.size && !allSelectedPrioritizable
      ? "所选拣选单中包含不支持调整优先级的记录"
      : "";
  });
  el.releaseAssistantCancelPickContent?.querySelectorAll("[data-cancel-pick-order]").forEach((button) => {
    const row = rows[Number(button.dataset.cancelPickRowIndex)];
    button.disabled = row?.canCancel === false
      || !row?.pickOrderNo
      || state.releaseAssistantCancelPickLoading
      || state.releaseAssistantCancelPickRunning
      || Boolean(priorityRunning)
      || assignPickerBusy
      || assignPickerOpen
      || nextShiftPickerSubmitting
      || nextShiftRosterBusy;
  });
  el.releaseAssistantCancelPickContent?.querySelectorAll("[data-cancel-pick-page]").forEach((button) => {
    button.disabled = button.disabled
      || state.releaseAssistantCancelPickLoading
      || state.releaseAssistantCancelPickRunning
      || Boolean(priorityRunning)
      || assignPickerBusy
      || assignPickerOpen
      || nextShiftPickerSubmitting
      || nextShiftRosterBusy;
  });
  syncReleaseAssistantCancelPickCardActions();
  syncReleaseAssistantAssignPickerFloatControls();
}

function renderReleaseAssistantCancelPickModal() {
  if (!el.releaseAssistantCancelPickModal) return;
  el.releaseAssistantCancelPickModal.hidden = !state.releaseAssistantCancelPickOpen;
  if (!state.releaseAssistantCancelPickOpen) return;
  renderReleaseAssistantPeopleStatus();
  renderReleaseAssistantCancelPickStatusSummary();
  syncReleaseAssistantCancelPickCollapse();

  const data = state.releaseAssistantCancelPickData;
  const rows = releaseAssistantCancelPickRows();
  const tableIndexedRows = releaseAssistantCancelPickIndexedRows(
    rows,
    state.releaseAssistantCancelPickTableSortMode,
  ).map((item, tableIndex) => ({ ...item, tableIndex }));
  const page = Math.max(1, Number(data?.page) || state.releaseAssistantCancelPickPage || 1);
  const total = Math.max(0, Number(data?.total) || 0);
  const unassignedTotal = Math.max(0, Number(data?.unassignedTotal) || 0);
  const assignedTotal = Math.max(0, Number(data?.assignedTotal) || 0);
  const totalPages = releaseAssistantCancelPickTotalPages(data);
  if (el.releaseAssistantCancelPickMeta) {
    el.releaseAssistantCancelPickMeta.textContent = state.releaseAssistantCancelPickLoading && !data
      ? "正在从 WMS 接口读取可管理拣选单…"
      : `WMS 可管理 · 未分配 ${formatNumber(unassignedTotal)} 条 · 已分配 ${formatNumber(assignedTotal)} 条 · 共 ${formatNumber(total)} 条 · 第 ${formatNumber(page)} / ${formatNumber(totalPages)} 页`;
  }

  renderReleaseAssistantCancelPickNotice();

  if (el.releaseAssistantCancelPickContent) {
    if (state.releaseAssistantCancelPickLoading && !data) {
      el.releaseAssistantCancelPickContent.innerHTML = `
        <div class="release-assistant-cancel-pick-empty">正在读取 WMS 可管理拣选单…</div>
      `;
    } else if (state.releaseAssistantCancelPickError && !data) {
      el.releaseAssistantCancelPickContent.innerHTML = `
        <div class="release-assistant-cancel-pick-empty is-error">${escapeHtml(state.releaseAssistantCancelPickError)}</div>
      `;
    } else {
      el.releaseAssistantCancelPickContent.innerHTML = `
        ${releaseAssistantCancelPickCardOverviewMarkup(rows)}
        <div class="release-assistant-cancel-pick-table-wrap">
          <table class="release-assistant-cancel-pick-table">
            <thead>
              <tr>
                <th class="is-selection">
                  <input type="checkbox" data-cancel-pick-select-all aria-label="全选当前页可管理的拣选单">
                </th>
                <th>拣选单号</th>
                <th>库位总数</th>
                <th>包裹数量</th>
                <th>拣选数量</th>
                <th>拣选品数量</th>
                <th>创建人</th>
                <th>指派人</th>
                <th>拣选人</th>
                <th>拣选单状态</th>
                <th>优先级</th>
                <th>操作类型</th>
                <th class="is-zones">库区</th>
                <th class="is-actions">
                  <span class="release-assistant-cancel-pick-table-action-label">操作</span>
                  ${releaseAssistantCancelPickSortButtonsMarkup(
                    "table",
                    state.releaseAssistantCancelPickTableSortMode,
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              ${tableIndexedRows.length ? tableIndexedRows.map(({ row, rowIndex, tableIndex }) => {
                const pickOrderNo = String(row?.pickOrderNo || "");
                const canCancel = row?.canCancel !== false && Boolean(pickOrderNo);
                const canAdjustPriority = row?.canAdjustPriority === true && Boolean(pickOrderNo);
                const canSelect = canCancel || row?.canAssign === true || canAdjustPriority;
                const selectionDisabledReason = canSelect
                  ? ""
                  : (
                    row?.cancelDisabledReason
                    || row?.assignDisabledReason
                    || row?.priorityDisabledReason
                    || "当前拣选单不可操作"
                  );
                const cancelDisabledReason = canCancel
                  ? ""
                  : (row?.cancelDisabledReason || "当前拣选单不可取消");
                const zones = Array.isArray(row?.zones)
                  ? row.zones.map((zone) => String(zone || "").trim()).filter(Boolean)
                  : [];
                const zoneText = zones.length ? zones.join("、") : "-";
                const priority = Number(row?.priority) || 0;
                const priorityLabel = row?.priorityLabel || releaseAssistantPickPriorityLabel(priority);
                const rowClasses = [
                  canSelect ? "is-selectable" : "",
                  state.releaseAssistantCancelPickSelected.has(pickOrderNo) ? "is-selected" : "",
                ].filter(Boolean).join(" ");
                return `
                  <tr
                    class="${rowClasses}"
                    data-cancel-pick-row-click-index="${rowIndex}"
                    data-cancel-pick-table-index="${tableIndex}"
                  >
                    <td class="is-selection">
                      <input
                        type="checkbox"
                        data-cancel-pick-row-index="${rowIndex}"
                        data-cancel-pick-table-index="${tableIndex}"
                        aria-label="选择拣选单 ${escapeHtml(pickOrderNo)}"
                        ${state.releaseAssistantCancelPickSelected.has(pickOrderNo) && canSelect ? "checked" : ""}
                        ${canSelect ? "" : "disabled"}
                        title="${escapeHtml(selectionDisabledReason)}"
                      >
                    </td>
                    <td class="is-pick-order-no">
                      ${escapeHtml(pickOrderNo || "-")}
                    </td>
                    <td>${escapeHtml(releaseAssistantCancelPickNumber(row?.locationCount))}</td>
                    <td>${escapeHtml(releaseAssistantCancelPickNumber(row?.packageCount))}</td>
                    <td>${escapeHtml(releaseAssistantCancelPickNumber(row?.pickItemCount))}</td>
                    <td>${escapeHtml(releaseAssistantCancelPickNumber(row?.pickItemKindCount))}</td>
                    <td>${escapeHtml(row?.creator || "-")}</td>
                    <td>${escapeHtml(row?.assignedOperator || "-")}</td>
                    <td>${escapeHtml(row?.operator || "-")}</td>
                    <td><span class="release-assistant-cancel-pick-status${Number(row?.status) === 350 ? " is-assigned" : ""}"><i></i>${escapeHtml(row?.statusLabel || releaseAssistantCancelPickStatusLabel(row?.status))}</span></td>
                    <td><span class="release-assistant-pick-priority${priority ? ` is-${priority}` : ""}">${escapeHtml(priorityLabel)}</span></td>
                    <td>${escapeHtml(row?.operationTypeLabel || "-")}</td>
                    <td class="is-zones" title="${escapeHtml(zoneText)}">${escapeHtml(zoneText)}</td>
                    <td>
                      <button
                        type="button"
                        data-cancel-pick-order="${escapeHtml(pickOrderNo)}"
                        data-cancel-pick-row-index="${rowIndex}"
                        ${canCancel ? "" : "disabled"}
                        title="${escapeHtml(cancelDisabledReason)}"
                      >取消拣选单</button>
                    </td>
                  </tr>
                `;
              }).join("") : `
                <tr><td colspan="14" class="release-assistant-cancel-pick-empty-cell">没有待拣选或已分配记录</td></tr>
              `}
            </tbody>
          </table>
        </div>
        <div class="release-assistant-cancel-pick-pager">
          <span>共 ${formatNumber(total)} 条</span>
          <div>
            <button type="button" data-cancel-pick-page="${page - 1}" ${page <= 1 ? "disabled" : ""}>上一页</button>
            <strong>${formatNumber(page)} / ${formatNumber(totalPages)}</strong>
            <button type="button" data-cancel-pick-page="${page + 1}" ${page >= totalPages ? "disabled" : ""}>下一页</button>
          </div>
        </div>
      `;
    }
  }
  syncReleaseAssistantCancelPickSelection();
  if (state.releaseAssistantCancelPickFitFrame) {
    window.cancelAnimationFrame(state.releaseAssistantCancelPickFitFrame);
  }
  state.releaseAssistantCancelPickFitFrame = window.requestAnimationFrame(() => {
    state.releaseAssistantCancelPickFitFrame = 0;
    fitReleaseAssistantPickOrderCards();
  });
  renderReleaseAssistantAssignPickerPanel();
}

async function loadReleaseAssistantPendingPickOrders(options = {}) {
  const page = Math.max(1, Math.trunc(Number(options.page) || state.releaseAssistantCancelPickPage || 1));
  const resetSelection = options.resetSelection !== false;
  const preserveNotice = options.preserveNotice === true;
  const silentError = options.silentError === true;
  const keepCurrentData = options.keepCurrentData === true || !resetSelection;
  if (resetSelection) {
    state.releaseAssistantCancelPickSelected.clear();
    state.releaseAssistantCancelPickLastIndex = null;
    state.releaseAssistantCancelPickCardRangeAnchor = "";
    state.releaseAssistantCancelPickCardActionAnchor = "";
    resetReleaseAssistantAssignPicker();
  }
  if (!preserveNotice) {
    state.releaseAssistantCancelPickMessage = "";
    state.releaseAssistantCancelPickError = "";
  }
  state.releaseAssistantCancelPickPage = page;
  state.releaseAssistantCancelPickLoading = true;
  if (!keepCurrentData) state.releaseAssistantCancelPickData = null;
  const requestId = ++state.releaseAssistantCancelPickRequestId;
  renderReleaseAssistantCancelPickModal();
  try {
    const data = await api(
      "/api/release-assistant/pick-orders/pending",
      {
        page,
        size: state.releaseAssistantCancelPickSize,
      },
      {
        timeoutMs: WMS_PICK_ORDER_MATRIX_REQUEST_TIMEOUT_MS,
        timeoutMessage: "订单矩阵读取超过 35 秒，已停止刷新并保留原矩阵",
      },
    );
    if (requestId !== state.releaseAssistantCancelPickRequestId || !state.releaseAssistantCancelPickOpen) return;
    const totalPages = releaseAssistantCancelPickTotalPages(data);
    if (page > totalPages) {
      state.releaseAssistantCancelPickLoading = false;
      await loadReleaseAssistantPendingPickOrders({
        page: totalPages,
        resetSelection: true,
        preserveNotice,
      });
      return;
    }
    state.releaseAssistantCancelPickData = data;
    if (!resetSelection) {
      const activeSelectable = new Set(
        (Array.isArray(data?.rows) ? data.rows : [])
          .filter((row) => (
            row?.canCancel !== false
            || row?.canAssign === true
            || row?.canAdjustPriority === true
          ) && row?.pickOrderNo)
          .map((row) => row.pickOrderNo),
      );
      state.releaseAssistantCancelPickSelected.forEach((pickOrderNo) => {
        if (!activeSelectable.has(pickOrderNo)) state.releaseAssistantCancelPickSelected.delete(pickOrderNo);
      });
      state.releaseAssistantCancelPickLastIndex = null;
      state.releaseAssistantCancelPickCardRangeAnchor = "";
    }
  } catch (error) {
    if (requestId !== state.releaseAssistantCancelPickRequestId || !state.releaseAssistantCancelPickOpen) return;
    if (silentError) return;
    const detail = error.message || "WMS 可管理拣选单读取失败";
    const priorNotice = [
      state.releaseAssistantCancelPickMessage,
      state.releaseAssistantCancelPickError,
    ].filter(Boolean).join("；");
    state.releaseAssistantCancelPickError = preserveNotice && priorNotice
      ? `${priorNotice}；列表刷新失败：${detail}`
      : detail;
    if (preserveNotice) state.releaseAssistantCancelPickMessage = "";
  } finally {
    if (requestId === state.releaseAssistantCancelPickRequestId) {
      state.releaseAssistantCancelPickLoading = false;
      renderReleaseAssistantCancelPickModal();
    }
  }
}

function openReleaseAssistantCancelPickOrders() {
  if (
    !el.releaseAssistantCancelPickModal
    || state.releaseAssistantCancelPickRunning
    || state.releaseAssistantAssignPickerRunning
    || state.releaseAssistantPickPriorityRunning
    || state.releaseAssistantWaveManageOpen
    || state.releaseAssistantWaveManageRunning
  ) return;
  closeReleaseAssistantNextShiftPickerFloat({
    sync: false,
    restoreFocus: false,
    force: true,
  });
  finishReleaseAssistantCancelPickCardDrag();
  state.releaseAssistantCancelPickOpen = true;
  state.releaseAssistantCancelPickControlsCollapsed = false;
  state.releaseAssistantCancelPickPage = 1;
  state.releaseAssistantCancelPickData = null;
  state.releaseAssistantCancelPickError = "";
  state.releaseAssistantCancelPickMessage = "";
  state.releaseAssistantCancelPickSelected.clear();
  state.releaseAssistantCancelPickMatrixSortMode = "";
  state.releaseAssistantCancelPickTableSortMode = "";
  state.releaseAssistantCancelPickLastIndex = null;
  state.releaseAssistantCancelPickCardRangeAnchor = "";
  state.releaseAssistantCancelPickCardActionAnchor = "";
  resetReleaseAssistantAssignPicker();
  renderReleaseAssistantCancelPickModal();
  el.releaseAssistantCancelPickClose?.focus();
  void loadReleaseAssistantPendingPickOrders({ page: 1, resetSelection: true });
}

function closeReleaseAssistantCancelPickOrders() {
  if (
    state.releaseAssistantCancelPickRunning
    || state.releaseAssistantAssignPickerRunning
    || state.releaseAssistantPickPriorityRunning
    || state.releaseAssistantNextShiftPickerSubmitting
    || state.releaseAssistantNextShiftRosterLoading
    || state.releaseAssistantNextShiftRosterSaving
    || (
      el.releaseAssistantNextShiftRosterModal
      && !el.releaseAssistantNextShiftRosterModal.hidden
    )
  ) return;
  closeReleaseAssistantPackingDetailModal({ restoreFocus: false });
  closeReleaseAssistantNextShiftPickerFloat({
    sync: false,
    restoreFocus: false,
    force: true,
  });
  finishReleaseAssistantCancelPickCardDrag();
  state.releaseAssistantCancelPickRequestId += 1;
  state.releaseAssistantCancelPickOpen = false;
  state.releaseAssistantCancelPickControlsCollapsed = false;
  state.releaseAssistantCancelPickLoading = false;
  state.releaseAssistantCancelPickData = null;
  state.releaseAssistantCancelPickSelected.clear();
  state.releaseAssistantCancelPickMatrixSortMode = "";
  state.releaseAssistantCancelPickTableSortMode = "";
  state.releaseAssistantCancelPickLastIndex = null;
  state.releaseAssistantCancelPickCardRangeAnchor = "";
  state.releaseAssistantCancelPickCardActionAnchor = "";
  resetReleaseAssistantAssignPicker();
  renderReleaseAssistantCancelPickModal();
}

function clearReleaseAssistantCancelPickSelection() {
  if (
    state.releaseAssistantCancelPickRunning
    || state.releaseAssistantAssignPickerRunning
    || state.releaseAssistantPickPriorityRunning
    || state.releaseAssistantNextShiftPickerSubmitting
  ) return;
  state.releaseAssistantCancelPickSelected.clear();
  state.releaseAssistantCancelPickLastIndex = null;
  state.releaseAssistantCancelPickCardRangeAnchor = "";
  state.releaseAssistantCancelPickCardActionAnchor = "";
  if (!state.releaseAssistantAssignPickerOpen) {
    resetReleaseAssistantAssignPicker();
  }
  renderReleaseAssistantCancelPickModal();
}

function selectReleaseAssistantCancelPickRange(tableIndex, checked) {
  const rows = releaseAssistantCancelPickIndexedRows(
    releaseAssistantCancelPickRows(),
    state.releaseAssistantCancelPickTableSortMode,
  );
  const anchor = state.releaseAssistantCancelPickLastIndex;
  const start = Number.isInteger(anchor) ? Math.min(anchor, tableIndex) : tableIndex;
  const end = Number.isInteger(anchor) ? Math.max(anchor, tableIndex) : tableIndex;
  for (let index = start; index <= end; index += 1) {
    const row = rows[index]?.row;
    const pickOrderNo = String(row?.pickOrderNo || "");
    if (
      !pickOrderNo
      || (
        row?.canCancel === false
        && row?.canAssign !== true
        && row?.canAdjustPriority !== true
      )
    ) continue;
    if (checked) state.releaseAssistantCancelPickSelected.add(pickOrderNo);
    else state.releaseAssistantCancelPickSelected.delete(pickOrderNo);
  }
}

async function cancelReleaseAssistantPickOrderNos(pickOrderNos) {
  if (
    state.releaseAssistantCancelPickRunning
    || state.releaseAssistantAssignPickerRunning
    || state.releaseAssistantPickPriorityRunning
    || state.releaseAssistantNextShiftPickerSubmitting
  ) return;
  const unique = [...new Set((Array.isArray(pickOrderNos) ? pickOrderNos : [])
    .filter((value) => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean))];
  if (!unique.length) return;
  state.releaseAssistantCancelPickRunning = true;
  state.releaseAssistantCancelPickMessage = "";
  state.releaseAssistantCancelPickError = "";
  renderReleaseAssistantCancelPickModal();
  try {
    const succeeded = new Set();
    const failed = new Set();
    const unknown = new Set();
    const requestErrors = [];
    for (let offset = 0; offset < unique.length; offset += 50) {
      const chunk = unique.slice(offset, offset + 50);
      try {
        const result = await api("/api/release-assistant/pick-orders/cancel", {
          pickOrderNos: chunk,
        });
        (Array.isArray(result?.successPickOrderNos) ? result.successPickOrderNos : [])
          .forEach((pickOrderNo) => succeeded.add(String(pickOrderNo || "").trim()));
        (Array.isArray(result?.failedPickOrderNos) ? result.failedPickOrderNos : [])
          .forEach((pickOrderNo) => failed.add(String(pickOrderNo || "").trim()));
        (Array.isArray(result?.unknownPickOrderNos) ? result.unknownPickOrderNos : [])
          .forEach((pickOrderNo) => unknown.add(String(pickOrderNo || "").trim()));
      } catch (error) {
        chunk.forEach((pickOrderNo) => failed.add(pickOrderNo));
        requestErrors.push(error.message || "取消拣选单失败");
      }
    }
    succeeded.forEach((pickOrderNo) => {
      state.releaseAssistantCancelPickSelected.delete(pickOrderNo);
    });
    if (succeeded.length && state.releaseAssistantCancelPickData) {
      const succeededSet = new Set(
        succeeded.map((pickOrderNo) => String(pickOrderNo || "").trim()),
      );
      state.releaseAssistantCancelPickData = {
        ...state.releaseAssistantCancelPickData,
        rows: (Array.isArray(state.releaseAssistantCancelPickData.rows)
          ? state.releaseAssistantCancelPickData.rows
          : []).map((row) => (
          succeededSet.has(String(row?.pickOrderNo || "").trim())
            ? {
              ...row,
              operator: person,
              status: 350,
              statusLabel: "已分配",
            }
            : row
        )),
      };
    }
    if (succeeded.size && state.releaseAssistantCancelPickData) {
      const currentRows = Array.isArray(state.releaseAssistantCancelPickData.rows)
        ? state.releaseAssistantCancelPickData.rows
        : [];
      state.releaseAssistantCancelPickData = {
        ...state.releaseAssistantCancelPickData,
        rows: currentRows.filter((row) => !succeeded.has(String(row?.pickOrderNo || "").trim())),
        total: Math.max(0, Number(state.releaseAssistantCancelPickData.total || 0) - succeeded.size),
        unassignedTotal: Math.max(0, Number(state.releaseAssistantCancelPickData.unassignedTotal || 0) - succeeded.size),
      };
    }
    state.releaseAssistantCancelPickMessage = succeeded.size
      ? `已取消 ${formatNumber(succeeded.size)} 个拣选单`
      : "";
    const errorParts = [...new Set(requestErrors)];
    if (failed.size) {
      errorParts.push(
        `${formatNumber(failed.size)} 个拣选单取消失败：${[...failed].slice(0, 6).join("、")}${failed.size > 6 ? "…" : ""}`,
      );
    }
    if (unknown.size) {
      errorParts.push(
        `${formatNumber(unknown.size)} 个取消结果待确认，请刷新后查看：${[...unknown].slice(0, 6).join("、")}${unknown.size > 6 ? "…" : ""}`,
      );
    }
    state.releaseAssistantCancelPickError = errorParts.join("；");
  } catch (error) {
    state.releaseAssistantCancelPickError = error.message || "取消拣选单失败";
  } finally {
    state.releaseAssistantCancelPickRunning = false;
    state.releaseAssistantCancelPickLastIndex = null;
    state.releaseAssistantCancelPickCardRangeAnchor = "";
    if (state.releaseAssistantCancelPickOpen) {
      renderReleaseAssistantCancelPickModal();
      void loadReleaseAssistantPendingPickOrders({
        page: state.releaseAssistantCancelPickPage,
        resetSelection: false,
        preserveNotice: true,
        silentError: true,
      });
    }
  }
}

async function adjustReleaseAssistantPickOrderPriority(priorityValue) {
  const priority = Number(priorityValue);
  if (
    ![100, 200, 300].includes(priority)
    || state.releaseAssistantCancelPickRunning
    || state.releaseAssistantAssignPickerRunning
    || state.releaseAssistantPickPriorityRunning
    || state.releaseAssistantNextShiftPickerSubmitting
    || state.releaseAssistantCancelPickLoading
    || state.releaseAssistantAssignPickerOpen
  ) return;
  const selected = state.releaseAssistantCancelPickSelected;
  const selectedRows = releaseAssistantCancelPickRows().filter((row) => (
    selected.has(String(row?.pickOrderNo || ""))
  ));
  if (!selected.size || selectedRows.length !== selected.size) return;
  const unsupported = selectedRows.filter((row) => row?.canAdjustPriority !== true);
  if (unsupported.length) {
    state.releaseAssistantCancelPickError = "所选拣选单中包含不支持调整优先级的记录";
    renderReleaseAssistantCancelPickModal();
    return;
  }
  const pickOrderNos = selectedRows.map((row) => String(row.pickOrderNo).trim());
  const priorityLabel = releaseAssistantPickPriorityLabel(priority);
  state.releaseAssistantPickPriorityRunning = priority;
  state.releaseAssistantCancelPickMessage = "";
  state.releaseAssistantCancelPickError = "";
  renderReleaseAssistantCancelPickModal();
  try {
    const result = await api("/api/release-assistant/pick-orders/priority", {
      pickOrderNos,
      priority,
    });
    const succeeded = Array.isArray(result.successPickOrderNos) ? result.successPickOrderNos : [];
    const failed = Array.isArray(result.failedPickOrderNos) ? result.failedPickOrderNos : [];
    const unknown = Array.isArray(result.unknownPickOrderNos) ? result.unknownPickOrderNos : [];
    const unchanged = Math.max(0, Number(result.unchanged) || 0);
    succeeded.forEach((pickOrderNo) => {
      state.releaseAssistantCancelPickSelected.delete(pickOrderNo);
    });
    state.releaseAssistantCancelPickMessage = succeeded.length
      ? `已将 ${formatNumber(succeeded.length)} 个拣选单设为${priorityLabel}${unchanged ? `（${formatNumber(unchanged)} 个原本已是${priorityLabel}）` : ""}`
      : "";
    const errorParts = [];
    if (failed.length) {
      errorParts.push(
        `${formatNumber(failed.length)} 个拣选单调整失败：${failed.slice(0, 6).join("、")}${failed.length > 6 ? "…" : ""}`,
      );
    }
    if (unknown.length) {
      errorParts.push(
        `${formatNumber(unknown.length)} 个调整结果待确认，请刷新后查看：${unknown.slice(0, 6).join("、")}${unknown.length > 6 ? "…" : ""}`,
      );
    }
    state.releaseAssistantCancelPickError = errorParts.join("；");
  } catch (error) {
    state.releaseAssistantCancelPickError = error.message || `调整为${priorityLabel}失败`;
  } finally {
    state.releaseAssistantPickPriorityRunning = 0;
    state.releaseAssistantCancelPickLastIndex = null;
    state.releaseAssistantCancelPickCardRangeAnchor = "";
    if (state.releaseAssistantCancelPickOpen) {
      await loadReleaseAssistantPendingPickOrders({
        page: state.releaseAssistantCancelPickPage,
        resetSelection: false,
        preserveNotice: true,
      });
    }
  }
}

function cancelReleaseAssistantAssignPickerMode() {
  if (state.releaseAssistantAssignPickerRunning || state.releaseAssistantPickPriorityRunning) return;
  resetReleaseAssistantAssignPicker();
  renderReleaseAssistantCancelPickModal();
}

async function assignReleaseAssistantPickOrderNos() {
  if (
    state.releaseAssistantAssignPickerRunning
    || state.releaseAssistantPickPriorityRunning
    || state.releaseAssistantAssignPickerResultBlocked
    || !state.releaseAssistantAssignPickerOpen
  ) return;
  if (
    releaseAssistantAssignPickerHasUnconfirmedInputNames()
    || String(state.releaseAssistantAssignPickerSearch || "").trim()
  ) {
    state.releaseAssistantAssignPickerError = "请先选择并确认输入框内的拣选人";
    renderReleaseAssistantAssignPickerPanel();
    syncReleaseAssistantCancelPickSelection();
    return;
  }
  const pickOrderNos = releaseAssistantCancelPickRows()
    .map((row) => String(row?.pickOrderNo || "").trim())
    .filter((pickOrderNo) => state.releaseAssistantCancelPickSelected.has(pickOrderNo));
  const operators = [...state.releaseAssistantAssignPickerSelected];
  if (!pickOrderNos.length || !operators.length) return;
  if (operators.length > pickOrderNos.length) {
    state.releaseAssistantAssignPickerError = "拣选人数不能多于已选择的拣选单数量";
    renderReleaseAssistantAssignPickerPanel();
    syncReleaseAssistantCancelPickSelection();
    return;
  }

  state.releaseAssistantAssignPickerRunning = true;
  state.releaseAssistantAssignPickerError = "";
  state.releaseAssistantCancelPickMessage = "";
  state.releaseAssistantCancelPickError = "";
  renderReleaseAssistantCancelPickModal();
  try {
    const result = await api("/api/release-assistant/pick-orders/assign", {
      pickOrderNos,
      operators,
    });
    const succeeded = Array.isArray(result.successPickOrderNos) ? result.successPickOrderNos : [];
    const failed = Array.isArray(result.failedPickOrderNos) ? result.failedPickOrderNos : [];
    const unknown = Array.isArray(result.unknownPickOrderNos) ? result.unknownPickOrderNos : [];
    succeeded.forEach((pickOrderNo) => state.releaseAssistantCancelPickSelected.delete(pickOrderNo));
    state.releaseAssistantCancelPickMessage = succeeded.length
      ? `已指定 ${formatNumber(succeeded.length)} 个拣选单，拣选人：${operators.join("、")}`
      : "";
    const errorParts = [];
    if (failed.length) {
      errorParts.push(
        `${formatNumber(failed.length)} 个拣选单指定失败：${failed.slice(0, 6).join("、")}${failed.length > 6 ? "…" : ""}`,
      );
    }
    if (unknown.length) {
      errorParts.push(
        `${formatNumber(unknown.length)} 个指定结果待确认，请刷新后查看：${unknown.slice(0, 6).join("、")}${unknown.length > 6 ? "…" : ""}`,
      );
    }
    state.releaseAssistantCancelPickError = errorParts.join("；");
    state.releaseAssistantAssignPickerRunning = false;
    if (errorParts.length) {
      state.releaseAssistantAssignPickerError = errorParts.join("；");
      state.releaseAssistantAssignPickerResultBlocked = true;
      if (state.releaseAssistantCancelPickOpen) {
        await loadReleaseAssistantPendingPickOrders({
          page: state.releaseAssistantCancelPickPage,
          resetSelection: false,
          preserveNotice: true,
        });
      }
      return;
    }
    resetReleaseAssistantAssignPicker();
    if (state.releaseAssistantCancelPickOpen) {
      void loadReleaseAssistantPendingPickOrders({
        page: state.releaseAssistantCancelPickPage,
        resetSelection: false,
        preserveNotice: true,
        silentError: true,
      });
    }
  } catch (error) {
    const message = error.message || "指定拣选人失败";
    state.releaseAssistantAssignPickerRunning = false;
    state.releaseAssistantCancelPickError = message;
    state.releaseAssistantAssignPickerError = message;
    state.releaseAssistantAssignPickerResultBlocked = true;
    if (state.releaseAssistantCancelPickOpen) {
      await loadReleaseAssistantPendingPickOrders({
        page: state.releaseAssistantCancelPickPage,
        resetSelection: false,
        preserveNotice: true,
      });
    }
  }
}

function handleReleaseAssistantAssignPickerInput(event) {
  const input = event.target.closest("[data-assign-picker-search-input]");
  if (!input || input.disabled) return;
  state.releaseAssistantAssignPickerSearch = input.value;
  syncReleaseAssistantAssignPickerSearch();
  syncReleaseAssistantCancelPickSelection();
}

function handleReleaseAssistantAssignPickerKeydown(event) {
  const input = event.target.closest("[data-assign-picker-search-input]");
  if (!input || input.disabled) return;
  if (event.key === "Enter") {
    const firstMatch = releaseAssistantAssignPickerSearchMatches()[0];
    if (firstMatch) {
      event.preventDefault();
      addReleaseAssistantAssignPickerInputName(firstMatch);
    } else if (
      !String(state.releaseAssistantAssignPickerSearch || "").trim()
      && releaseAssistantAssignPickerHasUnconfirmedInputNames()
    ) {
      event.preventDefault();
      confirmReleaseAssistantAssignPickerInputNames();
    }
    return;
  }
  if (
    event.key === "Backspace"
    && !String(state.releaseAssistantAssignPickerSearch || "")
    && state.releaseAssistantAssignPickerInputNames.size
  ) {
    event.preventDefault();
    const names = [...state.releaseAssistantAssignPickerInputNames];
    removeReleaseAssistantAssignPickerInputName(names[names.length - 1]);
    return;
  }
  if (event.key === "Escape" && state.releaseAssistantAssignPickerSearch) {
    event.preventDefault();
    state.releaseAssistantAssignPickerSearch = "";
    syncReleaseAssistantAssignPickerSearch({ focus: true });
    syncReleaseAssistantCancelPickSelection();
  }
}

function releaseAssistantCancelPickCardPickOrderNos(card) {
  if (!card) return [];
  const encoded = String(card.dataset.cancelPickCardOrderNos || "").trim();
  if (encoded) {
    try {
      const parsed = JSON.parse(decodeURIComponent(encoded));
      if (Array.isArray(parsed)) {
        return [...new Set(
          parsed.map((value) => String(value || "").trim()).filter(Boolean),
        )];
      }
    } catch {
      // Fall back to the legacy single-order data attribute.
    }
  }
  const pickOrderNo = String(card.dataset.cancelPickCardNo || "").trim();
  return pickOrderNo ? [pickOrderNo] : [];
}

function releaseAssistantCancelPickCardSelection(card) {
  if (!card) return null;
  const rows = releaseAssistantCancelPickRows();
  const pickOrderNos = releaseAssistantCancelPickCardPickOrderNos(card);
  const pickOrderNoSet = new Set(pickOrderNos);
  const rowIndexes = [];
  rows.forEach((row, rowIndex) => {
    if (pickOrderNoSet.has(String(row?.pickOrderNo || "").trim())) {
      rowIndexes.push(rowIndex);
    }
  });
  const checkbox = card.querySelector(
    "input[data-cancel-pick-card-select], input[data-cancel-pick-row-index]",
  );
  if (
    !pickOrderNos.length
    || rowIndexes.length !== pickOrderNos.length
    || !checkbox
    || checkbox.disabled
  ) return null;
  return {
    rowIndex: rowIndexes[0],
    rowIndexes,
    pickOrderNo: pickOrderNos[0],
    pickOrderNos,
  };
}

function selectReleaseAssistantCancelPickCardVisualRange(card) {
  const endpoint = releaseAssistantCancelPickCardSelection(card);
  const anchorPickOrderNo = String(
    state.releaseAssistantCancelPickCardRangeAnchor || "",
  ).trim();
  if (!endpoint || !anchorPickOrderNo || !el.releaseAssistantCancelPickContent) return false;
  const cards = [
    ...el.releaseAssistantCancelPickContent.querySelectorAll(
      ".release-assistant-pick-order-card[data-cancel-pick-card-no]",
    ),
  ];
  const anchorIndex = cards.findIndex((candidate) => (
    releaseAssistantCancelPickCardPickOrderNos(candidate).includes(anchorPickOrderNo)
  ));
  const endpointIndex = cards.findIndex((candidate) => candidate === card);
  if (anchorIndex < 0 || endpointIndex < 0) return false;
  const start = Math.min(anchorIndex, endpointIndex);
  const end = Math.max(anchorIndex, endpointIndex);
  const shouldSelect = !endpoint.pickOrderNos.every((pickOrderNo) => (
    state.releaseAssistantCancelPickSelected.has(pickOrderNo)
  ));
  const changedPickOrderNos = [];
  for (let index = start; index <= end; index += 1) {
    const selection = releaseAssistantCancelPickCardSelection(cards[index]);
    if (!selection) continue;
    selection.pickOrderNos.forEach((pickOrderNo) => {
      changedPickOrderNos.push(pickOrderNo);
      if (shouldSelect) {
        state.releaseAssistantCancelPickSelected.add(pickOrderNo);
      } else {
        state.releaseAssistantCancelPickSelected.delete(pickOrderNo);
      }
    });
  }
  state.releaseAssistantCancelPickCardRangeAnchor = endpoint.pickOrderNo;
  if (shouldSelect) {
    state.releaseAssistantCancelPickCardActionAnchor = endpoint.pickOrderNo;
  } else if (
    changedPickOrderNos.includes(state.releaseAssistantCancelPickCardActionAnchor)
  ) {
    state.releaseAssistantCancelPickCardActionAnchor = "";
  }
  syncReleaseAssistantCancelPickSelection();
  return true;
}

function releaseAssistantCancelPickCardDropPickOrderNos() {
  const sourcePickOrderNos = [...new Set(
    (Array.isArray(state.releaseAssistantCancelPickCardDragSourcePickOrderNos)
      ? state.releaseAssistantCancelPickCardDragSourcePickOrderNos
      : [state.releaseAssistantCancelPickCardDragSourcePickOrderNo])
      .map((value) => String(value || "").trim())
      .filter(Boolean),
  )];
  if (!sourcePickOrderNos.length) return [];
  const snapshot = state.releaseAssistantCancelPickCardDragSelectionSnapshot;
  const wanted = state.releaseAssistantCancelPickCardDragSourceWasSelected
    ? new Set(snapshot instanceof Set ? snapshot : [])
    : new Set(sourcePickOrderNos);
  return releaseAssistantCancelPickRows()
    .map((row) => String(row?.pickOrderNo || "").trim())
    .filter((pickOrderNo) => pickOrderNo && wanted.has(pickOrderNo));
}

function replaceReleaseAssistantCancelPickSelection(pickOrderNos = []) {
  state.releaseAssistantCancelPickSelected.clear();
  (Array.isArray(pickOrderNos) ? pickOrderNos : [...pickOrderNos]).forEach((pickOrderNo) => {
    const normalized = String(pickOrderNo || "").trim();
    if (normalized) state.releaseAssistantCancelPickSelected.add(normalized);
  });
  const selectedPickOrderNos = [...state.releaseAssistantCancelPickSelected];
  state.releaseAssistantCancelPickCardActionAnchor =
    selectedPickOrderNos[selectedPickOrderNos.length - 1] || "";
}

function releaseAssistantCancelPickDropPersonAtPoint(
  clientX,
  clientY,
  targetAtPoint = null,
) {
  if (
    !el.releaseAssistantCancelPickPeopleStatus
    || !Number.isFinite(Number(clientX))
    || !Number.isFinite(Number(clientY))
  ) return "";
  const target = targetAtPoint instanceof Element
    ? targetAtPoint
    : document.elementFromPoint(Number(clientX), Number(clientY));
  const personCard = target?.closest?.("[data-people-status-drop-person]");
  if (
    !personCard
    || !el.releaseAssistantCancelPickPeopleStatus.contains(personCard)
  ) return "";
  return String(personCard.dataset.peopleStatusDropPerson || "").trim();
}

function removeReleaseAssistantCancelPickCardDragPreview() {
  if (state.releaseAssistantCancelPickCardDragPreviewFrame) {
    window.cancelAnimationFrame(state.releaseAssistantCancelPickCardDragPreviewFrame);
    state.releaseAssistantCancelPickCardDragPreviewFrame = 0;
  }
  state.releaseAssistantCancelPickCardDragPreviewElement?.remove();
  state.releaseAssistantCancelPickCardDragPreviewElement = null;
}

function ensureReleaseAssistantCancelPickCardDragPreview() {
  let preview = state.releaseAssistantCancelPickCardDragPreviewElement;
  if (preview?.isConnected) return preview;
  preview = document.createElement("div");
  preview.className = "release-assistant-pick-drag-preview";
  preview.setAttribute("aria-hidden", "true");
  preview.innerHTML = `
    <span class="release-assistant-pick-drag-preview-icon">↗</span>
    <span class="release-assistant-pick-drag-preview-copy">
      <strong></strong>
      <em></em>
    </span>
  `;
  document.body.append(preview);
  state.releaseAssistantCancelPickCardDragPreviewElement = preview;
  window.requestAnimationFrame(() => preview.classList.add("is-visible"));
  return preview;
}

function positionReleaseAssistantCancelPickCardDragPreview(clientX, clientY) {
  const x = Number(clientX);
  const y = Number(clientY);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return;
  state.releaseAssistantCancelPickCardDragClientX = x;
  state.releaseAssistantCancelPickCardDragClientY = y;
  if (state.releaseAssistantCancelPickCardDragPreviewFrame) return;
  state.releaseAssistantCancelPickCardDragPreviewFrame = window.requestAnimationFrame(() => {
    state.releaseAssistantCancelPickCardDragPreviewFrame = 0;
    const preview = state.releaseAssistantCancelPickCardDragPreviewElement;
    if (!preview?.isConnected || !state.releaseAssistantCancelPickCardDragActive) return;
    const viewportPadding = 12;
    const previewWidth = Math.min(270, Math.max(180, window.innerWidth - viewportPadding * 2));
    const previewHeight = 70;
    const pointerX = state.releaseAssistantCancelPickCardDragClientX;
    const pointerY = state.releaseAssistantCancelPickCardDragClientY;
    let left = pointerX + 20;
    let top = pointerY + 20;
    if (left + previewWidth > window.innerWidth - viewportPadding) {
      left = pointerX - previewWidth - 20;
    }
    if (top + previewHeight > window.innerHeight - viewportPadding) {
      top = pointerY - previewHeight - 20;
    }
    left = Math.max(viewportPadding, left);
    top = Math.max(viewportPadding, top);
    preview.style.transform = `translate3d(${Math.round(left)}px, ${Math.round(top)}px, 0)`;
  });
}

function syncReleaseAssistantCancelPickCardDragPreview() {
  if (
    !state.releaseAssistantCancelPickCardDragActive
    || !state.releaseAssistantCancelPickCardDragMoved
  ) {
    removeReleaseAssistantCancelPickCardDragPreview();
    return;
  }
  const preview = ensureReleaseAssistantCancelPickCardDragPreview();
  const pickOrderNos = releaseAssistantCancelPickCardDropPickOrderNos();
  const dropPerson = String(
    state.releaseAssistantCancelPickCardDropPerson || "",
  ).trim();
  const count = Math.max(1, pickOrderNos.length);
  const title = dropPerson
    ? `松手分配给 ${dropPerson}`
    : "拖到人员卡片";
  const detail = count > 1
    ? `${formatNumber(count)} 个拣选单`
    : pickOrderNos[0] || state.releaseAssistantCancelPickCardDragSourcePickOrderNo || "1 个拣选单";
  const titleElement = preview.querySelector("strong");
  const detailElement = preview.querySelector("em");
  if (titleElement) titleElement.textContent = title;
  if (detailElement) detailElement.textContent = detail;
  preview.classList.toggle("is-over-person", Boolean(dropPerson));
  preview.querySelector(".release-assistant-pick-drag-preview-icon").textContent =
    dropPerson ? "✓" : "↗";
  positionReleaseAssistantCancelPickCardDragPreview(
    state.releaseAssistantCancelPickCardDragClientX,
    state.releaseAssistantCancelPickCardDragClientY,
  );
}

function syncReleaseAssistantCancelPickCardDropVisuals() {
  const dropMode = state.releaseAssistantCancelPickCardDragActive
    && state.releaseAssistantCancelPickCardDropMode;
  const dropPerson = dropMode
    ? String(state.releaseAssistantCancelPickCardDropPerson || "").trim()
    : "";
  el.releaseAssistantCancelPickPeopleStatus
    ?.querySelectorAll("[data-people-status-drop-person]")
    .forEach((personCard) => {
      const isHovered = Boolean(
        dropPerson
        && String(personCard.dataset.peopleStatusDropPerson || "").trim() === dropPerson
      );
      personCard.classList.toggle("is-drop-hover", isHovered);
    });
  const sourcePickOrderNos = (
    state.releaseAssistantCancelPickCardDragActive
    && state.releaseAssistantCancelPickCardDragMoved
  )
    ? new Set(releaseAssistantCancelPickCardDropPickOrderNos())
    : new Set();
  el.releaseAssistantCancelPickContent
    ?.querySelectorAll(".release-assistant-pick-order-card[data-cancel-pick-card-no]")
    .forEach((card) => {
      const cardPickOrderNos = releaseAssistantCancelPickCardPickOrderNos(card);
      card.classList.toggle(
        "is-assignment-drag-source",
        cardPickOrderNos.some((pickOrderNo) => sourcePickOrderNos.has(pickOrderNo)),
      );
    });
  document.documentElement.classList.toggle(
    "is-release-assistant-assignment-dragging",
    dropMode,
  );
  syncReleaseAssistantCancelPickCardDragPreview();
}

function enterReleaseAssistantCancelPickCardDropMode(person = "") {
  if (!state.releaseAssistantCancelPickCardDragActive) return;
  const normalizedPerson = String(person || "").trim();
  if (
    state.releaseAssistantCancelPickCardDropMode
    && normalizedPerson === state.releaseAssistantCancelPickCardDropPerson
  ) return;
  if (!state.releaseAssistantCancelPickCardDropMode) {
    state.releaseAssistantCancelPickCardDropMode = true;
    replaceReleaseAssistantCancelPickSelection(
      releaseAssistantCancelPickCardDropPickOrderNos(),
    );
    syncReleaseAssistantCancelPickSelection();
  }
  state.releaseAssistantCancelPickCardDropPerson = normalizedPerson;
  syncReleaseAssistantCancelPickCardDropVisuals();
}

function resetReleaseAssistantCancelPickCardDropState(options = {}) {
  const restoreSelection = options.restoreSelection === true;
  const snapshot = state.releaseAssistantCancelPickCardDragSelectionSnapshot;
  if (restoreSelection && snapshot instanceof Set) {
    replaceReleaseAssistantCancelPickSelection(snapshot);
  }
  state.releaseAssistantCancelPickCardDragSourcePickOrderNo = "";
  state.releaseAssistantCancelPickCardDragSourcePickOrderNos = [];
  state.releaseAssistantCancelPickCardDragSourceWasSelected = false;
  state.releaseAssistantCancelPickCardDragSelectionSnapshot = new Set();
  state.releaseAssistantCancelPickCardDropMode = false;
  state.releaseAssistantCancelPickCardDropPerson = "";
  state.releaseAssistantCancelPickCardDragMoved = false;
  state.releaseAssistantCancelPickCardDragStartX = 0;
  state.releaseAssistantCancelPickCardDragStartY = 0;
  removeReleaseAssistantCancelPickCardDragPreview();
  document.documentElement.classList.remove("is-release-assistant-assignment-dragging");
  syncReleaseAssistantCancelPickCardDropVisuals();
}

function normalizeReleaseAssistantDroppedAssignments(assignments = []) {
  const seenPickOrderNos = new Set();
  return (Array.isArray(assignments) ? assignments : [])
    .map((assignment) => ({
      pickOrderNo: String(assignment?.pickOrderNo || "").trim(),
      operator: String(assignment?.operator || "").trim(),
    }))
    .filter((assignment) => {
      if (
        !assignment.pickOrderNo
        || !assignment.operator
        || seenPickOrderNos.has(assignment.pickOrderNo)
      ) return false;
      seenPickOrderNos.add(assignment.pickOrderNo);
      return true;
    });
}

function releaseAssistantDroppedAssignmentSummary(assignments = []) {
  const counts = new Map();
  assignments.forEach(({ operator }) => {
    counts.set(operator, (counts.get(operator) || 0) + 1);
  });
  return [...counts]
    .map(([operator, count]) => `${operator} ${formatNumber(count)} 单`)
    .join("、");
}

async function assignReleaseAssistantDroppedAssignments(assignmentsValue = []) {
  if (
    state.releaseAssistantAssignPickerRunning
    || state.releaseAssistantPickPriorityRunning
    || state.releaseAssistantCancelPickRunning
    || state.releaseAssistantCancelPickLoading
  ) return;
  const assignments = normalizeReleaseAssistantDroppedAssignments(assignmentsValue);
  if (!assignments.length) return;
  const rowByPickOrderNo = new Map(
    releaseAssistantCancelPickRows().map((row) => [
      String(row?.pickOrderNo || "").trim(),
      row,
    ]),
  );
  const unsupported = assignments.filter(({ pickOrderNo }) => (
    !rowByPickOrderNo.has(pickOrderNo)
    || rowByPickOrderNo.get(pickOrderNo)?.canAssign === false
  ));
  if (unsupported.length) {
    state.releaseAssistantCancelPickMessage = "";
    state.releaseAssistantCancelPickError =
      `以下拣选单不支持指定拣选人，请刷新后重选：${unsupported
        .slice(0, 6)
        .map(({ pickOrderNo }) => pickOrderNo)
        .join("、")}${unsupported.length > 6 ? "…" : ""}`;
    renderReleaseAssistantCancelPickModal();
    return;
  }

  state.releaseAssistantAssignPickerRunning = true;
  state.releaseAssistantCancelPickMessage =
    `正在分配：${releaseAssistantDroppedAssignmentSummary(assignments)}`;
  state.releaseAssistantCancelPickError = "";
  renderReleaseAssistantCancelPickModal();

  const succeeded = new Set();
  const failed = new Set();
  const unknown = new Set();
  const requestErrors = [];
  for (let offset = 0; offset < assignments.length; offset += 50) {
    const chunk = assignments.slice(offset, offset + 50);
    try {
      const result = await api("/api/release-assistant/pick-orders/assign", {
        assignments: chunk,
      });
      (Array.isArray(result?.successPickOrderNos) ? result.successPickOrderNos : [])
        .forEach((pickOrderNo) => succeeded.add(String(pickOrderNo || "").trim()));
      (Array.isArray(result?.failedPickOrderNos) ? result.failedPickOrderNos : [])
        .forEach((pickOrderNo) => failed.add(String(pickOrderNo || "").trim()));
      (Array.isArray(result?.unknownPickOrderNos) ? result.unknownPickOrderNos : [])
        .forEach((pickOrderNo) => unknown.add(String(pickOrderNo || "").trim()));
    } catch (error) {
      chunk.forEach(({ pickOrderNo }) => failed.add(pickOrderNo));
      requestErrors.push(error.message || "指定拣选人失败");
    }
  }

  succeeded.forEach((pickOrderNo) => {
    state.releaseAssistantCancelPickSelected.delete(pickOrderNo);
  });
  const succeededAssignments = assignments.filter(({ pickOrderNo }) => (
    succeeded.has(pickOrderNo)
  ));
  state.releaseAssistantCancelPickMessage = succeededAssignments.length
    ? `已完成分配：${releaseAssistantDroppedAssignmentSummary(succeededAssignments)}`
    : "";
  const errorParts = [...new Set(requestErrors)];
  if (failed.size) {
    errorParts.push(
      `${formatNumber(failed.size)} 个拣选单分配失败：${[...failed].slice(0, 6).join("、")}${failed.size > 6 ? "…" : ""}`,
    );
  }
  if (unknown.size) {
    errorParts.push(
      `${formatNumber(unknown.size)} 个分配结果待确认，请刷新后查看：${[...unknown].slice(0, 6).join("、")}${unknown.size > 6 ? "…" : ""}`,
    );
  }
  state.releaseAssistantCancelPickError = errorParts.join("；");
  state.releaseAssistantAssignPickerRunning = false;

  if (succeededAssignments.length && state.releaseAssistantCancelPickData) {
    const operatorByPickOrder = new Map(
      succeededAssignments.map(({ pickOrderNo, operator }) => [pickOrderNo, operator]),
    );
    state.releaseAssistantCancelPickData = {
      ...state.releaseAssistantCancelPickData,
      rows: (Array.isArray(state.releaseAssistantCancelPickData.rows)
        ? state.releaseAssistantCancelPickData.rows
        : []).map((row) => {
        const pickOrderNo = String(row?.pickOrderNo || "").trim();
        const operator = operatorByPickOrder.get(pickOrderNo);
        return operator ? {
          ...row,
          operator,
          status: 350,
          statusLabel: "已分配",
        } : row;
      }),
    };
    renderReleaseAssistantCancelPickModal();
  }

  if (state.releaseAssistantCancelPickOpen) {
    void loadReleaseAssistantPendingPickOrders({
      page: state.releaseAssistantCancelPickPage,
      resetSelection: false,
      preserveNotice: true,
      silentError: true,
    });
  }
}

function startReleaseAssistantCancelPickCardDrag(event) {
  if (event.button !== 0 || !state.releaseAssistantCancelPickOpen) return;
  if (
    state.releaseAssistantAssignPickerOpen
    || state.releaseAssistantAssignPickerLoading
    || state.releaseAssistantAssignPickerRunning
    || state.releaseAssistantPickPriorityRunning
    || state.releaseAssistantCancelPickRunning
    || state.releaseAssistantCancelPickLoading
  ) return;
  const target = event.target instanceof Element ? event.target : null;
  if (!target || target.closest("button, input, a, select, textarea, [contenteditable]")) return;
  const card = target.closest(".release-assistant-pick-order-card");
  const selection = releaseAssistantCancelPickCardSelection(card);
  if (!selection) return;
  if (
    (event.shiftKey || state.releaseAssistantShiftPressed)
    && Boolean(state.releaseAssistantCancelPickCardRangeAnchor)
    && selectReleaseAssistantCancelPickCardVisualRange(card)
  ) {
    event.preventDefault();
    state.releaseAssistantCancelPickCardSuppressClick = true;
    state.releaseAssistantCancelPickCardRangePointerId = event.pointerId;
    return;
  }
  state.releaseAssistantCancelPickCardDragSelectionSnapshot = new Set(
    state.releaseAssistantCancelPickSelected,
  );
  state.releaseAssistantCancelPickCardDragSourcePickOrderNo = selection.pickOrderNo;
  state.releaseAssistantCancelPickCardDragSourcePickOrderNos = [...selection.pickOrderNos];
  state.releaseAssistantCancelPickCardDragSourceWasSelected =
    selection.pickOrderNos.every((pickOrderNo) => (
      state.releaseAssistantCancelPickCardDragSelectionSnapshot.has(pickOrderNo)
    ));
  state.releaseAssistantCancelPickCardDropMode = false;
  state.releaseAssistantCancelPickCardDropPerson = "";
  state.releaseAssistantCancelPickCardDragActive = true;
  state.releaseAssistantCancelPickCardDragMoved = false;
  state.releaseAssistantCancelPickCardDragStartX = event.clientX;
  state.releaseAssistantCancelPickCardDragStartY = event.clientY;
  state.releaseAssistantCancelPickCardDragClientX = event.clientX;
  state.releaseAssistantCancelPickCardDragClientY = event.clientY;
  state.releaseAssistantCancelPickCardDragPointerId = event.pointerId;
  state.releaseAssistantCancelPickCardDragCaptureElement = card;
  try {
    card.setPointerCapture?.(event.pointerId);
  } catch {
    state.releaseAssistantCancelPickCardDragCaptureElement = null;
  }
}

function moveReleaseAssistantCancelPickCardDrag(event) {
  if (
    !state.releaseAssistantCancelPickCardDragActive
    || event.pointerId !== state.releaseAssistantCancelPickCardDragPointerId
  ) return;
  if (!(event.buttons & 1)) {
    finishReleaseAssistantCancelPickCardDrag(event);
    return;
  }
  event.preventDefault();
  state.releaseAssistantCancelPickCardDragClientX = event.clientX;
  state.releaseAssistantCancelPickCardDragClientY = event.clientY;
  if (!state.releaseAssistantCancelPickCardDragMoved) {
    const movedDistance = Math.hypot(
      event.clientX - state.releaseAssistantCancelPickCardDragStartX,
      event.clientY - state.releaseAssistantCancelPickCardDragStartY,
    );
    if (movedDistance < 5) return;
    state.releaseAssistantCancelPickCardDragMoved = true;
    state.releaseAssistantCancelPickCardSuppressClick = true;
    document.documentElement.classList.add("is-release-assistant-card-dragging");
    syncReleaseAssistantCancelPickCardDropVisuals();
  }
  positionReleaseAssistantCancelPickCardDragPreview(event.clientX, event.clientY);
  const target = document.elementFromPoint(event.clientX, event.clientY);
  const dropPerson = releaseAssistantCancelPickDropPersonAtPoint(
    event.clientX,
    event.clientY,
    target,
  );
  if (dropPerson) {
    enterReleaseAssistantCancelPickCardDropMode(dropPerson);
    return;
  }
  if (state.releaseAssistantCancelPickCardDropMode) {
    if (!state.releaseAssistantCancelPickCardDropPerson) return;
    state.releaseAssistantCancelPickCardDropPerson = "";
    syncReleaseAssistantCancelPickCardDropVisuals();
    return;
  }
}

function finishReleaseAssistantCancelPickCardDrag(event) {
  if (
    !state.releaseAssistantCancelPickCardDragActive
    && state.releaseAssistantCancelPickCardRangePointerId != null
    && (
      event?.pointerId == null
      || event.pointerId === state.releaseAssistantCancelPickCardRangePointerId
    )
  ) {
    state.releaseAssistantCancelPickCardRangePointerId = null;
    window.setTimeout(() => {
      state.releaseAssistantCancelPickCardSuppressClick = false;
    }, 0);
    return;
  }
  if (
    !state.releaseAssistantCancelPickCardDragActive
    || (
      event?.pointerId != null
      && event.pointerId !== state.releaseAssistantCancelPickCardDragPointerId
    )
  ) return;
  const dropMode = state.releaseAssistantCancelPickCardDropMode;
  const highlightedDropPerson = String(
    state.releaseAssistantCancelPickCardDropPerson || "",
  ).trim();
  const pointerDropPerson = event?.type === "pointerup"
    ? releaseAssistantCancelPickDropPersonAtPoint(event.clientX, event.clientY)
    : "";
  const dropPerson = (
    dropMode
    && highlightedDropPerson
    && pointerDropPerson === highlightedDropPerson
  )
    ? highlightedDropPerson
    : "";
  const dropPickOrderNos = dropMode
    ? releaseAssistantCancelPickCardDropPickOrderNos()
    : [];
  const selectionSnapshot = new Set(
    state.releaseAssistantCancelPickCardDragSelectionSnapshot,
  );
  state.releaseAssistantCancelPickCardDragActive = false;
  state.releaseAssistantCancelPickCardDragPointerId = null;
  const captureElement = state.releaseAssistantCancelPickCardDragCaptureElement;
  state.releaseAssistantCancelPickCardDragCaptureElement = null;
  try {
    if (
      event?.pointerId != null
      && captureElement?.hasPointerCapture?.(event.pointerId)
    ) {
      captureElement.releasePointerCapture(event.pointerId);
    }
  } catch {
    // Pointer capture is released automatically after pointerup.
  }
  document.documentElement.classList.remove("is-release-assistant-card-dragging");
  resetReleaseAssistantCancelPickCardDropState();
  if (dropMode && dropPerson && dropPickOrderNos.length) {
    replaceReleaseAssistantCancelPickSelection(dropPickOrderNos);
  } else if (dropMode && !dropPerson) {
    replaceReleaseAssistantCancelPickSelection(selectionSnapshot);
  }
  syncReleaseAssistantCancelPickSelection();
  if (state.releaseAssistantPeopleStatusRenderPending) {
    renderReleaseAssistantPeopleStatus();
  }
  if (dropMode && dropPerson && dropPickOrderNos.length) {
    void assignReleaseAssistantDroppedAssignments(
      dropPickOrderNos.map((pickOrderNo) => ({
        pickOrderNo,
        operator: dropPerson,
      })),
    );
  }
  window.setTimeout(() => {
    state.releaseAssistantCancelPickCardSuppressClick = false;
  }, 0);
}

function runReleaseAssistantAssignPickerAction() {
  if (
    state.releaseAssistantAssignPickerOpen
    && state.releaseAssistantAssignPickerSelected.size
  ) {
    assignReleaseAssistantPickOrderNos();
  } else {
    loadReleaseAssistantAssignPickerCandidates();
  }
}

function handleReleaseAssistantCancelPickModalClick(event) {
  if (
    state.releaseAssistantCancelPickCardSuppressClick
    && event.target.closest(".release-assistant-pick-order-card")
  ) {
    event.preventDefault();
    event.stopPropagation();
    state.releaseAssistantCancelPickCardSuppressClick = false;
    state.releaseAssistantCancelPickCardRangePointerId = null;
    return;
  }
  const packingDetailButton = event.target.closest("[data-packing-detail-open]");
  if (packingDetailButton && !packingDetailButton.disabled) {
    openReleaseAssistantPackingDetailModal();
    return;
  }
  if (event.target === el.releaseAssistantCancelPickModal) {
    closeReleaseAssistantCancelPickOrders();
    return;
  }
  if (event.target.closest("#releaseAssistantCancelPickClose")) {
    closeReleaseAssistantCancelPickOrders();
    return;
  }
  if (event.target.closest("#releaseAssistantCancelPickCollapse")) {
    toggleReleaseAssistantCancelPickCollapse();
    return;
  }
  const sortButton = event.target.closest(
    "[data-cancel-pick-sort-scope][data-cancel-pick-sort-mode]",
  );
  if (sortButton && !sortButton.disabled) {
    const scope = String(sortButton.dataset.cancelPickSortScope || "");
    const sortMode = String(sortButton.dataset.cancelPickSortMode || "");
    if (sortMode !== "zone" && sortMode !== "person") return;
    if (scope === "matrix") {
      if (state.releaseAssistantCancelPickMatrixSortMode === sortMode) return;
      state.releaseAssistantCancelPickMatrixSortMode = sortMode;
      state.releaseAssistantCancelPickCardRangeAnchor = "";
      applyReleaseAssistantCancelPickMatrixSort(sortMode);
    } else if (scope === "table") {
      if (state.releaseAssistantCancelPickTableSortMode === sortMode) return;
      state.releaseAssistantCancelPickTableSortMode = sortMode;
      state.releaseAssistantCancelPickLastIndex = null;
      applyReleaseAssistantCancelPickTableSort(sortMode);
    } else {
      return;
    }
    return;
  }
  const cardClearSelection = event.target.closest("[data-cancel-pick-card-clear]");
  if (cardClearSelection && !cardClearSelection.disabled) {
    clearReleaseAssistantCancelPickSelection();
    return;
  }
  const cardAssignPicker = event.target.closest("[data-cancel-pick-card-assign]");
  if (cardAssignPicker && !cardAssignPicker.disabled) {
    runReleaseAssistantAssignPickerAction();
    return;
  }
  const assignPickerFloatClose = event.target.closest("[data-assign-picker-float-close]");
  if (assignPickerFloatClose && !assignPickerFloatClose.disabled) {
    cancelReleaseAssistantAssignPickerMode();
    return;
  }
  const assignPickerFloatSubmit = event.target.closest("[data-assign-picker-float-submit]");
  if (assignPickerFloatSubmit && !assignPickerFloatSubmit.disabled) {
    assignReleaseAssistantPickOrderNos();
    return;
  }
  const nextShiftPickerButton = event.target.closest("#releaseAssistantAssignNextShiftPicker");
  if (nextShiftPickerButton && !nextShiftPickerButton.disabled) {
    if (state.releaseAssistantCancelPickSelected.size) {
      openReleaseAssistantNextShiftPickerFloat();
    } else {
      openReleaseAssistantNextShiftRoster();
    }
    return;
  }
  const clearSelectionButton = event.target.closest("#releaseAssistantCancelPickClearSelection");
  if (clearSelectionButton && !clearSelectionButton.disabled) {
    clearReleaseAssistantCancelPickSelection();
    return;
  }
  const priorityButton = event.target.closest("[data-pick-order-priority]");
  if (priorityButton && !priorityButton.disabled) {
    adjustReleaseAssistantPickOrderPriority(priorityButton.dataset.pickOrderPriority);
    return;
  }
  if (event.target.closest("#releaseAssistantCancelPickRefresh")) {
    void loadReleaseAssistantPeopleStatus({ force: true });
    return;
  }
  if (event.target.closest("#releaseAssistantCancelPickMatrixRefresh")) {
    void loadReleaseAssistantPendingPickOrders({
      page: state.releaseAssistantCancelPickPage,
      resetSelection: false,
      preserveNotice: true,
    });
    return;
  }
  const removeInputName = event.target.closest("[data-assign-picker-input-remove]");
  if (removeInputName && !removeInputName.disabled) {
    removeReleaseAssistantAssignPickerInputName(
      removeInputName.dataset.assignPickerInputRemove,
    );
    return;
  }
  const suggestion = event.target.closest("[data-assign-picker-suggestion]");
  if (suggestion && !suggestion.disabled) {
    addReleaseAssistantAssignPickerInputName(
      suggestion.dataset.assignPickerSuggestion,
    );
    return;
  }
  const confirmInputNames = event.target.closest("[data-assign-picker-input-confirm]");
  if (confirmInputNames && !confirmInputNames.disabled) {
    confirmReleaseAssistantAssignPickerInputNames();
    return;
  }
  const assignPickerPerson = event.target.closest("[data-assign-picker-person]");
  if (assignPickerPerson) {
    if (
      state.releaseAssistantAssignPickerRunning
      || state.releaseAssistantAssignPickerResultBlocked
    ) return;
    const person = String(assignPickerPerson.dataset.assignPickerPerson || "").trim();
    if (!person) return;
    state.releaseAssistantAssignPickerError = "";
    if (state.releaseAssistantAssignPickerSelected.has(person)) {
      state.releaseAssistantAssignPickerSelected.delete(person);
      state.releaseAssistantAssignPickerInputNames.delete(person);
    } else {
      if (
        state.releaseAssistantAssignPickerSelected.size
        >= state.releaseAssistantCancelPickSelected.size
      ) {
        state.releaseAssistantAssignPickerError = "拣选人数不能多于已选择的拣选单数量";
        renderReleaseAssistantAssignPickerPanel();
        syncReleaseAssistantCancelPickSelection();
        return;
      }
      state.releaseAssistantAssignPickerInputNames.delete(person);
      state.releaseAssistantAssignPickerSelected.add(person);
    }
    syncReleaseAssistantAssignPickerSelection();
    syncReleaseAssistantCancelPickSelection();
    return;
  }
  const cancelAssignPickerButton = event.target.closest("#releaseAssistantCancelAssignPicker");
  if (cancelAssignPickerButton && !cancelAssignPickerButton.disabled) {
    cancelReleaseAssistantAssignPickerMode();
    return;
  }
  const assignPickerButton = event.target.closest("#releaseAssistantAssignPicker");
  if (assignPickerButton && !assignPickerButton.disabled) {
    runReleaseAssistantAssignPickerAction();
    return;
  }
  const cancelPickAllButton = event.target.closest("#releaseAssistantCancelPickAll");
  if (cancelPickAllButton && !cancelPickAllButton.disabled) {
    cancelReleaseAssistantPickOrderNos([...state.releaseAssistantCancelPickSelected]);
    return;
  }
  const pageButton = event.target.closest("[data-cancel-pick-page]");
  if (pageButton && !pageButton.disabled) {
    loadReleaseAssistantPendingPickOrders({
      page: Number(pageButton.dataset.cancelPickPage),
      resetSelection: true,
    });
    return;
  }
  const selectAll = event.target.closest("[data-cancel-pick-select-all]");
  if (selectAll) {
    const eligibleRows = releaseAssistantCancelPickEligibleRows();
    eligibleRows.forEach((row) => {
      if (selectAll.checked) state.releaseAssistantCancelPickSelected.add(row.pickOrderNo);
      else state.releaseAssistantCancelPickSelected.delete(row.pickOrderNo);
    });
    state.releaseAssistantCancelPickLastIndex = null;
    state.releaseAssistantCancelPickCardRangeAnchor = "";
    state.releaseAssistantCancelPickCardActionAnchor = selectAll.checked
      ? String(eligibleRows[eligibleRows.length - 1]?.pickOrderNo || "")
      : "";
    syncReleaseAssistantCancelPickSelection();
    return;
  }
  const cardCheckbox = event.target.closest("[data-cancel-pick-card-select]");
  if (cardCheckbox?.matches("input[type='checkbox']") && !cardCheckbox.disabled) {
    const card = cardCheckbox.closest(".release-assistant-pick-order-card");
    const selection = releaseAssistantCancelPickCardSelection(card);
    if (!selection) return;
    if (
      (event.shiftKey || state.releaseAssistantShiftPressed)
      && Boolean(state.releaseAssistantCancelPickCardRangeAnchor)
      && selectReleaseAssistantCancelPickCardVisualRange(card)
    ) {
      return;
    }
    const shouldSelect = !selection.pickOrderNos.every((pickOrderNo) => (
      state.releaseAssistantCancelPickSelected.has(pickOrderNo)
    ));
    selection.pickOrderNos.forEach((pickOrderNo) => {
      if (shouldSelect) state.releaseAssistantCancelPickSelected.add(pickOrderNo);
      else state.releaseAssistantCancelPickSelected.delete(pickOrderNo);
    });
    state.releaseAssistantCancelPickCardRangeAnchor = selection.pickOrderNo;
    state.releaseAssistantCancelPickCardActionAnchor = shouldSelect
      ? selection.pickOrderNos[selection.pickOrderNos.length - 1]
      : selection.pickOrderNos.includes(state.releaseAssistantCancelPickCardActionAnchor)
        ? ""
        : state.releaseAssistantCancelPickCardActionAnchor;
    syncReleaseAssistantCancelPickSelection();
    return;
  }
  const checkbox = event.target.closest("[data-cancel-pick-row-index]");
  if (checkbox && checkbox.matches("input[type='checkbox']") && !checkbox.disabled) {
    const rowIndex = Number(checkbox.dataset.cancelPickRowIndex);
    const tableIndex = Number(checkbox.dataset.cancelPickTableIndex);
    const row = releaseAssistantCancelPickRows()[rowIndex];
    const pickOrderNo = String(row?.pickOrderNo || "");
    if (!pickOrderNo) return;
    const card = checkbox.closest(".release-assistant-pick-order-card");
    if (
      card
      && (event.shiftKey || state.releaseAssistantShiftPressed)
      && Boolean(state.releaseAssistantCancelPickCardRangeAnchor)
      && selectReleaseAssistantCancelPickCardVisualRange(card)
    ) {
      return;
    }
    if (
      !card
      &&
      (event.shiftKey || state.releaseAssistantShiftPressed)
      && Number.isInteger(state.releaseAssistantCancelPickLastIndex)
    ) {
      selectReleaseAssistantCancelPickRange(tableIndex, checkbox.checked);
    } else if (checkbox.checked) {
      state.releaseAssistantCancelPickSelected.add(pickOrderNo);
    } else {
      state.releaseAssistantCancelPickSelected.delete(pickOrderNo);
    }
    if (card) {
      state.releaseAssistantCancelPickCardRangeAnchor = pickOrderNo;
    } else {
      state.releaseAssistantCancelPickLastIndex = tableIndex;
    }
    state.releaseAssistantCancelPickCardActionAnchor = checkbox.checked
      ? pickOrderNo
      : state.releaseAssistantCancelPickCardActionAnchor === pickOrderNo ? "" : state.releaseAssistantCancelPickCardActionAnchor;
    syncReleaseAssistantCancelPickSelection();
    return;
  }
  const cancelButton = event.target.closest("[data-cancel-pick-order]");
  if (cancelButton && !cancelButton.disabled) {
    cancelReleaseAssistantPickOrderNos([cancelButton.dataset.cancelPickOrder || ""]);
    return;
  }
  const clickedCard = event.target.closest(".release-assistant-pick-order-card");
  if (clickedCard) {
    const selection = releaseAssistantCancelPickCardSelection(clickedCard);
    if (!selection) return;
    if (
      (event.shiftKey || state.releaseAssistantShiftPressed)
      && Boolean(state.releaseAssistantCancelPickCardRangeAnchor)
      && selectReleaseAssistantCancelPickCardVisualRange(clickedCard)
    ) {
      return;
    }
    const shouldSelect = !selection.pickOrderNos.every((pickOrderNo) => (
      state.releaseAssistantCancelPickSelected.has(pickOrderNo)
    ));
    selection.pickOrderNos.forEach((pickOrderNo) => {
      if (shouldSelect) state.releaseAssistantCancelPickSelected.add(pickOrderNo);
      else state.releaseAssistantCancelPickSelected.delete(pickOrderNo);
    });
    state.releaseAssistantCancelPickCardRangeAnchor = selection.pickOrderNo;
    state.releaseAssistantCancelPickCardActionAnchor = shouldSelect
      ? selection.pickOrderNos[selection.pickOrderNos.length - 1]
      : selection.pickOrderNos.includes(state.releaseAssistantCancelPickCardActionAnchor)
        ? ""
        : state.releaseAssistantCancelPickCardActionAnchor;
    syncReleaseAssistantCancelPickSelection();
    return;
  }
  if (event.target.closest("button, input, select, textarea, a, label, [contenteditable], [role='button']")) {
    return;
  }
  const clickedRow = event.target.closest("[data-cancel-pick-row-click-index]");
  if (!clickedRow) return;
  const rowIndex = Number(clickedRow.dataset.cancelPickRowClickIndex);
  const tableIndex = Number(clickedRow.dataset.cancelPickTableIndex);
  const rowCheckbox = clickedRow.querySelector("input[data-cancel-pick-row-index]");
  const row = releaseAssistantCancelPickRows()[rowIndex];
  const pickOrderNo = String(row?.pickOrderNo || "");
  if (
    !Number.isInteger(rowIndex)
    || !pickOrderNo
    || !rowCheckbox
    || rowCheckbox.disabled
  ) return;
  const shouldSelect = !state.releaseAssistantCancelPickSelected.has(pickOrderNo);
  const isCard = clickedRow.matches(".release-assistant-pick-order-card");
  if (
    !isCard
    &&
    (event.shiftKey || state.releaseAssistantShiftPressed)
    && Number.isInteger(state.releaseAssistantCancelPickLastIndex)
  ) {
    selectReleaseAssistantCancelPickRange(tableIndex, shouldSelect);
  } else if (shouldSelect) {
    state.releaseAssistantCancelPickSelected.add(pickOrderNo);
  } else {
    state.releaseAssistantCancelPickSelected.delete(pickOrderNo);
  }
  if (isCard) {
    state.releaseAssistantCancelPickCardRangeAnchor = pickOrderNo;
  } else {
    state.releaseAssistantCancelPickLastIndex = tableIndex;
  }
  state.releaseAssistantCancelPickCardActionAnchor = shouldSelect
    ? pickOrderNo
    : state.releaseAssistantCancelPickCardActionAnchor === pickOrderNo ? "" : state.releaseAssistantCancelPickCardActionAnchor;
  syncReleaseAssistantCancelPickSelection();
}

function releaseAssistantWaveConfirmationMarkup() {
  const waveNo = state.releaseAssistantWaveConfirmationNo;
  if (!waveNo) return "";
  if (state.releaseAssistantWaveConfirmationLoading && !state.releaseAssistantWaveConfirmationRow) {
    return `
      <section class="release-assistant-wave-confirmation">
        <div class="release-assistant-wave-confirmation-head">
          <div><strong>波次确认明细</strong><span>${escapeHtml(waveNo)}</span></div>
        </div>
        <div class="release-assistant-wave-subpanel-message">正在读取该波次明细…</div>
      </section>
    `;
  }
  if (state.releaseAssistantWaveConfirmationError && !state.releaseAssistantWaveConfirmationRow) {
    return `
      <section class="release-assistant-wave-confirmation is-error">
        <div class="release-assistant-wave-confirmation-head">
          <div><strong>波次确认明细</strong><span>${escapeHtml(waveNo)}</span></div>
          <button type="button" data-release-wave-confirmation-action="refresh">重新查询</button>
        </div>
        <div class="release-assistant-wave-subpanel-message">${escapeHtml(state.releaseAssistantWaveConfirmationError)}</div>
      </section>
    `;
  }
  const row = state.releaseAssistantWaveConfirmationRow;
  if (!row) {
    return `
      <section class="release-assistant-wave-confirmation">
        <div class="release-assistant-wave-confirmation-head">
          <div><strong>波次确认明细</strong><span>${escapeHtml(waveNo)}</span></div>
          <button type="button" data-release-wave-confirmation-action="refresh">查询</button>
        </div>
        <div class="release-assistant-wave-subpanel-message">WMS 波次确认中暂未查询到该波次</div>
      </section>
    `;
  }
  const actionLoading = Boolean(state.releaseAssistantWaveConfirmationActionLoading);
  const actions = Array.isArray(row.actions) ? row.actions : [];
  const pendingAction = state.releaseAssistantWaveConfirmationActionPending;
  const pendingText = pendingAction === "cancel"
    ? "取消后需要重新进行波次汇总，确定取消该波次？"
    : "确定要确认该波次？";
  return `
    <section class="release-assistant-wave-confirmation">
      <div class="release-assistant-wave-confirmation-head">
        <div><strong>波次确认明细</strong><span>${escapeHtml(waveNo)}</span></div>
        <button type="button" data-release-wave-confirmation-action="refresh" ${state.releaseAssistantWaveConfirmationLoading ? "disabled" : ""}>${state.releaseAssistantWaveConfirmationLoading ? "查询中…" : "查询"}</button>
      </div>
      ${state.releaseAssistantWaveConfirmationActionMessage ? `
        <div class="release-assistant-wave-action-message${state.releaseAssistantWaveConfirmationActionError ? " is-error" : ""}">
          ${escapeHtml(state.releaseAssistantWaveConfirmationActionMessage)}
        </div>
      ` : ""}
      <div class="release-assistant-wave-detail-wrap">
        <table class="release-assistant-wave-detail-table">
          <thead>
            <tr>
              <th>波次号</th>
              <th>出库单数量</th>
              <th>包裹数量</th>
              <th>拣选单数量</th>
              <th>波次策略</th>
              <th>波次模板名称</th>
              <th>创建人</th>
              <th>确认人</th>
              <th>创建时间</th>
              <th>确认时间</th>
              <th>取消时间</th>
              <th>取消人</th>
              <th>波次创建来源</th>
              <th>波次状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${escapeHtml(row.waveNo || "-")}</td>
              <td>${formatNumber(row.outboundOrderCount)}</td>
              <td>${formatNumber(row.packageCount)}</td>
              <td>${formatNumber(row.pickOrderCount)}</td>
              <td>${escapeHtml(row.waveStrategyName || "-")}</td>
              <td>${escapeHtml(releaseAssistantWaveTemplateLabel(row))}</td>
              <td>${escapeHtml(row.creator || "-")}</td>
              <td>${escapeHtml(row.confirmer || "-")}</td>
              <td>${escapeHtml(row.createTime || "-")}</td>
              <td>${escapeHtml(row.confirmTime || "-")}</td>
              <td>${escapeHtml(row.cancelTime || "-")}</td>
              <td>${escapeHtml(row.canceledBy || "-")}</td>
              <td>${escapeHtml(row.creationSourceLabel || "-")}</td>
              <td>
                <span class="release-assistant-wave-status">
                  <i style="background:${escapeHtml(row.statusColor || "#8c8c8c")}"></i>
                  ${escapeHtml(row.statusLabel || "-")}
                </span>
              </td>
              <td>
                <div class="release-assistant-wave-row-actions">
                  ${actions.map((action) => {
                    const loading = state.releaseAssistantWaveConfirmationActionLoading === action.key
                      || (action.key === "quality" && state.releaseAssistantWaveQualityLoading)
                      || (action.key === "pick-list" && state.releaseAssistantWavePickListLoading);
                    return `
                      <button
                        type="button"
                        data-release-wave-confirmation-action="${escapeHtml(action.key)}"
                        ${actionLoading || state.releaseAssistantWaveQualityLoading || state.releaseAssistantWavePickListLoading ? "disabled" : ""}
                      >${loading ? "处理中…" : escapeHtml(action.label)}</button>
                    `;
                  }).join("")}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      ${pendingAction ? `
        <div class="release-assistant-wave-action-confirm" data-release-wave-confirmation-focus="action">
          <span>${escapeHtml(pendingText)}</span>
          <div>
            <button class="is-primary" type="button" data-release-wave-confirmation-action="execute-${escapeHtml(pendingAction)}">确定</button>
            <button type="button" data-release-wave-confirmation-action="dismiss-action">关闭</button>
          </div>
        </div>
      ` : ""}
      ${releaseAssistantWavePickListMarkup()}
      ${releaseAssistantWaveQualityMarkup()}
    </section>
  `;
}

function renderReleaseAssistantWaveConfirmationSection() {
  const container = el.releaseAssistantWaveResult?.querySelector("#releaseAssistantWaveConfirmationDetail");
  if (!container) return;
  const detailScrollLeft = container.querySelector(".release-assistant-wave-detail-wrap")?.scrollLeft || 0;
  container.innerHTML = releaseAssistantWaveConfirmationMarkup();
  const detailWrap = container.querySelector(".release-assistant-wave-detail-wrap");
  if (detailWrap) detailWrap.scrollLeft = detailScrollLeft;
  scrollReleaseAssistantWaveResultToLatestContent();
}

function scrollReleaseAssistantWaveResultToLatestContent() {
  const requestId = state.releaseAssistantWaveAutoScrollRequestId + 1;
  state.releaseAssistantWaveAutoScrollRequestId = requestId;
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      if (
        requestId !== state.releaseAssistantWaveAutoScrollRequestId
        || state.activeToolView !== "releaseAssistant"
        || document.querySelector(".modal-layer:not([hidden])")
        || !el.releaseAssistantWaveResult
        || el.releaseAssistantWaveResult.hidden
      ) return;
      const resultBottom = el.releaseAssistantWaveResult.getBoundingClientRect().bottom;
      const downwardDistance = Math.ceil(resultBottom - (window.innerHeight - 18));
      if (downwardDistance <= 1) return;
      const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      window.scrollTo({
        top: window.scrollY + downwardDistance,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    });
  });
}

function renderReleaseAssistantWaveQueryMessage(message, isError = false) {
  if (!el.releaseAssistantWaveResult) return;
  el.releaseAssistantWaveResult.hidden = false;
  el.releaseAssistantWaveResult.classList.toggle("is-error", isError);
  el.releaseAssistantWaveResult.innerHTML = `
    <div class="release-assistant-wave-query-message${isError ? " is-error-text" : ""}">
      ${escapeHtml(message)}
    </div>
  `;
  scrollReleaseAssistantWaveResultToLatestContent();
}

function releaseAssistantSingleProfileForDisplay(data = {}) {
  const specialZones = new Set(["25-1", "25-2", "25-3", "26-1", "26-2", "26-3"]);
  const zones = Array.isArray(data?.zones)
    ? data.zones.map((zone) => String(zone || "").trim().toUpperCase()).filter(Boolean)
    : [];
  const directZoneSelection = String(data?.operator || "").trim() !== "不包含";
  const special = directZoneSelection
    && zones.length > 0
    && zones.every((zone) => specialZones.has(zone));
  return {
    pickStrategyName: special ? "Single 120-120" : "single(1-150)",
    retainedPickItemMin: special ? 115 : 141,
    retainedPickItemMax: special ? 120 : 151,
  };
}

function renderReleaseAssistantWaveQueryResult(data) {
  if (!el.releaseAssistantWaveResult) return;
  const mode = data?.mode === "batch"
    ? "batch"
    : (data?.mode === "single" ? "single" : "multi");
  const modeLabel = mode === "batch" ? "Batch" : (mode === "single" ? "Single" : "Multi");
  const singleProfile = releaseAssistantSingleProfileForDisplay(data);
  const pickStrategyName = String(data?.pickStrategyName || "").trim() || (mode === "batch"
    ? "Batch"
    : (mode === "single" ? singleProfile.pickStrategyName : "S-150 & M-48 Test"));
  const zones = Array.isArray(data?.zones) ? data.zones : [];
  const totalPackages = Number(data?.totalPackages || 0);
  const packageRule = data?.rules?.packageQuantity || { start: 1, end: 4 };
  const goodsRule = data?.rules?.goodsCategoryQuantity
    || data?.rules?.goodsQuantity
    || { start: 2, end: 9 };
  const hasQuantityRules = Boolean(
    data?.rules?.packageQuantity
    && (data?.rules?.goodsCategoryQuantity || data?.rules?.goodsQuantity)
  );
  const quantityRuleMarkup = hasQuantityRules
    ? `
          · ${mode === "single" ? "货品数量" : "货品品类"}：${formatNumber(goodsRule.start)}–${formatNumber(goodsRule.end)}
          · 包裹数量：${formatNumber(packageRule.start)}–${formatNumber(packageRule.end)}
        `
    : "";
  state.releaseAssistantWaveQueryKey = String(data?.queryKey || "").trim();
  state.releaseAssistantWaveQueryExpiresAt = state.releaseAssistantWaveQueryKey ? Date.now() + 30 * 60 * 1000 : 0;
  state.releaseAssistantWaveTotalPackages = totalPackages;
  state.releaseAssistantWaveSummaryData = data;
  el.releaseAssistantWaveResult.hidden = false;
  el.releaseAssistantWaveResult.classList.remove("is-error");
  el.releaseAssistantWaveResult.innerHTML = `
    <div class="release-assistant-wave-result-head">
      <div>
        <strong>${modeLabel} 查询结果</strong>
        <span>
          筛选条件：${escapeHtml(data?.operator || "-")}
          · 库区：${escapeHtml(zones.length ? zones.join("、") : "未选择")}
          ${quantityRuleMarkup}
        </span>
        ${state.releaseAssistantWaveBatchSummaryMessage ? `<span class="release-assistant-wave-batch-summary-message">${escapeHtml(state.releaseAssistantWaveBatchSummaryMessage)}</span>` : ""}
        ${state.releaseAssistantWaveReleaseMessage ? `<span class="release-assistant-wave-release-message${state.releaseAssistantWaveReleaseError ? " is-error" : ""}">${escapeHtml(state.releaseAssistantWaveReleaseMessage)}</span>` : ""}
      </div>
      <div class="release-assistant-wave-result-totals">
        <button
          id="releaseAssistantWaveRelease"
          class="release-assistant-wave-release-button"
          type="button"
          title="自动批量汇总、确认波次并生成拣选单"
        >放单</button>
        <button
          id="releaseAssistantWaveBatchSummary"
          class="release-assistant-wave-batch-summary-button"
          type="button"
          title="固定使用拣选策略 ${escapeHtml(pickStrategyName)}"
        >批量汇总</button>
        <span>总包裹 <strong>${formatNumber(totalPackages)}</strong></span>
      </div>
    </div>
    <div id="releaseAssistantWaveConfirmationDetail">
      ${releaseAssistantWaveConfirmationMarkup()}
    </div>
  `;
  syncReleaseAssistantWaveBatchSummaryButton();
  scrollReleaseAssistantWaveResultToLatestContent();
}

async function queryReleaseAssistantWaveSummary(options = {}) {
  if (
    state.releaseAssistantWaveQueryLoading
    || (state.releaseAssistantWaveBatchSummaryLoading && !options.allowDuringBatchSummary)
  ) return;
  const requestedMode = String(options.mode || state.releaseAssistantReleaseMode || "").trim().toLowerCase();
  const requestedOperator = String(options.operator || state.releaseAssistantWaveOperator || "").trim();
  const requestedZones = Array.isArray(options.zones)
    ? options.zones.map((zone) => String(zone || "").trim()).filter(Boolean)
    : [...state.releaseAssistantSelectedWaveZones];
  if (!requestedOperator) {
    renderReleaseAssistantWaveQueryMessage("请先选择筛选条件", true);
    return;
  }
  if (!requestedMode) {
    renderReleaseAssistantWaveQueryMessage("请先选择 Multi、Batch 或 Single", true);
    return;
  }
  if (requestedMode !== "multi" && requestedMode !== "batch" && requestedMode !== "single") {
    renderReleaseAssistantWaveQueryMessage("当前只配置了 Multi、Batch 和 Single 查询规则", true);
    return;
  }
  if ((requestedMode === "batch" || requestedMode === "single") && !requestedZones.length) {
    renderReleaseAssistantWaveQueryMessage(
      `${requestedMode === "single" ? "Single" : "Batch"} 请先选择至少一个库区`,
      true
    );
    return;
  }

  const previousSummaryData = state.releaseAssistantWaveSummaryData;
  state.releaseAssistantWaveQueryLoading = true;
  state.releaseAssistantWaveQueryKey = "";
  state.releaseAssistantWaveQueryExpiresAt = 0;
  state.releaseAssistantWaveTotalPackages = 0;
  state.releaseAssistantWaveBatchSummaryMessage = String(options.batchSummaryMessage || "");
  state.releaseAssistantWaveReleaseMessage = "";
  state.releaseAssistantWaveReleaseError = false;
  if (!options.keepWaveConfirmation) clearReleaseAssistantWaveConfirmation();
  syncReleaseAssistantWaveQueryButton();
  renderReleaseAssistantWaveQueryMessage(
    requestedMode === "batch" || requestedMode === "single"
      ? "正在按筛选条件和库区查询 WMS…"
      : "正在按货品品类 2–9、包裹数量 1–4 查询 WMS…"
  );
  try {
    const data = await api("/api/release-assistant/wave-summary", {
      mode: requestedMode,
      operator: requestedOperator,
      zones: requestedZones,
    });
    renderReleaseAssistantWaveQueryResult(data);
    return data;
  } catch (error) {
    if (options.batchSummaryMessage) {
      renderReleaseAssistantWaveQueryResult({
        ...(previousSummaryData || {
          mode: requestedMode,
          operator: requestedOperator,
          zones: requestedZones,
          rules: requestedMode === "multi"
            ? {
              packageQuantity: { start: 1, end: 4 },
              goodsCategoryQuantity: { start: 2, end: 9 },
            }
            : (
              requestedMode === "single"
                ? {
                  packageQuantity: { start: 1, end: 5 },
                  goodsQuantity: { start: 1, end: 1 },
                }
                : {}
            ),
          totalPackages: 0,
        }),
        queryKey: "",
      });
    } else {
      renderReleaseAssistantWaveQueryMessage(error.message || "WMS 查询失败", true);
    }
    return null;
  } finally {
    state.releaseAssistantWaveQueryLoading = false;
    syncReleaseAssistantWaveQueryButton();
    syncReleaseAssistantWaveBatchSummaryButton();
  }
}

async function loadReleaseAssistantWaveConfirmationDetail(waveNo, attempts = 1) {
  const normalizedWaveNo = String(waveNo || state.releaseAssistantWaveConfirmationNo || "").trim();
  if (!normalizedWaveNo) return;
  const requestId = state.releaseAssistantWaveConfirmationRequestId + 1;
  state.releaseAssistantWaveConfirmationRequestId = requestId;
  if (state.releaseAssistantWaveConfirmationNo !== normalizedWaveNo) {
    state.releaseAssistantWaveConfirmationActionRequestId += 1;
    state.releaseAssistantWaveConfirmationActionLoading = "";
    state.releaseAssistantWaveConfirmationActionPending = "";
    state.releaseAssistantWaveConfirmationActionMessage = "";
    state.releaseAssistantWaveConfirmationRow = null;
    state.releaseAssistantWaveQualityOpen = false;
    state.releaseAssistantWavePickListOpen = false;
  }
  state.releaseAssistantWaveConfirmationNo = normalizedWaveNo;
  state.releaseAssistantWaveConfirmationLoading = true;
  state.releaseAssistantWaveConfirmationError = "";
  renderReleaseAssistantWaveConfirmationSection();
  try {
    let matchedRow = null;
    const totalAttempts = Math.max(1, Number(attempts) || 1);
    for (let attempt = 0; attempt < totalAttempts; attempt += 1) {
      const data = await api("/api/release-assistant/wave-confirmation/detail", {
        waveNo: normalizedWaveNo,
      });
      if (
        requestId !== state.releaseAssistantWaveConfirmationRequestId
        || normalizedWaveNo !== state.releaseAssistantWaveConfirmationNo
      ) return;
      if (data?.row) {
        matchedRow = data.row;
        break;
      }
      if (attempt + 1 < totalAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
    state.releaseAssistantWaveConfirmationRow = matchedRow;
    if (!matchedRow) {
      state.releaseAssistantWaveConfirmationError = "WMS 波次确认中暂未查询到该波次";
    }
  } catch (error) {
    if (
      requestId !== state.releaseAssistantWaveConfirmationRequestId
      || normalizedWaveNo !== state.releaseAssistantWaveConfirmationNo
    ) return;
    state.releaseAssistantWaveConfirmationError = error.message || "波次确认明细读取失败";
  } finally {
    if (
      requestId !== state.releaseAssistantWaveConfirmationRequestId
      || normalizedWaveNo !== state.releaseAssistantWaveConfirmationNo
    ) return;
    state.releaseAssistantWaveConfirmationLoading = false;
    renderReleaseAssistantWaveConfirmationSection();
  }
}

async function runReleaseAssistantWaveConfirmationAction(action) {
  const waveNo = state.releaseAssistantWaveConfirmationNo;
  if (!waveNo || state.releaseAssistantWaveConfirmationActionLoading) return;
  const requestId = state.releaseAssistantWaveConfirmationActionRequestId + 1;
  state.releaseAssistantWaveConfirmationActionRequestId = requestId;
  state.releaseAssistantWaveConfirmationActionPending = "";
  state.releaseAssistantWaveConfirmationActionLoading = action;
  state.releaseAssistantWaveConfirmationActionMessage = "";
  state.releaseAssistantWaveConfirmationActionError = false;
  syncReleaseAssistantWaveQueryButton();
  renderReleaseAssistantWaveConfirmationSection();
  try {
    await api("/api/release-assistant/wave-confirmation/action", {
      waveNo,
      action,
    });
    if (
      requestId !== state.releaseAssistantWaveConfirmationActionRequestId
      || waveNo !== state.releaseAssistantWaveConfirmationNo
    ) return;
    state.releaseAssistantWaveConfirmationActionMessage = action === "confirm"
      ? `波次确认成功：${waveNo}`
      : `波次取消成功：${waveNo}`;
    state.releaseAssistantWaveConfirmationActionError = false;
    state.releaseAssistantWaveConfirmationActionLoading = "";
    syncReleaseAssistantWaveQueryButton();
    renderReleaseAssistantWaveConfirmationSection();
    await loadReleaseAssistantWaveConfirmationDetail(waveNo, 8);
  } catch (error) {
    if (
      requestId !== state.releaseAssistantWaveConfirmationActionRequestId
      || waveNo !== state.releaseAssistantWaveConfirmationNo
    ) return;
    state.releaseAssistantWaveConfirmationActionMessage = error.message
      || (action === "confirm" ? "波次确认失败" : "波次取消失败");
    state.releaseAssistantWaveConfirmationActionError = true;
  } finally {
    if (
      requestId !== state.releaseAssistantWaveConfirmationActionRequestId
      || waveNo !== state.releaseAssistantWaveConfirmationNo
    ) return;
    state.releaseAssistantWaveConfirmationActionLoading = "";
    syncReleaseAssistantWaveQueryButton();
    renderReleaseAssistantWaveConfirmationSection();
  }
}

async function loadReleaseAssistantWaveQuality(page = 1) {
  const waveNo = state.releaseAssistantWaveConfirmationNo;
  if (!waveNo || state.releaseAssistantWaveQualityLoading) return;
  const normalizedPage = Math.max(1, Number(page) || 1);
  const requestId = state.releaseAssistantWaveQualityRequestId + 1;
  state.releaseAssistantWaveQualityRequestId = requestId;
  state.releaseAssistantWavePickListRequestId += 1;
  state.releaseAssistantWavePickListLoading = false;
  state.releaseAssistantWavePickListOpen = false;
  state.releaseAssistantWaveQualityOpen = true;
  state.releaseAssistantWaveQualityPage = normalizedPage;
  state.releaseAssistantWaveQualityLoading = true;
  state.releaseAssistantWaveQualityError = "";
  state.releaseAssistantWaveQualityData = null;
  renderReleaseAssistantWaveConfirmationSection();
  try {
    const data = await api(
      "/api/release-assistant/wave-confirmation/quality",
      {
        waveNo,
        page: normalizedPage,
        size: state.releaseAssistantWaveQualitySize,
      },
    );
    if (
      requestId !== state.releaseAssistantWaveQualityRequestId
      || waveNo !== state.releaseAssistantWaveConfirmationNo
    ) return;
    state.releaseAssistantWaveQualityData = data;
    state.releaseAssistantWaveQualityPage = Math.max(1, Number(data?.page) || normalizedPage);
  } catch (error) {
    if (
      requestId !== state.releaseAssistantWaveQualityRequestId
      || waveNo !== state.releaseAssistantWaveConfirmationNo
    ) return;
    state.releaseAssistantWaveQualityError = error.message || "波次质量读取失败";
  } finally {
    if (
      requestId !== state.releaseAssistantWaveQualityRequestId
      || waveNo !== state.releaseAssistantWaveConfirmationNo
    ) return;
    state.releaseAssistantWaveQualityLoading = false;
    renderReleaseAssistantWaveConfirmationSection();
  }
}

async function loadReleaseAssistantWavePickList(page = 1) {
  const waveNo = state.releaseAssistantWaveConfirmationNo;
  if (!waveNo || state.releaseAssistantWavePickListLoading) return;
  const normalizedPage = Math.max(1, Number(page) || 1);
  const requestId = state.releaseAssistantWavePickListRequestId + 1;
  state.releaseAssistantWavePickListRequestId = requestId;
  state.releaseAssistantWaveQualityRequestId += 1;
  state.releaseAssistantWaveQualityLoading = false;
  state.releaseAssistantWaveQualityOpen = false;
  state.releaseAssistantWavePickListOpen = true;
  state.releaseAssistantWavePickListPage = normalizedPage;
  state.releaseAssistantWavePickListLoading = true;
  state.releaseAssistantWavePickListError = "";
  state.releaseAssistantWavePickListData = null;
  renderReleaseAssistantWaveConfirmationSection();
  try {
    const data = await api(
      "/api/release-assistant/wave-confirmation/pick-list",
      {
        waveNo,
        page: normalizedPage,
        size: state.releaseAssistantWavePickListSize,
      },
    );
    if (
      requestId !== state.releaseAssistantWavePickListRequestId
      || waveNo !== state.releaseAssistantWaveConfirmationNo
    ) return;
    state.releaseAssistantWavePickListData = data;
    state.releaseAssistantWavePickListPage = Math.max(1, Number(data?.page) || normalizedPage);
  } catch (error) {
    if (
      requestId !== state.releaseAssistantWavePickListRequestId
      || waveNo !== state.releaseAssistantWaveConfirmationNo
    ) return;
    state.releaseAssistantWavePickListError = error.message || "拣选单读取失败";
  } finally {
    if (
      requestId !== state.releaseAssistantWavePickListRequestId
      || waveNo !== state.releaseAssistantWaveConfirmationNo
    ) return;
    state.releaseAssistantWavePickListLoading = false;
    renderReleaseAssistantWaveConfirmationSection();
  }
}

function handleReleaseAssistantWaveConfirmationAction(event) {
  const button = event.target.closest("[data-release-wave-confirmation-action]");
  if (!button) return false;
  const action = button.dataset.releaseWaveConfirmationAction || "";
  if (action === "refresh") {
    loadReleaseAssistantWaveConfirmationDetail(state.releaseAssistantWaveConfirmationNo, 1);
  } else if (action === "confirm" || action === "cancel") {
    state.releaseAssistantWaveConfirmationActionPending = action;
    state.releaseAssistantWaveConfirmationActionMessage = "";
    state.releaseAssistantWaveConfirmationActionError = false;
    renderReleaseAssistantWaveConfirmationSection();
  } else if (action === "dismiss-action") {
    state.releaseAssistantWaveConfirmationActionPending = "";
    renderReleaseAssistantWaveConfirmationSection();
  } else if (action === "execute-confirm") {
    runReleaseAssistantWaveConfirmationAction("confirm");
  } else if (action === "execute-cancel") {
    runReleaseAssistantWaveConfirmationAction("cancel");
  } else if (action === "quality") {
    loadReleaseAssistantWaveQuality(1);
  } else if (action === "pick-list") {
    loadReleaseAssistantWavePickList(1);
  } else if (action === "quality-prev") {
    loadReleaseAssistantWaveQuality(state.releaseAssistantWaveQualityPage - 1);
  } else if (action === "quality-next") {
    loadReleaseAssistantWaveQuality(state.releaseAssistantWaveQualityPage + 1);
  } else if (action === "pick-list-prev") {
    loadReleaseAssistantWavePickList(state.releaseAssistantWavePickListPage - 1);
  } else if (action === "pick-list-next") {
    loadReleaseAssistantWavePickList(state.releaseAssistantWavePickListPage + 1);
  } else if (action === "close-quality") {
    state.releaseAssistantWaveQualityRequestId += 1;
    state.releaseAssistantWaveQualityLoading = false;
    state.releaseAssistantWaveQualityOpen = false;
    renderReleaseAssistantWaveConfirmationSection();
  } else if (action === "close-pick-list") {
    state.releaseAssistantWavePickListRequestId += 1;
    state.releaseAssistantWavePickListLoading = false;
    state.releaseAssistantWavePickListOpen = false;
    renderReleaseAssistantWaveConfirmationSection();
  }
  return true;
}

async function runReleaseAssistantWaveBatchSummary() {
  if (state.releaseAssistantWaveBatchSummaryLoading || state.releaseAssistantWaveReleaseLoading) return;
  const queryKey = String(state.releaseAssistantWaveQueryKey || "").trim();
  if (!queryKey || state.releaseAssistantWaveTotalPackages <= 0) {
    renderReleaseAssistantWaveQueryMessage("查询结果已失效，请重新查询", true);
    return;
  }
  if (state.releaseAssistantWaveBatchSummarySubmittedKeys.has(queryKey)) {
    renderReleaseAssistantWaveQueryMessage("该查询已提交过批量汇总，不能重复生成波次", true);
    return;
  }
  if (Date.now() >= state.releaseAssistantWaveQueryExpiresAt) {
    state.releaseAssistantWaveQueryKey = "";
    state.releaseAssistantWaveQueryExpiresAt = 0;
    renderReleaseAssistantWaveQueryMessage("查询结果已超过 30 分钟，请重新查询", true);
    return;
  }

  state.releaseAssistantWaveBatchSummaryLoading = true;
  state.releaseAssistantWaveBatchSummarySubmittedKeys.add(queryKey);
  if (state.releaseAssistantWaveBatchSummarySubmittedKeys.size > 500) {
    const oldestKey = state.releaseAssistantWaveBatchSummarySubmittedKeys.values().next().value;
    state.releaseAssistantWaveBatchSummarySubmittedKeys.delete(oldestKey);
  }
  syncReleaseAssistantWaveQueryButton();
  syncReleaseAssistantWaveBatchSummaryButton();
  try {
    const summaryData = state.releaseAssistantWaveSummaryData || {};
    const queryMode = summaryData.mode === "batch"
      ? "batch"
      : (summaryData.mode === "single" ? "single" : "multi");
    const queryOperator = String(summaryData.operator || state.releaseAssistantWaveOperator || "").trim();
    const queryZones = Array.isArray(summaryData.zones)
      ? summaryData.zones
      : [...state.releaseAssistantSelectedWaveZones];
    const data = await api("/api/release-assistant/wave-batch-summary", {
      queryKey,
      mode: queryMode,
      operator: queryOperator,
      zones: queryZones,
    });
    const returnedWaveNo = String(data?.waveNo || "").trim();
    if (!state.releaseAssistantWaveBatchSummaryWaveByKey.has(queryKey) && returnedWaveNo) {
      state.releaseAssistantWaveBatchSummaryWaveByKey.set(queryKey, returnedWaveNo);
      if (state.releaseAssistantWaveBatchSummaryWaveByKey.size > 100) {
        const oldestKey = state.releaseAssistantWaveBatchSummaryWaveByKey.keys().next().value;
        state.releaseAssistantWaveBatchSummaryWaveByKey.delete(oldestKey);
      }
    }
    const waveNo = state.releaseAssistantWaveBatchSummaryWaveByKey.get(queryKey) || returnedWaveNo;
    const batchSummaryMessage = `批量汇总成功，波次号：${waveNo || "-"}`;
    state.releaseAssistantWaveBatchSummaryMessage = batchSummaryMessage;
    renderReleaseAssistantWaveQueryResult({
      ...summaryData,
      ...(data?.visibleSummary || {}),
      pickStrategyName: data?.pickStrategyName,
      retainedPickItemMin: data?.retainedPickItemMin,
      retainedPickItemMax: data?.retainedPickItemMax,
      single120Strategy: data?.single120Strategy === true,
      queryKey: "",
    });
    if (waveNo) {
      await loadReleaseAssistantWaveConfirmationDetail(waveNo, 8);
    }
  } catch (error) {
    state.releaseAssistantWaveBatchSummaryMessage = "";
    renderReleaseAssistantWaveQueryMessage(error.message || "WMS 批量汇总失败", true);
  } finally {
    state.releaseAssistantWaveBatchSummaryLoading = false;
    syncReleaseAssistantWaveQueryButton();
    syncReleaseAssistantWaveBatchSummaryButton();
  }
}

async function runReleaseAssistantWaveRelease() {
  if (
    state.releaseAssistantWaveReleaseLoading
    || state.releaseAssistantWaveQueryLoading
    || state.releaseAssistantWaveBatchSummaryLoading
    || state.releaseAssistantWaveConfirmationActionLoading
  ) return;

  const summaryData = state.releaseAssistantWaveSummaryData || {};
  const mode = summaryData.mode === "batch"
    ? "batch"
    : (summaryData.mode === "single" ? "single" : "multi");
  const queryKey = String(state.releaseAssistantWaveQueryKey || "").trim();
  if (!queryKey) {
    state.releaseAssistantWaveReleaseMessage = "查询结果已失效，请重新查询";
    state.releaseAssistantWaveReleaseError = true;
    renderReleaseAssistantWaveQueryResult(summaryData);
    return;
  }
  if (queryKey && Date.now() >= state.releaseAssistantWaveQueryExpiresAt) {
    state.releaseAssistantWaveQueryKey = "";
    state.releaseAssistantWaveQueryExpiresAt = 0;
    state.releaseAssistantWaveReleaseMessage = "查询结果已超过 30 分钟，请重新查询";
    state.releaseAssistantWaveReleaseError = true;
    renderReleaseAssistantWaveQueryResult({ ...summaryData, queryKey: "" });
    return;
  }

  state.releaseAssistantWaveReleaseLoading = true;
  state.releaseAssistantWaveReleaseMessage = "";
  state.releaseAssistantWaveReleaseError = false;
  syncReleaseAssistantWaveQueryButton();
  syncReleaseAssistantWaveBatchSummaryButton();
  try {
    const data = await api(
      "/api/release-assistant/wave-release",
      {
        queryKey,
        mode,
        totalPackages: Number(summaryData.totalPackages ?? state.releaseAssistantWaveTotalPackages) || 0,
        operator: String(summaryData.operator || state.releaseAssistantWaveOperator || "").trim(),
        zones: Array.isArray(summaryData.zones)
          ? summaryData.zones
          : [...state.releaseAssistantSelectedWaveZones],
      },
      {
        timeoutMs: 120000,
        timeoutMessage: "放单超过 120 秒，已停止等待；请勿重复操作，先查询波次状态",
      },
    );
    const waveNo = String(data?.waveNo || "").trim();
    if (!waveNo) throw new Error("WMS 未返回波次号");

    if (queryKey) {
      state.releaseAssistantWaveBatchSummarySubmittedKeys.add(queryKey);
      state.releaseAssistantWaveBatchSummaryWaveByKey.set(queryKey, waveNo);
    }
    state.releaseAssistantWaveConfirmationNo = waveNo;
    state.releaseAssistantWaveConfirmationRow = null;
    state.releaseAssistantWaveConfirmationError = "";
    state.releaseAssistantWaveBatchSummaryMessage = "";

    const generatedCount = Number(data?.generatedPickOrderCount) || 0;
    const canceledCount = Number(data?.canceledPickOrderCount) || 0;
    const retainedCount = Number(data?.retainedPickOrderCount) || 0;
    const failedCount = Array.isArray(data?.failedPickOrderNos) ? data.failedPickOrderNos.length : 0;
    const unknownCount = Array.isArray(data?.unknownPickOrderNos) ? data.unknownPickOrderNos.length : 0;
    const missingCount = Array.isArray(data?.missingPieceCountPickOrderNos)
      ? data.missingPieceCountPickOrderNos.length
      : 0;
    const nonPendingCount = Array.isArray(data?.nonPendingOutOfRangePickOrderNos)
      ? data.nonPendingOutOfRangePickOrderNos.length
      : 0;
    const retainedPickItemMin = Number(data?.retainedPickItemMin)
      || releaseAssistantSingleProfileForDisplay(summaryData).retainedPickItemMin;
    const retainedPickItemMax = Number(data?.retainedPickItemMax)
      || releaseAssistantSingleProfileForDisplay(summaryData).retainedPickItemMax;
    if (data?.complete) {
      state.releaseAssistantWaveReleaseMessage = mode === "single"
        ? `放单成功：波次 ${waveNo} 已确认，生成 ${formatNumber(generatedCount)} 个拣选单；保留 ${formatNumber(retainedPickItemMin)}–${formatNumber(retainedPickItemMax)} 件 ${formatNumber(retainedCount)} 个，已取消 ${formatNumber(canceledCount)} 个`
        : `放单成功：波次 ${waveNo} 已确认，生成 ${formatNumber(generatedCount)} 个拣选单`;
      state.releaseAssistantWaveReleaseError = false;
      state.releaseAssistantWaveReleasedWaveNos.add(waveNo);
      if (state.releaseAssistantWaveReleasedWaveNos.size > 500) {
        const oldestWaveNo = state.releaseAssistantWaveReleasedWaveNos.values().next().value;
        state.releaseAssistantWaveReleasedWaveNos.delete(oldestWaveNo);
      }
      state.releaseAssistantWaveQueryKey = "";
      state.releaseAssistantWaveQueryExpiresAt = 0;
    } else {
      const details = [
        String(data?.error || "").trim(),
        failedCount ? `取消失败 ${formatNumber(failedCount)} 个` : "",
        unknownCount ? `取消结果待确认 ${formatNumber(unknownCount)} 个` : "",
        missingCount ? `件数缺失 ${formatNumber(missingCount)} 个，未自动取消` : "",
        nonPendingCount ? `非待拣选状态 ${formatNumber(nonPendingCount)} 个，未能取消` : "",
      ].filter(Boolean);
      state.releaseAssistantWaveReleaseMessage = `放单未完全完成：波次 ${waveNo}${details.length ? `；${details.join("；")}` : ""}`;
      state.releaseAssistantWaveReleaseError = true;
    }

    const nextSummary = {
      ...summaryData,
      ...(data?.visibleSummary || {}),
      pickStrategyName: data?.pickStrategyName,
      retainedPickItemMin: data?.retainedPickItemMin,
      retainedPickItemMax: data?.retainedPickItemMax,
      single120Strategy: data?.single120Strategy === true,
      queryKey: data?.complete ? "" : queryKey,
    };
    renderReleaseAssistantWaveQueryResult(nextSummary);
    await loadReleaseAssistantWaveConfirmationDetail(waveNo, 2);
  } catch (error) {
    state.releaseAssistantWaveReleaseMessage = error.message || "放单失败";
    state.releaseAssistantWaveReleaseError = true;
    renderReleaseAssistantWaveQueryResult({
      ...summaryData,
      queryKey,
    });
  } finally {
    state.releaseAssistantWaveReleaseLoading = false;
    syncReleaseAssistantWaveQueryButton();
    syncReleaseAssistantWaveBatchSummaryButton();
  }
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
  hideReleaseAssistantZonePreview();
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

function releaseAssistantZoneCellText(row) {
  return String(row?.dataset.releaseZoneText || row?.children?.[1]?.textContent || "").trim();
}

function releaseAssistantOrderText(row) {
  return String(row?.querySelector(".release-row-checkbox")?.dataset.releaseOrder || "").trim();
}

function releaseAssistantZonePreviewElement() {
  let preview = document.querySelector("#releaseAssistantZonePreview");
  if (!preview) {
    preview = document.createElement("div");
    preview.id = "releaseAssistantZonePreview";
    preview.className = "release-assistant-zone-preview";
    preview.hidden = true;
    document.body.appendChild(preview);
  }
  return preview;
}

function releaseAssistantZonePreviewRows(rows) {
  return rows.map((row) => {
    const order = releaseAssistantOrderText(row);
    const zoneText = releaseAssistantZoneCellText(row);
    return `
      <div>
        <span>${escapeHtml(order || "-")}</span>
        <strong>${escapeHtml(zoneText || "-")}</strong>
      </div>
    `;
  }).join("");
}

function releaseAssistantZonePreviewHtml(target) {
  const directText = target?.dataset.releaseZonePreview;
  if (directText != null) {
    const row = target.closest("tr[data-release-row-index]");
    const order = releaseAssistantOrderText(row);
    return `
      <div class="release-assistant-zone-preview-title">${escapeHtml(order ? `${order} 的库区` : "完整库区")}</div>
      <div class="release-assistant-zone-preview-text">${escapeHtml(directText || "-")}</div>
    `;
  }

  const code = target?.dataset.releaseZonePreviewCode || "";
  if (code) {
    const rows = releaseAssistantRowsForZoneCode(code);
    return `
      <div class="release-assistant-zone-preview-title">${escapeHtml(code)} 全部库区</div>
      <div class="release-assistant-zone-preview-meta">${formatNumber(rows.length)} 单</div>
      <div class="release-assistant-zone-preview-list">${releaseAssistantZonePreviewRows(rows)}</div>
    `;
  }

  const group = target?.dataset.releaseZonePreviewGroup || "";
  if (group) {
    const rows = releaseAssistantRows().filter((row) => {
      const code = row.dataset.releaseZoneCode || "";
      return code.split("-")[0] === group && !row.classList.contains("is-release-row-copy-confirmed");
    });
    return `
      <div class="release-assistant-zone-preview-title">${escapeHtml(group)} 区全部库区</div>
      <div class="release-assistant-zone-preview-meta">${formatNumber(rows.length)} 单</div>
      <div class="release-assistant-zone-preview-list">${releaseAssistantZonePreviewRows(rows)}</div>
    `;
  }

  return "";
}

function positionReleaseAssistantZonePreview(x, y) {
  const preview = document.querySelector("#releaseAssistantZonePreview");
  if (!preview || preview.hidden) return;

  const margin = 12;
  const offset = 14;
  const width = preview.offsetWidth || 320;
  const height = preview.offsetHeight || 120;
  let left = x + offset;
  let top = y + offset;
  if (left + width + margin > window.innerWidth) left = x - width - offset;
  if (top + height + margin > window.innerHeight) top = window.innerHeight - height - margin;
  preview.style.left = `${Math.max(margin, Math.round(left))}px`;
  preview.style.top = `${Math.max(margin, Math.round(top))}px`;
}

function showReleaseAssistantZonePreview(target, event) {
  const html = releaseAssistantZonePreviewHtml(target);
  if (!html) return;

  const preview = releaseAssistantZonePreviewElement();
  state.releaseAssistantZonePreviewTarget = target;
  preview.innerHTML = html;
  preview.hidden = false;
  const rect = target.getBoundingClientRect();
  positionReleaseAssistantZonePreview(event?.clientX ?? rect.right, event?.clientY ?? rect.top);
}

function hideReleaseAssistantZonePreview() {
  state.releaseAssistantZonePreviewTarget = null;
  const preview = document.querySelector("#releaseAssistantZonePreview");
  if (!preview) return;
  preview.hidden = true;
  preview.innerHTML = "";
}

function releaseAssistantZonePreviewTarget(event) {
  const target = releaseAssistantEventTarget(event);
  return target?.closest?.("[data-release-zone-preview], [data-release-zone-preview-code], [data-release-zone-preview-group]") || null;
}

function handleReleaseAssistantZonePreviewOver(event) {
  const target = releaseAssistantZonePreviewTarget(event);
  if (!target) return;
  showReleaseAssistantZonePreview(target, event);
}

function handleReleaseAssistantZonePreviewMove(event) {
  if (!state.releaseAssistantZonePreviewTarget) return;
  positionReleaseAssistantZonePreview(event.clientX, event.clientY);
}

function handleReleaseAssistantZonePreviewOut(event) {
  const target = state.releaseAssistantZonePreviewTarget;
  const related = event.relatedTarget instanceof Element ? event.relatedTarget : null;
  if (!target || (related && target.contains(related))) return;
  hideReleaseAssistantZonePreview();
}

function handleReleaseAssistantZonePreviewFocus(event) {
  const target = releaseAssistantZonePreviewTarget(event);
  if (!target) return;
  showReleaseAssistantZonePreview(target);
}

function handleReleaseAssistantZonePreviewBlur() {
  hideReleaseAssistantZonePreview();
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
            <div class="release-assistant-zone-chart-row${rowClass}" data-release-zone-preview-code="${escapeHtml(item.zone)}" tabindex="0">
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
      <strong tabindex="0" data-release-zone-preview-group="${escapeHtml(zone)}">${escapeHtml(zone)}</strong>
      <div>
        ${[...codes.entries()].sort(([codeA], [codeB]) => releaseAssistantCompareZoneCodes(codeA, codeB)).map(([code, item]) => {
          const status = item.copied ? `已选择${formatNumber(item.copied)}单` : item.selected ? `已选择${formatNumber(item.selected)}单` : "";
          const action = item.copied ? "cancel" : "copy";
          const actionText = item.copied ? "取消" : "选择";
          return `
            <span>
              <span class="release-assistant-zone-total" tabindex="0" data-release-zone-preview-code="${escapeHtml(code)}">${escapeHtml(code)}（<b>${formatNumber(item.total)}</b>单）</span>
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
  hideReleaseAssistantZonePreview();
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
            const zoneTextAttribute = ` data-release-zone-text="${escapeHtml(row?.[1] ?? "")}"`;
            return `
              <tr data-release-row-index="${index}"${rowClass}${zoneCodeAttribute}${chartZoneAttribute}${zoneTextAttribute}>
                <td>
                  <div class="release-assistant-select-cell">
                    <input class="release-row-checkbox" type="checkbox" data-release-row-index="${index}" data-release-order="${escapeHtml(row?.[0] ?? "")}">
                    <span>${escapeHtml(row?.[0] ?? "")}</span>
                  </div>
                </td>
                <td class="release-assistant-zone-cell" tabindex="0" data-release-zone-preview="${escapeHtml(row?.[1] ?? "")}">${escapeHtml(row?.[1] ?? "")}</td>
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
  hideReleaseAssistantZonePreview();
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
    const key = personIdentityKey(name);
    if (!key || seen.has(key)) return false;
    seen.add(key);
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

function normalizeReleaseAssistantNextShiftRosterNames(values) {
  const seen = new Set();
  return (Array.isArray(values) ? values : [])
    .map((value) => String(value || "").trim())
    .filter((name) => {
      const dedupeKey = name.toLocaleLowerCase("en-US");
      if (!name || seen.has(dedupeKey)) return false;
      seen.add(dedupeKey);
      return true;
    });
}

function releaseAssistantNextShiftRosterNameKey(value) {
  return String(value || "").trim().toLocaleLowerCase("en-US");
}

function normalizeReleaseAssistantNextShiftRosterOffNames(
  values,
  names = state.releaseAssistantNextShiftRosterNames,
) {
  const canonicalByKey = new Map(
    normalizeReleaseAssistantNextShiftRosterNames(names)
      .map((name) => [releaseAssistantNextShiftRosterNameKey(name), name]),
  );
  const sourceValues = Array.isArray(values)
    ? values
    : values instanceof Set
      ? [...values]
      : [];
  const seen = new Set();
  return sourceValues
    .map((value) => canonicalByKey.get(releaseAssistantNextShiftRosterNameKey(value)) || "")
    .filter((name) => {
      const key = releaseAssistantNextShiftRosterNameKey(name);
      if (!name || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function applyReleaseAssistantNextShiftRosterData(data = {}) {
  const names = normalizeReleaseAssistantNextShiftRosterNames(data?.names);
  const offNames = normalizeReleaseAssistantNextShiftRosterOffNames(
    data?.offNames,
    names,
  );
  state.releaseAssistantNextShiftRosterNames = names;
  state.releaseAssistantNextShiftRosterOffNames = new Set(offNames);
  return { names, offNames };
}

function releaseAssistantNextShiftAssignableNames() {
  const offKeys = new Set(
    normalizeReleaseAssistantNextShiftRosterOffNames(
      state.releaseAssistantNextShiftRosterOffNames,
      state.releaseAssistantNextShiftRosterNames,
    ).map(releaseAssistantNextShiftRosterNameKey),
  );
  return normalizeReleaseAssistantNextShiftRosterNames(
    state.releaseAssistantNextShiftRosterNames,
  ).filter((name) => !offKeys.has(releaseAssistantNextShiftRosterNameKey(name)));
}

function releaseAssistantNextShiftAssignedOrderCounts() {
  const counts = new Map();
  releaseAssistantCancelPickRows().forEach((row) => {
    if (Number(row?.status) !== 350) return;
    const person = String(row?.operator || row?.assignedOperator || "").trim();
    const key = releaseAssistantNextShiftRosterNameKey(person);
    if (!key) return;
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return counts;
}

function releaseAssistantNextShiftAssignedZones() {
  const zonesByPerson = new Map();
  releaseAssistantCancelPickRows().forEach((row) => {
    if (Number(row?.status) !== 350) return;
    const person = String(row?.operator || row?.assignedOperator || "").trim();
    const key = releaseAssistantNextShiftRosterNameKey(person);
    if (!key) return;
    if (!zonesByPerson.has(key)) zonesByPerson.set(key, new Map());
    const priority = Math.max(0, Number(row?.priority) || 0);
    releaseAssistantCancelPickCanonicalZones(row).forEach((zone) => {
      const currentPriority = zonesByPerson.get(key).get(zone) || 0;
      zonesByPerson.get(key).set(zone, Math.max(currentPriority, priority));
    });
  });
  return new Map(
    [...zonesByPerson].map(([key, zones]) => [
      key,
      [...zones]
        .map(([zone, priority]) => ({ zone, priority }))
        .sort((left, right) => (
          releaseAssistantCancelPickTextCompare(left.zone, right.zone)
        )),
    ]),
  );
}

function positionReleaseAssistantNextShiftPickerFloat(position = state.releaseAssistantNextShiftPickerPosition) {
  const panel = el.releaseAssistantNextShiftPickerFloat;
  if (!panel || panel.hidden) return;
  const margin = 8;
  const rect = panel.getBoundingClientRect();
  const maxLeft = Math.max(margin, window.innerWidth - rect.width - margin);
  const maxTop = Math.max(margin, window.innerHeight - rect.height - margin);
  const requestedLeft = Number(position?.left);
  const requestedTop = Number(position?.top);
  const left = Math.min(
    maxLeft,
    Math.max(
      margin,
      Number.isFinite(requestedLeft) ? requestedLeft : (window.innerWidth - rect.width) / 2,
    ),
  );
  const top = Math.min(
    maxTop,
    Math.max(
      margin,
      Number.isFinite(requestedTop) ? requestedTop : 86,
    ),
  );
  panel.style.left = `${Math.round(left)}px`;
  panel.style.top = `${Math.round(top)}px`;
  state.releaseAssistantNextShiftPickerPosition = { left, top };
}

function renderReleaseAssistantNextShiftPickerFloat() {
  const panel = el.releaseAssistantNextShiftPickerFloat;
  if (!panel) return;
  panel.hidden = !state.releaseAssistantNextShiftPickerOpen;
  if (!state.releaseAssistantNextShiftPickerOpen) return;

  const orderCount = state.releaseAssistantCancelPickSelected.size;
  const activePerson = state.releaseAssistantNextShiftPickerActivePerson;
  const busy = state.releaseAssistantNextShiftPickerLoading
    || state.releaseAssistantNextShiftPickerSubmitting;
  if (el.releaseAssistantNextShiftPickerFloatMeta) {
    el.releaseAssistantNextShiftPickerFloatMeta.textContent = `已选择 ${formatNumber(orderCount)} 条拣选单 · 当前人员 ${activePerson || "未选择"}`;
  }
  if (el.releaseAssistantNextShiftPickerFloatSelectedCount) {
    el.releaseAssistantNextShiftPickerFloatSelectedCount.textContent =
      `待分配 ${formatNumber(orderCount)} 条`;
  }
  if (el.releaseAssistantNextShiftPickerFloatSubmit) {
    el.releaseAssistantNextShiftPickerFloatSubmit.disabled = busy
      || !activePerson
      || !orderCount;
    el.releaseAssistantNextShiftPickerFloatSubmit.textContent = state.releaseAssistantNextShiftPickerSubmitting
      ? "分配中…"
      : "分配";
  }
  if (el.releaseAssistantNextShiftPickerFloatClose) {
    el.releaseAssistantNextShiftPickerFloatClose.disabled = state.releaseAssistantNextShiftPickerSubmitting;
  }
  if (el.releaseAssistantNextShiftPickerFloatNotice) {
    const notice = state.releaseAssistantNextShiftPickerError
      || state.releaseAssistantNextShiftPickerMessage;
    el.releaseAssistantNextShiftPickerFloatNotice.textContent = notice;
    el.releaseAssistantNextShiftPickerFloatNotice.hidden = !notice;
    el.releaseAssistantNextShiftPickerFloatNotice.classList.toggle(
      "is-success",
      Boolean(state.releaseAssistantNextShiftPickerMessage)
        && !state.releaseAssistantNextShiftPickerError,
    );
  }
  if (el.releaseAssistantNextShiftPickerFloatList) {
    const allNames = normalizeReleaseAssistantNextShiftRosterNames(
      state.releaseAssistantNextShiftRosterNames,
    );
    const names = releaseAssistantNextShiftAssignableNames();
    const assignedOrderCounts = releaseAssistantNextShiftAssignedOrderCounts();
    const assignedZones = releaseAssistantNextShiftAssignedZones();
    if (state.releaseAssistantNextShiftPickerLoading) {
      el.releaseAssistantNextShiftPickerFloatList.innerHTML = `
        <div class="release-assistant-next-shift-picker-float-empty">正在读取下个班次名单…</div>
      `;
    } else if (!allNames.length) {
      el.releaseAssistantNextShiftPickerFloatList.innerHTML = `
        <div class="release-assistant-next-shift-picker-float-empty">下个班次名单为空；请先取消拣选单选择，再维护名单。</div>
      `;
    } else if (!names.length) {
      el.releaseAssistantNextShiftPickerFloatList.innerHTML = `
        <div class="release-assistant-next-shift-picker-float-empty">下个班次人员均为 OFF；请先取消拣选单选择，再维护名单。</div>
      `;
    } else {
      el.releaseAssistantNextShiftPickerFloatList.innerHTML = names.map((name) => {
        const selected = activePerson === name;
        const personKey = releaseAssistantNextShiftRosterNameKey(name);
        const assignedOrderCount = assignedOrderCounts.get(personKey) || 0;
        const personZones = assignedZones.get(personKey) || [];
        const assignedZoneText = personZones.length
          ? personZones.map((item) => item.zone).join("、")
          : "-";
        const assignedZoneMarkup = personZones.length
          ? personZones.map((item) => {
              const priority = Number(item?.priority) || 0;
              const priorityLabel = releaseAssistantPickPriorityLabel(priority);
              return `
                <span
                  class="release-assistant-next-shift-picker-zone${priority ? ` is-${priority}` : ""}"
                  title="${escapeHtml(`${item.zone} · ${priorityLabel}`)}"
                >${escapeHtml(item.zone)}</span>
              `;
            }).join("")
          : `<span class="release-assistant-next-shift-picker-zone is-empty">-</span>`;
        return `
          <button
            class="release-assistant-next-shift-picker-person${selected ? " is-selected" : ""}"
            type="button"
            data-next-shift-picker-person="${escapeHtml(name)}"
            aria-pressed="${selected ? "true" : "false"}"
            title="${escapeHtml(`${name} · 已分配库区 ${assignedZoneText} · 已分配拣选单 ${formatNumber(assignedOrderCount)} 条`)}"
            ${busy ? "disabled" : ""}
          >
            <span class="release-assistant-next-shift-picker-person-name">${escapeHtml(name)}</span>
            <span
              class="release-assistant-next-shift-picker-person-zones"
              title="已分配库区：${escapeHtml(assignedZoneText)}"
            >${assignedZoneMarkup}</span>
            <strong
              class="release-assistant-next-shift-picker-person-count"
              aria-label="已分配拣选单 ${escapeHtml(formatNumber(assignedOrderCount))} 条"
            >（${escapeHtml(formatNumber(assignedOrderCount))}）</strong>
          </button>
        `;
      }).join("");
    }
  }
  positionReleaseAssistantNextShiftPickerFloat();
}

function closeReleaseAssistantNextShiftPickerFloat(options = {}) {
  if (
    state.releaseAssistantNextShiftPickerSubmitting
    && options.force !== true
  ) return;
  const shouldSync = options.sync !== false;
  const shouldRestoreFocus = options.restoreFocus !== false;
  const drag = state.releaseAssistantNextShiftPickerDrag;
  if (
    drag
    && el.releaseAssistantNextShiftPickerFloatHeader?.hasPointerCapture?.(drag.pointerId)
  ) {
    el.releaseAssistantNextShiftPickerFloatHeader.releasePointerCapture(drag.pointerId);
  }
  state.releaseAssistantNextShiftPickerRequestId += 1;
  state.releaseAssistantNextShiftPickerOpen = false;
  state.releaseAssistantNextShiftPickerLoading = false;
  state.releaseAssistantNextShiftPickerError = "";
  state.releaseAssistantNextShiftPickerMessage = "";
  state.releaseAssistantNextShiftPickerActivePerson = "";
  state.releaseAssistantNextShiftPickerDrag = null;
  el.releaseAssistantNextShiftPickerFloatHeader?.classList.remove("is-dragging");
  if (el.releaseAssistantNextShiftPickerFloat) {
    el.releaseAssistantNextShiftPickerFloat.hidden = true;
  }
  if (shouldSync) syncReleaseAssistantCancelPickSelection();
  if (shouldRestoreFocus && state.releaseAssistantCancelPickOpen) {
    el.releaseAssistantAssignNextShiftPicker?.focus();
  }
}

function syncReleaseAssistantNextShiftPickerWithPickSelection() {
  if (!state.releaseAssistantNextShiftPickerOpen) return;
  if (!state.releaseAssistantCancelPickOpen) {
    closeReleaseAssistantNextShiftPickerFloat({
      sync: false,
      restoreFocus: false,
      force: true,
    });
    return;
  }
  renderReleaseAssistantNextShiftPickerFloat();
}

async function openReleaseAssistantNextShiftPickerFloat() {
  if (
    !state.releaseAssistantCancelPickSelected.size
    || state.releaseAssistantNextShiftPickerLoading
    || state.releaseAssistantNextShiftPickerSubmitting
    || !el.releaseAssistantNextShiftPickerFloat
  ) return;
  if (state.releaseAssistantNextShiftPickerOpen) {
    renderReleaseAssistantNextShiftPickerFloat();
    el.releaseAssistantNextShiftPickerFloatClose?.focus();
    return;
  }

  const requestId = state.releaseAssistantNextShiftPickerRequestId + 1;
  state.releaseAssistantNextShiftPickerRequestId = requestId;
  state.releaseAssistantNextShiftPickerOpen = true;
  state.releaseAssistantNextShiftPickerLoading = true;
  state.releaseAssistantNextShiftPickerError = "";
  state.releaseAssistantNextShiftPickerMessage = "";
  renderReleaseAssistantNextShiftPickerFloat();
  syncReleaseAssistantCancelPickSelection();
  el.releaseAssistantNextShiftPickerFloatClose?.focus();

  try {
    const data = await api("/api/release-assistant/next-shift-picker-roster");
    if (
      requestId !== state.releaseAssistantNextShiftPickerRequestId
      || !state.releaseAssistantNextShiftPickerOpen
      || !state.releaseAssistantCancelPickOpen
    ) return;
    applyReleaseAssistantNextShiftRosterData(data);
    const names = releaseAssistantNextShiftAssignableNames();
    if (
      state.releaseAssistantNextShiftPickerActivePerson
      && !names.includes(state.releaseAssistantNextShiftPickerActivePerson)
    ) state.releaseAssistantNextShiftPickerActivePerson = "";
  } catch (error) {
    if (
      requestId !== state.releaseAssistantNextShiftPickerRequestId
      || !state.releaseAssistantNextShiftPickerOpen
    ) return;
    state.releaseAssistantNextShiftPickerError = error.message || "下个班次名单读取失败";
  } finally {
    if (requestId === state.releaseAssistantNextShiftPickerRequestId) {
      state.releaseAssistantNextShiftPickerLoading = false;
      renderReleaseAssistantNextShiftPickerFloat();
      syncReleaseAssistantCancelPickSelection();
      el.releaseAssistantNextShiftPickerFloatList
        ?.querySelector("[data-next-shift-picker-person]")
        ?.focus();
    }
  }
}

async function submitReleaseAssistantNextShiftAssignment() {
  if (
    state.releaseAssistantNextShiftPickerLoading
    || state.releaseAssistantNextShiftPickerSubmitting
  ) return;
  const person = String(state.releaseAssistantNextShiftPickerActivePerson || "").trim();
  const selectedPickOrderNos = [...state.releaseAssistantCancelPickSelected];
  if (!person || !selectedPickOrderNos.length) return;

  const rowByPickOrder = new Map(
    releaseAssistantCancelPickRows().map((row) => [
      String(row?.pickOrderNo || "").trim(),
      row,
    ]),
  );
  const unsupported = selectedPickOrderNos.filter((pickOrderNo) => (
    rowByPickOrder.get(pickOrderNo)?.canAssign === false
    || !rowByPickOrder.has(pickOrderNo)
  ));
  if (unsupported.length) {
    state.releaseAssistantNextShiftPickerError =
      `以下拣选单不支持指定拣选人：${unsupported.slice(0, 6).join("、")}${unsupported.length > 6 ? "…" : ""}`;
    state.releaseAssistantNextShiftPickerMessage = "";
    renderReleaseAssistantNextShiftPickerFloat();
    return;
  }
  if (selectedPickOrderNos.length > 50) {
    state.releaseAssistantNextShiftPickerError = "单次最多分配 50 个拣选单，请减少选择后重试";
    state.releaseAssistantNextShiftPickerMessage = "";
    renderReleaseAssistantNextShiftPickerFloat();
    return;
  }

  const assignments = selectedPickOrderNos.map((pickOrderNo) => ({
    pickOrderNo,
    operator: person,
  }));
  state.releaseAssistantNextShiftPickerSubmitting = true;
  state.releaseAssistantNextShiftPickerError = "";
  state.releaseAssistantNextShiftPickerMessage =
    `正在将 ${formatNumber(assignments.length)} 个拣选单分配给 ${person}…`;
  state.releaseAssistantCancelPickMessage = "";
  state.releaseAssistantCancelPickError = "";
  renderReleaseAssistantCancelPickModal();

  let closeAfterRefresh = false;
  try {
    const result = await api("/api/release-assistant/pick-orders/assign", {
      assignments,
    });
    const succeeded = Array.isArray(result?.successPickOrderNos)
      ? result.successPickOrderNos
      : [];
    const failed = Array.isArray(result?.failedPickOrderNos)
      ? result.failedPickOrderNos
      : [];
    const unknown = Array.isArray(result?.unknownPickOrderNos)
      ? result.unknownPickOrderNos
      : [];
    succeeded.forEach((pickOrderNo) => {
      state.releaseAssistantCancelPickSelected.delete(pickOrderNo);
    });
    state.releaseAssistantCancelPickMessage = succeeded.length
      ? `已将 ${formatNumber(succeeded.length)} 个拣选单分配给 ${person}`
      : "";
    const errorParts = [];
    if (failed.length) {
      errorParts.push(
        `${formatNumber(failed.length)} 个拣选单分配失败：${failed.slice(0, 6).join("、")}${failed.length > 6 ? "…" : ""}`,
      );
    }
    if (unknown.length) {
      errorParts.push(
        `${formatNumber(unknown.length)} 个分配结果待确认：${unknown.slice(0, 6).join("、")}${unknown.length > 6 ? "…" : ""}`,
      );
    }
    state.releaseAssistantCancelPickError = errorParts.join("；");
    state.releaseAssistantNextShiftPickerError = errorParts.join("；");
    state.releaseAssistantNextShiftPickerMessage = succeeded.length
      ? `已成功分配 ${formatNumber(succeeded.length)} 个拣选单给 ${person}`
      : "";
    closeAfterRefresh = succeeded.length === selectedPickOrderNos.length
      && !errorParts.length;
  } catch (error) {
    const message = error.message || "指定下个班次拣选人失败";
    state.releaseAssistantCancelPickError = message;
    state.releaseAssistantNextShiftPickerError = message;
    state.releaseAssistantNextShiftPickerMessage = "";
  } finally {
    state.releaseAssistantNextShiftPickerSubmitting = false;
    if (closeAfterRefresh) {
      closeReleaseAssistantNextShiftPickerFloat();
    } else {
      renderReleaseAssistantCancelPickModal();
      renderReleaseAssistantNextShiftPickerFloat();
    }
    if (state.releaseAssistantCancelPickOpen) {
      void loadReleaseAssistantPendingPickOrders({
        page: state.releaseAssistantCancelPickPage,
        resetSelection: false,
        preserveNotice: true,
        silentError: true,
      });
    }
  }
}

function handleReleaseAssistantNextShiftPickerFloatClick(event) {
  if (event.target.closest("#releaseAssistantNextShiftPickerFloatClose")) {
    closeReleaseAssistantNextShiftPickerFloat();
    return;
  }
  const submitButton = event.target.closest("#releaseAssistantNextShiftPickerFloatSubmit");
  if (submitButton && !submitButton.disabled) {
    submitReleaseAssistantNextShiftAssignment();
    return;
  }
  const personButton = event.target.closest("[data-next-shift-picker-person]");
  if (
    !personButton
    || personButton.disabled
    || state.releaseAssistantNextShiftPickerLoading
    || state.releaseAssistantNextShiftPickerSubmitting
  ) return;
  const name = String(personButton.dataset.nextShiftPickerPerson || "").trim();
  if (!name) return;
  state.releaseAssistantNextShiftPickerActivePerson =
    state.releaseAssistantNextShiftPickerActivePerson === name ? "" : name;
  state.releaseAssistantNextShiftPickerError = "";
  state.releaseAssistantNextShiftPickerMessage = "";
  renderReleaseAssistantNextShiftPickerFloat();
  [...(el.releaseAssistantNextShiftPickerFloatList
    ?.querySelectorAll("[data-next-shift-picker-person]") || [])]
    .find((button) => button.dataset.nextShiftPickerPerson === name)
    ?.focus();
}

function startReleaseAssistantNextShiftPickerDrag(event) {
  if (
    event.button !== 0
    || event.target.closest("button")
    || !state.releaseAssistantNextShiftPickerOpen
    || !el.releaseAssistantNextShiftPickerFloat
  ) return;
  const rect = el.releaseAssistantNextShiftPickerFloat.getBoundingClientRect();
  state.releaseAssistantNextShiftPickerDrag = {
    pointerId: event.pointerId,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
  };
  el.releaseAssistantNextShiftPickerFloatHeader?.classList.add("is-dragging");
  el.releaseAssistantNextShiftPickerFloatHeader?.setPointerCapture?.(event.pointerId);
  event.preventDefault();
}

function moveReleaseAssistantNextShiftPickerDrag(event) {
  const drag = state.releaseAssistantNextShiftPickerDrag;
  const panel = el.releaseAssistantNextShiftPickerFloat;
  if (!drag || drag.pointerId !== event.pointerId || !panel) return;
  const margin = 8;
  const rect = panel.getBoundingClientRect();
  const maxLeft = Math.max(margin, window.innerWidth - rect.width - margin);
  const maxTop = Math.max(margin, window.innerHeight - rect.height - margin);
  const left = Math.min(maxLeft, Math.max(margin, event.clientX - drag.offsetX));
  const top = Math.min(maxTop, Math.max(margin, event.clientY - drag.offsetY));
  panel.style.left = `${Math.round(left)}px`;
  panel.style.top = `${Math.round(top)}px`;
  state.releaseAssistantNextShiftPickerPosition = { left, top };
}

function finishReleaseAssistantNextShiftPickerDrag(event) {
  const drag = state.releaseAssistantNextShiftPickerDrag;
  if (!drag || drag.pointerId !== event.pointerId) return;
  state.releaseAssistantNextShiftPickerDrag = null;
  el.releaseAssistantNextShiftPickerFloatHeader?.classList.remove("is-dragging");
  if (
    el.releaseAssistantNextShiftPickerFloatHeader?.hasPointerCapture?.(event.pointerId)
  ) {
    el.releaseAssistantNextShiftPickerFloatHeader.releasePointerCapture(event.pointerId);
  }
}

function releaseAssistantNextShiftRosterNamesFromText() {
  return normalizeReleaseAssistantNextShiftRosterNames(
    String(el.releaseAssistantNextShiftRosterText?.value || "").split(/\r?\n/),
  );
}

function releaseAssistantNextShiftRosterOffNamesFromText(
  names = releaseAssistantNextShiftRosterNamesFromText(),
) {
  return normalizeReleaseAssistantNextShiftRosterOffNames(
    state.releaseAssistantNextShiftRosterOffNames,
    names,
  );
}

function renderReleaseAssistantNextShiftRosterCards() {
  const names = releaseAssistantNextShiftRosterNamesFromText();
  const offNames = releaseAssistantNextShiftRosterOffNamesFromText(names);
  const selectedNames = normalizeReleaseAssistantNextShiftRosterOffNames(
    state.releaseAssistantNextShiftRosterSelected,
    names,
  );
  const offKeys = new Set(offNames.map(releaseAssistantNextShiftRosterNameKey));
  state.releaseAssistantNextShiftRosterOffNames = new Set(offNames);
  state.releaseAssistantNextShiftRosterSelected = new Set(selectedNames);

  if (el.releaseAssistantNextShiftRosterCards) {
    if (state.releaseAssistantNextShiftRosterLoading && !names.length) {
      el.releaseAssistantNextShiftRosterCards.innerHTML = `
        <em>正在读取名单…</em>
      `;
    } else if (!names.length) {
      el.releaseAssistantNextShiftRosterCards.innerHTML = `
        <em>名单为空，请在下方每行输入一个姓名。</em>
      `;
    } else {
      el.releaseAssistantNextShiftRosterCards.innerHTML = names.map((name) => {
        const selected = state.releaseAssistantNextShiftRosterSelected.has(name);
        const isOff = offKeys.has(releaseAssistantNextShiftRosterNameKey(name));
        return `
          <button
            class="release-assistant-next-shift-roster-person${selected ? " is-selected" : ""}${isOff ? " is-off" : ""}"
            type="button"
            data-next-shift-roster-person="${escapeHtml(name)}"
            aria-pressed="${selected ? "true" : "false"}"
            title="${escapeHtml(name)} · ${isOff ? "OFF，不在可指派列表" : "可指派"}"
            ${state.releaseAssistantNextShiftRosterLoading || state.releaseAssistantNextShiftRosterSaving ? "disabled" : ""}
          >
            <strong>${escapeHtml(name)}</strong>
            <span>${isOff ? "OFF" : "可指派"}</span>
          </button>
        `;
      }).join("");
    }
  }
  if (el.releaseAssistantNextShiftRosterSelectedCount) {
    el.releaseAssistantNextShiftRosterSelectedCount.textContent =
      `已选择 ${formatNumber(state.releaseAssistantNextShiftRosterSelected.size)} 人`;
  }
  if (el.releaseAssistantNextShiftRosterOff) {
    el.releaseAssistantNextShiftRosterOff.disabled =
      state.releaseAssistantNextShiftRosterLoading
      || state.releaseAssistantNextShiftRosterSaving
      || !state.releaseAssistantNextShiftRosterSelected.size;
  }
  if (el.releaseAssistantNextShiftRosterCancelAllOff) {
    el.releaseAssistantNextShiftRosterCancelAllOff.disabled =
      state.releaseAssistantNextShiftRosterLoading
      || state.releaseAssistantNextShiftRosterSaving
      || !offNames.length;
    el.releaseAssistantNextShiftRosterCancelAllOff.textContent =
      state.releaseAssistantNextShiftRosterSaving ? "取消中…" : "全部取消";
  }
  if (el.releaseAssistantNextShiftRosterCount) {
    el.releaseAssistantNextShiftRosterCount.classList.remove("is-error");
    el.releaseAssistantNextShiftRosterCount.textContent =
      state.releaseAssistantNextShiftRosterLoading
        ? "正在读取名单…"
        : `${formatNumber(names.length)} 人 · 可指派 ${formatNumber(names.length - offNames.length)} · OFF ${formatNumber(offNames.length)}`;
  }
}

function toggleReleaseAssistantNextShiftRosterPerson(nameValue) {
  if (
    state.releaseAssistantNextShiftRosterLoading
    || state.releaseAssistantNextShiftRosterSaving
  ) return;
  const names = releaseAssistantNextShiftRosterNamesFromText();
  const canonicalName = normalizeReleaseAssistantNextShiftRosterOffNames(
    [nameValue],
    names,
  )[0];
  if (!canonicalName) return;
  if (state.releaseAssistantNextShiftRosterSelected.has(canonicalName)) {
    state.releaseAssistantNextShiftRosterSelected.delete(canonicalName);
  } else {
    state.releaseAssistantNextShiftRosterSelected.add(canonicalName);
  }
  renderReleaseAssistantNextShiftRosterCards();
}

function setSelectedReleaseAssistantNextShiftRosterPeopleOff() {
  if (
    state.releaseAssistantNextShiftRosterLoading
    || state.releaseAssistantNextShiftRosterSaving
    || !state.releaseAssistantNextShiftRosterSelected.size
  ) return;
  const names = releaseAssistantNextShiftRosterNamesFromText();
  const offNames = new Set(releaseAssistantNextShiftRosterOffNamesFromText(names));
  normalizeReleaseAssistantNextShiftRosterOffNames(
    state.releaseAssistantNextShiftRosterSelected,
    names,
  ).forEach((name) => offNames.add(name));
  state.releaseAssistantNextShiftRosterOffNames = new Set(
    normalizeReleaseAssistantNextShiftRosterOffNames(offNames, names),
  );
  state.releaseAssistantNextShiftRosterSelected.clear();
  renderReleaseAssistantNextShiftRosterCards();
}

async function cancelAllReleaseAssistantNextShiftRosterPeopleOff() {
  if (
    state.releaseAssistantNextShiftRosterLoading
    || state.releaseAssistantNextShiftRosterSaving
  ) return;
  const names = releaseAssistantNextShiftRosterNamesFromText();
  const offNames = releaseAssistantNextShiftRosterOffNamesFromText(names);
  if (!offNames.length) return;
  state.releaseAssistantNextShiftRosterSaving = true;
  state.releaseAssistantNextShiftRosterSelected.clear();
  state.releaseAssistantCancelPickMessage = "";
  state.releaseAssistantCancelPickError = "";
  renderReleaseAssistantNextShiftRosterCards();
  syncReleaseAssistantNextShiftRosterControls();
  try {
    const data = await api("/api/release-assistant/next-shift-picker-roster", {
      names,
      offNames: [],
    });
    const saved = applyReleaseAssistantNextShiftRosterData(data);
    el.releaseAssistantNextShiftRosterText.value = saved.names.join("\n");
    state.releaseAssistantCancelPickMessage =
      `已取消全部 OFF：${formatNumber(offNames.length)} 人恢复可指派`;
  } catch (error) {
    const message = error.message || "取消全部 OFF 失败";
    state.releaseAssistantCancelPickError = message;
    el.releaseAssistantNextShiftRosterCount.classList.add("is-error");
    el.releaseAssistantNextShiftRosterCount.textContent = message;
  } finally {
    state.releaseAssistantNextShiftRosterSaving = false;
    renderReleaseAssistantNextShiftRosterCards();
    syncReleaseAssistantNextShiftRosterControls();
    renderReleaseAssistantCancelPickModal();
  }
}

function updateReleaseAssistantNextShiftRosterCount() {
  renderReleaseAssistantNextShiftRosterCards();
}

function syncReleaseAssistantNextShiftRosterControls() {
  const busy = state.releaseAssistantNextShiftRosterLoading
    || state.releaseAssistantNextShiftRosterSaving;
  if (el.releaseAssistantNextShiftRosterText) {
    el.releaseAssistantNextShiftRosterText.disabled = busy;
  }
  if (el.releaseAssistantNextShiftRosterClose) {
    el.releaseAssistantNextShiftRosterClose.disabled = busy;
  }
  if (el.releaseAssistantNextShiftRosterAddLine) {
    el.releaseAssistantNextShiftRosterAddLine.disabled = busy;
  }
  if (el.releaseAssistantNextShiftRosterSaveClose) {
    el.releaseAssistantNextShiftRosterSaveClose.disabled = busy;
    el.releaseAssistantNextShiftRosterSaveClose.textContent = state.releaseAssistantNextShiftRosterSaving
      ? "保存中…"
      : "关闭保存";
  }
  el.releaseAssistantNextShiftRosterCards
    ?.querySelectorAll("[data-next-shift-roster-person]")
    .forEach((button) => {
      button.disabled = busy;
    });
  if (el.releaseAssistantNextShiftRosterOff) {
    el.releaseAssistantNextShiftRosterOff.disabled =
      busy || !state.releaseAssistantNextShiftRosterSelected.size;
  }
  if (el.releaseAssistantNextShiftRosterCancelAllOff) {
    const offCount = releaseAssistantNextShiftRosterOffNamesFromText().length;
    el.releaseAssistantNextShiftRosterCancelAllOff.disabled = busy || !offCount;
    el.releaseAssistantNextShiftRosterCancelAllOff.textContent =
      state.releaseAssistantNextShiftRosterSaving ? "取消中…" : "全部取消";
  }
  syncReleaseAssistantCancelPickSelection();
}

async function openReleaseAssistantNextShiftRoster() {
  if (
    state.releaseAssistantCancelPickSelected.size
    || state.releaseAssistantNextShiftRosterLoading
    || state.releaseAssistantNextShiftRosterSaving
    || !el.releaseAssistantNextShiftRosterModal
    || !el.releaseAssistantNextShiftRosterModal.hidden
  ) return;
  state.releaseAssistantNextShiftRosterLoading = true;
  state.releaseAssistantNextShiftRosterSelected.clear();
  state.releaseAssistantCancelPickMessage = "";
  state.releaseAssistantCancelPickError = "";
  el.releaseAssistantNextShiftRosterText.value = state.releaseAssistantNextShiftRosterNames.join("\n");
  el.releaseAssistantNextShiftRosterCount.classList.remove("is-error");
  el.releaseAssistantNextShiftRosterCount.textContent = "正在读取名单…";
  el.releaseAssistantNextShiftRosterModal.hidden = false;
  renderReleaseAssistantNextShiftRosterCards();
  syncReleaseAssistantNextShiftRosterControls();
  try {
    const data = await api("/api/release-assistant/next-shift-picker-roster");
    if (
      !state.releaseAssistantCancelPickOpen
      || state.releaseAssistantCancelPickSelected.size
    ) {
      el.releaseAssistantNextShiftRosterModal.hidden = true;
      return;
    }
    const { names } = applyReleaseAssistantNextShiftRosterData(data);
    el.releaseAssistantNextShiftRosterText.value = names.join("\n");
    updateReleaseAssistantNextShiftRosterCount();
    el.releaseAssistantNextShiftRosterText.focus();
  } catch (error) {
    state.releaseAssistantCancelPickError = error.message || "下个班次人员名单读取失败";
    el.releaseAssistantNextShiftRosterModal.hidden = true;
  } finally {
    state.releaseAssistantNextShiftRosterLoading = false;
    if (!el.releaseAssistantNextShiftRosterModal.hidden) {
      renderReleaseAssistantNextShiftRosterCards();
    }
    syncReleaseAssistantNextShiftRosterControls();
    renderReleaseAssistantCancelPickModal();
  }
}

async function saveReleaseAssistantNextShiftRosterAndClose() {
  if (
    state.releaseAssistantNextShiftRosterLoading
    || state.releaseAssistantNextShiftRosterSaving
    || !el.releaseAssistantNextShiftRosterModal
    || el.releaseAssistantNextShiftRosterModal.hidden
  ) return;
  const names = releaseAssistantNextShiftRosterNamesFromText();
  const offNames = releaseAssistantNextShiftRosterOffNamesFromText(names);
  state.releaseAssistantNextShiftRosterSaving = true;
  state.releaseAssistantCancelPickMessage = "";
  state.releaseAssistantCancelPickError = "";
  syncReleaseAssistantNextShiftRosterControls();
  try {
    const data = await api("/api/release-assistant/next-shift-picker-roster", {
      names,
      offNames,
    });
    applyReleaseAssistantNextShiftRosterData(data);
    state.releaseAssistantNextShiftRosterSelected.clear();
    el.releaseAssistantNextShiftRosterText.value = state.releaseAssistantNextShiftRosterNames.join("\n");
    updateReleaseAssistantNextShiftRosterCount();
    el.releaseAssistantNextShiftRosterModal.hidden = true;
    state.releaseAssistantCancelPickMessage = `下个班次人员名单已保存：${formatNumber(state.releaseAssistantNextShiftRosterNames.length)} 人`;
  } catch (error) {
    const message = error.message || "下个班次人员名单保存失败";
    state.releaseAssistantCancelPickError = message;
    el.releaseAssistantNextShiftRosterCount.classList.add("is-error");
    el.releaseAssistantNextShiftRosterCount.textContent = message;
  } finally {
    state.releaseAssistantNextShiftRosterSaving = false;
    syncReleaseAssistantNextShiftRosterControls();
    renderReleaseAssistantCancelPickModal();
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
  const rows = (analysis?.rows || []).filter((row) => isEnabledLocationStatus(row.locationStatus));
  return `
    <section class="empty-location-qualified">
      <div class="empty-location-qualified-head">
        <strong>符合标准的库位</strong>
        <span>${formatNumber(rows.length)} 个</span>
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

function personIdentityKey(value) {
  return String(value || "")
    .trim()
    .normalize("NFKC")
    .toLocaleLowerCase("en-US");
}

function rosterIndex(person) {
  const key = personIdentityKey(person);
  if (!key) return -1;
  return state.nightRosterNames.findIndex((name) => personIdentityKey(name) === key);
}

function isRosterPerson(person) {
  return state.nightRosterNames.length === 0 || rosterIndex(person) >= 0;
}

function isRosterListedPerson(person) {
  return state.nightRosterNames.length > 0 && rosterIndex(person) >= 0;
}

function comparePersonNames(a, b) {
  const aPerson = String(a?.person ?? a ?? "").trim();
  const bPerson = String(b?.person ?? b ?? "").trim();
  return aPerson.localeCompare(bPerson, "en", { numeric: true, sensitivity: "base" })
    || aPerson.localeCompare(bPerson, "zh-Hans-CN", { numeric: true, sensitivity: "variant" });
}

function compareShiftThenPerson(a, b) {
  const aOutsider = isRosterPerson(a.person) ? 0 : 1;
  const bOutsider = isRosterPerson(b.person) ? 0 : 1;
  return aOutsider - bOutsider || comparePersonNames(a, b);
}

function sortByNightRoster(rows) {
  return [...rows].sort(compareShiftThenPerson);
}

function sortByEfficiencyRank(rows) {
  return [...rows].sort(compareShiftThenPerson);
}

function currentShiftEfficiencyRows(rows) {
  if (!state.nightRosterNames.length) {
    return sortByEfficiencyRank(rows)
      .filter((row) => Number(row.completedQuantity || 0) > 0 && !row.excludeEfficiency);
  }

  const byPerson = new Map(rows.map((row) => [personIdentityKey(row?.person), row]));
  return state.nightRosterNames
    .map((name) => byPerson.get(personIdentityKey(name)) || { person: name })
    .sort((a, b) => {
      const aHasData = Number(a.completedQuantity || 0) > 0 ? 0 : 1;
      const bHasData = Number(b.completedQuantity || 0) > 0 ? 0 : 1;
      return aHasData - bHasData || comparePersonNames(a, b);
    });
}

function sortByMultiOrder(rows) {
  return [...rows].sort(compareShiftThenPerson);
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
          <span>${copyablePersonHtml(person.person || "-")}</span>
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
          <strong>${copyablePersonHtml(person.person || "-")}</strong>
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
          <h3>${copyablePersonHtml(person.person)}</h3>
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
  const activeRosterNames = state.nightRosterNames.filter((name) => (
    result.people.some((person) => personIdentityKey(person?.person) === personIdentityKey(name))
  ));
  el.metrics.classList.add("is-grouped");
  el.metrics.innerHTML = `
    ${metricGroup("本班次", `名单 ${formatNumber(state.nightRosterNames.length)} 人 / 有数据 ${formatNumber(activeRosterNames.length)} 人`, summarizeMetricPeople(currentPeople), "is-current", { scope: "current", result })}
    ${metricGroup("其他班次", `名单外 ${formatNumber(otherPeople.length)} 人`, summarizeMetricPeople(otherPeople), "is-other", { scope: "other", result })}
  `;
}

function rowsTable(headers, rows, options = {}) {
  const emptyText = options.emptyText || "没有数据";
  if (!rows.length) return `<div class="empty-state">${escapeHtml(emptyText)}</div>`;
  const isCopyablePersonHeader = (header) => header.copyPerson || String(header.label || "").trim() === "人员";
  return `
    <div class="analysis-table-wrap">
      <table class="${options.compact ? "compact" : ""}">
        <thead>
          <tr>${headers.map((header) => `<th>${escapeHtml(header.label)}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows.map((row, index) => `
            <tr class="${options.rowClass ? options.rowClass(row, index) : ""}">
              ${headers.map((header) => {
                const raw = typeof header.value === "function" ? header.value(row, index) : row[header.key];
                const html = header.cellHtml
                  ? header.cellHtml(row, index)
                  : isCopyablePersonHeader(header)
                    ? copyablePersonHtml(raw, {
                      jump: true,
                      className: options.personClass ? options.personClass(row, index) : "",
                    })
                    : (header.html ? raw : escapeHtml(raw ?? ""));
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

function activePickingPersonClass(row, result) {
  const orderType = activePickingOrder(row, result)?.pickingOrderType;
  if (orderType === "single") return "is-picking-single";
  if (orderType === "multi") return "is-picking-multi";
  return "";
}

function pickingPeopleBreakdownText(rows) {
  const people = Array.isArray(rows) ? rows : [];
  const multiPeople = people.filter((row) => Number(row.pickingMultiRows || 0) > 0).length;
  const singlePeople = people.filter((row) => Number(row.pickingSingleRows || 0) > 0).length;
  const singleBatchPeople = people.filter((row) => Number(row.pickingSingleBatchRows || 0) > 0).length;
  return `共 ${formatNumber(people.length)} 人 · Multi ${formatNumber(multiPeople)} 人 · Single ${formatNumber(singlePeople)} 人 · Single Batch ${formatNumber(singleBatchPeople)} 人`;
}

function pickingProgressCell(row, result) {
  const pickingRows = Number(row.pickingRows || 0);
  if (pickingRows !== 1) return formatNumber(row.pickingRows);

  const order = activePickingOrder(row, result);
  const progress = order?.liveTaskProgress || row.pickingProgress || null;
  const expectedQuantity = Number(progress?.expectedQuantity || 0);
  const pickedQuantity = Number(progress?.pickedQuantity || 0);
  const progressAtMs = Number(result?.livePickingTaskProgress?.fetchedAtMs || result?.source?.analyzedAtMs);
  const elapsedMinutes = order ? minutesBetweenMs(order.startedAtMs, progressAtMs) : null;
  if (!order || !expectedQuantity || elapsedMinutes == null) {
    if (result?.livePickingTaskProgressLoading) return formatNumber(row.pickingRows);
    return `<div class="picking-progress-cell is-muted"><strong>${formatNumber(row.pickingRows)}</strong><span>无实时明细</span></div>`;
  }

  const percent = Math.max(0, Math.round((pickedQuantity / expectedQuantity) * 100));
  const width = Math.min(100, percent);
  const level = percent > 100 ? "is-danger" : percent >= 80 ? "is-warn" : "";
  const elapsedValue = Math.max(0, Math.round(Number(elapsedMinutes || 0)));
  const label = `${formatNumber(pickedQuantity)}/${formatNumber(expectedQuantity)} · ${formatNumber(elapsedValue)}`;
  const title = `挑选数量/预期数量 ${formatNumber(pickedQuantity)}/${formatNumber(expectedQuantity)}，已进行 ${formatNumber(elapsedValue)}`;
  return `
    <div class="picking-progress-cell ${level}">
      <strong>${formatNumber(row.pickingRows)}</strong>
      <div class="picking-progress-bar" title="${escapeHtml(title)}">
        <span style="width: ${width}%"></span>
        <b>${escapeHtml(label)}</b>
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
    personClass: options.personClass,
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

function assignedNotPickingRows(result) {
  const latestCompleted = lastCompletedOrderByPerson(result);
  const assignedRows = result.assignedOnlyPeople
    // WMS 已分配人员必须始终显示。班次名单只用于班次归类，不能把已经
    // 持有拣选单但暂未开始拣选的人员从实时状态中删掉。
    .filter((person) => String(person?.person || "").trim())
    .map((person) => ({ ...person, completedAwaitingAssignment: false }));
  const completedAwaitingRows = result.people
    .filter((person) => (
      isRosterListedPerson(person.person)
      && person.assignedRows === 0
      && person.pickingRows === 0
      && person.completedRows > 0
    ))
    .map((person) => ({ ...person, completedAwaitingAssignment: true }));

  return [...assignedRows, ...completedAwaitingRows].map((person) => {
    const lastCompleted = latestCompleted.get(person.person);
    return {
      ...person,
      lastCompleted,
      waitMinutes: lastCompleted ? minutesBetweenMs(lastCompleted.endedAtMs, result.source.analyzedAtMs) : null,
    };
  }).sort(comparePersonNames);
}

function assignedNotPickingTable(result, rows = assignedNotPickingRows(result)) {

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
    rowClass: (row) => (row.completedAwaitingAssignment ? "completed-awaiting-assignment-row" : ""),
  });
}

function waveCockpitSummary(summary) {
  const sections = Array.isArray(summary?.sections) ? summary.sections : [];
  if (!sections.length) return "";
  return `
    <div class="wave-cockpit-summary">
      ${sections.map((section) => `
        <div class="wave-cockpit-section">
          <h4>${escapeHtml(section.title || "-")}</h4>
          <div class="wave-cockpit-card-grid">
            ${(Array.isArray(section.cards) ? section.cards : []).map((card) => `
              <div class="wave-cockpit-card">
                <strong>${escapeHtml(card.title || "-")}</strong>
                <div class="wave-cockpit-metrics">
                  ${(Array.isArray(card.metrics) ? card.metrics : []).map((metric) => `
                    <div class="wave-cockpit-metric">
                      <span>${escapeHtml(metric.label || "-")}</span>
                      <div><b>${formatNumber(metric.orderCount)}</b><em>/ ${formatNumber(metric.packageCount)} pkgs</em></div>
                    </div>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderWaveCockpitSummary(summary, requestId) {
  if (requestId !== state.waveCockpitRequestId) return;
  state.waveCockpitSummary = summary;
  const host = document.querySelector("#waveCockpitSummaryHost");
  if (!host) return;
  host.innerHTML = waveCockpitSummary(summary);
}

function applyLivePickingTaskProgress(data, result, requestId) {
  const currentAnalysisRequest = requestId === state.pickingProgressRequestId;
  const currentPeopleStatusRequest = Boolean(
    state.releaseAssistantPeopleStatusAnalysis === result
    && state.releaseAssistantPeopleStatusProgressRequestId === requestId,
  );
  if (!currentAnalysisRequest && !currentPeopleStatusRequest) return;
  const progressRows = Array.isArray(data?.progressRows) ? data.progressRows : [];
  const progressByOrder = new Map(progressRows.map((row) => [String(row?.pickOrderNumber || ""), row]));

  for (const order of result.orderDurations || []) {
    if (order.statusGroup !== "拣选中") continue;
    order.liveTaskProgress = progressByOrder.get(String(order.pickOrderNumber || "")) || null;
  }

  result.livePickingTaskProgressLoading = false;
  result.livePickingTaskProgress = {
    fetchedAtMs: Number(data?.fetchedAtMs || Date.now()),
    orderCount: progressRows.length,
  };

  if (state.releaseAssistantAssignPickerAnalysis === result) {
    renderReleaseAssistantAssignPickerPanel();
  }
  finishReleaseAssistantPeopleStatusProgress(result, requestId);
  if (state.lastResult === result) {
    const host = document.querySelector("#pickingPeopleTableHost");
    if (host) {
      host.innerHTML = personTable(result.pickingPeople, "没有拣选中的人", {
        progressResult: result,
        includePickingZone: true,
        personClass: (row) => activePickingPersonClass(row, result),
      });
    }
  }
}

async function loadLivePickingTaskProgress(result, requestId) {
  const activeOrders = (Array.isArray(result?.pickingPeople) ? result.pickingPeople : [])
    .map((row) => activePickingOrder(row, result))
    .filter((order) => order?.pickOrderNumber);
  const fallbackOrders = (result?.orderDurations || [])
    .filter((order) => order.statusGroup === "拣选中" && order.pickOrderNumber);
  const pickOrderNumbers = [...new Set((activeOrders.length ? activeOrders : fallbackOrders)
    .map((order) => String(order.pickOrderNumber)))];
  if (!pickOrderNumbers.length) {
    applyLivePickingTaskProgress({ progressRows: [], fetchedAtMs: Date.now() }, result, requestId);
    return;
  }

  try {
    const data = await api(
      "/api/wms/picking-progress",
      { pickOrderNumbers },
      {
        timeoutMs: WMS_PICKING_PROGRESS_REQUEST_TIMEOUT_MS,
        timeoutMessage: "实时拣选进度读取超过 35 秒，已停止刷新",
      },
    );
    applyLivePickingTaskProgress(data, result, requestId);
  } catch (error) {
    result.livePickingTaskProgressLoading = false;
    finishReleaseAssistantPeopleStatusProgress(
      result,
      requestId,
      error.message || "实时拣选进度读取失败",
    );
    console.warn("拣选进度加载失败:", error);
  }
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
    return compareShiftThenPerson(a, b)
      || String(a.order || "").localeCompare(String(b.order || ""));
  });
}

function releaseReminderRows(result) {
  const personMap = new Map(
    (result.people || []).map((person) => [personIdentityKey(person?.person), person]),
  );
  const startedPeople = new Set((result.orderDurations || [])
    .filter((row) => row.startedAtMs != null)
    .map((row) => personIdentityKey(row?.person)));
  const names = state.nightRosterNames.length
    ? state.nightRosterNames
    : (result.people || []).map((person) => person.person);

  return names
    .map((name) => {
      const key = personIdentityKey(name);
      if (!startedPeople.has(key)) return null;
      const person = personMap.get(key) || { person: name };
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
    .sort(compareShiftThenPerson);
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
  const concurrencyRows = pickingConcurrencyRiskRows(result);
  if (!concurrencyRows.length) return "";

  return `
    <section class="analysis-section attention-section">
        <div class="section-title">
          <h3>当前空档风险</h3>
          <span>拣选中异常 ${formatNumber(concurrencyRows.length)} 人</span>
        </div>
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
      <div id="${personTimelineId(person.person)}" class="timeline-person ${isRosterPerson(person.person) ? "" : "roster-outsider-card"}">
        <div class="timeline-person-head">
          <div>
            <strong>${copyablePersonHtml(person.person, { jump: true })}</strong>
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
  const assignedNotPickingRowsForDisplay = assignedNotPickingRows(result);
  renderAnalysisMetrics(result);
  el.previewTitle.textContent = "拣选状态分析";
  const sourceMin = result.source.dataMin || result.source.createdMin || "-";
  const sourceMax = result.source.dataMax || result.source.createdMax || "-";
  el.previewSubtitle.textContent = `${result.source.filePath} / ${result.source.rows} 条 / ${sourceMin} 至 ${sourceMax}`;
  if (el.previewTableWrap) el.previewTableWrap.hidden = true;
  if (el.resultArea) el.resultArea.hidden = true;
  if (el.refreshPreview) el.refreshPreview.hidden = true;

  el.analysisContent.innerHTML = `
    ${focusAttentionSections(result)}

    <section class="analysis-grid">
      <div class="analysis-section">
        <div class="section-title">
          <h3>拣选中的人</h3>
          <span>${pickingPeopleBreakdownText(result.pickingPeople)}</span>
        </div>
        <div id="pickingPeopleTableHost">
          ${personTable(result.pickingPeople, "没有拣选中的人", {
            progressResult: result,
            includePickingZone: true,
            personClass: (row) => activePickingPersonClass(row, result),
          })}
        </div>
      </div>

      <div class="analysis-section">
        <div class="section-title">
          <h3>已分配但未在拣选的人</h3>
          <span>${formatNumber(assignedNotPickingRowsForDisplay.length)} 人</span>
        </div>
        ${assignedNotPickingTable(result, assignedNotPickingRowsForDisplay)}
        <div id="waveCockpitSummaryHost">${waveCockpitSummary(result.waveCockpit || state.waveCockpitSummary)}</div>
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
  if (el.efficiencyContent) {
    el.efficiencyContent.hidden = false;
    el.efficiencyContent.innerHTML = `
      <section class="analysis-section">
        <div class="section-title">
          <h3>每个人人效</h3>
          <span>单内工时 / 首单到末单 / 8小时，结果都是件/小时</span>
        </div>
        ${efficiencyTable(result.people, "没有可计算人效的已拣选数据")}
      </section>
    `;
  }
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
  if (el.efficiencyContent) {
    el.efficiencyContent.hidden = true;
    el.efficiencyContent.innerHTML = "";
  }
  if (el.exceptionResult) {
    el.exceptionResult.hidden = true;
    el.exceptionResult.classList.remove("is-error-text");
    el.exceptionResult.innerHTML = "";
  }
  try {
    localStorage.removeItem(HENRY_LABEL_TEXT_STORAGE_KEY);
  } catch (error) {}
  state.henryLabelText = "Label to Henry";
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

function currentHenryLabelText() {
  const text = String(state.henryLabelText || "").trim();
  return text || "Label to Henry";
}

function loadHenryLabelText() {
  try {
    const saved = String(localStorage.getItem(HENRY_LABEL_TEXT_STORAGE_KEY) || "").trim();
    state.henryLabelText = saved || "Label to Henry";
  } catch (error) {
    state.henryLabelText = "Label to Henry";
  }
}

function saveHenryLabelText(text) {
  const nextText = String(text || "").trim() || "Label to Henry";
  state.henryLabelText = nextText;
  localStorage.setItem(HENRY_LABEL_TEXT_STORAGE_KEY, nextText);
  syncHenryLabelPrintButtons();
}

function syncHenryLabelPrintButtons() {
  const text = currentHenryLabelText();
  document.querySelectorAll('[data-print-mode="henry"]').forEach((button) => {
    button.dataset.printNotice = text;
    button.title = `打印文字：${text}`;
  });
  document.querySelectorAll(".inventory-location-print-edit-button").forEach((button) => {
    button.dataset.printNotice = text;
  });
}

function openHenryLabelEditModal() {
  if (!el.henryLabelEditModal || !el.henryLabelEditInput) return;
  el.henryLabelEditInput.value = currentHenryLabelText();
  el.henryLabelEditModal.hidden = false;
  requestAnimationFrame(() => {
    el.henryLabelEditInput.focus();
    el.henryLabelEditInput.select();
  });
}

function closeHenryLabelEditModal() {
  if (el.henryLabelEditModal) el.henryLabelEditModal.hidden = true;
}

function confirmHenryLabelEdit() {
  saveHenryLabelText(el.henryLabelEditInput?.value || "");
  closeHenryLabelEditModal();
}

function editHenryLabelPrintText() {
  openHenryLabelEditModal();
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

function attributeChangeBatchResult(rowIndex) {
  return state.attributeChangeBatchResults.get(Number(rowIndex)) || null;
}

function attributeChangeStatusCell(row, rowIndex) {
  const result = attributeChangeBatchResult(rowIndex);
  const status = result?.status || row?.damageStatus || "未完成";
  const isCompleted = status === "已转残";
  const orderNo = result?.orderNo || row?.damageOrderNo || "";
  const detail = result?.statusWarning || result?.error || row?.damageLastError || "";
  return `
    <div class="attribute-change-status-cell">
      <span class="attribute-change-status ${isCompleted ? "is-completed" : "is-incomplete"}">${escapeHtml(isCompleted ? "已转残" : "未完成")}</span>
      ${orderNo ? `<small>${escapeHtml(orderNo)}</small>` : ""}
      ${detail ? `<small class="${isCompleted ? "is-warning" : "is-error"}">${escapeHtml(detail)}</small>` : ""}
    </div>
  `;
}

function attributeChangeSelectionCell(row, rowIndex) {
  const completed = (attributeChangeBatchResult(rowIndex)?.status || row?.damageStatus) === "已转残";
  const checked = state.selectedAttributeChangeRows.has(Number(rowIndex));
  return `
    <label class="attribute-change-row-selection" title="${completed ? "该条目已转残" : "选择该条目进行批量转残"}">
      <input
        class="attribute-change-row-checkbox"
        type="checkbox"
        data-row-index="${rowIndex}"
        ${checked ? "checked" : ""}
        ${completed || state.attributeChangeBatchRunning || state.attributeChangeDeletingRecordId ? "disabled" : ""}
        aria-label="选择 ${escapeHtml(row?.sku || "")}"
      >
    </label>
  `;
}

function attributeChangeDeleteCell(row, rowIndex) {
  const recordId = String(row?.recordId || "");
  const deleting = state.attributeChangeDeletingRecordId === recordId;
  return `
    <button
      class="attribute-change-delete-button"
      type="button"
      data-record-id="${escapeHtml(recordId)}"
      data-row-index="${rowIndex}"
      ${!recordId || state.attributeChangeBatchRunning || state.attributeChangeDeletingRecordId ? "disabled" : ""}
      aria-label="删除 ${escapeHtml(row?.sku || "")}"
      title="删除该条记录"
    >${deleting ? "删除中…" : "删除"}</button>
  `;
}

function attributeChangeDisplayColumns(columns) {
  const displayColumns = [...columns];
  const quantityIndex = displayColumns.findIndex((column) => column.key === "damageQuantity");
  displayColumns.splice(quantityIndex + 1, 0, {
    key: "__attributeChangeSelection",
    label: "选择",
    cellHtml: attributeChangeSelectionCell,
  });
  displayColumns.push({
    key: "__attributeChangeDelete",
    label: "操作",
    cellHtml: attributeChangeDeleteCell,
  });
  return displayColumns;
}

function attributeChangeBatchSummaryHtml() {
  if (state.attributeChangeBatchRunning) {
    return `
      <div class="attribute-change-batch-summary is-running">
        正在逐条转残，请勿关闭应用。目标库位：<strong>${escapeHtml(ATTRIBUTE_CHANGE_TARGET_LOCATION)}</strong>
      </div>
    `;
  }
  if (state.attributeChangeBatchError) {
    return `<div class="attribute-change-batch-summary is-error">${escapeHtml(state.attributeChangeBatchError)}</div>`;
  }
  if (state.attributeChangeBatchMessage) {
    return `<div class="attribute-change-batch-summary is-success">${escapeHtml(state.attributeChangeBatchMessage)}</div>`;
  }
  return "";
}

function renderExceptionDetailContent() {
  if (!el.exceptionDetailContent) return;
  const type = state.activeExceptionDetailType;
  const columns = state.activeExceptionDetailColumns || [];
  const rows = state.activeExceptionDetailRows || [];
  const displayColumns = type === "属性变更" ? attributeChangeDisplayColumns(columns) : columns;
  el.exceptionDetailContent.innerHTML = `
    ${type === "属性变更" ? attributeChangeBatchSummaryHtml() : ""}
    <div class="exception-detail-table">
      ${rowsTable(displayColumns, rows, {
        compact: true,
        emptyText: `没有${type}记录`,
        rowClass: (row, rowIndex) => {
          const selected = state.selectedAttributeChangeRows.has(Number(rowIndex));
          const completed = (attributeChangeBatchResult(rowIndex)?.status || row?.damageStatus) === "已转残";
          return [
            selected ? "is-attribute-change-selected" : "",
            completed ? "is-attribute-change-completed" : "",
          ].filter(Boolean).join(" ");
        },
      })}
    </div>
  `;
}

function selectableAttributeChangeRowIndexes() {
  return state.activeExceptionDetailRows
    .map((row, rowIndex) => ({ row, rowIndex }))
    .filter(({ row, rowIndex }) => (
      (attributeChangeBatchResult(rowIndex)?.status || row?.damageStatus) !== "已转残"
    ))
    .map(({ rowIndex }) => rowIndex);
}

function syncAttributeChangeBatchButton() {
  const visible = state.activeExceptionDetailType === "属性变更";
  const selectableRowIndexes = selectableAttributeChangeRowIndexes();
  const bulkSelectableRowIndexes = selectableRowIndexes.slice(0, 50);
  const selectedCount = state.selectedAttributeChangeRows.size;
  const allSelected = bulkSelectableRowIndexes.length > 0
    && bulkSelectableRowIndexes.every((rowIndex) => state.selectedAttributeChangeRows.has(rowIndex));
  if (el.exceptionDetailSelectAll) {
    el.exceptionDetailSelectAll.hidden = !visible;
    el.exceptionDetailSelectAll.disabled = !visible
      || !bulkSelectableRowIndexes.length
      || state.attributeChangeBatchRunning
      || state.attributeChangeDeletingRecordId;
    el.exceptionDetailSelectAll.textContent = allSelected
      ? "取消全选"
      : selectableRowIndexes.length > 50 ? "全选（前50条）" : "全选";
  }
  if (el.exceptionDetailBatchDamage) {
    el.exceptionDetailBatchDamage.hidden = !visible;
    el.exceptionDetailBatchDamage.disabled = !visible
      || !selectedCount
      || state.attributeChangeBatchRunning
      || state.attributeChangeDeletingRecordId;
    el.exceptionDetailBatchDamage.textContent = state.attributeChangeBatchRunning
      ? "转残中…"
      : selectedCount ? `批量转残（${selectedCount}）` : "批量转残";
  }
  if (el.exceptionDetailClose) {
    el.exceptionDetailClose.disabled = state.attributeChangeBatchRunning || Boolean(state.attributeChangeDeletingRecordId);
  }
}

function setExceptionDetailModal(type, window, records) {
  const columns = exceptionDetailColumns(type);
  const windowText = exceptionWindowText(window);
  state.activeExceptionDetailType = type;
  state.activeExceptionDetailRows = records;
  state.activeExceptionDetailColumns = columns;
  state.activeExceptionDetailWindowText = windowText;
  state.selectedAttributeChangeRows = new Set();
  state.attributeChangeBatchRunning = false;
  state.attributeChangeBatchResults = new Map();
  state.attributeChangeBatchMessage = "";
  state.attributeChangeBatchError = "";
  state.attributeChangeBatchToken = "";
  state.attributeChangeDeletingRecordId = "";
  if (el.exceptionDetailTitle) el.exceptionDetailTitle.textContent = `${type}明细`;
  if (el.exceptionDetailMeta) el.exceptionDetailMeta.textContent = `${windowText} / ${formatNumber(records.length)} 条`;
  renderExceptionDetailContent();
  syncAttributeChangeBatchButton();
  if (el.exceptionDetailModal) el.exceptionDetailModal.hidden = false;
}

function closeExceptionDetailModal() {
  if (state.attributeChangeBatchRunning || state.attributeChangeDeletingRecordId) return;
  if (el.exceptionDetailModal) el.exceptionDetailModal.hidden = true;
  state.activeExceptionDetailType = "";
  state.activeExceptionDetailRows = [];
  state.activeExceptionDetailColumns = [];
  state.activeExceptionDetailWindowText = "";
  state.selectedAttributeChangeRows = new Set();
  state.attributeChangeBatchRunning = false;
  state.attributeChangeBatchResults = new Map();
  state.attributeChangeBatchMessage = "";
  state.attributeChangeBatchError = "";
  state.attributeChangeBatchToken = "";
  state.attributeChangeDeletingRecordId = "";
  syncAttributeChangeBatchButton();
}

async function deleteAttributeChangeRecord(button) {
  if (state.activeExceptionDetailType !== "属性变更"
      || state.attributeChangeBatchRunning
      || state.attributeChangeDeletingRecordId) return;
  const rowIndex = Number(button?.dataset?.rowIndex);
  const row = Number.isInteger(rowIndex) ? state.activeExceptionDetailRows[rowIndex] : null;
  const recordId = String(button?.dataset?.recordId || "");
  if (!row || !recordId || String(row.recordId || "") !== recordId) {
    state.attributeChangeBatchError = "该条记录已变化，请重新打开明细后再删除";
    renderExceptionDetailContent();
    syncAttributeChangeBatchButton();
    return;
  }

  state.attributeChangeDeletingRecordId = recordId;
  state.attributeChangeBatchMessage = "";
  state.attributeChangeBatchError = "";
  renderExceptionDetailContent();
  syncAttributeChangeBatchButton();
  try {
    await api("/api/exception/attribute-change/delete", {
      recordId,
      sku: row.sku,
      ownerName: row.ownerName,
      damageLocation: row.damageLocation,
      damageQuantity: row.damageQuantity,
      createdAt: row.createdAt,
    });
    state.activeExceptionDetailRows = state.activeExceptionDetailRows.filter(
      (item) => String(item?.recordId || "") !== recordId
    );
    state.selectedAttributeChangeRows = new Set();
    state.attributeChangeBatchResults = new Map();
    state.attributeChangeBatchMessage = "该条记录已删除";
    if (el.exceptionDetailMeta) {
      el.exceptionDetailMeta.textContent = `${state.activeExceptionDetailWindowText} / ${formatNumber(state.activeExceptionDetailRows.length)} 条`;
    }
  } catch (error) {
    state.attributeChangeBatchError = cleanErrorMessage(error.message, "删除记录失败");
  } finally {
    state.attributeChangeDeletingRecordId = "";
    renderExceptionDetailContent();
    syncAttributeChangeBatchButton();
  }
}

function handleAttributeChangeSelection(event) {
  const checkbox = event.target.closest(".attribute-change-row-checkbox");
  if (!checkbox || state.activeExceptionDetailType !== "属性变更") return;
  const rowIndex = Number(checkbox.dataset.rowIndex);
  if (!Number.isInteger(rowIndex)) return;
  if (checkbox.checked) {
    if (state.selectedAttributeChangeRows.size >= 50) {
      checkbox.checked = false;
      state.attributeChangeBatchError = "单次最多选择 50 条进行批量转残";
      renderExceptionDetailContent();
      syncAttributeChangeBatchButton();
      return;
    }
    state.selectedAttributeChangeRows.add(rowIndex);
  } else {
    state.selectedAttributeChangeRows.delete(rowIndex);
  }
  state.attributeChangeBatchError = "";
  checkbox.closest("tr")?.classList.toggle("is-attribute-change-selected", checkbox.checked);
  syncAttributeChangeBatchButton();
}

function toggleSelectAllAttributeChangeRows() {
  if (state.attributeChangeBatchRunning || state.activeExceptionDetailType !== "属性变更") return;
  const selectableRowIndexes = selectableAttributeChangeRowIndexes();
  const bulkSelectableRowIndexes = selectableRowIndexes.slice(0, 50);
  if (!bulkSelectableRowIndexes.length) {
    state.attributeChangeBatchError = "当前没有可选择的未完成条目";
    renderExceptionDetailContent();
    syncAttributeChangeBatchButton();
    return;
  }
  const allSelected = bulkSelectableRowIndexes.every(
    (rowIndex) => state.selectedAttributeChangeRows.has(rowIndex)
  );
  state.selectedAttributeChangeRows = allSelected
    ? new Set()
    : new Set(bulkSelectableRowIndexes);
  state.attributeChangeBatchError = !allSelected && selectableRowIndexes.length > 50
    ? "单次最多选择 50 条，已全选当前列表前 50 条"
    : "";
  renderExceptionDetailContent();
  syncAttributeChangeBatchButton();
}

async function batchDamageSelectedAttributeChangeRows() {
  if (state.attributeChangeBatchRunning || state.activeExceptionDetailType !== "属性变更") return;
  const selected = [...state.selectedAttributeChangeRows]
    .sort((a, b) => a - b)
    .map((rowIndex) => ({ rowIndex, row: state.activeExceptionDetailRows[rowIndex] }))
    .filter(({ row }) => row && row.damageStatus !== "已转残");
  if (!selected.length) {
    state.attributeChangeBatchError = "请先选择至少一条未完成记录";
    renderExceptionDetailContent();
    syncAttributeChangeBatchButton();
    return;
  }
  if (selected.length > 50) {
    state.attributeChangeBatchError = "单次最多选择 50 条进行批量转残";
    renderExceptionDetailContent();
    syncAttributeChangeBatchButton();
    return;
  }

  const batchToken = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
  const activeRows = state.activeExceptionDetailRows;
  state.attributeChangeBatchToken = batchToken;
  state.attributeChangeBatchRunning = true;
  state.attributeChangeBatchMessage = "";
  state.attributeChangeBatchError = "";
  renderExceptionDetailContent();
  syncAttributeChangeBatchButton();
  try {
    const result = await api("/api/exception/attribute-change/batch", {
      targetLocation: ATTRIBUTE_CHANGE_TARGET_LOCATION,
      items: selected.map(({ rowIndex, row }) => ({
        recordId: row.recordId,
        rowIndex,
        sku: row.sku,
        ownerName: row.ownerName,
        sourceLocation: row.damageLocation,
        quantity: row.damageQuantity,
        existingOrderNo: row.damageOrderNo || "",
        createdAt: row.createdAt,
      })),
    });
    if (state.attributeChangeBatchToken !== batchToken || state.activeExceptionDetailRows !== activeRows) return;
    const failedRows = new Set();
    for (const item of result.results || []) {
      const rowIndex = Number(item.rowIndex);
      if (!Number.isInteger(rowIndex)) continue;
      state.attributeChangeBatchResults.set(rowIndex, item);
      const row = state.activeExceptionDetailRows[rowIndex];
      if (row) {
        row.damageStatus = item.status || (item.ok ? "已转残" : "未完成");
        row.damageOrderNo = item.orderNo || row.damageOrderNo || "";
        row.damageLastError = item.error || item.statusWarning || "";
      }
      if (!item.ok) failedRows.add(rowIndex);
    }
    state.selectedAttributeChangeRows = failedRows;
    state.attributeChangeBatchMessage = `批量转残完成：已转残 ${formatNumber(result.succeeded || 0)} 条，未完成 ${formatNumber(result.failed || 0)} 条；目标库位 ${result.targetLocation || ATTRIBUTE_CHANGE_TARGET_LOCATION}`;
  } catch (error) {
    if (state.attributeChangeBatchToken !== batchToken) return;
    state.attributeChangeBatchError = cleanErrorMessage(error.message, "批量转残失败");
  } finally {
    if (state.attributeChangeBatchToken !== batchToken) return;
    state.attributeChangeBatchRunning = false;
    state.attributeChangeBatchToken = "";
    renderExceptionDetailContent();
    syncAttributeChangeBatchButton();
  }
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
  const actionKey = String(buttonOrType?.dataset?.exceptionAction || "").trim();
  if (actionKey === "displaced-pick") return "异位拣选";
  if (actionKey === "out-of-stock") return "拣选无货";
  if (actionKey === "attribute-change") return "属性变更";
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
      ["originalPickAvailableQty", "原始拣选库位实物库存"],
      ["reduceLocation", "需要调减库位"],
      ["reduceQuantity", "需要调减数量"],
      ["createdAt", "创建时间"],
    ],
    "拣选无货": [
      ["sku", "SKU"],
      ["originalPickLocation", "原始拣选库位"],
      ["originalPickShortageQuantity", "原始拣选库位缺货数量"],
      ["originalPickAvailableQty", "原始拣选库位实物库存"],
      ["reduceLocation", "需要调减库位"],
      ["reduceQuantity", "需要调减数量"],
      ["createdAt", "创建时间"],
    ],
    "属性变更": [
      ["sku", "SKU"],
      ["ownerName", "货主名称"],
      ["damageLocation", "转残库位"],
      ["damageQuantity", "转残数量"],
      ["damageStatus", "转残状态"],
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
      cellHtml: type === "属性变更" && key === "damageStatus"
        ? (row, rowIndex) => attributeChangeStatusCell(row, rowIndex)
        : copyableDetailCell
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
    state.selectedAttributeChangeRows = new Set();
    state.attributeChangeBatchRunning = false;
    state.attributeChangeBatchResults = new Map();
    state.attributeChangeBatchMessage = "";
    state.attributeChangeBatchError = "";
    state.attributeChangeBatchToken = "";
    state.attributeChangeDeletingRecordId = "";
    if (el.exceptionDetailTitle) el.exceptionDetailTitle.textContent = `${type}明细`;
    if (el.exceptionDetailMeta) el.exceptionDetailMeta.textContent = state.activeExceptionDetailWindowText;
    if (el.exceptionDetailContent) el.exceptionDetailContent.innerHTML = `<div class="empty-state is-error-text">${escapeHtml(cleanErrorMessage(error.message, "读取明细失败"))}</div>`;
    syncAttributeChangeBatchButton();
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

function inventoryItemCodeText(row) {
  return pickInventoryValue(row, ["item_code", "itemCode", "goods_code", "goodsCode", "sku", "sku_id", "skuId"]);
}

function inventoryLocationStatusText(row) {
  const value = pickInventoryValue(row, [
    "location_status",
    "locationStatus",
    "location_status_name",
    "locationStatusName",
    "inventory_location_status",
    "inventoryLocationStatus",
    "warehouse_location_status",
    "warehouseLocationStatus",
    "loc_status",
    "locStatus",
    "库位状态",
  ]);
  return value !== "-" ? value : pickInventoryValueByPattern(row, /location.*status|status.*location|库位状态/i);
}

function isEnabledLocationStatus(value) {
  const text = String(value ?? "").trim();
  if (!text || text === "-") return true;
  const normalized = text.toLowerCase().replace(/[\s_\-]+/g, "");
  return normalized === "enable"
    || normalized === "enabled"
    || normalized === "1"
    || normalized === "true"
    || text === "启用"
    || text === "已启用";
}

function isEnabledInventoryLocationRow(row) {
  return isEnabledLocationStatus(inventoryLocationStatusText(row));
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

function inventoryQuantityKindLabel(kind) {
  if (kind === "physical") return "实物库存";
  if (kind === "available") return "可用库存";
  if (kind === "occupied") return "占用库存";
  return "库存";
}

function inventoryQuantityActionHtml(value, kind, row) {
  const text = String(value ?? "").trim();
  if (!text || text === "-") return escapeHtml(text || "");
  const numeric = Number(text.replaceAll(",", ""));
  if (!Number.isFinite(numeric) || numeric <= 0) return escapeHtml(text);
  const location = inventoryLocationText(row);
  const rawItemCode = inventoryItemCodeText(row);
  const itemCode = rawItemCode && rawItemCode !== "-" ? rawItemCode : "";
  const label = inventoryQuantityKindLabel(kind);
  return `
    <button class="inventory-quantity-action-button" type="button" data-quantity-kind="${escapeHtml(kind)}" data-quantity-value="${escapeHtml(text)}" data-location="${escapeHtml(location)}" data-item-code="${escapeHtml(itemCode)}" aria-label="处理${escapeHtml(label)} ${escapeHtml(text)}">
      ${escapeHtml(text)}
    </button>
  `;
}

function inventoryLocationPrintButtonHtml(location, itemCode = "", quantity = "", productName = "", productImage = "", productBarcodes = []) {
  const text = String(location || "").trim();
  if (!text || text === "-") return "";
  const code = String(itemCode || "").trim();
  const qty = String(quantity || "").trim();
  const nameValue = String(productName || "").trim();
  const imageValue = String(productImage || "").trim();
  const name = nameValue === "-" ? "" : nameValue;
  const image = imageValue === "-" ? "" : imageValue;
  const barcodeData = encodeURIComponent(JSON.stringify(Array.isArray(productBarcodes) ? productBarcodes : []));
  const baseAttrs = `data-location="${escapeHtml(text)}" data-item-code="${escapeHtml(code)}" data-print-quantity="${escapeHtml(qty)}" data-product-name="${escapeHtml(name)}" data-product-image="${escapeHtml(image)}" data-product-barcodes="${escapeHtml(barcodeData)}"`;
  const henryText = currentHenryLabelText();
  return `
    <span class="inventory-location-print-actions">
      <button class="inventory-location-print-button" type="button" data-print-mode="location" ${baseAttrs} aria-label="打印库位 ${escapeHtml(text)}">打印库位</button>
      <button class="inventory-location-print-button" type="button" data-print-mode="sku" ${baseAttrs} aria-label="打印SKU ${escapeHtml(code)}">打印SKU</button>
      <button class="inventory-location-print-button" type="button" data-print-mode="all" ${baseAttrs} aria-label="打印库位和SKU ${escapeHtml(text)} ${escapeHtml(code)}">打印全部</button>
      <button class="inventory-location-print-button" type="button" data-print-mode="exception" ${baseAttrs} aria-label="打印Exception ${escapeHtml(code)}">打印Exception</button>
      <button class="inventory-location-print-button" type="button" data-print-mode="henry" data-print-notice="${escapeHtml(henryText)}" ${baseAttrs} aria-label="Label to Henry ${escapeHtml(code)}" title="打印文字：${escapeHtml(henryText)}">Label to Henry</button>
      <button class="inventory-location-print-edit-button" type="button" data-print-notice="${escapeHtml(henryText)}" aria-label="编辑 Label to Henry 打印文字" title="编辑打印文字">编辑</button>
    </span>
  `;
}

function inventoryColumns(rows, options = {}) {
  const showLocationPrint = Boolean(options.showLocationPrint);
  const printQuantity = String(options.printQuantity || "").trim();
  const productName = String(options.productName || "").trim();
  const productImage = String(options.productImage || "").trim();
  const productBarcodes = Array.isArray(options.productBarcodes) ? options.productBarcodes : [];
  return [
    { label: "库位", html: true, value: (row) => {
      const location = inventoryLocationText(row);
      if (location === "-") return "-";
      const itemCode = inventoryItemCodeText(row);
      return `
        <span class="inventory-location-cell ${showLocationPrint ? "has-print" : ""}">
          <button class="inventory-location-qr-button" type="button" data-qr-src="${escapeHtml(withLicenseSession(`/api/qr?code=${encodeURIComponent(location)}`))}" data-qr-code="${escapeHtml(location)}" aria-label="放大库位二维码 ${escapeHtml(location)}">${escapeHtml(location)}</button>
          ${copyButtonHtml(location, `复制库位 ${location}`)}
          ${showLocationPrint ? inventoryLocationPrintButtonHtml(
            location,
            itemCode,
            printQuantity,
            productName || firstInventoryValue([row], ["item_name", "itemName", "goods_name", "goodsName"]),
            productImage || firstInventoryValue([row], ["picture", "image_url", "imageUrl", "appearance_picture", "measurement_picture"]),
            productBarcodes,
          ) : ""}
        </span>
      `;
    } },
    { label: "实物库存", html: true, value: (row) => inventoryQuantityActionHtml(formatNumber(inventoryPhysicalValue(row).numeric), "physical", row) },
    { label: "可用库存", html: true, value: (row) => inventoryQuantityActionHtml(pickInventoryValue(row, ["available_qty", "availableQty", "available_quantity", "availableQuantity", "available_num", "availableNum"]), "available", row) },
    { label: "占用库存", html: true, value: (row) => inventoryQuantityActionHtml(pickInventoryValue(row, ["occupied_qty", "occupiedQty", "occupy_qty", "occupyQty", "occupied_quantity", "occupiedQuantity"]), "occupied", row) },
  ];
}

function locationInventoryColumns() {
  return [
    { label: "货品编码", html: true, value: (row) => {
      const code = inventoryItemCodeText(row);
      return locationInventoryQueryButtonHtml(code);
    } },
    { label: "货品条码", html: true, value: (row) => locationInventoryBarcodeHtml(pickInventoryValue(row, ["barcode", "bar_code", "barCode", "goods_barcode", "goodsBarcode"])) },
    { label: "实物库存", html: true, value: (row) => inventoryQuantityActionHtml(formatNumber(inventoryPhysicalValue(row).numeric), "physical", row) },
    { label: "可用库存", html: true, value: (row) => inventoryQuantityActionHtml(pickInventoryValue(row, ["available_qty", "availableQty", "available_quantity", "availableQuantity"]), "available", row) },
    { label: "占用库存", html: true, value: (row) => inventoryQuantityActionHtml(pickInventoryValue(row, ["occupied_qty", "occupiedQty", "occupy_qty", "occupyQty", "occupied_quantity", "occupiedQuantity"]), "occupied", row) },
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
    sku: button.dataset.itemCode || "",
  };
  el.exceptionFixedActions.classList.add("is-inventory-quantity-open");
  el.exceptionFixedActions.dataset.quantityKind = button.dataset.quantityKind || "";
  el.exceptionFixedActions.dataset.quantityValue = button.dataset.quantityValue || "";
  el.exceptionFixedActions.dataset.location = button.dataset.location || "";
  el.exceptionFixedActions.dataset.itemCode = button.dataset.itemCode || "";
}

function closeInventoryQuantityActions() {
  el.exceptionFixedActions?.classList.remove("is-inventory-quantity-open");
  if (el.exceptionFixedActions) {
    delete el.exceptionFixedActions.dataset.quantityKind;
    delete el.exceptionFixedActions.dataset.quantityValue;
    delete el.exceptionFixedActions.dataset.location;
    delete el.exceptionFixedActions.dataset.itemCode;
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

function inventoryPhysicalValue(row) {
  const raw = pickInventoryValue(row, [
    "physical_qty",
    "physicalQty",
    "physical_quantity",
    "physicalQuantity",
    "real_qty",
    "realQty",
    "real_quantity",
    "realQuantity",
    "actual_qty",
    "actualQty",
    "actual_quantity",
    "actualQuantity",
    "stock_qty",
    "stockQty",
    "stock_quantity",
    "stockQuantity",
    "stock_num",
    "stockNum",
    "on_hand_qty",
    "onHandQty",
    "onhand_qty",
    "onhandQty",
    "on_hand_quantity",
    "onHandQuantity",
    "inventory_qty",
    "inventoryQty",
    "inventory_quantity",
    "inventoryQuantity",
    "inventory_num",
    "inventoryNum",
    "total_qty",
    "totalQty",
    "total_quantity",
    "totalQuantity",
    "total_inventory_qty",
    "totalInventoryQty",
    "实物库存",
    "实物库存数量",
    "库存数量",
    "库存总数",
    "库存数",
    "现有库存",
    "现货库存",
    "quantity",
    "qty",
  ]);
  if (raw !== "-") {
    const numeric = Number(String(raw || "0").replaceAll(",", ""));
    return {
      raw: String(raw ?? "0"),
      numeric: Number.isFinite(numeric) ? numeric : 0,
    };
  }
  const available = inventoryAvailableValue(row);
  const occupied = inventoryOccupiedValue(row);
  const numeric = available.numeric + occupied.numeric;
  return {
    raw: String(numeric),
    numeric,
  };
}

function numericInventoryValue(value) {
  const numeric = Number(String(value ?? "").replaceAll(",", ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

function currentInventoryLocationStockOptions(excludeLocation = "") {
  const excluded = String(excludeLocation || "").trim().toUpperCase();
  const activeSku = String(state.activeInventoryQuantityContext?.sku || "").trim();
  const byLocation = new Map();
  for (const row of state.currentInventoryRows || []) {
    if (activeSku && inventoryItemCodeText(row) !== activeSku) continue;
    if (!isEnabledInventoryLocationRow(row)) continue;
    const location = inventoryLocationText(row);
    if (!location || location === "-") continue;
    if (location.toUpperCase() === excluded) continue;
    const available = inventoryAvailableValue(row);
    const occupied = inventoryOccupiedValue(row);
    const physical = inventoryPhysicalValue(row);
    const previous = byLocation.get(location) || { available: 0, occupied: 0, physical: 0 };
    byLocation.set(location, {
      available: previous.available + available.numeric,
      occupied: previous.occupied + occupied.numeric,
      physical: previous.physical + physical.numeric,
    });
  }
  return Array.from(byLocation.entries()).map(([location, stock]) => ({
    location,
    available: stock.available,
    occupied: stock.occupied,
    physical: stock.physical,
  }));
}

function currentInventoryLocationOptions(excludeLocation = "") {
  return currentInventoryLocationStockOptions(excludeLocation).map(({ location, available, occupied, physical }) => ({ location, available, occupied, physical }));
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
      <span class="inventory-flow-location-stock">实物库存 ${formatNumber(item.physical)}</span>
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
        <span>实物库存：<strong>${formatNumber(flow.originalAvailable)}</strong></span>
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
      ${inventoryFlowHeader("请选择转残数量")}
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
  const sku = state.activeInventoryQuantityContext?.sku || state.currentInventorySku || el.inventoryQueryInput?.value.trim() || "";
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
  const sku = state.activeInventoryQuantityContext?.sku || state.currentInventorySku || el.inventoryQueryInput?.value.trim() || "";
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
    originalAvailable: originalOption?.physical ?? "",
    skipLocationStep: Boolean(originalOption?.location),
  };
  if (state.waybillOutOfStockFlow.skipLocationStep) {
    renderWaybillOutOfStockQuantityStep();
    return;
  }
  renderWaybillOutOfStockLocationStep();
}

function beginAttributeChangeFlow() {
  const sku = state.activeInventoryQuantityContext?.sku || state.currentInventorySku || el.inventoryQueryInput?.value.trim() || "";
  if (!sku || !(state.currentInventoryRows || []).length) return;
  const quantityKind = state.activeInventoryQuantityContext?.kind || "";
  const clickedQuantity = state.activeInventoryQuantityContext?.value || "";
  const clickedLocation = state.activeInventoryQuantityContext?.location || "";
  const clickedOption = currentInventoryLocationOption(clickedLocation);
  if (!clickedOption?.location) return;
  closeInventoryQuantityActions();
  state.displacedPickFlow = null;
  state.waybillOutOfStockFlow = null;
  state.attributeChangeFlow = {
    sku,
    quantityKind,
    clickedQuantity,
    damageLocation: clickedOption.location,
    damageAvailable: clickedOption.available,
    damageOccupied: clickedOption.occupied,
  };
  renderAttributeChangeQuantityStep();
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
  state.waybillOutOfStockFlow.originalAvailable = option?.physical ?? "";
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
  const originalPhysical = numericInventoryValue(originalOption?.physical);
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
    originalPickAvailableQty: originalPhysical,
    reduceLocation: flow.displacedLocation,
    reduceQuantity: numeric,
    clickedQuantityKind: flow.quantityKind,
    clickedQuantity: flow.clickedQuantity,
    createdAt: new Date().toISOString(),
  });
  if (Number.isFinite(originalPhysical) && originalPhysical > 1) {
    await saveExceptionRecord({
      reduceLocation: flow.originalLocation,
      reduceQuantity: originalPhysical,
      createdAt: "",
    });
  }
  clearInventoryActionFlow();
}

function completeWaybillOutOfStock(quantity) {
  const flow = state.waybillOutOfStockFlow;
  const numeric = Number(String(quantity || "").replace(/\D/g, ""));
  if (!flow || !Number.isFinite(numeric) || numeric <= 0) return;
  const originalPhysical = Number(String(flow.originalAvailable ?? "").replaceAll(",", ""));
  const reduceQuantity = Number.isFinite(originalPhysical) && originalPhysical > 0 ? originalPhysical : "";
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
  const rows = (Array.isArray(data.rows) ? data.rows : []).filter(isEnabledInventoryLocationRow);
  const totalText = data.total === "" || data.total == null ? rows.length : data.total;
  const querySku = String(inputSku || data.sku || "").trim();
  const printQuantity = options.returnToWaybill && state.lastWaybillResult ? String(options.printQuantity || "").trim() : "";
  const productImage = data.product?.imageUrl || "";
  const productName = data.product?.goodsName || firstInventoryValue(rows, ["item_name", "itemName", "goods_name", "goodsName"]);
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
    ${rowsTable(inventoryColumns(rows, {
      showLocationPrint: true,
      printQuantity,
      productName,
      productImage,
      productBarcodes: barcodes,
    }), rows, { compact: true, emptyText: "没有库存数据", rowClass: inventoryRowClass })}
  `);
}

function renderLocationResult(data) {
  const rows = (Array.isArray(data.rows) ? data.rows : []).filter(isEnabledInventoryLocationRow);
  const totalText = rows.length;
  state.inventoryBarcodeItems = barcodeItemsFromInventoryRows(rows);
  const location = data.location || "-";
  state.lastLocationQueryLocation = location;
  state.inventoryHighlightLocation = "";
  state.currentInventoryRows = rows;
  state.currentInventoryPrintQuantity = "";
  const itemCodes = [...new Set(rows.map((row) => inventoryItemCodeText(row)).filter((code) => code && code !== "-"))];
  state.currentInventorySku = itemCodes.length === 1 ? itemCodes[0] : "";
  setExceptionResult(`
    <div class="exception-result-head is-location-output">
      <strong>库位查询输出</strong>
      <button class="location-result-code location-result-qr-button" type="button" data-qr-code="${escapeHtml(location)}" aria-label="显示库位二维码 ${escapeHtml(location)}">${escapeHtml(location)}</button>
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
  const isLocationGrid = mode === "location-grid";
  const previewCodes = isLocationGrid ? normalized.slice(0, 4) : normalized.slice(0, 1);
  const isOneCode = previewCodes.length === 1;
  el.qrPreviewCard.classList.toggle("is-location-grid", isLocationGrid);
  el.qrPreviewCard.classList.toggle("is-single", !isLocationGrid);
  el.qrPreviewCard.classList.toggle("is-one-code", isLocationGrid && isOneCode);
  if (el.qrPreviewPrint) el.qrPreviewPrint.hidden = !isLocationGrid;
  el.qrPreviewContent.className = isLocationGrid
    ? `qr-preview-grid${isOneCode ? " is-one-code" : ""}`
    : "qr-preview-single";
  if (isLocationGrid) {
    el.qrPreviewContent.innerHTML = previewCodes.map((code, index) => {
      return qrPreviewSlotHtml(code, index === 0 ? "库位" : "货品");
    }).join("");
  } else {
    el.qrPreviewContent.innerHTML = qrPreviewSlotHtml(previewCodes[0], "");
  }
  el.qrPreviewModal.hidden = false;
}

function renderShortPickQrPreview(cipher) {
  if (!el.qrPreviewModal || !el.qrPreviewCard || !el.qrPreviewContent) return;
  const code = String(cipher || "").trim();
  if (!code) return;
  el.qrPreviewCard.classList.remove("is-location-grid", "is-one-code");
  el.qrPreviewCard.classList.add("is-single");
  if (el.qrPreviewPrint) el.qrPreviewPrint.hidden = true;
  el.qrPreviewContent.className = "qr-preview-single";
  el.qrPreviewContent.innerHTML = `
    <div class="qr-preview-slot is-short-pick-qr">
      <img src="${escapeHtml(withLicenseSession(`/api/qr?code=${encodeURIComponent(code)}`))}" alt="短捡扫码二维码">
    </div>
  `;
  el.qrPreviewModal.hidden = false;
}

async function openShortPickScanQr() {
  const button = el.shortPickScanButton;
  if (!button || button.disabled) return;
  const originalText = button.textContent || "短捡扫码";
  button.disabled = true;
  button.textContent = "生成中";
  try {
    const result = await api("/api/exception/short-pick-qr", {});
    if (!result?.cipher) throw new Error("没有生成短捡二维码");
    renderShortPickQrPreview(result.cipher);
  } catch (error) {
    setExceptionResult(`
      <div class="exception-error-message">${escapeHtml(cleanErrorMessage(error?.message, "短捡二维码生成失败"))}</div>
    `, true);
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
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
      notice: String(item?.notice || "").trim(),
    }))
    .filter((item) => item.code);
  if (!normalized.length) return false;
  const nativePrint = window.webkit?.messageHandlers?.macPrint;
  const pages = [];
  for (let index = 0; index < normalized.length; index += 2) {
    pages.push(normalized.slice(index, index + 2));
  }
  const browserAutoPrintScript = `
  <script>
    (function() {
      function done() {
        try { window.close(); } catch (error) {}
      }
      function fitText() {
        document.querySelectorAll(".label-code, .label-extra, .label-notice").forEach(function(node) {
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
  </script>`;
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
      width: auto;
      height: auto;
      overflow: visible;
      background: #fff;
      color: #111820;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
    }
    .label-sheet {
      width: calc(2.75in - 1px);
      height: calc(1.25in - 1px);
      padding: 0.012in 0.018in;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.018in;
      overflow: hidden;
      break-inside: avoid;
      page-break-inside: avoid;
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
    .label-notice {
      display: block;
      margin-top: -0.002in;
      color: #111820;
      font-size: 13pt;
      font-weight: 950;
      line-height: 0.88;
      text-align: center;
      white-space: nowrap;
    }
    @media print {
      html,
      body {
        width: auto;
        height: auto;
        overflow: visible;
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
          ${item.notice ? `<div class="label-notice">${escapeHtml(item.notice)}</div>` : ""}
        </section>
      ` : `<section class="label-block is-empty"></section>`).join("")}
    </div>
  `).join("")}
  ${nativePrint ? "" : browserAutoPrintScript}
</body>
</html>`;
  if (nativePrint) {
    try {
      nativePrint.postMessage({ title, items: normalized, licenseSession: state.authSession });
      return true;
    } catch {
      // Fall back to the browser print window below.
    }
  }
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

function openFourBySixProductPrint(items, title, productName, productImage) {
  const normalized = (Array.isArray(items) ? items : [])
    .map((item) => ({
      code: String(item?.code || "").trim(),
      label: String(item?.label || "二维码").trim() || "二维码",
      extra: String(item?.extra || "").trim(),
    }))
    .filter((item) => item.code);
  if (!normalized.length) return false;

  const pages = [];
  for (let index = 0; index < normalized.length; index += 4) {
    pages.push(normalized.slice(index, index + 4));
  }

  const rawName = String(productName || "").trim();
  const rawImage = String(productImage || "").trim();
  const name = rawName === "-" ? "" : rawName;
  const image = rawImage === "-" ? "" : rawImage;
  const nativePrint = window.webkit?.messageHandlers?.macPrint;
  const browserAutoPrintScript = `
  <script>
    (function() {
      function done() {
        try { window.close(); } catch (error) {}
      }
      function fitText() {
        document.querySelectorAll(".label-code, .label-extra, .product-name").forEach(function(node) {
          var maxWidth = node.parentElement ? node.parentElement.clientWidth : node.clientWidth;
          var size = parseFloat(window.getComputedStyle(node).fontSize);
          while ((node.scrollWidth > maxWidth || node.scrollHeight > node.clientHeight) && size > 8) {
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
        }, 250);
      });
    })();
  </script>`;
  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)}</title>
  <style>
    @page { size: 4in 6in; margin: 0; }
    * { box-sizing: border-box; }
    html,
    body {
      margin: 0;
      padding: 0;
      width: 4in;
      height: 6in;
      overflow: hidden;
      background: #fff;
      color: #111820;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
    }
    .product-label {
      width: 4in;
      height: 6in;
      padding: 0.14in 0.16in 0.18in;
      display: grid;
      grid-template-rows: 1.25in minmax(0, 1fr) auto;
      justify-items: center;
      gap: 0.16in;
      overflow: hidden;
    }
    .product-label.has-two-code-rows {
      grid-template-rows: 2.5in minmax(0, 1fr) auto;
    }
    .product-label + .product-label {
      break-before: page;
      page-break-before: always;
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
    .label-sheet.has-two-code-rows {
      height: 2.5in;
      grid-template-rows: 1.25in 1.25in;
    }
    .label-block {
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
    .label-block.is-empty { visibility: hidden; }
    .label-qr {
      width: 0.82in;
      height: 0.82in;
      object-fit: contain;
      image-rendering: pixelated;
    }
    .label-code {
      max-width: 100%;
      color: #111820;
      font-size: 11pt;
      font-weight: 900;
      line-height: 0.95;
      text-align: center;
      white-space: nowrap;
    }
    .label-extra {
      display: block;
      color: #111820;
      font-size: 9.5pt;
      font-weight: 900;
      line-height: 0.9;
      text-align: center;
      white-space: nowrap;
    }
    .product-image-wrap {
      width: 100%;
      min-height: 0;
      display: grid;
      place-items: center;
      overflow: hidden;
    }
    .product-image {
      display: block;
      max-width: 3.35in;
      max-height: 100%;
      object-fit: contain;
    }
    .product-image-placeholder {
      width: 3.2in;
      height: 3.2in;
    }
    .product-name {
      width: 100%;
      max-height: 0.9in;
      overflow: hidden;
      color: #111820;
      font-size: 16pt;
      font-weight: 800;
      line-height: 1.18;
      text-align: center;
      overflow-wrap: anywhere;
    }
    @media print {
      html,
      body {
        width: 4in;
        height: 6in;
        overflow: hidden;
      }
    }
  </style>
</head>
<body>
  ${pages.map((page) => {
    const hasTwoRows = page.length > 2;
    const slots = hasTwoRows ? [page[0], page[1], page[2], page[3]] : [page[0], page[1]];
    return `
      <main class="product-label ${hasTwoRows ? "has-two-code-rows" : ""}">
        <div class="label-sheet ${hasTwoRows ? "has-two-code-rows" : ""}">
          ${slots.map((item) => item ? `
            <section class="label-block">
              <img class="label-qr" src="${escapeHtml(withLicenseSession(`/api/qr?code=${encodeURIComponent(item.code)}`))}" alt="${escapeHtml(item.label)}二维码">
              <div class="label-code">${escapeHtml(item.code)}</div>
              ${item.extra ? `<div class="label-extra">${escapeHtml(item.extra)}</div>` : ""}
            </section>
          ` : `<section class="label-block is-empty"></section>`).join("")}
        </div>
        <div class="product-image-wrap">
          ${image
            ? `<img class="product-image" src="${escapeHtml(image)}" alt="产品图片">`
            : `<div class="product-image-placeholder" aria-hidden="true"></div>`}
        </div>
        <div class="product-name">${escapeHtml(name)}</div>
      </main>
    `;
  }).join("")}
  ${nativePrint ? "" : browserAutoPrintScript}
</body>
</html>`;

  if (nativePrint) {
    try {
      nativePrint.postMessage({
        type: "product",
        title,
        items: normalized,
        productName: name,
        productImage: image,
        licenseSession: state.authSession,
      });
      return true;
    } catch {
      // Continue with the browser print window.
    }
  }
  const printWindow = window.open("", title, "popup,width=520,height=820");
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
  const productName = String(button?.dataset.productName || "").trim();
  const productImage = String(button?.dataset.productImage || "").trim();
  let productBarcodes = [];
  try {
    const parsed = JSON.parse(decodeURIComponent(button?.dataset.productBarcodes || "%5B%5D"));
    productBarcodes = Array.isArray(parsed) ? parsed : [];
  } catch {
    productBarcodes = [];
  }
  const mode = button?.dataset.printMode || "all";
  const items = [];
  const seenCodes = new Set();
  const addItem = (label, code, extra = "", notice = "") => {
    const value = String(code || "").trim();
    if (!value || seenCodes.has(value)) return;
    seenCodes.add(value);
    items.push({ label, code: value, extra, notice });
  };
  if (mode === "location" || mode === "all") addItem("库位", location);
  if (mode === "sku" || mode === "all") addItem("货品编码", itemCode, quantity ? `${quantity} pcs` : "");
  if (mode === "exception") addItem("货品编码", itemCode, quantity ? `${quantity} pcs` : "", "Exception");
  if (mode === "henry") addItem("货品编码", itemCode, quantity ? `${quantity} pcs` : "", button?.dataset.printNotice || currentHenryLabelText());
  if (mode === "all") {
    for (const barcode of productBarcodes) {
      addItem(barcode?.type || "货品条码", barcode?.code || barcode);
    }
  }
  if (!items.length) return;
  const title = mode === "location"
    ? `库位标签_${location}`
    : mode === "sku"
      ? `货品标签_${itemCode}`
      : mode === "exception"
        ? `Exception标签_${itemCode}`
        : mode === "henry"
          ? `Henry标签_${itemCode}`
        : `库位货品标签_${location}_${itemCode}`;
  const opened = mode === "all"
    ? openFourBySixProductPrint(items, title, productName, productImage)
    : openFourByTwoQrPrint(items, title);
  if (!opened) {
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

function handleInventoryCompositionEnd(event) {
  if (event.target !== el.inventoryQueryInput) return;
  event.preventDefault();
  const formatted = formatInventoryInputText(event.data || "");
  if (formatted) {
    const input = el.inventoryQueryInput;
    const cursor = input.selectionStart ?? input.value.length;
    const recentText = input.value.slice(Math.max(0, cursor - formatted.length), cursor);
    if (recentText !== formatted) insertInventoryInputText(formatted);
  }
  normalizeInventoryInput();
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
  if (event.metaKey || event.ctrlKey) return;
  if (event.key === "CapsLock") {
    event.preventDefault();
    state.inventoryLowercaseMode = !state.inventoryLowercaseMode;
    return;
  }
  if (event.key === "Enter") {
    event.preventDefault();
    queryInventory();
    return;
  }
  if (event.key.length !== 1) return;
  event.preventDefault();
  if (/^[A-Za-z0-9-]$/.test(event.key)) {
    insertInventoryInputText(event.key);
  }
}

function handleInventoryKeyup(event) {
  state.inventoryShiftActive = event.shiftKey;
}

function setLocationInputCaret(position = 4) {
  if (state.locationFreeInput) return;
  if (!el.locationQueryInput || el.locationQueryInput.value !== "CPE-" && !el.locationQueryInput.value.startsWith("CPE-")) return;
  const caret = Math.min(Math.max(position, 4), el.locationQueryInput.value.length);
  el.locationQueryInput.setSelectionRange(caret, caret);
}

function seedLocationInput() {
  if (state.locationFreeInput) return;
  if (!el.locationQueryInput || el.locationQueryInput.value) return;
  el.locationQueryInput.value = "CPE-";
  setLocationInputCaret();
}

function normalizeLocationInput() {
  if (!el.locationQueryInput) return;
  if (state.locationFreeInput) {
    const input = el.locationQueryInput;
    const cursor = input.selectionStart ?? input.value.length;
    const beforeCursor = input.value.slice(0, cursor);
    const formatted = String(input.value || "").replace(/[^A-Za-z0-9-]/g, "").toUpperCase();
    if (input.value === formatted) return;
    const formattedBeforeCursor = String(beforeCursor || "").replace(/[^A-Za-z0-9-]/g, "").toUpperCase();
    input.value = formatted;
    input.setSelectionRange(Math.min(formattedBeforeCursor.length, formatted.length), Math.min(formattedBeforeCursor.length, formatted.length));
    return;
  }
  if (!el.locationQueryInput.value.startsWith("CPE-")) {
    state.locationFreeInput = true;
    normalizeLocationInput();
    return;
  }
  const formatted = formatLocationInputValue(el.locationQueryInput.value);
  if (el.locationQueryInput.value !== formatted) {
    el.locationQueryInput.value = formatted;
    el.locationQueryInput.setSelectionRange(formatted.length, formatted.length);
  } else if (formatted.startsWith("CPE-") && (el.locationQueryInput.selectionStart || 0) < 4) {
    setLocationInputCaret();
  }
}

function insertLocationInputText(text) {
  if (!el.locationQueryInput) return;
  const clean = String(text || "").replace(/[^A-Za-z0-9-]/g, "").toUpperCase();
  if (!clean) return;
  const input = el.locationQueryInput;
  const minCaret = state.locationFreeInput ? 0 : 4;
  const start = Math.max(input.selectionStart ?? input.value.length, minCaret);
  const end = Math.max(input.selectionEnd ?? start, minCaret);
  const nextRaw = `${input.value.slice(0, start)}${clean}${input.value.slice(end)}`;
  if (state.locationFreeInput) {
    input.value = nextRaw.replace(/[^A-Za-z0-9-]/g, "").toUpperCase();
    const caret = Math.min(start + clean.length, input.value.length);
    input.setSelectionRange(caret, caret);
    return;
  }
  input.value = formatLocationInputValue(nextRaw) || "CPE-";
  input.setSelectionRange(input.value.length, input.value.length);
}

function blockLocationNonEnglishInput(event) {
  if (event.target !== el.locationQueryInput) return;
  const inputType = String(event.inputType || "");
  if (!inputType.startsWith("insert")) return;
  const selectionStart = el.locationQueryInput.selectionStart ?? el.locationQueryInput.value.length;
  const selectionEnd = el.locationQueryInput.selectionEnd ?? selectionStart;
  if (!state.locationFreeInput && selectionStart < 4) {
    state.locationFreeInput = true;
  }
  if (event.isComposing || inputType.toLowerCase().includes("composition")) {
    event.preventDefault();
    return;
  }
  const data = String(event.data || "");
  if (!data) return;
  event.preventDefault();
  insertLocationInputText(data);
}

function handleLocationCompositionEnd(event) {
  if (event.target !== el.locationQueryInput) return;
  event.preventDefault();
  const formatted = String(event.data || "").replace(/[^A-Za-z0-9-]/g, "").toUpperCase();
  if (formatted) {
    const input = el.locationQueryInput;
    const cursor = input.selectionStart ?? input.value.length;
    const recentText = input.value.slice(Math.max(0, cursor - formatted.length), cursor);
    if (recentText !== formatted) insertLocationInputText(formatted);
  }
  normalizeLocationInput();
  keepLocationCaretAfterPrefix();
}

function handleLocationPaste(event) {
  if (event.target !== el.locationQueryInput) return;
  if (state.locationFreeInput) {
    event.preventDefault();
    insertLocationInputText(event.clipboardData?.getData("text") || "");
    return;
  }
  const selectionStart = el.locationQueryInput.selectionStart ?? el.locationQueryInput.value.length;
  const selectionEnd = el.locationQueryInput.selectionEnd ?? selectionStart;
  if (selectionStart < 4) {
    state.locationFreeInput = true;
    return;
  }
  event.preventDefault();
  const body = normalizePastedLocationBody(event.clipboardData?.getData("text") || "");
  el.locationQueryInput.value = body ? formatLocationInputValue(`CPE${body}`) : "CPE-";
  el.locationQueryInput.setSelectionRange(el.locationQueryInput.value.length, el.locationQueryInput.value.length);
}

function placeLocationCaretAfterPrefix() {
  if (!el.locationQueryInput) return;
  if (state.locationFreeInput) return;
  seedLocationInput();
  if (!el.locationQueryInput.value.startsWith("CPE-")) return;
  const start = el.locationQueryInput.selectionStart || 0;
  if (el.locationQueryInput.value === "CPE-" || start < 4) setLocationInputCaret();
}

function keepLocationCaretAfterPrefix() {
  if (state.locationFreeInput) return;
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
  state.locationFreeInput = true;
  el.locationQueryInput.value = "";
}

function handleLocationKeydown(event) {
  if (event.target !== el.locationQueryInput) return;
  if (event.metaKey || event.ctrlKey) return;
  if (event.key === "Backspace" || event.key === "Delete") {
    clearLocationInputOnDelete(event);
    return;
  }
  if (event.key === "Enter") {
    event.preventDefault();
    queryLocationInventory();
    return;
  }
  if (event.key.length !== 1) return;
  event.preventDefault();
  if (/^[A-Za-z0-9-]$/.test(event.key)) {
    insertLocationInputText(event.key);
  }
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
  state.locationFreeInput = false;
  seedLocationInput();
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

async function refreshWmsAnalysisForDate(date, options = {}) {
  const businessDate = String(date || "").trim();
  if (!businessDate) throw new Error("WMS 业务日期为空");
  const syncReleaseAssistantPeopleStatus =
    options.syncReleaseAssistantPeopleStatus === true;
  const releaseAssistantPeopleStatusRequestId = Number(
    options.releaseAssistantPeopleStatusRequestId,
  ) || 0;
  const clickedAt = Date.now();
  const waveCockpitRequestId = ++state.waveCockpitRequestId;
  const pickingProgressRequestId = ++state.pickingProgressRequestId;
  state.waveCockpitSummary = null;
  const currentWaveCockpitHost = document.querySelector("#waveCockpitSummaryHost");
  if (currentWaveCockpitHost) currentWaveCockpitHost.innerHTML = "";
  const analysisPromise = api(
    "/api/wms/picking-day",
    { date: businessDate, clickedAt },
    {
      timeoutMs: WMS_STATUS_BASE_REQUEST_TIMEOUT_MS,
      timeoutMessage: "人员状态主数据读取超过 45 秒，已停止刷新",
    },
  );
  const waveCockpitPromise = api(
    "/api/wms/wave-cockpit",
    undefined,
    {
      timeoutMs: WMS_STATUS_AUX_REQUEST_TIMEOUT_MS,
      timeoutMessage: "波次状态读取超过 30 秒，已停止刷新",
    },
  )
    .then((data) => {
      renderWaveCockpitSummary(data.waveCockpit, waveCockpitRequestId);
      if (
        syncReleaseAssistantPeopleStatus
        && releaseAssistantPeopleStatusRequestId
          === state.releaseAssistantPeopleStatusRequestId
      ) {
        state.releaseAssistantPeopleStatusWaveCockpit = data.waveCockpit || null;
        renderReleaseAssistantCancelPickStatusSummary();
      }
      return { data, error: null };
    })
    .catch((error) => {
      console.warn("波次驾驶舱加载失败:", error);
      return { data: null, error };
    });
  const sowingStatusPromise = syncReleaseAssistantPeopleStatus
    ? api(
      `/api/wms/sowing-status?date=${encodeURIComponent(businessDate)}`,
      undefined,
      {
        timeoutMs: WMS_STATUS_AUX_REQUEST_TIMEOUT_MS,
        timeoutMessage: "播种与打包状态读取超过 30 秒，已停止刷新",
      },
    )
      .then((data) => {
        if (
          releaseAssistantPeopleStatusRequestId
          === state.releaseAssistantPeopleStatusRequestId
        ) {
          state.releaseAssistantSowingTaskSummary =
            data.sowingTaskSummary || null;
          state.releaseAssistantSowingStatusError = "";
          renderReleaseAssistantCancelPickStatusSummary();
        }
        return { data, error: null };
      })
      .catch((error) => {
        console.warn("播种状态加载失败:", error);
        return { data: null, error };
      })
    : Promise.resolve({ data: null, error: null });
  const nightRosterPromise = loadNightRoster().catch((error) => {
    console.warn("班次名单加载失败:", error);
    return null;
  });
  const data = await analysisPromise;
  state.analysisPath = data.rawFileItem?.path || "";
  state.rawWmsFileItem = data.rawFileItem || null;
  data.analysis.livePickingTaskProgressLoading = true;
  if (syncReleaseAssistantPeopleStatus) {
    syncReleaseAssistantPeopleStatusAnalysis(
      data.analysis,
      businessDate,
      pickingProgressRequestId,
    );
  }
  renderAnalysis(data.analysis);
  updateActionAvailability();
  setStatus("WMS 原始文件已拉取并分析", false, "realtime");
  void loadLivePickingTaskProgress(data.analysis, pickingProgressRequestId);
  if (syncReleaseAssistantPeopleStatus) {
    const [waveCockpitResult, sowingStatusResult] = await Promise.all([
      waveCockpitPromise,
      sowingStatusPromise,
    ]);
    if (
      sowingStatusResult.error
      && releaseAssistantPeopleStatusRequestId
        === state.releaseAssistantPeopleStatusRequestId
    ) {
      state.releaseAssistantSowingStatusError =
        sowingStatusResult.error.message || "播种状态加载失败";
      state.releaseAssistantPeopleStatusError =
        `播种状态读取失败：${state.releaseAssistantSowingStatusError}`;
      renderReleaseAssistantPeopleStatus();
    }
    if (waveCockpitResult.error) {
      throw waveCockpitResult.error;
    }
  } else {
    void waveCockpitPromise;
  }
  void nightRosterPromise.then(() => {
    if (state.releaseAssistantPeopleStatusAnalysis === data.analysis) {
      renderReleaseAssistantPeopleStatus();
    }
    if (state.releaseAssistantAssignPickerAnalysis === data.analysis) {
      renderReleaseAssistantAssignPickerPanel();
    }
  });
  return data.analysis;
}

async function loadReleaseAssistantAssignPickerCandidates() {
  if (
    state.releaseAssistantAssignPickerLoading
    || state.releaseAssistantAssignPickerRunning
    || state.releaseAssistantPickPriorityRunning
    || !state.releaseAssistantCancelPickSelected.size
  ) return null;
  const requestId = state.releaseAssistantAssignPickerRequestId + 1;
  state.releaseAssistantAssignPickerRequestId = requestId;
  const firstOpen = !state.releaseAssistantAssignPickerOpen;
  state.releaseAssistantAssignPickerOpen = true;
  state.releaseAssistantAssignPickerLoading = true;
  state.releaseAssistantAssignPickerError = "";
  if (firstOpen) {
    state.releaseAssistantAssignPickerAnalysis = null;
    state.releaseAssistantAssignPickerSelected.clear();
    state.releaseAssistantAssignPickerInputNames.clear();
    state.releaseAssistantAssignPickerSearch = "";
  }
  syncReleaseAssistantCancelPickSelection();
  renderReleaseAssistantAssignPickerPanel();

  try {
    let businessDate = String(el.wmsBusinessDate?.value || "").trim();
    if (!businessDate) {
      const bootstrap = await api("/api/bootstrap");
      if (
        requestId !== state.releaseAssistantAssignPickerRequestId
        || !state.releaseAssistantCancelPickOpen
      ) return null;
      businessDate = String(bootstrap?.wmsBusinessDate || bootstrap?.today || "").trim();
      if (el.wmsBusinessDate && businessDate) {
        el.wmsBusinessDate.value = businessDate;
      }
    }
    if (
      requestId !== state.releaseAssistantAssignPickerRequestId
      || !state.releaseAssistantCancelPickOpen
    ) return null;
    if (!businessDate) throw new Error("无法确定当前 WMS 业务日期");
    state.releaseAssistantAssignPickerBusinessDate = businessDate;
    renderReleaseAssistantAssignPickerPanel();

    const analysis = await refreshWmsAnalysisForDate(businessDate);
    if (
      requestId !== state.releaseAssistantAssignPickerRequestId
      || !state.releaseAssistantCancelPickOpen
    ) return null;
    state.releaseAssistantAssignPickerAnalysis = analysis;
    const groups = releaseAssistantAssignPickerGroups(analysis);
    const activeNames = new Set(
      [
        ...groups.picking,
        ...groups.waiting,
        ...releaseAssistantAssignPickerRosterNames().map((person) => ({ person })),
      ]
        .map((row) => String(row?.person || "").trim())
        .filter(Boolean),
    );
    state.releaseAssistantAssignPickerSelected.forEach((person) => {
      if (!activeNames.has(person)) state.releaseAssistantAssignPickerSelected.delete(person);
    });
    state.releaseAssistantAssignPickerInputNames.forEach((person) => {
      if (!activeNames.has(person)) state.releaseAssistantAssignPickerInputNames.delete(person);
    });
    return analysis;
  } catch (error) {
    if (
      requestId !== state.releaseAssistantAssignPickerRequestId
      || !state.releaseAssistantCancelPickOpen
    ) return null;
    state.releaseAssistantAssignPickerError = error.message || "当日拣选人状态读取失败";
    setStatus(state.releaseAssistantAssignPickerError, true, "releaseAssistant");
    return null;
  } finally {
    if (requestId === state.releaseAssistantAssignPickerRequestId) {
      state.releaseAssistantAssignPickerLoading = false;
      syncReleaseAssistantCancelPickSelection();
      renderReleaseAssistantAssignPickerPanel();
    }
  }
}

async function fetchWmsAnalysis() {
  const date = el.wmsBusinessDate?.value;
  if (!date) {
    setStatus("请选择 WMS 日期", true);
    return null;
  }

  setBusy(true, "realtime");
  try {
    return await refreshWmsAnalysisForDate(date);
  } catch (error) {
    setStatus(error.message || "WMS 拉取失败", true, "realtime");
    return null;
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
    if (el.efficiencyContent) {
      el.efficiencyContent.hidden = true;
      el.efficiencyContent.innerHTML = "";
    }
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
    if (el.efficiencyContent) {
      el.efficiencyContent.hidden = true;
      el.efficiencyContent.innerHTML = "";
    }
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
  document.addEventListener("click", handleCopyValueButtonClick, true);
  document.addEventListener("keydown", handleCopyShortcut, true);
  if (el.desktopWmsLoginButton && window.realtimeDesktop?.platform === "win32") {
    el.desktopWmsLoginButton.hidden = false;
    el.desktopWmsLoginButton.addEventListener("click", () => {
      void window.realtimeDesktop.openWms().catch((error) => {
        setStatus(cleanErrorMessage(error?.message, "WMS 窗口打开失败"), true);
      });
    });
  }

  document.querySelectorAll("[data-wms-account-create]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openWmsAccountModal();
    });
  });
  document.querySelectorAll("[data-barcode-generate]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openBarcodeGeneratorModal();
    });
  });
  el.barcodeGeneratorClose?.addEventListener("click", closeBarcodeGeneratorModal);
  el.barcodeGeneratorModal?.addEventListener("click", (event) => {
    if (event.target === el.barcodeGeneratorModal) closeBarcodeGeneratorModal();
  });
  el.barcodeGeneratorInput?.addEventListener("input", renderBarcodeGeneratorPreview);
  el.barcodeGeneratorQuickQuantity?.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-barcode-quantity]");
    if (!button) return;
    state.barcodeGeneratorQuantity = Number(button.dataset.barcodeQuantity) || 1;
    if (el.barcodeGeneratorCustomQuantity) el.barcodeGeneratorCustomQuantity.value = "";
    if (el.barcodeGeneratorNotice) el.barcodeGeneratorNotice.textContent = "";
    syncBarcodeGeneratorQuantity();
  });
  el.barcodeGeneratorCustomQuantity?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    confirmBarcodeGeneratorCustomQuantity();
  });
  el.barcodeGeneratorPrint?.addEventListener("click", printGeneratedBarcode);
  el.wmsAccountClose?.addEventListener("click", closeWmsAccountModal);
  el.wmsAccountRecordsOpen?.addEventListener("click", openWmsAccountRecordsModal);
  el.wmsAccountRecordsClose?.addEventListener("click", closeWmsAccountRecordsModal);
  el.wmsAccountRecordsRefresh?.addEventListener("click", () => {
    void loadWmsAccountRecords(true);
  });
  el.wmsAccountRecordsContent?.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-wms-account-record-print]");
    if (!button) return;
    reprintWmsAccountRecord(button.dataset.wmsAccountRecordPrint);
  });
  el.wmsAccountModal?.addEventListener("click", (event) => {
    if (event.target === el.wmsAccountModal) closeWmsAccountModal();
  });
  el.wmsAccountRecordsModal?.addEventListener("click", (event) => {
    if (event.target === el.wmsAccountRecordsModal) closeWmsAccountRecordsModal();
  });
  el.wmsAccountForm?.addEventListener("submit", submitWmsAccountForm);
  [el.wmsAccountUserAccount, el.wmsAccountUserName].forEach((input) => {
    input?.addEventListener("input", resetWmsAccountCreatedResult);
  });
  el.wmsAccountRoleList?.addEventListener("change", resetWmsAccountCreatedResult);
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (state.barcodeGeneratorOpen) {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeBarcodeGeneratorModal();
      return;
    }
    if (state.wmsAccountRecordsOpen) {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeWmsAccountRecordsModal();
      return;
    }
    if (!state.wmsAccountModalOpen || state.wmsAccountSubmitting) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    closeWmsAccountModal();
  });

  document.querySelectorAll("[data-release-assistant-tool-shortcut]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      void navigateReleaseAssistantTool(button.dataset.releaseAssistantToolShortcut);
    });
  });
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
  [el.releaseAssistantResult, el.releaseAssistantZoneChart, el.releaseAssistantZoneSummary].forEach((container) => {
    container?.addEventListener("pointerover", handleReleaseAssistantZonePreviewOver);
    container?.addEventListener("pointermove", handleReleaseAssistantZonePreviewMove);
    container?.addEventListener("pointerout", handleReleaseAssistantZonePreviewOut);
    container?.addEventListener("focusin", handleReleaseAssistantZonePreviewFocus);
    container?.addEventListener("focusout", handleReleaseAssistantZonePreviewBlur);
  });
  el.releaseAssistantResetSelection?.addEventListener("click", resetReleaseAssistantSelection);
  el.releaseAssistantWaveZoneRefresh?.addEventListener("click", () => {
    void loadReleaseAssistantWaveZones(true);
  });
  el.releaseAssistantWaveZoneButtons?.addEventListener("click", handleReleaseAssistantWaveSelection);
  el.releaseAssistantWaveManageModal?.addEventListener("click", handleReleaseAssistantWaveManageClick);
  el.releaseAssistantCancelPickModal?.addEventListener("click", handleReleaseAssistantCancelPickModalClick);
  el.releaseAssistantPackingDetailModal?.addEventListener("click", (event) => {
    if (
      event.target === el.releaseAssistantPackingDetailModal
      || event.target.closest("#releaseAssistantPackingDetailClose")
    ) {
      closeReleaseAssistantPackingDetailModal();
    }
  });
  el.releaseAssistantCancelPickModal?.addEventListener(
    "pointerdown",
    startReleaseAssistantCancelPickCardDrag,
  );
  window.addEventListener("pointermove", moveReleaseAssistantCancelPickCardDrag);
  window.addEventListener("pointerup", finishReleaseAssistantCancelPickCardDrag);
  window.addEventListener("pointercancel", finishReleaseAssistantCancelPickCardDrag);
  el.releaseAssistantCancelPickModal?.addEventListener("input", handleReleaseAssistantAssignPickerInput);
  el.releaseAssistantCancelPickModal?.addEventListener("keydown", handleReleaseAssistantAssignPickerKeydown);
  el.releaseAssistantAssignPickerPanel?.addEventListener("click", handleReleaseAssistantCancelPickModalClick);
  el.releaseAssistantAssignPickerPanel?.addEventListener("input", handleReleaseAssistantAssignPickerInput);
  el.releaseAssistantAssignPickerPanel?.addEventListener("keydown", handleReleaseAssistantAssignPickerKeydown);
  el.releaseAssistantAssignPickerPanel?.addEventListener(
    "pointerdown",
    startReleaseAssistantAssignPickerDrag,
  );
  el.releaseAssistantAssignPickerPanel?.addEventListener(
    "pointermove",
    moveReleaseAssistantAssignPickerDrag,
  );
  el.releaseAssistantAssignPickerPanel?.addEventListener(
    "pointerup",
    finishReleaseAssistantAssignPickerDrag,
  );
  el.releaseAssistantAssignPickerPanel?.addEventListener(
    "pointercancel",
    finishReleaseAssistantAssignPickerDrag,
  );
  el.releaseAssistantNextShiftRosterClose?.addEventListener("click", saveReleaseAssistantNextShiftRosterAndClose);
  el.releaseAssistantNextShiftRosterSaveClose?.addEventListener("click", saveReleaseAssistantNextShiftRosterAndClose);
  el.releaseAssistantNextShiftRosterAddLine?.addEventListener("click", () => {
    const current = el.releaseAssistantNextShiftRosterText.value;
    const needsNewline = current && !current.endsWith("\n");
    el.releaseAssistantNextShiftRosterText.value = `${current}${needsNewline ? "\n" : ""}`;
    el.releaseAssistantNextShiftRosterText.focus();
    updateReleaseAssistantNextShiftRosterCount();
  });
  el.releaseAssistantNextShiftRosterText?.addEventListener("input", updateReleaseAssistantNextShiftRosterCount);
  el.releaseAssistantNextShiftRosterOff?.addEventListener(
    "click",
    setSelectedReleaseAssistantNextShiftRosterPeopleOff,
  );
  el.releaseAssistantNextShiftRosterCancelAllOff?.addEventListener(
    "click",
    cancelAllReleaseAssistantNextShiftRosterPeopleOff,
  );
  el.releaseAssistantNextShiftRosterModal?.addEventListener("click", (event) => {
    const personButton = event.target.closest?.("[data-next-shift-roster-person]");
    if (personButton && !personButton.disabled) {
      toggleReleaseAssistantNextShiftRosterPerson(
        personButton.dataset.nextShiftRosterPerson,
      );
      return;
    }
    if (event.target === el.releaseAssistantNextShiftRosterModal) {
      saveReleaseAssistantNextShiftRosterAndClose();
    }
  });
  el.releaseAssistantNextShiftPickerFloat?.addEventListener(
    "click",
    handleReleaseAssistantNextShiftPickerFloatClick,
  );
  el.releaseAssistantNextShiftPickerFloatHeader?.addEventListener(
    "pointerdown",
    startReleaseAssistantNextShiftPickerDrag,
  );
  el.releaseAssistantNextShiftPickerFloatHeader?.addEventListener(
    "pointermove",
    moveReleaseAssistantNextShiftPickerDrag,
  );
  el.releaseAssistantNextShiftPickerFloatHeader?.addEventListener(
    "pointerup",
    finishReleaseAssistantNextShiftPickerDrag,
  );
  el.releaseAssistantNextShiftPickerFloatHeader?.addEventListener(
    "pointercancel",
    finishReleaseAssistantNextShiftPickerDrag,
  );
  el.releaseAssistantWaveZoneList?.addEventListener("pointerdown", handleReleaseAssistantWaveZonePointerDown);
  el.releaseAssistantWaveZoneList?.addEventListener("pointermove", handleReleaseAssistantWaveZonePointerMove);
  window.addEventListener("pointerup", finishReleaseAssistantWaveZoneDrag);
  window.addEventListener("pointercancel", finishReleaseAssistantWaveZoneDrag);
  el.releaseAssistantReleaseModeButtons?.addEventListener("click", handleReleaseAssistantReleaseModeSelection);
  el.releaseAssistantWaveResult?.addEventListener("click", (event) => {
    if (handleReleaseAssistantWaveConfirmationAction(event)) return;
    if (event.target.closest("#releaseAssistantWaveRelease")) {
      runReleaseAssistantWaveRelease();
      return;
    }
    if (event.target.closest("#releaseAssistantWaveBatchSummary")) runReleaseAssistantWaveBatchSummary();
  });
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
  el.releaseAssistantQuickButton?.addEventListener("click", () => {
    setToolView("releaseAssistant");
    window.scrollTo({ top: 0, behavior: "auto" });
  });
  el.scrollTopButton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  el.scrollBottomButton?.addEventListener("click", () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "auto" });
  });
  [el.analysisContent, el.efficiencyContent].forEach((container) => {
    container?.addEventListener("click", (event) => {
      const personButton = event.target.closest("[data-person-jump]");
      if (!personButton) return;
      const target = document.getElementById(personTimelineId(personButton.dataset.personJump));
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  el.downloadRawWmsFile.addEventListener("click", downloadRawWmsFile);
  el.exportCurrentShift.addEventListener("click", () => exportAnalysis("current"));
  el.exportAll.addEventListener("click", () => exportAnalysis("all"));
  el.waybillQueryButton?.addEventListener("click", queryWaybill);
  el.waybillQueryInput?.addEventListener("input", normalizeWaybillInput);
  el.waybillQueryInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") queryWaybill();
  });
  el.inventoryQueryButton?.addEventListener("click", queryInventory);
  el.shortPickScanButton?.addEventListener("click", openShortPickScanQr);
  el.inventoryQueryInput?.addEventListener("beforeinput", handleInventoryBeforeInput);
  el.inventoryQueryInput?.addEventListener("paste", handleInventoryPaste);
  el.inventoryQueryInput?.addEventListener("compositionstart", (event) => event.preventDefault());
  el.inventoryQueryInput?.addEventListener("compositionupdate", (event) => event.preventDefault());
  el.inventoryQueryInput?.addEventListener("compositionend", handleInventoryCompositionEnd);
  el.inventoryQueryInput?.addEventListener("keydown", handleInventoryKeydown, true);
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
  el.henryLabelEditCancel?.addEventListener("click", closeHenryLabelEditModal);
  el.henryLabelEditSave?.addEventListener("click", confirmHenryLabelEdit);
  el.henryLabelEditInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      confirmHenryLabelEdit();
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      closeHenryLabelEditModal();
    }
  });
  el.henryLabelEditModal?.addEventListener("click", (event) => {
    if (event.target === el.henryLabelEditModal) closeHenryLabelEditModal();
  });
  el.exceptionDetailExport?.addEventListener("click", exportCurrentExceptionDetail);
  el.exceptionDetailClose?.addEventListener("click", closeExceptionDetailModal);
  el.exceptionDetailSelectAll?.addEventListener("click", toggleSelectAllAttributeChangeRows);
  el.exceptionDetailBatchDamage?.addEventListener("click", batchDamageSelectedAttributeChangeRows);
  el.exceptionDetailContent?.addEventListener("change", handleAttributeChangeSelection);
  el.exceptionDetailModal?.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".attribute-change-delete-button");
    if (deleteButton) {
      deleteAttributeChangeRecord(deleteButton);
      return;
    }
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
  el.locationQueryInput?.addEventListener("compositionstart", (event) => {
    if (!state.locationFreeInput) event.preventDefault();
  });
  el.locationQueryInput?.addEventListener("compositionupdate", (event) => {
    if (!state.locationFreeInput) event.preventDefault();
  });
  el.locationQueryInput?.addEventListener("compositionend", handleLocationCompositionEnd);
  el.locationQueryInput?.addEventListener("focus", placeLocationCaretAfterPrefix);
  el.locationQueryInput?.addEventListener("pointerup", () => requestAnimationFrame(placeLocationCaretAfterPrefix));
  el.locationQueryInput?.addEventListener("click", () => requestAnimationFrame(placeLocationCaretAfterPrefix));
  el.locationQueryInput?.addEventListener("keydown", handleLocationKeydown, true);
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
    const locationPrintEditButton = event.target.closest(".inventory-location-print-edit-button");
    if (locationPrintEditButton) {
      editHenryLabelPrintText();
      return;
    }
    const locationPrintButton = event.target.closest(".inventory-location-print-button");
    if (locationPrintButton) {
      printInventoryLocationItemLabel(locationPrintButton);
      return;
    }
    const locationResultQrButton = event.target.closest(".location-result-qr-button");
    if (locationResultQrButton) {
      openQrPreview(locationResultQrButton);
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
    finishReleaseAssistantCancelPickCardDrag();
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
    if (event.key === "Escape" && event.defaultPrevented) return;
    if (
      event.key === "Escape"
      && state.releaseAssistantPackingDetailOpen
    ) {
      closeReleaseAssistantPackingDetailModal();
      return;
    }
    if (
      event.key === "Escape"
      && state.releaseAssistantAssignPickerOpen
      && !state.releaseAssistantAssignPickerRunning
    ) {
      cancelReleaseAssistantAssignPickerMode();
      return;
    }
    if (
      event.key === "Escape"
      && state.releaseAssistantNextShiftPickerOpen
    ) {
      closeReleaseAssistantNextShiftPickerFloat();
      return;
    }
    if (
      event.key === "Escape"
      && el.releaseAssistantNextShiftRosterModal
      && !el.releaseAssistantNextShiftRosterModal.hidden
    ) {
      saveReleaseAssistantNextShiftRosterAndClose();
      return;
    }
    if (event.key === "Escape" && el.qrPreviewModal && !el.qrPreviewModal.hidden) closeQrPreview();
    if (event.key === "Escape" && el.exceptionDetailModal && !el.exceptionDetailModal.hidden) closeExceptionDetailModal();
    if (event.key === "Escape" && el.exceptionShiftSettingsModal && !el.exceptionShiftSettingsModal.hidden) closeExceptionShiftSettings();
    if (event.key === "Escape" && el.henryLabelEditModal && !el.henryLabelEditModal.hidden) closeHenryLabelEditModal();
    if (
      event.key === "Escape"
      && state.releaseAssistantWaveManageOpen
      && !state.releaseAssistantWaveManageLoading
      && !state.releaseAssistantWaveManageRunning
    ) closeReleaseAssistantWaveManage();
    if (
      event.key === "Escape"
      && state.releaseAssistantCancelPickOpen
      && !state.releaseAssistantAssignPickerRunning
      && !state.releaseAssistantPickPriorityRunning
    ) closeReleaseAssistantCancelPickOrders();
    if (event.key === "Escape" && !el.nightRosterModal.hidden) saveNightRosterAndClose();
    if (event.key === "Escape" && el.emptyLocationZoneModal && !el.emptyLocationZoneModal.hidden) saveEmptyLocationZonesAndClose();
  });
  window.addEventListener("resize", () => {
    positionReleaseAssistantAssignPickerFloat();
    positionReleaseAssistantNextShiftPickerFloat();
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
  if (el.efficiencyContent) el.efficiencyContent.hidden = true;
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
  loadHenryLabelText();
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
