"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { data } from "@/data"
import { Item } from "@/components/reveal"
import { Now } from "@/components/now"
import { Marquee } from "@/components/marquee"
import { SectionLabel } from "@/components/section-label"
import { RowFill, mono } from "@/components/ui/Row"

const ease = [0.22, 1, 0.36, 1] as const
const inOut = [0.76, 0, 0.24, 1] as const

// ticking local time, so visitors know whether a reply is likely soon
function LocalTime() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!now) return <span className="tabular-nums">--:--:--</span>
  const time = now.toLocaleTimeString("en-GB", { timeZone: "Asia/Almaty", hour12: false })
  const hour = Number(time.slice(0, 2))
  const [h, m, s] = time.split(":")
  return (
    <span className="tabular-nums">
      {h}
      <span className="animate-pulse">:</span>
      {m}
      <span className="animate-pulse">:</span>
      {s}
      <span className="text-[#999]"> · {hour >= 9 && hour < 23 ? "awake" : "probably asleep"}</span>
    </span>
  )
}

// the email, set big; clicking copies it and a black fill wipes across to confirm
function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      window.location.href = `mailto:${email}`
      return
    }
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1800)
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group relative w-full text-left border-y border-black px-3 py-8 md:py-10 outline-none cursor-copy overflow-hidden"
    >
      <RowFill filled={copied} />
      <span className={`${mono} relative flex justify-between mb-4 text-[#999] group-hover:text-white/60 transition-colors duration-500 ${copied ? "text-white/60" : ""}`}>
        <span>email</span>
        <span>{copied ? "copied ✓" : "click to copy"}</span>
      </span>
      <span className="relative block overflow-hidden pb-[0.08em] text-[clamp(1.75rem,7.5vw,3rem)] font-medium tracking-[-0.05em] leading-none">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={copied ? "copied" : "email"}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-110%" }}
            transition={{ duration: 0.5, ease: inOut }}
            className={[
              "block truncate transition-colors duration-500",
              copied ? "text-white" : "group-hover:text-white group-focus-visible:text-white",
            ].join(" ")}
          >
            {copied ? "copied. talk soon." : email}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  )
}

export function ContactPage() {
  const email = data.personal.email
  const socials = data.socials.filter((social) => !social.url.startsWith("mailto:"))

  return (
    <div className="space-y-20">
      <Item className="space-y-8">
        <Now label="hey," title="i'm open to new projects and opportunities." />
        <div className={`${mono} flex flex-wrap gap-x-8 gap-y-2`}>
          <span>available for work</span>
          <span>
            <span className="text-[#999]">{data.personal.location.split(",")[0].toLowerCase()} · </span>
            <LocalTime />
          </span>
        </div>
      </Item>

      <Item>
        <CopyEmail email={email} />
      </Item>

      <Item className="space-y-5">
        <SectionLabel>elsewhere</SectionLabel>
        <div className="border-t border-black">
          {socials.map((social, i) => (
            <motion.a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.07 }}
              className="group relative w-full flex items-baseline gap-4 px-3 py-6 border-b border-[#e5e5e5] text-left cursor-pointer outline-none"
            >
              <RowFill />
              <span className={`relative w-20 shrink-0 lowercase text-[#999] group-hover:text-white/60 transition-colors duration-500 ${mono}`}>
                {social.platform}
              </span>
              <span className="relative flex-1 min-w-0 truncate text-xl md:text-2xl font-medium tracking-[-0.03em] group-hover:text-white transition-colors duration-500">
                {social.username}
              </span>
            </motion.a>
          ))}
        </div>
      </Item>

      <Item className="-mx-6 md:-mx-12 text-5xl md:text-7xl font-medium tracking-[-0.05em] leading-[1.1] py-4">
        <Marquee items={["let's build something", "say hi", "i reply fast"]} separator="✦" speed={5} />
      </Item>
    </div>
  )
}
