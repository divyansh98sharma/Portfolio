import { getAnalytics, isSupported, setAnalyticsCollectionEnabled, type Analytics } from 'firebase/analytics'
import { app } from './firebase'

let instance: Analytics | null = null

/** Called on page load unless the visitor has actively opted out. Consumers
 *  must import this module dynamically so the Analytics SDK stays out of the
 *  main bundle until collection actually starts. */
export async function initAnalytics(): Promise<void> {
  if (instance) return
  try {
    if (!(await isSupported())) return
    instance = getAnalytics(app)
  } catch {
    /* ignore */
  }
}

/** Stops future collection if a visitor who previously granted consent
 *  later withdraws it via the footer's "Cookie preferences" link. */
export function disableAnalytics(): void {
  if (instance) setAnalyticsCollectionEnabled(instance, false)
}
