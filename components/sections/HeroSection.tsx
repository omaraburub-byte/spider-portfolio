'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, File, Folder, FolderOpen, Grid } from 'lucide-react'
import PrayerTimes from '@/components/PrayerTimes'
import SpiderLogo from '@/components/SpiderLogo'

export default function HeroSection() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false)
  const [hoveredWord, setHoveredWord] = useState(false)
  const [hoveredFile, setHoveredFile] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>('button.tsx')
  const [openFolders, setOpenFolders] = useState<string[]>(['src', 'app', 'components', 'ui', 'lib', 'IJSPC-2026' /* 'Elite-Board' */])
  const [showMobileTree, setShowMobileTree] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Smooth scroll effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const y = useTransform(smoothProgress, [0, 1], [0, 100])
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0.5])
  const gradientOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    const checkPreloader = () => {
      const preloader = document.querySelector('.fixed.inset-0.z-\\[999\\]')
      setIsPreloaderDone(!preloader)
    }

    checkPreloader()
    const observer = new MutationObserver(checkPreloader)
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('preloaderComplete', () => setIsPreloaderDone(true))

    return () => {
      observer.disconnect()
      window.removeEventListener('preloaderComplete', () => setIsPreloaderDone(true))
    }
  }, [])

  const toggleFolder = (folder: string) => {
    setOpenFolders(prev => 
      prev.includes(folder) 
        ? prev.filter(f => f !== folder)
        : [...prev, folder]
    )
  }

  const isOpen = (folder: string) => openFolders.includes(folder)

  const handleFileClick = (file: string) => {
    setSelectedFile(file)
    if (file === 'ijspc-2026.md') {
      window.location.href = '/ijspc-2026'
    } else if (file === 'portal') {
      window.location.href = '/landing'
    }
    // else if (file === 'elite-board.md') {
    //   window.location.href = '/elite-board'
    // }
  }

  const BackgroundPattern = () => (
    <motion.div 
      className="absolute inset-0 overflow-hidden"
      style={{ opacity: gradientOpacity }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center_top,_var(--tw-gradient-stops))] from-neutral-200/30 via-transparent to-transparent dark:from-gray-800/40 dark:via-transparent dark:to-transparent" />
    </motion.div>
  )

  return (
    <motion.section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#0A0A0A]"
      style={{ y, opacity }}
    >
      <BackgroundPattern />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setShowMobileTree(!showMobileTree)}
        className="fixed top-4 left-4 z-50 xl:hidden bg-white dark:bg-[#1A1B1E] border border-gray-200 dark:border-gray-800 rounded-lg p-2 shadow-sm"
      >
        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Prayer Times Button */}
      <button
        onClick={() => {
          const prayerTimes = document.getElementById('mobile-prayer-times')
          prayerTimes?.classList.toggle('hidden')
        }}
        className="fixed top-4 right-4 z-50 xl:hidden bg-white dark:bg-[#1A1B1E] border border-gray-200 dark:border-gray-800 rounded-lg p-2 shadow-sm"
      >
        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Mobile File Tree - Slide out menu */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: showMobileTree ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 left-0 bottom-0 z-40 xl:hidden bg-white dark:bg-[#0A0A0A] border-r border-gray-200 dark:border-gray-800 shadow-lg overflow-y-auto"
        style={{ width: '280px' }}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-mono text-gray-500 dark:text-gray-400">File Explorer</h3>
            <button
              onClick={() => setShowMobileTree(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-[#0A0A0A]">
            <ul className="space-y-1">
              {/* PORTAL LINK - Add this at the top */}
              <li className="mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => handleFileClick('portal')}
                  className="flex items-center gap-2 px-2 py-1.5 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer group"
                >
                  <Grid size={16} className="text-yellow-500 dark:text-yellow-500/80 group-hover:text-yellow-600 transition-colors" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                    PORTAL
                  </span>
                  <span className="ml-auto text-[8px] text-gray-400 dark:text-gray-600 font-mono">
                    ← back
                  </span>
                </button>
              </li>

              {/* src folder - Mobile version */}
              <li>
                <button
                  onClick={() => toggleFolder('src')}
                  className="flex items-center gap-2 px-2 py-1.5 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer"
                >
                  {isOpen('src') ? (
                    <FolderOpen size={16} className="text-gray-500" />
                  ) : (
                    <Folder size={16} className="text-gray-500" />
                  )}
                  <ChevronRight 
                    size={14} 
                    className={`text-gray-400 transition-transform duration-200 ${isOpen('src') ? 'rotate-90' : ''}`} 
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">src</span>
                </button>
                
                {isOpen('src') && (
                  <ul className="ml-6 pl-4 border-l border-gray-200 dark:border-gray-700 space-y-1 mt-1">
                    {/* app folder */}
                    <li>
                      <button
                        onClick={() => toggleFolder('app')}
                        className="flex items-center gap-2 px-2 py-1.5 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer"
                      >
                        {isOpen('app') ? (
                          <FolderOpen size={14} className="text-gray-500" />
                        ) : (
                          <Folder size={14} className="text-gray-500" />
                        )}
                        <ChevronRight 
                          size={12} 
                          className={`text-gray-400 transition-transform duration-200 ${isOpen('app') ? 'rotate-90' : ''}`} 
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">app</span>
                      </button>
                      
                      {isOpen('app') && (
                        <ul className="ml-6 pl-4 border-l border-gray-200 dark:border-gray-700 space-y-1 mt-1">
                          <li>
                            <button
                              onClick={() => handleFileClick('layout.tsx')}
                              className={`flex items-center gap-2 px-2 py-1.5 w-full text-left rounded transition-colors cursor-pointer ${
                                selectedFile === 'layout.tsx' ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                            >
                              <File size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">layout.tsx</span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleFileClick('page.tsx')}
                              className={`flex items-center gap-2 px-2 py-1.5 w-full text-left rounded transition-colors cursor-pointer ${
                                selectedFile === 'page.tsx' ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                            >
                              <File size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">page.tsx</span>
                            </button>
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* components folder */}
                    <li>
                      <button
                        onClick={() => toggleFolder('components')}
                        className="flex items-center gap-2 px-2 py-1.5 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer"
                      >
                        {isOpen('components') ? (
                          <FolderOpen size={14} className="text-gray-500" />
                        ) : (
                          <Folder size={14} className="text-gray-500" />
                        )}
                        <ChevronRight 
                          size={12} 
                          className={`text-gray-400 transition-transform duration-200 ${isOpen('components') ? 'rotate-90' : ''}`} 
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">components</span>
                      </button>
                      
                      {isOpen('components') && (
                        <ul className="ml-6 pl-4 border-l border-gray-200 dark:border-gray-700 space-y-1 mt-1">
                          <li>
                            <button
                              onClick={() => toggleFolder('ui')}
                              className="flex items-center gap-2 px-2 py-1.5 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer"
                            >
                              {isOpen('ui') ? (
                                <FolderOpen size={14} className="text-gray-500" />
                              ) : (
                                <Folder size={14} className="text-gray-500" />
                              )}
                              <ChevronRight 
                                size={12} 
                                className={`text-gray-400 transition-transform duration-200 ${isOpen('ui') ? 'rotate-90' : ''}`} 
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300">ui</span>
                            </button>
                            
                            {isOpen('ui') && (
                              <ul className="ml-6 pl-4 border-l border-gray-200 dark:border-gray-700 space-y-1 mt-1">
                                <li>
                                  <button
                                    onClick={() => handleFileClick('button.tsx')}
                                    className={`flex items-center gap-2 px-2 py-1.5 w-full text-left rounded transition-colors cursor-pointer ${
                                      selectedFile === 'button.tsx' ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                  >
                                    <File size={14} className="text-gray-400" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">button.tsx</span>
                                  </button>
                                </li>
                              </ul>
                            )}
                          </li>
                          <li>
                            <button
                              onClick={() => handleFileClick('header.tsx')}
                              className={`flex items-center gap-2 px-2 py-1.5 w-full text-left rounded transition-colors cursor-pointer ${
                                selectedFile === 'header.tsx' ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                            >
                              <File size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">header.tsx</span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleFileClick('footer.tsx')}
                              className={`flex items-center gap-2 px-2 py-1.5 w-full text-left rounded transition-colors cursor-pointer ${
                                selectedFile === 'footer.tsx' ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                            >
                              <File size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">footer.tsx</span>
                            </button>
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* lib folder */}
                    <li>
                      <button
                        onClick={() => toggleFolder('lib')}
                        className="flex items-center gap-2 px-2 py-1.5 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer"
                      >
                        {isOpen('lib') ? (
                          <FolderOpen size={14} className="text-gray-500" />
                        ) : (
                          <Folder size={14} className="text-gray-500" />
                        )}
                        <ChevronRight 
                          size={12} 
                          className={`text-gray-400 transition-transform duration-200 ${isOpen('lib') ? 'rotate-90' : ''}`} 
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">lib</span>
                      </button>
                      
                      {isOpen('lib') && (
                        <ul className="ml-6 pl-4 border-l border-gray-200 dark:border-gray-700 space-y-1 mt-1">
                          <li>
                            <button
                              onClick={() => handleFileClick('utils.ts')}
                              className={`flex items-center gap-2 px-2 py-1.5 w-full text-left rounded transition-colors cursor-pointer ${
                                selectedFile === 'utils.ts' ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                            >
                              <File size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">utils.ts</span>
                            </button>
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* IJSPC 2026 - New Page */}
                    <li>
                      <button
                        onClick={() => toggleFolder('IJSPC-2026')}
                        className="flex items-center gap-2 px-2 py-1.5 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer"
                      >
                        {isOpen('IJSPC-2026') ? (
                          <FolderOpen size={14} className="text-gray-500" />
                        ) : (
                          <Folder size={14} className="text-gray-500" />
                        )}
                        <ChevronRight 
                          size={12} 
                          className={`text-gray-400 transition-transform duration-200 ${isOpen('IJSPC-2026') ? 'rotate-90' : ''}`} 
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">IJSPC-2026</span>
                      </button>
                      
                      {isOpen('IJSPC-2026') && (
                        <ul className="ml-6 pl-4 border-l border-gray-200 dark:border-gray-700 space-y-1 mt-1">
                          <li>
                            <button
                              onClick={() => handleFileClick('ijspc-2026.md')}
                              className={`flex items-center gap-2 px-2 py-1.5 w-full text-left rounded transition-colors cursor-pointer ${
                                selectedFile === 'ijspc-2026.md' ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                            >
                              <File size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">ijspc-2026.md</span>
                              <span className="ml-2 text-[8px] text-gray-400 dark:text-gray-600 font-mono">
                                (click to explore)
                              </span>
                            </button>
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* Elite Board - Commented out for now */}
                    {/* <li>
                      <button
                        onClick={() => toggleFolder('Elite-Board')}
                        className="flex items-center gap-2 px-2 py-1.5 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer"
                      >
                        {isOpen('Elite-Board') ? (
                          <FolderOpen size={14} className="text-gray-500" />
                        ) : (
                          <Folder size={14} className="text-gray-500" />
                        )}
                        <ChevronRight 
                          size={12} 
                          className={`text-gray-400 transition-transform duration-200 ${isOpen('Elite-Board') ? 'rotate-90' : ''}`} 
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Elite-Board</span>
                      </button>
                      
                      {isOpen('Elite-Board') && (
                        <ul className="ml-6 pl-4 border-l border-gray-200 dark:border-gray-700 space-y-1 mt-1">
                          <li>
                            <button
                              onClick={() => handleFileClick('elite-board.md')}
                              className={`flex items-center gap-2 px-2 py-1.5 w-full text-left rounded transition-colors cursor-pointer ${
                                selectedFile === 'elite-board.md' ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                            >
                              <File size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">elite-board.md</span>
                            </button>
                          </li>
                        </ul>
                      )}
                    </li> */}
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Mobile Prayer Times - Slide down menu */}
      <div
        id="mobile-prayer-times"
        className="fixed top-16 right-4 z-40 hidden xl:hidden"
      >
        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg">
          <PrayerTimes />
        </div>
      </div>

      {/* Desktop File Tree - left side */}
      <div
        className="absolute left-8 hidden xl:block"
        style={{ 
          top: '45%', 
          transform: 'translateY(-50%)',
          zIndex: 9999,
          position: 'absolute'
        }}
      >
        <div className="w-72 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-[#0A0A0A] shadow-sm">
          <ul className="space-y-1">
            {/* PORTAL LINK - Add this at the top of desktop tree too */}
            <li className="mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleFileClick('portal')}
                className="flex items-center gap-2 px-2 py-1.5 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer group"
              >
                <Grid size={16} className="text-yellow-500 dark:text-yellow-500/80 group-hover:text-yellow-600 transition-colors" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                  PORTAL
                </span>
                <span className="ml-auto text-[8px] text-gray-400 dark:text-gray-600 font-mono">
                  ← back
                </span>
              </button>
            </li>

            {/* src folder */}
            <li>
              <button
                onClick={() => toggleFolder('src')}
                className="flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer"
                type="button"
              >
                {isOpen('src') ? (
                  <FolderOpen size={16} className="text-gray-500" />
                ) : (
                  <Folder size={16} className="text-gray-500" />
                )}
                <ChevronRight 
                  size={14} 
                  className={`text-gray-400 transition-transform duration-200 ${isOpen('src') ? 'rotate-90' : ''}`} 
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">src</span>
              </button>
              
              {isOpen('src') && (
                <ul className="ml-6 pl-4 border-l border-gray-200 dark:border-gray-800 space-y-1 mt-1">
                  {/* app folder */}
                  <li>
                    <button
                      onClick={() => toggleFolder('app')}
                      className="flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer"
                      type="button"
                    >
                      {isOpen('app') ? (
                        <FolderOpen size={14} className="text-gray-500" />
                      ) : (
                        <Folder size={14} className="text-gray-500" />
                      )}
                      <ChevronRight 
                        size={12} 
                        className={`text-gray-400 transition-transform duration-200 ${isOpen('app') ? 'rotate-90' : ''}`} 
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">app</span>
                    </button>
                    
                    {isOpen('app') && (
                      <ul className="ml-6 pl-4 border-l border-gray-200 dark:border-gray-800 space-y-1 mt-1">
                        <li>
                          <button
                            onClick={() => handleFileClick('layout.tsx')}
                            className={`flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer ${
                              selectedFile === 'layout.tsx' ? 'bg-gray-100 dark:bg-gray-800' : ''
                            }`}
                            type="button"
                          >
                            <File size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">layout.tsx</span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleFileClick('page.tsx')}
                            className={`flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer ${
                              selectedFile === 'page.tsx' ? 'bg-gray-100 dark:bg-gray-800' : ''
                            }`}
                            type="button"
                          >
                            <File size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">page.tsx</span>
                          </button>
                        </li>
                      </ul>
                    )}
                  </li>

                  {/* components folder */}
                  <li>
                    <button
                      onClick={() => toggleFolder('components')}
                      className="flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer"
                      type="button"
                    >
                      {isOpen('components') ? (
                        <FolderOpen size={14} className="text-gray-500" />
                      ) : (
                        <Folder size={14} className="text-gray-500" />
                      )}
                      <ChevronRight 
                        size={12} 
                        className={`text-gray-400 transition-transform duration-200 ${isOpen('components') ? 'rotate-90' : ''}`} 
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">components</span>
                    </button>
                    
                    {isOpen('components') && (
                      <ul className="ml-6 pl-4 border-l border-gray-200 dark:border-gray-800 space-y-1 mt-1">
                        {/* ui folder */}
                        <li>
                          <button
                            onClick={() => toggleFolder('ui')}
                            className="flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer"
                            type="button"
                          >
                            {isOpen('ui') ? (
                              <FolderOpen size={14} className="text-gray-500" />
                            ) : (
                              <Folder size={14} className="text-gray-500" />
                            )}
                            <ChevronRight 
                              size={12} 
                              className={`text-gray-400 transition-transform duration-200 ${isOpen('ui') ? 'rotate-90' : ''}`} 
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">ui</span>
                          </button>
                          
                          {isOpen('ui') && (
                            <ul className="ml-6 pl-4 border-l border-gray-200 dark:border-gray-800 space-y-1 mt-1">
                              <li>
                                <button
                                  onClick={() => handleFileClick('button.tsx')}
                                  className={`flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer ${
                                    selectedFile === 'button.tsx' ? 'bg-gray-100 dark:bg-gray-800' : ''
                                  }`}
                                  type="button"
                                >
                                  <File size={14} className="text-gray-400" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">button.tsx</span>
                                </button>
                              </li>
                            </ul>
                          )}
                        </li>
                        <li>
                          <button
                            onClick={() => handleFileClick('header.tsx')}
                            className={`flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer ${
                              selectedFile === 'header.tsx' ? 'bg-gray-100 dark:bg-gray-800' : ''
                            }`}
                            type="button"
                          >
                            <File size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">header.tsx</span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleFileClick('footer.tsx')}
                            className={`flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer ${
                              selectedFile === 'footer.tsx' ? 'bg-gray-100 dark:bg-gray-800' : ''
                            }`}
                            type="button"
                          >
                            <File size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">footer.tsx</span>
                          </button>
                        </li>
                      </ul>
                    )}
                  </li>

                  {/* lib folder */}
                  <li>
                    <button
                      onClick={() => toggleFolder('lib')}
                      className="flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer"
                      type="button"
                    >
                      {isOpen('lib') ? (
                        <FolderOpen size={14} className="text-gray-500" />
                      ) : (
                        <Folder size={14} className="text-gray-500" />
                      )}
                      <ChevronRight 
                        size={12} 
                        className={`text-gray-400 transition-transform duration-200 ${isOpen('lib') ? 'rotate-90' : ''}`} 
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">lib</span>
                    </button>
                    
                    {isOpen('lib') && (
                      <ul className="ml-6 pl-4 border-l border-gray-200 dark:border-gray-800 space-y-1 mt-1">
                        <li>
                          <button
                            onClick={() => handleFileClick('utils.ts')}
                            className={`flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer ${
                              selectedFile === 'utils.ts' ? 'bg-gray-100 dark:bg-gray-800' : ''
                            }`}
                            type="button"
                          >
                            <File size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">utils.ts</span>
                          </button>
                        </li>
                      </ul>
                    )}
                  </li>

                  {/* IJSPC 2026 - New Page */}
                  <li>
                    <button
                      onClick={() => toggleFolder('IJSPC-2026')}
                      className="flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer"
                      type="button"
                    >
                      {isOpen('IJSPC-2026') ? (
                        <FolderOpen size={14} className="text-gray-500" />
                      ) : (
                        <Folder size={14} className="text-gray-500" />
                      )}
                      <ChevronRight 
                        size={12} 
                        className={`text-gray-400 transition-transform duration-200 ${isOpen('IJSPC-2026') ? 'rotate-90' : ''}`} 
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">IJSPC-2026</span>
                    </button>
                    
                    {isOpen('IJSPC-2026') && (
                      <ul className="ml-6 pl-4 border-l border-gray-200 dark:border-gray-800 space-y-1 mt-1">
                        <li>
                          <button
                            onClick={() => handleFileClick('ijspc-2026.md')}
                            className={`flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer ${
                              selectedFile === 'ijspc-2026.md' ? 'bg-gray-100 dark:bg-gray-800' : ''
                            }`}
                            type="button"
                          >
                            <File size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">ijspc-2026.md</span>
                            <span className="ml-2 text-[8px] text-gray-400 dark:text-gray-600 font-mono">
                              (click to explore)
                            </span>
                          </button>
                        </li>
                      </ul>
                    )}
                  </li>

                  {/* Elite Board - Commented out for now */}
                  {/* <li>
                    <button
                      onClick={() => toggleFolder('Elite-Board')}
                      className="flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer"
                      type="button"
                    >
                      {isOpen('Elite-Board') ? (
                        <FolderOpen size={14} className="text-gray-500" />
                      ) : (
                        <Folder size={14} className="text-gray-500" />
                      )}
                      <ChevronRight 
                        size={12} 
                        className={`text-gray-400 transition-transform duration-200 ${isOpen('Elite-Board') ? 'rotate-90' : ''}`} 
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Elite-Board</span>
                    </button>
                    
                    {isOpen('Elite-Board') && (
                      <ul className="ml-6 pl-4 border-l border-gray-200 dark:border-gray-800 space-y-1 mt-1">
                        <li>
                          <button
                            onClick={() => handleFileClick('elite-board.md')}
                            className={`flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer ${
                              selectedFile === 'elite-board.md' ? 'bg-gray-100 dark:bg-gray-800' : ''
                            }`}
                            type="button"
                          >
                            <File size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">elite-board.md</span>
                          </button>
                        </li>
                      </ul>
                    )}
                  </li> */}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Desktop Prayer Times - right side */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isPreloaderDone ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute right-8 hidden xl:block"
        style={{ top: '45%', transform: 'translateY(-50%)' }}
      >
        <PrayerTimes />
      </motion.div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-20 flex items-center justify-center" style={{ minHeight: '100vh' }}>
        <div className="max-w-3xl mx-auto text-center px-2 sm:px-0" style={{ marginTop: '-2rem' }}>
          {/* Name with integrated spider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isPreloaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-4 sm:mb-6"
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-tight flex items-center justify-center text-gray-900 dark:text-white">
              <div className="relative">
                <span className="text-gray-900 dark:text-white">O</span>
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 opacity-100 dark:opacity-100">
                    <SpiderLogo className="w-full h-full" />
                  </div>
                </motion.div>
              </div>
              <span>MAR</span>
            </h1>
            <div className="w-12 h-px mx-auto mt-4 sm:mt-6 bg-gray-200 dark:bg-gray-800" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isPreloaderDone ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-center mb-8 sm:mb-12"
          >
            <p className="text-xs sm:text-sm md:text-base text-gray-400 dark:text-gray-500 font-montserrat tracking-[0.2em] sm:tracking-[0.3em] uppercase px-2">
              Spider of Software Engineering
            </p>
            <p className="text-[10px] sm:text-xs font-mono text-gray-300 dark:text-gray-600 mt-2">
              /ˈspīdər əv ˈsôf(t)wer ˌenjəˈniriNG/
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isPreloaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="relative px-2"
          >
            <p 
              className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed"
              onMouseEnter={() => setHoveredWord(true)}
              onMouseLeave={() => setHoveredWord(false)}
            >
              "With great power comes great{' '}
              <span className="relative inline-block cursor-default">
                <span className="relative z-10 text-gray-900 dark:text-white">
                  user experience
                </span>
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-900 dark:bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredWord ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0.5 }}
                />
              </span>
              "
            </p>

            <motion.div
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap z-30"
              initial={{ opacity: 0, y: -5 }}
              animate={{ 
                opacity: hoveredWord ? 1 : 0,
                y: hoveredWord ? 0 : -5
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-3 py-1.5 bg-white dark:bg-[#1A1B1E] border border-gray-200 dark:border-gray-800 shadow-sm">
                <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">
                  human-centered · intuitive · meaningful
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isPreloaderDone ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-16 sm:mt-24 text-[10px] sm:text-xs text-gray-300 dark:text-gray-600 font-mono"
          >
            crafting with intention
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-32 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={isPreloaderDone ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[8px] font-mono text-gray-300 dark:text-gray-600 tracking-[0.2em]">SCROLL</span>
          <ChevronDown size={12} className="text-gray-300 dark:text-gray-600" />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}