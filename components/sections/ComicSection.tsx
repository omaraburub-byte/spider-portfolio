'use client'

import { motion } from 'framer-motion'
import { BookOpen, Zap, Target, Award, Users, Star } from 'lucide-react'

const comicPanels = [
  {
    id: 1,
    title: 'ORIGIN STORY',
    description: 'The journey begins with a passion for technology and design. First discovered coding through basic HTML/CSS in high school.',
    year: '2018-2020',
    icon: BookOpen,
    color: 'border-spider-red',
    textColor: 'text-spider-red',
    position: 'left' as const,
  },
  {
    id: 2,
    title: 'THE FIRST WEB',
    description: 'Built first full-stack project - a portfolio website using React and Node.js. Learned the importance of clean code.',
    year: '2021',
    icon: Zap,
    color: 'border-spider-blue',
    textColor: 'text-spider-blue',
    position: 'right' as const,
  },
  {
    id: 3,
    title: 'UX/UI AWAKENING',
    description: 'Discovered UX/UI design principles. Started creating user-centered interfaces with Figma and design systems.',
    year: '2022',
    icon: Target,
    color: 'border-spider-red',
    textColor: 'text-spider-red',
    position: 'left' as const,
  },
  {
    id: 4,
    title: 'HCI RESEARCH',
    description: 'Began human-computer interaction research. Published first paper on AI-driven UI evaluation framework.',
    year: '2023',
    icon: Award,
    color: 'border-spider-blue',
    textColor: 'text-spider-blue',
    position: 'right' as const,
  },
  {
    id: 5,
    title: 'TEAM LEADERSHIP',
    description: 'Founded EnthusiastTech and led multiple projects. Managed teams for hackathons and client projects.',
    year: '2024',
    icon: Users,
    color: 'border-spider-red',
    textColor: 'text-spider-red',
    position: 'left' as const,
  },
  {
    id: 6,
    title: 'PRESENT DAY',
    description: 'Combining AI, UX design, and development to create impactful digital experiences. Always learning, always improving.',
    year: '2025',
    icon: Star,
    color: 'border-spider-blue',
    textColor: 'text-spider-blue',
    position: 'right' as const,
  },
]

// Spider SVG component
const SpiderIcon = () => (
  <svg width="24" height="24" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M590.042 523.125L554.028 511.111H547.542L540.292 547.389C539.292 552.361 537.792 557.917 535.833 563.764L564.014 620.125L530.958 719.278C527.083 730.917 533.361 743.5 545.014 747.389L566.083 754.417C577.722 758.306 590.319 752.014 594.194 740.361L630.153 632.472C633.877 621.29 633.012 609.087 627.75 598.542L590.042 523.125ZM3.73602 270.306L76.9999 380.194C81.0579 386.281 86.5556 391.272 93.0051 394.725C99.4546 398.177 106.657 399.985 113.972 399.986H222.222L126.403 433.819C117.026 436.948 108.958 443.11 103.472 451.333L29.0277 563.014C22.2222 573.222 24.986 587.028 35.1944 593.833L53.6805 606.167C63.8888 612.972 77.6944 610.208 84.4999 600L154.722 494.681L238.75 466.667H288.889L303.292 538.681C306.333 553.917 327.417 622.222 400 622.222C472.583 622.222 493.667 553.917 496.708 538.681L511.111 466.667H561.25L645.264 494.681L715.5 600C722.305 610.208 736.097 612.972 746.319 606.167L764.805 593.833C775.014 587.028 777.778 573.236 770.972 563.014L696.528 451.333C691.042 443.11 682.974 436.948 673.597 433.819L577.778 400H686.028C693.345 399.998 700.549 398.191 707.001 394.739C713.453 391.287 718.953 386.295 723.014 380.208L796.264 270.306C803.069 260.097 800.319 246.292 790.097 239.486L771.611 227.153C761.403 220.347 747.597 223.111 740.792 233.319L674.125 333.319H608.764L693.25 198.139C697.663 191.075 700.002 182.913 700 174.583V66.6667C700 54.3889 690.055 44.4445 677.778 44.4445H655.555C643.278 44.4445 633.333 54.3889 633.333 66.6667V168.208L530.444 332.833C531.847 313.319 533.333 293.792 533.333 274.208C533.333 200.5 476.722 133.333 400 133.333C323.278 133.333 266.667 200.5 266.667 274.208C266.667 293.792 268.167 313.319 269.555 332.833L166.667 168.208V66.6667C166.667 54.3889 156.722 44.4445 144.444 44.4445H122.222C109.944 44.4445 99.9999 54.3889 99.9999 66.6667V174.597C99.9999 182.931 102.347 191.097 106.75 198.153L191.236 333.333H125.875L59.2082 233.333C52.4027 223.125 38.5971 220.361 28.3888 227.167L9.90269 239.5C-0.319536 246.306 -3.06954 260.097 3.73602 270.306ZM235.986 620.125L264.167 563.764C262.208 557.917 260.708 552.361 259.708 547.389L252.458 511.111H245.972L209.958 523.125L172.25 598.542C169.641 603.762 168.086 609.446 167.673 615.268C167.261 621.09 168 626.936 169.847 632.472L205.805 740.361C209.68 752 222.278 758.306 233.917 754.417L254.986 747.389C266.625 743.5 272.917 730.917 269.042 719.278L235.986 620.125Z" fill="#e62429"/>
  </svg>
)

