import type { SdgId } from "./site";

/** Lucide icon export names. SDG 13 is supported in addition to the core list in site.ts. */
export type ProgrammeIcon =
  | "Leaf"
  | "ShieldCheck"
  | "HeartPulse"
  | "ScrollText"
  | "Landmark"
  | "Scale"
  | "Stethoscope"
  | "GraduationCap";

export type Programme = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: ProgrammeIcon;
  summary: string;
  activities: readonly string[];
  impact: string;
  sdgs: readonly SdgId[];
};

export const whatWeDo = {
  heading: "WHAT WE DO",
  intro:
    "YAGYDI delivers high\u2011impact programmes that empower young people and communities to thrive, participate, and lead. Our work integrates advocacy, skills development, research, technology, governance, and community action to ensure sustainable and equitable development for all.",
  subIntro: "Below are our core programme areas:",
} as const;

export const programmes = [
  {
    slug: "climate-change-sdg-awareness",
    title: "Climate Change Advocacy and SDG Awareness",
    shortTitle: "Climate & SDGs",
    icon: "Leaf",
    summary:
      "We equip young people with Climate literacy training and school eco\u2011clubs, Green entrepreneurship and innovation labs, and advocacy campaigns aligned with the Sustainable Development Goals (SDGs)",
    activities: [
      "Climate literacy training and school eco\u2011clubs",
      "Green entrepreneurship and innovation labs",
      "Advocacy campaigns aligned with the Sustainable Development Goals (SDGs)",
    ],
    impact: "Youth drive climate action and policy engagement in communities.",
    sdgs: [13, 17],
  },
  {
    slug: "digital-rights-online-safety",
    title: "Digital Rights and Online Safety",
    shortTitle: "Digital Rights",
    icon: "ShieldCheck",
    summary:
      "We support young people with training on privacy, data protection, and cyber safety, combating cyberbullying, misinformation, and online abuse, and advocate for fair, safe, and inclusive digital policies",
    activities: [
      "Training on privacy, data protection, and cyber safety",
      "Combating cyberbullying, misinformation, and online abuse",
      "Advocating for fair, safe, and inclusive digital policies",
    ],
    impact: "Youth are empowered to engage online safely and positively.",
    sdgs: [16, 4],
  },
  {
    slug: "srhr-advocacy",
    title: "Sexual and Reproductive Health and Rights (SRHR) Advocacy",
    shortTitle: "SRHR Advocacy",
    icon: "HeartPulse",
    summary:
      "We promote SRHR education in schools and communities, advocate against stigma, discrimination, and harmful cultural norms, and support gender\u2011responsive and inclusive health systems",
    activities: [
      "SRHR education in schools and communities",
      "Advocacy against stigma, discrimination, and harmful cultural norms",
      "Support for gender\u2011responsive and inclusive health systems",
    ],
    impact: "Informed youth make safe, empowered life choices.",
    sdgs: [3, 5],
  },
  {
    slug: "research-policy",
    title: "Developmental Research and Policy",
    shortTitle: "Research & Policy",
    icon: "ScrollText",
    summary:
      "Youth-led and participatory research to generate Policy briefs, fact sheets, and evidence summaries; organize research fellowships and youth data training to enhance evidence-to-action dialogues with policymakers",
    activities: [
      "Youth-led and participatory research",
      "Policy briefs, fact sheets, and evidence summaries",
      "Research fellowships and youth data training",
      "Evidence-to-action dialogues with policymakers",
    ],
    impact: "Policies and programs rooted in data, youth voices, and experience.",
    sdgs: [16, 17],
  },
  {
    slug: "democracy-good-governance",
    title: "Democracy and Good Governance",
    shortTitle: "Democracy & Governance",
    icon: "Landmark",
    summary:
      "We strengthen democratic participation through Civic education and awareness on rights and responsibilities, election literacy and peaceful participation campaigns, and youth town halls, debates, and policy dialogues to build accountable institutions through youth engagement.",
    activities: [
      "Civic education and awareness on rights and responsibilities",
      "Election literacy and peaceful participation campaigns",
      "Youth town halls, debates, and policy dialogues",
    ],
    impact: "Informed, active citizens contributing to a just and transparent society.",
    sdgs: [16],
  },
  {
    slug: "gender-rights-advocacy",
    title: "Gender Rights Advocacy",
    shortTitle: "Gender Rights",
    icon: "Scale",
    summary:
      "We work to promote advocacy for gender-inclusive laws and systems, leadership development for girls and young women, economic empowerment and mentorship, gender equality, and the protection of the rights of women, girls, and gender-diverse youth.",
    activities: [
      "Advocacy for gender-inclusive laws and systems",
      "Leadership development for girls and young women",
      "Economic empowerment and mentorship",
      "Protection of the rights of women, girls, and gender-diverse youth",
    ],
    impact: "Equitable communities where all achieve their potential.",
    sdgs: [5, 8],
  },
  {
    slug: "inclusive-health",
    title: "Quality and Inclusive Health",
    shortTitle: "Inclusive Health",
    icon: "Stethoscope",
    summary:
      "We enhance access to, quality of, and inclusion in healthcare for young people and marginalised groups through youth-friendly health literacy programs, community outreach and screenings, disability-inclusive health advocacy and training, and partnerships with health facilities and service providers.",
    activities: [
      "Youth-friendly health literacy programs",
      "Community outreach and screenings",
      "Disability-inclusive health advocacy and training",
      "Partnerships with health facilities and service providers",
    ],
    impact: "Promoting health-seeking, reducing stigma, and strengthening communities.",
    sdgs: [3],
  },
  {
    slug: "inclusive-education",
    title: "Quality and Inclusive Education",
    shortTitle: "Inclusive Education",
    icon: "GraduationCap",
    summary:
      "We support accessible, relevant, and inclusive education that creates lifelong opportunities by building teacher and school leadership capacity, developing digital skills and AI literacy for school communities, establishing school\u2011to\u2011work transition pathways (projects, internships, mentorship), and providing assistive learning tools for students with disabilities.",
    activities: [
      "Building teacher and school leadership capacity",
      "Digital skills and AI literacy for school communities",
      "School\u2011to\u2011work transition pathways (projects, internships, mentorship)",
      "Assistive learning tools for students with disabilities",
    ],
    impact: "Enhanced learning outcomes and sustained progress for underserved learners.",
    sdgs: [4, 8],
  },
] as const satisfies readonly Programme[];

export type ProgrammeSlug = (typeof programmes)[number]["slug"];

export function getProgramme(slug: string) {
  return programmes.find((programme) => programme.slug === slug);
}
