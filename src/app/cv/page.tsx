import type { Metadata } from "next"
import Link from "next/link"
import { data } from "@/data"
import { PrintButton } from "./print-button"

export const metadata: Metadata = {
  // also the default file name when saved as pdf
  title: `${data.personal.name} CV`,
  description: `${data.cv.title} · ${data.personal.location}`,
}

const mono = "font-[family-name:var(--font-geist-mono)]"
const control = `${mono} text-xs text-[#999] hover:text-black transition-colors cursor-pointer`

// "astana, kazakhstan" → "Astana, Kazakhstan"
const titleCase = (s: string) => s.replace(/(^|[\s,(-])(\p{L})/gu, (_, sep, c) => sep + c.toUpperCase())
// "sep 2024 – may 2025" → "Sep 2024 – May 2025"
const period = (s: string) => titleCase(s)
// "https://github.com/manyports" → "github.com/manyports"
const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
// the data mixes "1st place" and "1st Place"
const award = (s: string) => s.replace(/\b(\d+(?:st|nd|rd|th)) place\b/gi, "$1 Place")
const monthOf = (date: string) => new Date(`1 ${date}`).getTime()

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 print:mt-4">
      <h2 className={`${mono} text-[10px] uppercase tracking-[0.14em] text-[#666] border-b border-black pb-1 mb-3 print:mb-2`}>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Entry({
  title,
  sub,
  when,
  bullets,
}: {
  title: React.ReactNode
  sub?: React.ReactNode
  when?: string
  bullets?: string[]
}) {
  return (
    <div className="mb-3.5 print:mb-2.5 last:mb-0 break-inside-avoid">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-semibold text-[13.5px] print:text-[12px]">{title}</h3>
        {when && <span className={`${mono} text-[10.5px] text-[#666] shrink-0 tabular-nums`}>{when}</span>}
      </div>
      {sub && <p className="text-[12px] print:text-[10.5px] text-[#555] mt-0.5 print:mt-0">{sub}</p>}
      {bullets && bullets.length > 0 && (
        <ul className="mt-1.5 print:mt-1 space-y-0.5 print:space-y-0 list-disc pl-4 marker:text-[#999]">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function CVPage() {
  const { personal, cv, experience, projects, qualifications, education, socials } = data
  const awards = [...qualifications].sort((a, b) => monthOf(b.date) - monthOf(a.date))
  const contacts = [
    { label: personal.email, href: `mailto:${personal.email}` },
    { label: bare(personal.website), href: personal.website },
    ...socials
      .filter((s) => s.platform === "GitHub" || s.platform === "LinkedIn")
      .map((s) => ({ label: bare(s.url), href: s.url })),
  ]

  return (
    <main className="min-h-svh bg-[#f4f4f4] text-black print:bg-white px-4 py-6 sm:py-10 print:p-0">
      <nav className="mx-auto max-w-[210mm] flex items-center justify-between h-10 mb-4 print:hidden">
        <Link href="/" className={control}>
          ← {personal.nickname}
        </Link>
        <PrintButton className={control} />
      </nav>

      <article className="mx-auto max-w-[210mm] min-h-[297mm] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_12px_40px_rgba(0,0,0,0.06)] print:shadow-none print:min-h-0 px-6 py-8 sm:px-[16mm] sm:py-[14mm] print:p-0 text-[12.5px] leading-[1.5] print:text-[11px] print:leading-[1.42] text-[#222]">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pb-1">
          <div>
            <h1 className="text-[28px] print:text-[24px] font-semibold tracking-[-0.03em] leading-none text-black">{personal.name}</h1>
            <p className="mt-1.5 text-[14px] text-[#555]">
              {cv.title} · {titleCase(personal.location)}
            </p>
          </div>
          <ul className={`${mono} text-[10.5px] text-[#444] sm:text-right space-y-0.5`}>
            {contacts.map((c) => (
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

        <Section title="Experience">
          {experience.map((e) => (
            <Entry
              key={e.id}
              title={e.title}
              sub={`${e.company} · ${titleCase(e.location)}`}
              when={period(e.period)}
              bullets={e.highlights}
            />
          ))}
        </Section>

        <Section title="Projects">
          {projects.map((p) => {
            const links = [p.link, p.github].filter(Boolean)
            return (
              <Entry
                key={p.id}
                title={
                  <>
                    {p.title}
                    {links.map((l) => (
                      <a
                        key={l}
                        href={l}
                        className={`${mono} ml-2.5 text-[10.5px] font-normal text-[#666] hover:underline underline-offset-2`}
                      >
                        {bare(l)}
                      </a>
                    ))}
                  </>
                }
                sub={p.technologies.join(" · ")}
                when={p.year}
                bullets={p.highlights}
              />
            )
          })}
        </Section>

        <Section title="Awards">
          <ul className="space-y-1">
            {awards.map((a) => (
              <li key={a.id} className="flex items-baseline justify-between gap-4 break-inside-avoid">
                <span>
                  <span className="font-semibold">{a.title}</span>
                  <span className="text-[#555]"> · {award(a.description)}</span>
                </span>
                <span className={`${mono} text-[10.5px] text-[#666] shrink-0 tabular-nums`}>{a.date}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Education">
          {education.map((e) => (
            <Entry
              key={e.id}
              title={e.school}
              sub={[e.major, titleCase(e.location)].filter(Boolean).join(" · ")}
              when={period(e.period)}
            />
          ))}
        </Section>

        <Section title="Skills">
          <dl className="space-y-1">
            {cv.skills.map((s) => (
              <div key={s.label} className="flex gap-3">
                <dt className="w-24 shrink-0 font-semibold">{s.label}</dt>
                <dd>{s.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </article>
    </main>
  )
}
