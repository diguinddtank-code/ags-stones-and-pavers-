import React, { useRef } from 'react';
import { useReveal } from '../lib/useReveal';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { serviceHeroImages } from '../lib/serviceHeroImages';
import { Img } from './ui/Img';

const inspiration = [
  { title: 'A more welcoming arrival', description: 'Compare paver styles and edge details for a driveway that fits the home.', image: serviceHeroImages.driveway, alt: 'Paver driveway design inspiration', path: '/service/driveway-pavers', label: 'Driveways' },
  { title: 'Room to gather outside', description: 'Plan the patio size, layout and transitions around how your family uses the yard.', image: serviceHeroImages.patio, alt: 'Outdoor patio design inspiration', path: '/service/outdoor-patio-builders', label: 'Patios' },
  { title: 'A yard that works with its slope', description: 'Explore wall and drainage options for challenging grades and runoff.', image: serviceHeroImages.wall, alt: 'Retaining wall design inspiration', path: '/service/retaining-wall-installation', label: 'Retaining walls' },
];

/** Illustrative categories, not presented as a record of completed client jobs. */
export const LocalProjects: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
  <section ref={ref} id="portfolio" className="bg-[#f7f6f3] py-20 md:py-32">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="max-w-2xl mb-10 md:mb-14">
        <p data-reveal className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7b31] mb-3">Hardscape ideas</p>
        <h2 data-split className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#20252a] leading-[1.08]">Start with the right plan for your property.</h2>
        <p data-reveal className="mt-4 text-slate-600 leading-relaxed">See the types of outdoor work AGS can help plan around Metro Atlanta homes. Final materials and layout depend on your site and goals.</p>
      </div>
      <div data-reveal-stagger className="grid md:grid-cols-3 gap-5 md:gap-7">
        {inspiration.map((item) => <article key={item.title} className="group overflow-hidden rounded-[24px] border border-black/5 bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-25px_rgba(15,17,21,0.35)] md:[&:nth-child(2)]:mt-12">
          <Link to={item.path} className="block overflow-hidden" aria-label={`Explore ${item.label}`}>
            <Img src={item.image} alt={item.alt} sizes="(min-width: 768px) 33vw, 100vw" className="w-full aspect-[4/3] object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.08]" />
          </Link>
          <div className="p-5 md:p-6">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#9a7b31] font-semibold">{item.label}</p>
            <h3 className="mt-2 font-serif text-xl md:text-2xl text-[#20252a]">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            <Link to={item.path} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#20252a] hover:text-[#9a7b31]">Explore service <ArrowUpRight size={16} /></Link>
          </div>
        </article>)}
      </div>
      <div className="mt-16 flex justify-center"><Link data-magnetic to="/quote" className="inline-flex items-center gap-2 rounded-full bg-[#20252a] text-white px-7 py-4 font-semibold hover:bg-[#9a7b31] transition-colors">Discuss your project <ArrowRight size={17} /></Link></div>
    </div>
  </section>
);
};
