import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { MessageCircle, Send, X, Loader2 } from 'lucide-react'
import { getClientId } from '../../lib/identity'

const inter = { fontFamily: "'Inter', sans-serif" }

// Cloud Run function (functions/index.js's chatWithPortfolio), deployed the
// same way as send-contact-email — see Contact.tsx. Verify this URL against
// the actual deployed service before shipping; Cloud Run derives it from the
// function name, so it won't match until the function has been deployed.
const CHAT_ENDPOINT = 'https://chatwithportfolio-45481375965.us-central1.run.app'

const GREETING = "Hi! I'm here to answer questions about Divyansh's work, background, and case studies. What would you like to know?"

interface ChatTurn {
  role: 'user' | 'model'
  text: string
}

type Status = 'idle' | 'sending' | 'error'

/** Floating chat trigger (bottom-left, mirroring NameCapturePrompt's
 *  bottom-right placement) that opens a small Q&A panel grounded in
 *  Divyansh's real bio/case-study facts — see functions/index.js's
 *  PORTFOLIO_CONTEXT for what it actually knows. */
export function AiChat() {
  const [open, setOpen] = useState(false)
  const [turns, setTurns] = useState<ChatTurn[]>([])
  const [draft, setDraft] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [turns, status])

  const send = async () => {
    const message = draft.trim()
    if (!message || status === 'sending') return

    const history = turns.slice(-12)
    setTurns((prev) => [...prev, { role: 'user', text: message }])
    setDraft('')
    setStatus('sending')

    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: getClientId(), message, history }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.reply) throw new Error('bad response')
      setTurns((prev) => [...prev, { role: 'model', text: data.reply }])
      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') send()
  }

  return (
    <>
      {open && (
        <div
          className="figma-chrome fixed bottom-80 left-4 z-[60] flex w-80 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border shadow-xl"
          style={{ backgroundColor: 'var(--figma-panel)', borderColor: 'var(--figma-border)', color: 'var(--figma-text)' }}
          role="dialog"
          aria-label="Ask about Divyansh"
        >
          <div
            className="flex items-center justify-between border-b px-3.5 py-2.5"
            style={{ borderColor: 'var(--figma-border)' }}
          >
            <p className="text-[13px] font-semibold" style={inter}>
              Ask about Divyansh
            </p>
            <button
              onClick={() => setOpen(false)}
              className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-[color-mix(in_srgb,var(--figma-text)_8%,transparent)]"
              aria-label="Close chat"
            >
              <X className="h-3.5 w-3.5" style={{ color: 'var(--figma-text-dim)' }} />
            </button>
          </div>

          <div ref={scrollRef} className="flex max-h-80 flex-col gap-2 overflow-y-auto px-3.5 py-3">
            <ChatBubble role="model" text={GREETING} />
            {turns.map((turn, i) => (
              <ChatBubble key={i} role={turn.role} text={turn.text} />
            ))}
            {status === 'sending' && (
              <div className="flex items-center gap-1.5 self-start px-1 py-1" style={{ color: 'var(--figma-text-dim)' }}>
                <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
                <span className="text-[11px]" style={inter}>Thinking…</span>
              </div>
            )}
            {status === 'error' && (
              <p className="self-start text-[11px]" style={{ ...inter, color: 'var(--destructive, #e5484d)' }}>
                Something went wrong — try again, or use the contact form below.
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5 border-t p-2" style={{ borderColor: 'var(--figma-border)' }}>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask a question…"
              maxLength={1000}
              autoFocus
              className="w-full rounded-md border bg-transparent px-2.5 py-1.5 text-[12px] outline-none"
              style={{ ...inter, color: 'var(--figma-text)', borderColor: 'var(--figma-border)' }}
            />
            <button
              onClick={send}
              disabled={!draft.trim() || status === 'sending'}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-white disabled:opacity-40"
              style={{ backgroundColor: 'var(--figma-blue)' }}
              aria-label="Send message"
            >
              <Send className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="figma-chrome pointer-events-auto fixed bottom-64 left-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full border shadow-lg transition-transform hover:scale-105"
        style={{ backgroundColor: 'var(--figma-blue)', borderColor: 'var(--figma-border)' }}
        aria-label={open ? 'Close chat' : 'Ask about Divyansh'}
        title="Ask about Divyansh"
      >
        {open ? <X className="h-4.5 w-4.5 text-white" /> : <MessageCircle className="h-4.5 w-4.5 text-white" />}
      </button>
    </>
  )
}

function ChatBubble({ role, text }: ChatTurn) {
  const isUser = role === 'user'
  return (
    <div
      className="max-w-[85%] rounded-lg px-2.5 py-1.5 text-[12px] leading-relaxed"
      style={{
        ...inter,
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        backgroundColor: isUser ? 'var(--figma-blue)' : 'color-mix(in srgb, var(--figma-text) 6%, transparent)',
        color: isUser ? '#fff' : 'var(--figma-text)',
      }}
    >
      {text}
    </div>
  )
}
