import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/content/about";

const pullQuote = "youth-led, nonpartisan, and not-for-profit";

export function AboutWho() {
  return (
    <Section id="who-we-are" background="white" labelledBy="about-who-heading">
      <Container>
        <SectionHeading id="about-who-heading" title="Who we are" />
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,70ch)_minmax(16rem,22rem)] lg:gap-12">
          <div className="max-w-[70ch] space-y-5">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-foreground">
                {paragraph}
              </p>
            ))}
          </div>
          <blockquote className="rounded-3xl border-l-8 border-wisteria-100 bg-wisteria-20 p-6 lg:p-8">
            <p className="text-2xl font-extrabold leading-snug text-wisteria-900 sm:text-3xl">
              “{pullQuote}”
            </p>
          </blockquote>
        </div>
      </Container>
    </Section>
  );
}
