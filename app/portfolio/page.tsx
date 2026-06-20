// app/portfolio/page.tsx
'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Github, 
  Linkedin, 
  Mail,
  Briefcase,
  Award,
  Clock,
  Compass,
  PenTool,
  Globe,
  Trophy,
  BookOpen,
  Brain,
  Gamepad2,
  X,
  ExternalLink,
  FileText,
  Menu,
  Eye,
  Lock,
  Star,
  Timer,
  Info
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 'sutimer',
    title: 'SUTimer',
    subtitle: 'Figma Productivity Plugin',
    shortDescription: 'A Figma plugin with real-time Firebase sync, collaborative counters, and timer automation.',
    fullDescription: 'A professional Figma plugin with real-time Firebase sync, collaborative counters, and timer automation to streamline team workflows and enhance design productivity. Built for the Software Engineering Club at ASU, this tool enables design teams to track time spent on tasks, collaborate seamlessly with synchronized counters, and automate repetitive timing workflows. The plugin leverages Firebase Realtime Database for instant state synchronization across team members, making it ideal for remote design teams.',
    tags: ['Figma Plugin', 'Firebase', 'TypeScript', 'Real-time'],
    award: 'Featured',
    icon: Timer,
    color: 'purple',
    link: 'https://www.figma.com/community/plugin/1565449206322423301',
    external: true
  },
  {
    id: 'evalui',
    title: 'EvalUI',
    subtitle: 'AI-Powered Accessibility Framework',
    shortDescription: 'Computer vision framework for automated UI accessibility assessment.',
    fullDescription: 'A computer vision framework for automated UI accessibility assessment that analyzes web interfaces and identifies accessibility violations. Leveraging OpenCV and Python, EvalUI detects contrast issues, missing alt text, and layout problems. Top 15 in IEEE JCSPC 2025.',
    tags: ['Python', 'OpenCV', 'Computer Vision', 'HCI'],
    award: 'Top 15 IEEE',
    icon: Brain,
    color: 'indigo',
    link: 'https://github.com/omaraburub-byte/evalui',
    external: true
  },
  {
    id: 'onesmind',
    title: "One's Mind",
    subtitle: 'Psychological Puzzle Game',
    shortDescription: '2D puzzle-adventure game exploring psychological concepts.',
    fullDescription: 'A 2D puzzle-adventure game that explores psychological concepts through interactive gameplay. Players navigate through levels that represent different mental states, solving puzzles that require critical thinking and emotional intelligence. Won 1st place in SEC4 competition.',
    tags: ['Unity', 'C#', 'Game Design'],
    award: '1st Place',
    icon: Gamepad2,
    color: 'red',
    link: 'https://github.com/omaraburub-byte/onesmind',
    external: true
  },
  {
    id: 'fasbir',
    title: 'FASBIR',
    subtitle: 'National Initiatives Platform',
    shortDescription: 'Charity platform supporting crisis-region initiatives.',
    fullDescription: 'A comprehensive charity platform designed to support initiatives in crisis regions. FASBIR connects donors with verified charitable projects, provides transparent tracking of donations, and highlights impact stories. 5th place in SEC3 competition.',
    tags: ['Figma', 'UX Research', 'Prototyping'],
    award: '5th Place',
    icon: Globe,
    color: 'green',
    link: 'https://github.com/omaraburub-byte/FASBIR',
    external: true
  },
  {
    id: 'bytegene',
    title: 'ByteGene',
    subtitle: 'Company Website',
    shortDescription: 'Responsive website for EnthusiasTech from wireframing to deployment.',
    fullDescription: 'A responsive, modern company website for EnthusiasTech built from wireframing to full deployment. Features include interactive components, smooth animations, and a clean UI that represents the brand identity. Built with Next.js and Tailwind CSS.',
    tags: ['Next.js', 'Tailwind', 'Figma'],
    icon: PenTool,
    color: 'yellow',
    link: 'https://bytegene-sa.vercel.app/',
    external: true
  }
]

const skills = ['Python', 'Flutter', 'JavaScript', 'Figma', 'OpenCV', 'Firebase', 'Unity', 'Git']

