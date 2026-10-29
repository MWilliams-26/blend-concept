import { useCallback, useEffect, useRef, useState } from 'react'
import type { Barber } from './data/blend'
import { BookingContext } from './components/booking'
import { BookingSheet } from './components/BookingSheet'
import { Dock, Header, Menu } from './components/Chrome'
import { Hero } from './sections/Hero'
import { Experience } from './sections/Experience'
import { Barbers } from './sections/Barbers'
import { Services } from './sections/Services'
import { Work } from './sections/Work'
import { Footer, Series, Visit } from './sections/Visit'

export default function App() {
  const [sheet, setSheet] = useState<{ open: boolean; barber?: Barber }>({ open: false })
  const [menu, setMenu] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [visitInView, setVisitInView] = useState(false)
  const visitCta = useRef<HTMLDivElement>(null)

  const book = useCallback((barber?: Barber) => setSheet({ open: true, barber }), [])

  // The dock appears once the hero's own booking button has scrolled away,
  // and steps aside when the closing "Book a chair" is on screen.
  useEffect(() => {
    const on = () => setPastHero(window.scrollY > window.innerHeight * 0.45)
    on()
    window.addEventListener('scroll', on, { passive: true })
    const io = new IntersectionObserver(([e]) => setVisitInView(e.isIntersecting))
    io.observe(visitCta.current!)
    return () => {
      window.removeEventListener('scroll', on)
      io.disconnect()
    }
  }, [])

  return (
    <BookingContext.Provider value={book}>
      <a href="#experience" className="label sr-only z-50 rounded-full bg-plaster px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to content
      </a>
      <Header onMenu={() => setMenu(true)} />
      <main>
        <Hero />
        <Experience />
        <Barbers />
        <Services />
        <Work />
        <Series />
        <Visit ref={visitCta} />
      </main>
      <Footer />
      <Dock hidden={!pastHero || visitInView || sheet.open || menu} />
      <Menu open={menu} onClose={() => setMenu(false)} />
      <BookingSheet
        open={sheet.open}
        barber={sheet.barber}
        onClose={() => setSheet((s) => ({ ...s, open: false }))}
        onBarber={(barber) => setSheet({ open: true, barber })}
      />
    </BookingContext.Provider>
  )
}
