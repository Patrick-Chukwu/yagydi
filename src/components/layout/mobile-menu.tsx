"use client";

import { ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { donateCta, mainNav } from "@/content/navigation";
import { site } from "@/content/site";
import { cn, focusRingOnDark } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  logoReady: boolean;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function MobileMenu({ open, onClose, logoReady, triggerRef }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const [whatOpen, setWhatOpen] = useState(false);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const main = document.getElementById("main");
    const footer = document.querySelector("body > footer");
    const header = document.querySelector("body > header");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    header?.setAttribute("inert", "");

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = () =>
      [...dialog.querySelectorAll<HTMLElement>(focusableSelector)].filter(
        (element) => element.closest("[hidden]") === null,
      );

    focusable()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const trigger = triggerRef.current;
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      header?.removeAttribute("inert");
      trigger?.focus();
    };
  }, [open, triggerRef]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={dialogRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
      className="fixed inset-0 z-50 flex flex-col bg-wisteria-900 text-white lg:hidden"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          onClick={onClose}
          className={cn("rounded-md", focusRingOnDark)}
        >
          <Logo available={logoReady} tone="inverse" size="sm" />
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className={cn(
            "grid size-11 place-items-center rounded-full text-white hover:bg-white/10",
            focusRingOnDark,
          )}
        >
          <X aria-hidden="true" className="size-6" />
        </button>
      </div>
      <h2 id="mobile-menu-title" className="sr-only">
        Menu
      </h2>
      <nav aria-label="Primary" className="flex-1 overflow-y-auto px-4 pb-6">
        <ul className="flex flex-col">
          {mainNav.map((item) =>
            item.children ? (
              <li key={item.label}>
                <button
                  type="button"
                  aria-expanded={whatOpen}
                  aria-controls="mobile-what-we-do"
                  onClick={() => setWhatOpen((value) => !value)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-2xl px-2 py-3 text-left text-3xl font-extrabold text-white",
                    focusRingOnDark,
                  )}
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn("size-7 shrink-0 transition", whatOpen && "rotate-180")}
                  />
                </button>
                <ul id="mobile-what-we-do" hidden={!whatOpen} className="space-y-1 pb-3 pl-3">
                  <li>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "block rounded-xl px-3 py-2 text-lg font-bold text-white no-underline hover:bg-white/10",
                        focusRingOnDark,
                      )}
                    >
                      All programmes
                    </Link>
                  </li>
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={onClose}
                        className={cn(
                          "block rounded-xl px-3 py-2 text-lg font-semibold text-white no-underline hover:bg-white/10",
                          focusRingOnDark,
                        )}
                      >
                        {child.title ?? child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "block rounded-2xl px-2 py-3 text-3xl font-extrabold text-white no-underline hover:bg-white/10",
                    focusRingOnDark,
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
      <div className="px-4 pb-6">
        <Button href={donateCta.href} variant="primary" className="w-full" onClick={onClose}>
          {donateCta.label}
        </Button>
      </div>
    </div>,
    document.body,
  );
}
