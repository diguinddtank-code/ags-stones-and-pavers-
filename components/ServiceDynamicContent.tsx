import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Phone, CheckCircle2, Shield, Star, Clock, ArrowRight, MapPin, Award } from 'lucide-react';

// Analytics tracking helpers
const trackCallClick = () => {
  if (typeof window !== 'undefined') {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: 'AW-XXXXXXXXX/call_conversion',
        event_category: 'Contact',
        event_label: 'Mobile Sticky Footer Call'
      });
    }
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Contact');
    }
  }
};

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ServiceData {
  id: string;
  name: string;
  heroImage: string;
  heroSubtitle: string;
  overviewHeading: string;
  overviewParagraphs: string[];
  parallaxImage: string;
  parallaxQuote: string;
  process: ProcessStep[];
}

interface Props {
  data: ServiceData;
}

export const ServiceDynamicContent: React.FC<Props> = ({ data }) => {
  const { scrollY } = useScroll();
  const [showStickyFooter, setShowStickyFooter] = useState(false);

  // Parallax calculations
  const yHero = useTransform(scrollY, [0, 1000], [0, 300]);
  const yParallax = useTransform(scrollY, [0, 2000], [0, -300]);

  useEffect(() => {
    const handleScroll = (latest: number) => {
      if (latest > 500) {
        setShowStickyFooter(true);
      } else {
        setShowStickyFooter(false);
      }
    };
    
    // Subscribe to scroll changes
    const unsubscribe = scrollY.on("change", handleScroll);
    return () => unsubscribe();
  }, [scrollY]);

  // Framer motion variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <div className="bg-white overflow-hidden selection:bg-brand-gold selection:text-white">
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: yHero }}
          className="absolute inset-0 z-0 origin-top"
        >
           <img 
              src={data.heroImage} 
              alt={data.name} 
              className="w-full h-full object-cover brightness-[0.35]"
           />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/40 z-0"></div>

        {/* Floating Badges */}
        <motion.div 
           animate={{ y: [0, -15, 0] }} 
           transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
           className="absolute top-32 md:top-1/4 left-4 lg:left-20 z-20 hidden md:flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-white shadow-2xl"
        >
          <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center">
            <MapPin className="text-white" size={20} />
          </div>
          <div className="text-left hidden sm:block">
             <p className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Serving Region</p>
             <p className="text-sm font-bold">Metro Atlanta</p>
          </div>
        </motion.div>

        <motion.div 
           animate={{ y: [0, 15, 0] }} 
           transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
           className="absolute bottom-32 md:bottom-1/4 right-4 lg:right-20 z-20 hidden md:flex items-center gap-3 bg-black/40 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/10 text-white shadow-2xl"
        >
           <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-dark">
              <Award size={20} />
           </div>
           <div className="text-left hidden sm:block">
              <p className="text-[10px] uppercase tracking-widest text-white/70 font-bold">#1 Rated</p>
              <p className="text-sm font-bold">Local Experts</p>
           </div>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10 md:mt-20"
        >
          <motion.h2 variants={fadeUp} className="text-brand-gold uppercase tracking-[0.3em] text-sm md:text-base font-bold mb-4">
             {data.heroSubtitle}
          </motion.h2>
          <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-tight mb-8">
             {data.name}
          </motion.h1>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link to="/quote" className="w-full sm:w-auto px-8 py-4 bg-brand-gold text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-brand-dark transition-colors duration-300 outline-none flex items-center justify-center gap-2 group">
               Get Your Free Estimate <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </Link>
             <a href="#process" className="w-full sm:w-auto px-8 py-4 border border-white/30 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors duration-300 outline-none">
               See Our Process
             </a>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm font-medium">
             <span className="flex items-center gap-2"><Shield size={16} className="text-brand-gold" /> Fully Licensed & Insured</span>
             <span className="flex items-center gap-2"><Star size={16} className="text-brand-gold" /> 5-Star Rated Craftsmen</span>
             <span className="flex items-center gap-2"><Clock size={16} className="text-brand-gold" /> Free 3D Design Consult</span>
          </motion.div>
        </motion.div>
      </section>

      {/* OVERVIEW SECTION (Negative Space & Typography) */}
      <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto border-b border-gray-100 relative overflow-hidden">
         {/* Decorative background element */}
         <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-gold/5 blur-[100px] rounded-full pointer-events-none"></div>

         <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-12 lg:gap-24 relative z-10"
         >
            <div className="md:w-5/12 space-y-6">
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.2 }}
                 className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest text-brand-dark"
               >
                  <Star className="w-4 h-4 text-brand-gold fill-brand-gold" /> Premium Service
               </motion.div>
               <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark font-medium leading-[1.1] tracking-tight">
                  {data.overviewHeading}
               </h2>
               
               <div className="hidden md:block pt-8">
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-[1px] bg-brand-gold"></div>
                     <span className="text-sm font-bold uppercase tracking-widest text-[#8c98a4]">Atlanta's Choice</span>
                  </div>
               </div>
            </div>
            
            <div className="md:w-7/12 space-y-6 text-lg md:text-xl text-[#4a5568] font-sans leading-relaxed md:pt-14 relative">
               {/* Vertical decorative line */}
               <div className="hidden md:block absolute left-[-3rem] top-14 bottom-0 w-[1px] bg-gradient-to-b from-brand-gold/50 to-transparent"></div>
               
               {data.overviewParagraphs.map((p, idx) => (
                 <motion.p 
                   key={idx}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.3 + (idx * 0.1) }}
                 >
                   {p}
                 </motion.p>
               ))}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.6 }}
                 className="pt-8"
               >
                 <Link to="/quote" className="inline-flex items-center gap-3 font-bold text-brand-dark uppercase tracking-widest text-sm hover:text-brand-gold transition-colors group">
                    <span className="border-b border-brand-dark group-hover:border-brand-gold pb-1 transition-colors">Schedule a Consultation</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform text-brand-gold" />
                 </Link>
               </motion.div>
            </div>
         </motion.div>
      </section>

      {/* WHY CHOOSE US / TRUST SECTION */}
      <section className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 md:gap-16">
            {[
              { icon: Shield, title: "No Subcontractors", desc: "We use our own in-house crews. This guarantees quality control and keeps your project strictly on schedule." },
              { icon: Star, title: "Premium Materials", desc: "We source only the highest-grade stone, pavers, and base materials, ensuring your outdoor space withstands the elements and regular use." },
              { icon: CheckCircle2, title: "Flawless Execution", desc: "From precise base excavation to the final sweep of polymeric sand, we never rush the process or cut corners." }
            ].map((trust, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: 0.15 * idx }}
                 className="flex flex-col items-start space-y-5 relative group"
               >
                  <div className="w-16 h-16 bg-[#f8f9fa] rounded-2xl flex items-center justify-center text-brand-gold mb-2 group-hover:bg-brand-gold group-hover:text-white transition-colors duration-500">
                     <trust.icon size={28} />
                  </div>
                  <h4 className="font-bold text-brand-dark text-2xl group-hover:text-brand-gold transition-colors duration-300">{trust.title}</h4>
                  <p className="text-[#4a5568] leading-relaxed text-base md:text-lg">
                     {trust.desc}
                  </p>
               </motion.div>
            ))}
         </div>
      </section>

      {/* PARALLAX BREAK & QUOTE */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center px-4 bg-brand-dark">
         <motion.div 
           style={{ y: yParallax }}
           className="absolute inset-x-0 -top-[30%] -bottom-[30%] z-0"
         >
           <img 
              src={data.parallaxImage} 
              alt="Quality Craftsmanship" 
              className="w-full h-full object-cover brightness-[0.25]"
           />
         </motion.div>
         
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative z-10 max-w-4xl mx-auto text-center"
         >
           <span className="block text-brand-gold text-7xl font-serif leading-none mb-2">"</span>
           <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl text-white leading-tight font-medium max-w-3xl mx-auto">
             {data.parallaxQuote}
           </h3>
         </motion.div>
      </section>

      {/* TIMELINE / PROCESS */}
      <section id="process" className="py-24 md:py-40 px-6 bg-gray-50 overflow-hidden relative">
         <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center mb-16 md:mb-28"
            >
               <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Proven Methodology</span>
               <h2 className="font-serif text-4xl md:text-6xl text-brand-dark font-medium mb-6">Our Process</h2>
               <p className="text-[#8c98a4] max-w-2xl mx-auto text-lg md:text-xl">
                  No guesswork. Just a proven process that delivers your dream outdoor space on time and done right the first time.
               </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8 md:gap-12 relative">
               {/* Connecting Line */}
               <div className="hidden md:block absolute top-[45px] left-[12%] right-[12%] h-[2px] bg-brand-gold/20 z-0"></div>

               {data.process.map((step, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 40 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.8, delay: idx * 0.2 }}
                   className="relative z-10 flex flex-col items-center text-center group"
                 >
                    <div className="w-24 h-24 bg-white shadow-xl rounded-full flex flex-col items-center justify-center text-brand-gold font-bold font-serif text-3xl mb-8 relative transition-transform duration-500 group-hover:-translate-y-2 border border-[#eef0f2]">
                       <span className="relative z-10">{idx + 1}</span>
                       <span className="text-[10px] uppercase font-sans tracking-widest text-[#8c98a4] absolute bottom-4">Step</span>
                       {/* Hover ripple */}
                       <div className="absolute inset-0 rounded-full border-2 border-brand-gold/40 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700"></div>
                    </div>
                    <h4 className="font-bold text-brand-dark text-xl md:text-2xl mb-4 group-hover:text-brand-gold transition-colors">{step.title}</h4>
                    <p className="text-[#4a5568] text-base leading-relaxed max-w-[280px]">{step.description}</p>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* REGIONAL ARCHITECTURAL SHOWCASES & CONTEXTUAL INTERNAL LINKING */}
      <section className="py-24 md:py-36 px-6 bg-white overflow-hidden relative border-t border-gray-100">
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
         <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-left mb-16 md:mb-24"
            >
               <span className="text-brand-gold font-bold tracking-[0.25em] uppercase text-xs mb-3 block font-mono">
                  [ Neighborhood Case Files & Regional Indexes ]
               </span>
               <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-brand-dark font-medium mb-6 tracking-tight leading-tight">
                  Regional Architectural Expertise
               </h2>
               <p className="text-[#8c98a4] max-w-3xl text-lg md:text-xl font-sans leading-relaxed">
                  We build structures engineered to outlast our lifetimes. Explore custom residential portfolios and hyper-local blueprints designed specifically to survive Georgia's unique environmental conditions.
               </p>
            </motion.div>

            {/* Link Cards Bento Block */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
               {(() => {
                  interface NeighborhoodLink {
                     title: string;
                     url: string;
                     badge: string;
                     description: string;
                  }

                  const showcasesDb: Record<string, NeighborhoodLink[]> = {
                     'driveway-pavers': [
                        {
                           title: 'Alpharetta GA Custom Driveways',
                           url: '/driveways-pavers-alpharetta-ga',
                           badge: 'ARCHITECTURAL RESIDENCE',
                           description: 'Explore high-end interlocking stone designs built to satisfy Alpharetta\'s premium neighborhood covenants and heavy Georgia clays.'
                        },
                        {
                           title: 'Atlanta Driveway Paver Installation',
                           url: '/driveway-pavers-atlanta',
                           badge: 'METRO GRADE EXCELLENCE',
                           description: 'Zero cracks. Engineered base. Settle-free paver solutions replacing failing, cracked poured concrete driveways across Atlanta.'
                        },
                        {
                           title: 'Atlanta Regional Retaining Walls',
                           url: '/retaining-walls-atlanta',
                           badge: 'SLOPE SECURITY',
                           description: 'Incorporate certified structural block walls with proper hydraulic relief behind heavy sloped parking or entry sections.'
                        }
                     ],
                     'driveways-pavers-alpharetta-ga': [
                        {
                           title: 'Johns Creek Outdoor Kitchens',
                           url: '/outdoor-kitchen-johns-creek-ga',
                           badge: 'RESORT COOKING STATIONS',
                           description: 'Complete high-performance backyard entertainment hubs built with hand-set stone veneer and customized granite layouts in Johns Creek.'
                        },
                        {
                           title: 'Atlanta Retaining Wall Stabilization',
                           url: '/retaining-walls-atlanta',
                           badge: 'STRUCTURAL EROSION CONTROL',
                           description: 'Prevent local land loss. Engineered retaining walls utilizing robust drainage gravel to hold back shifting silt slopes.'
                        },
                        {
                           title: 'Core Driveway Pavers Design Guide',
                           url: '/service/driveway-pavers',
                           badge: 'TECHNICAL CODE & BLUEPRINT',
                           description: 'Study our core driveway installation methodology, concrete sand preparation sheets, and premium polymeric joint sealing specs.'
                        }
                     ],
                     'outdoor-kitchen-johns-creek-ga': [
                        {
                           title: 'Alpharetta Estate Driveway Pavers',
                           url: '/driveways-pavers-alpharetta-ga',
                           badge: 'ALPHARETTA HARDSCAPES',
                           description: 'Tour top-tier cobblestone and modular tile driveways designed to optimize estate curb appeal in premium golf courses.'
                        },
                        {
                           title: 'Cool-Touch Pool Decks Atlanta',
                           url: '/pool-deck-pavers-atlanta',
                           badge: 'BAREFOOT COMFORT',
                           description: 'Surround your pool with natural Turkish Travertine tiles engineered to repel heat and protect family feet from blisters.'
                        },
                        {
                           title: 'Core Outdoor Patio Builders',
                           url: '/service/outdoor-patio-builders',
                           badge: 'DESIGN & STONE DATABASE',
                           description: 'Browse the catalog of premium modular stone formats, flagstones, structural slope grading maps, and water runoff blueprints.'
                        }
                     ],
                     'driveway-pavers-atlanta': [
                        {
                           title: 'Atlanta Pool Deck Travertine Decking',
                           url: '/pool-deck-pavers-atlanta',
                           badge: 'TRAVERTINE OASIS',
                           description: 'Transform regular concrete pool borders into breathtaking resort escapes with high-grip sand seal Turkish Travertine pavers.'
                        },
                        {
                           title: 'Structural Retaining Walls Atlanta',
                           url: '/retaining-walls-atlanta',
                           badge: 'SLOPE CONTAINMENT',
                           description: 'Avoid mudslides and terrain drop-offs on steep metropolitan yards using certified, drainage-backed Allan Block layers.'
                        },
                        {
                           title: 'Alpharetta Architectural Pavers',
                           url: '/driveways-pavers-alpharetta-ga',
                           badge: 'ALPHARETTA HIGH-END',
                           description: 'Check out premium interlocking driveways meticulously lined with Belgian cobbles matching high-class country club properties.'
                        }
                     ],
                     'retaining-walls-atlanta': [
                        {
                           title: 'Atlanta Advanced Driveway Pavers',
                           url: '/driveway-pavers-atlanta',
                           badge: 'STABILIZED DRIVES',
                           description: 'Anchor sloping parking spaces with interlocking concrete pavers engineered to absorb vehicle shear load without shifting.'
                        },
                        {
                           title: 'Outdoor Luxury Patios Atlanta',
                           url: '/outdoor-patios-atlanta',
                           badge: 'RESORT PATIOS',
                           description: 'Turn newly structured, leveled terraced gardens into gorgeous travertine conversation spaces and outdoor dining zones.'
                        },
                        {
                           title: 'Core Retaining Wall Installation Guide',
                           url: '/service/retaining-wall-installation',
                           badge: 'ENGINEERING SPECIFICATIONS',
                           description: 'Study our internal standards for base gravel depth, geogrid sheets placement, subsoil compaction ratios, and drainage pipe lines.'
                        }
                     ],
                     'outdoor-patios-atlanta': [
                        {
                           title: 'Barefoot Travertine Pool Decks Atlanta',
                           url: '/pool-deck-pavers-atlanta',
                           badge: 'POOL OASIS',
                           description: 'Synchronize your patio stone layout with slip-resistant, cool-shriveled Travertine pool deck surrounds for clean fluidity.'
                        },
                        {
                           title: 'Johns Creek Outdoor Resort Kitchens',
                           url: '/outdoor-kitchen-johns-creek-ga',
                           badge: 'CULINARY SANCTUARIES',
                           description: 'Incorporate commercial built-in grills, stone bars, dual sinks, and under-counter refrigerators on your backyard stone patio.'
                        },
                        {
                           title: 'Core Outdoor Patio Builders Manual',
                           url: '/service/outdoor-patio-builders',
                           badge: 'BLUEPRINTS & SPEC SHEETS',
                           description: 'Gain full insight on our standard base excavation depths, sand screen alignment tolerances, and structural joint locking.'
                        }
                     ],
                     'pool-deck-pavers-atlanta': [
                        {
                           title: 'Johns Creek Pro Outdoor Kitchens',
                           url: '/outdoor-kitchen-johns-creek-ga',
                           badge: 'CULINARY RESORTS',
                           description: 'Host poolside dinner parties with stainless steel grill engines, stone-faced cocktail counters, and built-in masonry draft drafts.'
                        },
                        {
                           title: 'Custom Outdoor Patios Atlanta',
                           url: '/outdoor-patios-atlanta',
                           badge: 'TRANSITIONAL HARDSCAPING',
                           description: 'Architect beautiful transitions with seamless flagstone steps wrapping from structural patio door thresholds down to pool waters.'
                        },
                        {
                           title: 'Core Pool Deck Pavers Design Page',
                           url: '/service/pool-deck-pavers',
                           badge: 'SWIMMING DECK SYSTEMS',
                           description: 'Read about our bullnose limestone coping anchors, anti-slip sand aggregates, and polymeric weed prevention.'
                        }
                     ],
                     'retaining-wall-installation': [
                        {
                           title: 'Engineered Retaining Walls Atlanta',
                           url: '/retaining-walls-atlanta',
                           badge: 'EROSION MASTERCLASS',
                           description: 'Expert, drainage-packed block work structured to reclaim steep residential yards and redirect heavy rain runoff safely.'
                        },
                        {
                           title: 'Atlanta Luxury Patios Design',
                           url: '/outdoor-patios-atlanta',
                           badge: 'TRAVERTINE PATIOS',
                           description: 'Pave newly created, stable flat levels using top-quality modular concrete blocks or beautiful natural slate flagstone.'
                        },
                        {
                           title: 'Atlanta Heavy Driveway Reconstruction',
                           url: '/driveway-pavers-atlanta',
                           badge: 'DRIVEWAY STABILIZATION',
                           description: 'Learn how we construct vertical security columns to retain driveway edges along severe hillside property lines.'
                        }
                     ],
                     'outdoor-patio-builders': [
                        {
                           title: 'Atlanta Premium Custom Patios',
                           url: '/outdoor-patios-atlanta',
                           badge: 'FLAGSTONE & SLATE TOUR',
                           description: 'Stunning travertine, flagstone, and modern paver patios displaying customized Metro Atlanta layouts and fire features.'
                        },
                        {
                           title: 'Johns Creek Backyard Outdoor Kitchens',
                           url: '/outdoor-kitchen-johns-creek-ga',
                           badge: 'BESPOKE COOKING BARS',
                           description: 'Build robust grill countertops faced with beautiful stack-stone veneers and luxury weather-durable quartzite tops.'
                        },
                        {
                           title: 'Retaining Wall Stabilization Atlanta',
                           url: '/retaining-walls-atlanta',
                           badge: 'YARD LEVELING MATRICES',
                           description: 'Safely flatten rolling slopes to prepare a secure structural foundation for premium outdoor patio construction.'
                        }
                     ],
                     'pool-deck-pavers': [
                        {
                           title: 'Atlanta Cool Travertine Pool Surrounds',
                           url: '/pool-deck-pavers-atlanta',
                           badge: 'TRAVERTINE SPECIALISTS',
                           description: 'Flawless Turkish travertine overlays around existing concrete swimming pools in Georgia\'s high-end neighborhoods.'
                        },
                        {
                           title: 'Johns Creek Luxury Outdoor Entertaining',
                           url: '/outdoor-kitchen-johns-creek-ga',
                           badge: 'POOL RESORT KITCHENS',
                           description: 'Combine cool-touch poolside pathways with custom outdoor bars, sinks, and gas wood fireplaces.'
                        },
                        {
                           title: 'Atlanta Outdoor Resilient Patios',
                           url: '/outdoor-patios-atlanta',
                           badge: 'TRANSITIONAL WALKWAYS',
                           description: 'Build a harmonious transition with synchronized stone designs linking your back door directly to pool steps.'
                        }
                     ],
                     'masonry-fireplaces': [
                        {
                           title: 'Johns Creek Cooking & Grill Resorts',
                           url: '/outdoor-kitchen-johns-creek-ga',
                           badge: 'JOHNS CREEK BESPOKE',
                           description: 'Anchor your stone fireplace with customized gas grills, brick pizza ovens, refrigeration compartments, and natural granite counters.'
                        },
                        {
                           title: 'Atlanta Custom Patios Showcase',
                           url: '/outdoor-patios-atlanta',
                           badge: 'TRAVERTINE COLD-FIREPLACES',
                           description: 'Wrap your luxury patio in absolute comfort with deep fire pit seating configurations styled with natural flagstone veneer.'
                        },
                        {
                           title: 'Atlanta Retaining Wall Geogrid Stabilization',
                           url: '/retaining-walls-atlanta',
                           badge: 'HEAVY FOOTINGS CODES',
                           description: 'Understand how our structural engineers pour heavy reinforced concrete base pads to safely host high-tonnage chimney builds.'
                        }
                     ],
                     'deck-builders': [
                        {
                           title: 'Atlanta Outlawed Deck Patios',
                           url: '/outdoor-patios-atlanta',
                           badge: 'MULTI-LEVEL TRANSITIONS',
                           description: 'Exquisite transitions between high-level synthetic composite decks and ground-level flagstone conversation zones.'
                        },
                        {
                           title: 'Retaining Wall Terraces Atlanta',
                           url: '/retaining-walls-atlanta',
                           badge: 'LAND SLOPE RETENTION',
                           description: 'Support high-elevation deck footings and secure steep soil slopes with premium structural boulder and block walls.'
                        },
                        {
                           title: 'Johns Creek Outdoor Culinary Cookers',
                           url: '/outdoor-kitchen-johns-creek-ga',
                           badge: 'DECK FOOD SANCTUARIES',
                           description: 'Safely integrate state-of-the-art gas grills and stone kitchen wraps under custom pergola decks in Johns Creek.'
                        }
                     ],
                     'stone-veneer': [
                        {
                           title: 'Johns Creek Stack-Stone Kitchens',
                           url: '/outdoor-kitchen-johns-creek-ga',
                           badge: 'OUTDOOR CHISELED COUNTERS',
                           description: 'Clad premium built-in bars and draft taps in authentic, tightly stacked outdoor masonry veneer.'
                        },
                        {
                           title: 'Retaining Walls Stone Facing Atlanta',
                           url: '/retaining-walls-atlanta',
                           badge: 'PRESTIGE NATURAL FACADES',
                           description: 'Elevate heavy-duty structural concrete retaining walls with majestic natural flagstone or dry-stack granite stone veneer.'
                        },
                        {
                           title: 'Alpharetta Estate Paving & Columns',
                           url: '/driveways-pavers-alpharetta-ga',
                           badge: 'ALPHARETTA ESTATE PORTICO',
                           description: 'Coordinate complete stone veneer entryway columns with luxury modular driveways for unparalleled estate presence.'
                        }
                     ],
                     'landscape-design': [
                        {
                           title: 'Atlanta Natural Travertine Patios',
                           url: '/outdoor-patios-atlanta',
                           badge: 'RESORT COMFORT DECOR',
                           description: 'Pristine flagstone walk paths, slate conversations hubs, and softscape alignments custom contoured to Georgia forests.'
                        },
                        {
                           title: 'Retaining Wall Terraced Scapes Atlanta',
                           url: '/retaining-walls-atlanta',
                           badge: 'TIERED SOIL MODULATIONS',
                           description: 'Structural leveling systems with built-in planter steps, premium turf, and natural drainage vectors.'
                        },
                        {
                           title: 'Johns Creek 3D Outdoor Kitchen Resorts',
                           url: '/outdoor-kitchen-johns-creek-ga',
                           badge: '3D RESORT BLUEPRINTING',
                           description: 'Simulate precise property orientations, wind lines, sunset profiles, and seating flows with architectural 3D modeling.'
                        }
                     ]
                  };

                  const links = showcasesDb[data.id] || [
                     {
                        title: 'Alpharetta Estate Driveway Pavers',
                        url: '/driveways-pavers-alpharetta-ga',
                        badge: 'REGIONAL CORE INDEX',
                        description: 'View premium interlocking block installations structured for clay ground stability and exceptional estate aesthetics.'
                     },
                     {
                        title: 'Johns Creek Resort Outdoor Kitchens',
                        url: '/outdoor-kitchen-johns-creek-ga',
                        badge: 'BACKYARD LIVING INDEX',
                        description: 'State-of-the-art culinary stations lined with Turkish travertine, customized quartzite counters, and hand-layered brick elements.'
                     },
                     {
                        title: 'Erosion Retaining Walls Atlanta',
                        url: '/retaining-walls-atlanta',
                        badge: 'EROSION MATRIX',
                        description: 'Over-engineered soil retention platforms with deep hydrostatic drainage channels built specifically for North Georgia slopes.'
                     }
                  ];

                  return links.map((link, keyIdx) => (
                     <motion.div 
                        key={keyIdx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: keyIdx * 0.15 }}
                        className="group flex flex-col justify-between bg-white border border-gray-100 hover:border-brand-gold/40 p-10 rounded-2xl transition-all duration-500 shadow-[0_15px_45px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.06)] relative overflow-hidden"
                     >
                        {/* Decorative card glow */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-brand-gold/20 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></div>

                        <div>
                           <span className="font-mono text-[10px] tracking-[0.2em] text-[#8c98a4] font-bold block mb-4 group-hover:text-brand-gold transition-colors">
                              🔧 {link.badge}
                           </span>
                           <h3 className="font-serif text-2xl text-brand-dark font-medium leading-snug mb-5 group-hover:translate-x-1 transition-transform duration-300">
                              {link.title}
                           </h3>
                           <p className="text-[#4a5568] text-base leading-relaxed mb-10 font-sans">
                              {link.description}
                           </p>
                        </div>

                        <div>
                           <Link 
                              to={link.url}
                              className="inline-flex items-center gap-3 font-bold text-xs uppercase tracking-widest text-[#1a202c] hover:text-brand-gold transition-colors"
                           >
                              <span>Explore Details</span>
                              <ArrowRight size={16} className="text-brand-gold group-hover:translate-x-2 transition-transform" />
                           </Link>
                        </div>
                     </motion.div>
                  ));
               })()}
            </div>
         </div>
      </section>

      {/* FINAL SCARCITY CTA */}
      <section className="bg-brand-dark py-24 md:py-32 px-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
           <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-brand-gold mx-auto mb-8 opacity-90" />
           <h2 className="font-serif text-3xl md:text-5xl text-white font-medium mb-6 leading-[1.2]">
             Quality takes time. Our schedule is filling up fast.
           </h2>
           <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed font-sans max-w-2xl mx-auto">
             We handle every project with our own in-house crews and never sub-contract your installation. Because we refuse to cut corners, our calendar books quickly. Secure your spot today and let's get started.
           </p>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link to="/quote" className="w-full sm:w-auto px-10 py-5 bg-brand-gold text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-brand-dark transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
               Request Free Quote
             </Link>
             <a href="tel:6784287630" onClick={trackCallClick} className="w-full sm:w-auto px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors duration-300 flex items-center justify-center gap-2">
               <Phone size={18} /> Call Us Direct
             </a>
           </div>
        </motion.div>
      </section>

    </div>
  );
};

