// Every fact here was verified on Oct 29, 2026. Sources are listed in RESEARCH.md.
// Items marked CONFIRM are flagged for owner sign-off in DESIGN_NOTES.md.

const SQUARE = 'https://book.squareup.com/appointments/znbkzc490hng98/location/L4ZKN7Q990X2Z/services'

export const blend = {
  name: "BLEND Men's Grooming & Spa",
  bookUrl: SQUARE,
  address: { street: '321 Grove St, Unit 1, 2nd Floor', city: 'Jersey City, NJ 07302' },
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=321+Grove+St+Ste+1+Jersey+City+NJ+07302-5924',
  // CONFIRM: Facebook and Yelp list (201) 600-9730.
  phone: { display: '(551) 248-8999', href: 'tel:+15512488999', sms: 'sms:+15512488999' },
  email: 'blendmgs@gmail.com',
  // CONFIRM: the official site and Square say 9–9 daily; Yelp says 8–8.
  hours: 'Open every day, 9 am – 9 pm',
  social: [
    { label: 'Instagram', handle: '@blendmgs', href: 'https://www.instagram.com/blendmgs' },
    { label: 'TikTok', handle: '@blendmgs', href: 'https://www.tiktok.com/@blendmgs' },
    { label: 'YouTube', handle: 'Blend on Grove St.', href: 'https://youtube.com/@blend_on_grove_st' },
  ],
}

export type Service = {
  id: string
  name: string
  price: string
  duration: string
  summary: string
  note?: string
}

const svc = (id: string) => `${SQUARE}/${id}`
export const serviceUrl = (s: Service, barber?: Barber) =>
  barber ? `${svc(s.id)}?team_member_id=${barber.squareId}` : svc(s.id)

export const firstVisit: Service = {
  id: 'FXMB3SMZOTX7CB2BXEWJO2ZH',
  name: 'First Time Promo',
  price: '$40',
  duration: '30 min',
  summary: 'A regular or fade cut with any barber, for first-time clients.',
  note: 'Not valid for the specialized scissor cut, makeovers or add-ons. A 20% gratuity is added.',
}

export const serviceGroups: { key: string; label: string; services: Service[] }[] = [
  {
    key: 'cuts',
    label: 'Cuts',
    services: [
      { id: '7MABTYRFPL54J2JQ7RKQV6BO', name: 'Regular / Fade', price: '$60+', duration: '45 min',
        summary: 'Seamless gradient blending from skin to length: bald fades, low, mid and high tapers, drop fades.',
        note: '3-day touch-up guarantee.' },
      { id: 'OMJHMQEZRGDINTRJ5UJR2V67', name: 'Specialized Scissor Cut', price: '$90+', duration: '1 hr+',
        summary: 'Scissor-over-comb and texturizing for longer styles: flows, foxtails, mullets, shags. “Not that tight clipper look.”',
        note: '3-day touch-up guarantee.' },
      { id: 'WGP46H4MEDAXMSFFZRG47T7E', name: 'Haircut + Beard Trim or Shave', price: '$75+', duration: '1 hr 15 min',
        summary: 'Any cut paired with a beard trim or a full straight-razor shave, shaped to work together.',
        note: 'Consultation, styled finish and 3-day touch-up guarantee included.' },
      { id: '4TBI7D6TMSU2D6MFSXANXKRB', name: 'Children (under 12)', price: '$40+', duration: '30 min+',
        summary: '$40 regular, $60 fades, $90 specialized scissor.' },
    ],
  },
  {
    key: 'beard',
    label: 'Beard',
    services: [
      { id: 'H72XR7POV42WRGF76RZNFWWA', name: 'Beard Service', price: '$30+', duration: '30 min',
        summary: '“Looking like a werewolf that spent 25 years in the wild? We can help you with that.”' },
      { id: 'W3JDTV4D6HT7EB355XJKCMS6', name: 'Hot Towel', price: '$10+', duration: '10 min',
        summary: 'Add a hot towel to any service.' },
    ],
  },
  {
    key: 'spa',
    label: 'Spa',
    services: [
      { id: 'ZHFTX524DABQADVOYXKQPSZ2', name: 'Hot Towel + Facial + Full Service', price: '$200+', duration: '1 hr',
        summary: 'Hot towel, precision cut, beard trim or shave, then the signature facial: black mask, eye mask, and a massage with mango butter, grapeseed oil, cocoa and shea butters.',
        note: 'BLEND calls to take a down payment after you book.' },
      { id: 'YL5DXDSEUSLHLFBIO246WZO7', name: 'Black Mask', price: '$25+', duration: '20 min',
        summary: 'Activated-charcoal peel-off mask that lifts impurities, blackheads and excess oil.' },
      { id: 'O7E4VJAKGKIGYAKHMOA2GLXR', name: 'Hydro Eye Mask', price: '$20+', duration: '10 min',
        summary: 'Hyaluronic acid under-eye patches for puffiness and dark circles.' },
    ],
  },
  {
    key: 'extras',
    label: 'Add-ons',
    services: [
      { id: 'LF6F4YFBFJVXRYOP5EZNRJGV', name: 'Transformation Add-On', price: '$30+', duration: '30 min',
        summary: 'An in-depth consultation on lifestyle, routine, hair goals and face shape, with a hair wash before the cut.',
        note: 'Recommended for first-time clients.' },
      { id: 'WAUINBOIEB5XBANYMOSGJDKB', name: 'Hair Wash', price: '$10', duration: '15 min',
        summary: 'Before or after your service. Or both.' },
    ],
  },
]

