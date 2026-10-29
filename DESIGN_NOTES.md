# Design notes: BLEND concept

An independent, speculative redesign for private presentation to BLEND's owners. It is not an official BLEND website. The page carries `noindex`, a disallow-all `robots.txt`, and a concept disclaimer in the footer and menu.

## Running it

```sh
npm install
npm run dev        # local development
npm run build      # type-check and build to dist/
npm run preview    # serve the production build
node scripts/process-images.mjs   # rebuild images from BLEND's public originals
```

Hosting: Cloudflare Pages, connected to https://github.com/MWilliams-26/blend-concept. Build command `npm run build`, output directory `dist`, Node version from `.node-version`. Every push to `main` redeploys. [public/_headers](public/_headers) adds `noindex` and long cache lifetimes. The Vite base is relative, so the build also works under a subpath.

Stack: React 19, TypeScript, Tailwind CSS 4 and Vite 8, with no animation library, backend or CMS. Booking stays on BLEND's Square Appointments.

`@mwilliams/ui` isn't installable in this environment (npm returns 404 and no registry credentials are configured), so the site doesn't use it. The few engineering patterns it would have supplied are small and native here:
- Modal sheets use `<dialog>`, which gives a focus trap, Esc to close and an inert page.
- The tabs use the ARIA tabs pattern.
- Carousels use scroll-snap.

## Creative direction: "The Wall"

### What the research changed

The brief's working concept was **MORE THAN A CUT.** Research supported it, and also suggested a sharper visual idea.

Nearly every one of BLEND's roughly 70 professional photos is a client portrait shot against the same warm plaster wall with raised **B L E N D** letters. The wall is BLEND's most recognizable image, and it belongs to BLEND alone. The site is built as that wall: plaster grounds, raised-letter typography, a warm monochrome portrait series, and ink-dark chapters for the people and the evidence.

The headline stays **MORE THAN A CUT.** The story underneath uses BLEND's own words wherever they exist:
- "Where grooming meets experience." (Instagram)
- "healthy socializing, design, community" (site intro)
- The barbers' own bios.
- Verbatim reviews.

### Storytelling chapters

| Chapter | Purpose | Content |
|---|---|---|
| First impression | Who, what, why, and how to book, in one screen | Full-bleed client portrait in front of the wall, **More than / *a cut.***, then one line built from what reviewers praise most: "Upstairs on Grove Street, nobody rushes you. Your barber listens first, sweats the details, and sends you out sharper than you walked in." Book a chair, 5.0 on Google, first visit from $40 |
| 01 The Experience | The craft and the atmosphere | Four cards that pin and stack as you scroll: **The Craft** (3-day touch-up guarantee), **The Room** ("no sense of rush", from a review), **The Ritual** (the full service, set in type), **The Transformation** (the consultation add-on) |
| 02 The Barbers | The people | Swipeable portrait cards: name, years, title, specialty in their own words, one line of personality, and "Book with [name]" |
| 03 Services | Comparing services | First-visit card with honest fine print; category tabs (Cuts / Beard / Spa / Add-ons); expandable rows with a one-tap "Book this" |
| 04 The Work | Proof | Embossed B L E N D wordmark, a two-to-four column portrait wall that drifts on scroll, a full-screen swipe viewer, then verbatim reviews |
| Interlude | Community | *Blend on Grove St.*: "The shop has its own show." |
| 05 Visit | The invitation | **Your chair *is waiting.***, Book and Directions, address ("upstairs, near the Grove Street PATH"), hours, phone, email, socials |

### Visual identity

- **Palette**: taken from the shop wall and BLEND's existing black and white, deliberately avoiding black and gold.

  | Token | Hex | Use | Contrast |
  |---|---|---|---|
  | Plaster | `#E6E0D6` | Primary ground, the wall | Ink on plaster 14.1:1 |
  | Plaster high / low | `#F2EDE5` / `#D4CCBE` | Light falloff, sheets | — |
  | Ink | `#141312` | Text, dark chapters | — |
  | Ink soft | `#24221F` | Cards on dark | — |
  | Mute | `#5D584F` | Secondary text on plaster | 5.4:1 |
  | Fog | `#A59E92` | Secondary text on ink | 7.0:1 |
  | Taupe | `#CBC2AD` | Accent on dark; the colour of BLEND's Square booking button | 10.5:1 on ink |
  | Ember | `#B5512C` | Focus rings only, a hot-towel warmth | 3.8:1 (non-text UI) |

