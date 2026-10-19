# Flyer / just-sold-congrats (Congratulations)

Approved 2026-10-17. Designed as HTML; `sample.png` is the approved render
(2448 x 3168) and is the spec.

`page.html` is `page.njk` rendered with `sample.json`.

**Ground:** Photo / dark.

## The idea

The house fills the top of the page, full bleed, fading into dark. Out
of the fade rises "SOLD" in large gold capitals, and under it the
headline the flyer is really about: **"Congratulations to the new
owners!"** A warm line follows ("It was a joy to help make Larkspur Ridge
Drive home."), then the details, the agent and the invitation.

**"Sold":** gold capitals rising out of the photo's fade.
**Agent:** a round headshot.

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
