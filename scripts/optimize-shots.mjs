// Converts raw demo screenshots into web-ready WebP.
// Drop new PNGs into public/work/ (named virelle, rjs, topnotch, junes,
// zinnia) then run: node scripts/optimize-shots.mjs
//
// No blur placeholders to generate — the images are imported as modules in
// src/lib/shots.ts, so Next produces the placeholder and, crucially, a
// content-hashed URL. That hash is what stops the image optimiser serving a
// stale copy of a screenshot you have just replaced.
import sharp from "sharp";
import { readdir, unlink } from "node:fs/promises";
import path from "node:path";

const dir = path.join(process.cwd(), "public", "work");
const files = (await readdir(dir)).filter((f) => f.endsWith(".png"));

if (files.length === 0) {
  console.log("No PNGs in public/work — nothing to do.");
}

for (const file of files) {
  const slug = path.basename(file, ".png");
  const src = path.join(dir, file);

  await sharp(src)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(dir, `${slug}.webp`));

  await unlink(src);
  console.log("optimised", slug);
}
