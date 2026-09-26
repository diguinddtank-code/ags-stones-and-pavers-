// City data used by the programmatic local landing pages, service-area hub,
// blog internal-link blocks and the LocalBusiness areaServed list.

export interface City {
  id: string;
  name: string;
  county: string;
  neighborhoods: string[];
  terrain: string;
  homes: string;
  blurb: string;
}

export const cities: City[] = [
  {
    id: 'alpharetta',
    name: 'Alpharetta',
    county: 'Fulton County',
    neighborhoods: ['Windward', 'Crabapple', 'Downtown Alpharetta', 'Avalon'],
    terrain: 'rolling lots with dense red clay that holds water after summer storms',
    homes: 'golf-course estates and newer HOA communities with strict exterior standards',
    blurb: 'Custom golf club estates & high-end interlocking modular driveways.',
  },
  {
    id: 'johns-creek',
    name: 'Johns Creek',
    county: 'Fulton County',
    neighborhoods: ['St. Ives', 'Country Club of the South', 'Medlock Bridge', 'Newtown'],
    terrain: 'gently sloped backyards that drain toward the Chattahoochee River corridor',
    homes: 'country-club homes built around large backyards and outdoor entertaining',
    blurb: 'Country club estate luxury, outdoor kitchens & massive structured patios.',
  },
  {
    id: 'sandy-springs',
    name: 'Sandy Springs',
    county: 'Fulton County',
    neighborhoods: ['Riverside', 'North Springs', 'High Point', 'Mount Vernon Woods'],
    terrain: 'wooded, steep lots where erosion and runoff are the first problem to solve',
    homes: 'mid-century ranches and modern rebuilds tucked into hillside lots',
    blurb: 'Wooded terraced yards, erosion control & structural retaining walls.',
  },
  {
    id: 'buckhead',
    name: 'Buckhead',
    county: 'Fulton County',
    neighborhoods: ['Tuxedo Park', 'Peachtree Heights', 'Chastain Park', 'Garden Hills'],
    terrain: 'mature lots with large tree roots and elevation changes between street and home',
    homes: 'historic estates and luxury new construction with formal motor courts',
    blurb: 'Mansion hardscapes, level grading & sweeping driveway redesigns.',
  },
  {
    id: 'roswell',
    name: 'Roswell',
    county: 'Fulton County',
    neighborhoods: ['Historic Roswell', "Martin's Landing", 'Horseshoe Bend', 'Willeo Creek'],
    terrain: 'hilly terrain near the river where slopes and drainage shape every project',
    homes: 'historic cottages and established swim-and-tennis neighborhoods',
    blurb: 'Restored historic properties matching natural stone and cobblestone styles.',
  },
  {
    id: 'atlanta',
    name: 'Atlanta',
    county: 'Fulton & DeKalb Counties',
    neighborhoods: ['Virginia-Highland', 'Morningside', 'Kirkwood', 'Grant Park'],
    terrain: 'tight intown lots with steep grades and heavy Piedmont clay',
    homes: 'craftsman bungalows, renovated historic homes and modern infill builds',
    blurb: 'Intown slope stabilization, retaining block columns & cool-touch pool decks.',
  },
  {
    id: 'duluth',
    name: 'Duluth',
    county: 'Gwinnett County',
    neighborhoods: ['Sugarloaf', 'Downtown Duluth', 'River Green', 'Pleasant Hill'],
    terrain: 'clay-heavy suburban lots that need proper grading to keep water off patios',
    homes: 'family homes with active backyards — our home base on Abbotts Bridge Rd',
    blurb: 'Our flagship service boundary. Year-round outdoor living & paver patios.',
  },
  {
    id: 'suwanee',
    name: 'Suwanee',
    county: 'Gwinnett County',
    neighborhoods: ['Suwanee Town Center', 'Old Atlanta Club', 'Laurel Springs', 'Riverside Club'],
    terrain: 'newer subdivisions with compacted fill soil and sloped rear yards',
    homes: 'multi-generational family homes built for backyard gatherings',
    blurb: 'Multi-generational fire pits, travertine and robust ground grading.',
  },
  {
    id: 'marietta',
    name: 'Marietta',
    county: 'Cobb County',
    neighborhoods: ['East Cobb', 'Marietta Square', 'Indian Hills', 'Chimney Springs'],
    terrain: 'larger lots with long driveways and sloped backyards prone to erosion',
    homes: 'established East Cobb homes and historic properties near the Square',
    blurb: 'Erosion containment & heavy-load retaining grids across large lots.',
  },
  {
    id: 'smyrna',
    name: 'Smyrna',
    county: 'Cobb County',
    neighborhoods: ['Vinings', 'Jonquil', 'Smyrna Market Village', 'Forest Hills'],
    terrain: 'compact lots with uneven grades that make flat, usable yard space scarce',
    homes: 'renovated ranches and new townhome-style builds close to the city',
    blurb: 'Complete yard leveling, masonry steps, and flat backyard conversions.',
  },
];

export const cityById = (id: string) => cities.find((c) => c.id === id);
