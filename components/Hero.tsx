import React, { useEffect, useState, useRef } from 'react';

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
      // PERFORMANCE: Disable Parallax Math on Mobile
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
    <section 
      ref={sectionRef} 
      id="home" 
      className="relative h-screen min-h-[600px] md:min-h-[800px] flex flex-col justify-center items-center overflow-hidden bg-brand-dark pt-20 pb-48 md:pt-20 md:pb-40"
    > 
      
      {/* Background Video Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop"
          className="w-full h-full object-cover object-center opacity-60 transition-transform duration-100 ease-linear"
          style={{ 
             transform: isMobile ? 'none' : `translateY(${offset * 0.4}px) scale(${1 + offset * 0.0005})`,
             willChange: 'transform' 
          }}
        >
          {/* UPDATED LOOPING VIDEO */}
          <source src="https://storage.googleapis.com/msgsndr/yRboz8P4zFeLUF6bAk8i/media/680a5a6f1eba4b32d1925215.mp4" type="video/mp4" />
          <img 
             src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop" 
             alt="Luxury Outdoor Living" 
             className="w-full h-full object-cover"
          />
        </video>
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-0">
        
        {/* LOGO CONTAINER */}
        <div 
          className="md:hidden mb-4 transition-all duration-300 ease-out"
          style={{ 
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
          {/* Trust Badge / Header Social Proof */}
          <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-3 py-1.5 md:px-4 md:py-2 border border-white/20 rounded-full bg-white/5 backdrop-blur-md animate-[fade-up_1s_ease-out]">
            <div className="flex gap-0.5">
               {[1,2,3,4,5].map(i => (
                 <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 md:w-3 md:h-3 text-brand-gold">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                 </svg>
               ))}
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
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-[fade-up_1s_ease-out_0.6s_both]">
            <a 
              href="tel:6784287630" 
              className="group relative overflow-hidden px-8 py-4 md:px-10 md:py-5 bg-brand-gold text-white font-bold rounded-sm shadow-[0_0_40px_-10px_rgba(212,175,55,0.6)] transition-all hover:scale-105 w-full md:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-xs md:text-sm">
                Request Free Estimate
              </span>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </a>

            {/* SOCIAL PROOF WIDGET IN HERO */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
               <div className="bg-white rounded-full p-1.5">
                  <svg className="w-4 h-4" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  </svg>
               </div>
               <div className="text-left">
                  <div className="flex text-brand-gold text-[10px]">
                     {[1,2,3,4,5].map(i => <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                  </div>
                  <span className="text-[10px] text-white font-medium">5.0 | 120+ Reviews</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60"
        style={{ opacity: isMobile ? 1 : Math.max(0, 1 - offset / 200) }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] animate-pulse">Scroll</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 animate-bounce">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
};