/* About page, "Canvas" design.
 * The HTML already holds the current content, so the page reads correctly before data arrives or without JS.
 * This refreshes it from the dashboard (Firebase) through window.vienSite, which index.contact-dedupe.js provides.
 */
(() => {
  const STORAGE_KEY = "nino-dashboard-content";
  const $ = (selector) => document.querySelector(selector);
  const text = (value) => String(value ?? "").trim();
  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const isActive = (item) => Boolean(item) && (item.status === "Active" || item.status === "Published");
  const isExternal = (link) => /^https?:\/\//i.test(text(link));
  // Sample images that ship with the template are never shown.
  const isPlaceholderImage = (src) => !text(src) || /assets\/images\/(about\/me|skills\/skill\d+)\.(jpg|png)/.test(src);
  const cld = (src, transform) => {
    const url = text(src);
    const match = url.match(/^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(v\d+\/.+)$/);
    return match ? `${match[1]}${transform}/${match[2]}` : url;
  };
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // "2024-09-15" → "Sep 2024"; free text such as "2020 - Present" is kept as written.
  const formatDate = (value) => {
    const match = text(value).match(/^(\d{4})-(\d{2})(?:-\d{2})?$/);
    return match ? `${MONTHS[Number(match[2]) - 1] || ""} ${match[1]}`.trim() : text(value);
  };
  const sortKey = (value) => {
    const years = text(value).match(/\d{4}/g);
    return years ? Math.max(...years.map(Number)) + (/present|now/i.test(value) ? 1 : 0) : 0;
  };

  const getData = () => {
    try {
      if (window.vienSite) return window.vienSite.getData();
    } catch (error) {}
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
    } catch (error) {
      return null;
    }
  };

  const renderIntro = (data) => {
    const about = (data.about || [])[0];
    if (!about) return;
    if (text(about.title)) $("[data-about-title]").textContent = text(about.title);
    if (text(about.owner)) $("[data-about-text]").textContent = text(about.owner);
    const detail = about.detail || {};
    const stats = [
      [detail.yearsLabel || "Years Experience", detail.years],
      [detail.projectsLabel || "Projects Completed", detail.projects],
      [detail.satisfactionLabel || "Client Satisfaction", detail.satisfaction],
    ].filter(([, value]) => text(value));
    if (stats.length) {
      $("[data-about-stats]").innerHTML = stats
        .map(([label, value]) => `<div class="stat"><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`)
        .join("");
    }
  };

  const renderPortrait = (data) => {
    const hero = (data.hero || [])[0];
    const image = $("[data-about-portrait]");
    if (!hero || !image || isPlaceholderImage(hero.image) || image.getAttribute("src") === hero.image) return;
    image.src = hero.image;
  };

  // Lists on a strip that keeps moving (marquee.js); without it, they are written straight into the list.
  const fillStrip = (selector, html) => {
    const list = $(selector);
    if (!list) return;
    if (window.vienMarquee && list.closest("[data-marquee]")) window.vienMarquee.setItems(list.closest("[data-marquee]"), html);
    else list.innerHTML = html;
  };

  // Company logos from the dashboard. A company without a logo shows its name.
  const renderClients = (data) => {
    const companies = (data.companies || [])
      .filter(isActive)
      .filter((company) => text(company.title) && !/^partner \d+$/i.test(text(company.title)));
    if (!companies.length) return;
    fillStrip(
      "[data-about-clients]",
      companies
        .map((company) => {
          const image = text(company.image);
          return image && !/assets\/images\/client-logos\//.test(image)
            ? `<li class="logo-tile"><img src="${esc(cld(image, "f_auto,q_auto,h_72"))}" alt="${esc(company.title)}" height="36" decoding="async" /></li>`
            : `<li class="logo-tile"><span class="logo-tile__name">${esc(company.title)}</span></li>`;
        })
        .join("")
    );
  };

  const timelineItem = (item, linkLabel) => {
    const link = text(item.certificateLink) || (isExternal(item.link) ? text(item.link) : "");
    const date = text(item.date);
    const iso = /^\d{4}-\d{2}(-\d{2})?$/.test(date) ? ` datetime="${esc(date)}"` : "";
    return `
      <li class="timeline__item">
        <p class="timeline__date">${date ? `<time${iso}>${esc(formatDate(date))}</time>` : ""}</p>
        <div class="timeline__body">
          <h3>${esc(item.title)}</h3>
          ${text(item.owner) ? `<p class="timeline__org">${esc(item.owner)}</p>` : ""}
          ${text(item.summary) ? `<p class="timeline__text">${esc(item.summary)}</p>` : ""}
        </div>
        ${link && linkLabel ? `<a class="timeline__link" href="${esc(link)}" target="_blank" rel="noopener noreferrer">${linkLabel}<span class="sr-only"> (opens in a new tab)</span></a>` : ""}
      </li>`;
  };

  const renderExperience = (data) => {
    const items = (data.resume || []).filter(isActive).filter((item) => item.metric === "Experience" && text(item.title));
    const section = $("[data-about-experience-section]");
    section.hidden = items.length === 0;
    $("[data-about-experience]").innerHTML = items
      .sort((a, b) => sortKey(b.date) - sortKey(a.date))
      .map((item) => timelineItem(item, ""))
      .join("");
  };

  const renderEducation = (data) => {
    const fromResume = (data.resume || []).filter(isActive).filter((item) => item.metric === "Education");
    const items = [...(data.education || []).filter(isActive), ...fromResume]
      .filter((item) => text(item.title))
      .filter((item, index, list) => list.findIndex((other) => text(other.title) === text(item.title)) === index)
      .sort((a, b) => sortKey(b.date) - sortKey(a.date) || text(b.date).localeCompare(text(a.date)));
    if (items.length) $("[data-about-education]").innerHTML = items.map((item) => timelineItem(item, "View certificate")).join("");
  };

  const renderTools = (data) => {
    const items = (data.skills || [])
      .filter(isActive)
      .filter((item) => text(item.title))
      .sort((a, b) => Number(a.metric || 99) - Number(b.metric || 99));
    if (!items.length) return;
    fillStrip("[data-about-tools]", items
      .map((item) => {
        const icon = isPlaceholderImage(item.image)
          ? `<span class="tool__initial" aria-hidden="true">${esc(text(item.title).charAt(0))}</span>`
          : `<img src="${esc(cld(item.image, "f_auto,q_auto,w_96"))}" alt="" width="40" height="40" loading="lazy" />`;
        return `<li class="tool">${icon}<span>${esc(item.title)}</span></li>`;
      })
      .join(""));
  };

  const renderSocial = (data) => {
    const items = (data.social || []).filter(isActive).filter((item) => text(item.link) && text(item.link) !== "#");
    document.querySelectorAll("[data-social]").forEach((list) => {
      list.innerHTML = items
        .map((item) => `<li><a href="${esc(item.link)}" target="_blank" rel="noopener noreferrer">${esc(item.title)}</a></li>`)
        .join("");
      list.hidden = items.length === 0;
    });
  };

  const renderAll = () => {
    const data = getData();
    if (!data) return;
    for (const render of [renderIntro, renderPortrait, renderClients, renderExperience, renderTools, renderEducation, renderSocial]) {
      try {
        render(data);
      } catch (error) {
        console.warn("About section could not render.", error);
      }
    }
  };

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  // With cached content, render straight away. On a first visit, keep the HTML until fresh data arrives,
  // so visitors never see the template's sample content flash by.
  let hasCache = false;
  try {
    hasCache = Boolean(window.localStorage.getItem(STORAGE_KEY));
  } catch (error) {}
  if (hasCache) renderAll();
  window.addEventListener("nino-dashboard-updated", renderAll);
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) renderAll();
  });
})();
