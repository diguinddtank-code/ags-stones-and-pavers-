import React, { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';

type WidgetState = 'HIDDEN' | 'TYPING' | 'VISIBLE' | 'MINIMIZED';

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
    setStage('MINIMIZED');
    setHasBeenClosed(true);
  };

  const handleOpen = () => {
    setStage('VISIBLE');
  };

  if (stage === 'HIDDEN') return null;

  return (
    // MAIN CONTAINER: Fixed Bottom Right.
    // Mobile: Bottom-24 (above nav), Right-2 (tight to edge)
    // Desktop: Bottom-8, Right-8
    <div className="fixed bottom-24 right-2 md:bottom-8 md:right-8 z-[60] flex flex-col items-end pointer-events-none">
       
       {/* INNER CONTAINER: Stack Vertically (Reverse) */}
       <div className="pointer-events-auto flex flex-col-reverse items-end gap-2 md:gap-3 w-auto">
          
          {/* 1. AVATAR (Bottom Element) */}
          <div 
            className={`relative flex-shrink-0 transition-transform duration-300 ${stage === 'MINIMIZED' ? 'cursor-pointer hover:scale-110' : ''}`}
            onClick={stage === 'MINIMIZED' ? handleOpen : undefined}
          >
             {/* INCREASED SIZE: w-12 h-12 (48px) mobile, w-16 h-16 (64px) desktop */}
             <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white shadow-lg overflow-hidden relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" 
                  alt="AGS Design Specialist" 
                  className="w-full h-full object-cover"
                />
             </div>
             
             {/* Notification Badge (Only when MINIMIZED) */}
             {stage === 'MINIMIZED' && (
               <div className="absolute -top-1 -right-1 z-20 flex h-4 w-4 md:h-5 md:w-5 animate-[bounce_2s_infinite]">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-full w-full bg-red-500 text-white text-[9px] md:text-[10px] font-bold items-center justify-center border-2 border-white">
                    1
                  </span>
               </div>
             )}

             {/* Online Status Dot (Only when NOT minimized) */}
             {stage !== 'MINIMIZED' && (
                <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-green-500 border-2 border-white rounded-full z-20"></div>
             )}
          </div>

          {/* 2. CHAT BUBBLE (Top Element) */}
          {stage !== 'MINIMIZED' && (
            <div className="origin-bottom-right animate-[scaleIn_0.3s_ease-out] flex flex-col items-end shadow-xl rounded-2xl rounded-br-none border border-gray-100 bg-white overflow-hidden transition-all duration-300 max-w-[240px] md:max-w-[320px]">
               
              {stage === 'TYPING' ? (
                // TYPING STATE
                <div className="p-3 md:p-4 flex items-center gap-1.5">
                   <span className="text-[10px] md:text-xs text-gray-400 font-medium mr-1">Jessica is typing</span>
                   <div className="flex gap-1">
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                   </div>
                </div>
              ) : (
                // VISIBLE MESSAGE STATE
                // Increased padding and font sizes slightly
                <div className="relative p-4 md:p-5 w-full">
                   <button 
                      onClick={handleClose}
                      className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 p-1"
                      aria-label="Close chat"
                   >
                      <X size={14} className="md:w-5 md:h-5" />
                   </button>

                   <div className="mb-1 text-left">
                      <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-brand-gold">Design Specialist</span>
                      {/* Mobile: Text-sm | Desktop: Text-base */}
                      <h4 className="font-serif font-bold text-brand-dark text-sm md:text-base leading-tight mt-0.5">
                         Hi! Thinking about a new patio?
                      </h4>
                   </div>
                   
                   {/* Mobile: Text-xs | Desktop: Text-sm */}
                   <p className="text-xs md:text-sm text-gray-500 mb-4 leading-relaxed text-left">
                      I can schedule a free estimate or 3D design consultation for you.
                   </p>

                   {/* INCREASED BUTTON SIZE AND PADDING FOR BETTER TAP TARGET */}
                   <a 
                     href="tel:6784287630" 
                     className="flex items-center justify-center gap-2 bg-brand-dark text-white hover:bg-brand-gold transition-colors py-3 px-4 rounded-md font-bold text-xs md:text-sm uppercase tracking-wide w-full shadow-md group"
                   >
                      <Phone size={16} className="group-hover:rotate-12 transition-transform" />
                      Call: (678) 428-7630
                   </a>
                </div>
              )}
            </div>
          )}
       </div>

    </div>
  );
};