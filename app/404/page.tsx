'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import SpiderLogo from '@/components/SpiderLogo'
import { useTheme } from 'next-themes'

export default function NotFoundPage() {
  const [isMobile, setIsMobile] = useState(false)
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Get current theme (considering system preference)
  const currentTheme = theme === 'system' ? systemTheme : theme

  // Dot colors based on theme
  const dotColor = mounted 
    ? (currentTheme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)')
    : 'rgba(0,0,0,0.15)' // default for SSR

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* DOTTED GRID BACKGROUND - Theme aware */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, 
            ${dotColor} 1px, 
            transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      ></div>
      
      {/* SECOND LAYER - Larger dots for depth */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, 
            ${dotColor} 1.5px, 
            transparent 1.5px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h1 className="font-barrio text-8xl md:text-9xl text-spider-red">404</h1>
          </motion.div>

          {/* Spinning Spider Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <SpiderLogo className={isMobile ? "w-20 h-20" : "w-24 h-24"} />
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <h2 className="font-barrio text-2xl md:text-3xl text-foreground mb-3">
              PAGE NOT FOUND
            </h2>
            <p className="font-montserrat text-muted-foreground max-w-md mx-auto whitespace-nowrap">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-block"
              >
                <div className="relative bg-spider-red text-white border-2 border-black dark:border-white rounded-lg px-6 py-3 flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                  <Home size={18} />
                  <span className="font-barrio text-sm">GO HOME</span>
                </div>
              </motion.div>
            </Link>

            <button onClick={() => window.history.back()}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-block"
              >
                <div className="relative bg-spider-blue text-white border-2 border-black dark:border-white rounded-lg px-6 py-3 flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                  <ArrowLeft size={18} />
                  <span className="font-barrio text-sm">GO BACK</span>
                </div>
              </motion.div>
            </button>

            <Link href="/#contact">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-block"
              >
                <div className="relative bg-white dark:bg-[#0A0A0A] border-2 border-spider-red text-spider-red rounded-lg px-6 py-3 flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                  <Search size={18} />
                  <span className="font-barrio text-sm">REPORT</span>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Simple dot decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex justify-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-spider-red/50"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-spider-blue/50"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-spider-red/50"></div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  )
}