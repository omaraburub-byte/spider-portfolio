// app/ijspc-2026/page.tsx
'use client'

import { motion } from 'framer-motion'
import { 
  Calendar, FileText, Users, BookOpen, Award, ExternalLink, 
  Clock, Download, Search, PenTool, Lightbulb, GraduationCap,
  CheckCircle, Target, Zap, Globe, Mail, MessageSquare, Video,
  FileCode, BarChart, Cpu, Brain, Shield, Rocket, Sparkles, Heart,
  Users2
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function IJSPC2026Page() {
  const [activeTab, setActiveTab] = useState('basics')

  const contestData = {
    submissionDeadline: "April 1, 2026",
    finalDay: "May 17, 2026",
    venue: "Amman Arab University",
    tracks: [
      { name: "Electronics Engineering and Nanotechnology", icon: <Cpu size={16} /> },
      { name: "Sustainable Energy, Power Systems, and Smart Grids", icon: <Zap size={16} /> },
      { name: "Biomedical Engineering", icon: <Heart size={16} /> },
      { name: "Control Systems, Robotics, and Mechatronics", icon: <Rocket size={16} /> },
      { name: "Data Science and Artificial Intelligence", icon: <Brain size={16} /> },
      { name: "Cybersecurity", icon: <Shield size={16} /> },
      { name: "Communications, Signal Processing, and Computer Networks", icon: <Globe size={16} /> }
    ]
  }

  const trainingSessions = [
    { date: "Feb 1, 2026", title: "Competition Overview", instructor: "Dr. Yanal Faouri" },
    { date: "Feb 3, 2026", title: "Research Methodology", instructor: "Prof. Omar Al-Qadi" },
    { date: "Feb 8, 2026", title: "Abstract and Keywords Selection", instructor: "Dr. Ahmad Alhosban" },
    { date: "Feb 10, 2026", title: "Scientific Writing", instructor: "Dr. Yanal Faouri" },
  ]

  const mentoringTools = [
    {
      category: "Research Tools",
      icon: <Search size={18} />,
      items: [
        { name: "Google Scholar", description: "Find academic papers and citations", url: "https://scholar.google.com" },
        { name: "IEEE Xplore", description: "Technical literature in electrical engineering", url: "https://ieeexplore.ieee.org" },
        { name: "arXiv.org", description: "Open access to e-prints in physics, math, CS", url: "https://arxiv.org" },
        { name: "ResearchGate", description: "Network with researchers and access papers", url: "https://researchgate.net" },
        { name: "Connected Papers", description: "Visualize academic paper relationships", url: "https://connectedpapers.com" }
      ]
    },
    {
      category: "Writing & Formatting",
      icon: <PenTool size={18} />,
      items: [
        { name: "Overleaf (LaTeX)", description: "Online LaTeX editor with IEEE templates", url: "https://overleaf.com" },
        { name: "Grammarly", description: "Grammar and style checker", url: "https://grammarly.com" },
        { name: "LaTeX IEEE Template", description: "Official IEEE conference template", url: "#" },
        { name: "Zotero", description: "Reference management", url: "https://zotero.org" },
        { name: "Mendeley", description: "Reference manager and PDF organizer", url: "https://mendeley.com" }
      ]
    },
    {
      category: "AI & Productivity",
      icon: <Brain size={18} />,
      items: [
        { name: "ChatGPT", description: "Brainstorming and refining ideas", url: "https://chat.openai.com" },
        { name: "Claude", description: "Research assistant and summarizer", url: "https://claude.ai" },
        { name: "Elicit", description: "AI research assistant for papers", url: "https://elicit.com" },
        { name: "Scite.ai", description: "See how papers have been cited", url: "https://scite.ai" },
        { name: "Consensus", description: "AI search engine for research", url: "https://consensus.app" }
      ]
    },
    {
      category: "Data & Visualization",
      icon: <BarChart size={18} />,
      items: [
        { name: "Python/Colab", description: "Data analysis and prototyping", url: "https://colab.research.google.com" },
        { name: "MATLAB", description: "Technical computing environment", url: "#" },
        { name: "Tableau Public", description: "Data visualization", url: "https://public.tableau.com" },
        { name: "OriginLab", description: "Scientific graphing and analysis", url: "https://originlab.com" },
        { name: "Draw.io", description: "Create diagrams and flowcharts", url: "https://draw.io" }
      ]
    }
  ]

  const researchPhases = [
    {
      phase: "Phase 1: Topic Selection",
      icon: <Target size={20} />,
      tasks: [
        "Choose a track that matches your interest",
        "Read 5-10 recent papers in that area",
        "Identify gaps or unsolved problems",
        "Define your research question",
        "Get feedback from peers and mentors"
      ],
      duration: "Week 1-2"
    },
    {
      phase: "Phase 2: Literature Review",
      icon: <BookOpen size={20} />,
      tasks: [
        "Use Google Scholar & IEEE Xplore",
        "Organize papers with Zotero/Mendeley",
        "Summarize key findings from each paper",
        "Identify methodologies used",
        "Build your references section early"
      ],
      duration: "Week 3-4"
    },
    {
      phase: "Phase 3: Methodology",
      icon: <FileCode size={20} />,
      tasks: [
        "Design your approach/solution",
        "Choose tools and frameworks",
        "Set up your development environment",
        "Create initial prototypes",
        "Document your process"
      ],
      duration: "Week 5-6"
    },
    {
      phase: "Phase 4: Implementation",
      icon: <Rocket size={20} />,
      tasks: [
        "Execute your methodology",
        "Run experiments/simulations",
        "Collect and analyze results",
        "Create visualizations",
        "Validate your findings"
      ],
      duration: "Week 7-8"
    },
    {
      phase: "Phase 5: Paper Writing",
      icon: <FileText size={20} />,
      tasks: [
        "Use IEEE template on Overleaf",
        "Write abstract and introduction",
        "Describe methodology clearly",
        "Present results with visuals",
        "Conclusion and future work"
      ],
      duration: "Week 9-10"
    },
    {
      phase: "Phase 6: Review & Submit",
      icon: <CheckCircle size={20} />,
      tasks: [
        "Peer review with friends",
        "Check against all requirements",
        "Proofread multiple times",
        "Format references properly",
        "Submit before deadline!"
      ],
      duration: "Week 11-12"
    }
  ]

  const proTips = [
    {
      tip: "Start your paper EARLY",
      desc: "Don't wait until after implementation. Write as you go - it's easier to edit than to start from scratch."
    },
    {
      tip: "Use LaTeX, not Word",
      desc: "LaTeX handles formatting, references, and equations beautifully. Overleaf makes it collaborative."
    },
    {
      tip: "Reference management is KEY",
      desc: "Use Zotero or Mendeley from day one. Manually formatting 50+ references is a nightmare."
    },
    {
      tip: "Figures tell the story",
      desc: "A well-designed figure is worth 1000 words. Invest time in clear diagrams and graphs."
    },
    {
      tip: "Get feedback early and often",
      desc: "Show your work to peers and mentors at every stage. Fresh eyes catch what you miss."
    }
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-[#0A0A0A] pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header with Mentor Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 border border-gray-200 dark:border-gray-800 rounded-full">
            <Sparkles className="w-3 h-3 text-red-500" />
            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">MENTOR'S RESEARCH TOOLKIT</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 dark:text-white mb-4">
            IJSPC 2026
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your complete guide to research, writing, and winning the competition
          </p>
        </motion.div>

        {/* Ambassador Badge - Enhanced */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-12 p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-gradient-to-br from-gray-50 to-white dark:from-[#0F0F0F] dark:to-[#0A0A0A]"
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-8 h-8 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-sm font-mono text-gray-500 dark:text-gray-400">YOUR MENTOR & AMBASSADOR</h2>
                <span className="px-2 py-0.5 bg-red-500/10 text-red-500 text-[10px] font-mono rounded-full">ASU REP</span>
              </div>
              <p className="text-2xl text-gray-900 dark:text-white mb-1">Omar Aburub</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Applied Science University • Software Engineering</p>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">202311588@students.asu.edu.jo</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">0782329277</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                I'm here to help however I can. Feel free to reach out if you have questions about the contest, 
                need guidance on your paper, or just want to brainstorm ideas. We're in this together.
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <Link 
                  href="mailto:202311588@students.asu.edu.jo" 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm rounded-full hover:opacity-80 transition-opacity"
                >
                  <Mail size={14} />
                  Email Me
                </Link>
                <Link 
                  href="https://chat.whatsapp.com/FawSunKpyqf80PZzFvg7Ew" 
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#075E54] text-white text-sm rounded-full hover:bg-[#054640] transition-colors"
                >
                  <MessageSquare size={14} />
                  Jordan Level Group
                </Link>
                <Link 
                  href="https://chat.whatsapp.com/LoQy5atSH0F3cvFuvYkpfQ" 
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm rounded-full hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <Users2 size={14} />
                  ASU Branch Group
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Navigation Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {['basics', 'tools', 'phases', 'tips'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-mono rounded-full transition-colors ${
                activeTab === tab
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'
              }`}
            >
              {tab === 'basics' && 'Contest Basics'}
              {tab === 'tools' && 'Research Tools'}
              {tab === 'phases' && 'Research Phases'}
              {tab === 'tips' && 'Pro Tips'}
            </button>
          ))}
        </div>

        {/* Contest Basics Tab */}
        {activeTab === 'basics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            {/* Key Dates */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#0A0A0A]">
                <Calendar className="w-5 h-5 text-red-500 mb-3" />
                <h3 className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-1">SUBMISSION DEADLINE</h3>
                <p className="text-2xl text-gray-900 dark:text-white">{contestData.submissionDeadline}</p>
              </div>
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#0A0A0A]">
                <Clock className="w-5 h-5 text-blue-500 mb-3" />
                <h3 className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-1">FINAL DAY</h3>
                <p className="text-2xl text-gray-900 dark:text-white">{contestData.finalDay}</p>
                <p className="text-sm text-gray-500 mt-1">{contestData.venue}</p>
              </div>
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#0A0A0A]">
                <FileText className="w-5 h-5 text-purple-500 mb-3" />
                <h3 className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-1">SUBMISSION</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Microsoft CMT Service</p>
                <Link href="#" className="inline-flex items-center gap-1 text-xs text-red-500 hover:underline">
                  Submission Link <ExternalLink size={10} />
                </Link>
              </div>
            </div>

            {/* Training Sessions */}
            <div>
              <h2 className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2">
                <Users size={16} />
                TRAINING SESSIONS
              </h2>
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                {trainingSessions.map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-[#0F0F0F] transition-colors">
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white font-medium">{session.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{session.instructor}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{session.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competition Tracks with Icons */}
            <div>
              <h2 className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-4">COMPETITION TRACKS</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {contestData.tracks.map((track, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-800 rounded-lg">
                    <span className="text-gray-500">{track.icon}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{track.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Documents */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <Download size={14} />
                Template Paper
              </Link>
              <Link href="#" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <Download size={14} />
                Authors Instructions
              </Link>
              <Link href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm hover:opacity-80 transition-opacity">
                <FileText size={14} />
                Sample Papers
              </Link>
            </div>
          </motion.div>
        )}

        {/* Research Tools Tab */}
        {activeTab === 'tools' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {mentoringTools.map((section, idx) => (
              <div key={idx} className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-600 dark:text-gray-400">{section.icon}</span>
                  <h3 className="text-sm font-mono text-gray-500 dark:text-gray-400">{section.category}</h3>
                </div>
                <div className="space-y-3">
                  {section.items.map((item, i) => (
                    <Link
                      key={i}
                      href={item.url}
                      target="_blank"
                      className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white group-hover:text-red-500 transition-colors">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                        </div>
                        <ExternalLink size={12} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Quick Note */}
            <div className="md:col-span-2 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900 rounded-lg">
              <p className="text-xs text-blue-600 dark:text-blue-400 text-center">
                All tools are free or have free tiers for students. Need help accessing any? Message me!
              </p>
            </div>
          </motion.div>
        )}

        {/* Research Phases Tab */}
        {activeTab === 'phases' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {researchPhases.map((phase, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 dark:text-gray-400">{phase.icon}</span>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">{phase.phase}</h3>
                  </div>
                  <span className="text-xs font-mono text-gray-500">{phase.duration}</span>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {phase.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Timeline Visual */}
            <div className="mt-8 p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-4">12-WEEK TIMELINE</h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div className="text-xs font-mono text-gray-500">Start</div>
                  <div className="text-xs font-mono text-gray-500">Deadline</div>
                </div>
                <div className="overflow-hidden h-2 flex rounded-full bg-gray-200 dark:bg-gray-800">
                  <div style={{ width: '16.666%' }} className="h-full bg-red-500 rounded-l-full" />
                  <div style={{ width: '16.666%' }} className="h-full bg-orange-500" />
                  <div style={{ width: '16.666%' }} className="h-full bg-yellow-500" />
                  <div style={{ width: '16.666%' }} className="h-full bg-green-500" />
                  <div style={{ width: '16.666%' }} className="h-full bg-blue-500" />
                  <div style={{ width: '16.666%' }} className="h-full bg-purple-500 rounded-r-full" />
                </div>
                <div className="flex mt-2 text-[10px] font-mono text-gray-500">
                  <span className="w-1/6 text-center">W1-2</span>
                  <span className="w-1/6 text-center">W3-4</span>
                  <span className="w-1/6 text-center">W5-6</span>
                  <span className="w-1/6 text-center">W7-8</span>
                  <span className="w-1/6 text-center">W9-10</span>
                  <span className="w-1/6 text-center">W11-12</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Pro Tips Tab */}
        {activeTab === 'tips' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {proTips.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-red-500/30 transition-colors group">
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/20 transition-colors">
                  <span className="text-red-500 text-sm font-bold">{idx + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg text-gray-900 dark:text-white mb-1">{item.tip}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}

            {/* Final Message */}
            <div className="mt-8 p-8 border border-gray-200 dark:border-gray-800 rounded-lg text-center">
              <Sparkles className="w-8 h-8 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl text-gray-900 dark:text-white mb-2">Ready to start?</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                I'm here to help however I can. Reach out if you have questions or need guidance.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="mailto:202311588@students.asu.edu.jo"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm hover:opacity-80 transition-opacity"
                >
                  <Mail size={14} />
                  Email Me
                </Link>
                <Link 
  href="https://chat.whatsapp.com/FawSunKpyqf80PZzFvg7Ew" 
  target="_blank"
  className="inline-flex items-center gap-2 px-4 py-2 bg-[#075E54] text-white text-sm rounded-full hover:bg-[#054640] transition-colors"
>
  <MessageSquare size={14} />
  Jordan Level Group
</Link>
                <Link
                  href="https://chat.whatsapp.com/LoQy5atSH0F3cvFuvYkpfQ"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <Users2 size={14} />
                  ASU Branch Group
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}