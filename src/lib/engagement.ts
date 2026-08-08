import { doc, setDoc, serverTimestamp, increment } from 'firebase/firestore'
import { db } from './firebase'

/** Best-effort instrumentation — writes here must never surface an error
 *  to the visitor or block whatever they were actually doing. */
export async function trackScrollDepth(input: {
  caseStudyId: string
  clientId: string
  percent: number
}): Promise<void> {
  const clamped = Math.max(0, Math.min(100, Math.round(input.percent)))
  const docId = `${input.caseStudyId}__${input.clientId}`
  try {
    await setDoc(
      doc(db, 'scrollDepth', docId),
      {
        caseStudyId: input.caseStudyId,
        clientId: input.clientId,
        maxPercent: clamped,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )
  } catch {
    /* ignore */
  }
}

export async function trackResumeDownload(clientId: string): Promise<void> {
  try {
    await setDoc(
      doc(db, 'resumeDownloads', clientId),
      { count: increment(1), lastAt: serverTimestamp() },
      { merge: true }
    )
  } catch {
    /* ignore */
  }
}
