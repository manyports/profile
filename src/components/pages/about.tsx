"use client"

import { useEffect, useRef, useState } from "react"
import { animate, motion, useInView, useReducedMotion, type Variants } from "framer-motion"
import { data } from "@/data"
import { Item } from "@/components/reveal"
import { Now } from "@/components/now"
import { SectionLabel } from "@/components/section-label"
import { Accordion } from "@/components/ui/Accordion"
import { mono } from "@/components/ui/Row"

const pad = (i: number) => String(i + 1).padStart(2, "0")
const ease = [0.22, 1, 0.36, 1] as const
const inOut = [0.76, 0, 0.24, 1] as const

// words ink in from light gray as the paragraph scrolls into view
const words: Variants = { hidden: {}, shown: { transition: { staggerChildren: 0.012 } } }
const word: Variants = {
  hidden: { color: "#d4d4d4" },
  shown: { color: "#555555", transition: { duration: 0.5, ease } },
}

function Ink({ text }: { text: string }) {
  return (
    <motion.p variants={words} initial="hidden" whileInView="shown" viewport={{ once: true, margin: "0px 0px -10% 0px" }}>
      {text.split(" ").map((w, i) => (
        <motion.span key={i} variants={word}>
          {w}{" "}
        </motion.span>
      ))}
    </motion.p>
  )
}

function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduceMotion = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) return setN(to)
    const controls = animate(0, to, { duration: 1.6, ease, onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to, reduceMotion])

  return (
    <span ref={ref} className="tabular-nums">
      {String(n).padStart(2, "0")}
    </span>
  )
}

// "Sep 2026 – Jun 2030" → is today inside it?
function isCurrent(period: string) {
  const [start, end] = period.split("–").map((s) => new Date(`1 ${s.trim()}`))
  const now = new Date()
  return start <= now && now <= end
}

function Marquee({ items, reverse = false, muted = false }: { items: string[]; reverse?: boolean; muted?: boolean }) {
  const run = (hidden: boolean) => (
    <span aria-hidden={hidden} className="flex shrink-0">
      {items.map((item) => (
        <span key={item} className="flex items-baseline">
          <span className={muted ? "text-[#ccc] hover:text-black transition-colors duration-300" : ""}>{item}</span>
          <span className="text-[#ccc] px-[0.4em]">/</span>
        </span>
      ))}
    </span>
  )

  return (
    <div className="marquee-track overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={["marquee whitespace-nowrap", reverse ? "marquee-reverse" : ""].join(" ")}
        style={{ "--marquee-duration": `${items.length * 6}s` } as React.CSSProperties}
      >
        {run(false)}
        {run(true)}
      </div>
    </div>
  )
}

export function AboutPage() {
  const { education, technologies } = data

  return (
    <div className="space-y-24">
      <Item className="space-y-8">
        <Now label="about" title="a software engineer who loves building things for the web." />
        <div className="space-y-4 text-[15px] leading-relaxed max-w-lg">
          {data.about.map((text) => (
            <Ink key={text} text={text} />
          ))}
        </div>
      </Item>

      <Item className="space-y-8">
        <SectionLabel>education</SectionLabel>
        <div className="relative pl-10">
          <motion.span
            aria-hidden
            className="absolute left-[5px] top-2 bottom-2 w-px bg-black origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: inOut, delay: 0.2 }}
          />
          {education.map((edu, i) => {
            const current = isCurrent(edu.period)
            return (
              <motion.div
                key={edu.id}
                className="relative pb-12 last:pb-0"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: 0.3 + i * 0.25 }}
              >
                <span aria-hidden className="absolute -left-10 top-[3px] w-[11px] h-[11px]">
                  {current && <span className="absolute inset-0 bg-black" />}
                  <span
                    className={["absolute inset-0 border border-black", current ? "bg-black" : "bg-white"].join(" ")}
                  />
                </span>
                <p className={`${mono} text-[#999] mb-2`}>
                  {edu.period}
                  {current && <span className="text-black"> · now</span>}
                </p>
                <p className="text-xl md:text-2xl font-medium tracking-[-0.03em] leading-tight">{edu.school}</p>
                {edu.major && <p className="text-[15px] text-[#555] mt-1">{edu.major}</p>}
                <p className={`${mono} text-[#999] mt-2`}>{edu.location}</p>
              </motion.div>
            )
          })}
        </div>
      </Item>

      <Item className="space-y-5">
        <SectionLabel>experience</SectionLabel>
        <Accordion
          items={data.experience.map((exp, i) => ({
            key: exp.id,
            index: pad(i),
            title: exp.title,
            meta: exp.period,
            content: (
              <>
                <p className={`${mono} text-[#999] mb-3`}>
                  {exp.company} · {exp.location}
                </p>
                <p>{exp.description}</p>
              </>
            ),
          }))}
        />
      </Item>

      <Item className="space-y-5">
        <SectionLabel>qualifications</SectionLabel>
        <Accordion
          items={data.qualifications.map((honor, i) => ({
            key: honor.id,
            index: pad(i),
            title: honor.title,
            meta: honor.date,
            content: honor.description,
          }))}
        />
      </Item>

      <Item className="space-y-6">
        <SectionLabel>stack</SectionLabel>
        <div className="space-y-2 border-y border-black py-6 text-4xl md:text-6xl font-medium tracking-[-0.05em] leading-[1.1]">
          <Marquee items={technologies.tools} />
          <Marquee items={technologies.languages} reverse muted />
        </div>
      </Item>
    </div>
  )
}
