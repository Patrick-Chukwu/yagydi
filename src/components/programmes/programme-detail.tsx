import { ArrowRight, ClipboardCheck, Megaphone, MessagesSquare, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ProgrammeSdgs } from "@/components/programmes/programme-sdgs";
import { ProgrammeCard } from "@/components/sections/programme-card";
import { QuoteBlock } from "@/components/sections/quote-block";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { donateCta } from "@/content/navigation";
import { programmes, type Programme } from "@/content/programmes";
import { ProgrammeGlyph } from "@/lib/programme-icons";
import { cn, focusRing } from "@/lib/utils";

const activityIcons: readonly LucideIcon[] = [ClipboardCheck, Users, Megaphone, MessagesSquare];

type ProgrammeDetailProps = {
  programme: Programme;
};

export function ProgrammeDetail({ programme }: ProgrammeDetailProps) {
  const others = programmes.filter((item) => item.slug !== programme.slug);

  // TODO: replace with real content.
  const story = {
    quote:
      "[Placeholder quote. A real participant story from this programme will be published here.]",
    name: "[Participant name]",
    role: `${programme.title} participant, [State]`,
  };

  return (
    <>
      <Section background="white" labelledBy={`${programme.slug}-activities`}>
        <Container>
          <span className="mb-4 grid size-12 place-items-center rounded-2xl bg-wisteria-20 text-wisteria-700">
            <ProgrammeGlyph name={programme.icon} className="size-6" />
          </span>
          <SectionHeading id={`${programme.slug}-activities`} title="What we do" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {programme.activities.map((activity, index) => {
              const Icon = activityIcons[index] ?? ClipboardCheck;
              return (
                <li key={activity} className="min-w-0">
                  <article className="flex h-full gap-4 rounded-3xl border border-lavender-100 bg-background p-5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-wisteria-20 text-wisteria-700">
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <p className="min-w-0 text-base font-semibold leading-relaxed text-foreground">
                      {activity}
                    </p>
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section background="wisteria" labelledBy={`${programme.slug}-impact`}>
        <Container>
          <p className="eyebrow text-white">Our impact</p>
          <h2
            id={`${programme.slug}-impact`}
            className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl"
          >
            {programme.impact}
          </h2>
        </Container>
      </Section>

      <Section background="lavender" labelledBy={`${programme.slug}-sdgs`}>
        <Container>
          <SectionHeading id={`${programme.slug}-sdgs`} title="SDGs this programme supports" />
          <div className="mt-8">
            <ProgrammeSdgs ids={programme.sdgs} />
          </div>
        </Container>
      </Section>

      <Section background="white" labelledBy={`${programme.slug}-story`}>
        <Container>
          <SectionHeading
            id={`${programme.slug}-story`}
            title="Related youth story"
            intro="Placeholder until a published participant story is ready."
          />
          <QuoteBlock
            className="mt-10"
            quote={story.quote}
            name={story.name}
            role={story.role}
            href="/latest"
            cta="Read their story"
            photoLabel="Participant photo coming soon"
          />
        </Container>
      </Section>

      <Section background="offwhite" labelledBy={`${programme.slug}-resources`}>
        <Container>
          <SectionHeading id={`${programme.slug}-resources`} title="Related resources" />
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-neutral-80">
            Briefs, fact sheets, and other evidence linked to this programme.
          </p>
          <Link
            href={`/research?programme=${programme.slug}`}
            className={cn(
              "mt-6 inline-flex min-h-11 items-center gap-2 text-lg font-bold no-underline",
              focusRing,
            )}
          >
            Research and resources for {programme.title}
            <ArrowRight aria-hidden="true" className="size-5 shrink-0" />
          </Link>
        </Container>
      </Section>

      <Section background="white" labelledBy={`${programme.slug}-others`}>
        <Container>
          <SectionHeading id={`${programme.slug}-others`} title="Other programmes" />
          <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {others.map((item) => (
              <li key={item.slug} className="min-w-0">
                <ProgrammeCard
                  icon={item.icon}
                  title={item.title}
                  summary={item.summary}
                  href={`/what-we-do/${item.slug}`}
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section background="offwhite" labelledBy={`${programme.slug}-next`}>
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id={`${programme.slug}-next`}
              title="Be part of this programme."
              intro="Volunteer your time, build it with us, or fund the work."
            />
            <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap lg:w-auto lg:justify-end">
              <Button href="/get-involved#volunteer" variant="secondary" className="w-full sm:w-auto">
                Volunteer
              </Button>
              <Button href="/get-involved#partner" variant="outline" className="w-full sm:w-auto">
                Partner
              </Button>
              <Button href={donateCta.href} variant="primary" className="w-full sm:w-auto">
                {donateCta.label}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
