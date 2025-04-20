"use client"

import { motion } from "framer-motion"

interface BadgeProps {
  children: React.ReactNode
  className?: string
  index?: number
}

export function Badge({ children, className = "", index = 0 }: BadgeProps) {
  return (
    <motion.span 
      className={`text-xs bg-white/5 hover:bg-white/10 border border-white/5 px-3 py-1 rounded-full text-neutral-300 transition-colors duration-200 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.4, 
        delay: 0.2 + (index * 0.05),
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.span>
  )
}

export function StatusBadge({ 
  color, 
  className = "" 
}: {
  color: "green" | "blue" | "purple" | "orange" | "red"
  className?: string
}) {
  const colors = {
    green: "bg-green-500 ring-green-500/20",
    blue: "bg-blue-500 ring-blue-500/20",
    purple: "bg-purple-500 ring-purple-500/20",
    orange: "bg-orange-500 ring-orange-500/20",
    red: "bg-red-500 ring-red-500/20"
  }
  
  return (
    <div className={`h-2.5 w-2.5 rounded-full ring-4 ${colors[color]} ${className}`}></div>
  )
} 