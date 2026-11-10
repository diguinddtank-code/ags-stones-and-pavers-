import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const siteDetails = [
  { number: '01', title: 'The ground', text: 'Slope, drainage and what is already underfoot.' },
  { number: '02', title: 'The way you live', text: 'How people, cars and outdoor spaces will use the surface.' },
  { number: '03', title: 'The finish', text: 'Paver styles, patterns and edges that suit the home.' },
];

export const WhyChooseUs: React.FC = () => (
  <section id="why-us" className="bg-[#20252a] py-16 text-white md:py-24">
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      <figure className="relative">
        <div className="overflow-hidden bg-[#34383a]">
          <img
            src="/images/fieldwork-bright-driveway.jpg"
            alt="Illustrative paver driveway jobsite at a white Metro Atlanta home with a mini excavator and material delivery"
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption className="mt-2 text-xs leading-5 text-white/55">
          Representative fieldwork image, not a completed AGS project.
        </figcaption>
      </figure>

      <div className="lg:py-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#cbb06b]">Duluth, Georgia · Metro Atlanta</p>
        <h2 className="max-w-2xl font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
          The finished surface is only part of the job.
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-white/70">
          A driveway on a slope, a patio beside the house and a retaining wall each bring different site questions. AGS Stones and Pavers starts by understanding the property and what you need the space to do.
        </p>

        <ol className="mt-8 border-y border-white/20">
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

        <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
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
