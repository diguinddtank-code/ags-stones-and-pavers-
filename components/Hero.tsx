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
      // Changed height to 100svh (Small Viewport Height) for perfect mobile fit
      className="relative min-h-[100svh] md:h-screen flex items-center overflow-hidden bg-brand-dark pt-24 pb-16 md:pt-0 md:pb-0"
    > 
      
      {/* Background Video Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop"
          // Increased opacity from 50 to 70 for better visibility
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
        
        {/* Lighter Gradient Overlay: Dark behind text, transparent elsewhere */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/60 to-transparent" />
        
        {/* SEAMLESS TRANSITION GRADIENT (Bottom Fade) */}
        <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-[#0f1115] to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 md:gap-12 items-center h-full">
        
        {/* LEFT COLUMN: Value Props & Copy */}
        <div className="text-center md:text-left animate-[fade-up_0.8s_ease-out] flex flex-col justify-center h-full">
          
          {/* MAIN LOGO - Position Optimized */}
          <div className="flex justify-center md:justify-start mb-6 md:mb-6">
            <img 
               src="https://i.imgur.com/DkMxLum.png" 
               alt="AGS Stones" 
               // Adjusted size: w-64 on desktop is cleaner than w-72
               className="w-36 sm:w-48 md:w-64 h-auto brightness-0 invert drop-shadow-xl opacity-100"
            />
          </div>

          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-3 py-1.5 border border-brand-gold/50 rounded-full bg-brand-dark/80 backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.3)] mx-auto md:mx-0 w-fit max-w-full hover:bg-brand-gold/10 transition-colors cursor-default">
             <Star className="w-3 h-3 md:w-3.5 md:h-3.5 text-brand-gold fill-brand-gold flex-shrink-0 animate-[spin_3s_linear_infinite]" />
             <span className="text-brand-gold text-[10px] md:text-xs font-bold tracking-widest uppercase truncate">#1 Factory Direct Fabricator</span>
          </div>
          
          <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-4 md:mb-6 drop-shadow-xl">
            Atlanta's Premier <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold italic">
              Hardscape & Stone
            </span>
          </h1>
          
          <p className="text-sm md:text-lg text-gray-200 mb-6 md:mb-8 max-w-xl mx-auto md:mx-0 font-light leading-relaxed px-2 md:px-0 drop-shadow-md">
            Buy direct from the factory and save up to 30%. Expert installation of <strong>Pavers, Retaining Walls, and Outdoor Living</strong> in Duluth & Metro Atlanta.
          </p>
          
          {/* Value Badges / Bullets - With Animations */}
          <div className="space-y-4 mb-8 md:mb-10 flex flex-col items-center md:items-start">
            
            <div className="group flex items-center gap-3 cursor-default">
               <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold/50 flex-shrink-0 group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-brand-gold group-hover:text-white group-hover:rotate-12 transition-all duration-300" />
               </div>
               <span className="text-white font-bold text-xs md:text-sm tracking-wide group-hover:text-brand-gold transition-colors">Factory Direct Pricing (No Middlemen)</span>
            </div>

            <div className="group flex items-center gap-3 cursor-default">
               <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold/50 flex-shrink-0 group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                  <Trophy className="w-4 h-4 md:w-5 md:h-5 text-brand-gold group-hover:text-white group-hover:-rotate-12 transition-all duration-300" />
               </div>
               <span className="text-white font-bold text-xs md:text-sm tracking-wide group-hover:text-brand-gold transition-colors">Largest Indoor Slab Yard in Duluth</span>
            </div>

            <div className="group flex items-center gap-3 cursor-default">
               <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold/50 flex-shrink-0 group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-brand-gold group-hover:text-white group-hover:spin-slow transition-all duration-300" />
               </div>
               <span className="text-white font-bold text-xs md:text-sm tracking-wide group-hover:text-brand-gold transition-colors">5-Day Turnaround Guarantee</span>
            </div>

          </div>

          {/* Social Proof Widget - Enhanced Google Badge */}
          <div className="group flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 pl-2 pr-5 py-2 rounded-full w-fit mx-auto md:mx-0 hover:bg-white/15 transition-all duration-300 shadow-lg cursor-default scale-95 md:scale-100 origin-center md:origin-left">
             
             {/* Google Logo Circle */}
             <div className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                 <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                    alt="Google" 
                    className="w-full h-full" 
                 />
             </div>

             {/* Content Column */}
             <div className="flex flex-col items-start">
                {/* Stars Row */}
                <div className="flex items-center gap-1.5">
                   <span className="text-white font-bold text-sm leading-none">5.0</span>
                   <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-[#F4B400] fill-[#F4B400]" />)}
                   </div>
                </div>
                
                {/* Reviews Text & Avatars */}
                <div className="flex items-center gap-2 mt-0.5">
                   <span className="text-[10px] text-gray-300 font-medium tracking-wide">120+ Reviews</span>
                   {/* Tiny Avatar Stack for Social Proof */}
                   <div className="flex -space-x-1.5 pl-1">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=32&h=32" alt="" className="w-4 h-4 rounded-full border border-gray-600 object-cover" />
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=32&h=32" alt="" className="w-4 h-4 rounded-full border border-gray-600 object-cover" />
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=32&h=32" alt="" className="w-4 h-4 rounded-full border border-gray-600 object-cover" />
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: High Conversion Form */}
        <div className="relative animate-[fade-up_0.8s_ease-out_0.2s_both] hidden md:block">
           
           {/* Floating Badge on Form */}
           <div className="absolute -top-6 -right-6 bg-white text-brand-dark px-4 py-3 rounded-xl shadow-xl z-30 flex items-center gap-3 border-2 border-brand-gold animate-[bounce_3s_infinite]">
              <ShieldCheck className="w-8 h-8 text-brand-gold" />
              <div className="flex flex-col">
                 <span className="text-[10px] font-bold uppercase text-gray-400 leading-none">Guaranteed</span>
                 <span className="text-sm font-black uppercase tracking-wide">Best Price in GA</span>
              </div>
           </div>

           <div className="bg-white rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-white/20">
              <div className="relative z-10">
                 <h3 className="font-serif text-3xl font-bold text-brand-dark mb-2">Get Your Free Estimate</h3>
                 <p className="text-gray-500 text-sm mb-6">Lock in this month's special pricing. No obligation.</p>

                 {formStatus === 'SUCCESS' ? (
                    <div className="bg-green-50 p-6 rounded-xl text-center border border-green-100">
                       <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                       <h4 className="font-bold text-green-800">Request Received!</h4>
                       <p className="text-green-600 text-sm mt-1">We will contact you shortly to schedule your visit.</p>
                       <button onClick={() => setFormStatus('IDLE')} className="mt-4 text-xs font-bold uppercase text-brand-dark underline">Send New Request</button>
                    </div>
                 ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                       <div className="grid grid-cols-2 gap-4">
                          <input 
                            type="text" 
                            name="name"
                            required
                            placeholder="First Name" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-gold focus:bg-white outline-none transition-all"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                          <input 
                            type="text" 
                            name="phone"
                            required
                            placeholder="Phone Number" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-gold focus:bg-white outline-none transition-all"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                       </div>
                       <input 
                          type="email" 
                          name="email"
                          required
                          placeholder="Email Address" 
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-gold focus:bg-white outline-none transition-all"
                          value={formData.email}
                          onChange={handleInputChange}
                       />
                       <div className="relative">
                          <select 
                             name="service"
                             className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-gold focus:bg-white outline-none transition-all appearance-none text-gray-600"
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
                             <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                       </div>

                       <button 
                          type="submit" 
                          disabled={formStatus === 'LOADING'}
                          className="w-full bg-brand-gold hover:bg-brand-goldHover text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                       >
                          {formStatus === 'LOADING' ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Get My Free Quote <ArrowRight className="w-5 h-5" /></>}
                       </button>

                       <p className="text-[10px] text-center text-gray-400 flex items-center justify-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> No obligation. Privacy protected.
                       </p>
                    </form>
                 )}
              </div>
           </div>
        </div>

        {/* Mobile Call To Action (Optimized Spacing) */}
        <div className="md:hidden w-full animate-[fade-up_0.8s_ease-out_0.4s_both] mt-auto">
           <a 
              href="#contact" 
              className="group w-full py-4 bg-brand-gold text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
           >
              Get Free Estimate <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </a>
           <div className="mt-3 flex justify-center gap-4 text-[10px] text-gray-400 font-medium">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-brand-gold" /> Licensed & Insured</span>
              <span className="flex items-center gap-1"><Star className="w-3 h-3 text-brand-gold" /> 5-Star Rated</span>
           </div>
        </div>

      </div>
    </section>
  );
};