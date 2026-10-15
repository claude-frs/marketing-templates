/* The browsing views: every product, then one product's designs. */

/* A drawing of the format, to scale, for products that have no designs yet. */
function formatDrawing(p) {
  const [w, h] = p.aspect;
  const box = 150;
  const s = box / Math.max(w, h);
  const W = w * s;
  const H = h * s;
  const x = (200 - W) / 2;
  const y = (180 - H) / 2;
  let extra = "";
  if (p.sides === 2 && !p.folds) {
    extra += `<rect class="fmt__back" x="${x + 12}" y="${y - 10}" width="${W}" height="${H}" rx="3"/>`;
  }
  let inner = "";
  if (p.cutout) {
    const r = W * 0.22;
    inner += `<circle class="fmt__line" cx="${x + W / 2}" cy="${y + r * 1.6}" r="${r}"/>`;
    inner += `<path class="fmt__line" d="M${x + W / 2} ${y + r * 0.6 + r} L${x + W / 2} ${y}"/>`;
  }
  if (p.folds) {
    for (let i = 1; i < p.folds; i++) {
      inner += `<line class="fmt__fold" x1="${x + (W / p.folds) * i}" y1="${y}" x2="${x + (W / p.folds) * i}" y2="${y + H}"/>`;
    }
  }
  if (p.medium === "screen") {
    inner += `<rect class="fmt__line" x="${x + W * 0.1}" y="${y + H * 0.1}" width="${W * 0.8}" height="${H * 0.5}" rx="2"/>`;
  }
  return `<svg class="fmt" viewBox="0 0 200 180" aria-hidden="true">${extra}
    <rect class="fmt__front" x="${x}" y="${y}" width="${W}" height="${H}" rx="3"/>${inner}</svg>`;
}

function productCard(p, i) {
  const designs = templatesFor(p.id);
  const has = designs.length > 0;
  const meta = [p.size, p.medium === "screen" ? "Digital" : "Print", p.sides === 2 ? "Two-sided" : ""]
    .filter(Boolean).join(" · ");
  let art;
  if (has) {
    const shown = designs.slice(0, 3);
    art = `<div class="fan fan--${shown.length}">${shown.map((t, k) =>
      `<img class="fan__card" style="--k:${k}" src="previews/${t.id}.webp" alt="" loading="lazy">`).join("")}</div>`;
  } else {
    art = formatDrawing(p);
  }
  return `
    <article class="product ${has ? "" : "product--soon"}" style="--i:${i}">
      <div class="product__art">${art}</div>
      <div class="product__body">
        <h3 class="product__name">${esc(p.name)}</h3>
        <p class="product__meta">${esc(meta)}</p>
        <p class="product__blurb">${esc(p.blurb)}</p>
      </div>
      <div class="product__foot">
        ${has
          ? `<span class="count">${designs.length} design${designs.length === 1 ? "" : "s"}</span>`
          : `<span class="flag">No designs yet</span>`}
        <a class="pill ${has ? "pill--gold" : ""}" href="#/${p.id}" aria-label="${esc(p.name)} ${esc(p.size)}">${has ? "Browse" : "View"}<span aria-hidden="true"> →</span></a>
      </div>
    </article>`;
}

function renderHome() {
  const print = PRODUCTS.filter((p) => p.medium === "print");
  const screen = PRODUCTS.filter((p) => p.medium === "screen");
  return `
    <section class="page home">
      <header class="intro">
        <p class="eyebrow">Marketing materials</p>
        <h1 class="display">Choose a piece. Pick a design.<br><span>We’ll build it for you.</span></h1>
        <p class="lede">Print and social pieces for your listings, in CENTURY 21 Masters designs. Fill in the details once and the finished piece comes back to you to approve.</p>
      </header>

      <h2 class="section-title">Print</h2>
      <div class="products">${print.map(productCard).join("")}</div>

      <h2 class="section-title">Social</h2>
      <p class="section-note">Made for screens only. These are never sent to print.</p>
      <div class="products products--screen">${screen.map((p, i) => productCard(p, i + print.length)).join("")}</div>
    </section>`;
}

function designCard(t, i, focusId) {
  const vt = t.id === focusId ? ' style="view-transition-name: sheet"' : "";
  const href = `#/${t.product}/${t.types[0]}/${t.id}`;
  return `
    <article class="tile" style="--i:${i}" data-id="${t.id}">
      <div class="tile__thumb"${vt}>
        <img src="previews/${t.id}.webp" alt="${esc(t.name)} design, shown with a sample listing" loading="lazy">
      </div>
      <div class="tile__meta">
        <div>
          <h3 class="tile__name">${esc(t.name)}</h3>
          <p class="tile__desc">${esc(t.description)}</p>
        </div>
        <a class="pill pill--gold tile__cta" href="${href}" data-select="${t.id}">Select<span aria-hidden="true"> →</span></a>
      </div>
    </article>`;
}

function renderProduct(productId, typeId, focusId) {
  const p = productById(productId);
  const hasTypes = p.id === "flyer";
  const type = hasTypes ? typeById(typeId) || typeById("open-house") : null;
  const designs = templatesFor(p.id, type && type.id);
  const meta = [p.size, p.medium === "screen" ? "Digital" : "Print", p.sides === 2 ? "Two-sided, front and back" : ""]
    .filter(Boolean).join(" · ");

  const tabs = hasTypes ? `
    <nav class="types" aria-label="Flyer type">
      ${FLYER_TYPES.map((ft) => {
        const n = templatesFor(p.id, ft.id).length;
        const on = ft.id === type.id;
        return `<a class="type ${on ? "is-on" : ""} ${n ? "" : "type--empty"}" href="#/${p.id}/${ft.id}" ${on ? 'aria-current="page"' : ""}>
          ${esc(ft.name)}${n ? `<span class="type__n" aria-label="${n} designs">${n}</span>` : ""}</a>`;
      }).join("")}
    </nav>
    <p class="types__when"><b>${esc(type.name)}</b> · ${esc(type.when)}</p>` : "";

  const body = designs.length
    ? `<div class="tiles">${designs.map((t, i) => designCard(t, i, focusId)).join("")}</div>`
    : `<div class="empty">
         <div class="empty__art">${formatDrawing(p)}</div>
         <h2 class="empty__title">No ${esc(type ? type.name : p.name)} designs yet</h2>
         <p class="empty__text">New designs appear here as soon as Brand Experience approves them.${type ? " In the meantime, the Open House designs are ready to use." : ""}</p>
         ${type ? `<a class="pill" href="#/flyer/open-house">See Open House designs<span aria-hidden="true"> →</span></a>` : `<a class="pill" href="#/">All materials</a>`}
       </div>`;

  return `
    <section class="page product-page">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">All materials</a><span aria-hidden="true">/</span><span>${esc(p.name)}${p.id.startsWith("postcard") ? ` ${esc(p.size)}` : ""}</span></nav>
      <header class="intro intro--tight">
        <h1 class="display display--sm">${esc(p.name)}${p.id.startsWith("postcard") ? ` <span>${esc(p.size)}</span>` : ""}</h1>
        <p class="lede">${esc(meta)}</p>
      </header>
      ${tabs}
      ${body}
    </section>`;
}
