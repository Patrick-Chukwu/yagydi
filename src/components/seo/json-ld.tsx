import type { Post } from "@/content/posts";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/site-url";

function jsonLdScript(data: Record<string, unknown>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function OrganizationJsonLd() {
  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": ["NGO", "Organization"],
    name: site.fullName,
    alternateName: [site.name, site.formerName],
    url: absoluteUrl("/"),
    logo: absoluteUrl(site.logo.src),
    slogan: site.tagline,
    description: site.brandStatement,
    sameAs: site.socials.map((social) => social.href),
    areaServed: [
      { "@type": "Country", name: "Nigeria" },
      { "@type": "Place", name: "Africa" },
    ],
  });
}

export function ArticleJsonLd({ post }: { post: Post }) {
  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: absoluteUrl(`/latest/${post.slug}`),
  });
}
