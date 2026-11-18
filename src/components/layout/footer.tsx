import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { CopyrightYear } from "@/components/layout/copyright-year";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { SocialLinks } from "@/components/layout/social-links";
import { Container } from "@/components/ui/container";
import { DecorativeCircles } from "@/components/ui/decorative-circles";
import { Logo } from "@/components/ui/logo";
import { SDGBadge } from "@/components/ui/sdg-badge";
import { footerNav } from "@/content/navigation";
import { site } from "@/content/site";
import { cn, focusRingOnDark } from "@/lib/utils";

type FooterProps = {
  logoReady: boolean;
};

export function Footer({ logoReady }: FooterProps) {
  const legal = footerNav.find((group) => group.heading === "Legal");
  const privacy = legal?.links.find((link) => link.href === "/privacy");
  const safeguarding = legal?.links.find((link) => link.href === "/safeguarding");

  return (
    <footer className="bg-black text-white">
      <section
        id="newsletter"
        aria-labelledby="newsletter-heading"
        className="relative scroll-mt-32 overflow-hidden bg-wisteria-100"
      >
        <DecorativeCircles tone="on-dark" />
        <Container className="relative grid items-center gap-8 py-12 lg:grid-cols-2">
          <div>
            <h2
              id="newsletter-heading"
              className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl"
            >
              Are you with us?
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-white sm:text-lg">
              Hear how young people are building a fairer society, together.
            </p>
          </div>
          <NewsletterForm />
        </Container>
      </section>

      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
          <div>
            <Link
              href="/"
              aria-label={`${site.name} home`}
              className={cn("inline-flex rounded-md", focusRingOnDark)}
            >
              <Logo available={logoReady} tone="inverse" />
            </Link>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-white">{site.brandStatement}</p>
            <p className="mt-4 text-base font-bold text-white">{site.hashtag}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {footerNav.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-orange-40">
                  {group.heading}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={`${group.heading}-${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className={cn(
                          "text-sm text-white no-underline hover:underline",
                          focusRingOnDark,
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-8 border-t border-white/15 pt-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-orange-40">Contact</h2>
            {/* TODO: replace with real content */}
            <ul className="mt-4 space-y-3 text-sm text-white">
              <li className="flex items-start gap-3">
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-orange-40" />
                <span className="min-w-0 break-words">{site.contact.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-orange-40" />
                <span className="min-w-0 break-words">{site.contact.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-orange-40" />
                <span className="min-w-0 break-words">{site.contact.address}</span>
              </li>
            </ul>
          </div>
          <SocialLinks tone="dark" />
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-3" aria-label="Sustainable Development Goals">
          {site.sdgs.map((sdg) => (
            <li key={sdg.id}>
              <SDGBadge id={sdg.id} name={sdg.name} tone="inverse" />
            </li>
          ))}
        </ul>
      </Container>

      <div className="border-t border-white/15">
        <Container className="py-5">
          <ul className="flex flex-col gap-2 text-sm leading-relaxed text-lavender-40 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
            <li className="text-white">
              © <CopyrightYear /> {site.fullName} ({site.name}). All rights reserved.
            </li>
            <li aria-hidden="true" className="hidden sm:list-item">
              |
            </li>
            <li>
              {/* TODO: replace with real content */}
              Registered NGO in Nigeria [RC number PLACEHOLDER]
            </li>
            {privacy ? (
              <>
                <li aria-hidden="true" className="hidden sm:list-item">
                  |
                </li>
                <li>
                  <Link
                    href={privacy.href}
                    className={cn("text-white no-underline hover:underline", focusRingOnDark)}
                  >
                    Privacy
                  </Link>
                </li>
              </>
            ) : null}
            {safeguarding ? (
              <>
                <li aria-hidden="true" className="hidden sm:list-item">
                  |
                </li>
                <li>
                  <Link
                    href={safeguarding.href}
                    className={cn("text-white no-underline hover:underline", focusRingOnDark)}
                  >
                    Safeguarding
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
