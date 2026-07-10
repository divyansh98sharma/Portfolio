import { useEffect, useRef, useState } from 'react'
import { useLayers, type ToolName } from '../LayersContext'

const inter = { fontFamily: "'Inter', sans-serif" }

const IDLE_RESET_MS = 10000

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false
  return (
    el.tagName === 'INPUT' ||
    el.tagName === 'TEXTAREA' ||
    el.isContentEditable
  )
}

/**
 * Mounts the behavior for the toy tools (keyboard shortcuts, idle reset,
 * Move drag-with-spring-back, Hand grab-scroll) plus the little label chip
 * that follows the pointer while a non-select tool is active.
 * Desktop only — the whole component is not rendered on mobile.
 */
export function ToolEffects() {
  const { activeTool, setActiveTool } = useLayers()
  const [labelPos, setLabelPos] = useState<{ x: number; y: number } | null>(null)

  /* ---------- body attribute + cursor ---------- */
  useEffect(() => {
    document.body.dataset.tool = activeTool
    return () => {
      delete document.body.dataset.tool
    }
  }, [activeTool])

  /* ---------- keyboard shortcuts ---------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target) || e.metaKey || e.ctrlKey || e.altKey) return
      const map: Record<string, ToolName> = { v: 'move', h: 'hand', c: 'comment' }
      const key = e.key.toLowerCase()
      if (map[key]) {
        setActiveTool(map[key])
      } else if (e.key === 'Escape') {
        setActiveTool('select')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setActiveTool])

  /* ---------- idle reset back to select ---------- */
  useEffect(() => {
    if (activeTool === 'select') return
    let timer = window.setTimeout(() => setActiveTool('select'), IDLE_RESET_MS)
    const bump = () => {
      clearTimeout(timer)
      timer = window.setTimeout(() => setActiveTool('select'), IDLE_RESET_MS)
    }
    const events: (keyof WindowEventMap)[] = ['pointerdown', 'pointermove', 'wheel', 'keydown']
    events.forEach((ev) => window.addEventListener(ev, bump, { passive: true }))
    return () => {
      clearTimeout(timer)
      events.forEach((ev) => window.removeEventListener(ev, bump))
    }
  }, [activeTool, setActiveTool])

  /* ---------- pointer-following label chip ---------- */
  useEffect(() => {
    if (activeTool === 'select') {
      setLabelPos(null)
      return
    }
    const onMove = (e: PointerEvent) => setLabelPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [activeTool])

  /* ---------- MOVE: drag any [data-movable], spring back ---------- */
  const drag = useRef<{ el: HTMLElement; sx: number; sy: number } | null>(null)
  useEffect(() => {
    if (activeTool !== 'move') return

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-movable]')
      if (!target || target.closest('header, aside, [role="dialog"]')) return
      drag.current = { el: target, sx: e.clientX, sy: e.clientY }
      target.style.transition = 'none'
      target.classList.add('tool-dragging')
      e.preventDefault()
    }
    const onMove = (e: PointerEvent) => {
      const d = drag.current
      if (!d) return
      const dx = e.clientX - d.sx
      const dy = e.clientY - d.sy
      d.el.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 0.008}deg)`
    }
    const onUp = () => {
      const d = drag.current
      if (!d) return
      drag.current = null
      const el = d.el
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.style.transition = reduced
        ? 'none'
        : 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)'
      el.style.transform = ''
      window.setTimeout(() => {
        el.style.transition = ''
        el.classList.remove('tool-dragging')
      }, reduced ? 0 : 700)
    }

    document.addEventListener('pointerdown', onDown)
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
    document.addEventListener('pointercancel', onUp)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointercancel', onUp)
      onUp()
    }
  }, [activeTool])

  /* ---------- HAND: grab-scroll ---------- */
  const pan = useRef<{ y: number } | null>(null)
  useEffect(() => {
    if (activeTool !== 'hand') return

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      if ((e.target as HTMLElement).closest('header, aside, button, a, [role="dialog"]')) return
      pan.current = { y: e.clientY }
      document.body.classList.add('is-panning')
      e.preventDefault()
    }
    const onMove = (e: PointerEvent) => {
      if (!pan.current) return
      window.scrollBy(0, pan.current.y - e.clientY)
      pan.current = { y: e.clientY }
    }
    const onUp = () => {
      pan.current = null
      document.body.classList.remove('is-panning')
    }

    document.addEventListener('pointerdown', onDown)
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
    document.addEventListener('pointercancel', onUp)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointercancel', onUp)
      onUp()
    }
  }, [activeTool])

  const labelText =
    activeTool === 'move' ? 'Move' : activeTool === 'hand' ? 'Hand' : activeTool === 'comment' ? 'Comment' : ''

  return labelPos && labelText ? (
    <div
      className="pointer-events-none fixed z-[70]"
      style={{ transform: `translate(${labelPos.x + 14}px, ${labelPos.y + 18}px)`, top: 0, left: 0 }}
      aria-hidden="true"
    >
      <span
        className="rounded-md px-2 py-1 text-[10px] font-semibold text-white shadow-md"
        style={{ ...inter, backgroundColor: 'var(--figma-blue)' }}
      >
        {labelText}
      </span>
    </div>
  ) : null
}
