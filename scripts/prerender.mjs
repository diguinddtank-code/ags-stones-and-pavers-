// Build step: turn the client-rendered SPA into one static HTML file per URL.
//
//   vite build                                   -> dist/ (client bundle + template)
//   vite build --ssr entry-server.tsx            -> dist-ssr/entry-server.js
//   node scripts/prerender.mjs                   -> dist/**/*.html, sitemap.xml, 404.html
//
// Crawlers then receive the full page (title, canonical, schema, content,
// links) in the first response instead of an empty <div id="root">.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const { render, getSiteRoutes, SITE_URL } = await import(
  pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
);

// dist/index.html gets overwritten by the "/" page below, so keep a pristine
// copy of the Vite template to make re-running this script safe.
const templateCopy = path.join(root, 'dist-ssr', 'template.html');
const built = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
if (built.includes('<!--app-html-->')) fs.writeFileSync(templateCopy, built);
const template = fs.readFileSync(templateCopy, 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--app-head--> / <!--app-html--> placeholders');
}

// The hero video poster preload only helps pages that actually show it.
const HERO_PRELOAD = /\s*<!-- PRELOAD HERO LCP POSTER -->\s*<link rel="preload" as="image"[^>]*>/;
const PAGES_WITH_HERO_VIDEO = new Set(['/', '/quote']);

// React 19 emits hoistable tags (<title>, <meta>, <link>) at the start of the
// render output. Move that leading run into <head>; the rest is the body.
const HOISTABLE = /^(?:<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>)/;

function splitHead(html) {
  let head = '';
  let rest = html;
  for (let m = rest.match(HOISTABLE); m; m = rest.match(HOISTABLE)) {
    head += m[0];
    rest = rest.slice(m[0].length);
  }
  return { head, body: rest };
}

function outputFile(route) {
  if (route === '/') return path.join(distDir, 'index.html');
  return path.join(distDir, `${route.replace(/^\//, '')}.html`);
}

async function renderPage(route) {
  const html = await render(route);
  const { head, body } = splitHead(html);
  let page = template.replace('<!--app-head-->', head).replace('<!--app-html-->', body);
  if (!PAGES_WITH_HERO_VIDEO.has(route)) page = page.replace(HERO_PRELOAD, '');
  return { page, head, body };
}

const routes = getSiteRoutes();
const known = new Set(routes.map((r) => r.path));
const problems = [];
const linkTargets = new Map();

for (const r of routes) {
  const { page, head, body } = await renderPage(r.path);

  // Guardrails: every indexable page must carry its own title + canonical.
  const canonical = head.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const expected = r.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${r.path}`;
  if (!/<title>/.test(head)) problems.push(`${r.path}: missing <title>`);
  if (canonical !== expected) problems.push(`${r.path}: canonical is ${canonical}, expected ${expected}`);
  if (/noindex/.test(head)) problems.push(`${r.path}: rendered as noindex (404?)`);
  for (const m of body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch {
      problems.push(`${r.path}: invalid JSON-LD`);
    }
  }
  for (const m of body.matchAll(/href="(\/[^"#?]*)/g)) {
    const target = m[1].length > 1 ? m[1].replace(/\/$/, '') : m[1];
    if (!linkTargets.has(target)) linkTargets.set(target, r.path);
  }

  const file = outputFile(r.path);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page);
}

// 404 page (served with a real 404 status by Vercel / server.ts).
const notFound = await renderPage('/404');
fs.writeFileSync(path.join(distDir, '404.html'), notFound.page);

// sitemap.xml generated from the same route list.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${r.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${r.path}`}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);

// Every internal link must point at a prerendered page or a static file.
for (const [target, from] of linkTargets) {
  const isFile = /\.[a-z0-9]+$/i.test(target);
  if (!known.has(target) && !(isFile && fs.existsSync(path.join(distDir, target)))) {
    problems.push(`broken internal link ${target} (first seen on ${from})`);
  }
}

if (problems.length) {
  console.error(`\nPrerender found ${problems.length} problem(s):\n - ${problems.join('\n - ')}`);
  process.exit(1);
}
console.log(`Prerendered ${routes.length} pages + 404.html, sitemap.xml with ${routes.length} URLs.`);
