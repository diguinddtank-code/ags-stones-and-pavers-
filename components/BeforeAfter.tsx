import React, { useRef } from 'react';
import { useReveal } from '../lib/useReveal';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { serviceHeroImages } from '../lib/serviceHeroImages';
import { Img } from './ui/Img';

export const BeforeAfter: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
  <section ref={ref} className="bg-white py-20 md:py-32">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-9 md:gap-16 items-center">
      <div className="relative">
        <div data-clip className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
          <div data-parallax="0.14" className="absolute -inset-y-[10%] inset-x-0">
            <Img src={serviceHeroImages.patio} alt="Paver patio layout inspiration" sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover" />
          </div>
        </div>
        <div data-reveal="up" data-delay="0.4" className="absolute left-4 bottom-4 rounded-xl bg-white/95 px-4 py-3 shadow-lg"><span className="block text-[10px] uppercase tracking-[0.16em] text-[#9a7b31] font-semibold">The result starts underneath</span><span className="block text-sm text-[#20252a] mt-1">Base · drainage · paver pattern</span></div>
      </div>
      <div>
        <p data-reveal className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7b31] mb-3">Built for Georgia conditions</p>
        <h2 data-split className="font-serif text-4xl sm:text-5xl text-[#20252a] leading-[1.08]">A good hardscape begins below the surface.</h2>
        <p data-reveal className="mt-5 text-slate-600 leading-relaxed">North Georgia’s clay soils and changing weather make site preparation a key part of a paver project. The right base, grading and drainage plan depend on the surface, soil and water flow at your property.</p>
        <ul data-reveal-stagger className="mt-6 space-y-3 text-sm text-slate-700">
          {['Review slope and existing drainage', 'Plan a suitable base for the intended use', 'Choose pavers, pattern and edge details together'].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 size={18} className="text-[#9a7b31] shrink-0" />{item}</li>)}
        </ul>
        <Link data-reveal to="/service/driveway-pavers" className="mt-7 inline-flex items-center gap-2 font-semibold text-[#20252a] hover:text-[#9a7b31]">Learn about driveway pavers <ArrowRight size={17} /></Link>
      </div>
    </div>
  </section>
);
};
