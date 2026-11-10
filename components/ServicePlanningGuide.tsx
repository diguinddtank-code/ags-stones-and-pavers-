import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { ServiceKind } from '../lib/serviceFaqs';
import { serviceInsights } from '../lib/serviceInsights';

interface Props {
  kind: ServiceKind;
  serviceName: string;
}

export const ServicePlanningGuide: React.FC<Props> = ({ kind, serviceName }) => {
  const insight = serviceInsights[kind];

  return (
    <section className="bg-[#f5f3ee] px-5 py-20 md:px-8 md:py-28" aria-labelledby="service-planning-title">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div className="flex flex-col">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#987d3e]">A better estimate starts with a clear plan</p>
          <h2 id="service-planning-title" className="max-w-xl font-serif text-3xl font-medium leading-tight text-brand-dark md:text-5xl">
            {insight.title}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            {insight.intro}
          </p>

          <div className="mt-9 border-t border-brand-dark/15 pt-6">
            <h3 className="font-serif text-xl text-brand-dark md:text-2xl">{insight.checklistTitle}</h3>
            <ul className="mt-4 divide-y divide-brand-dark/10">
              {insight.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 py-3 text-sm leading-6 text-slate-600">
                  <Check aria-hidden="true" size={16} className="mt-1 shrink-0 text-[#987d3e]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/quote" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-dark transition-colors hover:text-[#987d3e]">
              Request an estimate for {serviceName}
              <ArrowRight aria-hidden="true" size={16} className="text-[#987d3e]" />
            </Link>
          </div>
        </div>

        <div className="border-t border-brand-dark/20">
          {insight.decisions.map((decision, index) => (
            <article key={decision.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-brand-dark/15 py-6 md:grid-cols-[3.5rem_8.5rem_1fr] md:gap-x-6 md:py-7">
              <span aria-hidden="true" className="row-span-2 font-serif text-2xl text-[#987d3e] md:row-span-1 md:text-3xl">0{index + 1}</span>
              <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#987d3e] md:mb-0 md:pt-1">{decision.label}</span>
              <div>
                <h3 className="font-serif text-xl text-brand-dark md:text-2xl">{decision.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 md:text-base">{decision.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
