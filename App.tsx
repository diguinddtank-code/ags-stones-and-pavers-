import React, { useEffect, useState, useRef, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';

// LAZY LOADED COMPONENTS (Chunked for Performance)
const Services = React.lazy(() => import('./components/Services').then(module => ({ default: module.Services })));
const WhyChooseUs = React.lazy(() => import('./components/WhyChooseUs').then(module => ({ default: module.WhyChooseUs })));
const Testimonials = React.lazy(() => import('./components/Testimonials').then(module => ({ default: module.Testimonials })));
const FAQ = React.lazy(() => import('./components/FAQ').then(module => ({ default: module.FAQ })));
const Contact = React.lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));
const Footer = React.lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));
const MobileNav = React.lazy(() => import('./components/MobileNav').then(module => ({ default: module.MobileNav })));
const FloatingWidget = React.lazy(() => import('./components/FloatingWidget').then(module => ({ default: module.FloatingWidget })));
const ExitIntentPopup = React.lazy(() => import('./components/ExitIntentPopup').then(module => ({ default: module.ExitIntentPopup })));

const ZParallaxShowcase = React.lazy(() => import('./components/ZParallaxShowcase').then(module => ({ default: module.ZParallaxShowcase })));
const BeforeAfter = React.lazy(() => import('./components/BeforeAfter').then(module => ({ default: module.BeforeAfter })));
const DayNightSlider = React.lazy(() => import('./components/DayNightSlider').then(module => ({ default: module.DayNightSlider })));
const LocalProjects = React.lazy(() => import('./components/LocalProjects').then(module => ({ default: module.LocalProjects })));

// --- ROBUST LAZY SECTION WRAPPER ---
// Correctly handles viewport hydration without unmounting during Suspense
const LazySection: React.FC<{ children: React.ReactNode, minHeight?: string, className?: string }> = ({ 
  children, 
  minHeight = "400px",
  className = "" 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Safety Timeout: Ensure content eventually loads even if Observer fails
    const safetyTimer = setTimeout(() => setIsVisible(true), 4000);

    // 2. Intersection Observer for Performance
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        clearTimeout(safetyTimer);
        observer.disconnect();
      }
    }, { rootMargin: "300px" }); // Pre-load 300px before scrolling into view

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`w-full ${className}`}
      style={{ minHeight: isVisible ? 'auto' : minHeight }}
    >
      {isVisible ? children : null}
    </div>
  );
};

const App: React.FC = () => {
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Global Animation Trigger
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    // Use MutationObserver to attach animations to new content as it loads
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node instanceof HTMLElement) {
             if (node.classList.contains('fade-in-section')) observer.observe(node);
             node.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    }
  }, []);

  return (
    <div className="font-sans antialiased text-brand-dark bg-slate-50 pb-24 md:pb-0">
      <Header isHidden={isServiceModalOpen} />
      
      <main>
        {/* Critical Path: Render Immediately */}
        <Hero />
        
        {/* Viewport Hydration Strategy */}
        {/* Note: Suspense is INSIDE LazySection to maintain layout stability */}
        
        <LazySection minHeight="80vh" className="bg-[#0f1115]">
           <Suspense fallback={<div className="h-full w-full animate-pulse bg-gray-900" />}>
              <ZParallaxShowcase />
           </Suspense>
        </LazySection>

        <LazySection minHeight="800px">
           <Suspense fallback={<div className="h-96 w-full bg-slate-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div></div>}>
              <Services onModalChange={setIsServiceModalOpen} />
           </Suspense>
        </LazySection>
        
        <LazySection minHeight="400px" className="bg-brand-dark">
           <Suspense fallback={<div className="h-full w-full bg-brand-dark" />}>
              <WhyChooseUs />
           </Suspense>
        </LazySection>
        
        <LazySection minHeight="500px">
           <Suspense fallback={<div className="h-96 w-full bg-white" />}>
              <BeforeAfter />
           </Suspense>
        </LazySection>

        <LazySection minHeight="600px">
           <Suspense fallback={<div className="h-96 w-full bg-white" />}>
              <LocalProjects />
           </Suspense>
        </LazySection>

        <LazySection minHeight="500px" className="bg-brand-dark">
           <Suspense fallback={<div className="h-96 w-full bg-brand-dark" />}>
              <DayNightSlider />
           </Suspense>
        </LazySection>

        <LazySection minHeight="400px" className="bg-brand-light">
           <Suspense fallback={<div className="h-64 w-full bg-brand-light" />}>
              <Testimonials />
           </Suspense>
        </LazySection>

        <LazySection minHeight="300px">
           <Suspense fallback={<div className="h-48 w-full bg-white" />}>
              <FAQ />
           </Suspense>
        </LazySection>

        <LazySection minHeight="600px" className="bg-brand-light">
           <Suspense fallback={<div className="h-96 w-full bg-brand-light" />}>
              <Contact />
           </Suspense>
        </LazySection>
      </main>
      
      <LazySection minHeight="300px" className="bg-brand-dark">
         <Suspense fallback={<div className="h-40 w-full bg-brand-dark" />}>
            <Footer />
         </Suspense>
      </LazySection>

      {/* Auxiliary Components - Low Priority */}
      <Suspense fallback={null}>
         <div className="hidden md:block">
            <FloatingWidget />
         </div>
         <MobileNav />
         <ExitIntentPopup />
      </Suspense>
    </div>
  );
};

export default App;