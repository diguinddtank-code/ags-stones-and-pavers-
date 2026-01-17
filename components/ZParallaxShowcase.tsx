import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

export const ZParallaxShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Enabled for all devices
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const height = rect.height - window.innerHeight;
      const top = -rect.top;
      
      const progress = Math.max(0, Math.min(1, top / height));
      requestAnimationFrame(() => setScrollProgress(progress));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    // Height set to 250vh to control the speed of the scroll effect
    <section ref={containerRef} className="relative h-[250vh] bg-[#0f1115]">
      
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/black-scales.png")` }}>
      </div>

      {/* FLUID CONNECTOR: Top gradient to catch the fade from Hero if user scrolls fast */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0f1115] to-transparent z-40 pointer-events-none"></div>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-[100px]">
        
        {/* Layer 3: The Destination (Background Image) */}
        <div 
           className="absolute inset-0 w-full h-full"
           style={{
             // Tuned physics: Slower fade in for smoother reveal
             opacity: Math.min(1, scrollProgress * 1.5), 
             // Subtle scale down effect, smoother transition
             transform: `scale(${1.15 - (scrollProgress * 0.1)}) translate3d(0,0,0)`,
             zIndex: 10
           }}
        >
           {/* Responsive Image Switching */}
           <picture className="w-full h-full">
              {/* Mobile Image */}
              <source media="(max-width: 768px)" srcSet="https://i.imgur.com/TVqAe9D.jpeg" />
              {/* Desktop Image */}
              <img 
                src="https://i.imgur.com/6rQRJxs.jpeg" 
                alt="Magnificent Outdoor Living and Pool Deck" 
                className="w-full h-full object-cover brightness-[0.85]"
              />
           </picture>
           
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
        </div>

        {/* Layer 2: The Portal (Black Mask with Hole) */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
             // Tuned physics: Exponential growth for "ethereal" feel - starts slow, accelerates
             transform: `scale(${1 + Math.pow(scrollProgress, 1.8) * 60}) translate3d(0,0,0)`, 
             opacity: 1, 
             zIndex: 20
          }}
        >
           <div className="w-[100vw] h-[100vh] flex items-center justify-center">
              {/* The "Hole" - Transparent center with huge black shadow */}
              <div className="w-[85vw] h-[50vh] md:w-[40vw] md:h-[40vh] rounded-[40%] md:rounded-[30%] shadow-[0_0_0_150vmax_#0f1115] bg-transparent"></div>
           </div>
        </div>

        {/* Layer 1: The Text (Welcome Message) */}
        <div 
          className="absolute z-30 text-center px-4 w-full flex flex-col items-center justify-center h-full pointer-events-none"
          style={{
             // Text fades out slower to stay legible longer
             opacity: Math.max(0, 1 - scrollProgress * 1.8), 
             // Gentler scale up to avoid "jumping" at the user
             transform: `scale(${1 + scrollProgress * 0.5}) translateY(${scrollProgress * -40}px) translate3d(0,0,0)`
          }}
        >
           <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block drop-shadow-lg">
             Welcome to
           </span>
           <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl text-white font-bold leading-none tracking-tight drop-shadow-2xl">
             AGS Stones <br/>
             <span className="text-lg md:text-3xl font-sans font-light text-gray-300 tracking-[0.2em] block mt-4 uppercase opacity-90">
                Outdoor Living
             </span>
           </h2>
        </div>

        {/* Scroll Indicator (Fades out immediately) */}
        <div 
           className="absolute bottom-10 z-50 text-white flex flex-col items-center gap-2 transition-opacity duration-300"
           style={{ opacity: scrollProgress > 0.05 ? 0 : 1 }}
        >
           <span className="text-[10px] uppercase tracking-widest drop-shadow-md">Scroll to Enter</span>
           <ArrowDown className="w-5 h-5 animate-bounce drop-shadow-md" />
        </div>

      </div>
    </section>
  );
};