export type StrategicPillar = {
  slug: string;
  title: string;
  lead?: string;
  body: string;
};

export const strategicFocus = {
  heading: "OUR STRATEGIC FOCUS",
  intro:
    "Our strategic focus guides where YAGYDI invests expertise and resources for measurable impact. These pillars ensure our programmes stay responsive, inclusive, and aligned with national and global priorities.",
  pillars: [
    {
      slug: "inclusive-healthcare",
      title: "Advocacy for an Inclusive and Quality Healthcare Programme",
      body: "We promote equitable access to youth-centred, high-quality healthcare for all young people, with a particular focus on the most vulnerable. Our ultimate aim is for every young person, regardless of gender, location, or background, to receive stigma-free, high-quality healthcare. This should foster greater health-seeking behaviours and better health results.",
    },
    {
      slug: "inclusive-education",
      title: "Advocacy for an Inclusive, Improved, and Quality Education",
      body: "Education should inspire, empower, and open doors to opportunities. We advocate for education systems that are inclusive, future-ready, and relevant to the social and economic realities of young people. We envisage an education landscape where every child and young person has equal access to quality learning. They should benefit from clear pathways into employment, entrepreneurship, and lifelong learning.",
    },
    {
      slug: "research-policy",
      title: "Research and Policy",
      lead: "Evidence-based decisions.",
      body: "We rely on credible, youth-centred research to guide policies impacting young people. We aim for a policy environment where decisions are driven by data, lived experiences, and youth voices. These elements contribute to responsive, equitable, and accountable governance.",
    },
    {
      slug: "economic-empowerment",
      title: "Economic Empowerment, Youth Development, and Investment",
      body: "We create pathways for young people to earn, innovate, and succeed by improving employability, entrepreneurship, and economic opportunities. Our goal is a thriving youth workforce where every young person has equal access to employment, entrepreneurship, and sustainable income prospects.",
    },
    {
      slug: "citizenship-elections-human-rights",
      title: "Citizenship and Civic Duties, Election, and Human Rights",
      body: "We foster informed, active citizens who defend rights, strengthen democracy, and support national development. We envision a society where youth engage in governance and uphold human rights. They influence democratic processes with integrity and purpose.",
    },
  ],
} as const satisfies {
  heading: string;
  intro: string;
  pillars: readonly StrategicPillar[];
};
