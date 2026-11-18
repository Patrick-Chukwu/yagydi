import { ProgrammeCard } from "@/components/sections/programme-card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { programmes, whatWeDo } from "@/content/programmes";

export function WhatWeDo() {
  return (
    <Section id="what-we-do" background="white" labelledBy="what-we-do-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="what-we-do-heading"
            title={whatWeDo.heading}
            intro={whatWeDo.intro}
          />
        </Reveal>
        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {programmes.map((programme) => (
            <li key={programme.slug} className="min-w-0">
              <ProgrammeCard
                icon={programme.icon}
                title={programme.title}
                summary={programme.summary}
                href={`/what-we-do/${programme.slug}`}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
