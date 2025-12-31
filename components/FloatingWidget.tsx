import React, { useState, useEffect } from 'react';
import { Phone, X, MessageSquare } from 'lucide-react';

type WidgetState = 'HIDDEN' | 'TYPING' | 'VISIBLE';

export const FloatingWidget: React.FC = () => {
  const [stage, setStage] = useState<WidgetState>('HIDDEN');
  const [hasBeenClosed, setHasBeenClosed] = useState(false);

  useEffect(() => {
    if (hasBeenClosed) return;

    // Timeline:
    // 0s: Hidden
    // 4s: Starts "Typing"
    // 6.5s: Shows Message
    
    const typingTimer = setTimeout(() => {
      setStage('TYPING');
    }, 4000);

    const messageTimer = setTimeout(() => {
      setStage('VISIBLE');
    }, 6500);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(messageTimer);
    };
  }, [hasBeenClosed]);

  const handleClose = () => {
    setStage('HIDDEN');
    setHasBeenClosed(true);
    // Notify MobileNav to show badge
    window.dispatchEvent(new CustomEvent('ags-popup-closed'));
  };

  if (stage === 'HIDDEN') return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[60] flex flex-col items-end pointer-events-none">
       
       <div className="pointer-events-auto flex items-end gap-3 max-w-[350px]">
          
          {/* Avatar (Visible in both Typing and Visible states) */}
          <div className="relative flex-shrink-0">
             <div className="w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" 
                  alt="AGS Design Specialist" 
                  className="w-full h-full object-cover"
                />
             </div>
             {/* Online Status Dot */}
             <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          {/* Chat Bubble Container */}
          <div className="flex flex-col items-start shadow-2xl rounded-2xl rounded-bl-none border border-gray-100 bg-white overflow-hidden transition-all duration-300 origin-bottom-left animate-[scaleIn_0.3s_ease-out]">
             
            {stage === 'TYPING' ? (
              // TYPING STATE
              <div className="p-4 flex items-center gap-1.5">
                 <span className="text-xs text-gray-400 font-medium mr-1">Jessica is typing</span>
                 <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                 </div>
              </div>
            ) : (
              // VISIBLE MESSAGE STATE
              <div className="relative p-5 w-full max-w-[280px] md:max-w-[300px]">
                 <button 
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 p-1"
                    aria-label="Close chat"
                 >
                    <X size={14} />
                 </button>

                 <div className="mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Design Specialist</span>
                    <h4 className="font-serif font-bold text-brand-dark text-lg leading-tight">
                       Hi! Thinking about a new patio?
                    </h4>
                 </div>
                 
                 <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                    I can give you a quick estimate or schedule a 3D design consultation right now.
                 </p>

                 <a 
                   href="tel:6784287630" 
                   className="flex items-center justify-center gap-2 bg-brand-dark text-white hover:bg-brand-gold transition-colors py-3 px-4 rounded-lg font-bold text-xs w-full shadow-md group"
                 >
                    <Phone size={14} className="group-hover:rotate-12 transition-transform" />
                    Call Now: (678) 428-7630
                 </a>
              </div>
            )}
          </div>
       </div>

    </div>
  );
};