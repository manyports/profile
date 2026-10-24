import { data } from "@/data"

// the whole site as one markdown document, for AI agents and anything else that can't click through the app
export function siteMarkdown() {
  const { personal, about, education, experience, qualifications, projects, technologies, socials, photos } = data
  const lines: string[] = []
  const push = (...l: string[]) => lines.push(...l)

  push(
    `# ${personal.name}`,
    "",
    `> Software engineer based in ${personal.location}, focused on web development. Open to job opportunities and new projects.`,
    "",
    `This is a plain-text version of ${personal.website}, which is an interactive single-page site. Everything shown there is included below.`,
    "",
    "## Contact",
    "",
    `- Email: ${personal.email}`,
    `- Location: ${personal.location}`,
    `- Website: ${personal.website}`,
    ...socials.filter((s) => !s.url.startsWith("mailto:")).map((s) => `- ${s.platform}: [${s.username}](${s.url})`),
    "",
    "## About",
    "",
    ...about.flatMap((p) => [p, ""]),
    "## Projects",
    ""
  )

  for (const p of projects) {
    push(`### ${p.title} (${p.year})`, "", p.description, "", `- Technologies: ${p.technologies.join(", ")}`)
    if (p.link) push(`- Live: ${p.link}`)
    if (p.github) push(`- Source: ${p.github}`)
    push("")
  }

  push("## Experience", "")
  for (const e of experience) {
    push(`### ${e.title} — ${e.company}`, "", `${e.period} · ${e.location}`, "", e.description, "")
  }

  push("## Education", "")
  for (const e of education) {
    push(`- **${e.school}**${e.major ? `, ${e.major}` : ""} — ${e.location}, ${e.period}`)
  }

  push("", "## Honors & qualifications", "")
  for (const q of qualifications) {
    push(`- **${q.title}** (${q.date}): ${q.description}`)
  }

  push(
    "",
    "## Skills",
    "",
    `- Languages: ${technologies.languages.join(", ")}`,
    `- Tools: ${technologies.tools.join(", ")}`,
    "",
    "## Photos",
    ""
  )
  for (const p of photos) {
    push(`- [${p.caption}](${p.src}) — ${[p.location, p.year].filter(Boolean).join(", ")}`)
  }

  return lines.join("\n") + "\n"
}
