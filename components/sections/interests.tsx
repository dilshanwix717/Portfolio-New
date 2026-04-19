import { interestsContent } from "@/data/interests";

export function Interests() {
  return (
    <section className="section" id="interests">
      <span className="watermark" aria-hidden="true">
        06
      </span>
      <div className="sec-label rv">06 — BEYOND CODE</div>
      <div className="int-grid">
        {interestsContent.items.map((item, i) => (
          <div key={item.label} className={`int-card rv d${Math.min(i + 1, 4)}`}>
            <div className="int-label">{item.label}</div>
            <div className="int-roles">
              {item.roles.map((role) => (
                <div key={role} className="int-role">
                  {role}
                </div>
              ))}
            </div>
            <div className="int-tags">
              {item.tags.map((tag) => (
                <span key={tag} className="int-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
