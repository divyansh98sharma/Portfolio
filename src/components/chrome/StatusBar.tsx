import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { useLayers } from './LayersContext'
import { STATUSBAR_HEIGHT, TOPBAR_HEIGHT } from '../../lib/chrome'

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
  const { frames, activeFrameId } = useLayers()
  const progress = useScrollProgress()
  const activeName = frames.find((f) => f.id === activeFrameId)?.name

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

      {/* Desktop status bar */}
      <div
        className="figma-chrome fixed bottom-0 left-0 right-0 z-40 hidden lg:flex items-center justify-between border-t px-4"
        style={{
          height: STATUSBAR_HEIGHT,
          backgroundColor: 'var(--figma-panel)',
          borderColor: 'var(--figma-border)',
          color: 'var(--figma-text-dim)',
        }}
      >
        {/* scroll progress along the top edge */}
        <div className="absolute left-0 -top-px h-px w-full" aria-hidden="true">
          <div
            className="h-full transition-[width] duration-150"
            style={{ width: `${progress * 100}%`, backgroundColor: 'var(--figma-blue)' }}
          />
        </div>

        <span className="text-[11px] truncate" style={inter} aria-hidden="true">
          Page 1{activeName ? ` · ${activeName}` : ''}
        </span>

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
    </>
  )
}
