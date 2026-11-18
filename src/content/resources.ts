import type { ProgrammeSlug } from "./programmes";

export const resourceTypes = ["Policy brief", "Fact sheet", "Evidence summary", "Report"] as const;

export type ResourceType = (typeof resourceTypes)[number];

export type Resource = {
  id: string;
  title: string;
  type: ResourceType;
  programme: ProgrammeSlug;
  /** YYYY-MM-DD */
  date: string;
  summary: string;
  fileUrl: string;
};

// TODO: replace with real content
export const resources = [
  {
    id: "policy-brief-1",
    title: "[Policy brief title]",
    type: "Policy brief",
    programme: "climate-change-sdg-awareness",
    date: "2026-02-01",
    summary: "[TODO: replace with a real policy brief summary.]",
    fileUrl: "https://drive.google.com/file/d/XXXXXX/view",
  },
  {
    id: "fact-sheet-1",
    title: "[Fact sheet title]",
    type: "Fact sheet",
    programme: "digital-rights-online-safety",
    date: "2026-03-12",
    summary: "[TODO: replace with a real fact sheet summary.]",
    fileUrl: "https://drive.google.com/file/d/XXXXXX/view",
  },
  {
    id: "evidence-summary-1",
    title: "[Evidence summary title]",
    type: "Evidence summary",
    programme: "research-policy",
    date: "2026-04-04",
    summary: "[TODO: replace with a real evidence summary.]",
    fileUrl: "https://drive.google.com/file/d/XXXXXX/view",
  },
  {
    id: "report-1",
    title: "[Report title]",
    type: "Report",
    programme: "inclusive-education",
    date: "2026-05-20",
    summary: "[TODO: replace with a real report summary.]",
    fileUrl: "https://drive.google.com/file/d/XXXXXX/view",
  },
  {
    id: "policy-brief-2",
    title: "[Policy brief title 2]",
    type: "Policy brief",
    programme: "democracy-good-governance",
    date: "2026-06-18",
    summary: "[TODO: replace with a second policy brief summary.]",
    fileUrl: "https://drive.google.com/file/d/XXXXXX/view",
  },
  {
    id: "fact-sheet-2",
    title: "[Fact sheet title 2]",
    type: "Fact sheet",
    programme: "gender-rights-advocacy",
    date: "2026-07-09",
    summary: "[TODO: replace with a second fact sheet summary.]",
    fileUrl: "https://drive.google.com/file/d/XXXXXX/view",
  },
] as const satisfies readonly Resource[];
