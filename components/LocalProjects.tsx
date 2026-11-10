import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { serviceHeroImages } from '../lib/serviceHeroImages';

const inspiration = [
  { title: 'A more welcoming arrival', description: 'Compare paver styles and edge details for a driveway that fits the home.', image: serviceHeroImages.driveway, alt: 'Paver driveway design inspiration', path: '/service/driveway-pavers', label: 'Driveways' },
  { title: 'Room to gather outside', description: 'Plan the patio size, layout and transitions around how your family uses the yard.', image: serviceHeroImages.patio, alt: 'Outdoor patio design inspiration', path: '/service/outdoor-patio-builders', label: 'Patios' },
  { title: 'A yard that works with its slope', description: 'Explore wall and drainage options for challenging grades and runoff.', image: serviceHeroImages.wall, alt: 'Retaining wall design inspiration', path: '/service/retaining-wall-installation', label: 'Retaining walls' },
];

/** Illustrative categories, not presented as a record of completed client jobs. */
export const LocalProjects: React.FC = () => (
  <section id="portfolio" className="bg-[#f7f6f3] py-20 md:py-28">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="max-w-2xl mb-10 md:mb-14">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7b31] mb-3">Hardscape ideas</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#20252a] leading-tight">Start with the right plan for your property.</h2>
        <p className="mt-4 text-slate-600 leading-relaxed">See the types of outdoor work AGS can help plan around Metro Atlanta homes. Final materials and layout depend on your site and goals.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-5 md:gap-7">
        {inspiration.map((item) => <article key={item.title} className="bg-white border border-black/5 group">
          <Link to={item.path} className="block overflow-hidden" aria-label={`Explore ${item.label}`}>
            <img src={item.image} alt={item.alt} className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" decoding="async" />
          </Link>
          <div className="p-5 md:p-6">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#9a7b31] font-semibold">{item.label}</p>
            <h3 className="mt-2 font-serif text-xl md:text-2xl text-[#20252a]">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            <Link to={item.path} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#20252a] hover:text-[#9a7b31]">Explore service <ArrowUpRight size={16} /></Link>
          </div>
        </article>)}
      </div>
      <div className="mt-9 flex justify-center"><Link to="/quote" className="inline-flex items-center gap-2 bg-[#20252a] text-white px-6 py-3.5 font-semibold hover:bg-[#9a7b31] transition-colors">Discuss your project <ArrowRight size={17} /></Link></div>
    </div>
  </section>
);
