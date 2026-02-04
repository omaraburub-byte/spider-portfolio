'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface ComicPanelProps {
  title: string
  description: string
  year: string
  icon: LucideIcon
  color: string
  bgColor: string
  textColor: string
  position: 'left' | 'right'
  index: number
}

export default function ComicPanel({
  title,
  description,
  year,
  icon: Icon,
  color,
  bgColor,
  textColor,
  position,
  index
}: ComicPanelProps) {
  return (
    <div className={`relative flex ${position === 'left' ? 'justify-start' : 'justify-end'} items-center min-h-[200px]`}>
      {/* Timeline dot - SOLID BACKGROUND TO COVER TIMELINE */}
      <div className={`absolute z-20 ${
        position === 'left' 
          ? 'left-0 lg:left-1/2 lg:-translate-x-1/2' 
          : 'left-0 lg:left-1/2 lg:-translate-x-1/2'
      }`}>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
          className={`relative w-14 h-14 rounded-full ${color.replace('border-', 'bg-')} flex items-center justify-center shadow-xl border-4 border-background`}
        >
          {/* Solid colored circle */}
          <div className={`absolute inset-0 rounded-full ${color.replace('border-', 'bg-')}`} />
          
          {/* Icon on top */}
          <div className="relative z-10">
            <Icon className={`w-7 h-7 text-background`} />
          </div>
          
          {/* White ring inside for comic effect */}
          <div className="absolute inset-2 rounded-full border-2 border-background/30" />
        </motion.div>
        
        {/* Connecting line from dot to panel - BEHIND PANELS */}
        <div className={`absolute top-1/2 w-8 h-1 z-0 ${
          position === 'left' 
            ? 'right-full lg:left-14' 
            : 'left-full lg:right-14'
        } ${color.replace('border-', 'bg-')}`} />
      </div>

      {/* Comic Panel - WITH HIGHER Z-INDEX */}
      <motion.div
        initial={{ opacity: 0, x: position === 'left' ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className={`relative z-30 ${
          position === 'left' 
            ? 'ml-20 lg:ml-0 lg:mr-auto lg:w-[45%] lg:pr-16' 
            : 'ml-20 lg:ml-auto lg:w-[45%] lg:pl-16'
        } w-[calc(100%-5rem)]`}
      >
        {/* Comic Panel Content */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className={`bg-card border-4 ${color} rounded-2xl p-6 shadow-2xl comic-panel relative overflow-hidden group`}
        >
          {/* Comic book staple effect */}
          <div className="absolute -top-2 left-6 w-12 h-3 bg-spider-gray rounded-b-lg z-40" />
          <div className="absolute -top-2 right-6 w-12 h-3 bg-spider-gray rounded-b-lg z-40" />
          
          {/* Comic dot pattern background */}
          <div className="absolute inset-0 rounded-2xl opacity-5 comic-dots" />
          
          {/* Header with comic style */}
          <div className="relative z-10 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className={`${textColor} font-barrio text-2xl tracking-wider`}>
                {title}
              </div>
              <div className={`px-3 py-1 ${bgColor} rounded-full border ${color} text-sm font-bold ${textColor}`}>
                {year}
              </div>
            </div>
            
            {/* Comic book title underline */}
            <div className="h-1 w-24 bg-gradient-to-r from-current to-transparent opacity-50" />
          </div>
          
          {/* Description */}
          <p className="text-card-foreground text-lg leading-relaxed mb-6 relative z-10">
            {description}
          </p>
          
          {/* Comic book "read more" arrow */}
          <div className={`flex items-center ${textColor} text-sm font-bold`}>
            <span>READ MORE</span>
            <motion.div 
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </div>
          
          {/* Comic panel number */}
          <div className="absolute bottom-4 right-4 text-xs text-muted-foreground font-mono">
            PANEL #{String(index + 1).padStart(2, '0')}
          </div>
          
          {/* Hover glow effect */}
          <div className={`absolute inset-0 rounded-2xl ${bgColor} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
        </motion.div>
        
        {/* Speech bubble tail for left panels */}
        {position === 'left' && (
          <div className="absolute top-8 -right-3 z-20">
            <div className="w-6 h-6 bg-card border-r-4 border-t-4 border-spider-blue transform rotate-45" />
          </div>
        )}
        
        {/* Speech bubble tail for right panels */}
        {position === 'right' && (
          <div className="absolute top-8 -left-3 z-20">
            <div className="w-6 h-6 bg-card border-l-4 border-t-4 border-spider-red transform -rotate-45" />
          </div>
        )}
      </motion.div>
    </div>
  )
}