import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { useRouter } from '../Router'

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

/** Opt-out gate for behavioral analytics (Google Analytics + Contentsquare) —
 *  collection is on by default and starts on page load unless the visitor has
 *  actively declined. The banner itself shows on every page load (not just the
 *  first), so consent stays visible and revisitable every visit rather than
 *  needing a "reopen" link. */
export function ConsentProvider({ children }: { children: ReactNode }) {
  const { currentPage } = useRouter()
  const [consent, setConsent] = useState<Consent | null>(() => readConsent())
  const [visible, setVisible] = useState(true)
  const isFirstPage = useRef(true)

  useEffect(() => {
    if (consent !== 'denied') {
      void import('../../lib/analytics').then((m) => m.initAnalytics())
      void import('../../lib/contentsquare').then((m) => m.initContentsquare())
    }
  }, [consent])

  useEffect(() => {
    if (isFirstPage.current) {
      isFirstPage.current = false
      return
    }
    if (consent === 'denied') return
    void import('../../lib/contentsquare').then((m) =>
      m.trackContentsquarePageview(window.location.pathname + window.location.hash.replace('#', '?__'))
    )
  }, [currentPage, consent])

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

  return (
    <>
      {children}
      {visible && <CookieBanner onAccept={accept} onDecline={decline} />}
    </>
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
        🍪 Analytics, on by default
      </p>
      <p className="mt-1.5 text-[11px] leading-relaxed" style={{ ...inter, color: 'var(--figma-text-dim)' }}>
        Google Analytics and Contentsquare are on by default — they help me see which pages get read,
        with no ads, no ad personalization, and nothing sold. You can decline to opt out anytime.
        You'll see this again next visit, so you can change your mind whenever you like.
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
