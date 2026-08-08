import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useLayers } from '../LayersContext'
import {
  addSticker,
  deleteSticker,
  subscribeToStickers,
  updateStickerPosition,
  type StickerDoc,
} from '../../../lib/stickers'
import { getClientId } from '../../../lib/identity'

const MAX_STICKERS = 150
const DRAG_THRESHOLD = 5

/**
 * The Sticker tool's canvas layer — FigJam-style stamps. With S active,
 * click anywhere to stamp the emoji selected in StickerPalette; real,
 * shared with every visitor via Firestore. Stickers can be dragged or
 * removed (hover for the × ) with any tool, same trust model as comment
 * pins (no auth, so nothing is "yours"). Lives inside the zoomed canvas
 * so pins pan/scale with it —
 * the palette itself renders separately, outside the zoom transform.
 * Desktop only.
 */
export function StickerTool() {
  const { activeTool, frames, zoom, stickerEmoji } = useLayers()
  const zoomRef = useRef(zoom)
  zoomRef.current = zoom
  const overlayRef = useRef<HTMLDivElement>(null)
  const clientId = getClientId()

  const [stickers, setStickers] = useState<StickerDoc[]>([])
  const [, setLayoutTick] = useState(0)

  useEffect(() => {
    const bump = () => setLayoutTick((t) => t + 1)
    window.addEventListener('resize', bump)
    return () => window.removeEventListener('resize', bump)
  }, [])

  useEffect(() => subscribeToStickers(setStickers), [])

  const frameLocal = useCallback(
    (frameId: string) => {
      const overlay = overlayRef.current
      const frame = frames.find((f) => f.id === frameId)
      if (!overlay || !frame) return null
      const fr = frame.el.getBoundingClientRect()
      const or = overlay.getBoundingClientRect()
      const z = zoomRef.current
      return { left: (fr.left - or.left) / z, top: (fr.top - or.top) / z }
    },
    [frames]
  )

  const toAnchor = useCallback(
    (clientX: number, clientY: number) => {
      const z = zoomRef.current
      let best: { id: string; rect: DOMRect } | null = null
      let bestDist = Infinity
      for (const f of frames) {
        const r = f.el.getBoundingClientRect()
        const inside = clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom
        const dist = inside
          ? 0
          : Math.hypot(
              Math.max(r.left - clientX, 0, clientX - r.right),
              Math.max(r.top - clientY, 0, clientY - r.bottom)
            )
        if (dist < bestDist) {
          bestDist = dist
          best = { id: f.id, rect: r }
        }
        if (dist === 0) break
      }
      if (!best) return null
      return { frameId: best.id, dx: (clientX - best.rect.left) / z, dy: (clientY - best.rect.top) / z }
    },
    [frames]
  )

  /* click to stamp a sticker */
  useEffect(() => {
    if (activeTool !== 'sticker') return
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('header, aside, button, a, input, [role="dialog"], [data-sticker-ui]')) return
      if (stickers.length >= MAX_STICKERS) return
      const anchor = toAnchor(e.clientX, e.clientY)
      if (!anchor) return
      addSticker({ ...anchor, emoji: stickerEmoji, clientId }).catch(() => {})
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [activeTool, stickers.length, toAnchor, stickerEmoji, clientId])

  /* ---------- dragging (works with any tool) ---------- */
  const dragState = useRef<{
    id: string
    startX: number
    startY: number
    origin: { dx: number; dy: number }
    moved: boolean
  } | null>(null)

  const startDrag = (sticker: StickerDoc, e: React.PointerEvent) => {
    if (e.button !== 0) return
    dragState.current = {
      id: sticker.id,
      startX: e.clientX,
      startY: e.clientY,
      origin: { dx: sticker.dx, dy: sticker.dy },
      moved: false,
    }
    e.preventDefault()
    e.stopPropagation()
  }

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const d = dragState.current
      if (!d) return
      const z = zoomRef.current
      const ddx = (e.clientX - d.startX) / z
      const ddy = (e.clientY - d.startY) / z
      if (!d.moved && Math.hypot(e.clientX - d.startX, e.clientY - d.startY) < DRAG_THRESHOLD) return
      d.moved = true
      setStickers((prev) => prev.map((s) => (s.id === d.id ? { ...s, dx: d.origin.dx + ddx, dy: d.origin.dy + ddy } : s)))
    }
    const onUp = () => {
      const d = dragState.current
      dragState.current = null
      if (!d || !d.moved) return
      const sticker = stickers.find((s) => s.id === d.id)
      if (sticker) updateStickerPosition(sticker.id, sticker.dx, sticker.dy).catch(() => {})
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stickers])

  const renderPos = (frameId: string, dx: number, dy: number) => {
    const local = frameLocal(frameId)
    if (!local) return null
    return { left: local.left + dx, top: local.top + dy }
  }

  return (
    <div ref={overlayRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 44 }} aria-hidden="true">
      {stickers.map((s) => {
        const pos = renderPos(s.frameId, s.dx, s.dy)
        if (!pos) return null
        return (
          <div key={s.id} data-sticker-ui className="group pointer-events-auto absolute" style={pos}>
            <button
              onPointerDown={(e) => startDrag(s, e)}
              className="flex items-center justify-center text-2xl leading-none drop-shadow-md"
              style={{ cursor: 'grab', touchAction: 'none' }}
              tabIndex={-1}
              aria-label={`Sticker: ${s.emoji}`}
            >
              {s.emoji}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                deleteSticker(s.id).catch(() => {})
              }}
              className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full opacity-0 shadow transition-opacity group-hover:opacity-100"
              style={{ backgroundColor: 'var(--figma-panel)', border: '1px solid var(--figma-border)', color: 'var(--figma-text-dim)' }}
              aria-label={`Remove sticker: ${s.emoji}`}
            >
              <X className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
