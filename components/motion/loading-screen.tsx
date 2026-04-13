"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { VaraText } from "./vara-text";

export function LoadingScreen() {
  const [phase, setPhase] = React.useState<"writing" | "exiting" | "done">(
    "writing",
  );

  const handleAnimationEnd = React.useCallback(() => {
    // Brief pause after handwriting finishes, then exit
    const exitTimer = window.setTimeout(() => setPhase("exiting"), 400);
    const doneTimer = window.setTimeout(() => setPhase("done"), 1100);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  // Fallback: if vara animation never fires callback, exit after timeout
  React.useEffect(() => {
    const fallback = window.setTimeout(() => {
      setPhase((p) => (p === "writing" ? "exiting" : p));
    }, 3500);
    const fallbackDone = window.setTimeout(() => {
      setPhase("done");
    }, 4200);
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
          "relative z-10 flex flex-col items-center gap-4 transition-all duration-700 ease-out-soft",
          phase === "writing"
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0",
        )}
      >
        <VaraText
          text="Dilshan Wickramasinghe"
          fontSize={36}
          strokeWidth={0.5}
          color="hsl(var(--accent))"
          duration={3000}
          onAnimationEnd={handleAnimationEnd}
          className="vara-handwriting"
        />
      </div>
    </div>
  );
}
