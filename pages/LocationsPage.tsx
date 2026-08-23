import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, ArrowRight, ShieldCheck, HardHat, Compass, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const locations = [
  { id: 'alpharetta', name: 'Alpharetta, GA', lat: '34.0754', lng: '-84.2941', desc: 'Custom golf club estates & high-end interlocking modular driveways.' },
  { id: 'johns-creek', name: 'Johns Creek, GA', lat: '34.0289', lng: '-84.1986', desc: 'Country club estate luxury, outdoor kitchens & massive structured patios.' },
  { id: 'sandy-springs', name: 'Sandy Springs, GA', lat: '33.9304', lng: '-84.3733', desc: 'Wooded terraced yards, erosion control & structural retaining walls.' },
  { id: 'buckhead', name: 'Buckhead, GA', lat: '33.8398', lng: '-84.3796', desc: 'Mansion hardscapes, level grading & sweeping driveway redesigns.' },
  { id: 'roswell', name: 'Roswell, GA', lat: '34.0232', lng: '-84.3616', desc: 'Restored historic properties matching natural stone and cobblestone styles.' },
  { id: 'atlanta', name: 'Atlanta, GA', lat: '33.7490', lng: '-84.3880', desc: 'Intown slope stabilization, retaining block columns & cool-touch pool decks.' },
  { id: 'duluth', name: 'Duluth, GA', lat: '34.0029', lng: '-84.1446', desc: 'Our flagship service boundary. Year-round outdoor living & paver patios.' },
  { id: 'suwanee', name: 'Suwanee, GA', lat: '34.0515', lng: '-84.0714', desc: 'Multi-generational fire pits, travertine and robust ground grading.' },
  { id: 'marietta', name: 'Marietta, GA', lat: '33.9526', lng: '-84.5499', desc: 'Erosion containment & heavy-load retaining grids across large lots.' },
  { id: 'smyrna', name: 'Smyrna, GA', lat: '33.8839', lng: '-84.5143', desc: 'Complete yard leveling, masonry steps, and flat backyard conversions.' }
];

const servicePrefixes = [
  { prefix: 'driveway-pavers', label: 'Driveway Pavers', icon: <Layers className="text-brand-gold w-4 h-4" /> },
  { prefix: 'stone-patios', label: 'Stone Patios', icon: <MapPin className="text-brand-gold w-4 h-4" /> },
  { prefix: 'retaining-walls', label: 'Retaining Walls', icon: <HardHat className="text-brand-gold w-4 h-4" /> },
  { prefix: 'outdoor-kitchens', label: 'Outdoor Kitchens', icon: <Compass className="text-brand-gold w-4 h-4" /> }
];

