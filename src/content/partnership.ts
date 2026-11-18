export type PartnerLogo = {
  name: string;
  src: string | null;
  placeholder: true;
};

// TODO: replace with real content
export const partnerLogos = [
  { name: "Partner 1", src: null, placeholder: true },
  { name: "Partner 2", src: null, placeholder: true },
  { name: "Partner 3", src: null, placeholder: true },
  { name: "Partner 4", src: null, placeholder: true },
  { name: "Partner 5", src: null, placeholder: true },
  { name: "Partner 6", src: null, placeholder: true },
  { name: "Partner 7", src: null, placeholder: true },
  { name: "Partner 8", src: null, placeholder: true },
] as const satisfies readonly PartnerLogo[];

export const partnership = {
  heading: "Partnership",
  intro: "Collaboration is at the heart of our impact.",
  partnerWith: [
    "Schools and universities",
    "Government agencies",
    "Civil society organisations",
    "NGOs, CBOs, and international networks",
    "Private sector and tech companies",
    "Development partners and donor agencies",
  ],
  coCreate: [
    "Joint programmes",
    "Sponsored cohort opportunities",
    "Digital and climate innovation pilots",
    "Research and policy collaborations",
    "Youth mentoring and leadership pipelines",
  ],
  impact: "Scalable, lasting solutions that create community-wide change.",
  partnerLogos,
} as const;
