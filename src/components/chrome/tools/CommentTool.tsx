import { useCallback, useEffect, useRef, useState } from 'react'
import { useLayers } from '../LayersContext'
import {
  addComment,
  addReply,
  subscribeToComments,
  subscribeToReplies,
  updateCommentPosition,
  type CommentDoc,
  type ReplyDoc,
} from '../../../lib/comments'
import { colorForName, getStoredName, initialsForName, setStoredName } from '../../../lib/identity'

const inter = { fontFamily: "'Inter', sans-serif" }

const MAX_PINS = 200
const DRAG_THRESHOLD = 5

/**
 * The Comment tool. With C active, click anywhere to drop a pin and
 * type a note — real, shared with every visitor via Firestore, with
 * threaded replies. Any pin can be dragged anywhere with any tool
 * (there's no auth, so "yours" isn't tracked once posted). Desktop only.
 */
export function CommentTool() {
  const { activeTool, setActiveTool, frames, zoom } = useLayers()
  const zoomRef = useRef(zoom)
  zoomRef.current = zoom
  const overlayRef = useRef<HTMLDivElement>(null)

  const [comments, setComments] = useState<CommentDoc[]>([])
  const [draft, setDraft] = useState<{ frameId: string; dx: number; dy: number } | null>(null)
  const [draftText, setDraftText] = useState('')
  const [nameInput, setNameInput] = useState(() => getStoredName() ?? '')
  const [hasStoredName, setHasStoredName] = useState(() => !!getStoredName())
  const [openId, setOpenId] = useState<string | null>(null)
  const [replies, setReplies] = useState<ReplyDoc[]>([])
  const [replyText, setReplyText] = useState('')
  const [posting, setPosting] = useState(false)
  const [, setLayoutTick] = useState(0)
  const textInputRef = useRef<HTMLInputElement>(null)

  /* recompute pin screen positions when the layout reflows */
  useEffect(() => {
    const bump = () => setLayoutTick((t) => t + 1)
    window.addEventListener('resize', bump)
    return () => window.removeEventListener('resize', bump)
  }, [])

  /* live comments, shared across every visitor */
  useEffect(() => subscribeToComments(setComments), [])

  /* replies for whichever thread is currently open */
  useEffect(() => {
    if (!openId) {
      setReplies([])
      return
    }
    return subscribeToReplies(openId, setReplies)
  }, [openId])

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
      const anchor = toAnchor(e.clientX, e.clientY)
      if (!anchor) return
      setDraft(anchor)
      setDraftText('')
      setOpenId(null)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [activeTool, comments.length, toAnchor])

  useEffect(() => {
    if (draft) textInputRef.current?.focus()
  }, [draft])

  const commitDraft = async () => {
    const name = nameInput.trim()
    const text = draftText.trim()
    if (!draft || !name || !text || posting) return
    setPosting(true)
    setStoredName(name)
    setHasStoredName(true)
    try {
      await addComment({ ...draft, text, authorName: name })
      setDraft(null)
      setDraftText('')
    } finally {
      setPosting(false)
    }
  }

  const commitReply = async () => {
    const name = nameInput.trim()
    const text = replyText.trim()
    if (!openId || !name || !text || posting) return
    setPosting(true)
    setStoredName(name)
    setHasStoredName(true)
    try {
      await addReply(openId, { text, authorName: name })
      setReplyText('')
    } finally {
      setPosting(false)
    }
  }

  /* ---------- pin dragging (works with any tool) ---------- */
  const dragState = useRef<{
    id: string
    startX: number
    startY: number
    origin: { dx: number; dy: number }
    moved: boolean
  } | null>(null)

  const startDrag = (pin: CommentDoc, e: React.PointerEvent) => {
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
      setComments((prev) =>
        prev.map((p) => (p.id === d.id ? { ...p, dx: d.origin.dx + ddx, dy: d.origin.dy + ddy } : p))
      )
    }
    const onUp = () => {
      const d = dragState.current
      dragState.current = null
      if (!d) return
      if (d.moved) {
        const pin = comments.find((p) => p.id === d.id)
        if (pin) updateCommentPosition(pin.id, pin.dx, pin.dy).catch(() => {})
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments])

  const pinStyle = (color: string): React.CSSProperties => ({
    ...inter,
    backgroundColor: color,
    borderRadius: '50% 50% 50% 4px',
    cursor: 'grab',
    touchAction: 'none',
  })

  const renderPos = (frameId: string, dx: number, dy: number) => {
    const local = frameLocal(frameId)
    if (!local) return null
    return { left: local.left + dx, top: local.top + dy }
  }

  const needsName = !nameInput.trim()

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 45 }}
      aria-hidden="true"
    >
      {comments.map((pin) => {
        const pos = renderPos(pin.frameId, pin.dx, pin.dy)
        if (!pos) return null
        const color = colorForName(pin.authorName)
        return (
          <div key={pin.id} className="absolute" style={pos}>
            <button
              data-comment-ui
              onPointerDown={(e) => startDrag(pin, e)}
              className="comment-pin pointer-events-auto flex h-8 w-8 items-center justify-center text-[10px] font-bold text-white shadow-lg"
              style={pinStyle(color)}
              tabIndex={-1}
              aria-label={`Comment by ${pin.authorName}`}
            >
              {initialsForName(pin.authorName)}
            </button>
            {openId === pin.id && (
              <div
                data-comment-ui
                className="pointer-events-auto absolute left-9 top-0 w-64 rounded-xl rounded-tl-sm border p-3 shadow-xl"
                style={{ backgroundColor: 'var(--figma-panel)', borderColor: 'var(--figma-border)' }}
              >
                <p className="text-[11px] font-semibold" style={{ ...inter, color: 'var(--figma-text)' }}>
                  {pin.authorName}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed" style={{ ...inter, color: 'var(--figma-text-dim)' }}>
                  {pin.text}
                </p>

                {replies.length > 0 && (
                  <div className="mt-2 space-y-2 border-t pt-2" style={{ borderColor: 'var(--figma-border)' }}>
                    {replies.map((r) => (
                      <div key={r.id}>
                        <p className="text-[10px] font-semibold" style={{ ...inter, color: 'var(--figma-text)' }}>
                          {r.authorName}
                        </p>
                        <p className="text-[11px] leading-relaxed" style={{ ...inter, color: 'var(--figma-text-dim)' }}>
                          {r.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-2 border-t pt-2" style={{ borderColor: 'var(--figma-border)' }}>
                  {!hasStoredName && (
                    <input
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="Your name"
                      maxLength={40}
                      className="mb-1.5 w-full rounded-md border bg-transparent px-2 py-1 text-[11px] outline-none"
                      style={{ ...inter, color: 'var(--figma-text)', borderColor: 'var(--figma-border)' }}
                    />
                  )}
                  <div className="flex items-center gap-1.5">
                    <input
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') commitReply()
                      }}
                      placeholder="Reply…"
                      maxLength={280}
                      className="w-full bg-transparent text-[12px] outline-none"
                      style={{ ...inter, color: 'var(--figma-text)' }}
                    />
                    <button
                      onClick={commitReply}
                      disabled={posting || needsName || !replyText.trim()}
                      className="flex-shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold text-white disabled:opacity-40"
                      style={{ ...inter, backgroundColor: 'var(--figma-blue)' }}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* draft pin + composer */}
      {draft &&
        (() => {
          const pos = renderPos(draft.frameId, draft.dx, draft.dy)
          if (!pos) return null
          return (
            <div className="absolute" style={pos}>
              <span
                className="comment-pin flex h-8 w-8 items-center justify-center text-[10px] font-bold text-white shadow-lg"
                style={pinStyle('var(--figma-blue)')}
              >
                {needsName ? '?' : initialsForName(nameInput)}
              </span>
              <div
                data-comment-ui
                className="pointer-events-auto absolute left-9 top-0 w-64 rounded-xl rounded-tl-sm border p-2 shadow-xl"
                style={{ backgroundColor: 'var(--figma-panel)', borderColor: 'var(--figma-border)' }}
              >
                {!hasStoredName && (
                  <input
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Your name"
                    maxLength={40}
                    className="mb-1.5 w-full rounded-md border bg-transparent px-2 py-1 text-[12px] outline-none"
                    style={{ ...inter, color: 'var(--figma-text)', borderColor: 'var(--figma-border)' }}
                  />
                )}
                <div className="flex items-center gap-2">
                  <input
                    ref={textInputRef}
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
                    maxLength={280}
                    className="w-full bg-transparent text-[12px] outline-none"
                    style={{ ...inter, color: 'var(--figma-text)' }}
                  />
                  <button
                    onClick={commitDraft}
                    disabled={posting || needsName || !draftText.trim()}
                    className="flex-shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold text-white disabled:opacity-40"
                    style={{ ...inter, backgroundColor: 'var(--figma-blue)' }}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          )
        })()}
    </div>
  )
}
