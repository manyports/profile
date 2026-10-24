// an endless strip of big words; the list is rendered twice so the loop is seamless
export function Marquee({
  items,
  reverse = false,
  muted = false,
  separator = "/",
  speed = 6,
}: {
  items: string[]
  reverse?: boolean
  muted?: boolean
  separator?: string
  // seconds per item
  speed?: number
}) {
  const run = (hidden: boolean) => (
    <span aria-hidden={hidden} className="flex shrink-0">
      {items.map((item, i) => (
        <span key={i} className="flex items-baseline">
          <span className={muted ? "text-[#ccc] hover:text-black transition-colors duration-300" : ""}>{item}</span>
          <span className="text-[#ccc] px-[0.4em]">{separator}</span>
        </span>
      ))}
    </span>
  )

  return (
    <div className="marquee-track overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={["marquee whitespace-nowrap", reverse ? "marquee-reverse" : ""].join(" ")}
        style={{ "--marquee-duration": `${items.length * speed}s` } as React.CSSProperties}
      >
        {run(false)}
        {run(true)}
      </div>
    </div>
  )
}
