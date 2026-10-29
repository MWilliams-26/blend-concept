import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { blend, firstVisit, serviceGroups, serviceUrl, type Service } from '../data/blend'
import { Arrow, External, Plus } from '../components/icons'

function ServiceRow({ s }: { s: Service }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <li className="border-b border-ink/12">
      <h3>
        <button
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
          className="group flex min-h-[4.75rem] w-full items-center gap-4 py-4 text-left"
        >
          <span className="flex-1">
            <span className="block font-display text-[1.75rem] leading-[1.05] lg:text-[2.1rem]">{s.name}</span>
            <span className="label mt-1.5 block text-mute">{s.duration}</span>
          </span>
          <span className="font-display text-[1.75rem] lg:text-[2.1rem]">{s.price}</span>
          <span
            className={`grid size-9 shrink-0 place-items-center rounded-full border border-ink/20 transition-[transform,background-color,color] duration-300 ease-out-soft group-hover:border-ink/50 ${open ? 'rotate-45 bg-ink text-plaster' : ''}`}
            aria-hidden
          >
            <Plus className="size-4" />
          </span>
        </button>
      </h3>
      <div id={id} className={`grid transition-[grid-template-rows] duration-400 ease-out-soft ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`} inert={!open}>
        <div className="overflow-hidden">
          <div className="pb-6 lg:max-w-[60ch]">
            <p className="text-[1.0625rem] leading-snug text-ink/85">{s.summary}</p>
            {s.note && <p className="mt-2 text-[0.9375rem] text-mute">{s.note}</p>}
            <a href={serviceUrl(s)} target="_blank" rel="noopener" className="press label mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-5 text-plaster">
              Book this <Arrow className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </li>
  )
}

export function Services() {
  const [tab, setTab] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const base = useId()

  const onKey = (e: KeyboardEvent) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    const next = (tab + d + serviceGroups.length) % serviceGroups.length
    setTab(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="services" aria-labelledby="services-title" className="wall grain px-5 pt-24 pb-24 lg:px-10 lg:pt-36 lg:pb-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="label reveal text-mute">03 — Services</p>
          <h2 id="services-title" className="reveal mt-5 font-display text-[clamp(3.25rem,14vw,8.5rem)] leading-[0.9] lg:text-[clamp(4.5rem,7.5vw,8.5rem)]">
            Find your <em>service.</em>
          </h2>
          <p className="reveal mt-6 max-w-[34ch] text-lg leading-snug text-ink/80">
            Real prices, straight from BLEND’s booking page. Tap a service for the details, then book it in one step.
          </p>

          <article className="reveal mt-10 overflow-hidden rounded-[24px] bg-ink p-6 text-plaster lg:p-8">
            <p className="label text-taupe">First time at BLEND?</p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <p className="font-display text-[4.5rem] leading-[0.85]">
                $40 <span className="text-2xl text-plaster/70 italic">first cut</span>
              </p>
            </div>
            <p className="mt-4 text-[1.0625rem] leading-snug text-plaster/85">{firstVisit.summary}</p>
            <p className="mt-2 text-sm leading-snug text-fog">{firstVisit.note}</p>
            <a href={serviceUrl(firstVisit)} target="_blank" rel="noopener" className="press label mt-6 flex h-14 items-center justify-center gap-2 rounded-full bg-plaster text-ink">
              Book your first visit <Arrow className="size-4" />
            </a>
          </article>
        </div>

        <div>
          <div
            role="tablist"
            aria-label="Service categories"
            onKeyDown={onKey}
            className="sticky top-16 z-10 -mx-5 flex gap-1 overflow-x-auto bg-plaster/95 px-5 py-3 backdrop-blur-md no-scrollbar lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:backdrop-blur-none"
          >
            {serviceGroups.map((g, i) => (
              <button
                key={g.key}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                role="tab"
                id={`${base}-tab-${i}`}
                aria-selected={tab === i}
                aria-controls={`${base}-panel`}
                tabIndex={tab === i ? 0 : -1}
                onClick={() => setTab(i)}
                className={`press label h-11 shrink-0 rounded-full px-4 transition-colors ${tab === i ? 'bg-ink text-plaster' : 'text-ink/70 hover:bg-ink/5'}`}
              >
                {g.label}
              </button>
            ))}
          </div>
          <div key={tab} id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${tab}`} className="mt-2 motion-safe:animate-[fade-in_.35s_ease]">
            <ul className="border-t border-ink/12">
            {serviceGroups[tab].services.map((s) => (
              <ServiceRow key={s.id} s={s} />
            ))}
            </ul>
          </div>
          <p className="mt-6 text-sm leading-snug text-mute">
            Prices are starting prices on Square and may change with added services.{' '}
            <a href={blend.bookUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-medium text-ink underline underline-offset-4">
              Full menu on Square <External className="size-3.5" />
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
