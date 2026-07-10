import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useLayers } from '../LayersContext'
import { seededComments } from '../../../data/collaborators'

const inter = { fontFamily: "'Inter', sans-serif" }

/** A pin anchored to a frame, like real Figma comments: frame id +
 *  offset from the frame's top-left in local (unzoomed) units. Pins
 *  follow their frame through zoom changes and layout reflows. */
interface Pin {
  id: number
  frameId: string
  dx: number
  dy: number
  text: string
}

const MAX_PINS = 10
const STORAGE_KEY = 'fig-comments-v2'
const DRAG_THRESHOLD = 5

function loadPins(): Pin[] {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

/**
 * The Comment tool. With C active, click anywhere to drop a pin and
 * type a note. Every pin — yours or a seeded collaborator's — can be
 * dragged anywhere with any tool. Pins anchor to their nearest frame,
 * so they stay glued through zoom changes and reflows. Desktop only.
 */
export function CommentTool() {
  const { activeTool, setActiveTool, frames, zoom } = useLayers()
  const zoomRef = useRef(zoom)
  zoomRef.current = zoom
  const overlayRef = useRef<HTMLDivElement>(null)

  const [userPins, setUserPins] = useState<Pin[]>(loadPins)
  const [seedPins, setSeedPins] = useState<Pin[]>([])
  const [draft, setDraft] = useState<{ frameId: string; dx: number; dy: number } | null>(null)
  const [draftText, setDraftText] = useState('')
  const [openId, setOpenId] = useState<number | null>(null)
  const [, setLayoutTick] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  /* recompute pin screen positions when the layout reflows */
  useEffect(() => {
    const bump = () => setLayoutTick((t) => t + 1)
    window.addEventListener('resize', bump)
    return () => window.removeEventListener('resize', bump)
  }, [])

  /** local-space top-left of a frame relative to the overlay */
  const frameLocal = useCallback(
    (frameId: string) => {
      const overlay = overlayRef.current
      const frame = frames.find((f) => f.id === frameId)
      if (!overlay || !frame) return null
      const fr = frame.el.getBoundingClientRect()
      const or = overlay.getBoundingClientRect()
      const z = zoomRef.current
      return { left: (fr.left - or.left) / z, top: (fr.top - or.top) / z, width: fr.width / z, height: fr.height / z }
    },
    [frames]
  )

  /** physical viewport point -> frame anchor {frameId, dx, dy} */
  const toAnchor = useCallback(
    (clientX: number, clientY: number) => {
      const z = zoomRef.current
      // prefer the frame the point is inside; fall back to the nearest
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
      return {
        frameId: best.id,
        dx: (clientX - best.rect.left) / z,
        dy: (clientY - best.rect.top) / z,
      }
    },
    [frames]
  )

  const save = useCallback((next: Pin[]) => {
    setUserPins(next)
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* ignore */
    }
  }, [])

  /* seed collaborator comments onto their home frames */
  useEffect(() => {
    setSeedPins((prev) => {
      if (prev.length) return prev // keep positions once seeded (user may drag)
      const next: Pin[] = []
      seededComments.forEach((s, i) => {
        const local = frameLocal(s.section)
        if (!local) return
        next.push({
          id: -(i + 1),
          frameId: s.section,
          dx: local.width - 48,
          dy: 56 + i * 44,
          text: s.text,
        })
      })
      return next
    })
  }, [frames, frameLocal])

  /* click to drop a draft pin */
  useEffect(() => {
    if (activeTool !== 'comment') {
      setDraft(null)
      return
    }
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('header, aside, button, a, input, [role="dialog"], [data-comment-ui]')) return
      if (userPins.length >= MAX_PINS) return
      const anchor = toAnchor(e.clientX, e.clientY)
      if (!anchor) return
      setDraft(anchor)
      setDraftText('')
      setOpenId(null)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [activeTool, userPins.length, toAnchor])

  useEffect(() => {
    if (draft) inputRef.current?.focus()
  }, [draft])

  const commitDraft = () => {
    if (draft && draftText.trim()) {
      save([...userPins, { id: Date.now(), ...draft, text: draftText.trim() }])
    }
    setDraft(null)
    setDraftText('')
  }

  /* ---------- pin dragging (works with any tool) ---------- */
  const dragState = useRef<{
    id: number
    startX: number
    startY: number
    origin: { dx: number; dy: number }
    moved: boolean
  } | null>(null)

  const startDrag = (pin: Pin, e: React.PointerEvent) => {
    if (e.button !== 0) return
    dragState.current = {
      id: pin.id,
      startX: e.clientX,
      startY: e.clientY,
      origin: { dx: pin.dx, dy: pin.dy },
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
      const apply = (p: Pin) =>
        p.id === d.id ? { ...p, dx: d.origin.dx + ddx, dy: d.origin.dy + ddy } : p
      if (d.id < 0) setSeedPins((prev) => prev.map(apply))
      else setUserPins((prev) => prev.map(apply))
    }
    const onUp = () => {
      const d = dragState.current
      dragState.current = null
      if (!d) return
      if (d.moved) {
        if (d.id >= 0) {
          setUserPins((prev) => {
            try {
              sessionStorage.setItem(STORAGE_KEY, JSON.stringify(prev))
            } catch {
              /* ignore */
            }
            return prev
          })
        }
      } else {
        setOpenId((cur) => (cur === d.id ? null : d.id))
      }
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  const pinStyle = (color: string): React.CSSProperties => ({
    ...inter,
    backgroundColor: color,
    borderRadius: '50% 50% 50% 4px',
    cursor: 'grab',
    touchAction: 'none',
  })

  const renderPos = (pin: Pin) => {
    const local = frameLocal(pin.frameId)
    if (!local) return null
    return { left: local.left + pin.dx, top: local.top + pin.dy }
  }

  const seedAuthor = (id: number) => seededComments[-id - 1]?.author

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 45 }}
      aria-hidden="true"
    >
      {/* seeded collaborator comments */}
      {seedPins.map((pin) => {
        const pos = renderPos(pin)
        const author = seedAuthor(pin.id)
        if (!pos || !author) return null
        return (
          <div key={pin.id} className="absolute" style={pos}>
            <button
              data-comment-ui
              onPointerDown={(e) => startDrag(pin, e)}
              className="comment-pin pointer-events-auto flex h-8 w-8 items-center justify-center text-[10px] font-bold text-white shadow-lg"
              style={pinStyle(author.color)}
              tabIndex={-1}
            >
              {author.initials}
            </button>
            {openId === pin.id && (
              <div
                data-comment-ui
                className="pointer-events-auto absolute left-9 top-0 w-56 rounded-xl rounded-tl-sm border p-3 shadow-xl"
                style={{ backgroundColor: 'var(--figma-panel)', borderColor: 'var(--figma-border)' }}
              >
                <p className="text-[11px] font-semibold" style={{ ...inter, color: 'var(--figma-text)' }}>
                  {author.name} · {author.role}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed" style={{ ...inter, color: 'var(--figma-text-dim)' }}>
                  {pin.text}
                </p>
              </div>
            )}
          </div>
        )
      })}

      {/* user comments */}
      {userPins.map((pin) => {
        const pos = renderPos(pin)
        if (!pos) return null
        return (
          <div key={pin.id} className="absolute" style={pos}>
            <button
              data-comment-ui
              onPointerDown={(e) => startDrag(pin, e)}
              className="comment-pin pointer-events-auto flex h-8 w-8 items-center justify-center text-[10px] font-bold text-white shadow-lg"
              style={pinStyle('var(--figma-blue)')}
              tabIndex={-1}
            >
              You
            </button>
            {openId === pin.id && (
              <div
                data-comment-ui
                className="pointer-events-auto absolute left-9 top-0 w-56 rounded-xl rounded-tl-sm border p-3 shadow-xl"
                style={{ backgroundColor: 'var(--figma-panel)', borderColor: 'var(--figma-border)' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[12px] leading-relaxed" style={{ ...inter, color: 'var(--figma-text)' }}>
                    {pin.text}
                  </p>
                  <button
                    onClick={() => {
                      save(userPins.filter((x) => x.id !== pin.id))
                      setOpenId(null)
                    }}
                    className="flex-shrink-0"
                    style={{ color: 'var(--figma-text-dim)' }}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* draft pin + input */}
      {draft &&
        (() => {
          const pos = renderPos({ id: 0, ...draft, text: '' })
          if (!pos) return null
          return (
            <div className="absolute" style={pos}>
              <span
                className="comment-pin flex h-8 w-8 items-center justify-center text-[10px] font-bold text-white shadow-lg"
                style={pinStyle('var(--figma-blue)')}
              >
                You
              </span>
              <div
                data-comment-ui
                className="pointer-events-auto absolute left-9 top-0 flex w-64 items-center gap-2 rounded-xl rounded-tl-sm border p-2 shadow-xl"
                style={{ backgroundColor: 'var(--figma-panel)', borderColor: 'var(--figma-border)' }}
              >
                <input
                  ref={inputRef}
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitDraft()
                    if (e.key === 'Escape') {
                      e.stopPropagation()
                      setDraft(null)
                      setActiveTool('select')
                    }
                  }}
                  placeholder="Add a comment…"
                  className="w-full bg-transparent text-[12px] outline-none"
                  style={{ ...inter, color: 'var(--figma-text)' }}
                />
                <button
                  onClick={commitDraft}
                  className="rounded-md px-2 py-1 text-[11px] font-semibold text-white"
                  style={{ ...inter, backgroundColor: 'var(--figma-blue)' }}
                >
                  Post
                </button>
              </div>
            </div>
          )
        })()}
    </div>
  )
}
