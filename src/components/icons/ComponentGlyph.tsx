/** Figma's component icon — four diamonds */
export function ComponentGlyph({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 0l2.6 2.6L8 5.2 5.4 2.6 8 0zM13.4 5.4L16 8l-2.6 2.6L10.8 8l2.6-2.6zM8 10.8l2.6 2.6L8 16l-2.6-2.6L8 10.8zM2.6 5.4L5.2 8l-2.6 2.6L0 8l2.6-2.6z" />
    </svg>
  )
}
