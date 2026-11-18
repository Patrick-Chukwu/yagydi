import { DonateExperience } from "@/components/donate/donate-experience";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/metadata";

const description =
  "Give once or monthly in naira or US dollars. Online gifts are completed with an external payment partner.";

export const metadata = pageMetadata({
  title: "Donate",
  description,
  path: "/donate",
});

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Invest in young people with purpose."
        intro="Choose a currency and give once or monthly. You finish the gift on our payment partner's page."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Donate" },
        ]}
        imageLabel="Photograph coming soon"
      />
      <Section background="offwhite" labelledBy="donate-giving">
        <Container>
          <h2 id="donate-giving" className="sr-only">
            Make a gift
          </h2>
          <DonateExperience />
        </Container>
      </Section>
    </>
  );
}
