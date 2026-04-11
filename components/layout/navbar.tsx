"use client";

import * as React from "react";
import Link from "next/link";
import { navItems, type NavItem } from "@/data/nav";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 8;

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  // Scroll listener — toggles the border once past threshold.
  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Theme hydration — read persisted theme after mount to avoid SSR mismatch.
  React.useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const initial: "light" | "dark" =
      stored === "light" || stored === "dark" ? stored : "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    setMounted(true);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      window.localStorage.setItem("theme", next);
      return next;
    });
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background transition-colors duration-base ease-out-soft",
        scrolled ? "border-border" : "border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-[0.2em] text-foreground"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-5 md:gap-8">
            {navItems.map((item) => (
              <li key={item.href} className="hidden md:inline-flex">
                <NavLink href={item.href} label={item.label} />
              </li>
            ))}
            <li>
              <ThemeToggle
                theme={theme}
                mounted={mounted}
                onToggle={toggleTheme}
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, label }: NavItem) {
  return (
    <Link
      href={href}
      className="group relative inline-flex font-mono text-xs tracking-[0.2em] text-muted-foreground transition-colors duration-hover ease-out-soft hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
    >
      {label}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-accent transition-[width] duration-hover ease-out-soft group-hover:w-full group-focus-visible:w-full"
      />
    </Link>
  );
}

type ThemeToggleProps = {
  theme: "light" | "dark";
  mounted: boolean;
  onToggle: () => void;
};

function ThemeToggle({ theme, mounted, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={
        mounted
          ? `Switch to ${theme === "dark" ? "light" : "dark"} theme`
          : "Toggle theme"
      }
      className="inline-flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors duration-hover ease-out-soft hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
    >
      {mounted && theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
