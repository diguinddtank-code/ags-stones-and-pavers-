import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { Img } from './ui/Img';
import { useReveal } from '../lib/useReveal';

type Category = 'driveways' | 'patios' | 'walls' | 'pools' | 'living' | 'field';
type Shape = 'feature' | 'tall' | 'wide' | 'std';

interface Shot {
  src: string;
  title: string;
  cat: Category;
  shape?: Shape;
  /** Shown in the curated "All" view. */
  pick?: boolean;
}

const CATEGORIES: { id: Category | 'all'; label: string; service?: { to: string; label: string } }[] = [
  { id: 'all', label: 'All' },
  { id: 'driveways', label: 'Driveways', service: { to: '/service/driveway-pavers', label: 'Driveway pavers' } },
  { id: 'patios', label: 'Patios', service: { to: '/service/outdoor-patio-builders', label: 'Paver patios' } },
  { id: 'walls', label: 'Retaining walls', service: { to: '/service/retaining-wall-installation', label: 'Retaining walls' } },
  { id: 'pools', label: 'Pool decks', service: { to: '/service/pool-deck-pavers', label: 'Pool decks' } },
  { id: 'living', label: 'Outdoor living', service: { to: '/service/masonry-fireplaces', label: 'Kitchens & fire features' } },
  { id: 'field', label: 'In the field', service: { to: '/about-us', label: 'How we work' } },
];

const SHOTS: Shot[] = [
  { src: '/images/service-hero-driveway.webp', title: 'Paver driveway', cat: 'driveways', shape: 'feature', pick: true },
  { src: '/images/service-hero-patio.webp', title: 'Paver patio', cat: 'patios', shape: 'tall', pick: true },
  { src: 'https://i.imgur.com/vEHS8LGl.webp', title: 'Pool surround and lounge', cat: 'pools', pick: true },
  { src: '/images/fieldwork-paver-setting.jpg', title: 'Setting pavers by hand', cat: 'field', pick: true },
  { src: 'https://i.imgur.com/dZstK86l.webp', title: 'Retaining wall with steps', cat: 'walls', shape: 'wide', pick: true },
  { src: '/images/service-hero-outdoor-kitchen.webp', title: 'Outdoor kitchen', cat: 'living', shape: 'tall', pick: true },
  { src: '/images/home-hero-poster.webp', title: 'Patio steps and stone veneer', cat: 'patios', pick: true },
  { src: 'https://i.imgur.com/G2N5Chsl.webp', title: 'Stone outdoor fireplace', cat: 'living', pick: true },
  { src: '/images/fieldwork-retaining-wall-crew.jpg', title: 'Building on the slope', cat: 'field', shape: 'wide', pick: true },
  { src: '/images/service-hero-pool-deck.webp', title: 'Pool deck pavers', cat: 'pools', pick: true },
  { src: 'https://i.imgur.com/by6FzIkl.webp', title: 'Interlocking paver driveway', cat: 'driveways', pick: true },

  { src: '/images/fieldwork-bright-driveway.jpg', title: 'Driveway install underway', cat: 'driveways', shape: 'wide' },
  { src: 'https://i.imgur.com/SIBIdiFl.webp', title: 'Patio with pergola', cat: 'patios', shape: 'wide' },
  { src: '/images/service-hero-retaining-wall.webp', title: 'Retaining wall', cat: 'walls', shape: 'tall' },
  { src: '/images/fieldwork-retaining-wall.jpg', title: 'Wall and finished grade', cat: 'walls' },
  { src: '/images/fieldwork-pool-deck.jpg', title: 'Setting poolside stone', cat: 'pools', shape: 'wide' },
  { src: '/images/service-hero-stone-veneer.webp', title: 'Stone veneer', cat: 'living' },
  { src: '/images/service-hero-deck.webp', title: 'Deck and patio', cat: 'living' },
  { src: 'https://i.imgur.com/6f4H9fLl.webp', title: 'Deck living space', cat: 'living' },
  { src: '/images/service-hero-landscape-design.webp', title: 'Landscape and hardscape', cat: 'living', shape: 'wide' },
  { src: '/images/fieldwork-excavation-truck.jpg', title: 'Excavation and access', cat: 'field', shape: 'tall' },
  { src: '/images/fieldwork-base-compaction.jpg', title: 'Compacting the base', cat: 'field' },
  { src: '/images/fieldwork-paver-cutting.jpg', title: 'Cutting pavers to fit', cat: 'field' },
  { src: '/images/fieldwork-outdoor-kitchen.jpg', title: 'Building a masonry island', cat: 'field' },
  { src: '/images/fieldwork-stone-veneer.jpg', title: 'Fitting stone veneer by hand', cat: 'field' },
  { src: '/images/fieldwork-deck-build.jpg', title: 'Installing deck boards', cat: 'field' },
];

const SHAPE_CLASS: Record<Shape, string> = {
  feature: 'col-span-2 row-span-2',
  tall: 'row-span-2',
  wide: 'col-span-2',
  std: '',
};

const catLabel = (c: Category) => CATEGORIES.find((x) => x.id === c)?.label ?? '';

