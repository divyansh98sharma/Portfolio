import { injectContentsquareScript } from '@contentsquare/tag-sdk'

const CLIENT_ID = 'ed2abf2b5708c'

let injected = false

/** Loads the Contentsquare tag on page load unless the visitor has opted out.
 *  Imported dynamically so the SDK stays out of the main bundle until
 *  collection actually starts. */
export function initContentsquare(): void {
  if (injected) return
  injected = true
  injectContentsquareScript({ clientId: CLIENT_ID, async: true })
}

/** Contentsquare reads route changes from the `_uxa` command queue rather than
 *  from real navigations, so a single-page app must report each virtual page
 *  view itself. Safe to call before the tag finishes loading — the queue
 *  replays once it is ready. */
export function trackContentsquarePageview(path: string): void {
  const uxa = (window._uxa = window._uxa || [])
  uxa.push(['setPath', path])
  uxa.push(['trackPageview', path])
}

declare global {
  interface Window {
    _uxa?: unknown[][]
  }
}
