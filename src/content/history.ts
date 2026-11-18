import { site } from "./site";

export const storyNote =
  "The years below are placeholders until dated records are confirmed.";

// TODO: replace with real content
export const storyMilestones = [
  {
    year: "[Year]",
    title: `Founded as ${site.formerName}`,
  },
  {
    year: "[Year]",
    title: "20+ years of youth empowerment",
  },
  {
    year: "[Year]",
    title: `Became ${site.name}`,
  },
  {
    year: "[Year]",
    title: "Today: [PLACEHOLDER milestone]",
  },
] as const;
