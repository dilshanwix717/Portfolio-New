"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  projectCategories,
  projects,
  type ProjectFilter,
} from "@/data/projects";
import { ProjectModal, projectLinks } from "./project-modal";

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

export function ProjectsArchive() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filter = (searchParams.get("cat") as ProjectFilter) ?? "all";
  const validFilter = projectCategories.some((c) => c.value === filter)
    ? filter
    : "all";

  const filtered = React.useMemo(
    () =>
      validFilter === "all"
        ? projects
        : projects.filter((p) => p.category === validFilter),
    [validFilter],
  );

  const [activeId, setActiveId] = React.useState<string | null>(null);
  const activeProject = activeId
    ? projects.find((p) => p.id === activeId) ?? null
    : null;

  const setFilter = (next: ProjectFilter) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "all") params.delete("cat");
    else params.set("cat", next);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <>
      <div className="filter-bar rv d1">
        {projectCategories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            className={`fb${validFilter === cat.value ? " act" : ""}`}
            onClick={() => setFilter(cat.value)}
          >
            {cat.label.charAt(0) + cat.label.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="proj-list" id="archive-list">
        {filtered.length === 0 ? (
          <div className="proj-list-empty">No projects in this category.</div>
        ) : (
          filtered.map((project) => {
            const links = projectLinks(project);
            const hasLinks = links.length > 0 && links.some((l) => l.href);
            return (
              <article
                key={project.id}
                className="pl-row"
                data-cat={project.category}
              >
                <button
                  type="button"
                  className="pl-main"
                  onClick={() => setActiveId(project.id)}
                  aria-label={`View details for ${project.title}`}
                >
                  <span className="pl-num">{project.number}</span>
                  <div className="pl-body">
                    <div className="pl-head">
                      <h3 className="pl-title">{project.title}</h3>
                      <span className="pl-year">{project.year}</span>
                    </div>
                    <p className="pl-sum">{project.summary}</p>
                    <div className="pl-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="ptag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
                <div className="pl-links">
                  {hasLinks ? (
                    links
                      .filter((l) => l.href)
                      .map((link) => (
                        <a
                          key={link.label}
                          href={link.href as string}
                          target="_blank"
                          rel="noreferrer"
                          className="pl-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {link.label}
                          <ExternalIcon />
                        </a>
                      ))
                  ) : (
                    <span className="plocked">Private</span>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>

      {activeProject ? (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveId(null)}
        />
      ) : null}
    </>
  );
}
