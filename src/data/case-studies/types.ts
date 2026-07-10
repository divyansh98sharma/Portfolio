import type { Page } from '../../components/Router'

export interface CaseStat {
  /** big number, e.g. "2024", "8", "95" */
  value: string
  /** small unit/label under the value, e.g. "Year", "Interviews" */
  unit: string
  /** row title, e.g. "Project Completed" */
  title: string
  /** footnote, e.g. "8 months duration" */
  note: string
  /** progress bar 0-100 */
  progress: number
  /** optional sub-metrics (the 4th "impact" card) */
  subMetrics?: { label: string; value: string; progress: number }[]
}

export interface CaseChallenge {
  title: string
  subtitle: string
  description: string
  impact: string
  stat: string
  statLabel: string
}

export interface CaseSolution {
  title: string
  description: string
  impact: string
  result: string
}

export interface CaseStudyContent {
  id: Page
  fileName: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  prototypeUrl?: string
  heroImage: { src: string; alt: string }
  heroStat: { label: string; value: string }

  contextParagraphs: string[]
  stats: CaseStat[]

  teamIntro: string
  role: { title: string; activities: string[] }
  teamGroups: { heading: string; items: string[] }[]

  challengeIntro: string
  challenges: CaseChallenge[]
  combinedImpact: { value: string; label: string }[]

  researchIntro: string
  researchMethods: string[]
  keyInsight: { quote: string; cite: string }
  researchImage: { src: string; alt: string }

  processIntro: string
  designPhases: { title: string; description: string }[]

  solutions: CaseSolution[]

  impactIntro: string
  impactMetrics: { value: string; label: string }[]
  feedbackHeading: string
  feedback: { quote: string; cite: string }[]

  keyLearnings: { title: string; description: string }[]
  futureOpportunities: { title: string; description: string }[]

  prev: { id: Page; label: string }
  next: { id: Page; label: string }
}
