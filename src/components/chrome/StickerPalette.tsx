import { useLayers } from './LayersContext'
import { STICKER_EMOJI } from '../../lib/stickers'

const inter = { fontFamily: "'Inter', sans-serif" }

/**
 * The sticker emoji picker — deliberately rendered outside ZoomCanvas
 * (unlike StickerTool's pin overlay) so it stays fixed to the viewport
 * instead of panning/scaling with the canvas's CSS `zoom`.
 */
export function StickerPalette() {
  const { activeTool, stickerEmoji, setStickerEmoji } = useLayers()

  if (activeTool !== 'sticker') return null

  return (
    <div
      data-sticker-ui
      className="figma-chrome pointer-events-auto fixed bottom-20 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-[14px] border p-1.5 shadow-xl"
      style={{ backgroundColor: 'var(--figma-panel)', borderColor: 'var(--figma-border)' }}
      role="toolbar"
      aria-label="Sticker palette"
    >
      {STICKER_EMOJI.map((emoji) => {
        const active = emoji === stickerEmoji
        return (
          <button
            key={emoji}
            onClick={() => setStickerEmoji(emoji)}
            aria-pressed={active}
            aria-label={`Select ${emoji} sticker`}
            className="flex h-9 w-9 min-h-0 min-w-0 items-center justify-center rounded-[10px] text-lg transition-colors"
            style={{ ...inter, backgroundColor: active ? 'var(--figma-blue)' : 'transparent' }}
          >
            {emoji}
          </button>
        )
      })}
    </div>
  )
}
