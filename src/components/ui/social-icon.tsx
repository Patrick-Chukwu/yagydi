import type { SVGProps } from "react";
import type { SocialLink } from "@/content/site";
import { cn } from "@/lib/utils";

type SocialName = SocialLink["name"];

type SocialIconProps = SVGProps<SVGSVGElement> & {
  name: SocialName;
};

export function SocialIcon({ name, className, ...props }: SocialIconProps) {
  const shared = {
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
    focusable: false as const,
    className: cn("size-5", className),
    ...props,
  };

  switch (name) {
    case "Facebook":
      return (
        <svg {...shared}>
          <path
            fill="currentColor"
            d="M14.2 8.4V6.9c0-.6.1-1 .9-1H16.5V3.4h-1.8C12.2 3.4 11 4.6 11 6.7v1.7H9.2v2.5H11V20h2.6v-9.1h2.1l.3-2.5h-2.8z"
          />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg {...shared}>
          <path
            fill="currentColor"
            d="M5.2 3.6a1.7 1.7 0 1 0 .01 3.4 1.7 1.7 0 0 0-.01-3.4zM3.7 8.6h3V20.4h-3V8.6zm6.1 0h2.8v1.6h.1c.4-.7 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7v7.1h-3v-6.3c0-1.5 0-3.4-2.1-3.4s-2.3 1.6-2.3 3.3v6.4h-3V8.6z"
          />
        </svg>
      );
    case "Instagram":
      return (
        <svg {...shared} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="4" y="4" width="16" height="16" rx="5" />
          <circle cx="12" cy="12" r="3.4" />
          <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "TikTok":
      return (
        <svg {...shared}>
          <path
            fill="currentColor"
            d="M14 3.4c.5 2.4 1.9 4 4.2 4.4v2.6c-1.4 0-2.7-.4-4.2-1.2v6.2a5.2 5.2 0 1 1-5.2-5.2c.3 0 .6 0 .9.1v2.7a2.6 2.6 0 1 0 1.8 2.5V3.4H14z"
          />
        </svg>
      );
    default: {
      const unreachable: never = name;
      return unreachable;
    }
  }
}
