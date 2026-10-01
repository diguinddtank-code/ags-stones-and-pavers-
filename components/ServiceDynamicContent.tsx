import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Phone,
  CheckCircle2,
  Shield,
  Star,
  Clock,
  ArrowRight,
  MapPin,
  Award,
  ShieldCheck,
  Loader2,
  Check,
  ChevronDown,
} from 'lucide-react';

const GOOGLE_CONVERSION_ID = 'AW-16885125181/Au3NCM3fmugbEL2guvM-';

// Analytics tracking helpers
const trackCallClick = () => {
  if (typeof window !== 'undefined') {
    const gtagReport = (window as any).gtag_report_conversion;
    if (typeof gtagReport === 'function') {
      gtagReport('tel:6784287630');
    } else if ((window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: GOOGLE_CONVERSION_ID,
        event_category: 'Contact',
        event_label: 'Call Click',
      });
    }
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Contact');
    }
  }
};

const triggerConversionEvents = (leadData: {
  fullName: string;
  phone: string;
  zipOrCity: string;
  serviceOrMaterial: string;
}) => {
  if (typeof window !== 'undefined') {
    // 1. Google Tag / Google Ads conversion event
    if ((window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: GOOGLE_CONVERSION_ID,
      });
    }

    // 2. Meta Pixel Track Lead
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: leadData.serviceOrMaterial,
        content_category: 'Service Quote',
        value: 5000.0,
        currency: 'USD',
      });
    }
  }
};

