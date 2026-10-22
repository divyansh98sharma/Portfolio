import { renderToStaticMarkup } from 'react-dom/server'
import { LayersProvider } from '../components/chrome/LayersContext'
import { ZoomCanvas } from '../components/chrome/ZoomCanvas'
import { HeroFrame } from '../components/HomePage'

/**
 * Build-time only (imported by scripts/generate-static-routes.ts, never by
 * the app). Renders the home hero with the real components so index.html
 * can paint the LCP headline from HTML + CSS, before the JS bundle has
 * downloaded and executed. It sits before #root, not inside it: React
 * renders into the empty #root (createRoot, not hydration, so viewport- and
 * theme-dependent chrome can never mismatch) and HeroFrame removes the copy
 * in the same frame — see takeOverPrerenderedShell in HomePage.tsx.
 *
 * The wrappers mirror App's tree down to the hero: app root → <main> →
 * ZoomCanvas → route wrapper. `mainClassName` is read from App.tsx by the
 * generator so the canvas spacing can't drift from the real <main>.
 */
export function renderHeroShell(mainClassName: string): string {
  // ZoomCanvas and HeroFrame use layout effects, which React warns about in a
  // server render. They are meant to do nothing here (this markup is never
  // hydrated), so that one warning is silenced for the duration of the render.
  const error = console.error
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('useLayoutEffect does nothing on the server')) return
    error(...args)
  }
  let inner: string
  try {
    inner = renderToStaticMarkup(
      <LayersProvider>
        <ZoomCanvas>
          <div>
            <HeroFrame />
          </div>
        </ZoomCanvas>
      </LayersProvider>
    )
  } finally {
    console.error = error
  }
  return (
    `<div class="min-h-screen bg-background" data-prerendered-shell="">` +
    `<main id="main-content" tabindex="-1" class="${mainClassName}">${inner}</main>` +
    `</div>`
  )
}
