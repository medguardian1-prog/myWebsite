// Converts the raw demo screenshots into web-ready WebP + tiny blur placeholders.
// Run with: node scripts/optimize-shots.mjs
import sharp from "sharp";
import { readdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";

const dir = path.join(process.cwd(), "public", "work");
const files = (await readdir(dir)).filter((f) => f.endsWith(".png"));
const blur = {};

for (const file of files) {
  const slug = path.basename(file, ".png");
  const src = path.join(dir, file);

  await sharp(src)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(dir, `${slug}.webp`));

  const tiny = await sharp(src).resize({ width: 20 }).blur(1.2).webp({ quality: 40 }).toBuffer();
  blur[slug] = `data:image/webp;base64,${tiny.toString("base64")}`;

  await unlink(src);
  console.log("optimised", slug);
}

await writeFile(path.join(process.cwd(), "src", "lib", "blur.json"), JSON.stringify(blur, null, 2));
console.log("wrote src/lib/blur.json");
