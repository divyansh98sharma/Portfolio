import type { ComponentType, ReactNode } from 'react'
import { useAfterIdle } from '../../hooks/useAfterIdle'

/** Renders its children only once the page has loaded and the main thread
 *  is idle. Wrap lazy, network-heavy, non-essential features in it. */
export function AfterIdle({ children, timeout }: { children: ReactNode; timeout?: number }) {
  return useAfterIdle(timeout) ? <>{children}</> : null
}

/**
 * For lazy() loaders of optional features: if the chunk can't be loaded
 * (offline, flaky network, or the page navigating away mid-request — WebKit
 * rejects in-flight dynamic imports on reload), render nothing instead of
 * letting the rejection propagate and unmount the whole app.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- matches React.lazy's own constraint
export function optionalChunk<C extends ComponentType<any>>(load: () => Promise<{ default: C }>) {
  return (): Promise<{ default: C }> => load().catch(() => ({ default: (() => null) as unknown as C }))
}
