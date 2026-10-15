# Flyer / open-house-signature

Approved 2026-10-15. Designed as HTML, not in Figma. `sample.png` is the
approved render (trim size, 4x), and it is the spec in the same way a Figma
export is for `open-house-luxury`.

`page.html` is `page.njk` rendered with `sample.json`.

**Needs `agentInfo.headshotCutoutUrl` from the automation** (see below)
before it can go live in the gallery.

## The idea

A luxury property advertisement rather than a flyer.

- **The house** runs full bleed across the top half. A soft shadow at the
  top carries the white wordmark; the bottom fades into the dark ground and
  the left side is shaded for the title. Both shadows run the full height
  of the photo, so neither has an edge.
- **The title block** is set into that shadow: "OPEN" over "HOUSE" on two
  lines, the dates behind a short gold rule, and the stats as a
  spaced-capital credits line.
- **The other rooms** run down the photo's right edge as a contact sheet:
  three large framed photos (178 x 106 pt) with a fine pale edge. The
  two-line title is what leaves room for them to be this size.
- **The listing:** the price large in gold with the address under it on the
  left, and the headline and description on the right.
- **The agent card:** a solid gold card across the foot of the page. Its
  height wraps the agent's details and grows upward from a fixed bottom
  edge, so a one-line name gives a shorter card and a two-line name a
  taller one. The agent, cut out with no background, stands on that bottom
  edge with head and shoulders rising above the card into the dark.
  "Your host", the name, credential, contact and call to action sit beside
  them on the gold.

## Palette

**Relentless.** Obsessed Grey is the ground and the shadows. Relentless Gold
is the agent card, "HOUSE", the price and the rules. Gold - Lt is the body
text and the thumbnail edges, Gold - Med is the secondary text, and white is
the title, dates and address. No Legacy gold, and no secondary colours.

## New data: the cutout headshot

This design needs **`agentInfo.headshotCutoutUrl`**: the agent's headshot
with the background removed, as a transparent PNG or WebP. It should be cut
off straight at the bottom (waist or chest), with the head near the top.

The automation has to make it: run the uploaded headshot through a
background-removal step (a service such as remove.bg, or a model in the
pipeline) and store it next to `headshot.webp`. Agents should not be asked
to supply it themselves. If the cutout is missing, the card shows the
agent's details with no figure; it does not fall back to the square
headshot, which would look like a pasted photo.

The sample uses the demo headshot, which already had its background
removed, cropped to the figure.

## Data

| Slot | Where it goes |
|---|---|
| `heroImageUrl` | Full bleed across the top |
| `galleryImageUrls[1]` to `[3]` | The contact sheet, top to bottom (178 x 106 pt each) |
| `galleryImageUrls[0]` | Not used (usually the exterior again) |
| `agentInfo.headshotCutoutUrl` | The figure on the gold card |

Sessions are read as `date` and `time` only.

## Limits (tested)

- 1 to 3 dates. The title block grows upward over the photo.
- Street: one line at 13 pt up to about 40 characters.
- Description: about 520 characters.
- Agent name: two balanced lines at 22 pt. An email of 36 characters fits.

## Open points

- Legal line: "Each office is Independently Owned & Operated | Broker
  DRE# 01849354", word for word from `brand/legal-text.md` (Flyers).
  Updated 2026-10-15; `sample.png` still shows the old placeholder.
