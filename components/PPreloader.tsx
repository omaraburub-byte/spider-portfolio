// components/PPreloader.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface PreloaderProps {
  isLightMode: boolean
  showPreloader: boolean
}

export default function PPreloader({ isLightMode, showPreloader }: PreloaderProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const words = ['OMAR', 'ARTIST', 'ARCHITECT', 'SPIDER', 'SOUL']

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }, 400)

    return () => clearInterval(wordInterval)
  }, [])

  return (
    <AnimatePresence>
      {showPreloader && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`fixed inset-0 z-[100] flex items-center justify-center ${
            isLightMode ? 'bg-white' : 'bg-[#0A0A0A]'
          }`}
        >
          <div className="relative w-full max-w-6xl mx-auto px-8">
            {/* Animated orbs */}
            <motion.div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full ${
                isLightMode ? 'bg-[#FFE500]/10' : 'bg-[#FFE500]/10'
              }`}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "loop",
                ease: "easeInOut" 
              }}
              style={{ filter: 'blur(60px)' }}
            />
            
            {/* Top line */}
            <motion.div 
              className={`absolute top-0 left-0 right-0 h-[2px] ${
                isLightMode ? 'bg-[#FFE500]' : 'bg-[#FFE500]/40'
              }`}
              initial={{ scaleX: 0, originX: 1 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            
            {/* Bottom line */}
            <motion.div 
              className={`absolute bottom-0 left-0 right-0 h-[2px] ${
                isLightMode ? 'bg-[#FFE500]' : 'bg-[#FFE500]/40'
              }`}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            />

            {/* Main content */}
            <div className="relative py-20">
              {/* Left text */}
              <motion.div
                className="absolute left-0 bottom-0"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className={`text-xs font-mono tracking-[0.3em] ${
                  isLightMode ? 'text-black/40' : 'text-white/30'
                }`}>
                  DIMENSIONAL PORTAL
                </span>
              </motion.div>

              {/* Right text */}
              <motion.div
                className="absolute right-0 bottom-0"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span className={`text-xs font-mono tracking-[0.3em] ${
                  isLightMode ? 'text-black/40' : 'text-white/30'
                }`}>
                  {new Date().getFullYear()}
                </span>
              </motion.div>

              {/* Main text with word changer - CLEAN */}
              <div className="overflow-hidden">
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-center"
                >
                  <motion.h1
                    key={currentWordIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter whitespace-nowrap ${
                      isLightMode ? 'text-black' : 'text-white'
                    }`}
                  >
                    {words[currentWordIndex]}
                  </motion.h1>
                </motion.div>
              </div>

              {/* Yellow shadow */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-center"
                >
                  <h1 className={`text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter whitespace-nowrap ${
                    isLightMode ? 'text-[#FFE500]' : 'text-[#FFE500]/40'
                  }`}>
                    {words[currentWordIndex]}
                  </h1>
                </motion.div>
              </div>

              {/* Black outline */}
              {isLightMode && (
                <div className="absolute inset-0 -z-20 overflow-hidden">
                  <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-center"
                  >
                    <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter whitespace-nowrap text-black/30">
                      {words[currentWordIndex]}
                    </h1>
                  </motion.div>
                </div>
              )}

              {/* Corner accents - simplified */}
              <div className="absolute top-0 left-0 w-20 h-20">
                <motion.div 
                  className={`absolute top-0 left-0 w-12 h-[2px] ${
                    isLightMode ? 'bg-[#FFE500]' : 'bg-[#FFE500]/40'
                  }`}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
                <motion.div 
                  className={`absolute top-0 left-0 w-[2px] h-12 ${
                    isLightMode ? 'bg-[#FFE500]' : 'bg-[#FFE500]/40'
                  }`}
                  initial={{ scaleY: 0, originY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </div>
              <div className="absolute top-0 right-0 w-20 h-20">
                <motion.div 
                  className={`absolute top-0 right-0 w-12 h-[2px] ${
                    isLightMode ? 'bg-[#FFE500]' : 'bg-[#FFE500]/40'
                  }`}
                  initial={{ scaleX: 0, originX: 1 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                />
                <motion.div 
                  className={`absolute top-0 right-0 w-[2px] h-12 ${
                    isLightMode ? 'bg-[#FFE500]' : 'bg-[#FFE500]/40'
                  }`}
                  initial={{ scaleY: 0, originY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                />
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-20">
                <motion.div 
                  className={`absolute bottom-0 left-0 w-12 h-[2px] ${
                    isLightMode ? 'bg-[#FFE500]' : 'bg-[#FFE500]/40'
                  }`}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                />
                <motion.div 
                  className={`absolute bottom-0 left-0 w-[2px] h-12 ${
                    isLightMode ? 'bg-[#FFE500]' : 'bg-[#FFE500]/40'
                  }`}
                  initial={{ scaleY: 0, originY: 1 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                />
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20">
                <motion.div 
                  className={`absolute bottom-0 right-0 w-12 h-[2px] ${
                    isLightMode ? 'bg-[#FFE500]' : 'bg-[#FFE500]/40'
                  }`}
                  initial={{ scaleX: 0, originX: 1 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                />
                <motion.div 
                  className={`absolute bottom-0 right-0 w-[2px] h-12 ${
                    isLightMode ? 'bg-[#FFE500]' : 'bg-[#FFE500]/40'
                  }`}
                  initial={{ scaleY: 0, originY: 1 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}