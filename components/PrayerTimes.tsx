'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Clock, Star } from 'lucide-react'
import SpiderLogo from '@/components/SpiderLogo'

interface PrayerTimesProps {
  className?: string
  style?: React.CSSProperties
}

interface PrayerTimesData {
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
}

export default function PrayerTimes({ className = '', style = {} }: PrayerTimesProps) {
  const [prayers, setPrayers] = useState<PrayerTimesData | null>(null)
  const [nextPrayer, setNextPrayer] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchPrayerTimes()
  }, [])

  const fetchPrayerTimes = async () => {
    try {
      // Try to get user's location, fallback to Amman
      let url = 'https://api.aladhan.com/v1/timingsByCity?city=Amman&country=Jordan&method=2'
      
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
        })
        
        if (position) {
          const { latitude, longitude } = position.coords
          url = `https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}?latitude=${latitude}&longitude=${longitude}&method=2`
        }
      } catch (geoError) {
        // Use fallback, silently continue
      }

      const response = await fetch(url)
      const data = await response.json()
      
      if (data.code === 200) {
        const timings = data.data.timings
        setPrayers({
          Fajr: timings.Fajr,
          Sunrise: timings.Sunrise,
          Dhuhr: timings.Dhuhr,
          Asr: timings.Asr,
          Maghrib: timings.Maghrib,
          Isha: timings.Isha,
        })
        
        // Find next prayer
        const now = new Date()
        const currentTime = now.getHours() * 60 + now.getMinutes()
        
        const prayerList = [
          { name: 'Fajr', time: timings.Fajr },
          { name: 'Sunrise', time: timings.Sunrise },
          { name: 'Dhuhr', time: timings.Dhuhr },
          { name: 'Asr', time: timings.Asr },
          { name: 'Maghrib', time: timings.Maghrib },
          { name: 'Isha', time: timings.Isha },
        ]
        
        for (const prayer of prayerList) {
          const [hours, minutes] = prayer.time.split(':').map(Number)
          const prayerMinutes = hours * 60 + minutes
          if (prayerMinutes > currentTime) {
            setNextPrayer(prayer.name)
            break
          }
        }
      }
    } catch (err) {
      setError('Could not load prayer times')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null
  if (loading) return (
    <div className={className} style={style}>
      <div className="relative">
        <div className="absolute inset-0 bg-black dark:bg-[#161616] rounded-xl translate-x-2 translate-y-2"></div>
        <div className="relative bg-white dark:bg-[#0A0A0A] border-2 border-spider-gray rounded-xl p-4 w-64">
          <div className="font-barrio text-sm text-muted-foreground animate-pulse">LOADING PRAYER TIMES...</div>
        </div>
      </div>
    </div>
  )
  
  if (error || !prayers) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={className}
      style={style}
    >
      <div className="relative">
        {/* Solid shadow - COMIC STYLE */}
        <div className="absolute inset-0 bg-black dark:bg-[#161616] rounded-xl translate-x-2 translate-y-2"></div>
        
        {/* Main bubble */}
        <div className="relative bg-white dark:bg-[#0A0A0A] border-2 border-spider-red dark:border-[#4a4d7a] rounded-xl p-4 w-64 overflow-visible">
          {/* Comic corner accents */}
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-spider-red dark:border-[#4a4d7a]"></div>
          <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-spider-red dark:border-[#4a4d7a]"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-spider-red dark:border-[#4a4d7a]"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-spider-red dark:border-[#4a4d7a]"></div>
          
          {/* Halftone dots background */}
          <div 
            className="absolute inset-0 opacity-5 dark:opacity-10 rounded-xl overflow-hidden pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 2px 2px, 
                  ${nextPrayer ? '#ef4444' : '#3b82f6'} 1.5px, 
                  transparent 1.5px
                )
              `,
              backgroundSize: '12px 12px',
            }}
          />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header - with spinning SpiderLogo */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-spider-red/30 dark:border-spider-blue/30">
              <div className="relative">
                <Moon className="w-4 h-4 text-spider-red dark:text-spider-blue" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                  className="absolute -inset-1 border border-spider-red/30 rounded-full"
                />
              </div>
              {/* THICKER: added font-black and increased size */}
              <span className="font-barrio font-black text-base text-spider-red dark:text-spider-blue tracking-wider">
                RAMADAN PRAYERS
              </span>
              {/* Spinning SpiderLogo instead of lightning */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="ml-auto"
              >
                <SpiderLogo className="w-5 h-5 text-spider-blue dark:text-spider-red" />
              </motion.div>
            </div>
            
            {/* Prayer times grid */}
            <div className="space-y-2">
              {Object.entries(prayers).map(([name, time]) => {
                const isNext = nextPrayer === name
                return (
                  <motion.div 
                    key={name} 
                    className={`flex justify-between items-center text-xs p-1 ${
                      isNext ? 'bg-spider-red/10 dark:bg-spider-blue/10 rounded border border-spider-red/30' : ''
                    }`}
                    animate={isNext ? { 
                      scale: [1, 1.02, 1],
                      borderColor: ['rgba(230,36,41,0.3)', 'rgba(230,36,41,0.8)', 'rgba(230,36,41,0.3)']
                    } : {}}
                    transition={isNext ? { repeat: Infinity, duration: 1.5 } : {}}
                  >
                    <span className={`font-montserrat ${isNext ? 'text-spider-red dark:text-spider-blue font-bold' : 'text-gray-600 dark:text-gray-400'}`}>
                      {name}
                    </span>
                    <span className={`font-mono ${isNext ? 'text-spider-red dark:text-spider-blue font-bold' : 'text-gray-800 dark:text-gray-200'}`}>
                      {time}
                    </span>
                  </motion.div>
                )
              })}
            </div>
            
            {/* Next prayer indicator */}
            {nextPrayer && (
              <div className="relative mt-3 pt-2 border-t-2 border-dashed border-spider-red/30 dark:border-spider-blue/30">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4">
                  <div className="w-0.5 h-2 bg-spider-red/50 rotate-45 absolute left-1/2"></div>
                  <div className="w-0.5 h-2 bg-spider-red/50 -rotate-45 absolute left-1/2"></div>
                </div>
                
                <div className="flex items-center justify-center gap-1 text-[10px]">
                  <Clock className="w-3 h-3 text-spider-red dark:text-spider-blue" />
                  {/* THICKER: added font-black */}
                  <span className="font-barrio font-black text-spider-red dark:text-spider-blue tracking-wider">
                    NEXT: {nextPrayer.toUpperCase()}
                  </span>
                </div>
              </div>
            )}
            
            {/* Ramadan greeting - no changes needed here */}
            <div className="mt-2 text-[8px] text-center text-muted-foreground font-mono tracking-wider">
              RAMADAN MUBARAK • 1447
            </div>
          </div>
          
          {/* Tiny spider decoration */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute -bottom-3 -right-3 text-xs opacity-50"
          >
            🕷️
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}