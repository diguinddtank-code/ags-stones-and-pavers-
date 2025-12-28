import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal, ArrowRight, ArrowLeft } from 'lucide-react';

export const BeforeAfter: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  };

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => { if (isDragging.current) handleMove(e.clientX); };
  const handleTouchMove = (e: React.TouchEvent) => { handleMove(e.touches[0].clientX); };

  useEffect(() => {
    const handleGlobalMouseUp = () => { isDragging.current = false; };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <section id="portfolio" className="pt-32 pb-48 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          
          <div className="md:col-span-1 fade-in-section">
            <h2 className="font-serif text-4xl font-bold text-brand-dark mb-6">Visual Proof of Excellence</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We specialize in taking undefined, unusable yards and turning them into architectural masterpieces. Drag the slider to witness the AGS transformation power.
            </p>
            <div className="flex items-center gap-2 text-brand-gold font-bold uppercase tracking-widest text-xs animate-pulse">
               <ArrowLeft size={16} /> Drag to Compare <ArrowRight size={16} />
            </div>
          </div>

          <div className="md:col-span-2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl select-none fade-in-section group">
            <div 
              ref={containerRef}
              className="relative w-full h-full cursor-ew-resize"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* After Image */}
              <div className="absolute inset-0">
                 <img 
                   src="https://i.imgur.com/KPsOHF5.png" 
                   alt="After transformation" 
                   className="w-full h-full object-cover"
                   draggable={false}
                 />
                 <div className="absolute top-6 right-6 bg-brand-gold text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">After</div>
              </div>

              {/* Before Image */}
              <div 
                className="absolute inset-0 overflow-hidden border-r-4 border-white"
                style={{ width: `${sliderPosition}%` }}
              >
                <img 
                  src="https://i.imgur.com/ajYqmx2.png" 
                  alt="Before transformation" 
                  className="w-full h-full object-cover max-w-none grayscale"
                  style={{ width: containerRef.current?.offsetWidth || '100%' }}
                  draggable={false}
                />
                <div className="absolute top-6 left-6 bg-brand-dark/80 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Before</div>
              </div>

              {/* Slider Handle */}
              <div 
                className="absolute top-0 bottom-0 w-0 z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-[0_0_30px_rgba(0,0,0,0.3)] flex items-center justify-center text-brand-dark transform transition-transform group-hover:scale-110">
                  <MoveHorizontal size={24} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};