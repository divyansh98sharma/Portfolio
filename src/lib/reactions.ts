import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from './firebase'

export interface ReactionDoc {
  id: string
  targetId: string
  emoji: string
  clientId: string
}

export function subscribeToReactions(targetId: string, onChange: (reactions: ReactionDoc[]) => void): Unsubscribe {
  const q = query(collection(db, 'reactions'), where('targetId', '==', targetId))
  return onSnapshot(q, (snap) => {
    onChange(
      snap.docs.map((d) => {
        const data = d.data()
        return { id: d.id, targetId: data.targetId, emoji: data.emoji, clientId: data.clientId }
      })
    )
  })
}

export async function addReaction(input: { targetId: string; emoji: string; clientId: string }): Promise<void> {
  await addDoc(collection(db, 'reactions'), {
    targetId: input.targetId,
    emoji: input.emoji,
    clientId: input.clientId,
    createdAt: serverTimestamp(),
  })
}

export async function removeReaction(id: string): Promise<void> {
  await deleteDoc(doc(db, 'reactions', id))
}
