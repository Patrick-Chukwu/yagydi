import { cn } from "@/lib/utils";

type BrandDividerProps = {
  className?: string;
  tone?: "default" | "light";
};

export function BrandDivider({ className, tone = "default" }: BrandDividerProps) {
  const bar = tone === "light" ? "fill-lavender-40" : "fill-lavender-100";
  const barSoft = tone === "light" ? "fill-white/80" : "fill-lavender-80";
  const crescent = tone === "light" ? "fill-white" : "fill-wisteria-100";

  return (
    <svg
      viewBox="0 0 240 48"
      className={cn("h-10 w-64", className)}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="4" y="16" width="68" height="6" rx="1" className={bar} />
      <rect x="4" y="26" width="68" height="6" rx="1" className={barSoft} />
      <path
        d="M96 8c-14 2.2-24 10-24 16s10 13.8 24 16c-11-4.2-18-10-18-16s7-11.8 18-16z"
        className={crescent}
      />
      <rect x="112" y="20" width="8" height="8" className="fill-orange-100" />
      <rect x="136" y="22" width="96" height="4" rx="1" className={bar} />
    </svg>
  );
}
