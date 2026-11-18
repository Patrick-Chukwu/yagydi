"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function yearNow() {
  return new Date().getFullYear();
}

function yearOnServer() {
  // Prerender snapshot. The client snapshot reads the real calendar year.
  return 2026;
}

export function CopyrightYear() {
  const year = useSyncExternalStore(subscribe, yearNow, yearOnServer);
  return <span>{year}</span>;
}
