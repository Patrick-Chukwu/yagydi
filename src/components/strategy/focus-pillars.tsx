"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { ProgrammeSlug } from "@/content/programmes";
import { programmes } from "@/content/programmes";
import { strategicFocus } from "@/content/strategic-focus";
import { cn, focusRing, focusRingOnDark } from "@/lib/utils";

const pillarProgrammeSlugs = {
  "inclusive-healthcare": ["inclusive-health", "srhr-advocacy"],
  "inclusive-education": ["inclusive-education"],
  "research-policy": ["research-policy"],
  "economic-empowerment": ["gender-rights-advocacy", "inclusive-education"],
  "citizenship-elections-human-rights": ["democracy-good-governance"],
} as const satisfies Record<
  (typeof strategicFocus.pillars)[number]["slug"],
  readonly ProgrammeSlug[]
>;

type IndexItem = {
  slug: string;
  title: string;
  number: string;
};

const indexItems: readonly IndexItem[] = strategicFocus.pillars.map((pillar, index) => ({
  slug: pillar.slug,
  title: pillar.title,
  number: String(index + 1).padStart(2, "0"),
}));

function programmesForPillar(slug: string) {
  const slugs = pillarProgrammeSlugs[slug as keyof typeof pillarProgrammeSlugs] ?? [];
  return slugs.flatMap((programmeSlug) => {
    const programme = programmes.find((item) => item.slug === programmeSlug);
    return programme ? [programme] : [];
  });
}

function PillarLinks({
  items,
  active,
  labelId,
  onSelect,
}: {
  items: readonly IndexItem[];
  active: string;
  labelId: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <nav aria-labelledby={labelId}>
      <p id={labelId} className="text-sm font-bold tracking-wide text-wisteria-900 uppercase">
        On this page
      </p>
      <ol className="mt-3 space-y-1">
        {items.map((item) => {
          const current = item.slug === active;
          return (
            <li key={item.slug}>
              <a
                href={`#${item.slug}`}
                aria-current={current ? "location" : undefined}
                onClick={() => onSelect(item.slug)}
                className={cn(
                  "flex min-h-11 items-start gap-3 rounded-2xl px-3 py-2 text-sm font-bold leading-snug no-underline",
                  current
                    ? "bg-wisteria-100 text-white"
                    : "text-wisteria-900 hover:bg-lavender-40",
                  current ? focusRingOnDark : focusRing,
                )}
              >
                <span className={cn("shrink-0 tabular-nums", current ? "text-white" : "text-orange-700")}>
                  {item.number}
                  <span className="sr-only"> </span>
                </span>
                <span>{item.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function FocusPillars() {
  const [active, setActive] = useState(indexItems[0]?.slug ?? "");

  useEffect(() => {
    function syncHash() {
      const hash = window.location.hash.replace("#", "");
      if (indexItems.some((item) => item.slug === hash)) {
        setActive(hash);
      }
    }

    window.addEventListener("hashchange", syncHash);
    queueMicrotask(syncHash);

    const nodes = indexItems
      .map((item) => document.getElementById(item.slug))
      .filter((node): node is HTMLElement => node !== null);

    if (nodes.length === 0) {
      return () => window.removeEventListener("hashchange", syncHash);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const id = visible[0]?.target.id;
        if (id) setActive(id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => {
      window.removeEventListener("hashchange", syncHash);
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <div className="bg-white lg:hidden">
        <Container className="py-6">
          <PillarLinks
            items={indexItems}
            active={active}
            labelId="strategy-index-mobile"
            onSelect={setActive}
          />
        </Container>
      </div>
      <div className="lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start">
        <div className="hidden border-r border-lavender-100 bg-white px-6 pt-16 lg:block xl:px-8">
          <div className="sticky top-32 z-30 max-h-[calc(100vh-9rem)] overflow-y-auto pb-16">
            <PillarLinks
              items={indexItems}
              active={active}
              labelId="strategy-index-desktop"
              onSelect={setActive}
            />
          </div>
        </div>
        <div className="min-w-0">
          {strategicFocus.pillars.map((pillar, index) => {
            const related = programmesForPillar(pillar.slug);
            const number = String(index + 1).padStart(2, "0");
            return (
              <Section
                key={pillar.slug}
                background={index % 2 === 0 ? "white" : "lavender"}
                labelledBy={`${pillar.slug}-title`}
                className="lg:py-16"
              >
                <div className="w-full min-w-0 px-4 sm:px-6 lg:pr-12 lg:pl-8 xl:pr-16">
                  <div
                    id={pillar.slug}
                    tabIndex={-1}
                    className="scroll-mt-32 max-w-3xl outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wisteria-700"
                  >
                    <p className="text-5xl font-extrabold tracking-tight text-wisteria-100 tabular-nums">
                      <span className="sr-only">Pillar </span>
                      {number}
                    </p>
                    <h2
                      id={`${pillar.slug}-title`}
                      className="mt-3 text-3xl leading-tight text-wisteria-100 sm:text-4xl"
                    >
                      {pillar.title}
                    </h2>
                    {"lead" in pillar && pillar.lead ? (
                      <p className="mt-4 text-2xl font-bold leading-snug text-foreground">{pillar.lead}</p>
                    ) : null}
                    <p className="mt-4 max-w-3xl text-lg leading-relaxed text-neutral-80">{pillar.body}</p>
                    {related.length > 0 ? (
                      <div className="mt-8">
                        <h3 className="text-lg text-wisteria-900">Related programmes</h3>
                        <ul className="mt-3 space-y-2">
                          {related.map((programme) => (
                            <li key={programme.slug}>
                              <Link
                                href={`/what-we-do/${programme.slug}`}
                                className={cn(
                                  "inline-flex min-h-11 items-center font-bold no-underline",
                                  focusRing,
                                )}
                              >
                                {programme.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
