// Visible FAQ content (and matching FAQPage schema) for every service page.
// Questions deliberately use the phrasing people search for: "cost",
// "how long", "permit", "near me", city names.

export type ServiceKind =
  | 'driveway'
  | 'patio'
  | 'wall'
  | 'kitchen'
  | 'pool'
  | 'fire'
  | 'deck'
  | 'veneer'
  | 'design'
  | 'hardscape';

export interface Faq {
  q: string;
  a: string;
}

const builders: Record<ServiceKind, (city: string, county: string) => Faq[]> = {
  driveway: (city, county) => [
    {
      q: `How much does a paver driveway cost in ${city}?`,
      a: `Price depends on square footage, the paver line you choose, how much old concrete or asphalt has to be removed, and how deep the base needs to be on your lot. We give every ${city} homeowner a free on-site estimate with a line-item quote, so you know exactly what you are paying for before any work starts.`,
    },
    {
      q: `Are pavers better than concrete for a driveway in ${county}?`,
      a: `On Georgia clay, poured concrete tends to crack as the soil expands and contracts. Interlocking pavers sit on a compacted aggregate base and flex with the ground instead of cracking, and a single damaged paver can be lifted and replaced without patching the whole slab.`,
    },
    {
      q: 'How long does a paver driveway installation take?',
      a: 'Most residential driveways are completed in 3 to 5 working days: demolition and excavation, base compaction, paver laying, edge restraints and polymeric sand. Larger motor courts or projects with drainage work can take longer, and we give you a written timeline before we start.',
    },
    {
      q: `Do you handle HOA approval for driveways in ${city}?`,
      a: `Yes. We prepare the layout drawings, material samples and color specs most ${city} HOAs ask for, and we can meet with your architectural review committee if needed.`,
    },
  ],
  patio: (city, county) => [
    {
      q: `How much does a paver patio cost in ${city}?`,
      a: `The main cost drivers are size, material (concrete pavers, travertine or natural flagstone), site access and grading. Adding seat walls, steps or a fire feature changes the scope. We provide a free on-site design consultation and a detailed written quote for every ${city} project.`,
    },
    {
      q: 'How long does it take to build a patio?',
      a: 'A standard backyard paver patio usually takes 2 to 5 working days. Patios that include retaining walls, outdoor kitchens or fire features typically take 1 to 3 weeks depending on scope.',
    },
    {
      q: `Will my new patio hold up to rain and clay soil in ${county}?`,
      a: `That is exactly what the base is for. We excavate below the topsoil, compact a graded aggregate base, and pitch the surface so water drains away from your home instead of pooling on the patio.`,
    },
    {
      q: 'Can I see the design before construction starts?',
      a: 'Yes. We offer 3D renderings so you can see the layout, stone colors and how the patio connects to your home before we break ground.',
    },
  ],
  wall: (city, county) => [
    {
      q: `Do I need a permit for a retaining wall in ${city}?`,
      a: `Requirements vary by jurisdiction in ${county}, and taller walls or walls supporting a load (like a driveway or structure) usually need a permit and sometimes an engineered design. We check the local requirements for your address and handle the permit process for you.`,
    },
    {
      q: 'Why do retaining walls fail?',
      a: 'Almost always because of water. Without a gravel drainage zone, a perforated drain pipe and proper geogrid reinforcement, hydrostatic pressure builds behind the wall until it leans or collapses. Every wall we build includes drainage designed for Georgia rainfall.',
    },
    {
      q: `How much does a retaining wall cost in ${city}?`,
      a: 'Cost depends on wall height and length, block type, access for equipment, and how much excavation and drainage the slope needs. We measure the site and give you a written estimate at no cost.',
    },
    {
      q: 'Can a retaining wall give me a flat, usable backyard?',
      a: 'Yes. Terracing a slope with one or more engineered walls is the most common way to create level lawn, patio or play space on a hillside lot.',
    },
  ],
  kitchen: (city) => [
    {
      q: `How much does an outdoor kitchen cost in ${city}?`,
      a: 'It depends on the size of the island, the countertop material, the appliances (grill, side burners, refrigerator, pizza oven) and the utility runs for gas, water and electrical. We design the layout with you and give a detailed quote before any work begins.',
    },
    {
      q: 'What countertop works best for an outdoor kitchen in Georgia?',
      a: 'Dense natural stone such as granite or quartzite handles UV, heat and freeze-thaw cycles well. Many indoor quartz products can discolor in direct sun, so we steer outdoor projects toward UV-stable materials.',
    },
    {
      q: 'Do you build the patio and the outdoor kitchen together?',
      a: 'Yes. We build the patio, the kitchen island, seat walls and fire features as one coordinated project, so the footings, drainage and utilities are planned together.',
    },
    {
      q: 'How long does an outdoor kitchen project take?',
      a: 'Most outdoor kitchens take 1 to 3 weeks depending on the size of the island, utility work and whether a new patio is built at the same time.',
    },
  ],
  pool: (city) => [
    {
      q: 'Are travertine pool decks hot to walk on?',
      a: 'Travertine stays noticeably cooler than concrete in direct sun, which is why it is the most popular pool deck material in Metro Atlanta. Light-colored concrete pavers are another comfortable option.',
    },
    {
      q: `Can you replace a cracked concrete pool deck in ${city}?`,
      a: 'Yes. We remove the old deck, re-grade for drainage, reset or replace the coping and install pavers or travertine on a properly compacted base.',
    },
    {
      q: 'Are paver pool decks slippery when wet?',
      a: 'Tumbled travertine and textured concrete pavers are slip-resistant when wet. We help you choose a finish that is safe for kids and guests around the pool.',
    },
    {
      q: 'How long does a pool deck renovation take?',
      a: 'Most pool deck projects take about 1 to 2 weeks, depending on deck size, coping work and whether demolition of an old concrete deck is needed.',
    },
  ],
  fire: (city) => [
    {
      q: `Do you build outdoor fireplaces and fire pits in ${city}?`,
      a: `Yes. We build wood-burning and gas fireplaces, fire pits and fire tables with natural stone or veneer finishes, usually as part of a new patio or outdoor living space in ${city}.`,
    },
    {
      q: 'Gas or wood-burning — which is better?',
      a: 'Gas is instant and clean with no smoke; wood gives the classic crackle and smell. Local codes, HOA rules and your gas line location also play a role, and we walk you through the options on site.',
    },
    {
      q: 'Does an outdoor fireplace need a foundation?',
      a: 'Yes. A masonry fireplace is heavy, so we pour a reinforced concrete footing sized to the structure to prevent settling or cracking.',
    },
    {
      q: 'How long does it take to build an outdoor fireplace?',
      a: 'A custom masonry fireplace typically takes 1 to 2 weeks from footing to final stone work. Fire pits are often completed in a few days.',
    },
  ],
  deck: (city) => [
    {
      q: `Do you build composite decks in ${city}?`,
      a: 'Yes. We build composite and wood decks and often combine them with a paver patio below or beside the deck for a multi-level outdoor space.',
    },
    {
      q: 'Composite or wood decking?',
      a: 'Composite costs more up front but does not need staining or sealing and resists rot and splintering. Pressure-treated wood is more budget-friendly but needs regular maintenance.',
    },
    {
      q: 'Do I need a permit for a new deck?',
      a: 'Most attached and elevated decks require a building permit. We handle the permit and inspections as part of the project.',
    },
    {
      q: 'Can you connect a new deck to a stone patio?',
      a: 'Yes. Deck-to-patio transitions with stone steps are one of our most requested designs.',
    },
  ],
  veneer: (city) => [
    {
      q: 'What is stone veneer?',
      a: 'Stone veneer is a thin layer of natural or manufactured stone applied over a structural wall. It gives the look of full masonry at a lower weight and cost.',
    },
    {
      q: `Can you add stone veneer to my house exterior in ${city}?`,
      a: `Yes. We install stone veneer on facades, columns, foundations, chimneys and outdoor kitchen islands, with proper moisture barriers and lath behind the stone.`,
    },
    {
      q: 'How long does stone veneer last?',
      a: 'Installed correctly with a weather-resistant barrier and a drainage plane, stone veneer lasts for decades with very little maintenance.',
    },
    {
      q: 'Natural or manufactured stone veneer?',
      a: 'Natural stone has unmatched texture and durability; manufactured veneer is lighter and more uniform. We bring samples of both to your consultation.',
    },
  ],
  design: (city) => [
    {
      q: 'Do you offer 3D landscape and hardscape design?',
      a: 'Yes. We create 3D renderings of your yard so you can review the layout, materials and elevations before construction begins.',
    },
    {
      q: 'Is the design fee credited toward construction?',
      a: 'Design details and any credits are explained in your proposal. Ask about it during your free consultation.',
    },
    {
      q: `How long does the design process take for a ${city} project?`,
      a: 'Most designs are ready within 1 to 2 weeks after the site survey, depending on the size of the project and the number of revisions.',
    },
    {
      q: 'Do you also build what you design?',
      a: 'Yes. Our in-house crews build the patios, walls, driveways and outdoor kitchens we design, so nothing gets lost between the drawing and the job site.',
    },
  ],
  hardscape: (city, county) => [
    {
      q: `What does a hardscape contractor do in ${city}?`,
      a: 'Hardscaping covers the built, non-plant parts of a landscape: paver driveways and patios, retaining walls, steps, walkways, outdoor kitchens, fire features and drainage. We design and build all of them with our own crews.',
    },
    {
      q: `How do you deal with slopes and drainage in ${county}?`,
      a: 'We start with a site evaluation, then combine grading, retaining walls, drain pipes and permeable or properly pitched surfaces so water moves away from your home and your hardscape.',
    },
    {
      q: 'How much does a hardscape project cost?',
      a: 'Scope drives price: materials, square footage, wall heights, site access and drainage needs. We provide a free on-site consultation and a detailed written estimate.',
    },
    {
      q: 'Do you use subcontractors?',
      a: 'No. Our own in-house crews handle excavation, base work and installation, which keeps quality and the schedule under our control.',
    },
  ],
};

