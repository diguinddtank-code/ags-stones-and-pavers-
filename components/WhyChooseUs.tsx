import React, { useRef } from 'react';
import { useReveal } from '../lib/useReveal';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Img } from './ui/Img';

const siteDetails = [
  { number: '01', title: 'The ground', text: 'Slope, drainage and what is already underfoot.' },
  { number: '02', title: 'The way you live', text: 'How people, cars and outdoor spaces will use the surface.' },
  { number: '03', title: 'The finish', text: 'Paver styles, patterns and edges that suit the home.' },
];

export const WhyChooseUs: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
  <section ref={ref} id="why-us" className="relative overflow-hidden bg-[#20252a] py-20 text-white md:py-32">
    <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-brand-gold/10 blur-[160px]" />
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      <figure className="relative">
        <div data-clip className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[#34383a]">
          <div data-parallax="0.14" className="absolute -inset-y-[10%] inset-x-0">
          <Img
            src="/images/fieldwork-bright-driveway.jpg"
            alt="Illustrative paver driveway jobsite at a white Metro Atlanta home with a mini excavator and material delivery"
            className="h-full w-full object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          </div>
        </div>
      </figure>

      <div className="lg:py-8">
        <p data-reveal className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#cbb06b]">Duluth, Georgia · Metro Atlanta</p>
        <h2 data-split className="max-w-2xl font-serif text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
          The finished surface is only part of the job.
        </h2>
        <p data-reveal className="mt-5 max-w-2xl leading-relaxed text-white/70">
          A driveway on a slope, a patio beside the house and a retaining wall each bring different site questions. AGS Stones and Pavers starts by understanding the property and what you need the space to do.
        </p>

        <ol data-reveal-stagger className="mt-8 border-y border-white/20">
          {siteDetails.map((detail) => (
            <li key={detail.number} className="grid grid-cols-[2.75rem_1fr] gap-3 border-b border-white/15 py-4 last:border-b-0 sm:grid-cols-[3.5rem_1fr] sm:gap-4">
              <span aria-hidden="true" className="font-serif text-xl text-[#cbb06b]">{detail.number}</span>
              <div>
                <h3 className="font-semibold text-white">{detail.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/65">{detail.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div data-reveal className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
          <Link to="/about-us" className="inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-[#cbb06b]">
            More about AGS <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link to="/quote" className="inline-flex items-center gap-2 font-semibold text-[#cbb06b] transition-colors hover:text-white">
            Talk through your project <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);
};
