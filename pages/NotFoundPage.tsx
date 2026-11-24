import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Armchair, BookOpen, Flame, Home, Layers, LayoutGrid, MapPin, Phone, Waves, Wrench } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { BUSINESS } from '../lib/business';

const SERVICES = [
  { name: 'Driveway Pavers', path: '/service/driveway-pavers', icon: LayoutGrid },
  { name: 'Patios', path: '/service/outdoor-patio-builders', icon: Armchair },
  { name: 'Retaining Walls', path: '/service/retaining-wall-installation', icon: Layers },
  { name: 'Pool Decks', path: '/service/pool-deck-pavers', icon: Waves },
  { name: 'Masonry & Fireplaces', path: '/service/masonry-fireplaces', icon: Flame },
  { name: 'All Services', path: '/services', icon: Wrench },
];

const MORE = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Service Areas', path: '/service-areas', icon: MapPin },
  { name: 'Homeowner Guides', path: '/blog', icon: BookOpen },
];

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f2ec] font-sans text-brand-dark">
      <SEO title="Page Not Found | AGS Stones and Pavers" description="The page you are looking for does not exist." noindex />
      <Header forceSolid={true} />
      <main className="flex-grow px-4 pb-16 pt-28 sm:px-6 md:pb-24 md:pt-36 lg:px-8 lg:pt-44">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-4 flex items-center gap-3 text-[#a8661f]">
                <span className="block h-0.5 w-8 bg-[#a8661f]" aria-hidden="true" /> Error 404
              </p>
              <h1 className="font-display text-[2.6rem] font-bold uppercase leading-[0.95] tracking-[-0.01em] text-[#1c2024] sm:text-6xl lg:text-7xl">
                This page took a wrong turn
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
                The page you are looking for may have moved or no longer exists. Here are the quickest ways to get back on track,
                or reach us directly about your project.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/quote"
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-brand-gold px-7 py-4 font-display text-lg font-bold uppercase tracking-wide text-brand-dark transition-colors hover:bg-brand-goldHover"
                >
                  Get a free estimate <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={BUSINESS.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-[#1c2024] px-7 py-3.5 font-display text-lg font-bold uppercase tracking-wide text-[#1c2024] transition-colors hover:bg-[#1c2024] hover:text-white"
                >
                  <Phone size={18} /> {BUSINESS.phoneDisplay}
                </a>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-500">{BUSINESS.hours.display}</p>

              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-1">
                {MORE.map(({ name, path, icon: Icon }) => (
                  <li key={path}>
                    <Link to={path} className="inline-flex min-h-[44px] items-center gap-2 font-display text-base font-bold uppercase tracking-wide text-[#1c2024] transition-colors hover:text-[#a8661f]">
                      <Icon size={16} className="text-[#a8661f]" /> {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <nav aria-label="Popular services" className="self-start rounded-xl border-t-4 border-brand-gold bg-white p-6 shadow-[0_30px_60px_-30px_rgba(15,17,21,0.45)] sm:p-8">
              <p className="eyebrow mb-2 text-[#a8661f]">Popular services</p>
              <h2 className="mb-5 font-display text-3xl font-bold uppercase leading-[0.95] text-[#1c2024]">What are you planning?</h2>
              <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {SERVICES.map(({ name, path, icon: Icon }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className="group flex min-h-[52px] items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 text-[15px] font-semibold text-brand-dark transition-all hover:border-brand-gold hover:bg-amber-50"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#1c2024] text-brand-gold transition-colors group-hover:bg-brand-gold group-hover:text-brand-dark">
                        <Icon size={16} />
                      </span>
                      {name}
                      <ArrowRight size={15} className="ml-auto shrink-0 text-[#a8661f]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
