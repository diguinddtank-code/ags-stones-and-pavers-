import React, { useState, useRef, useEffect } from 'react';
import { Layers, Flame, Utensils, LayoutGrid, ArrowUpRight, X, CheckCircle2, Hammer, Waves, Mountain, Ruler, ArrowRight, Box, Move3d, MousePointer2, ZoomIn } from 'lucide-react';
import { ServiceItem } from '../types';

// Updated Service Titles to match Keyword List: [driveway installation], [patio builders], [retaining wall installation]
// OPTIMIZATION: Imgur links converted to WebP (.webp) and used 'l' suffix (Large Thumbnail) for better mobile performance
const services: ServiceItem[] = [
  {
    id: '1',
    title: 'Driveway Pavers',
    description: 'Expert driveway installation contractors near you. We replace concrete with premium interlocking pavers.',
    icon: <LayoutGrid className="w-6 h-6" />,
    image: 'https://i.imgur.com/by6FzIkl.webp', // 'l' suffix = 640px max width, perfect for cards
    benefits: [
      'Best Driveway Contractors Near Me',
      'High-Load Bearing Installation',
      'Permeable & Standard Paver Options'
    ]
  },
  {
    id: '2',
    title: 'Outdoor Patio Builders',
    description: 'Leading patio contractors in your area. We design and build custom stone patios for luxury outdoor living.',
    icon: <Utensils className="w-6 h-6" />,
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
    icon: <Layers className="w-6 h-6" />,
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
    icon: <Flame className="w-6 h-6" />,
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
    icon: <Hammer className="w-6 h-6" />,
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
    icon: <Waves className="w-6 h-6" />,
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
    icon: <Mountain className="w-6 h-6" />,
    image: 'https://i.pinimg.com/474x/7b/78/34/7b783454796659d0078c289f3308445f.jpg', // Pinimg doesn't support easy resizing params, leaving as is
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
    icon: <Ruler className="w-6 h-6" />,
    image: 'https://i.ytimg.com/vi/3QhK363_d4A/hq720.jpg', // YouTube thumbnail is reasonably optimized
    benefits: [
      '3D Hardscape Design',
      'Landscapers Near Me',
      'Full Project Planning'
    ]
  }
];

