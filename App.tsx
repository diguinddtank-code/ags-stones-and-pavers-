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
    // 1. Optimized Intersection Observer
    // We only observe elements currently in the DOM. We REMOVED the MutationObserver
    // because watching document.body subtree is too expensive for mobile main-thread.
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Performance: Stop observing once visible to free up resources
          revealObserver.unobserve(entry.target); 
        }
      });
    }, {
      threshold: 0.1, 
      rootMargin: "50px" // Pre-load slightly before into view
    });

    // Observe currently existing static sections
    document.querySelectorAll('.fade-in-section').forEach((el) => revealObserver.observe(el));

    // Cleanup
    return () => {
      revealObserver.disconnect();
    };
  }, []);

  return (
    <div className="font-sans antialiased text-brand-dark bg-slate-50 pb-24 md:pb-0">
      <Header isHidden={isServiceModalOpen} />
      <main>
        <Hero />
        
        <Suspense fallback={<div className="h-screen w-full bg-[#0f1115]"></div>}>
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