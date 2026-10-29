# Asset register

Every image in this concept is BLEND's own photography or branding, taken from BLEND's public website or Square booking profile. Nothing is stock, AI-generated, or invented. **None of it is licensed for reuse.**

Use is limited to this private, speculative pitch to BLEND's owners. Before anything is published, BLEND must confirm that it owns the photos, that the photographer and the people pictured (including minors) have consented to web use, and that it grants permission.

## How images were processed

[scripts/process-images.mjs](scripts/process-images.mjs) does the following:
- Downloads each original from the URL listed below into `.cache/originals/`, which is git-ignored.
- Applies one treatment: grayscale with a slight warm plaster tint, so the staff headshots match the gallery series. The two colour photos (`room-chairs`, `series-cast`) are only desaturated.
- Writes responsive WebP files (plus AVIF for the hero images) to `public/img/`, and a size and blur-placeholder manifest to `src/data/image-manifest.json`.

Crops are done in CSS (`object-position`, plus a zoom on `craft-clipper`). The originals are unchanged.

To rebuild, run `node scripts/process-images.mjs`.

Source URL prefixes used below:
- `SITE` = `https://87f6572a2ecef4e68947.cdn6.editmysite.com/uploads/b/87f6572a2ecef4e689475df030cb7a1eb1bf6a28183859818801345b8366c3bf/`
- `GALLERY n` = `SITE` + `Blend_Barbershop_MGS_MENS_GROOMING_AND_SPA_321_GROVE_ST_JERSEY_CITY_NJ_07302_HAIRCUT_FADE_BEARDTRIM<n>_<timestamp>.<ext>` (BLEND's Gallery page, https://www.blendmensgrooming.com/gallery)
- `STAFF id` = `https://appointments-production-f.squarecdn.com/files/<id>/original.jpeg` (Square booking staff profiles)

## Brand

| Asset | Where it appears | Source | Status |
|---|---|---|---|
| BLEND wordmark (`logo-800.webp`) | Header, menu, footer. Recoloured with a CSS mask. | `SITE` + `12.15.2025_693f71da22b902.05285733.jpeg` (BLEND's own logo file). Trimmed and converted to an alpha mask; the letterforms are unchanged. | BLEND's mark, used unaltered. A vector original is needed for production. |
| Favicon (`public/favicon.svg`) | Browser tab | Made for this concept: a "B" on ink. | Placeholder. Replace with an official BLEND icon. |
| Plaster grain texture | Section backgrounds | Generated inline SVG noise (`feTurbulence`) in `src/index.css`. | Original to this concept, no restrictions. |
| Embossed "BLEND" type | Experience and Work chapters | CSS text styled to echo the raised letters on the shop wall. | Original treatment. Set in Archivo, not the logo file. |

## Photography

| ID | Where it appears | Source | Notes |
|---|---|---|---|
| `hero-portrait` | Mobile and tablet hero | `GALLERY 23` (…TRIM23_1768691274.JPG) | Client laughing in front of the B L E N D wall. Identity unknown; needs model consent. |
| `hero-wall` | Desktop hero | `GALLERY 280` (…TRIM280_1768691296.jpg) | Client in profile against the wall. Same consent need. |
| `craft-clipper` | Experience · The Craft | `GALLERY 169` | Barber at work. The barber isn't named because his identity isn't confirmed. |
| `craft-lineup` | Experience · The Transformation | `GALLERY 68` | Also appears in the gallery. |
| `room-chairs` | Experience · The Room | `GALLERY 80` (…TRIM80_1768691246.JPG) | Colour interior, desaturated. The only interior shot available, and it is low resolution (947×818). |
| `room-kid` | Visit (tablet and desktop) | `GALLERY 257` | Barber with a young client. **Minor pictured: needs a parent's consent.** |
| `series-cast` | Interlude: Blend on Grove St. | `SITE` + `IMG_2401_1778374744.jpeg` | Cast collage from the series, with names burned in. Promotional; confirm the cast agrees to its use. |
| `barber-adam` | Barbers, booking sheet | `STAFF 461ddf259d445f10b738dc826442f66a` | Square profile photo. |
| `barber-wander` | Barbers, booking sheet | `STAFF 98c91c1ed80b994b2e20456f70724bdd` | Square profile photo (colour original). |
| `barber-eddie` | Barbers, booking sheet | `STAFF b39c8b5770d6f16a7b5b0d8edc76065d` | Square profile photo. |
| `barber-eric` | Barbers, booking sheet | `STAFF c0b6376e4bbd19df50bef5dd773e6677` | Square profile photo. |
| `barber-jonas` | Barbers, booking sheet | `STAFF c61345670a85a682ad73bfb83b89033f` | Square profile photo (low-light original). |
| `barber-danny` | Barbers, booking sheet | `STAFF 6caf44bbf33f30e0507e6c983bcbf625` | Square profile photo. |

### Gallery ("The work speaks"): 24 client portraits

All are from BLEND's Gallery page (`GALLERY n`), shot on the BLEND wall. Gallery numbers used:

68, 28, 61, 126, 49, 2, 239, 21, 5, 210, 266, 246, 18, 71, 262, 231, 122, 3, 228, 283, 119, 251, 140, 29

The exact filenames and timestamps are in `scripts/process-images.mjs`.

- **Minors pictured**: 126, 5 and 262. These need a parent's consent before any public use.
- **Alt text**: describes the haircut, not the person. No client names are known or used.
- **No barber credits**: photos aren't attributed to individual barbers because the gallery doesn't say who cut what. Ask BLEND for attributions so each barber card can show their own work.

## Type

| Font | Use | Licence |
|---|---|---|
| Instrument Serif (regular and italic, Latin subset) | Display headlines | SIL Open Font License 1.1; file in `public/fonts/OFL-instrument-serif.txt`. From Fontsource. |
| Archivo Variable (width axis, Latin subset) | Labels, body, UI | SIL Open Font License 1.1; file in `public/fonts/OFL-archivo.txt`. From Fontsource. |

## Text content

- **Service names, prices, durations and descriptions**: BLEND's Square booking page (Oct 29, 2026). Some are lightly condensed; quoted phrases are verbatim.
- **Barber bios**: condensed from each barber's Square profile; quoted phrases are verbatim.
- **Reviews**: verbatim Google reviews from BLEND's own reviews-widget feed (see RESEARCH.md). Shown with first name, last initial and month. Reviewers who share a surname with staff are excluded.
- **"Where grooming meets experience."**: BLEND's Instagram bio. The Experience intro paraphrases BLEND's own site copy.
- **"MORE THAN A CUT."**: the brief's working headline, not an existing BLEND tagline. It needs the owners' approval.

## Gaps: photos the production site needs

1. Hot towel, shave and facial photos. The Ritual card is set in type because none exist.
2. Wide interior shots of the room (only one low-resolution colour photo exists).
3. Exterior, entrance and stairway photos, to help first-timers find the 2nd floor.
4. Consistent barber portraits on the wall, matching the gallery style.
5. Short vertical video loops (clippers, hot towel) for an optional hero video.
