import type { CaseStudyContent } from './types'

/** Verified user-supplied content. RBAC uses its own evidence-led section renderer.
 * Empty legacy schema fields must never render as placeholders.
 * TODO(PENDING): tenant/user scale numbers — awaiting confirmation.
 * TODO(PENDING): old-flow video (blurred).
 * TODO(PENDING): annotated Roles page and permission matrix (dummy data).
 * TODO(PENDING): how permissions combine across multiple roles; decision and tradeoff.
 * TODO(PENDING): Release 2 screens showing a user with multiple roles.
 * TODO(PENDING): after-step count from recorded user flow.
 * TODO(PENDING): before/after clips.
 */
export const rbac: CaseStudyContent = {
  id: 'case-study-2',
  fileName: 'rbac-access-control.fig',
  title: 'Role-Based Access Control',
  product: 'Role-Based Access Control',
  company: 'Peak (now UiPath) — an AI platform used by enterprise retail and CPG teams.',
  accent: '#9747ff',
  subtitle: 'Replacing per-user permissions with roles — across two releases.',
  description: 'Replaced per-user permission setup — 22 manual choices for every new user — with reusable roles, then extended it to multiple roles per user. Sole designer across both releases.',
  tags: ['Enterprise UX', 'Access Control', 'Usability Testing'],
  heroStat: { label: 'Before → After', value: '22 per-user permission choices → pick a role' },
  contextParagraphs: [
    'Adding a user meant one long form: enter an email, then work through 22 resources across four sections, choosing Read, Write or Deny for each one. Nothing could be reused, so the second user started from scratch.',
    'Customers had been raising it. At least 13 separate feedback threads asked for templates for new users, simpler permissions, and separate permission to delete — which was exposing business-critical feeds and workflows to accidental deletion.',
  ],
  stats: [
    { value: '4', unit: 'participants', title: 'Internal admins and customer success managers', note: '', progress: 0 },
    { value: '6', unit: 'tasks', title: 'Prototype usability testing', note: '', progress: 0 },
    { value: '21/24', unit: 'tasks completed', title: '87.5% task completion', note: '', progress: 87.5 },
  ],
  teamIntro: 'Discovery to rollout across two releases (2021–2022). Team: 7 engineers, 1 PM, 1 QA.',
  role: {
    title: 'Sole designer (Associate Product Designer)',
    activities: ['User journeys', 'Wireframes', 'Prototypes', 'Usability testing', 'Engineering handoff across time zones — for both releases'],
  },
  teamGroups: [
    { heading: 'Cross-functional team', items: ['7 engineers', '1 PM', '1 QA'] },
  ],
  challengeIntro: 'Admins set 22 permissions by hand for every new user, then repeated it for the next one.',
  challenges: [],
  combinedImpact: [],
  researchIntro: 'Mapped the current admin journey and the ideal one to find where time and errors came from. Tested a Figma prototype with 4 internal admins and customer success managers across 6 tasks. 21 of 24 task attempts completed (87.5%).',
  researchMethods: [
    'Mapped the current admin journey and the ideal one to find where time and errors came from.',
    'Tested a Figma prototype with 4 internal admins and customer success managers across 6 tasks.',
    '21 of 24 task attempts completed (87.5%).',
  ],
  keyInsight: { quote: '', cite: '' },
  researchImage: { src: '', alt: '' },
  processIntro: '',
  designPhases: [],
  solutions: [],
  impactIntro: 'Before: 22 permission choices per user, repeated for every user. After: Pick a role — and from Release 2, combine roles when one isn’t enough. Shipped across two releases, rolled out in batches to customer tenants without breaking anyone’s access.',
  impactMetrics: [],
  whatChanged: [
    'Before: 22 permission choices per user, repeated for every user.',
    'After: Pick a role — and from Release 2, combine roles when one isn’t enough.',
    'Shipped across two releases, rolled out in batches to customer tenants without breaking anyone’s access.',
  ],
  feedbackHeading: '',
  feedback: [],
  keyLearnings: [],
  futureOpportunities: [],
}

/** Decision records retain what / tradeoff / why rather than fake metrics. */
export const rbacReleaseOneDecisions = [
  {
    title: 'Roles, not per-user permissions',
    what: 'Admins define permissions once in a role and assign people to it.',
    tradeoff: 'A new concept for admins to learn.',
    why: 'It was the root cause of the repetition, and the most-requested fix.',
  },
  {
    title: 'Read → Write → Delete, cascading; Deny removed',
    what: 'Choosing a higher level includes the lower ones; selecting nothing means no access.',
    tradeoff: 'It changed a model admins already knew.',
    why: '"Deny" wasn’t really a permission, and Delete needed its own level to protect critical resources.',
  },
  {
    title: 'Every user must have a role',
    what: 'A user can’t be added without a role.',
    tradeoff: 'Adding a user takes one extra step.',
    why: 'In testing, 2 of 4 participants wanted to be forced to choose one, so nobody ends up with unclear access.',
  },
  {
    title: 'Assign users while creating a role',
    what: 'People can be added directly inside the create-role form.',
    tradeoff: 'The creation form gets busier.',
    why: 'Participants expected to add people as part of creating the role, not as a separate step afterwards.',
  },
  {
    title: 'Default roles locked; clone to customize',
    what: 'Built-in roles can’t be edited; admins clone them to customize.',
    tradeoff: 'Less flexibility.',
    why: 'Editing a shared default would silently change access for everyone using it. Cloning keeps defaults predictable.',
  },
] as const

export const rbacSessionNotes = [
  'Tick can be missed.',
  'Create role button is misleading.',
  'Felt like it was a test.',
] as const

export const rbacReleaseOneConstraint = 'Release 1 limited each user to one role, and existing users were migrated automatically into generated roles so nobody lost access at launch. Engineering made those calls for migration safety; my job was to make the interface work within them.'

export const rbacReleaseTwo = 'Release 2 lifted Release 1’s one-role limit: a user can now hold more than one role. Testing had already pointed here — participants were split between expecting one role and several ("One, might conflict between two roles" vs. "ultimately more than one role at a time").'

export const rbacReflectionIntro = 'In testing, only 2 of 4 participants could tell which role a user had — even on the right screen. The assigned role was highlighted in a way that looked like a choice from a short list. Three of four also said roles and users felt disconnected. We shipped without fixing it. Today I would:'
export const rbacReflectionActions = [
  'show each role as a clear label on the user’s page, linked to its permissions;',
  'show each user’s effective permissions;',
  're-test that task before launch.',
] as const
export const rbacReflectionOutro = 'This gap matters more after Release 2: once a user can hold several roles, "what can this person actually do?" gets harder to answer — so effective permissions should be visible in one place.'
