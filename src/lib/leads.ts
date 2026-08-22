import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

export function isValidEmail(email: string): boolean {
  return email.length > 0 && email.length <= 200 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/** Write-only: nobody, including other visitors, can read these back through
 *  the client SDK (see firestore.rules) — a one-way "email me" drop box
 *  offered alongside the name prompt, separate from the public visitor
 *  stack (which never stores email). */
export async function submitLead(input: { clientId: string; name: string; email: string }): Promise<void> {
  await addDoc(collection(db, 'leads'), {
    clientId: input.clientId,
    name: input.name.trim().slice(0, 40),
    email: input.email.trim().slice(0, 200),
    createdAt: serverTimestamp(),
  })
}