const formatPhoneNumber = (value: string) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');
  const len = phoneNumber.length;
  if (len < 4) return phoneNumber;
  if (len < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ServiceData {
  id: string;
  name: string;
  heroImage: string;
  heroSubtitle: string;
  overviewHeading: string;
  overviewParagraphs: string[];
  parallaxImage: string;
  parallaxQuote: string;
  process: ProcessStep[];
}

interface Props {
  data: ServiceData;
  /** Rendered before the final CTA (FAQ, local links, guides). */
  extraSections?: React.ReactNode;
}

const renderParagraphWithLinks = (text: string) => {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }
    
    const anchorText = match[1];
    const url = match[2];

    const isExternal = url.startsWith('http') || url.startsWith('tel:') || url.startsWith('mailto:');
    if (isExternal) {
      parts.push(
        <a 
          key={matchIndex} 
          href={url} 
          onClick={url.startsWith('tel:') ? trackCallClick : undefined}
          target={url.startsWith('tel:') ? undefined : "_blank"}
          rel={url.startsWith('tel:') ? undefined : "noopener noreferrer"}
          className="text-brand-gold hover:underline font-semibold"
        >
          {anchorText}
        </a>
      );
    } else {
      parts.push(
        <Link 
          key={matchIndex} 
          to={url} 
          className="text-brand-gold hover:underline font-semibold"
        >
          {anchorText}
        </Link>
      );
    }
    
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

export const ServiceDynamicContent: React.FC<Props> = ({ data, extraSections }) => {
  const { scrollY } = useScroll();
  const heroFormRef = useRef<HTMLDivElement>(null);
  const [showFlyButton, setShowFlyButton] = useState(false);

  // Parallax calculations
  const yHero = useTransform(scrollY, [0, 1000], [0, 260]);
  const yParallax = useTransform(scrollY, [0, 2000], [0, -300]);

  // Form State
  const [formStatus, setFormStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [formErrorMsg, setFormErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    zipOrCity: '',
    serviceOrMaterial: data.name || 'Driveway Paver Installation',
    notes: '',
  });

  // Keep selected service in sync with current page service
  useEffect(() => {
    if (data?.name) {
      setFormData((prev) => ({
        ...prev,
        serviceOrMaterial: data.name,
      }));
    }
  }, [data?.name]);

  // Mobile Sticky Fly Button: monitor when hero form exits the viewport
  useEffect(() => {
    const target = heroFormRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show fly button when user scrolls down and hero form exits viewport
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setShowFlyButton(true);
        } else {
          setShowFlyButton(false);
        }
      },
      {
        threshold: 0.05,
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    const formEl = document.getElementById('hero-service-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        const inputEl = formEl.querySelector('input') as HTMLInputElement | null;
        if (inputEl) inputEl.focus();
      }, 450);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('LOADING');
    setFormErrorMsg('');

    try {
      // 1. Send to local backend /api/lead
      const apiPromise = fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      }).catch((err) => {
        console.warn('Backend /api/lead notice:', err);
      });

      // 2. Direct Web3Forms submission for redundant email delivery
      const web3Promise = fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'faed6a10-57e8-4faa-b1ec-74c37345ea30',
          subject: `New Quote Request: ${formData.fullName} - ${formData.serviceOrMaterial}`,
          name: formData.fullName,
          phone: formData.phone,
          message: `Service/Material: ${formData.serviceOrMaterial}\nZIP/City: ${formData.zipOrCity}\nProject Notes: ${formData.notes || 'None'}\nPage URL: ${typeof window !== 'undefined' ? window.location.href : ''}`,
        }),
      });

      const [_, web3Res] = await Promise.all([apiPromise, web3Promise]);
      const resData = await web3Res.json().catch(() => ({}));

      if (web3Res.ok || resData.success) {
        setFormStatus('SUCCESS');
        triggerConversionEvents(formData);
      } else {
        setFormStatus('ERROR');
        setFormErrorMsg(resData.message || 'Unable to submit right now. Please call us directly at (678) 428-7630.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setFormStatus('ERROR');
      setFormErrorMsg('Connection error. Please call us directly at (678) 428-7630.');
    }
  };

  // Framer motion variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <div className="bg-white overflow-hidden selection:bg-brand-gold selection:text-white">
      {/* 1. HERO SECTION (SPLIT GRID DE ALTA CONVERSÃO) */}
      <section className="relative min-h-[100svh] w-full flex items-center justify-center pt-28 sm:pt-32 lg:pt-32 pb-12 sm:pb-16 md:pb-24 overflow-hidden bg-brand-dark">
        {/* Background Image Layer with Parallax */}
        <motion.div 
          style={{ y: yHero }}
          className="absolute inset-0 z-0 origin-top pointer-events-none"
        >
           <img 
              src={data.heroImage} 
              alt={data.name} 
              className="w-full h-full object-cover brightness-[0.7] contrast-[1.05] scale-105"
           />
        </motion.div>
        
        {/* Soft, balanced gradient overlays - much lighter so the hardscape work is clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/75 via-brand-dark/45 to-black/25 z-0 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-black/35 z-0 pointer-events-none"></div>

        {/* CONTAINER WITH SCREEN LIMITS (max-w-7xl, 2xl:max-w-[98rem], 3xl:max-w-[110rem]) */}
        <div className="relative z-10 w-full max-w-7xl 2xl:max-w-[98rem] 3xl:max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-16 items-center">
            
            {/* LEFT COLUMN: Authority, H1, Bullets, Call Button, Google Guaranteed Badge */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="lg:col-span-7 text-center lg:text-left"
            >
              {/* Authority Badge (Compact on mobile) */}
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md border border-brand-gold/50 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full mb-3 sm:mb-4 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase">
                  Top-Rated in Metro Atlanta
                </span>
              </motion.div>

              {/* Dynamic Subtitle */}
              {data.heroSubtitle && (
                <motion.p variants={fadeUp} className="text-brand-gold uppercase tracking-[0.2em] text-xs sm:text-sm font-bold mb-2 sm:mb-3">
                  {data.heroSubtitle}
                </motion.p>
              )}

              {/* H1 Headline (Monumental, bold and impactful) */}
              <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white font-black leading-[1.06] mb-4 sm:mb-6 tracking-tight drop-shadow-2xl">
                {data.name}
              </motion.h1>

              {/* 3 Value Bullets (Compact and readable) */}
              <motion.div variants={fadeUp} className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6 max-w-2xl mx-auto lg:mx-0 text-left">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-brand-gold/20 border border-brand-gold flex items-center justify-center shrink-0 mt-0.5 text-brand-gold shadow-sm">
                    <CheckCircle2 size={13} className="text-brand-gold stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm sm:text-base block leading-snug drop-shadow-sm">
                      Licensed & Insured
                    </span>
                    <span className="text-gray-300 text-xs sm:text-sm block">
                      Fully covered in Georgia with general liability and workers' comp.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-brand-gold/20 border border-brand-gold flex items-center justify-center shrink-0 mt-0.5 text-brand-gold shadow-sm">
                    <CheckCircle2 size={13} className="text-brand-gold stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm sm:text-base block leading-snug drop-shadow-sm">
                      Factory-Direct Pricing
                    </span>
                    <span className="text-gray-300 text-xs sm:text-sm block">
                      Bulk-sourced pavers and wall blocks straight from manufacturers.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-brand-gold/20 border border-brand-gold flex items-center justify-center shrink-0 mt-0.5 text-brand-gold shadow-sm">
                    <CheckCircle2 size={13} className="text-brand-gold stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm sm:text-base block leading-snug drop-shadow-sm">
                      100% In-House Crews
                    </span>
                    <span className="text-gray-300 text-xs sm:text-sm block">
                      No random subcontractors. Master stone masons on your site every day.
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Action Area: Call Button + Google Guaranteed Badge directly below */}
              <motion.div variants={fadeUp} className="flex flex-col items-center lg:items-start gap-3 mb-6 lg:mb-0">
                {/* Compact, elegant Call Button (NOT huge) */}
                <a 
                  href="tel:6784287630" 
                  onClick={trackCallClick}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-brand-gold hover:bg-white text-brand-dark font-extrabold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-lg active:scale-95 group"
                >
                  <Phone size={15} className="stroke-[2.5]" />
                  <span>Call (678) 428-7630</span>
                </a>

                {/* Google Guaranteed Badge (Positioned below the call button) */}
                <div className="inline-flex items-center gap-2 sm:gap-2.5 py-1.5 px-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-sm">
                  <div className="w-5 h-5 rounded-md bg-[#00875A] flex items-center justify-center shrink-0 shadow-sm">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 text-left leading-tight">
                    <span className="font-extrabold text-white text-xs tracking-tight">Google Guaranteed</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-300 hidden sm:inline">• 5.0 Rating</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN: Floating Form Card */}
            <motion.div 
              ref={heroFormRef}
              id="hero-service-form"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 w-full max-w-lg mx-auto lg:mr-0 scroll-mt-28"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 sm:p-7 md:p-8 border border-white/60 text-brand-dark relative overflow-hidden">
                {/* Gold top accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-gold via-amber-300 to-brand-gold"></div>

                {formStatus === 'SUCCESS' ? (
                  <div className="py-10 text-center animate-fadeIn">
                    <div className="w-16 h-16 bg-emerald-100 border-2 border-emerald-500 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Check size={32} className="stroke-[3]" />
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark mb-2">
                      Estimate Request Received!
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
                      Thank you! One of our hardscaping estimators will call or text you shortly with your free estimate.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 mb-6 text-left text-xs sm:text-sm space-y-1">
                      <p><strong>Name:</strong> {formData.fullName}</p>
                      <p><strong>Phone:</strong> {formData.phone}</p>
                      <p><strong>Service:</strong> {formData.serviceOrMaterial}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormStatus('IDLE');
                        setFormData({
                          fullName: '',
                          phone: '',
                          zipOrCity: '',
                          serviceOrMaterial: data.name || 'Driveway Paver Installation',
                          notes: '',
                        });
                      }}
                      className="text-xs uppercase tracking-wider font-bold text-brand-gold hover:underline"
                    >
                      Submit another project request
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Form Header */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight">
                        Get Your Free Estimate
                      </h3>
                      <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300/80 text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                        Quick Response
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-5 font-medium leading-relaxed">
                      Lock in your on-site consultation. Fast, friendly pricing with zero sales pressure.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="John Smith"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full bg-slate-50 border border-gray-300 rounded-xl px-4 py-3 text-brand-dark text-sm placeholder-gray-400 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 outline-none transition-all font-medium"
                        />
                      </div>

                      {/* Phone + ZIP/City */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="(678) 000-0000"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })
                            }
                            className="w-full bg-slate-50 border border-gray-300 rounded-xl px-4 py-3 text-brand-dark text-sm placeholder-gray-400 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 outline-none transition-all font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                            ZIP Code or City <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 30096 or Atlanta, GA"
                            value={formData.zipOrCity}
                            onChange={(e) => setFormData({ ...formData, zipOrCity: e.target.value })}
                            className="w-full bg-slate-50 border border-gray-300 rounded-xl px-4 py-3 text-brand-dark text-sm placeholder-gray-400 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 outline-none transition-all font-medium"
                          />
                        </div>
                      </div>

                      {/* Service / Material Selection */}
                      <div className="relative">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Service Needed <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={formData.serviceOrMaterial}
                            onChange={(e) =>
                              setFormData({ ...formData, serviceOrMaterial: e.target.value })
                            }
                            className="w-full bg-slate-50 border border-gray-300 rounded-xl px-4 py-3 text-brand-dark text-sm focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 outline-none transition-all appearance-none cursor-pointer font-medium pr-10"
                          >
                            <option value={data.name}>{data.name} (Featured Service)</option>
                            <option value="Driveway Paver Installation">Driveway Paver Installation</option>
                            <option value="Outdoor Patio Builders">Outdoor Patio & Living Spaces</option>
                            <option value="Retaining Wall Installation">Structural Retaining Walls</option>
                            <option value="Pool Deck Pavers & Travertine">Pool Deck Pavers & Travertine</option>
                            <option value="Outdoor Fireplaces & Masonry">Outdoor Fireplaces & Fire Pits</option>
                            <option value="Deck Builders">Custom Deck Construction</option>
                            <option value="Stone Veneer Installation">Stone Veneer Masonry</option>
                            <option value="3D Landscape & Hardscape Design">3D Landscape & Hardscape Design</option>
                            <option value="Other Custom Hardscaping">Other Custom Hardscaping Project</option>
                          </select>
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-4 h-4" />
                        </div>
                      </div>

                      {/* Optional Project Details */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Project Details <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Approximate size, timeline, or any specific ideas you have in mind..."
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full bg-slate-50 border border-gray-300 rounded-xl px-4 py-2.5 text-brand-dark text-sm placeholder-gray-400 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 outline-none transition-all resize-none font-medium"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={formStatus === 'LOADING'}
                        className="w-full bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-black py-4 px-6 rounded-xl shadow-xl uppercase tracking-wider text-sm transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 mt-2 disabled:opacity-75 disabled:cursor-not-allowed group"
                      >
                        {formStatus === 'LOADING' ? (
                          <>
                            <Loader2 className="animate-spin" size={18} />
                            <span>Sending Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Request Free Estimate</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>

                      {/* Privacy Badge */}
                      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 pt-1 text-center">
                        <ShieldCheck size={15} className="text-emerald-600 shrink-0" />
                        <span>100% Privacy Protected. We never sell or share your info.</span>
                      </div>

                      {/* Error Message */}
                      {formStatus === 'ERROR' && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
                          <p className="font-medium leading-relaxed">{formErrorMsg}</p>
                        </div>
                      )}
                    </form>
                  </>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. MOBILE STICKY FLY BUTTON (ACTIVATES ONLY AFTER SCROLLING PAST HERO FORM) */}
      <AnimatePresence>
        {showFlyButton && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
          >
            <div className="bg-brand-dark/95 backdrop-blur-xl border border-brand-gold/50 rounded-2xl p-2 shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex items-center gap-2">
              {/* Button 1: "Call Now" with phone icon */}
              <a
                href="tel:6784287630"
                onClick={trackCallClick}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-2 bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-black rounded-xl text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 text-center"
              >
                <Phone size={15} className="stroke-[2.5]" />
                <span>Call Now</span>
              </a>

              {/* Button 2: "Get Free Quote" with smooth scroll to form */}
              <button
                type="button"
                onClick={scrollToForm}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-2 bg-white text-brand-dark hover:bg-gray-100 font-black rounded-xl text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 text-center"
              >
                <ArrowRight size={15} className="stroke-[2.5] text-brand-gold" />
                <span>Get Free Quote</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OVERVIEW SECTION (Negative Space & Typography) */}
      <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto border-b border-gray-100 relative overflow-hidden">
         {/* Decorative background element */}
         <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-gold/5 blur-[100px] rounded-full pointer-events-none"></div>

         <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-12 lg:gap-24 relative z-10"
         >
            <div className="md:w-5/12 space-y-6">
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.2 }}
                 className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest text-brand-dark"
               >
                  <Star className="w-4 h-4 text-brand-gold fill-brand-gold" /> Premium Service
               </motion.div>
               <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark font-medium leading-[1.1] tracking-tight">
                  {data.overviewHeading}
               </h2>
               
               <div className="hidden md:block pt-8">
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-[1px] bg-brand-gold"></div>
                     <span className="text-sm font-bold uppercase tracking-widest text-[#8c98a4]">Atlanta's Choice</span>
                  </div>
               </div>
            </div>
            
            <div className="md:w-7/12 space-y-6 text-lg md:text-xl text-[#4a5568] font-sans leading-relaxed md:pt-14 relative">
               {/* Vertical decorative line */}
               <div className="hidden md:block absolute left-[-3rem] top-14 bottom-0 w-[1px] bg-gradient-to-b from-brand-gold/50 to-transparent"></div>
               
               {data.overviewParagraphs.map((p, idx) => (
                 <motion.p 
                   key={idx}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.3 + (idx * 0.1) }}
                 >
                   {renderParagraphWithLinks(p)}
                 </motion.p>
               ))}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.6 }}
                 className="pt-8"
               >
                 <Link to="/quote" className="inline-flex items-center gap-3 font-bold text-brand-dark uppercase tracking-widest text-sm hover:text-brand-gold transition-colors group">
                    <span className="border-b border-brand-dark group-hover:border-brand-gold pb-1 transition-colors">Schedule a Consultation</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform text-brand-gold" />
                 </Link>
               </motion.div>
            </div>
         </motion.div>
      </section>

      {/* WHY CHOOSE US / TRUST SECTION */}
      <section className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 md:gap-16">
            {[
              { icon: Shield, title: "No Subcontractors", desc: "We use our own in-house crews. This guarantees quality control and keeps your project strictly on schedule." },
              { icon: Star, title: "Premium Materials", desc: "We source only the highest-grade stone, pavers, and base materials, ensuring your outdoor space withstands the elements and regular use." },
              { icon: CheckCircle2, title: "Flawless Execution", desc: "From precise base excavation to the final sweep of polymeric sand, we never rush the process or cut corners." }
            ].map((trust, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: 0.15 * idx }}
                 className="flex flex-col items-start space-y-5 relative group"
               >
                  <div className="w-16 h-16 bg-[#f8f9fa] rounded-2xl flex items-center justify-center text-brand-gold mb-2 group-hover:bg-brand-gold group-hover:text-white transition-colors duration-500">
                     <trust.icon size={28} />
                  </div>
                  <h4 className="font-bold text-brand-dark text-2xl group-hover:text-brand-gold transition-colors duration-300">{trust.title}</h4>
                  <p className="text-[#4a5568] leading-relaxed text-base md:text-lg">
                     {trust.desc}
                  </p>
               </motion.div>
            ))}
         </div>
      </section>

      {/* PARALLAX BREAK & QUOTE */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center px-4 bg-brand-dark">
         <motion.div 
           style={{ y: yParallax }}
           className="absolute inset-x-0 -top-[30%] -bottom-[30%] z-0"
         >
           <img 
              src={data.parallaxImage} 
              alt="Quality Craftsmanship" 
              className="w-full h-full object-cover brightness-[0.5] contrast-[1.05]"
           />
         </motion.div>
         
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative z-10 max-w-4xl mx-auto text-center"
         >
           <span className="block text-brand-gold text-7xl font-serif leading-none mb-2">"</span>
           <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl text-white leading-tight font-medium max-w-3xl mx-auto">
             {data.parallaxQuote}
           </h3>
         </motion.div>
      </section>

      {/* TIMELINE / PROCESS */}
      <section id="process" className="py-24 md:py-40 px-6 bg-gray-50 overflow-hidden relative">
         <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center mb-16 md:mb-28"
            >
               <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Proven Methodology</span>
               <h2 className="font-serif text-4xl md:text-6xl text-brand-dark font-medium mb-6">Our Process</h2>
               <p className="text-[#8c98a4] max-w-2xl mx-auto text-lg md:text-xl">
                  No guesswork. Just a proven process that delivers your dream outdoor space on time and done right the first time.
               </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8 md:gap-12 relative">
               {/* Connecting Line */}
               <div className="hidden md:block absolute top-[45px] left-[12%] right-[12%] h-[2px] bg-brand-gold/20 z-0"></div>

               {data.process.map((step, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 40 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.8, delay: idx * 0.2 }}
                   className="relative z-10 flex flex-col items-center text-center group"
                 >
                    <div className="w-24 h-24 bg-white shadow-xl rounded-full flex flex-col items-center justify-center text-brand-gold font-bold font-serif text-3xl mb-8 relative transition-transform duration-500 group-hover:-translate-y-2 border border-[#eef0f2]">
                       <span className="relative z-10">{idx + 1}</span>
                       <span className="text-[10px] uppercase font-sans tracking-widest text-[#8c98a4] absolute bottom-4">Step</span>
                       {/* Hover ripple */}
                       <div className="absolute inset-0 rounded-full border-2 border-brand-gold/40 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700"></div>
                    </div>
                    <h4 className="font-bold text-brand-dark text-xl md:text-2xl mb-4 group-hover:text-brand-gold transition-colors">{step.title}</h4>
                    <p className="text-[#4a5568] text-base leading-relaxed max-w-[280px]">{step.description}</p>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* REGIONAL ARCHITECTURAL SHOWCASES & CONTEXTUAL INTERNAL LINKING */}
      <section className="py-24 md:py-36 px-6 bg-white overflow-hidden relative border-t border-gray-100">
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
         <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-left mb-16 md:mb-24"
            >
               <span className="text-brand-gold font-bold tracking-[0.25em] uppercase text-xs mb-3 block font-mono">
                  [ Neighborhood Case Files & Regional Indexes ]
               </span>
               <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-brand-dark font-medium mb-6 tracking-tight leading-tight">
                  Regional Architectural Expertise
               </h2>
               <p className="text-[#8c98a4] max-w-3xl text-lg md:text-xl font-sans leading-relaxed">
                  We build structures engineered to outlast our lifetimes. Explore custom residential portfolios and hyper-local blueprints designed specifically to survive Georgia's unique environmental conditions.
               </p>
            </motion.div>

            {/* Link Cards Bento Block */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
               {(() => {
                  interface NeighborhoodLink {
                     title: string;
                     url: string;
                     badge: string;
                     description: string;
                  }

                  const showcasesDb: Record<string, NeighborhoodLink[]> = {
                     'driveway-pavers': [
                        {
                           title: 'Alpharetta GA Custom Driveways',
                           url: '/driveways-pavers-alpharetta-ga',
                           badge: 'ARCHITECTURAL RESIDENCE',
                           description: 'Explore high-end interlocking stone designs built to satisfy Alpharetta\'s premium neighborhood covenants and heavy Georgia clays.'
                        },
                        {
                           title: 'Paving Stone Contractor Roswell',
                           url: '/paving-stone-contractor-roswell',
                           badge: 'ROSWELL MASONS',
                           description: 'Heritage craftsmanship tailored to Roswell’s historic luxury utilizing robust subgrade excavation.'
                        },
                        {
                           title: 'Atlanta Regional Retaining Walls',
                           url: '/hardscape-installation-atlanta',
                           badge: 'ATLANTA HARDSCAPE',
                           description: 'Comprehensive hardscaping designed for Atlanta’s toughest slopes, managing complete terrain overhauls.'
                        }
                     ],
                     'driveways-pavers-alpharetta-ga': [
                        {
                           title: 'Stone Patios Alpharetta',
                           url: '/stone-patio-contractors-alpharetta-ga',
                           badge: 'ALPHARETTA LUXURY',
                           description: 'Coordinate your premium entryway pavements directly with an exquisite backyard stone patio built for entertaining.'
                        },
                        {
                           title: 'Atlanta Hardscape Installations',
                           url: '/hardscape-installation-atlanta',
                           badge: 'STRUCTURAL HARDSCAPE',
                           description: 'See how we approach heavy terrain remodeling alongside our driveway installations.'
                        },
                        {
                           title: 'Driveway Pavers Atlanta',
                           url: '/driveway-pavers-atlanta',
                           badge: 'TECHNICAL BLUEPRINT',
                           description: 'Review our metro-wide specifications for managing clay shifting and zero-tolerance load-bearing concrete grids.'
                        }
                     ],
                     'outdoor-kitchen-johns-creek-ga': [
                        {
                           title: 'Paver Patio Johns Creek',
                           url: '/paver-patio-johns-creek-ga',
                           badge: 'JOHNS CREEK PATIOS',
                           description: 'The definitive foundation for your outdoor kitchen. Custom modular paver patios built to support intense weights.'
                        },
                        {
                           title: 'Duluth Paver Patios',
                           url: '/paver-patio-duluth-ga',
                           badge: 'DULUTH OUTDOOR LIVING',
                           description: 'Tour structural paver layouts in neighboring Duluth designed specifically for year-round family entertainment.'
                        },
                        {
                           title: 'Core Outdoor Patio Builders',
                           url: '/service/outdoor-patio-builders',
                           badge: 'DESIGN DATABASE',
                           description: 'Browse the catalog of premium modular stone formats, flagstones, structural slope grading maps, and water runoff blueprints.'
                        }
                     ],
                     'driveway-pavers-atlanta': [
                        {
                           title: 'Roswell Paving Stones',
                           url: '/paving-stone-contractor-roswell',
                           badge: 'ROSWELL PRECISION',
                           description: 'Check out premium interlocking driveways meticulously lined with Belgian cobbles matching historic Roswell properties.'
                        },
                        {
                           title: 'Smyrna Hardscaping Pros',
                           url: '/hardscaping-smyrna',
                           badge: 'SMYRNA MASONRY',
                           description: 'See our adjacent property remodeling efforts, covering full yard hardscapes in Smyrna.'
                        },
                        {
                           title: 'Alpharetta Architectural Pavers',
                           url: '/driveways-pavers-alpharetta-ga',
                           badge: 'ALPHARETTA HIGH-END',
                           description: 'Review our top-tier driveway executions managing aggressive HOA specifications and premium estate profiles.'
                        }
                     ],
                     'retaining-walls-atlanta': [
                        {
                           title: 'Atlanta Hardscape Mastery',
                           url: '/hardscape-installation-atlanta',
                           badge: 'FULL SCOPE LANDSCAPING',
                           description: 'Learn how retaining walls play a critical component in our end-to-end Hardscape Installation process across Atlanta.'
                        },
                        {
                           title: 'Hardscaping Smyrna',
                           url: '/hardscaping-smyrna',
                           badge: 'SMYRNA YARD LEVELING',
                           description: 'See how we stabilize Smyrna properties through expert grading, earth moving, and structural stone construction.'
                        },
                        {
                           title: 'Atlanta Advanced Driveway Pavers',
                           url: '/driveway-pavers-atlanta',
                           badge: 'STABILIZED DRIVES',
                           description: 'Anchor sloping parking spaces with interlocking concrete pavers engineered to absorb vehicle shear load safely.'
                        }
                     ],
                     'outdoor-patios-atlanta': [
                        {
                           title: 'Stone Patio Contractors Alpharetta',
                           url: '/stone-patio-contractors-alpharetta-ga',
                           badge: 'ALPHARETTA PATIOS',
                           description: 'Elevated stone patio engineering using architectural slate and zero-pooling grading matrices.'
                        },
                        {
                           title: 'Paver Patio Duluth GA',
                           url: '/paver-patio-duluth-ga',
                           badge: 'DULUTH ENTERTAINMENT',
                           description: 'Customized modular stone patios built in Duluth specifically for dynamic Georgia weather cycles.'
                        },
                        {
                           title: 'Paver Patio Johns Creek',
                           url: '/paver-patio-johns-creek-ga',
                           badge: 'JOHNS CREEK OASIS',
                           description: 'Luxury paver foundations that seamlessly integrate with high-end outdoor kitchens and backyard resort zones.'
                        }
                     ],
                     'pool-deck-pavers-atlanta': [
                        {
                           title: 'Johns Creek Pro Outdoor Kitchens',
                           url: '/outdoor-kitchen-johns-creek-ga',
                           badge: 'CULINARY RESORTS',
                           description: 'Host poolside dinner parties with stainless steel grill engines, stone-faced cocktail counters, and built-in masonry drafts.'
                        },
                        {
                           title: 'Alpharetta Stone Patios',
                           url: '/stone-patio-contractors-alpharetta-ga',
                           badge: 'ALPHARETTA HARDSCAPING',
                           description: 'Expand your pool deck visually into sweeping, grand stone patios designed for luxury Alpharetta yards.'
                        },
                        {
                           title: 'Hardscape Installation Atlanta',
                           url: '/hardscape-installation-atlanta',
                           badge: 'COMPLETE OVERHAUL',
                           description: 'Integrate your brand new pool deck into a comprehensive Atlanta hardscape redesign including walls and pathways.'
                        }
                     ],
                     // For all other dynamically generated or generic pages we'll provide default ones below.
                  };

                  const links = showcasesDb[data.id] || [
                     {
                        title: 'Stone Patios Alpharetta',
                        url: '/stone-patio-contractors-alpharetta-ga',
                        badge: 'ALPHARETTA LUXURY SECRETS',
                        description: 'View breathtaking residential stone patios engineered with structural integrity to match Alpharetta’s premium aesthetics.'
                     },
                     {
                        title: 'Paver Patio Johns Creek',
                        url: '/paver-patio-johns-creek-ga',
                        badge: 'JOHNS CREEK RESORT PADS',
                        description: 'The foundation of the perfect outdoor kitchen. Discover load-bearing, zero-shift paver patios throughout Johns Creek.'
                     },
                     {
                        title: 'Hardscaping Smyrna & Atlanta',
                        url: '/hardscaping-smyrna',
                        badge: 'STRUCTURAL LANDSCAPING',
                        description: 'Witness complete yard transformations, turning unmanageable slopes into gorgeous, level masonry entertaining hubs.'
                     }
                  ];

                  return links.map((link, keyIdx) => (
                     <motion.div 
                        key={keyIdx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: keyIdx * 0.15 }}
                        className="group flex flex-col justify-between bg-white border border-gray-100 hover:border-brand-gold/40 p-10 rounded-2xl transition-all duration-500 shadow-[0_15px_45px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.06)] relative overflow-hidden"
                     >
                        {/* Decorative card glow */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-brand-gold/20 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></div>

                        <div>
                           <span className="font-mono text-[10px] tracking-[0.2em] text-[#8c98a4] font-bold block mb-4 group-hover:text-brand-gold transition-colors">
                              🔧 {link.badge}
                           </span>
                           <h3 className="font-serif text-2xl text-brand-dark font-medium leading-snug mb-5 group-hover:translate-x-1 transition-transform duration-300">
                              {link.title}
                           </h3>
                           <p className="text-[#4a5568] text-base leading-relaxed mb-10 font-sans">
                              {link.description}
                           </p>
                        </div>

                        <div>
                           <Link 
                              to={link.url}
                              className="inline-flex items-center gap-3 font-bold text-xs uppercase tracking-widest text-[#1a202c] hover:text-brand-gold transition-colors"
                           >
                              <span>Explore Details</span>
                              <ArrowRight size={16} className="text-brand-gold group-hover:translate-x-2 transition-transform" />
                           </Link>
                        </div>
                     </motion.div>
                  ));
               })()}
            </div>
         </div>
      </section>

      {extraSections}

      {/* FINAL SCARCITY CTA */}
      <section className="bg-brand-dark py-24 md:py-32 px-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
           <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-brand-gold mx-auto mb-8 opacity-90" />
           <h2 className="font-serif text-3xl md:text-5xl text-white font-medium mb-6 leading-[1.2]">
             Quality takes time. Our schedule is filling up fast.
           </h2>
           <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed font-sans max-w-2xl mx-auto">
             We handle every project with our own in-house crews and never sub-contract your installation. Because we refuse to cut corners, our calendar books quickly. Secure your spot today and let's get started.
           </p>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link to="/quote" className="w-full sm:w-auto px-10 py-5 bg-brand-gold text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-brand-dark transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
               Request Free Quote
             </Link>
             <a href="tel:6784287630" onClick={trackCallClick} className="w-full sm:w-auto px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors duration-300 flex items-center justify-center gap-2">
               <Phone size={18} /> Call Us Direct
             </a>
           </div>
        </motion.div>
      </section>

    </div>
  );
};

