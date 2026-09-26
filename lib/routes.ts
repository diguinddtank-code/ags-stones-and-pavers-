import { serviceDataDb, CORE_SERVICE_IDS } from './serviceData';
import { localPages } from './localPages';
import { blogPosts } from './blogData';

// Every indexable URL on the site. The build prerenders each one to static
// HTML and writes sitemap.xml from this same list, so the two never drift.

export interface SiteRoute {
  path: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
  lastmod?: string;
}

const LAST_UPDATED = '2026-09-26';

export const getSiteRoutes = (): SiteRoute[] => {
  const staticRoutes: SiteRoute[] = [
    { path: '/', changefreq: 'weekly', priority: 1.0 },
    { path: '/services', changefreq: 'weekly', priority: 0.9 },
    { path: '/service-areas', changefreq: 'weekly', priority: 0.9 },
    { path: '/quote', changefreq: 'monthly', priority: 0.9 },
    { path: '/about-us', changefreq: 'monthly', priority: 0.8 },
    { path: '/blog', changefreq: 'weekly', priority: 0.8 },
    { path: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
    { path: '/terms-of-service', changefreq: 'yearly', priority: 0.3 },
  ];

  const coreRoutes: SiteRoute[] = CORE_SERVICE_IDS.map((id) => ({
    path: `/service/${id}`,
    changefreq: 'weekly',
    priority: 0.9,
  }));

  const handWrittenLocal: SiteRoute[] = Object.keys(serviceDataDb)
    .filter((id) => !CORE_SERVICE_IDS.includes(id))
    .map((id) => ({ path: `/${id}`, changefreq: 'weekly', priority: 0.85 }));

  const generatedLocal: SiteRoute[] = localPages.map((p) => ({
    path: `/${p.slug}`,
    changefreq: 'monthly',
    priority: 0.8,
  }));

  const blogRoutes: SiteRoute[] = blogPosts.map((p) => ({
    path: `/blog/${p.slug}`,
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: p.dateModified,
  }));

  return [...staticRoutes, ...coreRoutes, ...handWrittenLocal, ...generatedLocal, ...blogRoutes].map((r) => ({
    lastmod: LAST_UPDATED,
    ...r,
  }));
};
