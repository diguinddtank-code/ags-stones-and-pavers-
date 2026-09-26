# AGS Stones and Pavers — Project Notes

Site: https://www.agsstonesandpavers.com (Vercel). Remote: `https://github.com/diguinddtank-code/ags-stones-and-pavers-`.
Run `git remote -v` before any commit/push and confirm it matches. Commit/push only when the user asks.

## Stack

- Vite + React 19 + TypeScript + Tailwind, `react-router-dom` v7, `framer-motion`, `lucide-react`.
- Colors: `brand-dark` #0f1115, `brand-gold` #d4af37. Fonts: Playfair Display (serif), Plus Jakarta Sans (sans).
- Forms post to Web3Forms — do not change them.

## SEO architecture (prerendered SPA)

- `npm run build` = client build → SSR build of `entry-server.tsx` → `scripts/prerender.mjs`.
  The prerender writes one static HTML per route (`dist/<route>.html`), `404.html` and `sitemap.xml`,
  and **fails the build** if a page lacks a title/canonical, has invalid JSON-LD or links to a URL that doesn't exist.
- `lib/routes.ts` is the single list of indexable URLs (sitemap + prerender). New page type → add it there.
- `lib/business.ts` holds NAP, hours, geo, social links and the shared schema builders. Never hardcode NAP elsewhere.
- `components/SEO.tsx` renders title/description/canonical/OG + one JSON-LD `@graph`
  (WebSite, LocalBusiness, WebPage, BreadcrumbList + page-specific nodes). Canonical defaults to the current path.
- Service pages (`pages/ServicePage.tsx`):
  - core hubs at `/service/:id` (`CORE_SERVICE_IDS` in `lib/serviceData.ts`);
  - hand-written local pages at `/:id` (`serviceDataDb` + `pageMeta` in `lib/serviceFaqs.ts`);
  - generated service × city pages at `/:prefix-:city-ga` (`lib/localPages.ts`, cities in `lib/cities.ts`).
  - Unknown slugs render a real 404 (no soft-404s).
- Blog: `lib/blogData.tsx` (posts with key takeaways + FAQs), pages `BlogIndexPage` / `BlogPostPage`.
- `vercel.json`: `cleanUrls`, no trailing slash, 301s from generated slugs to hand-written pages that cover the same service + city.
