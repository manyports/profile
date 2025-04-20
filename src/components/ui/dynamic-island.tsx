"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

type NavigationItem = {
  icon: React.ComponentType<any>
  label: string
  onClick: () => void
  isActive: boolean
}

interface DynamicIslandProps {
  navigationItems: NavigationItem[]
  className?: string
}

export function DynamicIsland({ navigationItems, className = "" }: DynamicIslandProps) {
  return (
    <motion.div 
      className={`fixed bottom-10 left-0 right-0 z-50 flex justify-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="backdrop-blur-xl bg-black/70 border border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-[28px] overflow-hidden"
        initial={{ y: 60, width: "auto" }}
        animate={{ 
          y: 0,
          width: "auto",
          transition: { 
            y: { type: "spring", stiffness: 300, damping: 25 },
            width: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
          }
        }}
        whileHover={{ 
          boxShadow: "0 8px 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08)",
          y: -2,
          transition: { duration: 0.2 }
        }}
      >
        <motion.div 
          className="px-3 py-3 flex items-center gap-1.5 relative"
          layout
        >
          <div className="flex gap-1 mx-1">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.label}
                onClick={item.onClick}
                className={`relative group flex items-center rounded-2xl px-4 py-2.5 transition-colors ${
                  item.isActive ? "text-white" : "text-neutral-400"
                }`}
                initial={{ opacity: 0, x: -5 }}
                animate={{ 
                  opacity: 1,
                  x: 0,
                  transition: { 
                    delay: index * 0.06,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-white/[0.08] dark:bg-white/[0.08] rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                
                <div className="relative z-10 flex items-center gap-2.5">
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: item.isActive ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <item.icon size={20} strokeWidth={1.5} 
                      className={`transition-colors ${item.isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"}`} 
                    />
                  </motion.div>
                  
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ 
                      opacity: item.isActive ? 1 : 0,
                      width: item.isActive ? "auto" : 0
                    }}
                    transition={{ 
                      duration: 0.3,
                      ease: [0.32, 0.72, 0, 1]
                    }}
                    className="text-sm font-medium whitespace-nowrap overflow-hidden"
                  >
                    {getLabelText(item.label)}
                  </motion.span>
                </div>
              </motion.button>
            ))}
          </div>
          
          {/* Subtle gradient shine effect */}
          <motion.div 
            className="absolute inset-0 pointer-events-none opacity-0"
            animate={{ 
              opacity: [0, 0.03, 0],
              backgroundPosition: ["0% 0%", "100% 100%"]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 5,
              ease: "linear"
            }}
            style={{ 
              background: "linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)",
              backgroundSize: "250% 250%"
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function getLabelText(label: string) {
  switch (label) {
    case "Home":
      return "Home"
    case "Software Engineer":
      return "Engineer"
    case "Student @ NIS":
      return "Student"
    case "Projects":
      return "Projects"
    default:
      return label
  }
} 