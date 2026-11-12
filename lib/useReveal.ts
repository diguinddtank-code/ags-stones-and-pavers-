import { RefObject } from 'react';
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK } from './motion';

/**
 * Declarative scroll motion for a section. Mark elements inside `scope` with:
 *
 *   data-split              heading: words rise out of a mask
 *   data-reveal             fade + rise (value: "up" | "left" | "right" | "scale" | "fade")
 *   data-reveal-stagger     direct children reveal one after another
 *   data-clip               image wrapper: wipes open while the image settles from zoom
 *   data-parallax="0.12"    drifts on scroll (fraction of its height; negative = opposite)
 *   data-draw="x" | "y"     line grows with scroll progress through the scope
 *   data-magnetic           pulls toward the pointer (fine pointers only)
 *
 * Everything is skipped for prefers-reduced-motion, and content stays visible
 * if JavaScript never runs (initial states are applied by GSAP, not CSS).
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        q('[data-split]').forEach((el: HTMLElement) => {
          SplitText.create(el, {
            type: 'words',
            mask: 'words',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.words, {
                yPercent: 110,
                duration: 1.1,
                ease: 'expo.out',
                stagger: 0.06,
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              }),
          });
        });

        const offsets: Record<string, gsap.TweenVars> = {
          up: { y: 56 },
          left: { x: -64 },
          right: { x: 64 },
          scale: { scale: 0.92, y: 24 },
          fade: {},
        };
        q('[data-reveal]').forEach((el: HTMLElement) => {
          const from = offsets[el.dataset.reveal || 'up'] ?? offsets.up;
          gsap.from(el, {
            ...from,
            autoAlpha: 0,
            duration: 1.1,
            ease: 'expo.out',
            delay: Number(el.dataset.delay || 0),
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          });
        });

        q('[data-reveal-stagger]').forEach((group: HTMLElement) => {
          gsap.from(group.children, {
            y: 40,
            autoAlpha: 0,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: 'top 88%', once: true },
          });
        });

        q('[data-clip]').forEach((wrap: HTMLElement) => {
          const img = wrap.querySelector('img');
          const tl = gsap.timeline({ scrollTrigger: { trigger: wrap, start: 'top 85%', once: true } });
          tl.fromTo(
            wrap,
            { clipPath: 'inset(18% 12% 18% 12%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' }
          );
          if (img) tl.from(img, { scale: 1.3, duration: 1.8, ease: 'expo.out' }, 0);
        });

        q('[data-parallax]').forEach((el: HTMLElement) => {
          const amount = Number(el.dataset.parallax || 0.12) * 100;
          gsap.fromTo(
            el,
            { yPercent: -amount / 2 },
            {
              yPercent: amount / 2,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true },
            }
          );
        });

        q('[data-draw]').forEach((el: HTMLElement) => {
          const axis = el.dataset.draw === 'x' ? 'scaleX' : 'scaleY';
          gsap.fromTo(
            el,
            { [axis]: 0 },
            {
              [axis]: 1,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement || el, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
            }
          );
        });
      });

      mm.add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
        const cleanups = q('[data-magnetic]').map((el: HTMLElement) => {
          const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
          const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          el.addEventListener('pointermove', move);
          el.addEventListener('pointerleave', leave);
          return () => {
            el.removeEventListener('pointermove', move);
            el.removeEventListener('pointerleave', leave);
          };
        });
        return () => cleanups.forEach((fn) => fn());
      });

      ScrollTrigger.refresh();
    },
    { scope }
  );
}
