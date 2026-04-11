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
        <header className="mb-12 space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {interestsContent.label}
          </p>
          <h2 id="interests-heading">{interestsContent.heading}</h2>
        </header>

        <ul
          role="list"
          className="grid gap-px bg-border md:grid-cols-3"
        >
          {interestsContent.items.map((item, index) => (
            <li key={item.label} className="bg-muted p-8 md:p-10">
              <SlideIn from="up" index={index}>
                <article className="flex flex-col gap-3">
                  <span
                    aria-hidden="true"
                    className="h-px w-12 bg-accent"
                  />
                  <h3 className="text-2xl font-medium leading-tight">
                    {item.label}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </article>
              </SlideIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
