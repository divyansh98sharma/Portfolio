import { collection, doc, setDoc, onSnapshot, orderBy, query, serverTimestamp, limit, type Unsubscribe } from 'firebase/firestore'
import { db } from './firebase'

export interface VisitorDoc {
  id: string
  name: string
}

const MAX_VISITORS = 200

export function subscribeToVisitors(onChange: (visitors: VisitorDoc[]) => void): Unsubscribe {
  const q = query(collection(db, 'visitors'), orderBy('lastSeen', 'desc'), limit(MAX_VISITORS))
  return onSnapshot(q, (snap) => {
    onChange(snap.docs.map((d) => ({ id: d.id, name: d.data().name })))
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
