# Flyer / open-house-luxury

Open house flyer, 8.5 x 11 in, CENTURY 21 Masters Luxury.

Figma: https://www.figma.com/design/lW6OfJyTSxaZEgzrIkLI0I/Untitled?node-id=3-2
(frame `flyer`, node 3:2). `sample.png` is the export of that frame at 4x.

## Palette

**Relentless.** No Legacy gold anywhere in this piece.

| Use | Colour |
|---|---|
| "HOUSE", price, agent name, tile icons, outlines, gallery borders | Relentless Gold `#beaf87` |
| "Come see it in person!" | Relentless Gold - Med `#ded7c3` |
| Tiles, "OPEN", schedule line | Obsessed Grey `#252526` |
| Pills | White `#ffffff` |
| Contact pill gradient, left end (accent) | Dark Gold `#a19276` |
| Overview headline (accent) | Dark Gold - Med `#b9b2a3` |
| Overview body | Dark Gold - Lt `#f1efec` |
| Headshot ground | Medium Grey `#808285` |
| Page ground, footer, "Offered at", contact text | Digital Black `#121212` |

"Offered at" is pure black `#000` in Figma. It is built as Digital Black,
because `#000` is not on the palette. The two cannot be told apart in print.

## The idea

The page spells **21**. The large gold outline on the left is a "2"
(`assets/numeral-2.svg`, 20% opacity). The listing photo runs full bleed at
20% and shows at full strength through a "1": a flag from x 251 to 612, 234
deep, then a stem from x 378 to the bottom. Both shapes are taken from the
Figma layers (`2` and the `74056 1` mask), not redrawn.

Anyone editing this must keep the "1" and the "2" where they are. Moving
either breaks the 21.

## Files

| File | What it is |
|---|---|
| `page.njk` | The template. Nunjucks, rendered by the automation with one flyer JSON |
| `style.css` | This template's CSS. Units are pt, 1:1 with the Figma frame |
| `sample.json` | The Figma content, in the data shape the template expects |
| `page.html` | `page.njk` rendered with `sample.json`. Open it to check against `sample.png` |
| `assets/` | Wordmark, numeral, icons, compliance marks |
| `assets/sample/` | Demo photos and headshot. Placeholders only, never printed |

The page is 630 x 810 pt, which is the trim size plus 0.125 in bleed on every
side. `@page` sets the same size, so printing to PDF gives one page at
8.75 x 11.25 in with the trim box centred.

## What changes per flyer

The data uses nested camelCase, the same as the website `agent.json`:
`agentInfo` reuses the website field names, so the order form can prefill
it from the agent's site.

| Field | Example | Rules |
|---|---|---|
| `agentInfo.fullName` | Marcus Hale | About 30 characters at most, or it runs into the call to action |
| `agentInfo.jobTitle` | Realtor® | Empty falls back to "Realtor®" |
| `agentInfo.dre` | 02184736 | Empty drops the "\| DRE #:" part |
| `agentInfo.phone` | (805) 555-0147 | Empty hides the pill |
| `agentInfo.email` | marcus@halehomesca.com | About 36 characters. Empty hides the pill |
| `agentInfo.headshotUrl` | | Portrait, 2:3, at least 450 x 675 px. Shown as a circle; the crop is fixed (see below) |
| `listing.street` | 1847 Larkspur Ridge Drive | One line, about 34 characters. Include the unit number here |
| `listing.city` / `state` / `zip` | Thousand Oaks / CA / 91362 | |
| `listing.priceLabel` | Offered at | Empty falls back to "Offered at" |
| `listing.price` | $2,095,000 | Pre-formatted, with the $ and commas. Empty hides the price pill |
| `listing.beds` | 4 | "1" gives "Bed". Empty hides the tile |
| `listing.baths` | 3.5 | Halves allowed. "1" gives "Bath". Empty hides the tile |
| `listing.sqft` | 3,240 | Pre-formatted. Empty hides the tile |
| `listing.garageSpaces` | 2 | Number only; the tile reads "2-Car Garage". Empty hides the tile |
| `listing.headline` | Modern Living, Designed in… | 60 characters at most (two lines) |
| `listing.description` | | 520 characters at most. Past about 560 the gallery starts to shrink, and past 600 the text clips |
| `listing.heroImageUrl` | | Landscape exterior. See the resolution note below |
| `listing.heroPositionX` | 35 | Optional, 0 to 100. Slides the photo sideways so the house sits in the "1". Default 35 |
| `listing.galleryImageUrls` | 4 URLs | Exactly four. Landscape. The first is usually the exterior again |
| `openHouse.sessions[]` | `{ "date": "Saturday, October 24", "time": "1:00 – 4:00 PM" }` | 1 to 3. One line each. The automation formats them; the template prints them as given |
| `cta.heading` | | Optional. Empty falls back to "Come see it in person!" |
| `cta.subline` | | Optional. Empty falls back to "Can't make it? Call me for a private tour" |

