/** The Contentsquare tag itself is loaded from the static <head> in index.html
 *  (so it appears in the page source and starts collecting immediately). This
 *  module only reports the single-page-app's virtual page views: Contentsquare
 *  reads route changes from the `_uxa` command queue rather than from real
 *  navigations. Safe to call before the tag finishes loading — the queue
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
