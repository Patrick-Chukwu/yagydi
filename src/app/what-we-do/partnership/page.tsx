import { PartnershipSection } from "@/components/programmes/partnership-section";
import { PageHero } from "@/components/sections/page-hero";
import { partnership } from "@/content/partnership";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Partnership",
  description: partnership.intro,
  path: "/what-we-do/partnership",
});

export default function PartnershipPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title={partnership.heading}
        intro={partnership.intro}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "What We Do", href: "/what-we-do" },
          { label: partnership.heading },
        ]}
        imageLabel="Partnership"
      />
      <PartnershipSection showHeader={false} />
    </>
  );
}
