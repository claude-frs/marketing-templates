# Flyer / open-house-threshold

Approved 2026-10-15. Designed as HTML, not in Figma. `sample.png` is the
approved render (trim size, 4x), and it is the spec in the same way a Figma
export is for the other templates. If this design is ever rebuilt in Figma,
replace `sample.png` with that export.

`page.html` is `page.njk` rendered with `sample.json`.

## The idea

An open house is an open door. The listing photo stands in a tall **arched
doorway**. A gold outline steps out behind it, like the door's shadow, and a
fine white keyline inside the photo reads as the casing. The same arch comes
back smaller for the three gallery photos (the middle one taller, for rhythm)
and again for the agent's headshot. The whole page is built from one shape.

A dark **seal** sits on the door's lower-left edge. "Open House · Come On
In" runs around it, with the house icon in the middle. It is the one dark
note on a light page, so the eye lands there and moves to the title.

The ground is Relentless Gold - Lt, with a block of Relentless Gold - Med
behind the door, like a wall it is set into. That block runs off the top and
right into the bleed, and its rounded corner echoes the arch.

The date is set as an **outlined numeral** ("24") beside the weekday and
time, between hairline rules. It reads like an invitation card rather than a
data line.

## How it compares to open-house-luxury

| | open-house-luxury | open-house-threshold |
|---|---|---|
| Theme | Dark, photo full bleed | Light, photo framed |
| Mask | The photo shows through a "1" | The photo shows through an arch |
| Type | Typold throughout | Typold for display, Oakes for text (closer to `brand/typography.md`) |
| Title | 40 pt | 64 pt, the guideline Title size |
| Compliance marks | Black on dark (barely visible) | Black on light (readable) |

## Palette

**Relentless.** Gold - Lt ground, Gold - Med wall, Relentless Gold for the
title, rules, outlines, numerals and seal lettering, and Obsessed Grey for
text and the seal. Dark Gold (secondary) is used once, for the price, as an
accent: Relentless Gold is too pale to read on the light ground at that
size. No Legacy gold.

## Type

- Title: Typold Bold, 64 pt.
- Address, price, stat values, headline, agent name: Typold Bold.
- Description, captions, dates, contact lines: Oakes Grotesk.
- The guideline puts headings in Barlow Semi Condensed. There are no Barlow
  Semi Condensed files in `brand/fonts` (only regular-width Barlow), so it is
  not used here. Worth adding to the kit.

## Data

Same shape as `open-house-luxury` (see its `notes.md`), with one addition:
each open house session also carries its parts, so the day can be set as a
numeral.

```json
{ "date": "Saturday, October 24", "weekday": "Saturday", "month": "October", "day": "24", "time": "1:00 – 4:00 PM" }
```

The automation should fill all five from one date picker. `open-house-luxury`
reads only `date` and `time`, so the same session object works for both.

The fourth gallery slot is not used. This design shows the hero in the door
plus gallery photos 2, 3 and 4 in the small arches.

## Limits (tested)

- 1 to 3 dates. Three dates shrink the numerals and rules to fit.
- Street: wraps to two balanced lines. The story moves down to make room.
- Description: about 520 characters, the same as the sample.
- Agent name: one line up to about 22 characters. Longer names wrap and
  still fit, but three lines (tested with a 31-character hyphenated name) is
  the limit.
- Any stat left empty is dropped and the others share the row.

## Open points

- Legal line: "Each office is Independently Owned & Operated | Broker
  DRE# 01849354", word for word from `brand/legal-text.md` (Flyers).
  Updated 2026-10-15; `sample.png` still shows the old placeholder.
- The seal uses the brand wordmark nowhere and sits well away from it, so it
  is not a lockup. It is our own graphic, not the C21 seal.
- Photos in `assets/sample/` are the AI-generated demo set. Not for print.
