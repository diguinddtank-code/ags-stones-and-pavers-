import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Clock, MapPin, Phone } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { CtaBand } from '../components/CtaBand';
import { serviceDataDb, CORE_SERVICE_IDS } from '../lib/serviceData';
import { absoluteUrl, BUSINESS, BUSINESS_ID } from '../lib/business';
import { cities } from '../lib/cities';
import { localPageUrl } from '../lib/localPages';
import { useReveal } from '../lib/useReveal';
import { Img } from '../components/ui/Img';

const servicesItemList = {
  '@type': 'ItemList',
  '@id': absoluteUrl('/services') + '#services',
  name: 'Hardscape Services',
  itemListElement: CORE_SERVICE_IDS.map((id, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: serviceDataDb[id].name,
      url: absoluteUrl(`/service/${id}`),
      provider: { '@id': BUSINESS_ID },
    },
  })),
};

interface ServiceCard {
  id: string;
  title: string;
  image: string;
  text: string;
  points: string[];
  local: { name: string; url: string }[];
}

// Local links mirror the ones the shared Services grid exposes, so /services keeps them.
const SERVICES: ServiceCard[] = [
  {
    id: 'driveway-pavers',
    title: 'Driveway Pavers',
    image: '/images/service-hero-driveway.webp',
    text: 'Interlocking paver driveways built on a base sized for vehicle traffic.',
    points: ['Excavation and compacted base', 'Permeable and standard pavers', 'Patterns, borders and colors'],
    local: [
      { name: 'Alpharetta', url: '/pavers-alpharetta-ga' },
      { name: 'Atlanta', url: '/driveway-pavers-atlanta' },
    ],
  },
  {
    id: 'outdoor-patio-builders',
    title: 'Patio Installation',
    image: '/images/service-hero-patio.webp',
    text: 'Paver and natural stone patios for dining, relaxing and everyday use.',
    points: ['Paver and natural stone', 'Steps, borders and transitions', 'Drainage planned in'],
    local: [
      { name: 'Johns Creek', url: '/patio-installation-johns-creek' },
      { name: 'Duluth', url: '/paver-patio-duluth-ga' },
    ],
  },
  {
    id: 'retaining-wall-installation',
    title: 'Retaining Walls',
    image: '/images/service-hero-retaining-wall.webp',
    text: 'Walls that hold a slope and make more of the yard usable.',
    points: ['Grade and slope planning', 'Block and stone wall systems', 'Drainage behind the wall'],
    local: [
      { name: 'Atlanta', url: '/retaining-walls-atlanta' },
      { name: 'Roswell', url: '/hardscape-roswell-ga' },
    ],
  },
  {
    id: 'masonry-fireplaces',
    title: 'Outdoor Kitchens & Fireplaces',
    image: '/images/service-hero-outdoor-kitchen.webp',
    text: 'Stone and masonry for outdoor kitchens, fireplaces, fire pits and columns.',
    points: ['Outdoor kitchen layouts', 'Fireplaces and fire features', 'Stone and masonry finishes'],
    local: [
      { name: 'Alpharetta', url: '/stone-patio-contractors-alpharetta-ga' },
      { name: 'Smyrna', url: '/hardscaping-smyrna' },
    ],
  },
  {
    id: 'pool-deck-pavers',
    title: 'Pool Deck Pavers',
    image: '/images/service-hero-pool-deck.webp',
    text: 'Paver and stone pool surrounds with matching coping and clean transitions.',
    points: ['Paver and stone options', 'Pool coping choices', 'Drainage and edge details'],
    local: [
      { name: 'Atlanta', url: '/pool-deck-pavers-atlanta' },
      { name: 'Roswell', url: '/paving-stone-contractor-roswell' },
    ],
  },
  {
    id: 'stone-veneer',
    title: 'Stone Veneer',
    image: '/images/service-hero-stone-veneer.webp',
    text: 'Stone veneer for exterior walls, entry columns, fireplaces and accents.',
    points: ['Facades, columns and accents', 'Stone style and finish choices', 'Clean installation details'],
    local: [
      { name: 'Alpharetta', url: '/pavers-alpharetta-ga' },
      { name: 'Johns Creek', url: '/paver-patio-johns-creek-ga' },
    ],
  },
  {
    id: 'deck-builders',
    title: 'Decks',
    image: '/images/service-hero-deck.webp',
    text: 'Decks built to connect with your patio, steps and the rest of the yard.',
    points: ['Wood and composite options', 'Deck-to-patio transitions', 'Layout for your yard'],
    local: [
      { name: 'Duluth', url: '/paver-patio-duluth-ga' },
      { name: 'Johns Creek', url: '/outdoor-kitchen-johns-creek-ga' },
    ],
  },
  {
    id: 'landscape-design',
    title: 'Landscape Design',
    image: '/images/service-hero-landscape-design.webp',
    text: 'Plan the layout, materials and grades before anything is built.',
    points: ['Layout planning', 'Material coordination', 'Site and access review'],
    local: [
      { name: 'Atlanta', url: '/hardscape-installation-atlanta' },
      { name: 'Roswell', url: '/hardscape-roswell-ga' },
    ],
  },
];

