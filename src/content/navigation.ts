import { programmes } from "./programmes";

export type NavItem = {
  label: string;
  href: string;
  title?: string;
  children?: readonly NavItem[];
};

export type FooterGroup = {
  heading: string;
  links: readonly NavItem[];
};

const programmeLinks: NavItem[] = programmes.map((programme) => ({
  label: programme.shortTitle,
  title: programme.title,
  href: `/what-we-do/${programme.slug}`,
}));

export const mainNav: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "What We Do",
    href: "/what-we-do",
    children: [
      ...programmeLinks,
      {
        label: "Partnership",
        title: "Partnership",
        href: "/what-we-do/partnership",
      },
    ],
  },
  { label: "Strategic Focus", href: "/strategic-focus" },
  { label: "Research", href: "/research" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Latest", href: "/latest" },
  { label: "Contact", href: "/contact" },
];

export const donateCta = {
  label: "Donate",
  href: "/donate",
} as const;

export const donateMonthlyCta = {
  label: "Donate monthly",
  href: "/donate",
} as const;

export const footerNav: readonly FooterGroup[] = [
  {
    heading: "About",
    links: [
      { label: "Who we are", href: "/about" },
      { label: "Our values", href: "/about#values" },
      { label: "Mission & vision", href: "/about#mission" },
      { label: "Team", href: "/about#team" },
      { label: "Safeguarding", href: "/safeguarding" },
    ],
  },
  {
    heading: "What We Do",
    links: [
      ...programmeLinks,
      { label: "Strategic focus", href: "/strategic-focus" },
      { label: "Research & resources", href: "/research" },
    ],
  },
  {
    heading: "Get Involved",
    links: [
      { label: "Volunteer", href: "/get-involved#volunteer" },
      { label: "Partner with us", href: "/what-we-do/partnership" },
      { label: "Donate", href: "/donate" },
      { label: "Opportunities", href: "/get-involved#programmes" },
      { label: "Newsletter", href: "#newsletter" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Safeguarding policy", href: "/safeguarding" },
      { label: "Whistleblowing", href: "/whistleblowing" },
      { label: "Terms of use", href: "/terms" },
    ],
  },
];
