'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function HoverSense() {
  const [hovered, setHovered] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const elements = document.querySelectorAll('a, button, [role="button"]')
    
    const handleMouseEnter = (e: Event) => {
      const element = e.target as HTMLElement
      const rect = element.getBoundingClientRect()
      
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      })
      setHovered(true)
    }

    const handleMouseLeave = () => {
      setHovered(false)
    }

    elements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  if (!hovered) return null

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-40"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-4 h-4 rounded-full bg-spider-red" />
      </motion.div>
    </>
  )
}