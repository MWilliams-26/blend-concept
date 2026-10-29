import { blend } from '../data/blend'
import { useBooking } from '../components/booking'
import { Img } from '../components/Img'
import { Logo } from '../components/Logo'
import { Arrow, External, Pin } from '../components/icons'

export function Series() {
  return (
    <section aria-labelledby="series-title" className="grain bg-ink-soft px-5 py-20 text-plaster lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 md:grid-cols-[0.8fr_1fr] lg:gap-24">
        <div className="reveal relative mx-auto w-full max-w-[340px] md:order-2">
          <Img
            id="series-cast"
            alt="Cast collage from the series Blend on Grove St., including co-owners Adam and Wander"
            sizes="340px"
            className="block overflow-hidden rounded-[24px] shadow-2xl ring-1 ring-plaster/10"
            imgClassName="h-auto w-full"
          />
        </div>
        <div>
          <p className="label text-taupe">Interlude · Blend on Grove St.</p>
          <h2 id="series-title" className="mt-5 font-display text-[clamp(2.75rem,11vw,6rem)] leading-[0.92]">
            The shop has its own <em>show.</em>
          </h2>
          <p className="mt-6 max-w-[38ch] text-lg leading-snug text-plaster/75">
            A Jersey City comedy series filmed inside BLEND, with the co-owners playing themselves and local talent filling out the cast. Real stories, real places, real energy.
          </p>
          <a href={blend.social[2].href} target="_blank" rel="noopener" className="press label mt-8 inline-flex h-13 items-center gap-2 rounded-full border border-plaster/25 px-6 hover:border-plaster/60">
            Watch on YouTube <External className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

export function Visit() {
  const book = useBooking()
  return (
    <section id="visit" aria-labelledby="visit-title" className="wall grain px-5 pt-24 pb-16 lg:px-10 lg:pt-36 lg:pb-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid items-end gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.55fr)] lg:gap-20">
          <div>
            <p className="label reveal text-mute">05 — Visit</p>
            <h2 id="visit-title" className="reveal mt-5 font-display text-[clamp(4rem,19vw,13rem)] leading-[0.84] tracking-[-0.01em] md:text-[clamp(4rem,11vw,12rem)]">
              Your chair <br />
              <em>is waiting.</em>
            </h2>
            <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => book()} className="press label flex h-16 items-center justify-center gap-3 rounded-full bg-ink px-9 text-plaster hover:bg-ink-soft">
                Book a chair <Arrow className="size-4" />
              </button>
              <a href={blend.directionsUrl} target="_blank" rel="noopener" className="press label flex h-16 items-center justify-center gap-3 rounded-full border border-ink/25 px-9 hover:border-ink/60">
                <Pin className="size-4" /> Get directions
              </a>
            </div>
          </div>
          <Img
            id="room-kid"
            alt="A BLEND barber at work on a young client in the shop"
            sizes="(min-width: 768px) 34vw, 0px"
            className="reveal hidden overflow-hidden rounded-[24px] md:block"
            imgClassName="aspect-[4/5] h-auto w-full object-cover"
          />
        </div>

        <dl className="mt-16 grid gap-px overflow-hidden rounded-[24px] bg-ink/12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {[
            {
              k: 'Find us',
              v: (
                <>
                  {blend.address.street}
                  <br />
                  {blend.address.city}
                  <span className="mt-2 block text-[0.9375rem] text-mute">Upstairs, near the Grove Street PATH.</span>
                </>
              ),
            },
            { k: 'Hours', v: <>{blend.hours}</> },
            {
              k: 'Talk to us',
              v: (
                <>
                  <a href={blend.phone.href} className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink">{blend.phone.display}</a>
                  <br />
                  <a href={`mailto:${blend.email}`} className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink">{blend.email}</a>
                </>
              ),
            },
            {
              k: 'Follow',
              v: (
                <ul className="space-y-1">
                  {blend.social.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener" className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
                        {s.label}
                      </a>{' '}
                      <span className="text-mute">{s.handle}</span>
                    </li>
                  ))}
                </ul>
              ),
            },
          ].map((row) => (
            <div key={row.k} className="bg-plaster-hi/70 p-6 lg:p-8">
              <dt className="label text-mute">{row.k}</dt>
              <dd className="mt-3 text-[1.0625rem] leading-snug">{row.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="bg-ink px-5 pt-16 pb-[calc(env(safe-area-inset-bottom)+3rem)] text-plaster lg:px-10 lg:pb-12">
      <div className="mx-auto max-w-[1440px]">
        <Logo full className="w-[min(100%,560px)] text-plaster" />
        <div className="mt-12 flex flex-col gap-4 border-t border-plaster/10 pt-6 text-sm text-fog lg:flex-row lg:justify-between">
          <p>
            Independent, speculative design concept prepared for BLEND Men’s Grooming &amp; Spa. Not an official BLEND website.
          </p>
          <p>Photography and wordmark © BLEND, shown for a private proposal only.</p>
        </div>
      </div>
    </footer>
  )
}
