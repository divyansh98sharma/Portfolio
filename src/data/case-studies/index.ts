import type { CaseStudyContent } from './types'
import { analyticsCentral } from './analyticsCentral'
import { rbac } from './rbac'
import { flowsheets } from './flowsheets'

export type { CaseStudyContent } from './types'

// The single source of truth for which case-study pages exist. Router.tsx
// derives its Page type from this map's keys, so adding a study here is
// enough to make it routable — no separate union/switch to update. Order
// here also drives the prev/next ring in CaseStudyLayout.
export const caseStudyContent = {
  'case-study-1': analyticsCentral,
  'case-study-2': rbac,
  'case-study-3': flowsheets,
} as const satisfies Record<string, CaseStudyContent>

export type CaseStudyId = keyof typeof caseStudyContent
