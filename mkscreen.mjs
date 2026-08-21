/**
 * Builds the image shown on the MacBook screen above the footer.
 * 4:3 to match the lid (32rem x 24rem), Ink Black with the signature gradient.
 * Re-run with:  node mkscreen.mjs
 */
import sharp from "sharp";
import path from "node:path";

const PUB = "/Users/laksh/Downloads/10k-websites/next-scn/public";
const W = 1600, H = 1200;

const bg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <!-- objectBoundingBox units (the SVG default), so every element using this
         fill gets the whole ramp across its own box rather than a flat slice
         of a canvas-sized gradient. -->
    <linearGradient id="sig" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%"  stop-color="#FF7E5F"/>
      <stop offset="27%" stop-color="#E5457E"/>
      <stop offset="54%" stop-color="#A537C8"/>
      <stop offset="78%" stop-color="#4B2FD6"/>
      <stop offset="100%" stop-color="#010080"/>
    </linearGradient>
    <radialGradient id="bloom" cx="72%" cy="18%" r="62%">
      <stop offset="0%"   stop-color="#A537C8" stop-opacity="0.60"/>
      <stop offset="45%"  stop-color="#4B2FD6" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#080808" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="teal" cx="18%" cy="88%" r="52%">
      <stop offset="0%"   stop-color="#3FE0D0" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#080808" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" fill="none" stroke="#ffffff" stroke-opacity="0.045" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="#080808"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#bloom)"/>
  <rect width="${W}" height="${H}" fill="url(#teal)"/>

  <rect x="0" y="0" width="${W}" height="74" fill="#0d0d0f"/>
  <circle cx="42" cy="37" r="9" fill="#2c2c30"/>
  <circle cx="72" cy="37" r="9" fill="#2c2c30"/>
  <circle cx="102" cy="37" r="9" fill="#2c2c30"/>
  <rect x="150" y="21" width="420" height="32" rx="16" fill="#161619"/>
  <text x="176" y="43" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="17" fill="#6a6a72">nextscn.com</text>

  <text x="110" y="560" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="112" font-weight="700" letter-spacing="-4" fill="#ffffff">Meet your next</text>
  <text x="110" y="690" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="112" font-weight="700" letter-spacing="-4" fill="url(#sig)">partner</text>

  <text x="112" y="790" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="38" fill="#ffffff" fill-opacity="0.55">Connect. Learn. Collaborate. Grow.</text>

  <rect x="110" y="860" width="270" height="86" rx="43" fill="url(#sig)"/>
  <text x="245" y="913" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="31" font-weight="600" fill="#ffffff">Learn more</text>

</svg>`);

const logo = await sharp(path.join(PUB, "next-scn-logo-reversed.png"))
  .resize({ width: 300 })
  .toBuffer();

await sharp(bg)
  .composite([{ input: logo, left: 110, top: 170 }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(PUB, "next-scn-screen.png"));

const m = await sharp(path.join(PUB, "next-scn-screen.png")).metadata();
console.log(`next-scn-screen.png  ${m.width}x${m.height}`);
