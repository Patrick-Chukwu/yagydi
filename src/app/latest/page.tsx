import { LatestBrowser } from "@/components/latest/latest-browser";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getPostsByDate } from "@/content/posts";
import { latestIntro } from "@/content/stories";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Latest",
  description: latestIntro,
  path: "/latest",
});

export default function LatestPage() {
  const posts = getPostsByDate();

  return (
    <>
      <PageHero
        eyebrow="Latest"
        title="News, stories, and events."
        intro={latestIntro}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Latest" },
        ]}
        imageLabel="[Image coming soon]"
      />
      <Section background="offwhite" labelledBy="latest-list-heading">
        <Container>
          <h2 id="latest-list-heading" className="sr-only">
            Posts
          </h2>
          <LatestBrowser posts={posts} />
        </Container>
      </Section>
    </>
  );
}
