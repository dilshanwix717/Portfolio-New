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
        data-light={isLight ? "true" : "false"}
      >
        <span className="mode-track">
          <span className="mode-knob" aria-hidden="true">
            {isLight ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </span>
        </span>
      </button>
    </nav>
  );
}
