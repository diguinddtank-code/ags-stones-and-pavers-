import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Sparkles, Gem } from 'lucide-react';

export const ZParallaxShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      // PERFORMANCE: Disable JS logic on mobile completely
      if (window.innerWidth < 768) return;

      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const height = rect.height - window.innerHeight;
      const top = -rect.top;
      
      const progress = Math.max(0, Math.min(1, top / height));
      requestAnimationFrame(() => setScrollProgress(progress));
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // --- MOBILE RENDER: LUXURY STATEMENT CARD ---
  // Replaced the "portal" effect with a high-end architectural transition
  if (isMobile) {
    return (
        <section className="relative min-h-[70vh] flex items-center justify-center bg-brand-dark overflow-hidden py-20">
             
             {/* 1. Background Image (Subtle Zoom) */}
             <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1621256133234-29e2f41d4517?q=80&w=800&auto=format&fit=crop" 
                    alt="Luxury Paver Detail Texture" 
                    className="w-full h-full object-cover opacity-40 animate-[slow-zoom_25s_infinite_alternate]"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f1115] via-[#0f1115]/80 to-[#0f1115]"></div>
             </div>

             {/* 2. Glassmorphism Card */}
             <div className="relative z-10 px-6 w-full max-w-sm">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] animate-[fade-up_0.8s_ease-out]">
                    
                    <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                        <div className="p-2 bg-brand-gold rounded-lg text-brand-dark shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                            <Gem size={18} />
                        </div>
                        <span className="text-brand-gold font-bold uppercase tracking-[0.2em] text-[10px]">
                            The AGS Standard
                        </span>
                    </div>

                    <h2 className="font-serif text-3xl text-white font-bold leading-tight mb-4">
                        Crafting <br/> 
                        <span className="italic text-gray-400 font-light">Timeless Spaces.</span>
                    </h2>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-8 font-light border-l-2 border-brand-gold/50 pl-4">
                        We don't just lay stones; we engineer lifestyles. Experience the intersection of structural durability and luxury design.
                    </p>

                    <div className="flex flex-col items-center gap-2">
                        <span className="text-white/40 text-[10px] uppercase tracking-widest">
                            Scroll to Explore
                        </span>
                        <ArrowDown size={16} className="text-brand-gold animate-bounce" />
                    </div>
                </div>
             </div>
        </section>
    );
  }

  // --- DESKTOP RENDER (Unchanged) ---
  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#0f1115]">
      
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/black-scales.png")` }}>
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-[100px]">
        
        {/* Layer 3: The Destination */}
        <div 
           className="absolute inset-0 w-full h-full"
           style={{
             opacity: Math.min(1, scrollProgress * 3), 
             transform: `scale(${1.15 - (scrollProgress * 0.15)}) translate3d(0,0,0)`, 
             zIndex: 10
           }}
        >
           <img 
             src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2600&auto=format&fit=crop" 
             alt="Luxury Destination" 
             className="w-full h-full object-cover brightness-[0.85]"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
        </div>

        {/* Layer 2: The Portal */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
             transform: `scale(${1 + scrollProgress * 50}) translate3d(0,0,0)`, 
             opacity: 1 - Math.pow(scrollProgress, 5), 
             zIndex: 20
          }}
        >
           <div className="w-[100vw] h-[100vh] flex items-center justify-center">
              <div className="w-[50vw] h-[50vh] rounded-[20%] shadow-[0_0_0_100vmax_#0f1115] bg-transparent"></div>
           </div>
        </div>

        {/* Layer 1: Intro Text */}
        <div 
          className="absolute z-30 text-center px-4"
          style={{
             opacity: 1 - scrollProgress * 5, 
             transform: `scale(${1 + scrollProgress}) translateY(${scrollProgress * -50}px) translate3d(0,0,0)`
          }}
        >
           <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
             The Transition
           </span>
           <h2 className="font-serif text-5xl md:text-7xl text-white font-bold leading-none">
             Beyond <br/> Expectations
           </h2>
        </div>

        <div 
           className="absolute bottom-10 z-50 text-white flex flex-col items-center gap-2 transition-opacity duration-500"
           style={{ opacity: scrollProgress > 0.95 ? 1 : 0 }}
        >
           <span className="text-[10px] uppercase tracking-widest drop-shadow-md">Explore Services</span>
           <ArrowDown className="w-5 h-5 animate-bounce drop-shadow-md" />
        </div>

      </div>
    </section>
  );
};