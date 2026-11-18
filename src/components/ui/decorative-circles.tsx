import { cn } from "@/lib/utils";

type DecorativeCirclesProps = {
  className?: string;
  tone?: "brand" | "on-dark" | "on-orange";
};

const tones = {
  brand: ["bg-wisteria-40/80", "bg-orange-40/80", "bg-lavender-100/70"],
  "on-dark": ["bg-white/20", "bg-orange-100/35", "bg-wisteria-40/30"],
  "on-orange": ["bg-white/35", "bg-wisteria-100/25", "bg-orange-20/50"],
} as const;

export function DecorativeCircles({ className, tone = "brand" }: DecorativeCirclesProps) {
  const [left, right, bottom] = tones[tone];

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className={cn("absolute -left-16 -top-20 size-64 rounded-full blur-3xl", left)} />
      <div className={cn("absolute -right-12 top-1/4 size-52 rounded-full blur-3xl", right)} />
      <div className={cn("absolute -bottom-16 left-1/3 size-48 rounded-full blur-2xl", bottom)} />
    </div>
  );
}
