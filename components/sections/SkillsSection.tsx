'use client'

import { motion } from 'framer-motion'
import { Code, Palette, Cpu, Shield, Gamepad2, Wrench } from 'lucide-react'

const skillCategories = [
  {
    title: 'AI & Machine Learning',
    skills: ['Python', 'AI API Integration', 'Hugging Face', 'Prompt Engineering', 'OpenCV', 'LLM Integration'],
    icon: Cpu,
    color: 'text-red-500',
    description: 'Building intelligent systems with modern AI tools',
  },
  {
    title: 'UX/UI Design',
    skills: ['Figma', 'User Research', 'Prototyping', 'Adobe Suite', 'WCAG Accessibility', 'Wireframing'],
    icon: Palette,
    color: 'text-blue-500',
    description: 'Creating beautiful, user-centered interfaces',
  },
  {
    title: 'Full-Stack Dev',
    skills: ['Flutter', 'JavaScript', 'React', 'Firebase', 'MySQL', 'WordPress'],
    icon: Code,
    color: 'text-green-500',
    description: 'Building complete web and mobile applications',
  },
  {
    title: 'Cybersecurity',
    skills: ['Reverse Engineering', 'Web Security', 'Cryptography', 'Burp Suite', 'Ghidra', 'CTF'],
    icon: Shield,
    color: 'text-purple-500',
    description: 'Securing systems and finding vulnerabilities',
  },
  {
    title: 'Game Development',
    skills: ['Unity', 'C#', '2D Game Design', 'Game Mechanics', 'Documentation'],
    icon: Gamepad2,
    color: 'text-yellow-500',
    description: 'Creating immersive gaming experiences',
  },
  {
    title: 'Tools & Platforms',
    skills: ['Git/GitHub', 'VS Code', 'Android Studio', 'Docker', 'LaTeX', 'UiPath'],
    icon: Wrench,
    color: 'text-cyan-500',
    description: 'Mastering development tools and workflows',
  },
]

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-barrio text-5xl text-center mb-4 text-white">
            SPIDER SKILLSET
          </h2>
          <p className="font-montserrat text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            The tools and technologies I use to build amazing things.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-spider-gray border border-gray-800 rounded-2xl p-6 hover:border-spider-blue transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-lg bg-black ${category.color} mr-4`}>
                  <category.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: skillIndex * 0.05 }}
                    className="px-3 py-1.5 bg-black text-gray-300 rounded-lg text-sm border border-gray-800 hover:border-spider-red hover:text-white transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}