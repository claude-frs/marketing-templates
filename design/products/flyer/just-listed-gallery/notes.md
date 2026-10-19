# Flyer / just-listed-gallery

Approved 2026-10-16. Designed as HTML; `sample.png` is the approved render
(2448 x 3168) and is the spec.

`page.html` is `page.njk` rendered with `sample.json`.

## The idea

The photographs are the flyer. On a Relentless Gold page, a bento gallery
takes most of the sheet: the house large, two photos stacked beside it,
and a row of up to four beneath, separated by narrow gold seams. The type
is reduced to what a buyer scans for:

- "Just Listed" (sentence case, "Listed" in white) with the price opposite
- the address and the three figures on one ruled line
- the features as a compact three-column list
- the agent on a dark band across the foot

**No overview.** There is no headline or description. Just Listed is about
showing the home, and this design gives that space to photos.

## Photos

Up to **seven**: the hero plus up to six from `galleryImageUrls`.

- Any gallery photo that is the same file as the hero is skipped. The usual
  "exterior again" in slot 1 never repeats, without a special rule.
- The first two fill the column beside the hero; the rest (up to four)
  share the row beneath.
- Three others: the row has one wide photo (tested). One or two others:
  the row is left out and the column takes them. Fewer than three others
  is not recommended for this design.
- Order the photos so the same room is never side by side.

The gallery takes the height left after the features, so a long feature
list shortens the photos slightly instead of overflowing.

The sample's extra photos (`detail-*.jpg`) are crops of the four demo
images, made only to show a seven-photo layout.

## Palette

**Relentless.** Gold ground, Obsessed Grey type and rules, white for
"Listed". The agent band is Obsessed Grey with a gold name and white legal
marks.

## Agent

A portrait headshot (`headshotUrl`) on the dark band. No cutout needed.

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
- `tools/fixtures/just-listed-few-photos.json`: the hero plus three others.

Text was checked in the browser for overlaps, for text over interior photos
and for anything past the 30 pt margins, across all three cases; large
display type was checked from rendered pixels.

## Legal and logo

- Legal line word for word from `brand/legal-text.md` (Flyers), with the
  Equal Housing and REALTOR® marks, in the colour for the ground.
- Wordmark: the CENTURY 21 Masters lockup (not Luxury), from
  `brand/logos/clean/`. Which lockup goes on which piece is still to be
  confirmed.
