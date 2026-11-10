import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Phone,
  CheckCircle2,
  ArrowRight,
  MapPin,
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
  /** Service-specific jobsite gallery shown after the overview. */
  fieldworkSection?: React.ReactNode;
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

export const ServiceDynamicContent: React.FC<Props> = ({ data, fieldworkSection, extraSections }) => {
  const { scrollY } = useScroll();
  const heroFormRef = useRef<HTMLDivElement>(null);
  const [showFlyButton, setShowFlyButton] = useState(false);

  // Parallax calculations
  const yHero = useTransform(scrollY, [0, 1000], [0, 260]);

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
            
            {/* Service overview, estimate form and direct contact */}
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
                  Duluth based · Serving Metro Atlanta
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
                      Material Options
                    </span>
                    <span className="text-gray-300 text-xs sm:text-sm block">
                      Review paver and wall materials that fit the project scope.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-brand-gold/20 border border-brand-gold flex items-center justify-center shrink-0 mt-0.5 text-brand-gold shadow-sm">
                    <CheckCircle2 size={13} className="text-brand-gold stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm sm:text-base block leading-snug drop-shadow-sm">
                      In-House Crews
                    </span>
                    <span className="text-gray-300 text-xs sm:text-sm block">
                      Work with the AGS team throughout the installation.
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Direct contact option */}
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
                      Share a few details about the property and what you have in mind.
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
               <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">Service overview</p>
               <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark font-medium leading-[1.1] tracking-tight">
                  {data.overviewHeading}
               </h2>
               
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

      {fieldworkSection}

      {/* A compact image and message break, without a tall parallax scroll gap. */}
      <section className="relative min-h-[280px] md:min-h-[360px] w-full overflow-hidden flex items-center justify-center px-5 py-16 bg-brand-dark">
         <img
            src={data.heroImage}
            alt="Completed hardscape detail for this service"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.42]"
            loading="lazy"
            decoding="async"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 via-brand-dark/35 to-brand-dark/60" />
         <motion.div
           initial={{ opacity: 0, y: 16 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.45, ease: "easeOut" }}
           className="relative z-10 max-w-3xl mx-auto text-center"
         >
           <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">Built for your property</p>
           <h3 className="font-serif text-2xl md:text-4xl text-white leading-tight font-medium max-w-3xl mx-auto">
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
               <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-sm mb-4 block">From site review to final details</span>
               <h2 className="font-serif text-4xl md:text-6xl text-brand-dark font-medium mb-6">How the work takes shape</h2>
               <p className="text-[#8c98a4] max-w-2xl mx-auto text-lg md:text-xl">
                  We review the site, define the scope and discuss material options before installation begins.
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
                    <div aria-label={`Step ${idx + 1}`} className="w-24 h-24 bg-white shadow-xl rounded-full flex items-center justify-center text-brand-gold font-bold font-serif text-4xl mb-8 relative transition-transform duration-500 group-hover:-translate-y-2 border border-[#eef0f2]">
                       <span aria-hidden="true" className="relative z-10">{String(idx + 1).padStart(2, '0')}</span>
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

      {/* Relevant service areas and guides are rendered from the page metadata below. */}

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
             Start with the details of your property.
           </h2>
           <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed font-sans max-w-2xl mx-auto">
             Tell us where the project is, what you want to build and what matters most to you. We can review the site and discuss a clear scope and next steps.
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

