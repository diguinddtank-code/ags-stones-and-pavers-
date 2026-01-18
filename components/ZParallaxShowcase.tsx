import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export const ZParallaxShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for Direct DOM Manipulation
  const layer3Ref = useRef<HTMLDivElement>(null); // Bg
  const layer2Ref = useRef<HTMLDivElement>(null); // Mask
  const layer1Ref = useRef<HTMLDivElement>(null); // Text
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const height = rect.height - window.innerHeight;
      const top = -rect.top;
      
      // Calculate progress between 0 and 1
      const progress = Math.max(0, Math.min(1, top / height));
      
      requestAnimationFrame(() => {
          // Layer 3: Destination (Scale & Translate)
          if (layer3Ref.current) {
             layer3Ref.current.style.opacity = Math.min(1, progress * 1.5).toString();
             layer3Ref.current.style.transform = `scale(${1.15 - (progress * 0.1)}) translate3d(0,0,0)`;
          }

          // Layer 2: Mask (Scale heavily)
          if (layer2Ref.current) {
             layer2Ref.current.style.transform = `scale(${1 + Math.pow(progress, 1.8) * 60}) translate3d(0,0,0)`;
          }

          // Layer 1: Text (Fade out & Slide up)
          if (layer1Ref.current) {
             layer1Ref.current.style.opacity = Math.max(0, 1 - progress * 1.8).toString();
             layer1Ref.current.style.transform = `scale(${1 + progress * 0.5}) translateY(${progress * -40}px) translate3d(0,0,0)`;
          }

          // Scroll Indicator (Hide immediately)
          if (scrollIndicatorRef.current) {
             scrollIndicatorRef.current.style.opacity = progress > 0.05 ? '0' : '1';
          }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    // Height set to 250vh to control the speed of the scroll effect
    // DARK THEME: Changed from bg-white to bg-brand-dark (#0f1115)
    <section ref={containerRef} className="relative h-[250vh] bg-[#0f1115]">
      
      {/* Dark Texture - Adjusted opacity and blend mode for dark background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/concrete-seamless.png")` }}>
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-[100px]">
        
        {/* Layer 3: The Destination (Background Image) */}
        <div 
           ref={layer3Ref}
           className="absolute inset-0 w-full h-full will-change-transform"
           style={{
             opacity: 0, 
             transform: `scale(1.15) translate3d(0,0,0)`,
             zIndex: 10
           }}
        >
           <picture className="w-full h-full">
              <source media="(max-width: 768px)" srcSet="https://i.imgur.com/TVqAe9D.jpeg" />
              <img 
                src="https://i.imgur.com/6rQRJxs.jpeg" 
                alt="Magnificent Outdoor Living and Pool Deck" 
                className="w-full h-full object-cover"
              />
           </picture>
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
        </div>

        {/* Layer 2: The Portal (DARK Mask with Hole) */}
        <div 
          ref={layer2Ref}
          className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
          style={{
             transform: `scale(1) translate3d(0,0,0)`, 
             opacity: 1, 
             zIndex: 20
          }}
        >
           <div className="w-[100vw] h-[100vh] flex items-center justify-center">
              {/* The "Hole" - Transparent center with huge BLACK shadow (#0f1115) to match background */}
              <div className="w-[85vw] h-[50vh] md:w-[40vw] md:h-[40vh] rounded-[40%] md:rounded-[30%] shadow-[0_0_0_150vmax_#0f1115] bg-transparent"></div>
           </div>
        </div>

        {/* Layer 1: The Text (Welcome Message) */}
        <div 
          ref={layer1Ref}
          className="absolute z-30 text-center px-4 w-full flex flex-col items-center justify-center h-full pointer-events-none will-change-transform"
          style={{
             opacity: 1, 
             transform: `scale(1) translateY(0) translate3d(0,0,0)`
          }}
        >
           <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block">
             Welcome to
           </span>
           <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl text-white font-bold leading-none tracking-tight">
             AGS Stones <br/>
             <span className="text-lg md:text-3xl font-sans font-light text-gray-400 tracking-[0.2em] block mt-4 uppercase opacity-90">
                Outdoor Living
             </span>
           </h2>
        </div>

        {/* Scroll Indicator */}
        <div 
           ref={scrollIndicatorRef}
           className="absolute bottom-10 z-50 text-white flex flex-col items-center gap-2 transition-opacity duration-300"
        >
           <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to Enter</span>
           <ArrowDown className="w-5 h-5 animate-bounce text-brand-gold" />
        </div>

      </div>
    </section>
  );
};