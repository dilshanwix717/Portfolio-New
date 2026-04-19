import { aboutContent } from "@/data/about";

const HIGHLIGHT_TERMS = ["D B International Technology", "CeylonX Corporation"];

function highlightParagraph(paragraph: string): React.ReactNode {
  let nodes: React.ReactNode[] = [paragraph];
  for (const term of HIGHLIGHT_TERMS) {
    const next: React.ReactNode[] = [];
    for (const chunk of nodes) {
      if (typeof chunk !== "string") {
        next.push(chunk);
        continue;
      }
      const parts = chunk.split(term);
      parts.forEach((part, idx) => {
        if (part) next.push(part);
        if (idx < parts.length - 1) {
          next.push(<strong key={`${term}-${idx}`}>{term}</strong>);
        }
      });
    }
    nodes = next;
  }
  return nodes;
}

export function About() {
  return (
    <section className="section" id="about">
      <span className="watermark" aria-hidden="true">
        01
      </span>
      <div className="sec-label rv">01 — ABOUT</div>
      <div className="about-grid">
        <div className="rv d1">
          <p className="pullquote">
            {aboutContent.pullQuote.map((line, i) => {
              const isFirst = i === 0;
              const isLast = i === aboutContent.pullQuote.length - 1;
              return (
                <span key={line}>
                  {isLast ? (
                    <em>
                      {line}
                      &rdquo;
                    </em>
                  ) : (
                    <>
                      {isFirst ? <>&ldquo;</> : null}
                      {line}
                    </>
                  )}
                  {!isLast ? <br /> : null}
                </span>
              );
            })}
          </p>
        </div>
        <div className="about-body">
          {aboutContent.paragraphs.map((paragraph, i) => (
            <p
              key={paragraph.slice(0, 32)}
              className={`about-p rv d${Math.min(i + 1, 4)}`}
            >
              {highlightParagraph(paragraph)}
            </p>
          ))}
          <div className="tag-row rv d4">
            {aboutContent.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
