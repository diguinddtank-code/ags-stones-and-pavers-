import React, { useEffect, useState, useRef } from 'react';
import { Star, ShieldCheck, ArrowRight, Phone, ChevronDown } from 'lucide-react';

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
      // Allow offset calculation on mobile for fade effects, but limit parallax intensity
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Calculate offset only when hero is in view or just leaving view
        if (rect.bottom > -200) {
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
      // Changed to 100svh to fit mobile screens perfectly
      className="relative h-[100svh] flex flex-col items-center justify-center bg-brand-dark overflow-hidden"
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
             // Smoother parallax scaling for background
             transform: isMobile ? 'none' : `translateY(${offset * 0.4}px) scale(${1 + offset * 0.0005})`,
             willChange: 'transform' 
          }}
        >
          <source src="https://storage.googleapis.com/msgsndr/yRboz8P4zFeLUF6bAk8i/media/680a5a6f1eba4b32d1925215.mp4" type="video/mp4" />
          <img 
             src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop" 
             alt="Luxury Outdoor Living" 
             className="w-full h-full object-cover"
          />
        </video>
        
        {/* Darker Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-brand-dark/90" />
        
        {/* FLUID TRANSITION GRADIENT: Blends Hero into the next section (ZParallaxShowcase) */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0f1115] via-[#0f1115]/80 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Main Content Container - Centered */}
      <div 
        className="relative z-20 w-full max-w-4xl mx-auto px-6 flex flex-col items-center justify-center text-center h-full pt-16 sm:pt-0"
        style={{
           // Parallax Fade Out: Content moves down slightly and fades out as user scrolls
           // This prevents the text from clashing with the incoming section
           opacity: Math.max(0, 1 - offset / 600),
           transform: `translateY(${offset * 0.3}px)`,
           willChange: 'opacity, transform'
        }}
      >
        
          {/* MAIN LOGO - VISIBLE ONLY ON MOBILE */}
          <div className="lg:hidden mb-6 animate-[fade-up_0.8s_ease-out]">
            <img 
               src="https://i.imgur.com/DkMxLum.png" 
               alt="AGS Stones" 
               className="w-56 sm:w-64 h-auto brightness-0 invert drop-shadow-2xl"
            />
          </div>

          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-brand-gold/50 rounded-full bg-brand-dark/60 backdrop-blur-md animate-[fade-up_0.8s_ease-out_0.1s_both]">
             <Star className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
             <span className="text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">#1 Factory Direct Fabricator in GA</span>
          </div>
          
          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 drop-shadow-xl animate-[fade-up_0.8s_ease-out_0.2s_both]">
            Atlanta's Premier <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold italic">
              Granite & Pavers
            </span>
          </h1>
          
          {/* Subtext */}
          <p className="text-sm sm:text-lg text-gray-200 mb-8 max-w-2xl font-light leading-relaxed drop-shadow-md animate-[fade-up_0.8s_ease-out_0.3s_both]">
            Buy direct from the factory and save up to 30%. Expert installation of <strong>Granite, Quartz, Marble, and Custom Pavers</strong> in Duluth & Metro Atlanta.
          </p>
          
          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-[fade-up_0.8s_ease-out_0.4s_both]">
             {/* Primary Button - Gold */}
             <a 
                href="#contact" 
                className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-white text-white hover:text-brand-dark font-bold rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 uppercase tracking-widest text-sm transition-all duration-300 transform hover:-translate-y-1"
             >
                Get Free Quote <ArrowRight className="w-4 h-4" />
             </a>
             
             {/* Secondary Button - Outline/Transparent */}
             <a 
                href="tel:6784287630" 
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 hover:bg-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest text-sm backdrop-blur-sm transition-all duration-300"
             >
                <Phone className="w-4 h-4" /> Call Now
             </a>
          </div>

          {/* Social Proof Widget */}
          <div className="mt-10 sm:mt-12 animate-[fade-up_0.8s_ease-out_0.5s_both]">
            <a 
              href="#testimonials"
              className="group inline-flex items-center gap-4 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/20 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer"
            >
                <div className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-lg relative z-10">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                        alt="Google" 
                        className="w-full h-full" 
                    />
                </div>
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-lg leading-none group-hover:text-brand-gold transition-colors">5.0</span>
                        <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-[#F4B400] fill-[#F4B400]" />)}
                        </div>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-xs text-gray-300 font-medium group-hover:text-white transition-colors">120+ Excellent Reviews</span>
                        <ArrowRight className="w-3 h-3 text-brand-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                </div>
            </a>
          </div>

      </div>

      {/* Scroll Down Indicator - Fades out quickly on scroll */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white/50 hidden sm:block transition-opacity duration-300"
        style={{ opacity: Math.max(0, 1 - offset / 100) }}
      >
          <ChevronDown size={24} />
      </div>

    </section>
  );
};