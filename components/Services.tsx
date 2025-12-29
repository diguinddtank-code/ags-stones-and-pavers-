import React, { useState, useRef, useEffect } from 'react';
import { Layers, Flame, Utensils, LayoutGrid, ArrowUpRight, X, CheckCircle2, Hammer, Waves, Mountain, Ruler, ArrowRight, Box, Move3d, MousePointer2, ZoomIn } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: '1',
    title: 'Custom Pavers',
    description: 'Driveways, walkways, and patios crafted with premium interlocking stones for durability and curb appeal.',
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
    description: 'Fully equipped culinary stations with BBQ islands, pizza ovens, and bars designed for entertaining.',
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
    description: 'Structural mastery to prevent erosion and create usable flat space on sloped terrains.',
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
    description: 'Custom masonry fire pits and grand fireplaces that become the warm heart of your backyard.',
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
    description: 'Multi-level wood and composite decks engineered for safety, longevity, and aesthetics.',
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
    description: 'Slip-resistant coping and pool decks designed to create a resort-style atmosphere.',
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
    title: 'Stone Veneer',
    description: 'Elegant stone facing for house exteriors, pillars, and steps to elevate architectural detail.',
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
    description: 'Comprehensive 3D planning and softscape integration to complement your stone features.',
    icon: <Ruler className="w-6 h-6" />,
    image: 'https://i.ytimg.com/vi/3QhK363_d4A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDFb-Jx8ZF4z2mEWM84aEgZIf_Xpw',
    benefits: [
      '3D Visualization Included',
      'Native & Low-Maintenance Plants',
      'Integrated Irrigation Systems'
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
      x: Math.max(0, Math.min(90, prev.x - deltaY * 0.5)), // Limit X rotation to keep it distinct
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
  
  // Logic for simple block pattern (not strictly herringbone for CSS simplicity, but staggered)
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
    >
       {/* 3D Scene Container */}
       <div 
         className="relative w-0 h-0"
         style={{
            transformStyle: 'preserve-3d',
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateZ(${rotation.z}deg) scale(${zoom})`
         }}
       >
          {/* Base Platform */}
          <div 
             className="absolute bg-[#2a2a2a] border-4 border-brand-gold/30 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
             style={{
                width: '400px',
                height: '400px',
                transform: 'translate(-50%, -50%) translateZ(-10px)',
             }}
          />

          {/* Pavers */}
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
                {/* Top Face */}
                <div className="absolute inset-0 bg-gray-300 border border-white/20" style={{ transform: 'translateZ(8px)' }}>
                   {/* Texture Noise */}
                   <div className="w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/concrete-seamless.png')]"></div>
                </div>
                {/* Side Face (South) */}
                <div className="absolute bottom-0 left-0 w-full h-[8px] bg-gray-500 origin-bottom" style={{ transform: 'rotateX(-90deg)' }}></div>
                {/* Side Face (East) */}
                <div className="absolute right-0 top-0 h-full w-[8px] bg-gray-400 origin-right" style={{ transform: 'rotateY(90deg)' }}></div>
                {/* Side Face (West) */}
                <div className="absolute left-0 top-0 h-full w-[8px] bg-gray-400 origin-left" style={{ transform: 'rotateY(-90deg)' }}></div>
             </div>
          ))}

          {/* Holographic Grid Overlay */}
          <div 
            className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border border-brand-gold/20 rounded-full opacity-30 pointer-events-none"
            style={{ transform: 'translate(-50%, -50%)' }}
          ></div>
       </div>

       {/* HUD Controls */}
       <div className="absolute bottom-6 right-6 flex flex-col gap-2 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md p-3 rounded-lg text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border border-white/10">
             <Move3d size={14} className="text-brand-gold" /> Drag to Rotate
          </div>
          <div className="bg-black/60 backdrop-blur-md p-3 rounded-lg text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border border-white/10">
             <ZoomIn size={14} className="text-brand-gold" /> Scroll to Zoom
          </div>
       </div>

       {/* Label */}
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
    // Auto-enable 3D model view for Pavers only initially
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
      {/* Decorative background line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-brand-gold/50"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20 fade-in-section">
            <h3 className="text-brand-gold font-bold tracking-[0.3em] uppercase mb-4 text-xs md:text-sm">
               World-Class Craftsmanship
            </h3>
            <h2 className="font-serif text-5xl md:text-7xl font-bold text-brand-dark leading-none">
              Our Services
            </h2>
            <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg font-light">
              We don't just install stone; we architect lifestyles. Choose a category below to explore our engineering and design standards.
            </p>
        </div>

        {/* Cinematic Grid System - Symmetrical 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={service.id}
              onClick={() => openModal(service)}
              className="group relative h-[450px] rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-700 fade-in-section bg-brand-dark border border-gray-200"
            >
              {/* Image Layer */}
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 opacity-90" 
                />
                
                {/* Permanent Gradient for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80"></div>
                
                {/* Golden Overlay on Hover */}
                <div className="absolute inset-0 bg-brand-gold/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>

              {/* Content Layer */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-20">
                
                {/* Top Bar: Number & Icon */}
                <div className="flex justify-between items-start w-full">
                   <span className="font-serif text-4xl text-white/10 font-bold group-hover:text-white/20 transition-colors duration-500">
                      0{index + 1}
                   </span>
                   
                   {/* Floating Glass Icon */}
                   <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-brand-gold group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-lg">
                      {service.icon}
                   </div>
                </div>

                {/* Bottom Bar: Text Info */}
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                   
                   <h3 className="text-2xl font-serif font-medium text-white mb-3 leading-tight group-hover:text-brand-gold transition-colors duration-300">
                     {service.title}
                   </h3>
                   
                   {/* Description */}
                   <p className="text-gray-300 text-xs leading-relaxed mb-6 opacity-90 group-hover:opacity-100 line-clamp-3">
                     {service.description}
                   </p>

                   {/* Call to Action Line */}
                   <div className="flex items-center gap-3">
                      <div className="h-px w-8 bg-white/30 group-hover:bg-brand-gold transition-colors duration-300"></div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 group-hover:text-white transition-colors flex items-center gap-2">
                        View Details <ArrowUpRight size={12} className="text-brand-gold" />
                      </span>
                   </div>
                </div>

              </div>
              
              {/* Interactive Border */}
              <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-brand-gold/50 transition-colors duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICE MODAL POPUP */}
      {selectedService && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-brand-dark/95 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]" 
            onClick={closeModal}
          ></div>
          
          <div className="relative w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] animate-[scaleIn_0.4s_cubic-bezier(0.16,1,0.3,1)]">
             
             {/* Close Button */}
             <button 
                onClick={closeModal} 
                className="absolute top-4 right-4 z-50 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-brand-gold transition-all"
             >
                <X size={24} />
             </button>

             {/* Modal Left Side: Image OR 3D Model */}
             <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-black">
                
                {/* 3D Model Logic: Only for Pavers (id: 1) */}
                {selectedService.id === '1' && show3DModel ? (
                    <Paver3DViewer />
                ) : (
                    <>
                        <img 
                          src={selectedService.image} 
                          alt={selectedService.title} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute bottom-8 left-8 text-white">
                           <div className="flex items-center gap-2 mb-2 text-brand-gold font-bold uppercase tracking-widest text-xs px-3 py-1 bg-black/40 backdrop-blur-md rounded-full inline-flex">
                              {selectedService.icon} Premium Service
                           </div>
                           <h2 className="text-4xl md:text-5xl font-serif font-bold leading-none">{selectedService.title}</h2>
                        </div>
                    </>
                )}

                {/* Toggle Button for Pavers */}
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

             {/* Modal Content */}
             <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white flex flex-col">
                
                <p className="text-xl text-brand-dark font-serif italic mb-6">
                  "{selectedService.description}"
                </p>
                
                <div className="space-y-6 mb-10">
                   <p className="text-gray-600 leading-relaxed">
                     At AGS Stones, our {selectedService.title.toLowerCase()} process is rigorous. 
                     We combine aesthetic vision with structural integrity, ensuring your investment stands the test of time and Georgia weather.
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