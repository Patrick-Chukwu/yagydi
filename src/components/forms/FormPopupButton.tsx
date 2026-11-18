"use client";

import Script from "next/script";
import { useState, type ReactNode } from "react";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/button";
import { getForm, type FormId } from "@/content/forms";
import { isPlaceholderUrl, tallyFormId } from "@/lib/external-url";
import { loadTallyScript, TALLY_EMBED_SCRIPT, type TallyPopupOptions } from "@/lib/tally";
import { cn } from "@/lib/utils";

type FormPopupButtonProps = {
  formId: FormId;
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  statusClassName?: string;
};

const popupOptions = { layout: "modal", width: 600 } as const satisfies TallyPopupOptions;

export function FormPopupButton({
  formId,
  children,
  className,
  variant = "primary",
  size = "md",
  statusClassName,
}: FormPopupButtonProps) {
  const form = getForm(formId);
  const unavailable = isPlaceholderUrl(form.url);
  const tallyId = form.provider === "tally" ? tallyFormId(form.url) : "";
  const [scriptFailed, setScriptFailed] = useState(false);

  if (unavailable || (form.provider === "tally" && tallyId.length === 0)) {
    const statusId = `${form.id}-unavailable`;
    return (
      <span className="inline-flex max-w-full flex-col items-start gap-2">
        <Button
          type="button"
          variant={variant}
          size={size}
          className={className}
          disabled
          aria-describedby={statusId}
        >
          {children}
        </Button>
        <p id={statusId} role="status" className={cn("text-sm font-semibold", statusClassName ?? "text-neutral-80")}>
          Form coming soon. Nothing is submitted from this button.
        </p>
      </span>
    );
  }

  if (form.provider === "google") {
    return (
      <Button
        href={form.url}
        target="_blank"
        rel="noopener noreferrer"
        variant={variant}
        size={size}
        className={className}
      >
        {children}
      </Button>
    );
  }

  function openShareUrl() {
    window.open(form.url, "_blank", "noopener,noreferrer");
  }

  function openPopup() {
    if (!window.Tally || tallyId.length === 0) {
      openShareUrl();
      return;
    }
    window.Tally.openPopup(tallyId, popupOptions);
  }

  function onClick() {
    if (scriptFailed) {
      openShareUrl();
      return;
    }

    if (window.Tally) {
      openPopup();
      return;
    }

    const pending = window.open("about:blank", "_blank");
    void loadTallyScript().then((ready) => {
      if (ready && window.Tally) {
        pending?.close();
        window.Tally.openPopup(tallyId, popupOptions);
        return;
      }

      if (pending) {
        pending.opener = null;
        pending.location.href = form.url;
        return;
      }

      window.location.assign(form.url);
    });
  }

  return (
    <>
      <Script
        src={TALLY_EMBED_SCRIPT}
        strategy="lazyOnload"
        onError={() => setScriptFailed(true)}
      />
      <Button
        type="button"
        variant={variant}
        size={size}
        className={className}
        aria-haspopup="dialog"
        onClick={onClick}
      >
        {children}
      </Button>
    </>
  );
}
