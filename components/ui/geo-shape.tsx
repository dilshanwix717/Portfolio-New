import { cn } from "@/lib/utils";

type GeoShapeProps = {
  className?: string;
};

/**
 * Flat geometric composition — three nested squares (stroked) with one small filled square.
 * Used as the hero visual and as a general decorative primitive. No photos, no avatars.
 * A slow, subtle scale pulse is applied via CSS (see animate-pulse-soft in tailwind config).
 */
export function GeoShape({ className }: GeoShapeProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "h-full w-full max-w-[280px] animate-pulse-soft motion-reduce:animate-none",
        className,
      )}
    >
      <rect
        x="20"
        y="20"
        width="160"
        height="160"
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="1.5"
      />
      <rect
        x="50"
        y="50"
        width="100"
        height="100"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
      />
      <rect
        x="80"
        y="80"
        width="40"
        height="40"
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="1.5"
      />
      <rect
        x="92"
        y="92"
        width="16"
        height="16"
        fill="hsl(var(--accent))"
      />
    </svg>
  );
}
