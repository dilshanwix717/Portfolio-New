"use client";

import * as React from "react";

export type Theme = "ember" | "ember-light" | "matrix";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
  toggleMode: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "dw-theme";

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "ember";
  const attr = document.documentElement.dataset.theme as Theme | undefined;
  if (attr === "matrix" || attr === "ember" || attr === "ember-light") return attr;
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "matrix" || stored === "ember" || stored === "ember-light") return stored;
  } catch {}
  return "ember";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("ember");

  React.useEffect(() => {
    setThemeState(readInitialTheme());
  }, []);

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  const setTheme = React.useCallback((t: Theme) => setThemeState(t), []);

  const flashTransition = React.useCallback((color: string, next: Theme) => {
    const flash = document.createElement("div");
    flash.style.cssText = `position:fixed;inset:0;z-index:999;pointer-events:none;background:${color};opacity:0;transition:opacity .12s`;
    document.body.appendChild(flash);
    requestAnimationFrame(() => {
      flash.style.opacity = "0.12";
      window.setTimeout(() => {
        setThemeState(next);
        flash.style.opacity = "0";
        window.setTimeout(() => flash.remove(), 300);
      }, 120);
    });
  }, []);

  // ember <-> matrix toggle (the fixed bottom-right button)
  const toggle = React.useCallback(() => {
    if (theme === "matrix") {
      flashTransition("#D4A017", "ember");
    } else {
      flashTransition("#00E87A", "matrix");
    }
  }, [theme, flashTransition]);

  // ember <-> ember-light toggle (navbar button, hidden in matrix)
  const toggleMode = React.useCallback(() => {
    if (theme === "matrix") return;
    const next: Theme = theme === "ember" ? "ember-light" : "ember";
    const color = next === "ember-light" ? "#fdf8ef" : "#1c1610";
    flashTransition(color, next);
  }, [theme, flashTransition]);

  const value = React.useMemo(
    () => ({ theme, setTheme, toggle, toggleMode }),
    [theme, setTheme, toggle, toggleMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
