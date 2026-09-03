import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { GHOST_NAME, getClientId, getStoredName, hasBeenPrompted, markPrompted, setStoredName } from '../../lib/identity'
import { upsertVisitor } from '../../lib/visitors'
import { isValidEmail, submitLead } from '../../lib/leads'

const inter = { fontFamily: "'Inter', sans-serif" }
const SHOW_DELAY_MS = 2500

/** A one-time, dismissible nudge for first-time visitors to leave a name —
 *  joining the real, live visitor avatar stack in the top bar — with an
 *  optional email so they can be followed up with. Skippable, never shown
 *  twice, and a no-op if they've already left a name via the comment tool
 *  (they're upserted as a visitor silently instead). Visitors with no name
 *  yet are upserted as GHOST_NAME on every mount, so they show up live in
 *  the stack (and keep refreshing lastSeen) until they join. The email, if
 *  given, is write-only — it never joins the public visitor stack. */
export function NameCapturePrompt() {
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

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
    const trimmedEmail = email.trim()
    const clientId = getClientId()
    setStoredName(trimmed)
    markPrompted()
    upsertVisitor({ clientId, name: trimmed }).catch(() => {})
    if (trimmedEmail && isValidEmail(trimmedEmail)) {
      submitLead({ clientId, name: trimmed, email: trimmedEmail }).catch(() => {})
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="figma-chrome pointer-events-auto w-72 max-w-[calc(100vw-2rem)] rounded-xl border p-4 shadow-xl"
      style={{ backgroundColor: 'var(--figma-panel)', borderColor: 'var(--figma-border)', color: 'var(--figma-text)' }}
      role="dialog"
      aria-label="Add your name"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[13px] font-semibold" style={inter}>
          👋 What should we call you?
        </p>
        <button
          onClick={dismiss}
          className="-mr-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md transition-colors hover:bg-[color-mix(in_srgb,var(--figma-text)_8%,transparent)]"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" style={{ color: 'var(--figma-text-dim)' }} />
        </button>
      </div>
      <p className="mt-1 text-[11px] leading-relaxed" style={{ ...inter, color: 'var(--figma-text-dim)' }}>
        Join the live visitor stack up top — no account needed.
      </p>
      <div className="mt-3 space-y-1.5">
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
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit()
          }}
          placeholder="Email (optional)"
          maxLength={200}
          className="w-full rounded-md border bg-transparent px-2.5 py-1.5 text-[12px] outline-none"
          style={{ ...inter, color: 'var(--figma-text)', borderColor: 'var(--figma-border)' }}
        />
      </div>
      <p className="mt-1.5 text-[10px] leading-relaxed" style={{ ...inter, color: 'var(--figma-text-dim)' }}>
        Email's optional — only used if I want to follow up, never shown publicly.
      </p>
      <button
        onClick={submit}
        disabled={!name.trim()}
        className="mt-2 w-full rounded-md px-3 py-1.5 text-[12px] font-semibold text-white disabled:opacity-40"
        style={{ ...inter, backgroundColor: 'var(--figma-blue)' }}
      >
        Join
      </button>
    </div>
  )
}
