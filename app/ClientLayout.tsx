// app/ClientLayout.tsx
'use client'

import { ThemeProvider } from '@/components/providers/ThemeProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Preloader from '@/components/sections/Preloader'
import CursorTrail from '@/components/effects/CursorTrail'
import HoverSense from '@/components/effects/HoverSense'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [is404, setIs404] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIs404(pathname === '/404' || pathname === '/not-found')
  }, [pathname])

  // Define pages that should NOT show the full layout with header/footer/preloader
  const isSpecialPage = pathname === '/landing' || 
                       pathname === '/soul' || 
                       pathname === '/404' || 
                       pathname === '/not-found' ||
                       pathname?.startsWith('/oi')

  // Check if we're on the spider page to force show preloader
  const isSpiderPage = pathname === '/spider'

  // Always render the same component structure
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {isSpecialPage ? (
        // For special pages, render children without the full layout
        <div className="min-h-screen">
          {children}
        </div>
      ) : (
        // For all other pages (including /spider), show the full layout with preloader
        <>
          {/* Force show preloader on spider page - but only when mounted */}
          {mounted && <Preloader forceShow={isSpiderPage} />}
          {mounted && <CursorTrail />}
          {mounted && <HoverSense />}
          <div className="min-h-screen flex flex-col overflow-clip">
            <Header />
            <main className="flex-1 relative z-10">
              {children}
            </main>
            <Footer />
          </div>
        </>
      )}
    </ThemeProvider>
  )
}