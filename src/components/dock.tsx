"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform, MotionValue, AnimatePresence } from "framer-motion"
import { Home, Briefcase, User, Mail, Image, LucideIcon } from "lucide-react"
import { Page } from "@/types"

interface DockItemConfig {
  id: Page
  label: string
  icon: LucideIcon
}

const dockItems: DockItemConfig[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "work", label: "Work", icon: Briefcase },
  { id: "about", label: "About", icon: User },
  { id: "photos", label: "Photos", icon: Image },
  { id: "contact", label: "Contact", icon: Mail },
]

function DockIcon({ 
  item, 
  isActive, 
  mouseX,
  isMobile,
  onClick,
  onHover,
}: { 
  item: DockItemConfig
  isActive: boolean
  mouseX: MotionValue<number>
  isMobile: boolean
  onClick: () => void
  onHover: (label: string | null) => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const Icon = item.icon
  
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const baseSize = isMobile ? 48 : 56
  const maxSize = isMobile ? 64 : 80
  const range = isMobile ? 100 : 150

  const widthSync = useTransform(distance, [-range, 0, range], [baseSize, maxSize, baseSize])
  const width = useSpring(widthSync, { 
    mass: 0.1, 
    stiffness: isMobile ? 200 : 150, 
    damping: isMobile ? 15 : 12 
  })
  
  const iconSizeSync = useTransform(width, [baseSize, maxSize], [isMobile ? 18 : 22, isMobile ? 24 : 30])
  const iconSize = useSpring(iconSizeSync, { mass: 0.1, stiffness: 200, damping: 15 })

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => !isMobile && onHover(item.label)}
      onMouseLeave={() => !isMobile && onHover(null)}
      style={{ width, height: width }}
      className={`relative flex items-center justify-center rounded-2xl cursor-pointer transition-colors duration-200 ${
        isActive 
          ? "bg-[#1a1a1a]" 
          : "bg-white border border-[#e5e5e5] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      }`}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className={`absolute inset-[3px] rounded-xl flex items-center justify-center ${
        isActive ? "bg-[#333]" : ""
      }`}>
        <motion.div
          className={`transition-colors duration-200 ${
            isActive ? "text-white" : "text-[#666]"
          }`}
          style={{ width: iconSize, height: iconSize }}
        >
          <Icon className="w-full h-full" strokeWidth={1.5} />
        </motion.div>
      </div>
    </motion.button>
  )
}

interface DockProps {
  activePage: Page
  setActivePage: (page: Page) => void
}

export function Dock({ activePage, setActivePage }: DockProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(Infinity)
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null)
  const [touchActive, setTouchActive] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchActive(true)
    const touch = e.touches[0]
    mouseX.set(touch.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    mouseX.set(touch.clientX)
    
    if (containerRef.current) {
      const icons = containerRef.current.querySelectorAll('button')
      icons.forEach((icon, index) => {
        const rect = icon.getBoundingClientRect()
        if (touch.clientX >= rect.left && touch.clientX <= rect.right) {
          setHoveredLabel(dockItems[index].label)
        }
      })
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTimeout(() => {
      mouseX.set(Infinity)
      setTouchActive(false)
      setHoveredLabel(null)
    }, 100)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMobile) {
      mouseX.set(e.pageX)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      mouseX.set(Infinity)
      setHoveredLabel(null)
    }
  }

  return (
    <motion.nav
      className="fixed bottom-6 left-0 right-0 z-50 flex flex-col items-center px-4"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence>
        {hoveredLabel && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="mb-3 px-3 py-1.5 bg-black text-white text-xs rounded-lg"
          >
            {hoveredLabel}
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`flex items-end bg-white/80 backdrop-blur-xl border border-[#e5e5e5] shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-2xl ${
          isMobile ? "gap-1 px-2 py-2" : "gap-2 px-3 py-2.5"
        } ${touchActive ? "scale-[1.02]" : ""} transition-transform duration-200`}
      >
        {dockItems.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            isActive={activePage === item.id}
            mouseX={mouseX}
            isMobile={isMobile}
            onClick={() => setActivePage(item.id)}
            onHover={setHoveredLabel}
          />
        ))}
      </div>

      {isMobile && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-3 text-xs text-[#bbb]"
        >
          drag across to explore
        </motion.p>
      )}
    </motion.nav>
  )
}
