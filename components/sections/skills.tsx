import { SlideIn } from "@/components/motion/slide-in";
import { SkillGroupCard } from "@/components/sections/skill-group-card";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="container py-24 md:py-32"
    >
      <header className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-baseline">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          02 / Skills
        </p>
        <h2 id="skills-heading" className="md:text-right">
          Disciplines
        </h2>
      </header>

      <ul
        role="list"
        className="grid grid-cols-1 gap-px bg-border md:grid-cols-2"
      >
        {skillGroups.map((group, index) => (
          <li key={group.number} className="bg-background p-8 md:p-12">
            <SlideIn from="up" index={index}>
              <SkillGroupCard group={group} />
            </SlideIn>
          </li>
        ))}
      </ul>
    </section>
  );
}
