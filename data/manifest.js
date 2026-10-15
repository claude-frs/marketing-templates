/*
  The manifest: what the gallery knows about every product, flyer type and
  template. The template files themselves are copied from marketing-design
  into design/ by scripts/sync-design.py; this file says what the folders
  cannot (name, description, ground, what each template needs).

  Adding a template: run the sync script, then add one object to TEMPLATES.
  The `id` is the folder name and never changes once published.

  Plain globals, loaded with <script src>, so the page needs no build step.
*/

const MANIFEST_SYNCED = "2026-10-15";

/* What the automation produces. A template whose `requires` lists anything
   not in here can't be selected. The mock assumes the background-removal
   step exists, so every design is available; in the real build, list only
   what the pipeline actually does. */
const AUTOMATION_PROVIDES = [
  "headshotUrl",
  "headshotCutoutUrl",
];

const PRODUCTS = [
  { id: "flyer",           name: "Flyer",            size: "8.5 × 11 in",        medium: "print",  sides: 1, aspect: [8.5, 11],  blurb: "Open houses, new listings, sold announcements." },
  { id: "postcard-4x6",    name: "Postcard",         size: "4 × 6 in",           medium: "print",  sides: 2, aspect: [6, 4],     blurb: "The classic mailer. Front and back." },
  { id: "postcard-6x9",    name: "Postcard",         size: "6 × 9 in",           medium: "print",  sides: 2, aspect: [9, 6],     blurb: "More room for photos. Front and back." },
  { id: "postcard-6x11",   name: "Postcard",         size: "6 × 11 in",          medium: "print",  sides: 2, aspect: [11, 6],    blurb: "The jumbo mailer. Front and back." },
  { id: "business-card",   name: "Business card",    size: "3.5 × 2 in",         medium: "print",  sides: 2, aspect: [3.5, 2],   blurb: "Front and back." },
  { id: "door-hanger",     name: "Door hanger",      size: "4.25 × 11 in",       medium: "print",  sides: 1, aspect: [4.25, 11], blurb: "For the neighbourhood around a listing.", cutout: true },
  { id: "brochure-trifold",name: "Trifold brochure", size: "8.5 × 11 in, folded",medium: "print",  sides: 2, aspect: [11, 8.5],  blurb: "Six panels for the whole story.", folds: 3 },
  { id: "instagram-post",  name: "Instagram post",   size: "1080 × 1350 px",     medium: "screen", sides: 1, aspect: [4, 5],     blurb: "For the feed." },
  { id: "instagram-story", name: "Instagram story",  size: "1080 × 1920 px",     medium: "screen", sides: 1, aspect: [9, 16],    blurb: "For stories." },
];

/* From marketing-design/products/flyer/flyer-types.md. */
const FLYER_TYPES = [
  { id: "just-listed",    name: "Just Listed",    when: "The week the listing goes live" },
  { id: "open-house",     name: "Open House",     when: "Days before the open house" },
  { id: "brokers-open",   name: "Broker’s Open",  when: "A weekday preview for other agents" },
  { id: "coming-soon",    name: "Coming Soon",    when: "Before the listing is live" },
  { id: "price-improved", name: "Price Improved", when: "After a price reduction" },
  { id: "under-contract", name: "Under Contract", when: "Offer accepted, in escrow" },
  { id: "back-on-market", name: "Back on Market", when: "When escrow falls through" },
  { id: "just-sold",      name: "Just Sold",      when: "After closing" },
  { id: "for-lease",      name: "For Lease",      when: "Rentals" },
];

/*
  One object per approved template.

  description      one line on the feel of the design, shown in the gallery

  photos.hero      what the hero photo does in this design
  photos.gallery   which of the four gallery photos it shows (0-based)
  sessionParts     true if it prints weekday / month / day separately
  cta              which call-to-action lines it prints, with its defaults
  requires         agentInfo fields beyond the usual ones
*/
const TEMPLATES = [
  {
    id: "open-house-luxury", product: "flyer",
    types: ["open-house"],
    name: "Luxury",
    description: "Bold and dramatic, for homes that make a statement.",
    ground: "dark", palette: "relentless",
    agentPhoto: "Round headshot",
    photos: { hero: "Seen through the “1”", gallery: [0, 1, 2, 3] },
    sessionParts: false,
    cta: { heading: "Come see it in person!", subline: "Can’t make it? Call me for a private tour" },
    requires: [],
    approved: "2026-10-15",
  },
  {
    id: "open-house-threshold", product: "flyer",
    types: ["open-house"],
    name: "Threshold",
    description: "Bright and welcoming, like an open front door.",
    ground: "light", palette: "relentless",
    agentPhoto: "Arched headshot",
    photos: { hero: "Inside the doorway", gallery: [1, 2, 3] },
    sessionParts: true,
    cta: { subline: "Can’t make it? Call me for a private tour." },
    requires: [],
    approved: "2026-10-15",
  },
  {
    id: "open-house-premiere", product: "flyer",
    types: ["open-house"],
    name: "Premiere",
    description: "A cinematic poster for a big debut.",
    ground: "gold to dark", palette: "relentless",
    agentPhoto: "Rounded headshot",
    photos: { hero: "Faded backdrop behind you", gallery: [0, 1, 2, 3] },
    sessionParts: false,
    cta: { heading: "Come see it in person.", subline: "Can’t make it? Call me for a private tour." },
    requires: [],
    approved: "2026-10-15",
  },
  {
    id: "open-house-signature", product: "flyer",
    types: ["open-house"],
    name: "Signature",
    description: "Polished and editorial, like a magazine ad.",
    ground: "dark", palette: "relentless",
    agentPhoto: "Cut-out on a gold card",
    photos: { hero: "Full bleed across the top", gallery: [1, 2, 3] },
    sessionParts: false,
    cta: { heading: "Come see it in person.", subline: "Can’t make it? Call me for a private tour." },
    requires: ["headshotCutoutUrl"],
    approved: "2026-10-15",
  },
  {
    id: "open-house-portrait", product: "flyer",
    types: ["open-house"],
    name: "Portrait",
    description: "Soft and personal, with you front and center.",
    ground: "light grey", palette: "relentless",
    agentPhoto: "Cut-out in front of a disc",
    photos: { hero: "The large photograph", gallery: [0, 1, 2, 3] },
    sessionParts: false,
    cta: { heading: "Come see it in person.", subline: "Can’t make it? Call me for a private tour." },
    requires: ["headshotCutoutUrl"],
    approved: "2026-10-15",
  },
];
