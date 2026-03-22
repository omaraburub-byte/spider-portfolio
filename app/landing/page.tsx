// app/landing/page.tsx - ADVENTUROUS PORTAL with OMAR'S STORY & READABLE POPUPS
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Sun, Moon, ChevronDown, Smartphone, Tablet, Monitor, Maximize2, RefreshCw, Languages, Compass, MapPin, Mountain, BookOpen } from 'lucide-react'
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
  const storyRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const portalsRef = useRef<HTMLDivElement>(null)

  const viewportSizes = {
    mobile: { width: '375px', height: '500px' },
    tablet: { width: '640px', height: '600px' },
    desktop: { width: '100%', height: '400px' }
  }

  // Translations - Proper case
  const t = {
    en: {
      hero: {
        title: 'Omar',
        subtitle: 'Makes portals. Code meets consciousness.',
        adventure: 'The Journey Begins Here',
        chapterTitle: 'The Journey Begins'
      },
      story: {
        chapterTitle: "Omar's Story",
        intro: 'It started with imagination.',
        line1: 'As a child, Omar didn\'t just play with toys, he built worlds.',
        line2: 'Every cardboard box was a spaceship. Every blanket fort, a castle.',
        line3: 'He would stare at the stars and imagine stepping through portals to distant galaxies.',
        line4: 'That same imagination never left him. It just found new tools: code, design, and the digital realm.',
        line5: 'Now, he builds portals not with cardboard, but with pixels and purpose.',
        quote: 'The adventure never ended. It just Evolved.',
        journeyContinues: 'the journey continues...'
      },
      about: {
        portal: 'portal',
        line1: 'A doorway. A threshold.',
        line2: 'here → there',
        line3: 'Between dimensions.',
        line4: 'Between minds.',
        line5: 'Between what is and what could be.',
        line6: 'Two exist.',
        line7: 'choose one',
        chapterTitle: 'What is a Portal?'
      },
      portals: {
        spider: 'spider-verse',
        soul: 'soul world',
        spiderDesc: 'comic dimension · dynamic · playful',
        soulDesc: 'warmth · intention · minimal',
        dimension: 'dimension',
        stability: 'stability',
        enter: 'enter dimension',
        mobile: 'Mobile',
        tablet: 'Tablet',
        desktop: 'Desktop',
        footer: '·  two worlds · one portal  ·',
        chapterTitle: 'Two Worlds'
      },
      nav: ['hero', 'story', 'about', 'portals']
    },
    ar: {
      hero: {
        title: 'عمر',
        subtitle: 'صانع بوابات. حيث يلتقي الكود بالوعي.',
        adventure: 'الرحلة تبدأ هنا',
        chapterTitle: 'تبدأ الرحلة'
      },
      story: {
        chapterTitle: 'قصة عمر',
        intro: 'بدأت مع الخيال.',
        line1: 'عندما كان عمر طفلاً، لم يكن فقط يلعب بالألعاب، كان يبني عوالم.',
        line2: 'كل صندوق من الورق المقوى كان سفينة فضاء. كل قلعة من البطانيات كانت قصراً.',
        line3: 'كان يحدق في النجوم ويتخيل المرور عبر بوابات إلى مجرات بعيدة.',
        line4: 'ذلك الخيال لم يفارقه أبداً. لقد وجد أدوات جديدة: الكود، التصميم، والعالم الرقمي.',
        line5: 'الآن، يبني بوابات ليس بالكرتون، بل بالبكسل والهدف.',
        quote: 'المغامرة لم تنتهِ أبداً. لقد تطورت فقط.',
        journeyContinues: 'الرحلة مستمرة...'
      },
      about: {
        portal: 'بَوَّابَة',
        line1: 'مَدخل. عَتَبَة.',
        line2: 'هنا ← هناك',
        line3: 'بين الأبعاد.',
        line4: 'بين العقول.',
        line5: 'بين ما هو وما يمكن أن يكون.',
        line6: 'اثنان موجودان.',
        line7: 'اختر واحدة',
        chapterTitle: 'ما هي البوابة؟'
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
        footer: '·  عَالَمَان · بَوَّابَة وَاحِدَة  ·',
        chapterTitle: 'عالمين'
      },
      nav: ['الرَّئِيسِيَّة', 'القصة', 'عَنِ', 'البَوَّابَات']
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
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
      if (language === 'ar') {
        document.documentElement.classList.add('font-arabic')
      } else {
        document.documentElement.classList.remove('font-arabic')
      }
    }
  }, [language, mounted])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY < 300) {
        setActiveSection('hero')
      } else if (scrollY < 900) {
        setActiveSection('story')
      } else if (scrollY < 1500) {
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
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800;900&display=swap');
        
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
        
        /* Nathan Font - Uncharted Style */
        @font-face {
          font-family: 'Nathan';
          src: url('/fonts/Nathan.ttf') format('truetype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        
        /* Base font for English */
        body, h1, h2, h3, p, span, button, a {
          font-family: 'Poppins', sans-serif;
        }
        
        /* Readable small text font */
        .small-text {
          font-family: 'Montserrat', sans-serif;
          letter-spacing: 0.02em;
          font-weight: 400;
        }
        
        /* Arabic font class */
        .font-arabic body,
        .font-arabic h1,
        .font-arabic h2,
        .font-arabic h3,
        .font-arabic p,
        .font-arabic span,
        .font-arabic button,
        .font-arabic a,
        .font-arabic .small-text {
          font-family: 'Tajawal', sans-serif !important;
        }
        
        /* Nathan font for chapter headings with black shadow for visibility */
        .chapter-heading {
          font-family: 'Nathan', 'Poppins', sans-serif;
          letter-spacing: 0.08em;
          font-weight: 400;
          text-transform: none;
          text-shadow: ${isLightMode ? '2px 2px 0px rgba(0,0,0,0.3), 1px 1px 0px rgba(0,0,0,0.2)' : 'none'};
        }
        
        /* In Arabic, keep Nathan for chapter headings */
        .font-arabic .chapter-heading {
          font-family: 'Nathan', 'Tajawal', sans-serif !important;
          text-shadow: ${isLightMode ? '2px 2px 0px rgba(0,0,0,0.3), 1px 1px 0px rgba(0,0,0,0.2)' : 'none'};
        }
        
        .section-number {
          font-family: 'Nathan', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: none;
          text-shadow: ${isLightMode ? '1px 1px 0px rgba(0,0,0,0.2)' : 'none'};
        }
        
        .font-arabic .section-number {
          font-family: 'Nathan', monospace !important;
        }
        
        /* Story text - Nathan font for English */
        .story-text {
          font-family: 'Nathan', 'Poppins', sans-serif;
          font-weight: 400;
          line-height: 1.6;
          letter-spacing: 0.01em;
        }
        
        .story-quote {
          font-family: 'Nathan', 'Poppins', sans-serif;
          font-style: italic;
          font-weight: 400;
          letter-spacing: 0.02em;
        }
        
        .adventure-text {
          font-family: 'Poppins', sans-serif;
          letter-spacing: -0.02em;
          font-weight: 700;
          text-transform: none;
        }
        
        .adventure-subtle {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          letter-spacing: 0.02em;
          text-transform: none;
        }
        
        .font-arabic .adventure-text,
        .font-arabic .adventure-subtle,
        .font-arabic .story-text,
        .font-arabic .story-quote {
          font-family: 'Tajawal', sans-serif !important;
        }
        
        .rugged-overlay {
          position: relative;
        }
        
        .rugged-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.5;
        }
      `}</style>

      <div className={`relative min-h-screen w-full ${
        isLightMode ? 'bg-white' : 'bg-[#0A0A0A]'
      } rugged-overlay`}>
        {/* Background */}
        <div className="fixed inset-0">
          {/* Vintage World Map Background - ovmap.jpg with improved light mode styling */}
          <div className="absolute inset-0">
            <Image
              src="/ovmap.jpg"
              alt="Vintage World Map"
              fill
              className="object-cover"
              priority
              quality={100}
              style={{
                opacity: isLightMode ? 0.25 : 0.6,
                filter: isLightMode ? 'sepia(0.3) contrast(1.2) brightness(1.1)' : 'sepia(0.2) contrast(1.1)',
              }}
              onError={(e) => {
                console.error('Failed to load /ovmap.jpg');
              }}
            />
            {/* Softer overlay for light mode */}
            <div className={`absolute inset-0 ${
              isLightMode 
                ? 'bg-gradient-to-br from-white/85 via-white/70 to-white/85' 
                : 'bg-[#0A0A0A]/70'
            }`} />
          </div>
          
          {/* Original gradient overlays - adjusted for light mode */}
          <div className={`absolute inset-0 bg-gradient-to-br transition-colors duration-500 ${
            isLightMode 
              ? 'from-white/30 via-transparent to-white/30' 
              : 'from-[#0A0A0A] via-zinc-900 to-[#0A0A0A]'
          } ${isLightMode ? 'opacity-100' : 'opacity-40'}`} />
          
          {/* Compass-inspired decorative lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-full bg-[#FFE500]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-[#FFE500]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-[#FFE500]/20" />
          </div>
          
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
                  background: `linear-gradient(to bottom, transparent, ${isLightMode ? '#FFE50060' : '#FFE50040'}, transparent)`,
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
                    background: `linear-gradient(to bottom, transparent, #00000030, transparent)`,
                  }}
                  animate={{ opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "loop", delay: i * 0.2 + 0.1 }}
                />
              ))}
            </div>
          )}

          <div className={`absolute inset-0 transition-colors duration-500 ${
            isLightMode 
              ? 'bg-radial-gradient from-transparent via-white/20 to-white/60' 
              : 'bg-radial-gradient from-transparent to-[#0A0A0A]/90'
          }`} />
        </div>

        {/* Navigation */}
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 mix-blend-difference">
          <div className="flex items-center gap-6 md:gap-8">
            <button onClick={() => scrollToSection(heroRef)} className={`text-xs section-number ${activeSection === 'hero' ? 'text-white' : 'text-white/30'}`}>00</button>
            <button onClick={() => scrollToSection(storyRef)} className={`text-xs section-number ${activeSection === 'story' ? 'text-white' : 'text-white/30'}`}>01</button>
            <button onClick={() => scrollToSection(aboutRef)} className={`text-xs section-number ${activeSection === 'about' ? 'text-white' : 'text-white/30'}`}>02</button>
            <button onClick={() => scrollToSection(portalsRef)} className={`text-xs section-number ${activeSection === 'portals' ? 'text-white' : 'text-white/30'}`}>03</button>
          </div>
        </div>

        {/* Theme Toggle & Language Toggle */}
        <div className="fixed bottom-8 right-8 z-50 flex gap-3 mix-blend-difference">
          <button 
            onClick={toggleLanguage}
            className="text-white/60 hover:text-white transition-colors bg-black/20 backdrop-blur-sm rounded-full p-2"
          >
            <Languages size={18} />
          </button>
          <button 
            onClick={() => setIsLightMode(!isLightMode)} 
            className="text-white/60 hover:text-white transition-colors bg-black/20 backdrop-blur-sm rounded-full p-2"
          >
            {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>

        {/* 00 - HERO */}
        <section ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center gap-3 mb-6"
            >
              <span className={`text-sm section-number ${isLightMode ? 'text-black/40' : 'text-white/40'}`}>chapter 00</span>
              <span className={`text-2xl md:text-3xl tracking-wider chapter-heading ${isLightMode ? 'text-[#FFE500]' : 'text-[#FFE500]/80'}`}>
                {currentLang.hero.chapterTitle}
              </span>
              <div className={`w-24 h-px ${isLightMode ? 'bg-[#FFE500]/50' : 'bg-[#FFE500]/30'}`} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Compass icon - with spinning animation and solid shadow */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex justify-center mb-6"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    filter: isLightMode 
                      ? 'drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.6)) drop-shadow(1px 1px 0px rgba(0, 0, 0, 0.4))' 
                      : 'none'
                  }}
                >
                  <Compass 
                    size={32} 
                    className={`${isLightMode ? 'text-[#FFE500]' : 'text-[#FFE500]/70'}`} 
                  />
                </motion.div>
              </motion.div>

              <motion.h1 
                className={`text-8xl md:text-9xl lg:text-9xl font-black tracking-tighter mb-4 ${
                  isLightMode ? 'text-black' : 'text-white'
                } chapter-heading`}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ textTransform: 'none' }}
              >
                {currentLang.hero.title}
              </motion.h1>

              <motion.p 
                className={`text-base max-w-md mx-auto leading-relaxed ${
                  isLightMode ? 'text-black/50' : 'text-white/40'
                } adventure-subtle`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {currentLang.hero.subtitle}
              </motion.p>

              {/* Adventure tagline - NO SHADOW */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className={`text-xs font-mono mt-4 flex items-center justify-center gap-2 ${
                  isLightMode ? 'text-black/30' : 'text-white/30'
                }`}
              >
                <MapPin size={12} />
                <span>{currentLang.hero.adventure}</span>
                <Mountain size={12} />
              </motion.p>

              <motion.div 
                className={`w-12 h-[2px] mx-auto mt-8 ${
                  isLightMode ? 'bg-[#FFE500]' : 'bg-[#FFE500]/40'
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
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

        {/* 01 - OMAR'S STORY */}
        <section ref={storyRef} className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
          <div className="max-w-4xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center gap-3 mb-12"
            >
              <span className={`text-sm section-number ${isLightMode ? 'text-black/40' : 'text-white/40'}`}>chapter 01</span>
              <span className={`text-2xl md:text-3xl tracking-wider chapter-heading ${isLightMode ? 'text-[#FFE500]' : 'text-[#FFE500]/80'}`}>
                {currentLang.story.chapterTitle}
              </span>
              <div className={`w-24 h-px ${isLightMode ? 'bg-[#FFE500]/50' : 'bg-[#FFE500]/30'}`} />
            </motion.div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mb-8"
              >
                <BookOpen size={40} className={`${isLightMode ? 'text-[#FFE500]' : 'text-[#FFE500]/60'}`} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className={`text-xl md:text-2xl font-light italic text-center story-text ${
                  isLightMode ? 'text-black/70' : 'text-white/60'
                }`}
              >
                "{currentLang.story.intro}"
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-4 mt-8"
              >
                {[1, 2, 3, 4, 5].map((num) => {
                  const lineKey = `line${num}` as keyof typeof currentLang.story
                  const lineText = currentLang.story[lineKey]
                  return (
                    <div key={num} className="relative group">
                      <p className={`text-base md:text-lg leading-relaxed story-text cursor-help ${
                        isLightMode ? 'text-black/60' : 'text-white/50'
                      }`}>
                        {lineText}
                      </p>
                      
                      {/* Readable popup - journal/paper style */}
                      <div className="absolute left-0 bottom-full mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none">
                        <div className={`relative p-4 rounded-lg max-w-sm ${
                          isLightMode 
                            ? 'bg-white border border-gray-200 shadow-xl' 
                            : 'bg-[#1a1a1a] border border-gray-700 shadow-2xl'
                        }`}>
                          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FFE500]/30 rounded-tl-lg" />
                          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FFE500]/30 rounded-tr-lg" />
                          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#FFE500]/30 rounded-bl-lg" />
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FFE500]/30 rounded-br-lg" />
                          
                          <p className={`text-sm leading-relaxed font-sans ${
                            isLightMode ? 'text-black' : 'text-white'
                          }`}>
                            {lineText}
                          </p>
                          
                          <div className={`mt-2 pt-2 text-[10px] font-mono ${
                            isLightMode ? 'text-black/30' : 'text-white/30'
                          }`}>
                            — Omar's Journal
                          </div>
                        </div>
                        
                        <div className={`absolute left-6 -bottom-1 w-3 h-3 rotate-45 ${
                          isLightMode ? 'bg-white border-r border-b border-gray-200' : 'bg-[#1a1a1a] border-r border-b border-gray-700'
                        }`} />
                      </div>
                    </div>
                  )
                })}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-12 pt-8 border-t border-[#FFE500]/20"
              >
                <p 
                  className={`text-lg md:text-xl font-light text-center italic story-quote ${
                    isLightMode ? 'text-[#FFE500]' : 'text-[#FFE500]'
                  }`}
                  style={{
                    textShadow: isLightMode 
                      ? '1px 1px 0px rgba(0, 0, 0, 0.4), 0.5px 0.5px 0px rgba(0, 0, 0, 0.2)'
                      : 'none'
                  }}
                >
                  "{currentLang.story.quote}"
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 02 - WHAT IS A PORTAL */}
        <section ref={aboutRef} className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center gap-3 mb-12"
            >
              <span className={`text-sm section-number ${isLightMode ? 'text-black/40' : 'text-white/40'}`}>chapter 02</span>
              <span className={`text-2xl md:text-3xl tracking-wider chapter-heading ${isLightMode ? 'text-[#FFE500]' : 'text-[#FFE500]/80'}`}>
                {currentLang.about.chapterTitle}
              </span>
              <div className={`w-24 h-px ${isLightMode ? 'bg-[#FFE500]/50' : 'bg-[#FFE500]/30'}`} />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left - Adventurous door */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center md:items-start"
              >
                <div className="relative w-20 h-32 mb-6">
                  <div className={`absolute inset-0 border-2 ${isLightMode ? 'border-[#FFE500]' : 'border-[#FFE500]/40'}`} />
                  <div className={`absolute top-1/2 -translate-y-1/2 right-2 w-2 h-2 rounded-full ${isLightMode ? 'bg-[#FFE500]' : 'bg-[#FFE500]/60'}`} />
                  <div className={`absolute top-3 bottom-3 left-1/2 w-px ${isLightMode ? 'bg-[#FFE500]/30' : 'bg-[#FFE500]/20'}`} />
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2">
                    <Compass size={20} className={isLightMode ? 'text-[#FFE500]/40' : 'text-[#FFE500]/30'} />
                  </div>
                </div>

                <h2 className={`text-3xl md:text-4xl font-light tracking-wide ${
                  isLightMode ? 'text-black/60' : 'text-white/50'
                } chapter-heading`}>
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
                }`}>
                  {currentLang.about.line1}
                  <span className={`block mt-2 text-lg ${isLightMode ? 'text-[#FFE500]' : 'text-[#FFE500]'} adventure-text`}>
                    {currentLang.about.line2}
                  </span>
                </p>
                
                <p className={`text-base md:text-lg leading-relaxed ${
                  isLightMode ? 'text-black/60' : 'text-white/50'
                }`}>
                  {currentLang.about.line3}
                  <br />{currentLang.about.line4}
                  <br />{currentLang.about.line5}
                </p>

                <div className="pt-4">
                  <p className={`text-base md:text-lg font-light ${
                    isLightMode ? 'text-black/80' : 'text-white/70'
                  } adventure-text`}>
                    {currentLang.about.line6}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className={`w-8 h-px ${isLightMode ? 'bg-[#FFE500]' : 'bg-[#FFE500]/40'}`} />
                    <span className={`text-sm font-mono ${isLightMode ? 'text-[#FFE500]' : 'text-[#FFE500]'} chapter-heading`}>
                      {currentLang.about.line7}
                    </span>
                    <Mountain size={12} className={isLightMode ? 'text-[#FFE500]/40' : 'text-[#FFE500]/30'} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 03 - PORTALS with IFRAME PREVIEWS */}
        <section ref={portalsRef} className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
          <div className="w-full max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center gap-3 mb-12"
            >
              <span className={`text-sm section-number ${isLightMode ? 'text-black/40' : 'text-white/40'}`}>chapter 03</span>
              <span className={`text-2xl md:text-3xl tracking-wider chapter-heading ${isLightMode ? 'text-[#FFE500]' : 'text-[#FFE500]/80'}`}>
                {currentLang.portals.chapterTitle}
              </span>
              <div className={`w-24 h-px ${isLightMode ? 'bg-[#FFE500]/50' : 'bg-[#FFE500]/30'}`} />
            </motion.div>

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
                    <motion.div
                      className="absolute -inset-4 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: `radial-gradient(circle at center, ${portal.accent}20, transparent 70%)`,
                        filter: 'blur(20px)',
                      }}
                    />

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
                        
                        <div className="absolute top-0 right-0 w-32 h-[2px] bg-[#FFE500] transform rotate-45 translate-x-12 translate-y-12 z-30" />
                      </div>

                      <div className="relative z-40 p-6 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xs font-mono ${isLightMode ? 'text-black/30' : 'text-white/20'} section-number`}>
                            {index === 0 ? '01' : '02'}
                          </span>
                          <Compass size={14} className={`${isLightMode ? 'text-[#FFE500]/40' : 'text-[#FFE500]/30'}`} />
                        </div>

                        <div className="mb-4">
                          <h2 className={`text-2xl md:text-3xl font-black tracking-tighter mb-2 ${
                            isLightMode ? 'text-black' : 'text-white'
                          } chapter-heading`}>
                            {portal.name}
                          </h2>
                          <p className={`text-xs font-mono ${
                            isLightMode ? 'text-black/40' : 'text-white/30'
                          }`}>
                            {portal.description}
                          </p>
                        </div>

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
                              }`}
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

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div>
                            <p className={`text-[10px] font-mono mb-1 small-text ${
                              isLightMode ? 'text-[#FFE500]' : 'text-[#FFE500]/60'
                            }`}>
                              {currentLang.portals.dimension}
                            </p>
                            <p className={`text-xs font-mono small-text ${
                              isLightMode ? 'text-black' : 'text-white/80'
                            }`}>{portal.dimension}</p>
                          </div>
                          <div>
                            <p className={`text-[10px] font-mono mb-1 small-text ${
                              isLightMode ? 'text-[#FFE500]' : 'text-[#FFE500]/60'
                            }`}>
                              {currentLang.portals.stability}
                            </p>
                            <p className={`text-xs font-mono small-text ${
                              isLightMode ? 'text-black' : 'text-white/80'
                            }`}>{portal.stability}</p>
                          </div>
                        </div>

                        <Link href={portal.path}>
                          <motion.div 
                            className={`flex items-center justify-center gap-2 py-3 px-4 border rounded transition-colors cursor-pointer ${
                              isLightMode 
                                ? 'border-black/20 hover:border-[#FFE500] text-black/70 hover:text-[#FFE500]' 
                                : 'border-white/20 hover:border-[#FFE500] text-white/70 hover:text-[#FFE500]'
                            } adventure-text`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="text-sm font-mono">{currentLang.portals.enter}</span>
                            <ArrowRight size={16} className={language === 'ar' ? 'rotate-180' : ''} />
                          </motion.div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer - NO SHADOWS */}
            <div className="mt-16 text-center space-y-6">
              {/* Journey continues line */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
              >
                <p className={`text-xs font-mono tracking-[0.2em] ${
                  isLightMode ? 'text-black/25' : 'text-white/20'
                }`}>
                  {currentLang.story.journeyContinues}
                </p>
              </motion.div>

              {/* Main portal line */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              >
                <p className={`text-xs font-mono tracking-[0.3em] ${
                  isLightMode ? 'text-black/40' : 'text-white/30'
                }`}>
                  {currentLang.portals.footer}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}