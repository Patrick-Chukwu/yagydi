import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { ProgrammeSdgs } from "@/components/programmes/programme-sdgs";
import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Section } from "@/components/ui/section";
import { programmes, whatWeDo } from "@/content/programmes";
import { ProgrammeGlyph } from "@/lib/programme-icons";
import { cn, focusRing } from "@/lib/utils";

export function ProgrammeList() {
  return (
    <Section label="Core programme areas" background="white">
      <Container>
        <p className="max-w-3xl text-lg font-semibold leading-relaxed text-foreground">
          {whatWeDo.subIntro}
        </p>
        <ul className="mt-10 space-y-12 lg:mt-14 lg:space-y-16">
          {programmes.map((programme, index) => {
            const imageOnRight = index % 2 === 1;
            return (
              <li key={programme.slug} className="min-w-0">
                <article
                  className={cn(
                    "grid items-center gap-8 rounded-3xl p-4 sm:p-6 lg:grid-cols-2 lg:gap-12 lg:p-8",
                    imageOnRight ? "bg-lavender-20" : "bg-background",
                  )}
                >
                  <div className={cn("min-w-0", imageOnRight && "lg:order-2")} aria-hidden="true">
                    <div className="overflow-hidden rounded-3xl">
                      <ImagePlaceholder label={programme.title} className="rounded-3xl" />
                    </div>
                  </div>
                  <div className={cn("min-w-0", imageOnRight && "lg:order-1")}>
                    <span className="grid size-12 place-items-center rounded-2xl bg-wisteria-20 text-wisteria-700">
                      <ProgrammeGlyph name={programme.icon} className="size-6" />
                    </span>
                    <h2 className="mt-4 text-3xl leading-tight text-wisteria-100 sm:text-4xl">
                      {programme.title}
                    </h2>
                    <p className="mt-3 text-lg leading-relaxed text-neutral-80">{programme.summary}</p>
                    <ul className="mt-5 space-y-2">
                      {programme.activities.map((activity) => (
                        <li key={activity} className="flex gap-3 text-base leading-relaxed text-foreground">
                          <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-wisteria-700" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 rounded-2xl border-l-4 border-orange-100 bg-orange-20 px-4 py-3 text-black sm:px-5 sm:py-4">
                      <p className="text-base leading-relaxed">
                        <span className="font-bold">Our impact: </span>
                        {programme.impact}
                      </p>
                    </div>
                    <div className="mt-5">
                      <ProgrammeSdgs ids={programme.sdgs} />
                    </div>
                    <Link
                      href={`/what-we-do/${programme.slug}`}
                      className={cn(
                        "mt-6 inline-flex min-h-11 items-center gap-2 font-bold no-underline",
                        focusRing,
                      )}
                    >
                      Explore programme
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
