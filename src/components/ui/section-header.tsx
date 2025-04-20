"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

interface SectionHeaderProps {
  title: string
  icon?: ReactNode
  className?: string
}

export function SectionHeader({ title, icon, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <h2 className="text-xl font-medium">{title}</h2>
      <motion.div 
        className="h-px flex-grow bg-gradient-to-r from-neutral-800 to-transparent"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      {icon && (
        <div className="text-neutral-400">
          {icon}
        </div>
      )}
    </div>
  )
}

export function PageTitle({ 
  children, 
  className = "" 
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.h1
      className={`text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.h1>
  )
} 