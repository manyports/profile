import path from "node:path"
import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer"
import type { CV } from "./content"

// the same Geist the site uses, read from the geist package at build time (the pdf route is static)
const fonts = path.join(process.cwd(), "node_modules/geist/dist/fonts")
Font.register({
  family: "Geist",
  fonts: [
    { src: `${fonts}/geist-sans/Geist-Regular.ttf`, fontWeight: 400 },
    { src: `${fonts}/geist-sans/Geist-Medium.ttf`, fontWeight: 500 },
    { src: `${fonts}/geist-sans/Geist-SemiBold.ttf`, fontWeight: 600 },
  ],
})
Font.register({ family: "GeistMono", src: `${fonts}/geist-mono/GeistMono-Regular.ttf` })
// react-pdf hyphenates by default, which splits "TypeScript" and urls mid-word
Font.registerHyphenationCallback((word) => [word])

const ink = "#111111"
const body = "#2b2b2b"
const muted = "#6b6b6b"
const rule = "#d9d9d9"

const s = StyleSheet.create({
  page: { fontFamily: "Geist", fontSize: 9, lineHeight: 1.37, color: body, paddingTop: 28, paddingBottom: 22, paddingHorizontal: 36 },
  mono: { fontFamily: "GeistMono", fontSize: 7.6, color: muted },

  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 6 },
  name: { fontSize: 22, fontWeight: 600, color: ink, letterSpacing: -0.6, lineHeight: 1 },
  role: { fontSize: 10.5, color: muted, marginTop: 5 },
  contacts: { alignItems: "flex-end", gap: 1.5 },
  contact: { fontFamily: "GeistMono", fontSize: 7.8, color: body, textDecoration: "none" },

  section: { marginTop: 8.5 },
  sectionTitle: {
    fontFamily: "GeistMono",
    fontSize: 7.2,
    letterSpacing: 1.2,
    color: muted,
    textTransform: "uppercase",
    paddingBottom: 3,
    marginBottom: 5,
    borderBottomWidth: 0.75,
    borderColor: ink,
  },

  entry: { marginBottom: 5 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", gap: 12 },
  titleLine: { flexDirection: "row", alignItems: "baseline", flexWrap: "wrap", flex: 1, gap: 6 },
  title: { fontSize: 10, fontWeight: 600, color: ink },
  tagline: { fontSize: 9, color: muted },
  link: { fontFamily: "GeistMono", fontSize: 7.4, color: muted, textDecoration: "underline" },
  when: { fontFamily: "GeistMono", fontSize: 7.6, color: muted },

  bullets: { marginTop: 2, gap: 0.4 },
  bullet: { flexDirection: "row", alignItems: "flex-start" },
  // a drawn dot: Geist's • glyph sits too small and low at this size
  dot: { width: 2.6, height: 2.6, borderRadius: 1.3, backgroundColor: "#9a9a9a", marginTop: 4.9, marginLeft: 1, marginRight: 6 },
  bulletText: { flex: 1 },

  // one per line, newest first: two columns scramble in ats parsers
  award: { marginBottom: 1.5 },

  skill: { flexDirection: "row", marginBottom: 1.5 },
  skillLabel: { width: 62, fontWeight: 600, color: ink },
})

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={s.section}>
      {/* keep a heading from being stranded at the bottom of a page */}
      <Text style={s.sectionTitle} minPresenceAhead={40}>
        {title}
      </Text>
      {children}
    </View>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <View style={s.bullets}>
      {items.map((b) => (
        <View key={b} style={s.bullet}>
          <View style={s.dot} />
          <Text style={s.bulletText}>{b}</Text>
        </View>
      ))}
    </View>
  )
}

export function CVDocument({ cv }: { cv: CV }) {
  return (
    <Document title={`${cv.name} CV`} author={cv.name} subject={cv.title} keywords={cv.skills.flatMap((k) => k.items).join(", ")}>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View>
            <Text style={s.name}>{cv.name}</Text>
            <Text style={s.role}>
              {cv.title} · {cv.location}
            </Text>
          </View>
          <View style={s.contacts}>
            {cv.contacts.map((c) => (
              <Link key={c.href} src={c.href} style={s.contact}>
                {c.label}
              </Link>
            ))}
          </View>
        </View>

        <Section title="Summary">
          <Text>{cv.summary}</Text>
        </Section>

        <Section title="Selected projects">
          {cv.projects.map((p) => (
            <View key={p.title} style={s.entry} wrap={false}>
              <View style={s.row}>
                <View style={s.titleLine}>
                  <Text style={s.title}>{p.title}</Text>
                  <Text style={s.tagline}>{p.tagline}</Text>
                  {p.links.map((l) => (
                    <Link key={l.href} src={l.href} style={s.link}>
                      {l.label}
                    </Link>
                  ))}
                </View>
                <Text style={s.when}>{p.year}</Text>
              </View>
              <Text style={s.mono}>{p.stack.join(" · ")}</Text>
              <Bullets items={p.highlights} />
            </View>
          ))}
        </Section>

        <Section title="Experience">
          {cv.experience.map((e) => (
            <View key={e.title} style={s.entry} wrap={false}>
              <View style={s.row}>
                <View style={s.titleLine}>
                  <Text style={s.title}>{e.title}</Text>
                  <Text style={s.tagline}>
                    {e.company} · {e.location}
                  </Text>
                </View>
                <Text style={s.when}>{e.period}</Text>
              </View>
              <Bullets items={e.highlights} />
            </View>
          ))}
        </Section>

        <Section title="National hackathons & awards">
          {cv.awards.map((a) => (
            <View key={a.title} style={[s.row, s.award]} wrap={false}>
              <Text style={{ flex: 1 }}>
                <Text style={{ fontWeight: 600, color: ink }}>{a.title}</Text>
                <Text style={{ color: muted }}> · {a.detail}</Text>
              </Text>
              <Text style={s.when}>{a.when}</Text>
            </View>
          ))}
        </Section>

        <Section title="Skills">
          {cv.skills.map((k) => (
            <View key={k.label} style={s.skill}>
              <Text style={s.skillLabel}>{k.label}</Text>
              <Text style={{ flex: 1 }}>{k.items.join(", ")}</Text>
            </View>
          ))}
        </Section>

        <Section title="Education">
          {cv.education.map((e) => (
            <View key={e.school} style={s.row}>
              <Text style={{ flex: 1 }}>
                <Text style={{ fontWeight: 600, color: ink }}>{e.school}</Text>
                <Text style={{ color: muted }}> · {e.detail}</Text>
              </Text>
              <Text style={s.when}>{e.when}</Text>
            </View>
          ))}
        </Section>
      </Page>
    </Document>
  )
}
