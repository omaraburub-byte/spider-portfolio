'use client'

import { motion } from 'framer-motion'
import { Heart, Sparkles, ArrowUp } from 'lucide-react'
import SpiderLogo from '@/components/SpiderLogo'
import { useEffect, useState } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  if (!mounted) return null
  
  return (
    <footer className="bg-white dark:bg-[#0A0A0A] border-t border-gray-200 dark:border-gray-800 pb-10">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo Area */}
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 relative">
                <SpiderLogo className="w-full h-full opacity-80 dark:opacity-80" />
              </div>
              <div>
                <div className="text-sm font-montserrat text-gray-400 dark:text-gray-500 tracking-[0.2em] uppercase">
                  OMAR ABURUB
                </div>
                <div className="text-xs font-mono text-gray-300 dark:text-gray-600">
                  Spider of Software Engineering
                </div>
              </div>
            </div>
            
            <div className="text-xs text-gray-400 dark:text-gray-500 max-w-xs font-light leading-relaxed">
              "With great power comes great user experience."
            </div>
          </motion.div>

          {/* Info Panel */}
          <motion.div 
            className="text-center md:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-end space-x-2">
                <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                  © {currentYear}
                </span>
                <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
                <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                  Amman, Jordan
                </span>
              </div>
              
              <div className="h-px w-16 mx-auto md:mx-0 md:ml-auto bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" />
              
              <div className="flex items-center justify-center md:justify-end space-x-2 text-xs text-gray-400 dark:text-gray-500">
                <span>crafted with</span>
                <Heart className="w-3 h-3 text-gray-300 dark:text-gray-600" />
                <span>•</span>
                <span className="font-mono">next.js</span>
                <span className="font-mono">tailwind</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom section with Back to Top */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center">
            {/* Left */}
            <div className="text-[10px] font-mono text-gray-300 dark:text-gray-600">
              <Sparkles className="w-3 h-3 inline mr-1" />
              final issue
            </div>
            
            {/* Modern Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-3 py-1.5 text-xs font-mono text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors border border-gray-200 dark:border-gray-800 rounded-full hover:border-gray-300 dark:hover:border-gray-700"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3 h-3" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}