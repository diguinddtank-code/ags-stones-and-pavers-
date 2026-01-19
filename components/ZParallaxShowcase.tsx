import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export const ZParallaxShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for Direct DOM Manipulation
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    
    const updateParallax = () => {
       if (!containerRef.current) return;

       const rect = containerRef.current.getBoundingClientRect();
       const windowHeight = window.innerHeight;
       
       // Optimization: Stop loop if completely out of view
       if (rect.bottom < 0 || rect.top > windowHeight) return;

       const height = rect.height - windowHeight;
       const top = -rect.top;
       
       // Calculate progress (0 to 1)
       // We clamp strictly to avoid weird overshoot values
       const progress = Math.max(0, Math.min(1, top / height));
       
       // 1. Image Scaling (Subtle zoom out effect)
       if (imageContainerRef.current) {
          // Hardware accelerated transform only
          imageContainerRef.current.style.transform = `scale(${1.2 - (progress * 0.2)}) translate3d(0,0,0)`;
       }

       // 2. The Reveal (Instead of massive shadow, we just fade out the black overlay)
       // This is 100x more performant than box-shadow calculation
       if (overlayRef.current) {
          // Power curve delays the reveal slightly for drama
          const opacity = Math.max(0, 1 - Math.pow(progress, 1.5) * 1.5);
          overlayRef.current.style.opacity = opacity.toString();
       }

       // 3. Text Handling (Fade out and move up)
       if (textRef.current) {
          textRef.current.style.opacity = Math.max(0, 1 - progress * 3).toString();
          textRef.current.style.transform = `translateY(${progress * -50}px) translate3d(0,0,0)`;
          // Hide completely when scrolled past to prevent pointer events
          textRef.current.style.visibility = progress > 0.5 ? 'hidden' : 'visible';
       }

       // 4. Indicator
       if (scrollIndicatorRef.current) {
          scrollIndicatorRef.current.style.opacity = progress > 0.05 ? '0' : '1';
       }
    };

    const loop = () => {
      updateParallax();
      animationFrameId = requestAnimationFrame(loop);
    };

    // Start loop
    loop();

    return () => {
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    // Height reduced slightly to 200vh for a tighter feel
    <section ref={containerRef} className="relative h-[200vh] bg-[#0f1115]">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Layer 1: The Image (Scales Down) */}
        <div 
           ref={imageContainerRef}
           className="absolute inset-0 w-full h-full will-change-transform"
           style={{ transform: `scale(1.2) translate3d(0,0,0)` }}
        >
           <div className="relative w-full h-full">
              <picture>
                  <source media="(max-width: 768px)" srcSet="https://i.imgur.com/TVqAe9D.jpeg" />
                  <img 
                    src="https://i.imgur.com/6rQRJxs.jpeg" 
                    alt="Magnificent Outdoor Living and Pool Deck" 
                    className="w-full h-full object-cover"
                    loading="eager" 
                  />
              </picture>
              <div className="absolute inset-0 bg-black/10"></div>
           </div>
        </div>

        {/* Layer 2: The "Mask" (Simple Black Overlay that fades out) */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-[#0f1115] z-20 pointer-events-none will-change-opacity"
          style={{ opacity: 1 }}
        ></div>

        {/* Layer 3: The Text (Welcome Message) */}
        <div 
          ref={textRef}
          className="absolute z-30 text-center px-4 w-full flex flex-col items-center justify-center h-full pointer-events-none"
          style={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
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