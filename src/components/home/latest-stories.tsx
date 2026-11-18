import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { NewsCard } from "@/components/sections/news-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getLatestPosts } from "@/content/posts";
import { latestIntro } from "@/content/stories";
import { formatDisplayDate } from "@/lib/format-date";
import { cn, focusRing } from "@/lib/utils";

export function LatestStories() {
  const stories = getLatestPosts(3);

  return (
    <Section id="latest" background="offwhite" labelledBy="latest-heading">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading id="latest-heading" title="Latest news and stories" intro={latestIntro} />
          <Link
            href="/latest"
            className={cn(
              "inline-flex shrink-0 items-center gap-2 font-bold",
              focusRing,
            )}
          >
            View all
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <li key={story.slug} className="min-w-0">
              <NewsCard
                title={story.title}
                excerpt={story.excerpt}
                href={`/latest/${story.slug}`}
                date={formatDisplayDate(story.date)}
                imageLabel={story.imageLabel}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
