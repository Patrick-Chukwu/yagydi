import { Compass, Handshake, TrendingUp, Users, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { pillars } from "@/content/pillars";

const pillarIcons: Record<(typeof pillars)[number]["name"], LucideIcon> = {
  People: Users,
  Purpose: Compass,
  Progress: TrendingUp,
  Partnership: Handshake,
};

export function FourPs() {
  return (
    <Section id="four-ps" background="lavender" labelledBy="four-ps-heading">
      <Container>
        <SectionHeading id="four-ps-heading" title="The 4 Ps" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillarIcons[pillar.name];
            return (
              <li key={pillar.name} className="rounded-3xl bg-white p-6 shadow-sm">
                <span className="grid size-12 place-items-center rounded-2xl bg-wisteria-20 text-wisteria-700">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-5 text-2xl text-wisteria-900">{pillar.name}</h3>
                <p className="mt-2 text-base leading-relaxed text-neutral-80">{pillar.statement}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
