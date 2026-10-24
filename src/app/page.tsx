import ClientApp from "@/components/client-app"
import { siteMarkdown } from "@/lib/llms"

export default function Page() {
  return (
    <>
      <ClientApp />
      {/* never shown to people (they have JS); text extractors that skip scripts read this instead */}
      <noscript>
        <pre style={{ whiteSpace: "pre-wrap", padding: 24, fontFamily: "monospace" }}>{siteMarkdown()}</pre>
      </noscript>
    </>
  )
}
