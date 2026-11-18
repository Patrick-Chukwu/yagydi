import Image from "next/image";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn, focusRing } from "@/lib/utils";

type QuoteBlockProps = {
  quote: string;
  name: string;
  role: string;
  href: string;
  cta?: string;
  photo?: { src: string; alt: string };
  photoLabel?: string;
  className?: string;
};

export function QuoteBlock({
  quote,
  name,
  role,
  href,
  cta = "Read their story",
  photo,
  photoLabel = "Photo coming soon",
  className,
}: QuoteBlockProps) {
  return (
    <figure className={cn("grid items-center gap-6 md:grid-cols-[8.5rem_minmax(0,1fr)]", className)}>
      <div className="overflow-hidden rounded-full">
        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            width={272}
            height={272}
            sizes="136px"
            className="aspect-square w-full object-cover"
          />
        ) : (
          <ImagePlaceholder label={photoLabel} className="aspect-square rounded-full" />
        )}
      </div>
      <div>
        <blockquote>
          <p className="text-2xl font-medium leading-snug text-wisteria-900 sm:text-3xl">“{quote}”</p>
        </blockquote>
        <figcaption className="mt-5">
          <p className="font-bold text-foreground">{name}</p>
          <p className="text-base text-neutral-80">{role}</p>
          <Link href={href} className={cn("mt-4 inline-flex font-bold", focusRing)}>
            {cta}
          </Link>
        </figcaption>
      </div>
    </figure>
  );
}
