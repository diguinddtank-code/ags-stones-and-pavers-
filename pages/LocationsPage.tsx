import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ClipboardCheck, Clock, HardHat, Layers, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { CtaBand } from '../components/CtaBand';
import { Img } from '../components/ui/Img';
import { localPageUrl } from '../lib/localPages';
import { cities } from '../lib/cities';
import { BUSINESS } from '../lib/business';
import { useReveal } from '../lib/useReveal';

/** One plain-language line per city: what homeowners there usually call us for. */
const CITY_COPY: Record<string, string> = {
  alpharetta: 'Paver driveways, patio installation and retaining walls for Alpharetta homes. If the lot slopes, we plan the wall, grade and drainage together.',
  'johns-creek': 'Patios, outdoor kitchens and pool decks for Johns Creek homes, right next door to our Duluth office.',
  'sandy-springs': 'Paver patios, driveways and retaining walls planned around the grade and access of your Sandy Springs lot.',
  buckhead: 'Paver driveways, stone patios and stone features for Buckhead homes, with layouts fitted to the property.',
  roswell: 'Driveway pavers, patios, retaining walls and stonework for Roswell homeowners.',
  atlanta: 'Patio installation, paver driveways and retaining walls for homes in and around the City of Atlanta.',
  cumming: 'Paver driveways, patios, retaining walls and outdoor features in Cumming and across Forsyth County.',
  duluth: 'Our home base. Paver patios, driveways and walls for Duluth homeowners, close to our office.',
  milton: 'Driveways, patios, retaining walls and outdoor living spaces for Milton homes.',
  suwanee: 'Patios, driveways, retaining walls and outdoor living features for Suwanee homes, next door to Duluth.',
  marietta: 'Paver patios, driveways and retaining walls for Marietta and Cobb County homeowners.',
  smyrna: 'Retaining walls, paver patios and masonry for Smyrna homes. Ask about walls for sloped backyards.',
};

const SERVICE_PREFIXES = [
  { prefix: 'driveway-pavers', label: 'Driveway pavers' },
  { prefix: 'stone-patios', label: 'Patios' },
  { prefix: 'retaining-walls', label: 'Retaining walls' },
  { prefix: 'outdoor-kitchens', label: 'Outdoor kitchens' },
];

/** Most-searched local projects (Search Console), each linked to its local page. */
const POPULAR = [
  { prefix: 'stone-patios', city: 'atlanta', label: 'Patio installation in Atlanta' },
  { prefix: 'driveway-pavers', city: 'atlanta', label: 'Driveway pavers in Atlanta' },
  { prefix: 'retaining-walls', city: 'smyrna', label: 'Retaining walls in Smyrna' },
  { prefix: 'retaining-walls', city: 'alpharetta', label: 'Retaining walls in Alpharetta' },
  { prefix: 'outdoor-kitchens', city: 'johns-creek', label: 'Outdoor kitchens in Johns Creek' },
  { prefix: 'stone-patios', city: 'duluth', label: 'Paver patios in Duluth' },
];

const HERO_POINTS = [
  'Licensed & insured',
  'In-house crews, no subcontractors',
  'Free on-site estimate, written quote',
];

const REASONS = [
  { icon: ClipboardCheck, title: 'We come to you', text: 'A free on-site estimate anywhere in our service area. We measure, look at grade and drainage, and put the quote in writing.' },
  { icon: HardHat, title: 'Same crew, every city', text: 'Our own installers do the work, whether you are in Duluth or Marietta. No subcontractors.' },
  { icon: Layers, title: 'Built for Georgia clay', text: 'Excavation, compacted base and drainage planned for local soil, so pavers stay flat and walls stay put.' },
  { icon: ShieldCheck, title: 'Licensed & insured', text: 'A Georgia hardscape contractor, covered for the work on your property.' },
];

