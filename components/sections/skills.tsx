import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section className="section" id="skills">
      <span className="watermark" aria-hidden="true">
        02
      </span>
      <div className="sec-label rv">02 — SKILLS</div>
      <div className="skills-grid">
        {skillGroups.map((group, i) => (
          <div key={group.number} className={`sk-card rv d${Math.min(i + 1, 4)}`}>
            <p className="sk-num">{group.number}</p>
            <h3 className="sk-title">{group.title}</h3>
            <p className="sk-desc">{group.description}</p>
            <div className="sk-pills">
              {group.items.map((item) => (
                <span key={item} className="pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
