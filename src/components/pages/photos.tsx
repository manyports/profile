"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion"
import { data } from "@/data"
import { Item } from "@/components/reveal"
import { Now } from "@/components/now"
import { Tabs } from "@/components/ui/Tabs"
import { RowContent, mono } from "@/components/ui/Row"

const pad = (i: number) => String(i + 1).padStart(2, "0")
const ease = [0.22, 1, 0.36, 1] as const
const inOut = [0.76, 0, 0.24, 1] as const
const morph = { duration: 0.8, ease: inOut }

// the grid's image width; the lightbox reuses it so the cached copy shows instantly
const gridSizes = "(min-width: 768px) 290px, (min-width: 640px) 50vw, 100vw"

type Photo = (typeof data.photos)[number]

const meta = (photo: Photo) => [photo.location, photo.year].filter(Boolean).join(" · ")

function Tile({ photo, index, lifted, onOpen }: { photo: Photo; index: number; lifted: boolean; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })
  const [loaded, setLoaded] = useState(false)
  const reduceMotion = useReducedMotion()
  // the curtain holds as the skeleton until the photo is both on screen and decoded
  const reveal = inView && loaded

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      className="group block w-full break-inside-avoid mb-10 text-left outline-none cursor-zoom-in"
    >
      <span className="relative block" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
        {!lifted && (
          <motion.span
            layoutId={`photo-${photo.id}`}
            transition={{ layout: morph }}
            className="absolute inset-0 overflow-hidden bg-[#f5f5f5]"
          >
            <motion.span
              className="absolute inset-0"
              initial={false}
              animate={{ scale: reveal || reduceMotion ? 1 : 1.18 }}
              transition={{ duration: 1.4, ease }}
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                sizes={gridSizes}
                priority={index < 2}
                onLoad={() => setLoaded(true)}
                className="object-cover grayscale group-hover:grayscale-0 group-focus-visible:grayscale-0 group-hover:scale-[1.04] transition-[filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              />
            </motion.span>
            <motion.span
              aria-hidden
              className={["absolute inset-0 origin-top bg-[#f5f5f5]", loaded ? "" : "animate-pulse"].join(" ")}
              initial={false}
              animate={{ scaleY: reveal ? 0 : 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.9, ease: inOut, delay: (index % 2) * 0.08 }}
            />
          </motion.span>
        )}
      </span>
      <span className="relative flex items-baseline gap-4 px-3 py-4 border-b border-[#e5e5e5]">
        <RowContent index={pad(index)} title={photo.caption} meta={photo.year} interactive />
      </span>
    </button>
  )
}

