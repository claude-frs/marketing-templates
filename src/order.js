/*
  The order screen: the design on the left, rendered live with placeholders;
  the form on the right. DRE first, then the details the template takes.

  Mock only. The DRE "lookup" always finds the demo agent, file inputs make
  local previews and upload nothing, and "Request my flyer" sends nothing.
*/

/* Text fields: what the preview shows until the agent fills them in.
   Optional fields go blank in the preview once touched and left empty, which
   is what the real flyer does (an empty stat hides its tile). */
const FIELDS = {
  street:       { ph: "Street Address",  required: true },
  city:         { ph: "City",            required: true },
  state:        { ph: "ST",              required: true },
  zip:          { ph: "ZIP",             required: true },
  price:        { ph: "$0,000,000",      required: true },
  priceLabel:   { ph: "" },
  beds:         { ph: "#",               required: true },
  baths:        { ph: "#",               required: true },
  sqft:         { ph: "#,###",           required: true },
  garageSpaces: { ph: "#" },
  headline:     { ph: "Your Headline Goes Here",  required: true },
  description:  { ph: "Tell people what makes this home worth the visit: the light, the kitchen, the garden, the street. Write it the way you’d say it at the door. About 520 characters fits this space, and the layout is tested at that length, so it will never run over.", required: true },
  ctaHeading:   { ph: "" },
  ctaSubline:   { ph: "" },
};

const PLACEHOLDER_AGENT = {
  fullName: "Your Name",
  jobTitle: "Realtor®",
  dre: "00000000",
  phone: "(000) 000-0000",
  email: "you@yourwebsite.com",
};

const MAX_SESSIONS = 3;

let order = null; // the screen's state while it's open

function freshState(t) {
  return {
    template: t,
    verified: false,
    dre: "",
    agent: null,
    headshot: null,           // { url, name } when replaced
    values: Object.fromEntries(Object.keys(FIELDS).map((k) => [k, ""])),
    touched: new Set(),
    sessions: [{ date: "", start: "", end: "" }],
    hero: null,
    gallery: [null, null, null, null],
    preview: null,
    sent: false,
  };
}

/* ---------- The data the template gets ---------- */

function buildFlyer(forPreview) {
  const s = order;
  const t = s.template;
  const v = (k) => {
    const val = s.values[k].trim();
    if (!forPreview || val) return val;
    if (!FIELDS[k].required && s.touched.has(k)) return "";
    return FIELDS[k].ph;
  };
  // The hero often fills the page, so its label is drawn smaller relative to
  // the block; gallery slots are small, so theirs is drawn larger.
  const photo = (p, label, size) => p ? (forPreview ? absUrl(p.url) : `(uploaded) ${p.name}`) : (forPreview ? slotImage(label, size) : "");

  const agent = s.agent || PLACEHOLDER_AGENT;
  const headshot = s.headshot
    ? (forPreview ? absUrl(s.headshot.url) : `(uploaded) ${s.headshot.name}`)
    : s.agent ? (forPreview ? absUrl(agent.headshotUrl) : agent.headshotUrl) : (forPreview ? personImage() : "");

  const gallery = [0, 1, 2, 3].map((i) => {
    const k = t.photos.gallery.indexOf(i);
    if (k === -1) return "";
    return photo(s.gallery[i], `Photo ${k + 1}`, { w: 460, h: 300 });
  });

  const sessions = s.sessions.map((row) => {
    const parts = dateParts(row.date);
    const time = timeRange(row.start, row.end);
    if (!forPreview) return parts ? { ...parts, time } : { date: "", weekday: "", month: "", day: "", time };
    return {
      ...(parts || { date: "Day, Month 00", weekday: "Weekday", month: "Month", day: "00" }),
      time: time || "0:00 – 0:00 PM",
    };
  });

  const flyer = {
    template: t.id,
    flyerType: t.types[0],
    agentInfo: {
      fullName: agent.fullName,
      jobTitle: agent.jobTitle,
      dre: s.agent ? s.dre : (forPreview ? agent.dre : ""),
      phone: agent.phone,
      email: agent.email,
      headshotUrl: headshot,
      headshotCutoutUrl: t.requires.includes("headshotCutoutUrl") ? cutout(forPreview) : "",
    },
    listing: {
      street: v("street"), city: v("city"), state: v("state"), zip: v("zip"),
      priceLabel: v("priceLabel"), price: v("price"),
      beds: v("beds"), baths: v("baths"), sqft: v("sqft"), garageSpaces: v("garageSpaces"),
      headline: v("headline"), description: v("description"),
      heroImageUrl: photo(s.hero, "Main photo", { w: 1500, h: 975 }),
      heroPositionX: "",
      galleryImageUrls: gallery,
    },
    openHouse: { sessions },
    cta: { heading: v("ctaHeading"), subline: v("ctaSubline") },
  };
  return flyer;
}

