import React, { useEffect, useState, useRef } from 'react';
import { Star, ArrowRight, Phone, ShieldCheck, Award, CheckCircle2, ThumbsUp, Loader2, DollarSign, Check, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  // Removed state-based scroll offset to prevent re-renders on every frame
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Form State
  const [formStatus, setFormStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    service: 'Driveway Pavers' // Default high-value service
  });

  useEffect(() => {
    // Direct DOM manipulation for performance (avoids React Reconciliation)
    const handleScroll = () => {
      if (window.innerWidth > 768) {
        const scrollY = window.scrollY;
        
        if (videoRef.current) {
          videoRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
        }
        
        if (contentRef.current) {
           contentRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('LOADING');

    try {
      const response = await fetch("https://formsubmit.co/ajax/agstones.pavers@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: `New HERO Lead: ${formData.firstName} ${formData.lastName}`,
            name: `${formData.firstName} ${formData.lastName}`,
            phone: formData.phone,
            email: formData.email,
            service_interest: formData.service,
            source: "Desktop Hero Glass Form",
            _template: "table"
        })
      });

      if (response.ok) {
        setFormStatus('SUCCESS');
        setFormData({ firstName: '', lastName: '', phone: '', email: '', service: 'Driveway Pavers' });
        setTimeout(() => setFormStatus('IDLE'), 5000);
      } else {
        setFormStatus('ERROR');
      }
    } catch (error) {
      console.error("Form Error:", error);
      setFormStatus('ERROR');
    }
  };

  // Badge data for mapping
  const badges = [
    { icon: <ShieldCheck className="w-5 h-5 md:w-6 lg:w-7 md:h-6 lg:h-7" />, title: "5-Year Warranty", sub: "On All Installations" },
    { icon: <Award className="w-5 h-5 md:w-6 lg:w-7 md:h-6 lg:h-7" />, title: "Licensed & Insured", sub: "Georgia State Certified" },
    { icon: <CheckCircle2 className="w-5 h-5 md:w-6 lg:w-7 md:h-6 lg:h-7" />, title: "ICPI Certified", sub: "Industry Standards" },
    { icon: <ThumbsUp className="w-5 h-5 md:w-6 lg:w-7 md:h-6 lg:h-7" />, title: "Owner Operated", sub: "Direct Oversight" }
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-[100svh] w-full flex flex-col justify-center bg-brand-dark overflow-hidden"
    > 
      
      {/* BACKGROUND VIDEO LAYER */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
          className="w-full h-full object-cover object-center scale-105 will-change-transform"
        >
          <source src="https://storage.googleapis.com/msgsndr/yRboz8P4zFeLUF6bAk8i/media/680a5a6f1eba4b32d1925215.mp4" type="video/mp4" />
        </video>
        
        {/* LIGHTER AESTHETIC: Reduced opacity for brighter feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-black/60 to-transparent pointer-events-none md:w-2/3" />
      </div>

      {/* CONTENT LAYER */}
      <div 
        ref={contentRef}
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex items-center pt-24 pb-20 lg:pt-0 lg:pb-0 will-change-transform"
      >
          {/* COMPACT GAP */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
            
            {/* LEFT COLUMN: TEXT CONTENT */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
              
              {/* TRUST PILL - INTEGRATED SUBTLE AVAILABILITY */}
              <div className="inline-flex items-center gap-3 mb-4 md:mb-6 px-4 py-2 border border-white/20 rounded-full bg-white/10 backdrop-blur-md animate-[fade-up_0.8s_ease-out_0.1s_both] shadow-lg">
                <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-[#F4B400] fill-[#F4B400]" />)}
                </div>
                
                {/* Vertical Divider */}
                <div className="w-px h-3 bg-white/30"></div>
                
                <span className="text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase drop-shadow-md">
                  #1 Atlanta Hardscapes
                </span>

                {/* Vertical Divider */}
                <div className="w-px h-3 bg-white/30 block"></div>

                {/* Subtle Availability Dot */}
                <div className="flex items-center gap-1.5">
                   <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                   </span>
                   <span className="text-green-50 text-[9px] font-bold uppercase tracking-wider opacity-80">
                      <span className="sm:hidden">Open</span>
                      <span className="hidden sm:inline">Projects Open</span>
                   </span>
                </div>
              </div>
              
              {/* H1 HEADLINE */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-4 md:mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] animate-[fade-up_0.8s_ease-out_0.2s_both]">
                Transform Your <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-100 to-brand-gold italic pr-2 drop-shadow-md">
                  Outdoor Living
                </span>
              </h1>
              
              {/* SUBTEXT */}
              <p className="text-sm sm:text-lg lg:text-xl text-white mb-8 max-w-[95%] md:max-w-xl font-light leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] animate-[fade-up_0.8s_ease-out_0.3s_both] border-t lg:border-t-0 lg:border-l border-white/20 pt-4 lg:pt-0 lg:pl-6">
                Atlanta's Premier <strong>Landscaping & Hardscape</strong> Contractors. 
                Specializing in Luxury <strong>Paver Installation</strong>, Retaining Walls, and Pool Decks.
              </p>
              
              {/* MOBILE ONLY BUTTONS */}
              <div className="lg:hidden flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4 sm:px-0 animate-[fade-up_0.8s_ease-out_0.4s_both]">
                <a 
                    href="#contact" 
                    className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-white text-white hover:text-brand-dark font-bold rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center justify-center gap-3 uppercase tracking-widest text-xs transition-all duration-300 transform hover:-translate-y-1 active:scale-95 group border border-brand-gold"
                >
                    Get Free Estimate <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                    href="tel:6784287630" 
                    className="w-full sm:w-auto px-8 py-4 bg-black/40 border border-white/30 hover:bg-white/20 text-white font-bold rounded-xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs backdrop-blur-md transition-all active:scale-95 shadow-lg"
                >
                    <Phone className="w-4 h-4" /> (678) 428-7630
                </a>
              </div>

              {/* SOCIAL PROOF */}
              <div className="mt-8 md:mt-10 animate-[fade-up_1s_ease-out_0.6s_both] flex justify-center lg:justify-start w-full">
                {/* Mobile */}
                <div className="flex md:hidden items-center gap-3 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full border border-brand-gold/30 shadow-2xl justify-center">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-brand-dark flex-shrink-0">
                        <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#EA4335" d="M12 4.9c1.77 0 3.36.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.61l4 3.1C6.22 6.86 8.87 4.9 12 4.9z"/><path fill="#FBBC05" d="M5.28 9.71c-.24.7-.38 1.45-.38 2.29s.14 1.59.38 2.29l-4 3.1C.46 15.54 0 13.82 0 12c0-1.82.46-3.54 1.28-5.39l4 3.1z"/><path fill="#34A853" d="M12 19.1c-3.13 0-5.78-1.96-6.72-4.81l-4 3.1c1.98 3.92 6.03 6.61 10.72 6.61 3.24 0 5.95-1.07 7.96-2.91l-3.87-3c-1.09.73-2.46 1.01-4.09 1.01z"/><path fill="#4285F4" d="M23.5 12.23c0-.79-.07-1.55-.19-2.23H12v4.45h6.47c-.29 1.48-1.13 2.73-2.4 3.58l3.87 3c2.25-2.09 3.56-5.17 3.56-8.8z"/></svg>
                    </div>
                    <div className="flex flex-col text-left">
                        <div className="flex text-[#F4B400] gap-0.5"><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /></div>
                        <span className="text-[10px] text-gray-200 font-bold whitespace-nowrap">128+ 5-Star Reviews</span>
                    </div>
                </div>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 p-3 pr-6 rounded-full hover:bg-black/50 transition-colors cursor-pointer shadow-2xl">
                    <div className="flex -space-x-3">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&h=64" alt="Reviewer" className="w-10 h-10 rounded-full border-2 border-white/50" />
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
                        <span className="text-[10px] text-gray-200 drop-shadow-md">Trusted by homeowners in Duluth & Roswell</span>
                    </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HIGH CONVERSION GLASS FORM */}
            <div className="hidden lg:block lg:col-span-5 animate-[fade-up_0.8s_ease-out_0.5s_both]">
               <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] border border-white/20">
                  
                  {/* FLOATING BADGE (Safe Position inside) */}
                  <div className="absolute -top-6 right-4 z-20 animate-[bounce_3s_infinite]">
                      <div className="bg-white rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.2)] p-2 pr-3 flex items-center gap-2 border border-gray-100">
                          <ShieldCheck className="text-brand-gold w-6 h-6 fill-brand-gold/10" />
                          <div className="flex flex-col leading-none">
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Guaranteed</span>
                              <span className="text-xs font-bold text-brand-dark">Best Price in GA</span>
                          </div>
                      </div>
                  </div>

                  {formStatus === 'SUCCESS' ? (
                     <div className="flex flex-col items-center justify-center py-10 text-center animate-[fadeIn_0.5s]">
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