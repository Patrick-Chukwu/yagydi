import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { about } from "@/content/about";
import { takeSentences } from "@/lib/sentences";
import { cn, focusRing } from "@/lib/utils";

const quickFacts = [
  "Youth-led & nonpartisan",
  "Ages 15–35",
  "Gender-inclusive: prioritising young women and marginalised communities",
] as const;

export function WhoWeAre() {
  const opening = about.paragraphs[0];
  const continuation = takeSentences(about.paragraphs[1], 2);

  return (
    <Section id="who-we-are" background="white" labelledBy="who-we-are-heading">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>About YAGYDI</Eyebrow>
            <h2
              id="who-we-are-heading"
              className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight text-wisteria-100 sm:text-5xl"
            >
              Young, gifted and leading change
            </h2>
            <p className="mt-6 text-lg leading-relaxed">{opening}</p>
            <p className="mt-4 text-lg leading-relaxed text-neutral-80">{continuation}</p>
            <Link href="/about" className={cn("mt-6 inline-flex font-bold", focusRing)}>
              Read more
            </Link>
          </Reveal>
          <ul className="grid gap-4">
            {quickFacts.map((fact) => (
              <li
                key={fact}
                className="flex gap-4 rounded-3xl border border-lavender-100 bg-lavender-20 p-5"
              >
                <span aria-hidden="true" className="mt-2 size-3 shrink-0 bg-orange-100" />
                <p className="text-lg font-bold leading-snug text-wisteria-900">{fact}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
