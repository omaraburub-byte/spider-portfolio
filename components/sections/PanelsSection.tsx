'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { X, Coffee, Gamepad2, BookOpen, Sparkles } from 'lucide-react'

const panels = [
  { 
    id: 1, 
    image: '/panel1.jpg', 
    title: 'Persona', 
    desc: 'Digital identity',
    popupTitle: 'COFFEE CONNOISSEUR',
    popupContent: 'I start every day with freshly ground coffee. My perfect cup is a medium roast with notes of chocolate and citrus. Coffee fuels my coding sessions and design thinking.',
    icon: Coffee,
    color: 'bg-spider-red/20',
    textColor: 'text-spider-red'
  },
  { 
    id: 2, 
    image: '/panel2.jpg', 
    title: 'Process', 
    desc: 'Building solutions',
    popupTitle: 'GAMING ENTHUSIAST',
    popupContent: 'When I\'m not coding, I\'m playing story-driven games. My favorites are Assasins Creed, Tomb Raider, and Every Spider-Man Game. Gaming teaches me about narrative design, character development, and immersive experiences.',
    icon: Gamepad2,
    color: 'bg-spider-blue/20',
    textColor: 'text-spider-blue'
  },
  { 
    id: 3, 
    image: '/panel3.jpg', 
    title: 'Impact', 
    desc: 'Creating value',
    popupTitle: 'COMIC BOOK COLLECTOR',
    popupContent: 'I\'ve been collecting comics since I was 12. My prized possessions are first editions of Spider-Man and Batman. Comics inspire my design philosophy: bold visuals, clear storytelling, and memorable characters.',
    icon: BookOpen,
    color: 'bg-spider-neon/20',
    textColor: 'text-spider-neon'
  },
]

export default function PanelsSection() {
  const [selectedPanel, setSelectedPanel] = useState<number | null>(null)
  
  const selectedPanelData = panels.find(panel => panel.id === selectedPanel)

  // Function to close popup
  const closePopup = () => {
    setSelectedPanel(null)
  }

  // Close on Escape key
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePopup()
    })
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-10">
            <h2 className="font-barrio text-4xl mb-2 text-foreground [text-shadow:1px_1px_0_#E62429,-1px_-1px_0_#1A73E8] dark:[text-shadow:1px_1px_0_#E62429,-1px_-1px_0_#1A73E8]">
    MY COMIC PANELS
  </h2>
          <p className="text-muted-foreground font-mono text-sm">
            CLICK TO REVEAL SECRETS
          </p>
        </div>
        
        {/* Clickable Panels with GRID EFFECT ONLY HERE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {panels.map((panel, index) => (
            <motion.div
              key={panel.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => setSelectedPanel(panel.id)}
            >
              {/* Comic panel WITH GRID EFFECT */}
              <div className="bg-card border-2 border-spider-gray rounded shadow-md overflow-hidden relative transition-transform duration-300 group-hover:scale-[1.02]">
                {/* GRID EFFECT - ONLY ON PANELS */}
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(90deg, hsl(var(--muted-foreground) / 0.1) 1px, transparent 1px),
                    linear-gradient(0deg, hsl(var(--muted-foreground) / 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                  opacity: 0.3,
                  pointerEvents: 'none'
                }}></div>
                
                {/* BEN-DAY DOTS OVERLAY */}
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground) / 0.05) 1px, transparent 2px)`,
                  backgroundSize: '8px 8px',
                  pointerEvents: 'none'
                }}></div>
                
                {/* Image */}
                <div className="relative aspect-square border-b-2 border-spider-gray">
                  <Image
                    src={panel.image}
                    alt={panel.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  
                  {/* Click hint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Sparkles className="w-8 h-8 text-white/80" />
                    </motion.div>
                  </div>
                  
                  {/* Panel number */}
                  <div className="absolute top-3 left-3 bg-background px-2 py-1 rounded border border-spider-red">
                    <span className="font-barrio text-sm text-spider-red">#{panel.id}</span>
                  </div>
                </div>
                
                {/* Text */}
                <div className="p-4 text-center relative">
                  <h3 className="font-barrio text-lg text-foreground mb-1">
                    {panel.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {panel.desc}
                  </p>
                  
                  {/* Click indicator */}
                  <div className="mt-2">
                    <span className="text-xs text-spider-red opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to reveal →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-border text-center relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-background border border-border rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
          </div>
          
          <p className="text-sm text-muted-foreground font-mono">
            CLICK PANELS FOR FUN FACTS
          </p>
        </div>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedPanel && selectedPanelData && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
              onClick={closePopup}
            >
              {/* Modal */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-card border-4 border-spider-gray rounded-xl max-w-md w-full relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className={`p-6 ${selectedPanelData.color} border-b-4 border-spider-gray relative z-10`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <selectedPanelData.icon className={`w-6 h-6 ${selectedPanelData.textColor}`} />
                      <h3 className="font-barrio text-2xl text-foreground">
                        {selectedPanelData.popupTitle}
                      </h3>
                    </div>
                    {/* FIXED: Dark hover effect for close button */}
                    <button
                      onClick={closePopup}
                      className="p-2 rounded-lg bg-black/20 hover:bg-black/40 transition-colors"
                    >
                      <X className="w-5 h-5 text-white/90" />
                    </button>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Panel #{selectedPanelData.id} • Personal Fact
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 relative z-10">
                  <p className="text-card-foreground text-lg leading-relaxed">
                    {selectedPanelData.popupContent}
                  </p>
                  
                  {/* Comic speech bubble */}
                  <div className="mt-6 p-4 bg-background border-2 border-spider-gray rounded-lg relative">
                    <p className="text-sm text-muted-foreground italic">
                      "Fun fact about my daily routine!"
                    </p>
                    {/* Speech bubble tail */}
                    <div className="absolute -bottom-2 left-6">
                      <div className="w-4 h-4 bg-background border-b-2 border-l-2 border-spider-gray transform rotate-45"></div>
                    </div>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="p-4 border-t border-border flex justify-between items-center relative z-10">
                  <div className="text-xs text-muted-foreground font-mono">
                    FUN FACT #{selectedPanelData.id}
                  </div>
                  <button
                    onClick={closePopup}
                    className="px-4 py-2 bg-spider-red text-white font-barrio text-sm rounded hover:bg-spider-red/90 transition-colors"
                  >
                    GOT IT!
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}