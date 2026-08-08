import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from './firebase'

export interface CommentDoc {
  id: string
  frameId: string
  dx: number
  dy: number
  text: string
  authorName: string
  createdAt: number | null
}

export interface ReplyDoc {
  id: string
  text: string
  authorName: string
  createdAt: number | null
}

const MAX_TEXT = 280
const MAX_NAME = 40

export function subscribeToComments(onChange: (comments: CommentDoc[]) => void): Unsubscribe {
  const q = query(collection(db, 'comments'), orderBy('createdAt', 'asc'))
  return onSnapshot(q, (snap) => {
    onChange(
      snap.docs.map((d) => {
        const data = d.data()
        return {
          id: d.id,
          frameId: data.frameId,
          dx: data.dx,
          dy: data.dy,
          text: data.text,
          authorName: data.authorName,
          createdAt: data.createdAt?.toMillis?.() ?? null,
        }
      })
    )
  })
}

export async function addComment(input: {
  frameId: string
  dx: number
  dy: number
  text: string
  authorName: string
}): Promise<void> {
  await addDoc(collection(db, 'comments'), {
    frameId: input.frameId,
    dx: input.dx,
    dy: input.dy,
    text: input.text.trim().slice(0, MAX_TEXT),
    authorName: input.authorName.trim().slice(0, MAX_NAME),
    createdAt: serverTimestamp(),
  })
}

export async function updateCommentPosition(id: string, dx: number, dy: number): Promise<void> {
  await updateDoc(doc(db, 'comments', id), { dx, dy })
}

export async function deleteComment(id: string): Promise<void> {
  await deleteDoc(doc(db, 'comments', id))
}

export function subscribeToReplies(
  commentId: string,
  onChange: (replies: ReplyDoc[]) => void
): Unsubscribe {
  const q = query(collection(db, 'comments', commentId, 'replies'), orderBy('createdAt', 'asc'))
  return onSnapshot(q, (snap) => {
    onChange(
      snap.docs.map((d) => {
        const data = d.data()
        return {
          id: d.id,
          text: data.text,
          authorName: data.authorName,
          createdAt: data.createdAt?.toMillis?.() ?? null,
        }
      })
    )
  })
}

export async function addReply(
  commentId: string,
  input: { text: string; authorName: string }
): Promise<void> {
  await addDoc(collection(db, 'comments', commentId, 'replies'), {
    text: input.text.trim().slice(0, MAX_TEXT),
    authorName: input.authorName.trim().slice(0, MAX_NAME),
    createdAt: serverTimestamp(),
  })
}

export async function deleteReply(commentId: string, replyId: string): Promise<void> {
  await deleteDoc(doc(db, 'comments', commentId, 'replies', replyId))
}
