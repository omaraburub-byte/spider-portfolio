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
    // Check for 404 after mounting
    setIs404(pathname === '/404' || pathname === '/not-found' || pathname === '/oi')
  }, [pathname])

  // During SSR and initial hydration, render a minimal version
  if (!mounted) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen">
          {children}
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {is404 ? (
        <div className="min-h-screen">
          {children}
        </div>
      ) : (
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