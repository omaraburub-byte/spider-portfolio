'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import SpiderLogo from '@/components/SpiderLogo'

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Web background */}
      <div className="absolute inset-0 spider-web opacity-10"></div>
      
      {/* Animated elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-spider-red/10 blur-3xl animate-spider-swing"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-spider-blue/10 blur-3xl animate-spider-swing" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Spider Logo */}
          <motion.div
  className="inline-block p-6 rounded-full bg-black/50 backdrop-blur-sm border border-spider-gray mb-8"
  whileHover={{ scale: 1.05 }}
>
  <div className="w-40 h-40 mx-auto relative">
    <div className="absolute inset-0 animate-web-spin">
      <div className="w-full h-full border-2 border-spider-red/30 rounded-full"></div>
    </div>
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-spider-red/20 flex items-center justify-center">
        <SpiderLogo className="w-20 h-20" />
      </div>
    </div>
  </div>
</motion.div>
          
          {/* Name & Title */}
          <h1 className="font-sacramento text-7xl md:text-8xl text-spider-red mb-4">
            Omar Aburub
          </h1>
          
          <h2 className="font-barrio text-3xl md:text-4xl text-spider-blue mb-6 tracking-wider">
            SPIDER OF SOFTWARE ENGINEERING
          </h2>
          
          <p className="font-montserrat text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            UX/UI Designer • HCI Researcher • AI Application Developer
            <br />
            <span className="text-lg">Weaving AI, UX, and Secure Code into Digital Experiences</span>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <motion.a
              href="#projects"
              className="px-8 py-3 bg-spider-red text-white rounded-lg font-medium hover:bg-spider-red/90 transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-3 border border-spider-gray text-gray-300 rounded-lg font-medium hover:border-spider-red hover:text-spider-red transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </div>
          
          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="text-gray-500" size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}