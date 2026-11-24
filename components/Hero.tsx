import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Phone, ShieldCheck, Award, CheckCircle2, Loader2, Check, LayoutGrid, Armchair, Layers, Waves, Hammer } from 'lucide-react';
import { Img } from './ui/Img';
import { BUSINESS } from '../lib/business';
import { trackLead } from '../lib/tracking';

// Values are sent to Web3Forms unchanged (Service_Interested_In).
const PROJECTS = [
  { value: 'Driveway Pavers', label: 'Driveway', icon: LayoutGrid },
  { value: 'Patio Installation', label: 'Patio', icon: Armchair },
  { value: 'Retaining Wall', label: 'Retaining wall', icon: Layers },
  { value: 'Pool Deck', label: 'Pool deck', icon: Waves },
  { value: 'Other', label: 'Something else', icon: Hammer },
];

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-[15px] font-medium text-brand-dark placeholder-slate-400 outline-none transition-all focus:border-brand-gold focus:bg-white focus:ring-2 focus:ring-brand-gold/30';

// Leads with the terms people actually search ("paver contractor", "patio", "Atlanta").
const HEADLINE: { text: string; gold?: boolean }[] = [
  { text: 'Atlanta' },
  { text: 'Paver', gold: true },
  { text: 'Contractor', gold: true },
  { text: 'for' },
  { text: 'Driveways,' },
  { text: 'Patios' },
  { text: '&' },
  { text: 'Retaining' },
  { text: 'Walls' },
];

