import Link from "next/link";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import { CTABanner } from "@/components/sections/cta-banner";
import { NewsCard } from "@/components/sections/news-card";
import { PageHero } from "@/components/sections/page-hero";
import { PartnerLogoGrid } from "@/components/sections/partner-logo-grid";
import { ProgrammeCard } from "@/components/sections/programme-card";
import { QuoteBlock } from "@/components/sections/quote-block";
import { BrandDivider } from "@/components/ui/brand-divider";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DecorativeCircles } from "@/components/ui/decorative-circles";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { SDGBadge } from "@/components/ui/sdg-badge";
import { Section, sectionBackgrounds } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCounter } from "@/components/ui/stat-counter";
import { donateCta, mainNav } from "@/content/navigation";
import { programmes } from "@/content/programmes";
import { impactStats, sdgs, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Styleguide",
  description: "Development-only YAGYDI brand colours, type scale, and button variants.",
  path: "/styleguide",
  index: false,
});

type Swatch = {
  step: string;
  hex: string;
  bg: string;
};

type Family = {
  name: string;
  role: string;
  meaning: string;
  swatches: readonly Swatch[];
  shades?: readonly Swatch[];
  alert?: string;
};

const families: readonly Family[] = [
  {
    name: "Burnt Orange",
    role: "Action",
    meaning:
      "Energy, creativity, and action. It stands for the enthusiasm and youthful energy that drive the work, and it is reserved for donation buttons, primary calls to action, counters, and small accents.",
    swatches: [
      { step: "100", hex: "#D87110", bg: "bg-orange-100" },
      { step: "80", hex: "#E08D40", bg: "bg-orange-80" },
      { step: "60", hex: "#E8AA70", bg: "bg-orange-60" },
      { step: "40", hex: "#EFC6A0", bg: "bg-orange-40" },
      { step: "20", hex: "#F7E3CF", bg: "bg-orange-20" },
    ],
    shades: [{ step: "700", hex: "#A9560A", bg: "bg-orange-700" }],
    alert:
      "Burnt Orange on white is only about 3.2:1. Never use it for small body text on white. For orange text use orange-700. On orange buttons use black text (or white text only if bold and at least 18px).",
  },
  {
    name: "Wisteria",
    role: "Primary",
    meaning:
      "Purpose, humanity, and leadership. Wisteria is the primary brand colour for headers, key sections, links, and navigation accents. It carries dignity, trust, and a brighter future for young people.",
    swatches: [
      { step: "100", hex: "#805D93", bg: "bg-wisteria-100" },
      { step: "80", hex: "#997DA9", bg: "bg-wisteria-80" },
      { step: "60", hex: "#B39EBE", bg: "bg-wisteria-60" },
      { step: "40", hex: "#CCBED4", bg: "bg-wisteria-40" },
      { step: "20", hex: "#E6DFE9", bg: "bg-wisteria-20" },
    ],
    shades: [
      { step: "700", hex: "#5E4370", bg: "bg-wisteria-700" },
      { step: "900", hex: "#3B2A47", bg: "bg-wisteria-900" },
    ],
  },
  {
    name: "Lavender Gray",
    role: "Care",
    meaning:
      "Care, inclusion, and community. Lavender Gray softens sections, cards, and dividers. It is a surface colour, not a text colour.",
    swatches: [
      { step: "100", hex: "#C9B6BE", bg: "bg-lavender-100" },
      { step: "80", hex: "#D4C5CB", bg: "bg-lavender-80" },
      { step: "60", hex: "#DFD3D8", bg: "bg-lavender-60" },
      { step: "40", hex: "#E9E2E5", bg: "bg-lavender-40" },
      { step: "20", hex: "#F4F0F2", bg: "bg-lavender-20" },
    ],
  },
  {
    name: "Black",
    role: "Structure",
    meaning:
      "Strength, clarity, and integrity. Black is for text, the footer, and sections that need strong contrast. The neutral row below is black mixed with white.",
    swatches: [
      { step: "100", hex: "#000000", bg: "bg-neutral-100" },
      { step: "80", hex: "#333333", bg: "bg-neutral-80" },
      { step: "60", hex: "#666666", bg: "bg-neutral-60" },
      { step: "40", hex: "#999999", bg: "bg-neutral-40" },
      { step: "20", hex: "#CCCCCC", bg: "bg-neutral-20" },
    ],
  },
];

