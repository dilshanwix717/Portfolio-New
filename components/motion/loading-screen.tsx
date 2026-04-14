"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { VaraText } from "./vara-text";

export function LoadingScreen() {
  const [phase, setPhase] = React.useState<"writing" | "exiting" | "done">(
    "writing",
  );

  const handleAnimationEnd = React.useCallback(() => {
    // Wait for the flourish + dot to finish, then exit
    // Flourish starts 200ms after handwriting ends, draws for 1800ms,
    // then dot fades in over 400ms — total ~2400ms after this callback
    const exitTimer = window.setTimeout(() => setPhase("exiting"), 1800);
    const doneTimer = window.setTimeout(() => setPhase("done"), 3000);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  // Fallback: if vara animation never fires callback, exit after timeout
  React.useEffect(() => {
    const fallback = window.setTimeout(() => {
      setPhase((p) => (p === "writing" ? "exiting" : p));
    }, 6000);
    const fallbackDone = window.setTimeout(() => {
      setPhase("done");
    }, 6700);
    return () => {
      window.clearTimeout(fallback);
      window.clearTimeout(fallbackDone);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-700 ease-out-soft",
        phase === "exiting" && "opacity-0",
      )}
    >
      <div
        className={cn(
          "relative z-10 flex flex-col items-center gap-2 transition-all duration-700 ease-out-soft",
          phase === "writing"
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0",
        )}
      >
        {/* "portfolio of" prefix — fades in first */}
        <span className="loading-prefix font-serif italic text-sm tracking-[0.25em] text-muted-foreground lowercase">
          portfolio of
        </span>

        {/* Handwritten signature */}
        <VaraText
          text="Dilshan Wickramasinghe"
          fontSize={36}
          strokeWidth={0.5}
          color="hsl(var(--accent))"
          duration={3000}
          onAnimationEnd={handleAnimationEnd}
          className="vara-handwriting"
        />

        {/* Curved gold flourish with dot at the end */}
        <svg
          viewBox="0 0 300 24"
          className="h-auto w-[min(60vw,300px)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            className="loading-flourish-line"
            d="M 10 14 Q 60 2 150 12 T 280 14"
            stroke="hsl(var(--accent))"
            strokeWidth="1.25"
            strokeLinecap="round"
            fill="none"
          />
          <circle
            className="loading-flourish-dot"
            cx="290"
            cy="10"
            r="2.2"
            fill="hsl(var(--accent))"
          />
        </svg>
      </div>
    </div>
  );
}
