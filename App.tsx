import React, { useEffect, useState, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { FloatingWidget } from './components/FloatingWidget';
import { ExitIntentPopup } from './components/ExitIntentPopup';

// Lazy Load heavy components below the fold for Page Speed optimization
const ZParallaxShowcase = React.lazy(() => import('./components/ZParallaxShowcase').then(module => ({ default: module.ZParallaxShowcase })));
const BeforeAfter = React.lazy(() => import('./components/BeforeAfter').then(module => ({ default: module.BeforeAfter })));
const DayNightSlider = React.lazy(() => import('./components/DayNightSlider').then(module => ({ default: module.DayNightSlider })));
const LocalProjects = React.lazy(() => import('./components/LocalProjects').then(module => ({ default: module.LocalProjects })));

const App: React.FC = () => {
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  useEffect(() => {
    // 1. Setup Intersection Observer (The Animation Trigger)
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optional: Stop observing once visible to save resources
          // revealObserver.unobserve(entry.target); 
        }
      });
    }, {
      threshold: 0.15, // Trigger when 15% visible
      rootMargin: "0px 0px -50px 0px"
    });

    // 2. Initial scan for static elements
    document.querySelectorAll('.fade-in-section').forEach((el) => revealObserver.observe(el));

    // 3. Setup Mutation Observer (The Watcher for Lazy Loaded Components)
    // This watches the DOM for new elements (like BeforeAfter) being added after the initial load
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            // Check if the new node itself has the class
            if (node.classList.contains('fade-in-section')) {
              revealObserver.observe(node);
            }
            // Check if the new node contains children with the class
            node.querySelectorAll('.fade-in-section').forEach((el) => revealObserver.observe(el));
          }
        });
      });
    });

    // Start watching the body for changes
    mutationObserver.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => {
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className="font-sans antialiased text-brand-dark bg-slate-50 pb-24 md:pb-0">
      <Header isHidden={isServiceModalOpen} />
      <main>
        <Hero />
        
        {/* ZParallax has specific height requirements, ensure wrapper handles loading gracefully */}
        <Suspense fallback={<div className="h-screen w-full bg-[#0f1115] flex items-center justify-center"><div className="animate-pulse text-brand-gold tracking-widest text-xs font-bold uppercase">Loading Experience...</div></div>}>
          <ZParallaxShowcase />
        </Suspense>

        <Services onModalChange={setIsServiceModalOpen} />
        <WhyChooseUs />
        
        <Suspense fallback={<div className="h-96 w-full bg-slate-50"></div>}>
           <BeforeAfter />
        </Suspense>

        <Suspense fallback={<div className="h-96 w-full bg-white"></div>}>
           <LocalProjects />
        </Suspense>

        <Suspense fallback={<div className="h-96 w-full bg-brand-dark"></div>}>
           <DayNightSlider />
        </Suspense>

        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingWidget />
      <ExitIntentPopup />
      <MobileNav />
    </div>
  );
};

export default App;