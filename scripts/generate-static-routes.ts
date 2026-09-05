import { readFileSync, writeFileSync } from 'node:fs'
import { createServer } from 'vite'

// Runs post-build. GitHub Pages is a static host with no SPA rewrite, so a
// deep link like /case-study-1 otherwise falls through to 404.html (HTTP 404)
// — Google can't index those pages even though they're in the sitemap. This
// emits a real HTML file per route so each URL returns 200 (GitHub Pages
// serves `/case-study-1` from `case-study-1.html`) with:
//   1. correct per-route <title>/description/canonical/OG tags,
//   2. the full case-study text in a <noscript> block so crawlers that don't
//      run JS still index every word, and
//   3. rich Article JSON-LD (keywords + articleBody).
// The same JS bundle then renders the interactive SPA over it.
const SITE_URL = 'https://divyanshsharma.work'

// Per-route title/description. Route → case-study mapping matches the real
// registry: case-study-1 = Analytics Central, case-study-2 = RBAC,
// case-study-3 = Flowsheets.
interface RouteMeta { title: string; description: string; contentId?: string; about?: boolean }
const ROUTES: Record<string, RouteMeta> = {
  '/about': {
    title: 'About Divyansh Sharma — Healthcare & Enterprise UX Designer',
    description:
      'Divyansh Sharma is a senior UX designer at eClinicalWorks with 5+ years across healthcare, AI, and enterprise software — previously at Peak.ai (now part of UiPath).',
    about: true,
  },
  '/all-case-studies': {
    title: 'Case Studies · Divyansh Sharma — UX Designer',
    description: 'Browse every UX case study — healthcare dashboards, clinical flowsheets, and enterprise access control.',
  },
  '/case-study-1': {
    title: 'Analytics Central — Healthcare KPI Dashboard | Divyansh Sharma',
    description: 'A centralized clinical dashboard that cut navigation time 30% and raised clinician satisfaction 25% through AI search, widgets and role-based views.',
    contentId: 'case-study-1',
  },
  '/case-study-2': {
    title: 'Role-Based Access Control — Enterprise Admin UX | Divyansh Sharma',
    description: 'An RBAC system that raised admin efficiency 40% and cut access errors 25%, reducing user setup from many clicks to a template-driven flow.',
    contentId: 'case-study-2',
  },
  '/case-study-3': {
    title: 'Flowsheets Redesign — Clinical Documentation UX | Divyansh Sharma',
    description: 'A redesigned Flowsheets window that improved patient-progress visibility and streamlined provider documentation workflows.',
    contentId: 'case-study-3',
  },
}