const experience = [
  {
    role: 'Research Assistant',
    company: 'Applied Science University',
    period: '2025 — Present',
    description: 'HCI research on AI-driven interfaces. Top 15 IEEE paper.',
    color: 'indigo'
  },
  {
    role: 'Team Lead & Co-Founder',
    company: 'ByteGene',
    period: '2024 — Present',
    description: 'Leading web & UX/UI projects, managing technical workflows.',
    color: 'green'
  },
  {
    role: 'Organizer & Designer',
    company: 'Software Engineering Club',
    period: '2023 — Present',
    description: 'Organized competitions, designed materials, coordinated events.',
    color: 'red'
  }
]

const awards = [
  'Top 15 Student Researcher — IEEE Region 8 (2025)',
  'Runner-Up — IT Academy Champions League (2025)',
  '1st Place — SEC4 Game Competition (2025)',
  'Top 10 Finalist — UI/UX Competition (2024)'
]

// ─────────────────────────────────────────────────────────────────────────
// ROLE MODELS DATA
// ─────────────────────────────────────────────────────────────────────────

const roleModels = [
  {
    name: 'Prof. Mohammed Alhusban',
    title: 'Associate Professor, Software Architecture',
    description: 'The absolute GOAT. Like Gojo Satoru — strong, funny, smart, and effortlessly brilliant. A professor who makes you want to be better, not just in code but in how you show up. He is the reason I started taking software architecture seriously, and honestly, he made the entire semester feel like a masterclass in what it means to be a great educator and human being.',
    traits: ['Strong', 'Funny', 'Smart', 'GOAT'],
    color: 'purple',
    image: '/drmh.png'
  }
]

const colorStyles = {
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-gray-200', line: 'bg-indigo-500', hover: 'hover:border-gray-300 hover:bg-indigo-50' },
  red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-gray-200', line: 'bg-red-500', hover: 'hover:border-gray-300 hover:bg-red-50' },
  green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-gray-200', line: 'bg-green-500', hover: 'hover:border-gray-300 hover:bg-green-50' },
  yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-gray-200', line: 'bg-yellow-500', hover: 'hover:border-gray-300 hover:bg-yellow-50' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-gray-200', line: 'bg-blue-500', hover: 'hover:border-gray-300 hover:bg-blue-50' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-gray-200', line: 'bg-emerald-500', hover: 'hover:border-gray-300 hover:bg-emerald-50' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-gray-200', line: 'bg-pink-500', hover: 'hover:border-gray-300 hover:bg-pink-50' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-gray-200', line: 'bg-purple-500', hover: 'hover:border-gray-300 hover:bg-purple-50' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-gray-200', line: 'bg-amber-500', hover: 'hover:border-gray-300 hover:bg-amber-50' }
}

