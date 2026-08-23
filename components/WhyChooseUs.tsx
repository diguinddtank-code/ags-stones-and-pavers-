import React, { useState, useEffect, useRef } from 'react';
import { HardHat } from 'lucide-react';

// --- ANIMATED COUNTER HOOK ---
const useCounter = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(ease * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
};

// --- DYNAMIC SVG ICONS ---
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-brand-gold">
    <path 
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="animate-[draw_2s_ease-in-out_forwards]"
      style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
    />
    <path 
      d="M9 12l2 2 4-4" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="animate-[draw_0.5s_ease-in-out_1.5s_forwards] opacity-0"
    />
  </svg>
);

const IconAward = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-brand-gold">
    <circle cx="12" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" className="animate-[pulse_3s_infinite]" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="8" r="2" fill="currentColor" className="animate-ping opacity-75" />
  </svg>
);

const Icon3D = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-brand-gold">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.27 6.96 12 12.01l8.73-5.05" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 22.08V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="10" y="10" width="4" height="4" fill="currentColor" className="animate-bounce" />
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-brand-gold">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 11a4 4 0 0 0 0-8 4 4 0 0 0 0 8z" fill="currentColor" className="opacity-20 animate-pulse" />
  </svg>
);

// --- SPOTLIGHT CARD COMPONENT ---
const SpotlightCard = ({ title, description, icon, index }: { title: string, description: string, icon: React.ReactNode, index: number }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className="relative group bg-white/5 border border-white/10 rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 hover:border-brand-gold/30 hover:bg-white/10 w-full h-full"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(212,175,55,0.15), transparent 40%)`,
        }}
      />
      
      <div className="relative p-5 md:p-8 h-full flex flex-col">
        <div className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-6 p-2 rounded-lg md:rounded-xl bg-brand-dark border border-brand-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
           {icon}
        </div>
        
        <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-brand-gold transition-colors">{title}</h3>
        <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{description}</p>
        
        <div className="absolute bottom-0 left-0 h-1 bg-brand-gold w-0 group-hover:w-full transition-all duration-700 ease-out" />
      </div>
    </div>
  );
};


export const WhyChooseUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const countYears = useCounter(15, 2000, isVisible);
  const countProjects = useCounter(500, 2500, isVisible);
  const countRating = useCounter(100, 1500, isVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  
  const benefits = [
    { 
      title: '1-Year Warranty', 
      description: 'Comprehensive installation warranty on all hardscapes.',
      icon: <IconShield /> 
    },
    { 
      title: 'Licensed & Insured', 
      description: 'Fully licensed in GA carrying $2M liability insurance.',
      icon: <IconAward /> 
    },
    { 
      title: '3D Visualization', 
      description: 'See your dream backyard rendered before we build.',
      icon: <Icon3D /> 
    },
    { 
      title: 'Owner On-Site', 
      description: 'Personal oversight ensuring high standards daily.',
      icon: <IconUser /> 
    }
  ];

  return (
    <section 
        ref={sectionRef} 
        id="why-us" 
        className="py-16 md:py-32 relative overflow-hidden bg-[#0f1115] text-white"
    >
      <style>{`
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
          
          {/* Left Column: Text & Stats */}
          <div className="lg:col-span-5 flex flex-col">
             <div className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 md:mb-6 backdrop-blur-md w-fit">
                     <HardHat size={14} /> The AGS Standard
                 </div>
                 
                 <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4 md:mb-8 text-white">
                   Not Just Contractors. <br/>
                   <span className="text-brand-gold">
                     Hardscape Artisans.
                   </span>
                 </h2>
                 
                 <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-8 md:mb-10 border-l-2 border-brand-gold/30 pl-4 md:pl-6">
                   In an industry full of shortcuts, we choose the hard way. We dig deeper foundations, use premium base materials, and obsess over every joint line.
                 </p>
             </div>
             
             {/* Stats Row */}
             <div className="grid grid-cols-3 gap-3 md:gap-4 border-t border-white/10 pt-6 md:pt-8 mt-auto">
                <div className={`transition-all duration-700 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                   <div className="text-2xl md:text-4xl font-bold text-white mb-1 flex items-baseline">
                      {countYears}<span className="text-brand-gold text-lg md:text-xl">+</span>
                   </div>
                   <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500 font-bold">Years Experience</div>
                </div>

                <div className={`transition-all duration-700 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                   <div className="text-2xl md:text-4xl font-bold text-white mb-1 flex items-baseline">
                      {countProjects}<span className="text-brand-gold text-lg md:text-xl">+</span>
                   </div>
                   <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500 font-bold">Projects Done</div>
                </div>

                <div className={`transition-all duration-700 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                   <div className="text-2xl md:text-4xl font-bold text-white mb-1 flex items-baseline">
                      {countRating}<span className="text-brand-gold text-lg md:text-xl">%</span>
                   </div>
                   <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500 font-bold">Satisfaction</div>
                </div>
             </div>
          </div>

          {/* Right Column: Grid Layout (Fixed Responsiveness) */}
          <div className="lg:col-span-7">
             {/* Switched from Carousel to Grid for guaranteed responsiveness */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 perspective-[1000px]">
                {benefits.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`transform transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <SpotlightCard 
                       index={idx}
                       title={item.title} 
                       description={item.description} 
                       icon={item.icon} 
                    />
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};