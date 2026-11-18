const LOCAL_FALLBACK = "http://localhost:3000";

/** Public site origin. Local dev uses localhost when NEXT_PUBLIC_SITE_URL is unset. */
export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return LOCAL_FALLBACK;

  try {
    const url = new URL(configured);
    if (url.protocol !== "http:" && url.protocol !== "https:") return LOCAL_FALLBACK;
    return url.origin;
  } catch {
    return LOCAL_FALLBACK;
  }
}

export function absoluteUrl(path: string) {
  const base = getSiteUrl();
  if (path === "/" || path === "") return base;
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalised}`;
}
