// Metro Atlanta locations used to build city-specific service links and FAQs.

export interface City {
  id: string;
  name: string;
  county: string;
}

export const cities: City[] = [
  { id: 'alpharetta', name: 'Alpharetta', county: 'Fulton County' },
  { id: 'johns-creek', name: 'Johns Creek', county: 'Fulton County' },
  { id: 'sandy-springs', name: 'Sandy Springs', county: 'Fulton County' },
  { id: 'buckhead', name: 'Buckhead', county: 'Fulton County' },
  { id: 'roswell', name: 'Roswell', county: 'Fulton County' },
  { id: 'atlanta', name: 'Atlanta', county: 'Fulton and DeKalb Counties' },
  { id: 'cumming', name: 'Cumming', county: 'Forsyth County' },
  { id: 'duluth', name: 'Duluth', county: 'Gwinnett County' },
  { id: 'milton', name: 'Milton', county: 'Fulton County' },
  { id: 'suwanee', name: 'Suwanee', county: 'Gwinnett County' },
  { id: 'marietta', name: 'Marietta', county: 'Cobb County' },
  { id: 'smyrna', name: 'Smyrna', county: 'Cobb County' },
];

export const cityById = (id: string) => cities.find((city) => city.id === id);
