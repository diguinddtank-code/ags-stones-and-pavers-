import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

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

  // --- MOBILE RENDER: "THE GATEWAY" ANIMATION ---
  // Optimized for Mobile GPU (transform only)
  if (isMobile) {
    return (
        <section className="relative h-[85vh] bg-[#0f1115] overflow-hidden flex flex-col items-center justify-center will-change-transform">
             
             {/* 1. Dynamic Background Layer */}
             <div className="absolute inset-0 animate-[scaleIn_15s_ease-in-out_infinite_alternate]">
                <img 
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=75&w=800&auto=format&fit=crop" 
                    alt="Luxury Destination" 
                    className="w-full h-full object-cover opacity-40"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-black/50"></div>
             </div>

             {/* 2. The Portal Ring */}
             <div className="absolute w-[280px] h-[280px] rounded-full border border-brand-gold/30 opacity-60 animate-[spin_25s_linear_infinite]"></div>
             <div className="absolute w-[260px] h-[260px] rounded-full border border-white/10 opacity-40 animate-[spin_20s_linear_infinite_reverse]"></div>

             {/* 3. Floating Content Layer */}
             <div className="relative z-10 text-center px-6">
                <div className="inline-flex items-center gap-2 text-brand-gold font-bold tracking-[0.3em] uppercase text-[10px] mb-6 animate-[fade-up_0.8s_ease-out]">
                    <Sparkles size={12} /> The Experience
                </div>
                
                <h2 className="font-serif text-5xl text-white font-bold leading-[0.9] mb-6 drop-shadow-2xl animate-[fade-up_0.8s_ease-out_0.2s_both]">
                    Beyond <br/> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                        Reality
                    </span>
                </h2>
                
                <p className="text-gray-400 font-light max-w-xs mx-auto text-sm leading-relaxed mb-8 animate-[fade-up_0.8s_ease-out_0.4s_both]">
                    Step into a world where design meets perfection. Your backyard, reimagined.
                </p>

                <div className="h-px w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto"></div>
             </div>

             {/* Bottom Fade for smooth transition to next section */}
             <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-50 to-transparent z-20"></div>
        </section>
    );
  }

  // --- DESKTOP RENDER ---
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