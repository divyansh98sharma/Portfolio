import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from './firebase'

export interface StickerDoc {
  id: string
  frameId: string
  dx: number
  dy: number
  emoji: string
  clientId: string
}

export const STICKER_EMOJI = ['🔥', '✨', '💯', '👀', '🚀', '🎉', '😂', '💡']

export function subscribeToStickers(onChange: (stickers: StickerDoc[]) => void): Unsubscribe {
  const q = query(collection(db, 'stickers'), orderBy('createdAt', 'asc'))
  return onSnapshot(q, (snap) => {
    onChange(
      snap.docs.map((d) => {
        const data = d.data()
        return { id: d.id, frameId: data.frameId, dx: data.dx, dy: data.dy, emoji: data.emoji, clientId: data.clientId }
      })
    )
  })
}

export async function addSticker(input: {
  frameId: string
  dx: number
  dy: number
  emoji: string
  clientId: string
}): Promise<void> {
  await addDoc(collection(db, 'stickers'), {
    frameId: input.frameId,
    dx: input.dx,
    dy: input.dy,
    emoji: input.emoji,
    clientId: input.clientId,
    createdAt: serverTimestamp(),
  })
}

export async function updateStickerPosition(id: string, dx: number, dy: number): Promise<void> {
  await updateDoc(doc(db, 'stickers', id), { dx, dy })
}
