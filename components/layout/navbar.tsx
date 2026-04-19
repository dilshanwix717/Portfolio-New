"use client";

import * as React from "react";
import { navItems } from "@/data/nav";

function formatLabel(label: string): string {
  return label.charAt(0) + label.slice(1).toLowerCase();
}

export function Navbar() {
  const navRef = React.useRef<HTMLElement | null>(null);

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
      <a href="#contact" className="nav-btn">
        Hire Me
      </a>
    </nav>
  );
}