// --- 3D ENGINE COMPONENT ---
const Paver3DViewer = () => {
  const [rotation, setRotation] = useState({ x: 60, z: 45 });
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastMouse.current.x;
    const deltaY = e.clientY - lastMouse.current.y;
    
    setRotation(prev => ({
      x: Math.max(0, Math.min(90, prev.x - deltaY * 0.5)), 
      z: prev.z + deltaX * 0.5
    }));
    
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation(); // Prevent page scroll
    setZoom(prev => Math.max(0.5, Math.min(2, prev - e.deltaY * 0.001)));
  };

  // Generate a procedural Herringbone pattern
  const pavers = [];
  const rows = 6;
  const cols = 6;
  
  for (let i = -rows/2; i < rows/2; i++) {
    for (let j = -cols/2; j < cols/2; j++) {
       pavers.push({ x: i * 60, y: j * 35 + (i % 2 ? 17.5 : 0), color: '#e2e8f0' });
    }
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-[#1a1a1a] relative overflow-hidden cursor-move flex items-center justify-center rounded-l-2xl md:rounded-l-none select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      role="img"
      aria-label="Interactive 3D Paver Model Viewer"
    >
       <div 
         className="relative w-0 h-0"
         style={{
            transformStyle: 'preserve-3d',
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateZ(${rotation.z}deg) scale(${zoom})`
         }}
       >
          <div 
             className="absolute bg-[#2a2a2a] border-4 border-brand-gold/30 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
             style={{
                width: '400px',
                height: '400px',
                transform: 'translate(-50%, -50%) translateZ(-10px)',
             }}
          />
          {pavers.map((p, idx) => (
             <div
               key={idx}
               className="absolute"
               style={{
                  width: '56px',
                  height: '30px',
                  transform: `translate3d(${p.x}px, ${p.y}px, 0)`,
                  transformStyle: 'preserve-3d'
               }}
             >
                <div className="absolute inset-0 bg-gray-300 border border-white/20" style={{ transform: 'translateZ(8px)' }}>
                   <div className="w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/concrete-seamless.png')]"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[8px] bg-gray-500 origin-bottom" style={{ transform: 'rotateX(-90deg)' }}></div>
                <div className="absolute right-0 top-0 h-full w-[8px] bg-gray-400 origin-right" style={{ transform: 'rotateY(90deg)' }}></div>
                <div className="absolute left-0 top-0 h-full w-[8px] bg-gray-400 origin-left" style={{ transform: 'rotateY(-90deg)' }}></div>
             </div>
          ))}
          <div 
            className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border border-brand-gold/20 rounded-full opacity-30 pointer-events-none"
            style={{ transform: 'translate(-50%, -50%)' }}
          ></div>
       </div>

       <div className="absolute bottom-6 right-6 flex flex-col gap-2 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md p-3 rounded-lg text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border border-white/10">
             <Move3d size={14} className="text-brand-gold" /> Drag to Rotate
          </div>
          <div className="bg-black/60 backdrop-blur-md p-3 rounded-lg text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border border-white/10">
             <ZoomIn size={14} className="text-brand-gold" /> Scroll to Zoom
          </div>
       </div>

       <div className="absolute top-6 left-6 pointer-events-none">
          <div className="flex items-center gap-2 text-brand-gold font-bold uppercase tracking-widest text-xs mb-1">
             <Box size={14} /> Interactive Preview
          </div>
          <h3 className="text-white font-serif text-xl">Standard Herringbone</h3>
       </div>
    </div>
  );
};

interface ServicesProps {
  onModalChange?: (isOpen: boolean) => void;
}

export const Services: React.FC<ServicesProps> = ({ onModalChange }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [show3DModel, setShow3DModel] = useState(false);

  const openModal = (service: ServiceItem) => {
    setSelectedService(service);
    setShow3DModel(false);
    document.body.style.overflow = 'hidden';
    if (onModalChange) onModalChange(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setShow3DModel(false);
    document.body.style.overflow = 'unset';
    if (onModalChange) onModalChange(false);
  };

  return (
    <section id="services" className="pt-24 pb-32 bg-slate-50 relative z-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-brand-gold/50"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20 fade-in-section">
            <div className="text-brand-gold font-bold tracking-[0.3em] uppercase mb-4 text-xs md:text-sm">
               Metro Atlanta Hardscapes
            </div>
            <h2 className="font-serif text-5xl md:text-7xl font-bold text-brand-dark leading-none">
              Services Near You
            </h2>
            <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg font-light">
               Looking for "patio contractors near me" or "paver installation"? We are Atlanta's top-rated specialists. Select a service below.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
          {services.map((service, index) => (
            <article 
              key={service.id}
              onClick={() => openModal(service)}
              className="group relative h-[450px] rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-700 fade-in-section bg-brand-dark border border-gray-200"
              itemScope
              itemType="https://schema.org/Service"
              role="listitem"
            >
              <meta itemProp="serviceType" content={service.title} />
              <div className="absolute inset-0 overflow-hidden bg-gray-900">
                <img 
                  src={service.image} 
                  alt={`${service.title} - ${service.benefits[0]}`} 
                  title={`${service.title} in Atlanta GA`}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 opacity-90" 
                  loading="lazy"
                  width="400"
                  height="600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80"></div>
                <div className="absolute inset-0 bg-brand-gold/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-20">
                <div className="flex justify-between items-start w-full">
                   <span className="font-serif text-4xl text-white/10 font-bold group-hover:text-white/20 transition-colors duration-500">
                      0{index + 1}
                   </span>
                   <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-brand-gold group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-lg">
                      {service.icon}
                   </div>
                </div>

                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                   <h3 className="text-2xl font-serif font-medium text-white mb-3 leading-tight group-hover:text-brand-gold transition-colors duration-300" itemProp="name">
                     {service.title}
                   </h3>
                   <p className="text-gray-300 text-xs leading-relaxed mb-6 opacity-90 group-hover:opacity-100 line-clamp-3" itemProp="description">
                     {service.description}
                   </p>
                   <div className="flex items-center gap-3">
                      <div className="h-px w-8 bg-white/30 group-hover:bg-brand-gold transition-colors duration-300"></div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 group-hover:text-white transition-colors flex items-center gap-2">
                        View Details <ArrowUpRight size={12} className="text-brand-gold" />
                      </span>
                   </div>
                </div>
              </div>
              <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-brand-gold/50 transition-colors duration-500 pointer-events-none"></div>
            </article>
          ))}
        </div>
      </div>

      {selectedService && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            className="absolute inset-0 bg-brand-dark/95 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]" 
            onClick={closeModal}
            aria-hidden="true"
          ></div>
          
          <div className="relative w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] animate-[scaleIn_0.4s_cubic-bezier(0.16,1,0.3,1)]">
             <button 
                onClick={closeModal} 
                className="absolute top-4 right-4 z-50 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-brand-gold transition-all"
                aria-label="Close Modal"
             >
                <X size={24} />
             </button>

             <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-black">
                {selectedService.id === '1' && show3DModel ? (
                    <Paver3DViewer />
                ) : (
                    <>
                        {/* Logic: remove the 'l' suffix to get higher res for modal, and ensure webp */}
                        <img 
                          src={selectedService.image.replace('l.webp', 'h.webp').replace('.jpg', '.webp')} 
                          alt={`Detail view of ${selectedService.title} by AGS Stones`} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute bottom-8 left-8 text-white">
                           <div className="flex items-center gap-2 mb-2 text-brand-gold font-bold uppercase tracking-widest text-xs px-3 py-1 bg-black/40 backdrop-blur-md rounded-full inline-flex">
                              {selectedService.icon} Premium Service
                           </div>
                           <h2 id="modal-title" className="text-4xl md:text-5xl font-serif font-bold leading-none">{selectedService.title}</h2>
                        </div>
                    </>
                )}

                {selectedService.id === '1' && (
                    <button
                        onClick={() => setShow3DModel(!show3DModel)}
                        className="absolute bottom-6 right-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-brand-gold hover:border-brand-gold transition-all flex items-center gap-2"
                    >
                        {show3DModel ? (
                            <> <LayoutGrid size={14} /> View Photo </>
                        ) : (
                            <> <Box size={14} /> View 3D Model </>
                        )}
                    </button>
                )}
             </div>

             <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white flex flex-col">
                <p className="text-xl text-brand-dark font-serif italic mb-6">
                  "{selectedService.description}"
                </p>
                <div className="space-y-6 mb-10">
                   <p className="text-gray-600 leading-relaxed">
                     At AGS Stones, our {selectedService.title.toLowerCase()} process is designed to meet the highest standards. 
                     Whether you are looking for "driveway pavers near me" or complex "retaining wall installation", our team provides warranty-backed craftsmanship.
                   </p>
                   <div>
                      <h4 className="font-bold text-xs uppercase tracking-widest text-brand-dark mb-4 border-b border-gray-100 pb-2">What's Included</h4>
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
                <div className="mt-auto pt-6 border-t border-gray-100">
                   <a href="tel:6784287630" className="block w-full text-center bg-brand-dark text-white py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-brand-gold transition-colors shadow-lg">
                     Get Free Quote
                   </a>
                </div>
             </div>
          </div>
        </div>
      )}
    </section>
  );
};