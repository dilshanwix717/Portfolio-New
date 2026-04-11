import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        // Raw palette — static hex, accessible by name
        cream: "#FAF6EE",
        parchment: "#F0E8D4",
        gold: "#D4A017",
        ink: "#1A1710",
        brown: "#5C4F2A",
        sand: "#C8B88A",
        violet: "#7C3AED",
        charcoal: "#0E0C08",
        charcoal_card: "#181410",
        charcoal_border: "#2A2210",
        gold_pale: "#F5DFA0",
        gold_muted: "#4A3C10",

        // Semantic tokens — theme-switchable via CSS vars
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        detail: "hsl(var(--detail))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-1": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-2": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-3": ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionDuration: {
        hover: "200ms",
        base: "300ms",
        reveal: "600ms",
      },
      transitionTimingFunction: {
        // Smooth decelerating curve — no overshoot, no bounce.
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "reveal-up": {
          from: { opacity: "0", transform: "translateY(1rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms cubic-bezier(0.22, 1, 0.36, 1)",
        "fade-out": "fade-out 200ms cubic-bezier(0.22, 1, 0.36, 1)",
        "reveal-up":
          "reveal-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
