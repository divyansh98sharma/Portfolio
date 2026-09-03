import { readFileSync, writeFileSync } from 'node:fs'
import { createServer } from 'vite'

// Runs post-build. GitHub Pages is a static host with no SPA rewrite, so a
// deep link like /case-study-1 otherwise falls through to 404.html (HTTP 404),
// which means Google can't index those pages even though they're in the
// sitemap. This emits a real HTML file per route so each URL returns 200 —
// GitHub Pages serves `/case-study-1` from `case-study-1.html` — with the
// correct per-page <title>/description/canonical/OG tags baked into the static
// source (so crawlers and social scrapers get the right preview without JS).
// The same JS bundle then hydrates the SPA and renders the matching page.
const SITE_URL = 'https://divyanshsharma.work'

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

interface Route {
  path: string
  title: string
  description: string
}

async function main() {
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  const { caseStudies } = await vite.ssrLoadModule('/src/data/caseStudies.ts')
  await vite.close()

  // Mirrors the per-page titles/descriptions set client-side by
  // useDocumentMeta in App.tsx, so static and rendered metadata match.
  const routes: Route[] = [
    {
      path: '/all-case-studies',
      title: 'All Case Studies · Divyansh Sharma - UX Designer Portfolio',
      description:
        'Browse every UX case study by Divyansh Sharma — healthcare, enterprise, and dashboard design work.',
    },
    ...caseStudies
      .filter((s: { id?: string }) => !!s.id)
      .map((s: { id: string; title: string; description: string }) => ({
        path: `/${s.id}`,
        title: `${s.title} · Divyansh Sharma`,
        description: s.description,
      })),
  ]

  const template = readFileSync('build/index.html', 'utf8')

  for (const r of routes) {
    const url = `${SITE_URL}${r.path}`
    const html = template
      .replace(
        '<title>Divyansh Sharma - UX Designer Portfolio</title>',
        `<title>${esc(r.title)}</title>`
      )
      .replace(
        '<meta name="description" content="UX Designer portfolio of Divyansh Sharma. Crafting meaningful digital experiences through research-driven design, turning complex problems into intuitive solutions." />',
        `<meta name="description" content="${esc(r.description)}" />`
      )
      .replace(
        '<link rel="canonical" href="https://divyanshsharma.work/" />',
        `<link rel="canonical" href="${url}" />`
      )
      .replace(
        '<meta property="og:title" content="Divyansh Sharma - UX Designer Portfolio" />',
        `<meta property="og:title" content="${esc(r.title)}" />`
      )
      .replace(
        '<meta property="og:description" content="Crafting meaningful digital experiences through research-driven design, turning complex problems into intuitive solutions." />',
        `<meta property="og:description" content="${esc(r.description)}" />`
      )
      .replace(
        '<meta property="og:url" content="https://divyanshsharma.work/" />',
        `<meta property="og:url" content="${url}" />`
      )
      .replace(
        '<meta name="twitter:title" content="Divyansh Sharma - UX Designer Portfolio" />',
        `<meta name="twitter:title" content="${esc(r.title)}" />`
      )
      .replace(
        '<meta name="twitter:description" content="Crafting meaningful digital experiences through research-driven design." />',
        `<meta name="twitter:description" content="${esc(r.description)}" />`
      )

    writeFileSync(`build${r.path}.html`, html)
  }

  console.log(`Generated ${routes.length} static route pages`)
}

main()
