import { lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './components/ThemeProvider'
import { Router, useRouter } from './components/Router'
import { HomePage } from './components/HomePage'
import { caseStudyContent } from './data/case-studies'

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

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
}

function AppContent() {
  const { currentPage } = useRouter()
  const hasCanvasChrome = useMediaQuery(TABLET_CHROME_QUERY)
  const reducedMotion = useReducedMotion()

  const renderMainContent = () => {
    const study = caseStudyContent[currentPage]
    const key = study ? study.id : currentPage === 'all-case-studies' ? 'all-case-studies' : 'home'
    return (
      <motion.div key={key} initial="hidden" animate="visible" exit="exit" variants={pageVariants}>
        {study ? (
          <CaseStudyLayout data={study} />
        ) : currentPage === 'all-case-studies' ? (
          <AllCaseStudies />
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
        </ZoomCanvas>
      </main>
      <StatusBar />
      {hasCanvasChrome && <ToolEffects />}
      {hasCanvasChrome && !reducedMotion && <MultiplayerCursors />}
      <BootLoader />
      <Suspense fallback={null}>
        <NameCapturePrompt />
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
