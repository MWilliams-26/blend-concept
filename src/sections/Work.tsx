import { useEffect, useRef, useState } from 'react'
import { reviews, work } from '../data/blend'
import { Dialog } from '../components/Dialog'
import { Img } from '../components/Img'
import { Arrow, ArrowLeft, External } from '../components/icons'

const GOOGLE = 'https://www.google.com/maps/search/?api=1&query=BLEND%20Men%E2%80%99s%20Grooming%20%26%20Spa&query_place_id=ChIJvdw3w9lRwokRrkNZG-WwAqo'
const INITIAL = 12

function useColumns() {
  const query = () => (matchMedia('(min-width: 1024px)').matches ? 4 : matchMedia('(min-width: 768px)').matches ? 3 : 2)
  const [cols, setCols] = useState(query)
  useEffect(() => {
    const on = () => setCols(query())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return cols
}

function Lightbox({ index, onClose }: { index: number | null; onClose: () => void }) {
  const track = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  // Jump (not animate) to the tapped photo when opening.
  useEffect(() => {
    if (index === null) return
    const el = track.current!
    el.scrollTo({ left: index * el.clientWidth, behavior: 'instant' })
    setCurrent(index)
  }, [index])

  const go = (d: number) => {
    const el = track.current!
    el.scrollBy({ left: d * el.clientWidth, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }

  return (
    <Dialog open={index !== null} onClose={onClose} label="The Wall, photo viewer" className="overlay m-0 h-full max-h-none w-full max-w-none bg-ink p-0 text-plaster">
      <div
        className="flex h-full flex-col"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(1)
          if (e.key === 'ArrowLeft') go(-1)
        }}
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-5 pt-[env(safe-area-inset-top)]">
          <p className="label tabular-nums text-plaster/75">
            {String(current + 1).padStart(2, '0')} / {work.length}
          </p>
          <button onClick={onClose} className="press label -mr-2 h-11 px-3" autoFocus>
            Close
          </button>
        </div>
        <div
          ref={track}
          onScroll={(e) => setCurrent(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          className="no-scrollbar flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overscroll-contain"
        >
          {work.map((w) => (
            <figure key={w.id} className="flex h-full w-full shrink-0 snap-center snap-always flex-col items-center justify-center px-3 pb-4">
              <Img id={w.id} alt={w.alt} sizes="(min-width: 768px) 60vh, 100vw" placeholder={false} className="flex min-h-0 w-full flex-1 items-center justify-center" imgClassName="h-auto max-h-full w-auto max-w-full rounded-[18px] object-contain" />
              <figcaption className="mt-3 text-center text-sm text-plaster/70">{w.alt}</figcaption>
            </figure>
          ))}
        </div>
        <div className="flex shrink-0 items-center justify-center gap-3 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button onClick={() => go(-1)} disabled={current === 0} className="press grid size-12 place-items-center rounded-full border border-plaster/25 disabled:opacity-30" aria-label="Previous photo">
            <ArrowLeft className="size-5" />
          </button>
          <p className="label w-32 text-center text-fog">Swipe</p>
          <button onClick={() => go(1)} disabled={current === work.length - 1} className="press grid size-12 place-items-center rounded-full border border-plaster/25 disabled:opacity-30" aria-label="Next photo">
            <Arrow className="size-5" />
          </button>
        </div>
      </div>
    </Dialog>
  )
}

export function Work() {
  const [showAll, setShowAll] = useState(false)
  const [open, setOpen] = useState<number | null>(null)
  const shown = showAll ? work : work.slice(0, INITIAL)
  const cols = useColumns()

  return (
    <>
      <section id="work" aria-labelledby="work-title" className="wall grain overflow-hidden px-4 pt-24 pb-20 lg:px-10 lg:pt-36 lg:pb-32">
        <div className="mx-auto max-w-[1440px]">
          {/* The shop's own wall, in type: raised plaster letters. */}
          <p aria-hidden className="emboss reveal flex justify-between font-sans text-[19vw] leading-[0.8] font-bold [font-stretch:125%] lg:text-[16vw]">
            {'BLEND'.split('').map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </p>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-6 px-1 lg:mt-14">
            <div>
              <p className="label reveal text-mute">04 — The Work</p>
              <h2 id="work-title" className="reveal mt-5 max-w-[10ch] font-display text-[clamp(3.25rem,14vw,8.5rem)] leading-[0.9]">
                The work <em>speaks.</em>
              </h2>
            </div>
            <p className="reveal max-w-[32ch] text-lg leading-snug text-ink/80">
              Real BLEND clients, fresh out of the chair. Fades, curls, flows, beards, and the youngest regulars.
            </p>
          </div>

          {/* Explicit columns so alternate columns can drift against the scroll. */}
          <div className="mt-12 flex items-start gap-3 lg:mt-16 lg:gap-5">
            {Array.from({ length: cols }, (_, c) => (
              <ul key={c} className={`flex min-w-0 flex-1 flex-col gap-3 lg:gap-5 ${c % 2 ? 'drift-up pt-16' : ''}`}>
                {shown.map((w, i) =>
                  i % cols === c ? (
                    <li key={w.id}>
                      <button onClick={() => setOpen(i)} className="press group block w-full overflow-hidden rounded-[18px] focus-visible:outline-offset-4" aria-label={`Open photo: ${w.alt}`}>
                        <Img id={w.id} alt="" sizes={`${Math.round(96 / cols)}vw`} className="block" imgClassName="h-auto w-full transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]" />
                      </button>
                    </li>
                  ) : null,
                )}
              </ul>
            ))}
          </div>
          {!showAll && (
            <div className="mt-8 flex justify-center">
              <button onClick={() => setShowAll(true)} className="press label flex h-13 items-center gap-2 rounded-full border border-ink/25 px-6 hover:border-ink/60">
                See {work.length - INITIAL} more from the wall
              </button>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="reviews-title" className="grain bg-ink pt-20 pb-24 text-plaster lg:pt-28 lg:pb-32">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-6 px-5 lg:px-10">
          <div>
            <p className="label text-taupe">
              <span aria-hidden>★★★★★ </span>5.0 on Google
            </p>
            <h2 id="reviews-title" className="mt-4 font-display text-[clamp(2.75rem,11vw,6rem)] leading-[0.92]">
              In their <em>words.</em>
            </h2>
          </div>
          <a href={GOOGLE} target="_blank" rel="noopener" className="label flex h-11 items-center gap-2 text-plaster/80 underline-offset-4 hover:underline">
            All reviews on Google <External className="size-3.5" />
          </a>
        </div>
        <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 lg:scroll-px-10 lg:px-10">
          {reviews.map((r) => (
            <li key={r.who} className="w-[84vw] max-w-[440px] shrink-0 snap-start">
              <figure className="flex h-full flex-col justify-between rounded-[24px] bg-ink-soft p-6 ring-1 ring-plaster/8 lg:p-8">
                <blockquote className="font-display text-[1.75rem] leading-[1.12] lg:text-[2rem]">“{r.quote}”</blockquote>
                <figcaption className="label mt-8 text-fog">
                  {r.who} · Google · {r.when}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <Lightbox index={open} onClose={() => setOpen(null)} />
    </>
  )
}
