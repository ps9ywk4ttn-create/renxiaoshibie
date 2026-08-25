(() => {
  "use strict";

  const STORAGE_KEY = "realtime-dashboard-language";
  const exact = new Map(Object.entries({
    ...(window.DASHBOARD_EN_CORE || {}),
    ...(window.DASHBOARD_EN_MID || {}),
    ...(window.DASHBOARD_EN_LATE || {}),
    "出库实时看板": "Outbound Live Dashboard",
    "入库实时看板": "Inbound Live Dashboard",
    "入库实效看板": "Inbound Productivity Dashboard",
    "异常处理工具": "Exception Tools",
    "放单助手": "Wave Release Assistant",
    "出库效率看板": "Outbound Productivity Dashboard",
    "看板内容待建设": "Dashboard content coming soon",
    "用户登录": "User Sign In",
    "管理员登录": "Administrator Sign In",
    "管理员密码": "Administrator password",
    "进入管理员版": "Open Admin View",
    "返回用户登录": "Back to User Sign In",
    "账号": "Account",
    "密码": "Password",
    "登录": "Sign In",
    "账号登录": "Account Sign In",
    "用户版": "User View",
    "管理员版": "Admin View",
    "退出": "Sign Out",
    "工具切换": "Switch tools",
    "空库位": "Empty Locations",
    "实时分析拣选任务：已分配 / 拣选中 / 已拣选": "Live picking task analysis: Assigned / Picking / Picked",
    "班次设置": "Shift Settings",
    "异常明细日期": "Exception detail date",
    "异常明细班次": "Exception detail shift",
    "白班": "Day Shift",
    "夜班": "Night Shift",
    "查看 SOP": "View SOP",
    "下载 SOP": "Download SOP",
    "入库日期": "Inbound Date",
    "清除缓存": "Clear Cache",
    "本地服务已启动": "Local service is running",
    "本地服务异常": "Local service error",
    "正在打开本地服务": "Opening local service",
    "实时看板快捷操作": "Dashboard quick actions",
    "放单": "Release",
    "刷新": "Refresh",
    "刷新中…": "Refreshing…",
    "正在刷新…": "Refreshing…",
    "回到顶部": "Back to top",
    "前往底部": "Go to bottom",
    "创建账号": "Create Account",
    "生成条码": "Generate Barcode",
    "4 × 6 英寸横版 · Code 128": "4 × 6 inch landscape · Code 128",
    "条码内容": "Barcode Content",
    "输入需要生成条码的内容": "Enter barcode content",
    "打印数量": "Print Quantity",
    "大于 5 的数量（输入后按回车确认）": "Quantity above 5 (press Enter to confirm)",
    "打印预览": "Print Preview",
    "输入内容后显示条码": "Enter content to preview the barcode",
    "打印": "Print",
    "待导出窗口": "Export Preview",
    "打包状态分析": "Packing Status Analysis",
    "拣选状态分析": "Picking Status Analysis",
    "WMS 创建时间：所选日期 15:00 到次日 03:00": "WMS created time: selected date 15:00 to next day 03:00",
    "本班次名单更新": "Update Shift Roster",
    "刷新预览": "Refresh Preview",
    "WMS 日期": "WMS Date",
    "拉取并分析 WMS": "Fetch & Analyze WMS",
    "下载原始文件": "Download Source File",
    "拖入 Excel 文件": "Drop an Excel file here",
    "支持 .xlsx / .xlsx.xlsx": "Supports .xlsx / .xlsx.xlsx",
    "打开文件": "Open File",
    "打开文件夹": "Open Folder",
    "分析拣选状态": "Analyze Picking Status",
    "导出本班次": "Export This Shift",
    "导出全部": "Export All",
    "只分析已完成复核": "Analyze completed reviews only",
    "任务行数": "Task Rows",
    "总件数": "Total Units",
    "总工时": "Total Hours",
    "人效": "Productivity",
    "导出结果": "Export Results",
    "尚未导出": "Not exported yet",
    "入库系统时间": "Inbound System Time",
    "请选择入库日期": "Select an inbound date",
    "拉取入库任务列表": "Fetch Inbound Tasks",
    "尚未拉取": "Not fetched yet",
    "返回": "Back",
    "导出": "Export",
    "空库位操作": "Empty location actions",
    "查询": "Search",
    "查询中…": "Searching…",
    "库区更新": "Update Zones",
    "异常处理快捷操作": "Exception tool shortcuts",
    "短捡扫码": "Short-pick Scan",
    "异常处理": "Exception Handling",
    "面单查询": "Shipping Label Lookup",
    "输入面单号": "Enter shipping label number",
    "库存查询": "Inventory Lookup",
    "输入 SKU / 条码": "Enter SKU / barcode",
    "库位查询": "Location Lookup",
    "输入库位": "Enter location",
    "库存异常处理动作": "Inventory exception actions",
    "异位拣选": "Pick from Another Location",
    "拣选无货": "Out of Stock",
    "属性变更": "Change Attributes",
    "重置": "Reset",
    "放单助手工具跳转": "Wave release assistant shortcuts",
    "出库看板": "Outbound Dashboard",
    "已选 0 条": "0 selected",
    "取消全部选择": "Clear All Selections",
    "选择": "Select",
    "按 X 列排序，只保留 A 列和 X 列": "Sort by column X; keep columns A and X only",
    "波次汇总库区信息下拉内容": "Wave summary zone details",
    "WMS 库区": "WMS Zones",
    "库区颜色说明": "Zone color legend",
    "拣选中普通单件": "Single-item Picking",
    "已分配普通单件": "Assigned Single-item",
    "两种状态同时存在": "Both statuses",
    "筛选条件": "Filters",
    "正在读取…": "Loading…",
    "读取中…": "Loading…",
    "正在处理": "Processing",
    "波次管理": "Wave Management",
    "拣选单管理": "Pick Order Management",
    "库区": "Zone",
    "正在从 WMS 接口读取…": "Loading from WMS…",
    "放单模式": "Release mode",
    "正在从 WMS 接口读取已创建波次…": "Loading created waves from WMS…",
    "关闭": "Close",
    "已选择 0 条": "0 selected",
    "批量确认": "Confirm Selected",
    "批量取消": "Cancel Selected",
    "正在从 WMS 接口读取可管理拣选单…": "Loading manageable pick orders from WMS…",
    "取消选择": "Clear Selection",
    "WMS 拣选流程状态": "WMS picking workflow status",
    "刷新状态": "Refresh Status",
    "折叠上方状态区域": "Collapse status section",
    "折叠 ▲": "Collapse ▲",
    "拣选优先级": "Picking priority",
    "非常紧急": "Critical",
    "紧急": "Urgent",
    "普通": "Normal",
    "指定下个班次拣选人": "Assign Next-shift Picker",
    "指定拣选人": "Assign Picker",
    "取消分配": "Unassign",
    "全部取消": "Cancel All",
    "矩阵刷新": "Refresh Matrix",
    "拣选单管理工具跳转": "Pick order tool shortcuts",
    "创建一般账号，设置并验证固定密码 Aa123456 后打印": "Create a standard account, verify password Aa123456, then print",
    "查看记录": "View Records",
    "用户账号": "User Account",
    "请输入用户账号": "Enter user account",
    "用户名称": "User Name",
    "请输入用户名称": "Enter user name",
    "用户角色（可多选）": "User Roles (multiple selection)",
    "正在从 WMS 接口读取角色…": "Loading roles from WMS…",
    "确认并打印": "Confirm & Print",
    "账号创建记录": "Account Creation History",
    "正在读取已保存的创建记录…": "Loading saved account records…",
    "打包中人员明细": "Active Packing Staff Details",
    "WMS 出库复核 · 处理中": "WMS outbound review · Processing",
    "已选择 0 条拣选单 · 当前人员 未选择": "0 pick orders selected · No person selected",
    "待分配 0 条": "0 awaiting assignment",
    "分配": "Assign",
    "选择人员后，点击“分配”直接写入 WMS": "Select staff, then click Assign to update WMS",
    "下个班次拣选人名单": "Next-shift Picker Roster",
    "0 人": "0 people",
    "关闭保存": "Save & Close",
    "下个班次人员状态": "Next-shift Staff Status",
    "已选择 0 人": "0 people selected",
    "名单编辑（每行一人）": "Edit roster (one person per line)",
    "新增空行": "Add Blank Row",
    "二维码预览": "QR Code Preview",
    "打印": "Print",
    "设置后，横版明细按这里的时间范围过滤": "Landscape details will use this time range",
    "开始时间": "Start Time",
    "结束时间": "End Time",
    "取消": "Cancel",
    "确定": "Confirm",
    "编辑 Label to Henry 打印文字": "Edit Label to Henry print text",
    "编辑打印文字": "Edit Print Text",
    "只修改 Label to Henry 打印的大字，二维码和 SKU 不变": "Changes only the large Label to Henry text; QR code and SKU stay unchanged",
    "打印文字": "Print Text",
    "明细": "Details",
    "全选": "Select All",
    "批量转残": "Batch Mark Damaged",
    "0 个": "0 items",
    "正在等待查询结果": "Waiting for query results",
    "正在等待结果…": "Waiting for results…",
    "操作失败": "Operation failed",
    "未获得授权将Apple事件发送给Safari": "Not authorized to send Apple events to Safari",
    "WMS 拣选单页面": "WMS Pick Orders page",
    "已登录的 WMS 标签页": "Signed-in WMS tab",
    "登录已超时": "Session expired",
    "请重新登录": "Sign in again",
    "无权限": "Permission denied",
    "请求失败": "Request failed",
    "登录失败": "Sign-in failed",
    "请输入账号和密码": "Enter account and password",
    "正在验证": "Verifying…",
    "复制": "Copy",
    "不计算": "Excluded",
    "已分配": "Assigned",
    "待拣选": "Pending Picking",
    "拣选中": "Picking",
    "已拣选": "Picked",
    "已取消": "Canceled",
    "库内异常": "Warehouse Exception",
    "暂无": "None",
    "无明细": "No details",
    "暂无实时人员状态": "No live staff status",
    "读取中": "Loading",
    "待播种": "Pending Sowing",
    "播种中": "Sowing",
    "播种完成": "Sowing Complete",
    "无计划数量": "No planned quantity",
    "删除": "Delete",
    "确认中…": "Confirming…",
    "取消中…": "Canceling…",
    "汇总中…": "Summarizing…",
    "批量汇总": "Batch Summary",
    "放单中…": "Releasing…",
    "相等": "Equals",
    "包含": "Contains",
    "不包含": "Does Not Contain",
    "完全包含": "Contains All",
    "混合包裹": "Mixed Packages",
    "普通单件": "Standard Single-item",
    "爆品组合": "Popular-item Bundle",
    "拣选单订单矩阵": "Pick Order Matrix",
    "指定下个班次拣选人": "Assign Next-shift Picker",
    "Prep 待处理": "Prep Pending",
    "Prep 待打印": "Prep Awaiting Print",
    "Prep 异常": "Prep Exception",
    "分区拣选中": "Zone Picking",
    "分区拣选完成": "Zone Picking Complete",
    "分区拣选异常": "Zone Picking Exception",
    "该条目已转残": "This record is already marked damaged",
    "选择该条目进行批量转残": "Select this record for batch damage processing"
  }));

  const templates = [
    [/^用户版：(.+)$/, (match) => `User View: ${match[1]}`],
    [/^(用户版|管理员版)已进入$/, (match) => `${match[1] === "管理员版" ? "Admin View" : "User View"} opened`],
    [/^共 ([\d,.]+) 条已验证记录$/, (match) => `${match[1]} verified records`],
    [/^([\d,.]+) 人$/, (match) => `${match[1]} people`],
    [/^([\d,.]+) 个$/, (match) => `${match[1]} items`],
    [/^([\d,.]+) 条$/, (match) => `${match[1]} records`],
    [/^([\d,.]+) 单 \/ ([\d,.]+) 件$/, (match) => `${match[1]} orders / ${match[2]} units`],
    [/^([\d,.]+) 分钟$/, (match) => `${match[1]} min`],
    [/^([\d,.]+) 小时$/, (match) => `${match[1]} hr`],
    [/^([\d,.]+)小时([\d,.]+)分钟$/, (match) => `${match[1]} hr ${match[2]} min`],
    [/^([\d,.]+) 件\/小时$/, (match) => `${match[1]} units/hr`],
    [/^已选 ([\d,.]+) 条$/, (match) => `${match[1]} selected`],
    [/^已选择 ([\d,.]+) 条$/, (match) => `${match[1]} selected`],
    [/^已选择 ([\d,.]+) 人$/, (match) => `${match[1]} people selected`],
    [/^待分配 ([\d,.]+) 条$/, (match) => `${match[1]} awaiting assignment`],
    [/^已选择 ([\d,.]+) 条拣选单 · 当前人员 (.+)$/, (match) => `${match[1]} pick orders selected · Current staff: ${match[2] === "未选择" ? "Not selected" : match[2]}`],
    [/^已选择 ([\d,.]+) 条拣选单 · ([\d,.]+) 人$/, (match) => `${match[1]} pick orders selected · ${match[2]} people`],
    [/^更新于 (.+)$/, (match) => `Updated ${match[1]}`],
    [/^请求超过 ([\d,.]+) 秒，已停止$/, (match) => `Request exceeded ${match[1]} seconds and was stopped`],
    [/^实时进度 (.+)，([\d,.]+)%$/, (match) => `Live progress ${match[1]}, ${match[2]}%`],
    [/^当前 Single 拣选单库区：(.+)$/, (match) => `Current Single pick-order zone: ${match[1]}`],
    [/^第 ([\d,.]+) \/ ([\d,.]+) 页$/, (match) => `Page ${match[1]} of ${match[2]}`],
    [/^选择拣选单 (.+)$/, (match) => `Select pick order ${match[1]}`],
    [/^分配人 (.+)$/, (match) => `Assigned by ${match[1]}`],
    [/^订单件数 ([\d,.]+)$/, (match) => `Order units ${match[1]}`],
    [/^优先级[： ](.+)$/, (match) => `Priority: ${exact.get(match[1]) || match[1]}`],
    [/^删除 (.+)$/, (match) => `Delete ${match[1]}`],
    [/^复制人员 (.+)$/, (match) => `Copy staff member ${match[1]}`],
    [/^查看 (.+) 的拣选时间$/, (match) => `View ${match[1]}'s picking time`],
    [/^账号 (.+) 已创建，可直接重新打印$/, (match) => `Account ${match[1]} was created and can be reprinted`],
    [/^账号 (.+) 已创建，固定密码已通过 WMS 登录验证，已打开 4×6 打印$/, (match) => `Account ${match[1]} was created, the fixed password was verified by WMS, and 4×6 printing is open`],
    [/^账号 (.+) 已创建，固定密码已通过 WMS 登录验证；打印未打开，请点击“重新打印”$/, (match) => `Account ${match[1]} was created and verified by WMS; click Reprint to open printing`],
    [/^账号 (.+) 已创建并验证，但用户账号加入本班次名单失败：(.+)$/, (match) => `Account ${match[1]} was created and verified, but its user account could not be added to this-shift roster: ${match[2]}`],
    [/^WMS 已创建波次 · 共 ([\d,.]+) 条 · 第 ([\d,.]+) \/ ([\d,.]+) 页$/, (match) => `WMS created waves · ${match[1]} total · Page ${match[2]} of ${match[3]}`],
    [/^已取消 ([\d,.]+) 个波次$/, (match) => `${match[1]} waves canceled`],
    [/^已确认 ([\d,.]+) 个波次$/, (match) => `${match[1]} waves confirmed`],
    [/^已选择 ([\d,.]+) 个拣选单$/, (match) => `${match[1]} pick orders selected`],
    [/^任务类型：上架\/收货上架；状态：空；创建时间：(.+) 到 (.+)$/, (match) => `Task type: Putaway / Receiving putaway; Status: Empty; Created: ${match[1]} to ${match[2]}`],
    [/^(\d{4}-\d{2}-\d{2}(?: \d{2}:\d{2}:\d{2})?) 到 (\d{4}-\d{2}-\d{2}(?: \d{2}:\d{2}:\d{2})?)$/, (match) => `${match[1]} to ${match[2]}`],
    [/^(.+)Excel 导出完成$/, (match) => `${match[1] === "本班次" ? "This shift" : "All"} Excel export complete`],
    [/^(.+)明细$/, (match) => `${exact.get(match[1]) || match[1]} Details`],
    ...(window.DASHBOARD_EN_TEMPLATES || []),
  ];

  const originalText = new WeakMap();
  const renderedText = new WeakMap();
  const originalAttrs = new WeakMap();
  const originalDocumentTitle = document.title;
  let language = localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "zh";

  function translate(value) {
    const input = String(value || "");
    const leading = input.match(/^\s*/)?.[0] || "";
    const trailing = input.match(/\s*$/)?.[0] || "";
    const core = input.trim();
    if (!core || !/[\u3400-\u9fff]/.test(core)) return input;
    if (exact.has(core)) return `${leading}${exact.get(core)}${trailing}`;
    for (const [pattern, render] of templates) {
      const match = core.match(pattern);
      if (match) return `${leading}${render(match)}${trailing}`;
    }
    return input;
  }

  function applyText(node) {
    if (!node || node.nodeType !== Node.TEXT_NODE || node.parentElement?.closest("script, style, .language-toggle")) return;
    const current = node.nodeValue || "";
    if (language === "en") {
      if (renderedText.get(node) !== current && /[\u3400-\u9fff]/.test(current)) originalText.set(node, current);
      const source = originalText.get(node) ?? current;
      const translated = translate(source);
      renderedText.set(node, translated);
      if (current !== translated) node.nodeValue = translated;
    } else if (originalText.has(node)) {
      const source = originalText.get(node);
      renderedText.delete(node);
      if (current !== source) node.nodeValue = source;
    }
  }

  const translatedAttributes = ["aria-label", "title", "placeholder"];
  function applyElement(element) {
    if (!(element instanceof Element)) return;
    let saved = originalAttrs.get(element);
    if (!saved) {
      saved = {};
      originalAttrs.set(element, saved);
    }
    for (const name of translatedAttributes) {
      if (!element.hasAttribute(name)) continue;
      const current = element.getAttribute(name) || "";
      if (language === "en") {
        if (/[\u3400-\u9fff]/.test(current) && saved[name] == null) saved[name] = current;
        const translated = translate(saved[name] ?? current);
        if (current !== translated) element.setAttribute(name, translated);
      } else if (saved[name] != null) {
        if (current !== saved[name]) element.setAttribute(name, saved[name]);
      }
    }
  }

  function walk(root = document.body) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) applyText(root);
    else {
      applyElement(root);
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) node.nodeType === Node.TEXT_NODE ? applyText(node) : applyElement(node);
    }
  }

  function updateToggle() {
    for (const button of document.querySelectorAll(".language-toggle")) {
      button.textContent = language === "en" ? "中文" : "English";
      button.setAttribute("aria-label", language === "en" ? "Switch to Chinese" : "Switch to English");
      button.title = language === "en" ? "Switch to Chinese" : "Switch to English";
    }
  }

  function setLanguage(next) {
    language = next === "en" ? "en" : "zh";
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === "en" ? "en" : "zh-CN";
    document.title = language === "en" ? translate(originalDocumentTitle) : originalDocumentTitle;
    walk(document.body);
    updateToggle();
    window.dispatchEvent(new CustomEvent("app-language-change", { detail: { language } }));
  }

  function sourceText(element) {
    if (!element) return "";
    return Array.from(element.childNodes || []).map((node) => {
      if (node.nodeType !== Node.TEXT_NODE) return node.textContent || "";
      return originalText.get(node) ?? node.nodeValue ?? "";
    }).join("");
  }

  function start() {
    for (const button of document.querySelectorAll(".language-toggle")) {
      button.addEventListener("click", () => setLanguage(language === "en" ? "zh" : "en"));
    }
    setLanguage(language);
    let renderQueued = false;
    const pendingRoots = new Set();
    new MutationObserver((mutations) => {
      if (language !== "en") return;
      for (const mutation of mutations) {
        if (mutation.type === "attributes") {
          applyElement(mutation.target);
          continue;
        }
        for (const node of mutation.addedNodes) pendingRoots.add(node);
      }
      if (renderQueued || pendingRoots.size === 0) return;
      renderQueued = true;
      requestAnimationFrame(() => {
        renderQueued = false;
        if (language !== "en") {
          pendingRoots.clear();
          return;
        }
        const roots = Array.from(pendingRoots);
        pendingRoots.clear();
        for (const root of roots) {
          if (root.isConnected !== false) walk(root);
        }
      });
    }).observe(document.body, {
      attributes: true,
      attributeFilter: translatedAttributes,
      childList: true,
      subtree: true,
    });
  }

  window.dashboardI18n = { get language() { return language; }, setLanguage, sourceText, translate };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
