import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

export type ToolName = 'select' | 'move' | 'hand' | 'draw' | 'comment'

interface FrameEntry {
  id: string
  name: string
  el: HTMLElement
}

export const MIN_ZOOM = 0.25
export const MAX_ZOOM = 1.5

interface LayersContextValue {
  frames: FrameEntry[]
  activeFrameId: string | null
  registerFrame: (entry: FrameEntry) => void
  unregisterFrame: (id: string) => void
  activeTool: ToolName
  setActiveTool: (tool: ToolName) => void
  /** canvas zoom, 1 = 100% */
  zoom: number
  setZoom: (zoom: number) => void
}

const LayersContext = createContext<LayersContextValue | undefined>(undefined)

export function LayersProvider({ children }: { children: ReactNode }) {
  const [frames, setFrames] = useState<FrameEntry[]>([])
  const [activeFrameId, setActiveFrameId] = useState<string | null>(null)
  const [activeTool, setActiveTool] = useState<ToolName>('select')
  const [zoom, setZoomState] = useState(1)
  const ratios = useRef<Map<string, number>>(new Map())

  const setZoom = useCallback((z: number) => {
    setZoomState(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(z * 100) / 100)))
  }, [])

  const registerFrame = useCallback((entry: FrameEntry) => {
    setFrames((prev) => {
      const existing = prev.findIndex((f) => f.id === entry.id)
      if (existing === -1) return [...prev, entry]
      const next = prev.slice()
      next[existing] = entry
      return next
    })
  }, [])

  const unregisterFrame = useCallback((id: string) => {
    ratios.current.delete(id)
    setFrames((prev) => prev.filter((f) => f.id !== id))
  }, [])

  // A single shared IntersectionObserver drives "which frame is active"
  // for the layers panel + status bar, instead of a scroll listener
  // recomputing getBoundingClientRect for every section on every tick.
  useEffect(() => {
    if (frames.length === 0) {
      setActiveFrameId(null)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.frameId
          if (!id) return
          ratios.current.set(id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        let bestId: string | null = null
        let bestRatio = 0
        for (const frame of frames) {
          const ratio = ratios.current.get(frame.id) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = frame.id
          }
        }
        if (bestId) setActiveFrameId(bestId)
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: '-15% 0px -55% 0px' }
    )

    frames.forEach((f) => observer.observe(f.el))
    return () => observer.disconnect()
  }, [frames])

  return (
    <LayersContext.Provider
      value={{ frames, activeFrameId, registerFrame, unregisterFrame, activeTool, setActiveTool, zoom, setZoom }}
    >
      {children}
    </LayersContext.Provider>
  )
}

export function useLayers() {
  const ctx = useContext(LayersContext)
  if (!ctx) throw new Error('useLayers must be used within a LayersProvider')
  return ctx
}
