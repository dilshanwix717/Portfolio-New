"use client";

import * as React from "react";

type PresenceChild = React.ReactElement<{ "data-presence"?: string; key?: React.Key }>;

type AnimatePresenceProps = {
  /** Milliseconds to wait before unmounting an exiting child. Must match the child's CSS transition duration. */
  duration?: number;
  children: React.ReactNode;
};

type Tracked = {
  key: React.Key;
  element: PresenceChild;
  state: "entering" | "entered" | "exiting";
};

function toKey(child: React.ReactElement): React.Key {
  if (child.key !== null && child.key !== undefined) return child.key;
  throw new Error("AnimatePresence children must have a stable `key` prop.");
}

/**
 * Minimal AnimatePresence replacement. Children receive `data-presence="entering" | "entered" | "exiting"`
 * and should define their own CSS transitions keyed off that attribute. Exiting children remain mounted
 * for `duration` ms so their exit transition can play before unmount.
 */
export function AnimatePresence({
  duration = 250,
  children,
}: AnimatePresenceProps) {
  const incoming = React.Children.toArray(children).filter(
    React.isValidElement,
  ) as PresenceChild[];

  const [tracked, setTracked] = React.useState<Tracked[]>(() =>
    incoming.map((element) => ({
      key: toKey(element),
      element,
      state: "entered",
    })),
  );

  const timers = React.useRef(new Map<React.Key, ReturnType<typeof setTimeout>>());

  React.useEffect(() => {
    const incomingKeys = new Set(incoming.map(toKey));

    setTracked((prev) => {
      const prevByKey = new Map(prev.map((item) => [item.key, item]));
      const next: Tracked[] = [];

      // Preserve/enter incoming children in their new order.
      for (const element of incoming) {
        const key = toKey(element);
        const existing = prevByKey.get(key);
        if (existing && existing.state !== "exiting") {
          next.push({ key, element, state: "entered" });
        } else {
          next.push({ key, element, state: "entering" });
        }
      }

      // Keep exiting children that were removed this pass.
      for (const item of prev) {
        if (!incomingKeys.has(item.key) && item.state !== "exiting") {
          next.push({ ...item, state: "exiting" });
        } else if (!incomingKeys.has(item.key)) {
          next.push(item);
        }
      }

      return next;
    });

    // Promote entering → entered on next frame so CSS transitions trigger.
    const raf = requestAnimationFrame(() => {
      setTracked((prev) =>
        prev.map((item) =>
          item.state === "entering" ? { ...item, state: "entered" } : item,
        ),
      );
    });

    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  // Schedule unmount for exiting children.
  React.useEffect(() => {
    const currentTimers = timers.current;
    for (const item of tracked) {
      if (item.state === "exiting" && !currentTimers.has(item.key)) {
        const timer = setTimeout(() => {
          setTracked((prev) => prev.filter((t) => t.key !== item.key));
          currentTimers.delete(item.key);
        }, duration);
        currentTimers.set(item.key, timer);
      }
    }
    return () => {
      // Timers are cleaned up on unmount of the whole component.
    };
  }, [tracked, duration]);

  React.useEffect(() => {
    const currentTimers = timers.current;
    return () => {
      for (const timer of currentTimers.values()) clearTimeout(timer);
      currentTimers.clear();
    };
  }, []);

  return (
    <>
      {tracked.map((item) =>
        React.cloneElement(item.element, {
          key: item.key,
          "data-presence": item.state,
        }),
      )}
    </>
  );
}
