import { aboutContent } from "@/data/about";
import { Reveal } from "@/components/motion/reveal";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-16 md:py-24">
      <Reveal>
        <h2
          id="about-heading"
          className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          About
        </h2>
      </Reveal>

      <div className="mt-8 space-y-6">
        {aboutContent.paragraphs.map((paragraph, i) => (
          <Reveal key={paragraph.slice(0, 48)} delay={i * 100}>
            <p className="text-base leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          </Reveal>
        ))}
        <Reveal delay={aboutContent.paragraphs.length * 100}>
          <ul className="flex flex-wrap gap-2 pt-4" role="list">
            {aboutContent.tags.map((tag) => (
              <li
                key={tag}
                className="bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-accent"
              >
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
