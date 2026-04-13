"use client";

import * as React from "react";
import { interestsContent } from "@/data/interests";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function Interests() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  return (
    <section id="interests" aria-labelledby="interests-heading" className="py-16 md:py-24">
      <Reveal>
        <h2
          id="interests-heading"
          className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          {interestsContent.label}
        </h2>
      </Reveal>

      <div role="list" className="mt-10 divide-y divide-border">
        {interestsContent.items.map((item, i) => (
          <InterestRow
            key={item.label}
            item={item}
            index={i}
            isActive={activeIndex === i}
            isAnyActive={activeIndex !== null}
            onEnter={() => setActiveIndex(i)}
            onLeave={() => setActiveIndex(null)}
          />
        ))}
      </div>
    </section>
  );
}

function InterestRow({
  item,
  index,
  isActive,
  isAnyActive,
  onEnter,
  onLeave,
}: {
  item: { label: string; tags: readonly string[]; roles: readonly string[] };
  index: number;
  isActive: boolean;
  isAnyActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <Reveal delay={index * 120}>
      <div
        role="listitem"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className={cn(
          "cursor-default py-6 transition-opacity duration-300 ease-out-soft",
          isAnyActive && !isActive && "opacity-40",
        )}
      >
        {/* Top row — number + title inline */}
        <div className="flex items-baseline gap-4">
          <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground/50">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className={cn(
              "font-serif text-2xl font-medium leading-tight transition-colors duration-200 ease-out-soft md:text-3xl",
              isActive ? "text-accent" : "text-foreground",
            )}
          >
            {item.label}
          </h3>
        </div>

        {/* Expandable content — roles + tags */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out-soft",
            isActive ? "max-h-[200px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0",
          )}
        >
          <div className="pl-10 md:pl-12 space-y-3">
            <ul role="list" className="space-y-1.5">
              {item.roles.map((role) => (
                <li
                  key={role}
                  className="flex items-baseline gap-2.5 text-sm leading-relaxed text-muted-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="relative top-[-1px] h-1 w-1 shrink-0 rounded-full bg-accent"
                  />
                  {role}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
