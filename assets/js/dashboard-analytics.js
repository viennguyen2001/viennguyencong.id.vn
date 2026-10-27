/* GA4 reports, authorized by the dashboard owner. Tokens stay in memory. */
(() => {
  const app = document.querySelector("[data-dashboard-app]");
  if (!app) return;
  const nav = app.querySelector("[data-dashboard-nav]");
  const main = app.querySelector(".dashboard-main");
  const PROPERTY = "428241957";
  const SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
  let token = "", expires = 0, busy = false, version = 0;
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const panel = document.createElement("section");
  panel.className = "analytics-panel";
  panel.hidden = true;
  panel.innerHTML = `
    <header class="dashboard-header"><div><h1>Thống kê truy cập</h1><span>Google Analytics · Portfolio · Dữ liệu từ khi cài mã đo</span></div>
    <a class="dashboard-button dashboard-button--secondary" href="https://analytics.google.com/analytics/web/#/p${PROPERTY}/reports/intelligenthome" target="_blank" rel="noopener noreferrer">Mở Google Analytics ↗</a></header>
    <details class="analytics-setup" open><summary>Kết nối Google Analytics</summary>
      <p>Tạo OAuth Client ID loại Web application trong Google Cloud. Bật Google Analytics Data API và thêm https://viennguyencong.id.vn vào Authorized JavaScript origins. Nếu ứng dụng ở chế độ Testing, thêm email Google của bạn vào Test users.</p>
      <label>OAuth Client ID<input data-analytics-client placeholder="…apps.googleusercontent.com" autocomplete="off" /></label>
      <p>Chỉ nhập Client ID công khai. Không nhập Client secret. Quyền yêu cầu: chỉ đọc Analytics.</p>
      <a href="https://console.cloud.google.com/auth/clients" target="_blank" rel="noopener noreferrer">Mở Google Cloud ↗</a>
    </details>
    <div class="analytics-controls">
      <button type="button" class="dashboard-button dashboard-button--primary" data-analytics-connect disabled>Kết nối Google</button>
      <label>Khoảng thời gian<select data-analytics-days><option value="7">7 ngày qua</option><option value="30" selected>30 ngày qua</option><option value="90">90 ngày qua</option></select></label>
      <button type="button" class="dashboard-button dashboard-button--secondary" data-analytics-refresh disabled>Làm mới</button>
      <button type="button" class="dashboard-button dashboard-button--secondary" data-analytics-disconnect hidden>Ngắt kết nối</button>
    </div>
    <p data-analytics-status role="status" aria-live="polite">Chưa kết nối. Nhập OAuth Client ID để đọc báo cáo bằng tài khoản Google của bạn.</p>
    <div data-analytics-results></div>`;
  main.appendChild(panel);
  const $ = selector => panel.querySelector(selector);
  const status = message => { $("[data-analytics-status]").textContent = message; };
  try { $("[data-analytics-client]").value = localStorage.getItem("vien-analytics-client-id") || ""; } catch {}
  const attachNav = () => {
    if (nav.querySelector("[data-analytics-nav]")) return;
    const button = document.createElement("button");
    button.type = "button"; button.className = "dashboard-nav__item";
    button.dataset.analyticsNav = "";
    button.innerHTML = '<i class="ri-bar-chart-line" aria-hidden="true"></i><span>Thống kê truy cập</span>';
    nav.appendChild(button);
  };
  const observer = new MutationObserver(attachNav);
  observer.observe(nav, {childList:true}); attachNav();
  function reset() {
    token = ""; expires = 0; busy = false; version++;
    $("[data-analytics-results]").replaceChildren();
    $("[data-analytics-refresh]").disabled = true;
    $("[data-analytics-disconnect]").hidden = true;
  }
  new MutationObserver(() => {
    if (!app.classList.contains("is-authenticated")) { reset(); panel.hidden = true; main.classList.remove("analytics-open"); }
  }).observe(app, {attributes:true, attributeFilter:["class"]});
  app.addEventListener("click", event => {
    if (event.target.closest("[data-analytics-nav]")) {
      if (!app.classList.contains("is-authenticated")) return;
      main.classList.add("analytics-open"); panel.hidden = false;
      nav.querySelectorAll(".is-active").forEach(node => node.classList.remove("is-active"));
      nav.querySelector("[data-analytics-nav]")?.classList.add("is-active");
    } else if (event.target.closest("[data-dashboard-type]")) {
      main.classList.remove("analytics-open"); panel.hidden = true;
    }
  });
  async function report(method, body) {
    const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY}:${method}`, {
      method:"POST", headers:{Authorization:`Bearer ${token}`, "Content-Type":"application/json"}, body:JSON.stringify(body)
    });
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 401) { const error = Error("Phiên Google đã hết hạn. Bấm Kết nối Google lại."); error.expired = true; throw error; }
      if (response.status === 403) throw Error("Chưa được phép đọc báo cáo. Kiểm tra quyền Người xem trên tài sản 428241957 và bật Google Analytics Data API trong Google Cloud.");
      throw Error("Không tải được báo cáo. Hãy thử lại sau.");
    }
    return data;
  }
  const rows = data => (data.rows || []).map(row => ({
    label: row.dimensionValues?.map(value => value.value).join(" · ") || "",
    values: row.metricValues.map(value => Number(value.value) || 0)
  }));
  const number = value => Number(value || 0).toLocaleString("vi-VN");
  const table = (title, data, labels) => `<article class="analytics-card"><h2>${esc(title)}</h2>${data.length ? `<table><thead><tr>${labels.map(label => `<th>${esc(label)}</th>`).join("")}</tr></thead><tbody>${data.map(row => `<tr><td>${esc(row.label)}</td>${row.values.map(value => `<td>${number(value)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : "<p>Chưa có dữ liệu trong khoảng thời gian này.</p>"}</article>`;
  async function load() {
    if (busy) return;
    if (!token || Date.now() >= expires) { status("Bấm Kết nối Google để đọc báo cáo."); return; }
    busy = true; const request = ++version;
    $("[data-analytics-refresh]").disabled = true;
    $("[data-analytics-results]").replaceChildren();
    status("Đang tải báo cáo…");
    const days = Number($("[data-analytics-days]").value);
    const dateRanges = [{startDate:`${days-1}daysAgo`, endDate:"today"}];
    const query = (dimensions, metrics, limit) => ({dateRanges, dimensions:dimensions.map(name=>({name})), metrics:metrics.map(name=>({name})), ...(limit ? {limit, orderBys:[{metric:{metricName:metrics[0]},desc:true}]} : {})});
    try {
      const results = await Promise.allSettled([
        report("runReport",query([],["totalUsers","sessions","screenPageViews"])),
        report("runRealtimeReport",{metrics:[{name:"activeUsers"}]}),
        report("runReport",query(["date"],["totalUsers","screenPageViews"])),
        report("runReport",query(["pagePath"],["screenPageViews"],10)),
        report("runReport",query(["sessionDefaultChannelGroup"],["sessions"],8)),
        report("runReport",query(["deviceCategory"],["totalUsers"],8))
      ]);
      if (request !== version || !app.classList.contains("is-authenticated")) return;
      if (results.some(result => result.status === "rejected" && result.reason.expired)) { reset(); status("Phiên Google đã hết hạn. Bấm Kết nối Google lại."); return; }
      if (results.every(result => result.status === "rejected")) throw results[0].reason;
      const get = index => results[index].status === "fulfilled" ? rows(results[index].value) : null;
      const totals = get(0) === null ? undefined : get(0)[0]?.values || [0,0,0];
      const live = get(1);
      const kpis = [["Người dùng",totals?.[0]],["Phiên truy cập",totals?.[1]],["Lượt xem trang",totals?.[2]],["Hoạt động · 30 phút",live ? live[0]?.values[0] || 0 : undefined]];
      let html = `<div class="analytics-kpis">${kpis.map(([label,value])=>`<article class="analytics-card"><span>${label}</span><strong>${value === undefined ? "—" : number(value)}</strong></article>`).join("")}</div><div class="analytics-reports">`;
      const daily = get(2)?.sort((a,b)=>a.label.localeCompare(b.label)).map(row=>({...row,label:row.label.replace(/^(\d{4})(\d{2})(\d{2})$/,"$3/$2/$1")}));
      for (const [title,data,labels] of [["Theo ngày",daily,["Ngày","Người dùng","Lượt xem"]],["Trang / project được xem nhiều",get(3),["Trang","Lượt xem"]],["Nguồn truy cập",get(4),["Nguồn","Phiên"]],["Thiết bị",get(5),["Thiết bị","Người dùng"]]]) {
        html += data === null || data === undefined ? `<article class="analytics-card"><h2>${title}</h2><p>Không tải được báo cáo này. Bấm Làm mới để thử lại.</p></article>` : table(title,data,labels);
      }
      $("[data-analytics-results]").innerHTML = html + "</div>";
      status(`Đã cập nhật lúc ${new Date().toLocaleTimeString("vi-VN")}. ${results.some(result=>result.status==="rejected") ? "Một số báo cáo chưa tải được." : "Báo cáo thông thường có thể cập nhật chậm hơn thời gian thực."}`);
    } catch (error) { if (request === version) status(error.message); }
    finally { if (request === version) { busy = false; $("[data-analytics-refresh]").disabled = !token; } }
  }
  $("[data-analytics-refresh]").addEventListener("click",load);
  $("[data-analytics-days]").addEventListener("change",load);
  $("[data-analytics-disconnect]").addEventListener("click",() => {
    if (token) window.google?.accounts.oauth2.revoke(token,()=>{});
    reset(); status("Đã ngắt kết nối. Báo cáo đã được xóa khỏi màn hình.");
  });
  $("[data-analytics-connect]").addEventListener("click",() => {
    const clientId = $("[data-analytics-client]").value.trim();
    if (!/^[\w-]+\.apps\.googleusercontent\.com$/.test(clientId)) { status("Nhập OAuth Client ID hợp lệ, kết thúc bằng .apps.googleusercontent.com."); return; }
    try {
      localStorage.setItem("vien-analytics-client-id",clientId);
      reset();
      const connection = ++version;
      const client = google.accounts.oauth2.initTokenClient({
        client_id:clientId, scope:SCOPE,
        callback:response => {
          if (connection !== version || !app.classList.contains("is-authenticated")) return;
          if (response.error || !response.access_token) { status("Kết nối chưa được cấp quyền. Bạn có thể thử lại."); return; }
          token = response.access_token; expires = Date.now() + Number(response.expires_in || 3600)*1000;
          $("[data-analytics-disconnect]").hidden = false;
          panel.querySelector("details").open = false; load();
        },
        error_callback:() => { if (connection === version) status("Cửa sổ Google đã đóng hoặc bị chặn. Bấm Kết nối Google để thử lại."); }
      });
      client.requestAccessToken({prompt:"select_account"});
    } catch { status("Không khởi tạo được kết nối Google. Kiểm tra Client ID và thử lại."); }
  });
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client"; script.async = true;
  script.onload = () => { $("[data-analytics-connect]").disabled = false; };
  script.onerror = () => status("Không tải được đăng nhập Google. Kiểm tra mạng hoặc trình chặn quảng cáo rồi tải lại trang.");
  document.head.appendChild(script);
})();
