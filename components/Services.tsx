import React, { useState, useRef, useEffect } from 'react';
import { Layers, Flame, Utensils, LayoutGrid, ArrowUpRight, X, CheckCircle2, Hammer, Waves, Mountain, Ruler, ArrowRight, MousePointer2, ZoomIn, ChevronRight, ShieldCheck, Plus, Star } from 'lucide-react';
import { ServiceItem } from '../types';

// Updated Service Titles to match Keyword List: [driveway installation], [patio builders], [retaining wall installation]
const services: ServiceItem[] = [
  {
    id: '1',
    title: 'Driveway Pavers',
    description: 'Expert driveway installation contractors near you. We replace concrete with premium interlocking pavers.',
    icon: <LayoutGrid className="w-5 h-5" />,
    image: 'https://i.imgur.com/by6FzIkl.webp',
    benefits: [
      'Best Driveway Contractors Near Me',
      'High-Load Bearing Installation',
      'Permeable & Standard Paver Options',
      'Wide Range of Premium Stone Options'
    ]
  },
  {
    id: '2',
    title: 'Outdoor Patio Builders',
    description: 'Leading patio contractors in your area. We design and build custom stone patios for luxury outdoor living.',
    icon: <Utensils className="w-5 h-5" />,
    image: 'https://i.imgur.com/SIBIdiFl.webp',
    benefits: [
      'Custom Outdoor Kitchen Builders',
      'Patio Paver Companies Near Me',
      'Granite & Stone Fabrication'
    ]
  },
  {
    id: '3',
    title: 'Retaining Wall Installation',
    description: 'Certified retaining wall contractors near you. We fix erosion and level yards with engineered stone walls.',
    icon: <Layers className="w-5 h-5" />,
    image: 'https://i.imgur.com/dZstK86l.webp',
    benefits: [
      'Structural Masonry Contractors',
      'Landscape Wall Installation',
      'Drainage & Erosion Solutions'
    ]
  },
  {
    id: '4',
    title: 'Masonry & Fireplaces',
    description: 'Skilled stone work contractors near you. Custom stone masonry for fire pits, columns, and veneers.',
    icon: <Flame className="w-5 h-5" />,
    image: 'https://i.imgur.com/G2N5Chsl.webp',
    benefits: [
      'Outdoor Fireplace Builders',
      'Stone Masonry Company',
      'Veneer & Natural Stone'
    ]
  },
  {
    id: '5',
    title: 'Deck Builders',
    description: 'Professional deck builders near me. Composite and wood decking integrated with stone hardscapes.',
    icon: <Hammer className="w-5 h-5" />,
    image: 'https://i.imgur.com/6f4H9fLl.webp',
    benefits: [
      'Composite & Wood Decking',
      'Structural Framing',
      'Under-Deck Drainage Systems'
    ]
  },
  {
    id: '6',
    title: 'Pool Deck Pavers',
    description: 'Specialized pavers for pool decks. Slip-resistant coping and resort-style hardscapes.',
    icon: <Waves className="w-5 h-5" />,
    image: 'https://i.imgur.com/vEHS8LGl.webp',
    benefits: [
      'Slip-Resistant Travertine',
      'Pool Coping Installation',
      'Cool-Touch Technology'
    ]
  },
  {
    id: '7',
    title: 'Stone Veneer',
    description: 'Enhance your home with stone veneer. The best local masonry companies for architectural facing.',
    icon: <Mountain className="w-5 h-5" />,
    image: 'https://i.pinimg.com/474x/7b/78/34/7b783454796659d0078c289f3308445f.jpg',
    benefits: [
      'House Facing & Columns',
      'Stone Work Contractors',
      'Polymer Modified Mortar'
    ]
  },
  {
    id: '8',
    title: 'Landscape Design',
    description: 'Advanced landscape services and 3D design. We visualize your hardscape before we build.',
    icon: <Ruler className="w-5 h-5" />,
    image: 'https://i.ytimg.com/vi/3QhK363_d4A/hq720.jpg',
    benefits: [
      '3D Hardscape Design',
      'Landscapers Near Me',
      'Full Project Planning'
    ]
  }
];

