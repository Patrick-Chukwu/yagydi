import Image from "next/image";
import { Button, type ButtonVariant } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DecorativeCircles } from "@/components/ui/decorative-circles";
import { cn } from "@/lib/utils";

type CTAAction = {
  label: string;
  href: string;
  variant?: ButtonVariant;
};

type CTABannerProps = {
  title: string;
  text: string;
  actions: readonly [CTAAction] | readonly [CTAAction, CTAAction];
  tone?: "wisteria" | "black" | "orange";
  image?: { src: string; alt: string };
  className?: string;
  id?: string;
};

const tones = {
  wisteria: "bg-wisteria-100 text-white",
  black: "bg-black text-white",
  orange: "bg-orange-100 text-black",
} as const;

export function CTABanner({
  title,
  text,
  actions,
  tone = "wisteria",
  image,
  className,
  id,
}: CTABannerProps) {
  const onOrange = tone === "orange" && !image;
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("relative overflow-hidden", image ? "text-white" : tones[tone], className)}
    >
      {image ? (
        <>
          <Image src={image.src} alt="" fill sizes="100vw" className="object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-wisteria-900/75" />
        </>
      ) : (
        <DecorativeCircles tone={onOrange ? "on-orange" : "on-dark"} />
      )}
      <Container className="relative py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2
            id={headingId}
            className={cn(
              "text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl",
              onOrange ? "text-black" : "text-white",
            )}
          >
            {title}
          </h2>
          <p className={cn("mt-4 text-lg leading-relaxed", onOrange ? "text-black" : "text-white")}>
            {text}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {actions.map((action) => (
              <Button
                key={`${action.href}-${action.label}`}
                href={action.href}
                variant={action.variant ?? (onOrange ? "secondary" : "primary")}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
