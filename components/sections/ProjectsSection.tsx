'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Eye, Brain, Gamepad2, Palette } from 'lucide-react'

const projects = [
  {
    title: 'EvalUI',
    description: 'Computer vision-based framework for automated UI accessibility and layout quality assessment.',
    longDescription: 'Combines OpenCV, WCAG evaluation, and spatial modeling to assess UI layouts without source code.',
    tags: ['Python', 'OpenCV', 'Hugging Face', 'Gradio', 'Computer Vision'],
    github: '#',
    demo: '#',
    icon: Brain,
    color: 'border-spider-red',
    featured: true,
  },
  {
    title: 'One\'s Mind',
    description: 'Psychological puzzle-adventure game winning 1st place in SEC4 competition.',
    longDescription: 'Developed in Unity with C#, featuring memory-based narrative progression and dynamic illusions.',
    tags: ['Unity', 'C#', 'Game Development', '2D', 'Puzzle'],
    github: '#',
    demo: '#',
    icon: Gamepad2,
    color: 'border-spider-blue',
    featured: true,
  },
  {
    title: 'FASBIR',
    description: 'National initiatives platform for charity support in crisis regions.',
    longDescription: 'Full UX/UI prototype with donation processing, emergency alerts, and digital identity creation.',
    tags: ['Figma', 'UX/UI', 'Prototyping', 'Social Impact'],
    github: '#',
    demo: '#',
    icon: Palette,
    color: 'border-spider-neon',
    featured: true,
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-barrio text-5xl text-center mb-4 text-white">
            WEB OF PROJECTS
          </h2>
          <p className="font-montserrat text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            A collection of my most impactful work across AI, gaming, and design.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-spider-gray border ${project.color} rounded-2xl p-6 hover:shadow-2xl hover:shadow-spider-red/20 transition-all duration-300 group`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-black ${project.color.replace('border-', 'text-')}`}>
                    <project.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                </div>
                <div className="flex space-x-2">
                  <a href={project.github} className="p-2 rounded-lg bg-black text-gray-400 hover:text-white hover:bg-spider-gray">
                    <Github size={18} />
                  </a>
                  <a href={project.demo} className="p-2 rounded-lg bg-black text-gray-400 hover:text-white hover:bg-spider-gray">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
              
              <p className="text-gray-400 mb-6">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-black text-gray-300 rounded-full text-sm border border-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="pt-6 border-t border-gray-800">
                <p className="text-sm text-gray-500 mb-4">{project.longDescription}</p>
                <a
                  href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center text-spider-red hover:text-spider-red/80 text-sm"
                >
                  View case study
                  <Eye size={14} className="ml-2" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.a
            href="#"
            className="inline-flex items-center px-6 py-3 border border-spider-gray text-gray-300 rounded-lg hover:border-spider-red hover:text-spider-red transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <ExternalLink size={16} className="ml-2" />
          </motion.a>
        </div>
      </div>
    </section>
  )
}