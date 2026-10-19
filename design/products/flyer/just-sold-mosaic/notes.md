# Flyer / just-sold-mosaic

Approved 2026-10-19. Designed as HTML; `sample.png` is the approved render
(2448 x 3168) and is the spec.

`page.html` is `page.njk` rendered with `sample.json`.

**Ground:** Light grey.

## The idea

A layered mosaic. The title runs on one line in two voices, side by
side: "Just" in gold italic and "SOLD!" in heavy condensed black, with a
gold swash under it. A dark ribbon cuts in from the left bleed:
"Congratulations to the sellers!".
- The house, large, with a gold block offset behind it.
- Two interiors stacked on the right in white mounts, overlapping the
  house's edge.
- A full-bleed dark band with the address, the four figures in gold icon
  discs, and the price, then "Welcome home to the new owners" and the
  invitation.
- The footer, in two even halves on one centre line: on the left, the
  agent's portrait with "Sold by", name and credential; on the right,
  behind a gold rule, the phone, email and website stacked one per line,
  icon then text, left-aligned and never wrapped. Rebuilt on 2026-10-19:
  the first version used three centred columns, which spaced unevenly
  with a long email.

## Type

Typold Condensed Black for the heavy word and Typold Bold Italic for the
second voice, both from `brand/fonts/`.

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
