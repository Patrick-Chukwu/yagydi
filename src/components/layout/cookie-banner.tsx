"use client";

import { useSyncExternalStore } from "react";
import { buttonClassName } from "@/components/ui/button";

const STORAGE_KEY = "yagydi-cookie-consent";

type Choice = "accepted" | "essential";
type Snapshot = Choice | "unset" | "pending";

const listeners = new Set<() => void>();
let memory: Choice | null = null;

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readChoice(): Snapshot {
  if (memory) return memory;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "essential") return stored;
    return "unset";
  } catch {
    return "unset";
  }
}

function storeChoice(choice: Choice) {
  memory = choice;
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Storage can be blocked. The in-memory choice still hides the banner this visit.
  }
  emit();
}

function serverSnapshot(): Snapshot {
  return "pending";
}

export function CookieBanner() {
  const choice = useSyncExternalStore(subscribe, readChoice, serverSnapshot);
  if (choice !== "unset") return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <section
        aria-labelledby="cookie-banner-title"
        className="pointer-events-auto mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-3xl border-2 border-wisteria-100 bg-white p-4 text-foreground shadow-[0_16px_40px_rgba(59,42,71,0.16)] sm:p-5"
      >
        <div className="min-w-0 max-w-[70ch]">
          <p id="cookie-banner-title" className="text-lg font-extrabold text-wisteria-900">
            Cookies on this site
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground">
            YAGYDI does not load analytics. This banner stores one choice in this browser so it can
            stay dismissed. Essential only keeps that preference and nothing else. Accept means you
            are willing for non-essential cookies if analytics is added later. No extra scripts are
            loaded either way.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            className={buttonClassName("outline", "w-full sm:w-auto", "sm")}
            onClick={() => storeChoice("essential")}
          >
            Essential only
          </button>
          <button
            type="button"
            className={buttonClassName("primary", "w-full sm:w-auto", "sm")}
            onClick={() => storeChoice("accepted")}
          >
            Accept
          </button>
        </div>
      </section>
    </div>
  );
}
