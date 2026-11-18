import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { programmes } from "@/content/programmes";
import { absoluteUrl } from "@/lib/site-url";

const staticPaths = [
  "/",
  "/about",
  "/what-we-do",
  "/what-we-do/partnership",
  "/strategic-focus",
  "/get-involved",
  "/donate",
  "/research",
  "/latest",
  "/contact",
  "/privacy",
  "/safeguarding",
  "/whistleblowing",
  "/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const programmeEntries: MetadataRoute.Sitemap = programmes.map((programme) => ({
    url: absoluteUrl(`/what-we-do/${programme.slug}`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/latest/${post.slug}`),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...programmeEntries, ...postEntries];
}
