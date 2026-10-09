/* All projects and Education pages, "Canvas" design.
 * Content comes from the dashboard (Firebase) through window.vienSite, which index.contact-dedupe.js provides.
 * Saved content draws at once; a first visit waits for fresh content, so the built-in sample data never shows.
 */
(() => {
  const STORAGE_KEY = "nino-dashboard-content";
  const $ = (selector) => document.querySelector(selector);
  const text = (value) => String(value ?? "").trim();
  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const isPublished = (item) => Boolean(item) && (item.status === "Active" || item.status === "Published");
  const isExternal = (link) => /^https?:\/\//i.test(text(link));
  const isPlaceholderImage = (src) => !text(src) || /assets\/images\/(projects\/work\d+|testimonials\/author\d*)\.jpg/.test(src);
  const cld = (src, transform) => {
    const match = text(src).match(/^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(v\d+\/.+)$/);
    return match ? `${match[1]}${transform}/${match[2]}` : text(src);
  };
  const slugify = (project = {}) =>
    String(project.slug || project.title || project.id || "project")
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "project";
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
  const linkOf = (project) => {
    try {
      if (window.vienSite) return window.vienSite.getProjectLink(project);
    } catch (error) {}
    return `/projectdetail/${slugify(project)}/`;
  };

  /* ---------- All projects ---------- */
  const grid = $("[data-project-grid]");
  const count = $("[data-project-count]");

  const projectCard = (project) => {
    const detail = project.detail || {};
    const image = isPlaceholderImage(project.image) ? "" : text(project.image);
    const meta = [text(detail.service), text(detail.year) || text(project.date).slice(0, 4)].filter(Boolean);
    return `
      <article class="work-card">
        <a class="frame" href="${esc(linkOf(project))}">
          ${image ? `<img class="frame__image" src="${esc(cld(image, "f_auto,q_auto,w_1400"))}" alt="" width="1200" height="1000" loading="lazy" decoding="async" />` : '<span class="frame__image" aria-hidden="true"></span>'}
          <div class="frame__caption">
            <div class="frame__text">
              <h2 class="frame__title">${esc(project.title)}</h2>
              ${text(project.summary) ? `<p class="frame__summary">${esc(project.summary)}</p>` : ""}
              ${meta.length ? `<p class="frame__meta">${meta.map((item) => `<span>${esc(item)}</span>`).join("")}</p>` : ""}
            </div>
            <span class="frame__cta">Read the case study</span>
          </div>
        </a>
      </article>`;
  };

  const renderState = (kind) => {
    const offline = kind === "offline";
    grid.outerHTML = `
      <div class="page-state" data-project-grid>
        <h2>${offline ? "The projects didn’t load." : "No projects yet."}</h2>
        <p>${offline ? "The connection may have dropped. Try again in a moment." : "New case studies will appear here soon."}</p>
        <div class="page-state__actions">
          ${offline ? '<button class="btn btn--primary" type="button" data-retry>Try again</button>' : ""}
          <a class="btn btn--secondary" href="/">Back to the homepage</a>
        </div>
      </div>`;
    $("[data-retry]")?.addEventListener("click", () => window.location.reload());
    if (count) count.textContent = "";
  };

  let lastProjects = "";
  const renderProjects = (mode) => {
    if (!$("[data-project-grid]")) return;
    // Without saved or fresh content, getData() would return the built-in samples: never show those.
    if (mode === "timeout") {
      if (!lastProjects) renderState("offline");
      return;
    }
    const data = getData();
    const projects = (data?.projects || []).filter(isPublished).filter((project) => text(project.title));
    if (!projects.length) {
      if (mode === "fresh") renderState("empty");
      return;
    }
    const html = projects.map(projectCard).join("");
    if (html === lastProjects) return;
    lastProjects = html;
    const target = $("[data-project-grid]");
    if (!target.classList.contains("project-grid")) {
      target.outerHTML = '<div class="project-grid" data-project-grid aria-live="polite"></div>';
    }
    $("[data-project-grid]").innerHTML = html;
    $("[data-project-grid]").removeAttribute("aria-busy");
    if (count) count.textContent = `${projects.length} project${projects.length === 1 ? "" : "s"}`;
  };

  /* ---------- Education ---------- */
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const formatDate = (value) => {
    const match = text(value).match(/^(\d{4})-(\d{2})(?:-\d{2})?$/);
    return match ? `${MONTHS[Number(match[2]) - 1] || ""} ${match[1]}`.trim() : text(value);
  };
  const sortKey = (value) => {
    const years = text(value).match(/\d{4}/g);
    return years ? Math.max(...years.map(Number)) + (/present|now/i.test(value) ? 1 : 0) : 0;
  };
  const educationItem = (item) => {
    const certificate = text(item.certificateLink) || (isExternal(item.link) ? text(item.link) : "");
    const image = text(item.certificateImage) || (isPlaceholderImage(item.image) ? "" : text(item.image));
    const date = text(item.date);
    const iso = /^\d{4}-\d{2}(-\d{2})?$/.test(date) ? ` datetime="${esc(date)}"` : "";
    const links = [
      certificate ? `<a class="timeline__link" href="${esc(certificate)}" target="_blank" rel="noopener noreferrer">View certificate<span class="sr-only"> (opens in a new tab)</span></a>` : "",
      image ? `<a class="timeline__link" href="${esc(image)}" target="_blank" rel="noopener noreferrer">View image<span class="sr-only"> (opens in a new tab)</span></a>` : "",
    ].filter(Boolean);
    return `
      <li class="timeline__item">
        <p class="timeline__date">${date ? `<time${iso}>${esc(formatDate(date))}</time>` : ""}</p>
        <div class="timeline__body">
          <h2>${esc(item.title)}</h2>
          ${text(item.owner) ? `<p class="timeline__org">${esc(item.owner)}</p>` : ""}
          ${text(item.summary) ? `<p class="timeline__text">${esc(item.summary)}</p>` : ""}
        </div>
        ${links.length ? `<div class="timeline__links">${links.join("")}</div>` : ""}
      </li>`;
  };
  let lastEducation = "";
  const renderEducation = () => {
    const list = $("[data-education-list]");
    if (!list) return;
    const data = getData();
    const fromResume = (data?.resume || []).filter(isPublished).filter((item) => item.metric === "Education");
    const items = [...(data?.education || []).filter(isPublished), ...fromResume]
      .filter((item) => text(item.title))
      .filter((item, index, all) => all.findIndex((other) => text(other.title) === text(item.title)) === index)
      .sort((a, b) => sortKey(b.date) - sortKey(a.date) || text(b.date).localeCompare(text(a.date)));
    if (!items.length) return;
    const html = items.map(educationItem).join("");
    if (html === lastEducation) return;
    lastEducation = html;
    list.innerHTML = html;
  };

  /* ---------- Footer ---------- */
  const renderSocial = (data) => {
    const items = (data?.social || []).filter(isPublished).filter((item) => text(item.link) && text(item.link) !== "#");
    if (!items.length) return;
    document.querySelectorAll("[data-social]").forEach((list) => {
      list.innerHTML = items
        .map((item) => `<li><a href="${esc(item.link)}" target="_blank" rel="noopener noreferrer">${esc(item.title)}</a></li>`)
        .join("");
      list.hidden = false;
    });
  };
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  /* ---------- When to draw ---------- */
  let settled = false;
  const draw = (mode) => {
    renderProjects(mode);
    if (mode !== "timeout") {
      renderEducation();
      renderSocial(getData());
    }
    if (mode !== "cache" || lastProjects || !$("[data-project-grid]")) settled = true;
  };
  let hasCache = false;
  try {
    hasCache = Boolean(window.localStorage.getItem(STORAGE_KEY));
  } catch (error) {}
  if (hasCache) draw("cache");
  window.addEventListener("nino-dashboard-updated", () => draw("fresh"));
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) draw("cache");
  });
  // If the content service never answers on a first visit, say so instead of waiting forever.
  window.setTimeout(() => {
    if (!settled) draw("timeout");
  }, 8000);
})();
