# Flyer / open-house-premiere

Approved 2026-10-15. Designed as HTML, not in Figma. `sample.png` is the
approved render (trim size, 4x), and it is the spec in the same way a Figma
export is for `open-house-luxury`.

`page.html` is `page.njk` rendered with `sample.json`.

This grew out of `open-house-elevation`: the four gallery panels stayed and
grew, and the house-shaped photo went.

## The idea

A film poster.

- **The grid:** four photos in a 2 x 2 grid of rounded rectangles under the
  wordmark. All four are shown in full, with nothing laid over them, so a
  buyer sees the exterior and three rooms. Each is about 271 x 139 pt with
  one date.
- **The fade:** behind the photos, the gold ground darkens from the middle
  of the grid to solid Obsessed Grey at its bottom edge, then stays solid
  down into the band. The photos sit on gold at the top and on dark at the
  bottom, and the page has no hard edge.
- **The billing block:** on the dark under the grid, "OPEN HOUSE" large,
  the address as a spaced-capital line under it, the dates between gold
  rules, the stats as a credits line, and the price. It is anchored above
  the band. Two or three dates make it taller, and the grid gets shorter to
  match (288, 270, 256 pt) so the billing never covers a photo.
- **The band:** the hero photo is the band's backdrop on the right, darkened
  (66% Obsessed Grey over it) and faded in from the left and from the top,
  so it has no visible edge. Over it sit the agent portrait (a rounded panel,
  the same shape as the poster panels, with a gold edge), the agent's name,
  credential, contact and call to action, and the headline and description.

## Palette

**Relentless.** Relentless Gold is the ground at the top and the accent
(the word "HOUSE", the price, the rules, the agent name). Obsessed Grey is
the fade and the band. Gold - Med and Gold - Lt carry the text on the dark,
with white for the title and the dates. No Legacy gold, and no secondary
colours.

## Type

- Title: Typold Bold, 74 pt.
- Price, stat values, headline, agent name, call to action: Typold Bold.
- Tagline, dates, credits, description, contact: Oakes Grotesk.

## Data

The same shape as the other open house templates. Sessions are read as
`date` and `time` only.

| Slot | Where it goes |
|---|---|
| `galleryImageUrls[0]` to `[3]` | The 2 x 2 grid, left to right, top to bottom |
| `heroImageUrl` | The band backdrop, right side, darkened |

The grid cells are wide landscape shapes (about 2:1), so photos lose a
little at the top and bottom. Ordinary landscape listing photos work well.

## Limits (tested)

- 1 to 3 dates. The grid shortens and the billing grows into the space; at
  least 15 pt always separates them. The band never moves.
- Street and city run together as one tagline line. "28415 Pacific Coast
  Highway Unit 12 · Thousand Oaks, CA 91362" fits.
- Description: about 520 characters.
- Agent name: wraps to three lines for a 31-character name and still fits.
  An email of 36 characters fits, with 15 pt to spare before the overview.
- Any stat left empty drops out and the credits line re-centres.

## Things to know

- **The fade and the backdrop overlay are transparency.** Chromium flattens
  them correctly in the PDF, but transparency is worth mentioning to the
  printer.
- **The white Equal Housing and REALTOR® marks** are the same artwork as the
  black ones in the other templates, colour swapped.
- Legal line: "Each office is Independently Owned & Operated | Broker
  DRE# 01849354", word for word from `brand/legal-text.md` (Flyers).
  Updated 2026-10-15; `sample.png` still shows the old placeholder.
