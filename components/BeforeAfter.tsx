import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { serviceHeroImages } from '../lib/serviceHeroImages';

export const BeforeAfter: React.FC = () => (
  <section className="bg-white py-16 md:py-24">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-9 md:gap-16 items-center">
      <div className="relative">
        <img src={serviceHeroImages.driveway} alt="Driveway paver layout inspiration" className="w-full aspect-[4/3] object-cover" loading="lazy" decoding="async" />
        <div className="absolute left-4 bottom-4 bg-white/95 px-4 py-3 shadow-lg"><span className="block text-[10px] uppercase tracking-[0.16em] text-[#9a7b31] font-semibold">The result starts underneath</span><span className="block text-sm text-[#20252a] mt-1">Base · drainage · paver pattern</span></div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7b31] mb-3">Built for Georgia conditions</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#20252a] leading-tight">A good hardscape begins below the surface.</h2>
        <p className="mt-5 text-slate-600 leading-relaxed">North Georgia’s clay soils and changing weather make site preparation a key part of a paver project. The right base, grading and drainage plan depend on the surface, soil and water flow at your property.</p>
        <ul className="mt-6 space-y-3 text-sm text-slate-700">
          {['Review slope and existing drainage', 'Plan a suitable base for the intended use', 'Choose pavers, pattern and edge details together'].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 size={18} className="text-[#9a7b31] shrink-0" />{item}</li>)}
        </ul>
        <Link to="/service/driveway-pavers" className="mt-7 inline-flex items-center gap-2 font-semibold text-[#20252a] hover:text-[#9a7b31]">Learn about driveway pavers <ArrowRight size={17} /></Link>
      </div>
    </div>
  </section>
);