export const buildFaqs = (kind: ServiceKind, city = 'Metro Atlanta', county = 'Metro Atlanta') =>
  builders[kind](city, county);

/**
 * Metadata for each hand-written page in lib/serviceData.ts: which FAQ set to
 * use, which city (if any) it targets and its main service hub.
 */
export const pageMeta: Record<string, { kind: ServiceKind; city?: string }> = {
  'driveway-pavers': { kind: 'driveway' },
  'outdoor-patio-builders': { kind: 'patio' },
  'retaining-wall-installation': { kind: 'wall' },
  'masonry-fireplaces': { kind: 'fire' },
  'deck-builders': { kind: 'deck' },
  'pool-deck-pavers': { kind: 'pool' },
  'stone-veneer': { kind: 'veneer' },
  'landscape-design': { kind: 'design' },
  'driveways-pavers-alpharetta-ga': { kind: 'driveway', city: 'alpharetta' },
  'outdoor-kitchen-johns-creek-ga': { kind: 'kitchen', city: 'johns-creek' },
  'driveway-pavers-atlanta': { kind: 'driveway', city: 'atlanta' },
  'retaining-walls-atlanta': { kind: 'wall', city: 'atlanta' },
  'outdoor-patios-atlanta': { kind: 'patio', city: 'atlanta' },
  'pool-deck-pavers-atlanta': { kind: 'pool', city: 'atlanta' },
  'paver-patio-duluth-ga': { kind: 'patio', city: 'duluth' },
  'paving-stone-contractor-roswell': { kind: 'driveway', city: 'roswell' },
  'stone-patio-contractors-alpharetta-ga': { kind: 'patio', city: 'alpharetta' },
  'hardscape-installation-atlanta': { kind: 'hardscape', city: 'atlanta' },
  'hardscaping-smyrna': { kind: 'hardscape', city: 'smyrna' },
  'paver-patio-johns-creek-ga': { kind: 'patio', city: 'johns-creek' },
  'pavers-alpharetta-ga': { kind: 'driveway', city: 'alpharetta' },
  'hardscape-roswell-ga': { kind: 'hardscape', city: 'roswell' },
  'patio-installation-johns-creek': { kind: 'patio', city: 'johns-creek' },
};

/** Core service hub page for each kind — used for breadcrumbs and "back to service" links. */
export const kindHub: Record<ServiceKind, { name: string; path: string }> = {
  driveway: { name: 'Driveway Pavers', path: '/service/driveway-pavers' },
  patio: { name: 'Outdoor Patio Builders', path: '/service/outdoor-patio-builders' },
  wall: { name: 'Retaining Wall Installation', path: '/service/retaining-wall-installation' },
  kitchen: { name: 'Outdoor Patio Builders', path: '/service/outdoor-patio-builders' },
  pool: { name: 'Pool Deck Pavers', path: '/service/pool-deck-pavers' },
  fire: { name: 'Masonry & Fireplaces', path: '/service/masonry-fireplaces' },
  deck: { name: 'Deck Builders', path: '/service/deck-builders' },
  veneer: { name: 'Stone Veneer', path: '/service/stone-veneer' },
  design: { name: '3D Landscape Design', path: '/service/landscape-design' },
  hardscape: { name: 'Hardscape Services', path: '/services' },
};
