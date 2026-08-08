import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { TOPBAR_HEIGHT } from '../../lib/chrome'

const inter = { fontFamily: "'Inter', sans-serif" }
const montserrat = { fontFamily: "'Montserrat', sans-serif" }

const STORAGE_KEY = 'tour-seen'

interface Step {
  title: string
  body: string
  /** CSS selector to spotlight; omitted for centered intro/outro steps */
  target?: string
  /** section id to scroll into view before measuring the target */
  section?: string
}

const STEPS: Step[] = [
  {
    title: 'Welcome to my portfolio',
    body: "This site is built to feel like an actual Figma file — a canvas, layers, tools, even a cursor to match. Here's a 60-second tour of what you can do.",
  },
  {
    title: 'This is a "file"',
    body: 'Click the file name up top to jump straight to any section — About, Experience, Case Studies, Contact — like switching pages in Figma.',
    target: '[data-tour="file-menu"]',
  },
  {
    title: 'Layers panel',
    body: 'Every section registers here as a frame. Expand one to see its text, image, and component layers — click any layer to jump straight to it.',
    target: '[data-tour="layers-panel"]',
  },
  {
    title: 'Real tools',
    body: 'Select, Move, Hand, Draw, Comment — these actually work. Try Move to drag something (it springs back), or Comment to drop a pin anywhere on the canvas.',
    target: '[data-tour="tool-buttons"]',
  },
  {
    title: 'Case studies = files',
    body: 'Each project lives on its own frame. Click into any case study to open the full design process and outcomes.',
    target: '#case-studies',
    section: 'case-studies',
  },
  {
    title: "Let's talk",
    body: "When you're ready, head to Contact to reach out — or just keep clicking around. Nothing here is fragile.",
    target: '#contact',
    section: 'contact',
  },
]

interface TourContextValue {
  start: () => void
  hasSeenTour: boolean
  /** Called by BootLoader once its overlay is fully gone, so the
   *  auto-start tour never fights it for the screen. */
  notifyBootComplete: () => void
}

const TourContext = createContext<TourContextValue | null>(null)

export function useWalkthroughTour() {
  const ctx = useContext(TourContext)
  if (!ctx) throw new Error('useWalkthroughTour must be used within WalkthroughTourProvider')
  return ctx
}

function getRect(selector?: string): DOMRect | null {
  if (!selector) return null
  const el = document.querySelector<HTMLElement>(selector)
  if (!el) return null
  const rect = el.getBoundingClientRect()
  if (rect.width === 0 || rect.height === 0) return null
  return rect
}

const PAD = 8

