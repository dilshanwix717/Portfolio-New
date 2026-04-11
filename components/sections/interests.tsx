import { SlideIn } from "@/components/motion/slide-in";
import { interestsContent } from "@/data/interests";

export function Interests() {
  return (
    <section
      id="interests"
      aria-labelledby="interests-heading"
      className="bg-muted"
    >
      <div className="container py-24 md:py-32">
        <header className="mb-16 space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {interestsContent.label}
          </p>
          <h2 id="interests-heading">{interestsContent.heading}</h2>
        </header>

        <ul role="list" className="grid gap-px bg-border md:grid-cols-3">
          {interestsContent.items.map((item, index) => (
            <li key={item.label} className="bg-muted p-8 md:p-10">
              <SlideIn from="up" index={index}>
                <article className="flex h-full flex-col gap-6">
                  {/* Header */}
                  <div className="flex flex-col gap-3">
                    <span aria-hidden="true" className="h-px w-12 bg-accent" />
                    <h3 className="font-serif text-2xl font-medium leading-tight">
                      {item.label}
                    </h3>
                  </div>

                  {/* Identity tags — prominent */}
                  <ul
                    role="list"
                    className="flex flex-wrap gap-2"
                    aria-label="Identities"
                  >
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border border-accent px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-accent"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {/* Roles — clear and readable */}
                  <ul
                    role="list"
                    className="mt-auto space-y-3 border-t border-border pt-6"
                  >
                    {item.roles.map((role) => (
                      <li
                        key={role}
                        className="flex items-start gap-3 text-sm leading-snug text-muted-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        />
                        {role}
                      </li>
                    ))}
                  </ul>
                </article>
              </SlideIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
