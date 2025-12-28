import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ZParallaxShowcase } from './components/ZParallaxShowcase';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { BeforeAfter } from './components/BeforeAfter';
import { DayNightSlider } from './components/DayNightSlider';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { FloatingWidget } from './components/FloatingWidget';
import { ExitIntentPopup } from './components/ExitIntentPopup';

const App: React.FC = () => {
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
      <Header />
      <main>
        <Hero />
        <ZParallaxShowcase />
        <Services />
        <WhyChooseUs />
        <BeforeAfter />
        <DayNightSlider />
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