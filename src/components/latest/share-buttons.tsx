"use client";

import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

type ShareButtonsProps = {
  path: string;
  title: string;
};

function useCanonicalUrl(path: string) {
  return useSyncExternalStore(
    () => () => {},
    () => new URL(path, window.location.origin).href,
    () => "",
  );
}

export function ShareButtons({ path, title }: ShareButtonsProps) {
  const url = useCanonicalUrl(path);
  const [status, setStatus] = useState("");

  const shares = url
    ? [
        {
          name: "Facebook",
          href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        },
        {
          name: "LinkedIn",
          href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        },
        {
          name: "X",
          href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        },
        {
          name: "WhatsApp",
          href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
        },
      ]
    : [];

  async function copyLink() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Link copied.");
    } catch {
      setStatus("Could not copy. Copy the address from your browser bar.");
    }
  }

  return (
    <div>
      <h2 className="text-2xl text-wisteria-900">Share this page</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {shares.length === 0
          ? ["Facebook", "LinkedIn", "X", "WhatsApp"].map((name) => (
              <li key={name}>
                <Button type="button" variant="outline" size="sm" disabled>
                  {name}
                </Button>
              </li>
            ))
          : shares.map((item) => (
              <li key={item.name}>
                <Button
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                >
                  {item.name}
                </Button>
              </li>
            ))}
        <li>
          <Button type="button" variant="outline" size="sm" onClick={() => void copyLink()} disabled={!url}>
            Copy link
          </Button>
        </li>
      </ul>
      <p role="status" aria-live="polite" className="mt-3 min-h-6 text-sm font-semibold text-wisteria-900">
        {status}
      </p>
    </div>
  );
}
