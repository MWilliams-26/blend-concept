type P = { className?: string }
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const

export const Arrow = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const ArrowLeft = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
)
export const Phone = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
)
export const Chat = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M21 12a8 8 0 0 1-11.8 7L4 20l1.1-4.6A8 8 0 1 1 21 12z" /></svg>
)
export const Pin = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>
)
export const Plus = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M12 5v14M5 12h14" /></svg>
)
export const External = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M7 17 17 7M9 7h8v8" /></svg>
)
