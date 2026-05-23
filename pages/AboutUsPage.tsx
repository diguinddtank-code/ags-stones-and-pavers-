import React, { useEffect, useState, useRef } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Award, Users, HardHat, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutUsPage: React.FC = () => {
  const [activePhilosophy, setActivePhilosophy] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const clientWidth = scrollRef.current.clientWidth;
      if (clientWidth > 0) {
        const index = Math.round(scrollLeft / clientWidth);
        const philosophyCount = 4;
        if (index >= 0 && index < philosophyCount) {
          setActivePhilosophy(index);
        }
      }
    }
  };

  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="font-sans antialiased text-brand-dark bg-slate-50 min-h-screen flex flex-col overflow-hidden">
      <SEO 
        title="About AGS Stones | Atlanta's Premier Hardscaping Company" 
        description="Learn about AGS Stones, the leading hardscaping and paver installation experts in Atlanta. Family-owned, structurally focused, and built to outlast."
        url="https://agsstonesandpavers.com/about-us"
      />
      
      <Header />
      
      <main className="flex-grow pb-0">
        {/* Full Bleed Photographic Hero */}
        <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden py-32">
          <motion.div 
             className="absolute inset-0 w-full h-full"
             style={{ y: yHero, opacity: opacityHero }}
          >
             <div className="absolute inset-0 bg-black/60 z-10" />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent opacity-90 z-10" />
             <img 
               src="https://i.imgur.com/G2N5Chsl.webp" 
               alt="AGS Stones Craftsmanship" 
               className="w-full h-full object-cover scale-105"
             />
          </motion.div>
          
          <div className="relative z-20 max-w-7xl mx-auto px-4 text-center mt-12 md:mt-20">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             >
                <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-6 block drop-shadow-md">
                   Our Heritage
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 tracking-tighter leading-[1.1] drop-shadow-xl">
                  Built on <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-600">Integrity.</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light mb-10 leading-relaxed shadow-sm">
                  We engineer premium outdoor spaces across Metro Atlanta. Extreme structural integrity meets breathtaking architectural masonry.
                </p>
                <div className="flex justify-center">
                   <div className="w-[1px] h-16 md:h-24 bg-gradient-to-b from-brand-gold to-transparent"></div>
                </div>
             </motion.div>
          </div>
        </section>

        {/* Narrative Section - Magazine Style */}
        <section className="px-4 py-24 md:py-32 relative bg-brand-dark text-white rounded-t-[3rem] -mt-12 z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
           <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
           
           <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center mb-32">
                 <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="relative px-2 md:px-0"
                 >
                    <div className="aspect-[4/3] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                       <img 
                          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000" 
                          alt="Premium Driveway Pavers Installation" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
                       />
                       <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-700"></div>
                    </div>
                    
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        className="absolute -bottom-6 -right-2 md:-bottom-10 md:-right-10 bg-white text-brand-dark p-5 md:p-8 rounded-2xl shadow-2xl border-4 md:border-[8px] border-brand-dark"
                     >
                        <div className="text-3xl md:text-5xl font-bold font-serif mb-1 text-brand-gold">15+</div>
                        <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-dark/80">Years of Mastery</div>
                     </motion.div>
                  </motion.div>
                 
                 <div className="lg:pr-10">
                    <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-xs mb-6 block flex items-center gap-3">
                       <div className="w-12 h-[1px] bg-brand-gold/50"></div>
                       The Atlanta Standard
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
                       Why we refused to be "just another" landscaping company.
                    </h2>
                    <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
                       <p>
                          Years ago, we noticed a disturbing trend in Metro Atlanta's neighborhoods. Beautifully designed driveways and retaining walls were failing within 3-4 years. Concrete was cracking, pavers were sinking, and walls were leaning.
                       </p>
                       <p>
                          The problem wasn't the materials—it was the foundation. Contractors were cutting corners underground to save money and win bids fast.
                       </p>
                       <p className="text-white font-medium border-l-2 border-brand-gold pl-6 py-2 my-8">
                          "We built AGS Stones on a simple premise: Engineer the base to withstand exceptional weight and water flow, and the surface will remain flawless for decades."
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Guiding Principles - Clean White Section */}
        <section className="bg-slate-50 text-brand-dark py-32 px-4 w-full relative -mt-10 rounded-t-[3rem] z-40">
           <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                 <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-brand-dark">Our Engineering Philosophy</h2>
                 <p className="text-gray-500 max-w-2xl mx-auto text-lg">Four non-negotiable principles that dictate every project we accept.</p>
              </div>
              
              <div 
                 ref={scrollRef}
                 onScroll={handleScroll}
                 className="flex overflow-x-auto md:grid md:grid-cols-2 gap-6 md:gap-x-8 md:gap-y-12 pb-8 md:pb-0 snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
              >
                 {[
                   { icon: <Shield size={28}/>, title: "Over-Engineered Bases", text: "We excavate deeper, use geo-textile stabilization fabrics, and layer multiple grades of crushed aggregate, compacting every 2 inches. This guarantees zero settling." },
                   { icon: <HardHat size={28}/>, title: "In-House Master Artisans", text: "Unlike most firms that act as middlemen, we do not sub-contract our masonry. Every stone is cut, leveled, and laid by our own vetted AGS-certified crews." },
                   { icon: <Award size={28}/>, title: "The 5-Year Structural Warranty", text: "We are so confident in our compaction and drainage techniques that we offer an industry-leading 5-year structural warranty against shifting, settling, and cracking." },
                   { icon: <Users size={28}/>, title: "White-Glove Communication", text: "Your home is your sanctuary. We maintain pristine jobsites, provide daily progress updates, and execute projects with total transparency from blueprint to final walkthrough." }
                 ].map((item, idx) => (
                    <motion.div 
                       key={idx}
                       initial={{ opacity: 0, y: 30 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true, margin: "-100px" }}
                       transition={{ delay: idx * 0.1, duration: 0.8 }}
                       className="group bg-white p-8 md:p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 min-w-[85vw] sm:min-w-[420px] md:min-w-0 snap-start shrink-0"
                    >
                       <div className="text-brand-gold mb-6 w-14 h-14 bg-slate-50 flex items-center justify-center rounded-2xl group-hover:bg-brand-gold group-hover:text-white transition-colors duration-500">{item.icon}</div>
                       <h3 className="text-2xl font-serif font-bold mb-4">{item.title}</h3>
                       <p className="text-gray-600 leading-relaxed font-light">{item.text}</p>
                    </motion.div>
                 ))}
              </div>

              {/* Progress dots indicator for mobile only */}
              <div className="flex justify-center gap-2 mt-6 md:hidden">
                 {[0, 1, 2, 3].map((dotIdx) => (
                    <div 
                       key={dotIdx}
                       className={`h-1.5 rounded-full transition-all duration-300 ${
                          activePhilosophy === dotIdx ? 'w-6 bg-brand-gold' : 'w-1.5 bg-gray-300'
                       }`}
                    />
                 ))}
              </div>
              
              <div className="mt-20 flex justify-center">
                 <Link to="/service-areas" className="inline-flex items-center gap-3 px-10 py-5 bg-brand-dark text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-gold transition-all duration-300 rounded-full shadow-2xl hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                   View Our Service Areas <ArrowRight size={16} />
                 </Link>
              </div>
           </div>
        </section>
        
        {/* Contact Section at the end */}
        <div className="relative z-50">
           <Contact />
        </div>

      </main>
      
      <Footer />
    </div>
  );
};
