import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Clock, HardHat, MapPin, Phone, ShieldCheck, ClipboardCheck, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { CtaBand } from '../components/CtaBand';
import { Img } from '../components/ui/Img';
import { BUSINESS } from '../lib/business';
import { cities } from '../lib/cities';
import { useReveal } from '../lib/useReveal';

const fieldScenes = [
  {
    image: '/images/fieldwork-excavation-truck.jpg',
    alt: 'Illustrative driveway excavation with a mini excavator, service truck and paver materials',
    label: 'Prepare the site',
    detail: 'Old material comes out. We check access and read the grade before any new work starts.',
  },
  {
    image: '/images/fieldwork-base-compaction.jpg',
    alt: 'Illustrative paver crew compacting aggregate and checking the patio grade',
    label: 'Build the base',
    detail: 'The base is shaped, compacted and pitched for water, so the surface stays flat on Georgia clay.',
  },
  {
    image: '/images/fieldwork-paver-setting.jpg',
    alt: 'Illustrative close view of an installer setting pavers by hand',
    label: 'Set each paver',
    detail: 'Pattern, borders, cuts and transitions are fitted to the space and the surfaces around it.',
  },
];

const HERO_POINTS = [
  'Licensed & insured in Georgia',
  'In-house crews, no subcontractors',
  'Free on-site estimate with a written quote',
];

const TRUST = [
  { icon: ShieldCheck, title: 'Licensed & insured', text: 'Covered for the work on your property.' },
  { icon: HardHat, title: 'In-house crews', text: 'Our own installers. No subcontractors.' },
  { icon: ClipboardCheck, title: 'Free on-site estimate', text: 'Measured on site, quoted in writing.' },
  { icon: Clock, title: 'Open Mon–Fri', text: BUSINESS.hours.display.replace(/^Mon–Fri:\s*/, '') },
];

const SERVICE_LINKS = [
  { to: '/service/driveway-pavers', label: 'Driveway pavers' },
  { to: '/service/outdoor-patio-builders', label: 'Paver & stone patios' },
  { to: '/service/retaining-wall-installation', label: 'Retaining walls' },
  { to: '/service/pool-deck-pavers', label: 'Pool deck pavers' },
  { to: '/service/masonry-fireplaces', label: 'Outdoor kitchens & fireplaces' },
  { to: '/service/stone-veneer', label: 'Stone veneer' },
  { to: '/service/deck-builders', label: 'Decks' },
  { to: '/service/landscape-design', label: 'Landscape design' },
];

const linkClass = 'font-semibold text-[#1c2024] underline decoration-[#a8661f]/50 underline-offset-4 transition-colors hover:text-[#a8661f]';

