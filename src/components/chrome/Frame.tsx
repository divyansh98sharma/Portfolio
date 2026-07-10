import { Frame as FrameIcon } from 'lucide-react'
import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { useLayers } from './LayersContext'

const FrameRevealContext = createContext(false)

/** Read the enclosing Frame's reveal-on-scroll state — replaces the
 *  per-section IntersectionObserver+isVisible boilerplate that used to be
 *  duplicated in About/BuiltFor/Experience/Process/Testimonials/Contact. */
export function useFrameReveal() {
  return useContext(FrameRevealContext)
}

interface FrameProps {
  id: string
  name: string
  headingId: string
  children: ReactNode
  className?: string
  contentClassName?: string
  /** Frames narrower than the default 1200px max-width (e.g. the hero cover) */
  fullBleed?: boolean
  /** Skip the scroll reveal — an opened file's frames are simply there */
  instantReveal?: boolean
}

/**
 * Wraps a homepage/case-study section as a labeled Figma frame sitting on
 * the dotted canvas: frame label + selection outline + corner handles on
 * hover, a reveal-on-scroll fade (via useReveal), and registration with
 * LayersContext so it appears in the Layers panel and drives scroll-spy.
 */
export function Frame({
  id,
  name,
  headingId,
  children,
  className = '',
  contentClassName = '',
  fullBleed = false,
  instantReveal = false,
}: FrameProps) {
  const { ref, isVisible: revealed } = useReveal<HTMLElement>({ threshold: 0.12 })
  const isVisible = instantReveal || revealed
  const { registerFrame, unregisterFrame } = useLayers()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.dataset.frameId = id
    registerFrame({ id, name, el })
    return () => unregisterFrame(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, name, registerFrame, unregisterFrame])

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={headingId}
      className={`frame-wrap relative my-14 sm:my-20 mx-3 sm:mx-6 ${
        fullBleed ? 'lg:mx-8' : 'lg:mx-auto lg:max-w-[1200px]'
      } ${className}`}
    >
      <span
        className="frame-label absolute -top-6 left-0 inline-flex items-center gap-1.5"
        aria-hidden="true"
      >
        <FrameIcon className="h-3 w-3" strokeWidth={1.75} />
        {name}
      </span>

      <span className="frame-handle frame-handle--tl" aria-hidden="true" />
      <span className="frame-handle frame-handle--tr" aria-hidden="true" />
      <span className="frame-handle frame-handle--bl" aria-hidden="true" />
      <span className="frame-handle frame-handle--br" aria-hidden="true" />

      <div
        data-movable
        className={`frame-surface rounded-2xl overflow-hidden transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } ${contentClassName}`}
      >
        <FrameRevealContext.Provider value={isVisible}>{children}</FrameRevealContext.Provider>
      </div>
    </section>
  )
}
