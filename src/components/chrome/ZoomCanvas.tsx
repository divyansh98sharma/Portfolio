import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { useLayers } from './LayersContext'

/**
 * Applies Figma-style canvas zoom to everything inside it (CSS `zoom`,
 * so layout, scrollbars and coordinates all stay correct).
 *
 * - Pinch on a trackpad / Ctrl(⌘)+scroll zooms toward the viewport
 * - Press 0 to jump back to 100%
 * - The viewport center is preserved across zoom changes, so zooming
 *   out reveals the surrounding frames instead of teleporting you
 */
export function ZoomCanvas({ children }: { children: ReactNode }) {
  const { zoom, setZoom } = useLayers()
  const prevZoom = useRef(zoom)

  /* keep what you were looking at centered while the canvas rescales */
  useLayoutEffect(() => {
    const prev = prevZoom.current
    prevZoom.current = zoom
    if (prev === zoom) return
    const vh = window.innerHeight
    const target = (window.scrollY + vh / 2) * (zoom / prev) - vh / 2
    window.scrollTo(0, Math.max(0, target))
  }, [zoom])

  /* pinch / ctrl+scroll — the way Figma zooms */
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return
      e.preventDefault()
      const factor = e.deltaY > 0 ? 0.92 : 1.08
      setZoom(zoom * factor)
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [zoom, setZoom])

  /* 0 → back to 100%, like Figma's shift+0 */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t instanceof HTMLElement && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      if (e.key === '0' && !e.metaKey && !e.ctrlKey && !e.altKey) setZoom(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setZoom])

  // --canvas-zoom lets vw-based type sizes compensate: viewport units
  // ignore CSS zoom, so clamp(…, Nvw, …) headings would stay physically
  // huge while everything else shrinks. Styles multiply vw by this var.
  // `relative` makes this the containing block for the comment-pin
  // overlay so pins share the zoomed local coordinate space.
  return (
    <div className="relative" style={{ zoom, '--canvas-zoom': zoom } as React.CSSProperties}>
      {children}
    </div>
  )
}
