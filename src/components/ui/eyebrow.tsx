import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "light" | "dark";
};

const tones = {
  default: "text-wisteria-700",
  light: "text-white",
  dark: "text-black",
} as const;

const dots = {
  default: "text-orange-700",
  light: "text-orange-100",
  dark: "text-black",
} as const;

export function Eyebrow({ children, className, tone = "default" }: EyebrowProps) {
  return (
    <p className={cn("inline-flex items-center gap-3", tones[tone], className)}>
      <span aria-hidden="true" className={cn("text-[0.8rem] tracking-[0.45em]", dots[tone])}>
        ••••
      </span>
      <span className="eyebrow text-inherit">{children}</span>
    </p>
  );
}
