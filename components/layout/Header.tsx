'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Linkedin, Mail, FileText, Sparkles } from 'lucide-react'
import Link from 'next/link'
import SpiderLogo from '@/components/SpiderLogo' // Add this import

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-spider-gray">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - UPDATED WITH YOUR SPIDER LOGO */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <SpiderLogo className="w-10 h-10" />
              <div className="absolute inset-0 animate-web-spin">
                <div className="w-10 h-10 border border-spider-blue/50 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="font-sacramento text-2xl text-spider-red group-hover:text-spider-neon transition-colors">
                O. Aburub
              </div>
              <div className="font-montserrat text-xs text-gray-400">
                Spider of Software Engineering
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-lg text-gray-300 hover:text-spider-red hover:bg-white/5 transition-all relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-spider-red group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></span>
              </motion.a>
            ))}
          </nav>

          {/* Desktop Social Links */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.a
              href="https://github.com/omaraburub-byte"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-black/50 border border-gray-800 text-gray-400 hover:text-spider-red hover:border-spider-red transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/omar-aburub-profile/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-black/50 border border-gray-800 text-gray-400 hover:text-spider-red hover:border-spider-red transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="/resume.pdf"
              className="px-4 py-2 rounded-lg bg-spider-red text-white flex items-center space-x-2 hover:bg-spider-red/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles size={16} />
              <span>Resume</span>
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 rounded-lg border border-gray-800 text-gray-400"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden mt-2 py-4 border-t border-gray-800"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="py-3 px-4 rounded-lg text-gray-300 hover:text-spider-red hover:bg-white/5 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="flex space-x-3 pt-4">
                  <a href="https://github.com/omaraburub-byte" className="flex-1 p-3 rounded-lg bg-black/50 border border-gray-800 text-center text-gray-400 hover:text-spider-red">
                    <Github size={20} className="mx-auto" />
                  </a>
                  <a href="https://www.linkedin.com/in/omar-aburub-profile/" className="flex-1 p-3 rounded-lg bg-black/50 border border-gray-800 text-center text-gray-400 hover:text-spider-red">
                    <Linkedin size={20} className="mx-auto" />
                  </a>
                  <a href="mailto:omar.spiderofse@gmail.com" className="flex-1 p-3 rounded-lg bg-black/50 border border-gray-800 text-center text-gray-400 hover:text-spider-red">
                    <Mail size={20} className="mx-auto" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}