export const LocationsPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div className="font-sans antialiased text-white bg-brand-dark min-h-screen flex flex-col">
      <SEO 
        title="Service Areas | AGS Stones Hardscaping Across Metro Atlanta" 
        description="Find our elite hardscaping, paving, and outdoor kitchen services across Alpharetta, Johns Creek, Atlanta, Roswell, Duluth, and Smyrna."
        url="https://agsstonesandpavers.com/service-areas"
      />
      
      <Header />
      
      <main className="flex-grow pb-0">
        {/* Full Bleed Photographic Hero */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden py-32">
          <motion.div 
             className="absolute inset-0 w-full h-full"
             style={{ y: yHero, opacity: opacityHero }}
          >
             <div className="absolute inset-0 bg-black/60 z-10" />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-100 z-10" />
             <img 
               src="https://i.imgur.com/h3NCvta.jpeg" 
               alt="AGS Stones Local Projects" 
               className="w-full h-full object-cover scale-105"
             />
          </motion.div>
          
          <div className="relative z-20 max-w-4xl mx-auto px-4 text-center mt-12 md:mt-20">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             >
                <div className="flex justify-center mb-6">
                   <div className="flex items-center gap-3 bg-brand-dark/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-xl">
                      <MapPin size={14} className="text-brand-gold animate-bounce" />
                      <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">Metro Atlanta Coverage</span>
                   </div>
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 tracking-tighter leading-[1.1] drop-shadow-xl">
                  Our Service <br />
                  <span className="text-gray-300">Areas.</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed shadow-sm">
                  Commanding the northern Metro Atlanta suburbs with premium hardscapes. Select your region below to see specialized local services.
                </p>
             </motion.div>
          </div>
        </section>

        {/* --- LOCAL SEO SECTION REPLACING THE OLD GRID --- */}
        <section id="local-coverage" className="py-24 bg-brand-dark/95 text-white relative overflow-hidden z-30 -mt-10 rounded-t-[3rem] border-t border-white/5 pb-24">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            
            {/* Section Header */}
            <div className="max-w-3xl mb-16">
              <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-xs mb-4 block flex items-center gap-2">
                <span className="w-6 h-px bg-brand-gold"></span> 100% Local Precision Coverage
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight mb-6 leading-tight">
                Our Neighborhood <span className="italic font-normal text-brand-gold">Footprint</span>
              </h2>
              <p className="text-gray-350 text-lg font-light leading-relaxed">
                We operate fully equipped hardscaping and masonry crews in each city below. 
                By adhering strictly to high-compaction ground leveling and structural block engineering, 
                we provide <strong className="text-white font-medium">elite outdoor living spaces</strong> guaranteed against shifting across North Metro Atlanta.
              </p>
            </div>

            {/* Interactive Coverage Hub */}
            <div className="mb-16">
              
              {/* 1. Mobile & Tablet Layout (Stacked Accordion Cards) */}
              <div className="lg:hidden space-y-3">
                {locations.map((loc) => {
                  const isActive = selectedLocation.id === loc.id;
                  return (
                    <div 
                      key={loc.id}
                      className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
                        isActive 
                          ? 'bg-slate-900/60 border-brand-gold/40 shadow-2xl shadow-brand-gold/5' 
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <button
                        onClick={() => setSelectedLocation(loc)}
                        className="w-full text-left p-5 flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                            isActive ? 'bg-brand-gold text-brand-dark' : 'bg-white/5 text-gray-400'
                          }`}>
                            <MapPin size={18} />
                          </div>
                          <div>
                            <span className="font-bold text-base text-white block">{loc.name}</span>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-brand-gold/70 block mt-0.5">Active Service Boundary</span>
                          </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/5 text-brand-gold transition-transform duration-300 ${
                          isActive ? 'rotate-90 bg-brand-gold/20' : ''
                        }`}>
                          <ArrowRight size={14} />
                        </div>
                      </button>

                      {/* Expanded Section on Active */}
                      {isActive && (
                        <div className="px-5 pb-6 pt-1 border-t border-white/5 bg-black/20">
                          <p className="text-gray-300 text-sm font-light mb-6 leading-relaxed">
                            {loc.desc} Our local crews evaluate soil composition, grade land perfectly for water runoff, and ensure a pristine interlocking surface that will not settle or crack under Georgia's heavy rains.
                          </p>
                          
                          <div className="space-y-3">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-brand-gold block mb-2">Direct Local Portals:</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {servicePrefixes.map(({ prefix, label, icon }) => {
                                const hrefLink = `/${prefix}-${loc.id}-ga`;
                                return (
                                  <Link
                                    key={prefix}
                                    to={hrefLink}
                                    className="flex items-center gap-3 p-3.5 bg-white/5 border border-white/10 rounded-xl hover:border-brand-gold/30 hover:bg-white/10 transition-all duration-300"
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                                      {icon}
                                    </div>
                                    <div className="text-left">
                                      <span className="text-xs font-bold text-white block">{label}</span>
                                      <span className="text-[8px] text-gray-400 font-light block">Launch Design Portal</span>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 2. Desktop Layout (Elite Split-Pane interactive Hub) */}
              <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* List of Cities on left */}
                <div className="lg:col-span-5 space-y-2">
                  <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-4">Select Your Metro Area</h3>
                  <div className="grid grid-cols-1 gap-2 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
                    {locations.map((loc) => {
                      const isActive = selectedLocation.id === loc.id;
                      return (
                        <button
                          key={loc.id}
                          onClick={() => setSelectedLocation(loc)}
                          className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                            isActive 
                              ? 'bg-slate-900 border-brand-gold/40 text-white shadow-xl shadow-brand-gold/5' 
                              : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                              isActive ? 'bg-brand-gold text-brand-dark font-bold' : 'bg-white/5 text-gray-500'
                            }`}>
                              <MapPin size={16} />
                            </div>
                            <div className="flex-grow">
                              <span className="font-bold text-sm block">{loc.name}</span>
                              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block truncate max-w-[220px]">{loc.desc}</span>
                            </div>
                          </div>
                          <ArrowRight size={14} className={`shrink-0 transition-transform duration-300 text-brand-gold ${
                            isActive ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-50 group-hover:translate-x-0 group-hover:opacity-100'
                          }`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic local details and link matrix on right */}
                <div id="location-details-panel" className="lg:col-span-7 bg-slate-900/40 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden h-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] scroll-mt-24">
                  <div className="absolute top-0 right-0 p-8 text-white/5 text-7xl font-serif select-none pointer-events-none font-bold opacity-20 tracking-tighter">
                    {selectedLocation.id.toUpperCase().substring(0, 3)}
                  </div>

                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                    <ShieldCheck size={12} /> Active Dedicated Installers
                  </span>

                  <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                    Premium Upgrades in <br />
                    <span className="text-brand-gold">{selectedLocation.name}</span>
                  </h3>
                  
                  <p className="text-gray-300 text-base font-light mb-10 leading-relaxed max-w-lg">
                    {selectedLocation.desc} Our local crews evaluate soil composition, grade land perfectly for water runoff, and ensure a pristine interlocking surface that will not settle or crack under Georgia's heavy rains.
                  </p>

                  {/* Link Permutations Matrix */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-gold border-b border-white/5 pb-2 mb-4">
                      Launch Local Design Portal:
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                      {servicePrefixes.map(({ prefix, label, icon }) => {
                        const hrefLink = `/${prefix}-${selectedLocation.id}-ga`;
                        return (
                          <Link
                            key={prefix}
                            to={hrefLink}
                            className="group flex flex-col justify-between p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-brand-gold/30 hover:bg-white/10 hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-center gap-2 mb-3">
                              {icon}
                              <span className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors">{label}</span>
                            </div>
                            <span className="text-xs text-gray-400 font-light mb-5 text-left leading-relaxed">
                              Explore layouts & structural options for {selectedLocation.name}.
                            </span>
                            <div className="flex items-center gap-2 text-[10px] uppercase text-brand-gold font-bold mt-auto self-start tracking-wider">
                              <span>Browse Service</span>
                              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* The Absolute SEO authority grid */}
            <div className="border-t border-white/10 mt-20 pt-16">
              <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mb-8 text-center">
                Complete Northern Georgia Service Area Index & Core Slugs
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-6 text-xs">
                {locations.map((loc) => (
                  <div key={loc.id} className="space-y-3 lg:border-r border-white/10 last:border-0 pr-4">
                    <span className="text-white font-bold block truncate pb-2 border-b border-white/5 mb-4 text-sm">{loc.name.split(',')[0]}</span>
                    <ul className="space-y-3">
                      {servicePrefixes.map(({ prefix, label }) => {
                        return (
                          <li key={prefix}>
                            <Link 
                              to={`/${prefix}-${loc.id}-ga`}
                              className="text-gray-400 hover:text-brand-gold transition-colors block truncate hover:underline"
                              title={`${label} in ${loc.name}`}
                            >
                              {label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
        
        {/* Contact replaces basic CTA */}
        <Contact />

      </main>
      
      <Footer />
    </div>
  );
};
