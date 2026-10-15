/* Small shared helpers: escaping, lookups, formatting. */

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[c]));

const productById = (id) => PRODUCTS.find((p) => p.id === id);
const typeById = (id) => FLYER_TYPES.find((t) => t.id === id);
const templateById = (id) => TEMPLATES.find((t) => t.id === id);
const templatesFor = (productId, typeId) => TEMPLATES.filter((t) =>
  t.product === productId && (!typeId || t.types.includes(typeId)));

/* Requirements the automation can't meet yet. Empty means selectable. */
const unmetRequirements = (t) => t.requires.filter((r) => !AUTOMATION_PROVIDES.includes(r));

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Run a DOM change as a view transition where the browser has them. */
function withTransition(update) {
  if (!document.startViewTransition || reducedMotion()) {
    update();
    return Promise.resolve();
  }
  const vt = document.startViewTransition(update);
  vt.ready.catch(() => {}); // skipped when the tab is hidden; the update still runs
  return vt.finished.catch(() => {});
}

/* ---------- Formatting. The template prints values as given, so the form
   formats them before they go in, as the real automation would. ---------- */

function formatPrice(raw) {
  const digits = String(raw).replace(/[^\d]/g, "");
  if (!digits) return "";
  return "$" + Number(digits).toLocaleString("en-US");
}

function formatThousands(raw) {
  const digits = String(raw).replace(/[^\d]/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("en-US");
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];

/* "2026-10-24" -> { date: "Saturday, October 24", weekday, month, day } */
function dateParts(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  const weekday = WEEKDAYS[dt.getDay()];
  const month = MONTHS[dt.getMonth()];
  return { date: `${weekday}, ${month} ${d}`, weekday, month, day: String(d) };
}

function clock(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return { text: `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")}`, ampm: h < 12 ? "AM" : "PM" };
}

/* "13:00", "16:00" -> "1:00 – 4:00 PM" (one AM/PM when both share it). */
function timeRange(start, end) {
  if (!start) return "";
  const a = clock(start);
  if (!end) return `${a.text} ${a.ampm}`;
  const b = clock(end);
  return a.ampm === b.ampm
    ? `${a.text} – ${b.text} ${b.ampm}`
    : `${a.text} ${a.ampm} – ${b.text} ${b.ampm}`;
}

function isoDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* The first Saturday at least a week out, for the sample fill. */
function upcomingSaturday() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7));
  return isoDate(d);
}

const absUrl = (path) => new URL(path, location.href).href;

/* ---------- Placeholder photos for the preview. A labelled block in
   Obsessed Grey, drawn so the label survives object-fit: cover. ---------- */

function slotImage(label, { w = 800, h = 520, tone = "dark" } = {}) {
  const bg = tone === "light" ? "#c4c4c6" : "#252526";
  const ink = tone === "light" ? "#252526" : "#beaf87";
  const sub = tone === "light" ? "#252526" : "#c4c4c6";
  const cx = w / 2;
  const cy = h / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
<defs><pattern id="d" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="1.4" fill="${ink}" opacity=".28"/></pattern></defs>
<rect width="${w}" height="${h}" fill="${bg}"/>
<rect width="${w}" height="${h}" fill="url(#d)"/>
<g fill="none" stroke="${ink}" stroke-width="3" stroke-linejoin="round" transform="translate(${cx - 30} ${cy - 66})">
<rect x="0" y="10" width="60" height="42" rx="6"/><circle cx="30" cy="31" r="11"/><path d="M19 10l5-8h12l5 8"/></g>
<text x="${cx}" y="${cy + 22}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="5" fill="${ink}">${esc(label.toUpperCase())}</text>
<text x="${cx}" y="${cy + 58}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="20" letter-spacing="2" fill="${sub}" opacity=".8">ADD IN THE FORM</text>
</svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/* A stand-in headshot. The cut-out version has no background, like the real
   cut-out, so the design's own ground shows around it. */
function personImage(label = "Your photo", { cutout = false } = {}) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
${cutout ? "" : '<rect width="400" height="400" fill="#c4c4c6"/>'}
<circle cx="200" cy="160" r="62" fill="#808285"/>
<path d="M78 400c8-82 60-128 122-128s114 46 122 128z" fill="#808285"/>
<text x="200" y="372" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="4" fill="#f4f4f6">${esc(label.toUpperCase())}</text>
</svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
