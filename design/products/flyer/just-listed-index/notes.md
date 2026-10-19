# Flyer / just-listed-index

Approved 2026-10-16. Designed as HTML; `sample.png` is the approved render
(2448 x 3168) and is the spec.

`page.html` is `page.njk` rendered with `sample.json`.

## The idea

Swiss editorial. "JUST LISTED" runs the full height of the left edge as a
vertical title, set apart by one gold hairline. Everything else hangs on a
strict grid to its right: the house, the interiors, the price and the
three figures, then the features as a numbered index (01, 02 ...) in two
columns, then the headline and description.

**Hierarchy:** title (vertical, always visible), then the house, then
price and address, then the figures, then the numbered features, then the
story, then the agent.

The house photo is flexible: it takes the height left over. A short
listing gets a bigger house; a long one gives a little height back
instead of overflowing.

## Palette

**Relentless.** White ground, Obsessed Grey type and rules, Relentless Gold
for "LISTED", the hairline and the index numbers. Obsessed Grey - Med for
the light dividers.

## Photos

| Slot | Where it goes |
|---|---|
| `heroImageUrl` | The main photo |
| `galleryImageUrls[1]` to `[3]` | The row of three under it |
| `galleryImageUrls[0]` | Not used |

## Agent

A small square headshot (`headshotUrl`) in the agent row.

## Data

The Just Listed shape (`sample.json`). It differs from Open House:

- **No dates.** There is no `openHouse` block.
- **`listing.features`** is a list of 3 to 10 short lines, written by the
  agent: details ("Built in 2025", "0.62-acre lot") and highlights
  ("Chef's kitchen with oversized island") alike. It replaces the fixed
  stat tiles. Garage, lot and year built belong here.
- **`beds`, `baths`, `sqft`** stay as the three key figures, because they
  are the facts every buyer looks for first. Any of them can be empty.
- `price` is expected (Just Listed always has one), and is pre-formatted.
- The call-to-action defaults are "Want to see it?" / "Call me for a
  private tour."

## Tested

- `tools/fixtures/just-listed-stress.json`: ten long features, a
  420-character description, 40-character street, 8-figure price,
  five-figure square footage, 31-character name, 36-character email.
- `tools/fixtures/just-listed-sparse.json`: three short features, no
  headline, one sentence of description, 1 bed / 1 bath, no square footage,
  no DRE or email.

Text was checked in the browser for overlaps, for text over interior photos
and for anything past the 30 pt margins, across all three cases; large
display type was checked from rendered pixels.

## Legal and logo

- Legal line word for word from `brand/legal-text.md` (Flyers), with the
  Equal Housing and REALTOR® marks, in the colour for the ground.
- Wordmark: the CENTURY 21 Masters lockup (not Luxury), from
  `brand/logos/clean/`. Which lockup goes on which piece is still to be
  confirmed.
