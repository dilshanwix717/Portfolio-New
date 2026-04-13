import type { Metadata } from "next";
import Link from "next/link";
import { Projects } from "@/components/sections/projects";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Full list of web development and game development projects by Dilshan Wickramasinghe.",
};

export default function ArchivePage() {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24">
      <div className="mb-12">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent transition-colors duration-hover ease-out-soft hover:text-foreground"
        >
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-hover ease-out-soft group-hover:-translate-x-1"
          >
            &larr;
          </span>
          Dilshan Wickramasinghe
        </Link>
      </div>
      <div className="max-w-2xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
          Archive
        </p>
        <h1 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em]">
          All Projects
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          A complete list of projects built across web development and game
          development. Use the filters to browse by category.
        </p>
      </div>
      <Projects />
    </div>
  );
}
