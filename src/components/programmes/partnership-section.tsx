import {
  Building2,
  GraduationCap,
  Handshake,
  Landmark,
  Leaf,
  Network,
  Puzzle,
  School,
  ScrollText,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { partnership } from "@/content/partnership";

const partnerIcons: readonly LucideIcon[] = [School, Landmark, Users, Network, Building2, Handshake];
const coCreateIcons: readonly LucideIcon[] = [Puzzle, Sparkles, Leaf, ScrollText, GraduationCap];

function iconAt(icons: readonly LucideIcon[], index: number) {
  return icons[index] ?? Handshake;
}

type PartnershipSectionProps = {
  showHeader?: boolean;
};

export function PartnershipSection({ showHeader = true }: PartnershipSectionProps) {
  const ColumnHeading = showHeader ? "h3" : "h2";

  return (
    <Section
      id="partnership"
      background="lavender"
      labelledBy={showHeader ? "partnership-heading" : undefined}
      label={showHeader ? undefined : partnership.heading}
    >
      <Container>
        {showHeader ? (
          <Reveal>
            <SectionHeading
              id="partnership-heading"
              title={partnership.heading}
              intro={partnership.intro}
            />
          </Reveal>
        ) : null}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <ColumnHeading className="flex items-center gap-3 text-2xl text-wisteria-900">
              <Handshake aria-hidden="true" className="size-6 shrink-0 text-wisteria-700" />
              We partner with:
            </ColumnHeading>
            <ul className="mt-5 space-y-3">
              {partnership.partnerWith.map((item, index) => {
                const Icon = iconAt(partnerIcons, index);
                return (
                  <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-foreground">
                    <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-wisteria-700" />
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="min-w-0">
            <ColumnHeading className="flex items-center gap-3 text-2xl text-wisteria-900">
              <Puzzle aria-hidden="true" className="size-6 shrink-0 text-wisteria-700" />
              We co-create:
            </ColumnHeading>
            <ul className="mt-5 space-y-3">
              {partnership.coCreate.map((item, index) => {
                const Icon = iconAt(coCreateIcons, index);
                return (
                  <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-foreground">
                    <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-wisteria-700" />
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <p className="mt-10 max-w-3xl text-xl font-bold leading-snug text-wisteria-900">
          {partnership.impact}
        </p>
        <div className="mt-8">
          <Button href="/get-involved#partner">Partner with us</Button>
        </div>
      </Container>
    </Section>
  );
}
