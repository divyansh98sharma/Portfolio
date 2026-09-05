import { lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './components/ThemeProvider'
import { Router, useRouter } from './components/Router'
import { HomePage } from './components/HomePage'
import { caseStudyContent } from './data/case-studies'
import { caseStudies } from './data/caseStudies'
import { useDocumentMeta } from './hooks/useDocumentMeta'

import { Footer } from './components/Footer'
import { LayersProvider } from './components/chrome/LayersContext'
import { FigmaTopBar } from './components/chrome/FigmaTopBar'
import { LayersPanel } from './components/chrome/LayersPanel'
import { StatusBar } from './components/chrome/StatusBar'
import { ToolButtons } from './components/chrome/ToolButtons'
import { ToolEffects } from './components/chrome/tools/ToolEffects'
import { ZoomCanvas } from './components/chrome/ZoomCanvas'
import { BootLoader } from './components/chrome/BootLoader'
import { MultiplayerCursors } from './components/chrome/MultiplayerCursors'
import { WalkthroughTourProvider } from './components/chrome/WalkthroughTour'
import { SkeletonLoader } from './components/SkeletonLoader'
import { useMediaQuery } from './hooks/useMediaQuery'
import { useReducedMotion } from './hooks/useReducedMotion'
import { TABLET_CHROME_QUERY } from './lib/chrome'

// Secondary routes are code-split; the skeleton shows while a chunk loads.
const AllCaseStudies = lazy(() =>
  import('./components/AllCaseStudies').then((m) => ({ default: m.AllCaseStudies }))
)
const CaseStudyLayout = lazy(() =>
  import('./components/case-studies/CaseStudyLayout').then((m) => ({ default: m.CaseStudyLayout }))
)
const AboutPage = lazy(() =>
  import('./components/AboutPage').then((m) => ({ default: m.AboutPage }))
)
// Pulls in the Firebase SDK, so it's kept out of the main bundle — only
// desktop/tablet gets the comment tool at all (see hasCanvasChrome below).
const CommentTool = lazy(() =>
  import('./components/chrome/tools/CommentTool').then((m) => ({ default: m.CommentTool }))
)
// Same lazy-loading reasoning as CommentTool, but shown on every device
// since the visitor prompt/avatar-stack isn't canvas-chrome-specific.
const NameCapturePrompt = lazy(() =>
  import('./components/chrome/NameCapturePrompt').then((m) => ({ default: m.NameCapturePrompt }))
)
// Same lazy-loading reasoning as NameCapturePrompt — shown on every device.
const AiChat = lazy(() => import('./components/chrome/AiChat').then((m) => ({ default: m.AiChat })))
const StickerTool = lazy(() =>
  import('./components/chrome/tools/StickerTool').then((m) => ({ default: m.StickerTool }))
)
const StickerPalette = lazy(() =>
  import('./components/chrome/StickerPalette').then((m) => ({ default: m.StickerPalette }))
)

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
}

const DEFAULT_DESCRIPTION =
  'UX Designer portfolio of Divyansh Sharma. Crafting meaningful digital experiences through research-driven design, turning complex problems into intuitive solutions.'

function AppContent() {
  const { currentPage } = useRouter()
  const hasCanvasChrome = useMediaQuery(TABLET_CHROME_QUERY)
  const reducedMotion = useReducedMotion()

  const summary = caseStudies.find((s) => s.id === currentPage)
  useDocumentMeta(
    currentPage === 'all-case-studies'
      ? {
          title: 'All Case Studies · Divyansh Sharma - UX Designer Portfolio',
          description: 'Browse every UX case study by Divyansh Sharma — healthcare, enterprise, and dashboard design work.',
          path: '/all-case-studies',
        }
      : currentPage === 'about'
      ? {
          title: 'About Divyansh Sharma — Healthcare & Enterprise UX Designer',
          description:
            'Divyansh Sharma is a senior UX designer at eClinicalWorks with 5+ years across healthcare, AI, and enterprise software — ex-Peak.ai, ex-UiPath, Northeastern University.',
          path: '/about',
        }
      : summary
        ? {
            title: `${summary.title} · Divyansh Sharma`,
            description: summary.description,
            image: summary.image,
            path: `/${currentPage}`,
          }
        : {
            title: 'Divyansh Sharma - UX Designer Portfolio',
            description: DEFAULT_DESCRIPTION,
            path: '/',
          }
  )

  const renderMainContent = () => {
    const study = currentPage in caseStudyContent ? caseStudyContent[currentPage as keyof typeof caseStudyContent] : undefined
    return (
      <motion.div key={currentPage} initial="hidden" animate="visible" exit="exit" variants={pageVariants}>
        {study ? (
          <CaseStudyLayout data={study} />
        ) : currentPage === 'all-case-studies' ? (
          <AllCaseStudies />
        ) : currentPage === 'about' ? (
          <AboutPage />
        ) : (
          <HomePage />
        )}
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-background focus:px-4 focus:py-2 focus:rounded-md focus:ring-2 focus:ring-ring focus:text-foreground focus:shadow-lg"
      >
        Skip to main content
      </a>
      <FigmaTopBar />
      <LayersPanel />
      {hasCanvasChrome && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
          <ToolButtons />
        </div>
      )}
      {hasCanvasChrome && (
        <Suspense fallback={null}>
          <StickerPalette />
        </Suspense>
      )}
      <main
        id="main-content"
        tabIndex={-1}
        className="canvas-dots relative min-h-screen pt-20 pb-10 md:pb-24 lg:pl-[272px]"
      >
        <ZoomCanvas>
          <AnimatePresence mode="wait">
            <Suspense fallback={<SkeletonLoader />}>{renderMainContent()}</Suspense>
          </AnimatePresence>
          <Footer />
          {hasCanvasChrome && (
            <Suspense fallback={null}>
              <CommentTool />
            </Suspense>
          )}
          {hasCanvasChrome && (
            <Suspense fallback={null}>
              <StickerTool />
            </Suspense>
          )}
        </ZoomCanvas>
      </main>
      <StatusBar />
      {hasCanvasChrome && <ToolEffects />}
      {hasCanvasChrome && !reducedMotion && <MultiplayerCursors />}
      <BootLoader />
      {/* Bottom-left: first-time name-capture prompt. */}
      <div className="pointer-events-none fixed bottom-4 left-4 z-[60] flex flex-col items-start gap-3">
        <Suspense fallback={null}>
          <NameCapturePrompt />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <AiChat />
      </Suspense>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <LayersProvider>
        <Router>
          <WalkthroughTourProvider>
            <AppContent />
          </WalkthroughTourProvider>
        </Router>
      </LayersProvider>
    </ThemeProvider>
  )
}
