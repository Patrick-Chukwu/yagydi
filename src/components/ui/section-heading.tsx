import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "default" | "light" | "dark";
  className?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
};

const titleTones = {
  default: "text-wisteria-100",
  light: "text-white",
  dark: "text-black",
} as const;

const introTones = {
  default: "text-neutral-80",
  light: "text-white",
  dark: "text-black",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "default",
  className,
  as: Title = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <Eyebrow tone={tone} className={align === "center" ? "justify-center" : undefined}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Title
        id={id}
        className={cn(
          "scroll-mt-32 font-extrabold tracking-tight text-balance",
          titleTones[tone],
          Title === "h1" ? "text-4xl leading-[1.05] sm:text-6xl" : "text-4xl leading-[1.08] sm:text-5xl",
          eyebrow && "mt-3",
        )}
      >
        {title}
      </Title>
      {intro ? (
        <p className={cn("mt-4 text-lg leading-relaxed text-balance", introTones[tone])}>{intro}</p>
      ) : null}
    </div>
  );
}
