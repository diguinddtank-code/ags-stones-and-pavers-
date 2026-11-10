import type { ProcessStep } from '../components/ServiceDynamicContent';
import type { ServiceKind } from './serviceFaqs';

type LinkText = { label: string; path: string };

const serviceDetails: Record<ServiceKind, {
  label: string;
  overview: string;
  planning: string;
  related: [LinkText, LinkText];
  process: ProcessStep[];
}> = {
  driveway: {
    label: 'Driveway paver installation',
    overview: 'A paver driveway brings pattern and color to the front of the home. Planning starts with driveway dimensions, vehicle use, access, the existing surface and how water moves across the property.',
    planning: 'Compare paver styles, laying patterns and borders alongside the proposed demolition, excavation, base preparation, edge restraint and drainage work. The estimate should make clear what is included for your site.',
    related: [{ label: 'paver patios', path: '/service/outdoor-patio-builders' }, { label: 'retaining walls', path: '/service/retaining-wall-installation' }],
    process: [
      { title: 'Discuss the driveway', description: 'Share the surface condition, approximate size, vehicle use, access and goals for the new entrance.' },
      { title: 'Review the site', description: 'Consider slope, runoff, subgrade and any removal needed before defining the installation.' },
      { title: 'Choose materials', description: 'Compare paver colors, patterns, borders and the details listed in the project scope.' },
      { title: 'Confirm the estimate', description: 'Review preparation, material selections, schedule and next steps before work is booked.' },
    ],
  },
  patio: {
    label: 'Outdoor patio construction',
    overview: 'A patio works best when its size and layout fit the way you plan to use the yard. Start with dining, seating, circulation and how the outdoor space connects to the house.',
    planning: 'Pavers and natural stone offer different looks, formats and care needs. Existing grades, access, steps and drainage also shape the scope for a property in Georgia.',
    related: [{ label: 'outdoor kitchens', path: '/service/masonry-fireplaces' }, { label: 'retaining walls', path: '/service/retaining-wall-installation' }],
    process: [
      { title: 'Plan how you will use it', description: 'Talk through seating, dining, circulation and the connection to the house and yard.' },
      { title: 'Review the location', description: 'Discuss dimensions, access, slope, runoff and existing surfaces that affect the work.' },
      { title: 'Compare stone and pavers', description: 'Review samples, layout patterns, borders, steps and transitions.' },
      { title: 'Agree on the scope', description: 'Go over site preparation, materials, project details and the proposed schedule.' },
    ],
  },
  wall: {
    label: 'Retaining wall installation',
    overview: 'A retaining wall can help address a grade change or make part of a yard more usable. The proposed wall depends on its dimensions, soil, water flow, nearby structures, access and property lines.',
    planning: 'Some walls need engineering or permits. Requirements depend on the project and local jurisdiction, so confirm them with the relevant city or county before construction.',
    related: [{ label: 'patios', path: '/service/outdoor-patio-builders' }, { label: 'driveway pavers', path: '/service/driveway-pavers' }],
    process: [
      { title: 'Describe the site concern', description: 'Explain the grade change, runoff or usable space you want the wall to address.' },
      { title: 'Review site conditions', description: 'Wall dimensions, soil, water, access and nearby structures inform the proposed scope.' },
      { title: 'Confirm local requirements', description: 'Check applicable permit, property-line and engineering requirements for the address.' },
      { title: 'Review the proposal', description: 'Discuss wall materials, preparation, drainage details and the project sequence.' },
    ],
  },
  kitchen: {
    label: 'Outdoor kitchen construction',
    overview: 'An outdoor kitchen combines cooking, prep and gathering space in the yard. Its layout should account for appliances, seating, circulation, utilities and the patio around it.',
    planning: 'Counter and masonry materials, appliance choices, utility routes and site access all affect the estimate. Confirm utility and local approval requirements before installation.',
    related: [{ label: 'patio builders', path: '/service/outdoor-patio-builders' }, { label: 'masonry and fireplaces', path: '/service/masonry-fireplaces' }],
    process: [
      { title: 'List the features', description: 'Note appliances, counter space, storage, seating and any fire features you have in mind.' },
      { title: 'Plan the location', description: 'Consider access, clearance, utility routes, drainage and connection to the patio.' },
      { title: 'Compare materials', description: 'Review masonry, counter and paving options intended for exterior use.' },
      { title: 'Confirm coordination', description: 'Clarify project scope, utilities, approvals and the proposed schedule.' },
    ],
  },
  pool: {
    label: 'Pool deck pavers',
    overview: 'A pool deck needs to work with the pool edge, surrounding grade and paths through the yard. Material, finish, coping, drainage and wet-foot traffic all matter when comparing options.',
    planning: 'Paver and natural stone surfaces vary in color, texture, care and wet traction. Review product guidance and the existing deck condition before deciding on a replacement scope.',
    related: [{ label: 'outdoor patios', path: '/service/outdoor-patio-builders' }, { label: 'outdoor kitchens', path: '/service/masonry-fireplaces' }],
    process: [
      { title: 'Review the pool area', description: 'Discuss the current deck, coping, access, dimensions and how the space is used.' },
      { title: 'Consider drainage', description: 'Review grades, water flow and transitions around the pool and nearby structures.' },
      { title: 'Compare surface options', description: 'Look at paver and stone samples, finish, coping and maintenance needs.' },
      { title: 'Confirm the scope', description: 'Review demolition, preparation, materials and the proposed project schedule.' },
    ],
  },
  fire: {
    label: 'Stone masonry and outdoor fireplaces',
    overview: 'Stone masonry can add an outdoor fireplace, fire feature, veneer or architectural detail to a patio. The feature, fuel type, location and available space shape the project plan.',
    planning: 'Foundation, clearances, utilities and local rules depend on the design and property. Confirm product requirements and applicable approvals before construction.',
    related: [{ label: 'outdoor patio builders', path: '/service/outdoor-patio-builders' }, { label: 'stone veneer', path: '/service/stone-veneer' }],
    process: [
      { title: 'Choose the feature', description: 'Discuss a fireplace, fire pit, veneer or other masonry detail and how you plan to use it.' },
      { title: 'Review placement', description: 'Consider the patio layout, clearances, access, utilities and site conditions.' },
      { title: 'Select materials', description: 'Compare stone profiles, masonry finishes and other product choices.' },
      { title: 'Confirm requirements', description: 'Review the project scope, foundation details, approvals and schedule.' },
    ],
  },
  deck: {
    label: 'Deck construction',
    overview: 'A deck can connect the house to a patio or yard at a different elevation. Height, access, framing, material choice, steps and the relationship to nearby hardscape inform the plan.',
    planning: 'Compare wood and composite products for appearance, upkeep and manufacturer requirements. Confirm local permit and inspection requirements for the specific design.',
    related: [{ label: 'patio builders', path: '/service/outdoor-patio-builders' }, { label: 'landscape and hardscape planning', path: '/service/landscape-design' }],
    process: [
      { title: 'Discuss the use', description: 'Share how you plan to use the deck and how it should connect with the house and yard.' },
      { title: 'Review dimensions', description: 'Consider height, steps, access, framing needs and any nearby patio or retaining wall.' },
      { title: 'Compare materials', description: 'Review wood and composite options, care requirements and product guidance.' },
      { title: 'Confirm the plan', description: 'Clarify approvals, scope, materials and the proposed schedule before work begins.' },
    ],
  },
  veneer: {
    label: 'Stone veneer installation',
    overview: 'Stone veneer adds a stone finish to a suitable wall or architectural feature. The existing substrate, moisture management, product requirements and location need to be reviewed before installation.',
    planning: 'Natural and manufactured stone differ in texture, weight, color variation and care. Compare samples and confirm the installation details for the selected product.',
    related: [{ label: 'masonry and fireplaces', path: '/service/masonry-fireplaces' }, { label: 'outdoor kitchens', path: '/service/masonry-fireplaces' }],
    process: [
      { title: 'Review the surface', description: 'Discuss the wall or feature, substrate, exposure, access and existing finish.' },
      { title: 'Select a stone profile', description: 'Compare natural and manufactured options, color, texture and joint style.' },
      { title: 'Confirm preparation', description: 'Review substrate, moisture management and product installation requirements.' },
      { title: 'Agree on the scope', description: 'Go over materials, surface preparation, installation details and schedule.' },
    ],
  },
  design: {
    label: 'Landscape and hardscape planning',
    overview: 'A clear plan helps coordinate paving, walls, steps and outdoor features before installation. Start with the property dimensions, how you want to use the space and any known site constraints.',
    planning: 'Material selection, grading, access, utilities and local approvals may affect the work. Ask which planning or drawing services are included in the estimate for your project.',
    related: [{ label: 'patio builders', path: '/service/outdoor-patio-builders' }, { label: 'retaining wall installation', path: '/service/retaining-wall-installation' }],
    process: [
      { title: 'Set project goals', description: 'Outline how you want to use the property and which areas need attention.' },
      { title: 'Gather site details', description: 'Discuss dimensions, access, grade, drainage, utilities and existing features.' },
      { title: 'Review options', description: 'Compare possible layouts, materials and transitions between the planned areas.' },
      { title: 'Confirm planning scope', description: 'Clarify drawings, approvals, construction details and the next steps.' },
    ],
  },
  hardscape: {
    label: 'Hardscape installation',
    overview: 'Hardscape projects can include paving, patios, retaining walls, steps and outdoor features. The right combination depends on the property, the way you want to use it and the site work involved.',
    planning: 'Dimensions, access, existing surfaces, grade, water flow and material choices shape the estimate. Start by sharing the project location and the changes you want to make.',
    related: [{ label: 'driveway pavers', path: '/service/driveway-pavers' }, { label: 'retaining wall installation', path: '/service/retaining-wall-installation' }],
    process: [
      { title: 'Describe the project', description: 'Share which areas you want to change and how you plan to use them.' },
      { title: 'Review the property', description: 'Discuss access, dimensions, grade, water flow and existing materials.' },
      { title: 'Compare approaches', description: 'Review material choices and how paving, walls or outdoor features fit together.' },
      { title: 'Define next steps', description: 'Confirm the estimate scope, any approvals to check and the proposed schedule.' },
    ],
  },
};

export const getServiceCopy = (kind: ServiceKind, city?: string, county?: string) => {
  const details = serviceDetails[kind];
  const area = city ? `${city}, GA` : 'Metro Atlanta';
  const context = city
    ? `AGS Stones and Pavers serves homeowners in ${city}${county ? ` and ${county}` : ''}.`
    : 'AGS Stones and Pavers is based in Duluth and serves homeowners across Metro Atlanta.';
  const related = details.related.map((link) => `[${link.label}](${link.path})`).join(' and ');

  return {
    heroSubtitle: `${details.label} in ${area}`,
    overviewHeading: `${details.label} for ${city ? `${city} homes` : 'Metro Atlanta homes'}`,
    overviewParagraphs: [
      `${context} ${details.overview}`,
      `${details.planning} Explore ${related} to compare related work and planning options.`,
    ],
    parallaxQuote: 'A clear scope starts with the property and the work you want done.',
    process: details.process,
  };
};
