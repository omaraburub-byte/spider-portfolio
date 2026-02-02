'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import SpiderLogo from '@/components/SpiderLogo'

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [dots, setDots] = useState(0)

  useEffect(() => {
    // Animate loading dots
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4)
    }, 500)

    // Hide preloader after 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
      clearInterval(dotInterval)
    }, 2500)

    return () => {
      clearTimeout(timer)
      clearInterval(dotInterval)
    }
  }, [])

  useEffect(() => {
    const handleKeyPress = () => setIsLoading(false)
    window.addEventListener('keydown', handleKeyPress)
    
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const loadingText = `Spider-Sense tingling${'.'.repeat(dots)}`

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          {/* Web lines radiating from center */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Radial web lines */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 h-px w-0 bg-gradient-to-r from-transparent via-spider-red to-transparent"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                  transformOrigin: 'left center',
                }}
                initial={{ width: 0 }}
                animate={{ width: '100vw' }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Concentric circles */}
            {[1, 2, 3].map((radius) => (
              <motion.div
                key={radius}
                className="absolute top-1/2 left-1/2 rounded-full border border-border/50"
                style={{
                  width: `${radius * 200}px`,
                  height: `${radius * 200}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  delay: radius * 0.2,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* Spider logo assembling */}
          <div className="relative z-10 mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 1.2,
                type: 'spring',
                damping: 12,
                stiffness: 100,
              }}
              className="relative"
            >
              {/* Outer web ring */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-40 h-40 border-2 border-spider-red/30 rounded-full" />
              </motion.div>

              {/* Spider logo */}
              <div className="w-40 h-40 flex items-center justify-center">
                <SpiderLogo className="w-32 h-32" />
              </div>

              {/* Pulsing effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-spider-red/10"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </div>

          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 text-center"
          >
            <div className="font-barrio text-2xl text-spider-red mb-2">
              OMAR ABURUB
            </div>
            <div className="font-montserrat text-foreground">
              {loadingText}
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, ease: 'linear' }}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-muted rounded-full overflow-hidden"
          >
            <div className="h-full bg-gradient-to-r from-spider-red to-spider-blue" />
          </motion.div>

          {/* Skip button (optional) */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1 }}
            onClick={() => setIsLoading(false)}
            className="absolute bottom-8 text-sm text-muted-foreground hover:text-spider-red transition-colors"
          >
            Press any key to skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}