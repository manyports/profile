import type { Metadata } from "next"
import Link from "next/link"
import { data } from "@/data"
import { cvContent, pdfFileName, type Link as CVLink } from "./content"

export const metadata: Metadata = {
  title: `${data.personal.name} CV`,
  description: `${data.cv.title} · ${data.personal.location}`,
}

const mono = "font-[family-name:var(--font-geist-mono)]"
const control = `${mono} text-xs text-[#999] hover:text-black transition-colors`
const when = `${mono} text-[10.5px] text-[#777] shrink-0 tabular-nums`
const ink = "text-[#111]"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <h2 className={`${mono} text-[10px] uppercase tracking-[0.14em] text-[#777] border-b border-black pb-1 mb-3.5`}>{title}</h2>
      {children}
    </section>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-1.5 space-y-1 list-disc pl-4 marker:text-[#aaa]">
      {items.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  )
}

function Links({ links }: { links: CVLink[] }) {
  return links.map((l) => (
    <a
      key={l.href}
      href={l.href}
      target="_blank"
      rel="noreferrer"
      className={`${mono} text-[10.5px] font-normal text-[#777] hover:text-black underline-offset-2 hover:underline`}
    >
      {l.label}
    </a>
  ))
}

export default function CVPage() {
  const cv = cvContent()

  return (
    <main className="min-h-svh bg-[#f4f4f4] text-black px-4 py-6 sm:py-10">
      <nav className="mx-auto max-w-[210mm] flex items-center justify-between h-10 mb-4">
        <Link href="/" className={control}>
          ← {data.personal.nickname}
        </Link>
        <a href="/cv/pdf" download={pdfFileName} className={control}>
          download pdf ↓
        </a>
      </nav>

      <article className="mx-auto max-w-[210mm] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_12px_40px_rgba(0,0,0,0.06)] px-5 py-8 sm:px-[15mm] sm:py-[13mm] text-[13px] leading-[1.55] text-[#2b2b2b]">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className={`text-[30px] font-semibold tracking-[-0.035em] leading-none ${ink}`}>{cv.name}</h1>
            <p className="mt-2 text-[14.5px] text-[#666]">
              {cv.title} · {cv.location}
            </p>
          </div>
          <ul className={`${mono} text-[11px] text-[#333] sm:text-right space-y-0.5`}>
            {cv.contacts.map((c) => (
              <li key={c.href}>
                <a href={c.href} className="hover:underline underline-offset-2">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <Section title="Summary">
          <p>{cv.summary}</p>
        </Section>

        <Section title="Selected projects">
          <div className="space-y-5">
            {cv.projects.map((p) => (
              <div key={p.title}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="min-w-0 flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                    <span className={`font-semibold text-[14px] ${ink}`}>{p.title}</span>
                    <span className="text-[#777]">{p.tagline}</span>
                    <Links links={p.links} />
                  </h3>
                  <span className={when}>{p.year}</span>
                </div>
                <p className={`${mono} text-[10.5px] text-[#888] mt-0.5`}>{p.stack.join(" · ")}</p>
                <Bullets items={p.highlights} />
              </div>
            ))}
          </div>
        </Section>

        <Section title="Experience">
          {cv.experience.map((e) => (
            <div key={e.title}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="min-w-0 flex flex-wrap items-baseline gap-x-2.5">
                  <span className={`font-semibold text-[14px] ${ink}`}>{e.title}</span>
                  <span className="font-normal text-[#777]">
                    {e.company} · {e.location}
                  </span>
                </h3>
                <span className={when}>{e.period}</span>
              </div>
              <Bullets items={e.highlights} />
            </div>
          ))}
        </Section>

        <Section title="National hackathons & awards">
          <ul className="space-y-1">
            {cv.awards.map((a) => (
              <li key={a.title} className="flex items-baseline justify-between gap-4">
                <span>
                  <span className={`font-semibold ${ink}`}>{a.title}</span>
                  <span className="text-[#777]"> · {a.detail}</span>
                </span>
                <span className={when}>{a.when}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Skills">
          <dl className="space-y-1">
            {cv.skills.map((k) => (
              <div key={k.label} className="flex flex-col sm:flex-row sm:gap-3">
                <dt className={`sm:w-24 shrink-0 font-semibold ${ink}`}>{k.label}</dt>
                <dd>{k.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Education">
          {cv.education.map((e) => (
            <div key={e.school} className="flex items-baseline justify-between gap-4">
              <span>
                <span className={`font-semibold ${ink}`}>{e.school}</span>
                <span className="text-[#777]"> · {e.detail}</span>
              </span>
              <span className={when}>{e.when}</span>
            </div>
          ))}
        </Section>
      </article>
    </main>
  )
}
