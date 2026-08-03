import { useEffect, useState } from 'react'
import { FigmaIcon } from '../icons/FigmaIcon'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const inter = { fontFamily: "'Space Mono', sans-serif" }

const STEPS = [
  'Opening divyansh-portfolio.fig…',
  'Loading fonts…',
  'Syncing component library…',
  'Waking up collaborators…',
  'Rendering 8 frames…',
]

const BOOT_MS = 2000
const SESSION_KEY = 'fig-booted'

/**
 * The file-opening splash: shown once per session, skipped entirely for
 * prefers-reduced-motion, dismissed early by any click or key press.
 * Overlays the app (content renders underneath) — never gates it.
 */
export function BootLoader() {
  const reduced = useReducedMotion()
  const [booting, setBooting] = useState(() => {
    if (typeof window === 'undefined') return false
    try {
      return !sessionStorage.getItem(SESSION_KEY)
    } catch {
      return true
    }
  })
  const [leaving, setLeaving] = useState(false)
  const [step, setStep] = useState(0)

  const finish = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* ignore */
    }
    setLeaving(true)
    window.setTimeout(() => setBooting(false), 350)
  }

  useEffect(() => {
    if (!booting || reduced) return

    const stepTimer = window.setInterval(
      () => setStep((s) => Math.min(s + 1, STEPS.length - 1)),
      BOOT_MS / STEPS.length
    )
    const doneTimer = window.setTimeout(finish, BOOT_MS)

    const skip = () => finish()
    window.addEventListener('pointerdown', skip)
    window.addEventListener('keydown', skip)

    return () => {
      clearInterval(stepTimer)
      clearTimeout(doneTimer)
      window.removeEventListener('pointerdown', skip)
      window.removeEventListener('keydown', skip)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booting, reduced])

  if (!booting || reduced) return null

  return (
    <div
      className="figma-chrome fixed inset-0 z-[90] flex items-center justify-center transition-opacity duration-300"
      style={{ backgroundColor: 'var(--figma-canvas)', opacity: leaving ? 0 : 1 }}
      role="status"
      aria-label="Opening portfolio"
    >
      <div className="w-[min(360px,86vw)]">
        <div className="mb-7 flex items-center gap-3.5">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ backgroundColor: 'var(--figma-panel)', border: '1px solid var(--figma-border)', color: 'var(--figma-cursor-purple)' }}
            aria-hidden="true"
          >
            <FigmaIcon className="h-5 w-4" />
          </span>
          <div>
            <p className="text-[14px] font-semibold" style={{ ...inter, color: 'var(--figma-text)' }}>
              divyansh-portfolio.fig
            </p>
            <p className="text-[11px]" style={{ ...inter, color: 'var(--figma-text-dim)' }}>
              Divyansh Sharma · UX Designer
            </p>
          </div>
        </div>

        <div
          className="h-1 overflow-hidden rounded-full"
          style={{ backgroundColor: 'color-mix(in srgb, var(--figma-text) 10%, transparent)' }}
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full"
            style={{
              backgroundColor: 'var(--figma-blue)',
              animation: `boot-progress ${BOOT_MS}ms cubic-bezier(0.3, 0.6, 0.4, 1) forwards`,
            }}
          />
        </div>

        <p
          className="mt-3 flex items-center justify-between text-[11px]"
          style={{ ...inter, color: 'var(--figma-text-dim)' }}
          aria-hidden="true"
        >
          {STEPS[step]}
          <span className="opacity-60">click to skip</span>
        </p>
      </div>
    </div>
  )
}
