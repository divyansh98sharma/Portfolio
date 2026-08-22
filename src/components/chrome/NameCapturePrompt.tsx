import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { GHOST_NAME, getClientId, getStoredName, hasBeenPrompted, markPrompted, setStoredName } from '../../lib/identity'
import { upsertVisitor } from '../../lib/visitors'

const inter = { fontFamily: "'Inter', sans-serif" }
const SHOW_DELAY_MS = 2500

/** A one-time, dismissible nudge for first-time visitors to leave a name —
 *  joining the real, live visitor avatar stack in the top bar. Skippable,
 *  never shown twice, and a no-op if they've already left a name via the
 *  comment tool (they're upserted as a visitor silently instead). Visitors
 *  with no name yet are upserted as GHOST_NAME on every mount, so they show
 *  up live in the stack (and keep refreshing lastSeen) until they join. */
export function NameCapturePrompt() {
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    const stored = getStoredName()
    const clientId = getClientId()
    if (stored) {
      upsertVisitor({ clientId, name: stored }).catch(() => {})
      return
    }
    upsertVisitor({ clientId, name: GHOST_NAME }).catch(() => {})
    if (hasBeenPrompted()) return
    const timer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  const dismiss = () => {
    markPrompted()
    setVisible(false)
  }

  const submit = () => {
    const trimmed = name.trim()
    if (!trimmed) return
    setStoredName(trimmed)
    markPrompted()
    upsertVisitor({ clientId: getClientId(), name: trimmed }).catch(() => {})
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="figma-chrome fixed bottom-4 right-4 z-[60] w-72 rounded-xl border p-4 shadow-xl"
      style={{ backgroundColor: 'var(--figma-panel)', borderColor: 'var(--figma-border)', color: 'var(--figma-text)' }}
      role="dialog"
      aria-label="Add your name"
    >
      <button
        onClick={dismiss}
        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-[color-mix(in_srgb,var(--figma-text)_8%,transparent)]"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" style={{ color: 'var(--figma-text-dim)' }} />
      </button>
      <p className="pr-5 text-[13px] font-semibold" style={inter}>
        👋 What should we call you?
      </p>
      <p className="mt-1 text-[11px] leading-relaxed" style={{ ...inter, color: 'var(--figma-text-dim)' }}>
        Join the live visitor stack up top — no account needed.
      </p>
      <div className="mt-3 flex items-center gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit()
          }}
          placeholder="Your name"
          maxLength={40}
          autoFocus
          className="w-full rounded-md border bg-transparent px-2.5 py-1.5 text-[12px] outline-none"
          style={{ ...inter, color: 'var(--figma-text)', borderColor: 'var(--figma-border)' }}
        />
        <button
          onClick={submit}
          disabled={!name.trim()}
          className="flex-shrink-0 rounded-md px-3 py-1.5 text-[12px] font-semibold text-white disabled:opacity-40"
          style={{ ...inter, backgroundColor: 'var(--figma-blue)' }}
        >
          Join
        </button>
      </div>
    </div>
  )
}