/* The cut-out headshot. The automation makes it from the agent's photo with
   a background-removal step; the mock uses the demo agent's ready-made one,
   and shows a replaced photo as it is. */
function cutout(forPreview) {
  const s = order;
  if (s.headshot) return forPreview ? absUrl(s.headshot.url) : `(background removed by the automation) ${s.headshot.name}`;
  if (s.agent) return forPreview ? absUrl(s.agent.headshotCutoutUrl) : s.agent.headshotCutoutUrl;
  return forPreview ? personImage("Your photo", { cutout: true }) : "";
}

let previewTimer = 0;
function refreshPreview() {
  clearTimeout(previewTimer);
  previewTimer = setTimeout(() => order && order.preview && order.preview.update(buildFlyer(true)), 40);
}

/* ---------- Markup ---------- */

function photoSlot(key, label, hint, photo, big) {
  return `
    <div class="photo ${big ? "photo--big" : ""} ${photo ? "has-photo" : ""}" data-photo="${key}">
      <label class="photo__drop">
        <input type="file" accept="image/*" data-photo-input="${key}">
        ${photo
          ? `<img class="photo__img" src="${esc(photo.url)}" alt="">`
          : `<span class="photo__empty"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg><span>Add photo</span></span>`}
      </label>
      <div class="photo__meta">
        <span class="photo__label">${esc(label)}</span>
        ${hint ? `<span class="photo__hint">${esc(hint)}</span>` : ""}
        ${photo ? `<button type="button" class="link photo__remove" data-photo-remove="${key}">Remove</button>` : ""}
      </div>
      <p class="field__error" data-error="${key}"></p>
    </div>`;
}

function input(key, label, { type = "text", attrs = "", hint = "", cls = "", counter = 0 } = {}) {
  const f = FIELDS[key];
  const opt = f && !f.required ? `<span class="field__opt">Optional</span>` : "";
  const val = esc(order.values[key]);
  const control = type === "textarea"
    ? `<textarea id="f-${key}" name="${key}" rows="6" ${attrs}>${val}</textarea>`
    : `<input id="f-${key}" name="${key}" type="${type}" value="${val}" ${attrs}>`;
  return `
    <div class="field ${cls}">
      <label class="field__label" for="f-${key}">${esc(label)}${opt}</label>
      ${control}
      ${counter ? `<span class="field__count" data-count="${key}" data-max="${counter}"></span>` : ""}
      ${hint ? `<p class="field__hint">${esc(hint)}</p>` : ""}
      <p class="field__error" data-error="${key}"></p>
    </div>`;
}

function sessionRows() {
  return order.sessions.map((row, i) => `
    <div class="session" data-session="${i}">
      <div class="field session__date">
        <label class="field__label" for="s-date-${i}">${order.sessions.length > 1 ? `Date ${i + 1}` : "Date"}</label>
        <input id="s-date-${i}" type="date" value="${esc(row.date)}" min="${isoDate(new Date())}" data-s="date">
      </div>
      <div class="field">
        <label class="field__label" for="s-start-${i}">From</label>
        <input id="s-start-${i}" type="time" step="900" value="${esc(row.start)}" data-s="start">
      </div>
      <div class="field">
        <label class="field__label" for="s-end-${i}">To</label>
        <input id="s-end-${i}" type="time" step="900" value="${esc(row.end)}" data-s="end">
      </div>
      ${order.sessions.length > 1 ? `<button type="button" class="icon-btn session__remove" data-session-remove="${i}" aria-label="Remove date ${i + 1}">×</button>` : ""}
      <p class="field__error session__error" data-error="session-${i}"></p>
    </div>`).join("") + (order.sessions.length < MAX_SESSIONS
    ? `<button type="button" class="link add-session" data-session-add>+ Add another date</button>`
    : `<p class="field__hint">Three dates is the most this design holds.</p>`);
}

