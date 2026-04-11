"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SlideInDirection = "left" | "right" | "up";

type SlideInProps = {
  /** Direction the content enters from. Defaults to "up" for general reveals. */
  from?: SlideInDirection;
  /** Zero-based index for staggered children. Cascades at 80ms per step, capped at 5. */
  index?: number;
  className?: string;
  children: React.ReactNode;
};

const STAGGER_STEP_MS = 80;
const STAGGER_MAX_STEPS = 5;

export function SlideIn({
  from = "up",
  index = 0,
  className,
  children,
}: SlideInProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const clampedIndex = Math.min(Math.max(index, 0), STAGGER_MAX_STEPS);
  const delayMs = clampedIndex * STAGGER_STEP_MS;

  return (
    <div
      ref={ref}
      data-visible={visible ? "true" : "false"}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        "opacity-0 transition-all duration-reveal ease-out-soft",
        "data-[visible=true]:opacity-100 data-[visible=true]:translate-x-0 data-[visible=true]:translate-y-0",
        from === "left" && "-translate-x-6",
        from === "right" && "translate-x-6",
        from === "up" && "translate-y-4",
        "motion-reduce:transition-none motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
