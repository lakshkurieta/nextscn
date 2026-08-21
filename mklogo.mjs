/**
 * Derives the web logo assets from the master artwork.
 *   source: ~/Desktop/NEXT SCN LOGO.png  (16668 x 7668 RGBA)
 *
 * Emits into /public:
 *   next-scn-logo.png           primary full-colour lockup   (light backgrounds)
 *   next-scn-logo-reversed.png  reversed lockup              (Ink Black / Deep Blue)
 *   next-scn-icon.png           the linked-X alone           (favicon / avatar)
 *
 * Re-run with:  node mklogo.mjs
 */
import sharp from "sharp";
import path from "node:path";

const SRC = "/Users/laksh/Desktop/NEXT SCN LOGO.png";
const PUB = "/Users/laksh/Downloads/10k-websites/next-scn/public";
const APP = "/Users/laksh/Downloads/10k-websites/next-scn/app";
const WIDTH = 1600;

/**
 * The wordmark and descriptor are neutral ink — rgb(34,34,34) and rgb(19,12,14).
 * The linked-X is the only chromatic element. Relative saturation is useless
 * here (a near-black pixel reads as 0.37 saturated), so classify on ABSOLUTE
 * chroma instead: max-min. Neutral ink lands under 32; every brand colour,
 * including its darkest antialiased edges, lands far above it.
 */
const CHROMA_CUTOFF = 32;
const chroma = (r, g, b) => Math.max(r, g, b) - Math.min(r, g, b);

const master = await sharp(SRC).trim({ threshold: 1 }).toBuffer();

// 1 — primary lockup
await sharp(master)
  .resize({ width: WIDTH, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(path.join(PUB, "next-scn-logo.png"));

const { data, info } = await sharp(master)
  .resize({ width: WIDTH, withoutEnlargement: true })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

// 2 — reversed lockup: neutral ink to white, brand colour untouched
const reversed = Buffer.from(data);
let flipped = 0;
for (let i = 0; i < reversed.length; i += 4) {
  if (reversed[i + 3] === 0) continue;
  if (chroma(reversed[i], reversed[i + 1], reversed[i + 2]) < CHROMA_CUTOFF) {
    reversed[i] = reversed[i + 1] = reversed[i + 2] = 255;
    flipped++;
  }
}
await sharp(reversed, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(path.join(PUB, "next-scn-logo-reversed.png"));

// 3 — icon: bounding box of the chromatic pixels only
let minX = Infinity, minY = Infinity, maxX = -1, maxY = -1;
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    if (data[i + 3] < 40) continue;
    if (chroma(data[i], data[i + 1], data[i + 2]) >= CHROMA_CUTOFF) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
const pad = 8; // breathing room so the rounded caps are not clipped
const box = {
  left: Math.max(0, minX - pad),
  top: Math.max(0, minY - pad),
  width: Math.min(info.width, maxX - minX + 1 + pad * 2),
  height: Math.min(info.height, maxY - minY + 1 + pad * 2),
};

// One icon per background: the descending link is neutral ink, so on Ink Black
// it has to come from the reversed raster or it disappears.
const rawOpts = { raw: { width: info.width, height: info.height, channels: 4 } };
await sharp(data, rawOpts).extract(box).resize({ width: 512 })
  .png({ compressionLevel: 9 }).toFile(path.join(PUB, "next-scn-icon.png"));
await sharp(reversed, rawOpts).extract(box).resize({ width: 512 })
  .png({ compressionLevel: 9 }).toFile(path.join(PUB, "next-scn-icon-reversed.png"));

// 4 — favicon: reversed icon centred on an Ink Black tile, legible in any tab bar
const TILE = 512, INSET = 84;
const iconForTile = await sharp(reversed, rawOpts).extract(box)
  .resize({ width: TILE - INSET * 2, height: TILE - INSET * 2, fit: "contain",
            background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()          // raw-in pipelines emit raw bytes unless a codec is set
  .toBuffer();
await sharp({ create: { width: TILE, height: TILE, channels: 4, background: "#080808" } })
  .composite([{ input: iconForTile, gravity: "center" }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(APP, "icon.png"));

console.log(`neutral pixels flipped to white: ${flipped}`);
console.log(`icon bbox: ${minX},${minY} -> ${maxX},${maxY}`);
for (const f of ["next-scn-logo.png", "next-scn-logo-reversed.png", "next-scn-icon.png", "next-scn-icon-reversed.png"]) {
  const m = await sharp(path.join(PUB, f)).metadata();
  console.log(`${f}  ${m.width}x${m.height}  ${(m.size / 1024).toFixed(1)} KB`);
}
