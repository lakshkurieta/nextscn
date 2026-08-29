/**
 * Section 03 — the six pillars every NEXT gathering draws from.
 *
 * `note` carries the line the copy deck asked to be said out loud on that card
 * (Demand is the pillar other associations fail to bring, and the deck says to
 * say so). Technology deliberately gets the same visual weight as Operators —
 * per the deck, it is the clearest signal that NEXT is not another 3PL club.
 */
export type Pillar = {
  index: string;
  name: string;
  members: string;
  seeking: string;
  note?: string;
};

export const PILLARS: Pillar[] = [
  {
    index: "01",
    name: "Operators",
    members:
      "3PLs · 4PLs · carriers · freight forwarders · warehousing · fulfilment · last mile · cross-border",
    seeking: "new clients, capacity partners, tech that actually works, capital.",
  },
  {
    index: "02",
    name: "Technology & IT",
    members:
      "WMS · TMS · OMS · ERP · WES · robotics & automation · visibility platforms · AI & forecasting · integration and middleware",
    seeking:
      "qualified pipeline, implementation partners, design partners, investors.",
  },
  {
    index: "03",
    name: "Demand, the customers of the chain",
    members:
      "Brands · retailers · e-commerce and D2C · marketplaces · omnichannel operators",
    seeking:
      "fulfilment and freight partners, the right tech stack, peers who've already solved it.",
    note: "The pillar every existing association fails to bring.",
  },
  {
    index: "04",
    name: "Production",
    members:
      "Manufacturers · contract manufacturers · suppliers · sourcing and procurement · importers, exporters and traders · distributors",
    seeking: "route-to-market, downstream partners, buyers, capacity.",
  },
  {
    index: "05",
    name: "Capital",
    members:
      "Private equity · venture capital · growth equity · commercial banking · trade finance · insurance · M&A advisory",
    seeking:
      "proprietary deal flow, operator diligence, portfolio partnerships, before the banker's process starts.",
  },
  {
    index: "06",
    name: "Enablers",
    members:
      "Marketing · PR · legal · talent and recruitment · consulting · academia and research · associations",
    seeking:
      "clients who need them, and the industry context nobody outside it has.",
  },
];

/** Section 02 — what we do, and what we refuse to do. */
export const WE_DO = [
  {
    title: "Put five sectors in one room, on purpose.",
    body: "Operators, technology, brands, manufacturers and capital at the same table, at every gathering. Mixing isn't a bonus feature. It's the product.",
  },
  {
    title: "Make the introduction ourselves.",
    body: "You tell us who you need. We find them and connect you. That is the service.",
  },
  {
    title: "Open the door to the whole chain.",
    body: "If your work moves goods, you belong whether you run 40 warehouses or you're two years into your first job.",
  },
  {
    title: "Give the stage to insight.",
    body: "Speaking slots are earned by having something worth hearing.",
  },
  {
    title: "Build globally from day one.",
    body: "North America first for logistics. Never as a ceiling.",
  },
  {
    title: "Move at the speed of business.",
    body: "Decisions in days, not quarterly board cycles.",
  },
];

export const WE_DONT = [
  {
    title: "Run single-sector rooms.",
    body: "A room full of people with identical problems is a support group, not a network.",
  },
  {
    title: "Sell the stage.",
    body: "No pay-to-present. No sponsor keynotes disguised as content. If we ever break this rule, hold us to it publicly.",
  },
  {
    title: "Gatekeep by title.",
    body: "Your seniority decides nothing about whether you're worth meeting.",
  },
  {
    title: "Hand out badges as achievements.",
    body: "Membership is a starting line.",
  },
  {
    title: "Bury you in newsletters.",
    body: "We contact you when there's someone you should meet.",
  },
  {
    title: "Pretend to be a trade body.",
    body: "We don't lobby. We don't publish standards. We connect people. That's the entire remit.",
  },
];

/** Section 04 — what membership actually gets you. */
export const BENEFITS = [
  {
    index: "01",
    title: "Introductions made for you, not left to chance",
    body: "Tell us who you're looking for, a client in home goods, a WMS built for cold chain, an investor who understands middle-mile. We go find them and we make the introduction personally. This is the core of the membership and nobody else in this industry does it.",
  },
  {
    index: "02",
    title: "The best-mixed rooms in supply chain",
    body: "Curated gatherings, dinners, roundtables, chapter events, an annual flagship, where the seating plan is engineered so you leave having met people you'd never have met otherwise.",
  },
  {
    index: "03",
    title: "A directory that's actually navigable",
    body: "Every member listed by pillar, capability and geography. Search it. Reach anyone in it. No cold-outreach roulette.",
  },
  {
    index: "04",
    title: "The room's collective intelligence",
    body: "Ask the network a question, vendor selection, market entry, a rate benchmark, a hiring decision, and get answers from people who've already done it, not from a search engine.",
  },
  {
    index: "05",
    title: "A platform, if you earn it",
    body: "Speak, host, write, lead a chapter. Visibility here is earned by contribution, which is exactly why it's worth having.",
  },
  {
    index: "06",
    title: "A network that travels",
    body: "North America now, and a deliberate global build. Your membership works wherever the chain takes you.",
  },
];
