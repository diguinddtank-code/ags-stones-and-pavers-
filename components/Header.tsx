import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ShieldCheck, Clock, MapPin, ArrowRight } from 'lucide-react';
import { BUSINESS } from '../lib/business';

interface HeaderProps {
  isHidden?: boolean;
  forceSolid?: boolean;
}

const navLinks = [
  { name: 'Services', href: '/services', isRoute: true },
  { name: 'Gallery', href: '/#portfolio', isRoute: false },
  { name: 'Service Areas', href: '/service-areas', isRoute: true },
  { name: 'About', href: '/about-us', isRoute: true },
  { name: '3D Studio', href: '/design-your-yard', isRoute: true },
  { name: 'Blog', href: '/blog', isRoute: true },
];

export const Header: React.FC<HeaderProps> = ({ isHidden = false, forceSolid = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTucked, setIsTucked] = useState(false);
  const location = useLocation();
  const progressRef = useRef<HTMLSpanElement>(null);

  // One rAF-throttled passive listener: solid state, hide-on-scroll-down /
  // show-on-scroll-up, and the reading-progress line (written straight to the DOM).
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setIsScrolled(y > 50);
      if (Math.abs(y - lastY) > 6) {
        setIsTucked(y > lastY && y > 480);
        lastY = y;
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const solid = forceSolid || isScrolled || isMobileMenuOpen;
  const linkTone = solid ? 'text-brand-dark' : 'text-white';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isHidden ? '-translate-y-full pointer-events-none' : isTucked && !isMobileMenuOpen ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Trust bar: collapses once the page scrolls */}
      <div
        className={`hidden overflow-hidden bg-brand-dark text-white/80 transition-[max-height,opacity] duration-500 lg:block ${
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
        }`}
      >
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-8 text-[12px] font-medium">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-brand-gold" /> Licensed &amp; insured paver contractor</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-brand-gold" /> Duluth, GA · Serving Metro Atlanta</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-brand-gold" /> {BUSINESS.hours.display}</span>
            <a href={BUSINESS.phoneHref} className="font-bold text-white transition-colors hover:text-brand-gold">{BUSINESS.phoneDisplay}</a>
          </div>
        </div>
      </div>

      <div
        className={`relative transition-[background-color,box-shadow,padding] duration-500 ${
          solid ? 'bg-white/95 py-2.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl' : 'bg-gradient-to-b from-black/50 to-transparent py-4'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="/" className="z-50 flex shrink-0 items-center" aria-label={`${BUSINESS.name} home`}>
            <img
              src="https://i.imgur.com/DkMxLum.png"
              alt="AGS Stones and Pavers"
              width={120}
              height={48}
              className={`h-10 w-auto object-contain transition-all duration-300 md:h-12 ${solid ? 'brightness-0' : 'brightness-0 invert'}`}
            />
          </a>

          <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Main">
            {navLinks.map((link) => {
              const cls = `group relative font-display text-[15px] font-semibold uppercase tracking-[0.06em] transition-colors hover:text-brand-gold ${linkTone}`;
              const inner = (
                <>
                  {link.name}
                  <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-brand-gold transition-all duration-300 group-hover:w-full" />
                </>
              );
              return link.isRoute ? (
                <Link key={link.name} to={link.href} className={cls}>{inner}</Link>
              ) : (
                <a key={link.name} href={link.href} className={cls}>{inner}</a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <a href={BUSINESS.phoneHref} className={`flex items-center gap-2.5 transition-colors ${linkTone} hover:text-brand-gold`}>
              <span className={`flex h-10 w-10 items-center justify-center rounded-full ${solid ? 'bg-brand-dark text-brand-gold' : 'bg-white/15 text-white backdrop-blur-md'}`}>
                <Phone size={17} />
              </span>
              <span className="leading-tight">
                <span className={`block text-[10px] font-bold uppercase tracking-[0.14em] ${solid ? 'text-slate-500' : 'text-white/70'}`}>Free estimates</span>
                <span className="block font-display text-xl font-bold">{BUSINESS.phoneDisplay}</span>
              </span>
            </a>
            <Link
              to="/quote"
              className="group inline-flex items-center gap-2 rounded-md bg-brand-gold px-5 py-3 font-display text-[15px] font-bold uppercase tracking-[0.06em] text-brand-dark shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5 hover:bg-brand-goldHover"
            >
              Get a Quote <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={BUSINESS.phoneHref}
              className="flex items-center gap-1.5 rounded-full bg-brand-gold px-3.5 py-2 font-display text-sm font-bold uppercase tracking-wide text-brand-dark shadow-md"
              aria-label={`Call ${BUSINESS.phoneDisplay}`}
            >
              <Phone size={15} /> Call
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`rounded-md p-2 transition-colors ${linkTone}`}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Tablet: phone + menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`hidden rounded-md p-2 md:block lg:hidden ${linkTone}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 bottom-0 h-[2px] transition-opacity duration-300 ${solid ? 'opacity-100' : 'opacity-0'}`}>
          <span ref={progressRef} className="block h-full origin-left scale-x-0 bg-brand-gold" />
        </span>

        {/* Mobile / tablet menu */}
        <div
          className={`absolute left-0 top-full w-full origin-top overflow-hidden border-t border-gray-100 bg-white shadow-2xl transition-all duration-300 lg:hidden ${
            isMobileMenuOpen ? 'max-h-[720px] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col px-6 pb-8 pt-4">
            {[...navLinks, { name: 'Contact', href: '/quote', isRoute: true }].map((link) =>
              link.isRoute ? (
                <Link key={link.name} to={link.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between border-b border-gray-100 py-3.5 font-display text-lg font-semibold uppercase tracking-wide text-brand-dark">
                  {link.name} <ArrowRight size={16} className="text-brand-gold" />
                </Link>
              ) : (
                <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between border-b border-gray-100 py-3.5 font-display text-lg font-semibold uppercase tracking-wide text-brand-dark">
                  {link.name} <ArrowRight size={16} className="text-brand-gold" />
                </a>
              )
            )}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <a href={BUSINESS.phoneHref} className="flex items-center justify-center gap-2 rounded-md bg-brand-dark py-4 font-display font-bold uppercase tracking-wide text-white">
                <Phone size={16} className="text-brand-gold" /> Call now
              </a>
              <Link to="/quote" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 rounded-md bg-brand-gold py-4 font-display font-bold uppercase tracking-wide text-brand-dark">
                Free quote
              </Link>
            </div>
            <p className="mt-4 text-center text-xs text-slate-500">{BUSINESS.hours.display} · Licensed &amp; insured</p>
          </div>
        </div>
      </div>
    </header>
  );
};
