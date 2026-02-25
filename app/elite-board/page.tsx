// app/elite-board/page.tsx
'use client'

import { motion } from 'framer-motion'
import { Eye, Github, Linkedin, Mail, Info } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Template for friends to fill
const eliteMembers = [
  {
    id: 1,
    name: "Rashad Abu Rub",
    nickname: "The Designer",
    university: "Applied Science University",
    major: "Software Engineering",
    overall: 0,
    photo: "/friends/c1.png",
    stats: {
      coding: 0,
      research: 0,
      creativity: 0,
      impact: 0,
      leadership: 0,
      communication: 0
    },
    social: {
      github: "https://github.com/rashad",
      linkedin: "https://linkedin.com/in/rashad",
      email: "rashad@example.com"
    }
  },
  // Add 11 more...
]

// Stat definitions for legend - updated descriptions
const statDefinitions = [
  { abbr: "COD", name: "Coding", description: "Problem solving & technical ability" },
  { abbr: "RSC", name: "Research", description: "Research methodology & analysis" },
  { abbr: "CRE", name: "Creativity", description: "Artistic vision & appealing design" },
  { abbr: "IMP", name: "Impact", description: "Project & community influence" },
  { abbr: "LDR", name: "Leadership", description: "Team management & initiative" },
  { abbr: "COM", name: "Communication", description: "Presentation & collaboration" }
]

