import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Lightbulb } from 'lucide-react';

export const DayNightSlider: React.FC = () => {
  const [isNight, setIsNight] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
        sectionRef.current.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
        ref={sectionRef} 
        className={`py-20 md:py-32 relative overflow-hidden transition-colors duration-1000 ease-in-out ${isNight ? 'bg-[#0b0c10] text-white' : 'bg-gray-50 text-brand-dark'}`}
    >
      
      {/* Dynamic Background Gradients */}
      <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${isNight ? 'opacity-100' : 'opacity-0'}`}>
         <div className="absolute top-1/2 left-0 w-full h-full bg-gradient-to-t from-blue-900/10 to-transparent"></div>
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]"></div>
      </div>
      <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${!isNight ? 'opacity-100' : 'opacity-0'}`}>
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col gap-8 md:gap-12">
           
           {/* Header Content */}
           <div className="text-center max-w-3xl mx-auto fade-in-section">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
                 <Lightbulb size={14} /> 24/7 Curb Appeal
              </div>
              
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold mb-6 transition-colors duration-700 leading-tight">
                Your Oasis Doesn't Sleep <br/>
                <span className={`transition-colors duration-700 ${isNight ? 'text-blue-200' : 'text-brand-gold'}`}>
                   When The Sun Sets.
                </span>
              </h2>
              
              <p className={`text-sm md:text-lg transition-colors duration-700 mx-auto ${isNight ? 'text-gray-400' : 'text-gray-600'}`}>
                 Integrated landscape lighting transforms your hardscape into an evening sanctuary. 
                 Use the switch below to experience the ambiance.
              </p>
           </div>

           {/* Interactive Container */}
           <div className="relative w-full max-w-5xl mx-auto fade-in-section">
              
              {/* Image Container */}
              <div className="relative aspect-[4/3] md:aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-[4px] md:border-[6px] border-white/10 group select-none transition-all duration-500">
                  
                  {/* NIGHT IMAGE (Base Layer) */}
                  <div className="absolute inset-0 bg-[#050505]">
                      <img 
                         src="https://i.imgur.com/skbC8RZ.png"
                         alt="Patio Night"
                         className="w-full h-full object-cover grayscale-[10%] brightness-110 contrast-125 transition-transform duration-[2000ms] ease-out"
                         style={{ transform: isNight ? 'scale(1.05)' : 'scale(1)' }}
                      />
                  </div>

                  {/* DAY IMAGE (Top Layer - Fades Out) */}
                  <div 
                     className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isNight ? 'opacity-0' : 'opacity-100'}`}
                  >
                      <img 
                        src="https://i.imgur.com/lCsQQavh.webp" 
                        alt="Patio Day" 
                        className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out"
                        style={{ transform: !isNight ? 'scale(1.05)' : 'scale(1)' }}
                      />
                  </div>

                  {/* Switch Control - Centered & Premium */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
                     <button
                        onClick={() => setIsNight(!isNight)}
                        className="relative flex items-center bg-black/40 backdrop-blur-xl border border-white/20 rounded-full p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all hover:scale-105 group active:scale-95"
                     >
                        {/* Toggle Background Pill */}
                        <div className="w-32 h-10 md:w-40 md:h-12 bg-black/50 rounded-full relative overflow-hidden">
                           <div className={`absolute top-0 bottom-0 w-1/2 bg-gradient-to-br from-brand-gold to-yellow-600 rounded-full transition-all duration-500 shadow-lg ${isNight ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}></div>
                           <div className={`absolute top-0 bottom-0 w-1/2 bg-gradient-to-br from-blue-600 to-indigo-900 rounded-full transition-all duration-500 shadow-lg ${isNight ? 'translate-x-full opacity-100' : 'translate-x-0 opacity-0'}`}></div>
                        </div>

                        {/* Labels & Icons overlay */}
                        <div className="absolute inset-0 flex justify-between items-center px-1 text-[10px] md:text-xs font-bold uppercase tracking-widest pointer-events-none">
                           <div className={`w-1/2 flex items-center justify-center gap-2 transition-colors duration-300 ${!isNight ? 'text-white' : 'text-gray-400'}`}>
                              <Sun size={16} className={!isNight ? 'animate-spin-slow' : ''} /> <span className="hidden md:inline">Day</span>
                           </div>
                           <div className={`w-1/2 flex items-center justify-center gap-2 transition-colors duration-300 ${isNight ? 'text-white' : 'text-gray-400'}`}>
                              <Moon size={16} className={isNight ? 'animate-pulse' : ''} /> <span className="hidden md:inline">Night</span>
                           </div>
                        </div>
                     </button>
                  </div>

                  {/* Corner Labels (Decorative) */}
                  <div className={`absolute top-4 left-4 md:top-6 md:left-6 transition-opacity duration-500 ${isNight ? 'opacity-0' : 'opacity-100'}`}>
                     <div className="bg-white/80 backdrop-blur-md text-brand-dark px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-2">
                        <Sun size={12} className="text-brand-gold" fill="currentColor" /> Day View
                     </div>
                  </div>
                  
                  <div className={`absolute top-4 right-4 md:top-6 md:right-6 transition-opacity duration-500 ${!isNight ? 'opacity-0' : 'opacity-100'}`}>
                     <div className="bg-black/60 backdrop-blur-md text-blue-100 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-2 border border-white/10">
                        <Moon size={12} className="text-blue-300" fill="currentColor" /> Night View
                     </div>
                  </div>

              </div>
           </div>

        </div>
      </div>
    </section>
  );
};