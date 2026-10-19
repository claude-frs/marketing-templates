# Flyer / just-sold-script

Approved 2026-10-17. Designed as HTML; `sample.png` is the approved render
(2448 x 3168) and is the spec.

`page.html` is `page.njk` rendered with `sample.json`.

**Ground:** White and photo.

## The idea

Two voices and a diagonal. A white panel meets the photograph along a
diagonal edged in gold. The title is two voices laid over each other:
"JUST" in heavy Typold Condensed Black, and "Sold!" in gold Typold Bold
Italic lapping across its foot, with a white keyline where it crosses.
- A dark ribbon: "Congratulations to the sellers!"
- The address (gold pin) and sold price (dollar disc) on dotted rules.
- Beds, baths, sq ft and garage in dark icon discs, divided by gold rules.
- Three interiors in white mounts straddling the photo's lower edge.
- "Congratulations to the new owners", then "Thinking of selling?".
- A split footer: the agent on a gold slant, and three contact columns
  (call, email, website) in icon discs.

## What was taken from the reference

Not its layout or colours, but its richness:
- typographic contrast (a heavy condensed word against a flowing italic)
- layering (a photo with a diagonal or slanted edge, mounted interiors
  straddling a boundary)
- a ribbon banner, and icon discs for every fact
- explicit congratulations
- a full contact row
- every part of the page doing something

The brand's own type is used: Typold Condensed Black and Typold Bold
Italic, both in `brand/fonts/`. There is no script face in the kit, so
the italic stands in for it.

## Photos

The hero, plus up to three interiors that are not the hero. With none
(the sparse case), the interiors' space stays empty but the layout holds.

## Just Sold data

```json
"sale": { "soldPriceLabel": "Sold for", "soldPrice": "$2,140,000", "side": "seller" }
```

- `soldPrice` is **optional**: show it only if the seller agrees. With no
  price the layout closes up (tested).
- `side` is `seller`, `buyer`, `both` or empty, printed as "Represented
  the seller / buyer / buyer and seller".
- The figures are beds, baths, sq ft and garage (`listing.garageSpaces`).
- `agentInfo.website` (optional) adds a third contact column.
- There is no feature list, headline or description. Just Sold advertises
  the agent to the neighbours, not the house to buyers.
- The call to action defaults to "Thinking of selling?" / "Call me for a
  free home valuation."
- No performance claims (days on market, percent of asking) without a
  compliance decision.

## Tested

`tools/fixtures/just-sold-stress.json` (8-figure price, both sides, long
street, long name and email), `just-sold-sparse.json` (no price, no side,
1 bed / 1 bath, no DRE or email, no gallery photos) and
`just-sold-light-photo.json`.

## Legal and logo

- Legal line word for word from `brand/legal-text.md` (Flyers).
- The CENTURY 21 Masters lockup, from `brand/logos/clean/`, as for Just
  Listed. Which lockup goes on which piece is still to be confirmed.
