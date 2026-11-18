import { BrandDivider } from "@/components/ui/brand-divider";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/content/about";

export function MissionVision() {
  return (
    <Section id="mission" background="offwhite" labelledBy="mission-heading">
      <Container>
        <SectionHeading id="mission-heading" title="Our mission and vision" />
        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-8">
          <article className="rounded-3xl bg-orange-20 p-6 sm:p-8">
            <h3 className="text-2xl text-wisteria-900">Mission</h3>
            <p className="mt-4 text-base leading-relaxed text-black sm:text-lg">{about.mission}</p>
          </article>
          <div className="flex items-center justify-center" aria-hidden="true">
            <div className="relative h-10 w-44 lg:h-44 lg:w-10">
              <BrandDivider className="absolute top-1/2 left-1/2 h-10 w-44 -translate-x-1/2 -translate-y-1/2 lg:rotate-90" />
            </div>
          </div>
          <article className="rounded-3xl bg-wisteria-20 p-6 sm:p-8">
            <h3 className="text-2xl text-wisteria-900">Vision</h3>
            <p className="mt-4 text-base leading-relaxed text-wisteria-900 sm:text-lg">{about.vision}</p>
          </article>
        </div>
      </Container>
    </Section>
  );
}
