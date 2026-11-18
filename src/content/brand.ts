export type BrandColour = {
  name: string;
  hex: string;
  qualities: string;
  meaning: string;
  swatchClass: string;
  textClass: string;
};

export const brandColours = [
  {
    name: "Burnt Orange",
    hex: "#D87110",
    qualities: "Energy | Creativity | Action",
    meaning:
      "Represents the enthusiasm, innovation and youthful energy that drive our work. It inspires participation and bold ideas for change.",
    swatchClass: "bg-orange-100",
    textClass: "text-black",
  },
  {
    name: "Wisteria",
    hex: "#805D93",
    qualities: "Purpose | Humanity | Leadership",
    meaning:
      "Reflects our commitment to people, inclusion and transformational impact. It symbolises dignity, trust and a brighter future for young people.",
    swatchClass: "bg-wisteria-100",
    textClass: "text-white",
  },
  {
    name: "Lavender Gray",
    hex: "#C9B6BE",
    qualities: "Care | Inclusion | Community",
    meaning:
      "Brings balance and warmth to our identity. It represents compassion, equity and the diverse communities we serve.",
    swatchClass: "bg-lavender-100",
    textClass: "text-black",
  },
  {
    name: "Black",
    hex: "#000000",
    qualities: "Strength | Clarity | Integrity",
    meaning:
      "Provides credibility and structure. It symbolises accountability, professionalism and our commitment to good governance as outlined in our constitution.",
    swatchClass: "bg-black",
    textClass: "text-white",
  },
] as const satisfies readonly BrandColour[];
