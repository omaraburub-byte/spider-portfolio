'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, X } from 'lucide-react'
import SpiderLogo from '@/components/SpiderLogo'
import PrayerTimes from '@/components/PrayerTimes'
import { useState, useEffect, useRef } from 'react'

export default function HeroSection() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false)
  const [showNote, setShowNote] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Check for mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Listen for preloader completion
  useEffect(() => {
    const checkPreloader = () => {
      const preloader = document.querySelector('.fixed.inset-0.z-\\[999\\]')
      setIsPreloaderDone(!preloader)
    }

    checkPreloader()

    const observer = new MutationObserver(checkPreloader)
    observer.observe(document.body, { childList: true, subtree: true })

    const handlePreloaderComplete = () => setIsPreloaderDone(true)
    window.addEventListener('preloaderComplete', handlePreloaderComplete)

    return () => {
      observer.disconnect()
      window.removeEventListener('preloaderComplete', handlePreloaderComplete)
    }
  }, [])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleXClick = () => {
    setShowMessage(true)
  }

  const handleMouseEnter = () => {
    if (isMobile) return
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setShowSuggestions(true)
  }

  const handleMouseLeave = () => {
    if (isMobile) return
    timeoutRef.current = setTimeout(() => {
      setShowSuggestions(false)
    }, 200)
  }

  const handleClick = () => {
    if (isMobile) {
      setShowSuggestions(!showSuggestions)
    }
  }

  const suggestions = [
    { text: 'user delight', color: 'text-spider-red' },
    { text: 'human-centered design', color: 'text-spider-blue' },
    { text: 'intuitive interfaces', color: 'text-spider-red' },
    { text: 'accessible experiences', color: 'text-spider-blue' },
    { text: 'meaningful interactions', color: 'text-spider-red' },
    { text: 'user satisfaction', color: 'text-spider-blue' },
  ]

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-visible bg-background">
      {/* COMICS PANELS BACKGROUND */}
      <div 
        className="absolute inset-0 opacity-10 dark:opacity-5"
        style={{
          backgroundImage: 'url(/comics.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'grayscale(100%)'
        }}
      ></div>
      
      {/* BEN-DAY DOTS COMIC BACKGROUND OVERLAY */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, 
          hsl(var(--muted-foreground) / 0.15) 1px, 
          transparent 2px)`,
        backgroundSize: '6px 6px'
      }}></div>
      
      {/* Larger Ben-Day dots overlay (varied sizes) */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, 
          hsl(var(--primary) / 0.1) 1px, 
          transparent 2px)`,
        backgroundSize: '12px 12px'
      }}></div>

      {/* DARKEN OVERLAY FOR BETTER READABILITY */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-background/10 to-background/30"></div>

      {/* SPIDER SLIDING DOWN ON DRAGLINE */}
      <motion.div 
        className="absolute left-[15%] z-30"
        initial={{ top: -150 }}
        animate={isPreloaderDone ? { top: isMobile ? "20vh" : "26vh" } : { top: -150 }}
        transition={{ 
          duration: 1.8,
          ease: "easeOut",
          delay: 0.2
        }}
        style={{ position: 'absolute' }}
      >
        {/* DRAGLINE */}
        <div 
          className="absolute w-[2px] bg-gradient-to-b from-spider-red to-spider-red/40 dark:from-spider-red/60 dark:to-spider-red/20"
          style={{ 
            left: "50%",
            transform: "translateX(-50%)",
            top: "-100vh",
            height: "100vh",
          }}
        />
        
        {/* SPIDER SVG */}
        <motion.div
          className="relative z-10"
          style={{
            position: 'relative',
            top: '-12px'
          }}
          animate={isPreloaderDone ? { 
            rotate: [0, 6, -6, 3, -3, 0],
            y: [0, -4, 4, -2, 2, 0]
          } : {}}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            ease: "easeInOut",
            delay: 2.5
          }}
        >
          <svg width="40" height="40" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M590.042 523.125L554.028 511.111H547.542L540.292 547.389C539.292 552.361 537.792 557.917 535.833 563.764L564.014 620.125L530.958 719.278C527.083 730.917 533.361 743.5 545.014 747.389L566.083 754.417C577.722 758.306 590.319 752.014 594.194 740.361L630.153 632.472C633.877 621.29 633.012 609.087 627.75 598.542L590.042 523.125ZM3.73602 270.306L76.9999 380.194C81.0579 386.281 86.5556 391.272 93.0051 394.725C99.4546 398.177 106.657 399.985 113.972 399.986H222.222L126.403 433.819C117.026 436.948 108.958 443.11 103.472 451.333L29.0277 563.014C22.2222 573.222 24.986 587.028 35.1944 593.833L53.6805 606.167C63.8888 612.972 77.6944 610.208 84.4999 600L154.722 494.681L238.75 466.667H288.889L303.292 538.681C306.333 553.917 327.417 622.222 400 622.222C472.583 622.222 493.667 553.917 496.708 538.681L511.111 466.667H561.25L645.264 494.681L715.5 600C722.305 610.208 736.097 612.972 746.319 606.167L764.805 593.833C775.014 587.028 777.778 573.236 770.972 563.014L696.528 451.333C691.042 443.11 682.974 436.948 673.597 433.819L577.778 400H686.028C693.345 399.998 700.549 398.191 707.001 394.739C713.453 391.287 718.953 386.295 723.014 380.208L796.264 270.306C803.069 260.097 800.319 246.292 790.097 239.486L771.611 227.153C761.403 220.347 747.597 223.111 740.792 233.319L674.125 333.319H608.764L693.25 198.139C697.663 191.075 700.002 182.913 700 174.583V66.6667C700 54.3889 690.055 44.4445 677.778 44.4445H655.555C643.278 44.4445 633.333 54.3889 633.333 66.6667V168.208L530.444 332.833C531.847 313.319 533.333 293.792 533.333 274.208C533.333 200.5 476.722 133.333 400 133.333C323.278 133.333 266.667 200.5 266.667 274.208C266.667 293.792 268.167 313.319 269.555 332.833L166.667 168.208V66.6667C166.667 54.3889 156.722 44.4445 144.444 44.4445H122.222C109.944 44.4445 99.9999 54.3889 99.9999 66.6667V174.597C99.9999 182.931 102.347 191.097 106.75 198.153L191.236 333.333H125.875L59.2082 233.333C52.4027 223.125 38.5971 220.361 28.3888 227.167L9.90269 239.5C-0.319536 246.306 -3.06954 260.097 3.73602 270.306ZM235.986 620.125L264.167 563.764C262.208 557.917 260.708 552.361 259.708 547.389L252.458 511.111H245.972L209.958 523.125L172.25 598.542C169.641 603.762 168.086 609.446 167.673 615.268C167.261 621.09 168 626.936 169.847 632.472L205.805 740.361C209.68 752 222.278 758.306 233.917 754.417L254.986 747.389C266.625 743.5 272.917 730.917 269.042 719.278L235.986 620.125Z" fill="#e62429"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* RETRO UNDER CONSTRUCTION NOTE - Smaller on mobile */}
      <AnimatePresence>
        {showNote && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={isPreloaderDone ? { x: 0, opacity: 1 } : { x: 400, opacity: 0 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 1.5 }}
            className="absolute z-20"
            style={{
              top: isMobile ? '7rem' : '10rem',
              right: isMobile ? '0.5rem' : '2rem',
            }}
          >
            <div className="relative">
              {/* Solid shadow - smaller on mobile */}
              <div className={`absolute inset-0 bg-[#DA1C22] dark:bg-[#9a1519] ${isMobile ? 'translate-x-1 translate-y-1' : 'translate-x-2 translate-y-2'}`}></div>
              
              {/* Main bubble - smaller on mobile */}
              <div className={`relative bg-white dark:bg-[#1a1a1a] border-2 border-[#32355D] dark:border-[#4a4d7a] ${isMobile ? 'p-2 w-[200px]' : 'p-4 w-[260px] sm:w-[280px]'}`}>
                {/* Comic corner accents - smaller on mobile */}
                <div className={`absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#32355D] dark:border-[#4a4d7a] ${isMobile ? 'scale-75' : ''}`}></div>
                <div className={`absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#32355D] dark:border-[#4a4d7a] ${isMobile ? 'scale-75' : ''}`}></div>
                <div className={`absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#32355D] dark:border-[#4a4d7a] ${isMobile ? 'scale-75' : ''}`}></div>
                <div className={`absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#32355D] dark:border-[#4a4d7a] ${isMobile ? 'scale-75' : ''}`}></div>
                
                {/* Content */}
                <motion.p 
                  animate={{ rotate: [0, 1, -1, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className={`font-barrio ${isMobile ? 'text-sm' : 'text-base sm:text-lg'} mb-1 tracking-wider`}
                  style={{ 
                    color: '#F7E720',
                    textShadow: `
                      -1.5px -1.5px 0 #32355D,
                      1.5px -1.5px 0 #32355D,
                      -1.5px 1.5px 0 #32355D,
                      1.5px 1.5px 0 #32355D,
                      3px 3px 0 #DA1C22
                    `,
                    letterSpacing: '1px'
                  }}
                >
                  UNDER CONSTRUCTION
                </motion.p>
                
                <motion.p 
                  animate={{ x: [0, -2, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className={`font-montserrat ${isMobile ? 'text-[10px]' : 'text-xs sm:text-sm'} text-[#32355D] dark:text-white`}
                >
                  not everything you click might work
                </motion.p>
                
                <AnimatePresence mode="wait">
                  {showMessage ? (
                    <motion.p 
                      key="see"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`font-montserrat ${isMobile ? 'text-[8px]' : 'text-xs'} mt-2 italic font-bold`}
                      style={{ color: '#DA1C22' }}
                    >
                      See?
                    </motion.p>
                  ) : (
                    <motion.p 
                      key="working"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`font-montserrat ${isMobile ? 'text-[8px]' : 'text-xs'} mt-2 italic`}
                      style={{ color: '#DA1C22' }}
                    >
                      working on it ...
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* X BUTTON - smaller on mobile */}
                <motion.button
                  onClick={handleXClick}
                  className={`absolute -top-2 -right-2 z-40 bg-white dark:bg-[#2a2a2a] border-2 border-[#32355D] dark:border-[#4a4d7a] ${isMobile ? 'p-0.5' : 'p-1'}`}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ boxShadow: isMobile ? '1px 1px 0 #DA1C22' : '2px 2px 0 #DA1C22 dark:2px 2px 0 #9a1519' }}
                >
                  <X size={isMobile ? 10 : 14} className="text-[#DA1C22] dark:text-white" />
                </motion.button>
              </div>
              
              {/* Tiny spider web decoration */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className={`absolute -bottom-8 -right-2 ${isMobile ? 'text-[10px]' : 'text-sm'}`}
                style={{ color: '#32355D' }}
              >
                🕸️
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRAYER TIMES - Perfectly positioned */}
      <PrayerTimes 
        className="absolute z-10"
        style={{
          top: isMobile ? '7.5rem' : '22rem',
          left: isMobile ? '1rem' : 'auto',
          right: isMobile ? 'auto' : '2rem',
        }}
      />

      <div className="container mx-auto px-6 text-center relative z-10 pt-52 md:pt-28 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isPreloaderDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8 }}
        >
        {/* SPIDER LOGO */}
<div className="inline-block mb-6 md:mb-6 mt-8 md:mt-0">
  <div className="p-2">
    <SpiderLogo className="w-20 h-20 md:w-24 md:h-24" />
  </div>
</div>
          
          {/* THE SPECTACULAR OMAR-ABURUB PNG LOGO */}
          <motion.div
            className="mb-3 mx-auto max-w-2xl md:max-w-3xl px-4"
            initial={{ y: 50, opacity: 0 }}
            animate={isPreloaderDone ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img 
              src="/tsoa.png" 
              alt="The Spectacular Omar-Aburub"
              className="w-full h-auto"
            />
          </motion.div>
          
          {/* SUBTITLE */}
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            animate={isPreloaderDone ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <div className="border-4 border-black dark:border-[#121D3D] bg-spider-blue dark:bg-spider-blue/80 shadow-[8px_8px_0px_0px_rgba(0,0,0)] dark:shadow-[8px_8px_0px_0px_rgba(18,29,61,0.3)]">
              <div className="px-5 py-2">
                <span className="font-barrio text-white text-lg md:text-xl tracking-wider whitespace-nowrap">
                  SPIDER OF SOFTWARE ENGINEERING
                </span>
              </div>
            </div>
          </motion.div>
          
          {/* TAGLINE WITH INTERACTIVE "USER EXPERIENCE" */}
          <motion.div
            className="max-w-4xl mx-auto mb-16 relative px-2"
            initial={{ opacity: 0 }}
            animate={isPreloaderDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="font-montserrat text-sm md:text-base text-muted-foreground mb-3">
              <span className="text-spider-red font-bold dark:text-spider-red/90">DESIGN</span> • 
              <span className="text-spider-blue font-bold dark:text-spider-blue/90"> CODE</span> • 
              <span className="dark:text-gray-300 text-black font-bold"> AI</span>
            </div>
            
            <div className="relative inline-block" ref={suggestionsRef}>
              <p className="font-barrio text-xl md:text-2xl text-foreground font-bold">
                "With great power comes great{' '}
                <span 
                  className="font-black underline decoration-wavy decoration-spider-blue underline-offset-4 dark:decoration-spider-blue/80 cursor-pointer relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleClick}
                >
                  user experience
                </span>
                "
              </p>

              {/* Suggestions Popup - FIXED FOR MOBILE */}
<AnimatePresence>
  {showSuggestions && (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute mt-2 z-50"
      style={{ 
        top: '100%',
        left: isMobile ? '10%' : '50%',
        transform: isMobile ? 'none' : 'translateX(-50%)',
        width: 'max-content',
        minWidth: isMobile ? '280px' : '250px',
        maxWidth: isMobile ? '300px' : '350px',
      }}
    >
      {/* Shadow */}
      <div className="absolute inset-0 bg-black dark:bg-[#161616] rounded-lg translate-x-1 translate-y-1"></div>
      
      {/* Popup box */}
      <div className="relative bg-white dark:bg-[#0A0A0A] border-2 border-[#32355D] dark:border-[#4a4d7a] rounded-lg p-3">
        {/* Comic corner accents */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#32355D] dark:border-[#4a4d7a]"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#32355D] dark:border-[#4a4d7a]"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#32355D] dark:border-[#4a4d7a]"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#32355D] dark:border-[#4a4d7a]"></div>
        
        {/* Suggestions list */}
        <div className="space-y-1">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`px-3 py-1.5 text-sm font-montserrat ${suggestion.color} dark:opacity-90 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] cursor-default rounded transition-colors text-left`}
            >
              {suggestion.text}
            </motion.div>
          ))}
        </div>
        
        {/* Tiny instruction */}
        <div className="mt-2 pt-1 border-t border-gray-200 dark:border-gray-700 text-[8px] text-gray-400 dark:text-gray-500 text-center">
          alternative suggestions
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* COMIC TEXT */}
      <motion.div
        animate={isPreloaderDone ? { y: [0, 8, 0] } : {}}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-12 left-0 right-0 text-center px-6"
      >
        <div className="flex flex-col items-center justify-center">
          <div 
            className="font-barrio text-xl md:text-2xl mb-2"
            style={{
              color: 'black',
              textShadow: '2px 2px 0 #e62429, -2px -2px 0 #1a73e8'
            }}
          >
            <span className="dark:hidden">KEEP READING</span>
            <span 
              className="hidden dark:inline"
              style={{
                color: 'white',
                textShadow: '2px 2px 0 #e62429, -2px -2px 0 #1a73e8'
              }}
            >
              KEEP READING
            </span>
          </div>
          
          <motion.div
            animate={isPreloaderDone ? { y: [0, 6, 0] } : {}}
            transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
          >
            <ChevronDown className="w-6 h-6 text-spider-red dark:text-spider-red/80" />
          </motion.div>
        </div>
      </motion.div>
      
      {/* BOTTOM TRANSITION */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-24 bg-gradient-to-t from-background to-transparent"></div>
        <div className="h-1 bg-gradient-to-r from-transparent via-spider-red to-transparent dark:via-spider-red/60"></div>
      </div>
    </section>
  )
}