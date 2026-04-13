"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  /** Additional delay in ms for staggering siblings. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Lightweight scroll-triggered reveal. Fades in and slides up when the element
 * enters the viewport. Uses IntersectionObserver — fires once, then disconnects.
 */
export function Reveal({
  delay = 0,
  className,
  children,
  as: Tag = "div",
}: RevealProps) {
  const nodeRef = React.useRef<Element | null>(null);
  const [visible, setVisible] = React.useState(false);

  const setRef = React.useCallback((el: HTMLDivElement | HTMLLIElement | HTMLElement | null) => {
    nodeRef.current = el;
  }, []);

  React.useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={setRef as any}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "transition-all duration-reveal ease-out-soft",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-5 opacity-0",
        "motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
