import { useEffect, useRef, type ReactNode } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  className: string
  label: string
  children: ReactNode
}

/** Native modal <dialog> (focus trap, Esc, inert page) with exit animations. */
export function Dialog({ open, onClose, className, label, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current!
    if (open && !d.open) {
      d.classList.remove('closing')
      d.showModal()
    } else if (!open && d.open) {
      const done = () => {
        d.classList.remove('closing')
        d.close()
      }
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return done()
      d.classList.add('closing')
      const onEnd = (e: AnimationEvent) => {
        if (e.target !== d) return
        d.removeEventListener('animationend', onEnd)
        done()
      }
      d.addEventListener('animationend', onEnd)
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={className}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {children}
    </dialog>
  )
}
