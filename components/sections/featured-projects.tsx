"use client";

import * as React from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

const FEATURED_IDS = [
  "home-cinema",
  "nestjs-microservices",
  "restaurant-pos",
  "gaming-platform",
  "chicken-road",
] as const;

const featuredProjects = FEATURED_IDS.map(
  (id) => projects.find((p) => p.id === id)!,
).filter(Boolean);

export function FeaturedProjects() {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const selected = React.useMemo<Project | null>(() => {
    if (!selectedId) return null;
    return projects.find((p) => p.id === selectedId) ?? null;
  }, [selectedId]);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-16 md:py-24">
      <Reveal>
        <h2
          id="projects-heading"
          className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          Projects
        </h2>
      </Reveal>

      <ul role="list" className="mt-12 space-y-4">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.id} as="li" delay={index * 100} className="group">
            <button
              type="button"
              onClick={() => setSelectedId(project.id)}
              className="w-full text-left"
              aria-label={`View details for ${project.title}`}
            >
              <div className="flex flex-col gap-3 rounded border border-transparent p-5 -mx-5 transition-all duration-base ease-out-soft group-hover:border-border group-hover:bg-muted/50 sm:flex-row sm:gap-6">
                {/* Number */}
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground/50 sm:pt-1"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="flex flex-col gap-3 min-w-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-xl font-medium leading-tight text-foreground transition-colors duration-hover group-hover:text-accent md:text-2xl">
                      {project.title}
                    </h3>
                    <span className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <ul role="list" className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-accent"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  {(project.repos && project.repos.length > 0
                    ? project.repos
                    : project.links.filter((l) => l.href)
                  ).length > 0 ? (
                    <div className="flex flex-wrap gap-3 pt-1">
                      {(project.repos && project.repos.length > 0
                        ? project.repos
                        : project.links.filter((l) => l.href)
                      ).map((link) => (
                        <span
                          key={link.label}
                          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-accent"
                        >
                          {link.label}
                          <ArrowUpRight />
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={featuredProjects.length * 100}>
        <div className="mt-12">
          <Link
            href="/archive"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors duration-hover ease-out-soft hover:text-accent"
          >
            View Full Project Archive
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-hover ease-out-soft group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </Reveal>

      <Dialog
        open={selected !== null}
        onOpenChange={(open: boolean) => {
          if (!open) setSelectedId(null);
        }}
      >
        {selected ? <ProjectDialogContent project={selected} /> : null}
      </Dialog>
    </section>
  );
}

function ProjectDialogContent({ project }: { project: Project }) {
  const [notice, setNotice] = React.useState<string | null>(null);

  const handleUnavailableClick = React.useCallback((label: string) => {
    const message = label.toLowerCase().includes("github")
      ? "This project is part of a private repository and isn\u2019t publicly available yet."
      : "This project isn\u2019t hosted publicly at the moment \u2014 stay tuned!";
    setNotice(message);
    const id = window.setTimeout(() => setNotice(null), 3000);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <DialogContent>
      <DialogHeader>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {project.number} / {project.year}
        </p>
        <DialogTitle className="font-serif text-3xl font-medium">
          {project.title}
        </DialogTitle>
        <ul
          role="list"
          className="flex flex-wrap pt-2 pb-3 gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          {project.tags.map((tag) => (
            <li key={tag} className="border border-border px-2.5 py-1">
              {tag}
            </li>
          ))}
        </ul>
        <DialogDescription className="text-base leading-relaxed">
          {project.summary}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <p className="text-base leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        {project.links.length > 0 ? (
          <div className="space-y-1 pt-2">
            <div className="flex flex-wrap gap-3">
              {(project.repos && project.repos.length > 0
                ? [
                    ...project.repos,
                    ...project.links.filter(
                      (l) => !l.label.toLowerCase().includes("github"),
                    ),
                  ]
                : project.links
              ).map((link) =>
                link.href ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center border border-accent/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-accent transition-all duration-hover ease-out-soft hover:border-accent hover:bg-accent hover:text-background"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => handleUnavailableClick(link.label)}
                    className="inline-flex items-center border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-all duration-hover ease-out-soft hover:border-foreground/30 hover:text-foreground"
                  >
                    {link.label}
                  </button>
                ),
              )}
            </div>

            <p
              role="status"
              aria-live="polite"
              className={cn(
                "font-mono text-xs tracking-wide text-muted-foreground transition-all duration-base ease-out-soft",
                notice
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-1 opacity-0",
              )}
            >
              {notice ?? "\u00A0"}
            </p>
          </div>
        ) : null}
      </div>
    </DialogContent>
  );
}

function ArrowUpRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
