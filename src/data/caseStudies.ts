import type { Page } from '../components/Router'
import flowsheetsCover from '../assets/case-studies/flowsheets-cover.jpg'

export interface CaseStudy {
  /** omitted for projects that don't have a case-study page yet (e.g. status: 'coming-soon') */
  id?: Page
  title: string
  /** short product name for cover art, e.g. "Analytics Central" */
  product: string
  /** org the work was for, e.g. "eClinicalWorks" */
  company: string
  /** per-project identity color used in cover art and accents */
  accent: string
  description: string
  /** optional client-side og:image (Vite asset import); falls back to the
   *  default og-image.png when omitted */
  image?: string
  tags: string[]
  impact: string
  year: string
  /** Figma-style document name shown on file tiles and in the top bar */
  fileName: string
  /** shown as a badge instead of "Open ↗" when the project isn't published yet */
  status?: 'coming-soon'
}

// Order leads with product judgment (Analytics), then deep healthcare usability
// (Flowsheets), then scale/leadership (Design System), then earlier enterprise
// work (RBAC at Peak). Freelance-oriented and low-signal coming-soon entries
// (UI Kit, File Manager) were removed to keep the work section focused on the
// strongest hiring narrative.
export const caseStudies: CaseStudy[] = [
  {
    id: 'case-study-1',
    title: 'Analytics Central - eClinicalWorks',
    product: 'Analytics Central',
    company: 'eClinicalWorks',
    accent: '#0d99ff',
    description: 'Helping different healthcare roles find the analytics that matter to them without navigating fragmented dashboards.',
    tags: ['Healthcare UX', 'Dashboard Design', 'Usability Testing', 'AI Integration'],
    impact: 'Role-aware analytics with AI-assisted search',
    year: '2024',
    fileName: 'analytics-central.fig'
  },
  {
    id: 'case-study-3',
    title: 'Flowsheets \u2013 eClinicalWorks',
    product: 'Flowsheets',
    company: 'eClinicalWorks',
    accent: '#14ae5c',
    description: 'Reducing the cognitive effort of scanning dense clinical information while preserving familiar clinician workflows.',
    image: flowsheetsCover,
    tags: ['Healthcare UX', 'Workflow Optimization', 'EHR Usability', 'Interface Redesign'],
    impact: 'Clearer clinical scanning without disrupting workflows',
    year: '2024',
    fileName: 'flowsheets.fig'
  },
  {
    title: 'eClinicalWorks Design System',
    product: 'Design System',
    company: 'eClinicalWorks',
    accent: '#8c8c8c',
    description: 'Scaling interface quality across designers, engineers and a complex healthcare product ecosystem.',
    image: '',
    tags: ['Design Systems', 'Component Library', 'Governance'],
    impact: 'Case study in progress',
    year: '2026',
    fileName: 'design-system.fig',
    status: 'coming-soon'
  },
  {
    id: 'case-study-2',
    title: 'Role Based Access Control - Peak.ai',
    product: 'RBAC 2.0',
    company: 'Peak.ai',
    accent: '#9747ff',
    description: 'Redesigning permissions without breaking the access customers already depended on.',
    tags: ['Enterprise UX', 'Access Control', 'Usability Testing', 'Security & Compliance'],
    impact: 'Template-driven roles replacing a ~48-click manual setup',
    year: '2022',
    fileName: 'rbac-access-control.fig'
  }
]
