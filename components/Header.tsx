import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  isHidden?: boolean;
  forceSolid?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isHidden = false, forceSolid = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50); // Threshold to trigger sticky header
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const solidState = forceSolid || isScrolled || isMobileMenuOpen;

  const navLinks = [
    { name: 'Services', href: '/services', isRoute: true },
    { name: 'About', href: '/about-us', isRoute: true },
    { name: 'Locations', href: '/service-areas', isRoute: true },
    { name: 'Portfolio', href: '/#portfolio', isRoute: false },
    { name: 'Contact', href: '/quote', isRoute: true },
  ];

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isHidden ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        } ${
          solidState
            ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3 border-b border-white/20' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative">
          
          {/* Logo Container - Always Visible now that Hero logo is gone */}
          <div className="flex-shrink-0 z-50 transition-all duration-500 opacity-100 translate-y-0">
             <a href="/" className="flex items-center gap-3 group">
                <img 
                  src="https://i.imgur.com/DkMxLum.png" 
                  alt="AGS Stones and Pavers" 
                  className={`h-10 w-auto md:h-12 object-contain transition-all duration-300 ${
                    solidState ? 'brightness-0' : 'brightness-0 invert'
                  }`}
                />
             </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-medium text-xs uppercase tracking-widest transition-all hover:-translate-y-0.5 relative group ${
                    solidState ? 'text-brand-dark' : 'text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full`}></span>
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className={`font-medium text-xs uppercase tracking-widest transition-all hover:-translate-y-0.5 relative group ${
                    solidState ? 'text-brand-dark' : 'text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full`}></span>
                </a>
              )
            ))}
            <Link
              to="/quote"
              className={`flex items-center gap-2 px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest transition-all shadow-lg transform hover:-translate-y-1 relative group ${
                 solidState ? 'bg-brand-dark text-white hover:bg-brand-gold' : 'bg-white text-brand-dark hover:bg-brand-gold hover:text-white'
              }`}
            >
               {/* Online Dot */}
               <span className="flex h-2 w-2 relative mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
               </span>
               {/* Inline SVG Phone */}
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-current">
                 <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
               </svg>
              Free Estimate
            </Link>
          </nav>

          {/* Mobile Menu Toggle & CTA */}
          <div className="md:hidden flex items-center gap-3">
             <Link
                to="/quote"
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${
                   solidState ? 'bg-brand-gold text-white shadow-md' : 'bg-white/10 backdrop-blur-md text-white'
                }`}
                aria-label="Get Quote"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-current">
                   <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                 </svg>
              </Link>
              
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-md transition-colors ${
                  solidState ? 'text-brand-dark' : 'text-white'
                }`}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <div 
          className={`md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 transition-all duration-300 origin-top overflow-hidden ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col px-6 py-8 space-y-4">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-bold text-sm uppercase tracking-widest text-brand-dark py-3 border-b border-gray-50 flex items-center justify-between group"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-bold text-sm uppercase tracking-widest text-brand-dark py-3 border-b border-gray-50 flex items-center justify-between group"
                >
                  {link.name}
                </a>
              )
            ))}
            <Link
              to="/quote"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full mt-6 bg-brand-dark text-white px-6 py-4 rounded-md font-bold text-sm uppercase tracking-widest shadow-md hover:bg-brand-gold transition-colors"
            >
              Get a Free Estimate
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};