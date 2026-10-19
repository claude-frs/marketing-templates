# Flyer / just-sold-keys (Keys)

Approved 2026-10-17. Designed as HTML; `sample.png` is the approved render
(2448 x 3168) and is the spec.

`page.html` is `page.njk` rendered with `sample.json`.

**Ground:** Dark.

## The idea

The keys are handed over: the moment a sale becomes real. On dark, with
the house faintly behind (20%), the agent, cut out with no background,
stands on the right holding out the keys. On the left: **"Sold."** in
large gold with a white full stop, then "The keys are handed over." and
"Congratulations to the new owners of 1847 Larkspur Ridge Drive, and
welcome to Thousand Oaks." The sale and the invitation follow down the
left. Nothing is placed in the figure's zone.

**"Sold":** a full stop. Settled, done.
**Agent: needs `agentInfo.headshotCutoutUrl`.** It works best with a
cutout of the agent holding keys or gesturing towards the reader.

## Tone

Just Sold is a celebration, not a sales notice: warm, congratulatory and
neighbourly, in the brand voice. "Thinking of selling?" is still there,
but it comes after the good news.

## Just Sold data

```json
"sale": { "soldPriceLabel": "Sold for", "soldPrice": "$2,140,000", "side": "seller" }
```

- `soldPrice` is **optional**: show it only if the seller agrees. With no
  price the layout closes up (tested).
- `side` is `seller`, `buyer`, `both` or empty, printed as "Represented
  the seller / buyer / buyer and seller".
- The figures are beds, baths, sq ft and garage (`listing.garageSpaces`).
- `sale.message` (optional) replaces the template's warm line, e.g. a
  personal note. Each template has its own default.
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
