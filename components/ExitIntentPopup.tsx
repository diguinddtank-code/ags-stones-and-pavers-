import React, { useState, useEffect } from 'react';
import { X, Sparkles, Phone, ArrowRight } from 'lucide-react';

export const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Logic: If mouse leaves the top of the viewport (y < 0) and we haven't shown it yet
      if (e.clientY <= 0 && !hasShown) {
        // Check local storage to see if we showed it recently (e.g., in the last 7 days)
        const lastShownDate = localStorage.getItem('ags_exit_popup_date');
        const now = new Date().getTime();
        const sevenDays = 7 * 24 * 60 * 60 * 1000;

        if (!lastShownDate || now - parseInt(lastShownDate) > sevenDays) {
           setIsVisible(true);
           setHasShown(true);
           localStorage.setItem('ags_exit_popup_date', now.toString());
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
        onClick={() => setIsVisible(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-[#0f1115] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-[scaleIn_0.3s_ease-out] border border-white/10">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 z-20 p-2 bg-black/20 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left Side: Image */}
        <div className="hidden md:block md:w-5/12 relative">
          <img 
            src="https://i.imgur.com/Os17LF8.png" 
            alt="Luxury Patio Design" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-transparent"></div>
          
          <div className="absolute bottom-8 left-8 text-white">
            <div className="flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-widest mb-2">
               <Sparkles size={14} /> Design Services
            </div>
            <p className="font-serif text-2xl font-bold leading-tight">
               Don't leave your <br/> dream project behind.
            </p>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-7/12 p-8 md:p-12 text-white flex flex-col justify-center">
           <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-white">
             Wait! Start with a <br/>
             <span className="text-brand-gold">Complimentary 3D Design</span>
           </h3>
           
           <p className="text-gray-400 mb-8 leading-relaxed">
             Before you decide, let us show you what's possible. We provide professional 3D visualization so you can see your future retaining wall, patio, or kitchen before we build it.
           </p>

           <div className="space-y-4">
              <a 
                href="tel:6784287630" 
                className="flex items-center justify-center gap-3 w-full py-4 bg-brand-gold hover:bg-white text-white hover:text-brand-dark font-bold rounded-xl transition-all uppercase tracking-wide shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                <Phone size={18} /> Call to Schedule: (678) 428-7630
              </a>
              
              <a 
                href="tel:6784287630"
                onClick={() => setIsVisible(false)}
                className="flex items-center justify-center gap-2 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all"
              >
                <span>Request Quote & Design Info</span>
                <ArrowRight size={16} />
              </a>
           </div>
           
           <p className="text-center text-xs text-gray-500 mt-6">
             No obligation consultation. Expert Advice.
           </p>
        </div>

      </div>
    </div>
  );
};