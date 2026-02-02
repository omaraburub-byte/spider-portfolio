'use client'

import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Users, Award as AwardIcon } from 'lucide-react'

const experiences = [
  {
    title: 'HCI Researcher',
    company: 'Applied Science Private University',
    period: 'May 2025 - Present',
    description: 'Conducting AI-driven user interface research. Authored computer vision-based research paper ranked Top 15 in IEEE JSCPC 2025.',
    icon: Briefcase,
    type: 'work',
  },
  {
    title: 'Team Lead Manager & Co-Founder',
    company: 'EnthusiastTech',
    period: 'Sep 2024 - Present',
    description: 'Lead software solutions team delivering custom web applications. Managed projects for Global Center for Training & Consultation and AI-Mayadi Enterprises.',
    icon: Users,
    type: 'work',
  },
  {
    title: 'Organizer & Designer',
    company: 'Software Engineering Club',
    period: 'Nov 2023 - Present',
    description: 'Design promotional materials and plan coding competitions/workshops. Managed hackathon-style events and participant coordination.',
    icon: AwardIcon,
    type: 'work',
  },
  {
    title: 'Bachelor\'s in Software Engineering',
    company: 'Applied Science Private University',
    period: 'Expected 2027',
    description: 'GPA: 89.2% | Rank: 16',
    icon: GraduationCap,
    type: 'education',
  },
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-barrio text-5xl text-center mb-4 text-foreground">
            SPIDER JOURNEY
          </h2>
          <p className="font-montserrat text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            My path through academia, research, and professional work.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-muted"></div>
          
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className={`absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full z-10 ${
                exp.type === 'work' ? 'bg-primary' : 'bg-spider-blue'
              } border-4 border-background`}></div>
              
              {/* Content card */}
              <div className={`md:w-5/12 ${
                index % 2 === 0 ? 'md:pr-12 ml-16 md:ml-0' : 'md:pl-12 ml-16 md:ml-0'
              }`}>
                <div className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-background ${
                      exp.type === 'work' ? 'text-primary' : 'text-spider-blue'
                    } mr-4`}>
                      <exp.icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{exp.title}</h3>
                      <p className="text-primary">{exp.company}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{exp.period}</p>
                  <p className="text-card-foreground">{exp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}