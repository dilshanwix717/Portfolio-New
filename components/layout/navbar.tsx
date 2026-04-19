"use client";

import * as React from "react";
import { navItems } from "@/data/nav";
import { useTheme } from "@/components/theme-provider";

function formatLabel(label: string): string {
  return label.charAt(0) + label.slice(1).toLowerCase();
}

export function Navbar() {
  const navRef = React.useRef<HTMLElement | null>(null);
  const { theme, toggleMode } = useTheme();
  const isLight = theme === "ember-light";

  React.useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const onScroll = () => el.classList.toggle("solid", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav id="nav" ref={navRef}>
      <a href="#hero" className="logo">
        &lt;<b>DW</b> /&gt;
      </a>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{formatLabel(item.label)}</a>
          </li>
        ))}
      </ul>
      <button
        id="mode-toggle"
        type="button"
        onClick={toggleMode}
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      >
        <span className="mode-icon" aria-hidden="true">
          {isLight ? "☾" : "☀"}
        </span>
        <span>{isLight ? "Dark" : "Light"}</span>
      </button>
    </nav>
  );
}
