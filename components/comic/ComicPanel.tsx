'use client'

import { motion } from 'framer-motion'
import { ComicPanelProps } from '@/lib/types'

export function ComicPanel({ panel, index, y }: ComicPanelProps) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      style={{ y }}
      className={`relative flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-center gap-12`}
    >
      {/* Panel content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className={`flex-1 ${isEven ? 'text-right' : 'text-left'}`}
      >
        <div className="inline-block">
          <div className={`p-6 rounded-2xl bg-gradient-to-br ${panel.color} border-4 border-black shadow-2xl relative`}>
            {/* Comic panel border */}
            <div className="absolute inset-0 border-4 border-white/50 rounded-xl" />
            
            {/* Ben-Day dots overlay */}
            <div className="absolute inset-0 rounded-xl opacity-10" 
                 style={{ backgroundImage: 'radial-gradient(black 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{panel.icon}</span>
                <span className="font-barrio text-2xl text-white bg-black/30 px-4 py-1 rounded-full">
                  {panel.year}
                </span>
              </div>
              
              <h3 className="font-barrio text-3xl mb-4 text-white drop-shadow-md">
                {panel.title}
              </h3>
              
              <div className="relative">
                {/* Speech bubble tail */}
                <div className={`absolute ${isEven ? '-right-4' : '-left-4'} top-1/2 w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ${isEven ? 'border-l-[24px] border-l-white' : 'border-r-[24px] border-r-white'}`} />
                
                {/* Speech bubble */}
                <div className="bg-white p-4 rounded-2xl border-2 border-black">
                  <p className="font-montserrat text-gray-800">
                    {panel.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action text */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            className={`mt-4 ${isEven ? 'text-left' : 'text-right'}`}
          >
            <span className="font-barrio text-4xl text-spider-red inline-block px-4 py-2 bg-black/10 rounded-lg">
              {index === 0 && "POW!"}
              {index === 1 && "BAM!"}
              {index === 2 && "BOOM!"}
              {index === 3 && "KAPOW!"}
              {index === 4 && "WHAM!"}
              {index === 5 && "THWIP!"}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Timeline dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div className={`w-8 h-8 rounded-full ${panel.accent} border-4 border-white shadow-lg`} />
      </div>
    </motion.div>
  )
}