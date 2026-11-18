import { FourPs } from "@/components/home/four-ps";
import { HomeHero } from "@/components/home/hero";
import { ImpactBand } from "@/components/home/impact-band";
import { LatestStories } from "@/components/home/latest-stories";
import { MissionVision } from "@/components/home/mission-vision";
import { Partners } from "@/components/home/partners";
import { SdgStrip } from "@/components/home/sdg-strip";
import { StrategicPreview } from "@/components/home/strategic-preview";
import { WhatWeDo } from "@/components/home/what-we-do";
import { WhoWeAre } from "@/components/home/who-we-are";
import { YouthLeaders } from "@/components/home/youth-leaders";
import { YouthVoice } from "@/components/home/youth-voice";
import { CTABanner } from "@/components/sections/cta-banner";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { site } from "@/content/site";
import { heroVideoExists } from "@/lib/hero-video";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: `Home | ${site.name}`,
  description: site.brandStatement,
  path: "/",
  absolute: true,
});

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <HomeHero />
      <ImpactBand />
      <WhoWeAre />
      <FourPs />
      <WhatWeDo />
      <YouthLeaders hasVideo={heroVideoExists()} />
      <MissionVision />
      <SdgStrip />
      <YouthVoice />
      <StrategicPreview />
      <LatestStories />
      <CTABanner
        id="donate"
        tone="orange"
        title="Invest in a young person's future"
        text="A gift stands with a young person who is ready to learn, speak, and lead. Give once, or stay beside them every month."
        actions={[
          { label: "Donate once", href: "/donate", variant: "secondary" },
          { label: "Give monthly", href: "/donate", variant: "white" },
        ]}
      />
      <Partners />
    </>
  );
}
