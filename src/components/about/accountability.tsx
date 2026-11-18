import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { footerNav } from "@/content/navigation";
import { annualReports } from "@/content/reports";
import { cn, focusRing } from "@/lib/utils";

const policyHrefs = ["/safeguarding", "/whistleblowing", "/privacy"] as const;

const safeguardingCopy = [
  "YAGYDI expects staff, volunteers, and partners to keep young people safe and to be open about how resources are used.",
  "Questions about safety, concerns, or personal information belong on the safeguarding, whistleblowing, and privacy pages linked below.",
  "Annual reports will be added here when they are ready. Until then, the downloads stay switched off.",
] as const;

function policyLinks() {
  const links = footerNav.flatMap((group) => group.links);
  return policyHrefs.flatMap((href) => {
    const match = links.filter((link) => link.href === href).at(-1);
    return match ? [match] : [];
  });
}

export function Accountability() {
  const links = policyLinks();

  return (
    <Section id="safeguarding" background="offwhite" labelledBy="safeguarding-heading">
      <Container>
        <SectionHeading id="safeguarding-heading" title="Accountability and safeguarding" />
        <div className="mt-6 max-w-[70ch] space-y-4">
          {safeguardingCopy.map((sentence) => (
            <p key={sentence} className="text-lg leading-relaxed text-foreground">
              {sentence}
            </p>
          ))}
        </div>
        {links.length > 0 ? (
          <nav aria-label="Accountability policies" className="mt-8">
            <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={cn("font-bold", focusRing)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        <h3 className="mt-12 text-2xl text-wisteria-900">Annual reports</h3>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2">
          {annualReports.map((report) => (
            <li key={report.id} className="min-w-0">
              <article className="flex h-full flex-col rounded-3xl border border-lavender-100 bg-white p-6">
                <h4 className="text-xl text-wisteria-900">{report.title}</h4>
                <p id={`${report.id}-note`} className="mt-3 flex-1 text-base leading-relaxed text-neutral-80">
                  {report.note}
                </p>
                <div className="mt-6">
                  <Button type="button" variant="outline" disabled aria-describedby={`${report.id}-note`}>
                    Download PDF
                  </Button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
