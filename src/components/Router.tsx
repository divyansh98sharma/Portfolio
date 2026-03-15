import { createContext, useContext, useState, ReactNode } from 'react'

export type Page = 'home' | 'case-study-1' | 'case-study-2' | 'all-case-studies'

type RouterContextType = {
  currentPage: Page
  navigateTo: (page: Page) => void
}

const RouterContext = createContext<RouterContextType | undefined>(undefined)

export function Router({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const navigateTo = (page: Page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <RouterContext.Provider value={{ currentPage, navigateTo }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (context === undefined) {
    throw new Error('useRouter must be used within a Router')
  }
  return context
}