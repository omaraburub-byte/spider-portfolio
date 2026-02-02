'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TrailPoint {
  id: number
  x: number
  y: number
  color: string
}

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const colors = [
    'bg-spider-red',
    'bg-spider-blue',
    'bg-spider-neon',
  ]

  useEffect(() => {
    let trailTimer: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      const newPoint: TrailPoint = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
      }

      setTrail(prev => [...prev.slice(-8), newPoint])
    }

    trailTimer = setInterval(() => {
      setTrail(prev => prev.slice(-4))
    }, 100)

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(trailTimer)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            className={`fixed w-2 h-2 rounded-full ${point.color} pointer-events-none z-50`}
            style={{
              left: point.x - 4,
              top: point.y - 4,
            }}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          />
        ))}
      </AnimatePresence>
    </>
  )
}