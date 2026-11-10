import React, { useState, useRef, useEffect } from 'react';
import { Layers, Flame, Utensils, LayoutGrid, ShieldCheck, Plus, Hammer, Waves, Mountain, Ruler } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { ServiceItem } from '../types';

// Updated Service Titles to match Keyword List: [driveway installation], [patio builders], [retaining wall installation]
const services: ServiceItem[] = [
  {
    id: 'driveway-pavers',
    title: 'Driveway Pavers',
    description: 'Interlocking paver driveways planned around your home, vehicle use and site conditions.',
    icon: <LayoutGrid className="w-5 h-5" />,
    image: 'https://i.imgur.com/by6FzIkl.webp',
    benefits: [
      'Vehicle-ready base planning',
      'Permeable and standard paver options',
      'Patterns, borders and color choices'
    ],
    localLinks: [
      { name: 'Alpharetta', url: '/pavers-alpharetta-ga' },
      { name: 'Atlanta', url: '/driveway-pavers-atlanta' }
    ]
  },
  {
    id: 'outdoor-patio-builders',
    title: 'Outdoor Patio Builders',
    description: 'Paver and natural stone patios planned for dining, relaxing and everyday outdoor use.',
    icon: <Utensils className="w-5 h-5" />,
    image: 'https://i.imgur.com/SIBIdiFl.webp',
    benefits: [
      'Outdoor dining layouts',
      'Paver and natural stone choices',
      'Steps, borders and transitions'
    ],
    localLinks: [
      { name: 'Johns Creek', url: '/patio-installation-johns-creek' },
      { name: 'Duluth', url: '/paver-patio-duluth-ga' }
    ]
  },
  {
    id: 'retaining-wall-installation',
    title: 'Retaining Wall Installation',
    description: 'Retaining wall projects planned with attention to grade, drainage, access and how the yard needs to work.',
    icon: <Layers className="w-5 h-5" />,
    image: 'https://i.imgur.com/dZstK86l.webp',
    benefits: [
      'Slope and grade planning',
      'Wall system options',
      'Drainage considerations'
    ],
    localLinks: [
      { name: 'Atlanta', url: '/retaining-walls-atlanta' },
      { name: 'Roswell', url: '/hardscape-roswell-ga' }
    ]
  },
  {
    id: 'masonry-fireplaces',
    title: 'Masonry & Fireplaces',
    description: 'Stonework for outdoor kitchens, fireplaces, fire features, columns and architectural details.',
    icon: <Flame className="w-5 h-5" />,
    image: 'https://i.imgur.com/G2N5Chsl.webp',
    benefits: [
      'Outdoor fire features',
      'Stone veneer and masonry',
      'Outdoor kitchen layouts'
    ],
    localLinks: [
      { name: 'Alpharetta', url: '/stone-patio-contractors-alpharetta-ga' },
      { name: 'Smyrna', url: '/hardscaping-smyrna' }
    ]
  },
  {
    id: 'deck-builders',
    title: 'Deck Builders',
    description: 'Decks designed to connect with patios, steps and the rest of your outdoor space.',
    icon: <Hammer className="w-5 h-5" />,
    image: 'https://i.imgur.com/6f4H9fLl.webp',
    benefits: [
      'Wood and composite options',
      'Deck and patio transitions',
      'Layout for your yard'
    ],
    localLinks: [
      { name: 'Duluth', url: '/paver-patio-duluth-ga' },
      { name: 'Johns Creek', url: '/outdoor-kitchen-johns-creek-ga' }
    ]
  },
  {
    id: 'pool-deck-pavers',
    title: 'Pool Deck Pavers',
    description: 'Paver and natural stone pool surrounds with coordinated coping and clear transitions.',
    icon: <Waves className="w-5 h-5" />,
    image: 'https://i.imgur.com/vEHS8LGl.webp',
    benefits: [
      'Paver and stone options',
      'Pool coping choices',
      'Drainage and edge details'
    ],
    localLinks: [
      { name: 'Atlanta', url: '/pool-deck-pavers-atlanta' },
      { name: 'Roswell', url: '/paving-stone-contractor-roswell' }
    ]
  },
  {
    id: 'stone-veneer',
    title: 'Stone Veneer',
    description: 'Stone veneer for exterior facades, entry columns, fireplaces and other architectural features.',
    icon: <Mountain className="w-5 h-5" />,
    image: 'https://i.pinimg.com/474x/7b/78/34/7b783454796659d0078c289f3308445f.jpg',
    benefits: [
      'Exterior accents and columns',
      'Stone style and finish choices',
      'Installation details'
    ],
    localLinks: [
      { name: 'Alpharetta', url: '/pavers-alpharetta-ga' },
      { name: 'Johns Creek', url: '/paver-patio-johns-creek-ga' }
    ]
  },
  {
    id: 'landscape-design',
    title: 'Landscape Design',
    description: 'Plan hardscape layout, materials and site relationships before installation begins.',
    icon: <Ruler className="w-5 h-5" />,
    image: 'https://i.ytimg.com/vi/3QhK363_d4A/hq720.jpg',
    benefits: [
      'Layout planning',
      'Material coordination',
      'Site and access review'
    ],
    localLinks: [
      { name: 'Atlanta', url: '/hardscape-installation-atlanta' },
      { name: 'Roswell', url: '/hardscape-roswell-ga' }
    ]
  }
];

