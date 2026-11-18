import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { storyMilestones, storyNote } from "@/content/history";

export function OurStory() {
  return (
    <Section id="our-story" background="offwhite" labelledBy="our-story-heading">
      <Container>
        <SectionHeading id="our-story-heading" title="Our story" intro={storyNote} />
        <ol className="mt-10 max-w-3xl space-y-8 border-l-2 border-wisteria-40 py-1 pl-6 sm:pl-8">
          {storyMilestones.map((milestone) => (
            <li key={milestone.title} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[1.95rem] size-4 rounded-full border-4 border-background bg-orange-100 sm:-left-[2.45rem]"
              />
              <p className="text-sm font-bold text-orange-700">{milestone.year}</p>
              <h3 className="mt-1 text-2xl text-wisteria-900">{milestone.title}</h3>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
