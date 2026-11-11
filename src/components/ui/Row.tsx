import React from "react";

export const mono = "tabular-nums text-xs";

// a soft tint that wipes in from the left; shown on hover, or held while `filled`
export function RowFill({ filled = false }: { filled?: boolean }) {
  return (
    <span
      aria-hidden
      className={[
        "absolute inset-0 bg-surface-hover transition-[clip-path] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
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
  // interactive rows get the soft hover fill; inverted (open) rows hold it
  interactive?: boolean;
  inverted?: boolean;
  trailing?: React.ReactNode;
}

// the shared row grammar: mono index · big title · mono meta
export function RowContent({ index, title, meta, interactive = false, inverted = false, trailing }: RowProps) {
  const lit = "";
  return (
    <>
      {interactive && <RowFill filled={inverted} />}
      {index !== undefined && (
        <span
          className={[
            "relative w-8 shrink-0 transition-colors duration-500",
            mono,
            "text-ink-muted",
          ].join(" ")}
        >
          {index}
        </span>
      )}
      <span
        className={[
          "relative flex-1 min-w-0 lowercase text-xl md:text-2xl font-medium tracking-[-0.03em] leading-tight transition-colors duration-500",
          "text-ink",
        ].join(" ")}
      >
        {title}
      </span>
      {meta !== undefined && (
        <span
          className={[
            "relative shrink-0 max-w-[45%] lowercase text-right transition-colors duration-500",
            mono,
            `text-ink-muted ${lit}`,
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
  "group relative w-full flex items-baseline gap-4 px-3 py-5 border-b border-line-strong text-left outline-none";

export function Row(props: Omit<RowProps, "interactive" | "inverted">) {
  return (
    <div className={rowClass}>
      <RowContent {...props} />
    </div>
  );
}

export function List({ children }: { children: React.ReactNode }) {
  return <div className="border-t border-line-strong">{children}</div>;
}
