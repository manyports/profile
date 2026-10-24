"use client"

import { useEffect, useRef } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type TargetAndTransition,
  type Transition,
} from "framer-motion"

const spring = { stiffness: 220, damping: 20, mass: 0.6 }
const inOut = [0.76, 0, 0.24, 1] as const
const MAX_TILT = 9 // degrees
const MAGNET = 0.14 // share of the cursor offset the square follows
const REACH = 1.15 // magnet range, in square widths from its center

// where this square sits relative to the hovered one, in grid steps; null when it is the hovered one or nothing is
export type Offset = { dx: number; dy: number } | null

// the fill retreats away from the hovered square, toward the far edge (or far corner on a diagonal)
function drained({ dx, dy }: { dx: number; dy: number }) {
  const top = dy > 0 ? "100%" : "0%"
  const right = dx < 0 ? "100%" : "0%"
  const bottom = dy < 0 ? "100%" : "0%"
  const left = dx > 0 ? "100%" : "0%"
  return `inset(${top} ${right} ${bottom} ${left})`
}

interface LandingTileProps {
  label: string
  layoutId: string
  onOpen: () => void
  onHoverChange: (hovered: boolean) => void
  offset: Offset
  initial: TargetAndTransition | false
  transition: Transition
}

export function LandingTile({
  label,
  layoutId,
  onOpen,
  onHoverChange,
  offset,
  initial,
  transition,
}: LandingTileProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const reduceMotion = useReducedMotion()
  // while another square is hovered this one holds still
  const holdRef = useRef(false)
  useEffect(() => {
    holdRef.current = offset !== null
  }, [offset])

  const x = useSpring(0, spring)
  const y = useSpring(0, spring)
  const rotateX = useSpring(0, spring)
  const rotateY = useSpring(0, spring)
  const spotX = useMotionValue(50)
  const spotY = useMotionValue(50)
  const spotlight = useMotionTemplate`radial-gradient(14rem circle at ${spotX}% ${spotY}%, rgba(255,255,255,0.09), transparent 60%)`

  useEffect(() => {
    if (reduceMotion) return

    const reset = () => {
      x.set(0)
      y.set(0)
      rotateX.set(0)
      rotateY.set(0)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !ref.current) return
      if (holdRef.current) return reset()
      // measured on the outer button, which carries no magnet/tilt transforms
      const r = ref.current.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const reach = r.width * REACH
      const dist = Math.hypot(dx, dy)

      if (dist > reach) return reset()

      const pull = (1 - dist / reach) * MAGNET
      x.set(dx * pull)
      y.set(dy * pull)

      const inside = Math.abs(dx) <= r.width / 2 && Math.abs(dy) <= r.height / 2
      rotateY.set(inside ? (dx / (r.width / 2)) * MAX_TILT : 0)
      rotateX.set(inside ? -(dy / (r.height / 2)) * MAX_TILT : 0)
      if (inside) {
        spotX.set(((e.clientX - r.left) / r.width) * 100)
        spotY.set(((e.clientY - r.top) / r.height) * 100)
      }
    }

    window.addEventListener("pointermove", onMove)
    document.documentElement.addEventListener("pointerleave", reset)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", reset)
    }
  }, [reduceMotion, x, y, rotateX, rotateY, spotX, spotY])

  const diagonal = offset !== null && offset.dx !== 0 && offset.dy !== 0

  return (
    <motion.button
      ref={ref}
      layoutId={layoutId}
      onClick={onOpen}
      onPointerEnter={(e) => e.pointerType === "mouse" && onHoverChange(true)}
      onPointerLeave={() => onHoverChange(false)}
      onFocus={() => onHoverChange(true)}
      onBlur={() => onHoverChange(false)}
      aria-label={label}
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      transition={transition}
      className="group/tile relative aspect-square cursor-pointer outline-none [perspective:700px]"
    >
      <motion.span
        style={{ x, y, rotateX, rotateY }}
        className="absolute inset-0 block border border-black [transform-style:preserve-3d]"
      >
        <motion.span
          aria-hidden
          initial={false}
          animate={{ clipPath: offset ? drained(offset) : "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 0.6, ease: inOut, delay: offset && diagonal ? 0.07 : 0 }}
          className="absolute -inset-px bg-black overflow-hidden"
        >
          <motion.span
            style={{ background: spotlight }}
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/tile:opacity-100"
          />
        </motion.span>
        {/* one label, always in the same corner; hovering brightens it and slides an arrow in */}
        <span
          className={[
            "absolute left-3 bottom-3 flex items-center gap-1.5 text-xs font-[family-name:var(--font-geist-mono)] leading-none transition-colors duration-500",
            offset ? "text-black" : "text-white/70 group-hover/tile:text-white group-focus-visible/tile:text-white",
          ].join(" ")}
        >
          {label}
          <span className="block overflow-hidden">
            <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -translate-x-full group-hover/tile:translate-x-0 group-focus-visible/tile:translate-x-0">
              →
            </span>
          </span>
        </span>
      </motion.span>
    </motion.button>
  )
}
