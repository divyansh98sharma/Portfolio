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
  /** must match this study's key in case-studies/index.ts's caseStudyContent map */
  id: string
  fileName: string
  title: string
  /** short product name for cover art, e.g. "Analytics Central" */
  product: string
  /** org the work was for, e.g. "eClinicalWorks" */
  company: string
  /** per-project identity color threading through the whole file */
  accent: string
  subtitle: string
  description: string
  tags: string[]
  prototypeUrl?: string
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
  researchImage: { src: string; webp?: string; alt: string; width?: number; height?: number }

  processIntro: string
  designPhases: { title: string; description: string }[]

  solutions: CaseSolution[]

  impactIntro: string
  /** Quantitative outcome tiles. Left empty when the study uses the
   *  qualitative `whatChanged` list instead (no invented/validated numbers). */
  impactMetrics: { value: string; label: string }[]
  /** Qualitative "what changed" outcomes — rendered in place of impactMetrics
   *  when present, so results read as honest changes rather than metrics. */
  whatChanged?: string[]
  feedbackHeading: string
  feedback: { quote: string; cite: string }[]

  keyLearnings: { title: string; description: string }[]
  futureOpportunities: { title: string; description: string }[]
}
