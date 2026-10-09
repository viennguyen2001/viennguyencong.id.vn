/* Continuous scrolling strip ("marquee"), shared by the homepage and the About page.
 *
 * Markup: <div class="marquee" data-marquee><ul class="marquee__track"> …items… </ul></div>
 * The items written in the HTML (or passed to vienMarquee.setItems) are the real list. The script repeats them
 * until one half of the track is wider than the strip, then adds a second identical half, so moving the track
 * by half its width loops without a seam. Copies are hidden from screen readers and from the keyboard.
 * With "reduce motion" on, nothing moves: the strip shows the list once and wraps it.
 */
(() => {
  const SPEED = 36; // pixels per second
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const sources = new WeakMap();
  const widths = new WeakMap();

  const hideCopy = (node) => {
    node.setAttribute("aria-hidden", "true");
    node.querySelectorAll("a, button, [tabindex]").forEach((el) => el.setAttribute("tabindex", "-1"));
    node.querySelectorAll("img").forEach((img) => img.setAttribute("alt", ""));
    return node;
  };

  const build = (root) => {
    const track = root.querySelector(".marquee__track");
    const source = sources.get(root);
    if (!track || source == null) return;
    track.innerHTML = source;
    root.classList.remove("is-running");
    root.style.removeProperty("--marquee-duration");
    widths.set(root, root.clientWidth);
    const items = Array.from(track.children);
    if (!items.length || reduceMotion.matches) return;

    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    root.classList.add("is-measuring"); // one row, as wide as its items
    const setWidth = track.getBoundingClientRect().width;
    root.classList.remove("is-measuring");
    if (!setWidth) return;
    const copies = Math.max(1, Math.ceil((root.clientWidth + gap) / (setWidth + gap)));
    for (let copy = 1; copy < copies * 2; copy += 1) {
      items.forEach((item) => track.appendChild(hideCopy(item.cloneNode(true))));
    }
    root.style.setProperty("--marquee-duration", `${((copies * (setWidth + gap)) / SPEED).toFixed(2)}s`);
    root.classList.add("is-running");
  };

  // Images change the width once they load, so measure again when they do.
  const whenImagesLoad = (root) => {
    const pending = Array.from(root.querySelectorAll(".marquee__track img")).filter((img) => !img.complete);
    if (!pending.length) return;
    let waiting = pending.length;
    const done = () => {
      waiting -= 1;
      if (waiting === 0) build(root);
    };
    pending.forEach((img) => {
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
    });
  };

  // What the list shows (images and text), so rewriting the same items does not restart the strip.
  const signatures = new WeakMap();
  const signatureOf = (html) => {
    const template = document.createElement("template");
    template.innerHTML = html;
    const images = Array.from(template.content.querySelectorAll("img"), (img) => img.getAttribute("src")).join("|");
    return `${images}#${template.content.textContent.replace(/\s+/g, " ").trim()}`;
  };

  const setItems = (root, html) => {
    if (!root) return;
    const signature = signatureOf(html);
    if (signatures.get(root) === signature) return;
    signatures.set(root, signature);
    sources.set(root, html);
    build(root);
    whenImagesLoad(root);
  };

  const resizeObserver =
    "ResizeObserver" in window
      ? new ResizeObserver((entries) => {
          for (const entry of entries) {
            const root = entry.target;
            if (Math.abs((widths.get(root) || 0) - root.clientWidth) > 1) build(root);
          }
        })
      : null;

  const init = () => {
    document.querySelectorAll("[data-marquee]").forEach((root) => {
      const track = root.querySelector(".marquee__track");
      if (!track || sources.has(root)) return;
      setItems(root, track.innerHTML);
      resizeObserver?.observe(root);
    });
  };

  reduceMotion.addEventListener?.("change", () => document.querySelectorAll("[data-marquee]").forEach(build));
  window.vienMarquee = { setItems, init };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
