import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

export const ZParallaxShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const height = rect.height - window.innerHeight;
      const top = -rect.top;
      
      // Calculate progress 0 to 1 based on scroll within the container
      const progress = Math.max(0, Math.min(1, top / height));
      
      requestAnimationFrame(() => setScrollProgress(progress));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#0f1115]">
      
      {/* Background Texture to blend with Hero */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/black-scales.png")` }}>
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-[100px]">
        
        {/* Layer 3: The Destination (The Patio) */}
        <div 
           className="absolute inset-0 w-full h-full"
           style={{
             opacity: Math.min(1, scrollProgress * 3), 
             // Smoother scale landing
             transform: `scale(${1.15 - (scrollProgress * 0.15)})`, 
             zIndex: 10
           }}
        >
           <img 
             src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2600&auto=format&fit=crop" 
             alt="Luxury Destination" 
             className="w-full h-full object-cover brightness-[0.85]"
           />
           {/* Cinematic vignette */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
        </div>

        {/* Layer 2: The Portal */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
             transform: `scale(${1 + scrollProgress * 50})`, 
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
             transform: `scale(${1 + scrollProgress}) translateY(${scrollProgress * -50}px)`
          }}
        >
           <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
             The Transition
           </span>
           <h2 className="font-serif text-5xl md:text-7xl text-white font-bold leading-none">
             Beyond <br/> Expectations
           </h2>
        </div>

        {/* FINAL IMPACT TEXT */}
        {/* Added a radial gradient behind the text that only appears at the end to ensure contrast */}
        <div 
            className="absolute z-40 inset-0 pointer-events-none transition-opacity duration-500"
            style={{ 
                background: 'radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 70%)',
                opacity: scrollProgress > 0.8 ? (scrollProgress - 0.8) * 5 : 0
            }}
        ></div>

        <div 
           className="absolute z-50 inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
           style={{ 
             opacity: scrollProgress > 0.8 ? (scrollProgress - 0.8) * 5 : 0,
             transform: `scale(${2 - scrollProgress})` 
           }}
        >
           <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
             WELCOME
           </h2>
           <p className="font-sans text-xl md:text-3xl text-white font-light uppercase tracking-[0.5em] mt-4 drop-shadow-md text-shadow-lg">
             To Your New Lifestyle
           </p>
        </div>

        {/* Scroll Indicator that appears at the very end */}
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