The template guards every optional field with `{% if %}` and never uses
`| default()`: the form sends empty strings, and `default()` only fills
`undefined`.

### Two or three open house dates

Each date is its own line in the white pill, and the pill grows downwards.
The wordmark is top-aligned so it does not move. The body gets a
`ohl--sessions-N` class, which tightens the gap between stat tiles (30, then
22, then 14 pt) so the legal block never gets pushed off. The gallery is
allowed to shrink from 250 to 190 pt to make room. This has been tested with
three dates, an eight-figure price, a long street and a long agent name.

## What must not move

- The wordmark, top right: 139 x 43 at x 453, y 40 (trim coordinates).
- The "2" and the "1" (see above).
- The legal block, under the stat tiles, inside the trim.
- The left pills (title, price, overview) run into the bleed on the left.
  That is deliberate, so a printer's trim never leaves a white sliver.

## Printer and production notes

- **Hero photo resolution.** The photo is scaled to cover the full page
  height, so a 16:9 image renders about 20 in wide. That needs around
  4,000 px wide for 200 dpi. A typical 2,048 px MLS photo comes out near
  100 dpi in the "1", which will look soft. The demo photo is 2,000 px.
  Ask agents for originals, not MLS downloads.
- **Bottom safe margin.** The contact pills end 12 pt above the trim. The
  default safe area in `sizes.md` is 18 pt. Fine for most printers, but
  confirm with the printer.
- **Legal text is 6 pt.** That is legible in print but at the lower limit.
- **Typold is CFF (OpenType).** Chromium's PDF output turns CFF fonts into
  Type 3 fonts. They print, but some prepress checks flag Type 3. Oakes is
  TrueType and embeds normally.

## Open questions for Brand Experience

These are places where the design and the brand files disagree. The build
follows the design, because `sample.png` is the spec, but none of them should
be settled here.

1. **Typefaces.** `brand/typography.md` puts body copy in Oakes and headings
   in Barlow Semi Condensed. This design uses Typold for everything except
   the price, which is Oakes. Sizes are also below the guideline steps
   (title 40, headings 14, body 10). That is expected at flyer scale, but
   the face per role is not.
2. **Legal wording.** Settled 2026-10-15: "Each office is Independently
   Owned & Operated | Broker DRE# 01849354", word for word from
   `brand/legal-text.md` (Flyers). The Equal Housing and REALTOR® marks
   are now the white versions, since they sit on the dark ground.
   `sample.png` still shows the old placeholder and black marks.
3. **Compliance marks.** The Equal Housing and REALTOR® marks are black on a
   near-black background, so they barely show, in Figma and here alike. They
   should almost certainly be the white versions.
4. **Digital Black as the ground.** It is in the secondary palette, which
   "never leads a layout". Here it is the page ground and the footer.
5. **The "2".** It reads as a brand graphic. Is it an approved crop of the
   seal or pattern, or a one-off?
6. **Font licences.** The Typold and Oakes files in `brand/fonts/` came from
   free font download sites (cufonfonts, fontsempire). Oakes's own readme
   says they may be trial versions that do not allow embedding. The files'
   embedding flag reads "preview and print" for Typold and "installable" for
   Oakes, but that flag is not a licence. Licensed files are needed before
   anything goes to a printer.

## Sample content

- **Baths.** "3 Baths" on the tile does not match "3.5-bath" in the
  description. `sample.json` keeps 3 to match the Figma file.
- **Photos.** The demo interiors are AI-generated (Magnific). That is fine
  for a sample, but `brand/photography.md` rules them out for a real piece.
