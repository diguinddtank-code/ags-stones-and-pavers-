import React, { useState } from 'react';
import { MapPin, Tag, ArrowRight } from 'lucide-react';

// Data structure designed to hit specific keyword combinations: [Service] + [Location]
const projects = [
  {
    id: 1,
    title: 'Luxury Travertine Pool Deck',
    location: 'Alpharetta, GA',
    category: 'Pool Decks',
    image: 'https://images.unsplash.com/photo-1572331165267-854da2b00cc6?q=75&w=600&auto=format&fit=crop&fm=webp',
    tags: ['#TravertinePavers', '#PoolCoping', '#OutdoorLiving'],
    description: 'Complete removal of cracked concrete. Installed cool-touch French pattern travertine with modern coping.'
  },
  {
    id: 2,
    title: 'Structural Retaining Wall',
    location: 'Roswell, GA',
    category: 'Retaining Walls',
    image: 'https://i.imgur.com/dZstK86l.webp', // Imgur optimized: l suffix (640px) + webp
    tags: ['#ErosionControl', '#ModularBlock', '#DrainageSolutions'],
    description: '6ft engineered wall to level a sloped backyard. Included heavy-duty drainage and geogrid reinforcement.'
  },
  {
    id: 3,
    title: 'Modern Paver Driveway',
    location: 'Duluth, GA',
    category: 'Driveways',
    image: 'https://images.unsplash.com/photo-1621256133234-29e2f41d4517?q=75&w=600&auto=format&fit=crop&fm=webp',
    tags: ['#DrivewayPavers', '#ConcreteReplacement', '#CurbAppeal'],
    description: 'Replaced an old asphalt driveway with Belgard Dublin Cobble pavers. High-load base for RV parking.'
  },
  {
    id: 4,
    title: 'Outdoor Kitchen & Fire Pit',
    location: 'Johns Creek, GA',
    category: 'Patios',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=75&w=600&auto=format&fit=crop&fm=webp',
    tags: ['#OutdoorKitchen', '#StoneMasonry', '#FireFeature'],
    description: 'Custom stone veneer kitchen with built-in grill and a gas fire pit centerpiece for entertaining.'
  },
  {
    id: 5,
    title: 'Flagstone Walkway',
    location: 'Marietta, GA',
    category: 'Walkways',
    image: 'https://images.unsplash.com/photo-1518640027989-d1c5d80bd3ca?q=75&w=600&auto=format&fit=crop&fm=webp',
    tags: ['#NaturalStone', '#WalkwayIdeas', '#LandscapeDesign'],
    description: 'Organic irregular flagstone walkway connecting the driveway to the backyard garden.'
  },
  {
    id: 6,
    title: 'Terraced Backyard Makeover',
    location: 'Suwanee, GA',
    category: 'Retaining Walls',
    image: 'https://images.unsplash.com/photo-1596527914909-328670cb6658?q=75&w=600&auto=format&fit=crop&fm=webp',
    tags: ['#Landscaping', '#TerracedWalls', '#SodInstallation'],
    description: 'Multi-level retaining wall system creating usable flat yard space for a play area.'
  }
];

const filters = ['All', 'Alpharetta', 'Duluth', 'Roswell', 'Marietta', 'Johns Creek', 'Suwanee'];

export const LocalProjects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.location.includes(activeFilter));

  // Dynamic Schema Generation
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Hardscape Projects in ${activeFilter === 'All' ? 'Atlanta' : activeFilter}`,
    "itemListElement": filteredProjects.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": project.title,
        "description": project.description,
        "contentLocation": {
          "@type": "Place",
          "name": project.location
        },
        "image": project.image
      }
    }))
  };

  return (
    <section id="local-projects" className="py-24 bg-white relative">
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 fade-in-section">
          <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-sm">Portfolio by Location</span>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl font-bold text-brand-dark">Our Work in Your Neighborhood</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Browse our recent installations across Metro Atlanta. Filter by your city to see "paver contractors near me" in action.
          </p>
        </div>

        {/* City Filter Tabs - Accessibility Enhanced */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 fade-in-section" role="group" aria-label="Filter projects by city">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 ${
                activeFilter === filter
                  ? 'bg-brand-dark text-white border-brand-dark shadow-lg scale-105'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-brand-gold hover:text-brand-gold'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 fade-in-section"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img 
                  src={project.image} 
                  alt={`${project.title} installation in ${project.location}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-brand-dark/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <MapPin size={10} className="text-brand-gold" /> {project.location}
                </div>
                <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>

              <div className="p-6">
                <div className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-2">
                  {project.category}
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-3 leading-tight group-hover:text-brand-gold transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Keyword Tags for SEO */}
                <div className="flex flex-wrap gap-2 mb-6" aria-label="Project Tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                      {tag}
                    </span>
                  ))}
                </div>

                <a href="tel:6784287630" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-dark group-hover:gap-3 transition-all" aria-label={`Get quote for ${project.title}`}>
                  Get Quote for this Look <ArrowRight size={14} className="text-brand-gold" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-gray-400 italic">
            Select "All" to view our complete portfolio across Metro Atlanta.
          </div>
        )}

      </div>
    </section>
  );
};