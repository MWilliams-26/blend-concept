import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { barbers, blend, quickServices, serviceUrl, type Barber } from '../data/blend'
import { Dialog } from './Dialog'
import { Img } from './Img'
import { Arrow, Phone, Pin, Chat } from './icons'

type Props = { open: boolean; barber?: Barber; onClose: () => void; onBarber: (b?: Barber) => void }

export function BookingSheet({ open, barber, onClose, onBarber }: Props) {
  const panel = useRef<HTMLDivElement>(null)
  const drag = useRef<{ y: number; t: number } | null>(null)
  const [dy, setDy] = useState(0)

  // Keep the chosen barber's chip in view (e.g. Danny, at the end of the row).
  useEffect(() => {
    if (open) panel.current?.querySelector('[aria-pressed="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [open, barber])

  // Swipe the handle down to dismiss, like a native sheet.
  const onDown = (e: PointerEvent) => {
    drag.current = { y: e.clientY, t: performance.now() }
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }
  const onMove = (e: PointerEvent) => {
    if (drag.current) setDy(Math.max(0, e.clientY - drag.current.y))
  }
  const onUp = (e: PointerEvent) => {
    if (!drag.current) return
    const dist = e.clientY - drag.current.y
    const v = dist / (performance.now() - drag.current.t)
    drag.current = null
    setDy(0)
    if (dist > 110 || v > 0.6) onClose()
  }

  const allUrl = barber ? `${blend.bookUrl}?team_member_id=${barber.squareId}` : blend.bookUrl

  return (
    <Dialog
      open={open}
      onClose={onClose}
      label={barber ? `Book with ${barber.first}` : 'Book a chair'}
      className="sheet m-0 mt-auto max-h-none w-full max-w-none overflow-visible bg-transparent p-0 outline-none sm:mx-auto sm:mb-6 sm:max-w-[440px]"
    >
      <div
        ref={panel}
        style={{ transform: dy ? `translateY(${dy}px)` : undefined, transition: dy ? 'none' : 'transform .3s var(--ease-out-soft)' }}
        className="grain flex max-h-[calc(100dvh-0.75rem)] flex-col overflow-hidden rounded-t-[28px] bg-plaster-hi text-ink shadow-2xl sm:max-h-[calc(100dvh-3rem)] sm:rounded-[28px]"
      >
        <div
          className="shrink-0 cursor-grab touch-none px-5 pt-3 pb-3"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-ink/20" aria-hidden />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="label text-mute">{barber ? barber.role : 'Square booking'}</p>
              <h2 className="mt-1 font-display text-[2.4rem] leading-none">
                {barber ? <>Book with <em>{barber.first}</em></> : <>Book a <em>chair</em></>}
              </h2>
            </div>
            <button onClick={onClose} className="press -mr-1 grid size-11 place-items-center rounded-full bg-ink/5 text-xl" aria-label="Close">
              ×
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4">
          <p className="text-[0.9375rem] leading-snug text-mute">
            {barber
              ? `Pick a service and Square opens straight to ${barber.first}’s calendar.`
              : 'Pick a service, then choose your barber and time on Square.'}
          </p>

          <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1" role="group" aria-label="Choose a barber">
            <button
              onClick={() => onBarber(undefined)}
              aria-pressed={!barber}
              className={`press label flex h-12 shrink-0 items-center rounded-full px-4 ${!barber ? 'bg-ink text-plaster' : 'bg-ink/6 text-ink'}`}
            >
              Any barber
            </button>
            {barbers.map((b) => (
              <button
                key={b.key}
                onClick={() => onBarber(b)}
                aria-pressed={barber?.key === b.key}
                className={`press flex h-12 shrink-0 items-center gap-2 rounded-full py-1 pr-4 pl-1 text-sm font-medium ${barber?.key === b.key ? 'bg-ink text-plaster' : 'bg-ink/6'}`}
              >
                <Img id={b.image} alt="" sizes="40px" className="block size-10 overflow-hidden rounded-full" imgClassName="size-full object-cover object-top" />
                {b.first}
              </button>
            ))}
          </div>

          <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
            {quickServices.map((s) => (
              <li key={s.id}>
                <a href={serviceUrl(s, barber)} target="_blank" rel="noopener" className="press group flex min-h-16 items-center gap-3 py-3 active:bg-ink/5">
                  <span className="flex-1">
                    <span className="block text-[1.0625rem] font-medium leading-tight">
                      {s.name === 'First Time Promo' ? 'First visit' : s.name}
                    </span>
                    <span className="mt-0.5 block text-sm text-mute">
                      {s.duration}
                      {s.name === 'First Time Promo' && ' · regular or fade cut'}
                    </span>
                  </span>
                  <span className="font-display text-2xl">{s.price}</span>
                  <Arrow className="size-4 text-mute transition-transform group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-center text-xs text-mute">Booking opens Square, BLEND’s current booking system, in a new tab.</p>
        </div>

        <div className="shrink-0 border-t border-ink/10 px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <a href={allUrl} target="_blank" rel="noopener" className="press flex h-14 items-center justify-center gap-2 rounded-full bg-ink text-plaster">
            <span className="label">All services on Square</span>
            <Arrow className="size-4" />
          </a>

          <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
            <a href={blend.phone.href} className="press flex h-12 items-center justify-center gap-2 rounded-2xl bg-ink/6">
              <Phone className="size-4" /> Call
            </a>
            <a href={blend.phone.sms} className="press flex h-12 items-center justify-center gap-2 rounded-2xl bg-ink/6">
              <Chat className="size-4" /> Text
            </a>
            <a href={blend.directionsUrl} target="_blank" rel="noopener" className="press flex h-12 items-center justify-center gap-2 rounded-2xl bg-ink/6">
              <Pin className="size-4" /> Directions
            </a>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
