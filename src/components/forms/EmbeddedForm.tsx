"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getForm, type FormId } from "@/content/forms";
import { googleFormEmbedUrl, isPlaceholderUrl, tallyEmbedUrl, tallyFormId } from "@/lib/external-url";
import { TALLY_EMBED_SCRIPT } from "@/lib/tally";
import { cn, focusRing } from "@/lib/utils";

type EmbeddedFormProps = {
  formId: FormId;
  className?: string;
  hiddenFields?: Record<string, string>;
};

export function EmbeddedForm({ formId, className, hiddenFields }: EmbeddedFormProps) {
  const form = getForm(formId);
  const tallyId = form.provider === "tally" ? tallyFormId(form.url) : "";
  const unavailable = isPlaceholderUrl(form.url) || (form.provider === "tally" && tallyId.length === 0);
  const reservedHeight = form.provider === "google" ? (form.minHeight ?? 1200) : (form.minHeight ?? 640);
  const embedUrl =
    form.provider === "tally"
      ? tallyEmbedUrl(form.url, hiddenFields)
      : googleFormEmbedUrl(form.url, hiddenFields);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (unavailable || form.provider !== "tally") return;
    window.Tally?.loadEmbeds();
  }, [unavailable, form.provider, embedUrl]);

  return (
    <div
      className={cn(
        "min-w-0 max-w-full rounded-3xl border border-lavender-100 bg-white p-4 sm:p-6",
        className,
      )}
    >
      {unavailable ? (
        <div
          role="status"
          className="flex min-h-[640px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-wisteria-40 bg-lavender-20 px-4 text-center"
        >
          <p className="text-lg font-bold text-balance text-wisteria-900">
            Form coming soon – {form.title}
          </p>
          <p className="max-w-[46ch] text-sm leading-relaxed text-neutral-80">
            This form is not published yet, so nothing can be submitted here.
          </p>
        </div>
      ) : (
        <>
          <div
            className={cn(
              "relative min-w-0 max-w-full",
              form.provider === "google" && "max-sm:max-h-[100dvh] max-sm:overflow-auto",
            )}
            aria-busy={!loaded}
          >
            <p className="sr-only" aria-live="polite">
              {loaded ? "" : `Loading ${form.title}`}
            </p>
            {loaded ? null : (
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 animate-pulse rounded-2xl bg-lavender-40 motion-reduce:animate-none"
                style={{ minHeight: reservedHeight }}
              />
            )}
            <iframe
              title={form.title}
              loading="lazy"
              width="100%"
              data-tally-src={form.provider === "tally" ? embedUrl : undefined}
              src={form.provider === "google" ? embedUrl : undefined}
              onLoad={() => setLoaded(true)}
              className="block w-full max-w-full border-0 bg-transparent"
              style={
                form.provider === "google"
                  ? { minHeight: reservedHeight, height: reservedHeight, background: "transparent" }
                  : { minHeight: reservedHeight, background: "transparent" }
              }
            />
            {form.provider === "tally" ? (
              <Script
                src={TALLY_EMBED_SCRIPT}
                strategy="lazyOnload"
                onLoad={() => {
                  window.Tally?.loadEmbeds();
                }}
              />
            ) : null}
          </div>
          <p className="mt-4 text-base">
            <a
              href={form.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("inline-flex font-bold", focusRing)}
            >
              Having trouble? Open the form in a new tab →
            </a>
          </p>
        </>
      )}
    </div>
  );
}