function agentCard() {
  const a = order.agent;
  const photo = order.headshot ? order.headshot.url : a.headshotUrl;
  return `
    <div class="agent" id="agent-card">
      <div class="agent__photo">
        <img src="${esc(photo)}" alt="${esc(a.fullName)}">
      </div>
      <div class="agent__info">
        <p class="agent__hello">Welcome back</p>
        <p class="agent__name">${esc(a.fullName)}</p>
        <p class="agent__line">${esc(a.jobTitle)} · DRE #${esc(order.dre)}</p>
        <p class="agent__line">${esc(a.phone)} · ${esc(a.email)}</p>
        <div class="agent__actions">
          <label class="pill pill--sm">
            <input type="file" accept="image/*" data-headshot hidden>Replace photo
          </label>
          ${order.headshot ? `<button type="button" class="link" data-headshot-reset>Use my website photo</button>` : ""}
        </div>
      </div>
      <p class="agent__source">From your agent website, ${esc(a.website)}. To change your name or contact details, update them there.
        <button type="button" class="link" data-dre-reset>Not you?</button></p>
    </div>`;
}

function dreStep() {
  return `
    <form class="dre" id="dre-form" novalidate>
      <p class="step-kicker">Step 1 of 2</p>
      <h2 class="step-title">Let’s start with your DRE number</h2>
      <p class="step-text">We use it to bring in your name, photo and contact details from your agent website, so you don’t have to type them.</p>
      <div class="dre__row">
        <div class="field dre__field">
          <label class="field__label" for="f-dre">DRE license number</label>
          <input id="f-dre" name="dre" inputmode="numeric" autocomplete="off" maxlength="8" placeholder="8 digits" value="${esc(order.dre)}">
        </div>
        <button class="btn" type="submit" id="dre-go">Submit</button>
      </div>
      <p class="field__error" data-error="dre"></p>
      <ol class="checks" id="dre-checks" hidden>
        <li>Checking the DRE license</li>
        <li>Finding your agent website</li>
        <li>Bringing in your details</li>
      </ol>
    </form>`;
}

