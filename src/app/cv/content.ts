import { data } from "@/data"

// the one shape both renderers read: the web page (page.tsx) and the downloadable pdf (pdf.tsx)

// "astana, kazakhstan" → "Astana, Kazakhstan"
const titleCase = (s: string) => s.replace(/(^|[\s,(-])(\p{L})/gu, (_, sep, c) => sep + c.toUpperCase())
// "https://github.com/manyports" → "github.com/manyports"
export const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
// "1st place among 130 teams (National)" → "1st of 130 teams"; "national" lives in the section title.
// anything without a placing keeps its "Top x%" line, the rest of the sentence is for the site
const award = (s: string) => {
  const place = s.match(/(\d+(?:st|nd|rd|th)) place among ([\d,+]+ \w+)/i)
  if (place) return `${place[1]} of ${place[2]}`
  return s.match(/Top \d+%[^.]*/i)?.[0].replace(/ out of (\d+) \w+/, " of $1") ?? s
}

export type Link = { label: string; href: string }

export function cvContent() {
  const { personal, cv, qualifications, socials } = data

  return {
    name: personal.name,
    title: cv.title,
    location: titleCase(personal.location),
    contacts: [
      { label: personal.email, href: `mailto:${personal.email}` },
      { label: bare(personal.website), href: personal.website },
      ...socials
        .filter((s) => s.platform === "GitHub" || s.platform === "LinkedIn")
        .map((s) => ({ label: bare(s.url), href: s.url })),
    ] satisfies Link[],
    summary: cv.summary,
    projects: cv.projects.map((p) => ({
      ...p,
      // a repo reads as "source" next to the live domain; keeps each title on one line
      links: p.links.map((href) => ({ label: href.includes("github.com") ? "source" : bare(href), href })) satisfies Link[],
    })),
    experience: cv.experience,
    awards: qualifications
      // "nFactorial Incubator 2024 Finalist": the year is already in the date column
      .map((q) => ({ title: q.title.replace(/\s\d{4}\b/, ""), detail: award(q.description), when: q.date })),
    skills: cv.skills,
    education: cv.education.map((e) => ({
      school: `${e.school} (${e.kind})`,
      detail: e.location,
      when: e.period,
    })),
  }
}

export type CV = ReturnType<typeof cvContent>

// what the browser saves the download as
export const pdfFileName = `${data.personal.name.replace(/\s+/g, "-")}-CV.pdf`
