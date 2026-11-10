import type { ServiceData } from '../components/ServiceDynamicContent';
import { cities, City, cityById } from './cities';
import type { ServiceKind } from './serviceFaqs';

// Programmatic "service + city" landing pages, e.g. /retaining-walls-marietta-ga.
// The Service Areas hub links to every combination below. Where a hand-written
// page already covers the same service + city, we link there instead (see
// `existingPages`) and 301 the generated slug to it in vercel.json, so two
// URLs never compete for the same search.

interface LocalPrefix {
  prefix: string;
  label: string;
  kind: ServiceKind;
  hub: string;
  heroImage: string;
  parallaxImage: string;
  subtitle: (c: City) => string;
  heading: (c: City) => string;
  paragraphs: (c: City, link: (prefix: string) => string) => string[];
  quote: (c: City) => string;
  process: (c: City) => { title: string; description: string }[];
}

export const localPrefixes: LocalPrefix[] = [
  {
    prefix: 'driveway-pavers', label: 'Driveway Pavers', kind: 'driveway', hub: '/service/driveway-pavers',
    heroImage: '/images/service-hero-driveway.webp', parallaxImage: '/images/service-hero-driveway.webp',
    subtitle: (c) => `Driveway pavers in ${c.name}, Georgia`,
    heading: (c) => `Paver driveway planning for ${c.name} homes`,
    paragraphs: (c, link) => [
      `AGS Stones and Pavers serves homeowners in ${c.name} and ${c.county} from its base in Duluth. A paver driveway can refresh the home’s entrance, but the right scope depends on the existing surface, driveway use, access, slope and water flow on the property.`,
      `When comparing options, consider paver style, pattern, borders and how the installation will address excavation, base preparation and edge restraint. See our [driveway paver service](/service/driveway-pavers), explore [patios in ${c.name}](${link('stone-patios')}) or ask about [retaining walls in ${c.name}](${link('retaining-walls')}) if grade changes are part of the project.`,
    ],
    quote: () => 'Plan the entrance, surface and foundation as one project.',
    process: () => [
      { title: 'Discuss the property', description: 'Share the driveway’s approximate size, current surface, access and intended vehicle use.' },
      { title: 'Review site conditions', description: 'Consider slope, runoff, subgrade and any removal needed before selecting a base approach.' },
      { title: 'Compare materials', description: 'Review paver colors, shapes, patterns, borders and the scope included in the estimate.' },
      { title: 'Confirm the scope', description: 'Discuss schedule, site preparation and next steps before deciding how to proceed.' },
    ],
  },
  {
    prefix: 'stone-patios', label: 'Stone Patios', kind: 'patio', hub: '/service/outdoor-patio-builders',
    heroImage: '/images/service-hero-patio.webp', parallaxImage: '/images/service-hero-patio.webp',
    subtitle: (c) => `Stone and paver patios in ${c.name}, Georgia`,
    heading: (c) => `Plan an outdoor patio for your ${c.name} home`,
    paragraphs: (c, link) => [
      `AGS Stones and Pavers works with homeowners in ${c.name} and across ${c.county} on outdoor patio projects. Start with how you want to use the space: dining, a seating area, a connection to the yard or a place to gather around an outdoor feature.`,
      `Layout, material, access and existing grades help determine the scope. Discuss pavers, natural stone, steps and drainage together. Learn about our [patio building service](/service/outdoor-patio-builders), coordinate an [outdoor kitchen in ${c.name}](${link('outdoor-kitchens')}) or review [retaining wall options in ${c.name}](${link('retaining-walls')}).`,
    ],
    quote: () => 'A useful patio starts with the way you want to spend time outside.',
    process: () => [
      { title: 'Define how you will use it', description: 'Talk through seating, dining, circulation and the connection to your home and yard.' },
      { title: 'Review the site', description: 'Discuss dimensions, access, slope, runoff and any existing surfaces that affect the work.' },
      { title: 'Choose the finish', description: 'Compare paver and stone samples, layout patterns, borders and transitions.' },
      { title: 'Agree on the scope', description: 'Review preparation, materials, project details and the proposed schedule.' },
    ],
  },
  {
    prefix: 'retaining-walls', label: 'Retaining Walls', kind: 'wall', hub: '/service/retaining-wall-installation',
    heroImage: '/images/service-hero-retaining-wall.webp', parallaxImage: '/images/service-hero-retaining-wall.webp',
    subtitle: (c) => `Retaining walls in ${c.name}, Georgia`,
    heading: (c) => `Retaining wall options for ${c.name} properties`,
    paragraphs: (c, link) => [
      `A retaining wall may help manage a grade change or make part of a yard more usable. For a property in ${c.name}, the wall’s dimensions, soil, water flow, nearby structures, access and property lines all matter when defining the work.`,
      `Permit and engineering requirements depend on the project and the local jurisdiction in ${c.county}; confirm current requirements before construction. AGS Stones and Pavers can discuss the visible site conditions and project scope. Read about [retaining wall installation](/service/retaining-wall-installation), plan a [patio in ${c.name}](${link('stone-patios')}) or connect the area to [driveway pavers in ${c.name}](${link('driveway-pavers')}).`,
    ],
    quote: () => 'Start with the slope, water flow and the space you want to create.',
    process: () => [
      { title: 'Describe the concern', description: 'Share what you want to address, such as a grade change, runoff or usable yard space.' },
      { title: 'Review the location', description: 'Wall dimensions, soil, drainage, access and nearby structures inform the scope.' },
      { title: 'Confirm requirements', description: 'Check applicable property-line, permit and engineering requirements with the jurisdiction.' },
      { title: 'Review the proposal', description: 'Discuss wall materials, site preparation, drainage details and the proposed sequence.' },
    ],
  },
  {
    prefix: 'outdoor-kitchens', label: 'Outdoor Kitchens', kind: 'kitchen', hub: '/service/outdoor-patio-builders',
    heroImage: '/images/service-hero-outdoor-kitchen.webp', parallaxImage: '/images/service-hero-outdoor-kitchen.webp',
    subtitle: (c) => `Outdoor kitchens in ${c.name}, Georgia`,
    heading: (c) => `Plan an outdoor kitchen for your ${c.name} home`,
    paragraphs: (c, link) => [
      `An outdoor kitchen involves more than the island finish. In ${c.name}, plan the cooking and seating layout alongside the patio, circulation, utilities, site access and how the space connects to the house.`,
      `Appliance, counter and masonry choices shape the scope. Utility connections and approvals may also apply, so confirm requirements with the relevant providers and local jurisdiction. Explore [outdoor kitchen and masonry services](/service/masonry-fireplaces), coordinate a [patio in ${c.name}](${link('stone-patios')}) or review the broader [patio builder service](/service/outdoor-patio-builders).`,
    ],
    quote: () => 'Plan cooking, seating, utilities and the patio together.',
    process: () => [
      { title: 'List the features', description: 'Note desired appliances, counter space, storage, seating and fire features.' },
      { title: 'Review the location', description: 'Consider access, clearances, utility routes, drainage and connection to the patio.' },
      { title: 'Select materials', description: 'Compare masonry, counter and paving options suited to exterior use.' },
      { title: 'Confirm requirements', description: 'Clarify the scope, utility coordination, approvals and proposed schedule.' },
    ],
  },
];
/** Hand-written pages that already cover a prefix + city combination. */
export const existingPages: Record<string, string> = {
  'driveway-pavers-alpharetta': '/driveways-pavers-alpharetta-ga',
  'driveway-pavers-atlanta': '/driveway-pavers-atlanta',
  'driveway-pavers-roswell': '/paving-stone-contractor-roswell',
  'stone-patios-alpharetta': '/stone-patio-contractors-alpharetta-ga',
  'stone-patios-atlanta': '/outdoor-patios-atlanta',
  'stone-patios-duluth': '/paver-patio-duluth-ga',
  'stone-patios-johns-creek': '/paver-patio-johns-creek-ga',
  'retaining-walls-atlanta': '/retaining-walls-atlanta',
  'outdoor-kitchens-johns-creek': '/outdoor-kitchen-johns-creek-ga',
};

