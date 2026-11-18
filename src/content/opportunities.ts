export type OpportunityType = "Fellowship" | "Internship" | "Volunteer role";

export type Opportunity = {
  id: string;
  title: string;
  type: OpportunityType;
  location: string;
  /** YYYY-MM-DD. Compared as a date-only string. */
  deadline: string;
  description: string;
  applyUrl?: string;
};

// TODO: replace with real content
export const opportunities: readonly Opportunity[] = [
  {
    id: "fellowship",
    title: "[Fellowship title]",
    type: "Fellowship",
    location: "[Location, Nigeria]",
    deadline: "2027-08-31",
    description: "[TODO: replace with a real fellowship description.]",
    // TODO: replace with real content
    applyUrl: "https://tally.so/r/XXXXXX",
  },
  {
    id: "internship",
    title: "[Internship title]",
    type: "Internship",
    location: "[Location, Nigeria]",
    deadline: "2024-06-30",
    description: "[TODO: replace with a real internship description.]",
  },
  {
    id: "volunteer-role",
    title: "[Volunteer role title]",
    type: "Volunteer role",
    location: "[Location, Nigeria]",
    deadline: "2027-11-30",
    description: "[TODO: replace with a real volunteer role description.]",
  },
];

/** True when the deadline day is before the server-supplied today (YYYY-MM-DD). */
export function isOpportunityClosed(deadline: string, today: string) {
  return deadline < today;
}
