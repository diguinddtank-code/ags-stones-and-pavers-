import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Armchair,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Flame,
  HardHat,
  Layers,
  LayoutGrid,
  Loader2,
  Lock,
  MapPin,
  Phone,
  Ruler,
  ShieldCheck,
  Hammer,
  Waves,
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Img } from '../components/ui/Img';
import { BUSINESS } from '../lib/business';
import { trackLead } from '../lib/tracking';
import { cities } from '../lib/cities';
import { useReveal } from '../lib/useReveal';

// `id` is what gets sent to Web3Forms ("Selected Service: <id>") — keep these values as they are.
const servicesOptions = [
  { id: 'driveway', label: 'Driveway Pavers', icon: LayoutGrid },
  { id: 'patio', label: 'Outdoor Patio', icon: Armchair },
  { id: 'retaining', label: 'Retaining Wall', icon: Layers },
  { id: 'pool', label: 'Pool Deck', icon: Waves },
  { id: 'fire', label: 'Fire Features', icon: Flame },
  { id: 'other', label: 'Other/Custom', icon: Hammer },
];

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-[15px] font-medium text-brand-dark placeholder-slate-400 outline-none transition-all focus:border-brand-gold focus:bg-white focus:ring-2 focus:ring-brand-gold/30';
const labelClass = 'mb-1.5 block text-[13px] font-bold text-slate-700';

const PROMISES = ['We come out and measure', 'Written estimate', 'No obligation'];

const NEXT_STEPS = [
  {
    icon: Phone,
    title: 'We call you back',
    text: 'A quick conversation about what you want to build and a time that works for the site visit.',
  },
  {
    icon: Ruler,
    title: 'We visit and measure',
    text: 'We walk the property with you, take measurements and look at grade, access and drainage.',
  },
  {
    icon: ClipboardCheck,
    title: 'You get a written estimate',
    text: 'A clear scope and price in writing. Free, and no obligation to move forward.',
  },
];

const TRUST = [
  { icon: ShieldCheck, title: 'Licensed & insured', text: 'Georgia hardscape contractor' },
  { icon: HardHat, title: 'In-house crews', text: 'No subcontractors on your project' },
  { icon: MapPin, title: `Based in ${BUSINESS.address.city}, GA`, text: `${BUSINESS.address.street}` },
  { icon: Clock, title: 'Office hours', text: BUSINESS.hours.display },
];

