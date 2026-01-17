import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle2, Star, ShieldCheck, Clock, Trophy, Loader2, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  // Form State
  const [formStatus, setFormStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '' });

  useEffect(() => {
    const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    let animationFrameId: number;
    
    const handleScroll = () => {
      if (window.innerWidth < 768) return;
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
           animationFrameId = requestAnimationFrame(() => setOffset(window.scrollY));
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      cancelAnimationFrame(animationFrameId);
    };
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
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
            _subject: `Hero Lead: ${formData.name}`,
            ...formData,
            source: 'Hero Section Form'
        })
      });
      if (response.ok) {
        setFormStatus('SUCCESS');
        setFormData({ name: '', phone: '', email: '', service: '' });
      } else {
        setFormStatus('ERROR');
      }
    } catch (error) {
      setFormStatus('ERROR');
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="home" 
      // Adjusted padding and height to prevent cutoff on smaller laptops
      // Using min-h-[100svh] allows growth. 
      // pt-28 ensures header clearance. pb-12/24 ensures bottom breathing room.
      className="relative min-h-[100svh] flex items-center bg-brand-dark pt-28 pb-12 lg:pt-32 lg:pb-24 overflow-x-hidden"
    > 
      
      {/* Background Video Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop"
          className="w-full h-full object-cover object-center opacity-70 transition-transform duration-100 ease-linear"
          style={{ 
             transform: isMobile ? 'none' : `translateY(${offset * 0.4}px) scale(${1 + offset * 0.0005})`,
             willChange: 'transform' 
          }}
        >
          <source src="https://storage.googleapis.com/msgsndr/yRboz8P4zFeLUF6bAk8i/media/680a5a6f1eba4b32d1925215.mp4" type="video/mp4" />
          <img 
             src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop" 
             alt="Luxury Outdoor Living" 
             className="w-full h-full object-cover"
          />
        </video>
        
        {/* Lighter Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/60 to-transparent" />
        
        {/* SEAMLESS TRANSITION GRADIENT */}
        <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-[#0f1115] to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-center">
        
        {/* LEFT COLUMN: Value Props & Copy */}
        <div className="text-center lg:text-left animate-[fade-up_0.8s_ease-out] flex flex-col justify-center">
          
          {/* MAIN LOGO - VISIBLE ONLY ON MOBILE */}
          {/* UPDATED: Increased width (w-48 sm:w-64) for larger visibility */}
          <div className="flex justify-center lg:justify-start lg:hidden mb-6">
            <img 
               src="https://i.imgur.com/DkMxLum.png" 
               alt="AGS Stones" 
               className="w-48 sm:w-64 h-auto brightness-0 invert drop-shadow-xl opacity-100"
            />
          </div>

          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 border border-brand-gold/50 rounded-full bg-brand-dark/80 backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.3)] mx-auto lg:mx-0 w-fit max-w-full hover:bg-brand-gold/10 transition-colors cursor-default">
             <Star className="w-3 h-3 md:w-3.5 md:h-3.5 text-brand-gold fill-brand-gold flex-shrink-0 animate-[spin_3s_linear_infinite]" />
             <span className="text-brand-gold text-[10px] md:text-xs font-bold tracking-widest uppercase truncate">#1 Factory Direct Fabricator</span>
          </div>
          
          {/* Headline - Tuned for Laptops */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white leading-[1.1] mb-4 drop-shadow-xl">
            Atlanta's Premier <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold italic">
              Hardscape & Stone
            </span>
          </h1>
          
          <p className="text-sm sm:text-base lg:text-lg text-gray-200 mb-6 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed px-2 lg:px-0 drop-shadow-md">
            Buy direct from the factory and save up to 30%. Expert installation of <strong>Pavers, Retaining Walls, and Outdoor Living</strong> in Duluth & Metro Atlanta.
          </p>
          
          {/* MOBILE CALL TO ACTION (Above Features) */}
          <div className="lg:hidden w-full mb-6 animate-[fade-up_0.8s_ease-out_0.2s_both]">
             <a 
                href="tel:6784287630" 
                className="group w-full py-4 bg-brand-gold text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 uppercase tracking-widest text-sm relative overflow-hidden"
             >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <span className="relative z-10 flex items-center gap-2">
                   Get Free Estimate <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
             </a>
             <div className="mt-2 flex justify-center gap-4 text-[10px] text-gray-400 font-medium">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-brand-gold" /> Licensed & Insured</span>
                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-brand-gold" /> 5-Star Rated</span>
             </div>
          </div>

          {/* Value Badges - Vertical Stack on Desktop for clean list look, Horizontal/Wrap on Mobile */}
          <div className="flex flex-col gap-3 mb-8 w-full sm:w-auto sm:flex-row sm:flex-wrap lg:flex-col lg:items-start">
            
            <div className="flex items-center gap-3 bg-white/5 lg:bg-transparent rounded-lg p-3 lg:p-0 border border-white/10 lg:border-none w-full sm:w-auto backdrop-blur-sm lg:backdrop-blur-none transition-transform hover:translate-x-1">
               <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold/50 flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
               </div>
               <span className="text-white font-bold text-xs md:text-sm tracking-wide">Factory Direct Pricing <span className="text-gray-400 font-normal hidden xl:inline">(No Middlemen)</span></span>
            </div>

            <div className="flex items-center gap-3 bg-white/5 lg:bg-transparent rounded-lg p-3 lg:p-0 border border-white/10 lg:border-none w-full sm:w-auto backdrop-blur-sm lg:backdrop-blur-none transition-transform hover:translate-x-1">
               <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold/50 flex-shrink-0">
                  <Trophy className="w-4 h-4 text-brand-gold" />
               </div>
               <span className="text-white font-bold text-xs md:text-sm tracking-wide">Largest Indoor Slab Yard</span>
            </div>

            <div className="flex items-center gap-3 bg-white/5 lg:bg-transparent rounded-lg p-3 lg:p-0 border border-white/10 lg:border-none w-full sm:w-auto backdrop-blur-sm lg:backdrop-blur-none transition-transform hover:translate-x-1">
               <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold/50 flex-shrink-0">
                  <Clock className="w-4 h-4 text-brand-gold" />
               </div>
               <span className="text-white font-bold text-xs md:text-sm tracking-wide">5-Day Turnaround Guarantee</span>
            </div>

          </div>

          {/* Social Proof Widget */}
          <div className="group flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 pl-2 pr-5 py-2 rounded-full w-fit mx-auto lg:mx-0 hover:bg-white/15 transition-all duration-300 shadow-lg cursor-default scale-95 origin-center lg:origin-left">
             <div className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                 <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                    alt="Google" 
                    className="w-full h-full" 
                 />
             </div>
             <div className="flex flex-col items-start">
                <div className="flex items-center gap-1.5">
                   <span className="text-white font-bold text-sm leading-none">5.0</span>
                   <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-[#F4B400] fill-[#F4B400]" />)}
                   </div>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                   <span className="text-[10px] text-gray-300 font-medium tracking-wide">120+ Reviews</span>
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: High Conversion Form */}
        <div className="relative animate-[fade-up_0.8s_ease-out_0.2s_both] hidden lg:block">
           
           {/* Floating Badge on Form */}
           <div className="absolute -top-4 -right-4 xl:-top-5 xl:-right-5 bg-white text-brand-dark px-4 py-2 rounded-xl shadow-xl z-30 flex items-center gap-2 border-2 border-brand-gold animate-[bounce_3s_infinite]">
              <ShieldCheck className="w-5 h-5 xl:w-6 xl:h-6 text-brand-gold" />
              <div className="flex flex-col">
                 <span className="text-[9px] font-bold uppercase text-gray-400 leading-none">Guaranteed</span>
                 <span className="text-[10px] xl:text-xs font-black uppercase tracking-wide">Best Price in GA</span>
              </div>
           </div>

           <div className="bg-white rounded-2xl xl:rounded-3xl p-6 xl:p-8 shadow-2xl relative overflow-hidden border border-white/20">
              <div className="relative z-10">
                 <h3 className="font-serif text-2xl xl:text-3xl font-bold text-brand-dark mb-1">Get Your Free Estimate</h3>
                 <p className="text-gray-500 text-xs xl:text-sm mb-4 xl:mb-5">Lock in this month's special pricing. No obligation.</p>

                 {formStatus === 'SUCCESS' ? (
                    <div className="bg-green-50 p-6 rounded-xl text-center border border-green-100">
                       <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                       <h4 className="font-bold text-green-800">Request Received!</h4>
                       <p className="text-green-600 text-sm mt-1">We will contact you shortly to schedule your visit.</p>
                       <button onClick={() => setFormStatus('IDLE')} className="mt-4 text-xs font-bold uppercase text-brand-dark underline">Send New Request</button>
                    </div>
                 ) : (
                    <form onSubmit={handleSubmit} className="space-y-3 xl:space-y-4">
                       <div className="grid grid-cols-2 gap-3 xl:gap-4">
                          <input 
                            type="text" 
                            name="name"
                            required
                            placeholder="First Name" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 xl:px-4 xl:py-3 text-xs xl:text-sm focus:border-brand-gold focus:bg-white outline-none transition-all"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                          <input 
                            type="text" 
                            name="phone"
                            required
                            placeholder="Phone Number" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 xl:px-4 xl:py-3 text-xs xl:text-sm focus:border-brand-gold focus:bg-white outline-none transition-all"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                       </div>
                       <input 
                          type="email" 
                          name="email"
                          required
                          placeholder="Email Address" 
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 xl:px-4 xl:py-3 text-xs xl:text-sm focus:border-brand-gold focus:bg-white outline-none transition-all"
                          value={formData.email}
                          onChange={handleInputChange}
                       />
                       <div className="relative">
                          <select 
                             name="service"
                             className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 xl:px-4 xl:py-3 text-xs xl:text-sm focus:border-brand-gold focus:bg-white outline-none transition-all appearance-none text-gray-600"
                             value={formData.service}
                             onChange={handleInputChange}
                             required
                          >
                             <option value="" disabled>I'm interested in...</option>
                             <option value="Pavers">Paver Driveway/Patio</option>
                             <option value="Retaining Wall">Retaining Wall</option>
                             <option value="Outdoor Kitchen">Outdoor Kitchen</option>
                             <option value="Pool Deck">Pool Deck</option>
                             <option value="Other">Other</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                             <ArrowRight className="w-3 h-3 text-gray-400 rotate-90" />
                          </div>
                       </div>

                       <button 
                          type="submit" 
                          disabled={formStatus === 'LOADING'}
                          className="w-full bg-brand-gold hover:bg-brand-goldHover text-white font-bold py-3 xl:py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-xs xl:text-sm flex items-center justify-center gap-2"
                       >
                          {formStatus === 'LOADING' ? <Loader2 className="w-4 h-4 xl:w-5 xl:h-5 animate-spin" /> : <>Get My Free Quote <ArrowRight className="w-4 h-4 xl:w-5 xl:h-5" /></>}
                       </button>

                       <p className="text-[9px] xl:text-[10px] text-center text-gray-400 flex items-center justify-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> No obligation. Privacy protected.
                       </p>
                    </form>
                 )}
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};