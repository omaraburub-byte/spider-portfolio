'use client'

import { Moon, Sun, Contrast } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('light')
    else setTheme('light') // if system, default to light
  }

  const setSystemTheme = () => {
    setTheme('system')
  }

  const isSystem = theme === 'system'
  const isLight = theme === 'light'
  const isDark = theme === 'dark'

  return (
    <div className="relative flex items-center gap-2 p-1 rounded-lg bg-card border-2 border-spider-gray">
      {/* Light/Dark toggle button */}
      <motion.button
        onClick={toggleTheme}
        className="relative w-10 h-10 rounded-md bg-spider-red text-white overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isLight ? 'light' : 'dark'}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center w-full h-full"
          >
            {isLight ? <Sun size={18} /> : <Moon size={18} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* System button */}
      <motion.button
        onClick={setSystemTheme}
        className={`relative w-10 h-10 rounded-md transition-colors ${
          isSystem
            ? 'bg-spider-red text-white'
            : 'text-muted-foreground hover:text-spider-red'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Use system theme"
      >
        <div className="flex items-center justify-center w-full h-full">
          <Contrast size={18} />
        </div>
      </motion.button>
      
      {/* Comic dot pattern */}
      <div className="absolute inset-0 rounded-lg opacity-5 comic-dots pointer-events-none" />
    </div>
  )
}