export function WalkthroughTourProvider({ children }: { children: ReactNode }) {
  const [stepIndex, setStepIndex] = useState<number | null>(null)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const [hasSeenTour, setHasSeenTour] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1'
  )
  const dialogRef = useRef<HTMLDivElement>(null)
  // While true, the previous step's scroll-reposition listener must not
  // touch `rect` — its re-renders were stalling the smooth-scroll toward
  // the *next* step's target before it ever arrived.
  const transitioningRef = useRef(false)

  const finish = useCallback(() => {
    setStepIndex(null)
    setRect(null)
    localStorage.setItem(STORAGE_KEY, '1')
    setHasSeenTour(true)
  }, [])

  const goTo = useCallback((index: number, direction: 1 | -1) => {
    if (index < 0 || index >= STEPS.length) {
      finish()
      return
    }
    const step = STEPS[index]

    const measure = () => {
      transitioningRef.current = false
      const r = getRect(step.target)
      // Skip steps whose target doesn't exist in the current viewport
      // (e.g. the layers panel and tool buttons are desktop/tablet only).
      if (step.target && !r) {
        goTo(index + direction, direction)
        return
      }
      setStepIndex(index)
      setRect(r)
    }

    if (!step.section) {
      window.requestAnimationFrame(measure)
      return
    }

    transitioningRef.current = true

    // Jump instantly rather than smooth-scrolling: back-to-back
    // behavior:'smooth' calls (this one landing while the *previous*
    // step's smooth-scroll animation was still settling) were being
    // silently dropped by the browser, leaving the tour stuck at the
    // prior scroll position. An instant jump has no animation state
    // to conflict with, so it's also just faster between tour steps.
    const sectionEl = document.getElementById(step.section)
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetY = sectionEl
      ? Math.max(0, Math.min(sectionEl.getBoundingClientRect().top + window.scrollY - (TOPBAR_HEIGHT + 16), maxScroll))
      : window.scrollY
    window.scrollTo({ top: targetY, behavior: 'auto' })
    // Give layout/paint a couple of frames to settle before measuring.
    window.requestAnimationFrame(() => window.requestAnimationFrame(measure))
  }, [finish])

  const start = useCallback(() => {
    goTo(0, 1)
  }, [goTo])

  const [bootComplete, setBootComplete] = useState(false)
  const notifyBootComplete = useCallback(() => setBootComplete(true), [])

  // Auto-launch once per browser, but only once BootLoader's own splash
  // has fully cleared the screen — otherwise the tour was popping up
  // underneath/behind it before the boot animation even finished.
  // Returning visitors (tour-seen already set) are left alone.
  useEffect(() => {
    if (hasSeenTour || !bootComplete) return
    const timer = window.setTimeout(start, 400)
    return () => window.clearTimeout(timer)
  }, [hasSeenTour, bootComplete, start])

  // Reposition on scroll/resize while a step with a target is showing
  useEffect(() => {
    if (stepIndex === null) return
    const step = STEPS[stepIndex]
    if (!step.target) return
    const reposition = () => {
      if (transitioningRef.current) return
      setRect(getRect(step.target))
    }
    window.addEventListener('resize', reposition)
    window.addEventListener('scroll', reposition, { passive: true })
    return () => {
      window.removeEventListener('resize', reposition)
      window.removeEventListener('scroll', reposition)
    }
  }, [stepIndex])

  useEffect(() => {
    if (stepIndex !== null) dialogRef.current?.focus()
  }, [stepIndex])

  useEffect(() => {
    if (stepIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish()
      if (e.key === 'ArrowRight') goTo(stepIndex + 1, 1)
      if (e.key === 'ArrowLeft') goTo(stepIndex - 1, -1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [stepIndex, finish, goTo])

  const step = stepIndex !== null ? STEPS[stepIndex] : null

  return (
    <TourContext.Provider value={{ start, hasSeenTour, notifyBootComplete }}>
      {children}
      {step && (
        <div className="figma-chrome fixed inset-0 z-[90]" role="presentation">
          {rect ? (
            <>
              <div className="fixed bg-black/55" style={{ left: 0, top: 0, right: 0, height: Math.max(rect.top - PAD, 0) }} />
              <div className="fixed bg-black/55" style={{ left: 0, top: rect.bottom + PAD, right: 0, bottom: 0 }} />
              <div className="fixed bg-black/55" style={{ left: 0, top: rect.top - PAD, width: Math.max(rect.left - PAD, 0), height: rect.height + PAD * 2 }} />
              <div className="fixed bg-black/55" style={{ left: rect.right + PAD, top: rect.top - PAD, right: 0, height: rect.height + PAD * 2 }} />
              <div
                className="pointer-events-none fixed rounded-lg ring-2"
                style={{
                  left: rect.left - PAD,
                  top: rect.top - PAD,
                  width: rect.width + PAD * 2,
                  height: rect.height + PAD * 2,
                  boxShadow: '0 0 0 2px var(--figma-blue)',
                }}
              />
            </>
          ) : (
            <div className="fixed inset-0 bg-black/55" />
          )}

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tour-step-title"
            tabIndex={-1}
            className="fixed z-[91] w-[min(340px,calc(100vw-32px))] rounded-2xl border p-5 shadow-2xl outline-none"
            style={
              rect
                ? {
                    backgroundColor: 'var(--figma-panel)',
                    borderColor: 'var(--figma-border)',
                    color: 'var(--figma-text)',
                    left: Math.min(Math.max(rect.left, 16), window.innerWidth - 356),
                    // Below the target if it fits; else above it, anchored
                    // by `bottom` (not a hardcoded height guess — the
                    // dialog's real height varies per step's body length,
                    // and a fixed top-offset was undershooting for longer
                    // steps, overlapping the very target it pointed at,
                    // e.g. the bottom-docked tool buttons on step 4); else
                    // — a target spanning nearly the full viewport, like
                    // the layers panel, leaves no clean room either side —
                    // clamp to the top of the screen so it stays on-screen.
                    ...(rect.bottom + PAD + 220 < window.innerHeight
                      ? { top: rect.bottom + PAD + 12 }
                      : rect.top - PAD > 220
                        ? { bottom: window.innerHeight - rect.top + PAD }
                        : { top: 16 }),
                  }
                : {
                    backgroundColor: 'var(--figma-panel)',
                    borderColor: 'var(--figma-border)',
                    color: 'var(--figma-text)',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }
            }
          >
            <button
              onClick={finish}
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-[color-mix(in_srgb,var(--figma-text)_8%,transparent)]"
              aria-label="Close tour"
              style={{ color: 'var(--figma-text-dim)' }}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <p className="text-[11px] font-medium" style={{ ...inter, color: 'var(--figma-text-dim)' }}>
              {stepIndex! + 1} / {STEPS.length}
            </p>
            <h2 id="tour-step-title" className="mt-1 text-base font-bold" style={montserrat}>
              {step.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ ...inter, color: 'var(--figma-text-dim)' }}>
              {step.body}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={finish}
                className="text-[12px] font-medium transition-colors hover:text-[var(--figma-text)]"
                style={{ ...inter, color: 'var(--figma-text-dim)' }}
              >
                Skip
              </button>
              <div className="flex items-center gap-2">
                {stepIndex! > 0 && (
                  <button
                    onClick={() => goTo(stepIndex! - 1, -1)}
                    className="rounded-lg border px-3 py-1.5 text-[12px] font-semibold transition-colors"
                    style={{ ...inter, borderColor: 'var(--figma-border)', color: 'var(--figma-text)' }}
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => goTo(stepIndex! + 1, 1)}
                  className="rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ ...inter, backgroundColor: 'var(--figma-blue)' }}
                >
                  {stepIndex! + 1 === STEPS.length ? 'Done' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </TourContext.Provider>
  )
}
