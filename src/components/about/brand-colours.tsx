import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { brandColours } from "@/content/brand";
import { cn } from "@/lib/utils";

export function BrandColours() {
  return (
    <Section id="colours" background="white" labelledBy="colours-heading">
      <Container>
        <SectionHeading
          id="colours-heading"
          title="Our colours, our purpose"
          intro="Each colour is named below. The meaning is written out, not left to the swatch alone."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {brandColours.map((colour) => (
            <li key={colour.hex} className="min-w-0">
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-lavender-100 bg-white">
                <div
                  className={cn(
                    "flex min-h-40 flex-col justify-end gap-1 p-5",
                    colour.swatchClass,
                    colour.textClass,
                  )}
                >
                  <p className={cn("text-sm font-bold tracking-wide", colour.textClass)}>{colour.hex}</p>
                  <h3 className={cn("text-2xl", colour.textClass)}>{colour.name}</h3>
                  <p className={cn("text-base font-semibold leading-snug", colour.textClass)}>
                    {colour.qualities}
                  </p>
                </div>
                <p className="flex-1 p-5 text-base leading-relaxed text-foreground">{colour.meaning}</p>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
