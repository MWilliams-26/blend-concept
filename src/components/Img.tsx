import manifest from '../data/image-manifest.json'

type Entry = { w: number; h: number; widths: number[]; avif: boolean; lqip: string }
const images = manifest as Record<string, Entry>

type Props = {
  id: string
  alt: string
  sizes: string
  className?: string
  imgClassName?: string
  priority?: boolean
  placeholder?: boolean
  /** Load now rather than lazily, without raising fetch priority. */
  eager?: boolean
}

const srcset = (id: string, e: Entry, ext: string) =>
  e.widths.map((w) => `${import.meta.env.BASE_URL}img/${id}-${w}.${ext} ${Math.min(w, e.w)}w`).join(', ')

/** Responsive <picture> with intrinsic size (no layout shift) and a blurred inline placeholder. */
export function Img({ id, alt, sizes, className = '', imgClassName = '', priority, placeholder = true, eager }: Props) {
  const e = images[id]
  return (
    <picture className={className} style={placeholder ? { backgroundImage: `url(${e.lqip})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}>
      {e.avif && <source type="image/avif" srcSet={srcset(id, e, 'avif')} sizes={sizes} />}
      <img
        src={`${import.meta.env.BASE_URL}img/${id}-${e.widths[0]}.webp`}
        srcSet={srcset(id, e, 'webp')}
        sizes={sizes}
        width={e.w}
        height={e.h}
        alt={alt}
        loading={priority || eager ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding={priority ? 'sync' : 'async'}
        className={imgClassName}
      />
    </picture>
  )
}

export const aspect = (id: string) => images[id].w / images[id].h
