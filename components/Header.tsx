import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileLogo, setShowMobileLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      // On mobile, show header logo only after passing the Hero section substantially
      setShowMobileLogo(scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3 border-b border-white/20' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative">
          
          {/* Logo Container */}
          <div className="flex-shrink-0 z-50">
             <a href="#" className="flex items-center gap-3 group">
                {/* 
                   Logo Contrast Logic:
                   - Top of page (Dark BG): brightness-0 invert (Turns logo WHITE)
                   - Scrolled (White BG): brightness-0 (Turns logo BLACK)
                   This ensures maximum visibility on mobile and desktop.
                */}
                <img 
                  src="https://agsstonesandpavers.com/wp-content/uploads/2023/05/Design-sem-nome-18.png" 
                  alt="AGS Stones and Pavers" 
                  className={`h-10 w-auto md:h-14 object-contain transition-all duration-500 transform
                    ${isScrolled ? 'brightness-0' : 'brightness-0 invert'}
                    ${showMobileLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-90 md:opacity-100 md:scale-100'}
                  `}
                />
             </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-medium text-xs uppercase tracking-widest transition-all hover:-translate-y-0.5 relative group ${
                  isScrolled ? 'text-brand-dark' : 'text-white'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full`}></span>
              </a>
            ))}
            <a
              href="tel:+16784287630"
              className={`flex items-center gap-2 px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest transition-all shadow-lg transform hover:-translate-y-1 relative group ${
                 isScrolled ? 'bg-brand-dark text-white hover:bg-brand-gold' : 'bg-white text-brand-dark hover:bg-brand-gold hover:text-white'
              }`}
            >
               {/* Online Dot */}
               <span className="flex h-2 w-2 relative mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
               </span>
              <Phone size={14} className="fill-current" />
              Free Estimate
            </a>
          </nav>

          {/* Mobile Phone Icon (visible only when scrolled, simple alternative to bottom nav) */}
           <a
              href="tel:+16784287630"
              className={`md:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${
                 isScrolled ? 'bg-brand-gold text-white shadow-md opacity-100 translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
              }`}
            >
              <Phone size={18} className="fill-current" />
            </a>

        </div>
      </header>
    </>
  );
};