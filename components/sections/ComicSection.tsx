'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ComicPanel } from '@/components/comic/ComicPanel'

const comicPanels = [
  {
    title: "THE BEGINNING",
    description: "Writing my first line of code - 'Hello, World!' felt like discovering superpowers.",
    year: "2021",
    icon: "💻",
    color: "from-blue-400 to-cyan-400",
    accent: "bg-blue-500",
  },
  {
    title: "THE BUG",
    description: "Debugging for 8 hours straight. The villain was a missing semicolon.",
    year: "2022",
    icon: "🐛",
    color: "from-red-400 to-orange-400",
    accent: "bg-red-500",
  },
  {
    title: "BREAKTHROUGH",
    description: "Built my first full-stack app. Felt like web-slinging through the city.",
    year: "2023",
    icon: "🚀",
    color: "from-green-400 to-emerald-400",
    accent: "bg-green-500",
  },
  {
    title: "THE COMPETITION",
    description: "Won 1st place in SEC4 with 'One's Mind'. Our team was unstoppable.",
    year: "2024",
    icon: "🏆",
    color: "from-yellow-400 to-amber-400",
    accent: "bg-yellow-500",
  },
  {
    title: "THE RESEARCH",
    description: "Published IEEE paper on AI-driven UI assessment. Bridging HCI and Computer Vision.",
    year: "2025",
    icon: "🔬",
    color: "from-purple-400 to-pink-400",
    accent: "bg-purple-500",
  },
  {
    title: "THE FUTURE",
    description: "Becoming the Spider of Software Engineering - weaving AI, UX, and secure code.",
    year: "2026+",
    icon: "🕸️",
    color: "from-spider-red to-spider-blue",
    accent: "bg-gradient-to-r from-spider-red to-spider-blue",
  },
]

export default function ComicSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Comic book texture background */}
      {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2220%22 height=%2220%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern id=%22dots%22 x=%220%22 y=%220%22 width=%2220%22 height=%2220%22 patternUnits=%22userSpaceOnUse%22%3E%3Ccircle cx=%221%22 cy=%221%22 r=%221%22 fill=%22%23000000%22 opacity=%220.05%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23dots)%22/%3E%3C/svg%3E')] opacity-30" /> */}
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-barrio text-6xl mb-4 bg-gradient-to-r from-spider-red to-spider-blue bg-clip-text text-transparent">
            SPIDER-VERSE JOURNEY
          </h2>
          <p className="font-montserrat text-lg text-muted-foreground max-w-2xl mx-auto">
            My origin story through comic book panels. Each frame a milestone, each bubble a memory.
          </p>
        </motion.div>

        {/* Comic strip timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-spider-red via-spider-blue to-spider-neon" />
          
          {/* Panels */}
          <div className="space-y-24">
            {comicPanels.map((panel, index) => (
              <ComicPanel
                key={index}
                panel={panel}
                index={index}
                y={index % 2 === 0 ? y : useTransform(scrollYProgress, [0, 1], [-100, 100])}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}