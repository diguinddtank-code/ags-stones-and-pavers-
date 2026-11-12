import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Automatic scroll motion for every page except the home (which is choreographed
 * by hand with data-* attributes). Rendered inside the same <Suspense> as <Routes>,
 * so its effect runs once the lazy page has committed to the DOM.
 *
 * Only content that starts below the first screen is animated, so nothing that
 * was already painted from the prerendered HTML disappears and pops back in.
 * Elements owned by framer-motion (inline opacity/transform styles) are skipped,
 * as is anything inside [data-no-motion].
 */
export const RouteMotion: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let revert = () => {};
    let cancelled = false;

    import('../../lib/motion').then(({ gsap, ScrollTrigger, SplitText }) => {
      const main = document.querySelector('main');
      if (cancelled || !main) return;

      const fold = window.innerHeight * 0.92;
      const belowFold = (el: Element) => el.getBoundingClientRect().top > fold;
      const free = (el: Element) =>
        !el.closest('[data-no-motion], header, footer, form, [style*="opacity"], [style*="transform"]');
      const usable = (el: Element) => belowFold(el) && free(el);

      const ctx = gsap.context(() => {
        const claimed = new Set<Element>();

        // 1. Card grids and lists: children rise in a wave as they enter.
        main.querySelectorAll<HTMLElement>('[class*="grid-cols"], ul, ol').forEach((group) => {
          const kids = Array.from(group.children).filter(
            (c) => c instanceof HTMLElement && c.offsetHeight > 40
          ) as HTMLElement[];
          if (kids.length < 3 || kids.length > 40 || !usable(group)) return;
          if (kids.some((k) => claimed.has(k) || [...claimed].some((c) => c.contains(k)))) return;
          kids.forEach((k) => claimed.add(k));
          gsap.set(kids, { autoAlpha: 0, y: 48 });
          ScrollTrigger.batch(kids, {
            start: 'top 92%',
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
          });
        });
        const inClaimed = (el: Element) => [...claimed].some((c) => c.contains(el));

        // 2. Section headings: words rise out of a mask.
        main.querySelectorAll<HTMLElement>('h2').forEach((h) => {
          if (!usable(h) || inClaimed(h)) return;
          SplitText.create(h, {
            type: 'words',
            mask: 'words',
            onSplit: (self) =>
              gsap.from(self.words, {
                yPercent: 110,
                duration: 1.05,
                ease: 'expo.out',
                stagger: 0.05,
                scrollTrigger: { trigger: h, start: 'top 88%', once: true },
              }),
          });
          // Eyebrow above and the intro paragraph below the heading follow it.
          const companions = [h.previousElementSibling, h.nextElementSibling].filter(
            (el): el is HTMLElement => el instanceof HTMLParagraphElement && !inClaimed(el) && free(el)
          );
          if (companions.length) {
            gsap.from(companions, {
              y: 24,
              autoAlpha: 0,
              duration: 1,
              ease: 'expo.out',
              delay: 0.15,
              scrollTrigger: { trigger: h, start: 'top 88%', once: true },
            });
          }
        });

        // 3. Photos settle from a slight zoom inside their frame.
        main.querySelectorAll<HTMLImageElement>('img').forEach((img) => {
          if (!usable(img) || inClaimed(img) || img.width < 160) return;
          const frame = img.parentElement;
          const clipped = frame && getComputedStyle(frame).overflow === 'hidden';
          gsap.from(img, {
            scale: clipped ? 1.18 : 1,
            autoAlpha: 0,
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: { trigger: frame || img, start: 'top 90%', once: true },
          });
        });
      }, main);

      ScrollTrigger.refresh();
      revert = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      revert();
    };
  }, [pathname]);

  return null;
};
