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
  const is404 = pathname === '/404'

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