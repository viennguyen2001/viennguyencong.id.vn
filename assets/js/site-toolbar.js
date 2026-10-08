/* Site menu behaviour, shared by every public page: the small-screen menu and marking the page you are on. */
(() => {
  const init = () => {
    const bar = document.querySelector("[data-site-toolbar]");
    if (!bar) return;
    const menu = bar.querySelector("[data-menu]");
    const toggle = bar.querySelector("[data-menu-toggle]");

    const isOpen = () => toggle?.getAttribute("aria-expanded") === "true";
    const setMenu = (open) => {
      if (!menu || !toggle) return;
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
    };
    toggle?.addEventListener("click", () => setMenu(!isOpen()));
    menu?.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("click", (event) => {
      if (isOpen() && !event.target.closest("[data-site-toolbar]")) setMenu(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isOpen()) {
        setMenu(false);
        toggle.focus();
      }
    });

    // "/about.html" and "/about/index.html" count as "/about/".
    const here = window.location.pathname.replace(/index\.html$/, "").replace(/\.html$/, "/");
    bar.querySelectorAll("a[data-match]").forEach((link) => {
      const paths = link.dataset.match.split(/\s+/).filter(Boolean);
      if (paths.some((path) => here.startsWith(path))) link.setAttribute("aria-current", "page");
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
