import { educationContent } from "@/data/education";

export function Education() {
  return (
    <section className="section" id="education">
      <span className="watermark" aria-hidden="true">
        05
      </span>
      <div className="sec-label rv">05 — EDUCATION</div>
      <div className="edu-list">
        {educationContent.items.map((item, i) => (
          <div
            key={item.title + item.institution}
            className={`edu-item rv d${Math.min(i + 1, 4)}`}
          >
            <div className="edu-dot" aria-hidden="true" />
            <div>
              <div className="edu-title">{item.title}</div>
              <div className="edu-inst">{item.institution}</div>
              {item.details ? (
                <div className="edu-detail">{item.details}</div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
