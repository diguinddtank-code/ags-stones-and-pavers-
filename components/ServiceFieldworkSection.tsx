import React from 'react';
import type { ServiceKind } from '../lib/serviceFaqs';
import { Img } from './ui/Img';

interface FieldScene {
  image: string;
  alt: string;
  label: string;
}

interface FieldworkCopy {
  title: string;
  description: string;
  scenes: FieldScene[];
}

const fieldworkByKind: Record<ServiceKind, FieldworkCopy> = {
  driveway: {
    title: 'The work starts below the pavers.',
    description: 'Excavation, a compacted base and careful fitting all shape how a driveway comes together on site.',
    scenes: [
      { image: '/images/fieldwork-excavation-truck.jpg', alt: 'Illustrative crew and mini excavator preparing a residential driveway', label: 'Excavation and access' },
      { image: '/images/fieldwork-base-compaction.jpg', alt: 'Illustrative crew compacting aggregate for a paver surface', label: 'Base preparation' },
      { image: '/images/fieldwork-paver-cutting.jpg', alt: 'Illustrative installer cutting pavers to fit a driveway edge', label: 'Cuts and edge details' },
    ],
  },
  patio: {
    title: 'A patio takes shape one layer at a time.',
    description: 'Site preparation, material handling and paver placement all contribute to the finished outdoor space.',
    scenes: [
      { image: '/images/fieldwork-paver-setting.jpg', alt: 'Illustrative installer setting pavers by hand on an outdoor patio', label: 'Setting the layout' },
      { image: '/images/fieldwork-base-compaction.jpg', alt: 'Illustrative crew compacting an aggregate base for outdoor paving', label: 'Preparing the base' },
      { image: '/images/fieldwork-paver-cutting.jpg', alt: 'Illustrative worker cutting pavers for a patio border', label: 'Fitting the edges' },
    ],
  },
  wall: {
    title: 'Retaining walls take shape from the ground up.',
    description: 'Excavation, a prepared base and careful block placement are visible parts of building along a slope.',
    scenes: [
      { image: '/images/fieldwork-retaining-wall-crew.jpg', alt: 'Illustrative crew building a segmental retaining wall on a sloped backyard', label: 'Building on the slope' },
      { image: '/images/fieldwork-excavation-truck.jpg', alt: 'Illustrative mini excavator preparing a residential jobsite', label: 'Preparing the site' },
      { image: '/images/fieldwork-retaining-wall.jpg', alt: 'Illustrative retaining wall and finished grade in a wooded backyard', label: 'Shaping the yard' },
    ],
  },
  kitchen: {
    title: 'Masonry and paving meet in an outdoor kitchen.',
    description: 'The masonry island, surrounding surface and work area need to come together as one outdoor space.',
    scenes: [
      { image: '/images/fieldwork-outdoor-kitchen.jpg', alt: 'Illustrative masons installing stone veneer on an outdoor kitchen island', label: 'Building the masonry island' },
      { image: '/images/fieldwork-stone-veneer.jpg', alt: 'Illustrative installers fitting natural stone veneer on an exterior wall', label: 'Fitting stone by hand' },
      { image: '/images/fieldwork-paver-setting.jpg', alt: 'Illustrative worker placing paving beside an outdoor living area', label: 'Connecting the patio' },
    ],
  },
  pool: {
    title: 'Pool deck work is all about the meeting points.',
    description: 'The paving, pool edge and nearby surfaces have to be considered together throughout installation.',
    scenes: [
      { image: '/images/fieldwork-pool-deck.jpg', alt: 'Illustrative crew laying stone pavers beside a residential swimming pool', label: 'Setting poolside stone' },
      { image: '/images/fieldwork-paver-cutting.jpg', alt: 'Illustrative installer cutting paving for a clean edge fit', label: 'Making precise cuts' },
      { image: '/images/fieldwork-base-compaction.jpg', alt: 'Illustrative crew compacting the base before installing pavers', label: 'Preparing the surface' },
    ],
  },
  fire: {
    title: 'Stonework is shaped by fit, support and finish.',
    description: 'From an outdoor kitchen to a fireplace or fire feature, masonry details take form through hands-on work at the property.',
    scenes: [
      { image: '/images/fieldwork-outdoor-kitchen.jpg', alt: 'Illustrative masonry crew fitting stone on an outdoor kitchen island', label: 'Building in masonry' },
      { image: '/images/fieldwork-stone-veneer.jpg', alt: 'Illustrative mason setting natural stone veneer by hand', label: 'Fitting the stone' },
      { image: '/images/fieldwork-retaining-wall-crew.jpg', alt: 'Illustrative masonry crew placing wall blocks on a residential site', label: 'Setting each course' },
    ],
  },
  deck: {
    title: 'Deck construction is hands-on at every stage.',
    description: 'Framing, boards, stairs and railings all contribute to how the deck connects to the home and yard.',
    scenes: [
      { image: '/images/fieldwork-deck-build.jpg', alt: 'Illustrative deck crew installing boards over an exposed frame', label: 'Installing the deck boards' },
      { image: '/images/fieldwork-deck-railings.jpg', alt: 'Illustrative workers fitting deck stairs and railing at a brick home', label: 'Fitting stairs and railings' },
    ],
  },
  veneer: {
    title: 'A stone veneer finish is built piece by piece.',
    description: 'Installers prepare the surface, fit individual stones and work through the corners and edges by hand.',
    scenes: [
      { image: '/images/fieldwork-stone-veneer.jpg', alt: 'Illustrative installer setting stone veneer against an exterior wall', label: 'Setting the stone' },
      { image: '/images/fieldwork-outdoor-kitchen.jpg', alt: 'Illustrative mason fitting stone veneer around an outdoor kitchen island', label: 'Working the details' },
      { image: '/images/fieldwork-paver-cutting.jpg', alt: 'Illustrative worker using a wet saw to cut stone for an outdoor project', label: 'Cutting to fit' },
    ],
  },
  design: {
    title: 'A plan meets the property during construction.',
    description: 'The installed work responds to the grade, existing landscape and how outdoor areas connect on site.',
    scenes: [
      { image: '/images/fieldwork-excavation-truck.jpg', alt: 'Illustrative site preparation with a mini excavator and materials', label: 'Reading the site' },
      { image: '/images/fieldwork-retaining-wall-crew.jpg', alt: 'Illustrative crew building a wall to shape a sloped yard', label: 'Working with the grade' },
      { image: '/images/fieldwork-bright-driveway.jpg', alt: 'Illustrative paver surface at a modern home in daylight', label: 'Connecting outdoor spaces' },
    ],
  },
  hardscape: {
    title: 'Hardscape work is built in coordinated stages.',
    description: 'Earthwork, base preparation and masonry all contribute to the way outdoor areas connect and function.',
    scenes: [
      { image: '/images/fieldwork-excavation-truck.jpg', alt: 'Illustrative residential hardscape site with a service truck and mini excavator', label: 'Opening the work area' },
      { image: '/images/fieldwork-base-compaction.jpg', alt: 'Illustrative paver crew compacting aggregate on site', label: 'Preparing the foundation' },
      { image: '/images/fieldwork-retaining-wall-crew.jpg', alt: 'Illustrative installers building a retaining wall on a backyard slope', label: 'Building the structure' },
    ],
  },
};

