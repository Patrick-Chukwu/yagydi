export type FormProvider = "tally" | "google";

export type FormConfig = {
  id: string;
  title: string;
  description: string;
  provider: FormProvider;
  url: string;
  minHeight?: number;
};

export const forms = {
  volunteer: {
    id: "volunteer",
    title: "Volunteer",
    description: "Tell YAGYDI how you would like to volunteer.",
    provider: "tally",
    // TODO: paste real Tally/Google Form link
    url: "https://tally.so/r/XXXXXX",
  },
  partner: {
    id: "partner",
    title: "Partner with us",
    description: "Tell YAGYDI about a possible partnership.",
    provider: "tally",
    // TODO: paste real Tally/Google Form link
    url: "https://tally.so/r/XXXXXX",
  },
  contact: {
    id: "contact",
    title: "Contact",
    description: "Send a message to YAGYDI.",
    provider: "tally",
    // TODO: paste real Tally/Google Form link
    url: "https://tally.so/r/XXXXXX",
  },
  newsletter: {
    id: "newsletter",
    title: "Newsletter",
    description: "Join the YAGYDI newsletter.",
    provider: "tally",
    // TODO: paste real Tally/Google Form link
    url: "https://tally.so/r/XXXXXX",
  },
  // Prefer Tally. This placeholder stays Google until a real form exists.
  // Switch provider to "tally" and paste a tally.so/r/ID url when it does.
  opportunity: {
    id: "opportunity",
    title: "Opportunity application",
    description: "Apply for a fellowship, internship, or other open call.",
    provider: "google",
    // TODO: paste real Tally/Google Form link
    url: "https://docs.google.com/forms/d/e/XXXXXX/viewform",
    minHeight: 1200,
  },
} as const satisfies Record<string, FormConfig>;

export type FormId = keyof typeof forms;

export function getForm(id: FormId): FormConfig {
  return forms[id];
}
