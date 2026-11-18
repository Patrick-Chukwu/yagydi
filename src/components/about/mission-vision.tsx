import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/content/about";

export function AboutMissionVision() {
  return (
    <Section id="mission" background="white" labelledBy="about-mission-heading">
      <Container>
        <SectionHeading id="about-mission-heading" title="Mission and vision" />
        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2">
          <article className="rounded-3xl bg-wisteria-100 p-6 text-white sm:p-8">
            <h3 className="text-3xl text-white">Mission</h3>
            <p className="mt-4 text-base leading-relaxed text-white sm:text-lg">{about.mission}</p>
          </article>
          <article className="rounded-3xl bg-orange-20 p-6 text-black sm:p-8">
            <h3 className="text-3xl text-black">Vision</h3>
            <p className="mt-4 text-base leading-relaxed text-black sm:text-lg">{about.vision}</p>
          </article>
        </div>
      </Container>
    </Section>
  );
}
