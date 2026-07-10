import type { CaseStudyContent } from './types'

export const flowsheets: CaseStudyContent = {
  id: 'case-study-3',
  fileName: 'flowsheets.fig',
  title: 'Flowsheets – eClinicalWorks',
  product: 'Flowsheets',
  company: 'eClinicalWorks',
  accent: '#14ae5c',
  subtitle: 'Transforming clinical data management through intuitive design.',
  description:
    'A redesigned Flowsheets window that improved visibility of patient progress, streamlined documentation, and enhanced provider workflows through a modernized UI.',
  tags: ['Healthcare UX', 'Workflow Optimization', 'EHR Usability', 'Interface Redesign'],
  heroImage: {
    src: 'https://images.unsplash.com/photo-1698306642516-9841228dcff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcGF0aWVudCUyMG1vbml0b3JpbmclMjBmbG93c2hlZXQlMjBpbnRlcmZhY2UlMjBjbGluaWNhbCUyMGRhdGF8ZW58MXx8fHwxNzU4OTgwNzIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Healthcare flowsheets interface showing patient monitoring data with clinical design elements',
  },
  heroStat: { label: 'Efficiency', value: '+35%' },

  contextParagraphs: [
    'At eClinicalWorks, the existing Flowsheets interface presented significant usability challenges that hindered clinical efficiency and provider satisfaction in day-to-day healthcare operations.',
    'The goal was to redesign the Flowsheets window to improve visual hierarchy, enhance navigation patterns, and integrate essential workflow features to streamline provider tasks.',
  ],
  stats: [
    { value: '2024', unit: 'Year', title: 'Project Completed', note: '6 months duration', progress: 100 },
    { value: '6', unit: 'Team', title: 'Provider Research', note: '6-person core team', progress: 100 },
    { value: '12', unit: 'Tests', title: 'Provider Validation', note: '95% positive feedback', progress: 95 },
    {
      value: '+', unit: 'Impact', title: 'Key Impact Areas', note: '', progress: 90,
      subMetrics: [
        { label: 'Visual Clarity', value: 'Enhanced', progress: 90 },
        { label: 'Workflow Efficiency', value: 'Improved', progress: 85 },
        { label: 'Provider Satisfaction', value: 'High', progress: 95 },
      ],
    },
  ],

  teamIntro:
    'This was a design-focused project with close collaboration between UX design, development, and clinical stakeholder teams.',
  role: {
    title: 'UX Designer',
    activities: [
      'Led interface redesign and visual hierarchy improvements',
      'Conducted provider feedback sessions and workflow analysis',
      'Created prototypes and design specifications',
      'Collaborated on usability testing and iteration',
    ],
  },
  teamGroups: [
    { heading: 'Management & Research', items: ['Brian Prue – Manager & Researcher', 'Morgan Compart – Business Goals & Task Alignment'] },
    { heading: 'Development Team', items: ['Bharat Kumar, Kunal Wagh, Parth Devani, Spencer Lederer'] },
    { heading: 'Clinical Stakeholders', items: ['Healthcare providers and clinical workflow experts'] },
  ],

  challengeIntro: 'Healthcare providers and clinical stakeholders highlighted three major interface issues:',
  challenges: [
    {
      title: 'Poor Visual Hierarchy',
      subtitle: 'Cluttered data presentation',
      description: 'Dense table layout made it difficult to scan patient data efficiently.',
      impact: 'Result: Providers struggled to find critical information quickly during care.',
      stat: 'Dense',
      statLabel: 'Layout',
    },
    {
      title: 'Inefficient Navigation',
      subtitle: 'Cumbersome interaction patterns',
      description: 'Multiple clicks required to access common actions and favorites.',
      impact: 'Result: Slowed clinical workflows and increased task completion time.',
      stat: 'Multiple',
      statLabel: 'Clicks',
    },
    {
      title: 'Limited Functionality',
      subtitle: 'Missing workflow features',
      description: 'Lack of integrated actions and favorites made common tasks cumbersome.',
      impact: 'Result: Providers had to switch between multiple windows frequently.',
      stat: 'Missing',
      statLabel: 'Features',
    },
  ],
  combinedImpact: [
    { value: 'Poor', label: 'Visual Hierarchy' },
    { value: 'Slow', label: 'Navigation Patterns' },
    { value: 'Limited', label: 'Workflow Features' },
  ],

  researchIntro: 'To ensure the new design addressed real-world clinical needs, we conducted:',
  researchMethods: [
    'Provider feedback sessions across multiple specialties',
    'Workflow mapping of current flowsheet usage patterns',
    'User story collection from clinical stakeholders',
    'Benchmarking against modern EHR interface standards',
  ],
  keyInsight: {
    quote:
      '"I need Flowsheets to show me patient progress clearly and let me act quickly without jumping between screens."',
    cite: '– Healthcare Provider',
  },
  researchImage: {
    src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVhbSUyMG1lZXRpbmclMjByZXNlYXJjaCUyMHNlc3Npb258ZW58MXx8fHwxNTc3MTAwNzcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Healthcare team meeting and provider research session in clinical setting',
  },

  processIntro: 'We followed a structured design methodology:',
  designPhases: [
    { title: 'Discovery', description: 'Analyzed workflows and collected provider feedback on interface issues' },
    { title: 'Define', description: 'Identified opportunities for visual clarity, navigation efficiency, and favorites' },
    { title: 'Ideate', description: 'Explored solutions for table layout, action integration, and workflow optimization' },
    { title: 'Prototype', description: 'Built Figma prototypes for improved UI and enhanced user workflows' },
    { title: 'Test & Iterate', description: 'Validated designs with providers and refined for clinical workflows' },
  ],

  solutions: [
    {
      title: 'Redesigned Table Layout',
      description: 'Improved spacing, typography, and visual hierarchy for better readability',
      impact: 'Enhanced data scanning and reduced cognitive load for providers',
      result: 'Clearer patient data presentation',
    },
    {
      title: 'Integrated Action Buttons',
      description: 'Embedded common actions directly within the flowsheet interface',
      impact: 'Streamlined workflows by reducing navigation overhead',
      result: 'Faster access to critical functions',
    },
    {
      title: 'Favorites & Quick Access',
      description: 'Added favoriting system for frequently used flowsheets and quick filters',
      impact: 'Personalized experience tailored to provider preferences',
      result: 'Improved efficiency for routine tasks',
    },
    {
      title: 'Enhanced Usability Features',
      description: 'Text wrapping, consistent icons, and improved visual feedback',
      impact: 'Better overall user experience and reduced learning curve',
      result: 'More intuitive interface design',
    },
  ],

  impactIntro: 'The redesigned Flowsheets interface was validated through provider feedback and testing:',
  impactMetrics: [
    { value: 'Enhanced', label: 'visual clarity and readability' },
    { value: 'Improved', label: 'workflow efficiency' },
    { value: 'Positive', label: 'provider feedback' },
    { value: 'Better', label: 'clinical workflows' },
  ],
  feedbackHeading: 'Provider Feedback',
  feedback: [
    { quote: '"The redesigned table layout makes it so much easier to quickly scan patient data during rounds."', cite: '– Primary Care Physician' },
    { quote: '"Having favorites and integrated actions saves me so much time. Much more efficient workflow."', cite: '– Nurse Practitioner' },
    { quote: '"The improved UI makes documentation feel less cumbersome. Great usability improvements."', cite: '– Specialist Provider' },
  ],

  keyLearnings: [
    { title: 'Clinical context is paramount', description: 'Healthcare interfaces must prioritize patient safety and clinical efficiency over aesthetic preferences.' },
    { title: 'Incremental improvements matter', description: 'Small UI enhancements can significantly impact daily workflows when compounded across multiple users.' },
    { title: 'Provider feedback drives success', description: 'Direct input from clinicians ensures solutions address real workflow pain points effectively.' },
  ],
  futureOpportunities: [
    { title: 'Smart Data Insights', description: 'AI-powered suggestions for workflow optimization based on usage patterns' },
    { title: 'Mobile Responsiveness', description: 'Optimized interface for tablet and mobile access during bedside care' },
    { title: 'Advanced Filtering', description: 'Enhanced search and filter capabilities for complex patient data queries' },
  ],

  prev: { id: 'case-study-2', label: 'RBAC' },
  next: { id: 'case-study-1', label: 'Analytics Central' },
}