interface Props {
  kind: ServiceKind;
}

export const ServiceFieldworkSection: React.FC<Props> = ({ kind }) => {
  const fieldwork = fieldworkByKind[kind];
  const isTwoSceneLayout = fieldwork.scenes.length === 2;

  return (
    <section className="bg-[#20252a] px-5 py-16 text-white sm:px-8 md:py-24" aria-labelledby="service-fieldwork-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-5 md:mb-12 md:grid-cols-[1fr_0.7fr] md:items-end md:gap-12">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#d4bd77]">During the work</p>
            <h2 id="service-fieldwork-heading" className="max-w-2xl font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
              {fieldwork.title}
            </h2>
          </div>
          <div>
            <p className="max-w-xl leading-relaxed text-white/75">{fieldwork.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {fieldwork.scenes.map((scene, index) => (
            <figure
              key={`${kind}-${scene.image}`}
              className={`${index === 0 && !isTwoSceneLayout ? 'col-span-2 md:col-span-1' : ''} group relative min-w-0 overflow-hidden bg-white/5`}
            >
              <Img
                src={scene.image}
                alt={scene.alt}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.025] ${index === 0 ? 'aspect-[16/10]' : 'aspect-[4/3] md:aspect-[16/10]'}`}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-4 pb-4 pt-12 sm:px-5 sm:pb-5">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white sm:text-sm">{scene.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
