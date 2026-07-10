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
      const map: Record<string, ToolName> = { v: 'move', h: 'hand', p: 'draw', c: 'comment' }
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

  /* ---------- MOVE: drag almost any element, it springs back ----------
     Like the reference site: headings, paragraphs, images, cards, chips
     and buttons are all individually grabbable — not just whole frames. */
  const MOVABLE =
    'h1, h2, h3, h4, p, img, figure, blockquote, li, button, a, [data-movable]'
  const drag = useRef<{ el: HTMLElement; sx: number; sy: number; moved: number } | null>(null)
  const suppressClickUntil = useRef(0)
  useEffect(() => {
    if (activeTool !== 'move') return

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      const t = e.target as HTMLElement
      if (t.closest('header, aside, [role="dialog"], [data-comment-ui]')) return
      const target = t.closest<HTMLElement>(MOVABLE)
      if (!target) return
      drag.current = { el: target, sx: e.clientX, sy: e.clientY, moved: 0 }
      target.style.transition = 'none'
      target.style.outline = '1.5px solid var(--figma-blue)'
      target.style.outlineOffset = '3px'
      target.classList.add('tool-dragging')
      e.preventDefault()
    }
    const onMove = (e: PointerEvent) => {
      const d = drag.current
      if (!d) return
      const dx = e.clientX - d.sx
      const dy = e.clientY - d.sy
      d.moved = Math.max(d.moved, Math.hypot(dx, dy))
      d.el.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 0.01}deg)`
    }
    const onUp = () => {
      const d = drag.current
      if (!d) return
      drag.current = null
      if (d.moved > 5) suppressClickUntil.current = performance.now() + 350
      const el = d.el
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.style.transition = reduced
        ? 'none'
        : 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)'
      el.style.transform = ''
      window.setTimeout(() => {
        el.style.transition = ''
        el.style.outline = ''
        el.style.outlineOffset = ''
        el.classList.remove('tool-dragging')
      }, reduced ? 0 : 700)
    }
    // a drag must not fire the link/button underneath on release
    const onClickCapture = (e: MouseEvent) => {
      if (performance.now() < suppressClickUntil.current) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    document.addEventListener('pointerdown', onDown)
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
    document.addEventListener('pointercancel', onUp)
    document.addEventListener('click', onClickCapture, true)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointercancel', onUp)
      document.removeEventListener('click', onClickCapture, true)
      onUp()
    }
  }, [activeTool])

  /* ---------- DRAW: scribble on the canvas, strokes fade when idle ---------- */
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const size = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
    }
    size()
    window.addEventListener('resize', size)
    return () => window.removeEventListener('resize', size)
  }, [])

  useEffect(() => {
    if (activeTool !== 'draw') return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let drawing = false
    let last: { x: number; y: number } | null = null
    let lastPaint = performance.now()
    let raf = 0

    // Map pointer position into bitmap pixels through the canvas's own
    // bounding rect — immune to DPI scaling, browser zoom, and any CSS
    // stretching that made strokes land away from the cursor.
    const toBitmap = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      return {
        x: ((e.clientX - rect.left) / rect.width) * canvas.width,
        y: ((e.clientY - rect.top) / rect.height) * canvas.height,
        scale: canvas.width / rect.width,
      }
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      drawing = true
      const p = toBitmap(e)
      last = { x: p.x, y: p.y }
      lastPaint = performance.now()
    }
    const onMove = (e: PointerEvent) => {
      if (!drawing || !last) return
      const p = toBitmap(e)
      ctx.strokeStyle = 'rgba(13, 153, 255, 0.9)'
      ctx.lineWidth = 4 * p.scale
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.beginPath()
      ctx.moveTo(last.x, last.y)
      ctx.lineTo(p.x, p.y)
      ctx.stroke()
      last = { x: p.x, y: p.y }
      lastPaint = performance.now()
    }
    const onUp = () => {
      drawing = false
      last = null
      lastPaint = performance.now()
    }

    // gently erase once idle, like ink evaporating off the canvas
    const tick = () => {
      if (!drawing && performance.now() - lastPaint > 1100) {
        ctx.globalCompositeOperation = 'destination-out'
        ctx.fillStyle = 'rgba(0, 0, 0, 0.07)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.globalCompositeOperation = 'source-over'
      }
      raf = requestAnimationFrame(tick)
    }

    canvas.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    raf = requestAnimationFrame(tick)
    return () => {
      canvas.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      cancelAnimationFrame(raf)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
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
    activeTool === 'move'
      ? 'Move'
      : activeTool === 'hand'
        ? 'Hand'
        : activeTool === 'draw'
          ? 'Draw'
          : activeTool === 'comment'
            ? 'Comment'
            : ''

  return (
    <>
      {/* draw surface — interactive only while the pencil is active.
          Canvas is a replaced element: inset-0 alone does NOT stretch it,
          so give it explicit viewport dimensions or it keeps (and we then
          compound) its intrinsic size. */}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 z-[35] h-screen w-screen ${
          activeTool === 'draw' ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden="true"
      />
      {labelPos && labelText && (
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
      )}
    </>
  )
}
