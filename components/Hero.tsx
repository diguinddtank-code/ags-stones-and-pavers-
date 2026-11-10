import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, ShieldCheck, Award, CheckCircle2, Loader2, Check, ChevronDown } from 'lucide-react';

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

  const heroBadges = [
    { icon: <ShieldCheck />, label: "Licensed & Insured", sub: "Fully covered in Georgia" },
    { icon: <Award />, label: "In-House Crews", sub: "No subcontractors" },
    { icon: <CheckCircle2 />, label: "Free Estimates", sub: "On-site, no obligation" },
  ];

  const badges = [
    { icon: <ShieldCheck />, title: "Licensed & Insured", sub: "Georgia hardscape contractor" },
    { icon: <Award />, title: "In-House Crews", sub: "A consistent team on your project" },
    { icon: <CheckCircle2 />, title: "Free Estimates", sub: "Start with a project conversation" },
  ];

  return (
    <section className="relative w-full min-h-[100svh] lg:h-[100svh] lg:min-h-[650px] flex items-center pt-28 md:pt-32 pb-28 md:pb-32 overflow-hidden bg-brand-dark">
      {/* Locally hosted, responsive hero image keeps the first screen reliable and light. */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/service-hero-patio.webp"
          alt="Stone paver patio outside a brick home in Metro Atlanta"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
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
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Duluth based · Serving Metro Atlanta</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-white leading-[1.1] mb-6 drop-shadow-lg tracking-tight">
                    Transform Your <span className="text-brand-gold italic pr-2">Outdoor Space</span> with Expert Hardscaping.
                </h1>
                
                <p className="text-base md:text-xl text-gray-100 mb-8 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed drop-shadow-md">
                    Driveways, patios, retaining walls and outdoor spaces, planned for your home and built for Georgia conditions.
                </p>

                {/* TRUST BADGES - glass pills, wrap on small screens */}
                <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-8 lg:mb-0 max-w-md sm:max-w-none mx-auto lg:mx-0">
                    {heroBadges.map((b) => (
                      <li
                        key={b.label}
                        className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 pl-1.5 pr-3 sm:pr-4 py-1.5 rounded-full shadow-2xl"
                      >
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-gold/90 text-brand-dark flex items-center justify-center shrink-0">
                          {React.cloneElement(b.icon as React.ReactElement<any>, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" })}
                        </span>
                        <span className="text-left leading-tight">
                          <span className="block text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider drop-shadow-md">{b.label}</span>
                          <span className="hidden sm:block text-[10px] text-gray-200 drop-shadow-md">{b.sub}</span>
                        </span>
                      </li>
                    ))}
                </ul>
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
                        <p className="text-gray-200 text-sm mb-5 font-medium">Tell us what you’re planning. We’ll follow up to discuss the project.</p>
                        
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

      <div className="absolute bottom-0 w-full bg-brand-dark/70 backdrop-blur-sm border-t border-white/15 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-2">
          {badges.map((b) => <div key={b.title} className="flex items-center gap-2 text-white text-xs sm:text-sm"><span className="text-brand-gold">{React.cloneElement(b.icon as React.ReactElement<any>, { className: "w-4 h-4" })}</span><span>{b.title}</span></div>)}
        </div>
      </div>
    </section>
  );
};
