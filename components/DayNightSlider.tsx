import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Lightbulb } from 'lucide-react';

export const DayNightSlider: React.FC = () => {
  const [isNight, setIsNight] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Observer local para ativar animações (fade-in) já que o componente é Lazy Loaded
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
    <section ref={sectionRef} className="pt-32 pb-48 bg-brand-dark relative overflow-hidden">
      {/* Background Ambience */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isNight ? 'opacity-100' : 'opacity-0'}`}>
         <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[150px]"></div>
      </div>
      <div className={`absolute inset-0 transition-opacity duration-1000 ${!isNight ? 'opacity-100' : 'opacity-0'}`}>
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           
           <div className="fade-in-section">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-widest mb-6">
                 <Lightbulb size={14} /> Day to Night Transformation
              </div>
              
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
                Your Oasis Doesn't Sleep <br/>
                <span className="text-brand-gold">When The Sun Sets.</span>
              </h2>
              
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                 We design outdoor living spaces that are just as magical at night. From integrated LED step lights to moonlighting in trees and under-cap hardscape lighting, we extend your enjoyment long into the evening.
              </p>

              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                 <h4 className="font-bold text-white mb-4">Lighting Services Include:</h4>
                 <ul className="grid grid-cols-2 gap-4">
                    {['Pathway Lighting', 'Up-lighting Trees', 'Retaining Wall Lights', 'Pool Deck Ambience'].map((item, i) => (
                       <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                          <div className={`w-2 h-2 rounded-full ${isNight ? 'bg-brand-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]' : 'bg-gray-500'}`}></div>
                          {item}
                       </li>
                    ))}
                 </ul>
              </div>
           </div>

           {/* Interactive Display */}
           <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group fade-in-section delay-200">
              
              {/* Day Image - OPTIMIZED: Imgur 'h' + .webp */}
              <img 
                src="https://i.imgur.com/lCsQQavh.webp" 
                alt="Patio Day" 
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isNight ? 'opacity-0' : 'opacity-100'}`}
                loading="lazy"
              />
              
              {/* Night Image - Replaced broken link with stable Unsplash image */}
              <div className={`absolute inset-0 bg-brand-dark/40 mix-blend-multiply transition-opacity duration-1000 ${isNight ? 'opacity-100' : 'opacity-0'}`}></div>
              <img 
                 src="https://i.imgur.com/skbC8RZ.png"
                 alt="Patio Night"
                 className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${isNight ? 'opacity-100 grayscale-[20%] brightness-75 contrast-125' : 'opacity-0'}`}
                 loading="lazy"
              />
              
              {/* Fake Lighting Effects overlay when night */}
              <div className={`absolute inset-0 transition-opacity duration-1000 ${isNight ? 'opacity-100' : 'opacity-0'}`}>
                 {/* Warm glow spots simulating lights */}
                 <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-orange-400/30 blur-[40px] rounded-full mix-blend-screen animate-pulse"></div>
                 <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-orange-400/20 blur-[50px] rounded-full mix-blend-screen"></div>
                 <div className="absolute bottom-10 right-10 w-24 h-24 bg-brand-gold/40 blur-[30px] rounded-full mix-blend-screen"></div>
              </div>

              {/* Toggle Switch */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center bg-black/50 backdrop-blur-md p-1 rounded-full border border-white/20 z-20">
                 <button 
                   onClick={() => setIsNight(false)}
                   className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-xs uppercase transition-all ${
                      !isNight ? 'bg-white text-brand-dark shadow-lg' : 'text-gray-400 hover:text-white'
                   }`}
                 >
                    <Sun size={14} /> Day
                 </button>
                 <button 
                   onClick={() => setIsNight(true)}
                   className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-xs uppercase transition-all ${
                      isNight ? 'bg-brand-dark text-brand-gold shadow-lg border border-brand-gold/30' : 'text-gray-400 hover:text-white'
                   }`}
                 >
                    <Moon size={14} /> Night
                 </button>
              </div>

           </div>

        </div>
      </div>
    </section>
  );
};