// Generates responsive WebP variants for every photo in public/images.
//
//   public/images/<name>.(jpg|png|webp)  ->  public/images/opt/<name>-<width>.webp
//
// Components render them through <Img> (components/ui/Img.tsx), which builds the
// matching srcset, so phones download a ~40-90 KB file instead of a 0.3-1 MB one.
// Existing outputs are skipped, so this is cheap to run on every build.

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

export const WIDTHS = [480, 828, 1200, 1680];

const srcDir = path.join(process.cwd(), 'public', 'images');
const outDir = path.join(srcDir, 'opt');
fs.mkdirSync(outDir, { recursive: true });

let made = 0;
for (const file of fs.readdirSync(srcDir)) {
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
  const base = file.replace(/\.[^.]+$/, '');
  const input = path.join(srcDir, file);
  const { width = 0 } = await sharp(input).metadata();

  for (const w of WIDTHS) {
    const out = path.join(outDir, `${base}-${w}.webp`);
    if (fs.existsSync(out)) continue;
    await sharp(input)
      .resize({ width: Math.min(w, width), withoutEnlargement: true })
      .webp({ quality: w <= 828 ? 70 : 74, effort: 5 })
      .toFile(out);
    made++;
  }
}
console.log(`optimize-images: ${made} new variant(s) in public/images/opt`);
