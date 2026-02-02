// lib/types.ts
export interface ComicPanelProps {
  panel: {
    title: string
    description: string
    year: string
    icon: string
    color: string
    accent: string
  }
  index: number
  y: any // This is from framer-motion's useTransform
}

// You can add more types here as needed
export interface Project {
  title: string
  description: string
  tags: string[]
  github: string
  demo: string
  featured: boolean
}

export interface SkillCategory {
  title: string
  skills: string[]
  icon: any // Lucide icon component
  color: string
  description: string
}