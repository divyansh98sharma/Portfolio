import { useEffect, useState } from 'react'
import { ChevronUp, Minus, Plus } from 'lucide-react'
import { MAX_ZOOM, MIN_ZOOM, useLayers } from './LayersContext'
import { TOPBAR_HEIGHT } from '../../lib/chrome'

const inter = { fontFamily: "'Inter', sans-serif" }

function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return progress
}

function scrollToTop() {
  document.getElementById('main-content')?.focus()
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  })
}

/**
 * Figma's bottom status bar: current frame, zoom control (doubles as
 * back-to-top), with the scroll progress drawn as a thin blue line along
 * the bar's top edge. On mobile the bar is hidden and only a slim
 * progress line under the top bar remains.
 */
export function StatusBar() {
  const { frames, activeFrameId, zoom, setZoom } = useLayers()
  const progress = useScrollProgress()
  const activeName = frames.find((f) => f.id === activeFrameId)?.name

  const zoomBtn =
    'flex h-6 w-6 min-h-0 min-w-0 items-center justify-center rounded transition-colors hover:bg-[color-mix(in_srgb,var(--figma-text)_8%,transparent)] hover:text-[var(--figma-text)] disabled:opacity-30'

  return (
    <>
      {/* Mobile: progress line only, tucked under the top bar */}
      <div
        className="fixed left-0 right-0 z-40 lg:hidden pointer-events-none"
        style={{ top: TOPBAR_HEIGHT, height: 2 }}
        aria-hidden="true"
      >
        <div
          className="h-full"
          style={{ width: `${progress * 100}%`, backgroundColor: 'var(--figma-blue)' }}
        />
      </div>

      {/* Desktop status pill — UI3 floating, bottom right */}
      <div
        className="figma-chrome fixed bottom-4 right-4 z-40 hidden lg:flex items-center gap-2 rounded-[14px] border py-1.5 pl-3 pr-1.5 shadow-xl"
        style={{
          backgroundColor: 'var(--figma-panel)',
          borderColor: 'var(--figma-border)',
          color: 'var(--figma-text-dim)',
        }}
      >
        <span className="max-w-44 truncate text-[11px]" style={inter} aria-hidden="true">
          {activeName ?? 'Page 1'}
        </span>
        <span className="h-3 w-px" style={{ backgroundColor: 'var(--figma-border)' }} aria-hidden="true" />

        <div className="flex items-center gap-1">
          {/* zoom controls — ⌘/Ctrl+scroll or pinch also works */}
          <button
            onClick={() => setZoom(zoom - 0.1)}
            disabled={zoom <= MIN_ZOOM}
            className={zoomBtn}
            aria-label="Zoom out"
            title="Zoom out (or pinch / ⌘+scroll)"
          >
            <Minus className="h-3 w-3" aria-hidden="true" />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="min-h-0 min-w-0 h-6 w-11 rounded text-center text-[11px] tabular-nums transition-colors hover:bg-[color-mix(in_srgb,var(--figma-text)_8%,transparent)] hover:text-[var(--figma-text)]"
            style={inter}
            aria-label="Reset zoom to 100%"
            title="Reset to 100% (0)"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            onClick={() => setZoom(zoom + 0.1)}
            disabled={zoom >= MAX_ZOOM}
            className={zoomBtn}
            aria-label="Zoom in"
            title="Zoom in (or pinch / ⌘+scroll)"
          >
            <Plus className="h-3 w-3" aria-hidden="true" />
          </button>

          <span className="mx-1 h-3 w-px" style={{ backgroundColor: 'var(--figma-border)' }} aria-hidden="true" />

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 min-h-0 min-w-0 h-6 rounded px-2 text-[11px] transition-colors hover:bg-[color-mix(in_srgb,var(--figma-text)_8%,transparent)] hover:text-[var(--figma-text)]"
            style={inter}
            aria-label="Back to top"
          >
            <ChevronUp className="h-3 w-3" aria-hidden="true" />
            {Math.round(progress * 100)}%
          </button>
        </div>
      </div>
    </>
  )
}
