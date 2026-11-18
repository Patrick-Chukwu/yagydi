import type { SdgId } from "@/content/site";
import { cn } from "@/lib/utils";

const sdgTheme: Record<SdgId, { background: string; foreground: string }> = {
  3: { background: "#4C9F38", foreground: "#000000" },
  4: { background: "#C5192D", foreground: "#ffffff" },
  5: { background: "#FF3A21", foreground: "#000000" },
  8: { background: "#A21942", foreground: "#ffffff" },
  13: { background: "#3F7E44", foreground: "#ffffff" },
  16: { background: "#00689D", foreground: "#ffffff" },
  17: { background: "#19486A", foreground: "#ffffff" },
};

type SDGBadgeProps = {
  id: SdgId;
  name: string;
  className?: string;
  tone?: "default" | "inverse";
};

export function SDGBadge({ id, name, className, tone = "default" }: SDGBadgeProps) {
  const theme = sdgTheme[id];

  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2", className)}>
      <span
        className="grid size-9 shrink-0 place-items-center rounded-md text-sm font-extrabold"
        style={{ backgroundColor: theme.background, color: theme.foreground }}
        aria-hidden="true"
      >
        {id}
      </span>
      <span
        className={cn(
          "text-sm font-semibold leading-tight",
          tone === "inverse" ? "text-white" : "text-foreground",
        )}
      >
        <span className="sr-only">SDG {id}. </span>
        {name}
      </span>
    </span>
  );
}
