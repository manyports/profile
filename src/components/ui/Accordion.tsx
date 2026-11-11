"use client";

import { useState, useCallback, ReactNode } from "react";
import { RowContent, rowClass } from "./Row";

interface AccordionItem {
  key: string;
  index?: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  content: ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openKeys, setOpenKeys] = useState<Set<string>>(() => {
    const defaults = new Set<string>();
    for (const item of items) {
      if (item.defaultOpen) {
        defaults.add(item.key);
      }
    }
    return defaults;
  });

  const toggle = useCallback(
    (key: string) => {
      setOpenKeys((prev) => {
        const next = new Set(prev);
        if (next.has(key)) {
          next.delete(key);
        } else {
          if (!allowMultiple) next.clear();
          next.add(key);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  return (
    <div className={["border-t border-line-strong", className].filter(Boolean).join(" ")}>
      {items.map((item) => {
        const isOpen = openKeys.has(item.key);

        return (
          <div key={item.key}>
            <button
              type="button"
              onClick={() => toggle(item.key)}
              aria-expanded={isOpen}
              className={[rowClass, "cursor-pointer", ""].join(" ")}
            >
              <RowContent
                index={item.index}
                title={item.title}
                meta={item.meta}
                interactive
                inverted={isOpen}
                trailing={
                  <span aria-hidden className="relative w-2.5 h-2.5 shrink-0 self-center">
                    <span
                      className={[
                        "absolute inset-x-0 top-1/2 h-px transition-colors duration-500",
                        "bg-ink",
                      ].join(" ")}
                    />
                    <span
                      className={[
                        "absolute inset-y-0 left-1/2 w-px transition-colors duration-500",
                        "bg-ink",
                      ].join(" ")}
                      style={{
                        transition: "transform 400ms cubic-bezier(0.76, 0, 0.24, 1), background-color 500ms",
                        transform: isOpen ? "scaleY(0)" : "scaleY(1)",
                      }}
                    />
                  </span>
                }
              />
            </button>

            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 500ms cubic-bezier(0.76, 0, 0.24, 1)",
              }}
            >
              <div className="overflow-hidden">
                <div
                  className={[
                    "px-3 py-6 border-b border-line-strong text-[15px] text-ink-body leading-relaxed",
                    item.index !== undefined ? "pl-[3.75rem]" : "",
                  ].join(" ")}
                  style={{
                    transition: "opacity 300ms ease, transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0)" : "translateY(-6px)",
                  }}
                >
                  <div className="max-w-lg lowercase">{item.content}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