export const quickServices: Service[] = [firstVisit, ...serviceGroups.flatMap((g) => g.services)].filter((s) =>
  ['FXMB3SMZOTX7CB2BXEWJO2ZH', '7MABTYRFPL54J2JQ7RKQV6BO', 'OMJHMQEZRGDINTRJ5UJR2V67', 'WGP46H4MEDAXMSFFZRG47T7E', 'ZHFTX524DABQADVOYXKQPSZ2'].includes(s.id),
)

export type Barber = {
  key: string
  name: string
  first: string
  role: string
  years: string
  specialty: string
  intro: string
  squareId: string
  image: string
}

// Bios are condensed from each barber's own Square booking profile; quoted phrases are verbatim.
export const barbers: Barber[] = [
  { key: 'adam', name: 'Adam Lindo', first: 'Adam', role: 'Co-owner · Master Barber', years: '20+ years',
    specialty: '“Any hair type, any style, any texture.”',
    intro: 'Bodybuilder, model, now actor. His bio calls him “the Gandalf of grooming — minus the robe, plus better delts.”',
    squareId: 'TMo8BdT1SftMjIEb', image: 'barber-adam' },
  { key: 'wander', name: 'Wander Polanco', first: 'Wander', role: 'Co-owner · Barber', years: '16 years',
    specialty: 'Master-level fades, scissor work, classic and modern styles.',
    intro: '“A sharp, detail-oriented haircut that turns heads and earns compliments.”',
    squareId: 'TMtKpIhdbTwvqxTY', image: 'barber-wander' },
  { key: 'eddie', name: 'Eddie', first: 'Eddie', role: 'Senior Barber · “The Bull”', years: '15+ years',
    specialty: 'Classic fades, skin fades, scissor cuts, sharp beard trims.',
    intro: 'Kept barbering “in his back pocket” through a career in corrections, then got licensed. A people person with a winning smile.',
    squareId: 'TMZwH1xCtKW8_QAW', image: 'barber-eddie' },
  { key: 'eric', name: 'Eric Pagan', first: 'Eric', role: 'Senior Barber', years: '10+ years',
    specialty: 'Precision fades, all hair textures, clean enhancements.',
    intro: 'Beard specialist. “Book with confidence.”',
    squareId: 'TMmmWGtdlUfbInxC', image: 'barber-eric' },
  { key: 'jonas', name: 'Jonas Belmonte', first: 'Jonas', role: 'Senior Barber', years: '6+ years',
    specialty: 'Detailed scissor cuts and flawless fades.',
    intro: 'Born and raised in Jersey City, with advanced training from educators in Italy and Montreal.',
    squareId: 'TM5PWXdeHQ9rkcVi', image: 'barber-jonas' },
  { key: 'danny', name: 'Danny R', first: 'Danny', role: 'Senior Barber', years: '10+ years',
    specialty: 'Detailed scissor work, custom styling, seamless fades.',
    intro: 'Over a decade behind the chair, with fade transitions “tailored to your look.”',
    squareId: 'TMR_LKnr1FGweYZu', image: 'barber-danny' },
]

