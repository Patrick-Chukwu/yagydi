import { Accountability } from "@/components/about/accountability";
import { BrandColours } from "@/components/about/brand-colours";
import { CoreValues } from "@/components/about/core-values";
import { AboutMissionVision } from "@/components/about/mission-vision";
import { OurStory } from "@/components/about/our-story";
import { SdgChampions } from "@/components/about/sdg-champions";
import { TeamBoard } from "@/components/about/team-board";
import { AboutWho } from "@/components/about/who-we-are";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { about } from "@/content/about";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About Us",
  description: about.intro,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Young and Gifted. Leading change for over two decades."
        intro={about.intro}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
        imageLabel="Photograph coming soon"
      />
      <AboutWho />
      <OurStory />
      <AboutMissionVision />
      <CoreValues />
      <BrandColours />
      <SdgChampions />
      <TeamBoard />
      <Accountability />
      <CTABanner
        title="Are you with us?"
        text="Young people are already organising for a fairer society. Bring your time, your voice, or your support."
        actions={[
          { label: "Get involved", href: "/get-involved", variant: "primary" },
          { label: "Donate", href: "/donate", variant: "white" },
        ]}
      />
    </>
  );
}
