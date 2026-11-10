import React from 'react';
import { ArrowRight, Layers3, MapPin, MessagesSquare, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';

const details = [
  { icon: MapPin, title: 'Local site conditions', text: 'Slope, drainage, soil and access all affect how a hardscape should be planned.' },
  { icon: Layers3, title: 'The foundation matters', text: 'Base preparation and edge restraint help support the pavers and the way the space will be used.' },
  { icon: Ruler, title: 'Materials with a purpose', text: 'Compare paver, natural stone and layout options based on appearance, use and maintenance.' },
  { icon: MessagesSquare, title: 'Clear communication', text: 'Discuss the scope and site requirements before scheduling work.' },
];

export const WhyChooseUs: React.FC = () => (
  <section id="why-us" className="bg-[#20252a] text-white py-16 md:py-24">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20 items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#cbb06b] mb-3">Plan for the long term</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight">A thoughtful installation starts with the site.</h2>
          <p className="mt-5 text-white/70 leading-relaxed">AGS Stones and Pavers works with homeowners in Duluth and Metro Atlanta on driveways, patios, retaining walls and other outdoor projects. Each estimate begins with the property and the result you want.</p>
          <Link to="/about-us" className="mt-6 inline-flex items-center gap-2 font-semibold text-white hover:text-[#cbb06b]">About AGS <ArrowRight size={17} /></Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-px bg-white/15 border border-white/15">
          {details.map(({ icon: Icon, title, text }, index) => <article key={title} className="bg-[#20252a] p-5 md:p-7">
            <div className="flex items-center justify-between mb-6"><Icon size={22} strokeWidth={1.5} className="text-[#cbb06b]"/><span className="text-xs text-white/35">0{index + 1}</span></div>
            <h3 className="font-serif text-xl text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">{text}</p>
          </article>)}
        </div>
      </div>
    </div>
  </section>
);
