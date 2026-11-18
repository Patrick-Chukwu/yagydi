import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { values } from "@/content/values";
import { cn } from "@/lib/utils";

const tileTones = [
  {
    surface: "bg-wisteria-100 text-white",
    branch: "text-wisteria-100",
  },
  {
    surface: "bg-orange-100 text-black",
    branch: "text-orange-100",
  },
  {
    surface: "bg-lavender-100 text-black",
    branch: "text-lavender-100",
  },
] as const;

export function CoreValues() {
  return (
    <Section id="values" background="lavender" labelledBy="values-heading">
      <Container>
        <SectionHeading
          id="values-heading"
          eyebrow={values.heading}
          title={values.subheading}
          intro={values.intro}
        />
        <div className="relative mt-12">
          <svg
            viewBox="0 0 64 36"
            className="ml-[0.35rem] h-9 w-16 sm:ml-[0.65rem]"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="14" cy="18" r="6" className="fill-lavender-100" />
            <circle cx="28" cy="14" r="9" className="fill-wisteria-100" />
            <circle cx="42" cy="18" r="5" className="fill-orange-100" />
            <rect x="26" y="22" width="4" height="14" rx="2" className="fill-black" />
          </svg>
          <p className="sr-only">{values.acronym}</p>
          <div className="relative">
            <svg
              viewBox="0 0 8 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-y-0 left-[1.7rem] w-1 sm:left-[2rem]"
              aria-hidden="true"
              focusable="false"
            >
              <rect width="8" height="100" className="fill-wisteria-900" />
            </svg>
            <ul className="grid gap-4">
            {values.items.map((item, index) => {
              const tone = tileTones[index % tileTones.length] ?? tileTones[0];
              return (
                <li
                  key={item.name}
                  className="grid grid-cols-[3.25rem_minmax(0,1fr)] items-stretch gap-3 sm:grid-cols-[4.5rem_minmax(0,1fr)]"
                >
                  <div className={cn("relative min-h-12", tone.branch)}>
                    <svg
                      viewBox="0 0 100 24"
                      preserveAspectRatio="none"
                      className="absolute top-1/2 right-0 left-[1.7rem] h-3 w-auto -translate-y-1/2 sm:left-[2rem]"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <line
                        x1="0"
                        y1="12"
                        x2="100"
                        y2="12"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                    <svg
                      viewBox="0 0 12 12"
                      className="absolute top-1/2 right-0 size-3 -translate-y-1/2"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <circle cx="6" cy="6" r="5" fill="currentColor" />
                    </svg>
                  </div>
                  <article
                    className={cn(
                      "min-w-0 rounded-3xl p-5 shadow-sm transition duration-200 motion-reduce:transition-none sm:p-6 lg:hover:-translate-y-1 lg:hover:shadow-lg motion-reduce:hover:transform-none",
                      tone.surface,
                      "[&_h3]:text-current",
                    )}
                  >
                    <h3 className="text-2xl leading-tight">
                      <span className="mb-3 block text-5xl font-extrabold leading-none sm:text-6xl">
                        {item.letter}
                      </span>
                      {item.name}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed">{item.description}</p>
                  </article>
                </li>
              );
            })}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
