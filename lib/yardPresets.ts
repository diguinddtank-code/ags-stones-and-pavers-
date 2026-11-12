/**
 * Data for the 3D Yard Studio (/design-your-yard).
 *
 * Every area of the sample property has a set of layouts (the design style:
 * shape, curves, steps, built-ins) and a set of finishes (the stone). Finishes
 * are photo-scanned PBR materials from Poly Haven (CC0) served from
 * public/yard/tex/<tex>/{diff,nor,arm}.webp. Everything here is illustrative
 * and meant to start a planning conversation, not a price list.
 */

export type ZoneId = 'driveway' | 'walkway' | 'patio' | 'poolDeck' | 'firePit' | 'wall';

export interface Finish {
  id: string;
  name: string;
  detail: string;
  tex: string;
  /** Meters covered by one texture repeat. */
  scale: number;
  /** Optional color multiplier to shift the stone tone. */
  tint?: string;
}

export interface Layout {
  id: string;
  name: string;
  detail: string;
}

export interface Zone {
  id: ZoneId;
  name: string;
  service: string;
  servicePath: string;
  blurb: string;
  /** Eye-level camera when the area is opened. */
  view: { position: [number, number, number]; target: [number, number, number] };
  /** Where the floating label sits in the overview. */
  pin: [number, number, number];
  layouts: Layout[];
  finishes: Finish[];
}

export const texUrl = (tex: string, map: 'diff' | 'nor' | 'arm') => `/yard/tex/${tex}/${map}.webp`;
/** 256px swatch of a finish (UI and homepage teaser). */
export const thumbUrl = (tex: string) => `/yard/thumbs/${tex}.webp`;

const F = (f: Finish) => f;

