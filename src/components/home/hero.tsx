import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { site } from "@/content/site";

export function HomeHero() {
  return (
    <section id="hero" className="relative overflow-x-clip bg-background">
      <Container className="relative py-14 sm:py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{site.tagline}</Eyebrow>
            <h1 className="mt-5 text-4xl font-extrabold leading-[0.95] tracking-tight text-balance text-wisteria-100 sm:text-5xl lg:text-6xl xl:text-7xl">
              Youth-led change, from the grassroots up.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-80">{site.heroTagline}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/what-we-do" size="lg" className="w-full sm:w-auto">
                See what we do
              </Button>
              <Button href="/get-involved" variant="outline" size="lg" className="w-full sm:w-auto">
                Get involved
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -left-2 -top-6 size-36 rounded-full bg-wisteria-40 sm:-left-4 sm:size-52"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-2 size-28 rounded-full bg-orange-40 sm:size-40"
            />
            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(59,42,71,0.12)]">
              <ImagePlaceholder
                label="Young people at a YAGYDI workshop"
                className="aspect-[4/5] rounded-[2rem] pb-28 sm:aspect-[5/4]"
              />
            </div>
            <p className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white px-4 py-3 shadow-lg sm:right-auto sm:max-w-64">
              <span className="block text-3xl font-extrabold leading-none text-orange-700">20+</span>
              <span className="mt-1 block text-sm font-semibold leading-snug text-wisteria-900">
                years empowering youth
              </span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
