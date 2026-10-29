// Single source of truth for NAP (Name, Address, Phone) and business facts.
// Every schema block, meta tag, footer and legal page reads from here so the
// details Google sees are identical across the whole site.

export const SITE_URL = 'https://www.agsstonesandpavers.com';

export const BUSINESS = {
  name: 'AGS Stones and Pavers',
  legalName: 'AGS Stones and Pavers LLC',
  alternateNames: ['AGS Stones', 'AGS Stones & Pavers', 'AGS Pavers'],
  description:
    'Hardscape contractor based in Duluth, GA, installing driveway pavers, paver patios, retaining walls, pool decks, outdoor kitchens and stone masonry across North Metro Atlanta.',
  phone: '+16784287630',
  phoneDisplay: '(678) 428-7630',
  phoneHref: 'tel:6784287630',
  email: 'agstones.pavers@gmail.com',
  address: {
    street: '4579 Abbotts Bridge Rd Suite 10',
    city: 'Duluth',
    region: 'GA',
    postalCode: '30097',
    country: 'US',
  },
  geo: { latitude: 34.0322319, longitude: -84.1795749 },
  mapUrl:
    'https://maps.google.com/?q=AGS+Stones+and+Pavers,+4579+Abbotts+Bridge+Rd+Suite+10,+Duluth,+GA+30097',
  hours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
    display: 'Mon–Fri: 8:00 AM – 6:00 PM',
  },
  logo: 'https://i.imgur.com/DkMxLum.png',
  defaultImage: 'https://i.imgur.com/G2N5Chsl.webp',
  priceRange: '$$',
  sameAs: [
    'https://www.google.com/search?kgmid=/g/11yw0y2byp', // Google Business Profile
    'https://www.instagram.com/agsstonesandpavers',
    'https://www.facebook.com/profile.php?id=61594750743609',
  ],
  areaServed: [
    { name: 'Atlanta', wiki: 'https://en.wikipedia.org/wiki/Atlanta' },
    { name: 'Duluth', wiki: 'https://en.wikipedia.org/wiki/Duluth,_Georgia' },
    { name: 'Alpharetta', wiki: 'https://en.wikipedia.org/wiki/Alpharetta,_Georgia' },
    { name: 'Johns Creek', wiki: 'https://en.wikipedia.org/wiki/Johns_Creek,_Georgia' },
    { name: 'Roswell', wiki: 'https://en.wikipedia.org/wiki/Roswell,_Georgia' },
    { name: 'Suwanee', wiki: 'https://en.wikipedia.org/wiki/Suwanee,_Georgia' },
    { name: 'Sandy Springs', wiki: 'https://en.wikipedia.org/wiki/Sandy_Springs,_Georgia' },
    { name: 'Marietta', wiki: 'https://en.wikipedia.org/wiki/Marietta,_Georgia' },
    { name: 'Smyrna', wiki: 'https://en.wikipedia.org/wiki/Smyrna,_Georgia' },
    { name: 'Buckhead', wiki: 'https://en.wikipedia.org/wiki/Buckhead' },
    { name: 'Milton', wiki: 'https://en.wikipedia.org/wiki/Milton,_Georgia' },
    { name: 'Cumming', wiki: 'https://en.wikipedia.org/wiki/Cumming,_Georgia' },
  ],
};

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const absoluteUrl = (path = '/') => {
  if (path.startsWith('http')) return path;
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, '');
  if (!clean) return `${SITE_URL}/`;
  return `${SITE_URL}${clean.startsWith('/') ? clean : `/${clean}`}`;
};

/** Full LocalBusiness entity. Emitted once per page inside the @graph. */
export const businessSchema = () => ({
  '@type': ['HomeAndConstructionBusiness', 'GeneralContractor', 'LocalBusiness'],
  '@id': BUSINESS_ID,
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  alternateName: BUSINESS.alternateNames,
  description: BUSINESS.description,
  url: SITE_URL,
  logo: BUSINESS.logo,
  image: BUSINESS.defaultImage,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  priceRange: BUSINESS.priceRange,
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, Credit Card, Check, Financing',
  hasMap: BUSINESS.mapUrl,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS.geo.latitude,
    longitude: BUSINESS.geo.longitude,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: BUSINESS.hours.days,
      opens: BUSINESS.hours.opens,
      closes: BUSINESS.hours.closes,
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '128',
    bestRating: '5',
    worstRating: '1',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: BUSINESS.phone,
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: ['en', 'es', 'pt'],
    },
  ],
  knowsAbout: [
    'Driveway Paver Installation',
    'Interlocking Concrete Pavers',
    'Outdoor Patio Construction',
    'Retaining Wall Installation',
    'Engineered Segmental Retaining Walls',
    'Pool Deck Pavers',
    'Travertine Pool Decks',
    'Outdoor Kitchens and Fireplaces',
    'Stone Masonry and Stone Veneer',
    'Permeable Pavers',
    'Stormwater Drainage and French Drains',
    '3D Landscape & Hardscape Design',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Hardscaping & Stone Masonry Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Driveway Paver Installation',
          url: `${SITE_URL}/service/driveway-pavers`,
          description: 'Custom interlocking paver driveways designed for vehicle loads and Georgia red clay soils.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Outdoor Patio Construction',
          url: `${SITE_URL}/service/outdoor-patio-builders`,
          description: 'Paver, flagstone, and travertine backyard patios with built-in seating and lighting.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Retaining Wall Installation',
          url: `${SITE_URL}/service/retaining-wall-installation`,
          description: 'Engineered structural retaining walls with perforated drainage pipes and geogrid reinforcement.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Pool Deck Pavers',
          url: `${SITE_URL}/service/pool-deck-pavers`,
          description: 'Slip-resistant, cool-underfoot travertine and concrete paver pool surrounds and coping.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Masonry & Outdoor Fireplaces',
          url: `${SITE_URL}/service/masonry-fireplaces`,
          description: 'Custom stone masonry, outdoor kitchens, fire pits, and stone veneer.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '3D Landscape & Hardscape Design',
          url: `${SITE_URL}/service/landscape-design`,
          description: 'Photorealistic 3D architectural renderings and project layouts for HOA approval.',
        },
      },
    ],
  },
  areaServed: [
    ...BUSINESS.areaServed.map((c) => ({
      '@type': 'City',
      name: `${c.name}, GA`,
      sameAs: c.wiki,
    })),
    {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: BUSINESS.geo.latitude,
        longitude: BUSINESS.geo.longitude,
      },
      geoRadius: '50000', // 50 km (~31 miles radius covering all North Metro Atlanta)
    },
  ],
  sameAs: BUSINESS.sameAs,
});

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: BUSINESS.name,
  alternateName: BUSINESS.alternateNames,
  inLanguage: 'en-US',
  publisher: { '@id': BUSINESS_ID },
});

export interface Crumb {
  name: string;
  path: string;
}

export const breadcrumbSchema = (crumbs: Crumb[], pageUrl: string) => ({
  '@type': 'BreadcrumbList',
  '@id': `${pageUrl}#breadcrumb`,
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

export const faqSchema = (faqs: { q: string; a: string }[], pageUrl: string) => ({
  '@type': 'FAQPage',
  '@id': `${pageUrl}#faq`,
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

/** Strips [text](url) markdown and trims to a SERP-friendly meta description. */
export const toMetaDescription = (text: string, max = 158) => {
  const plain = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\s+/g, ' ').trim();
  if (plain.length <= max) return plain;
  const cut = plain.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};
