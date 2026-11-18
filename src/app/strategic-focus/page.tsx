import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { FocusPillars } from "@/components/strategy/focus-pillars";
import { mainNav, donateCta } from "@/content/navigation";
import { strategicFocus } from "@/content/strategic-focus";
import { pageMetadata } from "@/lib/metadata";

const getInvolved = mainNav.find((item) => item.href === "/get-involved");

export const metadata = pageMetadata({
  title: "Strategic Focus",
  description: strategicFocus.intro,
  path: "/strategic-focus",
});

export default function StrategicFocusPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Strategic Focus"
        title="Where we invest for measurable impact."
        intro={strategicFocus.intro}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Strategic Focus" },
        ]}
        imageLabel="Strategic focus"
      />
      <FocusPillars />
      <CTABanner
        title="Work with us on what matters."
        text="Partner, volunteer, or give so these pillars stay resourced and youth-led."
        actions={[
          { label: "Get involved", href: getInvolved?.href ?? "/get-involved", variant: "primary" },
          { label: donateCta.label, href: donateCta.href, variant: "white" },
        ]}
      />
    </>
  );
}
