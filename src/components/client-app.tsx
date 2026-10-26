"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Page } from "@/types"
import { data } from "@/data"
import { staggerVariants } from "@/components/reveal"
import { LandingTile } from "@/components/landing-tile"
import { WorkPage, AboutPage, PhotosPage, ContactPage } from "@/components/pages"

const tiles: { id: Page; label: string }[] = [
  { id: "projects", label: "projects" },
  { id: "about", label: "about me" },
  { id: "photos", label: "photos" },
  { id: "contact", label: "contact" },
]

const pages: Record<Page, () => React.ReactElement> = {
  projects: WorkPage,
  about: AboutPage,
  photos: PhotosPage,
  contact: ContactPage,
}

const ease = [0.22, 1, 0.36, 1] as const
const inOut = [0.76, 0, 0.24, 1] as const
const morph = { duration: 0.8, ease: inOut }
const wipeIn = "inset(0% 0% 0% 0%)"
const wipeOut = "inset(100% 0% 0% 0%)"
const INTRO_MS = 1500
const INTRO_KEY = "yerassyl:intro-seen"

// which screen corner each square flies in from during the intro: [x, y]
const corners = [[-1, -1], [1, -1], [-1, 1], [1, 1]] as const

function isPage(value: string): value is Page {
  return tiles.some((t) => t.id === value)
}

