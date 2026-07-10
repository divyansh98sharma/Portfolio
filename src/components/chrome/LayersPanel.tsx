import { ChevronDown, Frame as FrameIcon } from 'lucide-react'
import { useLayers } from './LayersContext'
import { scrollToSection } from '../utils/scrollToSection'
import { LAYERS_PANEL_WIDTH, STATUSBAR_HEIGHT, TOPBAR_HEIGHT } from '../../lib/chrome'

const inter = { fontFamily: "'Inter', sans-serif" }

/**
 * Figma's left Layers panel, repurposed as the site's real navigation.
 * Rows are the registered Frames (via LayersContext); the active row is
 * driven by the shared scroll-spy observer. Hidden below lg.
 */
export function LayersPanel() {
  const { frames, activeFrameId } = useLayers()

  return (
    <aside
      className="figma-chrome fixed left-0 z-40 hidden lg:flex flex-col border-r"
      style={{
        top: TOPBAR_HEIGHT,
        bottom: STATUSBAR_HEIGHT,
        width: LAYERS_PANEL_WIDTH,
        backgroundColor: 'var(--figma-panel)',
        borderColor: 'var(--figma-border)',
        color: 'var(--figma-text)',
      }}
    >
      {/* Panel tabs — decorative, like Figma's File / Assets */}
      <div
        className="flex items-center gap-4 border-b px-4 text-[12px]"
        style={{ height: 40, borderColor: 'var(--figma-border)' }}
        aria-hidden="true"
      >
        <span className="font-medium">File</span>
        <span style={{ color: 'var(--figma-text-dim)' }}>Assets</span>
      </div>

      {/* Pages */}
      <div className="px-2 pt-3" aria-hidden="true">
        <div
          className="flex items-center justify-between px-2 pb-2 text-[11px] font-medium"
          style={{ color: 'var(--figma-text-dim)' }}
        >
          <span>Pages</span>
        </div>
        <div
          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] font-medium"
          style={{ backgroundColor: 'color-mix(in srgb, var(--figma-text) 6%, transparent)' }}
        >
          <ChevronDown className="h-3 w-3" style={{ color: 'var(--figma-text-dim)' }} />
          Page 1
        </div>
      </div>

      {/* Layers = frames = sections */}
      <nav className="flex-1 overflow-y-auto px-2 pt-3 pb-4" aria-label="Sections">
        <div
          className="px-2 pb-2 text-[11px] font-medium"
          style={{ color: 'var(--figma-text-dim)' }}
          aria-hidden="true"
        >
          Layers
        </div>
        <ul className="space-y-0.5" style={inter}>
          {frames.map((frame) => (
            <li key={frame.id}>
              <button
                onClick={() => scrollToSection(frame.id)}
                className={`layers-row w-full min-h-0 min-w-0 text-left ${
                  activeFrameId === frame.id ? 'is-active' : ''
                }`}
                style={inter}
                aria-current={activeFrameId === frame.id ? 'true' : undefined}
                aria-label={`Go to ${frame.name}`}
              >
                <FrameIcon className="h-3 w-3 flex-shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <span className="truncate">{frame.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
