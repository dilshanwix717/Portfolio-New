import { siteConfig } from "@/data/site";
import { TypingText } from "@/components/motion/typing-text";

const ROLES = [
  "Full Stack Developer",
  "Game Developer",
  "React Engineer",
  "NestJS Architect",
  "Problem Solver",
  "Systems Thinker",
] as const;

const [firstName, ...rest] = siteConfig.author.name.split(" ");
const lastNameParts = rest.join(" ");

export function Hero() {
  return (
    <section id="hero">
      <div className="hero-wrap">
        {siteConfig.availability.open ? (
          <div className="avail-badge">
            <span className="badge-dot" aria-hidden="true" />
            {siteConfig.availability.label}
          </div>
        ) : null}

        <h1 className="hero-name">
          {firstName}
          <br />
          <span>{lastNameParts}</span>
        </h1>

        <div className="hero-role">
          <TypingText roles={ROLES} />
          <span className="cursor" aria-hidden="true" />
        </div>

        <p className="hero-sub">
          Computer Science graduate. Building full-stack web and game
          experiences that perform and endure — from Colombo, Sri Lanka.
        </p>

        <p className="matrix-status">
          <span>SYS:</span> connection established · <span>STATUS:</span>{" "}
          available · <span>LOC:</span> colombo.lk
        </p>

        <div className="hero-ctas">
          <a href="#contact" className="btn-o">
            Let&apos;s Talk
          </a>
          <a href="#projects" className="btn-g">
            View My Work
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href={
              siteConfig.socials.find((s) => s.label === "GitHub")?.href ?? "#"
            }
            target="_blank"
            rel="noreferrer"
            className="btn-o"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
