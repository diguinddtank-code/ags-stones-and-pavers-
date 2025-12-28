import React from 'react';
import { ShieldCheck, Award, MonitorPlay, UserCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  
  const benefits = [
    { 
      title: '5-Year Warranty', 
      description: 'We stand firmly behind our craftsmanship with a comprehensive 5-year installation warranty on all hardscapes.',
      icon: <ShieldCheck /> 
    },
    { 
      title: 'Licensed & Insured', 
      description: 'Fully licensed in Georgia and carrying $2M in general liability insurance for your complete protection.',
      icon: <Award /> 
    },
    { 
      title: '3D Visualization', 
      description: 'Complimentary 3D renderings with every project, so you can see your dream backyard before we build.',
      icon: <MonitorPlay /> 
    },
    { 
      title: 'Owner On-Site', 
      description: 'The owner personally oversees every project, ensuring our high standards of quality are met daily.',
      icon: <UserCheck /> 
    }
  ];

  return (
    <section id="why-us" className="py-32 bg-brand-dark relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="fade-in-section">
             <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-sm">The AGS Standard</span>
             <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
               Why we are the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">#1 Choice</span> in Atlanta.
             </h2>
             <p className="text-gray-400 text-lg leading-relaxed mb-10">
               We don't just build hardscapes; we build trust. Our process is transparent, our materials are premium, and our craftsmanship is guaranteed. When you choose AGS, you're choosing peace of mind and award-winning design.
             </p>
             
             <a href="tel:6784287630" className="inline-block px-8 py-4 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white transition-all font-bold uppercase tracking-widest text-sm rounded-sm">
                Schedule Consultation
             </a>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 fade-in-section delay-200">
             {benefits.map((item, idx) => (
               <div key={idx} className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-brand-gold/30 transition-all duration-300 group hover:-translate-y-2">
                  <div className="bg-brand-gold/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-gold transition-all duration-300">
                     {React.cloneElement(item.icon as React.ReactElement<any>, { 
                        className: "w-7 h-7 text-brand-gold group-hover:text-white transition-colors" 
                     })}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
               </div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
};