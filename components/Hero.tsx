import React, { useEffect, useState } from 'react';
import { ArrowDown, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => setOffset(window.scrollY));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[800px] flex flex-col justify-center items-center overflow-hidden bg-brand-dark pt-20 pb-40"> 
      
      {/* Background with Parallax & Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop"
          alt="Luxury Outdoor Kitchen and Pavers Atlanta"
          className="w-full h-full object-cover animate-slow-zoom opacity-60"
          style={{ transform: `translateY(${offset * 0.4}px) scale(${1 + offset * 0.0005})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-0">
        
        {/* LOGO CONTAINER (Mobile Only Animation) */}
        {/* Desktop: Removed central logo as requested. Mobile: Animates up to header. */}
        <div 
          className="md:hidden mb-6 transition-all duration-300 ease-out will-change-transform"
          style={{ 
            opacity: Math.max(0, 1 - offset / 250), 
            transform: `translateY(${offset * -0.5}px) scale(${Math.max(0.8, 1 - offset / 500)})` 
          }}
        >
          <img 
            src="https://agsstonesandpavers.com/wp-content/uploads/2023/05/Design-sem-nome-18.png" 
            alt="AGS Stones Logo"
            className="h-32 w-auto mx-auto drop-shadow-2xl"
          />
        </div>

        <div 
           className="max-w-4xl mx-auto transition-all duration-300"
           style={{ opacity: Math.max(0, 1 - offset / 400), transform: `translateY(${offset * -0.2}px)` }}
        >
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-white/20 rounded-full bg-white/5 backdrop-blur-md animate-[fade-up_1s_ease-out]">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-brand-gold fill-brand-gold" />)}
            </div>
            <span className="text-white/90 text-xs font-semibold tracking-widest uppercase">#1 Rated in Metro Atlanta</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 drop-shadow-2xl animate-[fade-up_1s_ease-out_0.2s_both]">
            Outdoor Living <br/>
            <span className="text-brand-gold italic">Perfection</span>
          </h1>
          
          {/* Updated Subtitle */}
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl mx-auto font-light leading-relaxed animate-[fade-up_1s_ease-out_0.4s_both]">
            Proudly serving Atlanta and the entire Metro Area. We transform ordinary properties into award-winning outdoor retreats.
          </p>
          
          <div className="flex justify-center animate-[fade-up_1s_ease-out_0.6s_both]">
            <a 
              href="tel:6784287630" 
              className="group relative overflow-hidden px-10 py-5 bg-brand-gold text-white font-bold rounded-sm shadow-[0_0_40px_-10px_rgba(212,175,55,0.6)] transition-all hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest text-sm">
                Request Free Estimate
              </span>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </a>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60"
        style={{ opacity: Math.max(0, 1 - offset / 200) }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] animate-pulse">Scroll</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
};