export const QuotePage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const asideRef = useRef<HTMLElement>(null);
  useReveal(asideRef);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Extract form data
    const formData = new FormData(e.currentTarget);
    const data = {
        access_key: "faed6a10-57e8-4faa-b1ec-74c37345ea30",
        name: formData.get('fullName'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        subject: `New Quote Request: ${formData.get('fullName')}`,
        message: `Zip Code: ${formData.get('zip')}\nSelected Service: ${selectedService || 'Unspecified'}\n\nProject Details:\n${formData.get('details')}`
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const resData = await response.json().catch(() => ({}));

      if (response.ok && (resData.success === "true" || resData.success === true)) {
        setIsSuccess(true);
        trackLead('quote-page', selectedService || undefined);
      } else {
        console.error("Form delivery issue:", resData);
        setErrorMessage(resData.message || `There was a problem submitting the form. Please try again or call us at ${BUSINESS.phoneDisplay}.`);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f2ec] font-sans text-brand-dark">
      <SEO
        title="Free Paver & Hardscape Estimate | AGS Stones and Pavers"
        description="Request a free on-site estimate for driveway pavers, patios, retaining walls or pool decks in Metro Atlanta. We measure and put your quote in writing."
        breadcrumbs={[{ name: "Free Estimate", path: "/quote" }]}
        schema={[{ "@type": "ContactPage", "@id": "https://www.agsstonesandpavers.com/quote#contact", url: "https://www.agsstonesandpavers.com/quote", name: "Request a Free Estimate", about: { "@id": "https://www.agsstonesandpavers.com/#business" } }]}
      />
      <Header forceSolid={true} />

      <main className="flex-grow">
        {/* Intro band: headline, promise and a big tap-to-call */}
        <section className="relative overflow-hidden bg-brand-dark pb-20 pt-24 text-white md:pb-28 md:pt-32 lg:pt-40">
          <div className="absolute inset-0" aria-hidden="true">
            <Img
              src="/images/service-hero-patio.webp"
              alt=""
              sizes="100vw"
              loading="eager"
              fetchPriority="high"
              className="hero-photo h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/85 via-brand-dark/80 to-brand-dark/95 md:bg-gradient-to-r md:from-brand-dark/95 md:via-brand-dark/85 md:to-brand-dark/50" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
              <div>
                <p style={{ '--d': '0.05s' } as React.CSSProperties} className="hero-in eyebrow mb-3 flex items-center gap-3 text-brand-gold md:mb-4">
                  <span className="block h-0.5 w-8 bg-brand-gold" aria-hidden="true" /> Free estimates · Metro Atlanta
                </p>
                <h1 style={{ '--d': '0.12s' } as React.CSSProperties} className="hero-in font-display text-[2.5rem] font-bold uppercase leading-[0.95] tracking-[-0.01em] sm:text-6xl lg:text-7xl">
                  Get a <span className="text-brand-gold">free</span> paver &amp; hardscape estimate
                </h1>
                <p style={{ '--d': '0.22s' } as React.CSSProperties} className="hero-in mt-4 max-w-2xl text-base font-medium leading-relaxed text-white/85 md:mt-5 md:text-xl">
                  Tell us what you want to build. We come out, measure and give you a written quote. No cost, no obligation.
                </p>
                <ul style={{ '--d': '0.3s' } as React.CSSProperties} className="hero-in mt-5 hidden flex-wrap gap-x-6 gap-y-2 sm:flex">
                  {PROMISES.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-[15px] font-semibold text-white">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-dark">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ '--d': '0.3s' } as React.CSSProperties} className="hero-in">
                <a
                  href={BUSINESS.phoneHref}
                  className="group flex w-full items-center gap-4 rounded-xl border-2 border-brand-gold bg-brand-dark/60 p-3 pr-5 transition-colors hover:bg-brand-gold hover:text-brand-dark md:p-4"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-gold text-brand-dark md:h-14 md:w-14">
                    <Phone size={22} />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-white/70 group-hover:text-brand-dark/70">
                      Rather talk? Tap to call
                    </span>
                    <span className="block font-display text-[1.75rem] font-bold md:text-3xl">{BUSINESS.phoneDisplay}</span>
                  </span>
                  <ArrowRight size={20} className="ml-auto hidden shrink-0 text-brand-gold transition-transform min-[400px]:block group-hover:translate-x-1 group-hover:text-brand-dark" />
                </a>
                <p className="mt-2.5 flex items-center justify-center gap-2 text-xs font-medium text-white/65 lg:justify-start">
                  <Clock size={13} className="text-brand-gold" /> {BUSINESS.hours.display}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form + what happens next */}
        <section className="relative pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
              <div
                id="estimate-form"
                data-lead-form
                style={{ '--d': '0.35s' } as React.CSSProperties}
                className="hero-in hero-in--card relative z-10 -mt-12 rounded-xl border-t-4 border-brand-gold bg-white p-5 shadow-[0_30px_70px_-25px_rgba(15,17,21,0.55)] sm:p-8 md:-mt-16 lg:p-10"
              >
                {isSuccess ? (
                  <div className="py-10 text-center animate-fade-up md:py-16" role="status">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle2 className="h-9 w-9 text-green-600" />
                    </div>
                    <h2 className="mb-3 font-display text-4xl font-bold uppercase leading-[0.95] text-brand-dark">Request received</h2>
                    <p className="mx-auto mb-8 max-w-md text-lg leading-relaxed text-slate-600">
                      Thank you. We will get in touch to talk through your project and schedule your free on-site estimate.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                      <a
                        href={BUSINESS.phoneHref}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-brand-gold px-7 py-4 font-display text-lg font-bold uppercase tracking-wide text-brand-dark transition-colors hover:bg-brand-goldHover"
                      >
                        <Phone size={18} /> Call {BUSINESS.phoneDisplay}
                      </a>
                      <button
                        type="button"
                        onClick={() => setIsSuccess(false)}
                        className="inline-flex min-h-[44px] items-center justify-center rounded-md border-2 border-[#1c2024] px-7 py-3.5 font-display text-lg font-bold uppercase tracking-wide text-[#1c2024] transition-colors hover:bg-[#1c2024] hover:text-white"
                      >
                        Submit another request
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                      <span className="eyebrow text-[#a8661f]">Estimate request</span>
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                        <Clock size={13} /> Takes about a minute
                      </span>
                    </div>
                    <h2 className="mb-6 font-display text-3xl font-bold uppercase leading-[0.95] text-[#1c2024] md:text-4xl">
                      Tell us about your project
                    </h2>

                    {/* 1. Project type */}
                    <fieldset className="mb-7">
                      <legend className="mb-3 flex items-center gap-2.5 font-display text-lg font-bold uppercase tracking-wide text-[#1c2024]">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1c2024] text-sm text-brand-gold">1</span>
                        What are you planning?
                      </legend>
                      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                        {servicesOptions.map(({ id, label, icon: Icon }) => {
                          const active = selectedService === id;
                          return (
                            <button
                              key={id}
                              type="button"
                              aria-pressed={active}
                              onClick={() => setSelectedService(active ? null : id)}
                              className={`flex min-h-[52px] items-center gap-2.5 rounded-lg border-2 px-3 py-2.5 text-left text-[14px] font-semibold leading-tight transition-all sm:text-[15px] ${
                                active
                                  ? 'border-brand-gold bg-amber-50 text-brand-dark shadow-sm'
                                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-brand-gold/60 hover:bg-white'
                              }`}
                            >
                              <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors ${
                                  active ? 'bg-brand-gold text-brand-dark' : 'bg-[#1c2024] text-brand-gold'
                                }`}
                              >
                                {active ? <Check size={16} strokeWidth={3} /> : <Icon size={16} />}
                              </span>
                              <span className="min-w-0">{label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>

                    {/* 2. Contact details */}
                    <fieldset className="mb-7">
                      <legend className="mb-3 flex items-center gap-2.5 font-display text-lg font-bold uppercase tracking-wide text-[#1c2024]">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1c2024] text-sm text-brand-gold">2</span>
                        How do we reach you?
                      </legend>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="q-name" className={labelClass}>Full name</label>
                          <input id="q-name" type="text" name="fullName" required autoComplete="name" placeholder="Jane Smith" className={inputClass} />
                        </div>
                        <div>
                          <label htmlFor="q-phone" className={labelClass}>Phone</label>
                          <input id="q-phone" type="tel" name="phone" required autoComplete="tel" inputMode="tel" placeholder="(555) 555-5555" className={inputClass} />
                        </div>
                        <div>
                          <label htmlFor="q-email" className={labelClass}>Email</label>
                          <input id="q-email" type="email" name="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} />
                        </div>
                        <div>
                          <label htmlFor="q-zip" className={labelClass}>Project zip code</label>
                          <input id="q-zip" type="text" name="zip" required autoComplete="postal-code" inputMode="numeric" placeholder="30097" className={inputClass} />
                        </div>
                      </div>
                    </fieldset>

                    {/* 3. Details */}
                    <fieldset className="mb-6">
                      <legend className="mb-3 flex items-center gap-2.5 font-display text-lg font-bold uppercase tracking-wide text-[#1c2024]">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1c2024] text-sm text-brand-gold">3</span>
                        Project details
                      </legend>
                      <label htmlFor="q-details" className="sr-only">Project details</label>
                      <textarea
                        id="q-details"
                        rows={4}
                        name="details"
                        required
                        placeholder="Rough size, materials you like, anything we should know (slope, drainage, timing)..."
                        className={`${inputClass} resize-y`}
                      ></textarea>
                    </fieldset>

                    {errorMessage && (
                      <div className="mb-5 flex flex-col gap-1 rounded-lg border border-red-200 bg-red-50 p-4 text-[14px] text-red-800" role="alert">
                        <span className="block font-bold text-red-900">Error Submitting</span>
                        <p className="leading-relaxed opacity-95">{errorMessage}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex w-full items-center justify-center gap-2 rounded-md bg-brand-gold px-7 py-4 font-display text-xl font-bold uppercase tracking-wide text-brand-dark shadow-lg shadow-brand-gold/20 transition-all hover:bg-brand-goldHover disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          Get my free estimate <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-xs text-slate-500">
                      <Lock size={12} className="text-slate-400" /> No obligation. We never sell your information.
                      <Link to="/privacy-policy" className="font-semibold text-slate-600 underline underline-offset-2 hover:text-[#a8661f]">
                        Privacy policy
                      </Link>
                    </p>
                  </form>
                )}
              </div>

              {/* What happens next, trust and coverage */}
              <aside ref={asideRef} className="space-y-6 lg:sticky lg:top-28 lg:-mt-16" aria-label="About your estimate">
                <div data-reveal className="rounded-xl bg-white p-6 shadow-[0_20px_40px_-30px_rgba(15,17,21,0.35)] md:p-7">
                  <p className="eyebrow mb-2 text-[#a8661f]">What happens next</p>
                  <h2 className="mb-5 font-display text-2xl font-bold uppercase leading-[0.95] text-[#1c2024] md:text-3xl">
                    Three simple steps
                  </h2>
                  <ol className="space-y-5">
                    {NEXT_STEPS.map(({ icon: Icon, title, text }, i) => (
                      <li key={title} className="relative flex gap-4">
                        {i < NEXT_STEPS.length - 1 && (
                          <span className="absolute left-5 top-11 h-[calc(100%-1.75rem)] w-px bg-slate-200" aria-hidden="true" />
                        )}
                        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1c2024] text-brand-gold">
                          <Icon size={18} />
                        </span>
                        <div>
                          <h3 className="font-display text-lg font-bold uppercase leading-tight text-[#1c2024]">
                            <span className="text-[#a8661f]">0{i + 1}.</span> {title}
                          </h3>
                          <p className="mt-1 text-[15px] leading-relaxed text-slate-600">{text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div data-reveal className="rounded-xl bg-[#1c2024] p-6 text-white md:p-7">
                  <p className="eyebrow mb-4 text-brand-gold">Who you are hiring</p>
                  <ul className="space-y-4">
                    {TRUST.map(({ icon: Icon, title, text }) => (
                      <li key={title} className="flex items-start gap-3.5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-gold">
                          <Icon size={17} />
                        </span>
                        <span className="leading-tight">
                          <span className="block font-display text-lg font-bold uppercase">{title}</span>
                          <span className="block text-sm text-white/65">{text}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div data-reveal className="rounded-xl border border-black/5 bg-white p-6 md:p-7">
                  <p className="eyebrow mb-2 text-[#a8661f]">Service areas</p>
                  <h2 className="mb-4 font-display text-2xl font-bold uppercase leading-[0.95] text-[#1c2024]">
                    {cities.length} Metro Atlanta cities
                  </h2>
                  <ul className="flex flex-wrap gap-2">
                    {cities.map((c) => (
                      <li key={c.id} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[13px] font-semibold text-slate-700">
                        {c.name}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/service-areas"
                    className="mt-5 inline-flex min-h-[44px] items-center gap-2 font-display text-base font-bold uppercase tracking-wide text-[#1c2024] transition-colors hover:text-[#a8661f]"
                  >
                    See all service areas <ArrowRight size={16} className="text-[#a8661f]" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
