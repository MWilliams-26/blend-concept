import { useEffect, useState } from 'react'
import { blend } from '../data/blend'
import { useBooking } from './booking'
import { Dialog } from './Dialog'
import { Logo } from './Logo'
import { Arrow } from './icons'

export const chapters = [
  { id: 'experience', n: '01', label: 'The Experience' },
  { id: 'barbers', n: '02', label: 'The Barbers' },
  { id: 'services', n: '03', label: 'Services' },
  { id: 'work', n: '04', label: 'The Work' },
  { id: 'visit', n: '05', label: 'Visit' },
]

function useScrolled(px: number) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > px)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [px])
  return scrolled
}

export function Header({ onMenu }: { onMenu: () => void }) {
  const scrolled = useScrolled(40)
  const book = useBooking()
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] text-plaster transition-[background-color,backdrop-filter] duration-300 ${
        scrolled ? 'bg-ink/80 backdrop-blur-xl backdrop-saturate-150' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 lg:px-10">
        <a href="#top" className="press -m-2 p-2" aria-label="BLEND, back to top">
          <Logo className="w-[104px]" />
        </a>
        <nav aria-label="Chapters" className="hidden xl:block">
          <ul className="flex gap-8">
            {chapters.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="label py-3 text-plaster/75 transition-colors hover:text-plaster">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => book()} className="press label hidden h-11 items-center gap-2 rounded-full bg-plaster px-5 whitespace-nowrap text-ink hover:bg-white lg:flex">
            Book a chair <Arrow className="size-4" />
          </button>
          <button onClick={onMenu} className="press label flex h-11 items-center gap-3 rounded-full px-3 xl:hidden" aria-label="Open menu">
            Menu
            <span className="flex w-5 flex-col gap-[5px]" aria-hidden>
              <span className="h-px bg-current" />
              <span className="h-px bg-current" />
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

export function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const book = useBooking()
  return (
    <Dialog open={open} onClose={onClose} label="Menu" className="overlay m-0 h-full max-h-none w-full max-w-none bg-ink p-0 text-plaster">
      <div className="grain flex min-h-full flex-col px-6 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div className="flex h-16 items-center justify-between">
          <Logo className="w-[104px]" />
          <button onClick={onClose} className="press label -mr-2 h-11 px-3" autoFocus>
            Close
          </button>
        </div>
        <nav aria-label="Chapters" className="mt-6 flex-1">
          <ol>
            {chapters.map((c) => (
              <li key={c.id} className="border-b border-plaster/10">
                <a
                  href={`#${c.id}`}
                  onClick={(e) => {
                    // Let the dialog close (and release scroll lock) before jumping.
                    e.preventDefault()
                    onClose()
                    setTimeout(() => {
                      document.getElementById(c.id)?.scrollIntoView()
                      history.replaceState(null, '', `#${c.id}`)
                    }, 260)
                  }}
                  className="press flex items-baseline gap-4 py-4"
                >
                  <span className="label text-fog">{c.n}</span>
                  <span className="font-display text-[2.75rem] leading-none">{c.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-8 space-y-4">
          <button
            onClick={() => {
              onClose()
              book()
            }}
            className="press label flex h-14 w-full items-center justify-center gap-2 rounded-full bg-plaster text-ink"
          >
            Book a chair <Arrow className="size-4" />
          </button>
          <p className="text-center text-sm text-fog">
            {blend.address.street} · <a className="underline underline-offset-4" href={blend.phone.href}>{blend.phone.display}</a>
          </p>
          <p className="text-center text-[0.6875rem] text-fog/80">Independent design concept · not an official BLEND website</p>
        </div>
      </div>
    </Dialog>
  )
}

/** Persistent mobile booking action. Hidden while another booking button is on screen. */
export function Dock({ hidden }: { hidden: boolean }) {
  const book = useBooking()
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-500 ease-out-soft lg:hidden ${
        hidden ? 'pointer-events-none translate-y-[130%] opacity-0' : ''
      }`}
      inert={hidden}
    >
      <button
        onClick={() => book()}
        className="press mx-auto flex h-16 w-full max-w-md items-center justify-between rounded-full bg-ink/90 pr-2 pl-6 text-left text-plaster shadow-[0_12px_40px_-8px_rgb(0_0_0/0.5)] ring-1 ring-plaster/10 backdrop-blur-xl"
      >
        <span>
          <span className="label block">Book a chair</span>
          <span className="mt-0.5 block text-[0.8125rem] text-fog">Six barbers · open daily 9–9</span>
        </span>
        <span className="grid size-12 place-items-center rounded-full bg-plaster text-ink">
          <Arrow className="size-5" />
        </span>
      </button>
    </div>
  )
}
