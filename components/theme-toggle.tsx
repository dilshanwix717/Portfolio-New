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
      className={isMatrix ? undefined : "enter-matrix"}
      aria-label={isMatrix ? "Switch to Ember theme" : "Enter the Matrix"}
    >
      {isMatrix ? (
        <span className="toggle-icon" aria-hidden="true">&#x25C4;</span>
      ) : (
        <span className="toggle-cursor" aria-hidden="true">&gt;_</span>
      )}
      <span>{isMatrix ? "EXIT THE MATRIX" : "ENTER THE MATRIX"}</span>
    </button>
  );
}