- **Typography**:
  - Instrument Serif, a condensed editorial serif, sets the oversized headlines. Italic carries the emotional word in each line (*a cut.*, *experience.*, *speaks.*, *is waiting.*).
  - Archivo, at 125% width with wide tracking, sets labels and UI. The spacing echoes the B L E N D wordmark.
  - BLEND's own wordmark is used unaltered. It isn't redrawn or replaced.
- **Imagery**: one warm-monochrome treatment applied to every photo, so the barbers' mixed headshots sit with the gallery series. All photos are real and none are stock. Gaps are filled with type, not placeholders: The Ritual has no facial photo yet.
- **Texture and depth**: subtle plaster grain, soft light falloff, and raised plaster lettering made from two text shadows. Cards stack with real overlap and shadow rather than decoration.

### Interaction and motion

Signature mobile moments:
1. **Cinematic hero.** It loads instantly, with no intro or splash. The photo drifts and scales slightly as you scroll, and the headline fades up and away.
2. **Stacking experience cards.** Pure `position: sticky`: each chapter card pins and the next slides over it, while the one behind recedes. Native scrolling, no hijacking.
3. **Swipeable barbers.** Scroll-snap cards with a progress rail and counter, plus previous and next buttons for desktop and keyboard users. Each swipe stops on the next barber (`scroll-snap-stop: always`) instead of flinging past several, and all six portraits are fetched about two screens before the rail so swiping never waits on an image.
4. **The booking sheet ("Book" mode).** A native-feeling bottom sheet you can swipe down to dismiss. It opens from the header's Book button, the hero, any barber card or the closing chapter.
   - It lists the five most-booked services with prices, each deep-linked to Square.
   - A barber chip row switches every link to that barber's calendar (`team_member_id`).
   - Only the service list scrolls; "All services on Square", Call, Text and Directions stay pinned at the bottom, sized to the visible viewport (`dvh`) so phone toolbars can't hide them.
5. **The portrait wall.** Alternate columns drift against the scroll; tap any portrait for a full-screen, swipeable, keyboard-navigable viewer.
6. **Book in the header.** A compact "Book" pill sits in the header on every screen ("Book a chair" on desktop), so booking is always one tap away without covering content. An earlier floating bottom bar was removed after review because it got in the way of scrolling on phones.

Motion rules:
- Scroll-linked effects use CSS scroll-driven animations (`animation-timeline`), which animate only transform and opacity. They need no JavaScript and fall back to static layouts.
- `prefers-reduced-motion` turns off every scroll animation and smooth scrolling, and makes sheet transitions instant.
- Pressed states scale to 0.965 on touch.
- No animation ever blocks booking.

## Booking and conversion strategy

- **Explore or book, never forced.** Every chapter can be skipped. Booking is reachable from the header on every screen, the hero, the menu and every barber.
- **Returning clients**: "Book with Eric" goes straight to Eric's calendar (verified for all six barbers) in about 3 taps, against about 6 today.
- **First-timers**: a dedicated $40 card that states the scissor-cut exclusion and the 20% gratuity up front.
- **Comparison shoppers**: real starting prices, durations and descriptions without leaving the page.
- **Spa awareness**: Spa is its own tab, the full service is in the quick sheet, and The Ritual card tells the story.
- **Local search** (production): `HairSalon` JSON-LD with hours, address and a `ReserveAction` to Square; a single `<h1>`; a rewritten meta description.

## QA results (Oct 29, 2026, headless Chromium 156 in the orb)

- **Builds**: `npm run build` passes, including `tsc -b`.
- **Widths**: checked at 320, 375, 390, 430, 768, 1024 and 1440. `scrollWidth` equals the viewport width at every size, so there's no horizontal overflow. Fixed during QA:
  - The services grid overflowed at 390.
  - The desktop nav wrapped at 1024; it now appears from 1280.
  - The menu button was unreadable on the bright desktop photo; the header now has a scrim.
