// One-off: turns raw Poly Haven downloads (CC0) into web-ready assets for the
// 3D Yard Studio.
//
//   node scripts/prepare-yard-assets.mjs <download-dir>
//
//   <download-dir>/tex/<id>/{diff,nor,arm}.jpg   -> public/yard/tex/<id>/{diff,nor,arm}.webp (1024px)
//   <download-dir>/models/<id>/*.gltf            -> public/yard/models/<id>.glb (meshopt, webp, simplified)
//   <download-dir>/hdri/*.hdr                    -> public/yard/sky.hdr (day) or sky-dusk.hdr
//
// Source: https://polyhaven.com (all assets CC0).
//
// public/yard/models/island_tree_02_far.glb (background trees) is the same tree
// optimized with --simplify-ratio 0.06 --texture-size 512.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const src = process.argv[2];
if (!src) throw new Error('usage: node scripts/prepare-yard-assets.mjs <download-dir>');
const out = path.join(process.cwd(), 'public', 'yard');

// --- textures ---
const quality = { diff: 78, nor: 88, arm: 72 };
for (const id of fs.readdirSync(path.join(src, 'tex'))) {
  const dir = path.join(out, 'tex', id);
  fs.mkdirSync(dir, { recursive: true });
  for (const map of ['diff', 'nor', 'arm']) {
    await sharp(path.join(src, 'tex', id, `${map}.jpg`))
      .resize(1024, 1024, { fit: 'cover' })
      .webp({ quality: quality[map], effort: 5 })
      .toFile(path.join(dir, `${map}.webp`));
  }
}

// --- swatch thumbnails (UI + homepage teaser) ---
fs.mkdirSync(path.join(out, 'thumbs'), { recursive: true });
for (const id of fs.readdirSync(path.join(out, 'tex'))) {
  await sharp(path.join(out, 'tex', id, 'diff.webp'))
    .resize(256, 256)
    .webp({ quality: 72 })
    .toFile(path.join(out, 'thumbs', `${id}.webp`));
}

// --- models ---
// How much geometry each model keeps (the tree is ~2M triangles at source).
const ratio = { island_tree_02: 0.3, shrub_02: 0.35, shrub_04: 0.35 };
const cli = path.join(process.cwd(), 'node_modules', '@gltf-transform', 'cli', 'bin', 'cli.js');
fs.mkdirSync(path.join(out, 'models'), { recursive: true });
for (const id of fs.readdirSync(path.join(src, 'models'))) {
  const dir = path.join(src, 'models', id);
  const gltf = fs.readdirSync(dir).find((f) => f.endsWith('.gltf'));
  const args = [
    cli, 'optimize', path.join(dir, gltf), path.join(out, 'models', `${id}.glb`),
    '--compress', 'meshopt',
    '--texture-compress', 'webp',
    '--texture-size', id === 'island_tree_02' ? '1024' : '512',
  ];
  if (ratio[id]) args.push('--simplify', 'true', '--simplify-ratio', String(ratio[id]), '--simplify-error', id === 'island_tree_02' ? '0.002' : '0.01');
  else args.push('--simplify', 'false');
  execFileSync(process.execPath, args, { stdio: 'inherit' });
}

// --- sky ---
for (const hdr of fs.readdirSync(path.join(src, 'hdri')).filter((f) => f.endsWith('.hdr'))) {
  fs.copyFileSync(path.join(src, 'hdri', hdr), path.join(out, /dusk|sunset|night/.test(hdr) ? 'sky-dusk.hdr' : 'sky.hdr'));
}
console.log('yard assets ready in public/yard');
