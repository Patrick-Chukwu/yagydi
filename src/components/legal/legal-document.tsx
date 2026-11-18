import Link from "next/link";
import { Container } from "@/components/ui/container";
import { legalDraftBanner, type LegalPageContent } from "@/content/legal";
import { cn, focusRing } from "@/lib/utils";

type LegalDocumentProps = {
  page: LegalPageContent;
};

export function LegalDocument({ page }: LegalDocumentProps) {
  return (
    <article className="bg-background">
      <header className="border-b border-lavender-40 bg-white">
        <Container className="py-10 sm:py-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-neutral-80">
              <li>
                <Link href="/" className={cn("no-underline", focusRing)}>
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="text-lavender-100">
                  /
                </span>
                <span aria-current="page" className="text-foreground">
                  {page.breadcrumb}
                </span>
              </li>
            </ol>
          </nav>
          <p className="mt-6 inline-flex max-w-full rounded-full bg-wisteria-20 px-3 py-1 text-sm font-bold text-wisteria-900">
            {legalDraftBanner}
          </p>
          <h1 className="mt-4 max-w-[20ch] text-4xl leading-tight text-wisteria-100 sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-4 max-w-[70ch] text-lg leading-relaxed text-foreground">{page.intro}</p>
        </Container>
      </header>

      <Container className="py-10 sm:py-14">
        <p className="max-w-[70ch] rounded-2xl border-2 border-wisteria-100 bg-wisteria-20 px-4 py-3 text-base font-bold leading-relaxed text-wisteria-900">
          {legalDraftBanner} This wording is for review. It is not an adopted YAGYDI policy.
        </p>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,70ch)]">
          <nav aria-label="On this page" className="min-w-0 lg:sticky lg:top-32">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-wisteria-700">
              On this page
            </p>
            <ol className="mt-3 space-y-2">
              {page.sections.map((section) => (
                <li key={section.id} className="min-w-0">
                  <a
                    href={`#${section.id}`}
                    className={cn("inline-block max-w-full font-semibold break-words", focusRing)}
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0 max-w-[70ch]">
            {page.sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id} className="mt-10 first:mt-0">
                <h2 id={section.id} className="scroll-mt-32 text-2xl text-wisteria-100 sm:text-3xl">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-4 text-lg leading-relaxed text-foreground">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.links && section.links.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className={cn("font-bold", focusRing)}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </article>
  );
}
