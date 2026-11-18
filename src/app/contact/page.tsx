import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { EmbeddedForm } from "@/components/forms/EmbeddedForm";
import { SocialLinks } from "@/components/layout/social-links";
import { PageHero } from "@/components/sections/page-hero";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { footerNav } from "@/content/navigation";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { cn, focusRing } from "@/lib/utils";

const description =
  "Send YAGYDI a message through an external form. Office details on this page are placeholders.";

export const metadata = pageMetadata({
  title: "Contact",
  description,
  path: "/contact",
});

const safeguarding = footerNav
  .flatMap((group) => [...group.links])
  .find((link) => link.href === "/safeguarding");

function isPublished(value: string) {
  return !value.includes("[") && !value.includes("...") && !value.toLowerCase().includes("placeholder");
}

export default function ContactPage() {
  const emailPublished = isPublished(site.contact.email);
  const phonePublished = isPublished(site.contact.phone);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We are ready to hear from you."
        intro="Use the form for a message. The office details below are placeholders until they are published."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
        imageLabel="Photograph coming soon"
      />
      <Section background="offwhite" labelledBy="contact-details-heading">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div className="min-w-0">
              <h2 id="contact-details-heading" className="text-3xl text-wisteria-900">
                Contact details
              </h2>
              <ul className="mt-6 space-y-4 text-base text-foreground">
                <li className="flex items-start gap-3">
                  <Mail aria-hidden="true" className="mt-1 size-5 shrink-0 text-wisteria-700" />
                  {emailPublished ? (
                    <a href={`mailto:${site.contact.email}`} className={cn("break-words font-semibold", focusRing)}>
                      {site.contact.email}
                    </a>
                  ) : (
                    <span className="break-words">{site.contact.email}</span>
                  )}
                </li>
                <li className="flex items-start gap-3">
                  <Phone aria-hidden="true" className="mt-1 size-5 shrink-0 text-wisteria-700" />
                  {phonePublished ? (
                    <a href={`tel:${site.contact.phone}`} className={cn("break-words font-semibold", focusRing)}>
                      {site.contact.phone}
                    </a>
                  ) : (
                    <span className="break-words">{site.contact.phone}</span>
                  )}
                </li>
                <li className="flex items-start gap-3">
                  <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-wisteria-700" />
                  <span className="break-words">{site.contact.address}</span>
                </li>
              </ul>

              <h2 className="mt-10 text-2xl text-wisteria-900">Social</h2>
              <SocialLinks tone="light" className="mt-4" />

              <h2 className="mt-10 text-2xl text-wisteria-900">Office map</h2>
              <div className="mt-4 overflow-hidden rounded-3xl">
                <ImagePlaceholder label="[Office map, Nigeria]" icon={MapPin} />
              </div>
              <p className="mt-3 text-sm text-neutral-80">
                TODO: embed a map when a real office location is published.
              </p>

              <p className="mt-8 text-base leading-relaxed text-foreground">
                To report a safeguarding concern, see our{" "}
                <Link href={safeguarding?.href ?? "/safeguarding"} className={cn("font-bold", focusRing)}>
                  Safeguarding Policy
                </Link>
                .
              </p>
            </div>
            <EmbeddedForm formId="contact" />
          </div>
        </Container>
      </Section>
    </>
  );
}
