# CENTURY 21 Masters marketing materials: template gallery

This repo is the site where agents pick a marketing piece for a listing.
They choose the type of material, browse the designs available for it, and
select one. The details of that flow, and the order form and automation that
come after it, are planned separately. This file describes what the site is
built on.

## Right now this is a mock

Decided 2026-10-15. The site is a clickable demo of the flow, built so the
project can be pitched. It has no backend and sends nothing:

- **Plain HTML, CSS and JS, no build step**, like `brand-experience-roadmap`.
  Hosted on GitHub Pages from the repo root. Hash routes (`#/flyer/...`) so
  Pages needs no server rules.
- **The DRE "lookup" is fake.** Any 8 digits find the demo agent in
  `data/demo.js` (Marcus Hale, the persona in the marketing-design samples).
  Only the headshot can be replaced; everything else comes "from the agent
  website".
- **File inputs preview locally and upload nothing.** "Request my flyer"
  shows a confirmation that walks through the planned automation and the
  JSON it would receive.
- **The preview is the real template.** `src/preview.js` renders each
  template's own `page.njk` in the browser with Nunjucks, fed placeholder
  data (labelled dark blocks for photos, "Street Address", "$0,000,000") that
  is replaced live as the agent types. The design files are never edited.
- **Every design is available.** The mock assumes the background-removal
  step exists, so `AUTOMATION_PROVIDES` lists `headshotCutoutUrl` and the
  cut-out designs use the demo agent's ready-made cut-out. The mechanism
  (`requires` against `AUTOMATION_PROVIDES`) stays for the real build. Don't
  label anything "Coming soon": that is a flyer type.
- **No app bar, and no Luxury branding on the site's own chrome.** The order
  screen's back control is a round arrow at the top left of the design.
