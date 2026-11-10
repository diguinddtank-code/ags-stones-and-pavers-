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
      a: `The estimate depends on driveway size, material and pattern, demolition, site access, grading and drainage needs. A site review is the best way to understand the scope for a ${city} property.`,
    },
    {
      q: 'What should I compare when choosing driveway pavers?',
      a: 'Consider the home’s style, vehicle loads, surface texture, color, pattern and maintenance. Ask how excavation, base preparation, edge restraint and drainage are included in the proposed scope.',
    },
    {
      q: `How are paver driveways planned for ${county} soil and drainage?`,
      a: 'The approach depends on the property. Grade, soil, water flow, existing paving and intended vehicle use should be reviewed before deciding on excavation depth, base materials and surface slope.',
    },
    {
      q: 'Can existing concrete be replaced with pavers?',
      a: 'Often, yes. The existing surface, access, subgrade and drainage affect the work required. Share photos and the property address when requesting an estimate so the next step can be discussed.',
    },
  ],
  patio: (city, county) => [
    {
      q: `How much does a paver patio cost in ${city}?`,
      a: `Cost depends on patio size, material, access, grading and details such as steps, borders or seating walls. Discuss how you plan to use the space so the estimate reflects the right scope for your ${city} property.`,
    },
    {
      q: 'Which patio material should I choose?',
      a: 'Concrete pavers and natural stone differ in color, texture, format, cost and maintenance. Compare samples in the context of your home and the amount of sun, shade and use the patio will receive.',
    },
    {
      q: `How should a patio handle rain and grading in ${county}?`,
      a: 'The design should account for the existing slope, roof runoff, nearby structures and where water can safely flow. Site conditions determine the base and surface grading needed.',
    },
    {
      q: `What information helps plan a patio in ${city}?`,
      a: 'Share approximate dimensions, how you expect to use the area, preferred materials and any concerns about access, steps, slope or drainage. Photos can help start the conversation.',
    },
  ],
  wall: (city, county) => [
    {
      q: `Do I need a permit for a retaining wall in ${city}?`,
      a: `Requirements depend on the wall and the local jurisdiction in ${county}. Confirm current permit, engineering and property-line requirements with the relevant city or county before work begins.`,
    },
    {
      q: 'What should be considered when planning a retaining wall?',
      a: 'Wall height and length, soil, slope, water, nearby structures, property lines and access all affect the design. Some projects also need engineering or permits; verify requirements for the specific site.',
    },
    {
      q: `How much does a retaining wall cost in ${city}?`,
      a: 'Cost depends on the wall dimensions, selected system, site access, excavation, drainage and any engineering or approvals required. An estimate starts with understanding the grade and property conditions.',
    },
    {
      q: 'Can a retaining wall give me a flat, usable backyard?',
      a: 'A retaining wall can be part of a plan to create usable space on a slope. Whether terracing is suitable depends on the property, water flow, wall design and local requirements.',
    },
  ],
  kitchen: (city) => [
    {
      q: `How much does an outdoor kitchen cost in ${city}?`,
      a: 'Cost depends on the layout, masonry, countertop and appliance choices, utility needs, patio work and site access. Define the features you want before comparing estimates.',
    },
    {
      q: 'What countertop works best for an outdoor kitchen in Georgia?',
      a: 'Outdoor countertops differ in appearance, heat and weather performance, care and price. Ask the supplier about the selected product’s suitability for exterior use and follow its care guidance.',
    },
    {
      q: 'Should the patio and outdoor kitchen be planned together?',
      a: 'Planning them together helps coordinate dimensions, movement around the cooking area, utility routes, seating and drainage. The exact work included should be listed in the project scope.',
    },
    {
      q: `Are permits or utility approvals needed for an outdoor kitchen in ${city}?`,
      a: 'Requirements depend on the appliances, utility connections and local jurisdiction. Confirm applicable permits and inspections with the city or county and the relevant utility providers.',
    },
  ],
  pool: (city) => [
    {
      q: 'Are travertine pool decks hot to walk on?',
      a: 'Surface temperature varies with color, finish, sun exposure and weather. Compare samples outdoors and consider texture, care and comfort alongside appearance.',
    },
    {
      q: `Can you replace a cracked concrete pool deck in ${city}?`,
      a: 'A replacement may be possible. The existing deck, pool edge, drainage, access and any movement around the pool need to be assessed before choosing a method and material.',
    },
    {
      q: 'Are paver pool decks slippery when wet?',
      a: 'Wet traction varies by product and finish. Ask for manufacturer information and compare samples for the intended poolside use; no surface should be treated as slip-proof.',
    },
    {
      q: 'How long does a pool deck renovation take?',
      a: 'The schedule depends on deck size, demolition, coping, access, material availability and site conditions. Ask for a project-specific timeline after the scope is reviewed.',
    },
  ],
  fire: (city) => [
    {
      q: `Do you build outdoor fireplaces and fire pits in ${city}?`,
      a: `AGS lists outdoor fireplaces and fire features among its masonry services in the ${city} area. Share your preferred fuel, location and whether the feature is part of a larger patio project when requesting an estimate.`,
    },
    {
      q: 'Gas or wood-burning — which is better?',
      a: 'Gas and wood features differ in operation, utility needs, upkeep and local requirements. Review manufacturer guidance and check local rules and HOA restrictions before choosing.',
    },
    {
      q: 'Does an outdoor fireplace need a foundation?',
      a: 'A masonry fireplace needs support designed for its weight and site conditions. The footing and any approvals should be determined as part of the project plan.',
    },
    {
      q: 'How long does it take to build an outdoor fireplace?',
      a: 'Timing depends on the feature, foundation, materials, utility work, weather and approvals. Request a schedule estimate after the full scope is discussed.',
    },
  ],
  deck: (city) => [
    {
      q: `Do you build composite decks in ${city}?`,
      a: 'AGS lists deck construction among its services. Share the proposed location, height, material preference and any connection to a patio when requesting an estimate.',
    },
    {
      q: 'Composite or wood decking?',
      a: 'Compare purchase cost, appearance, maintenance, warranties and the manufacturer’s installation requirements. Conditions at your property and how you use the deck can help guide the choice.',
    },
    {
      q: 'Do I need a permit for a new deck?',
      a: 'Permit and inspection requirements vary by jurisdiction and project details. Confirm current requirements with your city or county before construction.',
    },
    {
      q: 'Can you connect a new deck to a stone patio?',
      a: 'A deck and patio can be planned as connected areas. The layout should account for elevation changes, steps, drainage, access and the materials selected.',
    },
  ],
  veneer: (city) => [
    {
      q: 'What is stone veneer?',
      a: 'Stone veneer is a facing layer of natural or manufactured stone installed over a suitable substrate. Product requirements vary, so the wall assembly and manufacturer guidance matter.',
    },
    {
      q: `Can you add stone veneer to my house exterior in ${city}?`,
      a: `AGS installs stone veneer for exterior and outdoor features in the ${city} area. The existing wall, substrate, moisture management and selected product should be reviewed before work is scoped.`,
    },
    {
      q: 'How long does stone veneer last?',
      a: 'Service life depends on product, substrate, installation details, exposure and maintenance. Follow the manufacturer’s care guidance and ask what preparation the specific wall assembly needs.',
    },
    {
      q: 'Natural or manufactured stone veneer?',
      a: 'Natural and manufactured veneers offer different textures, color variation, weight and care needs. Compare samples and review installation requirements for each product.',
    },
  ],
  design: (city) => [
    {
      q: 'Can I discuss layout and materials before construction?',
      a: 'Yes. Share your goals, dimensions, photos and material ideas when requesting an estimate. Ask which planning or design steps are included for your project.',
    },
    {
      q: 'Is the design fee credited toward construction?',
      a: 'Design services and fees depend on the requested work. Confirm what is included and whether any design fee applies before proceeding.',
    },
    {
      q: `How long does the design process take for a ${city} project?`,
      a: 'Timing depends on the information available, site complexity and the scope of planning requested. Ask for an expected schedule when discussing the project.',
    },
    {
      q: 'Do you also build what you design?',
      a: 'Ask whether construction is included in the planning proposal and what team will be responsible for each part of the work.',
    },
  ],
  hardscape: (city, county) => [
    {
      q: `What does a hardscape contractor do in ${city}?`,
      a: 'Hardscaping generally includes built outdoor features such as paver driveways and patios, retaining walls, steps, walkways, outdoor kitchens and fire features. AGS lists these services for Metro Atlanta homeowners.',
    },
    {
      q: `How do you deal with slopes and drainage in ${county}?`,
      a: `The right approach depends on the slope, existing drainage, soil, nearby structures and local requirements in ${county}. A site review helps identify options and what approvals may be needed.`,
    },
    {
      q: 'How much does a hardscape project cost?',
      a: 'Cost depends on dimensions, materials, site access, demolition, grading, drainage and any required engineering or approvals. Request an estimate with your city and project details.',
    },
    {
      q: 'What happens during an estimate discussion?',
      a: 'Share the project goal, property location and any known site concerns. The next steps depend on the work, access and information needed to define a useful scope.',
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
