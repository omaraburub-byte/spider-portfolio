// components/layout/Header.tsx - FULLY FIXED
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, Sun, Moon } from 'lucide-react'
import SpiderLogo from '@/components/SpiderLogo'
import ThemeToggle from '@/components/ThemeToggle'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

const navItems = [
  { name: 'HOME', href: '#home', isHome: true },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'JOURNEY', href: '#journey' },
  { name: 'CONTACT', href: '#contact' },
]

export default function Header() {
  // ALL HOOKS MUST BE CALLED FIRST - unconditionally
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { theme, setTheme } = useTheme()
  const [showAbove, setShowAbove] = useState(false)
  const [shouldRender, setShouldRender] = useState(true) // Default to true
  
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  // FIRST useEffect - check iframe status and set shouldRender
  useEffect(() => {
    setMounted(true)
    
    // Strong iframe detection
    const isInIframe = (): boolean => {
      try {
        return window.self !== window.top
      } catch (e) {
        return true
      }
    }
    
    const inIframe = isInIframe()
    const urlParams = new URLSearchParams(window.location.search)
    const isEmbed = urlParams.get('embed') === 'true'
    const isFromPortfolio = document.referrer.includes('/portfolio')
    
    // Don't render if in iframe, embed mode, or from portfolio
    if (inIframe || isEmbed || isFromPortfolio) {
      setShouldRender(false)
      return
    }
    
    setShouldRender(true)
    
    // Only delay on homepage
    const isHomePage = window.location.pathname === '/'
    
    if (isHomePage) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 4000)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(true)
    }
  }, [])

  // SECOND useEffect - scroll handler
  useEffect(() => {
    if (!shouldRender) return
    
    const handleScroll = () => {
      if (window.location.pathname === '/') {
        const sections = ['home', 'projects', 'skills', 'experience', 'journey', 'contact']
        const scrollPosition = window.scrollY + 200
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = (window.scrollY / totalHeight) * 100
        setScrollProgress(progress)

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
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [shouldRender])

  // THIRD useEffect - click outside handler
  useEffect(() => {
    if (!shouldRender) return
    
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        menuRef.current && 
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, shouldRender])

  // FOURTH useEffect - menu position
  useEffect(() => {
    if (!shouldRender) return
    
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      const spaceAbove = buttonRect.top
      const menuHeight = 400
      
      setShowAbove(spaceAbove > menuHeight)
    }
  }, [isOpen, shouldRender])

  // FIFTH useEffect - hash scroll
  useEffect(() => {
    if (!shouldRender) return
    
    if (window.location.pathname === '/' && window.location.hash) {
      const sectionId = window.location.hash.substring(1)
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }, [shouldRender])

  // Navigation handler (not a hook, so this is fine)
  const handleNavigation = (item: typeof navItems[0]) => {
    if (item.name === 'HOME') {
      router.push('/landing')
      setIsOpen(false)
      return
    }

    const href = item.href
    const sectionId = href.substring(1)
    
    if (window.location.pathname === '/spider') {
      const element = document.getElementById(sectionId)
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 100,
          behavior: 'smooth'
        })
        setActiveSection(sectionId)
      }
    } 
    else if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId)
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 100,
          behavior: 'smooth'
        })
        setActiveSection(sectionId)
      }
    } else {
      window.location.href = `/#${sectionId}`
    }
    
    setIsOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setIsOpen(false)
  }

  // Early return AFTER all hooks - this is allowed
  if (!shouldRender || !mounted) {
    return null
  }

  return (
    <motion.div 
      ref={headerRef}
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-8"
      initial={{ y: 100, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center relative">
        <motion.button
          onClick={scrollToTop}
          className="flex items-center gap-3 bg-white dark:bg-[#1a1a1a] px-4 py-2 rounded-full border border-gray-200 dark:border-[#333] shadow-lg dark:shadow-2xl whitespace-nowrap"
          whileHover={{ opacity: 0.8 }}
          whileTap={{ scale: 0.98 }}
        >
          <SpiderLogo className="w-5 h-5 text-black dark:text-white" />
          <span className="font-barrio text-sm text-black dark:text-white/90">SPIDER-PORTFOLIO</span>
        </motion.button>

        <div className="w-4"></div>

        <div className="flex items-center gap-3 bg-white dark:bg-[#1a1a1a] px-4 py-2 rounded-full border border-gray-200 dark:border-[#333] shadow-lg dark:shadow-2xl">
          <div className="w-20 h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden hidden lg:block">
            <motion.div 
              className="h-full bg-black dark:bg-white"
              style={{ width: `${scrollProgress}%` }}
              animate={{ width: `${scrollProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <motion.a
            href="/resume.pdf"
            target="_blank"
            className="hidden md:block px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black text-xs font-medium rounded-full whitespace-nowrap"
            whileHover={{ opacity: 0.9 }}
            whileTap={{ scale: 0.98 }}
          >
            Resume
          </motion.a>

          <div className="hidden md:flex items-center gap-2">
            <motion.a
              href="https://github.com/omaraburub-byte"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={18} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/omar-aburub-profile/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={18} />
            </motion.a>
          </div>

          <motion.button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          <motion.button
            ref={buttonRef}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-black/5 dark:bg-white/10 text-black dark:text-white text-xs font-medium rounded-full whitespace-nowrap"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Menu</span>
            <span className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />
              
              <motion.div
                ref={menuRef}
                className={`absolute z-50 w-64 ${
                  showAbove ? 'bottom-full mb-2' : 'top-full mt-2'
                } lg:left-1/2 lg:-translate-x-1/2 right-0`}
                initial={{ opacity: 0, y: showAbove ? 10 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: showAbove ? 10 : -10 }}
                transition={{ duration: 0.15 }}
              >
                <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-2xl shadow-2xl overflow-hidden">
                  <div className="max-h-[60vh] overflow-y-auto p-2">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavigation(item)}
                        className={`block w-full px-3 py-3 text-left text-sm rounded-xl transition-all ${
                          activeSection === item.href.substring(1) && item.name !== 'HOME'
                            ? 'bg-black/5 dark:bg-white/10 text-black dark:text-white'
                            : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>

                  <div className="h-px bg-gray-200 dark:bg-[#333] mx-2" />

                  <div className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <a
                        href="https://github.com/omaraburub-byte"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                      >
                        <Github size={16} />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/omar-aburub-profile/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                      >
                        <Linkedin size={16} />
                      </a>
                      <a
                        href="mailto:omar.spiderofse@gmail.com"
                        className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                      >
                        <Mail size={16} />
                      </a>
                    </div>
                    <ThemeToggle />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}