import { readFileSync, writeFileSync } from 'node:fs'
import { createServer } from 'vite'

// Runs post-build. GitHub Pages is a static host with no SPA rewrite, so a
// deep link like /case-study-1 otherwise falls through to 404.html (HTTP 404),
// which means Google can't index those pages even though they're in the
// sitemap. This emits a real HTML file per route so each URL returns 200 —
// GitHub Pages serves `/case-study-1` from `case-study-1.html` — with:
//   1. the correct per-page <title>/description/canonical/OG tags,
//   2. the full case-study text baked into a <noscript> block so crawlers
//      that don't execute JS (Bing/DuckDuckGo, social + AI scrapers) still
//      index every word, and
//   3. rich Article JSON-LD (keywords incl. company synonyms, articleBody)
//      so search engines get the content and relevance signals structurally.
// The same JS bundle then hydrates the SPA and renders the interactive page.
const SITE_URL = 'https://divyanshsharma.work'

function escHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

interface CaseChallenge { title: string; subtitle: string; description: string; impact: string }
interface CaseSolution { title: string; description: string; impact: string; result: string }
interface Content {
  id: string
  title: string
  product: string
  company: string
  subtitle: string
  description: string
  tags: string[]
  contextParagraphs: string[]
  challengeIntro: string
  challenges: CaseChallenge[]
  researchIntro: string
  researchMethods: string[]
  keyInsight: { quote: string; cite: string }
  solutions: CaseSolution[]
  impactIntro: string
  impactMetrics: { value: string; label: string }[]
  keyLearnings: { title: string; description: string }[]
  futureOpportunities: { title: string; description: string }[]
}

interface Summary { id?: string; title: string; description: string }

function keywordsFor(c: Content): string[] {
  const kw = new Set<string>([
    ...(c.tags ?? []),
    c.product,
    c.company,
    'Divyansh Sharma',
    'Divyansh Sharma UX designer',
    'UX case study',
    'portfolio',
  ])
  const company = (c.company ?? '').toLowerCase()
  if (company.includes('eclinicalworks')) {
    kw.add('eClinicalWorks')
    kw.add('ECW')
    kw.add('eCW')
  }
  if (company.includes('peak')) {
    kw.add('Peak')
    kw.add('Peak.ai')
  }
  return [...kw].filter(Boolean)
}

/** Every readable string in a case study, as ordered lines (for both the
 *  <noscript> mirror and the JSON-LD articleBody). */
function contentLines(c: Content): string[] {
  const lines: string[] = [c.title, c.subtitle, c.description]
  lines.push(...(c.contextParagraphs ?? []))
  if (c.challengeIntro) lines.push(c.challengeIntro)
  for (const ch of c.challenges ?? []) lines.push(ch.title, ch.subtitle, ch.description, ch.impact)
  if (c.researchIntro) lines.push(c.researchIntro)
  lines.push(...(c.researchMethods ?? []))
  if (c.keyInsight?.quote) lines.push(c.keyInsight.quote, c.keyInsight.cite)
  for (const s of c.solutions ?? []) lines.push(s.title, s.description, s.impact, s.result)
  if (c.impactIntro) lines.push(c.impactIntro)
  for (const m of c.impactMetrics ?? []) lines.push(`${m.value} — ${m.label}`)
  for (const l of c.keyLearnings ?? []) lines.push(l.title, l.description)
  for (const f of c.futureOpportunities ?? []) lines.push(f.title, f.description)
  return lines.filter(Boolean)
}

function noscriptFor(c: Content): string {
  const p: string[] = [`<h1>${escHtml(c.title)}</h1>`]
  if (c.subtitle) p.push(`<p>${escHtml(c.subtitle)}</p>`)
  if (c.description) p.push(`<p>${escHtml(c.description)}</p>`)
  if (c.tags?.length) p.push(`<p>${c.tags.map(escHtml).join(', ')}</p>`)
  for (const para of c.contextParagraphs ?? []) p.push(`<p>${escHtml(para)}</p>`)
  if (c.challengeIntro) p.push(`<h2>The challenge</h2>`, `<p>${escHtml(c.challengeIntro)}</p>`)
  for (const ch of c.challenges ?? []) {
    p.push(`<h3>${escHtml(ch.title)}</h3>`, `<p>${escHtml(ch.subtitle)}</p>`, `<p>${escHtml(ch.description)}</p>`, `<p>${escHtml(ch.impact)}</p>`)
  }
  if (c.researchIntro) p.push(`<h2>Research</h2>`, `<p>${escHtml(c.researchIntro)}</p>`)
  for (const m of c.researchMethods ?? []) p.push(`<p>${escHtml(m)}</p>`)
  if (c.keyInsight?.quote) p.push(`<blockquote>${escHtml(c.keyInsight.quote)} ${escHtml(c.keyInsight.cite ?? '')}</blockquote>`)
  if (c.solutions?.length) p.push(`<h2>Solutions</h2>`)
  for (const s of c.solutions ?? []) {
    p.push(`<h3>${escHtml(s.title)}</h3>`, `<p>${escHtml(s.description)}</p>`, `<p>${escHtml(s.impact)}</p>`, `<p>${escHtml(s.result)}</p>`)
  }
  if (c.impactIntro) p.push(`<h2>Impact</h2>`, `<p>${escHtml(c.impactIntro)}</p>`)
  for (const m of c.impactMetrics ?? []) p.push(`<p>${escHtml(m.value)} — ${escHtml(m.label)}</p>`)
  if (c.keyLearnings?.length) p.push(`<h2>Key learnings</h2>`)
  for (const l of c.keyLearnings ?? []) p.push(`<h3>${escHtml(l.title)}</h3>`, `<p>${escHtml(l.description)}</p>`)
  return `<noscript>\n      <article>\n        ${p.join('\n        ')}\n      </article>\n    </noscript>`
}

