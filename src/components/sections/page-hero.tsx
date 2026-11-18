import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { DecorativeCircles } from "@/components/ui/decorative-circles";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn, focusRing } from "@/lib/utils";

export type Crumb = {
  label: string;
  href?: string;
};

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  breadcrumbs?: readonly Crumb[];
  image?: { src: string; alt: string };
  imageLabel?: string;
  id?: string;
  titleAs?: "h1" | "h2";
};

export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  image,
  imageLabel = "Image coming soon",
  id,
  titleAs = "h1",
}: PageHeroProps) {
  return (
    <div className="relative overflow-hidden bg-background">
      <DecorativeCircles />
      <Container className="relative py-12 sm:py-16 lg:py-20">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-neutral-80">
              {breadcrumbs.map((crumb, index) => {
                const last = index === breadcrumbs.length - 1;
                return (
                  <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                    {index > 0 ? (
                      <span aria-hidden="true" className="text-lavender-100">
                        /
                      </span>
                    ) : null}
                    {crumb.href && !last ? (
                      <Link href={crumb.href} className={cn("no-underline", focusRing)}>
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current={last ? "page" : undefined} className="text-foreground">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <SectionHeading id={id} as={titleAs} eyebrow={eyebrow} title={title} intro={intro} />
          <div className="overflow-hidden rounded-3xl">
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                width={960}
                height={720}
                sizes="(min-width: 1024px) 38vw, 100vw"
                priority
                className="aspect-[4/3] w-full object-cover"
              />
            ) : (
              <ImagePlaceholder label={imageLabel} className="rounded-3xl" />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
