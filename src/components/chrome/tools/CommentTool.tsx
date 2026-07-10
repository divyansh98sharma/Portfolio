import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useLayers } from '../LayersContext'
import { seededComments } from '../../../data/collaborators'

const inter = { fontFamily: "'Inter', sans-serif" }

interface UserComment {
  id: number
  /** zoom-independent document coordinates (divide physical px by zoom) */
  x: number
  y: number
  text: string
}

const MAX_PINS = 10
const STORAGE_KEY = 'fig-comments'
const DRAG_THRESHOLD = 5

function loadComments(): UserComment[] {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

/**
 * The Comment tool. With C active, click the canvas to drop a pin and
 * type a note. Every pin — yours or the seeded collaborators' — can be
 * dragged anywhere, with any tool active. Coordinates live in the
 * zoomed content's local space, so pins stay glued to their spot on
 * the frames at every zoom level. Desktop only.
 */
export function CommentTool() {
  const { activeTool, setActiveTool, frames, zoom } = useLayers()
  const zoomRef = useRef(zoom)
  zoomRef.current = zoom

  const [comments, setComments] = useState<UserComment[]>(loadComments)
  const [draft, setDraft] = useState<{ x: number; y: number } | null>(null)
  const [draftText, setDraftText] = useState('')
  const [openId, setOpenId] = useState<number | null>(null)
  const [seedPositions, setSeedPositions] = useState<Record<number, { x: number; y: number }>>({})
  const inputRef = useRef<HTMLInputElement>(null)

  /** physical viewport point -> local (zoom-independent) document point */
  const toLocal = useCallback((clientX: number, clientY: number) => {
    const z = zoomRef.current
    return { x: (clientX + window.scrollX) / z, y: (clientY + window.scrollY) / z }
  }, [])

  const save = useCallback((next: UserComment[]) => {
    setComments(next)
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* ignore */
    }
  }, [])

  /* seed the collaborator comments near their home frames (once per layout) */
  useEffect(() => {
    setSeedPositions((prev) => {
      const next = { ...prev }
      seededComments.forEach((s, i) => {
        const id = -(i + 1)
        if (next[id]) return // user may have dragged it — keep
        const frame = frames.find((f) => f.id === s.section)
        if (!frame) return
        const rect = frame.el.getBoundingClientRect()
        const z = zoomRef.current
        next[id] = {
          x: (rect.right + window.scrollX) / z - 60 - i * 20,
          y: (rect.top + window.scrollY) / z + 70 + i * 40,
        }
      })
      return next
    })
  }, [frames])

  /* click to drop a draft pin */
  useEffect(() => {
    if (activeTool !== 'comment') {
      setDraft(null)
      return
    }
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('header, aside, button, a, input, [role="dialog"], [data-comment-ui]')) return
      if (comments.length >= MAX_PINS) return
      setDraft(toLocal(e.clientX, e.clientY))
      setDraftText('')
      setOpenId(null)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [activeTool, comments.length, toLocal])

  useEffect(() => {
    if (draft) inputRef.current?.focus()
  }, [draft])

  const commitDraft = () => {
    if (draft && draftText.trim()) {
      save([...comments, { id: Date.now(), x: draft.x, y: draft.y, text: draftText.trim() }])
    }
    setDraft(null)
    setDraftText('')
  }

  /* ---------- pin dragging (works with any tool) ---------- */
  const dragState = useRef<{
    id: number
    startX: number
    startY: number
    origin: { x: number; y: number }
    moved: boolean
  } | null>(null)

  const startDrag = (id: number, e: React.PointerEvent) => {
    if (e.button !== 0) return
    const origin = id < 0 ? seedPositions[id] : comments.find((c) => c.id === id)
    if (!origin) return
    dragState.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      origin: { x: origin.x, y: origin.y },
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
      const dx = (e.clientX - d.startX) / z
      const dy = (e.clientY - d.startY) / z
      if (!d.moved && Math.hypot(dx * z, dy * z) < DRAG_THRESHOLD) return
      d.moved = true
      const pos = { x: d.origin.x + dx, y: d.origin.y + dy }
      if (d.id < 0) {
        setSeedPositions((prev) => ({ ...prev, [d.id]: pos }))
      } else {
        setComments((prev) => prev.map((c) => (c.id === d.id ? { ...c, ...pos } : c)))
      }
    }
    const onUp = () => {
      const d = dragState.current
      dragState.current = null
      if (!d) return
      if (d.moved) {
        // persist dragged user pins; suppress the click-toggle
        if (d.id >= 0) {
          setComments((prev) => {
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

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 45 }} aria-hidden="true">
      {/* seeded collaborator comments */}
      {seededComments.map((s, i) => {
        const id = -(i + 1)
        const pos = seedPositions[id]
        if (!pos) return null
        return (
          <div key={id} className="absolute" style={{ left: pos.x, top: pos.y }}>
            <button
              data-comment-ui
              onPointerDown={(e) => startDrag(id, e)}
              className="comment-pin pointer-events-auto flex h-8 w-8 items-center justify-center text-[10px] font-bold text-white shadow-lg"
              style={pinStyle(s.author.color)}
              tabIndex={-1}
            >
              {s.author.initials}
            </button>
            {openId === id && (
              <div
                data-comment-ui
                className="pointer-events-auto absolute left-9 top-0 w-56 rounded-xl rounded-tl-sm border p-3 shadow-xl"
                style={{ backgroundColor: 'var(--figma-panel)', borderColor: 'var(--figma-border)' }}
              >
                <p className="text-[11px] font-semibold" style={{ ...inter, color: 'var(--figma-text)' }}>
                  {s.author.name} · {s.author.role}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed" style={{ ...inter, color: 'var(--figma-text-dim)' }}>
                  {s.text}
                </p>
              </div>
            )}
          </div>
        )
      })}

      {/* user comments */}
      {comments.map((c) => (
        <div key={c.id} className="absolute" style={{ left: c.x, top: c.y }}>
          <button
            data-comment-ui
            onPointerDown={(e) => startDrag(c.id, e)}
            className="comment-pin pointer-events-auto flex h-8 w-8 items-center justify-center text-[10px] font-bold text-white shadow-lg"
            style={pinStyle('var(--figma-blue)')}
            tabIndex={-1}
          >
            You
          </button>
          {openId === c.id && (
            <div
              data-comment-ui
              className="pointer-events-auto absolute left-9 top-0 w-56 rounded-xl rounded-tl-sm border p-3 shadow-xl"
              style={{ backgroundColor: 'var(--figma-panel)', borderColor: 'var(--figma-border)' }}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[12px] leading-relaxed" style={{ ...inter, color: 'var(--figma-text)' }}>
                  {c.text}
                </p>
                <button
                  onClick={() => {
                    save(comments.filter((x) => x.id !== c.id))
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
      ))}

      {/* draft pin + input */}
      {draft && (
        <div className="absolute" style={{ left: draft.x, top: draft.y }}>
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
      )}
    </div>
  )
}
