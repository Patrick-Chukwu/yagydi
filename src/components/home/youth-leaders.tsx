"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { DecorativeCircles } from "@/components/ui/decorative-circles";

type YouthLeadersProps = {
  hasVideo: boolean;
};

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

export function YouthLeaders({ hasVideo }: YouthLeadersProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasVideo) return;

    video.muted = true;
    const media = window.matchMedia(reducedMotionQuery);

    const sync = () => {
      if (media.matches || !inView) {
        video.pause();
        return;
      }
      const pending = video.play();
      void pending.catch(() => undefined);
    };

    const hideBrokenVideo = () => {
      video.closest("[data-youth-media]")?.classList.add("hidden");
    };

    sync();
    media.addEventListener("change", sync);
    video.addEventListener("error", hideBrokenVideo);
    return () => {
      media.removeEventListener("change", sync);
      video.removeEventListener("error", hideBrokenVideo);
      video.pause();
    };
  }, [hasVideo, inView]);

  return (
    <section
      ref={sectionRef}
      id="youth-leaders"
      aria-labelledby="youth-leaders-heading"
      className="relative isolate scroll-mt-32 overflow-hidden bg-wisteria-900 text-white"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-wisteria-900" />
        <DecorativeCircles tone="on-dark" />
        {hasVideo ? (
          <div data-youth-media="" className="absolute inset-0 motion-reduce:hidden">
            <video
              ref={videoRef}
              className="size-full object-cover"
              muted
              loop
              playsInline
              preload="none"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-wisteria-900/80" />
          </div>
        ) : null}
      </div>
      <Container className="relative flex min-h-[26rem] flex-col justify-end py-16 sm:min-h-[32rem] sm:py-24">
        <h2
          id="youth-leaders-heading"
          className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-balance text-white sm:text-6xl"
        >
          Powered by young leaders.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white sm:text-xl">
          They host town halls, run school eco-clubs, take up research fellowships, and carry health
          outreach into their communities.
        </p>
      </Container>
    </section>
  );
}
