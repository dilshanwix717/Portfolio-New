"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AnimatePresence } from "@/components/motion/animate-presence";
import { ProjectRow } from "@/components/sections/project-row";
import {
  projectCategories,
  projects,
  projectsContent,
  type Project,
  type ProjectFilter,
} from "@/data/projects";
import { cn } from "@/lib/utils";

export function Projects() {
  const [filter, setFilter] = React.useState<ProjectFilter>("all");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const visible = React.useMemo<readonly Project[]>(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  const selected = React.useMemo<Project | null>(() => {
    if (!selectedId) return null;
    return projects.find((p) => p.id === selectedId) ?? null;
  }, [selectedId]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="container py-24 md:py-32"
    >
      <header className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            02 / Work
          </p>
          <h2 id="projects-heading">
            {projectsContent.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        <ProjectFilterToggle value={filter} onChange={setFilter} />
      </header>

      <ul role="list" className="border-b border-border">
        <AnimatePresence duration={300}>
          {visible.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              onSelect={setSelectedId}
              index={index}
            />
          ))}
        </AnimatePresence>
      </ul>

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

type ProjectFilterToggleProps = {
  value: ProjectFilter;
  onChange: (next: ProjectFilter) => void;
};

function ProjectFilterToggle({ value, onChange }: ProjectFilterToggleProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects"
      className="flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-[0.2em]"
    >
      {projectCategories.map((category) => {
        const active = category.value === value;
        return (
          <button
            key={category.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(category.value)}
            className={cn(
              "group relative inline-flex py-1 transition-colors duration-hover ease-out-soft focus-visible:outline-none",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {category.label}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -bottom-0.5 left-0 h-px bg-accent transition-[width] duration-hover ease-out-soft",
                active ? "w-full" : "w-0 group-hover:w-full",
              )}
            />
          </button>
        );
      })}
    </div>
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
          {project.number} / {project.year} / {project.role}
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
              {project.links.map((link) =>
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
