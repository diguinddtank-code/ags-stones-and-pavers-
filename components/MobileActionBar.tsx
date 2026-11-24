import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { BUSINESS } from '../lib/business';

const HIDDEN_ON = ['/quote', '/design-your-yard'];

/**
 * Phone-only call / quote bar, on every page. Slides in after the first screen and
 * steps aside while a lead form or the footer is on screen, so it never covers a form.
 * Call clicks are tracked by the global tel: listener in <App />.
 */
export const MobileActionBar: React.FC = () => {
  const { pathname } = useLocation();
  const [pastFold, setPastFold] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setPastFold(window.scrollY > window.innerHeight * 0.75);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Forms and the footer mount lazily, so re-scan for them for a while.
    const seen = new Set<Element>();
    const onScreen = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? onScreen.add(e.target) : onScreen.delete(e.target)));
        setBlocked(onScreen.size > 0);
      },
      { rootMargin: '0px 0px -15% 0px' }
    );
    const scan = () =>
      document.querySelectorAll('#contact, [data-lead-form], footer').forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el);
          io.observe(el);
        }
      });
    scan();
    const poll = window.setInterval(scan, 1200);
    const stop = window.setTimeout(() => window.clearInterval(poll), 15000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
      window.clearInterval(poll);
      window.clearTimeout(stop);
      io.disconnect();
      setBlocked(false);
    };
  }, [pathname]);

  if (HIDDEN_ON.includes(pathname)) return null;
  const visible = pastFold && !blocked;

  return (
    <div
      className={`action-bar fixed inset-x-3 bottom-3 z-40 md:hidden ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[140%] opacity-0'}`}
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-brand-dark/95 p-2 shadow-[0_18px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <a
          href={BUSINESS.phoneHref}
          tabIndex={visible ? undefined : -1}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 py-3.5 font-display text-[15px] font-bold uppercase tracking-wide text-white transition-transform active:scale-95"
        >
          <Phone size={16} className="text-brand-gold" /> Call now
        </a>
        <Link
          to="/quote"
          tabIndex={visible ? undefined : -1}
          className="flex flex-[1.3] items-center justify-center gap-2 rounded-lg bg-brand-gold py-3.5 font-display text-[15px] font-bold uppercase tracking-wide text-brand-dark transition-transform active:scale-95"
        >
          Free estimate <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
