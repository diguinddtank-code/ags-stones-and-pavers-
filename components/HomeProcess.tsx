import React, { useRef } from 'react';
import { useReveal } from '../lib/useReveal';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Img } from './ui/Img';

const steps = [
  {
    number: '01',
    title: 'Tell us what you have in mind',
    text: 'Share the address, the space you want to improve and what matters most to you. A few photos can help start the conversation.',
  },
  {
    number: '02',
    title: 'Walk through the property',
    text: 'Review the layout, slope, drainage, access and existing surfaces together so the estimate reflects the site.',
  },
  {
    number: '03',
    title: 'Review a clear scope',
    text: 'Look over the proposed work and material options. Ask questions while there is still time to compare choices.',
  },
  {
    number: '04',
    title: 'Plan the work',
    text: 'When you are ready, confirm the details and coordinate the next steps for your project.',
  },
];

export const HomeProcess: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
  <section ref={ref} id="process" className="scroll-mt-24 bg-[#f4f3ef] py-20 md:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <p data-reveal className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#a8661f]">A straightforward process</p>
          <h2 data-split className="max-w-xl font-display text-5xl font-bold uppercase leading-[0.95] text-[#1c2024] md:text-6xl">
            Know the plan before the first paver goes down.
          </h2>
          <p data-reveal className="mt-5 max-w-lg leading-relaxed text-slate-600">
            A driveway or patio is a major part of your home. We start with the property, listen to what you want to change and make the scope easier to understand before you decide.
          </p>
          <Link data-reveal to="/quote" className="mt-7 inline-flex items-center gap-2 font-semibold text-[#1c2024] transition-colors hover:text-[#a8661f]">
            Request an on-site estimate <ArrowRight size={17} aria-hidden="true" />
          </Link>

          <figure className="mt-9">
            <div data-clip className="relative overflow-hidden rounded-[24px] bg-[#ddd9d1]">
              <Img
                src="/images/fieldwork-excavation-truck.jpg"
                alt="Illustrative paver jobsite with a service truck, mini excavator and crew preparing a driveway"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </figure>
        </div>

        <ol className="relative border-y border-[#1c2024]/20">
          <span aria-hidden="true" data-draw="y" className="absolute -left-px top-0 hidden h-full w-[2px] origin-top bg-brand-gold sm:block" />
          {steps.map((step) => (
            <li data-reveal key={step.number} className="group grid grid-cols-[3.25rem_1fr] gap-3 border-b border-[#1c2024]/15 py-6 last:border-b-0 sm:grid-cols-[6.5rem_1fr] sm:gap-5 sm:py-7">
              <span aria-hidden="true" className="pt-0.5 font-serif text-3xl text-[#a8661f] transition-transform duration-500 group-hover:-translate-y-1 sm:pl-5 sm:text-5xl">{step.number}</span>
              <div>
                <h3 className="font-display text-2xl font-bold uppercase leading-tight text-[#1c2024] sm:text-3xl">{step.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);
};
