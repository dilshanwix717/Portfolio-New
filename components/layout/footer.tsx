import { siteConfig } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-screen-xl px-6 py-8 md:px-12 lg:px-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          &copy; {year} {siteConfig.author.name}
        </p>
      </div>
    </footer>
  );
}
