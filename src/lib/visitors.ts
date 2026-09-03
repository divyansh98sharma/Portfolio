import { collection, doc, setDoc, onSnapshot, orderBy, query, serverTimestamp, limit, Timestamp, type Unsubscribe } from 'firebase/firestore'
import { db } from './firebase'
import { getClientId, getStoredName, GHOST_NAME } from './identity'

export interface VisitorDoc {
  id: string
  name: string
  /** server `lastSeen` in epoch ms (0 until the server timestamp resolves) */
  lastSeenMs: number
}

const MAX_VISITORS = 50

/** A visitor counts as "online" if their `lastSeen` is within this window.
 *  The heartbeat below refreshes well inside it, so an open tab stays in the
 *  stack and drops out ~a minute after it's closed or backgrounded. */
export const ONLINE_WINDOW_MS = 60_000
const HEARTBEAT_MS = 20_000

export function subscribeToVisitors(onChange: (visitors: VisitorDoc[]) => void): Unsubscribe {
  const q = query(collection(db, 'visitors'), orderBy('lastSeen', 'desc'), limit(MAX_VISITORS))
  return onSnapshot(q, (snap) => {
    onChange(
      snap.docs.map((d) => {
        const data = d.data()
        const ts = data.lastSeen as Timestamp | null
        return { id: d.id, name: data.name as string, lastSeenMs: ts ? ts.toMillis() : 0 }
      })
    )
  })
}

/** Keyed by clientId so a returning visitor updates their own record
 *  instead of creating a new one every visit. */
export async function upsertVisitor(input: { clientId: string; name: string }): Promise<void> {
  await setDoc(
    doc(db, 'visitors', input.clientId),
    { name: input.name.trim().slice(0, 40), lastSeen: serverTimestamp() },
    { merge: true }
  )
}

/** Keeps this browser's visitor doc "fresh" while the tab is open and
 *  visible, so it shows in the live stack and drops out shortly after the
 *  tab is closed or backgrounded. Reads the current stored name on every
 *  beat, so an anonymous ghost turns into a named avatar the moment they
 *  join. Returns a cleanup that stops the heartbeat. */
export function startPresenceHeartbeat(): () => void {
  const clientId = getClientId()
  let timer: number | undefined

  const beat = () => {
    if (typeof document !== 'undefined' && document.hidden) return
    upsertVisitor({ clientId, name: getStoredName() || GHOST_NAME }).catch(() => {})
  }

  const onVisibility = () => {
    if (!document.hidden) beat()
  }

  beat()
  timer = window.setInterval(beat, HEARTBEAT_MS)
  document.addEventListener('visibilitychange', onVisibility)

  return () => {
    if (timer !== undefined) window.clearInterval(timer)
    document.removeEventListener('visibilitychange', onVisibility)
  }
}
