import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProjectsArchive } from "@/components/sections/projects-archive";
import { CanvasBackground } from "@/components/motion/canvas-background";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Full list of web development and game development projects by Dilshan Wickramasinghe.",
};

export default function ArchivePage() {
  return (
    <>
      <CanvasBackground />
      <div id="scanlines" aria-hidden="true" />
      <div id="grain" aria-hidden="true" />

      <div id="page-wrap">
        <section className="section" id="archive">
          <Link
            href="/"
            className="plink"
            style={{ marginBottom: 10, display: "inline-flex" }}
          >
            ← Back home
          </Link>
          <div className="sec-label" style={{ marginTop: 10 }}>
            ARCHIVE
          </div>
          <h1 className="exp-heading">
            All <b>Projects.</b>
          </h1>
          <p className="arch-intro">
            A complete list of projects built across web development and game
            development. Use the filters to browse by category.
          </p>

          <Suspense fallback={<div className="proj-list-empty">Loading…</div>}>
            <ProjectsArchive />
          </Suspense>
        </section>
      </div>

      <ThemeToggle />
      <RevealObserver />
    </>
  );
}
