'use client'

import { useState, useEffect, useRef } from 'react'
import { RefreshCw, Smartphone, Tablet, Monitor, Maximize2, Tv, MessageSquare } from 'lucide-react'

type ViewMode = 'mobile' | 'tablet' | 'desktop'

export default function SpideyScreenSection() {
  const [viewMode, setViewMode] = useState<ViewMode>('desktop')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const viewportSizes: Record<ViewMode, { width: string; height: string; label: string }> = {
    mobile: { width: '375px', height: '667px', label: 'Phone' },
    tablet: { width: '640px', height: '853px', label: 'Tablet' },
    desktop: { width: '100%', height: '600px', label: 'Desktop' }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
    setTimeout(() => setIsRefreshing(false), 800)
  }

  const openFullscreen = () => {
    if (iframeRef.current?.requestFullscreen) {
      iframeRef.current.requestFullscreen()
    }
  }

  const viewModeButtons: Array<{ icon: any; mode: ViewMode; label: string }> = [
    { icon: Smartphone, mode: 'mobile', label: 'Phone' },
    { icon: Tablet, mode: 'tablet', label: 'Tablet' },
    { icon: Monitor, mode: 'desktop', label: 'Desktop' }
  ]

  useEffect(() => {
    setHasLoaded(true)
  }, [])

  return (
    <section id="spidey-screen" className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header with comic speech bubble */}
        <div className="mb-12 text-center relative">
          <div className="flex items-center justify-center gap-3 mb-6">
            {/* Tv icon with solid shadows like the text */}
            {/* <div className="relative">
              <Tv className="w-12 h-12 text-foreground relative z-10" />
              <Tv className="w-12 h-12 text-[#E62429] absolute top-0 left-0 translate-x-[1px] translate-y-[1px]" />
              <Tv className="w-12 h-12 text-[#1A73E8] absolute top-0 left-0 -translate-x-[1px] -translate-y-[1px]" />
            </div> */}
            <h2 className="font-barrio text-4xl text-foreground [text-shadow:1px_1px_0_#E62429,-1px_-1px_0_#1A73E8] dark:[text-shadow:1px_1px_0_#E62429,-1px_-1px_0_#1A73E8]">
              SPIDEY-SCREEN
            </h2>
          </div>
                <p className="text-muted-foreground font-mono max-w-2xl mx-auto text-md">
            <span className="text-[#E62429]">A meta showcase:</span> this portfolio viewing itself. Interactive preview with device simulation. this is called <span className=" font-mono text-[#E62429]">recursive rendering</span>
          </p>
          {/* Comic speech bubble - minimal but stylish */}
          <div className="mt-6 relative inline-block">
            <div className="relative bg-white dark:bg-gray-900 border-2 border-black dark:border-white rounded-lg px-4 py-3 shadow-[2px_2px_0_0_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#E62429]" />
                <span className="font-comic text-sm text-black dark:text-white">
                  Sharing my knowledge with you !
                </span>
              </div>
              {/* Speech bubble tail */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black dark:border-t-white"></div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-8 p-4 bg-card rounded-xl border-2 border-[#4B5563] dark:border-[#4B5563]">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Device Toggles */}
            <div className="flex items-center gap-2">
              {viewModeButtons.map(({ icon: Icon, mode, label }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`flex items-center gap-2 px-4 py-2 font-barrio border rounded-lg transition-all ${
                    viewMode === mode
                      ? 'bg-[#E62429] border-[#E62429] text-white dark:bg-[#E62429] dark:border-[#E62429]'
                      : 'border-[#4B5563] text-foreground hover:border-[#1A73E8] dark:text-foreground dark:border-[#4B5563] dark:hover:border-[#1A73E8]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-4 py-2 font-barrio border border-[#1A73E8] text-[#1A73E8] rounded-lg text-sm hover:bg-[#1A73E8] hover:text-white disabled:opacity-50 transition-colors flex items-center gap-2 dark:border-[#1A73E8] dark:text-[#1A73E8] dark:hover:bg-[#1A73E8] dark:hover:text-white"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                REFRESH
              </button>

              <button
                onClick={openFullscreen}
                className="px-4 py-2 font-barrio border border-[#E62429] text-[#E62429] rounded-lg text-sm hover:bg-[#E62429] hover:text-white transition-colors flex items-center gap-2 dark:border-[#E62429] dark:text-[#E62429] dark:hover:bg-[#E62429] dark:hover:text-white"
              >
                <Maximize2 className="w-4 h-4" />
                FULL
              </button>
            </div>
          </div>
        </div>

        {/* Main Preview Area */}
        <div className="relative">
          {/* Monitor Frame */}
          <div className="border-2 border-[#E62429] rounded-lg overflow-hidden bg-card dark:border-[#E62429]">
            {/* Top Bar */}
            <div className="p-3 bg-gradient-to-r from-card to-muted border-b border-[#4B5563]/30 flex items-center justify-between dark:from-card dark:to-muted/50">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <div className="font-mono text-xs text-muted-foreground truncate dark:text-muted-foreground">
                  {hasLoaded ? window.location.origin : 'Loading...'}
                </div>
              </div>
              <div className="text-xs font-barrio bg-[#E62429] text-white px-2 py-1 rounded dark:bg-[#E62429]">
                LIVE PREVIEW
              </div>
            </div>

            {/* Iframe Container */}
            <div className="relative p-4">
              {hasLoaded ? (
                <div className={`${viewMode !== 'desktop' ? 'flex justify-center' : ''}`}>
                  <iframe
                    ref={iframeRef}
                    src={typeof window !== 'undefined' ? window.location.origin : ''}
                    className={`
                      transition-all duration-300
                      ${viewMode === 'mobile' ? 'border-[16px] border-black rounded-[32px] shadow-xl' : ''}
                      ${viewMode === 'tablet' ? 'border-[20px] border-black rounded-[40px] shadow-2xl' : ''}
                      ${viewMode === 'desktop' ? 'rounded-lg' : ''}
                    `}
                    style={{
                      width: viewportSizes[viewMode].width,
                      height: viewportSizes[viewMode].height,
                      maxWidth: '100%',
                      border: viewMode === 'desktop' ? '1px solid var(--border)' : 'none',
                    }}
                    title="Portfolio Preview"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    loading="lazy"
                    onLoad={() => setIsRefreshing(false)}
                  />
                </div>
              ) : (
                <div 
                  className="flex items-center justify-center" 
                  style={{ 
                    width: viewportSizes[viewMode].width,
                    height: viewportSizes[viewMode].height,
                    maxWidth: '100%',
                    margin: '0 auto'
                  }}
                >
                  <div className="animate-pulse text-muted-foreground">Loading preview...</div>
                </div>
              )}
            </div>

            {/* Bottom Stats */}
            <div className="p-3 border-t border-[#4B5563]/30 bg-gradient-to-r from-muted/50 to-card dark:from-muted/50 dark:to-card/50">
              <div className="flex justify-center gap-6">
                <div className="text-center">
                  <div className="font-barrio text-[#E62429] text-sm">RECURSIVE</div>
                  <div className="text-xs text-muted-foreground">Meta View</div>
                </div>
                <div className="text-center">
                  <div className="font-barrio text-[#1A73E8] text-sm">PERFORMANCE</div>
                  <div className="text-xs text-muted-foreground">100/100</div>
                </div>
                <div className="text-center">
                  <div className="font-barrio text-sm">RESPONSIVE</div>
                  <div className="text-xs text-muted-foreground">All Devices</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Hint */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground dark:text-muted-foreground">
            <span className="font-barrio text-[#E62429]">TIP:</span> Try switching device views to see responsive design in action
          </p>
        </div>
      </div>
    </section>
  )
}