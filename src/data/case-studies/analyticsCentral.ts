import type { CaseStudyContent } from './types'
import analyticsHero from '../../assets/case-studies/analytics-hero.jpg'
import healthcareTeamMeeting from '../../assets/case-studies/healthcare-team-meeting.jpg'

export const analyticsCentral: CaseStudyContent = {
  id: 'case-study-1',
  fileName: 'analytics-central.fig',
  title: 'Analytics Central - eClinicalWorks',
  product: 'Analytics Central',
  company: 'eClinicalWorks',
  accent: '#0d99ff',
  subtitle: 'Centralizing healthcare KPIs through user-centered design.',
  description:
    'A comprehensive dashboard solution that reduced navigation time by 30% and improved clinician satisfaction by 25% through AI-powered search, customizable widgets, and role-based personalization.',
  tags: ['Healthcare UX', 'Dashboard Design', 'Usability Testing', 'AI Integration'],
  heroImage: {
    src: analyticsHero,
    alt: 'Healthcare analytics dashboard interface showing consolidated KPIs and metrics with clean modern design',
  },
  heroStat: { label: 'Time Saved', value: '30%' },

  contextParagraphs: [
    'At eClinicalWorks, healthcare professionals relied on multiple fragmented dashboards to track critical KPIs. Clinicians, administrators, and nurses all used different systems, leading to context switching, inefficiency, and cognitive overload.',
    'The goal of Analytics Central was to unify these dashboards into a single intelligent interface that would serve as a centralized hub for healthcare data, with AI-powered search and personalization at its core.',
  ],
  stats: [
    { value: '2024', unit: 'Year', title: 'Project Completed', note: '8 months duration', progress: 100 },
    { value: '8', unit: 'Interviews', title: 'Stakeholder Research', note: '5-person team', progress: 100 },
    { value: '5', unit: 'Tests', title: 'Usability Sessions', note: '80% success rate', progress: 80 },
    {
      value: '95%', unit: 'Adoption', title: 'Key Impact Metrics', note: '', progress: 95,
      subMetrics: [
        { label: 'Time Saved', value: '30%', progress: 30 },
        { label: 'Context Reduction', value: '70%', progress: 70 },
        { label: 'Satisfaction', value: '+25%', progress: 25 },
      ],
    },
  ],

  teamIntro:
    'This was a cross-functional project spanning design, product, engineering, and business operations.',
  role: {
    title: 'Lead UX Designer / Usability Specialist',
    activities: [
      'Conducted stakeholder interviews',
      'Defined information architecture',
      'Designed the dashboard interface',
      'Led usability testing and iterations',
    ],
  },
  teamGroups: [
    { heading: 'Research & Product', items: ['Manager & Researcher', 'Business Goals & Task Alignment'] },
    { heading: 'Development Team', items: ['Software Engineers', 'Technical Analysts'] },
    { heading: 'Product Analysts', items: ['User Research & Data Analysis'] },
  ],

  challengeIntro: 'Healthcare professionals reported three major issues:',
  challenges: [
    {
      title: 'Cognitive Overload',
      subtitle: 'Context switching fatigue',
      description: 'Users had to switch between 5+ dashboards daily, averaging 15+ context switches per shift.',
      impact: 'Result: Fatigue and decreased productivity.',
      stat: '5+',
      statLabel: 'Dashboards',
    },
    {
      title: 'Inefficient Search',
      subtitle: 'Time-consuming KPI discovery',
      description: 'Locating KPIs took 2–3 minutes per search across 200+ metrics.',
      impact: 'Absence of intelligent search tools created bottlenecks in decision-making.',
      stat: '2-3',
      statLabel: 'Minutes',
    },
    {
      title: 'Zero Personalization',
      subtitle: 'One-size-fits-all interface',
      description: 'All users—doctors, nurses, and administrators—faced the same interface, despite vastly different needs.',
      impact: 'One-size-fits-all dashboards reduced relevance and satisfaction.',
      stat: '100%',
      statLabel: 'Identical',
    },
  ],
  combinedImpact: [
    { value: '45%', label: 'Wasted Time' },
    { value: '60%', label: 'User Frustration' },
    { value: '25%', label: 'Productivity Loss' },
  ],

  researchIntro: 'To deeply understand user needs, we conducted:',
  researchMethods: [
    '8 stakeholder interviews (physicians, administrators, clinical operations)',
    '5 usability tests on existing dashboards',
    'Workflow analysis across clinical and admin tasks',
    'Competitive benchmarking (Epic, Cerner, Tableau dashboards)',
  ],
  keyInsight: {
    quote:
      '"I spend too much time clicking through different systems just to find basic metrics. Everything should be in one place."',
    cite: '– Dr. Rodriguez, Physician',
  },
  researchImage: {
    src: healthcareTeamMeeting,
    alt: 'Healthcare team meeting and stakeholder research session',
  },

  processIntro: 'We followed a structured design methodology:',
  designPhases: [
    { title: 'Discovery', description: 'Gathered user pain points and mapped inefficiencies' },
    { title: 'Define', description: 'Framed opportunities around personalization, efficiency, and consolidation' },
    { title: 'Ideate', description: 'Brainstormed modular dashboard layouts and AI search flows' },
    { title: 'Prototype', description: 'Created interactive Figma prototypes (widgets, trending metrics, personalization flows)' },
    { title: 'Test & Iterate', description: 'Validated with clinicians, refined based on usability testing' },
  ],

  solutions: [
    {
      title: 'AI-Powered Search',
      description: 'Predictive suggestions & natural language processing',
      impact: 'Average search time reduced from 2–3 minutes → 3 seconds',
      result: '90% faster information discovery',
    },
    {
      title: 'Customizable Widgets',
      description: 'Drag-and-drop modular system',
      impact: '50+ widget types and infinite layout configurations',
      result: 'Users could prioritize KPIs based on their role',
    },
    {
      title: 'Role-Based Personalization',
      description: 'Smart dashboards adapted automatically to doctors, nurses, and administrators',
      impact: 'Each role saw only the most relevant KPIs',
      result: 'Personalized experiences for all user types',
    },
    {
      title: 'Unified KPI Ecosystem',
      description: 'Consolidated 200+ KPIs into a single source of truth',
      impact: 'Consistent visual language for charts, typography, and color tokens',
      result: 'Eliminated system fragmentation',
    },
  ],

  impactIntro: 'The new dashboard was validated through pilot testing and analytics tracking:',
  impactMetrics: [
    { value: '30%', label: 'reduction in navigation time' },
    { value: '+25%', label: 'clinician satisfaction' },
    { value: '95%', label: 'adoption rate across the pilot group' },
    { value: '8/10', label: 'recommendation score from users' },
  ],
  feedbackHeading: 'User Feedback',
  feedback: [
    { quote: '"I can find any KPI in seconds now. The search function is exactly what we needed."', cite: '– Dr. Rodriguez' },
    { quote: '"Having everything in one dashboard saves me so much time during my shifts."', cite: '– Lisa, RN' },
    { quote: '"The personalized layout means I see exactly what matters for my role. It\'s perfect."', cite: '– Michael, Admin' },
  ],

  keyLearnings: [
    { title: 'Role-based design is essential', description: 'Personalization had the highest impact on user satisfaction.' },
    { title: 'Search is non-negotiable', description: 'AI search became the most frequently used feature across all roles.' },
    { title: 'Balance complexity with clarity', description: 'Healthcare dashboards must simplify workflows without compromising critical data.' },
  ],
  futureOpportunities: [
    { title: 'Predictive Analytics', description: 'AI-driven insights to forecast clinical outcomes' },
    { title: 'Mobile Integration', description: 'Responsive dashboard for on-the-go use' },
    { title: 'Advanced Visualizations', description: 'Interactive storytelling for complex healthcare data' },
  ],
}
