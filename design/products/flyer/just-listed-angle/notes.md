# Flyer / just-listed-angle

Approved 2026-10-16. Designed as HTML; `sample.png` is the approved render
(2448 x 3168) and is the spec.

`page.html` is `page.njk` rendered with `sample.json`.

## The idea

One decisive cut. The house runs full bleed across the top of the page,
its lower edge cut by a single diagonal that falls from right to left,
with a 16 pt band of Relentless Gold following the cut. Below, on light
grey:

- **"JUST LISTED" and the price**, the two largest things on the page and
  set at the same size, flush left under the low side of the cut
- the address on a gold rule
- **four figures**: beds, baths, square feet and garage, divided by gold
  rules
- **more photos**: interiors stacked on the right, under the high side of
  the cut, and more in a row on the left

The slope leads the eye down to the price. Only the photo's edge is
angled; no type or photo is rotated.

- Title and price are 54 pt. Prices of 11 characters or more step both to
  49 pt together.
- **No feature list, headline or description.** Photos and figures carry
  the page.
- This is the light-ground Just Listed design. Cover, ledger and gallery
  are photo, dark and gold.

## Photos

Up to **six**: the hero plus up to five gallery photos that are not the
hero.

| Other photos | Right column | Row on the left |
|---|---|---|
| 5 | 3 | 2 |
| 4 | 3 | 1 (wide) |
| 3 | 2 | 1 (wide) |
| 1 or 2 | all | none |

The cut takes the bottom of the hero, so the house should sit in the
upper two thirds of the frame. Photos carry a fine keyline on the light
ground.

The sample's fifth and sixth photos (`detail-*.jpg`) are crops of the
demo images.

## Data

`listing.garageSpaces` is the fourth figure ("2-Car Garage") and can be
empty. `listing.features` is not printed by this design. The Just Listed
stress and sparse fixtures now carry `garageSpaces` too.

## Palette

**Relentless.**
- Ground: Obsessed Grey - Lt.
- Type: Obsessed Grey. The price is dark, for the strongest contrast.
- Relentless Gold: "LISTED", the cut and the rules.
- The white wordmark sits on the photo's shaded top; the legal marks are
  black.

## Agent

A circular headshot with a gold ring (`headshotUrl`). No cutout needed.

## Tested

`just-listed-stress.json`, `just-listed-sparse.json`,
`just-listed-few-photos.json` (three other photos) and
`just-listed-light-photo.json`.

## Legal and logo

- Legal line word for word from `brand/legal-text.md` (Flyers).
- The CENTURY 21 Masters lockup, from `brand/logos/clean/`.
