import type { Metadata } from "next";
import Link from "next/link";
import { Projects } from "@/components/sections/projects";
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
        <div className="section">
          <Link
            href="/"
            className="plink"
            style={{ marginBottom: 40, display: "inline-flex" }}
          >
            ← Back home
          </Link>
          <div className="sec-label" style={{ marginTop: 40 }}>
            ARCHIVE
          </div>
          <h1 className="exp-heading">
            All <b>Projects.</b>
          </h1>
        </div>
        <Projects />
      </div>

      <ThemeToggle />
      <RevealObserver />
    </>
  );
}
