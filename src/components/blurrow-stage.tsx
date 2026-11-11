"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Badge, Button, Card, Input, RadioCards, Separator, Spinner, Tabs, Toggle, useToast } from "@blurrow/ui"
import { mono } from "@/components/ui/Row"

const soft = [0.16, 1, 0.3, 1] as const
const draw = (delay = 0, duration = 0.6) => ({
  initial: { pathLength: 0 },
  whileInView: { pathLength: 1 },
  viewport: { once: true, margin: "0px 0px -15% 0px" },
  transition: { duration, ease: soft, delay },
})

const hand = "font-[family-name:var(--font-hand)] text-ink-label"
const pencil = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

// a pencil arrow, drawn in when it scrolls into view; it points right unless flipped
function Arrow({ flip = false, bend = 1, delay = 0 }: { flip?: boolean; bend?: number; delay?: number }) {
  return (
    <svg viewBox="0 0 84 40" aria-hidden className={`h-8 w-12 shrink-0 text-ink-label ${flip ? "-scale-x-100" : ""}`} {...pencil}>
      <motion.path d={`M3 ${20 + 12 * bend} C 22 ${20 - 10 * bend}, 50 ${22 - 14 * bend}, 78 ${19 + bend}`} {...draw(delay)} />
      <motion.path d="M70 12.5 L78.5 19.5 L69 24.5" {...draw(delay + 0.5, 0.2)} />
    </svg>
  )
}

function Frame({ fig, title, aside, children }: { fig: string; title: string; aside?: string; children: React.ReactNode }) {
  return (
    <figure className="space-y-3">
      <div className="relative overflow-hidden border border-ink/10">{children}</div>
      <figcaption className={`${mono} flex justify-between gap-4 text-ink-muted`}>
        <span>
          fig. {fig} · {title}
        </span>
        {aside && <span className="text-right">{aside}</span>}
      </figcaption>
    </figure>
  )
}

const label = { className: "font-[family-name:var(--font-hand)]", fill: "currentColor", stroke: "none" }

// fig. 01: one key, taken apart. the real key in the middle, notes pointing at its parts.
function KeyExploded() {
  return (
    <Frame fig="01" title="one key, taken apart" aside="hover it. press it. hold it down.">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(var(--dots) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          maskImage: "radial-gradient(60% 70% at 50% 45%, black, transparent)",
          WebkitMaskImage: "radial-gradient(60% 70% at 50% 45%, black, transparent)",
        }}
      />

      <div className="relative px-6 pb-10 pt-8">
        {/* the lamp: one light, overhead */}
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 120 70" aria-hidden className="h-16 w-28 text-ink-label" {...pencil}>
            <motion.path d="M60 2 V14" {...draw(0.05, 0.3)} />
            <motion.path d="M44 14 H76 L86 32 H34 Z" {...draw(0.15, 0.5)} />
            <motion.path d="M48 42 L40 60 M60 44 V64 M72 42 L80 60" strokeDasharray="3 4" {...draw(0.5, 0.5)} />
          </svg>
          <p className={`${hand} -mt-1 text-[21px]`}>one lamp, straight overhead</p>
        </div>

        <div className="mt-6 grid items-center gap-y-6 md:grid-cols-[1fr_auto_1fr] md:gap-x-1">
          <div className="hidden items-center justify-end gap-0.5 md:flex">
            <p className={`${hand} max-w-[13ch] -rotate-2 text-right text-[18px] leading-[1.05]`}>
              the face. it lifts a pixel when you hover, and sinks flush when you press
            </p>
            <Arrow bend={0.5} delay={0.7} />
          </div>

          {/* the real key */}
          <div className="flex justify-center py-4">
            <Button size="lg" className="w-40">
              press me
            </Button>
          </div>

          <div className="hidden items-center gap-0.5 md:flex">
            <Arrow flip bend={-0.5} delay={0.85} />
            <p className={`${hand} max-w-[13ch] rotate-2 text-[18px] leading-[1.05]`}>the bezel. the frame it sits in. it never moves</p>
          </div>
        </div>

        {/* the same key, drawn in pencil as a cross-section */}
        <div className="mx-auto mt-10 max-w-md border-t border-ink/10 pt-6">
          <svg viewBox="0 0 340 110" className="w-full text-ink-label" role="img" aria-label="cross-section: a face resting in a bezel, lit from above" {...pencil}>
            <defs>
              <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
              </pattern>
            </defs>
            {/* bezel: a hatched tray */}
            <motion.path d="M70 46 Q70 40 76 40 H264 Q270 40 270 46 V74 Q270 82 262 82 H78 Q70 82 70 74 Z" fill="url(#hatch)" {...draw(0.2, 0.9)} />
            {/* face: resting in it, lifted 1px */}
            <motion.path d="M82 36 Q82 30 88 30 H252 Q258 30 258 36 V64 Q258 70 252 70 H88 Q82 70 82 64 Z" fill="var(--page)" {...draw(0.6, 0.8)} />
            {/* the highlight lives on the top edge */}
            <motion.path d="M92 33.5 H248" strokeWidth="2.4" opacity="0.35" {...draw(1.1, 0.4)} />
            <motion.path d="M168 13 C 170 19, 168 24, 170 29" {...draw(1.2, 0.3)} />
            <text x="152" y="11" fontSize="17" {...label}>
              face
            </text>
            <motion.path d="M290 60 C 282 62, 278 64, 271 66" {...draw(1.3, 0.3)} />
            <text x="292" y="62" fontSize="17" {...label}>
              bezel
            </text>
            <motion.path d="M56 30 V36 M52 30 H60 M52 36 H60" strokeWidth="1.1" {...draw(1.4, 0.3)} />
            <text x="22" y="37" fontSize="17" {...label}>
              1px
            </text>
            <text x="122" y="104" fontSize="16" opacity="0.7" {...label}>
              the shadow falls down
            </text>
          </svg>
        </div>
      </div>
    </Frame>
  )
}