function detailsForm() {
  const t = order.template;
  const galleryHint = t.photos.gallery.length === 3
    ? "Three interiors. This design already shows the outside in the main photo."
    : "Four photos, in the order they appear.";
  const ctaFields = [
    t.cta.heading !== undefined ? input("ctaHeading", "Closing line", { attrs: `maxlength="40" placeholder="${esc(t.cta.heading)}"` }) : "",
    t.cta.subline !== undefined ? input("ctaSubline", "Follow-up line", { attrs: `maxlength="60" placeholder="${esc(t.cta.subline)}"` }) : "",
  ].join("");

  return `
    <form class="details" id="details-form" novalidate>
      <div class="details__head">
        <p class="step-kicker">Step 2 of 2</p>
        <h2 class="step-title">Tell us about the home</h2>
        <p class="step-text">The design on the ${matchMedia("(max-width: 959px)").matches ? "preview" : "left"} fills in as you type. <button type="button" class="link" data-sample>Fill with the sample listing</button></p>
      </div>

      <fieldset class="group">
        <legend class="group__title"><span>1</span>When is it open?</legend>
        <div id="sessions">${sessionRows()}</div>
      </fieldset>

      <fieldset class="group">
        <legend class="group__title"><span>2</span>The home</legend>
        ${input("street", "Street address", { attrs: 'autocomplete="off" maxlength="48"', hint: "Fits on one line up to about 40 characters." })}
        <div class="row row--addr">
          ${input("city", "City", { attrs: 'maxlength="30"' })}
          ${input("state", "State", { attrs: 'maxlength="2"' })}
          ${input("zip", "ZIP", { attrs: 'inputmode="numeric" maxlength="5"' })}
        </div>
        <div class="row row--price">
          ${input("price", "Price", { attrs: 'inputmode="numeric" placeholder="$"' })}
          ${input("priceLabel", "Shown as", { attrs: `list="price-labels" placeholder="Offered at"` })}
        </div>
        <datalist id="price-labels"><option value="Offered at"><option value="Listed at"><option value="Priced at"></datalist>
        <div class="row row--stats">
          ${input("beds", "Beds", { attrs: 'inputmode="numeric" maxlength="2"' })}
          ${input("baths", "Baths", { attrs: 'inputmode="decimal" maxlength="4"' })}
          ${input("sqft", "Sq ft", { attrs: 'inputmode="numeric" maxlength="7"' })}
          ${input("garageSpaces", "Garage", { attrs: 'inputmode="numeric" maxlength="1"', hint: "" })}
        </div>
        <p class="field__hint">Leave garage blank and its tile comes off the flyer.</p>
      </fieldset>

      <fieldset class="group">
        <legend class="group__title"><span>3</span>Photos</legend>
        ${photoSlot("hero", "Main photo", `${t.photos.hero}. Use the original, about 4,000 px wide; MLS downloads print soft.`, order.hero, true)}
        <p class="group__note">${esc(galleryHint)}</p>
        <div class="photos">
          ${t.photos.gallery.map((gi, k) => photoSlot(`g${gi}`, `Photo ${k + 1}`, "", order.gallery[gi], false)).join("")}
        </div>
      </fieldset>

      <fieldset class="group">
        <legend class="group__title"><span>4</span>The story</legend>
        ${input("headline", "Headline", { attrs: 'maxlength="60"', counter: 60 })}
        ${input("description", "Description", { type: "textarea", attrs: 'maxlength="520"', counter: 520 })}
      </fieldset>

      ${ctaFields ? `
      <fieldset class="group">
        <legend class="group__title"><span>5</span>Your sign-off</legend>
        <p class="group__note">Leave these blank to use the design’s own wording, shown greyed out.</p>
        ${ctaFields}
      </fieldset>` : ""}

      <div class="submit">
        <button class="btn btn--big" type="submit" id="send">Request my flyer</button>
        <p class="submit__note">You’ll get a proof to approve before anything is printed.</p>
      </div>
    </form>`;
}

function renderOrder(t) {
  order = freshState(t);
  const product = productById(t.product);
  const type = typeById(t.types[0]);
  return `
    <section class="order" id="order">
      <div class="order__stage">
        <a class="stage-back" href="#/${t.product}/${type.id}" aria-label="Back to all ${esc(type.name)} designs" title="All ${esc(type.name)} designs">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
        </a>
        <div class="sheet" id="sheet">
          <div class="sheet__stage" style="view-transition-name: sheet">
            <img class="sheet__sample" src="previews/${t.id}.webp" alt="">
            <div class="sheet__clip"><iframe title="Live preview of the ${esc(t.name)} flyer" tabindex="-1"></iframe></div>
          </div>
        </div>
        <p class="sheet__caption">${esc(t.name)} · ${esc(product.size)} · Dark blocks show where your photos go</p>
      </div>

      <div class="order__panel" id="panel">
        <div class="order__inner">
          <header class="order__head">
            <p class="eyebrow">${esc(type.name)} ${esc(product.name.toLowerCase())}</p>
            <h1 class="display display--sm">${esc(t.name)}</h1>
            <p class="order__desc">${esc(t.description)}</p>
          </header>
          <div id="flow">${dreStep()}</div>
        </div>
      </div>

      <button type="button" class="peek" id="peek" aria-controls="sheet" aria-expanded="false">
        <span class="peek__open">Preview</span><span class="peek__close">Close preview</span>
      </button>
    </section>`;
}

/* ---------- Behaviour ---------- */

