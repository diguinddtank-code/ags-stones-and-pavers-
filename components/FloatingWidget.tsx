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
    // Positioned above Mobile Nav (bottom-24) on mobile, bottom-6 on desktop
    // Added padding adjustments to make it smaller
    <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-[60] flex flex-col items-center md:items-end animate-[fade-up_0.5s_ease-out]">
       
       {/* Popup Bubble - Reduced padding (p-4) and max-width (max-w-[260px]) */}
       <div className="bg-white p-4 rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] w-full max-w-[280px] relative border border-gray-100">
          
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-2 right-2 p-1 text-gray-300 hover:text-gray-500 transition-colors"
          >
             <X size={14} />
          </button>

          {/* Online Indicator Inside Popup */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Online Now</span>
          </div>

          <h4 className="font-serif font-bold text-brand-dark text-base mb-1">Questions?</h4>
          <p className="text-xs text-gray-600 mb-3 leading-relaxed">
            Our design team is available to discuss your project instantly.
          </p>
          
          <a 
            href="tel:6784287630" 
            className="flex items-center justify-center gap-2 bg-brand-dark text-white hover:bg-brand-gold transition-colors py-2.5 px-4 rounded-lg font-bold text-xs w-full shadow-lg"
          >
             <Phone size={14} />
             Call (678) 428-7630
          </a>
       </div>
    </div>
  );
};