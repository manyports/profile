"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
  index?: number
  hoverEffect?: boolean
}

export function Card({ 
  children, 
  className = "", 
  index = 0,
  hoverEffect = true 
}: CardProps) {
  return (
    <motion.div
      className={`rounded-xl border border-white/5 bg-neutral-900/30 ${
        hoverEffect ? "hover:border-white/10 hover:bg-neutral-900/40" : ""
      } transition-colors duration-300 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1 + (index * 0.1) 
      }}
      whileHover={hoverEffect ? { y: -3 } : undefined}
    >
      {children}
    </motion.div>
  )
}

export function CardContent({ 
  children, 
  className = "" 
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`p-6 md:p-8 ${className}`}>
      {children}
    </div>
  )
}

export function CardImage({
  src,
  alt,
  className = ""
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  )
}

export function CardTitle({
  children,
  className = ""
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h3 className={`text-xl md:text-2xl font-medium ${className}`}>
      {children}
    </h3>
  )
}

export function CardDescription({
  children,
  className = ""
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p className={`text-neutral-400 leading-relaxed ${className}`}>
      {children}
    </p>
  )
} 