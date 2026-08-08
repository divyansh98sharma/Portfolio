import type { CaseStudyContent } from './types'

export const fileManager: CaseStudyContent = {
  id: 'case-study-4',
  fileName: 'file-manager.fig',
  title: 'File Manager – Peak.ai',
  product: 'File Manager',
  company: 'Peak.ai',
  accent: '#0fb5ae',
  subtitle: 'Turning a bare AWS upload box into a real, browsable file manager for the Peak platform.',
  description:
    'A ground-up file management experience for Peak.ai — folders, previews, and real file operations inside the platform, replacing a workflow that forced users into AWS or a full data-feed pipeline just to look at a file.',
  tags: ['Enterprise UX', 'Data Platform', 'Information Architecture', 'Multi-Tenant Security'],
  heroImage: {
    src: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByb29tJTIwY2xvdWQlMjBzdG9yYWdlJTIwZGF0YXxlbnwxfHx8fDE3NTg5ODA3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Server racks representing cloud file storage infrastructure',
  },
  heroStat: { label: 'Max File Size', value: '8GB' },

  contextParagraphs: [
    "The Peak platform's file upload was, at best, a formality. Users could upload files two ways — direct/ad-hoc upload, or a signed URL for external customers sending files in — but once a file landed, there was nothing to do with it. No browsing, no preview, no organization.",
    "To actually look at an uploaded file, a user had to log into AWS directly and pull it down — not possible at all for external customers on Peak-managed storage tenants. Even viewing a simple data file inside the platform meant setting up a full file feed and querying it through the SQL explorer once ingested: a multi-step, multi-tool detour for what should have been a single click.",
  ],
  stats: [
    { value: '18', unit: 'Stories', title: 'User Stories Scoped', note: 'Covering navigation, folder ops, file ops, and API access', progress: 100 },
    { value: '7', unit: 'Formats', title: 'Previewable In-Platform', note: 'CSV, PSV, TSV, XLS/XLSX, TXT, XML, JSON', progress: 100 },
    { value: '2', unit: 'Personas', title: 'User Groups Served', note: 'Peak-side (data science, CSM) and client-side (data science, support, CXOs, analysts)', progress: 100 },
    {
      value: '+', unit: 'Impact', title: 'Key Impact Areas', note: '', progress: 90,
      subMetrics: [
        { label: 'AWS Console Access', value: 'Eliminated', progress: 100 },
        { label: 'Tenant Isolation', value: 'Enforced at API layer', progress: 100 },
        { label: 'Basic File Viewing', value: 'No pipeline required', progress: 95 },
      ],
    },
  ],

  teamIntro:
    'Designed for two distinct audiences at once — Peak-side teams who manage tenant data day to day, and client-side users who only touch the platform to check on their own files.',
  role: {
    title: 'UX Designer',
    activities: [
      'Defined the information architecture — folders, breadcrumbs, sortable columns, pagination',
      'Specified interaction patterns across all 18 user stories, from upload progress to delete confirmations',
      'Worked through tenant-isolation and permissions-inheritance requirements with engineering and security',
      'Scoped system-folder behavior (Uploads, Datascience) so legacy ad-hoc files migrated without breaking anything',
    ],
  },
  teamGroups: [
    { heading: 'Peak-side personas', items: ['Data scientists', 'CSM team members'] },
    { heading: 'Client-side personas', items: ['Data scientists', 'Support teams', 'CXOs', 'Business analysts'] },
  ],

  challengeIntro: 'Three problems, all stemming from the same root cause — the platform never gave users a real place to manage their files:',
  challenges: [
    {
      title: 'No Way to Browse or Explore',
      subtitle: 'Files vanished after upload',
      description: 'Once uploaded, a file had no home — no folders, no list, no way to see what was already there before starting new work.',
      impact: 'Result: users had to log into AWS directly, which external customers on managed storage tenants could not do at all.',
      stat: 'AWS-only',
      statLabel: 'File Access',
    },
    {
      title: 'Viewing a File Meant Building a Pipeline',
      subtitle: 'Wildly disproportionate friction',
      description: 'To see the contents of one CSV, a user had to configure a file feed, ingest it, then query it through the SQL explorer.',
      impact: 'Result: a basic "let me look at my data" need became a multi-tool, multi-step project.',
      stat: 'Multi-step',
      statLabel: 'Just to Preview',
    },
    {
      title: 'The Upload Box Did Nothing Else',
      subtitle: 'No rename, move, organize, or download',
      description: 'The existing ad-hoc upload interface was a dead end — files went in, and nothing else was possible from there.',
      impact: 'Result: any file operation beyond the initial upload required engineering or support intervention.',
      stat: 'Upload-only',
      statLabel: 'Prior Capability',
    },
  ],
  combinedImpact: [
    { value: 'AWS-Gated', label: 'File Access' },
    { value: 'Pipeline-Gated', label: 'File Viewing' },
    { value: 'Dead-End', label: 'Upload Interface' },
  ],

  researchIntro: 'This was a requirements-driven design, not a formal usability study — discovery centered on security constraints and the two persona groups the feature had to serve equally:',
  researchMethods: [
    'Mapped both persona groups (Peak-side vs. client-side) against what each actually needed to do with their files',
    'Worked through tenant-isolation requirements with security — no cross-tenant access by any API path',
    'Audited the existing ad-hoc upload flow to identify exactly which files needed migrating into the new system folders',
    'Scoped Data Sources permission inheritance so File Manager introduced no second, parallel access-control system',
  ],
  keyInsight: {
    quote: '"Ensure Data Sources permissions are mapped with File Manager and no users can access the File Manager without Data Sources Permissions."',
    cite: '— security requirement, from the PRD',
  },
  researchImage: {
    src: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwcmV2aWV3aW5nJTIwZGF0YSUyMHN0cnVjdHVyZSUyMHdoaXRlYm9hcmR8ZW58MXx8fHwxNzU4OTgwNzIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Team reviewing a data/folder structure on a whiteboard',
  },

  processIntro: 'The 18 user stories grouped naturally into four phases:',
  designPhases: [
    { title: 'Navigation & Discovery', description: 'New "File Manager" entry point, root/system folders, breadcrumb browsing — replacing the old AdHoc upload link entirely' },
    { title: 'Folder Operations', description: 'Add, rename, and delete for non-system folders, with system folders (Uploads, Datascience) locked to uploads only' },
    { title: 'File Operations', description: 'Upload with progress and cancellation, in-platform preview, download, rename, delete, copy-path, and move' },
    { title: 'Integration & Access', description: 'File feed explorer integration, list/grid view toggle, Excel feed support, and documented API read/write access per tenant' },
  ],

  solutions: [
    {
      title: 'In-Platform File Browser',
      description: 'A real folder tree with breadcrumb navigation, sortable columns, and previews for 7 file formats — no AWS console, no data-feed detour',
      impact: 'Collapses what used to require AWS access or a full ingestion pipeline into a single in-platform view',
      result: 'External customers on managed storage tenants can finally see their own files',
    },
    {
      title: 'Tenant-Isolated Access Model',
      description: 'File Manager inherits permissions directly from existing Data Sources rather than introducing a second access-control system',
      impact: 'No user can reach the File Manager without the Data Sources permissions they already have — and no tenant can reach another tenant\'s files',
      result: 'Security enforced at the API layer, not just hidden in the UI',
    },
  ],

  impactIntro: "Shipped as scoped in the PRD — impact here is what the feature actually replaced, not a measured usage number (those weren't tracked for this write-up):",
  impactMetrics: [
    { value: 'Eliminated', label: 'need for direct AWS console access to browse files' },
    { value: 'Eliminated', label: 'data-feed-and-SQL-explorer detour for basic file viewing' },
    { value: '7 formats', label: 'previewable without leaving the platform' },
    { value: 'API access', label: 'documented and available per tenant, read and write' },
  ],
  feedbackHeading: 'Constraints That Shaped the Design',
  feedback: [
    {
      quote: '"Ensure only data for that tenant is exposed to that tenant and no data from another tenant is accessible cross-tenant."',
      cite: '— security requirement, from the PRD',
    },
    {
      quote: '"Are you sure you want to delete this file? This file may be consumed in some of the data feeds."',
      cite: '— delete-confirmation copy, scoped directly for files already in use',
    },
    {
      quote: '"A user\'s session remains active while file upload is in progress."',
      cite: '— assumption that shaped the upload progress/cancellation design',
    },
  ],

  keyLearnings: [
    { title: 'Inherit permissions, don\'t reinvent them', description: 'Mapping File Manager onto existing Data Sources permissions avoided building and maintaining a second, parallel access-control system.' },
    { title: 'Tenant isolation is an API concern, not a UI one', description: 'Hiding another tenant\'s files in the interface means nothing if the API will still return them — enforcement had to live at that layer.' },
    { title: 'Basic operations deserve basic paths', description: 'Forcing a full data-feed pipeline onto a simple "view this file" need was the single biggest source of friction in the old flow.' },
  ],
  futureOpportunities: [
    { title: 'File Versioning & Activity Tracking', description: 'Track changes and who touched what, beyond the MVP\'s single-version model' },
    { title: 'Multiple Asynchronous Uploads', description: 'Let large uploads continue in the background instead of blocking on one at a time' },
    { title: 'Drag-and-Drop Move & Multi-Select Delete', description: 'Faster bulk operations, deferred out of the MVP scope' },
  ],

  prev: { id: 'case-study-2', label: 'RBAC' },
  next: { id: 'case-study-3', label: 'Flowsheets' },
}
