"use client";

import * as React from "react";
import {
  projectCategories,
  projects,
  type Project,
  type ProjectFilter,
} from "@/data/projects";

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

export function Projects() {
  const [filter, setFilter] = React.useState<ProjectFilter>("all");

  return (
    <section className="section" id="projects">
      <span className="watermark" aria-hidden="true">
        04
      </span>
      <div className="sec-label rv">04 — PROJECTS</div>

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

      <div className="proj-grid">
        {projects.map((project, i) => {
          const links = projectLinks(project);
          const hidden = filter !== "all" && project.category !== filter;
          return (
            <div
              key={project.id}
              className={`pc rv d${(i % 2) + 1}${hidden ? " hide" : ""}`}
              data-cat={project.category}
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
    </section>
  );
}
