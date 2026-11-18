import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn, focusRing } from "@/lib/utils";

type NewsCardProps = {
  title: string;
  excerpt: string;
  href: string;
  date?: string;
  image?: { src: string; alt: string };
  imageLabel?: string;
  className?: string;
};

export function NewsCard({
  title,
  excerpt,
  href,
  date,
  image,
  imageLabel = "Image coming soon",
  className,
}: NewsCardProps) {
  return (
    <article className={cn("h-full", className)}>
      <Link
        href={href}
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-3xl border border-lavender-100 bg-white text-foreground no-underline shadow-sm transition hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none",
          focusRing,
        )}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={800}
            height={600}
            sizes="(min-width: 640px) 50vw, 100vw"
            className="aspect-[4/3] w-full object-cover"
          />
        ) : (
          <ImagePlaceholder label={imageLabel} />
        )}
        <div className="flex flex-1 flex-col p-6">
          {date ? <p className="text-sm font-semibold text-neutral-60">{date}</p> : null}
          <h3 className="mt-2 text-2xl leading-snug text-wisteria-900">{title}</h3>
          <p className="mt-3 flex-1 text-base leading-relaxed text-neutral-80">{excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-2 font-bold text-wisteria-700">
            Read more
            <ArrowRight aria-hidden="true" className="size-4" />
          </span>
        </div>
      </Link>
    </article>
  );
}