/** URL for a prefix + city combination (hand-written page when one exists). */
export const localPageUrl = (prefix: string, cityId: string) =>
  existingPages[`${prefix}-${cityId}`] || `/${prefix}-${cityId}-ga`;

export interface LocalPage {
  slug: string;
  prefix: LocalPrefix;
  city: City;
  data: ServiceData;
}

const buildLocalPage = (prefix: LocalPrefix, city: City): LocalPage => {
  const slug = `${prefix.prefix}-${city.id}-ga`;
  const link = (p: string) => localPageUrl(p, city.id);
  return {
    slug,
    prefix,
    city,
    data: {
      id: slug,
      name: `${prefix.label} ${city.name} GA`,
      heroImage: prefix.heroImage,
      heroSubtitle: prefix.subtitle(city),
      overviewHeading: prefix.heading(city),
      overviewParagraphs: prefix.paragraphs(city, link),
      parallaxImage: prefix.parallaxImage,
      parallaxQuote: prefix.quote(city),
      process: prefix.process(city),
    },
  };
};

/** Every generated local page (hand-written combinations excluded). */
export const localPages: LocalPage[] = localPrefixes.flatMap((prefix) =>
  cities
    .filter((city) => !existingPages[`${prefix.prefix}-${city.id}`])
    .map((city) => buildLocalPage(prefix, city))
);

export const findLocalPage = (slug: string) => localPages.find((p) => p.slug === slug);

/** Old generated slugs that now 301 to the hand-written page (for vercel.json). */
export const localRedirects = Object.entries(existingPages).map(([key, destination]) => ({
  source: `/${key}-ga`,
  destination,
}));

export { cityById };
