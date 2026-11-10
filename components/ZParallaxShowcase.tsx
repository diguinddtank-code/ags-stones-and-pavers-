import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

/** A compact, useful handoff from the homepage hero into the estimate journey. */
export const ZParallaxShowcase: React.FC = () => (
  <section className="relative bg-[#f7f6f3] py-16 md:py-24 overflow-hidden">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_0.85fr] gap-10 lg:gap-20 items-center">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7b31] mb-4">Hardscaping in Duluth and Metro Atlanta</p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#20252a]">Make more of the space around your home.</h2>
        <p className="mt-5 text-base md:text-lg leading-relaxed text-slate-600">From a driveway that needs a stronger foundation to a patio made for weeknight dinners, AGS helps you plan the right hardscape for your property.</p>
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link to="/quote" className="inline-flex items-center justify-center gap-2 bg-[#20252a] text-white px-6 py-3.5 font-semibold hover:bg-[#9a7b31] transition-colors">Talk through your project <ArrowRight size={17} /></Link>
          <a href="tel:6784287630" className="inline-flex items-center justify-center px-6 py-3.5 border border-slate-300 text-[#20252a] font-semibold hover:border-[#9a7b31] transition-colors">Call (678) 428-7630</a>
        </div>
      </div>
      <div className="relative">
        <img src="/images/service-hero-driveway.webp" alt="Paver driveway design inspiration" className="w-full aspect-[4/3] object-cover rounded-sm" loading="lazy" decoding="async" />
        <div className="absolute -bottom-5 left-4 sm:left-8 right-4 sm:right-8 bg-white shadow-xl p-5 sm:p-6">
          <p className="text-sm font-semibold text-[#20252a] mb-3">A clear place to start</p>
          <ul className="grid sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-600">
            {['Share your goals', 'Review site needs', 'Get a written estimate'].map((step) => <li key={step} className="flex items-start gap-2"><Check size={16} className="text-[#9a7b31] shrink-0" />{step}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </section>
);
