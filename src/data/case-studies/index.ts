import type { Page } from '../../components/Router'
import type { CaseStudyContent } from './types'
import { analyticsCentral } from './analyticsCentral'
import { rbac } from './rbac'
import { flowsheets } from './flowsheets'
import { fileManager } from './fileManager'

export type { CaseStudyContent } from './types'

export const caseStudyContent: Partial<Record<Page, CaseStudyContent>> = {
  'case-study-1': analyticsCentral,
  'case-study-2': rbac,
  'case-study-3': flowsheets,
  'case-study-4': fileManager,
}
