/**
 * Trade lanes rendered on the contact globe.
 * Arc colours are drawn only from Signature Teal and the signature gradient
 * stops (07 IN USE: "Deep Blue and Signature Teal for charts, links and
 * interactive states").
 */
const TEAL = "#3FE0D0";
const CORAL = "#FF7E5F";
const MAGENTA = "#E5457E";
const VIOLET = "#A537C8";

type Hub = [number, number];

const HUBS: Record<string, Hub> = {
  shanghai: [31.23, 121.47],
  singapore: [1.35, 103.82],
  rotterdam: [51.92, 4.48],
  losAngeles: [34.05, -118.24],
  dubai: [25.2, 55.27],
  hamburg: [53.55, 9.99],
  mumbai: [19.08, 72.88],
  saoPaulo: [-23.55, -46.63],
  lagos: [6.52, 3.38],
  sydney: [-33.87, 151.21],
  tokyo: [35.68, 139.65],
  newYork: [40.71, -74.01],
  london: [51.51, -0.13],
  panama: [8.98, -79.52],
  antwerp: [51.22, 4.4],
  busan: [35.18, 129.08],
  chicago: [41.88, -87.63],
  mexicoCity: [19.43, -99.13],
  johannesburg: [-26.2, 28.05],
  hoChiMinh: [10.82, 106.63],
};

const lane = (
  order: number,
  from: keyof typeof HUBS,
  to: keyof typeof HUBS,
  arcAlt: number,
  color: string,
) => ({
  order,
  startLat: HUBS[from][0],
  startLng: HUBS[from][1],
  endLat: HUBS[to][0],
  endLng: HUBS[to][1],
  arcAlt,
  color,
});

export const arcs = [
  lane(1, "shanghai", "losAngeles", 0.34, TEAL),
  lane(1, "singapore", "rotterdam", 0.42, CORAL),
  lane(1, "dubai", "mumbai", 0.12, TEAL),
  lane(1, "newYork", "london", 0.24, VIOLET),
  lane(2, "hamburg", "newYork", 0.28, TEAL),
  lane(2, "busan", "panama", 0.36, MAGENTA),
  lane(2, "lagos", "antwerp", 0.26, TEAL),
  lane(2, "saoPaulo", "rotterdam", 0.38, CORAL),
  lane(3, "tokyo", "sydney", 0.24, TEAL),
  lane(3, "shanghai", "singapore", 0.14, VIOLET),
  lane(3, "losAngeles", "chicago", 0.1, TEAL),
  lane(3, "mumbai", "london", 0.3, MAGENTA),
  lane(4, "hoChiMinh", "losAngeles", 0.4, TEAL),
  lane(4, "panama", "newYork", 0.16, CORAL),
  lane(4, "johannesburg", "dubai", 0.28, TEAL),
  lane(4, "antwerp", "mexicoCity", 0.34, VIOLET),
  lane(5, "singapore", "sydney", 0.22, TEAL),
  lane(5, "rotterdam", "chicago", 0.3, MAGENTA),
  lane(5, "tokyo", "shanghai", 0.1, TEAL),
  lane(5, "mexicoCity", "saoPaulo", 0.24, CORAL),
  lane(6, "london", "lagos", 0.26, TEAL),
  lane(6, "dubai", "hamburg", 0.22, VIOLET),
  lane(6, "busan", "sydney", 0.3, TEAL),
  lane(6, "mumbai", "singapore", 0.16, MAGENTA),
];

/**
 * Lanes for the flat hero map. Fewer than the globe carries — the hero map is a
 * background, so it stays legible behind the headline.
 */
const point = (h: keyof typeof HUBS) => ({ lat: HUBS[h][0], lng: HUBS[h][1] });

export const mapLanes = [
  { start: point("shanghai"), end: point("losAngeles") },
  { start: point("singapore"), end: point("rotterdam") },
  { start: point("rotterdam"), end: point("newYork") },
  { start: point("saoPaulo"), end: point("lagos") },
  // Dubai to Mumbai rendered as a 66px stub, barely longer than the two dots
  // at its ends. Run it up to Tokyo instead: same corner of the map, but a
  // lane with enough length for the travelling pulse to read as travelling.
  { start: point("dubai"), end: point("tokyo") },
  { start: point("losAngeles"), end: point("mexicoCity") },
  { start: point("busan"), end: point("sydney") },
  { start: point("london"), end: point("johannesburg") },
  // Two lanes anchored in the north-east of the map, which was the emptiest
  // quadrant: Tokyo sat in the data but was not on any hero lane at all.
  { start: point("tokyo"), end: point("losAngeles") },
  { start: point("busan"), end: point("rotterdam") },
];
