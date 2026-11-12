import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * App-wide motion plumbing, loaded after first paint so it never delays the hero:
 *  - Lenis inertial scrolling on desktop (native scrolling on touch devices)
 *  - keeps ScrollTrigger in sync with Lenis and with late layout changes
 *    (lazy sections mounting, images decoding)
 *  - resets scroll on route change, honouring #hash links
 */
let lenisRef: { scrollTo: (t: number | string | HTMLElement, o?: object) => void } | null = null;

export const MotionShell: React.FC = () => {
  const { pathname, hash } = useLocation();
  const firstRoute = useRef(true);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    const start = async () => {
      const [{ gsap, ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import('../../lib/motion'),
        import('lenis'),
      ]);
      if (disposed) return;

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

      let lenis: InstanceType<typeof Lenis> | null = null;
      let tick: ((time: number) => void) | null = null;
      if (!reduce && finePointer) {
        document.documentElement.style.scrollBehavior = 'auto';
        lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -96 } });
        lenis.on('scroll', ScrollTrigger.update);
        tick = (time: number) => lenis!.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        lenisRef = lenis;
      }

      // Lazy sections and images change page height after triggers were measured.
      let t: number | undefined;
      const ro = new ResizeObserver(() => {
        window.clearTimeout(t);
        t = window.setTimeout(() => ScrollTrigger.refresh(), 200);
      });
      ro.observe(document.body);

      cleanup = () => {
        ro.disconnect();
        window.clearTimeout(t);
        if (tick) gsap.ticker.remove(tick);
        lenis?.destroy();
        lenisRef = null;
      };
    };

    const idle = (window as any).requestIdleCallback as ((cb: () => void, o?: object) => number) | undefined;
    const handle = idle ? idle(() => void start(), { timeout: 1500 }) : window.setTimeout(() => void start(), 300);

    return () => {
      disposed = true;
      if (idle) (window as any).cancelIdleCallback?.(handle);
      else window.clearTimeout(handle);
      cleanup();
    };
  }, []);

  useEffect(() => {
    // Leave the browser's own restore / #hash jump alone on the initial load.
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        if (lenisRef) lenisRef.scrollTo(target, { offset: -96 });
        else target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (lenisRef) lenisRef.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};
