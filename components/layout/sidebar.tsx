"use client";

import * as React from "react";
import Link from "next/link";
import { navItems } from "@/data/nav";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export function Sidebar() {
  const sectionIds = React.useMemo(
    () => navItems.map((item) => item.href.replace("#", "")),
    [],
  );
  const [activeId, setActiveId] = React.useState<string>(sectionIds[0] ?? "");

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting) {
            setActiveId(id);
          }
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    }

    return () => {
      for (const observer of observers) observer.disconnect();
    };
  }, [sectionIds]);

  const activeIndex = sectionIds.indexOf(activeId);
  const linkRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);
  const [dotTop, setDotTop] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (activeIndex < 0) return;
    const el = linkRefs.current[activeIndex];
    if (!el) return;
    const parent = el.closest("ul");
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    // Center the 6px dot (h-1.5) within the link element
    setDotTop(elRect.top - parentRect.top + elRect.height / 2 - 3);
  }, [activeIndex]);

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[480px] lg:shrink-0 lg:flex-col lg:justify-between lg:py-24">
      {/* Top — identity */}
      <div className="space-y-4">
        <h1 className="font-serif text-[clamp(2.5rem,5vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-foreground">
          <StaggeredText text={siteConfig.author.name} />
        </h1>
        <Reveal delay={300}>
          <p className="font-mono text-lg font-medium text-foreground/80">
            {siteConfig.author.role}
          </p>
        </Reveal>
        <Reveal delay={450}>
          <p className="max-w-xs text-base leading-relaxed text-muted-foreground">
            {siteConfig.author.tagline}
          </p>
        </Reveal>
      </div>

      {/* Middle — navigation (desktop) */}
      <Reveal delay={600}>
        <nav aria-label="Primary" className="mt-16 hidden lg:block">
          <ul className="relative space-y-1">
            {/* Sliding dot indicator — position measured from real DOM */}
            <span
              aria-hidden="true"
              className="absolute left-0 h-1.5 w-1.5 rounded-full bg-accent transition-all duration-300 ease-out-soft"
              style={{
                top: dotTop !== null ? `${dotTop}px` : "-9999px",
                opacity: dotTop !== null ? 1 : 0,
              }}
            />

            {navItems.map((item, index) => {
              const id = item.href.replace("#", "");
              const active = activeId === id;
              return (
                <li key={item.href}>
                  <Link
                    ref={(el) => { linkRefs.current[index] = el; }}
                    href={item.href}
                    className={cn(
                      "group flex items-center py-2 pl-5 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200 ease-out-soft",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mr-2 font-mono text-sm font-bold text-accent/70 transition-all duration-200 ease-out-soft",
                        active
                          ? "w-auto opacity-100"
                          : "w-0 overflow-hidden opacity-0 group-hover:w-auto group-hover:opacity-50",
                      )}
                    >
                      [
                    </span>
                    <span>{item.label}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "ml-2 font-mono text-sm font-bold text-accent/70 transition-all duration-200 ease-out-soft",
                        active
                          ? "w-auto opacity-100"
                          : "w-0 overflow-hidden opacity-0 group-hover:w-auto group-hover:opacity-50",
                      )}
                    >
                      ]
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Reveal>

      {/* Bottom — socials */}
      <Reveal delay={750}>
        <ul
          role="list"
          aria-label="Social links"
          className="mt-8 flex items-center gap-5 lg:mt-auto"
        >
          {siteConfig.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="inline-flex text-muted-foreground transition-colors duration-hover ease-out-soft hover:text-foreground"
              >
                <SocialIcon name={social.label} />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Mobile nav */}
      <Reveal delay={600}>
        <nav aria-label="Primary (mobile)" className="mt-8 lg:hidden">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const active = activeId === id;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "py-1 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-hover ease-out-soft",
                      active
                        ? "text-accent"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active ? `[ ${item.label} ]` : item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Reveal>
    </header>
  );
}

function SocialIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();

  if (lower === "github") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    );
  }

  if (lower === "linkedin") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }

  if (lower === "instagram") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }

  return <span className="font-mono text-xs uppercase tracking-[0.2em]">{name}</span>;
}

function StaggeredText({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="inline motion-reduce:animate-none">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => {
            const globalIndex = words
              .slice(0, wi)
              .reduce((sum, w) => sum + w.length, 0) + ci;
            return (
              <span
                key={ci}
                className="inline-block animate-letter-in"
                style={{ animationDelay: `${1200 + globalIndex * 40}ms` }}
              >
                {char}
              </span>
            );
          })}
          {wi < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
}
