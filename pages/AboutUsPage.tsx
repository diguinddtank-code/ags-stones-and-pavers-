import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';

const fieldScenes = [
  {
    image: '/images/fieldwork-excavation-truck.jpg',
    alt: 'Illustrative driveway excavation with a mini excavator, service truck and paver materials',
    label: 'Prepare the site',
    detail: 'Remove old material, check access and understand the grade before the new work begins.',
  },
  {
    image: '/images/fieldwork-base-compaction.jpg',
    alt: 'Illustrative paver crew compacting aggregate and checking the patio grade',
    label: 'Build the base',
    detail: 'Shape and compact the foundation so the finished surface has a stable base.',
  },
  {
    image: '/images/fieldwork-paver-setting.jpg',
    alt: 'Illustrative close view of an installer setting pavers by hand',
    label: 'Set each paver',
    detail: 'Fit the pattern, edges and transitions to the space and the surrounding surfaces.',
  },
];

export const AboutUsPage: React.FC = () => {
  const [activeScene, setActiveScene] = useState(0);
  const [isScenePaused, setIsScenePaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || isScenePaused) return;

    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setActiveScene((current) => (current + 1) % fieldScenes.length);
      }
    }, 5500);

    return () => window.clearInterval(timer);
  }, [activeScene, isScenePaused, reduceMotion]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-brand-dark antialiased">
      <SEO
        title="About AGS Stones and Pavers | Duluth, GA"
        description="Learn how AGS Stones and Pavers approaches paver driveways, patios and retaining walls for homeowners in Duluth and across Metro Atlanta."
        breadcrumbs={[{ name: 'About Us', path: '/about-us' }]}
        schema={[{ '@type': 'AboutPage', '@id': 'https://www.agsstonesandpavers.com/about-us#about', url: 'https://www.agsstonesandpavers.com/about-us', name: 'About AGS Stones and Pavers', about: { '@id': 'https://www.agsstonesandpavers.com/#business' } }]}
      />

      <Header />

      <main className="flex-grow">
        <section className="relative isolate flex min-h-[600px] items-end overflow-hidden bg-[#20252a] pb-16 pt-36 md:min-h-[700px] md:pb-20">
          <img
            src="/images/fieldwork-retaining-wall.jpg"
            alt="Illustrative retaining wall installation on a wooded, sloped backyard"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#17191c]/90 via-[#17191c]/65 to-[#17191c]/15" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#17191c]/70 via-transparent to-transparent" />

          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.19em] text-[#d4bd77]">Duluth, Georgia · Serving Metro Atlanta</p>
              <h1 className="font-serif text-4xl leading-[1.06] text-white sm:text-5xl md:text-7xl">
                The work starts before the pavers arrive.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
                AGS Stones and Pavers helps homeowners plan driveways, patios, retaining walls and outdoor spaces around the property they have.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link to="/quote" className="inline-flex min-h-12 items-center gap-3 bg-[#cbb06b] px-5 py-3 text-sm font-bold text-[#20252a] transition-colors hover:bg-white">
                  Talk through your project <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <a href="tel:6784287630" className="text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-[#d4bd77]">
                  Call (678) 428-7630
                </a>
              </div>
              <p className="mt-5 text-xs text-white/60">Illustrative field scene, not a photo of a specific AGS project.</p>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7b31]">How we approach a property</p>
              <h2 className="max-w-xl font-serif text-3xl leading-tight text-[#20252a] sm:text-4xl md:text-5xl">
                The surface matters. So does everything underneath it.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                A driveway on a slope and a patio beside the house bring different questions. Grade, drainage, access and the way you plan to use the space all shape the conversation.
              </p>
              <p className="mt-4 text-base leading-7 text-slate-600">
                From our home base in Duluth, AGS works with homeowners across Metro Atlanta to compare practical options for pavers, natural stone and masonry. The goal is a clear scope that makes sense for the property and the people who live there.
              </p>
              <Link to="/quote" className="mt-7 inline-flex items-center gap-2 font-semibold text-[#20252a] transition-colors hover:text-[#9a7b31]">
                Request an estimate <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>

            <figure>
              <div className="overflow-hidden bg-[#e5e1d8]">
                <img
                  src="/images/fieldwork-paver-cutting.jpg"
                  alt="Illustrative installer trimming a paver to fit the edge of an outdoor patio"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="mt-2 text-xs leading-5 text-slate-500">Representative fieldwork image; actual homes, crews and equipment vary by project.</figcaption>
            </figure>
          </div>
        </section>

        <section className="bg-[#f4f3ef] px-5 py-16 sm:px-8 md:py-24" aria-labelledby="fieldwork-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[1fr_0.75fr] md:items-end md:gap-12">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7b31]">The work behind the finish</p>
                <h2 id="fieldwork-heading" className="max-w-2xl font-serif text-3xl leading-tight text-[#20252a] sm:text-4xl md:text-5xl">
                  A paver project takes more than placing stone.
                </h2>
              </div>
              <p className="max-w-xl leading-relaxed text-slate-600">
                Existing surfaces may need to come out. The base needs attention. Pavers have to fit the layout, with edges and transitions considered along the way.
              </p>
            </div>

            <p className="mb-5 text-xs leading-5 text-slate-500">Illustrative, AI-generated field scenes. They are not photos of completed AGS projects.</p>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12">
              <div className="min-w-0">
                <div className="relative overflow-hidden bg-[#dedbd4]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.figure
                      key={activeScene}
                      initial={reduceMotion ? false : { opacity: 0, scale: 1.015 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.99 }}
                      transition={{ duration: reduceMotion ? 0 : 0.38, ease: 'easeOut' }}
                    >
                      <img
                        src={fieldScenes[activeScene].image}
                        alt={fieldScenes[activeScene].alt}
                        className="aspect-[4/3] w-full object-cover sm:aspect-[16/10]"
                        loading="lazy"
                        decoding="async"
                      />
                    </motion.figure>
                  </AnimatePresence>
                </div>
                <div className="mt-4 lg:hidden" aria-live="polite" aria-atomic="true">
                  <p className="font-serif text-2xl leading-tight text-[#20252a]">{fieldScenes[activeScene].label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{fieldScenes[activeScene].detail}</p>
                </div>
              </div>

              <div>
                <div
                  className="grid grid-cols-3 border-y border-[#20252a]/20 lg:grid-cols-1 lg:border-y-0 lg:border-l lg:pl-8"
                  onMouseEnter={() => setIsScenePaused(true)}
                  onMouseLeave={() => setIsScenePaused(false)}
                  onFocusCapture={() => setIsScenePaused(true)}
                  onBlurCapture={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsScenePaused(false);
                  }}
                >
                  {fieldScenes.map((scene, index) => {
                    const isActive = index === activeScene;
                    return (
                      <button
                        key={scene.label}
                        type="button"
                        onClick={() => setActiveScene(index)}
                        aria-pressed={isActive}
                        className={`group relative min-h-[74px] px-2 py-3 text-left transition-colors sm:px-4 lg:min-h-0 lg:border-b lg:border-[#20252a]/15 lg:px-0 lg:py-5 lg:last:border-b-0 ${isActive ? 'text-[#20252a]' : 'text-slate-500 hover:text-[#20252a]'}`}
                      >
                        <span className={`mb-1 block font-serif text-xs transition-colors sm:text-sm lg:mb-2 lg:text-base ${isActive ? 'text-[#9a7b31]' : 'text-slate-400'}`}>0{index + 1}</span>
                        <span className="block text-[11px] font-semibold leading-tight sm:text-sm lg:text-lg">{scene.label}</span>
                        {isActive && !reduceMotion && (
                          <motion.span
                            key={`mobile-progress-${activeScene}`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 5.5, ease: 'linear' }}
                            className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[#c3a653] lg:hidden"
                          />
                        )}
                        {isActive && (
                          reduceMotion ? (
                            <span className="absolute bottom-0 left-0 top-0 hidden w-0.5 bg-[#c3a653] lg:block" />
                          ) : (
                            <motion.span
                              key={`desktop-progress-${activeScene}`}
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              transition={{ duration: 5.5, ease: 'linear' }}
                              className="absolute bottom-0 left-0 top-0 hidden w-0.5 origin-top bg-[#c3a653] lg:block"
                            />
                          )
                        )}
                        <span className="mt-2 hidden max-w-sm text-sm leading-6 text-slate-600 lg:block">{scene.detail}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 hidden text-xs leading-5 text-slate-500 lg:block">Select a stage to see what happens as a project takes shape.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7b31]">Details worth discussing</p>
              <h2 className="max-w-lg font-serif text-3xl leading-tight text-[#20252a] sm:text-4xl md:text-5xl">
                A good estimate should leave you with fewer questions.
              </h2>
              <p className="mt-5 leading-relaxed text-slate-600">
                Before you choose a contractor, ask how the scope fits the site, what materials are included and how the finished area will meet the rest of your property.
              </p>
            </div>

            <div className="border-y border-[#20252a]/20">
              <article className="grid grid-cols-[3rem_1fr] gap-4 border-b border-[#20252a]/15 py-5 sm:grid-cols-[4rem_1fr] sm:gap-6 sm:py-6">
                <span aria-hidden="true" className="font-serif text-2xl text-[#9a7b31]">01</span>
                <div>
                  <h3 className="font-serif text-xl text-[#20252a] sm:text-2xl">Site and water flow</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">Talk about grade, drainage, nearby structures and how the area connects to the yard or driveway.</p>
                </div>
              </article>
              <article className="grid grid-cols-[3rem_1fr] gap-4 border-b border-[#20252a]/15 py-5 sm:grid-cols-[4rem_1fr] sm:gap-6 sm:py-6">
                <span aria-hidden="true" className="font-serif text-2xl text-[#9a7b31]">02</span>
                <div>
                  <h3 className="font-serif text-xl text-[#20252a] sm:text-2xl">Materials and layout</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">Compare colors, patterns, edging and maintenance for <Link className="underline decoration-[#9a7b31]/50 underline-offset-4 hover:text-[#9a7b31]" to="/service/driveway-pavers">driveways</Link>, <Link className="underline decoration-[#9a7b31]/50 underline-offset-4 hover:text-[#9a7b31]" to="/service/outdoor-patio-builders">patios</Link> and <Link className="underline decoration-[#9a7b31]/50 underline-offset-4 hover:text-[#9a7b31]" to="/service/retaining-wall-installation">retaining walls</Link>.</p>
                </div>
              </article>
              <article className="grid grid-cols-[3rem_1fr] gap-4 py-5 sm:grid-cols-[4rem_1fr] sm:gap-6 sm:py-6">
                <span aria-hidden="true" className="font-serif text-2xl text-[#9a7b31]">03</span>
                <div>
                  <h3 className="font-serif text-xl text-[#20252a] sm:text-2xl">Scope before you commit</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">Review what is included, what choices are open and what the next step would be. You should have time to understand the estimate.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-[#20252a] px-5 py-14 text-white sm:px-8 md:py-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#cbb06b]">Start with your property</p>
              <h2 className="max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">Tell us what you want to build in Metro Atlanta.</h2>
            </div>
            <Link to="/quote" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 bg-[#cbb06b] px-5 py-3 text-sm font-bold text-[#20252a] transition-colors hover:bg-white">
              Request an estimate <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />
    </div>
  );
};
