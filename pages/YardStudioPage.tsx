import React, { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Layers, MousePointerClick } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { BUSINESS } from '../lib/business';

// three.js + the scene are only fetched in the browser, on this page.
const YardStudio = React.lazy(() => import('../components/yard/YardStudio'));

const StudioPlaceholder = () => (
  <div className="grid gap-5 lg:grid-cols-[1fr_380px]" aria-hidden="true">
    <div className="relative flex h-[62svh] min-h-[440px] items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#1b1f25] to-[#262b31] lg:h-[78svh] lg:min-h-[620px]">
      <div className="flex flex-col items-center gap-4 text-white/60">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-brand-gold" />
        <span className="text-xs font-bold uppercase tracking-[0.2em]">Loading the 3D yard</span>
      </div>
    </div>
    <div className="hidden rounded-[28px] border border-white/10 bg-white/[0.04] lg:block" />
  </div>
);

const steps = [
  { icon: <MousePointerClick size={20} />, title: 'Pick an area', text: 'Driveway, walkway, patio, pool deck, fire pit lounge or retaining wall.' },
  { icon: <Layers size={20} />, title: 'Try finishes', text: 'Switch between paver patterns, natural stone and wall blocks in real time.' },
  { icon: <Box size={20} />, title: 'Bring it to us', text: 'Share the look you like and we will plan it around your real property.' },
];

export const YardStudioPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-brand-dark font-sans text-white">
      <SEO
        title="3D Yard Studio | Try Paver & Stone Finishes | AGS Stones and Pavers"
        description="Explore a 3D backyard and try driveway pavers, patio stone, pool deck finishes and retaining wall blocks in real time. Then plan your project with AGS Stones and Pavers."
        canonicalPath="/design-your-yard"
        breadcrumbs={[{ name: '3D Yard Studio', path: '/design-your-yard' }]}
      />
      <Header />

      <main className="flex-grow">
        <section className="relative overflow-hidden px-4 pb-10 pt-32 sm:px-8 md:pt-40">
          <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-brand-gold/15 blur-[150px]" />
          <div className="relative mx-auto max-w-[1400px]">
            <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <div>
                <p className="hero-in mb-4 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" /> Interactive 3D
                </p>
                <h1 className="font-serif text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
                  <span className="hero-mask"><span className="hero-word" style={{ '--d': '0.1s' } as React.CSSProperties}>Design</span></span>{' '}
                  <span className="hero-mask"><span className="hero-word" style={{ '--d': '0.17s' } as React.CSSProperties}>your</span></span>{' '}
                  <span className="hero-mask"><span className="hero-word italic text-brand-gold" style={{ '--d': '0.24s' } as React.CSSProperties}>yard</span></span>{' '}
                  <span className="hero-mask"><span className="hero-word" style={{ '--d': '0.31s' } as React.CSSProperties}>in 3D.</span></span>
                </h1>
              </div>
              <p className="hero-in max-w-md text-base leading-relaxed text-white/65 lg:justify-self-end" style={{ '--d': '0.4s' } as React.CSSProperties}>
                Click any part of the property to zoom in, then switch between paver patterns, natural stone and wall
                finishes. A quick way to picture the look before we walk your site.
              </p>
            </div>

            {mounted ? (
              <Suspense fallback={<StudioPlaceholder />}>
                <YardStudio />
              </Suspense>
            ) : (
              <StudioPlaceholder />
            )}
          </div>
        </section>

        <section className="px-4 py-20 sm:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">From a sample yard to your property.</h2>
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">{s.icon}</span>
                    <span className="font-serif text-4xl text-white/15">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 font-serif text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <Link to="/quote" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-7 py-4 font-semibold text-brand-dark transition-colors hover:bg-white">
                Request a free estimate <ArrowRight size={17} />
              </Link>
              <a href={BUSINESS.phoneHref} className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 font-semibold transition-colors hover:border-brand-gold hover:text-brand-gold">
                Call {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
