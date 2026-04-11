import { SlideIn } from "@/components/motion/slide-in";
import { educationContent } from "@/data/education";
import { certificationContent } from "@/data/certifications";

export function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="container py-24 md:py-32"
    >
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="space-y-4 md:sticky md:top-24">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              03 / Education
            </p>
            <h2 id="education-heading">
              {educationContent.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
        </div>

        <div className="md:col-span-8">
          <ul role="list" className="mb-16">
            {educationContent.items.map((item, index) => (
              <li
                key={`${item.title}-${item.institution}`}
                className="border-t border-border first:border-t-0"
              >
                <SlideIn from="up" index={index}>
                  <article className="flex flex-col gap-2 py-8 md:py-10">
                    <h3 className="text-2xl font-medium leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {item.institution}
                    </p>
                    {item.details ? (
                      <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {item.details}
                      </p>
                    ) : null}
                  </article>
                </SlideIn>
              </li>
            ))}
          </ul>

          <div className="space-y-6 border-t border-border pt-10">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {certificationContent.heading.join(" ")}
            </p>
            <ul role="list" className="space-y-4">
              {certificationContent.items.map((item, index) => (
                <li key={item.title}>
                  <SlideIn from="up" index={index}>
                    <article className="flex flex-col gap-1">
                      <h3 className="text-lg font-medium leading-snug">
                        {item.title}
                      </h3>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {item.issuer}
                      </p>
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
