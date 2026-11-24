import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { cities } from '../lib/cities';
import { localPageUrl } from '../lib/localPages';
import { BUSINESS } from '../lib/business';

const LINKS = [
  { prefix: 'driveway-pavers', label: 'Driveways' },
  { prefix: 'stone-patios', label: 'Patios' },
  { prefix: 'retaining-walls', label: 'Walls' },
];

/** "Near me" proof: every city we serve, linked to its local service pages. */
export const ServiceAreasStrip: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id="service-areas" className="relative overflow-hidden bg-[#1c2024] py-20 text-white md:py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 grid gap-6 md:mb-14 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <p data-reveal className="eyebrow mb-4 flex items-center gap-2 text-brand-gold">
              <MapPin size={15} /> Service areas
            </p>
            <h2 data-split className="font-display text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">
              Local paver contractor for North Metro Atlanta.
            </h2>
            <p data-reveal className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              Our crews work out of {BUSINESS.address.city}, {BUSINESS.address.region}. If you are in one of these cities, we can be at your property for a free estimate.
            </p>
          </div>
          <Link data-reveal to="/service-areas" className="group inline-flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wide text-brand-gold hover:text-white">
            All service areas <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ul data-reveal-stagger className="grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((c) => (
            <li key={c.id} className="group bg-[#1c2024] p-5 transition-colors duration-300 hover:bg-[#23282d]">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl font-bold uppercase">{c.name}</h3>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">{c.county.replace(' Counties', '').replace(' County', '')}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                {LINKS.map((l) => (
                  <Link key={l.prefix} to={localPageUrl(l.prefix, c.id)} className="font-semibold text-white/60 underline-offset-4 transition-colors hover:text-brand-gold hover:underline">
                    {l.label}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
