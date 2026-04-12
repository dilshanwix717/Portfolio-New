import { SlideIn } from "@/components/motion/slide-in";
import { aboutContent } from "@/data/about";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="container py-24 md:py-32"
    >
      <div className="grid gap-16 md:grid-cols-12">
        <SlideIn from="left" className="md:col-span-5">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                01 / {aboutContent.label}
              </p>
              <div aria-hidden="true" className="h-px w-16 bg-accent" />
            </div>
            <blockquote className="font-serif text-[clamp(1.75rem,4vw,2.625rem)] font-medium italic leading-[1.15] text-foreground [quotes:none]">
              {aboutContent.pullQuote.map((line, index) => {
                const isLast = index === aboutContent.pullQuote.length - 1;
                return (
                  <span
                    key={line}
                    className={isLast ? "block text-accent" : "block"}
                  >
                    {index === 0 ? `\u201C${line}` : line}
                    {isLast ? "\u201D" : ""}
                  </span>
                );
              })}
            </blockquote>
          </div>
        </SlideIn>

        <SlideIn from="right" className="md:col-span-7">
          <div className="space-y-6">
            <h2 id="about-heading" className="sr-only">
              About
            </h2>
            {aboutContent.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-lg leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
            <ul className="flex flex-wrap gap-2 pt-4" role="list">
              {aboutContent.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-border px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </SlideIn>
      </div>
    </section>
  );
}
