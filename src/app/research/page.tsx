import { Suspense } from "react";
import { FormPopupButton } from "@/components/forms/FormPopupButton";
import { ResourceLibrary } from "@/components/research/resource-library";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProgramme } from "@/content/programmes";
import { strategicFocus } from "@/content/strategic-focus";
import { pageMetadata } from "@/lib/metadata";

const researchPillar = strategicFocus.pillars.find((pillar) => pillar.slug === "research-policy");
const researchTitle = researchPillar?.lead ?? "Evidence-based decisions.";
const researchIntro = researchPillar?.body ?? strategicFocus.intro;

export const metadata = pageMetadata({
  title: "Research",
  description: researchIntro,
  path: "/research",
});

type ResearchPageProps = {
  searchParams: Promise<{ programme?: string | string[] }>;
};

function firstQueryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default function ResearchPage({ searchParams }: ResearchPageProps) {
  const researchProgramme = getProgramme("research-policy");

  return (
    <>
      <PageHero
        eyebrow="Research"
        title={researchTitle}
        intro={researchIntro}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Research" },
        ]}
        imageLabel="Research"
      />
      <Section background="offwhite" labelledBy="resource-library-heading">
        <Container>
          <SectionHeading
            id="resource-library-heading"
            title="Resource library"
            intro="These files are placeholders until real briefs, fact sheets, and reports are published."
          />
          <div className="mt-10">
            <Suspense fallback={<p className="text-base text-neutral-80">Loading resources.</p>}>
              <FilteredLibrary searchParams={searchParams} />
            </Suspense>
          </div>
        </Container>
      </Section>
      <Section background="white" labelledBy="fellowship-heading">
        <Container>
          <SectionHeading
            id="fellowship-heading"
            title="Research fellowships & youth data training"
            intro={researchProgramme?.summary}
          />
          <div className="mt-8">
            <FormPopupButton formId="opportunity">Apply</FormPopupButton>
          </div>
        </Container>
      </Section>
    </>
  );
}

async function FilteredLibrary({ searchParams }: ResearchPageProps) {
  const query = await searchParams;
  const initialProgramme = firstQueryValue(query.programme);
  return <ResourceLibrary key={initialProgramme ?? "all"} initialProgramme={initialProgramme} />;
}
