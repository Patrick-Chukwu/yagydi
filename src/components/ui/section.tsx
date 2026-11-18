import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const sectionBackgrounds = [
  "white",
  "offwhite",
  "lavender",
  "wisteria",
  "black",
  "orange",
] as const;

export type SectionBackground = (typeof sectionBackgrounds)[number];

const backgrounds: Record<SectionBackground, string> = {
  white: "bg-white text-foreground",
  offwhite: "bg-background text-foreground",
  lavender: "bg-lavender-20 text-foreground",
  wisteria:
    "bg-wisteria-100 text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white",
  black:
    "bg-black text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white",
  orange:
    "bg-orange-100 text-black [&_h1]:text-black [&_h2]:text-black [&_h3]:text-black [&_h4]:text-black [&_h5]:text-black [&_h6]:text-black",
};

type SectionProps = {
  id?: string;
  background?: SectionBackground;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
  label?: string;
};

export function Section({
  id,
  background = "offwhite",
  className,
  children,
  labelledBy,
  label,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={cn(
        "relative scroll-mt-32 py-16 sm:py-20 lg:py-24",
        backgrounds[background],
        className,
      )}
    >
      {children}
    </section>
  );
}
