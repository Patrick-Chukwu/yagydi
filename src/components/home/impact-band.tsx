import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { StatCounter } from "@/components/ui/stat-counter";
import { site } from "@/content/site";
import { splitImpactStat } from "@/lib/impact-stat";

export function ImpactBand() {
  return (
    <Section
      id="impact"
      background="wisteria"
      labelledBy="impact-heading"
      className="overflow-hidden bg-wisteria-900"
    >
      <Container>
        <h2 id="impact-heading" className="sr-only">
          Impact
        </h2>
        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-5">
          {site.impactStats.map((stat) => {
            const { figure, label } = splitImpactStat(stat);
            return (
              <li key={stat}>
                <StatCounter display={figure} label={label} tone="on-dark" />
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
