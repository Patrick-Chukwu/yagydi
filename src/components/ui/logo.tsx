"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { logo, site } from "@/content/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** Server-side file check. A missing file renders the wordmark. */
  available: boolean;
  tone?: "default" | "inverse";
  size?: "sm" | "md";
  className?: string;
  preload?: boolean;
};

const sizes = {
  sm: "h-10 w-36",
  md: "h-12 w-44",
} as const;

export function Logo({
  available,
  tone = "default",
  size = "md",
  className,
  preload = false,
}: LogoProps) {
  const [failed, setFailed] = useState(false);
  const filterId = `logo-knockout-${useId().replace(/:/g, "")}`;
  const inverse = tone === "inverse";

  if (!available || failed) {
    return (
      <span
        className={cn(
          "inline-flex items-center font-extrabold tracking-tight",
          size === "sm" ? "text-xl" : "text-2xl",
          inverse ? "text-white" : "text-wisteria-100",
          className,
        )}
      >
        {site.name}
      </span>
    );
  }

  return (
    <span className={cn("relative block overflow-hidden", sizes[size], className)}>
      {inverse ? (
        <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -1 -1 -1 0 2.6"
            />
          </filter>
        </svg>
      ) : null}
      <Image
        src={logo.src}
        alt={logo.alt}
        fill
        sizes="176px"
        preload={preload}
        className="object-cover object-center"
        style={inverse ? { filter: `url(#${filterId})` } : undefined}
        onError={() => setFailed(true)}
      />
    </span>
  );
}
