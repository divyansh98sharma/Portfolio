/**
 * Loading placeholder shown while a code-split route chunk loads —
 * a ghost frame on the canvas, in Figma-chrome tones.
 */
export function SkeletonLoader() {
  return (
    <div
      className="mx-auto my-14 max-w-[1200px] animate-pulse rounded-2xl border px-8 py-16 sm:my-20"
      style={{ borderColor: 'var(--figma-border)', backgroundColor: 'var(--figma-panel)' }}
      role="status"
      aria-label="Loading page"
    >
      <div className="h-3 w-32 rounded" style={{ backgroundColor: 'var(--figma-border)' }} />
      <div className="mt-6 h-8 w-2/3 rounded" style={{ backgroundColor: 'var(--figma-border)' }} />
      <div className="mt-6 space-y-3">
        <div className="h-4 w-3/4 rounded" style={{ backgroundColor: 'var(--figma-border)' }} />
        <div className="h-4 w-2/3 rounded" style={{ backgroundColor: 'var(--figma-border)' }} />
        <div className="h-4 w-1/2 rounded" style={{ backgroundColor: 'var(--figma-border)' }} />
      </div>
      <div className="mt-8 h-10 w-40 rounded-lg" style={{ backgroundColor: 'var(--figma-border)' }} />
    </div>
  )
}
