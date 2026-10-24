"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { data } from "@/data"
import { Item } from "@/components/reveal"
import { Now } from "@/components/now"
import { SectionLabel } from "@/components/section-label"
import { Accordion } from "@/components/ui/Accordion"
import { mono } from "@/components/ui/Row"

const pad = (i: number) => String(i + 1).padStart(2, "0")
const ease = [0.22, 1, 0.36, 1] as const

const link = "text-black underline underline-offset-4 decoration-[#ccc] hover:decoration-black transition-colors"

type Project = (typeof data.projects)[number]

// "… 9000+ users …" → { value: "9000+", unit: "users" }
function metric(project: Project) {
  const match = project.description.match(/(\d[\d,]*\+?)\s+(users)/i)
  return match ? { value: match[1], unit: match[2] } : { value: project.year, unit: "shipped" }
}

// a square that trails the cursor over the list. it inverts whatever it sits on,
// so it reads on both plain rows and the black open one.
function Follower({ project, index }: { project: Project | null; index: number }) {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 })

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX + 24)
      y.set(e.clientY + 24)
    }
    window.addEventListener("pointermove", move)
    return () => window.removeEventListener("pointermove", move)
  }, [x, y])

  const m = project && metric(project)

  return createPortal(
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="fixed left-0 top-0 z-[70] pointer-events-none mix-blend-difference"
    >
      <AnimatePresence>
        {project && m && (
          <motion.div
            key="card"
            initial={{ scale: 0, rotate: -8 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 8 }}
            transition={{ duration: 0.45, ease }}
            className="w-36 h-36 bg-white text-black p-3 flex flex-col justify-between origin-top-left"
          >
            <span className={mono}>{pad(index)}</span>
            <span>
              <span className="block text-3xl font-medium tracking-[-0.05em] leading-none overflow-hidden">
                <motion.span
                  key={project.id}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.5, ease }}
                  className="block"
                >
                  {m.value}
                </motion.span>
              </span>
              <span className={`${mono} block mt-1`}>{m.unit}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>,
    document.body
  )
}

export function WorkPage() {
  const featured = data.projects.find((project) => project.id === "04") ?? data.projects[data.projects.length - 1]
  const [hovered, setHovered] = useState<number | null>(null)
  const [canHover, setCanHover] = useState(false)

  useEffect(() => setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches), [])

  // which row the pointer is on; rows are found by the index stamped on their title
  const track = (e: React.PointerEvent) => {
    const row = (e.target as HTMLElement).closest("[aria-expanded]")
    const id = row?.querySelector<HTMLElement>("[data-row]")?.dataset.row
    setHovered(id === undefined ? null : Number(id))
  }

  return (
    <div className="space-y-24">
      <Item className="space-y-8">
        <Now label="building" title={featured.title} sub={featured.description} />
        <div className={`${mono} flex flex-wrap items-center gap-x-6 gap-y-3`}>
          <span className="flex items-center gap-2 text-black">
            in progress · {featured.year}
          </span>
          {featured.link && (
            <a href={featured.link} target="_blank" rel="noopener noreferrer" className={link}>
              see it live ↗
            </a>
          )}
        </div>
      </Item>

      <Item className="space-y-5">
        <div className="flex items-baseline justify-between">
          <SectionLabel>selected work</SectionLabel>
          <SectionLabel>{String(data.projects.length).padStart(2, "0")} projects</SectionLabel>
        </div>
        <div onPointerMove={track} onPointerLeave={() => setHovered(null)}>
          <Accordion
            items={data.projects.map((project, i) => ({
              key: project.id,
              index: pad(i),
              title: <span data-row={i}>{project.title}</span>,
              meta: project.year,
              defaultOpen: i === 0,
              content: (
                <>
                  <p className="mb-5">{project.description}</p>
                  <ul className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.map((tech, t) => (
                      <motion.li
                        key={tech}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease, delay: 0.15 + t * 0.04 }}
                        className={`${mono} border border-[#e5e5e5] px-2 py-1 text-[#555] hover:border-black hover:text-black transition-colors`}
                      >
                        {tech}
                      </motion.li>
                    ))}
                  </ul>
                  {(project.link || project.github) && (
                    <p className={`${mono} flex gap-6`}>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className={link}>
                          live ↗
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className={link}>
                          github ↗
                        </a>
                      )}
                    </p>
                  )}
                </>
              ),
            }))}
          />
        </div>
      </Item>

      {canHover && <Follower project={hovered === null ? null : data.projects[hovered]} index={hovered ?? 0} />}
    </div>
  )
}