- **Template descriptions are one line on the feel of the design** ("A
  cinematic poster for a big debut"), not a description of the layout.
- Dark only, like the frs-offices gallery. Relentless palette, Typold and
  Oakes Grotesk served from `design/brand/fonts/`.

If the project goes ahead, the real site is built properly (frs-offices
stack, real form and automation) and this mock is the reference for the flow.

## Layout

```
index.html              the page shell; loads everything below in order
data/manifest.js        THE FILE YOU EDIT: products, flyer types, templates
data/demo.js            the demo agent and sample listing
src/                    helpers, preview (Nunjucks render), gallery, order, main (router)
assets/site.css         all styling
assets/demo/            web-sized demo photos and headshot
previews/<id>.webp      800 px gallery previews made from each sample.png
design/                 copied from marketing-design, same paths, never edited
vendor/nunjucks.min.js  Nunjucks 3.2.4 browser build
scripts/sync-design.py  copies templates and fonts, makes previews, diffs the manifest
```

It must be served over http (Pages, or `python -m http.server`): the
preview fetches `page.njk`, and browsers block that and the fonts from
`file://`. `.claude/launch.json` has a `gallery` server on port 8321.

## Keeping it in sync with marketing-design

marketing-design is not a git repo, so "what's new" is found by comparing:

1. Run `python scripts/sync-design.py` (default source
   `../marketing-design`). It recopies every approved template folder into
   `design/products/<product>/<id>/`, copies the fonts their CSS uses,
   rebuilds `previews/` by rendering each flyer's `page.html` in headless
   Edge or Chrome (falling back to `sample.png`), and lists templates that are in marketing-design but
   missing from `data/manifest.js`, or the reverse.
2. For each new template, read its `notes.md` and `page.njk` and add one
   object to `TEMPLATES` in `data/manifest.js`: name, description, ground,
   agent photo, which photo slots it uses, its call-to-action defaults, and
   `requires`.
3. A new flyer type with its own fields (Just Sold's `sale.*`, For Lease's
   `lease.*`) also needs those fields added to the form in `src/order.js`,
   which today knows the Open House shape only.
4. Two-sided products will have `front.njk` / `back.njk`; the preview
   currently renders `page.njk` only.

## The three repos

| Repo | What it holds | Notes |
|---|---|---|
| **marketing-design** | The templates: HTML/CSS/Nunjucks, preview images, brand files | Owned by the Brand Experience team. Read-only from here |
| **this repo** | The gallery that presents those templates | |
| **frs-offices** | The agent *website* templates, gallery and automation | The working precedent. Mirror its conventions where they apply |

The flow follows frs-offices: the agent selects a template, fills in a form,
and automation (n8n there) builds the finished piece. That gallery lists
website templates; this one lists print and social templates.

Never edit a design from this repo. If a template looks wrong, the fix
belongs in marketing-design.

## Products

Each product is a folder in `marketing-design/products/`. Sizes are in
`marketing-design/sizes.md`.

| Product | Finished size | Medium | Templates today |
|---|---|---|---|
| Flyer | 8.5 x 11 in | Print | **5** (all Open House) |
| Postcard | 4 x 6 in | Print, two-sided | none yet |
| Postcard | 6 x 9 in | Print, two-sided | none yet |
| Postcard | 6 x 11 in | Print, two-sided | none yet |
| Business card | 3.5 x 2 in | Print, two-sided | none yet |
| Door hanger | 4.25 x 11 in | Print, has a handle cut-out | none yet |
| Brochure, trifold | 8.5 x 11 in, folded | Print | none yet |
| Instagram post | 1080 x 1350 px | Screen only | none yet |
| Instagram story | 1080 x 1920 px | Screen only | none yet |

Print pieces carry 0.125 in bleed; screen pieces have none. Screen pieces
must never be offered for printing. Two-sided pieces have a front and a back
template, so both sides need showing.

Products with no templates yet should still be expected. Do not build the
site around flyers only.

## Flyer types

A flyer has a type, the reason it is being sent. The types, and the fields
each one needs, are in `marketing-design/products/flyer/flyer-types.md`:

Just Listed, Open House, Broker's Open, Coming Soon, Price Improved, Under
Contract, Back on Market, Just Sold, For Lease.

Only **Open House** has templates so far. Other types will get their own
designs, and some designs may later carry more than one type.

## The flyer templates

Each template is a folder under `marketing-design/products/flyer/<name>/`.
The folder name is the template's ID: lowercase kebab-case and stable. Use
it as-is in URLs, form values and data, the way frs-offices uses
`agent.template`.

| ID | Look | Ground | Agent shown as |
|---|---|---|---|
| `open-house-luxury` | Listing photo full bleed, revealed through a "1"; a gold "2" outline beside it, so the page reads 21 | Dark | Round headshot |
| `open-house-threshold` | Photo in a tall arched doorway; arches repeat for the gallery and headshot | Light | Arched headshot |
| `open-house-premiere` | Film poster: 2 x 2 photo grid fading into dark, big title block, house as a faded backdrop behind the agent | Gold to dark | Rounded-rectangle headshot |
| `open-house-signature` | Luxury ad: house full bleed with the title in its shadow, three large interiors down the side | Dark | **Cutout** standing on a gold card |
| `open-house-portrait` | Circles throughout: photo over a large grey circle, title band cut on the circle's curve | Light grey | **Cutout** in front of a grey disc |

Every template folder contains:

| File | Use |
|---|---|
| `sample.png` | **The preview to show.** Trim size, 2448 x 3168 px (8.5 x 11 in at 288 dpi), no bleed. It is the approved reference image |
| `notes.md` | Palette, what changes per listing, field limits, photo slots, anything the printer needs |
| `page.njk` | The template itself, rendered by the automation |
| `sample.json` | The sample content in the template's data shape |
| `page.html` | `page.njk` rendered with `sample.json`, viewable in a browser |
| `style.css`, `assets/` | Belong to that template only |

`products/flyer/README.md` lists the approved designs. There is no
machine-readable manifest yet. If the site needs one (name, description,
type, ground, requirements), propose adding it to marketing-design rather
than hand-copying the list here.

Anything under `marketing-design/proposals/` is unapproved. Never show it.

## The data every Open House flyer takes

One JSON document per flyer. It is nested camelCase, the same convention as
frs-offices `agent.json`, and `agentInfo` reuses the website's field names
so it can be prefilled from the agent's existing site record.

```json
{
  "template": "open-house-signature",
  "flyerType": "open-house",
  "agentInfo": {
    "fullName": "", "jobTitle": "", "dre": "", "phone": "", "email": "",
    "headshotUrl": "", "headshotCutoutUrl": ""
  },
  "listing": {
    "street": "", "city": "", "state": "", "zip": "",
    "priceLabel": "", "price": "",
    "beds": "", "baths": "", "sqft": "", "garageSpaces": "",
    "headline": "", "description": "",
    "heroImageUrl": "", "heroPositionX": "",
    "galleryImageUrls": ["", "", "", ""]
  },
  "openHouse": {
    "sessions": [
      { "date": "Saturday, October 24", "weekday": "Saturday", "month": "October", "day": "24", "time": "1:00 – 4:00 PM" }
    ]
  },
  "cta": { "heading": "", "subline": "" }
}
```

What is the same across all five:

- **1 to 3 open house sessions.** Every template is tested at 3.
- **One hero photo and four gallery photos**, landscape. Each template uses
  the photo slots differently; see its `notes.md`.
- **A description of about 520 characters** and a headline of about 60
  characters. These limits are what the layouts are tested against.
- **Optional fields are empty strings, not missing keys.** Empty stats hide
  their tile, and an empty price hides the price. Empty `cta` and
  `priceLabel` fall back to template defaults.
- **Values arrive pre-formatted.** Templates print `"$2,095,000"` and
  `"3,240"` as given, and do no number or date formatting.

What differs between templates:

| Requirement | Templates |
|---|---|
| `headshotCutoutUrl` (headshot with the background removed) | `open-house-signature`, `open-house-portrait` |
| Session `weekday` / `month` / `day` as separate parts | `open-house-threshold` |
| Gallery photo 1 not shown | `open-house-threshold`, `open-house-signature` |

The cutout is not something agents supply. The automation is expected to
produce it from the uploaded headshot with a background-removal step. Until
that exists, the two cutout templates cannot go live. The site needs some
way to know whether a template has unmet requirements.

## Brand rules that apply to the site itself

The gallery is itself a brand surface. The full rules are in
`marketing-design/brand/`; these are the ones that bite in UI work.

- **Two golds, never together.** Legacy `#ffc72c` (Joy of Home campaigns)
  and Relentless `#beaf87`. Pick one for the site's own chrome and stay in
  it. All five current templates are Relentless.
- **Colours come from `brand/colours.md` only.** Obsessed Grey `#252526`,
  Obsessed Grey Lt `#f4f4f6`, Obsessed Grey Med `#c4c4c6`, white, and the
  gold palette. Secondary colours are accents only.
- **Gold is never body text on a light background.** The contrast is too
  low.
- **Typefaces:** Typold (primary), Barlow Semi Condensed (headings), Oakes
  (body). Typold and Oakes are commercial. Confirm web-embedding rights
  before serving them from this site.
- **The wordmark and the seal are never locked together.** Logo files and
  rules are in `brand/logos/` and `brand/logo-rules.md`.
- **Voice:** warm, empowering, inclusive. Say the useful thing first. No
  pressure language. See `brand/voice.md`.
- **Show previews untouched.** No recolouring, cropping into the design or
  overlays on `sample.png` that could be mistaken for part of the design.

## The quality bar

These templates are deliberately premium. The brand wants every piece, even
a flyer, to make the agent look competent. The gallery should present them
with the same restraint: generous space, real hierarchy, nothing gimmicky.
A cluttered or generic picker undercuts the designs it shows.

## Known gaps (not this repo's to fix, but they affect it)

- **Legal text:** flyers carry one line only, "Each office is Independently
  Owned & Operated | Broker DRE# 01849354", now in `brand/legal-text.md`
  (Flyers) and in every flyer template (2026-10-15). The rest of that file
  is still blank. The templates' `sample.png` files still show the old
  placeholder, so the gallery previews are rendered from `page.html`
  instead (see the sync script).
- **Font licences** for Typold and Oakes are unconfirmed for PDF embedding
  and for the web. The mock serves them from GitHub Pages anyway; confirm
  before the site is public.
- **Barlow Semi Condensed** is not in `brand/fonts/`: only regular Barlow
  is. The site does not use Barlow until the right files arrive.
- **Logos:** some SVGs in `brand/logos/` are not true vectors. Replacements
  are coming.
- **Sample photos** are AI-generated demo images. They are fine as gallery
  previews of the design, but they are not real listings.
- **Print colour:** the templates are RGB HTML. Exact Pantone gold cannot
  come out of them.
- **Hero photo resolution:** full-bleed templates need originals around
  4,000 px wide. Typical MLS downloads print soft.

## Conventions carried over from frs-offices

- The template ID is the folder name and never changes once published.
- Never rely on Nunjucks `| default()` for form data: the form sends empty
  strings, and `default()` only replaces `undefined`. Templates already
  guard with `{% if %}`.
- Images are referenced by full URL in production. In marketing-design they
  are relative paths for the samples only.
- Performance claims (days on market, percent of asking, awards) were
  removed from the websites for compliance. Do not add them here without a
  decision from compliance.
