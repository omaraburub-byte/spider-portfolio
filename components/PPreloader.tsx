// components/PPreloader.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface PreloaderProps {
  isLightMode: boolean
  showPreloader: boolean
}

export default function PPreloader({ isLightMode, showPreloader }: PreloaderProps) {
  const bg = isLightMode ? '#F8F6F0' : '#0A0A0A'
  const primary = isLightMode ? '#0A0A0A' : '#F8F6F0'
  const accent = isLightMode ? '#D4A373' : '#E9C46A'
  
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (showPreloader) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 2
        })
      }, 50)
      
      return () => clearInterval(interval)
    } else {
      setProgress(0)
    }
  }, [showPreloader])

  const letters = ['O', 'm', 'a', 'r']
  
  return (
    <AnimatePresence mode="wait">
      {showPreloader && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: bg,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Background geometric elements */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.03 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: 'min(800px, 90vw)',
              height: 'min(800px, 90vw)',
              borderRadius: '50%',
              border: `2px solid ${primary}`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
          
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.05 }}
            transition={{ duration: 1.8, ease: 'easeOut', delay: 0.2 }}
            style={{
              position: 'absolute',
              width: 'min(600px, 70vw)',
              height: 'min(600px, 70vw)',
              borderRadius: '50%',
              border: `1px solid ${primary}`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Main content container */}
          <div style={{ position: 'relative', textAlign: 'center' }}>
            {/* Animated letters */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(4px, 1vw, 12px)' }}>
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ 
                    y: 100, 
                    opacity: 0,
                    rotateX: 90
                  }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    rotateX: 0,
                    transition: {
                      duration: 0.8,
                      delay: 0.1 * index,
                      ease: [0.25, 0.1, 0.25, 1],
                    }
                  }}
                  exit={{
                    opacity: 0,
                    scale: index % 2 === 0 ? 80 : 0,
                    transition: {
                      duration: 1.2,
                      delay: 1.5 + (0.05 * index),
                      ease: [0.76, 0, 0.24, 1],
                    }
                  }}
                  style={{
                    fontFamily: "'Nathan', 'Poppins', sans-serif",
                    fontSize: 'clamp(80px, 16vw, 160px)',
                    fontWeight: 900,
                    letterSpacing: '-0.04em',
                    color: primary,
                    lineHeight: 1,
                    userSelect: 'none',
                    display: 'inline-block',
                    transformStyle: 'preserve-3d',
                    textShadow: isLightMode 
                      ? '0 0 40px rgba(10,10,10,0.1)'
                      : '0 0 40px rgba(255,255,255,0.1)',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ 
                scaleX: 1,
                transition: { duration: 0.6, delay: 0.8, ease: 'easeOut' }
              }}
              exit={{ scaleX: 0, transition: { duration: 0.3 } }}
              style={{
                height: '2px',
                background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                width: '100%',
                marginTop: 'clamp(8px, 2vw, 20px)',
                transformOrigin: 'center',
              }}
            />

            {/* Progress indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.4, delay: 1 }
              }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              style={{
                marginTop: 'clamp(24px, 5vw, 48px)',
                color: primary,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                opacity: 0.6,
              }}
            >
              <motion.span
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {Math.round(progress)}% LOADING
              </motion.span>
            </motion.div>
          </div>

          {/* Corner accents */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position, i) => {
            const styles = {
              position: 'absolute' as const,
              width: 'clamp(40px, 8vw, 100px)',
              height: 'clamp(40px, 8vw, 100px)',
              ...(position === 'top-left' && { top: 'clamp(20px, 4vw, 48px)', left: 'clamp(20px, 4vw, 48px)', borderTop: `2px solid ${primary}`, borderLeft: `2px solid ${primary}` }),
              ...(position === 'top-right' && { top: 'clamp(20px, 4vw, 48px)', right: 'clamp(20px, 4vw, 48px)', borderTop: `2px solid ${primary}`, borderRight: `2px solid ${primary}` }),
              ...(position === 'bottom-left' && { bottom: 'clamp(20px, 4vw, 48px)', left: 'clamp(20px, 4vw, 48px)', borderBottom: `2px solid ${primary}`, borderLeft: `2px solid ${primary}` }),
              ...(position === 'bottom-right' && { bottom: 'clamp(20px, 4vw, 48px)', right: 'clamp(20px, 4vw, 48px)', borderBottom: `2px solid ${primary}`, borderRight: `2px solid ${primary}` }),
            }
            
            return (
              <motion.div
                key={position}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 0.15,
                  scale: 1,
                  transition: { duration: 0.6, delay: 0.3 + (i * 0.1), ease: 'easeOut' }
                }}
                exit={{ 
                  opacity: 0,
                  scale: 0,
                  transition: { duration: 0.3, delay: i * 0.05 }
                }}
                style={styles}
              />
            )
          })}
        </motion.div>
      )}
    </AnimatePresence>
  )
}