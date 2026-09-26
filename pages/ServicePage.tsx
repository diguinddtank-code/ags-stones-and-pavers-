import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ServiceDynamicContent, ServiceData } from '../components/ServiceDynamicContent';
import { ServiceSeoExtras, LinkItem } from '../components/ServiceSeoExtras';
import { SEO } from '../components/SEO';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { NotFoundPage } from './NotFoundPage';
import { serviceDataDb, CORE_SERVICE_IDS } from '../lib/serviceData';
import { findLocalPage, localPrefixes, localPageUrl } from '../lib/localPages';
import { cities, cityById, City } from '../lib/cities';
import { buildFaqs, kindHub, pageMeta, ServiceKind } from '../lib/serviceFaqs';
import { blogPosts } from '../lib/blogData';
import { BUSINESS_ID, Crumb, absoluteUrl, faqSchema, toMetaDescription } from '../lib/business';

const coreTitles: Record<string, string> = {
  'driveway-pavers': 'Driveway Paver Installation in Atlanta, GA',
  'outdoor-patio-builders': 'Outdoor Patio Builders in Atlanta, GA',
  'retaining-wall-installation': 'Retaining Wall Installation in Atlanta, GA',
  'masonry-fireplaces': 'Outdoor Fireplaces & Stone Masonry in Atlanta, GA',
  'deck-builders': 'Deck Builders in Atlanta, GA',
  'pool-deck-pavers': 'Pool Deck Pavers & Travertine in Atlanta, GA',
  'stone-veneer': 'Stone Veneer Installation in Atlanta, GA',
  'landscape-design': '3D Landscape & Hardscape Design in Atlanta, GA',
};

// Which blog guides to surface for each kind of service.
const guidesByKind: Record<ServiceKind, string[]> = {
  driveway: ['pavers-vs-concrete-driveway-georgia', 'paver-patio-and-driveway-cost-atlanta', 'how-to-clean-and-seal-pavers'],
  patio: ['paver-patio-and-driveway-cost-atlanta', 'how-to-clean-and-seal-pavers', 'outdoor-kitchen-planning-guide'],
  wall: ['why-retaining-walls-fail-georgia', 'paver-patio-and-driveway-cost-atlanta'],
  kitchen: ['outdoor-kitchen-planning-guide', 'paver-patio-and-driveway-cost-atlanta'],
  pool: ['travertine-vs-pavers-pool-deck', 'how-to-clean-and-seal-pavers'],
  fire: ['outdoor-kitchen-planning-guide', 'paver-patio-and-driveway-cost-atlanta'],
  deck: ['paver-patio-and-driveway-cost-atlanta', 'outdoor-kitchen-planning-guide'],
  veneer: ['outdoor-kitchen-planning-guide', 'paver-patio-and-driveway-cost-atlanta'],
  design: ['paver-patio-and-driveway-cost-atlanta', 'outdoor-kitchen-planning-guide'],
  hardscape: ['why-retaining-walls-fail-georgia', 'paver-patio-and-driveway-cost-atlanta', 'pavers-vs-concrete-driveway-georgia'],
};

const kindToPrefix: Partial<Record<ServiceKind, string>> = {
  driveway: 'driveway-pavers',
  patio: 'stone-patios',
  wall: 'retaining-walls',
  kitchen: 'outdoor-kitchens',
};

interface ResolvedPage {
  data: ServiceData;
  path: string;
  kind: ServiceKind;
  city?: City;
  isCore: boolean;
}

const resolvePage = (id: string | undefined, underServicePath: boolean): ResolvedPage | null => {
  if (!id) return null;
  const isCore = CORE_SERVICE_IDS.includes(id);

  if (underServicePath) {
    return isCore ? { data: serviceDataDb[id], path: `/service/${id}`, kind: pageMeta[id].kind, isCore: true } : null;
  }
  if (isCore) return null; // core hubs only exist under /service/

  if (serviceDataDb[id] && pageMeta[id]) {
    const meta = pageMeta[id];
    return { data: serviceDataDb[id], path: `/${id}`, kind: meta.kind, city: meta.city ? cityById(meta.city) : undefined, isCore: false };
  }

  const local = findLocalPage(id);
  if (local) return { data: local.data, path: `/${local.slug}`, kind: local.prefix.kind, city: local.city, isCore: false };

  return null;
};