const docs = (part: string) => `https://www.blurrow.org/docs/components/${part}`

// a sunken compartment holding one part, its name lettered bottom-left and linked to its docs
function Compartment({ part, name, className = "", children }: { part: string; name: string; className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`relative flex min-w-0 flex-col p-4 pb-10 sm:p-5 sm:pb-11 ${className}`}
      // warm, like the paper around it, with the kit's own inset shadow
      style={{ background: "var(--surface-hover)", boxShadow: "var(--well-shadow)" }}
    >
      <div className="flex flex-1 flex-col justify-center">{children}</div>
      <a
        href={docs(part)}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3.5 left-5 text-[11px] font-medium tracking-[0.06em] text-ink-faint transition-colors hover:text-ink"
        style={{ textShadow: "var(--emboss-soft)" }}
      >
        {name}
      </a>
    </div>
  )
}

const plans = [
  { value: "free", label: "free", description: "every part, mit licensed", aside: "$0" },
  { value: "pro", label: "pro", description: "for one person shipping things", aside: "$12 / mo" },
  { value: "team", label: "team", description: "for a few people, one design", aside: "$29 / mo" },
]

// fig. 02: a few parts in a case, wired together. pick a plan, the card follows; subscribe, the key spins.
function PartsCase() {
  const [plan, setPlan] = useState("pro")
  const [email, setEmail] = useState("")
  const [busy, setBusy] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { toast } = useToast()
  const picked = plans.find((p) => p.value === plan) ?? plans[0]

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  const subscribe = () => {
    if (busy) return
    setBusy(true)
    timer.current = setTimeout(() => {
      setBusy(false)
      toast({
        title: `you're on ${picked.label}`,
        description: email.trim() ? `we sent it to ${email.trim()}.` : "we sent it to ada@example.com.",
        variant: "success",
      })
    }, 1400)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText("npx @blurrow/ui init")
      toast({ title: "copied", description: "npx @blurrow/ui init", variant: "success" })
    } catch {}
  }

  return (
    <Frame fig="02" title="a few parts, one case" aside="made-up pricing, to show the parts. blurrow itself is free">
      <div className="relative grid gap-2 p-2 sm:grid-cols-2 sm:p-3">
        <Compartment part="radio-cards" name="radio cards" className="">
          <RadioCards label="plan" options={plans} value={plan} onChange={setPlan} />
          <p className={`${hand} mt-3 hidden -rotate-1 text-[18px] sm:block`}>pick one. the raised card slides over to it →</p>
        </Compartment>

        <Compartment part="card" name="card" className="">
          <Card
            layout="stack"
            title={`${picked.label} plan`}
            badge={<Badge variant={plan === "free" ? "muted" : "accent"}>{picked.aside}</Badge>}
            subtitle={picked.description}
            // the card's picture slot shows the price, set big, on the kit's media well
            image={
              <span className="flex h-full w-full items-end p-6" style={{ background: "var(--media-well)" }}>
                <span className="text-[56px] font-medium leading-none tracking-[-0.05em] text-ink tabular-nums">
                  {picked.aside.split(" / ")[0]}
                  {picked.aside.includes("/") && <span className="ml-1 text-[18px] tracking-normal text-ink-muted">/ mo</span>}
                </span>
              </span>
            }
            note="follows whatever you pick on the left."
          />
        </Compartment>

        <Compartment part="input" name="input · button · spinner · separator" className="sm:col-span-2">
          <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto]">
            <Input
              label="email"
              type="email"
              placeholder="ada@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              layered
              fullWidth
            />
            <Button size="lg" onClick={subscribe} aria-busy={busy} className="sm:w-48">
              {busy ? (
                <>
                  <Spinner size="sm" label="subscribing" />
                  subscribing
                </>
              ) : (
                `subscribe to ${picked.label}`
              )}
            </Button>
          </div>
          <p className={`${hand} mt-2 hidden rotate-1 text-right text-[18px] sm:block`}>press it. a spinner sits in the key while it works ↑</p>
          <Separator label="or" className="my-4" />
          <Button variant="secondary" fullWidth onClick={copy}>
            take the source: npx @blurrow/ui init
          </Button>
        </Compartment>
      </div>
    </Frame>
  )
}

