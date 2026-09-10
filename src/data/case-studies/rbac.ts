import type { CaseStudyContent } from './types'
import healthcareTeamMeeting from '../../assets/case-studies/healthcare-team-meeting.jpg'
import healthcareTeamMeetingWebp from '../../assets/case-studies/healthcare-team-meeting.webp'

export const rbac: CaseStudyContent = {
  id: 'case-study-2',
  fileName: 'rbac-access-control.fig',
  title: 'Role Based Access Control - Peak.ai',
  product: 'RBAC 2.0',
  company: 'Peak.ai',
  accent: '#9747ff',
  subtitle: 'Redesigning enterprise permissions without breaking the access customers already depended on.',
  description:
    'A role-based access control system with granular permissions, role templates, and audit trails — replacing a manual setup flow that took ~48 clicks to configure a single user.',
  tags: ['Enterprise UX', 'Access Control', 'Usability Testing', 'Security & Compliance'],

  contextParagraphs: [
    "At Peak, as the platform scaled to serve multiple enterprise clients, the existing access control system became rigid and inconsistent. Admins struggled to manage complex permissions, while end users often found themselves confused about what they could or couldn't access.",
    'The goal of RBAC 2.0 was to create a scalable, granular, and user-friendly permissions system that would improve security, simplify admin tasks, and enhance clarity for end users.',
  ],
  stats: [
    { value: '2022', unit: 'Year', title: 'Project Completed', note: '6 months duration', progress: 100 },
    { value: '6', unit: 'Interviews', title: 'Stakeholder Research', note: '4-person core team', progress: 100 },
    { value: '4', unit: 'Tests', title: 'Usability Sessions', note: '85% success rate', progress: 85 },
    {
      value: '90', unit: 'Adoption', title: 'Key Impact Metrics', note: '', progress: 90,
      subMetrics: [
        { label: 'Admin Efficiency', value: '+40%', progress: 40 },
        { label: 'Error Reduction', value: '-25%', progress: 25 },
        { label: 'Support Tickets', value: '-35%', progress: 35 },
      ],
    },
  ],

  teamIntro:
    'This was a product-focused project with close collaboration between design, security, engineering, and business operations teams.',
  role: {
    title: 'Lead UX Designer / Associate Product Designer',
    activities: [
      'Conducted stakeholder workshops',
      'Defined user flows and permission models',
      'Designed prototypes for admin dashboards',
      'Led usability validation with enterprise clients',
    ],
  },
  teamGroups: [
    { heading: 'Research & Product', items: ['Product Manager – Product Strategy & Requirements', 'Security Analyst – Security & Compliance Requirements'] },
    { heading: 'Engineering Team', items: ['Backend & Frontend Engineers'] },
    { heading: 'Business & Operations', items: ['Client-facing analysts for enterprise onboarding'] },
  ],

  challengeIntro: 'Enterprise customers and internal admins highlighted three major issues:',
  challenges: [
    {
      title: 'Rigid Permissions',
      subtitle: "Predefined roles didn't scale",
      description: "Predefined roles didn't scale to complex enterprise use cases.",
      impact: 'Result: Admins had to create workarounds, increasing security risk.',
      stat: '100%',
      statLabel: 'Predefined',
    },
    {
      title: 'Confusing Interfaces',
      subtitle: 'Unclear access visibility',
      description: "End users didn't know what they could or couldn't access.",
      impact: 'Result: High support ticket volume & onboarding friction.',
      stat: '48',
      statLabel: 'Clicks',
    },
    {
      title: 'Inefficient Admin Management',
      subtitle: 'Manual and repetitive tasks',
      description: 'Assigning permissions was manual and repetitive (~48 clicks to configure a single user).',
      impact: 'Result: Productivity bottlenecks for enterprise IT teams.',
      stat: '+40%',
      statLabel: 'Admin Time',
    },
  ],
  combinedImpact: [
    { value: '85%', label: 'Security Gaps' },
    { value: '70%', label: 'High Admin Effort' },
    { value: '65%', label: 'Poor End-User Clarity' },
  ],

  researchIntro: 'To ensure the new system addressed real-world needs, we conducted:',
  researchMethods: [
    '6 stakeholder interviews with enterprise IT managers & internal admins',
    '4 usability sessions testing early permission prototypes',
    'Workflow mapping of user and admin journeys',
    'Benchmarking against AWS IAM, Azure AD, and Google Workspace',
  ],
  keyInsight: {
    quote: '"I just want to see, at a glance, who has access to what — and change it in one click."',
    cite: '– Enterprise IT Admin',
  },
  researchImage: {
    src: healthcareTeamMeeting,
    webp: healthcareTeamMeetingWebp,
    alt: 'Enterprise team meeting and stakeholder research session',
    width: 1080,
    height: 720,
  },

  processIntro: 'We followed a structured design methodology:',
  designPhases: [
    { title: 'Discovery', description: 'Gathered feedback from admins & clients on access issues' },
    { title: 'Define', description: 'Identified opportunities for role templates, custom roles, and audit trails' },
    { title: 'Ideate', description: 'Explored models for granular permissions & visual matrices' },
    { title: 'Prototype', description: 'Built Figma prototypes for role creation, assignment, and auditing' },
    { title: 'Test & Iterate', description: 'Refined flows after usability sessions with enterprise admins' },
  ],

  solutions: [
    {
      title: 'Role Templates',
      description: 'Predefined roles (Admin, Manager, Analyst, etc.) to simplify setup',
      impact: 'Reduced onboarding time for new clients',
      result: 'Streamlined initial configuration process',
    },
    {
      title: 'Custom Roles',
      description: 'Full flexibility to create, edit, and delete roles with granular permissions',
      impact: 'Scalable system adaptable to enterprise complexity',
      result: '100% customizable permission structures',
    },
    {
      title: 'Permission Matrix',
      description: 'Visual grid of resources vs. actions (view, edit, run, delete)',
      impact: 'Clear at-a-glance permissions overview, reducing confusion',
      result: 'Instant visibility into access rights',
    },
    {
      title: 'Audit Trails',
      description: 'Complete history of role assignments and permission changes',
      impact: 'Improved accountability and compliance tracking',
      result: 'Full regulatory compliance support',
    },
  ],

  impactIntro: 'What changed for admins and end users:',
  impactMetrics: [],
  whatChanged: [
    'Template-driven role creation replaced a ~48-click manual setup',
    'Clear at-a-glance permissions overview, reducing confusion',
    'Complete history of role assignments and permission changes',
    'Scalable model adaptable to enterprise complexity',
  ],
  feedbackHeading: 'Enterprise Feedback',
  // Cleared pending an evidence audit — prior quotes used invented attributions.
  feedback: [],

  keyLearnings: [
    { title: 'Granularity vs. simplicity', description: 'Striking the right balance between detailed control and ease of use was key.' },
    { title: 'Default + Custom approach', description: 'Predefined roles gave clarity, custom roles gave flexibility.' },
    { title: 'Visibility builds trust', description: 'The permission matrix and audit logs were the most valued features.' },
  ],
  futureOpportunities: [
    { title: 'Cross-tenant Admin Portal', description: 'Managing multiple organizations from a single interface' },
    { title: 'Predictive Permissions', description: 'AI recommendations for role setups based on usage patterns' },
    { title: 'Enhanced Reporting', description: 'Advanced analytics to track anomalies and optimize configurations' },
  ],
}