// Verbatim Google reviews from BLEND's own reviews widget feed (all 5★). Trimmed with “…”.
export const reviews = [
  { quote: 'There was no sense of rush, but rather a care for perfection every time he moved his hands.', who: 'Matthew V.', when: 'Jan 2026' },
  { quote: 'The barbers took the time to really listen and help me come up with the best style, not just a cut, but an outcome that actually fits me.', who: 'Daniel R. Z.', when: 'Jan 2026' },
  { quote: 'Always a clean cut with Eric. Crazy beard work. Detail, precision, and consistency every time.', who: 'Louise N.', when: 'Jan 2026' },
  { quote: 'Got my haircut on short notice the day of my wedding and it could not have gone better!', who: 'Darren G.', when: 'Nov 2025' },
  { quote: 'Adam was on it with pro opinions on what’s right for my hair color & texture as well as my face shape & complexion.', who: 'Tom M.', when: 'Nov 2025' },
  { quote: 'Nice upstairs spot with the windows open, good music playing, super friendly guys.', who: 'Max B.', when: 'Nov 2025' },
]

// Gallery: client portraits from BLEND's own gallery page. Descriptions are visual, not identities.
export const work: { id: string; alt: string }[] = [
  { id: 'work-68', alt: 'Curly top with a sharp taper and crisp line-up' },
  { id: 'work-28', alt: 'Full, sculpted beard in profile against the BLEND wall' },
  { id: 'work-61', alt: 'Long, layered scissor cut falling past the jaw' },
  { id: 'work-126', alt: 'Young client with a top knot and a carved design' },
  { id: 'work-49', alt: 'Curly texture over a low fade with a full beard' },
  { id: 'work-2', alt: 'Short textured crop and goatee, arms folded' },
  { id: 'work-239', alt: 'Soft, natural textured cut with a fringe' },
  { id: 'work-21', alt: 'Tight fade and shaped beard' },
  { id: 'work-5', alt: 'Child with curly hair and a clean taper' },
  { id: 'work-210', alt: 'Textured crop with glasses and a full beard' },
  { id: 'work-266', alt: 'Classic side part with volume, in profile' },
  { id: 'work-246', alt: 'High skin fade, smiling' },
  { id: 'work-18', alt: 'Man bun with a shaved part line and beard' },
  { id: 'work-71', alt: 'Curly crop with a skin fade and trimmed beard' },
  { id: 'work-262', alt: 'Child with long, natural curls' },
  { id: 'work-231', alt: 'Wave texture with a crisp beard line, in profile' },
  { id: 'work-122', alt: 'Short crop and line-up, in profile' },
  { id: 'work-3', alt: 'Textured curls with a mid fade' },
  { id: 'work-228', alt: 'Short textured cut, arms folded' },
  { id: 'work-283', alt: 'Swept-back cut with glasses and full beard' },
  { id: 'work-119', alt: 'Low fade with a shaped beard, in a barber cape' },
  { id: 'work-251', alt: 'Short curls with a taper, smiling' },
  { id: 'work-140', alt: 'Slicked-back style with a blazer' },
  { id: 'work-29', alt: 'Waves and full beard, hand on chin' },
]
