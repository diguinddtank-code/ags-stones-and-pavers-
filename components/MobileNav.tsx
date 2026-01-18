import React, { useState, useEffect } from 'react';
import { Home, Layers, Phone, Mail, Image } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Trigger entry animation after mount
    setTimeout(() => setIsMounted(true), 100);

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = ['home', 'services', 'local-projects', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NavIcon = ({ id, icon: Icon, isActive }: { id: string, icon: any, isActive: boolean }) => (
      <button 
        onClick={() => scrollTo(id)}
        className={`relative p-1.5 flex flex-col items-center justify-center w-8 transition-all duration-300 group ${
           isActive ? 'text-brand-gold -translate-y-0.5' : 'text-gray-400 hover:text-white'
        }`}
        aria-label={id}
      >
        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className="transition-transform duration-300 group-active:scale-90" />
        
        {/* Animated Active Dot - Smaller now */}
        <span className={`absolute -bottom-1.5 w-0.5 h-0.5 bg-brand-gold rounded-full transition-all duration-300 ${
            isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}></span>
      </button>
  );

  return (
    <div 
        className={`fixed bottom-5 left-0 right-0 z-50 md:hidden flex justify-center pointer-events-none transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${
            isMounted ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
        }`}
    >
       <div className="bg-[#0f1115]/95 backdrop-blur-xl border border-white/10 rounded-full px-5 py-1.5 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.8)] flex items-center gap-3 pointer-events-auto ring-1 ring-white/5 relative">
          
          <NavIcon id="home" icon={Home} isActive={activeSection === 'home'} />
          <NavIcon id="services" icon={Layers} isActive={activeSection === 'services'} />
          
          {/* Animated Call Button - Smaller (44px) and tighter positioning */}
          <div className="relative -top-4 mx-1 group">
             {/* Pulsing Glow */}
             <div className="absolute inset-0 bg-brand-gold/40 rounded-full blur-md animate-pulse group-hover:bg-brand-gold/60 transition-all"></div>
             
             <a 
                href="tel:6784287630"
                className="relative flex items-center justify-center w-11 h-11 bg-gradient-to-b from-brand-gold to-[#b8860b] rounded-full shadow-[0_4px_10px_rgba(212,175,55,0.3)] border-[3px] border-[#0f1115] text-white transform transition-all duration-300 active:scale-95 group-hover:-translate-y-1"
                aria-label="Call Now"
             >
                <Phone size={18} fill="currentColor" className="drop-shadow-sm" />
             </a>
          </div>

          <NavIcon id="local-projects" icon={Image} isActive={activeSection === 'local-projects'} />
          <NavIcon id="contact" icon={Mail} isActive={activeSection === 'contact'} />
       </div>
    </div>
  );
};