function articleJsonLd(c: Content, url: string): string {
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    name: c.product,
    description: c.description,
    image: `${SITE_URL}/og-image.png`,
    inLanguage: 'en',
    url,
    mainEntityOfPage: url,
    author: { '@type': 'Person', name: 'Divyansh Sharma', url: `${SITE_URL}/` },
    publisher: { '@type': 'Person', name: 'Divyansh Sharma', url: `${SITE_URL}/` },
    about: c.company,
    keywords: keywordsFor(c).join(', '),
    articleBody: contentLines(c).join(' '),
  }
  return `<script type="application/ld+json">\n${JSON.stringify(obj)}\n    </script>`
}

function applyMeta(template: string, title: string, description: string, url: string): string {
  return template
    .replace('<title>Divyansh Sharma - UX Designer Portfolio</title>', `<title>${escHtml(title)}</title>`)
    .replace(
      '<meta name="description" content="UX Designer portfolio of Divyansh Sharma. Crafting meaningful digital experiences through research-driven design, turning complex problems into intuitive solutions." />',
      `<meta name="description" content="${escHtml(description)}" />`
    )
    .replace('<link rel="canonical" href="https://divyanshsharma.work/" />', `<link rel="canonical" href="${url}" />`)
    .replace(
      '<meta property="og:title" content="Divyansh Sharma - UX Designer Portfolio" />',
      `<meta property="og:title" content="${escHtml(title)}" />`
    )
    .replace(
      '<meta property="og:description" content="Crafting meaningful digital experiences through research-driven design, turning complex problems into intuitive solutions." />',
      `<meta property="og:description" content="${escHtml(description)}" />`
    )
    .replace('<meta property="og:url" content="https://divyanshsharma.work/" />', `<meta property="og:url" content="${url}" />`)
    .replace(
      '<meta name="twitter:title" content="Divyansh Sharma - UX Designer Portfolio" />',
      `<meta name="twitter:title" content="${escHtml(title)}" />`
    )
    .replace(
      '<meta name="twitter:description" content="Crafting meaningful digital experiences through research-driven design." />',
      `<meta name="twitter:description" content="${escHtml(description)}" />`
    )
}

async function main() {
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  const { caseStudies } = (await vite.ssrLoadModule('/src/data/caseStudies.ts')) as { caseStudies: Summary[] }
  const { caseStudyContent } = (await vite.ssrLoadModule('/src/data/case-studies/index.ts')) as {
    caseStudyContent: Record<string, Content>
  }
  await vite.close()

  const template = readFileSync('build/index.html', 'utf8')
  let count = 0

  // /all-case-studies — listing page: correct meta + a <noscript> index of
  // links so crawlers can reach every case study without JS.
  {
    const url = `${SITE_URL}/all-case-studies`
    let html = applyMeta(
      template,
      'All Case Studies · Divyansh Sharma - UX Designer Portfolio',
      'Browse every UX case study by Divyansh Sharma — healthcare, enterprise, and dashboard design work.',
      url
    )
    const links = caseStudies
      .filter((s) => !!s.id)
      .map((s) => `<li><a href="${SITE_URL}/${s.id}">${escHtml(s.title)}</a> — ${escHtml(s.description)}</li>`)
      .join('\n        ')
    const noscript = `<noscript>\n      <h1>Case Studies — Divyansh Sharma</h1>\n      <ul>\n        ${links}\n      </ul>\n    </noscript>`
    html = html.replace('<div id="root"></div>', `${noscript}\n    <div id="root"></div>`)
    writeFileSync('build/all-case-studies.html', html)
    count++
  }

  // Individual case studies — full text + rich structured data.
  for (const s of caseStudies) {
    if (!s.id) continue
    const c = caseStudyContent[s.id]
    if (!c) continue
    const url = `${SITE_URL}/${s.id}`
    let html = applyMeta(template, `${s.title} · Divyansh Sharma`, s.description, url)
    html = html.replace('</head>', `  ${articleJsonLd(c, url)}\n  </head>`)
    html = html.replace('<div id="root"></div>', `${noscriptFor(c)}\n    <div id="root"></div>`)
    writeFileSync(`build/${s.id}.html`, html)
    count++
  }

  console.log(`Generated ${count} static route pages (with full-text + structured data)`)
}

main()