// fig. 03: the same live parts in both finishes. the dark half is the kit's own dark material.
function TwoFinishes() {
  const [on, setOn] = useState(true)
  const [name, setName] = useState("")
  const half = (
    <div className="mx-auto flex w-full max-w-[240px] flex-col gap-4">
      <Input placeholder="ada" aria-label="display name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
      <Toggle label="notifications" checked={on} onChange={setOn} />
      <Button fullWidth>save</Button>
    </div>
  )

  return (
    <Frame fig="03" title="same parts, two finishes" aside="type or flip on either side. they're wired together">
      <div className="grid sm:grid-cols-2">
        <div className="relative bg-page px-6 py-12">
          <p className={`${hand} mb-5 text-center text-[20px]`}>light</p>
          {half}
        </div>
        {/* data-theme scopes the kit's dark tokens to this half only */}
        <div data-theme="dark" className="relative bg-page px-6 py-12">
          <p className={`${hand} mb-5 text-center text-[20px]`}>dark. same objects, darker materials</p>
          {half}
        </div>
      </div>
    </Frame>
  )
}

// blurrow, folded away until you ask for it: one row, then one figure at a time
export function BlurrowStage() {
  const [open, setOpen] = useState(false)
  // mounted from the first open on, so closing folds it away instead of emptying it first
  const [seen, setSeen] = useState(false)
  const { toast } = useToast()
  const command = "npx @blurrow/ui init"
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      toast({ title: "copied", description: "paste it in your project and you're set up.", variant: "success" })
    } catch {}
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setSeen(true)
          setOpen((o) => !o)
        }}
        aria-expanded={open}
        className="group relative flex w-full items-center justify-between gap-4 border-y border-line-strong px-3 py-4 text-left outline-none cursor-pointer"
      >
        <span aria-hidden className="absolute inset-0 bg-surface-hover opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
        <span className="relative">
          <span className="block text-[17px] font-medium tracking-[-0.02em] text-ink">take a look inside</span>
          <span className={`${mono} block text-ink-muted`}>how a key is made, a few parts working together, two finishes</span>
        </span>
        <span aria-hidden className="relative text-ink-muted transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" style={{ transform: open ? "rotate(45deg)" : "none" }}>
          +
        </span>
      </button>

      <div
        style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 500ms cubic-bezier(0.76, 0, 0.24, 1)" }}
      >
        <div className="overflow-hidden">
          {/* mounted on first open, so its drawings start when you open it */}
          {seen && (
            <div className="space-y-6 pt-6">
              <div>
                <Tabs
                  tabs={[
                    { key: "key", label: "the key", content: <div className="pt-5"><KeyExploded /></div> },
                    { key: "parts", label: "the parts", content: <div className="pt-5"><PartsCase /></div> },
                    { key: "finishes", label: "two finishes", content: <div className="pt-5"><TwoFinishes /></div> },
                  ]}
                />
              </div>
              <div className={`${mono} flex items-center justify-between gap-4 border border-line-strong px-4 py-3`}>
                <code className="truncate text-ink">
                  <span className="select-none text-ink-faint">$ </span>
                  {command}
                </code>
                <button type="button" onClick={copy} className="shrink-0 cursor-pointer text-ink-muted transition-colors hover:text-ink">
                  copy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
