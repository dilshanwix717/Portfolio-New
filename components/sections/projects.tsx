"use client";

import * as React from "react";
import Link from "next/link";
import {
  projectCategories,
  projects,
  type Project,
  type ProjectFilter,
} from "@/data/projects";

type ProjectsProps = {
  /** When set, renders only the first N projects, hides the filter bar, and shows a link to /archive. */
  limit?: number;
};

const ExternalIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    aria-hidden="true"
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

function projectLinks(project: Project) {
  if (project.repos && project.repos.length > 0) {
    return project.repos;
  }
  return project.links;
}

export function Projects({ limit }: ProjectsProps = {}) {
  const [filter, setFilter] = React.useState<ProjectFilter>("all");
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const isLimited = typeof limit === "number";
  const visibleProjects = isLimited ? projects.slice(0, limit) : projects;

  const activeProject = React.useMemo(
    () => (activeId ? projects.find((p) => p.id === activeId) ?? null : null),
    [activeId],
  );

  React.useEffect(() => {
    if (!activeProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeProject]);

  return (
    <section className="section" id="projects">
      <span className="watermark" aria-hidden="true">
        04
      </span>
      <div className="sec-label rv">04 — PROJECTS</div>

      {isLimited ? null : (
        <div className="filter-bar rv d1">
          {projectCategories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              className={`fb${filter === cat.value ? " act" : ""}`}
              onClick={() => setFilter(cat.value)}
            >
              {cat.label.charAt(0) + cat.label.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      )}

      <div className="proj-grid">
        {visibleProjects.map((project, i) => {
          const links = projectLinks(project);
          const hidden =
            !isLimited && filter !== "all" && project.category !== filter;
          return (
            <div
              key={project.id}
              className={`pc rv d${(i % 2) + 1}${hidden ? " hide" : ""}`}
              data-cat={project.category}
            >
              <button
                type="button"
                className="pc-body"
                onClick={() => setActiveId(project.id)}
                aria-label={`View details for ${project.title}`}
              >
                <div className="pc-top">
                  <span className="pc-num">{project.number}</span>
                  <span className="pc-year">{project.year}</span>
                </div>
                <div className="pc-title">{project.title}</div>
                <div className="pc-sum">{project.summary}</div>
                <div className="pc-tags">
                  {project.tags.slice(0, 5).map((tag) => (
                    <span key={tag} className="ptag">
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
              <div className="pc-links">
                {links.length > 0 && links.some((l) => l.href) ? (
                  links
                    .filter((l) => l.href)
                    .map((link) => (
                      <a
                        key={link.label}
                        href={link.href as string}
                        target="_blank"
                        rel="noreferrer"
                        className="plink"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {link.label}
                        <ExternalIcon />
                      </a>
                    ))
                ) : (
                  <span className="plocked">Private repo</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isLimited ? (
        <div className="proj-more rv">
          <Link href="/archive" className="plink">
            View full project archive
            <ExternalIcon />
          </Link>
        </div>
      ) : null}

      {activeProject ? (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveId(null)}
        />
      ) : null}
    </section>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const links = projectLinks(project);
  const hasLinks = links.some((l) => l.href);

  return (
    <div
      className="pm-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pm-title"
      onClick={onClose}
    >
      <div className="pm-panel" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="pm-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="pm-top">
          <span className="pm-num">{project.number}</span>
          <span className="pm-year">{project.year}</span>
          <span className="pm-cat">{project.category}</span>
        </div>
        <h3 id="pm-title" className="pm-title">
          {project.title}
        </h3>
        <p className="pm-desc">{project.description}</p>
        <div className="pm-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="ptag">
              {tag}
            </span>
          ))}
        </div>
        <div className="pm-links">
          {hasLinks ? (
            links
              .filter((l) => l.href)
              .map((link) => (
                <a
                  key={link.label}
                  href={link.href as string}
                  target="_blank"
                  rel="noreferrer"
                  className="plink"
                >
                  {link.label}
                  <ExternalIcon />
                </a>
              ))
          ) : (
            <span className="plocked">Private repo</span>
          )}
        </div>
      </div>
    </div>
  );
}
