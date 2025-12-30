import React, { useState, useEffect } from 'react';
import { Home, Layers, Phone, Mail } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Optimization: Use IntersectionObserver instead of 'scroll' listener
    // This moves the calculation off the main thread.
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3 // Trigger when 30% of section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // If multiple intersect, the one most recently triggered wins, 
          // or we could check ratio. Simple check works well for vertical stacking.
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe key sections
    const sections = ['home', 'services', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handlePopupClose = () => {
      setShowNotification(true);
    };

    window.addEventListener('ags-popup-closed', handlePopupClose);

    return () => {
      observer.disconnect();
      window.removeEventListener('ags-popup-closed', handlePopupClose);
    };
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 inset-x-0 z-50 md:hidden flex justify-center pb-safe pointer-events-none">
      <div className="pointer-events-auto bg-[#0f1115]/90 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-between gap-8 w-auto max-w-[90%] mx-4">
        
        {/* Home */}
        <button 
          onClick={() => scrollTo('home')}
          className={`relative group transition-colors duration-300 ${activeSection === 'home' ? 'text-white' : 'text-gray-500'}`}
          aria-label="Home"
        >
          <Home size={22} strokeWidth={activeSection === 'home' ? 2.5 : 2} />
          {activeSection === 'home' && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full"></span>}
        </button>

        {/* Services */}
        <button 
          onClick={() => scrollTo('services')}
          className={`relative group transition-colors duration-300 ${activeSection === 'services' ? 'text-white' : 'text-gray-500'}`}
          aria-label="Services"
        >
          <Layers size={22} strokeWidth={activeSection === 'services' ? 2.5 : 2} />
          {activeSection === 'services' && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full"></span>}
        </button>

        {/* CALL BUTTON */}
        <a 
          href="tel:6784287630" 
          className="relative text-brand-gold hover:text-white transition-colors transform hover:scale-110 duration-300 px-2"
          aria-label="Call Us"
        >
           {showNotification && (
             <span className="absolute -top-1 -right-1 flex h-4 w-4 z-20">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] text-white items-center justify-center font-bold">1</span>
             </span>
           )}

           <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 z-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border-2 border-[#0f1115]"></span>
           </span>
           
           <Phone size={26} fill="currentColor" className="drop-shadow-lg" />
        </a>

        {/* Contact */}
        <button 
          onClick={() => scrollTo('contact')}
          className={`relative group transition-colors duration-300 ${activeSection === 'contact' ? 'text-white' : 'text-gray-500'}`}
          aria-label="Contact"
        >
          <Mail size={22} strokeWidth={activeSection === 'contact' ? 2.5 : 2} />
          {activeSection === 'contact' && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full"></span>}
        </button>

      </div>
    </div>
  );
};