// ─────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const [mounted, setMounted] = useState(false)
  const [showPortalModal, setShowPortalModal] = useState(false)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const avatarRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const revealOverlayRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    layoutEffect: false
  })
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95])

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!avatarRef.current || !revealOverlayRef.current) return
    const rect = avatarRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    revealOverlayRef.current.style.clipPath = `circle(50px at ${x}px ${y}px)`
  }

  const handleMouseLeave = () => {
    if (!revealOverlayRef.current) return
    revealOverlayRef.current.style.clipPath = 'circle(0px at 0px 0px)'
  }

  const openProjectModal = (project: typeof projects[0]) => {
    setSelectedProject(project)
    setShowProjectModal(true)
  }

  if (!mounted) return null

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&family=Google+Sans+Display:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Google Sans Display', 'Inter', sans-serif;
          background: #ffffff;
          color: #202124;
        }
        
        ::-webkit-scrollbar {
          width: 5px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f3f4;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #dadce0;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #bdc1c6;
        }
        
        .section-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }
        
        .section-kicker-line {
          width: 28px;
          height: 2px;
          border-radius: 2px;
        }
        
        .g4-dots {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .g4-dots span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-3deg); }
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        .float-reverse {
          animation: floatReverse 7s ease-in-out infinite;
        }

        .clip-hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        
        .clip-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        
        .clip-diamond {
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu-open {
          animation: slideDown 0.2s ease-out both;
        }

        .blur-bg {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
      `}</style>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
        <div className="w-full max-w-4xl pointer-events-auto">
          <nav className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-full shadow-lg shadow-black/5 px-6 py-3 flex items-center justify-between">
            <a href="#" className="text-lg font-semibold tracking-tight">
              <span className="text-indigo-600">O</span>
              <span className="text-blue-600">m</span>
              <span className="text-emerald-600">a</span>
              <span className="text-red-500">r</span>
              <span className="text-gray-900">Aburub</span>
            </a>
            
            <div className="hidden md:flex items-center gap-4">
              <a href="#work" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors px-3 py-1.5 rounded-full hover:bg-indigo-50">Work</a>
              <a href="#skills" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors px-3 py-1.5 rounded-full hover:bg-emerald-50">Skills</a>
              <a href="#experience" className="text-sm text-gray-600 hover:text-blue-600 transition-colors px-3 py-1.5 rounded-full hover:bg-blue-50">Experience</a>
              <a href="#rolemodels" className="text-sm text-gray-600 hover:text-purple-600 transition-colors px-3 py-1.5 rounded-full hover:bg-purple-50">Role Models</a>
              <button 
                onClick={() => setShowPortalModal(true)}
                className="text-sm px-4 py-1.5 rounded-full bg-indigo-600 text-white flex items-center gap-1.5 hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-500/20"
              >
                <Compass size={14} />
                Portal
              </button>
            </div>

            <button 
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-2 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-xl shadow-black/5 px-4 py-3 flex flex-col gap-1 md:hidden"
              >
                <a href="#work" className="text-sm text-gray-700 hover:text-indigo-600 transition-colors px-3 py-2.5 rounded-lg hover:bg-indigo-50" onClick={() => setMobileMenuOpen(false)}>Work</a>
                <a href="#skills" className="text-sm text-gray-700 hover:text-emerald-600 transition-colors px-3 py-2.5 rounded-lg hover:bg-emerald-50" onClick={() => setMobileMenuOpen(false)}>Skills</a>
                <a href="#experience" className="text-sm text-gray-700 hover:text-blue-600 transition-colors px-3 py-2.5 rounded-lg hover:bg-blue-50" onClick={() => setMobileMenuOpen(false)}>Experience</a>
                <a href="#rolemodels" className="text-sm text-gray-700 hover:text-purple-600 transition-colors px-3 py-2.5 rounded-lg hover:bg-purple-50" onClick={() => setMobileMenuOpen(false)}>Role Models</a>
                <button 
                  onClick={() => {
                    setShowPortalModal(true)
                    setMobileMenuOpen(false)
                  }}
                  className="text-sm px-4 py-2.5 rounded-lg bg-indigo-600 text-white flex items-center gap-1.5 hover:bg-indigo-700 transition-colors justify-center mt-1"
                >
                  <Compass size={14} />
                  Portal
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-white" />
        
        <div className="absolute top-10 right-20 w-24 h-24 float-animation opacity-10">
          <div className="w-full h-full bg-indigo-400 clip-hexagon" />
        </div>
        <div className="absolute bottom-20 left-10 w-32 h-32 float-reverse opacity-10">
          <div className="w-full h-full rounded-full bg-indigo-400 blur-sm" />
        </div>
        <div className="absolute top-1/3 left-20 w-20 h-20 float-animation opacity-10" style={{ animationDelay: '-2s' }}>
          <div className="w-full h-full bg-indigo-400 clip-triangle" />
        </div>
        <div className="absolute bottom-1/3 right-10 w-24 h-24 float-reverse opacity-10" style={{ animationDelay: '-3s' }}>
          <div className="w-full h-full bg-indigo-400 clip-diamond" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div 
            ref={avatarRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] mx-auto mb-8 cursor-pointer"
          >
            <div className="absolute inset-0 rounded-2xl bg-indigo-500 p-[3px] shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white">
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                  <Image src="/omarw.png" alt="Omar Aburub" width={200} height={200} className="object-cover w-full h-full" priority />
                </div>
                
                <div 
                  ref={revealOverlayRef}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{
                    clipPath: 'circle(0px at 0px 0px)',
                    willChange: 'clip-path'
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Image src="/omarwbg.png" alt="Omar Aburub - Creative" width={200} height={200} className="object-cover w-full h-full" priority />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-white shadow-lg z-10 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </div>
            
            <div className="absolute -inset-3 rounded-2xl border-2 border-indigo-200/30 border-dashed animate-spin-slow pointer-events-none" style={{ animationDuration: '20s' }} />
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-4"
          >
            <span className="text-gray-900">Hi, I'm </span>
            <span className="text-indigo-600">O</span>
            <span className="text-blue-600">m</span>
            <span className="text-emerald-600">a</span>
            <span className="text-red-500">r</span>
            <span className="text-gray-900"> </span>
            <span className="text-amber-600">A</span>
            <span className="text-cyan-600">b</span>
            <span className="text-pink-600">u</span>
            <span className="text-purple-600">r</span>
            <span className="text-teal-600">u</span>
            <span className="text-orange-600">b</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            I bridge HCI, AI, and design to create accessible digital experiences. 
            Software Engineering student at Applied Science University.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <motion.a
              href="#work"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="text-base text-gray-700 hover:text-indigo-600 transition-colors duration-200 cursor-pointer relative group"
            >
              Work
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full" />
            </motion.a>
            
            <motion.a
              href="mailto:omar.abualrob@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="text-base text-gray-700 hover:text-indigo-600 transition-colors duration-200 cursor-pointer relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full" />
            </motion.a>

            <motion.a
              href="/omcv2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="text-base text-gray-700 hover:text-indigo-600 transition-colors duration-200 cursor-pointer relative group flex items-center gap-1.5"
            >
              <FileText size={16} />
              CV
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-5 mt-8"
          >
            <motion.a href="https://github.com/omaraburub-byte" target="_blank" rel="noopener" whileHover={{ y: -2, scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="text-gray-400 hover:text-indigo-600 transition-colors duration-200">
              <Github size={18} />
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/omar-aburub-profile/" target="_blank" rel="noopener" whileHover={{ y: -2, scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="text-gray-400 hover:text-indigo-600 transition-colors duration-200">
              <Linkedin size={18} />
            </motion.a>
            <motion.a href="mailto:omar.abualrob@gmail.com" whileHover={{ y: -2, scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="text-gray-400 hover:text-indigo-600 transition-colors duration-200">
              <Mail size={18} />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">Scroll</span>
            <div className="w-5 h-8 rounded-full border-2 border-gray-300 flex justify-center p-1">
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-1 h-2 rounded-full bg-indigo-500" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Bar */}
      <div className="border-y border-gray-200 py-5 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-12">
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-indigo-500" />
            <span className="font-semibold text-gray-800">15+</span>
            <span className="text-xs text-gray-500">Projects</span>
          </div>
          <div className="w-px h-4 bg-gray-300 hidden md:block" />
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-amber-500" />
            <span className="font-semibold text-gray-800">Top 15</span>
            <span className="text-xs text-gray-500">IEEE Rank</span>
          </div>
          <div className="w-px h-4 bg-gray-300 hidden md:block" />
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-emerald-600" />
            <span className="font-semibold text-gray-800">89.2%</span>
            <span className="text-xs text-gray-500">GPA</span>
          </div>
          <div className="w-px h-4 bg-gray-300 hidden md:block" />
          <div className="flex items-center gap-2">
            <Award size={16} className="text-red-500" />
            <span className="font-semibold text-gray-800">6</span>
            <span className="text-xs text-gray-500">Awards</span>
          </div>
        </div>
      </div>

      {/* Work Section - 3 cards per row */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="section-kicker">
              <span className="section-kicker-line bg-indigo-500"></span>
              <span className="text-indigo-600">PORTFOLIO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Selected Work</h2>
            <p className="text-gray-500 max-w-2xl">Research, design, and development projects I'm proud of.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => {
              const c = colorStyles[project.color as keyof typeof colorStyles]
              const Icon = project.icon
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`group relative bg-white border ${c.border} rounded-xl overflow-hidden ${c.hover} transition-all duration-300`}
                >
                  <div className={`absolute top-0 left-0 h-0.5 w-full ${c.line} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                  
                  <div className="p-6">
                    <div className={`w-10 h-0.5 ${c.line} mb-4`} />
                    
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">{project.subtitle}</p>
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">{project.title}</h3>
                      </div>
                      <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center ${c.text} group-hover:scale-105 transition-transform duration-200`}>
                        <Icon size={16} />
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{project.shortDescription}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 group-hover:bg-gray-200 transition-colors duration-200">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-400">+{project.tags.length - 3}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        {project.award && (
                          <div className="flex items-center gap-1.5 text-xs text-amber-600">
                            <Trophy size={12} />
                            <span>{project.award}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            openProjectModal(project)
                          }}
                          className="text-xs text-gray-400 hover:text-indigo-600 transition-colors duration-200 flex items-center gap-1 px-2 py-1 rounded-full hover:bg-indigo-50"
                        >
                          <Info size={12} />
                          More Info
                        </button>
                        <a
                          href={project.link}
                          target={project.external ? "_blank" : "_self"}
                          rel={project.external ? "noopener noreferrer" : ""}
                          className="text-xs text-gray-400 hover:text-indigo-600 transition-colors duration-200 flex items-center gap-1 px-2 py-1 rounded-full hover:bg-indigo-50"
                        >
                          View
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="section-kicker justify-center">
              <span className="section-kicker-line bg-emerald-500"></span>
              <span className="text-emerald-600">TECH STACK</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Tools & Technologies</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Languages, frameworks, and design tools I work with daily.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {skills.map((skill, idx) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 text-sm hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50 transition-all cursor-pointer"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="section-kicker justify-center">
              <span className="section-kicker-line bg-blue-500"></span>
              <span className="text-blue-600">JOURNEY</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Experience & Education</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Where I've learned and grown.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border border-emerald-200 rounded-xl p-6 mb-8 bg-emerald-50/30 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">BSc in Software Engineering</h3>
                <p className="text-emerald-600 text-sm">Applied Science Private University</p>
                <div className="flex flex-wrap gap-3 mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">GPA: 89.2%</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">Rank: 16</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">Expected 2027</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="space-y-6">
            {experience.map((exp, idx) => {
              const c = colorStyles[exp.color as keyof typeof colorStyles]
              return (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative pl-6 border-l-2 border-gray-200 hover:border-indigo-300 transition-all group"
                >
                  <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-${exp.color}-500 group-hover:scale-125 transition-transform`} />
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                    <div>
                      <h3 className={`font-semibold text-gray-800 group-hover:text-${exp.color}-600 transition-colors`}>{exp.role}</h3>
                      <p className={`text-${exp.color}-600 text-sm`}>{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{exp.period}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{exp.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Role Models Section */}
      <section id="rolemodels" className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="section-kicker justify-center">
              <span className="section-kicker-line bg-purple-500"></span>
              <span className="text-purple-600">ROLE MODELS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">People Who Inspire Me</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">The mentors and teachers who shaped how I think, learn, and grow.</p>
          </motion.div>

          <div className="relative">
            <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto opacity-50 blur-sm pointer-events-none select-none">
              {roleModels.map((model, idx) => {
                const c = colorStyles[model.color as keyof typeof colorStyles]
                return (
                  <div key={model.name} className={`relative bg-white border ${c.border} rounded-2xl overflow-hidden p-8 shadow-md`}>
                    <div className={`absolute top-0 left-0 right-0 h-1 ${c.line}`} />
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
                        <Image src={model.image} alt={model.name} width={96} height={96} className="object-cover w-full h-full" />
                      </div>
                      <div className="w-full">
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          <h3 className="text-xl font-bold text-gray-900">{model.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${c.bg} ${c.text} font-medium`}>Associate Professor</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{model.title}</p>
                        <p className="text-gray-600 leading-relaxed text-sm max-w-xl mx-auto">{model.description}</p>
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                          {model.traits.map((trait, i) => (
                            <span key={i} className={`text-xs px-3 py-1 rounded-full ${c.bg} ${c.text} font-medium flex items-center gap-1`}>
                              <Star size={12} />
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/60 backdrop-blur-sm rounded-2xl">
              <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">
                <Lock size={32} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Under Work</h3>
              <p className="text-gray-500 text-sm max-w-sm text-center">
                This section is currently being refined.
                <br />
                Coming soon with more inspiring stories.
              </p>
              <div className="flex items-center gap-2 text-sm text-purple-600">
                <Eye size={16} />
                <span>Preview mode</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="section-kicker justify-center">
              <span className="section-kicker-line bg-amber-500"></span>
              <span className="text-amber-600">RECOGNITION</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Awards & Achievements</h2>
            <p className="text-gray-500">Competitions and honors I've received.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-3"
          >
            {awards.map((award, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 p-3.5 rounded-lg bg-white border border-gray-100 hover:border-amber-200 hover:shadow-sm transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center">
                  <Trophy size={12} className="text-amber-500" />
                </div>
                <span className="text-sm text-gray-700">{award}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
            className="bg-indigo-600 rounded-2xl p-10 text-center cursor-default shadow-xl"
          >
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-2xl md:text-3xl font-bold text-white mb-3"
            >
              Let's Connect
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-indigo-100 mb-6 max-w-md mx-auto"
            >
              Open to research collaborations, design projects, and development opportunities.
            </motion.p>
            <motion.a
              href="mailto:omar.abualrob@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <button className="px-6 py-2.5 rounded-full bg-white text-indigo-600 font-medium hover:shadow-lg transition-all cursor-pointer">
                Get in Touch
              </button>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Project Details Modal */}
      <AnimatePresence>
        {showProjectModal && selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowProjectModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-4 md:inset-12 z-[101] max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="flex-shrink-0 bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${colorStyles[selectedProject.color as keyof typeof colorStyles].bg} flex items-center justify-center ${colorStyles[selectedProject.color as keyof typeof colorStyles].text}`}>
                    {selectedProject.icon && <selectedProject.icon size={16} />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedProject.title}</h3>
                    <p className="text-xs text-gray-500">{selectedProject.subtitle}</p>
                  </div>
                </div>
                <button onClick={() => setShowProjectModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {selectedProject.award && (
                    <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full mb-4">
                      <Trophy size={14} />
                      <span>{selectedProject.award}</span>
                    </div>
                  )}
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedProject.fullDescription || selectedProject.shortDescription}
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <a
                    href={selectedProject.link}
                    target={selectedProject.external ? "_blank" : "_self"}
                    rel={selectedProject.external ? "noopener noreferrer" : ""}
                    className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    View Project
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Portal Modal */}
      <AnimatePresence>
        {showPortalModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowPortalModal(false)}
              className="fixed inset-0 bg-black/80 z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-4 md:inset-8 z-[101] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="flex-shrink-0 bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Compass size={16} className="text-indigo-500" />
                  <span className="text-sm font-medium text-gray-700">Portal Universe</span>
                </div>
                <div className="flex items-center gap-3">
                  <Link href="/landing" target="_blank" className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-medium px-3 py-1.5 rounded-full hover:bg-indigo-50 transition-colors">
                    Open Full Page
                    <ExternalLink size={14} />
                  </Link>
                  <button onClick={() => setShowPortalModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <iframe src="/landing?embed=true" className="w-full h-full" title="Portal" sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals" style={{ border: 'none', background: '#0A0A0A' }} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <div className="g4-dots justify-center mb-3">
            <span style={{ background: '#4f46e5' }}></span>
            <span style={{ background: '#e53935' }}></span>
            <span style={{ background: '#f9a825' }}></span>
            <span style={{ background: '#2e7d32' }}></span>
          </div>
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} Omar Aburub • Built with Next.js & Framer Motion</p>
        </div>
      </footer>
    </div>
  )
}