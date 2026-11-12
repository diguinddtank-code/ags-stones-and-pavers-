import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, ShieldCheck, Award, CheckCircle2, Loader2, Check, ChevronDown } from 'lucide-react';
import { Img } from './ui/Img';

const HEADLINE: { text: string; gold?: boolean }[] = [
  { text: 'Transform' },
  { text: 'Your' },
  { text: 'Outdoor', gold: true },
  { text: 'Space', gold: true },
  { text: 'with' },
  { text: 'Expert' },
  { text: 'Hardscaping.' },
];

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [videoSrc, setVideoSrc] = useState<{ webm?: string; mp4: string } | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Background video: never competes with the first paint. The poster photo is
  // the LCP image; the clip is requested only after the page has loaded, and
  // skipped for reduced-motion and data-saver users.
  useEffect(() => {
    const conn = (navigator as any).connection;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType || '')) return;
    const pick = () =>
      setVideoSrc(
        window.matchMedia('(max-width: 767px)').matches
          ? { mp4: '/videos/home-hero-540.mp4' }
          : { webm: '/videos/home-hero-1080.webm', mp4: '/videos/home-hero-1080.mp4' }
      );
    if (document.readyState === 'complete') {
      const t = window.setTimeout(pick, 400);
      return () => window.clearTimeout(t);
    }
    const onLoad = () => window.setTimeout(pick, 400);
    window.addEventListener('load', onLoad, { once: true });
    return () => window.removeEventListener('load', onLoad);
  }, []);

  // Scroll choreography loads after first paint (GSAP is not in the main chunk):
  // the photo drifts slower than the page and the copy lifts away as you leave.
  useEffect(() => {
    let revert = () => {};
    let cancelled = false;
    import('../lib/motion').then(({ gsap, MOTION_OK }) => {
      const el = sectionRef.current;
      if (cancelled || !el) return;
      const ctx = gsap.context(() => {
        gsap.matchMedia().add(MOTION_OK, () => {
          const st = { trigger: el, start: 'top top', end: 'bottom top', scrub: true };
          gsap.to('[data-hero-photo]', { yPercent: 18, scale: 1.08, ease: 'none', scrollTrigger: st });
          gsap.to('[data-hero-copy]', { yPercent: -14, autoAlpha: 0.15, ease: 'none', scrollTrigger: st });
          gsap.to('[data-hero-cue]', { autoAlpha: 0, ease: 'none', scrollTrigger: { ...st, end: '15% top' } });
        });
      }, el);
      revert = () => ctx.revert();
    });
    return () => {
      cancelled = true;
      revert();
    };
  }, []);
  
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
    <section ref={sectionRef} className="relative w-full min-h-[100svh] lg:h-[100svh] lg:min-h-[650px] flex items-center pt-28 md:pt-32 pb-28 md:pb-32 overflow-hidden bg-brand-dark">
      {/* Locally hosted, responsive hero image keeps the first screen reliable and light. */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div data-hero-photo className="absolute inset-0 will-change-transform">
        <Img
          src="/images/home-hero-poster.webp"
          alt="Stone paver patio with steps, stone veneer and landscaped lawn"
          fetchPriority="high"
          loading="eager"
          sizes="100vw"
          className="hero-photo absolute inset-0 w-full h-full object-cover object-center"
        />
        {videoSrc && (
          <video
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1.2s] ease-out ${videoReady ? 'opacity-100' : 'opacity-0'}`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/opt/home-hero-poster-1200.webp"
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setVideoReady(true)}
            ref={(el) => {
              // React sets `muted` as a property only; iOS needs the attribute to autoplay.
              if (el && !el.hasAttribute('muted')) {
                el.muted = true;
                el.setAttribute('muted', '');
                el.play().catch(() => {});
              }
            }}
          >
            {videoSrc.webm && <source src={videoSrc.webm} type="video/webm" />}
            <source src={videoSrc.mp4} type="video/mp4" />
          </video>
        )}
        </div>
        
        {/* Simplified dual-layer gradient overlay for better performance */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent"></div>
        <div className="hero-glow pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-brand-gold/20 blur-[140px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            {/* Left Content Column */}
            <div data-hero-copy className="w-full lg:w-1/2 text-center lg:text-left">
                <div style={{ '--d': '0.1s' } as React.CSSProperties} className="hero-in inline-flex items-center gap-2 bg-brand-dark/80 backdrop-blur-md border border-brand-gold/50 px-4 py-2 rounded-full mb-6 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Duluth based · Serving Metro Atlanta</span>
                </div>
                
                <h1 className="text-[2.6rem] sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-extrabold text-white leading-[1.05] mb-6 drop-shadow-lg tracking-tight">
                    {HEADLINE.map((w, i) => (
                      <React.Fragment key={i}>
                        <span className="hero-mask">
                          <span
                            className={`hero-word${w.gold ? ' text-brand-gold italic pr-1' : ''}`}
                            style={{ '--d': `${0.18 + i * 0.07}s` } as React.CSSProperties}
                          >
                            {w.text}
                          </span>
                        </span>{i < HEADLINE.length - 1 ? ' ' : ''}
                      </React.Fragment>
                    ))}
                </h1>
                
                <p style={{ '--d': '0.75s' } as React.CSSProperties} className="hero-in text-base md:text-xl text-gray-100 mb-8 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed drop-shadow-md">
                    Driveways, patios, retaining walls and outdoor spaces, planned for your home and built for Georgia conditions.
                </p>

                {/* Open trust strip keeps all three points aligned on narrow screens. */}
                <ul style={{ '--d': '0.9s' } as React.CSSProperties} className="hero-in mx-auto mb-8 grid w-full max-w-xl grid-cols-3 divide-x divide-white/20 border-y border-white/20 lg:mx-0 lg:mb-0">
                    {heroBadges.map((b) => (
                      <li
                        key={b.label}
                        className="flex min-w-0 flex-col items-center justify-center gap-1.5 px-1 py-3 text-center sm:flex-row sm:gap-2 sm:px-3 sm:text-left"
                      >
                        <span className="flex shrink-0 items-center justify-center text-brand-gold">
                          {React.cloneElement(b.icon as React.ReactElement<any>, { className: "h-[18px] w-[18px] sm:h-4 sm:w-4" })}
                        </span>
                        <span className="min-w-0 leading-tight">
                          <span className="block break-words text-[10px] font-bold uppercase leading-[1.15] tracking-[0.02em] text-white drop-shadow-md sm:text-[11px] sm:tracking-[0.04em] md:text-xs">{b.label}</span>
                          <span className="mt-1 hidden text-[10px] leading-snug text-gray-200 drop-shadow-md md:block">{b.sub}</span>
                        </span>
                      </li>
                    ))}
                </ul>
            </div>

            {/* Right Form Column */}
            <div style={{ '--d': '0.45s' } as React.CSSProperties} className="hero-in hero-in--card w-full lg:w-1/2 max-w-md mx-auto lg:mr-0">
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

      <a
        href="#services"
        data-hero-cue
        aria-label="Scroll to services"
        className="hero-cue absolute bottom-[5.5rem] left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-brand-gold md:bottom-24 lg:[@media(min-height:960px)]:flex"
      >
        Scroll
        <span className="relative block h-10 w-px overflow-hidden bg-white/20">
          <span className="hero-cue-line absolute inset-x-0 top-0 h-1/2 bg-brand-gold" />
        </span>
      </a>

      <div className="absolute bottom-0 z-30 w-full border-t border-white/10 bg-[#141619]/95 shadow-[0_-12px_36px_rgba(0,0,0,0.2)] backdrop-blur-md">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent" />
        <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-white/10 px-4 md:px-8">
          {badges.map((b) => (
            <div key={b.title} className="flex min-w-0 flex-col items-center justify-center gap-1.5 px-1 py-3 text-center sm:flex-row sm:gap-2.5 sm:px-4 sm:py-4 sm:text-left">
              <span className="shrink-0 text-brand-gold">{React.cloneElement(b.icon as React.ReactElement<any>, { className: "h-[18px] w-[18px] sm:h-4 sm:w-4" })}</span>
              <span className="text-[10px] font-medium leading-tight text-white/90 sm:text-xs md:text-sm">{b.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
