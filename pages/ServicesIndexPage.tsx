import React, { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Services } from '../components/Services';
import { Contact } from '../components/Contact';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Layers, HardHat, Compass } from 'lucide-react';

export const ServicesIndexPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="font-sans antialiased text-brand-dark bg-brand-dark min-h-screen flex flex-col">
      <SEO 
        title="Our Hardscaping & Paver Services | AGS Stones" 
        description="Comprehensive luxury hardscaping services in Metro Atlanta. Patios, driveways, retaining walls, and outdoor kitchens built to last."
        url="https://agsstonesandpavers.com/services"
      />
      
      <Header />
      
      <main className="flex-grow pb-0">
        {/* Full-Bleed Cinematic Hero */}
        <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden py-32">
          <motion.div 
             className="absolute inset-0 w-full h-full"
             style={{ y: yHero, opacity: opacityHero }}
          >
             <div className="absolute inset-0 bg-black/60 z-10" />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-100 z-10" />
             <img 
               src="https://i.imgur.com/6rQRJxs.jpeg" 
               alt="Luxury Outdoor Living Solutions" 
               className="w-full h-full object-cover scale-105"
             />
          </motion.div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 w-full flex flex-col items-center text-center mt-12 md:mt-20">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
               className="max-w-4xl"
             >
                <div className="flex justify-center mb-6">
                   <div className="flex items-center gap-3 bg-brand-dark/50 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                      <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">Master Craftsmanship</span>
                   </div>
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 tracking-tighter leading-[1.1] drop-shadow-2xl">
                  Luxury Outdoor <br className="hidden md:block" />
                  <span className="text-gray-300">Living Spaces.</span>
                </h1>
                
                <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light mb-12 leading-relaxed shadow-sm">
                  Combining deep structural engineering with magnificent stone selection to build outdoor architecture that outlasts the house itself.
                </p>

                <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
                   {[
                     { icon: Layers, label: 'Modular Pavers' },
                     { icon: HardHat, label: 'Structural Walls' },
                     { icon: Compass, label: 'Custom Layouts' }
                   ].map((Item, i) => (
                      <div key={i} className="flex items-center gap-2 md:gap-3 text-white">
                         <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                            <Item.icon size={16} className="text-brand-gold" />
                         </div>
                         <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{Item.label}</span>
                      </div>
                   ))}
                </div>

                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-brand-gold inline-flex"
                >
                  <ArrowDown size={32} strokeWidth={1.5} />
                </motion.div>
             </motion.div>
          </div>
        </section>

        {/* Re-using the robust Services grid component directly in dark theme */}
        <div className="relative z-30 pb-20 -mt-10">
            <Services />
        </div>
        
        {/* Contact Section at the end */}
        <Contact />

      </main>
      
      <Footer />
    </div>
  );
};
