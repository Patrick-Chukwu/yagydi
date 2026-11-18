import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";

export function SdgChampions() {
  return (
    <Section id="sdgs-we-champion" background="offwhite" labelledBy="sdgs-champion-heading">
      <Container>
        <SectionHeading
          id="sdgs-champion-heading"
          title="SDGs we champion"
          intro="These are the Sustainable Development Goals named in our work."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.sdgs.map((sdg) => (
            <li key={sdg.id} className="min-w-0">
              <article className="h-full rounded-3xl border border-lavender-100 bg-white p-5 sm:p-6">
                <p className="text-4xl font-extrabold leading-none text-wisteria-900">{sdg.id}</p>
                <h3 className="mt-3 text-xl leading-snug text-wisteria-900">{sdg.name}</h3>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
