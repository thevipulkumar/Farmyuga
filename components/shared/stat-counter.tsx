"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type StatCounterProps = {
  value: number;
  suffix?: string;
  /** Milliseconds for the whole count-up. */
  duration?: number;
  className?: string;
};

/** Counts up once, the first time it scrolls into view. */
export function StatCounter({
  value,
  suffix = "",
  duration = 1400,
  className,
}: StatCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = React.useState(0);
  const shouldAnimate = inView && !reduceMotion;

  React.useEffect(() => {
    if (!shouldAnimate) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [shouldAnimate, value, duration]);

  // With reduced motion the final figure is shown immediately, no count-up.
  const shown = reduceMotion ? value : display;

  return (
    <span ref={ref} className={cn("type-stat tabular-nums", className)}>
      {shown.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