const pairings = [
  {
    sample: "Donate",
    bg: "bg-orange-100",
    fg: "text-neutral-100",
    label: "Black on Burnt Orange",
    ratio: "6.3:1",
    verdict: "Passes AA",
    pass: true,
    note: "Use this pair for labels on orange buttons.",
  },
  {
    sample: "Donate",
    bg: "bg-orange-100",
    fg: "text-white",
    label: "White on Burnt Orange",
    ratio: "3.3:1",
    verdict: "Fails small text",
    pass: false,
    note: "Only if the type is bold and at least 18px. Prefer black.",
  },
  {
    sample: "Action",
    bg: "bg-background",
    fg: "text-orange-700",
    label: "Orange-700 on the page",
    ratio: "5.0:1",
    verdict: "Passes AA",
    pass: true,
    note: "Orange text uses #A9560A. It clears AA on #FBF9FA.",
  },
  {
    sample: "Get involved",
    bg: "bg-wisteria-100",
    fg: "text-white",
    label: "White on Wisteria",
    ratio: "5.4:1",
    verdict: "Passes AA",
    pass: true,
    note: "Safe for buttons, banners, and reversed headings.",
  },
  {
    sample: "A brighter future",
    bg: "bg-background",
    fg: "text-wisteria-100",
    label: "Wisteria on the page",
    ratio: "5.1:1",
    verdict: "Passes AA",
    pass: true,
    note: "Fine for headings. Small links use wisteria-700, about 8.0:1.",
  },
  {
    sample: "Community",
    bg: "bg-white",
    fg: "text-lavender-100",
    label: "Lavender Gray on white",
    ratio: "1.9:1",
    verdict: "Fails as text",
    pass: false,
    note: "Keep it for backgrounds, cards, and dividers.",
  },
  {
    sample: "Young people",
    bg: "bg-background",
    fg: "text-foreground",
    label: "Body text on the page",
    ratio: "16.6:1",
    verdict: "Passes AA",
    pass: true,
    note: "#1A1A1A on the off-white page, #FBF9FA.",
  },
  {
    sample: "Placeholder",
    bg: "bg-white",
    fg: "text-neutral-40",
    label: "Neutral 40 on white",
    ratio: "2.8:1",
    verdict: "Fails as text",
    pass: false,
    note: "#999999 is too light to read. Captions can use neutral-60, #666666, at 5.7:1.",
  },
] as const;

const weights = [
  { label: "Light 300", className: "font-light" },
  { label: "Regular 400", className: "font-normal" },
  { label: "Medium 500", className: "font-medium" },
  { label: "Semibold 600", className: "font-semibold" },
  { label: "Bold 700", className: "font-bold" },
  { label: "Extra bold 800", className: "font-extrabold" },
] as const;

const buttonSamples: readonly {
  variant: ButtonVariant;
  label: string;
  caption: string;
}[] = [
  {
    variant: "primary",
    label: "Donate",
    caption: "Primary. Orange field, black text. Hover darkens the fill and keeps the black label.",
  },
  {
    variant: "secondary",
    label: "Get involved",
    caption: "Secondary. Wisteria field, white text. Hover deepens to wisteria-700.",
  },
  {
    variant: "outline",
    label: "Our work",
    caption: "Outline. Wisteria border and wisteria-900 text. Hover fills with wisteria-20.",
  },
  {
    variant: "ghost",
    label: "Learn more",
    caption: "Ghost. Wisteria-900 text and no border. Hover fills with lavender-40.",
  },
  {
    variant: "white",
    label: "White",
    caption: "White field and wisteria-900 text, for use on wisteria, black, or orange bands.",
  },
];

const buttonSizes: readonly ButtonSize[] = ["sm", "md", "lg"];

const getInvolved = mainNav.find((item) => item.href === "/get-involved");

