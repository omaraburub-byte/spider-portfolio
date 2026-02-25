// PrayerTimes.tsx - Fixed location (Riyadh, KSA) - NO PERMISSION ASKED
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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
      // FIXED LOCATION: Riyadh, Saudi Arabia - NO GEOLOCATION PERMISSION NEEDED
      const url = 'https://api.aladhan.com/v1/timingsByCity?city=Riyadh&country=Saudi%20Arabia&method=4'
      
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
  
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className={className}
        style={style}
      >
        <div className="bg-white dark:bg-[#1A1B1E] border border-[#e62429]/20 dark:border-white/5 rounded-2xl p-4 w-64 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between mb-3">
            <div className="h-4 w-24 bg-gradient-to-r from-[#e62429]/20 to-[#1a73e8]/20 rounded animate-pulse" />
            <div className="h-4 w-4 bg-gradient-to-r from-[#e62429]/20 to-[#1a73e8]/20 rounded-full animate-pulse" />
          </div>
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-3 w-12 bg-gradient-to-r from-[#e62429]/20 to-[#1a73e8]/20 rounded animate-pulse" />
                <div className="h-3 w-10 bg-gradient-to-r from-[#e62429]/20 to-[#1a73e8]/20 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }
  
  if (error || !prayers) return null

  const prayerNames = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
      style={style}
    >
      <div className="relative group">
        {/* Subtle glow effect on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#e62429] to-[#1a73e8] rounded-2xl opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 blur transition duration-500" />
        
        {/* Main card */}
        <div className="relative bg-white dark:bg-[#1A1B1E] border border-[#e62429]/20 dark:border-white/5 rounded-2xl p-5 w-64 shadow-sm dark:shadow-none backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#e62429]/20 dark:border-white/5">
            <div>
              <h3 className="font-montserrat text-xs text-[#1a73e8] dark:text-white/40 tracking-[0.2em]">RAMADAN</h3>
              <p className="font-montserrat text-xs text-[#1a73e8]/60 dark:text-white/20">1447 AH</p>
            </div>
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#e62429] to-[#1a73e8] flex items-center justify-center">
              <span className="text-white text-xs">✦</span>
            </div>
          </div>

          {/* Location indicator - NO PERMISSION NEEDED, just displaying the fixed location */}
          <div className="mb-3 pb-2 border-b border-[#e62429]/10 dark:border-white/5">
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-[#1a73e8]/60 dark:text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-[10px] font-mono text-[#1a73e8]/60 dark:text-white/40">
                Riyadh, KSA
              </span>
            </div>
          </div>

          {/* Prayer times */}
          <div className="space-y-2.5">
            {prayerNames.map((name) => {
              const isNext = nextPrayer === name
              const time = prayers[name as keyof PrayerTimesData]
              
              return (
                <div
                  key={name}
                  className={`flex justify-between items-center ${
                    isNext 
                      ? 'text-[#1a73e8] dark:text-white' 
                      : 'text-[#1a73e8]/60 dark:text-white/40'
                  }`}
                >
                  <span className={`font-montserrat text-xs ${isNext ? 'font-medium' : ''}`}>
                    {name}
                  </span>
                  <span className={`font-mono text-xs ${isNext ? 'text-[#e62429]' : ''}`}>
                    {time}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Next prayer indicator */}
          {nextPrayer && (
            <div className="mt-4 pt-3 border-t border-[#e62429]/20 dark:border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-montserrat text-[#1a73e8]/40 dark:text-white/20 tracking-wider">
                  NEXT PRAYER
                </span>
                <span className="text-xs font-mono text-[#e62429]">
                  {nextPrayer}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}