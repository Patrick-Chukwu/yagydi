import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { strategicFocus } from "@/content/strategic-focus";
import { takeSentences } from "@/lib/sentences";
import { cn, focusRing } from "@/lib/utils";

export function StrategicPreview() {
  return (
    <Section
      id="strategic-focus"
      background="white"
      labelledBy="strategic-focus-heading"
      className="overflow-x-clip"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="strategic-focus-heading"
            title={strategicFocus.heading}
            intro={strategicFocus.intro}
          />
        </Reveal>
        <ul
          aria-label="Strategic focus areas"
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain p-1 pb-4 lg:grid lg:snap-none lg:grid-cols-5 lg:overflow-visible lg:p-0"
        >
          {strategicFocus.pillars.map((pillar) => (
            <li
              key={pillar.slug}
              className="w-[min(17.5rem,78vw)] shrink-0 snap-start lg:w-auto lg:min-w-0"
            >
              <article className="flex h-full flex-col rounded-3xl border border-lavender-100 bg-lavender-20 p-5">
                <h3 className="text-lg leading-snug text-wisteria-900">{pillar.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-80">
                  {takeSentences(pillar.body, 1)}
                </p>
              </article>
            </li>
          ))}
        </ul>
        <Link
          href="/strategic-focus"
          className={cn("mt-8 inline-flex items-center gap-2 font-bold", focusRing)}
        >
          Explore our strategic focus
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </Container>
    </Section>
  );
}
