"use client"

import { ReactNode } from "react"

export function Container({
  children,
  className = "",
  maxWidth = "default"
}: {
  children: ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "default"
}) {
  const getMaxWidthClass = (width: string) => {
    const map: Record<string, string> = {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      default: "max-w-[1200px]"
    }
    return map[width]
  }
  
  return (
    <div className={`mx-auto px-6 md:px-8 w-full ${getMaxWidthClass(maxWidth)} ${className}`}>
      {children}
    </div>
  )
}

export function Section({
  children,
  className = ""
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`py-16 ${className}`}>
      {children}
    </section>
  )
}

export function Spacer({
  size = "md"
}: {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}) {
  const getSizeClass = (size: string) => {
    const map: Record<string, string> = {
      xs: "h-4",
      sm: "h-8",
      md: "h-16",
      lg: "h-24",
      xl: "h-32"
    }
    return map[size]
  }
  
  return <div className={getSizeClass(size)} />
} 