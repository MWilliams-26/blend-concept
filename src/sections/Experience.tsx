import { Img } from '../components/Img'

type Beat = { title: string; body: string; image?: string; alt?: string; imgClass?: string }

const beats: Beat[] = [
  {
    title: 'The Craft',
    image: 'craft-clipper',
    alt: 'A BLEND barber’s tattooed hand guiding clippers through a client’s silver hair',
    imgClass: 'scale-[1.5] origin-[60%_78%] lg:scale-[1.75] lg:origin-[60%_92%]',
    body: 'Fades from skin to length. Scissor work for the longer styles. Every cut carries a 3-day touch-up guarantee.',
  },
  {
    title: 'The Room',
    image: 'room-chairs',
    alt: 'A client in the chair at BLEND, with barber chairs, shelves and plants behind him',
    body: 'One flight up from Grove Street. Plants in the windows, music on, and, as one regular put it, “no sense of rush.”',
  },
  {
    title: 'The Ritual',
    body: 'The full service runs an hour: hot towel, cut, beard, then a facial finished with mango butter, grapeseed oil, cocoa and shea.',
  },
  {
    title: 'The Transformation',
    image: 'craft-lineup',
    alt: 'A client smiling at his new curly top, sharp taper and crisp line-up',
    body: 'Not sure what you want? The Transformation consult starts with your routine, your goals and your face shape, before the first cut.',
  },
]

const ritual = ['Hot towel', 'Cut', 'Beard', 'Facial']

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="wall grain relative px-5 pt-24 pb-28 lg:px-10 lg:pt-36 lg:pb-40">
      <div className="mx-auto max-w-[1440px]">
        <p className="label reveal text-mute">01 — The Experience</p>
        <h2 id="experience-title" className="reveal mt-5 max-w-[12ch] font-display text-[clamp(3.25rem,14vw,8.5rem)] leading-[0.9] tracking-[-0.01em]">
          Where grooming meets <em>experience.</em>
        </h2>
        <div className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <p className="reveal max-w-[36ch] text-lg leading-snug text-ink/85 lg:text-xl">
            BLEND brings healthy socializing, design and community to the traditional barbershop: grooming, facials, hot towel shaves, and conversation that makes the hour go fast.
          </p>
          <p aria-hidden className="emboss reveal hidden self-end text-right font-sans text-[7vw] leading-none font-semibold tracking-[0.35em] [font-stretch:125%] lg:block">
            BLEND
          </p>
        </div>

        {/* Each chapter card pins and the next slides over it: a native-scroll story, no hijacking. */}
        <ol className="mt-14 lg:mt-24">
          {beats.map((b, i) => (
            <li
              key={b.title}
              className="stack-card sticky mb-6 lg:mb-10"
              style={{ top: `calc(5rem + ${i * 14}px)` }}
            >
              <article className="stack-inner grid h-[min(76svh,640px)] origin-top grid-rows-[auto_1fr] overflow-hidden rounded-[28px] bg-ink text-plaster shadow-[0_-12px_40px_-20px_rgb(0_0_0/0.5)] lg:h-[min(72svh,620px)] lg:grid-cols-[1fr_1.25fr] lg:grid-rows-1">
                <div className="flex flex-col gap-3 p-6 pb-5 lg:justify-end lg:p-12">
                  <p className="label text-fog">
                    0{i + 1} / 0{beats.length}
                  </p>
                  <h3 className="font-display text-[2.6rem] leading-none lg:text-6xl">{b.title}</h3>
                  <p className="max-w-[38ch] text-[1.0625rem] leading-snug text-plaster/80 lg:text-lg">{b.body}</p>
                </div>
                {b.image ? (
                  <Img
                    id={b.image}
                    alt={b.alt!}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="block min-h-0 overflow-hidden lg:order-first"
                    imgClassName={`size-full object-cover object-[50%_30%] ${b.imgClass ?? ''}`}
                  />
                ) : (
                  // No authentic hot-towel or facial photo exists yet (see ASSETS.md), so this beat is set in type.
                  <ol aria-hidden className="flex min-h-0 flex-col justify-center gap-1 border-t border-plaster/10 px-6 lg:order-first lg:border-t-0 lg:border-r lg:px-12">
                    {ritual.map((step, n) => (
                      <li key={step} className="flex items-baseline gap-4 font-display text-[clamp(2.75rem,13vw,6.5rem)] leading-[1.02] italic">
                        <span className="label not-italic text-taupe">{n + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                )}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
