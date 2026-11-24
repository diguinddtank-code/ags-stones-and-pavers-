import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Phone,
  CheckCircle2,
  ArrowRight,
  MapPin,
  ShieldCheck,
  Loader2,
  Check,
  ChevronDown,
  HardHat,
  ClipboardCheck,
} from 'lucide-react';
import { BUSINESS } from '../lib/business';
import { CtaBand } from './CtaBand';
import { trackLead } from '../lib/tracking';
import { Img } from './ui/Img';

// Call clicks are tracked once, app-wide, by the tel: listener in <App />.
// Lead conversions go through lib/tracking.ts.
const triggerConversionEvents = (leadData: { serviceOrMaterial: string }) =>
  trackLead('service-page', leadData.serviceOrMaterial);

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
          target={url.startsWith('tel:') ? undefined : "_blank"}
          rel={url.startsWith('tel:') ? undefined : "noopener noreferrer"}
          className="font-semibold text-[#a8661f] underline decoration-[#a8661f]/30 underline-offset-4 hover:decoration-[#a8661f]"
        >
          {anchorText}
        </a>
      );
    } else {
      parts.push(
        <Link 
          key={matchIndex} 
          to={url} 
          className="font-semibold text-[#a8661f] underline decoration-[#a8661f]/30 underline-offset-4 hover:decoration-[#a8661f]"
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

  const shortName = data.name.replace(/\s+GA$/, '');
  const inputCls =
    'w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5 text-[15px] font-medium text-brand-dark placeholder-slate-400 outline-none transition-all focus:border-brand-gold focus:bg-white focus:ring-2 focus:ring-brand-gold/30';
  const labelCls = 'mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600';

  return (
    <div className="bg-white overflow-hidden selection:bg-brand-gold selection:text-white">
      {/* 1. HERO: offer on the left, estimate form on the right (stacked on phones) */}
      <section className="relative w-full overflow-hidden bg-brand-dark pb-12 pt-28 sm:pb-16 sm:pt-32 lg:min-h-[100svh] lg:pt-40 lg:pb-24 lg:flex lg:items-center">
        <motion.div style={{ y: yHero }} className="pointer-events-none absolute inset-0 z-0 origin-top">
          <Img src={data.heroImage} alt={data.name} loading="eager" fetchPriority="high" className="h-full w-full scale-105 object-cover" />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/70 to-brand-dark/95 lg:bg-gradient-to-r lg:from-brand-dark/95 lg:via-brand-dark/75 lg:to-brand-dark/30" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="text-center lg:col-span-7 lg:text-left">
              <motion.div variants={fadeUp} className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-brand-dark/60 px-3.5 py-1.5">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" /></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white sm:text-xs">Free on-site estimates · Metro Atlanta</span>
              </motion.div>

              {data.heroSubtitle && (
                <motion.p variants={fadeUp} className="eyebrow mb-3 text-brand-gold">{data.heroSubtitle}</motion.p>
              )}

              <motion.h1 variants={fadeUp} className="mb-5 font-display text-[2.6rem] font-bold uppercase leading-[0.95] tracking-[-0.01em] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.35)] sm:text-6xl lg:text-[clamp(2.9rem,min(4.8vw,8.5vh),5rem)]">
                {data.name}
              </motion.h1>

              <motion.p variants={fadeUp} className="mx-auto mb-6 max-w-xl text-base font-medium leading-relaxed text-white/85 md:text-lg lg:mx-0">
                Planned, prepped and installed by AGS, a licensed paver contractor based in Duluth. Get a clear written quote before any work starts.
              </motion.p>

              <motion.ul variants={fadeUp} className="mx-auto mb-7 max-w-md space-y-2.5 text-left lg:mx-0">
                {['Licensed & insured in Georgia', 'In-house crews, no subcontractors', 'Free on-site estimate and written quote'].map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[15px] font-semibold text-white md:text-base">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-dark"><Check size={14} strokeWidth={3} /></span>
                    {p}
                  </li>
                ))}
              </motion.ul>

              <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href={BUSINESS.phoneHref}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-md bg-brand-gold px-7 py-4 font-display text-lg font-bold uppercase tracking-wide text-brand-dark shadow-lg transition-all hover:-translate-y-0.5 hover:bg-white active:scale-95 sm:w-auto"
                >
                  <Phone size={19} /> Call {BUSINESS.phoneDisplay}
                </a>
                <span className="text-sm font-medium text-white/70">{BUSINESS.hours.display}</span>
              </motion.div>
            </motion.div>

            {/* Estimate form */}
            <motion.div
              id="hero-service-form"
              data-lead-form
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto w-full max-w-lg scroll-mt-28 lg:col-span-5 lg:mr-0"
            >
              <div className="relative overflow-hidden rounded-xl border-t-4 border-brand-gold bg-white p-5 text-brand-dark shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)] sm:p-7 md:p-8">
                {formStatus === 'SUCCESS' ? (
                  <div className="animate-fadeIn py-10 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-100 text-emerald-600 shadow-lg">
                      <Check size={32} className="stroke-[3]" />
                    </div>
                    <h3 className="mb-2 font-display text-3xl font-bold uppercase text-brand-dark">Request received!</h3>
                    <p className="mb-6 text-sm leading-relaxed text-slate-600 sm:text-base">
                      Thank you. We will call or text you to set up your free estimate.
                    </p>
                    <div className="mb-6 space-y-1 rounded-lg border border-slate-200 bg-slate-50 p-4 text-left text-xs sm:text-sm">
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
                      className="text-xs font-bold uppercase tracking-wider text-[#a8661f] hover:underline"
                    >
                      Submit another project request
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <h2 className="font-display text-[1.75rem] font-bold uppercase leading-none tracking-tight text-brand-dark sm:text-3xl">
                        Get your free estimate
                      </h2>
                      <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-200">
                        No obligation
                      </span>
                    </div>
                    <p className="mb-5 text-sm font-medium leading-relaxed text-slate-600">
                      Tell us about the property. We will reach out to schedule a visit.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      <div>
                        <label htmlFor="svc-name" className={labelCls}>Full name <span className="text-red-500">*</span></label>
                        <input id="svc-name" type="text" required autoComplete="name" placeholder="John Smith" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className={inputCls} />
                      </div>

                      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="svc-phone" className={labelCls}>Phone <span className="text-red-500">*</span></label>
                          <input id="svc-phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="(678) 000-0000" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })} className={inputCls} />
                        </div>
                        <div>
                          <label htmlFor="svc-zip" className={labelCls}>ZIP or city <span className="text-red-500">*</span></label>
                          <input id="svc-zip" type="text" required autoComplete="postal-code" placeholder="30097 or Duluth" value={formData.zipOrCity} onChange={(e) => setFormData({ ...formData, zipOrCity: e.target.value })} className={inputCls} />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="svc-service" className={labelCls}>Service needed <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select id="svc-service" required value={formData.serviceOrMaterial} onChange={(e) => setFormData({ ...formData, serviceOrMaterial: e.target.value })} className={`${inputCls} cursor-pointer appearance-none pr-10`}>
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
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="svc-notes" className={labelCls}>Project details <span className="font-normal normal-case text-slate-400">(optional)</span></label>
                        <textarea id="svc-notes" rows={2} placeholder="Approximate size, timeline or ideas..." value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className={`${inputCls} resize-none py-3`} />
                      </div>

                      <button
                        type="submit"
                        disabled={formStatus === 'LOADING'}
                        className="group mt-1 flex w-full items-center justify-center gap-2 rounded-md bg-brand-gold px-6 py-4 font-display text-lg font-bold uppercase tracking-wide text-brand-dark shadow-lg transition-all hover:-translate-y-0.5 hover:bg-brand-goldHover active:scale-95 disabled:cursor-not-allowed disabled:opacity-75"
                      >
                        {formStatus === 'LOADING' ? (
                          <><Loader2 className="animate-spin" size={18} /> Sending...</>
                        ) : (
                          <>Request free estimate <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></>
                        )}
                      </button>

                      <p className="flex items-center justify-center gap-1.5 pt-1 text-center text-xs text-slate-500">
                        <ShieldCheck size={15} className="shrink-0 text-emerald-600" /> We never sell or share your info.
                      </p>

                      {formStatus === 'ERROR' && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
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

      {/* 2. TRUST BAR */}
      <section className="border-b border-slate-200 bg-white">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: 'Licensed & insured', text: 'Georgia hardscape contractor' },
            { icon: HardHat, title: 'In-house crews', text: 'No subcontractors' },
            { icon: ClipboardCheck, title: 'Free written estimate', text: 'On-site, no obligation' },
            { icon: MapPin, title: 'Based in Duluth', text: 'Serving North Metro Atlanta' },
          ].map(({ icon: Icon, title, text }, i) => (
            <li key={title} className={`flex items-center gap-3 px-4 py-5 sm:px-6 md:py-6 ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''} ${i === 1 ? 'lg:border-r' : ''} border-slate-200`}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-dark text-brand-gold"><Icon size={20} /></span>
              <span className="min-w-0 leading-tight">
                <span className="block font-display text-base font-bold uppercase text-brand-dark sm:text-lg">{title}</span>
                <span className="block text-xs text-slate-500 sm:text-sm">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. OVERVIEW with a sticky estimate card on desktop */}
      <section className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <p className="eyebrow mb-4 flex items-center gap-3 text-[#a8661f]"><span className="block h-0.5 w-10 bg-[#a8661f]" /> Service overview</p>
            <h2 className="mb-8 font-display text-4xl font-bold uppercase leading-[0.95] text-brand-dark md:text-5xl lg:text-6xl">
              {data.overviewHeading}
            </h2>
            <div className="space-y-5 text-lg leading-relaxed text-slate-600">
              {data.overviewParagraphs.map((p, idx) => (
                <p key={idx}>{renderParagraphWithLinks(p)}</p>
              ))}
            </div>
          </motion.div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl bg-brand-dark p-6 text-white shadow-xl md:p-7">
              <p className="eyebrow mb-2 text-brand-gold">Free estimate</p>
              <h3 className="font-display text-3xl font-bold uppercase leading-none">Price out your project</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">We measure, review the site and give you a written quote. No pressure.</p>
              <button type="button" onClick={scrollToForm} className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-brand-gold py-3.5 font-display text-lg font-bold uppercase tracking-wide text-brand-dark transition-colors hover:bg-white">
                Get my estimate <ArrowRight size={18} />
              </button>
              <a href={BUSINESS.phoneHref} className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-white/25 py-3.5 font-display text-lg font-bold uppercase tracking-wide text-white transition-colors hover:border-brand-gold hover:text-brand-gold">
                <Phone size={17} /> {BUSINESS.phoneDisplay}
              </a>
              <p className="mt-4 text-center text-xs text-white/50">{BUSINESS.hours.display}</p>
            </div>
          </aside>
        </div>
      </section>

      {fieldworkSection}

      {/* 4. Message break */}
      <section className="relative flex min-h-[280px] w-full items-center justify-center overflow-hidden bg-brand-dark px-5 py-20 md:min-h-[360px]">
        <Img src={data.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover brightness-[0.4]" loading="lazy" decoding="async" />
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease: 'easeOut' }} className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="eyebrow mb-4 text-brand-gold">Built for your property</p>
          <h3 className="font-display text-3xl font-bold uppercase leading-[1.02] text-white md:text-5xl">{data.parallaxQuote}</h3>
        </motion.div>
      </section>

      {/* 5. PROCESS */}
      <section id="process" className="relative overflow-hidden bg-[#f5f2ec] px-5 py-20 sm:px-8 md:py-28">
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 max-w-2xl md:mb-16">
            <p className="eyebrow mb-4 text-[#a8661f]">How it works</p>
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] text-brand-dark md:text-6xl">From free estimate to finished job</h2>
            <p className="mt-4 text-lg text-slate-600">We review the site, define the scope and go over materials with you before installation begins.</p>
          </motion.div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.process.map((step, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-[0_20px_40px_-30px_rgba(15,17,21,0.4)] md:p-7"
              >
                <span aria-hidden="true" className="font-display text-6xl font-bold leading-none text-brand-gold">{String(idx + 1).padStart(2, '0')}</span>
                <h4 className="mt-4 font-display text-2xl font-bold uppercase leading-tight text-brand-dark">{step.title}</h4>
                <p className="mt-2 leading-relaxed text-slate-600">{step.description}</p>
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand-gold transition-transform duration-500 group-hover:scale-x-100" />
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {extraSections}

      <CtaBand
        title="Get a free estimate for your project"
        text={`Tell us where the property is and what you want to build. We will come out, measure and put a clear quote for your ${shortName.toLowerCase()} project in writing.`}
        image={data.heroImage}
      />
    </div>
  );
};
