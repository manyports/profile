"use client"

import { data } from "@/data"
import type { Page } from "@/types"
import { LocalTime } from "./contact"

const places = [...new Set(data.photos.map((p) => p.location))]
const years = data.photos.map((p) => p.year).filter(Boolean).sort()
const built = data.projects.filter((p) => p.id !== "04").length

// what sits under each page's title in the left column: one line, then the small facts
const intros: Record<Page, { lead: string; meta: React.ReactNode[] }> = {
  projects: {
    lead: "what i'm building now, and what i built before it.",
    meta: [`${String(built).padStart(2, "0")} projects`, "blurrow/ui in progress"],
  },
  about: {
    lead: "a software engineer who loves building things for the web.",
    meta: [data.personal.location, "18"],
  },
  photos: {
    lead: "small things i pointed a camera at.",
    meta: [`${data.photos.length} photos`, places.join(", "), `${years[0]} – ${years[years.length - 1]}`],
  },
  contact: {
    lead: "hey, i'm open to new projects and opportunities.",
    meta: [
      "available for work",
      <span key="time">
        {data.personal.location.split(",")[0]} · <LocalTime />
      </span>,
    ],
  },
}

export function PageIntro({ page }: { page: Page }) {
  const { lead, meta } = intros[page]
  return (
    <div className="mt-6 space-y-5">
      <p className="max-w-[24ch] text-pretty text-[17px] leading-relaxed text-ink-body">{lead}</p>
      <ul className="space-y-1 border-t border-line-strong pt-4 text-[13px] text-ink-muted">
        {meta.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  )
}
