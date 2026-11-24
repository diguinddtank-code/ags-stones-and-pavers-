import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardCheck, HardHat, Layers, Phone, ShieldCheck } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { BUSINESS } from '../lib/business';
import { cities } from '../lib/cities';

const REASONS = [
  {
    icon: ClipboardCheck,
    title: 'Free on-site estimate',
    text: 'We walk the property with you, take measurements and put the scope in writing. No obligation, no pressure.',
  },
  {
    icon: HardHat,
    title: 'Our own crews',
    text: 'In-house installers, not subcontractors. The team that quotes your project is the team accountable for building it.',
  },
  {
    icon: Layers,
    title: 'Built from the base up',
    text: 'Excavation, compacted base and drainage planned for Georgia red clay, so pavers stay flat and walls stay put.',
  },
  {
    icon: ShieldCheck,
    title: 'Licensed & insured',
    text: 'A Duluth-based Georgia contractor, fully covered for the work on your property.',
  },
];

const STATS = [
  { value: String(cities.length), label: 'Metro Atlanta cities served' },
  { value: '8', label: 'Hardscape services under one roof' },
  { value: '20', label: 'Paver & stone finishes to preview in 3D' },
  { value: '$0', label: 'For the on-site estimate' },
];

/** Homepage trust section: why hire AGS, in plain contractor terms. */
export const WhyAgs: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id="why-ags" className="relative overflow-hidden bg-[#f5f2ec] py-20 md:py-28">
      <div
        aria-hidden="true"
        data-parallax="-0.5"
        className="pointer-events-none absolute -right-6 top-6 select-none font-display text-[20vw] font-bold uppercase leading-none text-[#1c2024]/[0.04]"
      >
        Pavers
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p data-reveal className="eyebrow mb-4 flex items-center gap-3 text-[#a8661f]">
              <span data-draw="x" className="block h-0.5 w-10 origin-left bg-[#a8661f]" /> Why homeowners hire AGS
            </p>
            <h2 data-split className="font-display text-5xl font-bold uppercase leading-[0.95] text-[#1c2024] sm:text-6xl lg:text-7xl">
              A paver contractor you can actually reach.
            </h2>
            <p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
              Hardscaping is a big investment. You should know who is showing up, what is being built and why. That is how we run every driveway, patio and wall.
            </p>
            <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                data-magnetic
                to="/quote"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-brand-gold px-7 py-4 font-display text-lg font-bold uppercase tracking-wide text-brand-dark transition-colors hover:bg-brand-goldHover"
              >
                Get my free estimate <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-[#1c2024] px-7 py-4 font-display text-lg font-bold uppercase tracking-wide text-[#1c2024] transition-colors hover:bg-[#1c2024] hover:text-white"
              >
                <Phone size={18} /> {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>

          <div>
            <ul data-reveal-stagger className="grid gap-4 sm:grid-cols-2">
              {REASONS.map(({ icon: Icon, title, text }, i) => (
                <li
                  key={title}
                  className="group relative overflow-hidden rounded-xl border border-black/5 bg-white p-6 shadow-[0_20px_40px_-30px_rgba(15,17,21,0.35)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(15,17,21,0.45)] md:p-7"
                >
                  <span className="absolute right-5 top-4 font-display text-5xl font-bold text-[#1c2024]/[0.06]">0{i + 1}</span>
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#1c2024] text-brand-gold transition-colors duration-500 group-hover:bg-brand-gold group-hover:text-[#1c2024]">
                    <Icon size={22} />
                  </span>
                  <h3 className="font-display text-2xl font-bold uppercase text-[#1c2024]">{title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{text}</p>
                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand-gold transition-transform duration-500 group-hover:scale-x-100" />
                </li>
              ))}
            </ul>

            <dl data-reveal-stagger className="mt-4 grid grid-cols-2 overflow-hidden rounded-xl bg-[#1c2024] text-white md:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="border-white/10 p-5 [&:not(:last-child)]:border-r max-md:[&:nth-child(2)]:border-r-0 max-md:[&:nth-child(-n+2)]:border-b md:p-6">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-4xl font-bold text-brand-gold md:text-5xl">{s.value}</span>
                    <span className="mt-1 block text-xs font-semibold uppercase leading-snug tracking-[0.08em] text-white/70">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};