function Lightbox({
  photos,
  at,
  shared,
  onStep,
  onClose,
}: {
  photos: { photo: Photo; index: number }[]
  at: number
  shared: boolean
  onStep: (dir: 1 | -1) => void
  onClose: () => void
}) {
  const { photo, index } = photos[at]
  const [sharp, setSharp] = useState(false)
  const ratio = photo.width / photo.height

  useEffect(() => setSharp(false), [photo.id])

  useEffect(() => {
    // capture, so Escape closes the photo instead of the whole page underneath
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation()
        onClose()
      } else if (e.key === "ArrowRight") onStep(1)
      else if (e.key === "ArrowLeft") onStep(-1)
    }
    window.addEventListener("keydown", onKey, true)
    return () => window.removeEventListener("keydown", onKey, true)
  }, [onStep, onClose])

  const control = `${mono} text-white/60 hover:text-white transition-colors cursor-pointer`

  return (
    <motion.div
      // the exit is driven by the backdrop below; this only holds the dialog until it finishes
      exit={{ opacity: 1, transition: { duration: 0.7 } }}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex flex-col text-white cursor-zoom-out"
      role="dialog"
      aria-modal
      aria-label={photo.caption}
    >
      {/* fading a black layer's opacity stays on the GPU; animating background-color repaints the screen each frame */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6, ease: inOut, delay: 0.1 } }}
        transition={{ duration: 0.5, ease: inOut }}
        className="absolute inset-0 -z-10 bg-black"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.5 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className="flex items-center justify-between px-6 md:px-10 h-16 shrink-0"
      >
        <span className={`${mono} tabular-nums text-white/60`}>
          {pad(at)} / {pad(photos.length - 1)}
        </span>
        <button type="button" onClick={onClose} className={control}>
          close · esc
        </button>
      </motion.div>

      <div className="flex-1 min-h-0 flex items-center justify-center px-6">
        <motion.div
          key={photo.id}
          layoutId={shared ? `photo-${photo.id}` : undefined}
          transition={{ layout: morph }}
          initial={shared ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={shared ? undefined : { opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative overflow-hidden bg-[#111] cursor-default"
          style={{ aspectRatio: `${ratio}`, width: `min(100%, calc((100svh - 13rem) * ${ratio}))` }}
        >
          <Image src={photo.src} alt="" fill sizes={gridSizes} className="object-cover" />
          <Image
            src={photo.src}
            alt={photo.caption}
            fill
            sizes="90vw"
            quality={85}
            onLoad={() => setSharp(true)}
            className={["object-cover transition-opacity duration-500", sharp ? "opacity-100" : "opacity-0"].join(" ")}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        onClick={(e) => e.stopPropagation()}
        className="flex items-end justify-between gap-6 px-6 md:px-10 h-36 pb-8 shrink-0 cursor-default"
      >
        <div className="min-w-0">
          <span className={`${mono} block text-white/60 mb-2`}>
            {pad(index)} · {meta(photo)}
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              key={photo.id}
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, ease, delay: shared ? 0.45 : 0.05 }}
              className="block text-3xl md:text-5xl font-medium tracking-[-0.045em] leading-[1.05] truncate"
            >
              {photo.caption}
            </motion.span>
          </span>
        </div>
        {photos.length > 1 && (
          <div className="flex gap-6 shrink-0">
            <button type="button" onClick={() => onStep(-1)} className={control}>
              ← prev
            </button>
            <button type="button" onClick={() => onStep(1)} className={control}>
              next →
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export function PhotosPage() {
  const places = [...new Set(data.photos.map((p) => p.location))]
  const years = data.photos.map((p) => p.year).filter(Boolean).sort()
  const [filter, setFilter] = useState("all")
  // at: position in the current filter. shared: still the photo that was clicked, so it can fly back.
  const [open, setOpen] = useState<{ at: number; shared: boolean } | null>(null)

  const indexed = data.photos.map((photo, index) => ({ photo, index }))
  const visible = filter === "all" ? indexed : indexed.filter(({ photo }) => photo.location === filter)
  const lifted = open?.shared ? visible[open.at]?.photo.id : null

  const step = (dir: 1 | -1) =>
    setOpen((o) => o && { at: (o.at + dir + visible.length) % visible.length, shared: false })

  const grid = (list: typeof indexed) => (
    <div className="sm:columns-2 gap-4 pt-8">
      {list.map(({ photo, index }, i) => (
        <Tile
          key={photo.id}
          photo={photo}
          index={index}
          lifted={photo.id === lifted}
          onOpen={() => setOpen({ at: i, shared: true })}
        />
      ))}
    </div>
  )

  const count = (n: number) => String(n).padStart(2, "0")

  return (
    <div className="space-y-16">
      <Item>
        <Now
          label="moments"
          title="small things i pointed a camera at."
          sub={`${data.photos.length} photos · ${places.join(", ")} · ${years[0]} – ${years[years.length - 1]}`}
        />
      </Item>

      <Item>
        <Tabs
          onChange={(key) => {
            setOpen(null)
            setFilter(key)
          }}
          tabs={[
            { key: "all", label: `all · ${count(indexed.length)}`, content: grid(indexed) },
            ...places.map((place) => {
              const list = indexed.filter(({ photo }) => photo.location === place)
              return { key: place, label: `${place} · ${count(list.length)}`, content: grid(list) }
            }),
          ]}
        />
      </Item>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && visible[open.at] && (
              <Lightbox
                key="lightbox"
                photos={visible}
                at={open.at}
                shared={open.shared}
                onStep={step}
                onClose={() => setOpen(null)}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  )
}
