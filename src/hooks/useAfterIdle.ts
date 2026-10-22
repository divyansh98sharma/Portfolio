import { useEffect, useState } from 'react'

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (id: number) => void
}

/**
 * Becomes true once the page has finished loading and the main thread is
 * idle (or `timeout` ms after load, whichever comes first).
 *
 * Use it to keep non-essential, network-heavy features — the Firebase-backed
 * visitor presence in particular (~140 kB gzip) — off the critical path so
 * they don't compete with the entry bundle, CSS and webfonts on first load.
 */
export function useAfterIdle(timeout = 2000): boolean {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const w = window as IdleWindow
    let idleId: number | undefined
    let timer: number | undefined

    const schedule = () => {
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(() => setReady(true), { timeout })
      else timer = window.setTimeout(() => setReady(true), Math.min(timeout, 500))
    }

    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })

    return () => {
      window.removeEventListener('load', schedule)
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId)
      if (timer !== undefined) window.clearTimeout(timer)
    }
  }, [timeout])

  return ready
}
