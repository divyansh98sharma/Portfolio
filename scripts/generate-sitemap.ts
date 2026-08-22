import { writeFileSync } from 'node:fs'
import { caseStudies } from '../src/data/caseStudies'

// Runs post-build (see package.json's "build" script) so a new case study
// added to src/data/caseStudies.ts is picked up automatically — nobody
// hand-edits this file.
const SITE_URL = 'https://divyanshsharma.work'
const today = new Date().toISOString().slice(0, 10)

const urls: { loc: string; changefreq: string; priority: string }[] = [
  { loc: '/', changefreq: 'monthly', priority: '1.0' },
  { loc: '/all-case-studies', changefreq: 'monthly', priority: '0.7' },
  ...caseStudies
    .filter((s) => !!s.id)
    .map((s) => ({ loc: `/${s.id}`, changefreq: 'yearly', priority: '0.8' })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

writeFileSync('build/sitemap.xml', xml)
console.log(`Generated build/sitemap.xml with ${urls.length} URLs`)
