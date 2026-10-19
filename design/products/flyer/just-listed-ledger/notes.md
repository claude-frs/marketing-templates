# Flyer / just-listed-ledger

Approved 2026-10-16. Designed as HTML; `sample.png` is the approved render
(2448 x 3168) and is the spec.

`page.html` is `page.njk` rendered with `sample.json`.

## The idea

Set like a fine-dining menu or a private-bank statement. "JUST LISTED"
across the top on a hairline; a photo mosaic (the house large, three
interiors stacked beside it); the price as the big gold numeral with the
address opposite; then "The details", a ledger where dot leaders run from
each label to its figure ("Bedrooms ...... 4"), beside "The highlights",
the features in two columns. The agent stands at the foot of the page, cut
by its edge, with "Presented by", their details and the call to action
beside them.

The mosaic is flexible (190 to 250 pt), so a long feature list takes
height from the photos rather than running into the agent.

## Palette

**Relentless.** Obsessed Grey ground. White for the title, figures,
address and name; Relentless Gold for "LISTED", the price, captions, dot
leaders and feature dashes; Gold - Lt and Gold - Med for text.

## Photos

| Slot | Where it goes |
|---|---|
| `heroImageUrl` | The large mosaic photo |
| `galleryImageUrls[1]` to `[3]` | Stacked beside it |
| `galleryImageUrls[0]` | Not used |

## Agent

**Needs `agentInfo.headshotCutoutUrl`.**

## Not printed

**The headline and the description.** The price leads; the ledger and the
highlights carry the detail.

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
