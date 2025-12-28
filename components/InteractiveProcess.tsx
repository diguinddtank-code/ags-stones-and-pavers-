import React, { useState } from 'react';
import { Search, PenTool, Hammer, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Consultation',
    subtitle: 'The Vision',
    description: 'We meet at your property to assess the terrain, listen to your dreams, and establish a budget that works for you.',
    icon: <Search className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 2,
    title: '3D Design',
    subtitle: 'The Blueprint',
    description: 'See your future backyard before we dig. Our photorealistic 3D renderings ensure every curve meets your approval.',
    icon: <PenTool className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Installation',
    subtitle: 'The Craft',
    description: 'Master craftsmen execute the plan with ICPI standards. Precision grading, drainage, and stonework guaranteed to last.',
    icon: <Hammer className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1621256133234-29e2f41d4517?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Completion',
    subtitle: 'The Lifestyle',
    description: 'Final walkthrough, sealing, and cleanup. Your new outdoor sanctuary is ready for a lifetime of memories.',
    icon: <CheckCircle2 className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=1200&auto=format&fit=crop'
  }
];

export const InteractiveProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-24 bg-brand-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col md:flex-row justify-between items-end gap-6 fade-in-section">
        <div>
           <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-sm flex items-center gap-2">
             <Sparkles size={14} /> The Journey
           </span>
           <h2 className="mt-2 font-serif text-4xl md:text-5xl font-bold text-brand-dark">From Vision to Reality</h2>
        </div>
        <p className="text-gray-500 max-w-md text-sm md:text-right">
          A seamless, transparent experience designed to take the stress out of construction. Hover to explore our workflow.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[600px] md:h-[500px] flex flex-col md:flex-row gap-2 fade-in-section">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={`relative overflow-hidden rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group ${
              activeStep === index 
                ? 'flex-[5] md:flex-[3]' // Expanded size
                : 'flex-[1] md:flex-[0.5] hover:md:flex-[0.7]' // Collapsed size
            }`}
            onClick={() => setActiveStep(index)}
            onMouseEnter={() => setActiveStep(index)}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
               <img 
                 src={step.image} 
                 alt={step.title} 
                 className={`w-full h-full object-cover transition-transform duration-1000 ${
                    activeStep === index ? 'scale-100' : 'scale-125 grayscale-[50%]'
                 }`} 
               />
               <div className={`absolute inset-0 bg-brand-dark/60 transition-opacity duration-500 ${
                  activeStep === index ? 'opacity-40' : 'opacity-80'
               }`}></div>
               <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-90"></div>
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
              
              {/* Top: Number & Icon */}
              <div className="flex justify-between items-start">
                 <span className={`font-serif text-3xl font-bold text-white/20 transition-colors duration-300 ${activeStep === index ? 'text-brand-gold' : ''}`}>
                    0{step.id}
                 </span>
                 <div className={`p-2 rounded-full bg-white/10 backdrop-blur-md text-white transition-all duration-300 ${activeStep === index ? 'bg-brand-gold text-brand-dark rotate-0' : '-rotate-12'}`}>
                    {step.icon}
                 </div>
              </div>

              {/* Bottom: Text Info */}
              <div className="relative">
                 {/* Collapsed Title (Vertical on desktop, hidden on expanded) */}
                 <div className={`absolute bottom-0 left-0 origin-bottom-left -rotate-90 translate-y-full w-[300px] hidden md:block transition-opacity duration-300 ${activeStep === index ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="text-lg font-bold text-white tracking-widest uppercase whitespace-nowrap">{step.title}</span>
                 </div>

                 {/* Expanded Content */}
                 <div className={`transition-all duration-500 transform ${activeStep === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 md:hidden'}`}>
                    <span className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-1 block">{step.subtitle}</span>
                    <h3 className="text-2xl md:text-4xl font-serif font-bold text-white mb-4 leading-none">{step.title}</h3>
                    
                    <div className={`overflow-hidden transition-all duration-500 ${activeStep === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                       <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-lg mb-4">
                          {step.description}
                       </p>
                       <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                          Learn More <ArrowRight size={14} className="text-brand-gold" />
                       </div>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};