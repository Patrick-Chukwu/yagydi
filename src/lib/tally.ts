export const TALLY_EMBED_SCRIPT = "https://tally.so/widgets/embed.js";

export type TallyPopupOptions = {
  layout?: "modal" | "default";
  width?: number;
  hiddenFields?: Record<string, string>;
};

type TallyApi = {
  loadEmbeds: () => void;
  openPopup: (formId: string, options?: TallyPopupOptions) => void;
};

declare global {
  interface Window {
    Tally?: TallyApi;
  }
}

let inflight: Promise<boolean> | null = null;

function whenScriptSettles(script: HTMLScriptElement) {
  return new Promise<boolean>((resolve) => {
    if (window.Tally) {
      resolve(true);
      return;
    }

    let settled = false;
    const finish = (value: boolean) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    script.addEventListener("load", () => finish(Boolean(window.Tally)), { once: true });
    script.addEventListener("error", () => finish(false), { once: true });
    window.setTimeout(() => finish(Boolean(window.Tally)), 8000);
  });
}

/** Load Tally's embed script once. Resolves false if it never becomes available. */
export function loadTallyScript() {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Tally) return Promise.resolve(true);

  if (!inflight) {
    const pending = (async () => {
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${TALLY_EMBED_SCRIPT}"]`,
      );
      const script = existing ?? document.createElement("script");
      if (!existing) {
        script.src = TALLY_EMBED_SCRIPT;
        script.async = true;
        document.body.appendChild(script);
      }
      return whenScriptSettles(script);
    })();

    inflight = pending.then((ready) => {
      if (!ready) inflight = null;
      return ready;
    });
  }

  return inflight;
}