- **Booking links**: all 12 service URLs open the matching Square service. All six `team_member_id` links open availability "with [barber]". No booking was submitted.
- **Interactions**:
  - The header Book button opens the sheet; barber chips update the title and links.
  - Swipe-down dismisses the sheet; Esc and backdrop clicks close it, and focus returns to the trigger.
  - The menu jumps to the chosen chapter after closing.
  - Service tabs respond to arrow keys; rows expand with `aria-expanded`.
  - Barber rail counter tracks swipes; the lightbox opens at the tapped photo and advances by swipe, buttons or arrow keys.
  - The mobile flow was recorded and reviewed (`.amp/in/artifacts/mobile-flow.webm`, not committed).
- **Keyboard**: skip link first, then logo, chapters, booking and barber buttons in order, with a visible ember focus ring.
- **Reduced motion**: with emulated `prefers-reduced-motion`, scroll animations compute to `none`, scroll behaviour is `auto`, and the sheet animates in 1 ms.
- **Lighthouse 13.6** (same profiles as the current-site audit, 2 runs each, production build served locally):

  | | Perf | A11y | Best pr. | SEO | FCP | LCP | TBT | CLS | Weight |
  |---|---|---|---|---|---|---|---|---|---|
  | Concept, mobile | 100 | 100 | 100 | 66* | 0.8 s | 0.8 s | 20–30 ms | 0 | 397 KiB |
  | Concept, desktop | 100 | 100 | 100 | 66* | 0.2 s | 0.2 s | 0 ms | 0 | 388 KiB |
  | Current site, mobile | 26–28 | 82 | 54 | 100 | 2.2–2.6 s | 23–28 s | 5.1–6.5 s | 0.134 | about 4.5 MB |

  \* SEO is held down only by the deliberate `noindex` and the disallow-all `robots.txt`. A copy with those removed scores SEO 100.

- **Limitations**:
  - No real-device testing (no iPhone or Android hardware was available).
  - The numbers are lab results from a local server with simulated throttling, not field data. INP can't be measured in lab runs; TBT of 0–30 ms is the closest proxy.
  - Safari-specific behaviour (scroll-driven animation support, `<dialog>` and safe areas) is coded to standards but untested on WebKit.
  - Touch was emulated with a mouse and with `scrollBy` in Chromium.

## Business benefits

1. **More bookings from the same traffic**: about 400 KB pages that render in under a second, against about 4.5 MB and over 20 s simulated on mobile today.
2. **Faster rebooking for regulars**: a direct barber deep link cuts about 6 taps to about 3.
3. **Better first-visit conversion**: the $40 offer and its terms are visible and honest before Square.
4. **Higher-value tickets**: the spa and full service are featured, not buried.
5. **Earns its premium**: the craft, the people and the room are shown, so price comparisons with neighbours on Grove Street become value comparisons.
6. **Local search**: an `<h1>`, structured data and consistent business details.

## To confirm with BLEND before production

1. **Phone**: (551) 248-8999 or (201) 600-9730, and can the main number receive texts? The concept's "Text" button uses 551.
2. **Hours**: 9 am–9 pm daily (site and Square) or 8–8 (Yelp)? Walk-ins, or appointment only?
3. **Address wording**: "Unit 1, 2nd Floor" or "Ste 1"? Elevator and step-free access?
4. **Specialized scissor cut price**: Square says "price varies" and the menu says "$90 & up". The concept shows $90+.
5. **Photo rights**: photographer, client and parent consent for every image (see ASSETS.md); a vector logo; an official favicon.
6. **Barbers**: confirm the six-barber roster (Dre appears on Instagram but isn't in Square), how "Eddie" and "Danny R" want to be named, and who cut which gallery photos.
7. **Headline**: approve "MORE THAN A CUT." (the brief's line, not BLEND's), and lines written for the concept:
   - "conversation that makes the hour go fast"
   - The hero line "Upstairs on Grove Street, nobody rushes you. Your barber listens first, sweats the details, and sends you out sharper than you walked in." (drawn from review themes: "no sense of rush", barbers who "listen", detail, confidence)
   - "Plants in the windows, music on"
   - "Six chairs. 75+ years between them." (the sum of the barbers' listed years)
8. **Reviews**: permission to quote reviewers, and a fresh export (the widget feed stops at Jan 2026).
9. **Social**: the official Instagram handle (@blendmgs, @blend.mgs or @blendmensgroomingandspa), and whether Instagram is still in use.
10. **Spa roadmap**: whether the cold plunge and red light are live yet (excluded from the concept until confirmed); colour services (on Facebook, not in Square).
11. **The series**: cast consent to feature *Blend on Grove St.* artwork.
