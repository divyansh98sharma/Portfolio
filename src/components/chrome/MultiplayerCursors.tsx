import { useEffect, useRef, useState } from 'react'
import { useLayers } from './LayersContext'
import { cursorCast } from '../../data/collaborators'

const inter = { fontFamily: "'Inter', sans-serif" }

interface CursorState {
  x: number
  y: number
  tx: number
  ty: number
  retargetAt: number
  visible: boolean
}

/** Figma's multiplayer cursor arrow */
function CursorGlyph({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5.5 3.2l12.8 7.9c.5.3.4 1-.2 1.2l-5.6 1.6-3.3 4.9c-.3.5-1.1.3-1.2-.3L4.6 4.1c-.1-.6.4-1.1.9-.9z"
        fill={color}
        stroke="#fff"
        strokeWidth="1.2"
      />
    </svg>
  )
}

/**
 * Fake collaborators drifting on the canvas. One shared rAF loop eases
 * each cursor toward wander targets inside its home frame's on-screen
 * area; cursors hide when their frame is offscreen and the loop pauses
 * when the tab is hidden. Transform-only mutation, no per-frame React
 * state. Desktop only, disabled for reduced motion (gated by App).
 */
export function MultiplayerCursors() {
  const { frames } = useLayers()
  const framesRef = useRef(frames)
  framesRef.current = frames

  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const states = useRef<CursorState[]>(
    cursorCast.map((_, i) => ({
      x: -100,
      y: 120 + i * 60,
      tx: -100,
      ty: 120 + i * 60,
      retargetAt: 0,
      visible: false,
    }))
  )
  const [chat, setChat] = useState<(string | null)[]>(cursorCast.map(() => null))

  /* occasional cursor-chat bubbles */
  useEffect(() => {
    const timers: number[] = []
    cursorCast.forEach((c, i) => {
      if (!c.chat) return
      const loop = () => {
        const delay = 9000 + Math.random() * 14000
        timers[i] = window.setTimeout(() => {
          if (states.current[i].visible) {
            setChat((prev) => prev.map((v, j) => (j === i ? c.chat! : v)))
            window.setTimeout(
              () => setChat((prev) => prev.map((v, j) => (j === i ? null : v))),
              2600
            )
          }
          loop()
        }, delay)
      }
      loop()
    })
    return () => timers.forEach((t) => clearTimeout(t))
  }, [])

  useEffect(() => {
    let raf = 0
    let running = true

    const tick = (now: number) => {
      if (!running) return
      states.current.forEach((s, i) => {
        const cast = cursorCast[i]
        const frame = framesRef.current.find((f) => f.id === cast.homeSection)
        const node = nodeRefs.current[i]
        if (!node) return

        if (!frame) {
          s.visible = false
          node.style.opacity = '0'
          return
        }

        const rect = frame.el.getBoundingClientRect()
        const onScreen = rect.bottom > 80 && rect.top < window.innerHeight - 60

        if (!onScreen) {
          s.visible = false
          node.style.opacity = '0'
          return
        }

        if (!s.visible) {
          // frame just came on screen: enter from a sensible spot
          s.x = rect.left + rect.width * (0.3 + Math.random() * 0.4)
          s.y = Math.max(80, rect.top + 40)
          s.visible = true
          s.retargetAt = 0
        }

        if (now >= s.retargetAt) {
          const padX = 40
          const top = Math.max(rect.top + 30, 70)
          const bottom = Math.min(rect.bottom - 30, window.innerHeight - 60)
          s.tx = rect.left + padX + Math.random() * Math.max(rect.width - padX * 2, 60)
          s.ty = top + Math.random() * Math.max(bottom - top, 40)
          s.retargetAt = now + 2800 + Math.random() * 3200
        }

        s.x += (s.tx - s.x) * 0.025
        s.y += (s.ty - s.y) * 0.025
        node.style.opacity = '1'
        node.style.transform = `translate(${s.x}px, ${s.y}px)`
      })
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      running = true
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    start()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-30 hidden md:block" aria-hidden="true">
      {cursorCast.map((c, i) => (
        <div
          key={c.initials}
          ref={(el) => {
            nodeRefs.current[i] = el
          }}
          className="absolute top-0 left-0 transition-opacity duration-500"
          style={{ opacity: 0, willChange: 'transform' }}
        >
          <CursorGlyph color={c.color} />
          <span
            className="ml-3 -mt-0.5 inline-block whitespace-nowrap rounded-full rounded-tl-sm px-2.5 py-1 text-[10px] font-semibold text-white shadow-md"
            style={{ ...inter, backgroundColor: c.color }}
          >
            {chat[i] ?? `${c.name} · ${c.role}`}
          </span>
        </div>
      ))}
    </div>
  )
}
