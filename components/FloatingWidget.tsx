import React, { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';

export const FloatingWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);

  useEffect(() => {
    // Auto-open popup after 5 seconds if it hasn't been closed before
    const timer = setTimeout(() => {
      if (!hasBeenClosed) {
        setIsOpen(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [hasBeenClosed]);

  const handleClose = () => {
    setIsOpen(false);
    setHasBeenClosed(true);
    // Dispatch event to notify MobileNav to show the notification badge
    window.dispatchEvent(new CustomEvent('ags-popup-closed'));
  };

  if (!isOpen) return null;

  return (
    // Positioned to sit nicely above the Mobile Nav (bottom-24) and bottom-right on Desktop
    <div className="fixed bottom-28 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-[60] flex flex-col items-center md:items-end animate-[fade-up_0.5s_ease-out]">
       
       {/* Popup Bubble */}
       <div className="bg-white p-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] w-full max-w-xs relative border border-gray-100">
          
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-2 right-2 p-1 text-gray-300 hover:text-gray-500 transition-colors"
          >
             <X size={14} />
          </button>

          {/* Online Indicator Inside Popup */}
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Online Now</span>
          </div>

          <h4 className="font-serif font-bold text-brand-dark text-lg mb-1">Questions?</h4>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Our design team is available to discuss your project instantly.
          </p>
          
          <a 
            href="tel:6784287630" 
            className="flex items-center justify-center gap-2 bg-brand-dark text-white hover:bg-brand-gold transition-colors py-3 px-4 rounded-xl font-bold text-sm w-full shadow-lg"
          >
             <Phone size={16} />
             Call (678) 428-7630
          </a>
       </div>
    </div>
  );
};