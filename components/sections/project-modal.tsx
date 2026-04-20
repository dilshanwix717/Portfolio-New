"use client";

import * as React from "react";
import type { Project } from "@/data/projects";

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

export function projectLinks(project: Project) {
  if (project.repos && project.repos.length > 0) {
    return project.repos;
  }
  return project.links;
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const links = projectLinks(project);
  const hasLinks = links.some((l) => l.href);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

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
