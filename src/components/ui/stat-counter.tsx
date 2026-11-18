"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type StatCounterBase = {
  label?: string;
  className?: string;
  /**
   * `on-dark` is for a wisteria-900 or black band.
   * The figure uses orange-80, which clears AA there.
   * Burnt orange on wisteria-100 does not.
   */
  tone?: "default" | "light" | "on-dark";
};

type NumericStat = StatCounterBase & {
  value: number;
  prefix?: string;
  suffix?: string;
  display?: undefined;
};

type TextStat = StatCounterBase & {
  display: string;
  value?: undefined;
  prefix?: undefined;
  suffix?: undefined;
};

export type StatCounterProps = NumericStat | TextStat;

function formatStat(value: number, prefix: string, suffix: string) {
  return `${prefix}${value.toLocaleString("en-NG")}${suffix}`;
}

export function StatCounter(props: StatCounterProps) {
  const { label, className, tone = "default" } = props;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const numeric = props.display === undefined;
  const value = numeric ? props.value : 0;
  const prefix = numeric ? (props.prefix ?? "") : "";
  const suffix = numeric ? (props.suffix ?? "") : "";
  const finalText = numeric ? formatStat(value, prefix, suffix) : props.display;

  useEffect(() => {
    const node = valueRef.current;
    if (!node || !numeric) return;

    if (reduce !== false || !inView) {
      node.textContent = finalText;
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 900);
      const eased = 1 - (1 - progress) ** 3;
      node.textContent = formatStat(Math.round(value * eased), prefix, suffix);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [finalText, inView, numeric, prefix, reduce, suffix, value]);

  return (
    <div ref={ref} className={className}>
      <p
        ref={valueRef}
        className={cn(
          "text-4xl font-extrabold leading-none tracking-tight sm:text-5xl",
          tone === "light" && "text-white",
          tone === "default" && "text-orange-700",
          tone === "on-dark" && "text-orange-80",
        )}
      >
        {finalText}
      </p>
      {label ? (
        <p
          className={cn(
            "mt-3 text-base leading-snug",
            tone === "default" ? "text-neutral-80" : "text-white",
          )}
        >
          {label}
        </p>
      ) : null}
    </div>
  );
}
