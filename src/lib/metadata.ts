import type { Metadata } from "next";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/site-url";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  /** Root page title. The layout template does not apply on `/`. */
  absolute?: boolean;
  openGraphType?: "website" | "article";
  index?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  absolute = false,
  openGraphType = "website",
  index = true,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = absolute ? title : `${title} | ${site.name}`;

  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: site.name,
      locale: "en_NG",
      type: openGraphType,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
  };
}
