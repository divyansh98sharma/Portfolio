import { writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { createServer } from 'vite'

// Runs post-build (see package.json's "build" script) so a new case study
// added to src/data/caseStudies.ts is picked up automatically — nobody
// hand-edits this file. caseStudies.ts imports .jpg cover images, which
// only Vite's own module graph knows how to resolve, so this loads it
// through Vite's SSR module loader instead of a bare `import`.
const SITE_URL = 'https://divyanshsharma.work'
const today = new Date().toISOString().slice(0, 10)

// Real per-URL <lastmod> from the git commit date of the page's source file
// (needs full history — CI checkout uses fetch-depth: 0). Falls back to today
// if git isn't available or the file has no tracked history.
function gitLastmod(file: string): string {
  try {
    const d = execSync(`git log -1 --format=%cs -- "${file}"`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : today
  } catch {
    return today
  }
}

// Maps a case-study route to the content file that actually drives its page,
// so editing that study bumps only its own lastmod.
const CONTENT_FILE: Record<string, string> = {
  'case-study-1': 'src/data/case-studies/analyticsCentral.ts',
  'case-study-2': 'src/data/case-studies/rbac.ts',
  'case-study-3': 'src/data/case-studies/flowsheets.ts',
}

async function main() {
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  const { caseStudies } = await vite.ssrLoadModule('/src/data/caseStudies.ts')
  await vite.close()

  const urls: { loc: string; lastmod: string; priority: string }[] = [
    { loc: '/', lastmod: gitLastmod('src/components/HomePage.tsx'), priority: '1.0' },
    { loc: '/all-case-studies', lastmod: gitLastmod('src/components/AllCaseStudies.tsx'), priority: '0.7' },
    ...caseStudies
      .filter((s: { id?: string }) => !!s.id)
      .map((s: { id: string }) => ({
        loc: `/${s.id}`,
        lastmod: gitLastmod(CONTENT_FILE[s.id] ?? 'src/data/caseStudies.ts'),
        priority: '0.8',
      })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

  writeFileSync('build/sitemap.xml', xml)
  console.log(`Generated build/sitemap.xml with ${urls.length} URLs`)
}

main()
