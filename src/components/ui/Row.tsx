import React from "react";

export const mono = "font-[family-name:var(--font-geist-mono)] text-xs";

// black fill that wipes in from the left; shown on hover, or held while `filled`
export function RowFill({ filled = false }: { filled?: boolean }) {
  return (
    <span
      aria-hidden
      className={[
        "absolute inset-0 bg-black transition-[clip-path] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
        filled
          ? "[clip-path:inset(0_0_0_0)]"
          : "[clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:[clip-path:inset(0_0_0_0)]",
      ].join(" ")}
    />
  );
}

interface RowProps {
  index?: React.ReactNode;
  title: React.ReactNode;
  meta?: React.ReactNode;
  // interactive rows get the black hover fill; inverted rows hold it
  interactive?: boolean;
  inverted?: boolean;
  trailing?: React.ReactNode;
}

// the shared row grammar: mono index · big title · mono meta
export function RowContent({ index, title, meta, interactive = false, inverted = false, trailing }: RowProps) {
  const lit = interactive ? "group-hover:text-white group-focus-visible:text-white" : "";
  return (
    <>
      {interactive && <RowFill filled={inverted} />}
      {index !== undefined && (
        <span
          className={[
            "relative w-8 shrink-0 transition-colors duration-500",
            mono,
            inverted ? "text-white/60" : `text-[#999] ${interactive ? "group-hover:text-white/60 group-focus-visible:text-white/60" : ""}`,
          ].join(" ")}
        >
          {index}
        </span>
      )}
      <span
        className={[
          "relative flex-1 min-w-0 text-xl md:text-2xl font-medium tracking-[-0.03em] leading-tight transition-colors duration-500",
          inverted ? "text-white" : lit,
        ].join(" ")}
      >
        {title}
      </span>
      {meta !== undefined && (
        <span
          className={[
            "relative shrink-0 max-w-[45%] text-right transition-colors duration-500",
            mono,
            inverted ? "text-white" : `text-[#999] ${lit}`,
          ].join(" ")}
        >
          {meta}
        </span>
      )}
      {trailing}
    </>
  );
}

export const rowClass =
  "group relative w-full flex items-baseline gap-4 px-3 py-5 border-b border-[#e5e5e5] text-left outline-none";

export function Row(props: Omit<RowProps, "interactive" | "inverted">) {
  return (
    <div className={rowClass}>
      <RowContent {...props} />
    </div>
  );
}

export function List({ children }: { children: React.ReactNode }) {
  return <div className="border-t border-black">{children}</div>;
}
