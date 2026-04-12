import { tickerItems } from "@/data/ticker";

export function Ticker() {
  return (
    <section
      id="ticker"
      aria-label="Technologies"
      className="overflow-hidden border-y border-border bg-muted py-6"
    >
      <div className="flex w-max animate-marquee">
        <TickerTrack />
        <TickerTrack aria-hidden="true" />
      </div>
    </section>
  );
}

type TickerTrackProps = {
  "aria-hidden"?: boolean | "true";
};

function TickerTrack({ "aria-hidden": ariaHidden }: TickerTrackProps) {
  return (
    <ul
      role={ariaHidden ? undefined : "list"}
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center"
    >
      {tickerItems.map((item) => (
        <li
          key={item}
          className="flex items-center font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          <span className="whitespace-nowrap px-8">{item}</span>
          <span aria-hidden="true" className="text-accent">
            ·
          </span>
        </li>
      ))}
    </ul>
  );
}
