/*
  The live preview: the template's own page.njk, rendered in the browser with
  Nunjucks, the same way the automation will render it. Nothing in the design
  is changed; the preview only feeds it different data (placeholders first,
  then whatever the agent types).

  The sheet is 630 x 810 pt with bleed (840 x 1080 CSS px). Like sample.png,
  the preview shows the trim only: 816 x 1056 px, offset by the 12 px bleed.
*/

const SHEET = { w: 840, h: 1080, bleed: 12 };
const TRIM = { w: SHEET.w - 2 * SHEET.bleed, h: SHEET.h - 2 * SHEET.bleed };

const njk = new nunjucks.Environment(null, { autoescape: true });
const sourceCache = {};

function templateFolder(t) {
  return `design/products/${t.product}/${t.id}/`;
}

async function loadSource(t) {
  if (!sourceCache[t.id]) {
    const res = await fetch(templateFolder(t) + "page.njk");
    if (!res.ok) throw new Error(`Couldn't load ${t.id}/page.njk (${res.status})`);
    sourceCache[t.id] = await res.text();
  }
  return sourceCache[t.id];
}

class LivePreview {
  constructor(host, template) {
    this.host = host;
    this.template = template;
    this.frame = host.querySelector("iframe");
    this.stage = host.querySelector(".sheet__stage");
    this.ready = false;
    this.pending = null;
    this.observer = new ResizeObserver(() => this.fit());
    this.observer.observe(host);
  }

  async start(flyer) {
    this.source = await loadSource(this.template);
    const html = this.html(flyer);
    const base = `<base href="${absUrl(templateFolder(this.template))}">`;
    const frameCss = "<style>html,body{margin:0;overflow:hidden;background:transparent}</style>";
    await new Promise((resolve) => {
      this.frame.addEventListener("load", resolve, { once: true });
      this.frame.srcdoc = html.replace(/<head>/i, `<head>${base}`).replace(/<\/head>/i, `${frameCss}</head>`);
    });
    const doc = this.frame.contentDocument;
    if (doc && doc.fonts) await doc.fonts.ready;
    this.ready = true;
    this.host.classList.add("is-live");
    if (this.pending) this.update(this.pending);
  }

  html(flyer) {
    return njk.renderString(this.source, { flyer });
  }

  /* Swap the body only, so the stylesheet and fonts stay loaded and the
     page doesn't flash while someone types. */
  update(flyer) {
    if (!this.ready) {
      this.pending = flyer;
      return;
    }
    this.pending = null;
    const next = new DOMParser().parseFromString(this.html(flyer), "text/html");
    const doc = this.frame.contentDocument;
    if (!doc) return;
    doc.body.className = next.body.className;
    doc.body.innerHTML = next.body.innerHTML;
  }

  fit() {
    const box = this.host.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const scale = Math.min(box.width / TRIM.w, box.height / TRIM.h);
    this.stage.style.setProperty("--scale", scale.toFixed(4));
  }

  destroy() {
    this.observer.disconnect();
  }
}