interface ServicesProps {
  onModalChange?: (isOpen: boolean) => void;
}

export const Services: React.FC<ServicesProps> = ({ onModalChange }) => {
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Dedicated Observer for Fluid Card Animation AND Section Header
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('service-card-anim')) {
             entry.target.classList.remove('opacity-0', 'translate-y-12', 'scale-95');
             entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
          } else if (entry.target.classList.contains('fade-in-section')) {
             entry.target.classList.add('is-visible');
          }
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.15, // Trigger when 15% visible
      rootMargin: '50px' // Start slightly before
    });

    // Observe Header
    if (sectionRef.current) {
        const fadeEls = sectionRef.current.querySelectorAll('.fade-in-section');
        fadeEls.forEach(el => observer.observe(el));
    }

    // Observe Cards
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.service-card-anim');
      cards.forEach(card => observer.observe(card));
    }

    return () => observer.disconnect();
  }, []);

  const openService = (service: ServiceItem) => {
    navigate(`/service/${service.id}`);
  };

  return (
    <section ref={sectionRef} id="services" className="pt-24 pb-10 relative z-20 overflow-hidden">
      
      {/* GLASSMORPHISM BACKGROUND TEXTURE */}
      <div className="absolute inset-0 bg-[#f8f9fa]">
         {/* Soft Gradient Orbs */}
         <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none"></div>
         <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16 fade-in-section">
            <div className="inline-flex items-center gap-2 border border-brand-gold/30 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md mb-6 shadow-sm">
               <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
               <span className="text-brand-dark font-bold uppercase tracking-[0.2em] text-xs">Metro Atlanta Hardscapes</span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl font-bold text-brand-dark leading-none">
              Hardscape Services
            </h2>
            <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
               Explore the types of work AGS Stones and Pavers takes on across Duluth and Metro Atlanta.
            </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" role="list">
          {services.map((service, index) => (
            <article 
              key={service.id}
              onClick={() => openService(service)}
              // Initial state: Invisible, shifted down, slightly scaled down
              className="service-card-anim group cursor-pointer opacity-0 translate-y-12 scale-95 transition-all duration-1000 ease-[cubic-bezier(0.2,1,0.3,1)]"
              // Staggered Delay for fluid wave effect
              style={{ 
                transitionDelay: `${index * 120}ms`,
                willChange: 'opacity, transform' 
              }}
              itemScope
              itemType="https://schema.org/Service"
              role="listitem"
            >
              
              {/* MOBILE LAYOUT: Vertical Immersive Card with Extra Rounding */}
              <div className="md:hidden relative h-[380px] rounded-3xl overflow-hidden shadow-lg border border-white/40 active:scale-[0.98] transition-transform duration-300">
                  {/* Image Background */}
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Top Gradient for Badge readability */}
                  <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/60 to-transparent"></div>
                  
                  {/* Bottom Gradient for Text */}
                  <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                  {/* Top Right Icon */}
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2.5 rounded-full border border-white/20 text-white shadow-lg">
                    {React.cloneElement(service.icon as React.ReactElement<any>, { size: 18 })}
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                     <span className="bg-brand-dark/75 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                        <ShieldCheck size={12} /> Paver &amp; Stone
                     </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                      <div className="flex items-center gap-2 mb-2 opacity-80">
                         <span className="text-[10px] font-bold uppercase tracking-[0.2em] border-l-2 border-brand-gold pl-2">Premium Series</span>
                      </div>
                      
                      <h3 className="font-serif text-3xl font-bold leading-none mb-3 drop-shadow-md">
                        <Link to={`/service/${service.id}`} onClick={(e) => e.stopPropagation()}>{service.title}</Link>
                      </h3>

                      {service.localLinks && (
                        <div className="flex gap-2 flex-wrap mb-3" onClick={(e) => e.stopPropagation()}>
                          {service.localLinks.map((link) => (
                            <a href={link.url} onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(link.url); }} key={link.url} className="text-[10px] uppercase font-bold text-brand-gold bg-black/40 px-2 py-1 rounded-md border border-white/10 hover:bg-brand-gold hover:text-white transition-colors cursor-pointer">
                              {link.name}
                            </a>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
                         <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Tap to View</span>
                         <div className="bg-white/20 p-1.5 rounded-full">
                            <Plus size={16} />
                         </div>
                      </div>
                  </div>
              </div>


              {/* DESKTOP LAYOUT: "Immersive Vertical Glass" with Extra Rounding */}
              <div className="hidden md:block relative h-[500px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-brand-dark transform hover:-translate-y-2 border border-white/5">
                
                {/* VALUE BADGE - DESKTOP */}
                <div className="absolute top-6 left-6 z-30 bg-white/80 backdrop-blur-md text-brand-dark px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md flex items-center gap-1.5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100 border border-white/50">
                    <ShieldCheck size={12} className="text-brand-gold" /> Paver &amp; Stone
                </div>

                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 opacity-90" 
                    loading="lazy"
                  />
                  {/* Base Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90"></div>
                  
                  {/* Gold Sheen on Hover */}
                  <div className="absolute inset-0 bg-brand-gold/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                   
                   {/* Top Number */}
                   <div className="absolute top-8 right-8 text-white/10 font-serif text-6xl font-bold transition-all duration-500 group-hover:text-white/20 group-hover:scale-110 select-none">
                      0{index + 1}
                   </div>

                   {/* Icon - Glass Effect */}
                   <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white mb-6 group-hover:bg-brand-gold group-hover:border-brand-gold group-hover:scale-110 transition-all duration-500 shadow-lg origin-bottom-left">
                      {React.cloneElement(service.icon as React.ReactElement<any>, { size: 24 })}
                   </div>

                   {/* Text Block */}
                   <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                      <h3 className="text-2xl lg:text-3xl font-serif text-white font-medium mb-3 leading-tight group-hover:text-brand-gold transition-colors">
                        <Link to={`/service/${service.id}`} onClick={(e) => e.stopPropagation()}>{service.title}</Link>
                      </h3>
                      
                      <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                          {service.description}
                        </p>
                        {service.localLinks && (
                          <div className="flex gap-2 flex-wrap mb-6" onClick={(e) => e.stopPropagation()}>
                            {service.localLinks.map((link) => (
                              <a href={link.url} onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(link.url); }} key={link.url} className="text-[10px] uppercase font-bold text-brand-dark bg-brand-gold px-2 py-1 rounded-[4px] hover:bg-white transition-colors cursor-pointer">
                                {link.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 pt-4 border-t border-white/10 group-hover:border-brand-gold/50 transition-colors">
                         <span className="text-xs font-bold uppercase tracking-widest text-white group-hover:text-brand-gold transition-colors">Explore</span>
                         <div className="w-8 h-px bg-white/50 group-hover:w-16 group-hover:bg-brand-gold transition-all duration-500"></div>
                      </div>
                   </div>
                </div>

                {/* Border Hover Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-gold/30 rounded-3xl transition-colors duration-500 pointer-events-none"></div>
              </div>

            </article>
          ))}
        </div>
        
      {/* CLOSED THE MISSING CONTAINER DIV HERE */}
      </div> 

    </section>
  );
};
