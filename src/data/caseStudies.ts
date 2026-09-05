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

export const caseStudies: CaseStudy[] = [
  {
    id: 'case-study-1',
    title: 'Analytics Central - eClinicalWorks',
    product: 'Analytics Central',
    company: 'eClinicalWorks',
    accent: '#0d99ff',
    description: 'A centralized clinical dashboard that consolidated fragmented KPIs into role-aware views, with AI-assisted search and customizable widgets for doctors, nurses, and administrators.',
    tags: ['Healthcare UX', 'Dashboard Design', 'Usability Testing', 'AI Integration'],
    impact: 'Role-aware KPI views with AI-assisted search',
    year: '2024',
    fileName: 'analytics-central.fig'
  },
  {
    id: 'case-study-2',
    title: 'Role Based Access Control - Peak.ai',
    product: 'RBAC 2.0',
    company: 'Peak.ai',
    accent: '#9747ff',
    description: 'A role-based access control system with granular permissions, role templates, and audit trails — replacing a manual setup flow that took ~48 clicks to configure a single user.',
    tags: ['Enterprise UX', 'Access Control', 'Usability Testing', 'Security & Compliance'],
    impact: 'Template-driven roles replacing a ~48-click manual setup',
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
    image: flowsheetsCover,
    tags: ['Healthcare UX', 'Workflow Optimization', 'EHR Usability', 'Interface Redesign'],
    impact: 'Improved clarity, efficiency, adoption, and compliance & safety',
    year: '2024',
    fileName: 'flowsheets.fig'
  },
  {
    title: 'File Manager \u2013 Peak.ai',
    product: 'File Manager',
    company: 'Peak.ai',
    accent: '#0fb5ae',
    description: 'A ground-up file management experience for Peak.ai — folders, previews, and real file operations, replacing a workflow that forced users into AWS or a full data pipeline just to look at a file. Currently in the design phase.',
    image: '',
    tags: ['Enterprise UX', 'Data Platform', 'In Design Phase'],
    impact: 'Coming soon',
    year: '2026',
    fileName: 'file-manager.fig',
    status: 'coming-soon'
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
  },
  {
    title: 'Design Resources & UI Kit',
    product: 'UI Kit',
    company: 'Collabrix',
    accent: '#ffa629',
    description: 'A downloadable library of Figma UI components, templates, and design-system building blocks for teams and solo designers. Currently in the works.',
    image: '',
    tags: ['Figma', 'UI Kit', 'In Design Phase'],
    impact: 'Coming soon',
    year: '2026',
    fileName: 'ui-kit.fig',
    status: 'coming-soon'
  }
]