function mountOrder(t) {
  const root = document.getElementById("order");
  order.preview = new LivePreview(document.getElementById("sheet"), t);
  order.preview.fit();
  order.preview.start(buildFlyer(true)).catch((err) => {
    root.querySelector(".sheet__caption").textContent =
      "The live preview needs the site to be served over http (GitHub Pages, or a local server). " + err.message;
  });

  root.addEventListener("submit", onSubmit);
  root.addEventListener("input", onInput);
  root.addEventListener("change", onChange);
  root.addEventListener("focusout", onBlur);
  root.addEventListener("click", onClick);

  const peek = document.getElementById("peek");
  peek.addEventListener("click", () => setPeek(!root.classList.contains("is-peek")));

  setTimeout(() => {
    const dre = document.getElementById("f-dre");
    if (dre && matchMedia("(min-width: 960px)").matches) dre.focus({ preventScroll: true });
  }, 450);
}

function unmountOrder() {
  if (order && order.preview) order.preview.destroy();
  order = null;
}

function setPeek(on) {
  const root = document.getElementById("order");
  root.classList.toggle("is-peek", on);
  document.getElementById("peek").setAttribute("aria-expanded", String(on));
  document.body.classList.toggle("no-scroll", on);
  if (order) order.preview.fit();
}

function setError(key, msg) {
  const box = document.querySelector(`[data-error="${key}"]`);
  if (box) box.textContent = msg || "";
  const ctl = document.getElementById(`f-${key}`) || document.querySelector(`[data-photo="${key}"]`);
  if (ctl) ctl.toggleAttribute("aria-invalid", !!msg);
}

function updateCounters() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const n = order.values[el.dataset.count].length;
    const max = Number(el.dataset.max);
    el.textContent = `${n} / ${max}`;
    el.classList.toggle("is-near", n > max * 0.9);
  });
}

function onInput(e) {
  const el = e.target;
  if (el.id === "f-dre") {
    el.value = el.value.replace(/\D/g, "").slice(0, 8);
    order.dre = el.value;
    setError("dre", "");
    return;
  }
  if (el.dataset.s) {
    const i = Number(el.closest("[data-session]").dataset.session);
    order.sessions[i][el.dataset.s] = el.value;
    setError(`session-${i}`, "");
    refreshPreview();
    return;
  }
  if (el.name && el.name in FIELDS) {
    if (el.name === "state") el.value = el.value.toUpperCase();
    if (el.name === "zip" || el.name === "beds" || el.name === "garageSpaces") el.value = el.value.replace(/\D/g, "");
    order.values[el.name] = el.value;
    setError(el.name, "");
    if (el.name === "headline" || el.name === "description") updateCounters();
    refreshPreview();
  }
}

/* Numbers arrive pre-formatted in the real data, so format on the way out. */
function onBlur(e) {
  const el = e.target;
  if (!el.name || !(el.name in FIELDS)) return;
  order.touched.add(el.name);
  if (el.name === "price" && el.value) el.value = order.values.price = formatPrice(el.value);
  if (el.name === "sqft" && el.value) el.value = order.values.sqft = formatThousands(el.value);
  refreshPreview();
}

function readImage(file) {
  return { url: URL.createObjectURL(file), name: file.name };
}

function onChange(e) {
  const el = e.target;
  if (el.dataset.photoInput && el.files[0]) {
    setPhoto(el.dataset.photoInput, readImage(el.files[0]));
  } else if (el.hasAttribute("data-headshot") && el.files[0]) {
    order.headshot = readImage(el.files[0]);
    redrawAgent();
    refreshPreview();
  }
}

function setPhoto(key, photo) {
  if (key === "hero") order.hero = photo;
  else order.gallery[Number(key.slice(1))] = photo;
  const slot = document.querySelector(`[data-photo="${key}"]`);
  const t = order.template;
  if (slot) {
    const isHero = key === "hero";
    const k = isHero ? 0 : t.photos.gallery.indexOf(Number(key.slice(1)));
    const label = isHero ? "Main photo" : `Photo ${k + 1}`;
    const hint = isHero ? `${t.photos.hero}. Use the original, about 4,000 px wide; MLS downloads print soft.` : "";
    slot.outerHTML = photoSlot(key, label, hint, photo, isHero);
  }
  refreshPreview();
}

