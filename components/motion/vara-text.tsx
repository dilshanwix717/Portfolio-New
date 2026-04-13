"use client";

import { useEffect, useRef, useId } from "react";

interface VaraTextProps {
  text: string;
  fontSize?: number;
  strokeWidth?: number;
  color?: string;
  duration?: number;
  onAnimationEnd?: () => void;
  className?: string;
}

export function VaraText({
  text,
  fontSize = 36,
  strokeWidth = 1.5,
  color = "currentColor",
  duration = 1500,
  onAnimationEnd,
  className,
}: VaraTextProps) {
  const reactId = useId();
  // Create a stable DOM-safe ID
  const idRef = useRef(`vara-${reactId.replace(/:/g, "")}`);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const container = document.getElementById(idRef.current);
    if (!container) return;

    initialized.current = true;

    import("vara").then((module) => {
      const Vara = module.default;

      const vara = new Vara(
        `#${idRef.current}`,
        "/fonts/Parisienne.json",
        [
          {
            text,
            fontSize,
            strokeWidth,
            color,
            duration,
            autoAnimation: true,
          },
        ],
        {
          textAlign: "center",
        },
      );

      if (onAnimationEnd) {
        vara.animationEnd(() => {
          onAnimationEnd();
        });
      }
    });
  }, [text, fontSize, strokeWidth, color, duration, onAnimationEnd]);

  return <div id={idRef.current} className={className} />;
}
