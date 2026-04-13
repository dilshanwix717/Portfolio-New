"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function LoadingScreen() {
  const [phase, setPhase] = React.useState<"visible" | "exiting" | "done">(
    "visible",
  );

  React.useEffect(() => {
    // Show logo briefly, then start exit
    const exitTimer = setTimeout(() => setPhase("exiting"), 1200);
    // Remove from DOM after exit transition completes
    const doneTimer = setTimeout(() => setPhase("done"), 1900);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-700 ease-out-soft",
        phase === "exiting" && "opacity-0",
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center gap-4 transition-all duration-700 ease-out-soft",
          phase === "visible"
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0",
        )}
      >
        {/* Logo mark */}
        <span className="font-serif text-5xl font-medium tracking-[-0.04em] text-accent animate-logo-in">
          DW
        </span>
        {/* Accent line */}
        <span className="h-px w-12 bg-accent/60 animate-line-expand" />
      </div>
    </div>
  );
}
