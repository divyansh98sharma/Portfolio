import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useLayers } from '../LayersContext'
import { seededComments } from '../../../data/collaborators'

const inter = { fontFamily: "'Inter', sans-serif" }

interface UserComment {
  id: number
  /** document-space coordinates so pins scroll with the page */
  x: number
  y: number
  text: string
}

const MAX_PINS = 10
const STORAGE_KEY = 'fig-comments'

function loadComments(): UserComment[] {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

/**
 * The Comment tool: with C active, click the canvas to drop a pin and type
 * a note (stored in sessionStorage). Also renders 2 pre-seeded comments
 * from fake collaborators near their home sections. Desktop only.
 */
export function CommentTool() {
  const { activeTool, setActiveTool, frames } = useLayers()
  const [comments, setComments] = useState<UserComment[]>(loadComments)
  const [draft, setDraft] = useState<{ x: number; y: number } | null>(null)
  const [draftText, setDraftText] = useState('')
  const [openId, setOpenId] = useState<number | null>(null)
  const [seedPositions, setSeedPositions] = useState<{ x: number; y: number }[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const save = useCallback((next: UserComment[]) => {
    setComments(next)
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* ignore */
    }
  }, [])

  /* position the seeded comments near their home frames */
  useEffect(() => {
    const compute = () => {
      setSeedPositions(
        seededComments.map((s, i) => {
          const frame = frames.find((f) => f.id === s.section)
          if (!frame) return { x: -9999, y: -9999 }
          const rect = frame.el.getBoundingClientRect()
          return {
            x: rect.right + window.scrollX - 40 - i * 14,
            y: rect.top + window.scrollY + 60 + i * 30,
          }
        })
      )
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
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
      setDraft({ x: e.clientX + window.scrollX, y: e.clientY + window.scrollY })
      setDraftText('')
      setOpenId(null)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [activeTool, comments.length])

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

  const pinStyle = (color: string): React.CSSProperties => ({
    ...inter,
    backgroundColor: color,
    borderRadius: '50% 50% 50% 4px',
  })

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 45 }} aria-hidden="true">
      {/* seeded collaborator comments */}
      {seededComments.map((s, i) => {
        const pos = seedPositions[i]
        if (!pos || pos.x < 0) return null
        const id = -(i + 1)
        return (
          <div key={id} className="absolute" style={{ left: pos.x, top: pos.y }}>
            <button
              data-comment-ui
              onClick={() => setOpenId(openId === id ? null : id)}
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
            onClick={() => setOpenId(openId === c.id ? null : c.id)}
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
