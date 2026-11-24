import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Phone, ShieldCheck } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { BUSINESS } from '../lib/business';
import { Img } from './ui/Img';

interface CtaBandProps {
  title?: string;
  text?: string;
  image?: string;
}

/** Full-bleed closing call to action, reused on every page type. */
export const CtaBand: React.FC<CtaBandProps> = ({
  title = 'Ready to price your project?',
  text = 'Tell us what you want to build. We will come out, measure, talk through options and put a clear quote in writing. Free and no obligation.',
  image = '/images/service-hero-pool-deck.webp',
}) => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="relative overflow-hidden bg-brand-dark py-24 text-white md:py-36">
      <div className="absolute inset-0" aria-hidden="true">
        <div data-parallax="0.18" className="absolute -inset-y-[12%] inset-x-0">
          <Img src={image} alt="" sizes="100vw" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/40" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p data-reveal className="eyebrow mb-4 text-brand-gold">Free on-site estimates</p>
          <h2 data-split className="font-display text-5xl font-bold uppercase leading-[0.92] sm:text-6xl md:text-7xl">{title}</h2>
          <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{text}</p>
          <div data-reveal className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              data-magnetic
              to="/quote"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-brand-gold px-8 py-4 font-display text-lg font-bold uppercase tracking-wide text-brand-dark transition-colors hover:bg-white"
            >
              Get my free estimate <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white/40 px-8 py-4 font-display text-lg font-bold uppercase tracking-wide text-white transition-colors hover:border-brand-gold hover:text-brand-gold"
            >
              <Phone size={18} /> Call {BUSINESS.phoneDisplay}
            </a>
          </div>
          <div data-reveal className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/70">
            <span className="flex items-center gap-2"><Clock size={15} className="text-brand-gold" /> {BUSINESS.hours.display}</span>
            <span className="flex items-center gap-2"><ShieldCheck size={15} className="text-brand-gold" /> Licensed &amp; insured</span>
          </div>
        </div>
      </div>
    </section>
  );
};
