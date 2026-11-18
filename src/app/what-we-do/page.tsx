import { PartnershipSection } from "@/components/programmes/partnership-section";
import { ProgrammeList } from "@/components/programmes/programme-list";
import { PageHero } from "@/components/sections/page-hero";
import { whatWeDo } from "@/content/programmes";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "What We Do",
  description: whatWeDo.intro,
  path: "/what-we-do",
});

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="High-impact programmes, youth-led results."
        intro={whatWeDo.intro}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "What We Do" },
        ]}
        imageLabel="Programmes"
      />
      <ProgrammeList />
      <PartnershipSection />
    </>
  );
}
