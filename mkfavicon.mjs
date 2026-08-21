/**
 * Builds app/favicon.ico from the NEXT mark.
 *
 * sharp cannot write ICO, so the container is assembled by hand. A modern ICO
 * is just a small header plus embedded PNGs, which is well supported and much
 * simpler than the legacy BMP payload.
 *
 * Re-run with:  node mkfavicon.mjs
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const APP = "/Users/laksh/Downloads/10k-websites/next-scn/app";
const SOURCE = path.join(APP, "icon.png"); // the mark on an Ink Black tile
const SIZES = [16, 32, 48];

const pngs = await Promise.all(
  SIZES.map((s) => sharp(SOURCE).resize(s, s).png({ compressionLevel: 9 }).toBuffer()),
);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // 1 = icon
header.writeUInt16LE(SIZES.length, 4);

let offset = 6 + SIZES.length * 16;
const entries = [];
pngs.forEach((png, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(SIZES[i] === 256 ? 0 : SIZES[i], 0); // width  (0 means 256)
  e.writeUInt8(SIZES[i] === 256 ? 0 : SIZES[i], 1); // height
  e.writeUInt8(0, 2); // palette size
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // colour planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(png.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += png.length;
  entries.push(e);
});

fs.writeFileSync(
  path.join(APP, "favicon.ico"),
  Buffer.concat([header, ...entries, ...pngs]),
);

const stat = fs.statSync(path.join(APP, "favicon.ico"));
console.log(`favicon.ico  ${SIZES.join("/")}px  ${(stat.size / 1024).toFixed(1)} KB`);
