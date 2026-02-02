'use client'

import { Moon, Sun, Contrast } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Contrast, label: 'System' },
  ]

  const currentIndex = themes.findIndex(t => t.value === theme)

  return (
    <div className="relative flex items-center space-x-1 p-1 rounded-full bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
      {themes.map(({ value, icon: Icon, label }) => (
        <motion.button
          key={value}
          onClick={() => setTheme(value)}
          className={`p-2 rounded-full transition-all ${
            theme === value
              ? 'bg-white dark:bg-gray-900 text-spider-red shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:text-spider-red dark:hover:text-spider-red'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch to ${label} theme`}
        >
          <Icon size={18} />
        </motion.button>
      ))}
      
      {/* Sliding indicator */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-spider-red/20 to-spider-blue/20"
        initial={false}
        animate={{
          x: `${currentIndex * 100}%`,
          width: '33.333%',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </div>
  )
}