function redrawAgent() {
  const card = document.getElementById("agent-card");
  if (card) card.outerHTML = agentCard();
}

function redrawSessions() {
  document.getElementById("sessions").innerHTML = sessionRows();
}

function onClick(e) {
  const el = e.target.closest("button, a");
  if (!el) return;
  if (el.hasAttribute("data-session-add")) {
    order.sessions.push({ date: "", start: order.sessions[0].start, end: order.sessions[0].end });
    redrawSessions();
    refreshPreview();
    document.getElementById(`s-date-${order.sessions.length - 1}`).focus();
  } else if (el.dataset.sessionRemove) {
    order.sessions.splice(Number(el.dataset.sessionRemove), 1);
    redrawSessions();
    refreshPreview();
  } else if (el.dataset.photoRemove) {
    e.preventDefault();
    setPhoto(el.dataset.photoRemove, null);
  } else if (el.hasAttribute("data-headshot-reset")) {
    order.headshot = null;
    redrawAgent();
    refreshPreview();
  } else if (el.hasAttribute("data-dre-reset")) {
    order.verified = false;
    order.agent = null;
    order.headshot = null;
    swapFlow(dreStep());
    refreshPreview();
    document.getElementById("f-dre").focus();
  } else if (el.hasAttribute("data-sample")) {
    fillSample();
  } else if (el.hasAttribute("data-again")) {
    order.sent = false;
    swapFlow(agentCard() + detailsForm());
    updateCounters();
  }
}

function swapFlow(html) {
  const flow = document.getElementById("flow");
  flow.classList.remove("is-in");
  flow.innerHTML = html;
  void flow.offsetWidth;
  flow.classList.add("is-in");
}

function onSubmit(e) {
  e.preventDefault();
  if (e.target.id === "dre-form") verifyDre();
  if (e.target.id === "details-form") sendRequest();
}

const wait = (ms) => new Promise((r) => setTimeout(r, reducedMotion() ? Math.min(ms, 120) : ms));

async function verifyDre() {
  if (!/^\d{8}$/.test(order.dre)) {
    setError("dre", "DRE license numbers are 8 digits.");
    document.getElementById("f-dre").focus();
    return;
  }
  const btn = document.getElementById("dre-go");
  const input = document.getElementById("f-dre");
  const checks = document.getElementById("dre-checks");
  btn.disabled = true;
  input.readOnly = true;
  btn.classList.add("is-busy");
  btn.textContent = "Checking…";
  checks.hidden = false;
  const items = [...checks.children];
  for (const li of items) {
    li.classList.add("is-working");
    await wait(650);
    li.classList.remove("is-working");
    li.classList.add("is-done");
  }
  await wait(350);
  if (!order) return;
  order.verified = true;
  order.agent = { ...DEMO_AGENT };
  swapFlow(agentCard() + detailsForm());
  updateCounters();
  refreshPreview();
}

function fillSample() {
  const L = DEMO_LISTING;
  for (const k of ["street", "city", "state", "zip", "priceLabel", "price", "beds", "baths", "sqft", "garageSpaces", "headline", "description"]) {
    order.values[k] = L[k];
    const el = document.getElementById(`f-${k}`);
    if (el) el.value = L[k];
    setError(k, "");
  }
  order.sessions = [{ date: upcomingSaturday(), start: L.sessionStart, end: L.sessionEnd }];
  redrawSessions();
  setPhoto("hero", { ...L.hero });
  order.template.photos.gallery.forEach((gi) => setPhoto(`g${gi}`, { ...L.gallery[gi] }));
  updateCounters();
  refreshPreview();
}

