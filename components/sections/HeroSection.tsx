'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SpiderLogo from '@/components/SpiderLogo'

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-background">
      {/* BEN-DAY DOTS COMIC BACKGROUND */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, 
          hsl(var(--muted-foreground) / 0.15) 1px, 
          transparent 2px)`,
        backgroundSize: '6px 6px'
      }}></div>
      
      {/* Larger Ben-Day dots overlay (varied sizes) */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, 
          hsl(var(--primary) / 0.1) 2px, 
          transparent 3px)`,
        backgroundSize: '12px 12px'
      }}></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* SPIDER LOGO - NON-INTERACTIVE */}
          <div className="inline-block mb-6">
            <div className="p-3">
              <SpiderLogo className="w-24 h-24" />
            </div>
          </div>
          
          {/* NAME */}
          <motion.h1
            className="font-barrio text-5xl md:text-8xl text-spider-red mb-2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            OMAR ABURUB
          </motion.h1>
          
          {/* SUBTITLE */}
          <motion.div
            className="inline-block px-4 py-2 bg-spider-blue text-white font-barrio text-xl md:text-2xl tracking-wider rounded-lg mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            SPIDER OF SOFTWARE ENGINEERING
          </motion.div>
          
          {/* TAGLINE */}
          <motion.div
            className="max-w-2xl mx-auto mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="font-montserrat text-lg text-muted-foreground mb-4">
              <span className="text-spider-red font-bold">DESIGN</span> • 
              <span className="text-spider-blue font-bold"> CODE</span> • 
              <span className="dark:text-white text-black font-bold"> AI</span>
            </div>
            <p className="font-barrio text-xl text-foreground italic">
              "With great power comes great user experience"
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* COMIC TEXT - DYNAMIC COLOR FOR LIGHT/DARK MODE */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-16 left-0 right-0 text-center px-6"
      >
        <div className="flex flex-col items-center justify-center">
          {/* TEXT WITH DYNAMIC COLOR */}
          <div 
            className="font-barrio text-2xl md:text-3xl mb-3"
            style={{
              color: 'black', /* Light mode color */
              textShadow: '2px 2px 0 #e62429, -2px -2px 0 #1a73e8'
            }}
          >
            <span className="dark:hidden">KEEP READING</span>
            <span 
              className="hidden dark:inline"
              style={{
                color: 'white', /* Dark mode color */
                textShadow: '2px 2px 0 #e62429, -2px -2px 0 #1a73e8'
              }}
            >
              KEEP READING
            </span>
          </div>
          
          {/* ANIMATED ARROW */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
          >
            <ChevronDown className="w-8 h-8 text-spider-red" />
          </motion.div>
        </div>
      </motion.div>
      
      {/* SMOOTH BOTTOM TRANSITION */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-32 bg-gradient-to-t from-background to-transparent"></div>
        <div className="h-1 bg-gradient-to-r from-transparent via-spider-red to-transparent"></div>
      </div>
    </section>
  )
}