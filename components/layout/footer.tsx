import { siteConfig } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="dark border-t border-border bg-background text-foreground">
      <div className="container flex flex-col items-start justify-between gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em]">
          © {year} {siteConfig.author.name}
        </p>
        <ul
          role="list"
          className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em]"
        >
          {siteConfig.socials.map((social, index) => (
            <li key={social.label} className="flex items-center gap-4">
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors duration-hover ease-out-soft hover:text-foreground"
              >
                {social.label}
              </a>
              {index < siteConfig.socials.length - 1 ? (
                <span aria-hidden="true">·</span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
