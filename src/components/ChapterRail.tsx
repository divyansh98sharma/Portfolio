import { useEffect, useState } from 'react'
import { useLayers } from './chrome/LayersContext'
import { scrollToSection } from './utils/scrollToSection'

/** A lightweight story outline for the existing Figma canvas.
 * Derives chapter labels from actual registered frames, including future frames.
 * This is navigation, not a replacement for content or scroll-position tracking.
 */
export function ChapterRail() {
  const { frames, activeFrameId } = useLayers()
  const [visible, setVisible] = useState(false)
  const chapters = frames
    .filter(frame => frame.id !== 'hero' && frame.el.closest('#main-content'))
    .sort((a, b) => a.el === b.el ? 0 : (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.bottom < 0),
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  if (!chapters.length || !visible) return null

  return (
    <nav
      aria-label="Portfolio story chapters"
      className="figma-chrome fixed bottom-20 left-3 z-30 w-[min(calc(100vw-172px),320px)] rounded-xl border px-3 py-2 shadow-xl md:bottom-auto md:left-auto md:right-4 md:top-1/2 md:w-auto md:max-w-[180px] md:-translate-y-1/2"
      style={{ background: 'var(--figma-panel)', borderColor: 'var(--figma-border)', color: 'var(--figma-text)' }}
    >
      <p className="hidden px-2 pb-2 text-[10px] font-bold uppercase tracking-widest opacity-65 md:block">Chapters</p>
      <div className="flex snap-x gap-1 overflow-x-auto md:flex-col" style={{ scrollbarWidth: 'thin' }}>
        {chapters.map((frame, index) => {
          const active = frame.id === activeFrameId
          const label = frame.name.replace(/^\d+\s*[·.]\s*/, '')
          return (
            <button
              type="button"
              key={frame.id}
              onClick={() => scrollToSection(frame.id)}
              aria-current={active ? 'location' : undefined}
              aria-label={`Go to ${label}`}
              className="flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors hover:bg-[color-mix(in_srgb,var(--figma-blue)_12%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--figma-blue)] md:w-full"
              style={active ? { background: 'color-mix(in srgb, var(--figma-blue) 14%, transparent)', color: 'var(--figma-blue)' } : undefined}
            >
              <span className="font-mono text-[10px] opacity-70">{String(index + 1).padStart(2, '0')}</span>
              <span>{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
