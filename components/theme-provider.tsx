"use client";

import * as React from "react";

export type Theme = "ember" | "matrix";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "dw-theme";

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "ember";
  const attr = document.documentElement.dataset.theme;
  if (attr === "matrix" || attr === "ember") return attr;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "matrix" || stored === "ember") return stored;
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

  const toggle = React.useCallback(() => {
    const next: Theme = theme === "ember" ? "matrix" : "ember";
    const flash = document.createElement("div");
    flash.style.cssText = `position:fixed;inset:0;z-index:999;pointer-events:none;background:${
      theme === "ember" ? "#00E87A" : "#D4A017"
    };opacity:0;transition:opacity .12s`;
    document.body.appendChild(flash);
    requestAnimationFrame(() => {
      flash.style.opacity = "0.12";
      window.setTimeout(() => {
        setThemeState(next);
        flash.style.opacity = "0";
        window.setTimeout(() => flash.remove(), 300);
      }, 120);
    });
  }, [theme]);

  const value = React.useMemo(
    () => ({ theme, setTheme, toggle }),
    [theme, setTheme, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
