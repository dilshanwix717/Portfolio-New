"use client";

import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isMatrix = theme === "matrix";

  return (
    <button
      id="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={isMatrix ? "Switch to Ember theme" : "Switch to Matrix theme"}
    >
      <span className="toggle-icon" aria-hidden="true">
        {isMatrix ? "\u25C4" : "\u2B21"}
      </span>
      <span>{isMatrix ? "EXIT THE MATRIX" : "ENTER THE MATRIX"}</span>
    </button>
  );
}
