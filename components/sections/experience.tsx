import { SlideIn } from "@/components/motion/slide-in";
import { experienceContent } from "@/data/experience";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="bg-muted"
    >
      <div className="container py-24 md:py-32">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="space-y-4 md:sticky md:top-24">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              05 / Experience
            </p>
            <h2 id="experience-heading">
              {experienceContent.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
        </div>

        <div className="md:col-span-8">
          <ul role="list">
            {experienceContent.items.map((entry, index) => (
              <li
                key={`${entry.company}-${entry.role}-${entry.period}`}
                className="border-t border-border first:border-t-0"
              >
                <SlideIn from="up" index={index}>
                  <article className="flex flex-col gap-5 py-10 md:py-12">
                    <header className="space-y-2">
                      <h3 className="text-2xl font-medium leading-tight md:text-3xl">
                        {entry.role}
                        <span className="text-muted-foreground">
                          {" "}
                          — {entry.company}
                        </span>
                      </h3>
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {entry.period}
                        <span aria-hidden="true"> · </span>
                        {entry.location}
                        <span aria-hidden="true"> · </span>
                        {entry.type}
                      </p>
                    </header>

                    <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                      {entry.summary}
                    </p>

                    <ul
                      role="list"
                      className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
                    >
                      {entry.tags.map((tag, tagIndex) => (
                        <li key={tag} className="flex items-center gap-3">
                          <span>{tag}</span>
                          {tagIndex < entry.tags.length - 1 ? (
                            <span aria-hidden="true">·</span>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </article>
                </SlideIn>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </section>
  );
}