function escHtml(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

interface Content {
  title: string
  product: string
  company: string
  subtitle: string
  description: string
  tags: string[]
  contextParagraphs: string[]
  challengeIntro: string
  challenges: { title: string; subtitle: string; description: string; impact: string }[]
  researchIntro: string
  researchMethods: string[]
  keyInsight: { quote: string; cite: string }
  solutions: { title: string; description: string; impact: string; result: string }[]
  impactIntro: string
  impactMetrics: { value: string; label: string }[]
  keyLearnings: { title: string; description: string }[]
  futureOpportunities: { title: string; description: string }[]
}

function keywordsFor(c: Content): string[] {
  const kw = new Set<string>([...(c.tags ?? []), c.product, c.company, 'Divyansh Sharma', 'Divyansh Sharma UX designer', 'UX case study'])
  const company = (c.company ?? '').toLowerCase()
  if (company.includes('eclinicalworks')) { kw.add('eClinicalWorks'); kw.add('ECW') }
  if (company.includes('peak')) { kw.add('Peak'); kw.add('Peak.ai') }
  return [...kw].filter(Boolean)
}

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
  for (const para of c.contextParagraphs ?? []) p.push(`<p>${escHtml(para)}</p>`)
  if (c.challengeIntro) p.push(`<h2>The challenge</h2>`, `<p>${escHtml(c.challengeIntro)}</p>`)
  for (const ch of c.challenges ?? []) p.push(`<h3>${escHtml(ch.title)}</h3>`, `<p>${escHtml(ch.description)}</p>`, `<p>${escHtml(ch.impact)}</p>`)
  if (c.researchIntro) p.push(`<h2>Research</h2>`, `<p>${escHtml(c.researchIntro)}</p>`)
  for (const m of c.researchMethods ?? []) p.push(`<p>${escHtml(m)}</p>`)
  if (c.solutions?.length) p.push(`<h2>Solutions</h2>`)
  for (const s of c.solutions ?? []) p.push(`<h3>${escHtml(s.title)}</h3>`, `<p>${escHtml(s.description)}</p>`, `<p>${escHtml(s.result)}</p>`)
  if (c.impactIntro) p.push(`<h2>Impact</h2>`, `<p>${escHtml(c.impactIntro)}</p>`)
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

// Clean, indexable prose for /about.
const ABOUT_BIO: string[] = [
  'Divyansh Sharma is a senior UX designer with more than five years of experience designing user-centered products across healthcare, AI platforms, and enterprise software.',
  'He works at eClinicalWorks, one of the largest ambulatory EHR platforms in the United States, as a UI/UX designer and usability specialist for clinical software used by healthcare providers. His work there includes a centralized analytics dashboard that cut navigation time by around 30% and raised clinician satisfaction by around 25%, a Flowsheets redesign that streamlined clinical documentation, and a token-based design system that improved consistency by around 40% and reduced development time by around 15%.',
  'Previously he was an associate product designer at Peak.ai, an enterprise AI company since acquired by UiPath, working on features including Segment Explorer, Product Explorer, and Merchandiser, and building a Storybook-backed component library.',
  'His background is in psychology, which shapes a research-first approach: understanding user behavior and motivations before designing interfaces. He mentors early-career UX designers on craft and career growth.',
]

function aboutNoscript(): string {
  const p = ['<h1>About Divyansh Sharma</h1>', ...ABOUT_BIO.map((s) => `<p>${escHtml(s)}</p>`)]
  return `<noscript>\n      <article>\n        ${p.join('\n        ')}\n      </article>\n    </noscript>`
}

function profilePageJsonLd(url: string): string {
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url,
    mainEntity: {
      '@type': 'Person',
      name: 'Divyansh Sharma',
      jobTitle: 'Senior UX Designer',
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/og-image.png`,
      description: ABOUT_BIO[0],
      worksFor: { '@type': 'Organization', name: 'eClinicalWorks' },
      knowsAbout: [
        'Healthcare UX',
        'EHR Design',
        'Clinical Workflows',
        'Design Systems',
        'Enterprise UX',
        'Usability Testing',
        'Accessibility',
        'AI Product Design',
      ],
      address: { '@type': 'PostalAddress', addressCountry: 'IN' },
      sameAs: [
        'https://www.linkedin.com/in/divyansh98sharma',
        'https://medium.com/@divyansh98sharma',
        'https://github.com/divyansh98sharma',
      ],
    },
  }
  return `<script type="application/ld+json">\n${JSON.stringify(obj)}\n    </script>`
}

function applyMeta(t: string, title: string, description: string, url: string): string {
  const et = escHtml(title)
  const ed = escHtml(description)
  return t
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${et}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${ed}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${et}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${ed}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${et}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${ed}" />`)
}

async function main() {
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  const { caseStudyContent } = (await vite.ssrLoadModule('/src/data/case-studies/index.ts')) as {
    caseStudyContent: Record<string, Content>
  }
  await vite.close()

  const template = readFileSync('build/index.html', 'utf8')
  let count = 0

  for (const [path, meta] of Object.entries(ROUTES)) {
    const url = `${SITE_URL}${path}`
    let html = applyMeta(template, meta.title, meta.description, url)
    const c = meta.contentId ? caseStudyContent[meta.contentId] : undefined
    if (c) {
      html = html.replace('</head>', `  ${articleJsonLd(c, url)}\n  </head>`)
      html = html.replace('<div id="root"></div>', `${noscriptFor(c)}\n    <div id="root"></div>`)
    } else if (meta.about) {
      html = html.replace('</head>', `  ${profilePageJsonLd(url)}\n  </head>`)
      html = html.replace('<div id="root"></div>', `${aboutNoscript()}\n    <div id="root"></div>`)
    }
    writeFileSync(`build${path}.html`, html)
    count++
  }

  console.log(`Generated ${count} static route pages (200 + full-text + structured data)`)
}

main()
