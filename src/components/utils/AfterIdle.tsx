import type { ReactNode } from 'react'
import { useAfterIdle } from '../../hooks/useAfterIdle'

/** Renders its children only once the page has loaded and the main thread
 *  is idle. Wrap lazy, network-heavy, non-essential features in it. */
export function AfterIdle({ children, timeout }: { children: ReactNode; timeout?: number }) {
  return useAfterIdle(timeout) ? <>{children}</> : null
}
