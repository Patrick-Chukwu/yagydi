import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProgrammeGlyph } from "@/lib/programme-icons";
import { cn, focusRing } from "@/lib/utils";

type ProgrammeCardProps = {
  icon: string;
  title: string;
  summary: string;
  href: string;
  className?: string;
};

export function ProgrammeCard({ icon, title, summary, href, className }: ProgrammeCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col rounded-3xl border border-lavender-100 bg-white p-6 text-foreground no-underline shadow-sm transition duration-200 hover:-translate-y-1 hover:border-wisteria-40 hover:shadow-lg motion-reduce:transform-none",
        focusRing,
        className,
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-full rounded-full bg-orange-100" />
      <span className="mt-5 grid size-12 place-items-center rounded-2xl bg-wisteria-20 text-wisteria-700">
        <ProgrammeGlyph name={icon} className="size-6" />
      </span>
      <h3 className="mt-5 text-xl leading-snug text-wisteria-900">{title}</h3>
      <p className="mt-3 flex-1 text-base leading-relaxed text-neutral-80">{summary}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-base font-bold text-wisteria-700">
        Learn more
        <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-0.5 motion-reduce:transform-none" />
      </span>
    </Link>
  );
}