const HERO_POINTS = [
  'Free on-site estimate and written quote',
  'In-house crews, no subcontractors',
  'Base and drainage built for Georgia clay',
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
          ? { webm: '/videos/home-hero-mobile.webm', mp4: '/videos/home-hero-mobile.mp4' }
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
          // No extra zoom on phones: the portrait clip is already framed tight.
          const wide = window.matchMedia('(min-width: 768px)').matches;
          gsap.to('[data-hero-photo]', { yPercent: wide ? 18 : 10, scale: wide ? 1.08 : 1, ease: 'none', scrollTrigger: st });
          gsap.to('[data-hero-copy]', { yPercent: -14, autoAlpha: 0.15, ease: 'none', scrollTrigger: st });
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
  // Two short steps feel lighter than five fields at once: pick the project, then contact details.
  const [step, setStep] = useState<0 | 1>(0);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const chooseProject = (value: string) => {
    setFormData((d) => ({ ...d, service: value }));
    setStep(1);
    // Focus without scrolling the page on phones.
    window.setTimeout(() => firstFieldRef.current?.focus({ preventScroll: true }), 60);
  };
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
        trackLead('home-hero', formData.service);
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


  return (
    <section ref={sectionRef} className="relative flex w-full items-center overflow-hidden bg-brand-dark pb-12 pt-28 sm:pt-32 md:pb-16 lg:min-h-[100svh] lg:pb-20 lg:pt-44">
      {/* Locally hosted, responsive hero image keeps the first screen reliable and light. */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div data-hero-photo className="absolute inset-0 will-change-transform">
        {/* Portrait crop for phones, landscape for everything wider. */}
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/home-hero-poster-mobile.webp" />
          <Img
            src="/images/home-hero-poster.webp"
            alt="Stone paver patio with steps, stone veneer and landscaped lawn"
            fetchPriority="high"
            loading="eager"
            sizes="100vw"
            className="hero-photo absolute inset-0 w-full h-full object-cover object-center"
          />
        </picture>
        {videoSrc && (
          <video
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1.2s] ease-out ${videoReady ? 'opacity-100' : 'opacity-0'}`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={videoSrc.mp4.includes('mobile') ? '/images/home-hero-poster-mobile.webp' : '/images/opt/home-hero-poster-1200.webp'}
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
        {/* Phones: even top-to-bottom shade so centered copy stays readable. Desktop: shade from the left. */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/75 via-brand-dark/55 to-brand-dark/95 md:bg-gradient-to-r md:from-brand-dark/95 md:via-brand-dark/80 md:to-transparent"></div>
        <div className="absolute inset-0 hidden bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent md:block"></div>
        <div className="hero-glow pointer-events-none absolute -left-40 top-1/3 hidden h-[520px] w-[520px] rounded-full bg-brand-gold/10 blur-[140px] lg:block"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-8">
            {/* Left Content Column */}
            <div data-hero-copy className="w-full lg:w-[54%] text-center lg:text-left">
                <div style={{ '--d': '0.1s' } as React.CSSProperties} className="hero-in inline-flex items-center gap-2 bg-brand-dark/60 backdrop-blur-md border border-white/20 px-3.5 py-1.5 md:px-4 md:py-2 rounded-full mb-5 md:mb-6">
                    <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" /></span>
                    <span className="text-white text-[11px] md:text-xs font-bold uppercase tracking-[0.14em]"><span className="sm:hidden">Free estimates · Metro Atlanta</span><span className="hidden sm:inline">Now booking free estimates · Metro Atlanta</span></span>
                </div>

                <h1 className="font-display text-[2.6rem] min-[400px]:text-[2.9rem] sm:text-6xl lg:text-[clamp(2.9rem,min(4.6vw,8.2vh),4.75rem)] font-bold uppercase text-white leading-[0.95] mb-5 md:mb-6 tracking-[-0.01em] [text-shadow:0_2px_16px_rgba(0,0,0,0.35)]">
                    {HEADLINE.map((w, i) => (
                      <React.Fragment key={i}>
                        <span className="hero-mask">
                          <span
                            className={`hero-word${w.gold ? ' text-brand-gold' : ''}`}
                            style={{ '--d': `${0.18 + i * 0.06}s` } as React.CSSProperties}
                          >
                            {w.text}
                          </span>
                        </span>{i < HEADLINE.length - 1 ? ' ' : ''}
                      </React.Fragment>
                    ))}
                </h1>

                <p style={{ '--d': '0.7s' } as React.CSSProperties} className="hero-in text-base md:text-xl text-white/85 mb-6 max-w-md md:max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                    Based in Duluth and serving Alpharetta, Johns Creek, Roswell, Smyrna and all of North Metro Atlanta. We plan it, prep it and build it with our own crew.
                </p>

                <ul style={{ '--d': '0.82s' } as React.CSSProperties} className="hero-in mx-auto mb-7 hidden max-w-md space-y-2.5 text-left sm:block lg:mx-0">
                    {HERO_POINTS.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-[15px] font-semibold text-white md:text-base">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-dark"><Check size={14} strokeWidth={3} /></span>
                        {p}
                      </li>
                    ))}
                </ul>

                <div style={{ '--d': '0.95s' } as React.CSSProperties} className="hero-in mb-2 hidden flex-wrap items-center gap-x-6 gap-y-3 lg:flex">
                    <a href={BUSINESS.phoneHref} className="group inline-flex items-center gap-3 text-white">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-gold text-brand-gold transition-colors group-hover:bg-brand-gold group-hover:text-brand-dark"><Phone size={20} /></span>
                      <span className="leading-tight">
                        <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">Call or text</span>
                        <span className="block font-display text-2xl font-bold">{BUSINESS.phoneDisplay}</span>
                      </span>
                    </a>
                    <span className="h-10 w-px bg-white/20" aria-hidden="true" />
                    <span className="flex items-center gap-2 text-sm font-semibold text-white/80"><ShieldCheck size={18} className="text-brand-gold" /> Licensed &amp; insured in Georgia</span>
                </div>

                {/* Phones: compact trust strip above the form */}
                <ul style={{ '--d': '0.9s' } as React.CSSProperties} className="hero-in mx-auto grid w-full max-w-xl grid-cols-3 divide-x divide-white/15 rounded-xl border border-white/15 bg-brand-dark/50 backdrop-blur-md sm:hidden">
                    {heroBadges.map((b) => (
                      <li key={b.label} className="flex min-w-0 flex-col items-center justify-center gap-1.5 px-1 py-3 text-center">
                        <span className="text-brand-gold">{React.cloneElement(b.icon as React.ReactElement<any>, { className: 'h-[18px] w-[18px]' })}</span>
                        <span className="text-[10px] font-bold uppercase leading-[1.15] tracking-[0.02em] text-white">{b.label}</span>
                      </li>
                    ))}
                </ul>
            </div>

            {/* Right Form Column */}
            <div style={{ '--d': '0.45s' } as React.CSSProperties} className="hero-in hero-in--card w-full lg:w-[42%] max-w-md mx-auto lg:mr-0" data-lead-form>
               <div className="relative overflow-hidden rounded-xl border-t-4 border-brand-gold bg-white p-5 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)] md:p-8">
                  
                  {formStatus === 'SUCCESS' ? (
                     <div className="py-12 flex flex-col items-center justify-center text-center animate-[fadeIn_0.5s]">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg border-2 border-white/20">
                           <Check className="text-white w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-dark mb-2">Quote Requested!</h3>
                        <p className="text-slate-600 font-medium">We'll text you shortly with your estimate.</p>
                     </div>
                  ) : (
                     <div className="relative">
                        <div className="mb-4 flex items-center justify-between gap-3">
                           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a8661f]">Free estimate · Step {step + 1} of 2</span>
                           {step === 1 && (
                              <button type="button" onClick={() => setStep(0)} className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 transition-colors hover:text-brand-dark">
                                 <ArrowLeft size={13} /> Back
                              </button>
                           )}
                        </div>
                        <div className="mb-5 h-1 w-full overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
                           <div className="h-full rounded-full bg-brand-gold transition-[width] duration-500 ease-out" style={{ width: step === 0 ? '50%' : '100%' }} />
                        </div>

                        {step === 0 ? (
                           <div key="s0" className="hero-step">
                              <h3 className="text-2xl md:text-[1.7rem] font-display font-bold uppercase text-brand-dark mb-1.5 tracking-tight leading-tight">What are you planning?</h3>
                              <p className="text-slate-600 text-sm mb-5 font-medium">Pick one to start. It takes about 30 seconds.</p>
                              <div className="grid grid-cols-2 gap-2.5" role="group" aria-label="Project type">
                                 {PROJECTS.map(({ value, label, icon: Icon }, i) => (
                                    <button
                                       key={value}
                                       type="button"
                                       onClick={() => chooseProject(value)}
                                       className={`group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3.5 text-left text-[15px] font-semibold text-brand-dark transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold hover:bg-amber-50 hover:shadow-md focus-visible:border-brand-gold focus-visible:outline-none ${i === PROJECTS.length - 1 ? 'col-span-2' : ''}`}
                                    >
                                       <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-dark text-brand-gold transition-colors group-hover:bg-brand-gold group-hover:text-brand-dark">
                                          <Icon size={18} />
                                       </span>
                                       {label}
                                       <ArrowRight size={15} className="ml-auto -translate-x-1 text-[#a8661f] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                                    </button>
                                 ))}
                              </div>
                           </div>
                        ) : (
                           <form key="s1" onSubmit={handleSubmit} className="hero-step space-y-3">
                              <h3 className="text-2xl md:text-[1.7rem] font-display font-bold uppercase text-brand-dark mb-1 tracking-tight leading-tight">Where should we send it?</h3>
                              <p className="text-slate-600 text-sm mb-4 font-medium">
                                 {PROJECTS.find((p) => p.value === formData.service)?.label ?? 'Your project'} estimate. We'll follow up to talk it through.
                              </p>
                              <div className="grid grid-cols-2 gap-3">
                                 <input ref={firstFieldRef} type="text" name="firstName" placeholder="First name" autoComplete="given-name" required value={formData.firstName} onChange={handleInputChange} className={inputClass} />
                                 <input type="text" name="lastName" placeholder="Last name" autoComplete="family-name" required value={formData.lastName} onChange={handleInputChange} className={inputClass} />
                              </div>
                              <input type="tel" name="phone" placeholder="Phone number" autoComplete="tel" inputMode="tel" required value={formData.phone} onChange={handleInputChange} className={inputClass} />
                              <input type="email" name="email" placeholder="Email address" autoComplete="email" required value={formData.email} onChange={handleInputChange} className={inputClass} />
                              <button
                                 type="submit"
                                 disabled={formStatus === 'LOADING'}
                                 className="group mt-1 flex w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-brand-gold py-4 text-xs font-bold uppercase tracking-wide text-brand-dark shadow-lg transition-all hover:-translate-y-0.5 hover:bg-brand-goldHover active:scale-95 disabled:opacity-70"
                              >
                                 {formStatus === 'LOADING' ? <Loader2 className="animate-spin" size={18} /> : <>Get My Free Quote <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></>}
                              </button>
                              <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1">
                                 <ShieldCheck size={12} /> No obligation. Privacy protected.
                              </p>
                              {formStatus === 'ERROR' && (
                                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex flex-col gap-1 text-left">
                                  <span className="font-bold">Error Submitting</span>
                                  <p className="leading-relaxed opacity-95">{heroErrorMsg || "Something went wrong. Please check details and try again."}</p>
                                </div>
                              )}
                           </form>
                        )}

                        <a href={BUSINESS.phoneHref} className="mt-5 flex items-center justify-center gap-2 border-t border-slate-200 pt-4 text-sm font-medium text-slate-600 transition-colors hover:text-[#a8661f]">
                           <Phone size={14} className="text-[#a8661f]" /> Prefer to talk? Call <span className="font-bold text-brand-dark">{BUSINESS.phoneDisplay}</span>
                        </a>
                     </div>
                  )}
               </div>
            </div>
          </div>
      </div>

    </section>
  );
};
