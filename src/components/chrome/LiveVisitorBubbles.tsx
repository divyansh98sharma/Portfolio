import { useEffect, useState } from 'react'
import { Ghost } from 'lucide-react'
import { subscribeToVisitors, ONLINE_WINDOW_MS, type VisitorDoc } from '../../lib/visitors'
import { GHOST_NAME, colorForName, initialsForName } from '../../lib/identity'

const MAX_SHOWN = 6

/** The real, live visitor stack — only people currently on the site.
 *  Each visitor heartbeats while their tab is open; here we keep just the
 *  ones seen within ONLINE_WINDOW_MS and re-check on a timer so they drop
 *  off shortly after they leave (nothing renders when nobody's around).
 *  Unnamed visitors render as a generic gray Ghost, named ones as colored
 *  initials — matching Figma's placeholder-until-you-join-in behavior. */
export function LiveVisitorBubbles() {
  const [visitors, setVisitors] = useState<VisitorDoc[]>([])
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => subscribeToVisitors(setVisitors), [])

  // Re-evaluate the online window periodically so visitors who stop
  // heartbeating (closed/backgrounded tabs) fade out even without a new
  // Firestore snapshot.
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 15_000)
    return () => window.clearInterval(t)
  }, [])

  const online = visitors.filter((v) => now - v.lastSeenMs < ONLINE_WINDOW_MS)

  if (online.length === 0) return null

  const shown = online.slice(0, MAX_SHOWN)
  const extra = online.length - shown.length

  return (
    <>
      {shown.map((v, i) => {
        const isGhost = v.name === GHOST_NAME
        return (
          <div
            key={v.id}
            className="flex h-7 w-7 items-center justify-center rounded-full border-2 text-[9px] font-bold text-white select-none"
            style={{
              backgroundColor: isGhost ? 'var(--figma-text-dim)' : colorForName(v.name),
              borderColor: 'var(--figma-panel)',
              marginLeft: i > 0 ? '-8px' : 0,
              zIndex: shown.length - i,
              position: 'relative',
            }}
            title={isGhost ? 'Anonymous visitor' : v.name}
          >
            {isGhost ? <Ghost className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" /> : initialsForName(v.name)}
          </div>
        )
      })}
      {extra > 0 && (
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full border-2 text-[9px] font-bold select-none"
          style={{
            backgroundColor: 'var(--figma-panel)',
            borderColor: 'var(--figma-panel)',
            color: 'var(--figma-text-dim)',
            marginLeft: '-8px',
            zIndex: -1 - shown.length,
            position: 'relative',
          }}
          title={`${extra} more visitor${extra === 1 ? '' : 's'}`}
        >
          +{extra}
        </div>
      )}
    </>
  )
}
