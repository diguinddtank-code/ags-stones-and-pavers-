import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Img } from './ui/Img';
import { useReveal } from '../lib/useReveal';
import { BUSINESS } from '../lib/business';

/** A compact, useful handoff from the homepage hero into the estimate journey. */
export const ZParallaxShowcase: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#f7f6f3] py-20 md:py-32">
      {/* Oversized watermark word drifting behind the content */}
      <div
        aria-hidden="true"
        data-parallax="-0.6"
        className="pointer-events-none absolute -right-10 top-10 select-none font-serif text-[22vw] font-bold italic leading-none text-[#20252a]/[0.035] lg:top-0"
      >
        Stone
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <div className="max-w-2xl">
          <p data-reveal className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7b31]">
            <span data-draw="x" className="block h-px w-10 origin-left bg-[#9a7b31]" />
            Hardscaping in Duluth and Metro Atlanta
          </p>
          <h2 data-split className="font-serif text-4xl leading-[1.05] text-[#20252a] sm:text-5xl lg:text-6xl">
            Make more of the space around your home.
          </h2>
          <p data-reveal className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
            From a driveway that needs a stronger foundation to a patio made for weeknight dinners, AGS helps you plan the right hardscape for your property.
          </p>
          <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              data-magnetic
              to="/quote"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#20252a] px-7 py-4 font-semibold text-white transition-colors hover:bg-[#9a7b31]"
            >
              Talk through your project
              <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-7 py-4 font-semibold text-[#20252a] transition-colors hover:border-[#9a7b31] hover:text-[#9a7b31]"
            >
              Call {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="relative pb-24 sm:pb-16">
          <div data-clip className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[4/3] lg:aspect-[4/5]">
            <div data-parallax="0.16" className="absolute -inset-y-[10%] inset-x-0">
              <Img
                src="/images/service-hero-driveway.webp"
                alt="Paver driveway design inspiration"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div
            data-reveal="up"
            data-delay="0.3"
            className="absolute -bottom-2 left-4 right-4 rounded-2xl border border-black/5 bg-white/90 p-5 shadow-[0_30px_60px_-20px_rgba(15,17,21,0.35)] backdrop-blur-xl sm:left-8 sm:right-8 sm:p-6"
          >
            <p className="mb-3 text-sm font-semibold text-[#20252a]">A clear place to start</p>
            <ul className="grid gap-3 text-xs text-slate-600 sm:grid-cols-3 sm:text-sm">
              {['Share your goals', 'Review site needs', 'Get a written estimate'].map((step, i) => (
                <li key={step} className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#9a7b31] text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
