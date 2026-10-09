/* Homepage, "Canvas" design.
 * Content comes from the dashboard (Firebase) through window.vienSite, which index.contact-dedupe.js provides.
 * The HTML already contains the current content, so the page reads correctly before data arrives or without JS.
 */
(() => {
  const STORAGE_KEY = "nino-dashboard-content";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const text = (value) => String(value ?? "").trim();
  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const isPublished = (item) => Boolean(item) && (item.status === "Active" || item.status === "Published");

  /* ---------- Highlight the section in view ---------- */
  const spyLinks = $$("[data-spy]");
  if (spyLinks.length && "IntersectionObserver" in window) {
    const byId = new Map(spyLinks.map((link) => [link.dataset.spy, link]));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          spyLinks.forEach((link) => link.removeAttribute("aria-current"));
          byId.get(entry.target.id)?.setAttribute("aria-current", "true");
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    byId.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    const hero = $(".hero");
    if (hero) {
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) spyLinks.forEach((link) => link.removeAttribute("aria-current"));
      }, { rootMargin: "-45% 0px -50% 0px" }).observe(hero);
    }
  }

  $$("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  /* ---------- Content from the dashboard ---------- */
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
  const projectLink = (project) => {
    try {
      if (window.vienSite) return window.vienSite.getProjectLink(project);
    } catch (error) {}
    return `/projectdetail/${slugify(project)}/`;
  };
  // "ĐỖ THANH TUẤN" → "Đỗ Thanh Tuấn"; names already in mixed case are left alone.
  const displayName = (name) => {
    const value = text(name);
    if (!value || value !== value.toLocaleUpperCase("vi")) return value;
    return value
      .toLocaleLowerCase("vi")
      .split(/\s+/)
      .map((word) => word.charAt(0).toLocaleUpperCase("vi") + word.slice(1))
      .join(" ");
  };
  const initials = (name) =>
    displayName(name)
      .replace(/^(mr|mrs|ms|dr)\.?\s+/i, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(-2)
      .map((word) => word.charAt(0))
      .join("")
      .toLocaleUpperCase("vi");
  const isPlaceholderImage = (src) => !text(src) || /assets\/images\/(about\/me|testimonials\/author\d+|projects\/work\d+)\.jpg/.test(src);

  const renderHero = (data) => {
    const hero = (data.hero || [])[0];
    if (!hero) return;
    if (text(hero.owner)) $("[data-hero-intro]").textContent = text(hero.owner);
    const image = $("[data-hero-image]");
    if (image && !isPlaceholderImage(hero.image) && image.getAttribute("src") !== hero.image) image.src = hero.image;
  };

  // Company logos from the dashboard, on a strip that keeps moving (marquee.js). A company without a logo shows its name.
  const cld = (src, transform) => {
    const match = text(src).match(/^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(v\d+\/.+)$/);
    return match ? `${match[1]}${transform}/${match[2]}` : text(src);
  };
  const logoTile = (company) => {
    const image = text(company.image);
    const hasLogo = image && !/assets\/images\/client-logos\//.test(image);
    return hasLogo
      ? `<li class="logo-tile"><img src="${esc(cld(image, "f_auto,q_auto,h_72"))}" alt="${esc(company.title)}" height="36" decoding="async" /></li>`
      : `<li class="logo-tile"><span class="logo-tile__name">${esc(company.title)}</span></li>`;
  };
  const renderClients = (data) => {
    const companies = (data.companies || [])
      .filter(isPublished)
      .filter((company) => text(company.title) && !/^partner \d+$/i.test(text(company.title)));
    if (!companies.length) return;
    const list = $("[data-clients]");
    const html = companies.map(logoTile).join("");
    if (window.vienMarquee) window.vienMarquee.setItems(list.closest("[data-marquee]"), html);
    else list.innerHTML = html;
  };

  // Starred projects first; otherwise the first three published ones, in dashboard order.
  const pickProjects = (data) => {
    const published = (data.projects || []).filter(isPublished);
    const featured = published.filter((project) => project.featured === true);
    return (featured.length ? featured : published).slice(0, 3);
  };
  const projectMeta = (project) => {
    const detail = project.detail || {};
    const service = text(detail.service) && text(detail.service) !== text(project.tags) ? text(detail.service) : "";
    const year = text(detail.year) || text(project.date).slice(0, 4);
    return [service, year].filter(Boolean);
  };
  const hostOf = (link) => {
    try {
      return /^https?:\/\//i.test(text(link)) ? new URL(link).hostname.replace(/^www\./, "") : "";
    } catch (error) {
      return "";
    }
  };
  // The large card has room for a few properties, shown like an inspector panel.
  const projectProps = (project) => {
    const detail = project.detail || {};
    return [
      ["Year", text(detail.year) || text(project.date).slice(0, 4)],
      ["Tools", text(project.tags)],
      ["Live site", hostOf(project.link)],
    ].filter(([, value]) => value);
  };
  const workCard = (project, large) => {
    const meta = projectMeta(project);
    const props = large ? projectProps(project) : [];
    const image = isPlaceholderImage(project.image) ? "" : text(project.image);
    return `
      <article class="work-card${large ? " work-card--large" : ""}">
        <a class="frame" href="${esc(projectLink(project))}">
          ${image ? `<img class="frame__image" src="${esc(image)}" alt="" width="1200" height="1000" loading="lazy" decoding="async" />` : `<span class="frame__image" aria-hidden="true"></span>`}
          <div class="frame__caption">
            <div class="frame__text">
              <h3 class="frame__title">${esc(project.title)}</h3>
              ${text(project.summary) ? `<p class="frame__summary">${esc(project.summary)}</p>` : ""}
              ${props.length
                ? `<dl class="frame__props">${props.map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join("")}</dl>`
                : meta.length ? `<p class="frame__meta">${meta.map((item) => `<span>${esc(item)}</span>`).join("")}</p>` : ""}
            </div>
            <span class="frame__cta">Read the case study</span>
          </div>
        </a>
      </article>`;
  };
  const renderWork = (data) => {
    const projects = pickProjects(data);
    if (!projects.length) return;
    const [first, ...rest] = projects;
    $("[data-work]").innerHTML =
      workCard(first, true) + (rest.length ? `<div class="work__pair">${rest.map((project) => workCard(project, false)).join("")}</div>` : "");
  };

  const renderAbout = (data) => {
    const about = (data.about || [])[0];
    if (!about) return;
    if (text(about.title)) $("[data-about-title]").textContent = text(about.title);
    if (text(about.owner)) $("[data-about-text]").textContent = text(about.owner);
    const detail = about.detail || {};
    const rows = [
      [detail.yearsLabel || "Years Experience", detail.years],
      [detail.projectsLabel || "Projects Completed", detail.projects],
      [detail.satisfactionLabel || "Client Satisfaction", detail.satisfaction],
    ].filter(([, value]) => text(value));
    rows.push(["Based in", "Vietnam"], ["Availability", "Open to new projects"]);
    $("[data-properties]").innerHTML = rows.map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join("");
  };

  const AVATAR_COLOURS = ["#2f6bff", "#7a1020", "#1f7a46", "#8a5a00"];
  const renderComments = (data) => {
    const items = (data.testimonials || []).filter(isPublished).slice(0, 4);
    if (!items.length) return;
    $("[data-comments]").innerHTML = items
      .map((item, index) => {
        const avatar = isPlaceholderImage(item.image)
          ? `<span class="comment__avatar comment__initials" style="background:${AVATAR_COLOURS[index % AVATAR_COLOURS.length]}" aria-hidden="true">${esc(initials(item.owner))}</span>`
          : `<img class="comment__avatar" src="${esc(item.image)}" alt="" width="40" height="40" loading="lazy" />`;
        return `
          <li class="comment">
            ${avatar}
            <figure class="comment__bubble">
              <figcaption><strong>${esc(displayName(item.owner))}</strong> <span>${esc(item.title)}</span></figcaption>
              <blockquote>${esc(item.summary)}</blockquote>
            </figure>
          </li>`;
      })
      .join("");
  };

  // Icons available in social-icons.woff2 (see canvas-base.css). The dashboard stores an icon class per link;
  // when it is not one of these, the icon follows the link's address.
  const SOCIAL_ICONS = new Set(["facebook-circle-fill", "facebook-circle-line", "facebook-fill", "facebook-line", "instagram-fill", "instagram-line", "tiktok-fill", "tiktok-line", "linkedin-fill", "linkedin-line", "linkedin-box-fill", "linkedin-box-line", "github-fill", "github-line", "behance-fill", "behance-line", "dribbble-fill", "dribbble-line", "youtube-fill", "youtube-line", "twitter-x-fill", "twitter-x-line", "threads-fill", "threads-line", "pinterest-fill", "pinterest-line", "telegram-fill", "telegram-line", "whatsapp-fill", "whatsapp-line", "discord-fill", "discord-line", "medium-fill", "medium-line", "messenger-fill", "messenger-line", "global-line", "global-fill", "mail-line", "mail-fill", "link"]);
  const SOCIAL_BY_HOST = [
    [/facebook\.com|fb\.com/, "facebook-circle-fill"], [/instagram\.com/, "instagram-line"], [/tiktok\.com/, "tiktok-fill"],
    [/linkedin\.com/, "linkedin-fill"], [/github\.com/, "github-line"], [/behance\.net/, "behance-line"],
    [/dribbble\.com/, "dribbble-line"], [/youtube\.com|youtu\.be/, "youtube-fill"], [/(^|\.)x\.com|twitter\.com/, "twitter-x-line"],
    [/threads\.net/, "threads-line"], [/pinterest\./, "pinterest-line"], [/t\.me|telegram\./, "telegram-line"],
    [/wa\.me|whatsapp\./, "whatsapp-line"], [/discord\./, "discord-fill"], [/medium\.com/, "medium-fill"], [/m\.me|messenger\.com/, "messenger-line"],
  ];
  const socialIcon = (item) => {
    const own = text(item.owner).replace(/^ri-/, "");
    if (SOCIAL_ICONS.has(own)) return `ri-${own}`;
    if (/^mailto:/i.test(text(item.link))) return "ri-mail-line";
    let host = "";
    try {
      host = new URL(text(item.link)).hostname.replace(/^www\./, "");
    } catch (error) {}
    const match = SOCIAL_BY_HOST.find(([pattern]) => pattern.test(host));
    return `ri-${match ? match[1] : "global-line"}`;
  };
  const renderSocial = (data) => {
    const items = (data.social || []).filter(isPublished).filter((item) => text(item.link) && text(item.link) !== "#");
    $$("[data-social]").forEach((list) => {
      const asIcons = list.dataset.social === "icons";
      list.innerHTML = items
        .map((item) =>
          asIcons
            ? `<li><a href="${esc(item.link)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(item.title)}" title="${esc(item.title)}"><i class="social-icon ${socialIcon(item)}" aria-hidden="true"></i></a></li>`
            : `<li><a href="${esc(item.link)}" target="_blank" rel="noopener noreferrer">${esc(item.title)}</a></li>`
        )
        .join("");
      list.hidden = items.length === 0;
    });
  };

  const renderAll = () => {
    const data = getData();
    if (!data) return;
    for (const render of [renderHero, renderClients, renderWork, renderAbout, renderComments, renderSocial]) {
      try {
        render(data);
      } catch (error) {
        console.warn("Homepage section could not render.", error);
      }
    }
  };

  // With cached content, render straight away. On a first visit, keep the HTML until fresh data arrives,
  // so visitors never see the built-in sample content flash by.
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
