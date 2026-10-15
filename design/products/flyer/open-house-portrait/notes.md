# Flyer / open-house-portrait

Approved 2026-10-15. Designed as HTML, not in Figma. `sample.png` is the
approved render (trim size, 4x), and it is the spec in the same way a Figma
export is for `open-house-luxury`.

`page.html` is `page.njk` rendered with `sample.json`.

**Needs `agentInfo.headshotCutoutUrl` from the automation** before it can
go live in the gallery.

## The idea

The property and the person, both presented with confidence.

- **Circles only.** Every shape is a circle, and every large circle has the
  same fine gold ring just outside it.
  - A large mid-grey circle sits off the top-right corner, behind the
    photo, the dates and the stats (every stat sits at least 24 pt inside
    its edge). It balances the agent's disc on the opposite diagonal.
  - The title is a **dark band** hanging from the photo's bottom edge,
    filling the strip between the left margin and the large circle. Its
    right end is cut on a circle concentric with the large one, so the
    band follows the curve with an even 20 pt gap, the gold ring running
    through it. "OPEN" in light grey, "HOUSE" in gold, then "Offered at"
    and the price.
  - A small solid gold circle marks the photo's top-left corner, matching
    the one on the agent's disc.
  - The title text keeps at least 30 pt from the curve, even with an
    eight-figure price, and the band clears the gallery by 10 pt.
- **The photograph:** the house is a large photo across the top, with the
  stats under it in a 2 x 2 on the grey circle.
- **The gallery:** all four photos in a row under it.
- **The agent:** at the foot of the page, a large mid-grey disc runs off
  the left and bottom edges, with a fine gold ring just outside it and a
  small solid gold circle on its edge. The agent, cut out with no
  background, stands in front of the disc and is cut by the bottom of the
  page, like a personal-brand portrait.
- **The right column:** address, headline, description, then the agent's
  name, credential and contact under a rule, the call to action and the
  legal line.

## Palette

**Relentless, greys first.** Obsessed Grey - Lt (`#f4f4f6`) is the ground,
and Obsessed Grey - Med (`#c4c4c6`) is the two large circles. Obsessed Grey
is the type and the title band. There is no pure white on the page.
Relentless Gold is the touch: the two rings, the two small circles,
and "HOUSE". No Legacy gold, and no secondary colours.
Gold is never used for small text on grey.

The palette has only these two light greys. Grey reads as dominant here
through how much of the page the mid-grey circles cover, not through a
third grey, which would be off-palette.

## New data: the cutout headshot

Like `open-house-signature`, this design needs
**`agentInfo.headshotCutoutUrl`**: the headshot with the background
removed, as a transparent PNG or WebP, cut off straight at the bottom. The
automation makes it with a background-removal step; agents do not supply it.
If it is missing, the disc stays and the figure is left out.

## Data

| Slot | Where it goes |
|---|---|
| `heroImageUrl` | The large photograph |
| `galleryImageUrls[0]` to `[3]` | The row of four |
| `agentInfo.headshotCutoutUrl` | The figure in front of the disc |

Sessions are read as `date` and `time` only. They sit top right, right
aligned, and three dates fit above the photo.

## Limits (tested)

- 1 to 3 dates.
- Street: one line at 15 pt up to about 40 characters.
- Description: about 520 characters.
- Agent name: wraps to three lines for a 31-character name and still fits.
  The call to action stays 10 pt clear of the legal line.
- The disc and ring stay left of the text column at every size.

## Open points

- Legal line: "Each office is Independently Owned & Operated | Broker
  DRE# 01849354", word for word from `brand/legal-text.md` (Flyers).
  Updated 2026-10-15; `sample.png` still shows the old placeholder.