interface ServicePageProps {
  idOverride?: string;
  /** 'service' when mounted on /service/:id, 'root' for /:id pages. */
  scope?: 'service' | 'root';
}

export const ServicePage: React.FC<ServicePageProps> = ({ idOverride, scope = 'root' }) => {
  const params = useParams<{ id: string }>();
  const activeId = idOverride || params.id;
  const page = resolvePage(activeId, !idOverride && scope === 'service');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeId]);

  if (!page) return <NotFoundPage />;

  const { data, path, kind, city, isCore } = page;
  const displayName = data.name.replace(/\s+GA$/, '');
  const title = isCore
    ? `${coreTitles[data.id] ?? displayName} | AGS Stones`
    : `${displayName}${city ? ', GA' : ''} | Free Estimates | AGS Stones and Pavers`;
  const description = toMetaDescription(data.overviewParagraphs[0]);
  const url = absoluteUrl(path);

  const faqs = buildFaqs(kind, city?.name, city?.county);
  const hub = kindHub[kind];

  const breadcrumbs: Crumb[] = [{ name: 'Services', path: '/services' }];
  if (!isCore && hub.path !== '/services') breadcrumbs.push(hub);
  breadcrumbs.push({ name: displayName, path });

  const serviceNode = {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: city ? `${displayName}, GA` : displayName,
    serviceType: hub.name,
    description,
    url,
    image: absoluteUrl(data.heroImage),
    provider: { '@id': BUSINESS_ID },
    areaServed: city
      ? { '@type': 'City', name: `${city.name}, GA`, containedInPlace: { '@type': 'State', name: 'Georgia' } }
      : cities.map((c) => ({ '@type': 'City', name: `${c.name}, GA` })),
  };

  // Internal links: core hubs link to every city page for the same service;
  // local pages link to the other services in the same city.
  const prefix = kindToPrefix[kind];
  let areaLinks: LinkItem[] = [];
  let areaHeading = 'Service Areas';
  if (isCore && prefix) {
    const label = localPrefixes.find((p) => p.prefix === prefix)!.label;
    areaLinks = cities.map((c) => ({ name: `${label} in ${c.name}`, path: localPageUrl(prefix, c.id) }));
    areaHeading = `${label} Near You`;
  } else if (city) {
    areaLinks = localPrefixes
      .map((p) => ({ name: `${p.label} in ${city.name}`, path: localPageUrl(p.prefix, city.id) }))
      .filter((l) => l.path !== path);
    if (hub.path !== '/services') areaLinks.push({ name: `${hub.name} (all areas)`, path: hub.path });
    areaLinks.push({ name: 'All Service Areas', path: '/service-areas' });
    areaHeading = `More Services in ${city.name}`;
  } else {
    areaLinks = [{ name: 'All Service Areas', path: '/service-areas' }, { name: 'All Services', path: '/services' }];
  }

  const guides: LinkItem[] = guidesByKind[kind]
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter(Boolean)
    .map((p) => ({ name: p!.title, path: `/blog/${p!.slug}` }));

  return (
    <div className="bg-white min-h-screen relative flex flex-col">
      <SEO
        title={title}
        description={description}
        image={data.heroImage}
        canonicalPath={path}
        keywords={[displayName.toLowerCase(), `${hub.name.toLowerCase()} ${city ? city.name.toLowerCase() : 'atlanta'}`, 'hardscape contractor', 'AGS Stones']}
        breadcrumbs={breadcrumbs}
        schema={[serviceNode, faqSchema(faqs, url)]}
      />
      <Header />
      <main className="flex-grow">
        <ServiceDynamicContent
          data={data}
          extraSections={
            <ServiceSeoExtras
              faqs={faqs}
              faqHeading={city ? `${hub.name} Questions in ${city.name}` : `${displayName} Questions`}
              areaHeading={areaHeading}
              areaLinks={areaLinks}
              guides={guides}
            />
          }
        />
      </main>
      <Footer />
    </div>
  );
};
