import { contact } from "./site";

export const legalDraftBanner = "[DRAFT – to be reviewed by YAGYDI]" as const;

export type LegalLink = {
  href: string;
  label: string;
};

export type LegalSection = {
  id: string;
  heading: string;
  paragraphs: readonly string[];
  links?: readonly LegalLink[];
};

export type LegalPageContent = {
  path: `/${string}`;
  title: string;
  description: string;
  breadcrumb: string;
  intro: string;
  sections: readonly LegalSection[];
};

const placeholderContact = `The contact details on this website are still placeholders: email ${contact.email}, phone ${contact.phone}, and address ${contact.address}. They are not a named officer, and they are not a promise that someone is available to reply.`;

export const legalPages = {
  privacy: {
    path: "/privacy",
    title: "Privacy policy",
    breadcrumb: "Privacy",
    description: `${legalDraftBanner} Placeholder privacy wording for this website. It is not an adopted YAGYDI policy and it is not legal advice.`,
    intro:
      "This page describes, in plain language, what a small organisation's website like this one typically does with information. YAGYDI has not adopted this text. It is not legal advice, and it does not describe a finished privacy programme.",
    sections: [
      {
        id: "what-this-draft-is",
        heading: "What this draft is",
        paragraphs: [
          "Read this as a starting point for YAGYDI to review with someone qualified to advise a Nigerian NGO. It is not a privacy notice that has been approved by the organisation, and it does not create legal rights or duties.",
          "Until a reviewed notice replaces it, do not treat this page as a statement of what YAGYDI is legally required to do, or of what it has promised to visitors.",
        ],
      },
      {
        id: "information-a-site-like-this-may-hold",
        heading: "Information a site like this may hold",
        paragraphs: [
          "A website of this kind usually holds very little itself. Pages are public. If you only read them, the organisation may later see ordinary server or hosting logs, such as a browser type and the page requested. This draft does not claim that YAGYDI currently stores those logs, or for how long.",
          "If you choose to write in, the message you type (your name, email, and whatever you write) is collected by the form host, not by a form built into this website. A newsletter signup, if you use one, works the same way.",
          "This draft does not list staff records, programme participant files, or donor databases. Those are outside this website and would need their own notice.",
        ],
      },
      {
        id: "forms",
        heading: "Contact and newsletter forms",
        paragraphs: [
          "Contact, volunteer, partner, newsletter, and opportunity forms are meant to be hosted by Tally or Google Forms. This website embeds or links to those forms. What you submit is stored by that host under its own terms.",
          "Where a form is still a placeholder, nothing is submitted, because the link has not been published. Do not send sensitive information through a form until YAGYDI replaces the placeholder and tells you the form is in use.",
        ],
      },
      {
        id: "donations",
        heading: "Donations",
        paragraphs: [
          "If online giving is switched on, you complete the gift on Paystack (naira), or on Flutterwave or Stripe (US dollars). This website does not ask for card numbers or online-banking passwords. The payment company processes the payment and issues any receipt it provides.",
          "The payment links on the donate page are placeholders until YAGYDI publishes live pages. A placeholder link is not a way to give.",
        ],
      },
      {
        id: "cookies",
        heading: "Cookies and a saved preference",
        paragraphs: [
          "This website can store one choice in your browser: whether you selected Accept or Essential only on the cookie banner. That choice is kept in local storage under a name like yagydi-cookie-consent so the banner does not keep asking. It is not sent to YAGYDI as a message.",
          "Essential only means the site records that preference and does not treat you as having agreed to anything further. Accept means you are willing for non-essential cookies to be used if analytics is added later. No analytics tool is loaded by this draft, either way.",
          "Your browser settings can also block storage. If storage is blocked, the banner may appear again on a later visit.",
        ],
      },
      {
        id: "analytics",
        heading: "Analytics, if it is added later",
        paragraphs: [
          "This draft assumes analytics is not running. If YAGYDI later adds a tool that measures visits, that tool may set its own cookies and the organisation should update this page before switching it on. Until then, do not assume your visit is being measured.",
        ],
      },
      {
        id: "questions",
        heading: "Questions about this draft",
        paragraphs: [
          placeholderContact,
          "A question sent to a placeholder address may not arrive. This page is not a channel for urgent or safeguarding concerns. Use the safeguarding page for harm to a child or young person, and the contact page once a real address is published.",
        ],
        links: [
          { href: "/safeguarding", label: "Safeguarding draft" },
          { href: "/contact", label: "Contact" },
        ],
      },
    ],
  },
  safeguarding: {
    path: "/safeguarding",
    title: "Safeguarding",
    breadcrumb: "Safeguarding",
    description: `${legalDraftBanner} Placeholder safeguarding wording for children and young people aged 15 to 35. Not an adopted YAGYDI policy.`,
    intro:
      "YAGYDI's work involves children and young people. This draft says how a concern could be raised, in outline only. It does not name a safeguarding lead, because one has not been published, and it is not an adopted safeguarding policy.",
    sections: [
      {
        id: "who-this-covers",
        heading: "Who this draft is about",
        paragraphs: [
          "This draft is about protecting children and young people who take part in, or are affected by, YAGYDI's work. The age range the organisation uses for its youth community is 15 to 35. Harm to a child, including anyone under 18, and harm to a young person in that wider group, both belong in a safeguarding concern.",
          "Harm includes physical, sexual, or emotional abuse, neglect, exploitation, bullying, and being put at risk online or in a programme. This list is a guide for the draft. It is not a legal definition.",
        ],
      },
      {
        id: "what-this-draft-intends",
        heading: "What this draft intends",
        paragraphs: [
          "The intention of this draft is that people can speak up, that concerns are taken seriously, and that the organisation acts to reduce the chance of further harm. The draft does not claim that a procedure is already in force, that staff have been trained, or that a particular outcome will follow.",
          "There is no named safeguarding lead on this page. Do not invent one, and do not wait for a job title that has not been published.",
        ],
      },
      {
        id: "how-to-report",
        heading: "How to report a concern",
        paragraphs: [
          placeholderContact,
          "If you can, say what happened, when, where, and who was affected, and whether you think anyone is still at risk. Share only what you are comfortable putting in writing. You do not have to prove the concern before you raise it.",
          "If a child or young person is in immediate danger, contact local emergency services. This website is not monitored as an emergency line, and a message sent here may not be seen quickly.",
          "You can also raise a concern about the organisation's own conduct through the whistleblowing draft. Use safeguarding when the worry is harm to a child or young person.",
        ],
        links: [
          { href: "/contact", label: "Contact" },
          { href: "/whistleblowing", label: "Whistleblowing draft" },
        ],
      },
      {
        id: "what-happens-next",
        heading: "What this draft says happens next",
        paragraphs: [
          "In outline only: the intention is that a report is acknowledged, that only people who need it in order to respond are told, and that steps are taken to reduce the risk of further harm. That might include pausing an activity, speaking with the person affected where it is safe to do so, and getting outside help.",
          "This draft does not set a number of days, name who inside YAGYDI would reply, or promise confidentiality in every case. If someone is at risk, or the law requires it, information may need to be shared with an authority. A reviewed policy should say that clearly before it is adopted.",
        ],
      },
    ],
  },
  whistleblowing: {
    path: "/whistleblowing",
    title: "Whistleblowing",
    breadcrumb: "Whistleblowing",
    description: `${legalDraftBanner} Placeholder wording for raising a concern in good faith. Not an adopted YAGYDI policy.`,
    intro:
      "This draft describes how someone might raise a concern about YAGYDI in good faith. It is not an adopted whistleblowing policy, and the non-retaliation wording below is an intention of the draft, not a legal guarantee.",
    sections: [
      {
        id: "raising-a-concern",
        heading: "Raising a concern",
        paragraphs: [
          "A concern, for this draft, is a honest worry that something in the organisation's work is unsafe, dishonest, or seriously unfair. Examples include misuse of funds, a cover-up, or someone being pressured to stay silent. You do not have to be certain. Raising a concern in good faith means you believe it is true and you are not using it only to hurt someone.",
          "If the worry is that a child or young person is being harmed, or is at risk of harm, use the safeguarding draft as well. That page is the one meant for harm to children and young people aged 15 to 35, including anyone under 18.",
        ],
        links: [{ href: "/safeguarding", label: "Safeguarding draft" }],
      },
      {
        id: "good-faith",
        heading: "Good faith",
        paragraphs: [
          "This draft asks you to share what you know, say if you are unsure, and avoid publishing accusations on social media before the organisation has had a chance to look. A concern raised in good faith is still worth hearing if it turns out to be mistaken.",
          "Knowingly false accusations are not what this draft is for. A reviewed policy would need to say how those are handled. This page does not.",
        ],
      },
      {
        id: "non-retaliation",
        heading: "Non-retaliation is an intention of this draft",
        paragraphs: [
          "The intention of this draft is that a person who raises a concern in good faith will not be punished, excluded from a programme, or treated worse for having spoken. That includes volunteers and young people, not only staff.",
          "This is not a promise that has been adopted, and it is not legal advice about whistleblower protection in Nigeria or anywhere else. It does not stop YAGYDI from acting on a separate conduct issue. A reviewed policy should be checked before anyone relies on it.",
        ],
      },
      {
        id: "how-to-contact",
        heading: "How to get in touch",
        paragraphs: [
          placeholderContact,
          "Say that you are raising a concern under this draft, what it is about, and how you would like to be contacted. You may withhold your name, but an anonymous note sent to a placeholder address is easy to lose, and the organisation may not be able to reply.",
          "There is no named whistleblowing officer on this page.",
        ],
        links: [
          { href: "/contact", label: "Contact" },
          { href: "/safeguarding", label: "Safeguarding, if a child or young person is at risk" },
        ],
      },
    ],
  },
  terms: {
    path: "/terms",
    title: "Terms of use",
    breadcrumb: "Terms",
    description: `${legalDraftBanner} Placeholder website terms. Content is informational. Not an adopted YAGYDI agreement.`,
    intro:
      "These are draft terms for using this website. They are not a contract YAGYDI has adopted, and they are not legal advice. If a sentence here conflicts with a reviewed document the organisation later publishes, the reviewed document is the one to follow.",
    sections: [
      {
        id: "using-this-website",
        heading: "Using this website",
        paragraphs: [
          "You may read the public pages for information about YAGYDI. Do not misuse the site, attempt to break it, or present its placeholder text as an official statement of the organisation.",
          "The site may change, and pages may be incomplete. A missing page shows a simple not-found message. That is not an offer to provide the missing material.",
        ],
      },
      {
        id: "informational-content",
        heading: "Content is informational",
        paragraphs: [
          "Text, figures, stories, and programme descriptions are for general information. Much of the site is still marked as a placeholder. It is not professional, legal, medical, or financial advice, and it is not a promise of a place on a programme or of a particular result from a donation.",
          "Numbers, names, and registration details in square brackets, or marked TODO, are not facts about YAGYDI. Do not cite them as the organisation's record.",
        ],
      },
      {
        id: "external-links",
        heading: "External links",
        paragraphs: [
          "Links to social networks, Tally, Google Forms, Paystack, Flutterwave, Stripe, and file hosts leave this website. Those sites have their own terms. A link is not an endorsement of everything on the other site, and a placeholder link (one that still contains XXXXXX) is not a live service.",
          "Donations, if the payment links are later made live, are completed on the payment company's page. This website does not take the payment itself.",
        ],
      },
      {
        id: "draft-status",
        heading: "Draft status",
        paragraphs: [
          `${legalDraftBanner} These terms have not been adopted by YAGYDI. They do not waive anyone's rights, limit liability, or choose a court. A lawyer should review any terms the organisation wants people to rely on.`,
          "The privacy, safeguarding, and whistleblowing pages are drafts in the same way. They are linked here so they can be found, not because they are in force.",
        ],
        links: [
          { href: "/privacy", label: "Privacy draft" },
          { href: "/safeguarding", label: "Safeguarding draft" },
          { href: "/whistleblowing", label: "Whistleblowing draft" },
          { href: "/contact", label: "Contact" },
        ],
      },
    ],
  },
} as const satisfies Record<string, LegalPageContent>;

export type LegalPageId = keyof typeof legalPages;
