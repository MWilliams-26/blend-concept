# Current-site audit: blendmensgrooming.com

I inspected the site on Oct 29, 2026 in headless Chromium:
- Desktop at 1440×900 and mobile at 390×844.
- The Square booking flow, walked to the details step without submitting.
- Lighthouse 13.6.

Evidence is in `docs/audit/` and in the "Audit evidence" section of `RESEARCH.md`. Every problem listed here was observed directly; no claim rests on assumption.

## Summary

BLEND has better raw material than any shop on its block:
- About 70 consistent, professional client portraits.
- Six barbers with personality-rich bios.
- A 5.0 Google rating.
- A real spa menu.
- Its own comedy series.

The website hides almost all of it. The homepage shows no services, barbers, prices or reviews you can read without scrolling past a 1,900px widget. On mobile it is slow (Lighthouse LCP 23–28 s simulated) and blocks pinch-zoom. Booking works, but takes about six taps before a visitor sees a time, and nothing on the site uses the barber deep links Square already supports.

## Scorecard

| Area | Finding | Evidence |
|---|---|---|
| First impression | The first mobile screen is the header and one grayscale portrait. The name appears about 15% down the page and there's no headline or value proposition. | `docs/audit/current-mobile-390.jpg` |
| Visual identity | The black and white with editorial portraits is right for BLEND but generic in execution. Square's default layout makes the brand look templated. | `current-desktop.jpg` |
| Hierarchy | No `<h1>`; the business name is an `<h3>`. A long intro paragraph, then a carousel, then a large blank gap, then hours. | DOM inspection |
| Navigation | Home, Book, Gallery, BLEND On Grove Street, Stories. No services or team page; services and barbers only exist inside the booking widget. | Site nav |
| Mobile usability | Zoom disabled (`maximum-scale=1`). The "Text us" pill covers intro text. Touch targets too small (`target-size` failed). | Lighthouse; `current-mobile-390-full.jpg` |
| Booking visibility | "Book now" is visible on the first screen (good). Square then takes about 6 taps before availability. No staff-specific entry points anywhere on the site. | `square-step5-mobile.jpg`, `square-step6-mobile.jpg` |
| Services and pricing | None on the homepage. The Book page lists services but splits "price varies" (Square) against "$90 & up" (menu) for the scissor cut. | `/s/appointments` vs Square |
| Team and trust | Barbers never appear outside the booking widget. Reviews sit in a 1,931px-tall iframe that hasn't refreshed since about Jan 2026 and filters out anything under 4★. | Widget config |
| Photography | Strong, consistent portrait series, but buried on the Gallery page; carousel images have empty `alt`. | `/gallery` |
| Local SEO | No LocalBusiness JSON-LD. The meta description is shouty ("LOOKING FOR A BARBER NEAR YOU?"). Phone and hours conflict across Square, Facebook, Yelp and directories. Template placeholder data ("(555) 555-5555") remains in page JSON. | RESEARCH.md |
| Accessibility | Lighthouse accessibility 82: contrast, untitled iframe, zoom blocked, touch targets. | Lighthouse |
| Performance | Mobile: Perf 26–28, LCP 23–28 s, TBT 5–6.5 s, CLS 0.134, about 4.5 MB. Desktop: Perf 41, LCP 5.0 s. Simulated lab data. | Lighthouse runs, Oct 29 |
| Content hygiene | Placeholder story "Start writing your story here."; footer "Have a look! Get access to useful tools and information." linking only to Pinterest. | `/s/stories`, footer |

## The five biggest opportunities

### 1. Put the barbers on the homepage, each with a direct booking link

- **Evidence.**
  - Barbers only appear inside Square's staff tab.
  - Reviews name barbers constantly ("Always a clean cut with Eric", "one of the owners, Wander").
  - Square accepts `?team_member_id=…`, which opens straight to that barber's calendar. Verified for all six.
  - The site never uses it, and the only competitor with strong staff storytelling (Sundays) has no per-barber booking.
- **Improvement.** A swipeable barber chapter: portrait, years, specialties in their own words, and "Book with Adam". That opens a sheet of services pre-filtered to Adam's calendar.
- **Business benefit.**
  - Regulars rebook with their barber in about 3 taps instead of about 6.
  - New clients choose a person, not just a time slot.
  - Newer barbers' calendars get exposure.
  - Recruiting is easier ("We are hiring barbers" is on Linktree).

