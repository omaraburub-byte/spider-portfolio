// app/landing/page.tsx - RACING PORTAL with ARABIC SUPPORT
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Sun, Moon, ChevronDown, Smartphone, Tablet, Monitor, Maximize2, RefreshCw, Languages } from 'lucide-react'
import Preloader from '@/components/PPreloader'

export default function RacingPortalPage() {
  const [mounted, setMounted] = useState(false)
  const [hoveredPortal, setHoveredPortal] = useState<string | null>(null)
  const [isLightMode, setIsLightMode] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')
  const [language, setLanguage] = useState<'en' | 'ar'>('en')
  
  // Separate states for each portal's view mode
  const [spiderViewMode, setSpiderViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [soulViewMode, setSoulViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [isRefreshing, setIsRefreshing] = useState<string | null>(null)
  
  const spiderIframeRef = useRef<HTMLIFrameElement>(null)
  const soulIframeRef = useRef<HTMLIFrameElement>(null)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const portalsRef = useRef<HTMLDivElement>(null)

  const viewportSizes = {
    mobile: { width: '375px', height: '500px' },
    tablet: { width: '640px', height: '600px' },
    desktop: { width: '100%', height: '400px' }
  }

  // Translations
  const t = {
    en: {
      hero: {
        title: 'OMAR',
        subtitle: 'Makes portals. Code meets consciousness.'
      },
      about: {
        portal: 'PORTAL',
        line1: 'A doorway. A threshold.',
        line2: 'here → there',
        line3: 'Between dimensions.',
        line4: 'Between minds.',
        line5: 'Between what is and what could be.',
        line6: 'Two exist.',
        line7: 'choose one'
      },
      portals: {
        spider: 'SPIDER-VERSE',
        soul: 'SOUL WORLD',
        spiderDesc: 'comic dimension · dynamic · playful',
        soulDesc: 'warmth · intention · minimal',
        dimension: 'DIMENSION',
        stability: 'STABILITY',
        enter: 'ENTER DIMENSION',
        mobile: 'Mobile',
        tablet: 'Tablet',
        desktop: 'Desktop',
        footer: '·  TWO WORLDS · ONE PORTAL  ·'
      },
      nav: ['HERO', 'ABOUT', 'PORTALS']
    },
    ar: {
      hero: {
        title: 'عمر',
        subtitle: 'صانع بوابات. حيث يلتقي الكود بالوعي.'
      },
      about: {
        portal: 'بَوَّابَة',
        line1: 'مَدخل. عَتَبَة.',
        line2: 'هنا ← هناك',
        line3: 'بين الأبعاد.',
        line4: 'بين العقول.',
        line5: 'بين ما هو وما يمكن أن يكون.',
        line6: 'اثنان موجودان.',
        line7: 'اختر واحدة'
      },
      portals: {
        spider: 'عَالَمُ العَنْكَبُوت',
        soul: 'عَالَمُ الرُّوح',
        spiderDesc: 'بعد كوميدي · ديناميكي · مرح',
        soulDesc: 'دفء · نية · بساطة',
        dimension: 'البُعْد',
        stability: 'الثَّبَات',
        enter: 'ادْخُلِ البُعْد',
        mobile: 'جوال',
        tablet: 'لوحي',
        desktop: 'مكتبي',
        footer: '·  عَالَمَان · بَوَّابَة وَاحِدَة  ·'
      },
      nav: ['الرَّئِيسِيَّة', 'عَنِ', 'البَوَّابَات']
    }
  }

  const currentLang = t[language]

  useEffect(() => {
    setMounted(true)
    const savedMode = localStorage.getItem('portal-theme')
    if (savedMode) {
      setIsLightMode(savedMode === 'light')
    }
    
    const savedLang = localStorage.getItem('portal-language')
    if (savedLang) {
      setLanguage(savedLang as 'en' | 'ar')
    }
    
    const timer = setTimeout(() => {
      setShowPreloader(false)
    }, 2800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('portal-theme', isLightMode ? 'light' : 'dark')
    }
  }, [isLightMode, mounted])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('portal-language', language)
      // Set document direction for Arabic
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    }
  }, [language, mounted])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY < 300) {
        setActiveSection('hero')
      } else if (scrollY < 800) {
        setActiveSection('about')
      } else {
        setActiveSection('portals')
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleRefresh = (portal: string) => {
    setIsRefreshing(portal)
    if (portal === 'spider' && spiderIframeRef.current) {
      spiderIframeRef.current.src = spiderIframeRef.current.src
    }
    if (portal === 'soul' && soulIframeRef.current) {
      soulIframeRef.current.src = soulIframeRef.current.src
    }
    setTimeout(() => setIsRefreshing(null), 800)
  }

  const openFullscreen = (iframeRef: React.RefObject<HTMLIFrameElement>) => {
    if (iframeRef.current?.requestFullscreen) {
      iframeRef.current.requestFullscreen()
    }
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en')
  }

  if (!mounted) return null

  const portals = [
    {
      id: 'spider',
      name: currentLang.portals.spider,
      path: '/spider',
      color: '#e62429',
      accent: '#FFE500',
      description: currentLang.portals.spiderDesc,
      dimension: 'χ-23',
      stability: '98.4%',
      iframeRef: spiderIframeRef,
      viewMode: spiderViewMode,
      setViewMode: setSpiderViewMode
    },
    {
      id: 'soul',
      name: currentLang.portals.soul,
      path: '/soul',
      color: '#BB8F4F',
      accent: '#FFE500',
      description: currentLang.portals.soulDesc,
      dimension: 'θ-47',
      stability: '99.7%',
      iframeRef: soulIframeRef,
      viewMode: soulViewMode,
      setViewMode: setSoulViewMode
    }
  ]

  const viewModeButtons = [
    { icon: Smartphone, mode: 'mobile', label: currentLang.portals.mobile },
    { icon: Tablet, mode: 'tablet', label: currentLang.portals.tablet },
    { icon: Monitor, mode: 'desktop', label: currentLang.portals.desktop }
  ] as const

  return (
    <>
      <Preloader isLightMode={isLightMode} showPreloader={showPreloader} />

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: ${isLightMode ? '#00000020' : '#FFFFFF20'};
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #FFE500;
        }
        
        /* Tajawal font for Arabic */
        .font-tajawal {
          font-family: 'Tajawal', sans-serif;
        }
        
        /* Apply Tajawal when Arabic is active */
        ${language === 'ar' ? `
          body, h1, h2, h3, p, span, button, a, .font-mono {
            font-family: 'Tajawal', sans-serif !important;
          }
        ` : ''}
      `}</style>

      <div className={`relative min-h-screen w-full ${
        isLightMode ? 'bg-white' : 'bg-[#0A0A0A]'
      } ${language === 'ar' ? 'font-tajawal' : ''}`}>
        {/* Background */}
        <div className="fixed inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br transition-colors duration-500 ${
            isLightMode 
              ? 'from-white via-zinc-50 to-white' 
              : 'from-[#0A0A0A] via-zinc-900 to-[#0A0A0A]'
          }`} />
          
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`yellow-${i}`}
                className="absolute h-[200%]"
                style={{
                  left: `${i * 10}%`,
                  transform: 'rotate(65deg) translateY(-50%)',
                  top: '-50%',
                  width: '2px',
                  background: `linear-gradient(to bottom, transparent, ${isLightMode ? '#FFE500' : '#FFE50040'}, transparent)`,
                }}
                animate={{ opacity: [0.25, 0.7, 0.25] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "loop", delay: i * 0.2 }}
              />
            ))}
          </div>

          {isLightMode && (
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`black-${i}`}
                  className="absolute h-[200%]"
                  style={{
                    left: `${i * 10 + 0.3}%`,
                    transform: 'rotate(65deg) translateY(-50%)',
                    top: '-50%',
                    width: '1px',
                    background: `linear-gradient(to bottom, transparent, #00000060, transparent)`,
                  }}
                  animate={{ opacity: [0.15, 0.3, 0.15] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "loop", delay: i * 0.2 + 0.1 }}
                />
              ))}
            </div>
          )}

          <div className={`absolute inset-0 transition-colors duration-500 ${
            isLightMode 
              ? 'bg-radial-gradient from-transparent to-white/90' 
              : 'bg-radial-gradient from-transparent to-[#0A0A0A]/90'
          }`} />
        </div>

        {/* Navigation */}
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 mix-blend-difference">
          <div className="flex items-center gap-8">
            <button onClick={() => scrollToSection(heroRef)} className={`text-xs font-mono ${activeSection === 'hero' ? 'text-white' : 'text-white/30'}`}>00</button>
            <button onClick={() => scrollToSection(aboutRef)} className={`text-xs font-mono ${activeSection === 'about' ? 'text-white' : 'text-white/30'}`}>01</button>
            <button onClick={() => scrollToSection(portalsRef)} className={`text-xs font-mono ${activeSection === 'portals' ? 'text-white' : 'text-white/30'}`}>02</button>
          </div>
        </div>

        {/* Theme Toggle & Language Toggle */}
        <div className="fixed bottom-8 right-8 z-50 flex gap-3 mix-blend-difference">
          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage}
            className="text-white/60 hover:text-white transition-colors bg-black/20 backdrop-blur-sm rounded-full p-2"
          >
            <Languages size={18} />
          </button>
          
          {/* Theme Toggle */}
          <button 
            onClick={() => setIsLightMode(!isLightMode)} 
            className="text-white/60 hover:text-white transition-colors bg-black/20 backdrop-blur-sm rounded-full p-2"
          >
            {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>

        {/* 00 - HERO */}
        <section ref={heroRef} className="relative z-10 h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className={`text-8xl md:text-9xl lg:text-9xl font-black tracking-tighter mb-4 ${
                  isLightMode ? 'text-black' : 'text-white'
                } ${language === 'ar' ? 'font-tajawal' : ''}`}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {currentLang.hero.title}
              </motion.h1>

              <motion.p 
                className={`text-base max-w-md mx-auto leading-relaxed ${
                  isLightMode ? 'text-black/50' : 'text-white/40'
                } ${language === 'ar' ? 'font-tajawal' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {currentLang.hero.subtitle}
              </motion.p>

              <motion.div 
                className={`w-12 h-[2px] mx-auto mt-8 ${
                  isLightMode ? 'bg-[#FFE500]' : 'bg-[#FFE500]/40'
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </motion.div>
          </div>

          <motion.div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          >
            <ChevronDown size={18} className={isLightMode ? 'text-black/30' : 'text-white/30'} />
          </motion.div>
        </section>

        {/* 01 - WHAT IS A PORTAL */}
        <section ref={aboutRef} className="relative z-10 h-screen flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left - Minimal door */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center md:items-start"
              >
                <div className="relative w-20 h-32 mb-6">
                  <div className={`absolute inset-0 border ${isLightMode ? 'border-black/20' : 'border-white/20'}`} />
                  <div className={`absolute top-1/2 -translate-y-1/2 right-2 w-1 h-1 rounded-full ${isLightMode ? 'bg-black/30' : 'bg-white/30'}`} />
                  <div className={`absolute top-3 bottom-3 left-1/2 w-px ${isLightMode ? 'bg-black/10' : 'bg-white/10'}`} />
                </div>

                <h2 className={`text-3xl md:text-4xl font-light tracking-wide ${
                  isLightMode ? 'text-black/60' : 'text-white/50'
                } ${language === 'ar' ? 'font-tajawal' : ''}`}>
                  {currentLang.about.portal}
                </h2>
              </motion.div>

              {/* Right - Answer */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <p className={`text-base md:text-lg leading-relaxed ${
                  isLightMode ? 'text-black/60' : 'text-white/50'
                } ${language === 'ar' ? 'font-tajawal' : ''}`}>
                  {currentLang.about.line1}
                  <span className={`block mt-2 ${isLightMode ? 'text-[#FFE500]' : 'text-[#FFE500]'} ${language === 'ar' ? 'font-tajawal' : ''}`}>
                    {currentLang.about.line2}
                  </span>
                </p>
                
                <p className={`text-base md:text-lg leading-relaxed ${
                  isLightMode ? 'text-black/60' : 'text-white/50'
                } ${language === 'ar' ? 'font-tajawal' : ''}`}>
                  {currentLang.about.line3}
                  <br />{currentLang.about.line4}
                  <br />{currentLang.about.line5}
                </p>

                <div className="pt-4">
                  <p className={`text-base md:text-lg font-light ${
                    isLightMode ? 'text-black/80' : 'text-white/70'
                  } ${language === 'ar' ? 'font-tajawal' : ''}`}>
                    {currentLang.about.line6}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className={`w-8 h-px ${isLightMode ? 'bg-[#FFE500]' : 'bg-[#FFE500]/40'}`} />
                    <span className={`text-sm font-mono ${isLightMode ? 'text-[#FFE500]' : 'text-[#FFE500]'} ${language === 'ar' ? 'font-tajawal' : ''}`}>
                      {currentLang.about.line7}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 02 - PORTALS with IFRAME PREVIEWS */}
        <section ref={portalsRef} className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {portals.map((portal, index) => (
                <motion.div
                  key={portal.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="w-full"
                >
                  <div className="relative group h-full flex flex-col">
                    {/* Glow effect */}
                    <motion.div
                      className="absolute -inset-4 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: `radial-gradient(circle at center, ${portal.accent}20, transparent 70%)`,
                        filter: 'blur(20px)',
                      }}
                    />

                    {/* Main Card */}
                    <div 
                      className={`relative backdrop-blur-sm overflow-hidden transition-all duration-500 flex-1 flex flex-col ${
                        isLightMode 
                          ? 'bg-white/95' 
                          : 'bg-[#0A0A0A]/90'
                      }`}
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0% 100%)',
                      }}
                    >
                      {/* Border system */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div 
                          className={`absolute inset-0 border-2 ${
                            isLightMode ? 'border-[#FFE500]' : 'border-[#FFE500]/20'
                          }`} 
                          style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0% 100%)', zIndex: 30 }} 
                        />
                        
                        {isLightMode && (
                          <>
                            <div 
                              className="absolute inset-0 border-2 border-black/30" 
                              style={{ 
                                clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0% 100%)',
                                transform: 'translate(2px, 2px)',
                                zIndex: 20,
                              }} 
                            />
                            <div 
                              className="absolute inset-0 border border-black/20" 
                              style={{ 
                                clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0% 100%)',
                                transform: 'translate(-1px, -1px)',
                                zIndex: 10,
                              }} 
                            />
                          </>
                        )}
                        
                        {/* Diagonal accent */}
                        <div className="absolute top-0 right-0 w-32 h-[2px] bg-[#FFE500] transform rotate-45 translate-x-12 translate-y-12 z-30" />
                      </div>

                      {/* Content */}
                      <div className="relative z-40 p-6 flex-1 flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xs font-mono ${isLightMode ? 'text-black/30' : 'text-white/20'} ${language === 'ar' ? 'font-tajawal' : ''}`}>
                            {index === 0 ? '01' : '02'}
                          </span>
                        </div>

                        {/* Title and description */}
                        <div className="mb-4">
                          <h2 className={`text-2xl md:text-3xl font-black tracking-tighter mb-2 ${
                            isLightMode ? 'text-black' : 'text-white'
                          } ${language === 'ar' ? 'font-tajawal' : ''}`}>
                            {portal.name}
                          </h2>
                          <p className={`text-xs font-mono ${
                            isLightMode ? 'text-black/40' : 'text-white/30'
                          } ${language === 'ar' ? 'font-tajawal' : ''}`}>
                            {portal.description}
                          </p>
                        </div>

                        {/* Device Controls */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          {viewModeButtons.map(({ icon: Icon, mode, label }) => (
                            <button
                              key={mode}
                              onClick={() => portal.setViewMode(mode)}
                              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-mono border rounded transition-all ${
                                portal.viewMode === mode
                                  ? isLightMode 
                                    ? 'bg-[#FFE500] border-[#FFE500] text-black' 
                                    : 'bg-[#FFE500] border-[#FFE500] text-black'
                                  : isLightMode 
                                    ? 'border-black/20 text-black/60 hover:border-[#FFE500]' 
                                    : 'border-white/20 text-white/60 hover:border-[#FFE500]'
                              } ${language === 'ar' ? 'font-tajawal' : ''}`}
                            >
                              <Icon size={12} />
                              <span>{label}</span>
                            </button>
                          ))}
                          
                          <div className="flex items-center gap-1 ml-auto">
                            <button
                              onClick={() => handleRefresh(portal.id)}
                              disabled={isRefreshing === portal.id}
                              className={`p-1.5 rounded transition-colors ${
                                isLightMode 
                                  ? 'border border-black/20 hover:border-[#FFE500] text-black/60 hover:text-[#FFE500]' 
                                  : 'border border-white/20 hover:border-[#FFE500] text-white/60 hover:text-[#FFE500]'
                              }`}
                            >
                              <RefreshCw size={14} className={isRefreshing === portal.id ? 'animate-spin' : ''} />
                            </button>
                            <button
                              onClick={() => openFullscreen(portal.iframeRef)}
                              className={`p-1.5 rounded transition-colors ${
                                isLightMode 
                                  ? 'border border-black/20 hover:border-[#FFE500] text-black/60 hover:text-[#FFE500]' 
                                  : 'border border-white/20 hover:border-[#FFE500] text-white/60 hover:text-[#FFE500]'
                              }`}
                            >
                              <Maximize2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Iframe Preview */}
                        <div className="relative mb-4 bg-black/5 dark:bg-white/5 rounded-lg overflow-hidden">
                          <div className={`${portal.viewMode !== 'desktop' ? 'flex justify-center' : ''}`}>
                            <div
                              style={{
                                width: viewportSizes[portal.viewMode].width,
                                maxWidth: '100%',
                                margin: '0 auto'
                              }}
                            >
                              <iframe
                                ref={portal.iframeRef}
                                src={typeof window !== 'undefined' ? window.location.origin + portal.path : ''}
                                className={`w-full ${
                                  portal.viewMode === 'mobile' ? 'h-[500px]' : 
                                  portal.viewMode === 'tablet' ? 'h-[600px]' : 'h-[400px]'
                                } rounded-lg border ${
                                  portal.viewMode !== 'desktop' ? 'border-2 border-black/20 dark:border-white/20' : 'border-black/10 dark:border-white/10'
                                }`}
                                title={`${portal.name} Preview`}
                                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div>
                            <p className={`text-[10px] font-mono mb-1 ${
                              isLightMode ? 'text-[#FFE500]' : 'text-[#FFE500]/60'
                            } ${language === 'ar' ? 'font-tajawal' : ''}`}>
                              {currentLang.portals.dimension}
                            </p>
                            <p className={`text-xs font-mono ${
                              isLightMode ? 'text-black' : 'text-white/80'
                            } ${language === 'ar' ? 'font-tajawal' : ''}`}>{portal.dimension}</p>
                          </div>
                          <div>
                            <p className={`text-[10px] font-mono mb-1 ${
                              isLightMode ? 'text-[#FFE500]' : 'text-[#FFE500]/60'
                            } ${language === 'ar' ? 'font-tajawal' : ''}`}>
                              {currentLang.portals.stability}
                            </p>
                            <p className={`text-xs font-mono ${
                              isLightMode ? 'text-black' : 'text-white/80'
                            } ${language === 'ar' ? 'font-tajawal' : ''}`}>{portal.stability}</p>
                          </div>
                        </div>

                        {/* Enter Button */}
                        <Link href={portal.path}>
                          <motion.div 
                            className={`flex items-center justify-center gap-2 py-3 px-4 border rounded transition-colors cursor-pointer ${
                              isLightMode 
                                ? 'border-black/20 hover:border-[#FFE500] text-black/70 hover:text-[#FFE500]' 
                                : 'border-white/20 hover:border-[#FFE500] text-white/70 hover:text-[#FFE500]'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className={`text-sm font-mono ${language === 'ar' ? 'font-tajawal' : ''}`}>{currentLang.portals.enter}</span>
                            <ArrowRight size={16} className={language === 'ar' ? 'rotate-180' : ''} />
                          </motion.div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <p className={`text-xs font-mono tracking-[0.3em] ${
                isLightMode ? 'text-black/20' : 'text-white/20'
              } ${language === 'ar' ? 'font-tajawal' : ''}`}>
                {currentLang.portals.footer}
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}