import { SectionLabel } from "@/components/section-label"
import { mono } from "@/components/ui/Row"

// the big "what's happening right now" line at the top of each page
export function Now({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <div className="space-y-4">
      <SectionLabel>{label}</SectionLabel>
      <p className="text-4xl md:text-5xl font-medium tracking-[-0.045em] leading-[1.05]">{title}</p>
      {sub && <p className={`${mono} text-[#999] max-w-md leading-relaxed`}>{sub}</p>}
    </div>
  )
}
