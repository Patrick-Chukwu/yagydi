export const sdgs = [
  { id: 3, name: "Good Health and Well-being" },
  { id: 4, name: "Quality Education" },
  { id: 5, name: "Gender Equality" },
  { id: 8, name: "Decent Work and Economic Growth" },
  { id: 16, name: "Peace, Justice and Strong Institutions" },
  { id: 17, name: "Partnerships for the Goals" },
] as const;

/** Referenced by programmes, outside the core champion list above. */
export const additionalSdgs = [{ id: 13, name: "Climate Action" }] as const;

export type SdgId =
  | (typeof sdgs)[number]["id"]
  | (typeof additionalSdgs)[number]["id"];

const sdgCatalog: readonly { id: SdgId; name: string }[] = [...sdgs, ...additionalSdgs];

export function sdgById(id: SdgId) {
  const sdg = sdgCatalog.find((item) => item.id === id);
  if (!sdg) {
    throw new Error(`Unknown SDG ${id}`);
  }
  return sdg;
}

// TODO: replace with real content
export const contact = {
  email: "hello@ynginitiative.org, ynginitiative@gmail.com",
  phone: "+2349065301561",
  address: "LiyaGold Building, Tanke Rd, opposite BOVAS Filling Station, Oke Odo, Ilorin 240102, Kwara State, Nigeria.",
} as const;

// TODO: replace with real content
export const impactStats = [
  "20+ Years of impact",
  "1000+ Young people reached",
  "50+ Communities",
  "25+ Schools",
  "10+ Partners",
] as const;

// TODO: replace with real content
export const logo = {
  src: "/brand/yagydi-logo.png",
  alt: "YAGYDI",
} as const;

export const site = {
  name: "YAGYDI",
  fullName: "Young and Gifted Youth Development Initiative",
  formerName: "Young and Gifted International",
  tagline: "People with Purpose",
  brandStatement:
    "Empowering young people for a stronger, fairer and more inclusive society.",
  heroTagline:
    "Empowering Africa's youth through inclusive governance, bridging gender inequalities, and driving transformative change from the grassroots up.",
  hashtag: "#YAGYDI4All",
  socials: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/1BvS78DYiX/",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/youngandgiftedyouthsdevelopmentinitiative",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/yagydi/",
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@yagydi4all",
    },
  ],
  sdgs,
  contact,
  impactStats,
  logo,
} as const;

export type SocialLink = (typeof site.socials)[number];
