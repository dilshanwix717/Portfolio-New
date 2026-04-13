import { interestsContent } from "@/data/interests";
import { Reveal } from "@/components/motion/reveal";

export function Interests() {
  return (
    <section id="interests" aria-labelledby="interests-heading" className="py-16 md:py-24">
      <Reveal>
        <h2
          id="interests-heading"
          className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          {interestsContent.label}
        </h2>
      </Reveal>

      <ul role="list" className="mt-12 grid gap-6 md:grid-cols-3">
        {interestsContent.items.map((item, i) => (
          <Reveal
            key={item.label}
            as="li"
            delay={i * 120}
            className="group flex flex-col gap-5 rounded border border-border bg-background p-6 transition-colors duration-hover ease-out-soft hover:border-accent/40"
          >
            <div className="flex flex-col gap-2">
              <span aria-hidden="true" className="h-px w-10 bg-accent" />
              <h3 className="font-serif text-xl font-medium leading-tight">
                {item.label}
              </h3>
            </div>

            <ul
              role="list"
              className="flex flex-wrap gap-2"
              aria-label="Identities"
            >
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  className="bg-accent/10 px-2.5 py-1 font-mono text-xs uppercase tracking-[0.15em] text-accent"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <ul
              role="list"
              className="mt-auto space-y-2.5 border-t border-border pt-4"
            >
              {item.roles.map((role) => (
                <li
                  key={role}
                  className="flex items-start gap-2.5 text-sm leading-snug text-muted-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                  />
                  {role}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
