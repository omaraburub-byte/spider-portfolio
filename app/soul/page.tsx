// app/soul/page.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SoulWorld() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2E] to-[#2A2F3E] flex items-center justify-center">
      <div className="text-center px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-carton-six text-[#F5E6D3] mb-6"
        >
          Soul World
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-[#D9B48F] mb-8"
        >
          A world of warmth, intention, and humanity
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/50 mb-12 max-w-md mx-auto"
        >
          This world is still being crafted. Check back soon.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link 
            href="/landing" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#BB8F4F] text-[#1A1F2E] rounded-full hover:bg-[#9A7A3F] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Portal
          </Link>
        </motion.div>
      </div>
    </div>
  )
}