import { ImageIcon, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  label: string;
  icon?: LucideIcon;
  className?: string;
};

export function ImagePlaceholder({
  label,
  icon: Icon = ImageIcon,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "flex aspect-[4/3] w-full min-w-0 flex-col items-center justify-center gap-3 bg-lavender-40 px-4 text-center text-wisteria-900",
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-8 shrink-0 text-wisteria-700" />
      <span className="max-w-full text-sm font-semibold leading-snug text-balance">{label}</span>
    </div>
  );
}