export const LocationsPage: React.FC = () => {
  const mainRef = useRef<HTMLElement>(null);
  useReveal(mainRef);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { city: homeCity, region } = BUSINESS.address;

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-brand-dark antialiased">
      <SEO
        title="Paver & Patio Contractor Near Me | Metro Atlanta Service Areas"
        description="Duluth-based paver and patio contractor serving Alpharetta, Johns Creek, Roswell, Smyrna, Marietta, Atlanta and more. Free on-site estimates."
        breadcrumbs={[{ name: 'Service Areas', path: '/service-areas' }]}
      />

      <Header />

      <main ref={mainRef} className="flex-grow">
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-brand-dark pb-14 pt-32 text-white sm:pt-36 md:pb-20 lg:pb-24 lg:pt-44">
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <Img
              src="/images/service-hero-patio.webp"
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
                <MapPin size={15} aria-hidden="true" /> Service areas · North Metro Atlanta
              </p>
              <h1 style={{ '--d': '0.15s' } as React.CSSProperties} className="hero-in font-display text-4xl font-bold uppercase leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
                Paver &amp; patio contractor <span className="text-brand-gold">near you</span> in Metro Atlanta
              </h1>
              <p style={{ '--d': '0.3s' } as React.CSSProperties} className="hero-in mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
                Based in {homeCity}, {region}. Our own crews install paver driveways, patios, retaining walls and outdoor kitchens in {cities.length} cities across North Metro Atlanta. Find your city below.
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

        {/* Jump to a city */}
        <nav aria-label="Jump to your city" className="border-b border-black/5 bg-[#f5f2ec]">
          <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
            <p className="eyebrow mb-3 text-[#a8661f]">Find your city</p>
            <ul className="flex flex-wrap gap-2">
              {cities.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="inline-flex min-h-[44px] items-center rounded-md border border-[#1c2024]/15 bg-white px-4 text-sm font-semibold text-[#1c2024] transition-colors hover:border-[#1c2024] hover:bg-[#1c2024] hover:text-white"
                  >
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* City directory */}
        <section id="local-coverage" className="px-5 py-16 sm:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 grid gap-5 md:mb-14 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-12">
              <div className="min-w-0">
                <p data-reveal className="eyebrow mb-4 flex items-center gap-3 text-[#a8661f]">
                  <span className="block h-0.5 w-10 bg-[#a8661f]" aria-hidden="true" /> Cities we serve
                </p>
                <h2 data-split className="font-display text-4xl font-bold uppercase leading-[0.95] text-[#1c2024] sm:text-5xl lg:text-6xl">
                  Local pavers contractor in {cities.length} Atlanta-area cities
                </h2>
              </div>
              <p data-reveal className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Pick your city to see driveway, patio, retaining wall and outdoor kitchen work near you. Every estimate is free, on site and in writing.
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((c) => {
                const isHome = c.id === 'duluth';
                return (
                  <li
                    key={c.id}
                    id={c.id}
                    data-reveal
                    className={`flex scroll-mt-28 flex-col rounded-xl border p-6 shadow-[0_20px_40px_-30px_rgba(15,17,21,0.35)] md:p-7 ${
                      isHome ? 'border-[#1c2024] bg-[#1c2024] text-white' : 'border-black/5 bg-white text-[#1c2024]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-display text-3xl font-bold uppercase leading-none">{c.name}, GA</h3>
                        <p className={`mt-2 text-xs font-semibold uppercase tracking-[0.12em] ${isHome ? 'text-white/55' : 'text-slate-500'}`}>{c.county}</p>
                      </div>
                      {isHome ? (
                        <span className="shrink-0 rounded-md bg-brand-gold px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-dark">Home base</span>
                      ) : (
                        <MapPin size={20} className="mt-1 shrink-0 text-[#a8661f]" aria-hidden="true" />
                      )}
                    </div>
                    <p className={`mt-4 leading-relaxed ${isHome ? 'text-white/75' : 'text-slate-600'}`}>{CITY_COPY[c.id] ?? `Paver driveways, patios and retaining walls for ${c.name} homes.`}</p>

                    <ul className={`mt-5 grid grid-cols-1 border-t pt-2 min-[400px]:grid-cols-2 ${isHome ? 'border-white/10' : 'border-black/10'}`}>
                      {SERVICE_PREFIXES.map(({ prefix, label }) => (
                        <li key={prefix}>
                          <Link
                            to={localPageUrl(prefix, c.id)}
                            title={`${label} in ${c.name}, GA`}
                            className={`group flex min-h-[44px] items-center gap-1.5 text-sm font-semibold transition-colors ${
                              isHome ? 'text-white hover:text-brand-gold' : 'text-[#1c2024] hover:text-[#a8661f]'
                            }`}
                          >
                            {label}
                            <span className="sr-only"> in {c.name}</span>
                            <ArrowRight size={14} className={`shrink-0 transition-transform group-hover:translate-x-0.5 ${isHome ? 'text-brand-gold' : 'text-[#a8661f]'}`} aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>

            <div data-reveal className="mt-8 flex flex-col gap-4 rounded-xl border border-black/5 bg-[#f5f2ec] p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div className="min-w-0">
                <h3 className="font-display text-2xl font-bold uppercase text-[#1c2024] sm:text-3xl">Not sure we cover your street?</h3>
                <p className="mt-1 text-slate-600">Call and give us your address. We will tell you straight away.</p>
              </div>
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border-2 border-[#1c2024] px-7 py-4 font-display text-lg font-bold uppercase tracking-wide text-[#1c2024] transition-colors hover:bg-[#1c2024] hover:text-white"
              >
                <Phone size={18} aria-hidden="true" /> {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        {/* Popular local projects */}
        <section className="bg-[#1c2024] px-5 py-16 text-white sm:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <p data-reveal className="eyebrow mb-4 text-brand-gold">Popular near you</p>
              <h2 data-split className="font-display text-4xl font-bold uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
                What homeowners call us for most
              </h2>
            </div>
            <ul data-reveal-stagger className="grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {POPULAR.map((p) => (
                <li key={`${p.prefix}-${p.city}`} className="bg-[#1c2024]">
                  <Link
                    to={localPageUrl(p.prefix, p.city)}
                    className="group flex min-h-[72px] items-center justify-between gap-4 p-5 transition-colors hover:bg-[#23282d] md:p-6"
                  >
                    <span className="font-display text-xl font-bold uppercase leading-tight sm:text-2xl">{p.label}</span>
                    <ArrowRight size={18} className="shrink-0 text-brand-gold transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why a local contractor */}
        <section className="bg-[#f5f2ec] px-5 py-16 sm:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
              <p data-reveal className="eyebrow mb-4 text-[#a8661f]">Why hire local</p>
              <h2 data-split className="font-display text-4xl font-bold uppercase leading-[0.95] text-[#1c2024] sm:text-5xl lg:text-6xl">
                A patio company near you, not a call center.
              </h2>
              <p data-reveal className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
                We work out of {homeCity}, {region}. When you call, you reach the company that will be at your property.
              </p>
              <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/quote"
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-brand-gold px-7 py-4 font-display text-lg font-bold uppercase tracking-wide text-brand-dark transition-colors hover:bg-brand-goldHover"
                >
                  Get my free estimate <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-[#1c2024] px-7 py-4 font-display text-lg font-bold uppercase tracking-wide text-[#1c2024] transition-colors hover:bg-[#1c2024] hover:text-white"
                >
                  Our services
                </Link>
              </div>
            </div>

            <ul data-reveal-stagger className="grid min-w-0 gap-4 sm:grid-cols-2">
              {REASONS.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-xl border border-black/5 bg-white p-6 shadow-[0_20px_40px_-30px_rgba(15,17,21,0.35)] md:p-7">
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#1c2024] text-brand-gold">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-2xl font-bold uppercase text-[#1c2024]">{title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand
          title="Free estimate in your city."
          text="Tell us where you are and what you want to build. We will come out, measure and send a written quote. No obligation."
          image="/images/service-hero-outdoor-kitchen.webp"
        />

        <Contact />
      </main>

      <Footer />
    </div>
  );
};
