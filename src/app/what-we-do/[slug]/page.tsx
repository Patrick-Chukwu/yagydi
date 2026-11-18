import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProgrammeDetail } from "@/components/programmes/programme-detail";
import { PageHero } from "@/components/sections/page-hero";
import { getProgramme, programmes } from "@/content/programmes";
import { pageMetadata } from "@/lib/metadata";

type ProgrammePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return programmes.map((programme) => ({ slug: programme.slug }));
}

export async function generateMetadata({ params }: ProgrammePageProps) {
  const { slug } = await params;
  const programme = getProgramme(slug);
  if (!programme) {
    notFound();
  }

  return pageMetadata({
    title: programme.title,
    description: programme.summary,
    path: `/what-we-do/${programme.slug}`,
  });
}

export default function ProgrammePage({ params }: ProgrammePageProps) {
  return (
    <Suspense fallback={<ProgrammeFallback />}>
      <ProgrammeContent params={params} />
    </Suspense>
  );
}

async function ProgrammeContent({ params }: ProgrammePageProps) {
  const { slug } = await params;
  const programme = getProgramme(slug);
  if (!programme) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={programme.shortTitle}
        title={programme.title}
        intro={programme.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "What We Do", href: "/what-we-do" },
          { label: programme.title },
        ]}
        imageLabel={programme.title}
      />
      <ProgrammeDetail programme={programme} />
    </>
  );
}

function ProgrammeFallback() {
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
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-12 sm:px-6 md:grid-cols-2 lg:py-16">
        <div className="h-48 rounded-3xl bg-lavender-40 motion-safe:animate-pulse" />
        <div className="h-48 rounded-3xl bg-lavender-40 motion-safe:animate-pulse" />
        <div className="h-40 rounded-3xl bg-lavender-20 motion-safe:animate-pulse md:col-span-2" />
      </div>
    </div>
  );
}
