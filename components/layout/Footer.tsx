'use client'

import { motion } from 'framer-motion'
import { Heart, Zap, Copyright, Sparkles, ArrowUp } from 'lucide-react'
import SpiderLogo from '@/components/SpiderLogo'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  return (
    <footer className="bg-card border-t-4 border-spider-red mt-20 comic-border">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Comic Book Logo Area with Your Spider Logo */}
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-3 mb-3">
              <div className="relative">
                <div className="w-12 h-12 bg-background border-4 border-spider-red rounded-lg flex items-center justify-center">
                  {/* YOUR SPIDER LOGO SVG */}
                  <SpiderLogo className="w-8 h-8 text-spider-red" />
                </div>
                {/* Comic "bam" effect */}
                <div className="absolute -inset-2 border-2 border-spider-blue/30 rounded-xl animate-pulse"></div>
              </div>
              <div>
                <div className="font-barrio text-2xl text-foreground tracking-wider">
                  SPIDER-PORTFOLIO
                </div>
                <div className="font-montserrat text-sm text-muted-foreground flex items-center">
                  <Zap className="w-3 h-3 mr-1 text-spider-blue" />
                  FINAL ISSUE
                </div>
              </div>
            </div>
            
            <div className="font-montserrat text-sm text-muted-foreground max-w-xs">
              "With great power comes great user experience." - Omar Aburub, The Spider of Software Engineering
            </div>
          </motion.div>

          {/* Comic Book Info Panel */}
          <motion.div 
            className="text-center md:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {/* Comic book credits panel */}
            <div className="bg-background border-2 border-spider-gray rounded-xl p-6 mb-4 relative">
              {/* Comic dots background */}
              <div className="absolute inset-0 rounded-xl opacity-5 comic-dots" />
              
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-end space-x-2">
                  <Copyright className="w-4 h-4 text-muted-foreground" />
                  <span className="font-barrio text-sm text-foreground">
                    {currentYear} OMAR ABURUB
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  ALL RIGHTS RESERVED
                </div>
                <div className="h-px bg-border my-3"></div>
                <div className="text-xs text-muted-foreground">
                  PUBLISHED IN AMMAN, JORDAN
                </div>
              </div>
              
              {/* Comic book staple effect */}
              <div className="absolute -top-1 left-6 w-8 h-2 bg-spider-gray rounded-b-lg"></div>
              <div className="absolute -top-1 right-6 w-8 h-2 bg-spider-gray rounded-b-lg"></div>
            </div>

            {/* Built with love section */}
            <div className="flex items-center justify-center md:justify-end space-x-2 text-sm text-muted-foreground">
              <span>BUILT WITH</span>
              <Heart className="w-4 h-4 text-spider-red fill-spider-red" />
              <span>USING</span>
              <motion.span 
                className="px-2 py-1 bg-background border border-border rounded text-xs font-mono"
                whileHover={{ scale: 1.05 }}
              >
                NEXT.JS
              </motion.span>
              <motion.span 
                className="px-2 py-1 bg-background border border-border rounded text-xs font-mono"
                whileHover={{ scale: 1.05 }}
              >
                TAILWIND
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Comic book bottom border with Back to Top button */}
        <div className="mt-12 pt-6 border-t-2 border-dashed border-border relative">
          <div className="flex justify-between items-center">
            {/* Left: Comic page info */}
            <div className="text-xs text-muted-foreground">
              <div className="flex items-center">
                <Sparkles className="w-3 h-3 mr-1" />
                TO BE CONTINUED...
              </div>
            </div>
            
            {/* Center: Comic book reading direction */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-background border-2 border-border rounded-full w-8 h-8 flex items-center justify-center">
                <div className="text-xs font-bold text-foreground">↓</div>
              </div>
            </div>
            
            {/* Right: Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              className="group relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Main button */}
              <div className="flex items-center space-x-2 px-4 py-2 bg-background border-2 border-spider-red rounded-lg">
                <ArrowUp className="w-4 h-4 text-spider-red" />
                <span className="font-barrio text-sm text-foreground">BACK TO TOP</span>
              </div>
                            
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-card border border-spider-red rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <div className="text-xs text-foreground">Return to start</div>
                <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-card border-b border-r border-spider-red transform rotate-45"></div>
              </div>
            </motion.button>
          </div>
          
          {/* Page number at bottom right */}
          <div className="text-right mt-4">
            <div className="font-mono text-xs text-muted-foreground inline-block px-2 py-1 bg-background border border-border rounded">
              PAGE 01
            </div>
          </div>
        </div>
      </div>
      
    </footer>
  )
}