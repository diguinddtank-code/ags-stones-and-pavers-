import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Tag, ArrowRight, Calendar, Ruler, Box } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Luxury Travertine Pool Deck',
    location: 'Alpharetta, GA',
    date: 'January 2026',
    material: 'Premium Turkish Travertine',
    size: '1,850 Sq. Ft.',
    category: 'Pool Decks',
    image: 'https://i.imgur.com/uDiqFSl.jpeg', 
    tags: ['#FrenchPattern', '#PoolCoping', '#CoolTouchStone', '#OutdoorLiving'],
    description: 'Complete excavation of cracked concrete. Installed a permeable base system followed by cool-touch Ivory Travertine in a French Pattern with remodeling coping.'
  },
  {
    id: 2,
    title: 'Structural Retaining Wall',
    location: 'Roswell, GA',
    date: 'January 2026',
    material: 'Allan Block System',
    size: '120 Linear Ft.',
    category: 'Retaining Walls',
    image: 'https://i.imgur.com/dZstK86l.webp', 
    tags: ['#EngineeredWall', '#ErosionControl', '#GeoGrid', '#DrainageSystems'],
    description: 'Construction of a 6ft tiered engineered wall to solve severe erosion. Included hydro-static pressure relief drainage and compacted gravel backfill.'
  },
  {
    id: 3,
    title: 'Modern Paver Driveway',
    location: 'Duluth, GA',
    date: 'November 2025',
    material: 'Belgard Dublin Cobble',
    size: '2,200 Sq. Ft.',
    category: 'Driveways',
    image: 'https://www.belgard.com/wp-content/uploads/2024/05/PearmeableCategoryPage_AltBox_Image1.webp', 
    tags: ['#PaverDriveway', '#ConcreteReplacement', '#CurbAppeal', '#InterlockingPavers'],
    description: 'Demolition of failing asphalt. Installed a heavy-duty road base foundation and 80mm pavers tailored for heavy vehicle loads (RV parking ready).'
  },
  {
    id: 4,
    title: 'Outdoor Kitchen & Fire Pit',
    location: 'Johns Creek, GA',
    date: 'October 2025',
    material: 'Stacked Stone Veneer',
    size: '450 Sq. Ft. Patio',
    category: 'Patios',
    image: 'https://i.imgur.com/h3NCvta.jpeg', 
    tags: ['#OutdoorKitchen', '#StoneMasonry', '#FireFeature', '#BuiltInGrill'],
    description: 'Design and build of a custom L-shaped masonry kitchen with granite countertops, integrated Summerset grill, and a gas-ignited stone fire pit.'
  },
  {
    id: 5,
    title: 'Flagstone Walkway',
    location: 'Marietta, GA',
    date: 'August 2025',
    material: 'Pennsylvania Bluestone',
    size: '350 Sq. Ft.',
    category: 'Walkways',
    image: 'https://i.imgur.com/7OGGsuS.jpeg', 
    tags: ['#NaturalStone', '#WalkwayIdeas', '#LandscapeDesign', '#CurbAppeal'],
    description: 'Installation of organic irregular flagstone set on a concrete base with polymeric sand joints to prevent weed growth and ant hills.'
  },
  {
    id: 6,
    title: 'Terraced Backyard Makeover',
    location: 'Suwanee, GA',
    date: 'June 2025',
    material: 'Modular Block & Sod',
    size: 'Multi-Level',
    category: 'Retaining Walls',
    image: 'https://i.imgur.com/lR45oIm.jpeg', 
    tags: ['#Landscaping', '#TerracedWalls', '#SodInstallation', '#Grading'],
    description: 'Complete backyard grading to create usable flat tiers. Integrated a modular block retaining wall system with Zeon Zoysia sod installation.'
  }
];

const filters = ['All', 'Alpharetta', 'Duluth', 'Roswell', 'Marietta', 'Johns Creek', 'Suwanee'];

export const LocalProjects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.location.includes(activeFilter));

  // Local Observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
        sectionRef.current.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [filteredProjects]);

  // Dynamic Schema Generation (Updated with Dates)
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
        "headline": `${project.title} - ${project.material}`,
        "dateCreated": project.date,
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
    <section ref={sectionRef} id="local-projects" className="pt-10 pb-24 bg-white relative">
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 fade-in-section">
          <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-sm">Case Studies</span>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl font-bold text-brand-dark">Our Work in Your Neighborhood</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Real results from recent months. Browse our portfolio of "paver installations" and "retaining walls" completed across Metro Atlanta.
          </p>
        </div>

        {/* City Filter Tabs */}
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
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 fade-in-section flex flex-col h-full"
            >
              {/* Image Header */}
              <div className="relative h-64 overflow-hidden bg-gray-100 flex-shrink-0">
                <img 
                  src={project.image} 
                  alt={`${project.title} installation in ${project.location}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Floating Location Badge */}
                <div className="absolute top-4 left-4 bg-brand-dark/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg border border-white/10">
                  <MapPin size={10} className="text-brand-gold" /> {project.location}
                </div>

                {/* Date Badge (New) */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-brand-dark px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                   <Calendar size={10} className="text-brand-gold" /> {project.date}
                </div>

                <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-2">
                  {project.category}
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-3 leading-tight group-hover:text-brand-gold transition-colors">
                  {project.title}
                </h3>
                
                {/* Tech Specs Grid (New SEO Rich Area) */}
                <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                        <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-gray-400 tracking-wider mb-1">
                            <Box size={10} /> Material
                        </span>
                        <span className="text-xs font-semibold text-brand-dark leading-tight block">
                            {project.material}
                        </span>
                    </div>
                    <div>
                        <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-gray-400 tracking-wider mb-1">
                            <Ruler size={10} /> Scope
                        </span>
                        <span className="text-xs font-semibold text-brand-dark leading-tight block">
                            {project.size}
                        </span>
                    </div>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Keyword Tags */}
                <div className="flex flex-wrap gap-2 mb-6 mt-auto" aria-label="Project Tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-medium text-gray-400 bg-white px-2 py-1 rounded-md border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>

                <a href="tel:6784287630" className="w-full mt-auto flex items-center justify-between text-xs font-bold uppercase tracking-widest text-white bg-brand-dark py-3 px-4 rounded-lg group-hover:bg-brand-gold transition-all" aria-label={`Get quote for ${project.title}`}>
                  <span>Replicate this Project</span> 
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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