import { useEffect, useState } from 'react'
import { addReaction, removeReaction, subscribeToReactions, type ReactionDoc } from '../lib/reactions'
import { getClientId } from '../lib/identity'

const inter = { fontFamily: "'Inter', sans-serif" }
const EMOJI = ['👍', '❤️', '🎉']

/** Live, shared emoji reactions for a piece of content — tap to toggle,
 *  counts are real and visible to every visitor via Firestore. */
export function ReactionBar({ targetId }: { targetId: string }) {
  const [reactions, setReactions] = useState<ReactionDoc[]>([])
  const clientId = getClientId()

  useEffect(() => subscribeToReactions(targetId, setReactions), [targetId])

  const toggle = (emoji: string) => {
    const mine = reactions.find((r) => r.emoji === emoji && r.clientId === clientId)
    if (mine) removeReaction(mine.id).catch(() => {})
    else addReaction({ targetId, emoji, clientId }).catch(() => {})
  }

  return (
    <>
      {EMOJI.map((emoji) => {
        const count = reactions.filter((r) => r.emoji === emoji).length
        const reacted = reactions.some((r) => r.emoji === emoji && r.clientId === clientId)
        return (
          <button
            key={emoji}
            onClick={() => toggle(emoji)}
            aria-pressed={reacted}
            aria-label={`React with ${emoji}${count > 0 ? `, ${count} so far` : ''}`}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
              reacted
                ? 'border-[var(--figma-blue)] bg-[color-mix(in_srgb,var(--figma-blue)_15%,transparent)] text-[var(--figma-blue)]'
                : 'border-border bg-secondary/60 text-muted-foreground'
            }`}
            style={inter}
          >
            {emoji} {count}
          </button>
        )
      })}
    </>
  )
}
