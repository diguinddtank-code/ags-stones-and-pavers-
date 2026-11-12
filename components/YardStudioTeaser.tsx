import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Layers, Moon } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { thumbUrl } from '../lib/yardPresets';

// Real stone scans used in the 3D studio, laid out as a tilted "site plan".
const TILES = [
  'herringbone_pavement', 'precast_stone_paving', 'stacked_stone_wall', 'sandstone_blocks_08',
  'slate_floor_02', 'interlocking_concrete_pavers', 'herringbone_brick', 'stone_tiles_02',
  'cobblestone_floor_08', 'mixed_stone_tiles', 'stone_wall_04', 'patterned_paving',
  'red_brick_pavers', 'rectangular_paving', 'cobblestone_square', 'square_concrete_pavers',
];

const PINS = [
  { label: 'Driveway', className: 'left-[8%] top-[22%]' },
  { label: 'Curved patio', className: 'left-[46%] top-[8%]' },
  { label: 'Pool deck', className: 'right-[6%] top-[44%]' },
  { label: 'Fire & kitchen', className: 'left-[20%] bottom-[18%]' },
];

const points = [
  { icon: <Layers size={18} />, text: 'Three design styles for every area: curves, steps, seat walls, pergolas' },
  { icon: <Box size={18} />, text: '20 photo-scanned paver, stone and wall finishes' },
  { icon: <Moon size={18} />, text: 'See it at dusk with landscape lighting switched on' },
];

/** Homepage invitation into the 3D Yard Studio. */
export const YardStudioTeaser: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="relative overflow-hidden bg-brand-dark py-24 text-white md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-[560px] w-[560px] rounded-full bg-brand-gold/15 blur-[160px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p data-reveal className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-gold" /> New · Interactive 3D
          </p>
          <h2 data-split className="font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Design your yard before we break ground.
          </h2>
          <p data-reveal className="mt-6 max-w-lg text-base leading-relaxed text-white/65 md:text-lg">
            Step into a full 3D property, open the driveway, patio, pool deck or fire area, and switch styles and stone in real time.
          </p>
          <ul data-reveal-stagger className="mt-8 space-y-4">
            {points.map((p) => (
              <li key={p.text} className="flex items-start gap-3 text-sm text-white/80">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">{p.icon}</span>
                <span className="pt-2">{p.text}</span>
              </li>
            ))}
          </ul>
          <Link
            data-magnetic
            data-reveal
            to="/design-your-yard"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-brand-gold px-8 py-4 font-bold text-brand-dark transition-colors hover:bg-white"
          >
            Open the 3D Yard Studio
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <Link to="/design-your-yard" aria-label="Open the 3D Yard Studio" className="group relative block aspect-square w-full [perspective:1600px] sm:aspect-[5/4]">
          <div data-parallax="0.12" className="absolute inset-0 flex items-center justify-center">
            <div className="grid w-[78%] grid-cols-4 gap-2 transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] [transform:rotateX(56deg)_rotateZ(-38deg)] group-hover:[transform:rotateX(50deg)_rotateZ(-30deg)_scale(1.04)] sm:gap-3">
              {TILES.map((t, i) => (
                <div
                  key={t}
                  className="aspect-square overflow-hidden rounded-xl shadow-[0_30px_40px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
                  style={{ transform: `translateZ(${(i % 3) * 6}px)` }}
                >
                  <img src={thumbUrl(t)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          {PINS.map((p, i) => (
            <span
              key={p.label}
              data-reveal="scale"
              data-delay={String(0.3 + i * 0.12)}
              className={`absolute ${p.className} flex items-center gap-2 rounded-full border border-white/30 bg-brand-dark/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] shadow-xl backdrop-blur-md sm:text-[11px]`}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-gold opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-gold" />
              </span>
              {p.label}
            </span>
          ))}
        </Link>
      </div>
    </section>
  );
};
