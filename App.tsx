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
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% visible
      rootMargin: "0px 0px -50px 0px"
    });

    const hiddenElements = document.querySelectorAll('.fade-in-section');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-sans antialiased text-brand-dark bg-slate-50 pb-24 md:pb-0">
      <Header isHidden={isServiceModalOpen} />
      <main>
        <Hero />
        
        <Suspense fallback={<div className="h-screen bg-[#0f1115]"></div>}>
          <ZParallaxShowcase />
        </Suspense>

        <Services onModalChange={setIsServiceModalOpen} />
        <WhyChooseUs />
        
        <Suspense fallback={<div className="h-96 bg-white"></div>}>
           <BeforeAfter />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-white"></div>}>
           <LocalProjects />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-brand-dark"></div>}>
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