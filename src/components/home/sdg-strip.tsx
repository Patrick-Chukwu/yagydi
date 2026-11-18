import { Container } from "@/components/ui/container";
import { SDGBadge } from "@/components/ui/sdg-badge";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

export function SdgStrip() {
  return (
    <Section id="sdgs" background="white" labelledBy="sdgs-heading">
      <Container>
        <h2
          id="sdgs-heading"
          className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-balance text-wisteria-100 sm:text-5xl"
        >
          We champion the UN Sustainable Development Goals
        </h2>
        <ul className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.sdgs.map((sdg) => (
            <li key={sdg.id}>
              <SDGBadge id={sdg.id} name={sdg.name} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
