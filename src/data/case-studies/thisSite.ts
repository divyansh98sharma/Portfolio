import type { CaseStudyContent } from './types'

export const thisSite: CaseStudyContent = {
  id: 'case-study-4',
  fileName: 'this-site.fig',
  title: 'This Site — Portfolio as a Live Product',
  product: 'This Site',
  company: 'Self-Directed',
  accent: '#f2994a',
  subtitle: 'Designing and building a Figma-native portfolio, in the open, with an AI pair.',
  description:
    "A portfolio that behaves like the tool it's about — a canvas, layers, real tools, live comments and reactions — built through iterative, AI-paired engineering rather than a template.",
  tags: ['AI-Assisted Development', 'Realtime / Firestore', 'Systems Thinking', 'Self-Directed'],
  heroImage: {
    src: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwZWRpdG9yJTIwc2NyZWVuJTIwZGFyayUyMHRoZW1lfGVufDF8fHx8MTc1ODk4MDcyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Dark-themed code editor screen, representing the engineering side of this build',
  },
  heroStat: { label: 'Live Features', value: '6' },

  contextParagraphs: [
    'Most portfolios describe design work. This one does design work — the whole site is built as a living Figma file: a canvas you scroll through, frames with real layer panels, tools that actually do something, and comments, reactions, and stickers that anyone visiting can leave, live, on the page.',
    "Instead of hand-coding every feature solo, I built this iteratively with an AI pair — Claude, working directly in the codebase alongside me across many sessions. I stayed the designer and decision-maker; the AI handled implementation, caught edge cases I hadn't considered, and let me iterate on interaction details in real time instead of in a separate design tool.",
  ],
  stats: [
    { value: '6', unit: 'Features', title: 'Live Firestore Features', note: 'Comments, reactions, stickers, visitor stack, name-capture, walkthrough tour', progress: 100 },
    { value: '0', unit: 'Backend', title: 'Servers Managed', note: 'Firestore + security rules only, no custom backend', progress: 100 },
    { value: '2026', unit: 'Year', title: 'Ongoing', note: 'Actively iterated on, not a one-time build', progress: 80 },
    {
      value: '+', unit: 'Impact', title: 'Key Impact Areas', note: '', progress: 90,
      subMetrics: [
        { label: 'Craft Demonstrated', value: 'Live, not static', progress: 95 },
        { label: 'Dev Velocity', value: 'AI-paired', progress: 90 },
        { label: 'Privacy Honesty', value: 'Disclosed', progress: 100 },
      ],
    },
  ],

  teamIntro:
    'This was a self-directed project — sole designer and product owner, working iteratively with an AI engineering pair rather than a human dev team.',
  role: {
    title: 'Designer & Product Owner',
    activities: [
      'Set the FigJam-chrome concept and interaction model',
      'Made every UX and content call — the AI implemented, I decided',
      'Reviewed and tested every feature in-browser before shipping',
      'Wrote the privacy disclosure and scoped what to track and why',
    ],
  },
  teamGroups: [
    { heading: 'Engineering Partner', items: ['Claude (Anthropic) — iterative AI pairing across the build'] },
  ],

  challengeIntro: "Building a portfolio that's actually different from every other Figma-styled template raised three real problems:",
  challenges: [
    {
      title: 'Prove Craft, Not Just Describe It',
      subtitle: 'Static portfolios all make the same claims',
      description: 'Anyone can write "I care about interaction design" — very few portfolios actually let you interact with something live.',
      impact: 'Result: needed real, working tools (comment, sticker, move, draw) instead of decorative ones.',
      stat: 'Static',
      statLabel: 'The Norm',
    },
    {
      title: 'Real-Time Features, No Backend Team',
      subtitle: 'Solo, non-engineer-led build',
      description: 'Live comments, reactions, and a visitor stack all need a real-time backend — normally a multi-person engineering effort.',
      impact: 'Result: Firestore and security rules, no servers to manage, but real data-modeling and trust-model decisions.',
      stat: 'Solo',
      statLabel: 'Team Size',
    },
    {
      title: 'Keep the Metaphor From Becoming a Gimmick',
      subtitle: '"Portfolio as a Figma file" could easily be a novelty',
      description: "A FigJam-styled shell that doesn't actually work is worse than a plain page — it reads as a trick, not craft.",
      impact: 'Result: every chrome element (layers, tools, cursor) had to do something real or get cut.',
      stat: 'Real',
      statLabel: 'Bar Set',
    },
  ],
  combinedImpact: [
    { value: 'Live', label: 'Interactive Craft' },
    { value: 'Real-Time', label: 'Social Features' },
    { value: 'Honest', label: 'Chrome Metaphor' },
  ],

  researchIntro: "This case study doesn't have a client or formal user research — the \"research\" was iterative dogfooding: build, use it myself, watch what breaks, fix it.",
  researchMethods: [
    'Manual in-browser testing after every feature, via real click-throughs, not just code review',
    'Watching actual Firestore data (comments, stickers, visitor docs) to sanity-check the trust model',
    "Fixing UX bugs the same session they were found — e.g. a tour dialog overlapping its own spotlighted target",
    'Treating every visitor interaction as real user behavior worth checking, even at low traffic',
  ],
  keyInsight: {
    quote: '"If a feature isn\'t worth testing in a real browser before shipping, it isn\'t worth shipping."',
    cite: '— working principle for this build',
  },
  researchImage: {
    src: '/this-site-chrome.jpg',
    alt: "Screenshot of the site's own FigJam-style chrome — layers panel, tool buttons, and live visitor avatars, mid-build",
  },

  processIntro: 'The build layered up in phases, each one a real, shippable increment:',
  designPhases: [
    { title: 'Chrome Concept', description: 'Layers panel, tool buttons, boot loader, decorative multiplayer cursors, walkthrough tour — the "you\'re inside a Figma file" shell' },
    { title: 'Live Social Layer', description: 'Comments with threaded replies, emoji reactions, FigJam-style sticker stamps, a live visitor avatar stack, a landing name-capture prompt — all Firestore-backed, no auth' },
    { title: 'Polish & Bug Fixes', description: 'Timing fixes (the tour racing the boot animation), positioning fixes (dialogs overlapping their own spotlighted target), account migration' },
    { title: 'Privacy & Engagement Pass', description: "Self-hosted fonts, an honest disclosure of what's tracked and why, and this case study itself — the most recent phase" },
  ],

  solutions: [
    {
      title: 'FigJam-Style Chrome',
      description: 'A layers panel, real tool buttons (Select / Move / Hand / Draw / Comment / Sticker), and a boot-loader splash that all behave like their Figma namesakes',
      impact: 'Makes the "portfolio as a design file" premise actually true, not just styled to look true',
      result: 'Every chrome element does something — nothing is decorative-only except the multiplayer cursors, which are explicitly labeled as such in code',
    },
    {
      title: 'Anonymous, Live Social Layer',
      description: 'Comments, reactions, and sticker stamps that any visitor can leave — no login, no account, attributed by a self-chosen name',
      impact: 'Visitors interact with the portfolio instead of just reading it',
      result: 'A real-time collaborative surface built entirely on Firestore security rules, with no custom backend',
    },
  ],

  impactIntro: 'This is a living project, not a shipped-and-done one — impact here is about what shipped and how it holds up, not a client metric.',
  impactMetrics: [
    { value: '6', label: 'live Firestore-backed features' },
    { value: 'Zero', label: 'custom backend servers' },
    { value: 'Ongoing', label: 'iterated on every session, not frozen' },
    { value: 'Disclosed', label: 'privacy-honest about what is tracked' },
  ],
  feedbackHeading: 'Reflections on the AI-Paired Process',
  feedback: [
    {
      quote: '"The AI pair moved fast on implementation, but every interaction decision — what a sticker does when dragged, whether a tour should auto-play, how to word a privacy disclosure — stayed mine to make."',
      cite: '— Divyansh, on the process',
    },
    {
      quote: '"The most useful thing about pairing this way wasn\'t raw speed, it was that bugs got caught and fixed the same session they were found — real in-browser testing, not just code review."',
      cite: '— Divyansh, on the process',
    },
    {
      quote: "\"I'd recommend this workflow to any designer curious about it, with one caveat: you still have to know what good looks like. The AI doesn't replace taste.\"",
      cite: '— Divyansh, on the process',
    },
  ],

  keyLearnings: [
    { title: 'AI pairing changes velocity, not judgment', description: 'Implementation got dramatically faster; every UX call — what to build, how it should feel — still required the same design thinking as any other project.' },
    { title: 'Dogfooding is real research at small scale', description: 'Without a client or formal study, testing every feature myself in-browser, immediately, caught real bugs a code review alone would have missed.' },
    { title: 'Disclosure is part of the craft, not an afterthought', description: 'Adding live, anonymous tracking meant the honest thing to do was say so, plainly, in the footer — not bury it in a policy page nobody reads.' },
  ],
  futureOpportunities: [
    { title: 'Owner-Only Analytics View', description: "Add lightweight auth so engagement data (scroll depth, resume downloads) isn't publicly readable like the rest of the site" },
    { title: 'Moderation Tools', description: 'A way to remove an abusive comment without needing direct Firebase console access' },
    { title: 'SPA Fallback for Deep Links', description: "A 404.html for GitHub Pages so hard-refreshing a case-study URL doesn't 404" },
  ],

  prev: { id: 'case-study-3', label: 'Flowsheets' },
  next: { id: 'case-study-1', label: 'Analytics Central' },
}
