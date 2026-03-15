# Divyansh Sharma — UX Designer Portfolio

Personal portfolio showcasing UX design work, case studies, and professional experience. Built with React, Vite, Tailwind CSS, and shadcn/ui.

## Features

- Responsive design (mobile-first)
- Light/dark theme toggle with system preference detection
- URL-based routing with browser back/forward support
- Accessible (WCAG AA): semantic HTML, keyboard navigation, focus indicators, reduced-motion support
- Typewriter text animation on hero section
- Scroll-triggered entrance animations on case studies
- Intersection Observer for lazy visibility

## Tech Stack

- **Framework:** React 18
- **Build:** Vite
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui (Radix primitives)
- **Icons:** Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Output goes to `build/`.

## Project Structure

```
src/
├── components/
│   ├── case-studies/    # Individual case study pages
│   ├── figma/           # Figma Make utilities (ImageWithFallback)
│   ├── icons/           # Custom SVG icon components
│   ├── ui/              # shadcn/ui primitives
│   ├── utils/           # Scroll and interaction helpers
│   ├── Header.tsx       # Sticky nav with mobile menu
│   ├── Hero.tsx         # Landing section with typewriter
│   ├── About.tsx        # Bio, photo, skills
│   ├── Experience.tsx   # Work history timeline
│   ├── CaseStudies.tsx  # Homepage case study cards
│   ├── AllCaseStudies.tsx
│   ├── Contact.tsx      # Social links and resume download
│   ├── Footer.tsx
│   ├── Router.tsx       # Lightweight URL-based router
│   ├── ThemeProvider.tsx
│   └── ScrollToTop.tsx
├── data/
│   └── caseStudies.ts   # Shared case study data
├── styles/
│   └── globals.css      # Theme tokens, animations, a11y
└── index.css            # Tailwind imports
```
