import { useEffect, useState } from 'react'
import { subscribeToVisitors, type VisitorDoc } from '../../lib/visitors'
import { colorForName, initialsForName } from '../../lib/identity'

const MAX_SHOWN = 3

/** Real visitors who left a name, appended to the decorative collaborator
 *  cast — the avatar stack grows live as people join. */
export function LiveVisitorBubbles() {
  const [visitors, setVisitors] = useState<VisitorDoc[]>([])

  useEffect(() => subscribeToVisitors(setVisitors), [])

  if (visitors.length === 0) return null

  const shown = visitors.slice(0, MAX_SHOWN)
  const extra = visitors.length - shown.length

  return (
    <>
      {shown.map((v, i) => (
        <div
          key={v.id}
          className="flex h-7 w-7 items-center justify-center rounded-full border-2 text-[9px] font-bold text-white select-none"
          style={{
            backgroundColor: colorForName(v.name),
            borderColor: 'var(--figma-panel)',
            marginLeft: '-8px',
            zIndex: -1 - i,
            position: 'relative',
          }}
          title={v.name}
        >
          {initialsForName(v.name)}
        </div>
      ))}
      {extra > 0 && (
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full border-2 text-[9px] font-bold select-none"
          style={{
            backgroundColor: 'var(--figma-panel)',
            borderColor: 'var(--figma-panel)',
            color: 'var(--figma-text-dim)',
            marginLeft: '-8px',
            zIndex: -1 - shown.length,
            position: 'relative',
          }}
          title={`${extra} more visitor${extra === 1 ? '' : 's'}`}
        >
          +{extra}
        </div>
      )}
    </>
  )
}
