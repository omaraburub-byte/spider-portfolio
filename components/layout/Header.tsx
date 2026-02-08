'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Linkedin, Mail, Sparkles, Zap } from 'lucide-react'
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
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Active section detection
      const sections = ['home', 'projects', 'skills', 'experience', 'journey', 'contact']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      window.scrollTo({
        top: (element as HTMLElement).offsetTop - 100,
        behavior: 'smooth'
      })
    }
  }

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Floating header container */}
      <div className="relative">
        {/* Background that appears on scroll */}
        <motion.div 
          className="absolute inset-0 bg-background/95 backdrop-blur-md rounded-2xl border-4 border-spider-red comic-border shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Header content */}
        <div className="relative max-w-7xl mx-auto flex items-center justify-between">
          
          {/* SECTION 1: LOGO - LEFT */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-shrink-0 z-10"
          >
            <motion.div
              className="bg-card dark:bg-spider-dark border-4 border-spider-red p-3 rotate-[-1deg] comic-shadow-small cursor-pointer group flex items-center gap-4 transition-all hover:rotate-0 hover:scale-105"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-2 bg-background border-2 dark:border-white border-spider-gray">
                <SpiderLogo className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
              <div className="pr-4">
                <div className="font-barrio dark:text-white text-spider-red text-2xl font-black uppercase tracking-tight leading-none">
                  SPIDER-PORTFOLIO
                </div>
                <div className="font-montserrat text-spider-red text-xs uppercase tracking-[0.2em] mt-1 flex items-center">
                  <Zap className="w-3 h-3 mr-1" />
                  <span className="dark:text-spider-blue text-spider-red">ISSUE #2026</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* SECTION 2: NAVIGATION - CENTER */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden lg:flex items-center z-10"
          >
            <div className="bg-card dark:bg-white border-4 border-spider-gray p-2 comic-shadow-small">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1)
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`relative px-4 py-2 font-barrio font-black text-sm uppercase tracking-wide transition-all duration-300 ${
                      isActive
                        ? 'text-spider-red dark:bg-spider-gray/10 bg-spider-gray/5'
                        : 'dark:text-spider-dark text-foreground hover:text-spider-red'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    
                    {hoveredItem === item.name && !isActive && (
                      <motion.div
                        className="absolute inset-0 bg-spider-red/20 dark:bg-spider-red/30 rounded-sm"
                        layoutId="nav-highlight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* SECTION 3: ACTIONS - RIGHT */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-3 z-10"
          >
            {/* Theme Toggle */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            
            {/* Social Links */}
            <div className="hidden md:flex items-center gap-2">
              <motion.a
                href="https://github.com/omaraburub-byte"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card border-2 border-spider-gray rounded-lg group hover:border-spider-red transition-colors comic-shadow-small"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4 text-foreground group-hover:text-spider-red transition-colors" />
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/omar-aburub-profile/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card border-2 border-spider-gray rounded-lg group hover:border-spider-red transition-colors comic-shadow-small"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-4 h-4 text-foreground group-hover:text-spider-red transition-colors" />
              </motion.a>
            </div>
            
            {/* Resume Button */}
            <motion.a
              href="/resume.pdf"
              className="hidden md:block bg-spider-red text-white px-6 py-3 border-4 border-spider-gray font-barrio font-black text-sm uppercase tracking-wider hover:bg-white hover:text-spider-red transition-all duration-300 comic-shadow-small"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>RESUME</span>
              </div>
            </motion.a>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden p-3 bg-card border-2 border-spider-gray rounded-lg comic-shadow-small"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-foreground">
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden mt-4 py-6 bg-card border-4 border-spider-red rounded-xl comic-shadow absolute left-6 right-6 z-20"
              initial={{ opacity: 0, height: 0, scale: 0.9 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-3 px-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block py-3 px-4 bg-background border-2 border-spider-gray rounded-lg text-center font-barrio text-sm text-foreground hover:text-spider-red hover:border-spider-red transition-all comic-shadow-small"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                
                {/* Mobile Theme Toggle */}
                <div className="flex justify-center py-2">
                  <ThemeToggle />
                </div>
                
                {/* Mobile Social Links */}
                <div className="flex justify-center gap-3 pt-2">
                  <a
                    href="https://github.com/omaraburub-byte"
                    className="p-3 bg-background border-2 border-spider-gray rounded-lg text-foreground hover:text-spider-red comic-shadow-small"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/omar-aburub-profile/"
                    className="p-3 bg-background border-2 border-spider-gray rounded-lg text-foreground hover:text-spider-red comic-shadow-small"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:omar.spiderofse@gmail.com"
                    className="p-3 bg-background border-2 border-spider-gray rounded-lg text-foreground hover:text-spider-red comic-shadow-small"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
                
                {/* Mobile Resume Button */}
                <a
                  href="/resume.pdf"
                  className="block py-3 px-4 bg-spider-red text-white font-barrio text-center rounded-lg border-2 border-spider-red/50 mt-3 comic-shadow-small"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>DOWNLOAD RESUME</span>
                  </div>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}