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
    prefix: 'driveway-pavers',
    label: 'Driveway Pavers',
    kind: 'driveway',
    hub: '/service/driveway-pavers',
    heroImage: 'https://i.imgur.com/by6FzIkl.webp',
    parallaxImage: 'https://www.belgard.com/wp-content/uploads/2024/05/PearmeableCategoryPage_AltBox_Image1.webp',
    subtitle: (c) => `${c.name.toUpperCase()} DRIVEWAY PAVER INSTALLERS`,
    heading: (c) => `Paver Driveways in ${c.name}, GA — Engineered for Georgia Clay, Built to Stay Level`,
    paragraphs: (c, link) => [
      `Homes in ${c.name} — from ${c.neighborhoods[0]} to ${c.neighborhoods[2]} — sit on ${c.terrain}. That is exactly why poured concrete driveways across ${c.county} crack, heave and stain within a few seasons. AGS Stones replaces them with interlocking paver driveways that flex with the soil instead of breaking, and look right at home next to ${c.homes}.`,
      `Every ${c.name} driveway starts below the surface: we excavate the failing slab, compact a thick graded aggregate base, set edge restraints and lock the joints with polymeric sand. Learn more about our [driveway paver installation](/service/driveway-pavers) process, pair the new entry with [stone patios in ${c.name}](${link('stone-patios')}) out back, or stabilize a sloped approach with [retaining walls in ${c.name}](${link('retaining-walls')}).`,
    ],
    quote: (c) => `A driveway that stays level and crack-free for ${c.name}'s toughest seasons.`,
    process: (c) => [
      { title: 'Site & Soil Review', description: `We check slope, runoff and soil conditions on your ${c.name} lot and measure for an exact quote.` },
      { title: 'Demolition & Excavation', description: 'Old concrete or asphalt is removed and the subgrade is excavated to the right depth.' },
      { title: 'Compacted Base', description: 'Graded aggregate is placed and compacted in lifts for a rock-solid, load-bearing base.' },
      { title: 'Pavers & Polymeric Sand', description: 'Pavers are laid, cut, restrained and locked with polymeric sand to block weeds and ants.' },
    ],
  },
  {
    prefix: 'stone-patios',
    label: 'Stone Patios',
    kind: 'patio',
    hub: '/service/outdoor-patio-builders',
    heroImage: 'https://i.imgur.com/SIBIdiFl.webp',
    parallaxImage: 'https://i.imgur.com/h3NCvta.jpeg',
    subtitle: (c) => `${c.name.toUpperCase()} PATIO BUILDERS`,
    heading: (c) => `Custom Stone & Paver Patios in ${c.name}, GA — Outdoor Living Built on a Real Foundation`,
    paragraphs: (c, link) => [
      `A great ${c.name} backyard deserves more than a bare concrete slab. We design and build paver, travertine and natural flagstone patios for ${c.homes}, turning unused lawn into a dining, lounging and entertaining space your family actually uses. We regularly work in ${c.neighborhoods.slice(0, 3).join(', ')} and across ${c.county}.`,
      `Because many ${c.name} yards have ${c.terrain}, every patio we build is graded to shed water away from your home and set on a compacted aggregate base so it stays flat for decades. Explore our [patio builder services](/service/outdoor-patio-builders), add a cooking zone with [outdoor kitchens in ${c.name}](${link('outdoor-kitchens')}), or level the yard first with [retaining walls in ${c.name}](${link('retaining-walls')}).`,
    ],
    quote: (c) => `The backyard ${c.name} families gather in — every weekend, every season.`,
    process: (c) => [
      { title: '3D Patio Design', description: `We render your ${c.name} patio in 3D so you can approve layout, stone and colors first.` },
      { title: 'Grading & Drainage', description: 'The site is graded so rainwater moves away from the house and the patio never pools.' },
      { title: 'Base & Stone Setting', description: 'A compacted aggregate base is installed, then pavers or natural stone are set and cut to fit.' },
      { title: 'Joints & Final Walkthrough', description: 'Joints are locked, the surface is cleaned, and we walk the finished patio with you.' },
    ],
  },
  {
    prefix: 'retaining-walls',
    label: 'Retaining Walls',
    kind: 'wall',
    hub: '/service/retaining-wall-installation',
    heroImage: 'https://i.imgur.com/dZstK86l.webp',
    parallaxImage: 'https://i.imgur.com/uDiqFSl.jpeg',
    subtitle: (c) => `${c.name.toUpperCase()} RETAINING WALL CONTRACTORS`,
    heading: (c) => `Engineered Retaining Walls in ${c.name}, GA — Stop Erosion and Reclaim Your Yard`,
    paragraphs: (c, link) => [
      `${c.name} properties often come with ${c.terrain}. Left alone, heavy Georgia storms wash soil away, undermine driveways and turn slopes into unusable ground. AGS Stones builds segmental block and natural stone retaining walls across ${c.county} that hold the hillside in place and create flat, usable terraces.`,
      `Walls fail because of water, so drainage is built into every wall we install: a clean gravel drainage zone, a perforated drain pipe at the base and geogrid reinforcement where the height requires it. Read about our [retaining wall installation](/service/retaining-wall-installation) standards, then put the new level ground to work with [stone patios in ${c.name}](${link('stone-patios')}) or a new [paver driveway in ${c.name}](${link('driveway-pavers')}).`,
    ],
    quote: (c) => `Taming ${c.name} slopes with drainage-first engineering and clean stone craftsmanship.`,
    process: (c) => [
      { title: 'Slope Evaluation', description: `We measure wall height, soil load and water flow across your ${c.name} property.` },
      { title: 'Footing & Drainage', description: 'A compacted leveling pad, drain pipe and gravel drainage zone go in before the first block.' },
      { title: 'Block & Geogrid', description: 'Blocks are set course by course with geogrid reinforcement where the design calls for it.' },
      { title: 'Backfill & Cap', description: 'Backfill is compacted in lifts, caps are installed and the site is cleaned up.' },
    ],
  },
  {
    prefix: 'outdoor-kitchens',
    label: 'Outdoor Kitchens',
    kind: 'kitchen',
    hub: '/service/outdoor-patio-builders',
    heroImage: 'https://i.imgur.com/h3NCvta.jpeg',
    parallaxImage: 'https://i.imgur.com/SIBIdiFl.webp',
    subtitle: (c) => `${c.name.toUpperCase()} OUTDOOR KITCHEN BUILDERS`,
    heading: (c) => `Custom Outdoor Kitchens in ${c.name}, GA — Stone Islands, Grills and Fire Features`,
    paragraphs: (c, link) => [
      `Outdoor entertaining is a way of life in ${c.name}. We design and build custom outdoor kitchens — stone-clad grill islands, bar seating, pizza ovens and fire features — for ${c.homes}. Each kitchen is planned around how you cook and host, with the utilities, footings and patio designed together from day one.`,
      `We use UV-stable countertops and dense stone that stand up to Georgia sun and freeze-thaw cycles, and every island sits on a reinforced footing so it never shifts. Start with the right foundation through our [stone patios in ${c.name}](${link('stone-patios')}), see our [masonry and fireplace work](/service/masonry-fireplaces), or explore our full [patio builder services](/service/outdoor-patio-builders).`,
    ],
    quote: (c) => `A resort-level kitchen steps from your back door in ${c.name}.`,
    process: (c) => [
      { title: 'Layout & 3D Design', description: `We plan appliances, seating and sight lines for your ${c.name} backyard in 3D.` },
      { title: 'Footings & Utilities', description: 'Reinforced footings are poured and gas, water and electrical runs are planned.' },
      { title: 'Island Build & Stone', description: 'The island frame is built and clad in stone veneer, then topped with a UV-stable counter.' },
      { title: 'Appliances & Handover', description: 'Appliances are installed and tested, and we walk you through the finished kitchen.' },
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
