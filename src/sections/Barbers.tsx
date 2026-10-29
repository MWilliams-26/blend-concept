import { useEffect, useRef, useState } from 'react'
import { barbers } from '../data/blend'
import { useBooking } from '../components/booking'
import { Img } from '../components/Img'
import { Arrow, ArrowLeft } from '../components/icons'

export function Barbers() {
  const book = useBooking()
  const rail = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = rail.current!
    let raf = 0
    const on = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const card = el.children[0] as HTMLElement
        const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0')
        const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
        setActive(atEnd ? barbers.length - 1 : Math.round(el.scrollLeft / step))
      })
    }
    el.addEventListener('scroll', on, { passive: true })
    return () => el.removeEventListener('scroll', on)
  }, [])

  const go = (dir: number) => {
    const el = rail.current!
    const card = el.children[0] as HTMLElement
    el.scrollBy({ left: dir * (card.offsetWidth + 12), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  return (
    <section id="barbers" aria-labelledby="barbers-title" className="grain relative overflow-hidden bg-ink pt-24 pb-24 text-plaster lg:pt-36 lg:pb-36">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <p className="label reveal text-fog">02 — The Barbers</p>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-8">
          <h2 id="barbers-title" className="reveal max-w-[11ch] font-display text-[clamp(3.25rem,14vw,8.5rem)] leading-[0.9]">
            Six chairs. <em className="text-taupe">75+ years</em> between them.
          </h2>
          <p className="reveal max-w-[34ch] text-lg leading-snug text-plaster/75">
            Co-owned by Adam Lindo and Wander Polanco. Pick your barber and Square opens straight to their calendar.
          </p>
        </div>
      </div>

      <ol
        ref={rail}
        aria-label="Barbers"
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-2 lg:mt-16 lg:scroll-px-10 lg:px-10"
      >
        {barbers.map((b, i) => (
          <li key={b.key} className="w-[82vw] max-w-[380px] shrink-0 snap-start" aria-label={`${b.name}, ${i + 1} of ${barbers.length}`}>
            <article className="flex h-full flex-col">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] bg-ink-soft">
                <Img
                  id={b.image}
                  alt={`Portrait of ${b.name}`}
                  sizes="(min-width: 480px) 380px, 82vw"
                  className="block size-full"
                  imgClassName="size-full object-cover object-top transition-transform duration-700 ease-out-soft hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/60 to-transparent px-5 pt-24 pb-5">
                  <p className="label text-plaster/75">{b.years}</p>
                  <h3 className="mt-1 font-display text-[3.25rem] leading-[0.9]">{b.name}</h3>
                </div>
              </div>
              <div className="flex flex-1 flex-col px-1 pt-5">
                <p className="label text-taupe">{b.role}</p>
                <p className="mt-3 text-[1.0625rem] leading-snug font-medium">{b.specialty}</p>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-snug text-plaster/65">{b.intro}</p>
                <button
                  onClick={() => book(b)}
                  className="press label mt-5 flex h-13 items-center justify-between rounded-full border border-plaster/25 pr-2 pl-5 hover:border-plaster/60 hover:bg-plaster/5"
                >
                  Book with {b.first}
                  <span className="grid size-9 place-items-center rounded-full bg-plaster text-ink">
                    <Arrow className="size-4" />
                  </span>
                </button>
              </div>
            </article>
          </li>
        ))}
      </ol>

      <div className="mx-auto mt-8 flex max-w-[1440px] items-center gap-5 px-5 lg:px-10">
        <p className="label w-16 tabular-nums text-plaster/75">
          {String(active + 1).padStart(2, '0')} / 0{barbers.length}
        </p>
        <div className="h-px flex-1 bg-plaster/15" aria-hidden>
          <div
            className="h-px bg-plaster transition-[width] duration-300"
            style={{ width: `${((active + 1) / barbers.length) * 100}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button onClick={() => go(-1)} disabled={active === 0} className="press grid size-12 place-items-center rounded-full border border-plaster/25 disabled:opacity-30" aria-label="Previous barber">
            <ArrowLeft className="size-5" />
          </button>
          <button onClick={() => go(1)} disabled={active === barbers.length - 1} className="press grid size-12 place-items-center rounded-full border border-plaster/25 disabled:opacity-30" aria-label="Next barber">
            <Arrow className="size-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
