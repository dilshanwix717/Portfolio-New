"use client";

import * as React from "react";

type Props = {
  roles: readonly string[];
  startDelay?: number;
  typeSpeed?: number;
  deleteSpeed?: number;
  holdDuration?: number;
};

export function TypingText({
  roles,
  startDelay = 1200,
  typeSpeed = 70,
  deleteSpeed = 34,
  holdDuration = 1800,
}: Props) {
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    if (!roles.length) return;
    let ri = 0;
    let ci = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const cur = roles[ri]!;
      if (!deleting) {
        ci++;
        setText(cur.slice(0, ci));
        if (ci === cur.length) {
          deleting = true;
          timer = window.setTimeout(tick, holdDuration);
          return;
        }
        timer = window.setTimeout(tick, typeSpeed);
      } else {
        ci--;
        setText(cur.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % roles.length;
          timer = window.setTimeout(tick, 380);
          return;
        }
        timer = window.setTimeout(tick, deleteSpeed);
      }
    };

    timer = window.setTimeout(tick, startDelay);
    return () => window.clearTimeout(timer);
  }, [roles, startDelay, typeSpeed, deleteSpeed, holdDuration]);

  return <span>{text}</span>;
}
