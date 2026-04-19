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

  const glitchTransition = React.useCallback((next: Theme) => {
    const canvas = document.createElement("canvas");
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    canvas.style.cssText = `position:fixed;inset:0;z-index:9999;pointer-events:none`;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d")!;

    const toMatrix = next === "matrix";
    const sliceColors = toMatrix
      ? ["#00e87a", "#00ff41", "#c8ffd4", "#ffffff", "#003a1a"]
      : ["#D4A017", "#ff9800", "#fff8e1", "#ffffff", "#3a2000"];

    let frame = 0;
    const totalFrames = 22;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const intensity = frame < totalFrames / 2
        ? frame / (totalFrames / 2)
        : 1 - (frame - totalFrames / 2) / (totalFrames / 2);

      const sliceCount = Math.floor(4 + intensity * 14);
      for (let i = 0; i < sliceCount; i++) {
        const y = Math.random() * H;
        const h = Math.random() * (H / 6) + 4;
        const offsetX = (Math.random() - 0.5) * 80 * intensity;
        const color = sliceColors[Math.floor(Math.random() * sliceColors.length)]!;
        const alpha = Math.random() * 0.55 * intensity + 0.05;
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(offsetX, y, W, h);
      }

      if (intensity > 0.3) {
        ctx.globalAlpha = 0.08 * intensity;
        ctx.fillStyle = toMatrix ? "#00e87a" : "#D4A017";
        ctx.fillRect((Math.random() - 0.5) * 20, 0, W, H);
        ctx.fillStyle = "#ff0044";
        ctx.fillRect((Math.random() - 0.5) * 20 + 4, 0, W, H);
      }

      ctx.globalAlpha = 1;
      frame++;

      if (frame === Math.floor(totalFrames * 0.5)) {
        setThemeState(next);
      }

      if (frame < totalFrames) {
        requestAnimationFrame(draw);
      } else {
        canvas.remove();
      }
    };

    requestAnimationFrame(draw);
  }, []);

  // ember <-> matrix toggle (the fixed bottom-right button)
  const toggle = React.useCallback(() => {
    if (theme === "matrix") {
      glitchTransition("ember");
    } else {
      glitchTransition("matrix");
    }
  }, [theme, glitchTransition]);

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
