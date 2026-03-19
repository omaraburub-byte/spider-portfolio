// app/soul/page.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { 
  ArrowRight, 
  Award,
  ExternalLink,
  ChevronDown,
  MessageSquare,
  Mail,
  BookOpen,
  Calendar,
  Grid
} from 'lucide-react'

export default function SoulPage() {
  const [mounted, setMounted] = useState(false)
  const [showIJSPC, setShowIJSPC] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setShowPreloader(false)
    }, 2800)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Glassmorphic Preloader */}
      <AnimatePresence>
        {showPreloader && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, rgba(10,10,10,0.95) 100%)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="relative">
              {/* Animated glass rings */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 0 40px rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)'
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.5, 2], opacity: [0, 0.2, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 0 60px rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)'
                }}
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: [1, 2, 2.5], opacity: [0, 0.15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
              />
              
              {/* Glass core with SVG */}
              <motion.div
                className="relative w-32 h-32 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 0 60px rgba(255,255,255,0.1)'
                }}
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 40px rgba(255,255,255,0.1)',
                    '0 0 80px rgba(255,255,255,0.2)',
                    '0 0 40px rgba(255,255,255,0.1)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Soul symbol */}
                <span className="text-4xl text-white/40">◌</span>
              </motion.div>

            {/* Text - centered below core with more space */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
  className="absolute inset-x-0 mx-auto text-center"
  style={{ top: 'calc(50% + 100px)' }}
>
  <p className="text-white/20 text-sm font-mono whitespace-nowrap uppercase">
    ENTERING THE PORTAL
  </p>
</motion.div>

              {/* Glass progress dots */}
              <div className="absolute left-1/2 -translate-x-1/2 flex gap-3" style={{ top: 'calc(50% + 130px)' }}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                    animate={{ 
                      scale: [1, 1.3, 1], 
                      opacity: [0.3, 0.6, 0.3],
                      boxShadow: [
                        '0 0 10px rgba(255,255,255,0.1)',
                        '0 0 20px rgba(255,255,255,0.2)',
                        '0 0 10px rgba(255,255,255,0.1)'
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative min-h-screen w-full overflow-y-auto bg-[#0A0A0A]">
        {/* Custom Scrollbar Styles */}
        <style jsx global>{`
          ::-webkit-scrollbar {
            width: 6px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border-radius: 10px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(10px);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.3s ease;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.15);
          }
        `}</style>

        {/* Background Image */}
        <div className="fixed inset-0">
          <Image
            src="/bg.png"
            alt=""
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>

        {/* Back to Portal Button - Moved to bottom left to avoid header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="fixed bottom-8 left-8 z-50"
        >
          <Link href="/landing">
            <motion.div
              className="flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all cursor-pointer group"
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Grid size={14} className="text-white/40 group-hover:text-white/60 transition-colors" />
              <span className="text-white/40 group-hover:text-white/60 text-xs font-mono tracking-wider transition-colors">
                PORTAL
              </span>
            </motion.div>
          </Link>
        </motion.div>

        {/* Scrollable Content */}
        <div className="relative z-10 min-h-screen">
          {/* Minimal Header */}
          <header className="absolute top-0 left-0 right-0 z-40 px-8 py-8">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-white/20 text-xs font-mono tracking-[0.3em] uppercase"
              >
                soul world
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex gap-1.5"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full bg-white/20"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </header>

          {/* Main Content Container */}
          <div className="container mx-auto px-6 py-24 md:py-32">
            {/* Welcome Sentence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h1 className="text-white/90 text-xl md:text-2xl font-light tracking-wide">
                Welcome to the Soul World
              </h1>
              <p className="text-white/40 text-sm font-mono mt-2">
                warmth · intention · presence
              </p>
            </motion.div>

            {/* Centered Glass Tab */}
            <div className="flex justify-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl px-12 py-8 shadow-2xl relative">
                  {/* Three dots */}
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-white/30"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>

                  {/* OMAR SVG */}
                  <svg 
                    width="200"
                    height="160"
                    viewBox="0 0 1433 1154"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-32 h-28 md:w-40 md:h-36 lg:w-48 lg:h-40"
                  >
                    <path d="M213.281 365.695C219.531 365.695 225.781 365.891 232.031 366.281C274.219 370.188 308.789 377.609 335.742 388.547C363.086 399.094 384.18 413.742 399.023 432.492C414.258 450.852 425 473.508 431.25 500.461C437.5 527.414 440.625 559.055 440.625 595.383C441.016 640.305 434.375 679.562 420.703 713.156C407.031 746.75 386.328 772.922 358.594 791.672C330.859 810.422 296.484 819.992 255.469 820.383C237.109 820.383 218.164 818.82 198.633 815.695C179.102 812.18 159.766 806.906 140.625 799.875C121.484 792.453 103.516 783.469 86.7188 772.922C69.9219 762.375 54.8828 750.07 41.6016 736.008C28.7109 721.555 18.5547 705.344 11.1328 687.375C3.71094 669.406 0 649.68 0 628.195C0 579.367 9.17969 535.227 27.5391 495.773C45.5078 455.93 70.3125 424.484 101.953 401.438C133.984 378.391 171.094 366.477 213.281 365.695ZM257.227 392.648C243.945 392.648 231.641 394.016 220.312 396.75C208.984 399.484 199.023 403.977 190.43 410.227C173.633 411.398 155.273 417.844 135.352 429.562C115.82 441.281 97.4609 459.641 80.2734 484.641C63.4766 509.641 51.1719 542.453 43.3594 583.078C40.625 604.172 41.9922 624.289 47.4609 643.43V644.016C56.0547 669.016 69.1406 690.305 86.7188 707.883C104.297 725.461 124.023 739.133 145.898 748.898C168.164 758.664 191.016 764.914 214.453 767.648C250.391 771.555 282.617 767.453 311.133 755.344C324.805 749.094 336.523 741.086 346.289 731.32C356.445 721.164 363.672 709.25 367.969 695.578C383.203 681.125 394.922 663.547 403.125 642.844C411.719 622.141 417.188 600.266 419.531 577.219C422.266 553.781 421.875 531.516 418.359 510.422C415.234 488.937 409.375 470.773 400.781 455.93C394.922 445.773 386.719 436.789 376.172 428.977C365.625 421.164 353.711 414.719 340.43 409.641C313.477 398.313 285.742 392.648 257.227 392.648ZM258.398 397.922C276.367 397.922 294.531 400.461 312.891 405.539C331.641 410.227 348.438 417.063 363.281 426.047C378.516 435.031 389.844 445.773 397.266 458.273C405.469 472.336 411.133 489.914 414.258 511.008C417.383 531.711 417.773 553.586 415.43 576.633C413.086 599.289 407.617 620.969 399.023 641.672C390.82 661.984 379.297 678.977 364.453 692.648L365.039 691.477C385.352 644.211 393.359 598.312 389.062 553.781C385.938 527.219 379.688 506.32 370.312 491.086C361.328 475.461 350.977 462.766 339.258 453C318.164 436.984 296.484 426.438 274.219 421.359C252.344 416.281 230.664 413.937 209.18 414.328C205.664 414.328 202.344 414.523 199.219 414.914C198.047 414.914 196.68 414.914 195.117 414.914H193.359C201.172 409.055 210.547 404.758 221.484 402.023C232.812 398.898 245.117 397.531 258.398 397.922ZM193.359 414.914L192.188 416.086C171.875 430.539 154.883 447.336 141.211 466.477C127.93 485.227 118.359 505.93 112.5 528.586C108.984 546.945 107.227 563.156 107.227 577.219C107.617 590.891 109.18 602.805 111.914 612.961C115.039 623.117 118.945 632.102 123.633 639.914C128.711 647.727 134.18 654.758 140.039 661.008C156.445 678.977 175 692.844 195.703 702.609C216.797 711.984 238.086 717.648 259.57 719.602C281.055 721.945 300.977 720.578 319.336 715.5C337.695 710.422 352.344 703 363.281 693.234L364.453 692.648C357.812 714.133 344.727 730.93 325.195 743.039C305.664 754.758 282.617 761.594 256.055 763.547C229.492 765.5 202.539 762.375 175.195 754.172C148.242 745.969 123.828 732.688 101.953 714.328C80.0781 695.578 63.8672 671.555 53.3203 642.258C47.8516 623.508 46.6797 604.172 49.8047 584.25C57.2266 543.625 69.3359 511.203 86.1328 486.984C102.93 462.375 121.094 444.406 140.625 433.078C160.156 421.75 177.734 415.695 193.359 414.914ZM210.352 419.602C231.445 419.211 252.539 421.555 273.633 426.633C295.117 431.32 316.211 441.281 336.914 456.516C344.336 462.766 351.367 469.992 358.008 478.195C364.648 486.398 370.312 496.359 375 508.078C379.688 519.797 383.008 534.445 384.961 552.023C388.867 596.555 380.469 642.648 359.766 690.305C349.609 698.898 335.742 705.344 318.164 709.641C300.586 713.938 281.445 715.109 260.742 713.156C240.039 711.203 219.531 705.93 199.219 697.336C178.906 688.352 160.742 675.07 144.727 657.492C137.305 649.289 130.664 639.914 124.805 629.367C119.336 618.82 115.625 605.539 113.672 589.523C112.109 573.508 113.672 553.586 118.359 529.758C129.297 485.617 154.492 448.898 193.945 419.602C199.414 419.602 204.883 419.602 210.352 419.602ZM253.125 444.211C230.859 444.211 210.547 449.68 192.188 460.617C173.828 471.555 159.18 486.203 148.242 504.562C137.305 522.922 131.836 543.234 131.836 565.5C131.836 587.766 137.305 608.078 148.242 626.438C159.18 644.406 173.828 658.859 192.188 669.797C210.547 680.734 230.859 686.203 253.125 686.203C275.391 686.203 295.703 680.734 314.062 669.797C332.422 658.859 347.07 644.406 358.008 626.438C368.945 608.078 374.414 587.766 374.414 565.5C374.414 543.234 368.945 522.922 358.008 504.562C347.07 486.203 332.422 471.555 314.062 460.617C295.703 449.68 275.391 444.211 253.125 444.211ZM253.125 448.898C274.219 448.898 293.555 454.172 311.133 464.719C328.711 475.266 342.773 489.328 353.32 506.906C363.867 524.484 369.141 544.016 369.141 565.5C369.141 586.594 363.867 605.93 353.32 623.508C342.773 641.086 328.711 655.148 311.133 665.695C293.555 676.242 274.219 681.516 253.125 681.516C231.641 681.516 212.109 676.242 194.531 665.695C176.953 655.148 162.891 641.086 152.344 623.508C142.188 605.93 137.109 586.594 137.109 565.5C137.109 544.016 142.188 524.484 152.344 506.906C162.891 489.328 176.953 475.266 194.531 464.719C212.109 454.172 231.641 448.898 253.125 448.898Z" fill="white" fillOpacity="0.9"/>
                    <path d="M755.289 325.078C755.934 325.078 756.578 325.078 757.223 325.078L759.156 325.4H759.479L782.682 326.045C790.416 326.475 795.787 328.301 798.795 331.523C801.803 334.531 803.736 338.076 804.596 342.158C820.709 414.131 831.451 482.988 836.822 548.73C842.193 614.473 845.738 678.174 847.457 739.834C848.316 759.385 849.068 778.721 849.713 797.842C849.928 802.783 848.746 807.295 846.168 811.377C843.805 815.244 841.119 817.178 838.111 817.178C819.42 817.607 800.299 816.533 780.748 813.955C774.947 812.236 772.369 807.725 773.014 800.42L769.146 414.346C761.197 439.912 753.893 466.23 747.232 493.301C740.357 521.445 732.73 548.838 724.352 575.479C716.188 601.904 705.875 626.074 693.414 647.988C687.828 657.012 680.523 662.061 671.5 663.135C662.691 664.209 654.205 660.234 646.041 651.211C629.068 625 615.855 598.682 606.402 572.256C596.949 545.83 588.893 519.512 582.232 493.301C575.357 467.09 567.301 440.986 558.062 414.99C562.145 534.658 563.863 659.16 563.219 788.496C563.219 788.926 563.219 789.355 563.219 789.785C563.004 791.719 562.359 793.76 561.285 795.908C560.426 798.057 558.277 800.312 554.84 802.676C554.625 802.676 554.518 802.783 554.518 802.998C554.518 802.998 554.41 802.998 554.195 802.998C552.047 804.287 549.791 805.039 547.428 805.254C531.744 805.684 516.598 804.932 501.988 802.998C497.477 802.568 493.824 801.816 491.031 800.742C486.09 798.379 483.512 793.867 483.297 787.207C484.586 759.492 485.768 731.67 486.842 703.74C488.775 651.748 491.461 599.434 494.898 546.797C498.336 493.945 504.029 440.127 511.979 385.342C512.408 381.904 512.945 378.359 513.59 374.707C513.805 374.707 513.912 374.707 513.912 374.707C513.912 374.492 513.912 374.385 513.912 374.385C516.061 362.354 520.25 351.504 526.48 341.836C532.926 331.953 542.057 326.689 553.873 326.045C559.889 325.615 565.904 325.83 571.92 326.689C578.15 327.334 583.199 327.979 587.066 328.623C588.355 328.838 589.43 329.053 590.289 329.268C590.504 329.268 590.611 329.268 590.611 329.268C598.561 331.631 603.932 335.391 606.725 340.547C609.732 345.918 611.881 351.182 613.17 356.338C613.6 357.627 614.029 358.916 614.459 360.205C616.393 366.436 620.045 379.004 625.416 397.91C630.787 416.602 636.588 437.012 642.818 459.141C649.264 481.27 654.85 500.498 659.576 516.826C664.303 532.939 666.881 541.748 667.311 543.252C668.6 544.111 672.574 535.41 679.234 517.148C685.895 498.887 693.521 476.758 702.115 450.762C710.924 424.551 718.98 400.166 726.285 377.607C733.59 354.834 738.424 339.365 740.787 331.201C741.861 327.549 746.695 325.508 755.289 325.078ZM1004.08 317.344C1005.58 317.344 1007.09 317.451 1008.59 317.666C1033.3 321.318 1054.24 328.193 1071.43 338.291C1080.03 343.018 1087.65 348.711 1094.31 355.371C1101.19 361.816 1106.24 370.303 1109.46 380.83C1109.89 382.764 1110.21 384.697 1110.43 386.631C1115.15 433.467 1117.52 475.684 1117.52 513.281C1117.52 550.664 1116.76 586.543 1115.26 620.918C1112.47 669.258 1112.04 722.217 1113.97 779.795C1114.19 788.604 1111.39 795.371 1105.59 800.098C1099.79 804.824 1092.38 807.402 1083.36 807.832C1074.12 808.262 1066.28 806.436 1059.83 802.354C1053.6 798.057 1050.16 791.504 1049.52 782.695C1049.52 750.898 1049.95 721.035 1050.81 693.105C1050.59 693.105 1050.48 693.105 1050.48 693.105C1050.7 689.668 1050.48 687.09 1049.84 685.371C1049.41 683.652 1048.77 682.471 1047.91 681.826C1047.05 681.182 1046.08 680.645 1045.01 680.215C1044.58 680 1044.04 679.785 1043.39 679.57C1032.44 675.918 1019.65 674.092 1005.04 674.092C990.436 674.092 976.363 674.844 962.828 676.348C960.035 676.777 958.639 678.818 958.639 682.471C959.713 717.49 961.002 753.154 962.506 789.463C962.506 798.486 959.605 805.361 953.805 810.088C948.004 814.6 940.592 817.07 931.568 817.5C922.33 817.93 914.596 816.104 908.365 812.021C902.135 807.725 898.697 801.064 898.053 792.041C891.822 650.889 890.533 517.9 894.186 393.076C894.4 388.564 895.475 384.268 897.408 380.186C901.275 371.592 906.217 363.213 912.232 355.049C918.463 346.885 926.197 339.795 935.436 333.779C954.127 322.178 977.008 316.699 1004.08 317.344ZM1001.5 381.797C989.898 382.012 981.52 383.193 976.363 385.342C976.148 385.342 975.934 385.449 975.719 385.664C971.422 387.598 967.555 390.283 964.117 393.721C960.895 397.158 958.961 402.744 958.316 410.479C956.598 473.428 956.168 538.203 957.027 604.805C957.457 611.68 960.25 615.439 965.406 616.084C986.246 617.373 1007.09 616.299 1027.93 612.861C1044.04 609.424 1052.63 597.93 1053.71 578.379C1055.21 526.172 1052.96 466.768 1046.94 400.166C1046.72 398.447 1045.97 396.514 1044.68 394.365C1043.39 392.217 1041.68 390.605 1039.53 389.531C1030.29 384.805 1017.61 382.227 1001.5 381.797ZM1234.18 330.557C1249.64 330.557 1264.9 330.986 1279.94 331.846C1293.69 332.275 1307.44 333.672 1321.19 336.035C1322.91 336.25 1324.73 336.572 1326.67 337.002C1326.67 337.002 1326.77 337.002 1326.99 337.002C1338.8 339.365 1349.76 342.803 1359.86 347.314C1374.04 354.404 1384.24 363.857 1390.47 375.674C1396.71 387.275 1400.14 400.596 1400.79 415.635C1403.79 455.166 1404.55 495.879 1403.04 537.773C1403.04 539.277 1403.04 540.889 1403.04 542.607C1402.83 545.186 1402.72 547.764 1402.72 550.342C1402.72 558.506 1401.97 566.133 1400.46 573.223C1397.67 583.965 1393.38 592.451 1387.57 598.682C1381.77 604.912 1375.44 610.391 1368.56 615.117C1366.41 616.621 1364.26 618.232 1362.12 619.951C1387.25 628.115 1402.4 637.461 1407.55 647.988C1412.93 658.301 1414.97 669.258 1413.68 680.859C1413.68 684.082 1413.68 687.197 1413.68 690.205L1414.64 824.912C1414.64 831.572 1413.03 836.084 1409.81 838.447C1406.8 840.811 1403.04 842.1 1398.53 842.314C1377.26 845.107 1355.88 844.785 1334.4 841.348C1331.39 841.133 1328.81 840.059 1326.67 838.125C1324.73 836.406 1324.09 832.861 1324.73 827.49C1328.17 782.373 1330.43 741.445 1331.5 704.707C1331.5 702.773 1331.61 700.84 1331.82 698.906C1331.82 698.691 1331.82 698.369 1331.82 697.939C1332.25 691.279 1331.82 685.479 1330.53 680.537C1327.96 671.729 1320.11 665.176 1307.01 660.879C1290.89 656.797 1274.78 656.367 1258.67 659.59C1258.45 695.898 1260.39 740.049 1264.47 792.041C1264.68 794.189 1264.9 796.445 1265.11 798.809C1265.33 802.246 1265.01 805.469 1264.15 808.477C1262.64 814.707 1256.63 817.393 1246.1 816.533C1230.63 816.104 1214.09 815.029 1196.47 813.311C1190.67 812.451 1186.7 810.732 1184.55 808.154C1182.61 805.576 1181.54 802.568 1181.32 799.131L1182.61 352.793C1182.61 346.992 1183.9 342.266 1186.48 338.613C1189.27 334.746 1194.11 332.49 1200.98 331.846C1212.15 330.986 1223.22 330.557 1234.18 330.557ZM1296.05 387.275C1285.31 387.705 1275.32 389.531 1266.08 392.754C1261.35 394.473 1257.92 396.514 1255.77 398.877C1253.62 401.24 1252.01 403.711 1250.93 406.289C1246.85 416.172 1243.84 427.773 1241.91 441.094C1241.05 446.25 1240.73 451.729 1240.94 457.529L1240.62 584.502L1293.47 587.402C1300.56 588.047 1306.47 586.865 1311.2 583.857C1314.85 581.494 1318.18 576.768 1321.19 569.678C1329.35 543.037 1334.72 515.645 1337.3 487.5C1339.88 459.355 1336.98 430.889 1328.6 402.1C1325.59 396.514 1321.19 392.646 1315.39 390.498C1309.59 388.135 1303.14 387.061 1296.05 387.275Z" fill="white" fillOpacity="0.9"/>
                  </svg>
                </div>
              </motion.div>
            </div>

            {/* IJSPC Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-md mx-auto"
            >
              <motion.button
                onClick={() => setShowIJSPC(!showIJSPC)}
                className="w-full backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all focus:outline-none focus:ring-0 active:bg-white/5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award size={16} className="text-white/60" />
                    <span className="text-white/80 text-sm">IJSPC 2026 Resources</span>
                  </div>
                  <motion.div
                    animate={{ rotate: showIJSPC ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={14} className="text-white/40" />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {showIJSPC && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl mt-2 p-4">
                      {/* Quick Links */}
                      <div className="space-y-2 mb-4">
                        <Link
                          href="/ijspc-2026"
                          className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <span className="text-white/80 text-sm">Full Mentoring Guide</span>
                          <ArrowRight size={14} className="text-white/40" />
                        </Link>
                        <Link
                          href="https://cmt3.research.microsoft.com/User/Login?ReturnUrl=%2FIJSPC2026%2FTrack%2F1%2FSubmission%2FCreate"
                          target="_blank"
                          className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <span className="text-white/80 text-sm">Submission Portal</span>
                          <ExternalLink size={14} className="text-white/40" />
                        </Link>
                        <Link
                          href="https://docs.google.com/document/d/142c0sbY5ahJmB7Epse74vszZG7TJ9bB8/edit"
                          target="_blank"
                          className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <span className="text-white/80 text-sm">Paper Template</span>
                          <BookOpen size={14} className="text-white/40" />
                        </Link>
                      </div>

                      {/* Deadline */}
                      <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                        <Calendar size={14} className="text-white/40" />
                        <span className="text-white/60 text-xs">Deadline: April 1, 2026</span>
                      </div>

                      {/* Ambassador Contact */}
                      <div className="mt-4 pt-3 border-t border-white/10">
                        <p className="text-white/40 text-xs mb-2 text-center">ASU Ambassador</p>
                        <div className="flex items-center justify-center gap-3">
                          <Link 
                            href="mailto:202311588@students.asu.edu.jo"
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
                          >
                            <Mail size={14} className="text-white/60" />
                          </Link>
                          <Link 
                            href="https://chat.whatsapp.com/FawSunKpyqf80PZzFvg7Ew"
                            target="_blank"
                            className="w-8 h-8 rounded-full bg-[#075E54]/20 hover:bg-[#075E54]/30 transition-colors flex items-center justify-center"
                          >
                            <MessageSquare size={14} className="text-white/60" />
                          </Link>
                          <Link 
                            href="https://chat.whatsapp.com/LoQy5atSH0F3cvFuvYkpfQ"
                            target="_blank"
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
                          >
                            <span className="text-white/60 text-xs">ASU</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Footer Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center text-white/10 text-[8px] font-mono tracking-[0.3em] mt-16"
            >
              ·  choose with intention  ·
            </motion.p>
          </div>
        </div>
      </div>
    </>
  )
}