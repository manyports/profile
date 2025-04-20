"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "icon"
  icon?: ReactNode
  className?: string
}

export function Button({ 
  children, 
  onClick, 
  variant = "primary", 
  icon, 
  className = "" 
}: ButtonProps) {
  const baseClasses = "transition-all focus:outline-none"
  
  const variants = {
    primary: "px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-sm text-neutral-300 hover:text-white",
    secondary: "text-neutral-400 hover:text-white transition-colors",
    icon: "flex items-center justify-center rounded-full"
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="flex items-center gap-2">
        {icon && icon}
        {children}
      </span>
    </motion.button>
  )
}

export function IconButton({ 
  children, 
  onClick, 
  className = "" 
}: {
  children: ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
} 