interface ServicesProps {
  onModalChange?: (isOpen: boolean) => void;
}

export const Services: React.FC<ServicesProps> = ({ onModalChange }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
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

  const openModal = (service: ServiceItem) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
    if (onModalChange) onModalChange(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'unset';
    if (onModalChange) onModalChange(false);
  };

  return (
    <section ref={sectionRef} id="services" className="pt-24 pb-10 relative z-20 overflow-hidden">
      
      {/* GLASSMORPHISM BACKGROUND TEXTURE */}
      <div className="absolute inset-0 bg-[#f8f9fa]">
         {/* Subtle Concrete Texture */}
         <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/concrete-seamless.png")` }}></div>
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
              Services Near You
            </h2>
            <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
               Craftsmanship that defines luxury. Select a category below to explore our "paver installation" and design capabilities.
            </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" role="list">
          {services.map((service, index) => (
            <article 
              key={service.id}
              onClick={() => openModal(service)}
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
                     <span className="bg-brand-gold text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                        <ShieldCheck size={12} /> 1-Yr Warranty
                     </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                      <div className="flex items-center gap-2 mb-2 opacity-80">
                         <span className="text-[10px] font-bold uppercase tracking-[0.2em] border-l-2 border-brand-gold pl-2">Premium Series</span>
                      </div>
                      
                      <h3 className="font-serif text-3xl font-bold leading-none mb-3 drop-shadow-md">
                        {service.title}
                      </h3>
                      
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
                    <ShieldCheck size={12} className="text-brand-gold" /> Warranty Protected
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
                        {service.title}
                      </h3>
                      
                      <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                        <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
                          {service.description}
                        </p>
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

      {/* MODAL */}
      {selectedService && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-lg animate-[fadeIn_0.3s_ease-out]" 
            onClick={closeModal}
            aria-hidden="true"
          ></div>
          
          <div className="relative w-full max-w-6xl bg-white/90 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] animate-[scaleIn_0.4s_cubic-bezier(0.16,1,0.3,1)] border border-white/50">
             <button 
                onClick={closeModal} 
                className="absolute top-4 right-4 z-50 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-brand-gold transition-all"
                aria-label="Close Modal"
             >
                <X size={24} />
             </button>

             <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-black">
                <img 
                  src={selectedService.image.includes('imgur') ? selectedService.image.replace('l.webp', 'h.webp') : selectedService.image} 
                  alt={`Detail view of ${selectedService.title}`} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-8 left-8 text-white">
                   <div className="flex items-center gap-2 mb-2 text-brand-gold font-bold uppercase tracking-widest text-xs px-3 py-1 bg-black/40 backdrop-blur-md rounded-full inline-flex border border-white/10">
                      {selectedService.icon} Premium Service
                   </div>
                   <h2 id="modal-title" className="text-4xl md:text-5xl font-serif font-bold leading-none">{selectedService.title}</h2>
                </div>
             </div>

             <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col">
                <p className="text-xl text-brand-dark font-serif italic mb-6">
                  "{selectedService.description}"
                </p>
                <div className="space-y-6 mb-10">
                   <p className="text-gray-600 leading-relaxed">
                     At AGS Stones, our {selectedService.title.toLowerCase()} process is designed to meet the highest standards. 
                     Whether you are looking for "driveway pavers near me" or complex "retaining wall installation", our team provides warranty-backed craftsmanship.
                   </p>
                   <div>
                      <h4 className="font-bold text-xs uppercase tracking-widest text-brand-dark mb-4 border-b border-gray-200 pb-2">What's Included</h4>
                      <ul className="space-y-3">
                        {selectedService.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-700">
                             <div className="mt-1 w-5 h-5 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="w-3 h-3 text-brand-gold" />
                             </div>
                             <span className="text-sm font-medium">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>
                <div className="mt-auto pt-6 border-t border-gray-200">
                   <a href="tel:6784287630" className="block w-full text-center bg-brand-dark text-white py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-brand-gold transition-colors shadow-lg">
                     Get Free Quote
                   </a>
                </div>
             </div>
          </div>
        </div>
      )}
    </section>