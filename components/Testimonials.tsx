import React from 'react';
import { ArrowRight, ClipboardCheck, MessageCircle, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';

const expectations = [
  { icon: MessageCircle, title: 'A real conversation', text: 'Tell us what is not working today and what you want the space to do.' },
  { icon: Ruler, title: 'A plan for the site', text: 'Discuss dimensions, access, slope, drainage and material options for your property.' },
  { icon: ClipboardCheck, title: 'A clear next step', text: 'Review the estimate and scope before deciding how to move forward.' },
];

export const Testimonials: React.FC = () => (
  <section id="testimonials" className="bg-white py-16 md:py-24">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-20 items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7b31] mb-3">A straightforward process</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#20252a] leading-tight">Know what happens before work begins.</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">A hardscape project is a significant decision. We make space to understand your goals, talk through the site and answer questions before you commit.</p>
          <Link to="/quote" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#20252a] hover:text-[#9a7b31]">Request a free estimate <ArrowRight size={17} /></Link>
        </div>
        <ol className="divide-y divide-slate-200 border-y border-slate-200">
          {expectations.map(({ icon: Icon, title, text }, index) => <li key={title} className="py-5 sm:py-6 flex gap-4 sm:gap-6">
            <span className="text-[#9a7b31] mt-1"><Icon size={22} strokeWidth={1.6} /></span>
            <div><span className="text-xs uppercase tracking-[0.14em] text-slate-400">0{index + 1}</span><h3 className="mt-1 font-serif text-xl text-[#20252a]">{title}</h3><p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p></div>
          </li>)}
        </ol>
      </div>
    </div>
  </section>
);
