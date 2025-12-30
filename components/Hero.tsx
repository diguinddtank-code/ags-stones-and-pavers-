import React, { useEffect, useState, useRef } from 'react';
import { ArrowDown, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    let animationFrameId: number;
    
    const handleScroll = () => {
      // Performance: DESKTOP ONLY parallax
      if (window.innerWidth < 768) return;

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
           animationFrameId = requestAnimationFrame(() => setOffset(window.scrollY));
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative h-screen min-h-[600px] md:min-h-[800px] flex flex-col justify-center items-center overflow-hidden bg-brand-dark pt-24 pb-24 md:pt-20 md:pb-40"> 
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          srcSet="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop 800w,
                  https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop 1600w,
                  https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop 2670w"
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop"
          sizes="(max-width: 768px) 800px, 100vw"
          alt="Luxury Outdoor Kitchen and Paver Patio Installation in Atlanta, GA"
          title="Custom Paver Patio and Outdoor Living by AGS Stones"
          className={`w-full h-full object-cover object-center opacity-60 transition-transform duration-100 ease-linear
            ${isMobile ? 'animate-[zoom_20s_infinite_alternate]' : ''} 
          `}
          style={{ 
             // Desktop: Scroll Parallax | Mobile: CSS Animation
             transform: isMobile ? 'none' : `translateY(${offset * 0.4}px) scale(${1 + offset * 0.0005})`,
             willChange: 'transform' 
          }}
          // @ts-ignore
          fetchpriority="high"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-0">
        
        {/* LOGO CONTAINER */}
        <div 
          className="md:hidden mb-4 transition-all duration-300 ease-out"
          style={{ 
             // Simple fade out on desktop scroll, static on mobile
             opacity: isMobile ? 1 : Math.max(0, 1 - offset / 250),
             transform: isMobile ? 'none' : `translateY(${offset * -0.5}px)`
          }}
        >
          <img 
            src="https://agsstonesandpavers.com/wp-content/uploads/2023/05/Design-sem-nome-18.png" 
            alt="AGS Stones and Pavers Logo - Duluth GA"
            className="h-24 w-auto mx-auto drop-shadow-2xl"
            width="96"
            height="96"
          />
        </div>

        <div 
           className="max-w-4xl mx-auto transition-all duration-300"
           style={{ 
             opacity: isMobile ? 1 : Math.max(0, 1 - offset / 400), 
             transform: isMobile ? 'none' : `translateY(${offset * -0.2}px)`
           }}
        >
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-3 py-1.5 md:px-4 md:py-2 border border-white/20 rounded-full bg-white/5 backdrop-blur-md animate-[fade-up_1s_ease-out]">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 text-brand-gold fill-brand-gold" />)}
            </div>
            <span className="text-white/90 text-[10px] md:text-xs font-semibold tracking-widest uppercase">#1 Rated Hardscape Contractor</span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-4 md:mb-6 drop-shadow-2xl animate-[fade-up_1s_ease-out_0.2s_both]">
            Atlanta's Premier <br/>
            <span className="text-brand-gold italic">Paver & Wall Installation</span>
          </h1>
          
          <p className="text-base md:text-xl text-gray-200 mb-8 md:mb-10 max-w-xl mx-auto font-light leading-relaxed animate-[fade-up_1s_ease-out_0.4s_both] px-2">
            Transforming properties across <strong>Metro Atlanta</strong>. We are the top-rated contractors for driveway pavers, retaining walls, and outdoor patios.
          </p>
          
          <div className="flex justify-center animate-[fade-up_1s_ease-out_0.6s_both]">
            <a 
              href="tel:6784287630" 
              className="group relative overflow-hidden px-8 py-4 md:px-10 md:py-5 bg-brand-gold text-white font-bold rounded-sm shadow-[0_0_40px_-10px_rgba(212,175,55,0.6)] transition-all hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest text-xs md:text-sm">
                Request Free Estimate
              </span>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </a>
          </div>
        </div>
      </div>

      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60"
        style={{ opacity: isMobile ? 1 : Math.max(0, 1 - offset / 200) }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] animate-pulse">Scroll</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
};