function validate() {
  const errors = [];
  const need = (key, msg) => { if (!order.values[key].trim()) errors.push([key, msg]); };
  order.sessions.forEach((row, i) => {
    if (!row.date || !row.start || !row.end) errors.push([`session-${i}`, "Add the date and both times."]);
    else if (row.end <= row.start) errors.push([`session-${i}`, "The end time needs to be after the start."]);
  });
  need("street", "Add the street address.");
  need("city", "Add the city.");
  if (!/^[A-Z]{2}$/.test(order.values.state)) errors.push(["state", "Like CA."]);
  if (!/^\d{5}$/.test(order.values.zip)) errors.push(["zip", "5 digits."]);
  need("price", "Add the price.");
  need("beds", "Add the beds.");
  need("baths", "Add the baths.");
  need("sqft", "Add the square footage.");
  if (!order.hero) errors.push(["hero", "Add the main photo."]);
  order.template.photos.gallery.forEach((gi, k) => {
    if (!order.gallery[gi]) errors.push([`g${gi}`, `Add photo ${k + 1}.`]);
  });
  need("headline", "Add a headline.");
  need("description", "Add a description.");
  return errors;
}

async function sendRequest() {
  document.querySelectorAll("[data-error]").forEach((el) => { el.textContent = ""; });
  document.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
  const errors = validate();
  if (errors.length) {
    errors.forEach(([k, m]) => setError(k, m));
    const first = document.querySelector(`[data-error="${errors[0][0]}"]`);
    const target = first.closest(".field, .photo, .session") || first;
    target.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "center" });
    const focusable = target.querySelector("input, textarea");
    if (focusable && focusable.type !== "file") focusable.focus({ preventScroll: true });
    return;
  }
  const btn = document.getElementById("send");
  btn.disabled = true;
  btn.classList.add("is-busy");
  btn.textContent = "Sending…";
  await wait(900);
  if (!order) return;
  order.sent = true;
  swapFlow(confirmation());
  document.getElementById("panel").scrollTo({ top: 0 });
  runTimeline();
}

/* ---------- After sending: what the automation does next ---------- */

function requestId() {
  const d = new Date();
  return `FLY-${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function confirmation() {
  const t = order.template;
  const flyer = buildFlyer(false);
  const json = JSON.stringify(flyer, null, 2);
  const steps = [
    ["Request received", `Your details and photos arrive with the design ID, <code>${esc(t.id)}</code>, the same way website requests do today.`],
    ["Photos checked", "Each photo is checked for size. Full-page photos need the original, around 4,000 px wide."],
    ["Flyer built", "The automation fills the design with your details and makes a print-ready PDF, bleed included."],
    ["Proof sent to you", `A proof goes to ${esc(order.agent.email)}. Approve it, or reply with changes.`],
    ["Printed", "Once you approve the proof, it goes to print."],
  ];
  return `
    <div class="done">
      <div class="done__badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>
      <p class="step-kicker">Request ${requestId()}</p>
      <h2 class="step-title">Thanks, ${esc(order.agent.fullName.split(" ")[0])}. Your flyer is on its way.</h2>
      <p class="step-text">Here’s what happens next. In this preview nothing was actually sent.</p>

      <ol class="timeline" id="timeline">
        ${steps.map(([h, p], i) => `
          <li class="timeline__step" data-step="${i}">
            <span class="timeline__dot" aria-hidden="true"></span>
            <div><p class="timeline__title">${h}</p><p class="timeline__text">${p}</p></div>
          </li>`).join("")}
      </ol>

      <details class="payload">
        <summary>See what the automation receives</summary>
        <p class="payload__note">One JSON document per flyer, in the same shape as the website’s <code>agent.json</code>. The real form uploads the photos and sends their links.</p>
        <pre><code>${esc(json)}</code></pre>
      </details>

      <div class="done__actions">
        <a class="btn" href="#/flyer/open-house">Make another flyer</a>
        <button type="button" class="pill" data-again>Edit these details</button>
      </div>
    </div>`;
}

async function runTimeline() {
  const steps = [...document.querySelectorAll(".timeline__step")];
  const stopAt = 3; // the proof is the last thing that happens without the agent
  for (let i = 0; i < steps.length; i++) {
    if (!order || !order.sent) return;
    steps[i].classList.add("is-working");
    if (i > stopAt) {
      steps[i].classList.replace("is-working", "is-waiting");
      steps[i].querySelector(".timeline__title").textContent = "Printed, after you approve";
      return;
    }
    await wait(i === 0 ? 300 : 1100);
    steps[i].classList.replace("is-working", "is-done");
  }
}
