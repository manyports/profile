"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

interface Tab {
  key: string;
  label: string;
  content?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (key: string) => void;
  className?: string;
}

export function Tabs({ tabs, defaultTab, onChange, className = "" }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.key ?? "");
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [bar, setBar] = useState({ left: 0, width: 0, ready: false });
  const listRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const measureBar = (key: string) => {
    const btn = btnRefs.current[key];
    const list = listRef.current;
    if (!btn || !list) return;
    const lr = list.getBoundingClientRect();
    const br = btn.getBoundingClientRect();
    setBar({ left: br.left - lr.left, width: br.width, ready: true });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => { measureBar(active); }, []);
  useEffect(() => { measureBar(active); }, [active]);

  useEffect(() => {
    const ro = new ResizeObserver(() => measureBar(active));
    if (listRef.current) ro.observe(listRef.current);
    return () => ro.disconnect();
  }, [active]);

  const handleSelect = (key: string) => {
    const prevIndex = tabs.findIndex((t) => t.key === active);
    const nextIndex = tabs.findIndex((t) => t.key === key);
    setDirection(nextIndex > prevIndex ? "right" : "left");
    setActive(key);
    onChange?.(key);
  };

  const activeTab = tabs.find((t) => t.key === active);

  return (
    <div className={["flex flex-col", className].join(" ")}>
      <div
        ref={listRef}
        role="tablist"
        className="relative flex items-center gap-6 border-b border-black"
      >
        {bar.ready && (
          <span
            aria-hidden
            className="absolute -bottom-px h-[3px] bg-black pointer-events-none"
            style={{
              left: bar.left,
              width: bar.width,
              transition: "left 450ms cubic-bezier(0.76,0,0.24,1), width 450ms cubic-bezier(0.76,0,0.24,1)",
            }}
          />
        )}

        {tabs.map((tab) => (
          <button
            key={tab.key}
            ref={(el) => { btnRefs.current[tab.key] = el; }}
            role="tab"
            aria-selected={active === tab.key}
            onClick={() => handleSelect(tab.key)}
            className={[
              "relative py-3 font-[family-name:var(--font-geist-mono)] text-xs whitespace-nowrap cursor-pointer transition-colors duration-200",
              active === tab.key ? "text-black" : "text-[#999] hover:text-black",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab?.content && (
        <div
          key={active}
          role="tabpanel"
          className={[
            "text-[15px] text-black leading-relaxed",
            direction === "right" ? "animate-tab-slide-right" : "animate-tab-slide-left",
          ].join(" ")}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
}