export default function ComicSection() {
  return (
    <section id="journey" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-barrio text-4xl md:text-5xl text-foreground mb-4">
            <span className="text-spider-red">COMIC</span>{' '}
            <span className="text-spider-blue">JOURNEY</span>
          </h2>
          <p className="font-montserrat text-muted-foreground max-w-2xl mx-auto">
            My evolution as a developer and designer.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line with spider at top */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full flex flex-col items-center">
            {/* Spider */}
            <div className="relative z-20 -mt-2">
              <SpiderIcon />
            </div>
            {/* Line */}
            <div className="w-0.5 h-[calc(100%-2rem)] bg-black dark:bg-[#4a4a4a]"></div>
          </div>

          {/* Panels */}
          <div className="space-y-12">
            {comicPanels.map((panel, index) => {
              const isLeft = panel.position === 'left'
              
              return (
                <motion.div
                  key={panel.id}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    isLeft ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content side */}
                  <div className="w-1/2">
                    <div className={`${isLeft ? 'pr-8' : 'pl-8'}`}>
                      {/* Card with solid shadow */}
                      <div className="relative">
                        {/* Solid shadow */}
                        <div className="absolute inset-0 bg-black dark:bg-[#161616] rounded-xl translate-x-2 translate-y-2"></div>
                        
                        {/* Card */}
                        <div 
                          className={`relative bg-white dark:bg-[#0A0A0A] border-2 ${panel.color} dark:border-[#282727] rounded-xl p-6 overflow-visible`}
                        >
                          {/* Subtle halftone dots - keep colored in dark mode */}
                          <div 
                            className="absolute inset-0 opacity-5 dark:opacity-10 rounded-xl overflow-hidden"
                            style={{
                              backgroundImage: `
                                radial-gradient(circle at 2px 2px, 
                                  ${index % 2 === 0 ? '#ef4444' : '#3b82f6'} 1.5px, 
                                  transparent 1.5px
                                )
                              `,
                              backgroundSize: '16px 16px',
                            }}
                          />
                          
                          {/* Content */}
                          <div className="relative z-10">
                            {/* Year tag */}
                            <div className={`inline-block px-3 py-1 bg-white dark:bg-[#161616] border ${panel.color} dark:border-[#282727] font-mono text-xs mb-3 ${panel.textColor}`}>
                              {panel.year}
                            </div>
                            
                            {/* Title */}
                            <h3 className={`font-barrio text-lg mb-2 ${panel.textColor}`}>
                              {panel.title}
                            </h3>
                            
                            {/* Description */}
                            <p className="font-montserrat text-sm text-gray-600 dark:text-[#b0b0b0] leading-relaxed">
                              {panel.description}
                            </p>
                          </div>
                          
                          {/* Icon */}
                          <div className={`absolute -top-4 -right-4 p-2 bg-white dark:bg-[#161616] border-2 ${panel.color} dark:border-[#282727] rounded-full z-20`}>
                            <panel.icon className={`w-4 h-4 ${panel.textColor}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot - adaptive fill */}
                  <div className="relative z-10">
                    <div className={`w-3 h-3 rounded-full bg-white dark:bg-[#2a2a2a] border-2 ${
                      index % 2 === 0 ? 'border-spider-red' : 'border-spider-blue'
                    }`}></div>
                  </div>

                  {/* Empty side */}
                  <div className="w-1/2"></div>
                </motion.div>
              )
            })}
          </div>

          {/* End panel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="relative inline-block">
              {/* Solid shadow */}
              <div className="absolute inset-0 bg-black dark:bg-[#161616] rounded-xl translate-x-2 translate-y-2"></div>
              
              {/* Main panel */}
              <div className="relative bg-white dark:bg-[#0A0A0A] border-2 border-spider-red dark:border-[#282727] rounded-xl px-6 py-3 overflow-hidden">
                {/* Subtle dots */}
                <div 
                  className="absolute inset-0 opacity-5 dark:opacity-10"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 2px 2px, 
                        #ef4444 1.5px, 
                        transparent 1.5px
                      )
                    `,
                    backgroundSize: '16px 16px',
                  }}
                />
                <div className="relative z-10 font-barrio text-lg text-spider-red">TO BE CONTINUED</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}