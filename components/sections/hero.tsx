import Link from "next/link";
import { siteConfig } from "@/data/site";
import { GeoShape } from "@/components/ui/geo-shape";
import { cn } from "@/lib/utils";

export function Hero() {
  const headingLines = ["I build things", "people don't", "forget."] as const;
  const lastLineIndex = headingLines.length - 1;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="container grid items-center gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-32"
    >
      <div className="space-y-8 md:col-span-7">
        {siteConfig.availability.open ? (
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-detail"
            />
            {siteConfig.availability.label}
          </p>
        ) : null}

        <h1
          id="hero-heading"
          className="font-serif text-[clamp(2.625rem,7vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em]"
        >
          {headingLines.map((line, index) => (
            <span
              key={line}
              className={cn(
                "block",
                index === lastLineIndex ? "text-accent" : "text-foreground",
              )}
            >
              {line}
            </span>
          ))}
        </h1>

        <p className="text-lg font-medium text-muted-foreground">
          {siteConfig.author.role}
        </p>

        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          {siteConfig.author.tagline}
        </p>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
          <Link
            href="#projects"
            className="inline-flex h-11 items-center justify-center bg-foreground px-6 text-sm font-medium text-background transition-colors duration-hover ease-out-soft hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View my work
          </Link>
          <Link
            href="#contact"
            className="inline-flex h-11 items-center justify-center border border-accent px-6 text-sm font-medium text-accent transition-colors duration-hover ease-out-soft hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Let&rsquo;s talk
          </Link>
        </div>
      </div>

      <div className="md:col-span-5">
        <div
          aria-hidden="true"
          className="relative flex aspect-square items-center justify-center bg-muted p-12"
        >
          <GeoShape />
        </div>
      </div>
    </section>
  );
}
