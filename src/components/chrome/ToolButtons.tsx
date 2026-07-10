import { Hand, MessageCircle, Move, MousePointer2, Pencil } from 'lucide-react'
import { useLayers, type ToolName } from './LayersContext'

const inter = { fontFamily: "'Inter', sans-serif" }

const TOOLS: { name: ToolName; label: string; shortcut: string; Icon: typeof Move }[] = [
  { name: 'select', label: 'Select', shortcut: 'Esc', Icon: MousePointer2 },
  { name: 'move', label: 'Move — drag anything, it springs back', shortcut: 'V', Icon: Move },
  { name: 'hand', label: 'Hand — grab to scroll', shortcut: 'H', Icon: Hand },
  { name: 'draw', label: 'Draw — scribble on the canvas, it fades away', shortcut: 'P', Icon: Pencil },
  { name: 'comment', label: 'Comment — click to leave a note', shortcut: 'C', Icon: MessageCircle },
]

/**
 * The toy toolbar in the top bar. Each tool actually does something:
 * Move drags elements (they spring home), Hand grab-scrolls,
 * Comment drops pins. Desktop only.
 */
export function ToolButtons() {
  const { activeTool, setActiveTool } = useLayers()

  return (
    <div
      role="toolbar"
      aria-label="Canvas tools"
      className="ml-1 flex items-center gap-0.5 border-l pl-2"
      style={{ borderColor: 'var(--figma-border)' }}
    >
      {TOOLS.map(({ name, label, shortcut, Icon }) => {
        const active = activeTool === name
        return (
          <button
            key={name}
            onClick={() => setActiveTool(name)}
            aria-pressed={active}
            aria-label={`${label} (${shortcut})`}
            title={`${label} · ${shortcut}`}
            className="flex h-9 w-9 min-h-0 min-w-0 items-center justify-center rounded-md transition-colors"
            style={{
              ...inter,
              backgroundColor: active ? 'var(--figma-blue)' : 'transparent',
              color: active ? '#fff' : 'var(--figma-text-dim)',
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.color = 'var(--figma-text)'
            }}
            onMouseLeave={(e) => {
              if (!active) e.currentTarget.style.color = 'var(--figma-text-dim)'
            }}
          >
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </button>
        )
      })}
    </div>
  )
}