export const ProjectGallery: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [open, setOpen] = useState<number | null>(null);

  const shots = useMemo(
    () => (filter === 'all' ? SHOTS.filter((s) => s.pick) : SHOTS.filter((s) => s.cat === filter)),
    [filter]
  );
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: SHOTS.length };
    SHOTS.forEach((s) => (c[s.cat] = (c[s.cat] || 0) + 1));
    return c;
  }, []);

  return (
    <section ref={ref} id="portfolio" className="scroll-mt-20 bg-[#f7f6f3] py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 grid gap-8 md:mb-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <p data-reveal className="eyebrow mb-3 flex items-center gap-3 text-[#a8661f]">
              <span data-draw="x" className="block h-px w-10 origin-left bg-[#a8661f]" /> Gallery
            </p>
            <h2 data-split className="font-display text-5xl font-bold uppercase leading-[0.95] text-[#1c2024] md:text-6xl">
              Find the look. We&rsquo;ll build it for your yard.
            </h2>
            <p data-reveal className="mt-4 leading-relaxed text-slate-600">
              Browse driveway, patio, wall and outdoor living styles, plus a look at how the work gets done. Bring the photos you like to your estimate.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div data-reveal className="-mx-5 mb-8 overflow-x-auto px-5 no-scrollbar sm:mx-0 sm:px-0">
          <div role="tablist" aria-label="Filter gallery" className="flex w-max gap-2">
            {CATEGORIES.map((c) => {
              const active = filter === c.id;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(c.id)}
                  className={`relative whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                    active ? 'text-white' : 'text-[#1c2024] hover:bg-black/5'
                  }`}
                >
                  {active && (
                    <motion.span layoutId="gallery-pill" className="absolute inset-0 rounded-full bg-[#1c2024]" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />
                  )}
                  <span className="relative">
                    {c.label}
                    <span className={`ml-1.5 text-[11px] ${active ? 'text-brand-gold' : 'text-slate-400'}`}>{counts[c.id]}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento grid */}
        <motion.ul layout className="grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:grid-cols-4 md:gap-4 lg:auto-rows-[220px]">
          <AnimatePresence mode="popLayout" initial={false}>
            {shots.map((s, i) => (
              <motion.li
                layout
                key={s.src}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={SHAPE_CLASS[s.shape ?? 'std']}
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group relative block h-full w-full overflow-hidden rounded-2xl bg-[#ddd9d1] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold md:rounded-[20px]"
                  aria-label={`Open photo: ${s.title}`}
                >
                  <Img
                    src={s.src}
                    alt={s.title}
                    sizes={s.shape === 'feature' || s.shape === 'wide' ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.07]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 md:p-4">
                    <span className="min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-brand-gold">{catLabel(s.cat)}</span>
                      <span className={`mt-0.5 block font-serif leading-tight text-white ${s.shape === 'feature' ? 'text-xl md:text-3xl' : 'text-sm md:text-lg'}`}>{s.title}</span>
                    </span>
                    <span className="hidden h-9 w-9 shrink-0 translate-y-2 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:flex">
                      <Expand size={15} />
                    </span>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-black/10 pt-8 sm:flex-row">
          <p className="max-w-md text-center text-sm text-slate-500 sm:text-left">
            Photos show styles and stages of hardscape work. Final materials and layout depend on your site and goals.
          </p>
          <Link data-magnetic to="/quote" className="group inline-flex items-center gap-2 rounded-md bg-brand-gold px-7 py-4 font-display text-lg font-bold uppercase tracking-wide text-brand-dark transition-colors hover:bg-brand-goldHover">
            Price out a project like this <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox shots={shots} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
};

const Lightbox: React.FC<{ shots: Shot[]; index: number; onIndex: (i: number) => void; onClose: () => void }> = ({ shots, index, onIndex, onClose }) => {
  const shot = shots[index];
  const service = CATEGORIES.find((c) => c.id === shot.cat)?.service;
  const touchX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const go = useCallback((d: number) => onIndex((index + d + shots.length) % shots.length), [index, shots.length, onIndex]);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={shot.title}
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex flex-col bg-[#0b0c0f]/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-4 text-white md:px-8" onClick={(e) => e.stopPropagation()}>
        <span className="text-xs font-semibold tracking-[0.2em] text-white/60">
          {String(index + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}
        </span>
        <button ref={closeRef} onClick={onClose} aria-label="Close gallery" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
          <X size={20} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
        <img key={shot.src} src={shot.src.startsWith('/images/') ? shot.src.replace(/^\/images\/([^/]+)\.(?:jpe?g|webp)$/i, '/images/opt/$1-1680.webp') : shot.src.replace(/l\.webp$/, 'h.webp')} alt={shot.title} className="lb-in max-h-full max-w-full rounded-xl object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
        <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous photo" className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-gold hover:text-brand-dark md:left-8 md:flex">
          <ChevronLeft size={22} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next photo" className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-gold hover:text-brand-dark md:right-8 md:flex">
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 px-4 pb-8 pt-5 text-center text-white sm:flex-row sm:justify-between sm:px-8 sm:text-left" onClick={(e) => e.stopPropagation()}>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">{catLabel(shot.cat)}</p>
          <p className="mt-1 font-serif text-2xl">{shot.title}</p>
        </div>
        <div className="flex gap-2">
          {service && (
            <Link to={service.to} onClick={onClose} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold transition-colors hover:border-brand-gold hover:text-brand-gold">
              {service.label} <ArrowUpRight size={15} />
            </Link>
          )}
          <Link to="/quote" onClick={onClose} className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold px-5 py-3 text-sm font-bold text-brand-dark transition-colors hover:bg-white">
            Free estimate <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
