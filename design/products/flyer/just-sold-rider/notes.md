# Flyer / just-sold-rider

Approved 2026-10-20. Designed as HTML; `sample.png` is the approved render
(2448 x 3168) and is the spec.

`page.html` is `page.njk` rendered with `sample.json`.

**Ground:** Relentless Gold. It is the only gold-ground Just Sold design.

## The idea

The sold sign. Every neighbour knows the moment the "SOLD" rider goes up
on the yard sign.
- **The sign:** a dark signpost stands on the left of the gold page, its
  arm reaching across the top. From the arm hangs the rider plate: "Just"
  in white italic and "SOLD!" in gold Typold Condensed Black, inside a
  fine gold keyline. Below it, on dotted chains, hangs the sign panel
  itself: the house photo in a heavy dark frame.
- **The street sign:** directly under the house hangs a street-name
  plate, white keyline on dark like a real street sign, with the address
  in condensed capitals and the city below. The house and its address
  read as one post.
- **Stat plates:** beds, baths, sq ft and garage hang below the street
  sign as four small rider plates on chains. The sign, street plate and
  stat plates hang as one column, so each follows the one above (a
  two-line address pushes the plates down).
- **The column beside the sign:** up to three interiors in white mounts,
  the sold price, and "Congratulations to the new owners!".
- **The agent:** below the sign, standing on the ground line: headshot,
  "Thinking of selling? Call me for a free home valuation.", name and
  credential, with the phone large on the right and the email and website
  under it.

Revisions on 2026-10-20:
- v2 replaced a copied stats row and footer band with the plates and a
  name strip on the sign.
- v3 moved the address under the house as a street sign and the agent
  below the sign, and fixed "Congratulations" overflowing the right
  margin. Measured: "Congratulations" now ends at 565.5 pt and the
  8-figure price at 565.4 pt (margin 582); the plates clear the agent row
  by 19 pt in the long case.

It is different from the four approved designs: `congrats` (photo fading
to dark), `keys` (agent cutout), `script` (diagonal split) and `mosaic`
(one-line title over a photo mosaic).

## Just Sold data

```json
"sale": { "soldPriceLabel": "Sold for", "soldPrice": "$2,140,000", "side": "seller" }
```

- `soldPrice` is **optional**: show it only if the seller agrees. With no
  price the layout closes up (tested).
- `side` is `seller`, `buyer`, `both` or empty, printed as "Represented
  the seller / buyer / buyer and seller".
- The figures are beds, baths, sq ft and garage (`listing.garageSpaces`).
- `agentInfo.website` (optional) appears under the phone.
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
