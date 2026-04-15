// app/landing/page.tsx - REFINED DESIGN
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Sun, Moon, ChevronDown, Smartphone, Tablet, Monitor, Maximize2, RefreshCw, Languages, Compass, MapPin, Mountain, BookOpen } from 'lucide-react'
import Preloader from '@/components/PPreloader'

// ─── Theme helpers (avoids repeating ternary 25+ times) ───────────────────────
const theme = (light: boolean) => ({
  text:       light ? 'text-black/75'   : 'text-white/80',
  textFaint:  light ? 'text-black/45'   : 'text-white/50',
  textStrong: light ? 'text-black'      : 'text-white',
  border:     light ? 'border-black/12' : 'border-white/10',
  surface:    light ? 'bg-white/96'     : 'bg-[#141414]',
  accent:     '#FFE500',
})

export default function RacingPortalPage() {
  const [mounted, setMounted]           = useState(false)
  const [hoveredPortal, setHoveredPortal] = useState<string | null>(null)
  const [isLightMode, setIsLightMode]   = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')
  const [language, setLanguage]         = useState<'en' | 'ar'>('en')
  const [expandedLine, setExpandedLine] = useState<number | null>(null)

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
        spiderDesc: 'comic dimension · dynamic · playful', soulDesc: 'warmth · intention · minimal',
        dimension: 'dimension', stability: 'stability', enter: 'enter dimension',
        mobile: 'Mobile', tablet: 'Tablet', desktop: 'Desktop',
        footer: '· two worlds · one portal ·', chapterTitle: 'Two Worlds',
      },
      nav: ['hero', 'story', 'about', 'portals'],
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
        spiderDesc: 'بعد كوميدي · ديناميكي · مرح', soulDesc: 'دفء · نية · بساطة',
        dimension: 'البُعْد', stability: 'الثَّبَات', enter: 'ادْخُلِ البُعْد',
        mobile: 'جوال', tablet: 'لوحي', desktop: 'مكتبي',
        footer: '· عَالَمَان · بَوَّابَة وَاحِدَة ·', chapterTitle: 'عالمين',
      },
      nav: ['الرَّئِيسِيَّة', 'القصة', 'عَنِ', 'البَوَّابَات'],
    },
  }

  const currentLang = t[language]
  const th = theme(isLightMode)

  useEffect(() => {
    setMounted(true)
    setIframeOrigin(window.location.origin)
    const savedMode = localStorage.getItem('portal-theme')
    if (savedMode) setIsLightMode(savedMode === 'light')
    const savedLang = localStorage.getItem('portal-language')
    if (savedLang) setLanguage(savedLang as 'en' | 'ar')
    const timer = setTimeout(() => setShowPreloader(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (mounted) localStorage.setItem('portal-theme', isLightMode ? 'light' : 'dark')
  }, [isLightMode, mounted])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('portal-language', language)
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.classList.toggle('font-arabic', language === 'ar')
  }, [language, mounted])

  // IntersectionObserver for active section — no hardcoded px thresholds
  useEffect(() => {
    const refs = [
      { ref: heroRef,    id: 'hero' },
      { ref: storyRef,   id: 'story' },
      { ref: aboutRef,   id: 'about' },
      { ref: portalsRef, id: 'portals' },
    ]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const found = refs.find((r) => r.ref.current === e.target)
            if (found) setActiveSection(found.id)
          }
        })
      },
      { threshold: 0.4 }
    )
    refs.forEach(({ ref }) => { if (ref.current) observer.observe(ref.current) })
    return () => observer.disconnect()
  }, [mounted])

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) =>
    ref.current?.scrollIntoView({ behavior: 'smooth' })

  const handleRefresh = (portal: string) => {
    setIsRefreshing(portal)
    const iref = portal === 'spider' ? spiderIframeRef : soulIframeRef
    if (iref.current) iref.current.src = iref.current.src
    setTimeout(() => setIsRefreshing(null), 800)
  }

  const openFullscreen = (iframeRef: React.RefObject<HTMLIFrameElement>) => {
    if (iframeRef.current?.requestFullscreen) iframeRef.current.requestFullscreen()
  }

  const toggleLanguage = () => setLanguage((p) => (p === 'en' ? 'ar' : 'en'))

  if (!mounted) return null

  const portals = [
    {
      id: 'spider', name: currentLang.portals.spider, path: '/spider',
      color: '#e62429', accent: '#FFE500',
      description: currentLang.portals.spiderDesc,
      dimension: 'χ-23', stability: '98.4%',
      iframeRef: spiderIframeRef, viewMode: spiderViewMode, setViewMode: setSpiderViewMode,
    },
    {
      id: 'soul', name: currentLang.portals.soul, path: '/soul',
      color: '#BB8F4F', accent: '#FFE500',
      description: currentLang.portals.soulDesc,
      dimension: 'θ-47', stability: '99.7%',
      iframeRef: soulIframeRef, viewMode: soulViewMode, setViewMode: setSoulViewMode,
    },
  ]

  const viewModeButtons = [
    { icon: Smartphone, mode: 'mobile' as const, label: currentLang.portals.mobile },
    { icon: Tablet,     mode: 'tablet' as const, label: currentLang.portals.tablet },
    { icon: Monitor,    mode: 'desktop' as const, label: currentLang.portals.desktop },
  ]

  // ─── Reusable Chapter Header ──────────────────────────────────────────────
  const ChapterHeader = ({ num, title }: { num: string; title: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.08 }}
      className="flex flex-col items-center gap-3 mb-14"
    >
      <span className={`text-xs font-mono tracking-widest ${th.textFaint} section-number`}>
        chapter {num}
      </span>
      <span
        className="text-2xl md:text-3xl tracking-wider chapter-heading"
        style={{ color: '#FFE500', opacity: isLightMode ? 1 : 0.85 }}
      >
        {title}
      </span>
      {/* Refined rule: short center tick + fading lines */}
      <div className="flex items-center gap-2">
        <div className="w-16 h-px" style={{ background: isLightMode ? 'rgba(255,229,0,0.35)' : 'rgba(255,229,0,0.2)' }} />
        <div className="w-1.5 h-1.5 rotate-45" style={{ background: '#FFE500', opacity: isLightMode ? 0.6 : 0.4 }} />
        <div className="w-16 h-px" style={{ background: isLightMode ? 'rgba(255,229,0,0.35)' : 'rgba(255,229,0,0.2)' }} />
      </div>
    </motion.div>
  )

  return (
    <>
      <Preloader isLightMode={isLightMode} showPreloader={showPreloader} />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800;900&display=swap');

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${isLightMode ? '#00000018' : '#FFFFFF18'}; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #FFE500; }

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
          text-shadow: ${isLightMode ? '2px 2px 0px rgba(0,0,0,0.25)' : 'none'};
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

        /* Subtle scanline texture */
        .rugged-overlay::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            ${isLightMode ? 'rgba(0,0,0,0.012)' : 'rgba(255,255,255,0.012)'} 3px,
            ${isLightMode ? 'rgba(0,0,0,0.012)' : 'rgba(255,255,255,0.012)'} 4px
          );
          z-index: 1;
        }

        /* Portal card corner flourish */
        .portal-corner::before,
        .portal-corner::after {
          content: '';
          position: absolute;
          width: 18px;
          height: 18px;
          border-color: #FFE500;
          border-style: solid;
          opacity: ${isLightMode ? 0.65 : 0.45};
          transition: opacity 0.4s;
        }
        .portal-corner::before { top: 10px; left: 10px; border-width: 1px 0 0 1px; }
        .portal-corner::after  { bottom: 10px; right: 10px; border-width: 0 1px 1px 0; }
        .group:hover .portal-corner::before,
        .group:hover .portal-corner::after { opacity: ${isLightMode ? 1 : 0.85}; }

        /* Story line expand */
        .story-line { cursor: pointer; transition: color 0.2s; }
        .story-line:hover { color: ${isLightMode ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.8)'}; }

        /* Viewport device frame */
        .device-frame {
          border-radius: 8px;
          overflow: hidden;
          transition: box-shadow 0.3s;
        }
        .device-frame-mobile  { box-shadow: 0 0 0 2px ${isLightMode ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.12)'}; }
        .device-frame-tablet  { box-shadow: 0 0 0 2px ${isLightMode ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.10)'}; }
        .device-frame-desktop { box-shadow: none; }

        /* Active nav dot glow */
        .nav-dot-active { color: #FFE500 !important; }
      `}</style>

      <div
        className={`relative min-h-screen w-full rugged-overlay ${
          isLightMode ? 'bg-[#F8F6F0]' : 'bg-[#080808]'
        }`}
      >
        {/* ── Background ─────────────────────────────────────────────────────── */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/ovmap.jpg"
            alt="Vintage World Map"
            fill
            className="object-cover"
            priority
            quality={100}
            style={{
              opacity: isLightMode ? 0.18 : 0.55,
              filter: isLightMode
                ? 'sepia(0.4) contrast(1.15) brightness(1.05) saturate(0.8)'
                : 'sepia(0.25) contrast(1.1) saturate(0.9)',
            }}
          />
          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: isLightMode
                ? 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(248,246,240,0.75) 100%)'
                : 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(8,8,8,0.85) 100%)',
            }}
          />
          {/* Diagonal light rays */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-[200%]"
                style={{
                  left: `${i * 13}%`,
                  transform: 'rotate(65deg) translateY(-50%)',
                  top: '-50%',
                  width: '1px',
                  background: `linear-gradient(to bottom, transparent, ${
                    isLightMode ? 'rgba(255,229,0,0.45)' : 'rgba(255,229,0,0.28)'
                  }, transparent)`,
                }}
                animate={{ opacity: [0.2, 0.65, 0.2] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
              />
            ))}
          </div>
          {/* Compass cross-hair */}
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: isLightMode ? 0.06 : 0.07 }}>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[#FFE500]" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#FFE500]" />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FFE500]"
              style={{ width: 440, height: 440 }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FFE500]"
              style={{ width: 220, height: 220, opacity: 0.5 }}
            />
          </div>
        </div>

        {/* ── Navigation ─────────────────────────────────────────────────────── */}
        <div className="fixed top-7 left-1/2 -translate-x-1/2 z-50">
          <div
            className="flex items-center gap-1 px-4 py-2 rounded-full backdrop-blur-md"
            style={{
              background: isLightMode ? 'rgba(248,246,240,0.6)' : 'rgba(8,8,8,0.55)',
              border: `1px solid ${isLightMode ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)'}`,
            }}
          >
            {[heroRef, storyRef, aboutRef, portalsRef].map((ref, i) => {
              const ids = ['hero', 'story', 'about', 'portals']
              const labels = ['00', '01', '02', '03']
              const isActive = activeSection === ids[i]
              return (
                <button
                  key={i}
                  onClick={() => scrollToSection(ref)}
                  aria-label={`Go to ${ids[i]} section`}
                  title={ids[i]}
                  className={`relative px-3 py-1 text-xs section-number transition-colors duration-300 ${
                    isActive
                      ? 'nav-dot-active'
                      : isLightMode
                      ? 'text-black/30 hover:text-black/60'
                      : 'text-white/25 hover:text-white/50'
                  }`}
                >
                  {labels[i]}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-full"
                      style={{ background: isLightMode ? 'rgba(255,229,0,0.15)' : 'rgba(255,229,0,0.1)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Controls (bottom-right) ─────────────────────────────────────────── */}
        <div className="fixed bottom-7 right-7 z-50 flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            aria-label="Toggle language"
            className="flex items-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-md text-xs font-mono transition-colors"
            style={{
              background: isLightMode ? 'rgba(248,246,240,0.7)' : 'rgba(8,8,8,0.6)',
              border: `1px solid ${isLightMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)'}`,
              color: isLightMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.45)',
            }}
          >
            <Languages size={13} />
            <span>{language === 'en' ? 'EN' : 'AR'}</span>
          </button>
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            aria-label="Toggle theme"
            className="p-2.5 rounded-full backdrop-blur-md transition-colors"
            style={{
              background: isLightMode ? 'rgba(248,246,240,0.7)' : 'rgba(8,8,8,0.6)',
              border: `1px solid ${isLightMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)'}`,
              color: isLightMode ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.4)',
            }}
          >
            {isLightMode ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            00 — HERO
        ══════════════════════════════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center gap-3 mb-8"
            >
              <span className={`text-xs section-number ${th.textFaint}`}>chapter 00</span>
              <span
                className="text-2xl md:text-3xl tracking-wider chapter-heading"
                style={{ color: '#FFE500', opacity: isLightMode ? 1 : 0.82 }}
              >
                {currentLang.hero.chapterTitle}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-px" style={{ background: 'rgba(255,229,0,0.3)' }} />
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: '#FFE500', opacity: 0.5 }} />
                <div className="w-16 h-px" style={{ background: 'rgba(255,229,0,0.3)' }} />
              </div>
            </motion.div>

            {/* Compass — refined: slower, subtle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: 'backOut' }}
              className="flex justify-center mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              >
                <Compass
                  size={28}
                  style={{
                    color: '#FFE500',
                    opacity: isLightMode ? 0.75 : 0.55,
                    filter: isLightMode ? 'drop-shadow(1px 1px 0 rgba(0,0,0,0.5))' : 'none',
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Name — refined: tighter tracking, larger on desktop */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className={`text-8xl md:text-[10rem] lg:text-[11rem] font-black tracking-[-0.04em] mb-5 chapter-heading ${th.textStrong}`}
            >
              {currentLang.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className={`text-sm md:text-base max-w-xs mx-auto leading-relaxed adventure-subtle ${isLightMode ? 'text-black/40' : 'text-white/65'}`}
            >
              {currentLang.hero.subtitle}
            </motion.p>

            {/* Location tag — slightly refined */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="text-[11px] font-mono mt-5 flex items-center justify-center gap-2"
              style={{ color: isLightMode ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.55)' }}
            >
              <MapPin size={10} />
              {currentLang.hero.adventure}
              <Mountain size={10} />
            </motion.p>

            <motion.div
              className="w-10 h-[1.5px] mx-auto mt-9"
              style={{ background: '#FFE500', opacity: isLightMode ? 0.7 : 0.35 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown
              size={16}
              style={{ color: isLightMode ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.22)' }}
            />
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            01 — OMAR'S STORY
        ══════════════════════════════════════════════════════════════════════ */}
        <section ref={storyRef} className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
          <div className="max-w-2xl mx-auto w-full">
            <ChapterHeader num="01" title={currentLang.story.chapterTitle} />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-10"
            >
              <BookOpen
                size={36}
                style={{ color: '#FFE500', opacity: isLightMode ? 0.7 : 0.5 }}
              />
            </motion.div>

            {/* Intro quote */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28 }}
              className={`text-lg md:text-xl font-light italic text-center story-text mb-10 ${th.text}`}
            >
              &ldquo;{currentLang.story.intro}&rdquo;
            </motion.p>

            {/* Story lines — click to expand (touch-friendly) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
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
                      style={{ borderBottom: `1px solid ${isLightMode ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)'}` }}
                    >
                      {/* Line number */}
                      <span
                        className="text-[10px] font-mono mt-1 flex-shrink-0 w-5 transition-colors"
                        style={{
                          color: isOpen ? '#FFE500' : isLightMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.18)',
                        }}
                      >
                        {String(num).padStart(2, '0')}
                      </span>
                      <p className={`text-base md:text-lg leading-relaxed story-text flex-1 ${th.text}`}>
                        {text}
                      </p>
                      {/* Expand chevron */}
                      <motion.span
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 mt-1"
                        style={{ color: isLightMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.15)' }}
                      >
                        <ChevronDown size={13} />
                      </motion.span>
                    </div>

                    {/* Journal popup — now inline, not a hover tooltip */}
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
                              background: isLightMode ? 'rgba(255,229,0,0.06)' : 'rgba(255,229,0,0.08)',
                              border: `1px solid ${isLightMode ? 'rgba(255,229,0,0.25)' : 'rgba(255,229,0,0.45)'}`,
                            }}
                          >
                            {/* Corner accents */}
                            <div className="relative">
                              <p className={`text-sm leading-relaxed font-sans ${th.text}`}>{text}</p>
                              <div
                                className="mt-3 pt-2 text-[10px] font-mono"
                                style={{ color: isLightMode ? 'rgba(255,229,0,0.6)' : 'rgba(255,229,0,0.7)', borderTop: `1px solid ${isLightMode ? 'rgba(255,229,0,0.2)' : 'rgba(255,229,0,0.3)'}` }}
                              >
                                — Omar&apos;s Journal
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 }}
              className="mt-14 pt-8"
              style={{ borderTop: `1px solid rgba(255,229,0,0.15)` }}
            >
              <p
                className="text-lg md:text-xl font-light text-center italic story-quote"
                style={{
                  color: '#FFE500',
                  textShadow: isLightMode ? '1px 1px 0px rgba(0,0,0,0.35)' : 'none',
                }}
              >
                &ldquo;{currentLang.story.quote}&rdquo;
              </p>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            02 — WHAT IS A PORTAL
        ══════════════════════════════════════════════════════════════════════ */}
        <section ref={aboutRef} className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto w-full">
            <ChapterHeader num="02" title={currentLang.about.chapterTitle} />

            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Door illustration — refined */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex flex-col items-center md:items-start"
              >
                {/* Door */}
                <div className="relative w-20 h-32 mb-7">
                  <div
                    className="absolute inset-0"
                    style={{
                      border: `1.5px solid ${isLightMode ? 'rgba(255,229,0,0.7)' : 'rgba(255,229,0,0.85)'}`,
                    }}
                  />
                  {/* Door panel inset */}
                  <div
                    className="absolute inset-x-2 inset-y-2"
                    style={{
                      border: `1px solid ${isLightMode ? 'rgba(255,229,0,0.3)' : 'rgba(255,229,0,0.45)'}`,
                    }}
                  />
                  {/* Knob */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 right-2.5 w-2 h-2 rounded-full"
                    style={{ background: isLightMode ? 'rgba(255,229,0,0.8)' : '#FFE500' }}
                  />
                  {/* Glow behind door on hover */}
                  <div
                    className="absolute inset-0 -z-10 blur-xl"
                    style={{ background: 'rgba(255,229,0,0.08)' }}
                  />
                  {/* Compass badge */}
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2">
                    <Compass
                      size={18}
                      style={{ color: isLightMode ? 'rgba(255,229,0,0.5)' : 'rgba(255,229,0,0.75)' }}
                    />
                  </div>
                </div>

                <h2 className={`text-4xl md:text-5xl font-light tracking-wide chapter-heading ${th.textFaint}`}>
                  {currentLang.about.portal}
                </h2>
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="space-y-7"
              >
                <p className={`text-base md:text-lg leading-relaxed ${th.text}`}>
                  {currentLang.about.line1}
                  <span
                    className="block mt-2 text-lg adventure-text"
                    style={{ color: '#FFE500', textShadow: isLightMode ? '1px 1px 0 rgba(0,0,0,0.4)' : 'none' }}
                  >
                    {currentLang.about.line2}
                  </span>
                </p>
                <p className={`text-base md:text-lg leading-relaxed ${th.text}`}>
                  {currentLang.about.line3}<br />
                  {currentLang.about.line4}<br />
                  {currentLang.about.line5}
                </p>
                <div className="pt-2">
                  <p className={`text-base md:text-lg font-light adventure-text ${isLightMode ? 'text-black/75' : 'text-white/65'}`}>
                    {currentLang.about.line6}
                  </p>
                  <div className="flex items-center gap-3 mt-2.5">
                    <div className="w-8 h-px" style={{ background: isLightMode ? 'rgba(255,229,0,0.6)' : 'rgba(255,229,0,0.35)' }} />
                    <span
                      className="text-sm font-mono chapter-heading"
                      style={{ color: '#FFE500', opacity: isLightMode ? 1 : 0.85 }}
                    >
                      {currentLang.about.line7}
                    </span>
                    <Mountain size={11} style={{ color: isLightMode ? 'rgba(255,229,0,0.5)' : 'rgba(255,229,0,0.3)' }} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            03 — PORTALS
        ══════════════════════════════════════════════════════════════════════ */}
        <section ref={portalsRef} className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
          <div className="w-full max-w-6xl mx-auto">
            <ChapterHeader num="03" title={currentLang.portals.chapterTitle} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
              {portals.map((portal, index) => (
                <motion.div
                  key={portal.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.18 }}
                  viewport={{ once: true }}
                  className="relative group h-full flex flex-col"
                  onMouseEnter={() => setHoveredPortal(portal.id)}
                  onMouseLeave={() => setHoveredPortal(null)}
                >
                  {/* Glow halo */}
                  <div
                    className="absolute -inset-5 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${portal.accent}18, transparent 68%)`,
                      filter: 'blur(24px)',
                    }}
                  />

                  {/* Card */}
                  <div
                    className={`relative overflow-hidden flex-1 flex flex-col portal-corner transition-all duration-500 ${th.surface}`}
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 97% 100%, 0% 100%)',
                      border: `1px solid ${
                        hoveredPortal === portal.id
                          ? isLightMode ? 'rgba(255,229,0,0.75)' : 'rgba(255,229,0,0.55)'
                          : isLightMode ? 'rgba(0,0,0,0.18)'     : 'rgba(255,255,255,0.18)'
                      }`,
                    }}
                  >
                    {/* Top accent stripe */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to right, transparent, ${portal.color}, transparent)`,
                        opacity: hoveredPortal === portal.id ? 1 : 0.65,
                      }}
                    />
                    {/* Diagonal accent line */}
                    <div
                      className="absolute top-0 right-0 w-20 h-[1.5px] rotate-45 translate-x-8 translate-y-8 pointer-events-none"
                      style={{ background: '#FFE500', opacity: 0.2 }}
                    />

                    <div className="relative z-10 p-6 flex-1 flex flex-col">
                      {/* Header row */}
                      <div className="flex items-center justify-between mb-5">
                        <span className={`text-xs font-mono section-number ${th.textFaint}`}>
                          {index === 0 ? '01' : '02'}
                        </span>
                        <motion.div
                          animate={{ rotate: hoveredPortal === portal.id ? 45 : 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Compass
                            size={13}
                            style={{ color: isLightMode ? 'rgba(255,229,0,0.7)' : 'rgba(255,229,0,0.6)' }}
                          />
                        </motion.div>
                      </div>

                      {/* Title + desc */}
                      <div className="mb-5">
                        <h2
                          className={`text-2xl md:text-3xl font-black tracking-tighter mb-1.5 chapter-heading ${th.textStrong}`}
                        >
                          {portal.name}
                        </h2>
                        <p className={`text-xs font-mono ${th.textFaint}`}>{portal.description}</p>
                      </div>

                      {/* Viewport controls */}
                      <div className="flex flex-wrap items-center gap-2 mb-5">
                        {viewModeButtons.map(({ icon: Icon, mode, label }) => {
                          const active = portal.viewMode === mode
                          return (
                            <button
                              key={mode}
                              onClick={() => portal.setViewMode(mode)}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono rounded transition-all duration-200"
                              style={{
                                background: active
                                  ? '#FFE500'
                                  : isLightMode ? 'transparent' : 'transparent',
                                color: active
                                  ? '#000'
                                  : isLightMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.65)',
                                border: `1px solid ${
                                  active
                                    ? '#FFE500'
                                    : isLightMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.22)'
                                }`,
                              }}
                            >
                              <Icon size={11} />
                              {label}
                            </button>
                          )
                        })}

                        <div className="flex items-center gap-1.5 ml-auto">
                          {[
                            { icon: RefreshCw, onClick: () => handleRefresh(portal.id), spin: isRefreshing === portal.id, label: 'Refresh' },
                            { icon: Maximize2, onClick: () => openFullscreen(portal.iframeRef), spin: false, label: 'Fullscreen' },
                          ].map(({ icon: Ic, onClick, spin, label }) => (
                            <button
                              key={label}
                              onClick={onClick}
                              aria-label={label}
                              className="p-2 rounded transition-colors"
                              style={{
                                border: `1px solid ${isLightMode ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.22)'}`,
                                color: isLightMode ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.6)',
                              }}
                            >
                              <Ic size={12} className={spin ? 'animate-spin' : ''} />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* iframe */}
                      <div
                        className="relative mb-5 overflow-hidden"
                        style={{
                          background: isLightMode ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
                          borderRadius: 8,
                        }}
                      >
                        <div className={portal.viewMode !== 'desktop' ? 'flex justify-center' : ''}>
                          <div style={{ width: viewportSizes[portal.viewMode].width, maxWidth: '100%', margin: '0 auto' }}>
                            <iframe
                              ref={portal.iframeRef}
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

                      {/* Stats row */}
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        {[
                          { label: currentLang.portals.dimension, value: portal.dimension },
                          { label: currentLang.portals.stability, value: portal.stability },
                        ].map(({ label, value }) => (
                          <div
                            key={label}
                            className="p-3 rounded-lg"
                            style={{
                              background: isLightMode ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.07)',
                              border: `1px solid ${isLightMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.12)'}`,
                            }}
                          >
                            <p
                              className="text-[10px] font-mono mb-1 small-text"
                              style={{ color: isLightMode ? 'rgba(180,140,0,0.9)' : 'rgba(255,229,0,0.7)' }}
                            >
                              {label}
                            </p>
                            <p className={`text-xs font-mono small-text ${th.textStrong}`}>{value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Enter button — motion(Link) directly, no extra div */}
                      <Link href={portal.path}>
                        <motion.div
                          whileHover={{ scale: 1.015 }}
                          whileTap={{ scale: 0.975 }}
                          className="flex items-center justify-center gap-2 py-3 px-4 rounded transition-colors cursor-pointer adventure-text"
                          style={{
                            border: `1px solid ${isLightMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.22)'}`,
                            color: isLightMode ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.75)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#FFE500'
                            e.currentTarget.style.color = '#FFE500'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = isLightMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.22)'
                            e.currentTarget.style.color = isLightMode ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.75)'
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

            {/* Footer */}
            <div className="mt-16 text-center space-y-4">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="text-[11px] font-mono tracking-[0.18em]"
                style={{ color: isLightMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.16)' }}
              >
                {currentLang.story.journeyContinues}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
                viewport={{ once: true }}
                className="text-[11px] font-mono tracking-[0.28em]"
                style={{ color: isLightMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.25)' }}
              >
                {currentLang.portals.footer}
              </motion.p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}