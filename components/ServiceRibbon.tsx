import React from 'react';
import { siFacebook, siHouzz, siInstagram, siNextdoor, siThumbtack, siYelp } from 'simple-icons';
import { activePlatforms, Platform } from '../lib/business';

/*
 * Platform logos in their real brand colors. Glyph paths come from Simple Icons
 * (CC0); the Google "G" is drawn with its four official colors. Brand names and
 * logos belong to their owners.
 */
const ICON = 'h-7 w-7 shrink-0 md:h-8 md:w-8';

const GoogleG = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" className={ICON}>
    <path fill="#FBBC05" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
    <path fill="#EA4335" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#34A853" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#4285F4" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
  </svg>
);

/** Brand-colored glyph; `knockout` paints white under circular marks so their cut-out letter shows white. */
const Glyph: React.FC<{ path: string; fill: string; knockout?: boolean; viewBox?: string; className?: string }> = ({
  path,
  fill,
  knockout,
  viewBox = '0 0 24 24',
  className = ICON,
}) => (
  <svg viewBox={viewBox} aria-hidden="true" className={className}>
    {knockout && <circle cx="12" cy="12" r="10.5" fill="#fff" />}
    <path d={path} fill={fill} />
  </svg>
);

const LOGOS: Record<Platform['id'], { mark: React.ReactNode; showName: boolean }> = {
  google: { mark: <GoogleG />, showName: true },
  yelp: { mark: <Glyph path={siYelp.path} fill="#FF1A1A" />, showName: true },
  nextdoor: {
    mark: <Glyph path={siNextdoor.path} fill="#8ED500" viewBox="0 10 24 4" className="h-5 w-auto shrink-0 md:h-6" />,
    showName: false, // the Nextdoor logo is its wordmark
  },
  thumbtack: { mark: <Glyph path={siThumbtack.path} fill="#009FD9" knockout />, showName: true },
  houzz: { mark: <Glyph path={siHouzz.path} fill="#4DBC15" />, showName: true },
  facebook: { mark: <Glyph path={siFacebook.path} fill="#0866FF" knockout />, showName: true },
  instagram: { mark: <Glyph path={siInstagram.path} fill="url(#ags-ig-gradient)" />, showName: true },
};

/** Slim logo strip under the hero: the platforms where the business is listed (lib/business.ts → PLATFORMS). */
export const ServiceRibbon: React.FC = () => {
  const platforms = activePlatforms();
  if (platforms.length === 0) return null;

  // Each half of the loop must be wider than the screen for a seamless marquee.
  const half: Platform[] = [];
  while (half.length < 10) half.push(...platforms);

  const row = (copy: number) => (
    <ul className="flex shrink-0 items-center" aria-hidden={copy > 0 || undefined}>
      {half.map((p, i) => {
        const logo = LOGOS[p.id];
        const decorative = copy > 0 || i >= platforms.length;
        const content = (
          <>
            {logo.mark}
            {logo.showName ? (
              <span className="whitespace-nowrap font-display text-xl font-bold uppercase tracking-wide md:text-2xl">{p.name}</span>
            ) : (
              <span className="sr-only">{p.name}</span>
            )}
          </>
        );
        const cls = 'flex items-center gap-3 px-8 py-1 text-white transition-transform duration-300 hover:scale-105 md:px-12';
        return (
          <li key={`${copy}-${i}`} className="flex items-center">
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer" tabIndex={decorative ? -1 : undefined} aria-label={decorative ? undefined : `AGS Stones and Pavers on ${p.name}`} className={cls}>
                {content}
              </a>
            ) : (
              <span className={cls}>{content}</span>
            )}
            <span aria-hidden="true" className="h-6 w-px bg-white/15" />
          </li>
        );
      })}
    </ul>
  );

  return (
    <section aria-label="Platforms where AGS Stones and Pavers is listed" className="relative overflow-hidden border-y border-white/10 bg-brand-dark py-3.5 md:py-4">
      {/* Instagram's official gradient, shared by every Instagram mark in the strip */}
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <defs>
          <radialGradient id="ags-ig-gradient" cx="0.3" cy="1.07" r="1.2">
            <stop offset="0" stopColor="#FFDC80" />
            <stop offset="0.25" stopColor="#FCAF45" />
            <stop offset="0.45" stopColor="#F77737" />
            <stop offset="0.6" stopColor="#E1306C" />
            <stop offset="0.8" stopColor="#C13584" />
            <stop offset="1" stopColor="#833AB4" />
          </radialGradient>
        </defs>
      </svg>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-brand-dark to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-brand-dark to-transparent md:w-32" />
      <div className="ribbon-track flex w-max hover:[animation-play-state:paused]">
        {row(0)}
        {row(1)}
      </div>
    </section>
  );
};
