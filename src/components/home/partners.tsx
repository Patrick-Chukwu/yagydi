import { PartnerLogoGrid } from "@/components/sections/partner-logo-grid";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { partnership } from "@/content/partnership";

export function Partners() {
  return (
    <Section id="partners" background="white" labelledBy="partners-heading">
      <Container>
        <SectionHeading
          id="partners-heading"
          title={partnership.heading}
          intro={partnership.intro}
        />
        <div className="mt-10">
          <PartnerLogoGrid partners={partnership.partnerLogos} />
        </div>
      </Container>
    </Section>
  );
}
