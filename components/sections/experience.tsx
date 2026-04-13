import Link from "next/link";
import { experienceContent } from "@/data/experience";
import { Reveal } from "@/components/motion/reveal";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-16 md:py-24">
      <Reveal>
        <h2
          id="experience-heading"
          className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          Experience
        </h2>
      </Reveal>

      <ul role="list" className="mt-12 space-y-12">
        {experienceContent.items.map((entry, i) => (
          <Reveal key={`${entry.company}-${entry.role}-${entry.period}`} as="li" delay={i * 120}>
            <article className="group flex flex-col gap-3 rounded border border-transparent p-4 -mx-4 transition-all duration-base ease-out-soft hover:border-border hover:bg-muted/50">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {entry.period}
                <span aria-hidden="true"> · </span>
                {entry.location}
              </p>
              <h3 className="text-lg font-medium leading-tight text-foreground md:text-xl">
                {entry.role}
                <span className="text-muted-foreground">
                  {" "}&mdash; {entry.company}
                </span>
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {entry.summary}
              </p>
              <ul
                role="list"
                className="flex flex-wrap gap-2 pt-1"
              >
                {entry.tags.map((tag) => (
                  <li
                    key={tag}
                    className="bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-accent"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ul>

      {/* Resume link */}
      <Reveal delay={experienceContent.items.length * 120}>
        <div className="mt-12 flex items-center gap-4">
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors duration-hover ease-out-soft hover:text-accent"
          >
            View Full Resume
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-hover ease-out-soft group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground/60">
            (PDF coming soon)
          </span>
        </div>
      </Reveal>
    </section>
  );
}
