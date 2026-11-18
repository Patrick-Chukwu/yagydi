export function isPlaceholderUrl(url: string) {
  return url.includes("XXXXXX");
}

export function tallyFormId(url: string) {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    const marker = parts.findIndex((part) => part === "r" || part === "embed");
    const id = marker >= 0 ? parts[marker + 1] : parts[parts.length - 1];
    return id ?? "";
  } catch {
    return "";
  }
}

export function tallyEmbedUrl(shareUrl: string, hiddenFields?: Record<string, string>) {
  const params = new URLSearchParams({
    alignLeft: "1",
    hideTitle: "1",
    transparentBackground: "1",
    dynamicHeight: "1",
  });

  if (hiddenFields) {
    for (const [key, value] of Object.entries(hiddenFields)) {
      params.set(key, value);
    }
  }

  return `https://tally.so/embed/${tallyFormId(shareUrl)}?${params.toString()}`;
}

export function googleFormEmbedUrl(shareUrl: string, hiddenFields?: Record<string, string>) {
  try {
    const parsed = new URL(shareUrl);
    parsed.searchParams.set("embedded", "true");
    if (hiddenFields) {
      for (const [key, value] of Object.entries(hiddenFields)) {
        parsed.searchParams.set(key, value);
      }
    }
    return parsed.toString();
  } catch {
    return shareUrl;
  }
}