const HERO_POINTS = [
  'Licensed & insured',
  'In-house crews, no subcontractors',
  'Free on-site estimate, written quote',
];

const STEPS = [
  { title: 'Call or request a quote', text: 'Tell us what you want to build and where. It takes a couple of minutes.' },
  { title: 'Free on-site visit', text: 'We walk the property, measure, and look at grade, drainage and access.' },
  { title: 'Written quote', text: 'Scope, materials and price in writing. No obligation, no pressure.' },
  { title: 'Our crew builds it', text: 'AGS installers do the work, from excavation to the last cut paver.' },
];

const LOCAL_GROUPS = [
  { prefix: 'driveway-pavers', label: 'Driveway pavers' },
  { prefix: 'stone-patios', label: 'Patios' },
  { prefix: 'retaining-walls', label: 'Retaining walls' },
  { prefix: 'outdoor-kitchens', label: 'Outdoor kitchens' },
];

export const ServicesIndexPage: React.FC = () => {
  const mainRef = useRef<HTMLElement>(null);
  useReveal(mainRef);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-brand-dark antialiased">
      <SEO
        title="Paver Installation & Hardscape Services in Atlanta | AGS"
        description="Driveway pavers, patio installation, retaining walls, pool decks and outdoor kitchens by a licensed Duluth, GA contractor. Free on-site estimates."
        breadcrumbs={[{ name: 'Services', path: '/services' }]}
        schema={[servicesItemList]}
      />

      <Header />

      <main ref={mainRef} className="flex-grow">
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-brand-dark pb-14 pt-32 text-white sm:pt-36 md:pb-20 lg:pb-24 lg:pt-44">
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <Img
              src="/images/service-hero-driveway.webp"
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
                <MapPin size={15} aria-hidden="true" /> {BUSINESS.address.city}, {BUSINESS.address.region} · Serving Metro Atlanta
              </p>
              <h1 style={{ '--d': '0.15s' } as React.CSSProperties} className="hero-in font-display text-4xl font-bold uppercase leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
                Paver installation &amp; <span className="text-brand-gold">hardscape services</span> in Atlanta
              </h1>
              <p style={{ '--d': '0.3s' } as React.CSSProperties} className="hero-in mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
                Driveway pavers, patios, retaining walls, pool decks, outdoor kitchens and stonework. One local contractor, our own crews, a written quote before any work starts.
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

        {/* Services grid */}
        <section id="services" className="bg-[#f5f2ec] px-5 py-16 sm:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 grid gap-5 md:mb-14 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-12">
              <div className="min-w-0">
                <p data-reveal className="eyebrow mb-4 flex items-center gap-3 text-[#a8661f]">
                  <span className="block h-0.5 w-10 bg-[#a8661f]" aria-hidden="true" /> What we build
                </p>
                <h2 data-split className="font-display text-4xl font-bold uppercase leading-[0.95] text-[#1c2024] sm:text-5xl lg:text-6xl">
                  {SERVICES.length} services. One stone &amp; paver contractor.
                </h2>
              </div>
              <p data-reveal className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Pick a service to see how we build it and what to plan for. Not sure what you need? Call us and describe the space.
              </p>
            </div>

            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {SERVICES.map((s, i) => (
                <li
                  key={s.id}
                  data-reveal
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-black/5 bg-white shadow-[0_20px_40px_-30px_rgba(15,17,21,0.35)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(15,17,21,0.5)]"
                >
                  <Link to={`/service/${s.id}`} className="relative block overflow-hidden" tabIndex={-1} aria-hidden="true">
                    <Img
                      src={s.image}
                      alt=""
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-md bg-[#1c2024] px-2.5 py-1 font-display text-sm font-bold text-brand-gold">0{i + 1}</span>
                  </Link>
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <h3 className="font-display text-2xl font-bold uppercase leading-tight text-[#1c2024]">
                      <Link to={`/service/${s.id}`} className="transition-colors hover:text-[#a8661f]">{s.title}</Link>
                    </h3>
                    <p className="mt-2 leading-relaxed text-slate-600">{s.text}</p>
                    <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <Check size={16} className="mt-0.5 shrink-0 text-[#a8661f]" strokeWidth={3} aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      <span className="text-slate-500">Local:</span>
                      {s.local.map((l) => (
                        <Link key={l.url} to={l.url} className="inline-flex min-h-[44px] items-center font-semibold text-[#1c2024] underline decoration-[#a8661f]/50 underline-offset-4 hover:text-[#a8661f]">
                          {l.name}
                        </Link>
                      ))}
                    </div>
                    <Link
                      to={`/service/${s.id}`}
                      className="mt-auto inline-flex min-h-[44px] items-center gap-2 pt-4 font-display text-lg font-bold uppercase tracking-wide text-[#1c2024] transition-colors hover:text-[#a8661f]"
                    >
                      See {s.title.toLowerCase()} <ArrowRight size={16} className="shrink-0 text-[#a8661f] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>

            <p data-reveal className="mt-8 text-center text-base text-slate-600">
              Want to see finishes first?{' '}
              <Link to="/design-your-yard" className="font-semibold text-[#1c2024] underline decoration-[#a8661f]/50 underline-offset-4 hover:text-[#a8661f]">
                Preview paver and stone options in 3D
              </Link>
              .
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="px-5 py-16 sm:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl md:mb-14">
              <p data-reveal className="eyebrow mb-4 text-[#a8661f]">How it works</p>
              <h2 data-split className="font-display text-4xl font-bold uppercase leading-[0.95] text-[#1c2024] sm:text-5xl lg:text-6xl">
                From first call to finished patio
              </h2>
            </div>
            <ol data-reveal-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, i) => (
                <li key={step.title} className="relative rounded-xl border border-black/5 bg-white p-6 shadow-[0_20px_40px_-30px_rgba(15,17,21,0.35)] md:p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1c2024] font-display text-xl font-bold text-brand-gold">{i + 1}</span>
                  <h3 className="mt-5 font-display text-2xl font-bold uppercase leading-tight text-[#1c2024]">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{step.text}</p>
                </li>
              ))}
            </ol>
            <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/quote"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-brand-gold px-7 py-4 font-display text-lg font-bold uppercase tracking-wide text-brand-dark transition-colors hover:bg-brand-goldHover"
              >
                Get my free estimate <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-[#1c2024] px-7 py-4 font-display text-lg font-bold uppercase tracking-wide text-[#1c2024] transition-colors hover:bg-[#1c2024] hover:text-white"
              >
                <Phone size={18} aria-hidden="true" /> {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        {/* Services near you */}
        <section className="bg-[#1c2024] px-5 py-16 text-white sm:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p data-reveal className="eyebrow mb-4 flex items-center gap-2 text-brand-gold">
                  <MapPin size={15} aria-hidden="true" /> Near you
                </p>
                <h2 data-split className="font-display text-4xl font-bold uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
                  Patio &amp; paver contractors near you
                </h2>
                <p data-reveal className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                  We install in {cities.length} cities around our {BUSINESS.address.city} base. Pick a service and your city.
                </p>
              </div>
              <Link data-reveal to="/service-areas" className="group inline-flex min-h-[44px] items-center gap-2 font-display text-lg font-bold uppercase tracking-wide text-brand-gold hover:text-white">
                All service areas <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {LOCAL_GROUPS.map((g) => (
                <div key={g.prefix} className="min-w-0 bg-[#1c2024] p-5 md:p-6">
                  <h3 className="font-display text-2xl font-bold uppercase text-brand-gold">{g.label}</h3>
                  <ul className="mt-3 grid grid-cols-2 gap-x-3">
                    {cities.map((c) => (
                      <li key={c.id} className="min-w-0">
                        <Link
                          to={localPageUrl(g.prefix, c.id)}
                          title={`${g.label} in ${c.name}, GA`}
                          className="flex min-h-[44px] items-center truncate text-sm font-semibold text-white/70 transition-colors hover:text-brand-gold"
                        >
                          {c.name}
                          <span className="sr-only"> {g.label.toLowerCase()}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title="Get a price for your project."
          text="Driveway, patio, wall or something else. We will come out, measure and put the quote in writing. Free and no obligation."
          image="/images/service-hero-pool-deck.webp"
        />

        <Contact />
      </main>

      <Footer />
    </div>
  );
};
