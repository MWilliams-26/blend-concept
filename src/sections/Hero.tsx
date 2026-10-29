import manifest from '../data/image-manifest.json'
import { useBooking } from '../components/booking'
import { Arrow } from '../components/icons'

const set = (id: 'hero-portrait' | 'hero-wall', ext: string) =>
  manifest[id].widths.map((w) => `${import.meta.env.BASE_URL}img/${id}-${w}.${ext} ${w}w`).join(', ')

export function Hero() {
  const book = useBooking()
  return (
    <section id="top" className="relative isolate h-[100svh] min-h-[620px] overflow-hidden bg-ink text-plaster lg:min-h-[720px]">
      {/* Art-directed: a portrait crop on phones, the BLEND wall in landscape on large screens. */}
      <picture className="hero-drift absolute inset-0 -z-10 block origin-top">
        <source media="(min-width: 1024px)" type="image/avif" srcSet={set('hero-wall', 'avif')} sizes="100vw" />
        <source media="(min-width: 1024px)" type="image/webp" srcSet={set('hero-wall', 'webp')} sizes="100vw" />
        <source type="image/avif" srcSet={set('hero-portrait', 'avif')} sizes="100vw" />
        <img
          src={`${import.meta.env.BASE_URL}img/hero-portrait-828.webp`}
          srcSet={set('hero-portrait', 'webp')}
          sizes="100vw"
          width={1512}
          height={2016}
          alt="A BLEND client laughing after a fresh skin fade, in front of the shop's raised B L E N D lettering"
          fetchPriority="high"
          decoding="sync"
          className="size-full object-cover object-[80%_16%] lg:object-[60%_40%]"
        />
      </picture>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/45 to-ink/30 lg:bg-gradient-to-r lg:from-ink/90 lg:via-ink/40 lg:to-transparent" />

      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink/60 to-transparent" />

      <div className="hero-fade mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-[max(2rem,calc(env(safe-area-inset-bottom)+1.5rem))] lg:px-10 lg:pb-16">
        <p className="label text-plaster/80">321 Grove Street<span className="max-[359px]:hidden"> · Jersey City</span></p>
        <h1 className="mt-4 lg:mt-6">
          <span className="sr-only">BLEND Men’s Grooming &amp; Spa: </span>
          <span className="block font-sans text-[clamp(1.6rem,8.4vw,3.4rem)] leading-none font-semibold tracking-[0.2em] uppercase [font-stretch:125%]">
            More than
          </span>
          <span className="-mt-[0.1em] block font-display text-[clamp(6.5rem,37vw,15rem)] leading-[0.82] tracking-[-0.02em] italic">
            a cut.
          </span>
        </h1>
        <p className="mt-5 max-w-[34ch] text-[1.0625rem] leading-snug text-plaster/85 lg:mt-7 lg:text-xl">
          Precision cuts, hot towel shaves and facials, one flight up from Grove Street. Six barbers, 6 to 20+ years each.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
          <button onClick={() => book()} className="press label flex h-14 items-center gap-3 rounded-full bg-plaster px-7 text-ink hover:bg-white">
            Book a chair <Arrow className="size-4" />
          </button>
          <a href="#barbers" className="label group flex h-14 items-center gap-2 text-plaster/90">
            Meet the barbers <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm text-plaster/70">
          <span>
            <span className="text-taupe" aria-hidden>★★★★★</span> 5.0 on Google
          </span>
          <span aria-hidden>·</span>
          <span>First visit from $40</span>
        </p>
      </div>
    </section>
  )
}