export const ZONES: Zone[] = [
  {
    id: 'driveway',
    name: 'Driveway',
    service: 'Driveway pavers',
    servicePath: '/service/driveway-pavers',
    blurb: 'The first thing guests see. Interlocking pavers on a compacted base built for vehicle loads, finished with a contrasting border.',
    view: { position: [8, 3.4, 30], target: [-7, 1.2, 11] },
    pin: [-8, 1.4, 14],
    layouts: [
      { id: 'curved', name: 'Curved sweep', detail: 'A soft S-curve to the street with a flared apron' },
      { id: 'motorCourt', name: 'Motor court', detail: 'Circular court around a planted island' },
      { id: 'straight', name: 'Classic straight', detail: 'Straight run with banded border' },
    ],
    finishes: [
      F({ id: 'dw-herring', name: 'Herringbone', detail: 'Charcoal concrete pavers', tex: 'herringbone_pavement', scale: 2.2 }),
      F({ id: 'dw-interlock', name: 'Interlocking', detail: 'Tan concrete pavers', tex: 'interlocking_concrete_pavers', scale: 2.4 }),
      F({ id: 'dw-cobble', name: 'Cobblestone', detail: 'Granite sett', tex: 'cobblestone_floor_08', scale: 2.4 }),
      F({ id: 'dw-pattern', name: 'Ashlar pattern', detail: 'Light gray pavers', tex: 'patterned_concrete_pavers', scale: 2.6 }),
    ],
  },
  {
    id: 'walkway',
    name: 'Front walkway',
    service: 'Paver walkways',
    servicePath: '/service/outdoor-patio-builders',
    blurb: 'A welcoming path from the street to the front door, with landscape lighting and planting along the way.',
    view: { position: [14, 2.4, 22], target: [4, 0.8, 11] },
    pin: [6, 1.3, 14],
    layouts: [
      { id: 'curved', name: 'Meandering', detail: 'A relaxed curve through the front lawn' },
      { id: 'stepping', name: 'Stepping stones', detail: 'Natural slabs set into the lawn' },
      { id: 'straight', name: 'Formal straight', detail: 'Centered walk with a porch landing' },
    ],
    finishes: [
      F({ id: 'ww-flag', name: 'Flagstone', detail: 'Natural slate', tex: 'slate_floor_02', scale: 2.6 }),
      F({ id: 'ww-brick', name: 'Clay brick', detail: 'Running bond red', tex: 'red_brick_pavers', scale: 2.0 }),
      F({ id: 'ww-square', name: 'Square pavers', detail: 'Sandstone gray', tex: 'square_concrete_pavers', scale: 2.4 }),
    ],
  },
  {
    id: 'patio',
    name: 'Back patio',
    service: 'Patio installation',
    servicePath: '/service/outdoor-patio-builders',
    blurb: 'Outdoor living off the back of the house: room to dine, lounge and step down to the lawn.',
    view: { position: [13, 3.2, -21], target: [1, 0.8, -9] },
    pin: [1.5, 1.6, -11],
    layouts: [
      { id: 'curvedTerrace', name: 'Curved terrace', detail: 'Raised arc with seat wall and sweeping steps' },
      { id: 'pergola', name: 'Pergola room', detail: 'Paver patio under a timber pergola' },
      { id: 'deck', name: 'Deck + landing', detail: 'Raised wood deck stepping down to pavers' },
    ],
    finishes: [
      F({ id: 'pt-precast', name: 'Precast stone', detail: 'Warm limestone look', tex: 'precast_stone_paving', scale: 3.2 }),
      F({ id: 'pt-slab', name: 'Large-format slab', detail: 'Smooth concrete', tex: 'rectangular_paving', scale: 3.2 }),
      F({ id: 'pt-herring', name: 'Brick herringbone', detail: 'Tumbled red', tex: 'herringbone_brick', scale: 2.0 }),
      F({ id: 'pt-mixed', name: 'Mixed stone tile', detail: 'Ivory', tex: 'mixed_stone_tiles', scale: 3.0 }),
    ],
  },
  {
    id: 'poolDeck',
    name: 'Pool deck',
    service: 'Pool deck pavers',
    servicePath: '/service/pool-deck-pavers',
    blurb: 'Cool-to-the-touch surfaces, bullnose coping and room for loungers around the water.',
    view: { position: [-1, 3.6, -11], target: [8, 0, -19] },
    pin: [8, 1.3, -15],
    layouts: [
      { id: 'freeform', name: 'Freeform', detail: 'Organic lagoon shape with a flowing deck' },
      { id: 'roman', name: 'Roman end', detail: 'Classic rectangle with rounded ends' },
      { id: 'rectangle', name: 'Modern rectangle', detail: 'Crisp lines and a wide sun shelf deck' },
    ],
    finishes: [
      F({ id: 'pd-travertine', name: 'Travertine-look', detail: 'Ivory blocks', tex: 'sandstone_blocks_08', scale: 3.0 }),
      F({ id: 'pd-crazy', name: 'Crazy paving', detail: 'Pale limestone', tex: 'stone_tiles_02', scale: 3.0 }),
      F({ id: 'pd-pattern', name: 'Pattern pavers', detail: 'Warm gray', tex: 'patterned_paving', scale: 2.8 }),
    ],
  },
  {
    id: 'firePit',
    name: 'Fire & kitchen',
    service: 'Fire features & outdoor kitchens',
    servicePath: '/service/masonry-fireplaces',
    blurb: 'A gathering spot for cool Georgia evenings: fire pit, stone fireplace or a full outdoor kitchen.',
    view: { position: [-0.5, 2.9, -11], target: [-9, 0.9, -18] },
    pin: [-9, 1.8, -17],
    layouts: [
      { id: 'pitSeatWall', name: 'Fire pit + seat wall', detail: 'Round patio wrapped by a curved seat wall' },
      { id: 'fireplace', name: 'Stone fireplace', detail: 'Tall masonry fireplace with a lounge' },
      { id: 'kitchen', name: 'Outdoor kitchen', detail: 'L-shaped grill island with stone and marble' },
    ],
    finishes: [
      F({ id: 'fp-flag', name: 'Flagstone', detail: 'Natural slate', tex: 'slate_floor_02', scale: 2.6 }),
      F({ id: 'fp-herring', name: 'Brick herringbone', detail: 'Tumbled red', tex: 'herringbone_brick', scale: 2.0 }),
      F({ id: 'fp-cobble', name: 'Square cobble', detail: 'Weathered granite', tex: 'cobblestone_square', scale: 2.2 }),
    ],
  },
  {
    id: 'wall',
    name: 'Retaining wall',
    service: 'Retaining walls',
    servicePath: '/service/retaining-wall-installation',
    blurb: 'Holds the upper lawn and turns a slope into usable, level yard. Shape and stone set the character.',
    view: { position: [3, 3, -13], target: [0, 1.2, -25] },
    pin: [-14, 3.4, -24.5],
    layouts: [
      { id: 'curved', name: 'Sweeping curve', detail: 'One flowing wall that follows the grade' },
      { id: 'terraced', name: 'Terraced', detail: 'Two shorter walls with a planting bed between' },
      { id: 'stairs', name: 'Wall with stairs', detail: 'Straight wall with built-in steps to the upper lawn' },
    ],
    finishes: [
      F({ id: 'wl-stacked', name: 'Stacked stone', detail: 'Dry-laid ledgestone', tex: 'stacked_stone_wall', scale: 2.2 }),
      F({ id: 'wl-fieldstone', name: 'Fieldstone', detail: 'Mortared gray', tex: 'stone_wall_04', scale: 2.6 }),
      F({ id: 'wl-block', name: 'Segmental block', detail: 'Split-face concrete', tex: 'concrete_block_wall_03', scale: 2.4 }),
    ],
  },
];

