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
    <div className="relative w-32 p-1 rounded-lg bg-card border-2 border-spider-gray">
      {/* Buttons container */}
      <div className="relative flex">
        {/* Sliding background - positioned absolutely within the flex container */}
        <motion.div
          className="absolute bg-spider-red rounded-md"
          initial={false}
          animate={{
            x: `${currentIndex * 100}%`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{
            width: 'calc(100% / 3)',
            height: '100%',
          }}
        />
        
        {themes.map(({ value, icon: Icon, label }) => (
          <motion.button
            key={value}
            onClick={() => setTheme(value)}
            className={`relative flex-1 p-2 rounded-md transition-colors z-10 ${
              theme === value
                ? 'text-white'
                : 'text-muted-foreground hover:text-spider-red'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${label} theme`}
          >
            <div className="flex justify-center">
              <Icon size={18} />
            </div>
          </motion.button>
        ))}
      </div>
      
      {/* Comic dot pattern */}
      <div className="absolute inset-0 rounded-lg opacity-5 comic-dots" />
    </div>
  )
}