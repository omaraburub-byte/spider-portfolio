'use client'

import { ThemeProvider } from '@/components/providers/ThemeProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Preloader from '@/components/sections/Preloader'
import CursorTrail from '@/components/effects/CursorTrail'
import HoverSense from '@/components/effects/HoverSense'
import { usePathname } from 'next/navigation'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Check for all possible 404 path variations
  const is404 = pathname === '/404' || 
                pathname === '/not-found' || 
                pathname?.includes('/404') || 
                pathname?.includes('/not-found')

  console.log('Current pathname:', pathname) // Add this to debug

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {is404 ? (
        // 404 page - just the content
        <div className="min-h-screen">
          {children}
        </div>
      ) : (
        // Normal page with all the goodies
        <>
          <Preloader />
          <CursorTrail />
          <HoverSense />
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