export interface ZoneChoice {
  layout: string;
  finish: string;
}
export type Selection = Record<ZoneId, ZoneChoice>;

export const DEFAULT_SELECTION: Selection = {
  driveway: { layout: 'curved', finish: 'dw-herring' },
  walkway: { layout: 'curved', finish: 'ww-flag' },
  patio: { layout: 'curvedTerrace', finish: 'pt-precast' },
  poolDeck: { layout: 'freeform', finish: 'pd-travertine' },
  firePit: { layout: 'pitSeatWall', finish: 'fp-flag' },
  wall: { layout: 'curved', finish: 'wl-stacked' },
};

/** One-click looks that set every area at once. */
export const STYLES: { id: string; name: string; selection: Selection }[] = [
  { id: 'resort', name: 'Resort', selection: DEFAULT_SELECTION },
  {
    id: 'modern',
    name: 'Modern',
    selection: {
      driveway: { layout: 'straight', finish: 'dw-pattern' },
      walkway: { layout: 'straight', finish: 'ww-square' },
      patio: { layout: 'pergola', finish: 'pt-slab' },
      poolDeck: { layout: 'rectangle', finish: 'pd-pattern' },
      firePit: { layout: 'kitchen', finish: 'fp-cobble' },
      wall: { layout: 'stairs', finish: 'wl-block' },
    },
  },
  {
    id: 'southern',
    name: 'Classic Southern',
    selection: {
      driveway: { layout: 'motorCourt', finish: 'dw-interlock' },
      walkway: { layout: 'straight', finish: 'ww-brick' },
      patio: { layout: 'deck', finish: 'pt-herring' },
      poolDeck: { layout: 'roman', finish: 'pd-travertine' },
      firePit: { layout: 'fireplace', finish: 'fp-herring' },
      wall: { layout: 'terraced', finish: 'wl-fieldstone' },
    },
  },
  {
    id: 'natural',
    name: 'Natural Stone',
    selection: {
      driveway: { layout: 'curved', finish: 'dw-cobble' },
      walkway: { layout: 'stepping', finish: 'ww-flag' },
      patio: { layout: 'curvedTerrace', finish: 'pt-mixed' },
      poolDeck: { layout: 'freeform', finish: 'pd-crazy' },
      firePit: { layout: 'pitSeatWall', finish: 'fp-flag' },
      wall: { layout: 'curved', finish: 'wl-stacked' },
    },
  },
];

export const OVERVIEW_VIEW = {
  position: [50, 38, 4] as [number, number, number],
  target: [-2, 0, -5] as [number, number, number],
};

export const getZone = (id: ZoneId) => ZONES.find((z) => z.id === id)!;
export const findFinish = (zone: ZoneId, id: string) =>
  getZone(zone).finishes.find((f) => f.id === id) ?? getZone(zone).finishes[0];
export const findLayout = (zone: ZoneId, id: string) =>
  getZone(zone).layouts.find((l) => l.id === id) ?? getZone(zone).layouts[0];
