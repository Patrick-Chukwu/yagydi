import { GraduationCap, HandCoins, Handshake, Users, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { EmbeddedForm } from "@/components/forms/EmbeddedForm";
import { FormPopupButton } from "@/components/forms/FormPopupButton";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/content/about";
import { opportunities, isOpportunityClosed } from "@/content/opportunities";
import { partnership } from "@/content/partnership";
import { programmes } from "@/content/programmes";
import { isPlaceholderUrl } from "@/lib/external-url";
import { formatDisplayDate } from "@/lib/format-date";
import { pageMetadata } from "@/lib/metadata";
import { cn, focusRing } from "@/lib/utils";

const description =
  "Volunteer, join a programme, partner, or give. There is a way to stand with young people at YAGYDI.";

export const metadata = pageMetadata({
  title: "Get Involved",
  description,
  path: "/get-involved",
});

const pathways: readonly {
  href: string;
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    href: "#volunteer",
    title: "Volunteer",
    text: "Give time to the programme work already happening in communities.",
    icon: Users,
  },
  {
    href: "#programmes",
    title: "Join a programme or fellowship",
    text: "Fellowships, internships, and volunteer roles are listed below.",
    icon: GraduationCap,
  },
  {
    href: "#partner",
    title: "Partner with us",
    text: "Schools, agencies, and organisations can co-create with YAGYDI.",
    icon: Handshake,
  },
  {
    href: "/donate",
    title: "Donate",
    text: "Give once or monthly. Gifts are completed with a payment partner.",
    icon: HandCoins,
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Are you with us?"
        title="There's a place for you in the movement."
        intro="Whether you have an hour, a partnership, or a skill to share, there is a way to stand with young people."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get Involved" },
        ]}
        imageLabel="Photograph coming soon"
      />

      <Section background="white" labelledBy="pathways-heading">
        <Container>
          <SectionHeading id="pathways-heading" title="Choose a way in" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {pathways.map((pathway) => {
              const Icon = pathway.icon;
              return (
                <li key={pathway.href} className="min-w-0">
                  <Link
                    href={pathway.href}
                    className={cn(
                      "flex h-full min-w-0 flex-col rounded-3xl border border-lavender-100 bg-white p-6 text-foreground no-underline shadow-sm",
                      focusRing,
                    )}
                  >
                    <span className="grid size-12 place-items-center rounded-2xl bg-wisteria-20 text-wisteria-700">
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <h3 className="mt-5 text-xl text-wisteria-900">{pathway.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-neutral-80">{pathway.text}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section id="volunteer" background="offwhite" labelledBy="volunteer-heading">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div className="min-w-0">
              <SectionHeading id="volunteer-heading" eyebrow="Volunteer" title="Bring your time." />
              <h3 className="mt-8 text-2xl text-wisteria-900">Why volunteer</h3>
              <p className="mt-3 text-base leading-relaxed text-foreground">{about.paragraphs[0]}</p>
              <p className="mt-3 text-base leading-relaxed text-neutral-80">
                Volunteers help that work reach communities.
              </p>
              <h3 className="mt-8 text-2xl text-wisteria-900">What volunteers do</h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-80">
                They support the programme areas YAGYDI already runs:
              </p>
              <ul className="mt-4 space-y-2">
                {programmes.map((programme) => (
                  <li key={programme.slug}>
                    <Link
                      href={`/what-we-do/${programme.slug}`}
                      className={cn("font-bold", focusRing)}
                    >
                      {programme.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 text-2xl text-wisteria-900">Who can join</h3>
              <p className="mt-3 text-base leading-relaxed text-foreground">
                Ages 15–35, all genders, all backgrounds.
              </p>
            </div>
            <EmbeddedForm formId="volunteer" hiddenFields={{ source: "get-involved" }} />
          </div>
        </Container>
      </Section>

      <Section id="partner" background="white" labelledBy="partner-heading">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div className="min-w-0">
              <SectionHeading
                id="partner-heading"
                eyebrow="Partnership"
                title="Partner with us"
                intro={partnership.intro}
              />
              <h3 className="mt-8 text-2xl text-wisteria-900">We partner with</h3>
              <ul className="mt-4 space-y-2">
                {partnership.partnerWith.map((item) => (
                  <li key={item} className="text-base leading-relaxed text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 text-2xl text-wisteria-900">We co-create</h3>
              <ul className="mt-4 space-y-2">
                {partnership.coCreate.map((item) => (
                  <li key={item} className="text-base leading-relaxed text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-base leading-relaxed text-neutral-80">{partnership.impact}</p>
            </div>
            <EmbeddedForm formId="partner" />
          </div>
        </Container>
      </Section>

      <Section id="programmes" background="lavender" labelledBy="programmes-heading">
        <Container>
          <SectionHeading
            id="programmes-heading"
            title="Join a programme or fellowship"
            intro="These calls are placeholders and are not open roles."
          />
          <Suspense fallback={<p className="mt-10 text-base text-neutral-80">Loading open calls.</p>}>
            <OpportunityCards />
          </Suspense>
        </Container>
      </Section>
    </>
  );
}

async function OpportunityCards() {
  await connection();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <ul className="mt-10 grid gap-5 lg:grid-cols-3">
      {opportunities.map((opportunity) => {
        const closed = isOpportunityClosed(opportunity.deadline, today);
        const externalApply =
          opportunity.applyUrl && !isPlaceholderUrl(opportunity.applyUrl) ? opportunity.applyUrl : null;
        return (
          <li key={opportunity.id} className="min-w-0">
            <article
              className={cn(
                "flex h-full min-w-0 flex-col rounded-3xl border border-lavender-100 p-6",
                closed ? "bg-lavender-40" : "bg-white",
              )}
            >
              <p className="text-sm font-bold text-wisteria-700">{opportunity.type}</p>
              <h3 className="mt-2 text-2xl text-balance text-wisteria-900">{opportunity.title}</h3>
              <p className="mt-3 text-base text-foreground">{opportunity.location}</p>
              <p className="mt-2 text-sm font-semibold text-neutral-80">
                <time dateTime={opportunity.deadline}>Deadline {formatDisplayDate(opportunity.deadline)}</time>
                {closed ? <span className="ml-2 font-bold text-foreground">Closed</span> : null}
              </p>
              <p className="mt-4 flex-1 text-base leading-relaxed text-neutral-80">{opportunity.description}</p>
              {closed ? null : (
                <div className="mt-6">
                  {externalApply ? (
                    <Button href={externalApply} target="_blank" rel="noopener noreferrer">
                      Apply
                    </Button>
                  ) : opportunity.applyUrl ? (
                    <p className="text-base font-semibold text-wisteria-900">Applications coming soon</p>
                  ) : (
                    <FormPopupButton formId="opportunity">Apply</FormPopupButton>
                  )}
                </div>
              )}
            </article>
          </li>
        );
      })}
    </ul>
  );
}
