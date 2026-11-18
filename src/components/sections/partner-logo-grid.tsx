import Image from "next/image";
import { partnerLogos, type PartnerLogo } from "@/content/partnership";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn } from "@/lib/utils";

type PartnerLogoGridProps = {
  partners?: readonly PartnerLogo[];
  className?: string;
};

export function PartnerLogoGrid({ partners = partnerLogos, className }: PartnerLogoGridProps) {
  return (
    <ul className={cn("grid grid-cols-2 gap-4 sm:grid-cols-4", className)}>
      {partners.map((partner) => (
        <li
          key={partner.name}
          className="overflow-hidden rounded-2xl border border-lavender-100 bg-white grayscale transition duration-300 hover:grayscale-0 focus-within:grayscale-0 motion-reduce:transition-none"
        >
          {/* TODO: replace with real content */}
          {partner.src ? (
            <Image
              src={partner.src}
              alt={partner.name}
              width={320}
              height={160}
              sizes="(min-width: 640px) 25vw, 50vw"
              className="h-28 w-full object-contain p-4"
            />
          ) : (
            <ImagePlaceholder label={partner.name} className="h-28 aspect-auto" />
          )}
        </li>
      ))}
    </ul>
  );
}
