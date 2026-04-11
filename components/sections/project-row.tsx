import * as React from "react";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

type ProjectRowProps = {
  project: Project;
  onSelect: (id: string) => void;
  /** Stagger index among currently visible rows. */
  index?: number;
};

const STAGGER_STEP_MS = 60;
const STAGGER_MAX_STEPS = 6;

export const ProjectRow = React.forwardRef<HTMLLIElement, ProjectRowProps>(
  function ProjectRow({ project, onSelect, index = 0 }, ref) {
    const clamped = Math.min(Math.max(index, 0), STAGGER_MAX_STEPS);
    const delayMs = clamped * STAGGER_STEP_MS;

    return (
      <li
        ref={ref}
        data-presence="entered"
        style={{ transitionDelay: `${delayMs}ms` }}
        className={cn(
          "group border-t border-border",
          "opacity-0 translate-y-2 transition-all duration-base ease-out-soft",
          "data-[presence=entering]:opacity-0 data-[presence=entering]:translate-y-2",
          "data-[presence=entered]:opacity-100 data-[presence=entered]:translate-y-0",
          "data-[presence=exiting]:opacity-0 data-[presence=exiting]:-translate-y-2",
          "motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100",
        )}
      >
        <button
          type="button"
          onClick={() => onSelect(project.id)}
          aria-label={`Open ${project.title}`}
          className="flex w-full items-center gap-8 py-10 text-left transition-colors duration-hover ease-out-soft md:gap-12 md:py-12"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-hover ease-out-soft group-hover:text-foreground">
            {project.number}
          </span>

          <span className="flex-1 space-y-3">
            <span className="flex items-baseline gap-4">
              <span className="font-serif text-3xl font-medium text-muted-foreground transition-all duration-base ease-out-soft group-hover:translate-x-2 group-hover:text-foreground md:text-4xl">
                {project.title}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {project.year}
              </span>
            </span>
            <span className="block max-w-xl text-base leading-relaxed text-muted-foreground">
              {project.summary}
            </span>
            <span className="flex flex-wrap gap-x-3 gap-y-1 pt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {project.tags.map((tag, tagIndex) => (
                <span key={tag} className="flex items-center gap-3">
                  <span>{tag}</span>
                  {tagIndex < project.tags.length - 1 ? (
                    <span aria-hidden="true">·</span>
                  ) : null}
                </span>
              ))}
            </span>
          </span>

          <span
            aria-label={project.thumbnail.alt}
            className={cn(
              "hidden h-24 w-32 shrink-0 opacity-70 transition-opacity duration-base ease-out-soft group-hover:opacity-100 md:block",
              project.thumbnail.colorClass,
            )}
          />
        </button>
      </li>
    );
  },
);
