/** Copy for the Become a Member page. */

export const FOUNDING_MEMBER_DOES = [
  "Brings their network into the room and makes introductions inside it",
  "Shapes which cities open first and what a NEXT gathering feels like",
  "Holds us to the standards on this website, especially “no pay-to-play”",
  "Gets first access to everything, permanently, and pays the founding rate forever",
];

export const FOUNDING_BOARD_DOES = [
  "Anchors one of the six pillars and owns bringing that pillar into the room",
  "Sets the constitution, the code of conduct and the first year of programming",
  "Opens doors that a new organization cannot open for itself",
  "Is named as a founder of NEXT for as long as NEXT exists",
];

export const TIERS = [
  {
    eyebrow: "The first 50",
    name: "Founding Member",
    price: "$500",
    priceNote: "for your first two years",
    points: [
      "Permanent “Founding Member” status",
      "Named on the NEXT website, permanently",
      "Direct input on chapters, format and standards",
      "Priority access to every founding gathering",
      "Capped at 50 across all six pillars, no single sector takes the room",
    ],
    featured: false,
  },
  {
    eyebrow: "The first 20",
    name: "Founding Member for Life",
    price: "$500",
    priceNote: "annual, locked for life",
    inherits: "Everything in Founding Member, plus:",
    points: [
      "Lifetime Founding Member status",
      "The price never moves, whatever membership costs in ten years",
      "Top-tier placement in the founding roster",
      "First right on chapter leadership and stage",
      "Only 20 exist. There will never be more.",
    ],
    featured: true,
  },
  {
    eyebrow: "By selection",
    name: "Founding Board Member",
    price: "Not for sale",
    priceNote: "and not first-come",
    points: [
      "Apply through the same form. We review every application and select.",
      "Shape the constitution, the standards and the first year of programming.",
      "Named as a founder of the organization, permanently.",
      "Recruited for reach and generosity, not job title.",
    ],
    featured: false,
  },
];

export const JOIN_AS = [
  "Founding Member",
  "Founding Board Member",
  "Not sure yet, tell me more",
];

export const PILLAR_OPTIONS = [
  "Operator",
  "Technology & IT",
  "Brand, retail or e-commerce",
  "Manufacturer, supplier or distributor",
  "Capital",
  "Enabler",
];
