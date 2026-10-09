/* Project case study, "Canvas" design.
 * One page serves every project: /projectdetail/<slug>/ (GitHub Pages answers it with 404.html, a copy of this page),
 * plus the old /single-project/?id=N links. Content comes from the dashboard (Firebase) through window.vienSite,
 * which index.contact-dedupe.js provides.
 */
(() => {
  const STORAGE_KEY = "nino-dashboard-content";
  const SITE = "Vien Nguyen";
  const main = document.querySelector("[data-case]");
  if (!main) return;

  const text = (value) => String(value ?? "").trim();
  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const isPublished = (item) => Boolean(item) && (item.status === "Active" || item.status === "Published");
  const lines = (value) => text(value).split("\n").map((line) => line.trim()).filter(Boolean);
  const unique = (list) => list.filter((item, index) => item && list.indexOf(item) === index);
  const isPlaceholderImage = (src) => !text(src) || /assets\/images\/(about\/me|testimonials\/author\d+|projects\/work\d+)\.jpg/.test(src);
  const isExternal = (link) => /^https?:\/\//i.test(text(link));
  const hostOf = (link) => {
    try {
      return isExternal(link) ? new URL(link).hostname.replace(/^www\./, "") : "";
    } catch (error) {
      return "";
    }
  };
  // Cloudinary resizes on the fly: smaller files for thumbnails, modern formats everywhere.
  const cld = (src, transform) => {
    const url = text(src);
    const match = url.match(/^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(v\d+\/.+)$/);
    return match ? `${match[1]}${transform}/${match[2]}` : url;
  };

  /* ---------- Data from the dashboard ---------- */
  const slugify = (project = {}) =>
    String(project.slug || project.title || project.id || "project")
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "project";
  const site = () => window.vienSite || null;
  const getData = () => {
    try {
      if (site()) return site().getData();
    } catch (error) {}
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
    } catch (error) {
      return null;
    }
  };
  const slugOf = (project) => {
    try {
      if (site()?.getProjectSlug) return site().getProjectSlug(project);
    } catch (error) {}
    return slugify(project);
  };
  const linkOf = (project) => {
    try {
      if (site()) return site().getProjectLink(project);
    } catch (error) {}
    return `/projectdetail/${slugify(project)}/`;
  };
  const detailOf = (project) => {
    try {
      if (site()?.getProjectDetail) return site().getProjectDetail(project);
    } catch (error) {}
    return { ...(project.detail || {}) };
  };

  /* ---------- Which project this address asks for ---------- */
  const path = window.location.pathname;
  const slugMatch = path.match(/\/projectdetail\/([^/]+)/i);
  const wantedSlug = slugMatch ? decodeURIComponent(slugMatch[1]).toLowerCase() : "";
  const isLegacy = /\/single-project(?:\.html|\/(?:index\.html)?)?$/i.test(path);
  const wantedId = new URLSearchParams(window.location.search).get("id");
  const isProjectRoute = /\/projectdetail(?:\/|$)/i.test(path) || isLegacy;

  const findProject = (data) => {
    const projects = Array.isArray(data?.projects) ? data.projects : [];
    if (wantedId) return projects.find((item) => String(item.id) === String(wantedId)) || null;
    if (wantedSlug) return projects.find((item) => slugOf(item) === wantedSlug) || null;
    return null;
  };
  const nextProjectAfter = (project, data) => {
    const published = (data.projects || []).filter(isPublished);
    if (published.length < 2) return null;
    const index = published.findIndex((item) => item === project || String(item.id) === String(project.id));
    return published[(index + 1) % published.length] === project ? null : published[(index + 1) % published.length];
  };

  /* ---------- Small pieces ---------- */
  const arrowIcon =
    '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>';
  const stepLink =
    '<span class="step__link" aria-hidden="true"><i></i><b></b><svg width="9" height="12" viewBox="0 0 9 12"><path d="M1.5 1.5 7 6l-5.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg></span>';
  const propsList = (rows) =>
    rows
      .filter(([, value]) => text(value))
      .map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`)
      .join("");

  const setMeta = (title, description) => {
    document.title = title;
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    if (description) document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  };

  /* ---------- Image shapes ---------- */
  // Snapshots and final screens keep their own shape: nothing is cropped to a square.
  // Each image's width / height ratio is measured when it loads and remembered, so the next visit lays out at once.
  const RATIO_KEY = "vien-image-ratios";
  const TALL = 0.4; // narrower than a phone screen, such as a full-page screenshot: shown from the top, scrolls on hover
  const WIDE = 5; // wider than this is trimmed at the sides in the grid; the viewer shows it whole
  let ratios = {};
  try {
    ratios = JSON.parse(window.localStorage.getItem(RATIO_KEY) || "{}") || {};
  } catch (error) {}
  let saveTimer = 0;
  const rememberRatio = (src, ratio) => {
    if (!src || src.length > 600 || Math.abs((ratios[src] || 0) - ratio) < 0.001) return;
    ratios[src] = Math.round(ratio * 10000) / 10000;
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(RATIO_KEY, JSON.stringify(Object.fromEntries(Object.entries(ratios).slice(-300))));
      } catch (error) {}
    }, 400);
  };
  const shapeItem = (item, ratio) => {
    if (!item || !(ratio > 0)) return;
    item.style.setProperty("--r", Math.min(WIDE, Math.max(TALL, ratio)).toFixed(4));
    item.classList.toggle("is-tall", ratio < TALL);
    // A longer image pans for longer, so the speed feels the same.
    if (ratio < TALL) item.style.setProperty("--pan", `${Math.min(8, Math.max(2.5, 0.9 / ratio)).toFixed(1)}s`);
  };
  // Where each row ends, chosen for the whole grid at once so every row lands close to the target height
  // (a greedy fill can leave one row much taller than the rest). A short last row keeps the target height
  // instead of stretching. Without this, CSS alone still gives justified rows.
  const layoutGrid = (grid) => {
    const items = [...grid.children];
    const width = grid.clientWidth;
    if (!width || items.length < 2 || grid.classList.contains("case-grid--single")) return;
    const style = getComputedStyle(grid);
    const gap = parseFloat(style.columnGap) || 0;
    const target = parseFloat(style.getPropertyValue("--row")) || 300;
    const shapes = items.map((item) => parseFloat(item.style.getPropertyValue("--r")) || 1);
    const heightOf = (from, to) => {
      let sum = 0;
      for (let index = from; index < to; index += 1) sum += shapes[index];
      return (width - gap * (to - from - 1)) / sum;
    };
    const isLooseLastRow = (height) => height > target * 1.15;
    const best = [0];
    const start = [0];
    for (let end = 1; end <= items.length; end += 1) {
      best[end] = Infinity;
      for (let from = end - 1; from >= 0; from -= 1) {
        const height = heightOf(from, end);
        if (height < target * 0.4 && end - from > 1) break; // more images would only make the row shorter
        const cost = end === items.length && isLooseLastRow(height) ? 0 : Math.log(height / target) ** 2;
        if (best[from] + cost < best[end]) {
          best[end] = best[from] + cost;
          start[end] = from;
        }
      }
    }
    const rows = [];
    for (let end = items.length; end > 0; end = start[end]) rows.unshift([start[end], end]);
    rows.forEach(([from, end], row) => {
      const loose = row === rows.length - 1 && isLooseLastRow(heightOf(from, end));
      // A short last row matches the row above it (never shorter than the target), so the grid reads as one block.
      const above = row ? heightOf(...rows[row - 1]) : target;
      const height = loose ? Math.min(heightOf(from, end), Math.max(target, above)) : heightOf(from, end);
      for (let index = from; index < end; index += 1) {
        // 1px under the exact width so the row always fits; growing in proportion fills it again exactly.
        items[index].style.setProperty("--basis", `${Math.max(0, shapes[index] * height - (loose ? 0 : 1)).toFixed(2)}px`);
        items[index].style.setProperty("--grow", loose ? "0" : String(shapes[index]));
      }
    });
    grid.classList.add("is-laid-out");
  };
  let layoutFrame = 0;
  const layoutGrids = () => {
    window.cancelAnimationFrame(layoutFrame);
    layoutFrame = window.requestAnimationFrame(() => main.querySelectorAll(".case-grid").forEach(layoutGrid));
  };
  const gridObserver = "ResizeObserver" in window ? new ResizeObserver(layoutGrids) : null;

  const shapeGrids = () => {
    main.querySelectorAll(".case-grid img[data-src]").forEach((image) => {
      const item = image.closest("li");
      const src = image.dataset.src;
      shapeItem(item, ratios[src]);
      const measure = () => {
        if (!image.naturalWidth || !image.naturalHeight) return;
        const ratio = image.naturalWidth / image.naturalHeight;
        shapeItem(item, ratio);
        rememberRatio(src, ratio);
        layoutGrids();
      };
      if (image.complete) measure();
      else image.addEventListener("load", measure, { once: true });
    });
    gridObserver?.disconnect();
    main.querySelectorAll(".case-grid").forEach((grid) => gridObserver?.observe(grid));
    layoutGrids();
  };

  /* ---------- The case study ---------- */
  let viewerImages = [];

  const renderProject = (project, data) => {
    const detail = detailOf(project);
    const title = text(project.title) || "Project";
    const summary = text(project.summary) || text(detail.overview);
    const overview = text(detail.overview);
    const tools = text(project.tags);
    const live = isExternal(project.link) ? text(project.link) : "";
    const cover = isPlaceholderImage(project.image) ? "" : text(project.image);
    const snapshots = unique([
      ...(Array.isArray(detail.researchImages) ? detail.researchImages : []),
      detail.researchImageOne,
      detail.researchImageTwo,
    ].map(text));
    const finals = unique((Array.isArray(detail.galleryImages) ? detail.galleryImages : []).map(text)).filter((src) => !snapshots.includes(src));
    const wireframe = text(detail.wireframeImage);
    const painPoints = lines(detail.painPoints);
    const did = lines(detail.responsibilities);
    const nextSteps = lines(detail.nextSteps);
    const blocks = (Array.isArray(detail.blocks) ? detail.blocks : []).filter((block) => block && (text(block.title) || text(block.text) || text(block.image)));
    const next = nextProjectAfter(project, data);

    viewerImages = [...snapshots, ...finals].map((src, index) => ({ src, alt: `${title}, image ${index + 1}` }));

    const steps = [
      ["Research", detail.research],
      ["Structure and wireframes", detail.wireframes],
      ["Visual design", detail.design],
      ["Prototype", detail.prototype],
    ].filter(([, body]) => text(body));

    const thumb = (src, index, label) => `
      <li>
        <button class="case-grid__item" type="button" data-view="${index}" aria-label="${esc(label)}">
          <img src="${esc(cld(src, "f_auto,q_auto,c_limit,w_1200,h_2400"))}" alt="" loading="lazy" decoding="async" data-src="${esc(src)}" />
        </button>
      </li>`;

    const nextCard = next
      ? (() => {
          const image = isPlaceholderImage(next.image) ? "" : text(next.image);
          const nextDetail = detailOf(next);
          const props = propsList([
            ["Year", text(nextDetail.year) || text(next.date).slice(0, 4)],
            ["Tools", text(next.tags)],
            ["Live site", hostOf(next.link)],
          ]);
          return `
      <section class="section wrap" aria-labelledby="next-title">
        <div class="section__head section__head--split">
          <h2 class="section__title" id="next-title">Next project</h2>
          <a class="btn btn--secondary btn--small" href="/projects/">All projects</a>
        </div>
        <article class="work-card work-card--large">
          <a class="frame" href="${esc(linkOf(next))}">
            ${image ? `<img class="frame__image" src="${esc(cld(image, "f_auto,q_auto,w_1400"))}" alt="" width="1200" height="1000" loading="lazy" decoding="async" />` : '<span class="frame__image" aria-hidden="true"></span>'}
            <div class="frame__caption">
              <div class="frame__text">
                <h3 class="frame__title">${esc(next.title)}</h3>
                ${text(next.summary) ? `<p class="frame__summary">${esc(next.summary)}</p>` : ""}
                ${props ? `<dl class="frame__props">${props}</dl>` : ""}
              </div>
              <span class="frame__cta">Read the case study</span>
            </div>
          </a>
        </article>
      </section>`;
        })()
      : "";

    main.innerHTML = `
      <article class="case-study">
        <header class="case-hero wrap">
          <div class="case-hero__text">
            <nav class="crumbs" aria-label="Breadcrumb">
              <ol>
                <li><a href="/projects/">Work</a></li>
                <li><span aria-current="page">${esc(title)}</span></li>
              </ol>
            </nav>
            <h1 class="case-hero__title">${esc(title)}</h1>
            ${summary ? `<p class="case-hero__lead">${esc(summary)}</p>` : ""}
          </div>
          <aside class="case-hero__panel" aria-label="Project details">
            <dl class="inspector__panel">${propsList([
              ["Role", detail.role],
              ["Services", detail.service],
              ["Tools", tools],
              ["Year", text(detail.year) || text(project.date).slice(0, 4)],
              ["Region", detail.region],
            ])}</dl>
            ${live ? `<a class="btn btn--primary case-hero__live" href="${esc(live)}" target="_blank" rel="noopener noreferrer">Visit the live site ${arrowIcon}<span class="sr-only"> (opens in a new tab)</span></a>` : ""}
          </aside>
        </header>

        ${cover ? `<figure class="case-cover wrap"><img src="${esc(cld(cover, "f_auto,q_auto,w_2000"))}" alt="${esc(title)}" width="1200" height="1000" fetchpriority="high" decoding="async" /></figure>` : ""}

        <section class="section wrap" aria-labelledby="overview-title">
          <div class="case-overview">
            <h2 class="case-overview__title" id="overview-title">Overview</h2>
            <div class="case-overview__body">
              ${overview && overview !== summary ? `<p class="case-overview__lead">${esc(overview)}</p>` : ""}
              <div class="case-overview__grid">
                ${text(detail.problem) || painPoints.length ? `
                <div>
                  <h3>The challenge</h3>
                  ${text(detail.problem) ? `<p>${esc(detail.problem)}</p>` : ""}
                  ${painPoints.length ? `<ul class="case-points" aria-label="Key pain points">${painPoints.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>` : ""}
                </div>` : ""}
                ${text(detail.goal) ? `<div><h3>The goal</h3><p>${esc(detail.goal)}</p></div>` : ""}
              </div>
              ${did.length ? `<div class="case-overview__did"><h3>What I did</h3><ul class="chips">${did.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div>` : ""}
            </div>
          </div>
        </section>

        ${snapshots.length ? `
        <section class="section wrap" aria-labelledby="snapshots-title">
          <div class="section__head">
            <h2 class="section__title" id="snapshots-title">Snapshots</h2>
            <p class="section__lead">Screens from the project. Select one to see it whole.</p>
          </div>
          <ul class="case-grid${snapshots.length === 1 ? " case-grid--single" : ""}">
            ${snapshots.map((src, index) => thumb(src, index, `Open image ${index + 1} of ${viewerImages.length}`)).join("")}
          </ul>
        </section>` : ""}

        ${steps.length ? `
        <section class="section wrap" aria-labelledby="process-title">
          <div class="section__head">
            <h2 class="section__title" id="process-title">Process</h2>
            <p class="section__lead">How the project moved from research to the final interface.</p>
          </div>
          <ol class="steps case-steps" style="--steps: ${steps.length}">
            ${steps
              .map(
                ([name, body], index) => `
            <li class="step">
              <span class="step__number">0${index + 1}</span>
              <h3>${esc(name)}</h3>
              <p>${esc(body)}</p>
              ${index < steps.length - 1 ? stepLink : ""}
            </li>`
              )
              .join("")}
          </ol>
          ${wireframe ? `<figure class="case-wide"><img src="${esc(cld(wireframe, "f_auto,q_auto,w_2000"))}" alt="${esc(title)} wireframes" loading="lazy" decoding="async" /><figcaption>Wireframes</figcaption></figure>` : ""}
        </section>` : ""}

        ${finals.length ? `
        <section class="section wrap" aria-labelledby="final-title">
          <div class="section__head">
            <h2 class="section__title" id="final-title">Final design</h2>
            <p class="section__lead">The finished screens. Select one to see it whole.</p>
          </div>
          <ul class="case-grid case-grid--large${finals.length === 1 ? " case-grid--single" : ""}">
            ${finals.map((src, index) => thumb(src, snapshots.length + index, `Open image ${snapshots.length + index + 1} of ${viewerImages.length}`)).join("")}
          </ul>
        </section>` : ""}

        ${blocks.length ? `
        <section class="section wrap" aria-label="More about the project">
          <div class="case-blocks">
            ${blocks
              .map((block) =>
                block.type === "image" && text(block.image)
                  ? `<figure class="case-block case-block--image"><img src="${esc(cld(block.image, "f_auto,q_auto,w_2000"))}" alt="${esc(text(block.title) || title)}" loading="lazy" decoding="async" />${text(block.title) || text(block.text) ? `<figcaption>${text(block.title) ? `<strong>${esc(block.title)}</strong>` : ""}${text(block.text) ? `<span>${esc(block.text)}</span>` : ""}</figcaption>` : ""}</figure>`
                  : `<div class="case-block">${text(block.title) ? `<h3>${esc(block.title)}</h3>` : ""}${text(block.text) ? `<p>${esc(block.text)}</p>` : ""}${text(block.image) ? `<img src="${esc(cld(block.image, "f_auto,q_auto,w_2000"))}" alt="" loading="lazy" decoding="async" />` : ""}</div>`
              )
              .join("")}
          </div>
        </section>` : ""}

        ${text(detail.impact) || text(detail.learned) || nextSteps.length ? `
        <section class="section wrap" aria-labelledby="outcome-title">
          <div class="case-outcome">
            <h2 class="case-outcome__label" id="outcome-title">Outcome</h2>
            ${text(detail.impact) ? `<p class="case-outcome__statement">${esc(detail.impact)}</p>` : ""}
            <div class="case-outcome__grid">
              ${text(detail.learned) ? `<div><h3>What I learned</h3><p>${esc(detail.learned)}</p></div>` : ""}
              ${nextSteps.length ? `<div><h3>Next steps</h3><ul>${nextSteps.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div>` : ""}
            </div>
          </div>
        </section>` : ""}

        ${nextCard}
      </article>`;

    shapeGrids();
    main.removeAttribute("aria-busy");
    setMeta(`${title} – ${SITE}`, summary);
    // Old /single-project/?id=N links move to the project's own address.
    if (isLegacy) window.history.replaceState(null, "", linkOf(project));
  };

  const MISSING = {
    page: {
      label: "404",
      title: "This page isn’t here.",
      lead: "The address may be mistyped, or the page has moved.",
      meta: "Page not found",
    },
    project: {
      label: "Case study",
      title: "This project isn’t here.",
      lead: "It may have been renamed or taken down. The rest of the work is one click away.",
      meta: "Project not found",
    },
    offline: {
      label: "Case study",
      title: "This case study didn’t load.",
      lead: "The connection may have dropped. Try again in a moment.",
      meta: "Case study",
    },
  };
  const renderMissing = (kind) => {
    const copy = MISSING[kind];
    main.innerHTML = `
      <section class="case-missing wrap" aria-labelledby="missing-title">
        <p class="case-missing__code">${copy.label}</p>
        <h1 class="case-missing__title" id="missing-title">${copy.title}</h1>
        <p class="case-missing__lead">${copy.lead}</p>
        <div class="case-missing__actions">
          ${kind === "offline"
            ? '<button class="btn btn--primary" type="button" data-retry>Try again</button><a class="btn btn--secondary" href="/projects/">See all projects</a>'
            : '<a class="btn btn--primary" href="/projects/">See all projects</a><a class="btn btn--secondary" href="/">Back to the homepage</a>'}
        </div>
      </section>`;
    main.querySelector("[data-retry]")?.addEventListener("click", () => window.location.reload());
    main.removeAttribute("aria-busy");
    setMeta(`${copy.meta} – ${SITE}`);
  };

  const renderSocial = (data) => {
    const items = (data?.social || []).filter(isPublished).filter((item) => text(item.link) && text(item.link) !== "#");
    document.querySelectorAll("[data-social]").forEach((list) => {
      list.innerHTML = items
        .map((item) => `<li><a href="${esc(item.link)}" target="_blank" rel="noopener noreferrer">${esc(item.title)}</a></li>`)
        .join("");
      list.hidden = items.length === 0;
    });
  };
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  /* ---------- Image viewer ---------- */
  const viewer = document.querySelector("[data-viewer]");
  const viewerImage = viewer?.querySelector("[data-viewer-image]");
  const viewerStage = viewer?.querySelector("[data-viewer-stage]");
  const viewerCount = viewer?.querySelector("[data-viewer-count]");
  const VIEWER_SIZE = "f_auto,q_auto,c_limit,w_2000";
  // A tall image (a full-page screenshot) opens at reading width and scrolls, instead of shrinking to fit the screen.
  const setTall = (ratio) => viewer?.classList.toggle("viewer--tall", Boolean(viewerStage) && ratio > 0 && ratio < TALL);
  viewerImage?.addEventListener("load", () => {
    if (!viewerImage.naturalWidth) return;
    const ratio = viewerImage.naturalWidth / viewerImage.naturalHeight;
    setTall(ratio);
    rememberRatio(viewerImages[current]?.src, ratio);
  });
  let current = 0;
  let opener = null;
  const preload = (index) => {
    const item = viewerImages[(index + viewerImages.length) % viewerImages.length];
    if (item) new Image().src = cld(item.src, VIEWER_SIZE);
  };
  const show = (index) => {
    if (!viewerImages.length || !viewerImage) return;
    current = (index + viewerImages.length) % viewerImages.length;
    const item = viewerImages[current];
    setTall(ratios[item.src] || 0);
    if (viewerStage) viewerStage.scrollTop = 0;
    viewerImage.src = cld(item.src, VIEWER_SIZE);
    viewerImage.alt = item.alt;
    viewerCount.textContent = `${current + 1} / ${viewerImages.length}`;
    viewer.classList.toggle("viewer--single", viewerImages.length < 2);
    preload(current + 1);
    preload(current - 1);
  };
  const openViewer = (index, trigger) => {
    if (!viewer || typeof viewer.showModal !== "function") {
      const item = viewerImages[index];
      if (item) window.open(item.src, "_blank", "noopener");
      return;
    }
    opener = trigger || null;
    show(index);
    viewer.showModal();
  };
  main.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-view]");
    if (trigger) openViewer(Number(trigger.dataset.view), trigger);
  });
  viewer?.querySelector("[data-viewer-close]")?.addEventListener("click", () => viewer.close());
  viewer?.querySelector("[data-viewer-prev]")?.addEventListener("click", () => show(current - 1));
  viewer?.querySelector("[data-viewer-next]")?.addEventListener("click", () => show(current + 1));
  viewer?.addEventListener("click", (event) => {
    if (event.target === viewer) viewer.close(); // a click on the dimmed backdrop
  });
  viewer?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });
  viewer?.addEventListener("close", () => {
    viewerImage.removeAttribute("src");
    opener?.focus();
  });

  /* ---------- When to draw ---------- */
  let lastSignature = "";
  let settled = false;
  // mode: "cache" (saved content, drawn at once), "fresh" (the content service answered), "timeout" (it never did).
  const draw = (mode) => {
    const data = getData();
    const project = data ? findProject(data) : null;
    if (project) {
      const next = nextProjectAfter(project, data);
      const signature = JSON.stringify([project, next && [next.title, next.image, next.summary, next.tags, next.link]]);
      if (signature !== lastSignature) {
        lastSignature = signature;
        renderProject(project, data);
      }
      settled = true;
    } else if (mode !== "cache" && !lastSignature) {
      renderMissing(mode === "fresh" ? "project" : "offline");
      settled = true;
    }
    renderSocial(data);
  };

  if (!isProjectRoute) {
    renderMissing("page");
  } else if (!wantedSlug && !wantedId) {
    renderMissing("project");
  } else {
    let hasCache = false;
    try {
      hasCache = Boolean(window.localStorage.getItem(STORAGE_KEY));
    } catch (error) {}
    // Cached content draws at once; a first visit waits for fresh content so the built-in sample data never shows.
    const start = () => {
      if (hasCache) draw("cache");
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
    else start();
    window.addEventListener("nino-dashboard-updated", () => draw("fresh"));
    window.addEventListener("storage", (event) => {
      if (event.key === STORAGE_KEY) draw("cache");
    });
    // If the content service never answers, decide with what we have.
    window.setTimeout(() => {
      if (!settled) draw("timeout");
    }, 8000);
  }
})();
