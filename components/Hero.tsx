import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Phone, ShieldCheck, Award, CheckCircle2, ThumbsUp, Loader2, Tag, Check, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  // Removed refs and scroll listeners to free up the main thread
  
  // Form State
  const [formStatus, setFormStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [heroErrorMsg, setHeroErrorMsg] = useState<string>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    service: 'Driveway Pavers' 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('LOADING');
    setHeroErrorMsg('');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "c879d724-5d51-46ab-ae9b-cb378051ad3f", 
          from_name: "Hero Section Form - AGS Stones",
          subject: "New Quote Request via Website",
          First_Name: formData.firstName,
          Last_Name: formData.lastName,
          Phone: formData.phone,
          Email: formData.email,
          Service_Interested_In: formData.service,
        })
      });

      const json = await response.json();
      if (response.status === 200) {
        setFormStatus('SUCCESS');
        
        // Report Conversion to Google Ads
        const gtagReport = (window as any).gtag_report_conversion;
        if (typeof gtagReport === 'function') {
           gtagReport(); // Fires the conversion event without a redirect URL
        }
      } else {
        setFormStatus('ERROR');
        setHeroErrorMsg(json.message);
      }
    } catch (error) {
      setFormStatus('ERROR');
      setHeroErrorMsg("Network error. Please try calling us instead.");
    }
  };

  const badges = [
    { icon: <Award />, title: "20+ Years", sub: "Master Experience" },
    { icon: <CheckCircle2 />, title: "ICPI Certified", sub: "Expert Installers" },
    { icon: <ThumbsUp />, title: "100% Satisfaction", sub: "Guaranteed Work" },
    { icon: <ShieldCheck />, title: "Fully Licensed", sub: "& Fully Insured" },
    { icon: <Tag />, title: "Price Match", sub: "Competitive Rates" },
  ];

  return (
    <section className="relative w-full h-[100svh] min-h-[650px] flex items-center pt-24 md:pt-32 pb-24 md:pb-32 overflow-hidden bg-brand-dark">
      {/* BACKGROUND VIDEO LAYER - Static, no parallax to save GPU */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-60" // Lowered opacity for better text contrast
        >
          <source src="https://storage.googleapis.com/msgsndr/W0sXUj5H01T944bIuY1n/media/680a5a6f1eba4b32d1925215.mp4" type="video/mp4" />
        </video>
        
        {/* Simplified dual-layer gradient overlay for better performance */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            {/* Left Content Column */}
            <div className="w-full lg:w-1/2 text-center lg:text-left animate-[fadeIn_1s_ease-out]">
                <div className="inline-flex items-center gap-2 bg-brand-dark/80 backdrop-blur-md border border-brand-gold/50 px-4 py-2 rounded-full mb-6 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Top Rated in Atlanta, GA</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-white leading-[1.1] mb-6 drop-shadow-lg tracking-tight">
                    Transform Your Home's <br className="hidden md:block"/>
                    <span className="text-brand-gold italic pr-2">Curb Appeal</span> Today.
                </h1>
                
                <p className="text-base md:text-xl text-gray-100 mb-8 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed drop-shadow-md">
                    Premium driveway pavers, luxury patios, and expert hardscaping crafted by local master masons.
                </p>

                {/* TRUST BADGES - Mobile (Centered) */}
                <div className="md:hidden flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 p-2 pr-4 rounded-full shadow-2xl mx-auto max-w-[280px] mb-8">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border border-white/50 bg-white flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#EA4335" d="M12 4.9c1.77 0 3.36.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.61l4 3.1C6.22 6.86 8.87 4.9 12 4.9z"/><path fill="#FBBC05" d="M5.28 9.71c-.24.7-.38 1.45-.38 2.29s.14 1.59.38 2.29l-4 3.1C.46 15.54 0 13.82 0 12c0-1.82.46-3.54 1.28-5.39l4 3.1z"/><path fill="#34A853" d="M12 19.1c-3.13 0-5.78-1.96-6.72-4.81l-4 3.1c1.98 3.92 6.03 6.61 10.72 6.61 3.24 0 5.95-1.07 7.96-2.91l-3.87-3c-1.09.73-2.46 1.01-4.09 1.01z"/><path fill="#4285F4" d="M23.5 12.23c0-.79-.07-1.55-.19-2.23H12v4.45h6.47c-.29 1.48-1.13 2.73-2.4 3.58l3.87 3c2.25-2.09 3.56-5.17 3.56-8.8z"/></svg>                      </div>
                      <div className="w-8 h-8 rounded-full border border-white/50 bg-brand-gold flex items-center justify-center text-brand-dark font-bold text-[10px]">98+</div>
                    </div>
                    <div className="text-left flex flex-col justify-center">
                        <div className="flex items-center gap-1">
                            <span className="text-white font-bold text-xs drop-shadow-md leading-none">5.0</span>
                             <div className="flex text-[#F4B400] gap-0.5"><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /></div>
                        </div>
                        <span className="text-[11px] text-gray-200 font-medium leading-tight mt-0.5 drop-shadow-md">Trusted by homeowners in Atlanta</span>
                    </div>
                </div>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 p-3 pr-6 rounded-full hover:bg-black/50 transition-colors cursor-pointer shadow-2xl">
                    <div className="flex -space-x-3">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&h=64" alt="Reviewer" className="w-10 h-10 rounded-full border-2 border-white/50" loading="lazy" decoding="async" />
                      <div className="w-10 h-10 rounded-full border-2 border-white/50 bg-white flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-6 h-6"><path fill="#EA4335" d="M12 4.9c1.77 0 3.36.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.61l4 3.1C6.22 6.86 8.87 4.9 12 4.9z"/><path fill="#FBBC05" d="M5.28 9.71c-.24.7-.38 1.45-.38 2.29s.14 1.59.38 2.29l-4 3.1C.46 15.54 0 13.82 0 12c0-1.82.46-3.54 1.28-5.39l4 3.1z"/><path fill="#34A853" d="M12 19.1c-3.13 0-5.78-1.96-6.72-4.81l-4 3.1c1.98 3.92 6.03 6.61 10.72 6.61 3.24 0 5.95-1.07 7.96-2.91l-3.87-3c-1.09.73-2.46 1.01-4.09 1.01z"/><path fill="#4285F4" d="M23.5 12.23c0-.79-.07-1.55-.19-2.23H12v4.45h6.47c-.29 1.48-1.13 2.73-2.4 3.58l3.87 3c2.25-2.09 3.56-5.17 3.56-8.8z"/></svg>
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-white/50 bg-brand-gold flex items-center justify-center text-brand-dark font-bold text-xs">98+</div>
                    </div>
                    <div className="text-left">
                        <div className="flex items-center gap-1">
                            <span className="text-white font-bold text-sm drop-shadow-md">Google Reviews</span>
                            <div className="flex text-[#F4B400] drop-shadow-sm"><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /></div>
                        </div>
                        <span className="text-[10px] text-gray-200 drop-shadow-md">Trusted by homeowners in Atlanta</span>
                    </div>
                </div>
            </div>

            {/* Right Form Column */}
            <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mr-0 animate-[fadeIn_1.2s_ease-out]">
               <div className="bg-black/60 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 relative overflow-hidden">
                  {/* Glass highlight effect */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                  
                  {formStatus === 'SUCCESS' ? (
                     <div className="py-12 flex flex-col items-center justify-center text-center animate-[fadeIn_0.5s]">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg border-2 border-white/20">
                           <Check className="text-white w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Quote Requested!</h3>
                        <p className="text-gray-200 font-medium">We'll text you shortly with your estimate.</p>
                     </div>
                  ) : (
                     <>
                        <h3 className="text-2xl font-serif font-bold text-white mb-2 tracking-tight">Get Your Free Estimate</h3>
                        <p className="text-gray-200 text-sm mb-5 font-medium">Lock in this month's special pricing.</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-3">
                           <div className="grid grid-cols-2 gap-3">
                               <input 
                                 type="text" 
                                 name="firstName"
                                 placeholder="First Name" 
                                 required
                                 value={formData.firstName}
                                 onChange={handleInputChange}
                                 className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-gray-300 focus:bg-black/40 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all text-sm font-medium backdrop-blur-sm"
                               />
                               <input 
                                 type="text" 
                                 name="lastName"
                                 placeholder="Last Name" 
                                 required
                                 value={formData.lastName}
                                 onChange={handleInputChange}
                                 className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-gray-300 focus:bg-black/40 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all text-sm font-medium backdrop-blur-sm"
                               />
                           </div>
                           
                           <div>
                              <input 
                                 type="tel" 
                                 name="phone"
                                 placeholder="Phone Number" 
                                 required
                                 value={formData.phone}
                                 onChange={handleInputChange}
                                 className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-gray-300 focus:bg-black/40 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all text-sm font-medium backdrop-blur-sm"
                              />
                           </div>
                           <div>
                              <input 
                                 type="email" 
                                 name="email"
                                 placeholder="Email Address" 
                                 required
                                 value={formData.email}
                                 onChange={handleInputChange}
                                 className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-gray-300 focus:bg-black/40 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all text-sm font-medium backdrop-blur-sm"
                              />
                           </div>
                           <div className="relative">
                              <select 
                                 name="service"
                                 value={formData.service}
                                 onChange={handleInputChange}
                                 className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:bg-black/40 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all appearance-none text-sm font-medium cursor-pointer backdrop-blur-sm"
                              >
                                 <option value="Driveway Pavers" className="text-black">I'm interested in Driveway Pavers...</option>
                                 <option value="Retaining Wall" className="text-black">I'm interested in Retaining Walls...</option>
                                 <option value="Patio Installation" className="text-black">I'm interested in Patio Install...</option>
                                 <option value="Pool Deck" className="text-black">I'm interested in Pool Decks...</option>
                                 <option value="Other" className="text-black">I'm interested in Other Services...</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none w-4 h-4" />
                           </div>
                           <button 
                              type="submit" 
                              disabled={formStatus === 'LOADING'}
                              className="w-full bg-[#D4AF37] hover:bg-white hover:text-brand-dark text-white font-bold py-3.5 rounded-lg shadow-lg uppercase tracking-wide text-xs transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 mt-2 group border border-transparent hover:border-brand-gold"
                           >
                              {formStatus === 'LOADING' ? <Loader2 className="animate-spin" /> : 'Get My Free Quote'}
                              {!formStatus && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                           </button>
                           
                           <p className="text-[10px] text-center text-gray-300 mt-2 flex items-center justify-center gap-1">
                              <ShieldCheck size={12} /> No obligation. Privacy protected. 
                           </p>

                           {formStatus === 'ERROR' && (
                             <div className="p-3 bg-red-950/85 border border-red-800 text-red-200 text-xs rounded-lg flex flex-col gap-1 backdrop-blur-md text-left mt-2 shadow-xl">
                               <span className="font-bold">Error Submitting</span>
                               <p className="leading-relaxed opacity-95">{heroErrorMsg || "Something went wrong. Please check details and try again."}</p>
                             </div>
                           )}
                        </form>
                     </>
                  )}
               </div>
            </div>
          </div>
      </div>

      {/* INFINITE SCROLL MARQUEE */}
      <div className="absolute bottom-0 w-full bg-white/10 backdrop-blur-md border-t border-white/20 z-30 shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
        <div className="py-4 overflow-hidden relative group">
            <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
               {[...badges, ...badges, ...badges, ...badges, ...badges, ...badges].map((b, i) => (
                  <div key={i} className="flex items-center gap-3 mx-6 md:mx-12 min-w-max">
                     <div className="text-brand-gold p-1.5 md:p-2 bg-white/10 rounded-full border border-white/20">
                        {React.cloneElement(b.icon as React.ReactElement<any>, { className: "w-4 h-4 md:w-5 md:h-5" })}
                     </div>
                     <div className="flex flex-col">
                        <span className="text-white text-xs md:text-sm font-bold uppercase tracking-wider drop-shadow-sm">{b.title}</span>
                        <span className="hidden md:block text-gray-200 text-[10px] drop-shadow-sm">{b.sub}</span>
                     </div>
                  </div>
               ))}
            </div>
        </div>
      </div>
    </section>
  );
};
