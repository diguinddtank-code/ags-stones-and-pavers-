import type { ServiceKind } from './serviceFaqs';

export interface ServiceDecision {
  label: string;
  title: string;
  detail: string;
}

export interface ServiceInsight {
  title: string;
  intro: string;
  decisions: [ServiceDecision, ServiceDecision, ServiceDecision, ServiceDecision];
  checklistTitle: string;
  checklist: [string, string, string];
}

/** Practical, service-specific questions to help homeowners compare scopes. */
export const serviceInsights: Record<ServiceKind, ServiceInsight> = {
  driveway: {
    title: 'Plan the driveway around how you use it.',
    intro: 'A durable-looking finish starts with decisions about vehicles, runoff and the existing surface. These details help make estimates easier to compare.',
    decisions: [
      { label: 'USE', title: 'Vehicle loads', detail: 'Note daily traffic, turning areas and whether heavier vehicles need to use or park on the drive.' },
      { label: 'SITE', title: 'Existing surface', detail: 'Identify what needs removal and whether there are settled, cracked or patched areas.' },
      { label: 'WATER', title: 'Slope and runoff', detail: 'Look for low spots and where rain travels now, especially near the garage and walkways.' },
      { label: 'FINISH', title: 'Pattern and border', detail: 'Compare paver size, color, laying pattern and edge details with the style of the home.' },
    ],
    checklistTitle: 'Useful details for a driveway estimate',
    checklist: ['Approximate length and width', 'Current surface and problem areas', 'Vehicle use and drainage concerns'],
  },
  patio: {
    title: 'Make the patio fit the way you gather.',
    intro: 'Start with the activities the space should support, then plan the footprint, pathways and transitions that make it comfortable to use.',
    decisions: [
      { label: 'LAYOUT', title: 'Dining and seating', detail: 'Allow room for the table, chairs pulled out and a clear path between the house and yard.' },
      { label: 'LOCATION', title: 'Sun, shade and views', detail: 'Consider when you use the yard, nearby windows, tree cover and the outlook from the house.' },
      { label: 'CONNECTION', title: 'Steps and transitions', detail: 'Plan how the patio meets doors, lawn, existing walkways and any change in elevation.' },
      { label: 'MATERIAL', title: 'Stone or pavers', detail: 'Compare color, texture, shape, joint style and care requirements in samples.' },
    ],
    checklistTitle: 'Bring these patio planning notes',
    checklist: ['How many people use the space', 'Furniture or features to include', 'Photos of the yard and access route'],
  },
  wall: {
    title: 'A retaining wall is a site and water decision.',
    intro: 'The wall’s purpose, height, drainage and nearby structures all influence the plan. Clarify local requirements before settling on a design.',
    decisions: [
      { label: 'PURPOSE', title: 'What needs to change?', detail: 'Describe the slope, erosion or lost yard space and what you hope to make usable.' },
      { label: 'DIMENSIONS', title: 'Height and length', detail: 'Approximate measurements help frame the conversation; final dimensions depend on the site.' },
      { label: 'DRAINAGE', title: 'Where water goes', detail: 'Note downspouts, wet areas, runoff paths and structures close to the proposed wall.' },
      { label: 'REQUIREMENTS', title: 'Permits and engineering', detail: 'Ask which city or county rules, engineering review or property-line checks apply.' },
    ],
    checklistTitle: 'Before discussing a wall estimate',
    checklist: ['Photos from above and below the slope', 'Approximate wall height and length', 'Nearby fences, buildings and drainage outlets'],
  },
  kitchen: {
    title: 'Coordinate cooking, utilities and gathering space.',
    intro: 'Outdoor kitchens combine several decisions that affect one another. A simple feature list helps define a realistic layout and project scope.',
    decisions: [
      { label: 'COOKING', title: 'Appliances and clearances', detail: 'List the grill, refrigeration or other appliances and check each manufacturer’s spacing guidance.' },
      { label: 'WORKFLOW', title: 'Prep and serving', detail: 'Plan counter space, storage, seating and the route between the kitchen and dining area.' },
      { label: 'UTILITIES', title: 'Power, water and fuel', detail: 'Note existing connections and ask which licensed trades or approvals the project requires.' },
      { label: 'EXPOSURE', title: 'Weather and materials', detail: 'Compare exterior-rated masonry, counter and appliance finishes for the site’s sun and rain.' },
    ],
    checklistTitle: 'Bring to an outdoor-kitchen estimate',
    checklist: ['Appliance models or a feature list', 'Preferred location and patio dimensions', 'Known utility connections and access'],
  },
  pool: {
    title: 'Design the surface around the water’s edge.',
    intro: 'A pool deck should connect cleanly to coping, paths and the rest of the yard. Compare surface options for appearance, wet use and upkeep.',
    decisions: [
      { label: 'EDGE', title: 'Coping and transitions', detail: 'Review how the new surface meets the pool, steps, drains and any existing deck.' },
      { label: 'SURFACE', title: 'Texture underfoot', detail: 'Compare product finish and manufacturer guidance for wet traction; no surface is slip-proof.' },
      { label: 'DRAINAGE', title: 'Water movement', detail: 'Consider deck slope, splash areas and where water should flow away from the pool and home.' },
      { label: 'COMFORT', title: 'Color and sun exposure', detail: 'View samples in sunlight and weigh color, texture, maintenance and the way the area is used.' },
    ],
    checklistTitle: 'Pool-deck details worth sharing',
    checklist: ['Pool dimensions and current coping', 'Photos of cracks, settling or low spots', 'Material preferences and how the area is used'],
  },
  fire: {
    title: 'Set the fire feature in the right place.',
    intro: 'A fireplace or fire pit needs to work with seating, clearances, fuel choice and the patio around it. Confirm product and local requirements for the design.',
    decisions: [
      { label: 'FEATURE', title: 'Fireplace or fire pit', detail: 'Choose the form and scale that fits the space, seating plan and how you expect to use it.' },
      { label: 'FUEL', title: 'Gas or wood', detail: 'Compare operation, utility needs, upkeep and restrictions for the selected appliance.' },
      { label: 'PLACEMENT', title: 'Clearances and airflow', detail: 'Check manufacturer guidance, nearby structures, overhead conditions and local rules.' },
      { label: 'BASE', title: 'Support and finish', detail: 'Discuss the foundation, masonry profile, cap and how the feature meets the patio.' },
    ],
    checklistTitle: 'Plan these details before requesting an estimate',
    checklist: ['Preferred feature and fuel type', 'Proposed location and seating layout', 'Any utility lines or overhead structures nearby'],
  },
  deck: {
    title: 'Connect the house, deck and yard.',
    intro: 'Deck height, access and material choice shape the design. Think through how people will move between the house, deck, patio and yard.',
    decisions: [
      { label: 'ELEVATION', title: 'Height and access', detail: 'Note door height, grade changes, stairs and where a ramp or landing may be needed.' },
      { label: 'STRUCTURE', title: 'Attachment and framing', detail: 'Ask how the existing house, ledger, posts and footings will be assessed for the proposed design.' },
      { label: 'MATERIAL', title: 'Wood or composite', detail: 'Compare appearance, upkeep, cost, warranty terms and manufacturer installation requirements.' },
      { label: 'CODE', title: 'Guards and approvals', detail: 'Confirm applicable permit, inspection, stair and guard requirements with the local jurisdiction.' },
    ],
    checklistTitle: 'Deck estimate preparation',
    checklist: ['Approximate deck size and height', 'Preferred material and color', 'Photos of the house connection and yard'],
  },
  veneer: {
    title: 'The finish depends on what is behind the stone.',
    intro: 'A veneer selection is only one part of the assembly. Substrate, moisture management, exposure and edge details matter to the finished appearance.',
    decisions: [
      { label: 'SUBSTRATE', title: 'Existing wall condition', detail: 'Identify the wall material, visible damage, paint or finish and any known moisture concerns.' },
      { label: 'PRODUCT', title: 'Natural or manufactured', detail: 'Compare weight, shape, color variation, texture and the selected product’s installation guide.' },
      { label: 'WATER', title: 'Moisture management', detail: 'Ask how flashing, drainage and the wall assembly are handled for the specific application.' },
      { label: 'DETAILS', title: 'Corners and edges', detail: 'Review outside corners, caps, openings and transitions so the finish looks complete.' },
    ],
    checklistTitle: 'Useful information for a veneer estimate',
    checklist: ['Photos of the whole wall and close-up details', 'Wall dimensions and exposure to weather', 'Preferred stone profile or reference image'],
  },
  design: {
    title: 'Coordinate the whole yard before choosing finishes.',
    intro: 'A useful hardscape plan connects circulation, grade, drainage and materials. Decide which areas matter most and how the work could be phased.',
    decisions: [
      { label: 'PRIORITIES', title: 'What needs to work better?', detail: 'Rank the driveway, patio, steps, walls or gathering areas by everyday need.' },
      { label: 'MOVEMENT', title: 'Paths through the yard', detail: 'Map how people arrive, move between spaces and reach gates or outdoor features.' },
      { label: 'SITE', title: 'Grade, water and access', detail: 'Note steep areas, runoff, existing trees, utilities and routes for moving materials.' },
      { label: 'PHASING', title: 'One plan or stages', detail: 'Discuss the desired full layout and whether the construction scope may be completed in phases.' },
    ],
    checklistTitle: 'Bring these items to a planning conversation',
    checklist: ['A simple sketch or property survey if available', 'Photos from several parts of the yard', 'Top priorities and a rough project budget'],
  },
  hardscape: {
    title: 'Make connected outdoor work function as one plan.',
    intro: 'When a project includes several features, their order and transitions matter. Start with how the spaces should work together and what the site allows.',
    decisions: [
      { label: 'SCOPE', title: 'List each area', detail: 'Group paving, walls, steps and outdoor features so the estimate shows what belongs in the project.' },
      { label: 'SEQUENCE', title: 'Construction order', detail: 'Ask how grading, drainage, structural work and finish surfaces fit into the proposed sequence.' },
      { label: 'ACCESS', title: 'Moving materials', detail: 'Identify gates, narrow paths, slopes and existing surfaces that may affect site access.' },
      { label: 'PRIORITIES', title: 'Plan for future phases', detail: 'Share future ideas early so locations, utilities and transitions can be considered together.' },
    ],
    checklistTitle: 'A strong starting point for a project estimate',
    checklist: ['The city and areas you want to improve', 'Photos and approximate dimensions', 'Must-haves, nice-to-haves and timing'],
  },
};
