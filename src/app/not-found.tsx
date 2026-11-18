import { BrandDivider } from "@/components/ui/brand-divider";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Page not found",
  description: "That address is not on the YAGYDI website.",
  path: "/404",
  index: false,
});

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-wisteria-100 px-4 py-20 text-center text-white">
      <BrandDivider tone="light" />
      <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-white">404</p>
      <h1 className="mt-3 max-w-[16ch] text-4xl text-white sm:text-6xl">Page not found</h1>
      <p className="mt-4 max-w-[42ch] text-lg leading-relaxed text-white">
        That address is not on the YAGYDI website. You can go home, or see the programmes.
      </p>
      <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
        <Button href="/" variant="white" className="w-full sm:w-auto">
          Home
        </Button>
        <Button href="/what-we-do" variant="primary" className="w-full sm:w-auto">
          What we do
        </Button>
      </div>
    </div>
  );
}