// text that rises out of a mask, letter by letter
function MaskedText({
  text,
  delay = 0,
  stagger = 0.035,
  play = true,
}: {
  text: string
  delay?: number
  stagger?: number
  play?: boolean
}) {
  return (
    <span className="inline-flex overflow-hidden pb-[0.08em]" aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={play ? { y: "110%" } : false}
          animate={{ y: "0%" }}
          exit={{ y: "-110%", transition: { duration: 0.35, ease: inOut } }}
          transition={{ duration: 0.8, ease, delay: delay + i * stagger }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}

export default function ClientApp() {
  // active: which square is expanded. revealed: the white page has wiped in over it.
  const [active, setActive] = useState<Page | null>(null)
  const [revealed, setRevealed] = useState(false)
  // the page finished wiping in; its clip-path is dropped so mobile browsers scroll it without clipping every frame
  const [wiped, setWiped] = useState(false)
  // intro: the big name holding the screen on a first visit. playedIntro: this load ran it.
  const [phase, setPhase] = useState<"intro" | "landing">("intro")
  const [playedIntro, setPlayedIntro] = useState(false)
  // squares only play their entrance until the first page is opened
  const [entered, setEntered] = useState(false)
  const reduceMotion = useReducedMotion()
  // index of the square under the cursor; the others drain to outlines
  const [hovered, setHovered] = useState<number | null>(null)
  const unhoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const revealedRef = useRef(false)
  const activeRef = useRef<Page | null>(null)
  const pushedRef = useRef(false)

  // decided before first paint so returning visitors never see the intro screen settle
  useLayoutEffect(() => {
    let seen = true
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1"
      sessionStorage.setItem(INTRO_KEY, "1")
    } catch {}
    if (seen || reduceMotion || isPage(window.location.hash.slice(1))) {
      setPhase("landing")
      return
    }
    setPlayedIntro(true)
    const timer = setTimeout(() => setPhase("landing"), INTRO_MS)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    revealedRef.current = revealed
    activeRef.current = active
  }, [revealed, active])

  // closing runs in two steps: wipe the page away, then shrink the square back (onExitComplete)
  const close = useCallback(() => {
    if (revealedRef.current) setRevealed(false)
    else setActive(null)
  }, [])

  useEffect(() => {
    const sync = (initial: boolean) => {
      const hash = window.location.hash.slice(1)
      if (isPage(hash)) {
        setEntered(true)
        setActive(hash)
        // landing straight on /#page: there is no square to morph out of, so no layout animation will finish
        if (initial) setRevealed(true)
      } else close()
    }
    sync(true)
    const onPop = () => sync(false)
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [close])

  // if the morph gets cut short (slow devices, tab switches) its completion never fires; don't leave the panel stuck
  useEffect(() => {
    if (!active) return
    const timer = setTimeout(() => activeRef.current && setRevealed(true), (morph.duration + 0.3) * 1000)
    return () => clearTimeout(timer)
  }, [active])

  const goHome = useCallback(() => {
    if (pushedRef.current) {
      pushedRef.current = false
      window.history.back()
    } else {
      window.history.replaceState(null, "", window.location.pathname)
      close()
    }
  }, [close])

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : ""
    if (!active) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && goHome()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active, goHome])

  const open = (id: Page) => {
    window.history.pushState(null, "", `#${id}`)
    pushedRef.current = true
    setHovered(null)
    setEntered(true)
    setActive(id)
  }

  // crossing the gap between squares shouldn't refill everything for a frame
  const hoverTile = (i: number, on: boolean) => {
    if (unhoverTimer.current) clearTimeout(unhoverTimer.current)
    if (on) setHovered(i)
    else unhoverTimer.current = setTimeout(() => setHovered((h) => (h === i ? null : h)), 140)
  }

  const ActivePage = active ? pages[active] : null
  const activeLabel = tiles.find((t) => t.id === active)?.label ?? ""
  const { nickname, location } = data.personal

  // after the intro, everything else waits for the name to land
  const lag = playedIntro ? 0.6 : 0

  const tileInitial = (i: number) => {
    if (entered) return false
    if (!playedIntro) return { opacity: 0, y: 24 }
    const [cx, cy] = corners[i]
    return {
      opacity: 0,
      x: cx * window.innerWidth * 0.45,
      y: cy * window.innerHeight * 0.45,
      rotate: cx * cy * 12,
      scale: 0.5,
    }
  }

  const tileTransition = (i: number) => {
    if (entered) return { duration: 0.9, ease }
    if (playedIntro) return { duration: 1.2, ease: inOut, delay: 0.2 + i * 0.06 }
    return { duration: 0.9, ease, delay: 0.35 + i * 0.08 }
  }

  const details = [
    { label: "position", value: "full-stack / front-end developer" },
    { label: "based in", value: location },
    { label: "seeking", value: "job opportunities" },
    { label: "designing", value: "cool components & web pages" },
  ]

  return (
    <main className="min-h-svh bg-white text-black flex items-center justify-center px-6 py-16">
      <div aria-hidden className="grain" />
      {phase === "intro" ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <motion.span
            layoutId="name"
            transition={{ layout: { duration: 1, ease: inOut } }}
            className="inline-block text-[clamp(4rem,20vw,16rem)] font-medium tracking-[-0.05em] leading-none"
          >
            <MaskedText text={nickname} delay={0.15} stagger={0.05} />
          </motion.span>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-8 w-[min(84vw,26rem)]">
          <h1 className="flex items-start gap-2 text-5xl md:text-6xl font-medium tracking-[-0.05em] leading-none">
            <motion.span
              layoutId="name"
              transition={{ layout: { duration: 1, ease: inOut } }}
              className="inline-block"
            >
              <MaskedText text={nickname} delay={0.1} play={!playedIntro} />
            </motion.span>
            <motion.sup
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease, delay: 0.5 + lag }}
              className="text-sm tracking-normal text-[#999] font-[family-name:var(--font-geist-mono)] top-0 mt-1"
            >
              18
            </motion.sup>
          </h1>

          <div className="grid grid-cols-2 gap-2.5 w-full">
            {tiles.map((tile, i) =>
              active === tile.id ? (
                <div key={tile.id} className="aspect-square" />
              ) : (
                <LandingTile
                  key={tile.id}
                  label={tile.label}
                  layoutId={`tile-${tile.id}`}
                  onOpen={() => open(tile.id)}
                  onHoverChange={(on) => hoverTile(i, on)}
                  offset={
                    hovered === null || hovered === i
                      ? null
                      : { dx: (i % 2) - (hovered % 2), dy: Math.floor(i / 2) - Math.floor(hovered / 2) }
                  }
                  initial={tileInitial(i)}
                  transition={{ layout: morph, default: tileTransition(i) }}
                />
              )
            )}
          </div>

          <motion.dl
            initial="hidden"
            animate="shown"
            variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.06, delayChildren: 0.75 + lag } } }}
            className="grid grid-cols-2 gap-x-2.5 gap-y-4 w-full text-[13px] leading-snug -mt-3"
          >
            {details.map(({ label, value }) => (
              <motion.div
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
                }}
                className="min-w-0"
              >
                <dt className="text-[#999]">{label}</dt>
                <dd>{value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      )}

      <AnimatePresence>
        {active && (
          <motion.div
            key={active}
            layoutId={`tile-${active}`}
            transition={{ layout: morph }}
            // the exiting panel can also finish a layout animation while closing; only reveal an open one
            onLayoutAnimationComplete={() => activeRef.current && setRevealed(true)}
            className="fixed inset-0 z-50 bg-black"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <motion.div
            key={`label-${active}`}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="fixed inset-0 z-[55] flex items-center justify-center pointer-events-none text-white text-5xl md:text-7xl font-medium tracking-[-0.05em]"
          >
            <MaskedText text={activeLabel} delay={0.35} stagger={0.03} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence
        onExitComplete={() => {
          setWiped(false)
          setActive(null)
        }}
      >
        {revealed && ActivePage && (
          <motion.div
            key="page"
            // layoutScroll: the photos inside share layouts with the lightbox; without it they jump around as this scrolls
            layoutScroll
            initial={{ clipPath: wipeOut }}
            animate={{ clipPath: wipeIn, transitionEnd: { clipPath: "none" } }}
            onAnimationComplete={() => revealedRef.current && setWiped(true)}
            exit={{ clipPath: wiped ? [wipeIn, wipeOut] : wipeOut, transition: { duration: 0.6, ease: inOut } }}
            transition={{ duration: 0.7, ease: inOut, delay: 0.15 }}
            className="fixed inset-0 z-[60] bg-white overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
          >
            <motion.div
              variants={staggerVariants}
              initial="hidden"
              animate="shown"
              className="max-w-2xl mx-auto px-6 md:px-12 pt-8 pb-32"
            >
              <button
                onClick={goHome}
                className="group flex items-center gap-2 h-10 text-sm text-[#999] hover:text-black transition-colors cursor-pointer"
              >
                <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
                {nickname}
              </button>
              <h1 className="mt-16 mb-20 text-5xl md:text-7xl font-medium tracking-[-0.05em] leading-none">
                <MaskedText text={activeLabel} delay={0.55} stagger={0.03} />
              </h1>
              <ActivePage />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