export const AboutUsPage: React.FC = () => {
  const mainRef = useRef<HTMLElement>(null);
  useReveal(mainRef);

  const [activeScene, setActiveScene] = useState(0);
  const [isScenePaused, setIsScenePaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || isScenePaused) return;

    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setActiveScene((current) => (current + 1) % fieldScenes.length);
      }
    }, 5500);

    return () => window.clearInterval(timer);
  }, [activeScene, isScenePaused, reduceMotion]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { street, city, region, postalCode } = BUSINESS.address;

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-brand-dark antialiased">
      <SEO
        title="About AGS Stones and Pavers | Paver Contractor in Duluth, GA"
        description="Licensed & insured paver and patio contractor based in Duluth, GA. In-house crews, free on-site estimates and written quotes across Metro Atlanta."
        breadcrumbs={[{ name: 'About Us', path: '/about-us' }]}
        schema={[{ '@type': 'AboutPage', '@id': 'https://www.agsstonesandpavers.com/about-us#about', url: 'https://www.agsstonesandpavers.com/about-us', name: 'About AGS Stones and Pavers', about: { '@id': 'https://www.agsstonesandpavers.com/#business' } }]}
      />

      <Header />

      <main ref={mainRef} className="flex-grow">
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-brand-dark pb-14 pt-32 text-white sm:pt-36 md:pb-20 lg:pb-24 lg:pt-44">
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <Img
              src="/images/fieldwork-retaining-wall.jpg"
              alt=""
              sizes="100vw"
              loading="eager"
              fetchPriority="high"
              className="hero-photo h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/70 to-brand-dark/95 md:bg-gradient-to-r md:from-brand-dark/95 md:via-brand-dark/80 md:to-brand-dark/30" />
          </div>

          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="max-w-3xl">
              <p style={{ '--d': '0.05s' } as React.CSSProperties} className="hero-in eyebrow mb-5 flex items-center gap-2 text-brand-gold">
                <MapPin size={15} aria-hidden="true" /> About AGS · {city}, {region}
              </p>
              <h1 style={{ '--d': '0.15s' } as React.CSSProperties} className="hero-in font-display text-4xl font-bold uppercase leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
                Paver &amp; patio contractor <span className="text-brand-gold">based in {city}, GA</span>
              </h1>
              <p style={{ '--d': '0.3s' } as React.CSSProperties} className="hero-in mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
                AGS Stones and Pavers installs paver driveways, patios, retaining walls and outdoor living spaces across Metro Atlanta. We quote it, plan it and build it with our own crews.
              </p>

              <ul style={{ '--d': '0.4s' } as React.CSSProperties} className="hero-in mt-6 grid gap-2.5 sm:grid-cols-2 md:grid-cols-1">
                {HERO_POINTS.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[15px] font-semibold md:text-base">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-dark">
                      <Check size={14} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <div style={{ '--d': '0.5s' } as React.CSSProperties} className="hero-in mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/quote"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-gold px-7 py-4 font-display text-lg font-bold uppercase tracking-wide text-brand-dark transition-colors hover:bg-brand-goldHover sm:w-auto"
                >
                  Get my free estimate <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <a
                  href={BUSINESS.phoneHref}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md border-2 border-white/40 px-7 py-4 font-display text-lg font-bold uppercase tracking-wide text-white transition-colors hover:border-brand-gold hover:text-brand-gold sm:w-auto"
                >
                  <Phone size={18} aria-hidden="true" /> Call {BUSINESS.phoneDisplay}
                </a>
              </div>
              <p style={{ '--d': '0.6s' } as React.CSSProperties} className="hero-in mt-4 flex items-center gap-2 text-sm font-medium text-white/65">
                <Clock size={15} className="text-brand-gold" aria-hidden="true" /> {BUSINESS.hours.display}
              </p>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section aria-label="Why homeowners hire AGS" className="border-b border-black/5 bg-[#f5f2ec]">
          <ul data-reveal-stagger className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-black/5 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-start gap-4 bg-[#f5f2ec] px-5 py-6 sm:px-8">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1c2024] text-brand-gold">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-xl font-bold uppercase leading-tight text-[#1c2024]">{title}</span>
                  <span className="mt-0.5 block text-sm leading-snug text-slate-600">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Who we are */}
        <section className="px-5 py-16 sm:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div className="min-w-0">
              <p data-reveal className="eyebrow mb-4 flex items-center gap-3 text-[#a8661f]">
                <span className="block h-0.5 w-10 bg-[#a8661f]" aria-hidden="true" /> Who we are
              </p>
              <h2 data-split className="font-display text-4xl font-bold uppercase leading-[0.95] text-[#1c2024] sm:text-5xl lg:text-6xl">
                Local. Hands-on. Accountable for the work.
              </h2>
              <div data-reveal className="mt-6 space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                <p>
                  AGS Stones and Pavers is a licensed and insured hardscape contractor based in {city}, Georgia. We work with homeowners across North Metro Atlanta on{' '}
                  <Link className={linkClass} to="/service/driveway-pavers">paver driveways</Link>,{' '}
                  <Link className={linkClass} to="/service/outdoor-patio-builders">patio installation</Link> and{' '}
                  <Link className={linkClass} to="/service/retaining-wall-installation">retaining walls</Link>, plus pool decks, outdoor kitchens and stonework.
                </p>
                <p>
                  We do not hand your project to a subcontractor. The team that quotes your job is the team accountable for building it.
                </p>
                <p>
                  Every project starts the same way: a free visit to your property, real measurements and a written quote you can review before you decide.
                </p>
              </div>

              <dl data-reveal className="mt-8 grid gap-4 rounded-xl border border-black/5 bg-[#f5f2ec] p-5 text-sm sm:grid-cols-2 sm:p-6">
                <div className="min-w-0">
                  <dt className="eyebrow text-[#a8661f]">Office</dt>
                  <dd className="mt-1 font-semibold text-[#1c2024]">
                    <a href={BUSINESS.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#a8661f]">
                      {street}, {city}, {region} {postalCode}
                    </a>
                  </dd>
                </div>
                <div className="min-w-0">
                  <dt className="eyebrow text-[#a8661f]">Hours</dt>
                  <dd className="mt-1 font-semibold text-[#1c2024]">{BUSINESS.hours.display}</dd>
                </div>
                <div className="min-w-0">
                  <dt className="eyebrow text-[#a8661f]">Phone</dt>
                  <dd className="mt-1 font-semibold text-[#1c2024]">
                    <a href={BUSINESS.phoneHref} className="hover:text-[#a8661f]">{BUSINESS.phoneDisplay}</a>
                  </dd>
                </div>
                <div className="min-w-0">
                  <dt className="eyebrow text-[#a8661f]">Service area</dt>
                  <dd className="mt-1 font-semibold text-[#1c2024]">
                    <Link to="/service-areas" className="hover:text-[#a8661f]">{cities.length} cities in Metro Atlanta</Link>
                  </dd>
                </div>
              </dl>
            </div>

            <figure className="min-w-0">
              <div data-clip className="overflow-hidden rounded-xl bg-[#e5e1d8] shadow-[0_30px_60px_-35px_rgba(15,17,21,0.5)]">
                <Img
                  src="/images/fieldwork-paver-cutting.jpg"
                  alt="Illustrative installer trimming a paver to fit the edge of an outdoor patio"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </figure>
          </div>
        </section>

        {/* How we build */}
        <section className="bg-[#f5f2ec] px-5 py-16 sm:px-8 md:py-24" aria-labelledby="fieldwork-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[1fr_0.8fr] md:items-end md:gap-12">
              <div className="min-w-0">
                <p data-reveal className="eyebrow mb-4 text-[#a8661f]">How we build</p>
                <h2 id="fieldwork-heading" data-split className="font-display text-4xl font-bold uppercase leading-[0.95] text-[#1c2024] sm:text-5xl lg:text-6xl">
                  A paver job is won or lost under the surface.
                </h2>
              </div>
              <p data-reveal className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Pavers are only as good as the base under them. On Georgia red clay that means proper excavation, a compacted base and a plan for water.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12">
              <div className="min-w-0">
                <div className="relative overflow-hidden rounded-xl bg-[#dedbd4] shadow-[0_30px_60px_-35px_rgba(15,17,21,0.5)]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.figure
                      key={activeScene}
                      initial={reduceMotion ? false : { opacity: 0, scale: 1.015 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.99 }}
                      transition={{ duration: reduceMotion ? 0 : 0.38, ease: 'easeOut' }}
                    >
                      <Img
                        src={fieldScenes[activeScene].image}
                        alt={fieldScenes[activeScene].alt}
                        sizes="(min-width: 1024px) 60vw, 100vw"
                        className="aspect-[4/3] w-full object-cover sm:aspect-[16/10]"
                      />
                    </motion.figure>
                  </AnimatePresence>
                </div>
                <div className="mt-4 lg:hidden" aria-live="polite" aria-atomic="true">
                  <p className="font-display text-2xl font-bold uppercase leading-tight text-[#1c2024]">{fieldScenes[activeScene].label}</p>
                  <p className="mt-1 text-base leading-relaxed text-slate-600">{fieldScenes[activeScene].detail}</p>
                </div>
              </div>

              <div className="min-w-0">
                <div
                  className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-3"
                  onMouseEnter={() => setIsScenePaused(true)}
                  onMouseLeave={() => setIsScenePaused(false)}
                  onFocusCapture={() => setIsScenePaused(true)}
                  onBlurCapture={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsScenePaused(false);
                  }}
                >
                  {fieldScenes.map((scene, index) => {
                    const isActive = index === activeScene;
                    return (
                      <button
                        key={scene.label}
                        type="button"
                        onClick={() => setActiveScene(index)}
                        aria-pressed={isActive}
                        className={`relative min-h-[76px] overflow-hidden rounded-xl border px-3 py-3 text-left transition-colors sm:px-4 lg:px-6 lg:py-5 ${
                          isActive
                            ? 'border-[#1c2024] bg-[#1c2024] text-white'
                            : 'border-black/10 bg-white text-[#1c2024] hover:border-[#1c2024]/40'
                        }`}
                      >
                        <span className={`block font-display text-sm font-bold sm:text-base ${isActive ? 'text-brand-gold' : 'text-[#a8661f]'}`}>0{index + 1}</span>
                        <span className="block font-display text-base font-bold uppercase leading-tight sm:text-lg lg:text-2xl">{scene.label}</span>
                        <span className={`mt-1 hidden text-sm leading-relaxed lg:block ${isActive ? 'text-white/75' : 'text-slate-600'}`}>{scene.detail}</span>
                        {isActive && !reduceMotion && (
                          <motion.span
                            key={`progress-${activeScene}`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 5.5, ease: 'linear' }}
                            className="absolute inset-x-0 bottom-0 h-1 origin-left bg-brand-gold"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 hidden text-sm text-slate-500 lg:block">Field photos are illustrative. Select a stage to see what happens as a project takes shape.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Free estimate */}
        <section className="px-5 py-16 sm:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
              <p data-reveal className="eyebrow mb-4 text-[#a8661f]">Your free estimate</p>
              <h2 data-split className="font-display text-4xl font-bold uppercase leading-[0.95] text-[#1c2024] sm:text-5xl lg:text-6xl">
                What you get before you sign anything.
              </h2>
              <p data-reveal className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
                A good estimate should leave you with fewer questions, not more. Here is how ours works.
              </p>
              <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/quote"
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-brand-gold px-7 py-4 font-display text-lg font-bold uppercase tracking-wide text-brand-dark transition-colors hover:bg-brand-goldHover"
                >
                  Request an estimate <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <a
                  href={BUSINESS.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-[#1c2024] px-7 py-4 font-display text-lg font-bold uppercase tracking-wide text-[#1c2024] transition-colors hover:bg-[#1c2024] hover:text-white"
                >
                  <Phone size={18} aria-hidden="true" /> {BUSINESS.phoneDisplay}
                </a>
              </div>
            </div>

            <ol data-reveal-stagger className="grid min-w-0 gap-4">
              <li className="rounded-xl border border-black/5 bg-white p-6 shadow-[0_20px_40px_-30px_rgba(15,17,21,0.35)] md:p-7">
                <span className="font-display text-lg font-bold text-[#a8661f]">01</span>
                <h3 className="mt-1 font-display text-2xl font-bold uppercase text-[#1c2024] sm:text-3xl">We walk the site with you</h3>
                <p className="mt-2 leading-relaxed text-slate-600">Grade, drainage, access and nearby structures. We measure and talk through how you plan to use the space.</p>
              </li>
              <li className="rounded-xl border border-black/5 bg-white p-6 shadow-[0_20px_40px_-30px_rgba(15,17,21,0.35)] md:p-7">
                <span className="font-display text-lg font-bold text-[#a8661f]">02</span>
                <h3 className="mt-1 font-display text-2xl font-bold uppercase text-[#1c2024] sm:text-3xl">Materials and layout</h3>
                <p className="mt-2 leading-relaxed text-slate-600">
                  Compare colors, patterns, edging and upkeep for{' '}
                  <Link className={linkClass} to="/service/driveway-pavers">driveways</Link>,{' '}
                  <Link className={linkClass} to="/service/outdoor-patio-builders">patios</Link> and{' '}
                  <Link className={linkClass} to="/service/retaining-wall-installation">retaining walls</Link>.
                </p>
              </li>
              <li className="rounded-xl border border-black/5 bg-white p-6 shadow-[0_20px_40px_-30px_rgba(15,17,21,0.35)] md:p-7">
                <span className="font-display text-lg font-bold text-[#a8661f]">03</span>
                <h3 className="mt-1 font-display text-2xl font-bold uppercase text-[#1c2024] sm:text-3xl">A written quote</h3>
                <p className="mt-2 leading-relaxed text-slate-600">Scope, materials and price in writing. Take the time you need to review it. No obligation and no pressure.</p>
              </li>
              <li className="rounded-xl border border-black/5 bg-white p-6 shadow-[0_20px_40px_-30px_rgba(15,17,21,0.35)] md:p-7">
                <span className="font-display text-lg font-bold text-[#a8661f]">04</span>
                <h3 className="mt-1 font-display text-2xl font-bold uppercase text-[#1c2024] sm:text-3xl">Our crew builds it</h3>
                <p className="mt-2 leading-relaxed text-slate-600">If you go ahead, the work is done by AGS installers, not a subcontractor you never met.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* What we build + where */}
        <section className="bg-[#1c2024] px-5 py-16 text-white sm:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0">
              <p data-reveal className="eyebrow mb-4 flex items-center gap-2 text-brand-gold">
                <Layers size={15} aria-hidden="true" /> What we build
              </p>
              <h2 data-split className="font-display text-4xl font-bold uppercase leading-[0.95] sm:text-5xl">
                Hardscape services for Metro Atlanta homes
              </h2>
              <ul data-reveal-stagger className="mt-8 grid gap-2 sm:grid-cols-2">
                {SERVICE_LINKS.map((s) => (
                  <li key={s.to}>
                    <Link
                      to={s.to}
                      className="group flex min-h-[52px] items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 font-semibold transition-colors hover:border-brand-gold hover:text-brand-gold"
                    >
                      {s.label}
                      <ArrowRight size={16} className="shrink-0 text-brand-gold transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/services" className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-display text-lg font-bold uppercase tracking-wide text-brand-gold hover:text-white">
                All services <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>

            <div className="min-w-0">
              <p data-reveal className="eyebrow mb-4 flex items-center gap-2 text-brand-gold">
                <MapPin size={15} aria-hidden="true" /> Where we work
              </p>
              <h2 data-split className="font-display text-4xl font-bold uppercase leading-[0.95] sm:text-5xl">
                {cities.length} cities around our {city} base
              </h2>
              <p data-reveal className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
                If your home is in one of these cities, we can come out for a free on-site estimate.
              </p>
              <ul data-reveal-stagger className="mt-6 flex flex-wrap gap-2">
                {cities.map((c) => (
                  <li key={c.id} className="rounded-md border border-white/15 px-3 py-2 text-sm font-semibold text-white/85">
                    {c.name}
                  </li>
                ))}
              </ul>
              <Link to="/service-areas" className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-display text-lg font-bold uppercase tracking-wide text-brand-gold hover:text-white">
                See service areas <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <CtaBand
          title="Let's walk your property."
          text="Call or request a free estimate. We will measure, talk through options and put the quote in writing. No obligation."
          image="/images/service-hero-driveway.webp"
        />

        <Contact />
      </main>

      <Footer />
    </div>
  );
};
