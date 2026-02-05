'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Linkedin, Mail, FileText, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'
import SpiderLogo from '@/components/SpiderLogo'
import ThemeToggle from '@/components/ThemeToggle'

const navItems = [
  { name: 'HOME', href: '#home' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'JOURNEY', href: '#journey' },
  { name: 'CONTACT', href: '#contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b-4 border-spider-red comic-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Comic Book Logo - Clean version */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative">
              {/* Simple logo container - no rotating effects */}
              <div className="p-2 bg-background border-4 border-spider-red rounded-lg">
                <SpiderLogo className="w-8 h-8" />
              </div>
            </div>
            <div>
              <div className="font-barrio text-2xl text-foreground group-hover:text-spider-red transition-all duration-300 tracking-wider">
                SPIDER-PORTFOLIO
              </div>
              <div className="font-montserrat text-xs text-muted-foreground flex items-center">
                <Zap className="w-3 h-3 mr-1 text-spider-blue" />
                ISSUE #2026
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Comic Book Style */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.a
                  href={item.href}
                  className="relative px-4 py-2 font-barrio text-sm tracking-wider transition-all duration-300"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className={`relative z-10 ${
                    hoveredItem === item.name 
                      ? 'text-background' 
                      : 'text-foreground hover:text-spider-red'
                  } transition-colors`}>
                    {item.name}
                  </span>
                  
                  {/* Comic book speech bubble effect */}
                  {hoveredItem === item.name && (
                    <motion.div
                      className="absolute inset-0 bg-spider-red rounded-lg"
                      layoutId="nav-highlight"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                  
                  {/* Comic book dot pattern */}
                  <div className="absolute inset-0 rounded-lg opacity-10 comic-dots" />
                </motion.a>
                
                {/* "BAM!" effect line */}
                <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-spider-blue transform -translate-x-1/2 group-hover:w-full transition-all duration-300" />
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions - Comic Book Style */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            
            {/* Comic book action buttons */}
            <motion.a
              href="https://github.com/omaraburub-byte"
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-3 bg-card border-2 border-spider-gray rounded-lg group"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5 text-foreground group-hover:text-spider-red transition-colors" />
              {/* Comic dot pattern */}
              <div className="absolute inset-0 rounded-lg opacity-5 comic-dots" />
              {/* Comic border effect */}
              <div className="absolute -inset-1 border border-spider-red/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/omar-aburub-profile/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-3 bg-card border-2 border-spider-gray rounded-lg group"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-5 h-5 text-foreground group-hover:text-spider-red transition-colors" />
              <div className="absolute inset-0 rounded-lg opacity-5 comic-dots" />
              <div className="absolute -inset-1 border border-spider-red/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
            
            <motion.a
              href="/resume.pdf"
              className="relative px-5 py-3 bg-spider-red text-white font-barrio text-sm tracking-wider rounded-lg border-2 border-spider-red/50 group overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-2 relative z-10">
                <Sparkles className="w-4 h-4" />
                <span>RESUME</span>
              </div>
              {/* Comic book "ZAP" effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              {/* Comic dots */}
              <div className="absolute inset-0 rounded-lg opacity-10 comic-dots" />
            </motion.a>
          </div>

          {/* Mobile menu button - Comic Style */}
          <motion.button
            className="md:hidden p-3 bg-card border-2 border-spider-gray rounded-lg relative"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <div className="text-foreground">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
            {/* Comic dot pattern */}
            <div className="absolute inset-0 rounded-lg opacity-5 comic-dots" />
          </motion.button>
        </div>

        {/* Mobile Navigation - Comic Book Style */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden mt-2 py-6 bg-card border-4 border-spider-red rounded-xl"
              initial={{ opacity: 0, height: 0, scale: 0.9 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-3 px-4">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="block py-4 px-6 bg-background border-2 border-spider-gray rounded-lg text-center font-barrio text-foreground hover:text-spider-red hover:border-spider-red transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                    whileHover={{ x: 5 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
                
                {/* Theme Toggle for Mobile */}
                <div className="flex justify-center py-4">
                  <ThemeToggle />
                </div>
                
                {/* Mobile Social Links */}
                <div className="flex justify-center space-x-4 pt-4">
                  {[
                    { icon: Github, href: 'https://github.com/omaraburub-byte', label: 'GitHub' },
                    { icon: Linkedin, href: 'https://www.linkedin.com/in/omar-aburub-profile/', label: 'LinkedIn' },
                    { icon: Mail, href: 'mailto:omar.spiderofse@gmail.com', label: 'Email' },
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="p-3 bg-background border-2 border-spider-gray rounded-lg text-foreground hover:text-spider-red"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
                
                {/* Mobile Resume Button */}
                <motion.a
                  href="/resume.pdf"
                  className="block py-4 px-6 bg-spider-red text-white font-barrio text-center rounded-lg border-2 border-spider-red/50 mt-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>DOWNLOAD RESUME</span>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Removed the top border gradient decoration */}
    </header>
  )
}