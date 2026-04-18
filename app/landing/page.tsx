// app/landing/page.tsx - FIXED PRELOADER PROP
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight, ChevronDown, Smartphone, Tablet, Monitor, Maximize2, RefreshCw, Languages, Compass, MapPin, Mountain, BookOpen } from 'lucide-react'
import Preloader from '@/components/PPreloader'

// ─── Theme constants (dark mode only) ──────────────────────────────────────
const th = {
  text:       'text-white/90',
  textFaint:  'text-white/60',
  textStrong: 'text-white',
  border:     'border-white/10',
  surface:    'bg-[#0D0D0D]',
  accent:     '#FFD700',
}

export default function RacingPortalPage() {
  const [mounted, setMounted]           = useState(false)
  const [hoveredPortal, setHoveredPortal] = useState<string | null>(null)
  const [showPreloader, setShowPreloader] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')
  const [language, setLanguage]         = useState<'en' | 'ar'>('en')
  const [expandedLine, setExpandedLine] = useState<number | null>(null)
  const [hasAnimated, setHasAnimated]   = useState<Record<string, boolean>>({})

  const [spiderViewMode, setSpiderViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [soulViewMode,   setSoulViewMode]   = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [isRefreshing,   setIsRefreshing]   = useState<string | null>(null)
  const [iframeOrigin,   setIframeOrigin]   = useState('')

  const spiderIframeRef = useRef<HTMLIFrameElement>(null)
  const soulIframeRef   = useRef<HTMLIFrameElement>(null)
  const heroRef         = useRef<HTMLDivElement>(null)
  const storyRef        = useRef<HTMLDivElement>(null)
  const aboutRef        = useRef<HTMLDivElement>(null)
  const portalsRef      = useRef<HTMLDivElement>(null)

  const viewportSizes = {
    mobile:  { width: '375px', height: '500px' },
    tablet:  { width: '640px', height: '600px' },
    desktop: { width: '100%', height: '400px' },
  }

  const t = {
    en: {
      hero:    { title: 'Omar', subtitle: 'Makes portals. Code meets consciousness.', adventure: 'The Journey Begins Here', chapterTitle: 'The Journey Begins' },
      story: {
        chapterTitle: "Omar's Story",
        intro: 'It started with imagination.',
        line1: "As a child, Omar didn't just play with toys, he built worlds.",
        line2: 'Every cardboard box was a spaceship. Every blanket fort, a castle.',
        line3: 'He would stare at the stars and imagine stepping through portals to distant galaxies.',
        line4: 'That same imagination never left him. It just found new tools: code, design, and the digital realm.',
        line5: 'Now, he builds portals not with cardboard, but with pixels and purpose.',
        quote: 'The adventure never ended. It just Evolved.',
        journeyContinues: 'the journey continues…',
      },
      about: {
        portal: 'portal', line1: 'A doorway. A threshold.', line2: 'here → there',
        line3: 'Between dimensions.', line4: 'Between minds.',
        line5: 'Between what is and what could be.', line6: 'Two exist.', line7: 'choose one',
        chapterTitle: 'What is a Portal?',
      },
      portals: {
        spider: 'spider-verse', soul: 'soul world',
        spiderDesc: 'comic dimension · dynamic · playful', soulDesc: 'serene · intentional · minimal',
        dimension: 'dimension', stability: 'stability', enter: 'enter dimension',
        mobile: 'Mobile', tablet: 'Tablet', desktop: 'Desktop',
        footer: '· two worlds · one portal ·', chapterTitle: 'Two Worlds',
      },
      nav: ['00', '01', '02', '03'],
    },
    ar: {
      hero:    { title: 'عمر', subtitle: 'صانع بوابات. حيث يلتقي الكود بالوعي.', adventure: 'الرحلة تبدأ هنا', chapterTitle: 'تبدأ الرحلة' },
      story: {
        chapterTitle: 'قصة عمر',
        intro: 'بدأت مع الخيال.',
        line1: 'عندما كان عمر طفلاً، لم يكن فقط يلعب بالألعاب، كان يبني عوالم.',
        line2: 'كل صندوق من الورق المقوى كان سفينة فضاء. كل قلعة من البطانيات كانت قصراً.',
        line3: 'كان يحدق في النجوم ويتخيل المرور عبر بوابات إلى مجرات بعيدة.',
        line4: 'ذلك الخيال لم يفارقه أبداً. لقد وجد أدوات جديدة: الكود، التصميم، والعالم الرقمي.',
        line5: 'الآن، يبني بوابات ليس بالكرتون، بل بالبكسل والهدف.',
        quote: 'المغامرة لم تنتهِ أبداً. لقد تطورت فقط.',
        journeyContinues: 'الرحلة مستمرة…',
      },
      about: {
        portal: 'بَوَّابَة', line1: 'مَدخل. عَتَبَة.', line2: 'هنا ← هناك',
        line3: 'بين الأبعاد.', line4: 'بين العقول.',
        line5: 'بين ما هو وما يمكن أن يكون.', line6: 'اثنان موجودان.', line7: 'اختر واحدة',
        chapterTitle: 'ما هي البوابة؟',
      },
      portals: {
        spider: 'عَالَمُ العَنْكَبُوت', soul: 'عَالَمُ الرُّوح',
        spiderDesc: 'بعد كوميدي · ديناميكي · مرح', soulDesc: 'هادئ · مقصود · بسيط',
        dimension: 'البُعْد', stability: 'الثَّبَات', enter: 'ادْخُلِ البُعْد',
        mobile: 'جوال', tablet: 'لوحي', desktop: 'مكتبي',
        footer: '· عَالَمَان · بَوَّابَة وَاحِدَة ·', chapterTitle: 'عالمين',
      },
      nav: ['٠٠', '٠١', '٠٢', '٠٣'],
    },
  }

  const currentLang = t[language]

  useEffect(() => {
    setMounted(true)
    setIframeOrigin(window.location.origin)
    const savedLang = localStorage.getItem('portal-language')
    if (savedLang) setLanguage(savedLang as 'en' | 'ar')
    const timer = setTimeout(() => setShowPreloader(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('portal-language', language)
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.classList.toggle('font-arabic', language === 'ar')
  }, [language, mounted])

  // IntersectionObserver for active section
  useEffect(() => {
    if (!mounted) return

    const sections = [
      { ref: heroRef, id: 'hero' },
      { ref: storyRef, id: 'story' },
      { ref: aboutRef, id: 'about' },
      { ref: portalsRef, id: 'portals' },
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0
        let mostVisibleId = activeSection

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            const section = sections.find(s => s.ref.current === entry.target)
            if (section) mostVisibleId = section.id
          }
        })

        if (maxRatio > 0.15) {
          setActiveSection(mostVisibleId)
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: '-10% 0px -10% 0px'
      }
    )

    sections.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [mounted, activeSection])

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleRefresh = (portal: string) => {
    setIsRefreshing(portal)
    const iref = portal === 'spider' ? spiderIframeRef : soulIframeRef
    if (iref.current) iref.current.src = iref.current.src
    setTimeout(() => setIsRefreshing(null), 800)
  }

  const openFullscreen = (iframeRef: React.RefObject<HTMLIFrameElement | null>) => {
    if (iframeRef.current?.requestFullscreen) iframeRef.current.requestFullscreen()
  }

  const toggleLanguage = () => setLanguage((p) => (p === 'en' ? 'ar' : 'en'))

  const markAnimated = (id: string) => {
    if (!hasAnimated[id]) {
      setHasAnimated(prev => ({ ...prev, [id]: true }))
    }
  }

  if (!mounted) return null

  const portals = [
    {
      id: 'spider', 
      name: currentLang.portals.spider, 
      path: '/spider',
      color: '#e62429', 
      accent: '#FFD700',
      description: currentLang.portals.spiderDesc,
      dimension: 'χ-23', 
      stability: '98.4%',
      iframeRef: spiderIframeRef, 
      viewMode: spiderViewMode, 
      setViewMode: setSpiderViewMode,
    },
    {
      id: 'soul', 
      name: currentLang.portals.soul, 
      path: '/soul',
      color: '#3B82F6', 
      accent: '#60A5FA',
      description: currentLang.portals.soulDesc,
      dimension: 'θ-47', 
      stability: '99.7%',
      iframeRef: soulIframeRef, 
      viewMode: soulViewMode, 
      setViewMode: setSoulViewMode,
    },
  ]

  const viewModeButtons = [
    { icon: Smartphone, mode: 'mobile' as const, label: currentLang.portals.mobile },
    { icon: Tablet,     mode: 'tablet' as const, label: currentLang.portals.tablet },
    { icon: Monitor,    mode: 'desktop' as const, label: currentLang.portals.desktop },
  ]

  const ChapterHeader = ({ num, title, id }: { num: string; title: string; id: string }) => {
    const shouldAnimate = !hasAnimated[id]
    
    return (
      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        onAnimationComplete={() => markAnimated(id)}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-3 mb-14"
      >
        <span className={`text-xs font-mono tracking-widest ${th.textFaint} section-number`}>
          chapter {num}
        </span>
        <span
          className="text-2xl md:text-3xl tracking-wider chapter-heading"
          style={{ 
            color: '#FFD700', 
            textShadow: '0 0 15px rgba(255,215,0,0.2)',
            opacity: 0.95 
          }}
        >
          {title}
        </span>
        <div className="flex items-center gap-2">
          <div className="w-16 h-px" style={{ background: 'rgba(255,215,0,0.35)' }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ background: '#FFD700', opacity: 0.6 }} />
          <div className="w-16 h-px" style={{ background: 'rgba(255,215,0,0.35)' }} />
        </div>
      </motion.div>
    )
  }

  const navItems = [
    { ref: heroRef, id: 'hero', label: currentLang.nav[0] },
    { ref: storyRef, id: 'story', label: currentLang.nav[1] },
    { ref: aboutRef, id: 'about', label: currentLang.nav[2] },
    { ref: portalsRef, id: 'portals', label: currentLang.nav[3] },
  ]

  return (
    <>
      <Preloader isLightMode={false} showPreloader={showPreloader} />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800;900&display=swap');

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #FFFFFF18; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #FFD700; }

        @font-face {
          font-family: 'Nathan';
          src: url('/fonts/Nathan.ttf') format('truetype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        :root {
          --font-body: 'Poppins', sans-serif;
          --font-mono-custom: 'Montserrat', sans-serif;
        }
        .font-arabic { --font-body: 'Tajawal', sans-serif; }

        body, h1, h2, h3, p, span, button, a { font-family: var(--font-body); }
        .small-text { font-family: var(--font-mono-custom); letter-spacing: 0.02em; font-weight: 400; }

        .chapter-heading {
          font-family: 'Nathan', var(--font-body);
          letter-spacing: 0.08em;
          font-weight: 400;
        }
        .section-number {
          font-family: 'Nathan', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
        }
        .story-text  { font-family: 'Nathan', var(--font-body); font-weight: 400; line-height: 1.65; letter-spacing: 0.01em; }
        .story-quote { font-family: 'Nathan', var(--font-body); font-style: italic; font-weight: 400; letter-spacing: 0.025em; }
        .adventure-text   { font-family: var(--font-body); letter-spacing: -0.02em; font-weight: 700; }
        .adventure-subtle { font-family: var(--font-body); font-weight: 400; letter-spacing: 0.02em; }

        .rugged-overlay::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(255,255,255,0.015) 3px,
            rgba(255,255,255,0.015) 4px
          );
          z-index: 1;
        }

        .story-line { cursor: pointer; transition: color 0.2s; }
        .story-line:hover { color: rgba(255,255,255,0.9); }

        .device-frame {
          border-radius: 8px;
          overflow: hidden;
          transition: box-shadow 0.3s;
        }
        .device-frame-mobile  { box-shadow: 0 0 0 2px rgba(255,255,255,0.12); }
        .device-frame-tablet  { box-shadow: 0 0 0 2px rgba(255,255,255,0.10); }
        .device-frame-desktop { box-shadow: none; }

        .nav-dot-active { 
          color: #FFD700 !important;
          text-shadow: 0 0 6px rgba(255,215,0,0.3);
        }
      `}</style>

      <div className="relative min-h-screen w-full rugged-overlay bg-[#0A0A0A]">
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/ovmap.jpg"
            alt="Vintage World Map"
            fill
            className="object-cover"
            priority
            quality={100}
            style={{
              opacity: 0.45,
              filter: 'sepia(0.3) contrast(1.2) brightness(0.7) saturate(0.8)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(10,10,10,0.95) 100%)',
            }}
          />
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Compass cross-hair */}
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.08 }}>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[#FFD700]" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#FFD700]" />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FFD700]"
              style={{ width: 440, height: 440 }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FFD700]"
              style={{ width: 220, height: 220, opacity: 0.5 }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="fixed top-7 left-1/2 -translate-x-1/2 z-50">
          <div
            className="flex items-center gap-1 px-4 py-2 rounded-full backdrop-blur-xl"
            style={{
              background: 'rgba(10,10,10,0.75)',
              border: '1px solid rgba(255,215,0,0.15)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.ref)}
                  className={`relative px-3 py-1 text-xs section-number transition-all duration-300 ${
                    isActive
                      ? 'nav-dot-active'
                      : 'text-white/35 hover:text-white/60'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'rgba(255,215,0,0.08)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="fixed bottom-7 right-7 z-50 flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-xl text-xs font-mono transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(10,10,10,0.75)',
              border: '1px solid rgba(255,215,0,0.15)',
              color: 'rgba(255,255,255,0.6)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
            }}
          >
            <Languages size={13} />
            <span>{language === 'en' ? 'AR' : 'EN'}</span>
          </button>
        </div>

        {/* 00 — HERO */}
        <section ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="flex flex-col items-center gap-3 mb-8"
            >
              <span className={`text-xs section-number ${th.textFaint}`}>chapter 00</span>
              <span
                className="text-2xl md:text-3xl tracking-wider chapter-heading"
                style={{ color: '#FFD700', textShadow: '0 0 15px rgba(255,215,0,0.2)' }}
              >
                {currentLang.hero.chapterTitle}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-px" style={{ background: 'rgba(255,215,0,0.4)' }} />
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: '#FFD700', opacity: 0.7 }} />
                <div className="w-16 h-px" style={{ background: 'rgba(255,215,0,0.4)' }} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex justify-center mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <Compass
                  size={28}
                  style={{ 
                    color: '#FFD700', 
                    opacity: 0.7,
                    filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.3))'
                  }}
                />
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="text-8xl md:text-[10rem] lg:text-[11rem] font-black tracking-[-0.04em] mb-5 chapter-heading text-white"
              style={{ textShadow: '0 0 20px rgba(255,215,0,0.1), 1px 1px 0 rgba(0,0,0,0.5)' }}
            >
              {currentLang.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
              className="text-sm md:text-base max-w-xs mx-auto leading-relaxed adventure-subtle text-white/80"
            >
              {currentLang.hero.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
              className="text-[11px] font-mono mt-5 flex items-center justify-center gap-2"
              style={{ color: 'rgba(255,215,0,0.7)' }}
            >
              <MapPin size={10} />
              {currentLang.hero.adventure}
              <Mountain size={10} />
            </motion.p>

            <motion.div
              className="w-10 h-[1.5px] mx-auto mt-9"
              style={{ background: '#FFD700', opacity: 0.5 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
            />
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <ChevronDown 
              size={16} 
              style={{ color: 'rgba(255,215,0,0.4)' }}
              className="animate-bounce"
            />
          </motion.div>
        </section>

        {/* 01 — OMAR'S STORY */}
        <section ref={storyRef} className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
          <div className="max-w-2xl mx-auto w-full">
            <ChapterHeader id="story-header" num="01" title={currentLang.story.chapterTitle} />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-10"
            >
              <BookOpen size={36} style={{ color: '#FFD700', opacity: 0.6 }} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl font-light italic text-center story-text mb-10 text-white/85"
            >
              &ldquo;{currentLang.story.intro}&rdquo;
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-0"
            >
              {[1, 2, 3, 4, 5].map((num) => {
                const key = `line${num}` as keyof typeof currentLang.story
                const text = currentLang.story[key] as string
                const isOpen = expandedLine === num
                return (
                  <div key={num}>
                    <div
                      className="story-line py-3.5 flex items-start gap-4 group"
                      onClick={() => setExpandedLine(isOpen ? null : num)}
                      style={{ borderBottom: '1px solid rgba(255,215,0,0.1)' }}
                    >
                      <span
                        className="text-[10px] font-mono mt-1 flex-shrink-0 w-5 transition-colors"
                        style={{ color: isOpen ? '#FFD700' : 'rgba(255,255,255,0.25)' }}
                      >
                        {String(num).padStart(2, '0')}
                      </span>
                      <p className="text-base md:text-lg leading-relaxed story-text flex-1 text-white/85">
                        {text}
                      </p>
                      <motion.span
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 mt-1"
                        style={{ color: 'rgba(255,215,0,0.4)' }}
                      >
                        <ChevronDown size={13} />
                      </motion.span>
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div
                            className="mx-9 my-3 p-4 rounded-lg"
                            style={{
                              background: 'rgba(255,215,0,0.05)',
                              border: '1px solid rgba(255,215,0,0.3)',
                            }}
                          >
                            <p className="text-sm leading-relaxed font-sans text-white/80">{text}</p>
                            <div
                              className="mt-3 pt-2 text-[10px] font-mono"
                              style={{ color: 'rgba(255,215,0,0.8)', borderTop: '1px solid rgba(255,215,0,0.2)' }}
                            >
                              — Omar&apos;s Journal
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-14 pt-8"
              style={{ borderTop: '1px solid rgba(255,215,0,0.2)' }}
            >
              <p
                className="text-lg md:text-xl font-light text-center italic story-quote"
                style={{ color: '#FFD700', textShadow: '0 0 15px rgba(255,215,0,0.2)' }}
              >
                &ldquo;{currentLang.story.quote}&rdquo;
              </p>
            </motion.div>
          </div>
        </section>

        {/* 02 — WHAT IS A PORTAL */}
        <section ref={aboutRef} className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto w-full">
            <ChapterHeader id="about-header" num="02" title={currentLang.about.chapterTitle} />

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center md:items-start"
              >
                <div className="relative w-20 h-32 mb-7">
                  <div className="absolute inset-0" style={{ border: '1.5px solid rgba(255,215,0,0.9)' }} />
                  <div className="absolute inset-x-2 inset-y-2" style={{ border: '1px solid rgba(255,215,0,0.5)' }} />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 right-2.5 w-2 h-2 rounded-full"
                    style={{ background: '#FFD700', boxShadow: '0 0 10px #FFD700' }}
                  />
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2">
                    <Compass size={18} style={{ color: 'rgba(255,215,0,0.8)' }} />
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-light tracking-wide chapter-heading text-white/70">
                  {currentLang.about.portal}
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="space-y-7"
              >
                <p className="text-base md:text-lg leading-relaxed text-white/85">
                  {currentLang.about.line1}
                  <span className="block mt-2 text-lg adventure-text" style={{ color: '#FFD700' }}>
                    {currentLang.about.line2}
                  </span>
                </p>
                <p className="text-base md:text-lg leading-relaxed text-white/85">
                  {currentLang.about.line3}<br />
                  {currentLang.about.line4}<br />
                  {currentLang.about.line5}
                </p>
                <div className="pt-2">
                  <p className="text-base md:text-lg font-light adventure-text text-white/75">
                    {currentLang.about.line6}
                  </p>
                  <div className="flex items-center gap-3 mt-2.5">
                    <div className="w-8 h-px" style={{ background: 'rgba(255,215,0,0.4)' }} />
                    <span className="text-sm font-mono chapter-heading" style={{ color: '#FFD700' }}>
                      {currentLang.about.line7}
                    </span>
                    <Mountain size={11} style={{ color: 'rgba(255,215,0,0.4)' }} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 03 — PORTALS */}
        <section ref={portalsRef} className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
          <div className="w-full max-w-6xl mx-auto">
            <ChapterHeader id="portals-header" num="03" title={currentLang.portals.chapterTitle} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
              {portals.map((portal, index) => (
                <motion.div
                  key={portal.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative group"
                  onMouseEnter={() => setHoveredPortal(portal.id)}
                  onMouseLeave={() => setHoveredPortal(null)}
                >
                  <div
                    className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${portal.accent}20, transparent 70%)`,
                      filter: 'blur(20px)',
                    }}
                  />

                  <div
                    className={`relative overflow-hidden transition-all duration-500 ${th.surface}`}
                    style={{
                      border: `1px solid ${
                        hoveredPortal === portal.id
                          ? portal.id === 'soul' ? 'rgba(59,130,246,0.5)' : 'rgba(255,215,0,0.5)'
                          : 'rgba(255,255,255,0.1)'
                      }`,
                      boxShadow: hoveredPortal === portal.id ? '0 10px 30px rgba(0,0,0,0.4)' : 'none',
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: portal.color }}
                    />

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs font-mono ${th.textFaint}`}>
                          {index === 0 ? '01' : '02'}
                        </span>
                        <Compass size={12} style={{ color: portal.id === 'soul' ? '#60A5FA' : '#FFD700', opacity: 0.6 }} />
                      </div>

                      <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-2 chapter-heading text-white">
                        {portal.name}
                      </h2>
                      <p className={`text-xs font-mono mb-5 ${th.textFaint}`}>{portal.description}</p>

                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {viewModeButtons.map(({ icon: Icon, mode, label }) => {
                          const active = portal.viewMode === mode
                          const accentColor = portal.id === 'soul' ? '#3B82F6' : '#FFD700'
                          return (
                            <button
                              key={mode}
                              onClick={() => portal.setViewMode(mode)}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono rounded transition-all"
                              style={{
                                background: active ? accentColor : 'transparent',
                                color: active ? '#000' : 'rgba(255,255,255,0.7)',
                                border: `1px solid ${active ? accentColor : 'rgba(255,255,255,0.15)'}`,
                              }}
                            >
                              <Icon size={11} />
                              {label}
                            </button>
                          )
                        })}

                        <div className="flex items-center gap-1.5 ml-auto">
                          <button
                            onClick={() => handleRefresh(portal.id)}
                            className="p-2 rounded hover:bg-white/5 transition-colors"
                            style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}
                          >
                            <RefreshCw size={12} className={isRefreshing === portal.id ? 'animate-spin' : ''} />
                          </button>
                          <button
                            onClick={() => openFullscreen(portal.iframeRef)}
                            className="p-2 rounded hover:bg-white/5 transition-colors"
                            style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}
                          >
                            <Maximize2 size={12} />
                          </button>
                        </div>
                      </div>

                      <div
                        className="relative mb-4 overflow-hidden"
                        style={{ background: '#000', borderRadius: 6 }}
                      >
                        <div className={portal.viewMode !== 'desktop' ? 'flex justify-center' : ''}>
                          <div style={{ width: viewportSizes[portal.viewMode].width, maxWidth: '100%', margin: '0 auto' }}>
                            <iframe
                              ref={portal.iframeRef as React.RefObject<HTMLIFrameElement>}
                              src={iframeOrigin + portal.path}
                              className={`w-full device-frame device-frame-${portal.viewMode} ${
                                portal.viewMode === 'mobile' ? 'h-[500px]' :
                                portal.viewMode === 'tablet' ? 'h-[600px]' : 'h-[380px]'
                              }`}
                              title={`${portal.name} preview`}
                              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <p className="text-[10px] font-mono mb-1" style={{ color: portal.id === 'soul' ? '#60A5FA' : '#FFD700' }}>
                            {currentLang.portals.dimension}
                          </p>
                          <p className="text-xs font-mono text-white/80">{portal.dimension}</p>
                        </div>
                        <div className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <p className="text-[10px] font-mono mb-1" style={{ color: portal.id === 'soul' ? '#60A5FA' : '#FFD700' }}>
                            {currentLang.portals.stability}
                          </p>
                          <p className="text-xs font-mono text-white/80">{portal.stability}</p>
                        </div>
                      </div>

                      <Link href={portal.path}>
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="flex items-center justify-center gap-2 py-3 rounded transition-colors cursor-pointer"
                          style={{
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: 'rgba(255,255,255,0.8)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = portal.id === 'soul' ? '#3B82F6' : '#FFD700'
                            e.currentTarget.style.color = portal.id === 'soul' ? '#60A5FA' : '#FFD700'
                            e.currentTarget.style.background = portal.id === 'soul' ? 'rgba(59,130,246,0.05)' : 'rgba(255,215,0,0.05)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                            e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
                            e.currentTarget.style.background = 'transparent'
                          }}
                        >
                          <span className="text-sm font-mono">{currentLang.portals.enter}</span>
                          <ArrowRight size={14} className={language === 'ar' ? 'rotate-180' : ''} />
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16 text-center space-y-4"
            >
              <p className="text-[11px] font-mono tracking-[0.18em]" style={{ color: 'rgba(255,215,0,0.4)' }}>
                {currentLang.story.journeyContinues}
              </p>
              <p className="text-[11px] font-mono tracking-[0.28em]" style={{ color: 'rgba(255,215,0,0.5)' }}>
                {currentLang.portals.footer}
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}