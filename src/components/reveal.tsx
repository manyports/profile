"use client"

import { motion, type Variants } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

export const staggerVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  shown: { opacity: 1, y: 0, filter: "blur(0px)",
    // a leftover blur(0px) still turns the whole section into one big filtered layer; drop it once settled
    transitionEnd: { filter: "none" },
    transition: { duration: 0.5, ease } },
}

export function Item({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}
