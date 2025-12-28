import React, { useState } from 'react';
import { Layers, Flame, Utensils, LayoutGrid, ArrowUpRight, X, CheckCircle2, Hammer, Waves, Mountain, Ruler } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: '1',
    title: 'Custom Pavers',
    description: 'Transforming driveways and walkways into grand entrances with premium interlocking stones.',
    icon: <LayoutGrid className="w-6 h-6" />,
    image: 'https://i.imgur.com/by6FzIk.png',
    benefits: [
      '5-Year Installation Warranty',
      'Wide Range of Premium Stone Options',
      'Expert Drainage Solutions'
    ]
  },
  {
    id: '2',
    title: 'Outdoor Kitchens',
    description: 'Culinary masterpieces designed for the open air. BBQ islands, pizza ovens, and full bars.',
    icon: <Utensils className="w-6 h-6" />,
    image: 'https://i.imgur.com/SIBIdiF.png',
    benefits: [
      'Weatherproof Stainless Steel Appliances',
      'Custom Granite & Stone Countertops',
      'Gas, Water & Electrical Integration'
    ]
  },
  {
    id: '3',
    title: 'Retaining Walls',
    description: 'Engineering meets aesthetics. Structural walls that carve out functional space from slopes.',
    icon: <Layers className="w-6 h-6" />,
    image: 'https://i.imgur.com/dZstK86.png',
    benefits: [
      'Structural Engineering & Stabilization',
      'Proper Drainage & Erosion Control',
      'Natural Stone & Modular Options'
    ]
  },
  {
    id: '4',
    title: 'Luxury Fireplaces',
    description: 'The heart of your backyard. Stone fireplaces and pits for year-round warmth.',
    icon: <Flame className="w-6 h-6" />,
    image: 'https://i.imgur.com/G2N5Chs.png',
    benefits: [
      'Gas & Wood Burning Configurations',
      'High-Heat Resistant Firebrick',
      'Custom Masonry & Veneer'
    ]
  },
  {
    id: '5',
    title: 'Custom Decks',
    description: 'Premium wood and composite deck building. Multi-level structures designed for entertainment.',
    icon: <Hammer className="w-6 h-6" />,
    image: 'https://i.imgur.com/6f4H9fL.png',
    benefits: [
      'Premium Pressure-Treated & Composite',
      'Code-Compliant Structural Framing',
      'Hidden Fastener Systems'
    ]
  },
  {
    id: '6',
    title: 'Pool Hardscapes',
    description: 'Slip-resistant tile work and coping. We create the perfect resort vibe around your pool.',
    icon: <Waves className="w-6 h-6" />,
    image: 'https://i.imgur.com/vEHS8LG.png',
    benefits: [
      'Slip-Resistant Safety Surfaces',
      'Seamless Coping Installation',
      'Cool-Touch Stone Technology'
    ]
  },
  {
    id: '7',
    title: 'Stone Veneer & Steps',
    description: 'Custom stone surface installation for walls, pillars, and grand staircases.',
    icon: <Mountain className="w-6 h-6" />,
    image: 'https://i.pinimg.com/474x/7b/78/34/7b783454796659d0078c289f3308445f.jpg',
    benefits: [
      'High-Adhesion Polymer Modified Mortar',
      'Moisture Barrier Protection',
      'Hand-Crafted Detailing'
    ]
  },
  {
    id: '8',
    title: 'Landscape Design',
    description: 'Complete softscape and hardscape integration. We design the flow of your entire property.',
    icon: <Ruler className="w-6 h-6" />,
    image: 'https://i.ytimg.com/vi/3QhK363_d4A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDFb-Jx8ZF4z2mEWM84aEgZIf_Xpw',
    benefits: [
      '3D Visualization Included',
      'Native & Low-Maintenance Plants',
      'Integrated Irrigation Systems'
    ]
  }
];

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const openModal = (service: ServiceItem) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'unset';
  };

  const getGridClass = (index: number) => {
    switch(index) {
      case 0: return "md:col-span-8"; 
      case 1: return "md:col-span-4"; 
      case 2: return "md:col-span-5"; 
      case 3: return "md:col-span-7"; 
      case 4: return "md:col-span-4"; 
      case 5: return "md:col-span-8"; 
      case 6: return "md:col-span-6"; 
      case 7: return "md:col-span-6"; 
      default: return "md:col-span-6";
    }
  };

  return (
    <section id="services" className="pt-32 pb-32 bg-white relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 fade-in-section">
          <div className="max-w-2xl">
            <h3 className="text-brand-gold font-bold tracking-[0.2em] uppercase mb-4 text-sm">Our Expertise</h3>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-brand-dark leading-none">
              Complete <span className="italic font-serif text-brand-gold">Outdoor Living</span> Solutions
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px] md:auto-rows-[350px]">
          {services.map((service, index) => (
            <div 
              key={service.id}
              onClick={() => openModal(service)} 
              className={`${getGridClass(index)} group relative rounded-3xl overflow-hidden cursor-pointer fade-in-section shadow-lg hover:shadow-2xl transition-all duration-500`}
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              
              <div className={`absolute inset-0 p-8 flex flex-col justify-end transition-colors duration-500 ${
                index === 1 || index === 4 ? 'bg-black/40 group-hover:bg-black/20' : 'bg-gradient-to-t from-black/90 via-black/20 to-transparent'
              }`}>
                <div className={`transition-transform duration-500 ${index === 1 || index === 4 ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}>
                   <div className="mb-2">
                      <div className={`inline-flex items-center gap-2 mb-2 ${index === 2 ? 'bg-white/10 p-2 rounded-full text-brand-gold backdrop-blur-md' : 'text-brand-gold'}`}>
                        {service.icon}
                        {(index === 0 || index === 5) && <span className="uppercase tracking-widest text-[10px] font-bold text-white/80">Top Rated</span>}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-serif text-white font-medium leading-tight">{service.title}</h3>
                   </div>
                   <div className={`overflow-hidden transition-all duration-500 ${index === 1 || index === 4 ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100'}`}>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">{service.description}</p>
                   </div>
                   <div className={`mt-4 flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-widest transition-opacity duration-300 ${index === 1 || index === 4 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      See Details <ArrowUpRight size={14} />
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICE MODAL POPUP */}
      {selectedService && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          
          {/* Backdrop with Fade In */}
          <div 
            className="absolute inset-0 bg-brand-dark/90 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]" 
            onClick={closeModal}
          ></div>
          
          {/* Modal Container with Zoom/Scale Animation */}
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] animate-[scaleIn_0.4s_cubic-bezier(0.16,1,0.3,1)]">
             
             {/* Modal Image - Slide In Effect */}
             <div className="w-full md:w-1/2 h-48 md:h-auto relative overflow-hidden group">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 animate-[slideRight_0.6s_ease-out]" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest animate-[fadeUp_0.6s_ease-out_0.2s_both]">
                  Premium Service
                </div>
             </div>

             {/* Modal Content */}
             <div className="w-full md:w-1/2 p-6 md:p-12 overflow-y-auto bg-white flex flex-col h-full">
                <div className="flex-grow">
                  <button onClick={closeModal} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10">
                    <X size={20} className="text-brand-dark" />
                  </button>
                  
                  <div className="animate-[fadeUp_0.5s_ease-out_0.1s_both]">
                    <div className="text-brand-gold mb-4 p-3 bg-brand-gold/10 rounded-full inline-block">
                        {selectedService.icon}
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-brand-dark mb-4">
                        {selectedService.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base animate-[fadeUp_0.5s_ease-out_0.2s_both]">
                    Enhance your property with our expert {selectedService.title.toLowerCase()}. 
                    At AGS Stones, we combine engineering precision with artistic design. 
                    {selectedService.description} We ensure every project meets local codes and exceeds your expectations.
                  </p>

                  <div className="space-y-3 mb-8 bg-brand-gold/5 border border-brand-gold/10 p-6 rounded-xl animate-[fadeUp_0.5s_ease-out_0.3s_both]">
                    <h4 className="font-bold text-brand-dark text-xs uppercase tracking-wider mb-2">Service Highlights</h4>
                    <ul className="space-y-2">
                      {selectedService.benefits.map((benefit, i) => (
                        <li 
                          key={i} 
                          className="flex items-start gap-3 text-brand-dark text-xs md:text-sm opacity-0 animate-[fadeUp_0.4s_ease-out_both]"
                          style={{ animationDelay: `${400 + i * 100}ms` }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" /> 
                          <span className="leading-snug">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-auto animate-[fadeUp_0.5s_ease-out_0.5s_both]">
                  <a href="tel:6784287630" onClick={closeModal} className="block w-full text-center bg-brand-dark text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors shadow-lg">
                    Get Quote for {selectedService.title}
                  </a>
                </div>
             </div>
          </div>
        </div>
      )}
    </section>
  );
};