import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ShareButtons } from "@/components/latest/share-buttons";
import { PageHero } from "@/components/sections/page-hero";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getPost, posts } from "@/content/posts";
import { isPlaceholderUrl } from "@/lib/external-url";
import { formatDisplayDate } from "@/lib/format-date";
import { pageMetadata } from "@/lib/metadata";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    notFound();
  }

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/latest/${post.slug}`,
    openGraphType: "article",
  });
}

export default function PostPage({ params }: PostPageProps) {
  return (
    <Suspense fallback={<PostFallback />}>
      <PostContent params={params} />
    </Suspense>
  );
}

async function PostContent({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    notFound();
  }

  const path = `/latest/${post.slug}`;
  const registrationReady = post.registrationUrl ? !isPlaceholderUrl(post.registrationUrl) : false;

  return (
    <>
      <ArticleJsonLd post={post} />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        intro={post.excerpt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Latest", href: "/latest" },
          { label: post.title },
        ]}
        imageLabel={post.imageLabel}
      />
      <Section background="white" labelledBy="post-body-heading">
        <Container>
          <div className="max-w-[70ch]">
            <p className="text-base text-neutral-80">
              <time dateTime={post.date}>{formatDisplayDate(post.date)}</time>
              <span aria-hidden="true"> · </span>
              <span>Author: {post.author}</span>
            </p>

            {post.category === "Event" && post.registrationUrl ? (
              <div className="mt-8 rounded-3xl border border-lavender-100 bg-lavender-20 p-6">
                <h2 id="post-body-heading" className="text-2xl text-wisteria-900">
                  Register
                </h2>
                {registrationReady ? (
                  <div className="mt-4">
                    <Button
                      href={post.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="lg"
                    >
                      Register
                    </Button>
                  </div>
                ) : (
                  <p className="mt-3 text-base leading-relaxed text-foreground">Registration coming soon.</p>
                )}
              </div>
            ) : (
              <h2 id="post-body-heading" className="sr-only">
                {post.title}
              </h2>
            )}

            <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground">
              {post.body.map((paragraph, index) => (
                <p key={`${post.slug}-${index}`}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12">
              <ShareButtons path={path} title={post.title} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function PostFallback() {
  return (
    <div aria-busy="true" aria-live="polite" className="bg-background">
      <p className="sr-only">Loading page</p>
      <div className="border-b border-lavender-40">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="h-4 w-32 rounded-full bg-lavender-40 motion-safe:animate-pulse" />
          <div className="mt-6 h-12 w-full max-w-xl rounded-2xl bg-lavender-40 motion-safe:animate-pulse" />
          <div className="mt-4 h-20 w-full max-w-2xl rounded-2xl bg-lavender-20 motion-safe:animate-pulse" />
          <div className="mt-8 h-56 w-full max-w-md rounded-3xl bg-lavender-40 motion-safe:animate-pulse sm:h-72" />
        </div>
      </div>
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="h-6 w-48 rounded-full bg-lavender-40 motion-safe:animate-pulse" />
        <div className="mt-6 h-40 max-w-[70ch] rounded-3xl bg-lavender-20 motion-safe:animate-pulse" />
      </div>
    </div>
  );
}
