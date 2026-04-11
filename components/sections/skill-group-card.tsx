import type { SkillGroup } from "@/data/skills";

type SkillGroupCardProps = {
  group: SkillGroup;
};

export function SkillGroupCard({ group }: SkillGroupCardProps) {
  return (
    <article className="flex h-full flex-col gap-6">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {group.number}
      </p>
      <h3 className="text-3xl font-medium leading-tight text-foreground">
        {group.title}
      </h3>
      <p className="max-w-md text-base leading-relaxed text-muted-foreground">
        {group.description}
      </p>
      <ul
        role="list"
        className="mt-auto flex flex-wrap gap-x-3 gap-y-2 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
      >
        {group.items.map((item, index) => (
          <li key={item} className="flex items-center gap-3">
            <span>{item}</span>
            {index < group.items.length - 1 ? (
              <span aria-hidden="true">·</span>
            ) : null}
          </li>
        ))}
      </ul>
    </article>
  );
}
