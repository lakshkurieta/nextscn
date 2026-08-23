/**
 * Builds app/opengraph-image.png — the card shown when the site is shared on
 * LinkedIn, WhatsApp, Slack, X. 1200x630 is the size every platform crops from.
 *
 * A static PNG rather than Next's ImageResponse: this card never changes per
 * page, so rendering it once at build time avoids shipping a font and running
 * Satori on every request.
 *
 * Re-run with:  node mkog.mjs
 */
import sharp from "sharp";
import path from "node:path";

const ROOT = "/Users/laksh/Downloads/10k-websites/next-scn";
const W = 1200, H = 630;

const bg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="sig" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%"  stop-color="#FF7E5F"/>
      <stop offset="27%" stop-color="#E5457E"/>
      <stop offset="54%" stop-color="#A537C8"/>
      <stop offset="78%" stop-color="#4B2FD6"/>
      <stop offset="100%" stop-color="#010080"/>
    </linearGradient>
    <radialGradient id="bloom" cx="78%" cy="16%" r="66%">
      <stop offset="0%"   stop-color="#A537C8" stop-opacity="0.55"/>
      <stop offset="45%"  stop-color="#4B2FD6" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="#080808" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0H0V60" fill="none" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="#080808"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#bloom)"/>

  <text x="80" y="330" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="74" font-weight="700" letter-spacing="-2.5" fill="#ffffff">Bringing supply chain</text>
  <text x="80" y="418" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="74" font-weight="700" letter-spacing="-2.5" fill="url(#sig)">minds together.</text>

  <text x="82" y="492" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="27" fill="#ffffff" fill-opacity="0.55">Connect. Learn. Collaborate. Grow.</text>

  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="url(#sig)"/>
</svg>`);

const logo = await sharp(path.join(ROOT, "public/next-scn-logo-reversed.png"))
  .resize({ width: 300 })
  .toBuffer();

await sharp(bg)
  .composite([{ input: logo, left: 80, top: 96 }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(ROOT, "app/opengraph-image.png"));

const m = await sharp(path.join(ROOT, "app/opengraph-image.png")).metadata();
console.log(`opengraph-image.png  ${m.width}x${m.height}`);
