import { experienceContent } from "@/data/experience";

export function Experience() {
  const [primary, accent] = experienceContent.heading;
  return (
    <section className="section" id="experience">
      <span className="watermark" aria-hidden="true">
        03
      </span>
      <div className="sec-label rv">03 — EXPERIENCE</div>
      <div className="exp-heading rv d1">
        {primary}
        <br />
        <b>{accent}</b>
      </div>
      <div className="timeline">
        {experienceContent.items.map((item, i) => (
          <div
            key={item.company + item.period}
            className={`tl-item rv d${Math.min(i + 1, 4)}`}
          >
            <div className="tl-dot" aria-hidden="true" />
            <div className="tl-meta">
              <span>
                {item.period} · {item.location}
              </span>
              <span className="tl-badge">{item.type}</span>
            </div>
            <div className="tl-role">{item.role}</div>
            <div className="tl-company">{item.company}</div>
            <div className="tl-summary">{item.summary}</div>
            <div className="tl-tags">
              {item.tags.map((tag) => (
                <span key={tag} className="tl-tag">
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