export default function EliteBoardPage() {
  const getStatColor = (value: number) => {
    if (value === 0) return 'text-gray-300 dark:text-gray-700'
    if (value >= 90) return 'text-red-500 dark:text-red-400'
    if (value >= 80) return 'text-purple-500 dark:text-purple-400'
    if (value >= 70) return 'text-blue-500 dark:text-blue-400'
    return 'text-gray-500 dark:text-gray-400'
  }

  const getStatLabel = (key: string) => {
    const labels: { [key: string]: string } = {
      coding: "COD",
      research: "RSC",
      creativity: "CRE",
      impact: "IMP",
      leadership: "LDR",
      communication: "COM"
    }
    return labels[key] || key
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#0A0A0A] pt-24 pb-16 relative">
      {/* Full page overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-sm rounded-2xl p-8 text-center max-w-md mx-auto shadow-2xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <Eye className="w-8 h-8 text-gray-600 dark:text-gray-400" />
          </div>
          <h3 className="text-xl text-gray-900 dark:text-white mb-2">Coming Soon</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            The Elite Board is being prepared. Check back later to see the outstanding minds from our faculty.
          </p>
        </div>
      </div>
      
      {/* Blurred background content */}
      <div className="blur-sm pointer-events-none">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-1.5 mb-4 border border-gray-200 dark:border-gray-800 rounded-full">
              <span className="text-xs font-mono text-gray-500 dark:text-gray-400">THE ELITE BOARD</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 dark:text-white mb-4">
              Outstanding Minds
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              The brightest students from our faculty and university
            </p>
            
            {/* Stats Guide */}
            <div className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-800 rounded-full">
              <Info size={14} />
              STATS GUIDE
            </div>

            {/* Stats Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto mt-6 p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-[#0F0F0F]"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {statDefinitions.map((stat) => (
                  <div key={stat.abbr} className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-red-500 dark:text-red-400">{stat.abbr}</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{stat.name}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 dark:text-gray-500 mt-1">{stat.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-800">
                <p className="text-[10px] text-gray-400 dark:text-gray-600">
                  <span className="inline-block w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700 mr-1"></span> 0 Not Rated • 
                  <span className="inline-block w-3 h-3 rounded-full bg-red-500 mx-1"></span> 90+ Legendary • 
                  <span className="inline-block w-3 h-3 rounded-full bg-purple-500 mx-1"></span> 80-89 Elite • 
                  <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mx-1"></span> 70-79 Great
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {eliteMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="witcher-card-container"
              >
                <div className="witcher-card">
                  {/* Minimalist shape elements - matching portfolio style */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Subtle geometric shapes - gray scale, low opacity */}
                    <div className="absolute top-10 right-10 w-24 h-24 border border-gray-200 dark:border-gray-800 rotate-12 rounded-lg opacity-20" />
                    <div className="absolute bottom-10 left-10 w-32 h-32 border border-gray-200 dark:border-gray-800 -rotate-6 rounded-full opacity-20" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-gray-200 dark:border-gray-800 rotate-45 rounded-2xl opacity-20" />
                    
                    {/* Tiny corner accents - matching the card corners */}
                    <div className="absolute top-20 left-20 w-4 h-4 border-t border-l border-gray-300 dark:border-gray-700 opacity-30" />
                    <div className="absolute top-20 right-20 w-4 h-4 border-t border-r border-gray-300 dark:border-gray-700 opacity-30" />
                    <div className="absolute bottom-20 left-20 w-4 h-4 border-b border-l border-gray-300 dark:border-gray-700 opacity-30" />
                    <div className="absolute bottom-20 right-20 w-4 h-4 border-b border-r border-gray-300 dark:border-gray-700 opacity-30" />
                  </div>
                  
                  <div className="witcher-card-corner top-left" />
                  <div className="witcher-card-corner top-right" />
                  <div className="witcher-card-corner bottom-left" />
                  <div className="witcher-card-corner bottom-right" />
                  
                  <div className="witcher-card-content">
                    {/* Overall Rating */}
                    <div className="absolute top-3 left-3">
                      <span className={`text-3xl font-bold ${member.overall === 0 ? 'text-gray-300 dark:text-gray-700' : 'text-red-500 dark:text-red-400'}`}>
                        {member.overall === 0 ? '?' : member.overall}
                      </span>
                      <span className="text-[10px] text-gray-400 ml-1">OVR</span>
                    </div>

                    {/* Photo - ultra smooth fade */}
                    <div className="flex items-center justify-center relative">
                      <div className="w-48 h-48 relative">
                        {member.photo ? (
                          <>
                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 via-30% via-white/30 via-60% to-transparent dark:from-[#0A0A0A] dark:via-[#0A0A0A]/80 dark:via-30% dark:via-[#0A0A0A]/30 dark:via-60% dark:to-transparent z-20 pointer-events-none" />
                            <Image
                              src={member.photo}
                              alt={member.name}
                              fill
                              className="object-contain relative z-10"
                            />
                          </>
                        ) : (
                          <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-3xl text-gray-500">
                            {member.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Name & Details */}
                    <div className="text-center relative">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {member.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                        "{member.nickname}"
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {member.major}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 py-2 border-t border-b border-gray-200 dark:border-gray-800 relative">
                      {Object.entries(member.stats).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-gray-500 font-mono">{getStatLabel(key)}</span>
                          <span className={`font-medium ${getStatColor(value)}`}>
                            {value === 0 ? '-' : value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Social Links - guaranteed clickable */}
                    <div className="flex justify-center gap-4 pt-2 pb-4" style={{ position: 'relative', zIndex: 9999 }}>
                      <Link href={member.social.github} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Github size={16} />
                      </Link>
                      <Link href={member.social.linkedin} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Linkedin size={16} />
                      </Link>
                      <Link href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Mail size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .witcher-card-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .witcher-card {
          position: relative;
          width: 18em;
          background: white;
          border: 1px solid #e5e5e5;
          padding: 1.2em 1.2em 0.8em 1.2em;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        :global(.dark) .witcher-card {
          background: #0A0A0A;
          border-color: #1f1f1f;
        }

        .witcher-card-corner {
          position: absolute;
          width: 2em;
          height: 2em;
          border: 1px solid #9CA3AF;
          transition: all 0.4s ease;
          opacity: 0.3;
        }

        :global(.dark) .witcher-card-corner {
          border-color: #4B5563;
        }

        .top-left { top: 0.5em; left: 0.5em; border-right: none; border-bottom: none; }
        .top-right { top: 0.5em; right: 0.5em; border-left: none; border-bottom: none; }
        .bottom-left { bottom: 0.5em; left: 0.5em; border-right: none; border-top: none; }
        .bottom-right { bottom: 0.5em; right: 0.5em; border-left: none; border-top: none; }

        .witcher-card-content {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.8em;
        }

        /* Hover Effects */
        .witcher-card:hover {
          transform: translateY(-0.5em);
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
          border-color: #e62429;
        }

        .witcher-card:hover .witcher-card-corner {
          width: 85%;
          height: 85%;
          opacity: 1;
          border-color: #e62429;
        }
      `}</style>
    </main>
  )
}