function TintRow({ swatches }: { swatches: readonly Swatch[] }) {
  return (
    <ul className="grid grid-cols-5 gap-2">
      {swatches.map((swatch) => (
        <li key={`${swatch.step}-${swatch.hex}`}>
          <div className={cn("h-16 rounded-xl", swatch.bg)} />
          <p className="mt-2 text-xs font-bold text-foreground">{swatch.step}</p>
          <p className="text-[11px] leading-tight text-neutral-80 sm:text-xs">{swatch.hex}</p>
        </li>
      ))}
    </ul>
  );
}

export default function StyleguidePage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-24 size-[28rem] rounded-full bg-wisteria-20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-[28rem] size-80 rounded-full bg-orange-20"
      />

      <header className="relative mx-auto max-w-6xl px-5 pb-12 pt-16 sm:px-8 sm:pt-24">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Eyebrow>Brand system</Eyebrow>
          <Link href="/" className="text-sm font-semibold">
            Home
          </Link>
        </div>
        <h1 className="mt-6 max-w-3xl text-5xl leading-[1.05] sm:text-7xl">Brand styleguide</h1>
        <p className="mt-6 max-w-2xl text-balance">
          Colour, type, and actions for {site.name}. {site.brandStatement} The marketing site is
          still in progress.
        </p>
        <p className="mt-3 text-sm text-neutral-80">
          Logo file: {site.logo.src}. A text wordmark shows if that file is missing.
        </p>
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          <a href="#colours">Colours</a>
          <a href="#type">Type</a>
          <a href="#buttons">Buttons</a>
          <a href="#motifs">Motifs</a>
          <a href="#sections">Sections</a>
          <a href="#hero">Page hero</a>
          <a href="#programmes">Programmes</a>
          <a href="#stats">Counters</a>
          <a href="#quote">Quote</a>
          <a href="#news">News</a>
          <a href="#partners">Partners</a>
          <a href="#sdgs">SDGs</a>
        </nav>
        <BrandDivider className="mt-10" />
      </header>

      <section id="colours" aria-labelledby="colours-heading" className="scroll-mt-8 bg-lavender-20">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <Eyebrow>Colour</Eyebrow>
            <h2 id="colours-heading" className="mt-3 text-4xl sm:text-5xl">
              Core palette
            </h2>
            <p className="mt-4 max-w-2xl">
              Four colours, each with tints at 80, 60, 40, and 20 percent white. Hex values sit
              under every swatch so the colour is never the only label.
            </p>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {families.map((family) => (
                <article key={family.name} className="rounded-3xl border border-lavender-100 bg-white p-6 sm:p-8">
                  <p className="eyebrow text-orange-700">{family.role}</p>
                  <h3 className="mt-2 text-3xl">{family.name}</h3>
                  <p className="mt-3 text-base leading-relaxed text-neutral-80">{family.meaning}</p>
                  <div
                    className={cn(
                      "mt-6 flex h-36 flex-col justify-between rounded-2xl p-5",
                      family.swatches[0]?.bg,
                      family.name === "Wisteria" || family.name === "Black"
                        ? "text-white"
                        : "text-neutral-100",
                    )}
                  >
                    <span className="text-sm font-bold">{family.swatches[0]?.step}</span>
                    <span className="text-3xl font-extrabold tracking-tight">
                      {family.swatches[0]?.hex}
                    </span>
                  </div>
                  <div className="mt-5">
                    <TintRow swatches={family.swatches} />
                  </div>
                  {family.shades ? (
                    <div className="mt-6">
                      <p className="text-sm font-semibold text-foreground">Darker text shades</p>
                      <div className="mt-3">
                        <TintRow swatches={family.shades} />
                      </div>
                    </div>
                  ) : null}
                  {family.alert ? (
                    <div className="mt-6 flex gap-3 rounded-2xl border border-orange-40 bg-orange-20 p-4 text-base leading-relaxed">
                      <Info aria-hidden="true" className="mt-1 size-5 shrink-0 text-orange-700" />
                      <p>
                        <span className="font-bold">Accessibility. </span>
                        {family.alert}
                      </p>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-dashed border-lavender-100 bg-background p-6">
                <p className="text-sm font-semibold text-neutral-80">Page background</p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">#FBF9FA</p>
                <p className="mt-2 text-base text-neutral-80">Off-white canvas for the whole site.</p>
              </div>
              <div className="rounded-3xl bg-foreground p-6 text-white">
                <p className="text-sm font-semibold text-neutral-20">Body text</p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight">#1A1A1A</p>
                <p className="mt-2 text-base text-neutral-20">
                  Default reading colour. It is not pure black.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-16">
            <h3 className="text-3xl">Text colour that passes</h3>
            <p className="mt-3 max-w-2xl text-base text-neutral-80">
              Each sample uses the real pair. The verdict underneath is set in a colour that itself
              passes AA, including the warnings.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {pairings.map((pairing) => (
                <li key={pairing.label} className="overflow-hidden rounded-2xl border border-lavender-100 bg-white">
                  <div className={cn("px-5 py-6 text-2xl font-bold", pairing.bg, pairing.fg)}>
                    {pairing.sample}
                  </div>
                  <div className="px-5 py-4">
                    <p className="font-semibold text-foreground">{pairing.label}</p>
                    <p className="mt-1 text-base leading-relaxed text-neutral-80">{pairing.note}</p>
                    <p
                      className={cn(
                        "mt-3 text-sm font-bold",
                        pairing.pass ? "text-wisteria-700" : "text-orange-700",
                      )}
                    >
                      {pairing.ratio} · {pairing.verdict}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="type" aria-labelledby="type-heading" className="scroll-mt-8">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <Eyebrow>Type</Eyebrow>
            <h2 id="type-heading" className="mt-3 text-4xl sm:text-5xl">
              Outfit, from light to extra bold
            </h2>
            <p className="mt-4 max-w-2xl">
              Headlines are tight and heavy. Body copy is 18px with room to breathe. Eyebrows are
              small, uppercase, and widely tracked.
            </p>
            <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {weights.map((weight) => (
                <li key={weight.label} className="rounded-2xl border border-lavender-100 bg-white p-4">
                  <p className={cn("text-4xl text-wisteria-900", weight.className)}>Ag</p>
                  <p className="mt-2 text-sm text-neutral-80">{weight.label}</p>
                </li>
              ))}
            </ul>
            <div className="mt-12 space-y-10 border-t border-lavender-100 pt-10">
              <div>
                <p className="text-sm font-semibold text-neutral-60">
                  Eyebrow · 12px · semibold · widest tracking
                </p>
                <div className="mt-3">
                  <Eyebrow>{site.tagline}</Eyebrow>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-60">
                  Display · extra bold · leading 1.05
                </p>
                <p className="mt-3 text-5xl font-extrabold leading-[1.05] text-wisteria-100 sm:text-7xl">
                  People with purpose
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-60">Heading · 800 weight</p>
                <p className="mt-3 text-4xl font-extrabold leading-[1.08] text-wisteria-100 sm:text-5xl">
                  Empowering young people
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-60">Section heading · 700 weight</p>
                <p className="mt-3 text-3xl font-bold leading-[1.15] text-wisteria-900">
                  A stronger, fairer society
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-60">Body · 18px · line height 1.6</p>
                <p className="mt-3 max-w-2xl text-[1.125rem] leading-[1.6]">{site.brandStatement}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-60">Caption · 14px · neutral-60</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-60">
                  {site.fullName}. {site.tagline}.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="buttons" aria-labelledby="buttons-heading" className="scroll-mt-8 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <Eyebrow>Actions</Eyebrow>
            <h2 id="buttons-heading" className="mt-3 text-4xl sm:text-5xl">
              Buttons
            </h2>
            <p className="mt-4 max-w-2xl">
              Fully rounded, with a clear hover and a black focus ring that meets AA against the
              page. Tab through them to check the ring. Primary never puts small white type on
              orange.
            </p>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2">
              {buttonSamples.map((sample) => (
                <li
                  key={sample.variant}
                  className={cn(
                    "rounded-3xl border border-lavender-100 p-6",
                    sample.variant === "white" ? "bg-wisteria-100" : "bg-background",
                  )}
                >
                  <div className="flex flex-wrap gap-3">
                    <Button variant={sample.variant}>{sample.label}</Button>
                    <Button variant={sample.variant} href="/styleguide#buttons">
                      As a link
                    </Button>
                  </div>
                  <p
                    className={cn(
                      "mt-4 text-sm font-bold uppercase tracking-widest",
                      sample.variant === "white" ? "text-white" : "text-wisteria-700",
                    )}
                  >
                    {sample.variant}
                  </p>
                  <p
                    className={cn(
                      "mt-2 text-base leading-relaxed",
                      sample.variant === "white" ? "text-white" : "text-neutral-80",
                    )}
                  >
                    {sample.caption}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-3xl border border-lavender-100 bg-background p-6">
              <p className="text-sm font-bold uppercase tracking-widest text-wisteria-700">Sizes</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {buttonSizes.map((size) => (
                  <Button key={size} size={size} variant="secondary">
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="motifs" aria-labelledby="motifs-heading" className="scroll-mt-8">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <Eyebrow>Motifs</Eyebrow>
            <h2 id="motifs-heading" className="mt-3 text-4xl sm:text-5xl">
              Marks we can repeat
            </h2>
            <p className="mt-4 max-w-2xl">
              Orange dots introduce an eyebrow. The divider hints at horizontal bars, a crescent,
              and the small orange square. Soft circles in wisteria and orange sit at the edges of
              a section.
            </p>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-lavender-100 bg-white p-8">
                <Eyebrow>People with Purpose</Eyebrow>
                <p className="mt-4 text-base text-neutral-80">
                  The dots are decorative. The words carry the meaning, in wisteria-700.
                </p>
              </div>
              <div className="flex items-center rounded-3xl bg-wisteria-20 p-8">
                <BrandDivider className="h-12 w-full max-w-md" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Section id="sections" labelledBy="sections-heading" background="offwhite" className="scroll-mt-32">
        <Container>
          <Reveal>
            <SectionHeading
              id="sections-heading"
              eyebrow="Layout"
              title="Sections and containers"
              intro="Bands set their own background and keep text at AA. Wisteria and black use white type. Orange uses black type."
            />
            <div className="mt-10 grid gap-4">
              {sectionBackgrounds.map((background) => (
                <Section
                  key={background}
                  background={background}
                  label={`${background} background`}
                  className="overflow-hidden rounded-3xl py-8 sm:py-8 lg:py-8"
                >
                  <Container>
                    <p className="text-sm font-bold uppercase tracking-widest">{background}</p>
                    <p className="mt-2 max-w-xl text-base">
                      Container centres the copy and keeps padding comfortable from a 320px screen.
                    </p>
                  </Container>
                </Section>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <div id="hero" className="scroll-mt-32 border-y border-lavender-100">
        <PageHero
          titleAs="h2"
          eyebrow="Inner page"
          title="Page hero"
          intro="A breadcrumb, an eyebrow, a title, a short introduction, and a picture when one exists."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Styleguide" },
          ]}
          imageLabel="Example image"
        />
      </div>

      <Section id="programmes" labelledBy="programmes-heading" background="white">
        <Container>
          <Reveal>
            <SectionHeading
              id="programmes-heading"
              eyebrow="Programmes"
              title="Cards from the real programme list"
              intro="Titles, summaries, and links come from the content module. The whole card is one link."
            />
            <ul className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {programmes.slice(0, 3).map((programme) => (
                <li key={programme.slug}>
                  <ProgrammeCard
                    icon={programme.icon}
                    title={programme.title}
                    summary={programme.summary}
                    href={`/what-we-do/${programme.slug}`}
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <Section id="stats" labelledBy="stats-heading" background="lavender">
        <Container>
          <Reveal>
            <SectionHeading
              id="stats-heading"
              eyebrow="Example figures"
              title="Counters"
              intro="The numbers below are styleguide examples so the count-up can be reviewed. They are not YAGYDI impact data. Placeholder lines from the content file stay as written."
            />
            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <li className="rounded-3xl bg-white p-6">
                <StatCounter value={20} suffix="+" label="Example years" />
              </li>
              <li className="rounded-3xl bg-white p-6">
                <StatCounter value={1200} label="Example count" />
              </li>
              <li className="rounded-3xl bg-wisteria-100 p-6">
                <StatCounter value={8} tone="light" label="Example on a dark band" />
              </li>
            </ul>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {impactStats.map((stat) => (
                <li key={stat} className="rounded-3xl bg-white p-6">
                  <StatCounter display={stat} label="Placeholder from content" />
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <Section id="quote" labelledBy="quote-heading" background="offwhite">
        <Container>
          <Reveal>
            <SectionHeading
              id="quote-heading"
              eyebrow="Example only"
              title="Quote block"
              intro="This quotation is sample layout copy. It is not a testimonial from a young person, partner, or anyone at YAGYDI."
            />
            <div className="mt-10 rounded-3xl border border-lavender-100 bg-white p-6 sm:p-10">
              <p className="mb-6 text-sm font-bold uppercase tracking-widest text-orange-700">
                Sample quote, not a real story
              </p>
              <QuoteBlock
                quote="Example quotation for layout only. It is not a statement from a young person, a partner, or a member of YAGYDI."
                name="Example name"
                role="Example role — not a real person"
                href="/styleguide#quote"
                photoLabel="Example photo"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTABanner
        title="Stand with young people"
        text={site.brandStatement}
        actions={
          getInvolved
            ? [
                { label: donateCta.label, href: donateCta.href, variant: "primary" },
                { label: getInvolved.label, href: getInvolved.href, variant: "white" },
              ]
            : [{ label: donateCta.label, href: donateCta.href, variant: "primary" }]
        }
      />

      <Section id="news" labelledBy="news-heading" background="white">
        <Container>
          <Reveal>
            <SectionHeading
              id="news-heading"
              eyebrow="Example only"
              title="News card"
              intro="A sample card for layout review. It is not a published YAGYDI story."
            />
            <div className="mt-10 max-w-md">
              <NewsCard
                href="/styleguide#news"
                title="Example headline"
                excerpt="Sample card for the styleguide. This is not a published story."
                date="Example date"
                imageLabel="Example image"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="partners" labelledBy="partners-heading" background="offwhite">
        <Container>
          <Reveal>
            <SectionHeading
              id="partners-heading"
              eyebrow="Placeholders"
              title="Partner logo grid"
              intro="Names are placeholders until real partner marks are supplied."
            />
            <div className="mt-10">
              <PartnerLogoGrid />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="sdgs" labelledBy="sdgs-heading" background="white">
        <Container>
          <Reveal>
            <SectionHeading
              id="sdgs-heading"
              eyebrow="Goals"
              title="SDG badges and image placeholder"
            />
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
              {sdgs.map((sdg) => (
                <li key={sdg.id}>
                  <SDGBadge id={sdg.id} name={sdg.name} />
                </li>
              ))}
            </ul>
            <div className="mt-10 max-w-sm overflow-hidden rounded-3xl">
              <ImagePlaceholder label="Example image" />
            </div>
            <div className="relative mt-10 overflow-hidden rounded-3xl bg-lavender-20 px-6 py-16">
              <DecorativeCircles />
              <p className="relative text-center text-base font-semibold text-wisteria-900">
                Soft circles sit behind a section and stay out of the way of clicks and readers.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <section aria-labelledby="black-heading" className="bg-neutral-100 text-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <Eyebrow className="text-white">Footer colour</Eyebrow>
            <h2 id="black-heading" className="mt-3 max-w-3xl text-4xl text-white sm:text-5xl">
              Black, when the page needs weight
            </h2>
            <p className="mt-6 max-w-2xl text-neutral-20">{site.brandStatement}</p>
            <p className="mt-4 max-w-2xl text-base text-lavender-40">
              White on black passes AA. Lavender can whisper on a dark band. It still cannot carry
              body text on white.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
