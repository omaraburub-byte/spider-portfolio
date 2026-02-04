'use client'

import { motion } from 'framer-motion'
import ComicPanel from '@/components/comic/ComicPanel'
import { BookOpen, Zap, Target, Award, Users, Star, Sparkles } from 'lucide-react'

const comicPanels = [
  {
    id: 1,
    title: 'ORIGIN STORY',
    description: 'The journey begins with a passion for technology and design. First discovered coding through basic HTML/CSS in high school.',
    year: '2018-2020',
    icon: BookOpen,
    color: 'border-spider-blue',
    bgColor: 'bg-spider-blue/10',
    textColor: 'text-spider-blue',
    position: 'left' as const,
  },
  {
    id: 2,
    title: 'THE FIRST WEB',
    description: 'Built first full-stack project - a portfolio website using React and Node.js. Learned the importance of clean code.',
    year: '2021',
    icon: Zap,
    color: 'border-spider-red',
    bgColor: 'bg-spider-red/10',
    textColor: 'text-spider-red',
    position: 'right' as const,
  },
  {
    id: 3,
    title: 'UX/UI AWAKENING',
    description: 'Discovered UX/UI design principles. Started creating user-centered interfaces with Figma and design systems.',
    year: '2022',
    icon: Target,
    color: 'border-spider-neon',
    bgColor: 'bg-spider-neon/10',
    textColor: 'text-spider-neon',
    position: 'left' as const,
  },
  {
    id: 4,
    title: 'HCI RESEARCH',
    description: 'Began human-computer interaction research. Published first paper on AI-driven UI evaluation framework.',
    year: '2023',
    icon: Award,
    color: 'border-spider-red',
    bgColor: 'bg-spider-red/10',
    textColor: 'text-spider-red',
    position: 'right' as const,
  },
  {
    id: 5,
    title: 'TEAM LEADERSHIP',
    description: 'Founded EnthusiastTech and led multiple projects. Managed teams for hackathons and client projects.',
    year: '2024',
    icon: Users,
    color: 'border-spider-blue',
    bgColor: 'bg-spider-blue/10',
    textColor: 'text-spider-blue',
    position: 'left' as const,
  },
  {
    id: 6,
    title: 'PRESENT DAY',
    description: 'Combining AI, UX design, and development to create impactful digital experiences. Always learning, always improving.',
    year: '2025',
    icon: Star,
    color: 'border-spider-neon',
    bgColor: 'bg-spider-neon/10',
    textColor: 'text-spider-neon',
    position: 'right' as const,
  },
]

export default function ComicSection() {
  return (
    <section id="journey" className="py-24 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-barrio text-4xl md:text-6xl text-foreground mb-6 tracking-wider">
            <span className="text-spider-red">COMIC</span> BOOK{' '}
            <span className="text-spider-blue">JOURNEY</span>
          </h2>
          <p className="font-montserrat text-muted-foreground text-lg max-w-3xl mx-auto">
            My evolution as a developer and designer, told through comic book panels.
          </p>
          <motion.div 
            className="mt-8 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles className="w-5 h-5 text-spider-red mr-2" />
            <span className="text-sm text-muted-foreground font-mono">SCROLL TO READ THE STORY →</span>
          </motion.div>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Comic book spine (center line) - BEHIND EVERYTHING */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-spider-red via-spider-blue to-spider-neon z-0"></div>
          
          {/* Mobile timeline line - BEHIND EVERYTHING */}
          <div className="lg:hidden absolute left-6 sm:left-8 h-full w-1 bg-gradient-to-b from-spider-red via-spider-blue to-spider-neon z-0"></div>

          {/* Comic panels */}
          <div className="relative z-10 space-y-20 lg:space-y-24">
            {comicPanels.map((panel, index) => (
              <ComicPanel
                key={panel.id}
                {...panel}
                index={index}
              />
            ))}
          </div>

          {/* Comic book "THE END" panel */}
          <motion.div 
            className="mt-24 text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="inline-block px-8 py-4 bg-card border-4 border-spider-red rounded-xl">
              <div className="font-barrio text-2xl text-spider-red">TO BE CONTINUED...</div>
              <div className="font-montserrat text-sm text-muted-foreground mt-2">
                Next issue coming soon!
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}