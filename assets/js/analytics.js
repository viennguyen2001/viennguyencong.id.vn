/* Google Analytics for public portfolio pages. Dashboard and local previews are excluded. */
(() => {
  const host = window.location.hostname.toLowerCase();
  if (!["viennguyencong.id.vn", "www.viennguyencong.id.vn"].includes(host) ||
      /^\/dashboard(?:\/|\.html|$)/i.test(window.location.pathname) ||
      window.__vienAnalyticsLoaded) return;
  window.__vienAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", "G-V409LHBHH4", {
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-V409LHBHH4";
  document.head.appendChild(script);
})();
