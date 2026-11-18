import { site } from "@/content/site";
import { SocialIcon } from "@/components/ui/social-icon";
import { cn, focusRing, focusRingOnDark } from "@/lib/utils";

type SocialLinksProps = {
  tone?: "light" | "dark";
  className?: string;
};

export function SocialLinks({ tone = "dark", className }: SocialLinksProps) {
  const onDark = tone === "dark";

  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {site.socials.map((social) => (
        <li key={social.name}>
          <a
            href={social.href}
            aria-label={`${site.name} on ${social.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "grid size-9 place-items-center rounded-full no-underline",
              onDark ? "text-white hover:bg-white/10" : "text-wisteria-700 hover:bg-wisteria-20",
              onDark ? focusRingOnDark : focusRing,
            )}
          >
            <SocialIcon name={social.name} />
          </a>
        </li>
      ))}
    </ul>
  );
}