### 2. Make the site fast, and let people zoom

- **Evidence.** Lighthouse mobile performance 26–28, LCP 23–28 s, TBT 5–6.5 s, about 4.5 MB transferred, `maximum-scale=1`. Most visitors arrive on phones from Instagram or Google Maps.
- **Improvement.**
  - A static, mobile-first build with art-directed responsive AVIF/WebP images.
  - Self-hosted, preloaded fonts.
  - No third-party widgets above the fold.
  - Zoom left enabled.
  - The concept build measures Perf 100, LCP 0.8 s, CLS 0 on the same Lighthouse mobile profile, at 397 KiB.
- **Business benefit.** Fewer visitors bounce before the page renders, a better Core Web Vitals standing for local search, and accessibility compliance.

### 3. Show services and real prices before the booking widget

- **Evidence.**
  - The homepage has no services or prices.
  - Competitors Balkan and International Styles show full price lists.
  - The $40 first-visit promo and the $200 full service (BLEND's spa differentiator) are invisible until someone is already in Square.
  - The promo's 20% gratuity and exclusions only appear in the fine print.
- **Improvement.** A "Find your service" chapter with category tabs, expandable details and a one-tap "Book this" to the exact Square service. Plus an honest first-visit card that states the exclusions up front.
- **Business benefit.**
  - More first-visit conversions.
  - More awareness of facials and the full service, which have higher ticket value.
  - Fewer surprises at checkout.

### 4. Tell the BLEND story with the assets it already owns

- **Evidence.**
  - About 70 professional portraits shot on the shop's own "B L E N D" wall.
  - Barber bios with real personality.
  - Reviews praising the unhurried pace, the listening, the music and the room.
  - The series *Blend on Grove St.*
  - None of it shapes the homepage. Reviews are hidden in a stale, filtered iframe.
- **Improvement.** A chaptered story (Experience → Barbers → Services → Work → Visit) built from real photos and verbatim reviews, with the wall itself as the visual motif and a feature on the series.
- **Business benefit.** Visitors can see why BLEND costs what it costs before they compare it with Tradesmen or ETIKET a few doors away. That supports premium pricing without anyone claiming luxury.

### 5. Fix local SEO and the inconsistent business details

- **Evidence.**
  - No `<h1>` and no LocalBusiness JSON-LD.
  - Phone numbers differ: (551) 248-8999 on the site and Square, (201) 600-9730 on Facebook and Yelp.
  - Hours differ (9–9 daily vs 8–8 vs mixed).
  - Square template placeholders remain in the page data.
  - The Instagram handle story is muddled (@blendmgs vs @blend.mgs vs "no longer use instagram").
- **Improvement.**
  - A proper heading structure and a meta description written for search.
  - `HairSalon` JSON-LD with address, hours and a ReserveAction pointing at Square.
  - One verified phone number, set of hours and handle, pushed to Google, Yelp, Facebook and Square.
  - The concept includes the markup. Lighthouse SEO scores 100 with the concept's deliberate `noindex` removed.
- **Business benefit.** Better map-pack visibility for "barber near Grove Street", and no lost calls to a stale number.

## Booking journey (observed, not submitted)

1. The homepage "Book now" goes to the Square service list.
2. Tap a service, then "Add". Square asks "Add more to your appointment?"; tap "Next".
3. "Select staff": choose a barber, then "Next".
4. Availability (date and time). On Oct 29: Wander's first opening was Sat Nov 7; Adam had none within 30 days.
5. Contact details, then confirm (not submitted).

With the concept's barber and service deep links, steps 1–3 shrink to: tap "Book with Adam", pick a service, then Add → Next → availability.

## Not verified or out of scope

- Real-device performance and field Core Web Vitals (CrUX). Only lab Lighthouse numbers.
- Whether any Google reviews below 4★ exist (Google needs sign-in or hits a CAPTCHA; the widget filters them out).
- Elevator or wheelchair access to the 2nd floor (Yelp says accessible).
- Analytics and conversion rates (no access).
