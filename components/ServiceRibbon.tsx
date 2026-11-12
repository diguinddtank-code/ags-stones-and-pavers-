import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '../lib/motion';

const items = [
  { label: 'Driveway Pavers', to: '/service/driveway-pavers' },
  { label: 'Paver Patios', to: '/service/outdoor-patio-builders' },
  { label: 'Retaining Walls', to: '/service/retaining-wall-installation' },
  { label: 'Pool Decks', to: '/service/pool-deck-pavers' },
  { label: 'Outdoor Kitchens', to: '/service/masonry-fireplaces' },
  { label: 'Stone Veneer', to: '/service/stone-veneer' },
  { label: 'Fire Features', to: '/service/masonry-fireplaces' },
];

const Star = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-brand-gold md:h-7 md:w-7">
    <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0z" />
  </svg>
);

/** Infinite, scroll-reactive ribbon of services between the hero and the intro. */
export const ServiceRibbon: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const skew = gsap.quickTo('[data-ribbon]', 'skewX', { duration: 0.6, ease: 'power3' });
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => skew(gsap.utils.clamp(-8, 8, self.getVelocity() / -300)),
          onLeave: () => skew(0),
          onLeaveBack: () => skew(0),
        });
      });
    },
    { scope: root }
  );

  const row = (copy: number) => (
    <ul className="flex shrink-0 items-center" aria-hidden={copy > 0 || undefined}>
      {items.map((item, i) => (
        <li key={`${copy}-${item.label}`} className="flex items-center gap-6 px-6 md:gap-10 md:px-10">
          <Link
            to={item.to}
            tabIndex={copy > 0 ? -1 : undefined}
            className={`whitespace-nowrap font-serif text-4xl italic leading-none transition-colors duration-300 hover:text-brand-gold md:text-7xl ${
              i % 2 ? 'text-outline text-white/70' : 'text-white'
            }`}
          >
            {item.label}
          </Link>
          <Star />
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={root} className="relative overflow-hidden border-y border-white/10 bg-brand-dark py-7 md:py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-dark to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-brand-dark to-transparent md:w-40" />
      <nav aria-label="Hardscape services" data-ribbon className="will-change-transform">
        <div className="ribbon-track flex w-max hover:[animation-play-state:paused]">
          {row(0)}
          {row(1)}
        </div>
      </nav>
    </div>
  );
};
