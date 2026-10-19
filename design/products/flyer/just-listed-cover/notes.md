# Flyer / just-listed-cover

Approved 2026-10-16. Designed as HTML; `sample.png` is the approved render
(2448 x 3168) and is the spec.

`page.html` is `page.njk` rendered with `sample.json`.

## The idea

A magazine cover. "JUST LISTED" is the masthead across the top, the house
is the cover image, and the features are the cover lines down both sides.
The headline is the lead story at the top of the left column. Price and
address sit at the foot of the image like the issue's main line, with the
three figures opposite. The interiors are "Inside", and the agent signs
off underneath.

**Hierarchy:** masthead, then the house, then price and address, then the
figures, then the cover lines, then the interiors, then the agent.

## Palette

**Relentless.** The photo, shaded with Obsessed Grey at the top (for the
masthead), both sides (for the cover lines) and the foot (into the ground).
Shading runs the full photo, so there are no edges. White type, with
Relentless Gold for "LISTED", the price, the cover-line rules and the agent
name, and Gold - Med for captions.

## Photos

| Slot | Where it goes |
|---|---|
| `heroImageUrl` | The cover image, full bleed to y 560 |
| `galleryImageUrls[1]` to `[3]` | "Inside": three interiors |
| `galleryImageUrls[0]` | Not used |

Cover lines sit over the photo's shaded sides; the middle of the house is
kept clear. A photo with the house centred works best (`heroPositionX`).

## Not printed

**The description.** On a cover the headline is the story and the
features are the cover lines. If the description must always print, this
design is not the right one for that listing.

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
