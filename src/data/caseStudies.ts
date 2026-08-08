import type { Page } from '../components/Router'

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
  image: string
  tags: string[]
  impact: string
  year: string
  /** Figma-style document name shown on file tiles and in the top bar */
  fileName: string
  /** shown as a badge instead of "Open ↗" when the project isn't published yet */
  status?: 'coming-soon'
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'case-study-1',
    title: 'Analytics Central - eClinicalWorks',
    product: 'Analytics Central',
    company: 'eClinicalWorks',
    accent: '#0d99ff',
    description: 'A centralized dashboard that cut navigation time by 30% and raised clinician satisfaction by 25% through AI search, widgets, and role-based views.',
    image: 'https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3MDk4NDM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Healthcare UX', 'Dashboard Design', 'Usability Testing', 'AI Integration'],
    impact: '30% reduction in navigation time, 25% improvement in clinician satisfaction',
    year: '2024',
    fileName: 'analytics-central.fig'
  },
  {
    id: 'case-study-2',
    title: 'Role Based Access Control - Peak.ai',
    product: 'RBAC 2.0',
    company: 'Peak.ai',
    accent: '#9747ff',
    description: 'Scalable RBAC framework that improved efficiency 40% and cut errors 25% for enterprise security.',
    image: 'https://images.unsplash.com/photo-1697382608786-bcf4c113b86e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGFjY2VzcyUyMGNvbnRyb2wlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3MTc2OTYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Enterprise UX', 'Access Control', 'Usability Testing', 'Security & Compliance'],
    impact: '40% increase in admin efficiency, 25% reduction in access errors',
    year: '2022',
    fileName: 'rbac-access-control.fig'
  },
  {
    id: 'case-study-3',
    title: 'Flowsheets \u2013 eClinicalWorks',
    product: 'Flowsheets',
    company: 'eClinicalWorks',
    accent: '#14ae5c',
    description: 'A redesigned Flowsheets window that improved visibility of patient progress, streamlined documentation, and enhanced provider workflows through a modernized UI.',
    image: 'https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHBhdGllbnQlMjBtb25pdG9yaW5nJTIwZGFzaGJvYXJkJTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NTg5Nzc5MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Healthcare UX', 'Workflow Optimization', 'EHR Usability', 'Interface Redesign'],
    impact: 'Improved clarity, efficiency, adoption, and compliance & safety',
    year: '2024',
    fileName: 'flowsheets.fig'
  },
  {
    id: 'case-study-4',
    title: 'This Site — Portfolio as a Live Product',
    product: 'This Site',
    company: 'Self-Directed',
    accent: '#f2994a',
    description: 'A portfolio that behaves like the tool it’s about — built through iterative, AI-paired engineering, with live comments, reactions, and sticker stamps anyone can leave.',
    image: '',
    tags: ['AI-Assisted Development', 'Realtime / Firestore', 'Systems Thinking'],
    impact: '6 live Firestore-backed features, zero custom backend servers',
    year: '2026',
    fileName: 'this-site.fig'
  },
  {
    title: 'eClinicalWorks Design System',
    product: 'Design System',
    company: 'eClinicalWorks',
    accent: '#8c8c8c',
    description: 'A token-based, component-driven design system for eClinicalWorks’ product suite, built to speed up delivery and keep design consistent across teams. Currently in the design phase.',
    image: '',
    tags: ['Design Systems', 'Component Library', 'In Design Phase'],
    impact: 'Coming soon',
    year: '2026',
    fileName: 'design-system.fig',
    status: 'coming-soon'
  }
]
