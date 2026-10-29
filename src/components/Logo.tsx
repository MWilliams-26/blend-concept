const mask = `url(${import.meta.env.BASE_URL}img/logo-800.webp) top / 100% auto no-repeat`

/** BLEND's own wordmark (from its Square Online site), used as a recolourable mask. */
export function Logo({ className = '', full = false }: { className?: string; full?: boolean }) {
  return (
    <span
      role="img"
      aria-label="BLEND Men's Grooming & Spa"
      className={`block bg-current ${className}`}
      style={{
        aspectRatio: full ? '800 / 179' : '800 / 115',
        mask,
        WebkitMask: mask,
      }}
    />
  )
}
