import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

const inter = { fontFamily: "'Inter', sans-serif" }
const CONSENT_KEY = 'analytics-consent'

type Consent = 'granted' | 'denied'

function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

interface ConsentContextValue {
  consent: Consent | null
  /** Reopens the banner so a visitor can change an earlier choice. */
  reopen: () => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function useConsent() {
  const ctx = useContext(ConsentContext)
  if (!ctx) throw new Error('useConsent must be used within ConsentProvider')
  return ctx
}

/** Real opt-in gate for Google Analytics — nothing in src/lib/analytics.ts
 *  runs until a visitor actively accepts. Declining (or never answering)
 *  means zero analytics code ever loads for that browser. */
export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<Consent | null>(() => readConsent())
  const [visible, setVisible] = useState(() => readConsent() === null)

  useEffect(() => {
    if (consent === 'granted') {
      void import('../../lib/analytics').then((m) => m.initAnalytics())
    }
  }, [consent])

  const persist = useCallback((value: Consent) => {
    try {
      localStorage.setItem(CONSENT_KEY, value)
    } catch {
      /* ignore */
    }
    setConsent(value)
    setVisible(false)
  }, [])

  const accept = useCallback(() => persist('granted'), [persist])
  const decline = useCallback(() => {
    persist('denied')
    void import('../../lib/analytics').then((m) => m.disableAnalytics())
  }, [persist])
  const reopen = useCallback(() => setVisible(true), [])

  return (
    <ConsentContext.Provider value={{ consent, reopen }}>
      {children}
      {visible && <CookieBanner onAccept={accept} onDecline={decline} />}
    </ConsentContext.Provider>
  )
}

function CookieBanner({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) {
  return (
    <div
      className="figma-chrome fixed bottom-4 left-4 z-[60] w-[min(320px,calc(100vw-32px))] rounded-xl border p-4 shadow-xl"
      style={{ backgroundColor: 'var(--figma-panel)', borderColor: 'var(--figma-border)', color: 'var(--figma-text)' }}
      role="dialog"
      aria-label="Cookie preferences"
    >
      <p className="text-[13px] font-semibold" style={inter}>
        🍪 Analytics, only if you say yes
      </p>
      <p className="mt-1.5 text-[11px] leading-relaxed" style={{ ...inter, color: 'var(--figma-text-dim)' }}>
        Google Analytics is off by default. If you accept, it helps me see which pages get read — no
        ads, no ad personalization, nothing sold. You can change this anytime from the footer.
      </p>
      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          onClick={onDecline}
          className="rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors hover:text-[var(--figma-text)]"
          style={{ ...inter, color: 'var(--figma-text-dim)' }}
        >
          Decline
        </button>
        <button
          onClick={onAccept}
          className="rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
          style={{ ...inter, backgroundColor: 'var(--figma-blue)' }}
        >
          Accept
        </button>
      </div>
    </div>
  )
}
