import React, { useEffect, useState, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MobileNav } from './components/MobileNav';
import { FloatingWidget } from './components/FloatingWidget';
import { ExitIntentPopup } from './components/ExitIntentPopup';

// COMPONENTES LAZY LOAD (Mantém o site leve)
const Services = React.lazy(() => import('./components/Services').then(module => ({ default: module.Services })));
const WhyChooseUs = React.lazy(() => import('./components/WhyChooseUs').then(module => ({ default: module.WhyChooseUs })));
const Testimonials = React.lazy(() => import('./components/Testimonials').then(module => ({ default: module.Testimonials })));
const FAQ = React.lazy(() => import('./components/FAQ').then(module => ({ default: module.FAQ })));
const Contact = React.lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));
const Footer = React.lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));

const ZParallaxShowcase = React.lazy(() => import('./components/ZParallaxShowcase').then(module => ({ default: module.ZParallaxShowcase })));
const BeforeAfter = React.lazy(() => import('./components/BeforeAfter').then(module => ({ default: module.BeforeAfter })));
const DayNightSlider = React.lazy(() => import('./components/DayNightSlider').then(module => ({ default: module.DayNightSlider })));
const LocalProjects = React.lazy(() => import('./components/LocalProjects').then(module => ({ default: module.LocalProjects })));

const App: React.FC = () => {
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  useEffect(() => {
    // 1. IntersectionObserver: Responsável por animar o que JÁ está na tela
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target); 
        }
      });
    }, {
      threshold: 0.1, 
      rootMargin: "50px"
    });

    // 2. MutationObserver Otimizado: Responsável por detectar o Lazy Load
    // Ele observa quando o React injeta novos componentes HTML (como Services, FAQ)
    // e conecta eles ao animador (revealObserver).
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              // Se o próprio nó for uma seção animada
              if (node.classList.contains('fade-in-section')) {
                revealObserver.observe(node);
              }
              // Ou se tiver filhos animados
              node.querySelectorAll('.fade-in-section').forEach(el => revealObserver.observe(el));
            }
          });
        }
      });
    });

    // Inicia observação
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    
    // Varredura inicial para pegar o Hero e Header
    document.querySelectorAll('.fade-in-section').forEach((el) => revealObserver.observe(el));

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
        
        {/* Suspense Wrappers com Fallbacks Visuais para evitar "piscada" branca */}
        <Suspense fallback={<div className="h-96 w-full bg-[#0f1115] animate-pulse"></div>}>
          <ZParallaxShowcase />
        </Suspense>

        <Suspense fallback={<div className="h-96 w-full bg-slate-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div></div>}>
          <Services onModalChange={setIsServiceModalOpen} />
        </Suspense>
        
        <Suspense fallback={<div className="h-64 w-full bg-brand-dark"></div>}>
          <WhyChooseUs />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 w-full bg-white"></div>}>
           <BeforeAfter />
        </Suspense>

        <Suspense fallback={<div className="h-96 w-full bg-white"></div>}>
           <LocalProjects />
        </Suspense>

        <Suspense fallback={<div className="h-96 w-full bg-brand-dark"></div>}>
           <DayNightSlider />
        </Suspense>

        <Suspense fallback={<div className="h-80 w-full bg-brand-light"></div>}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<div className="h-64 w-full bg-white"></div>}>
          <FAQ />
        </Suspense>

        <Suspense fallback={<div className="h-96 w-full bg-brand-light"></div>}>
          <Contact />
        </Suspense>
      </main>
      
      <Suspense fallback={<div className="h-20 bg-brand-dark"></div>}>
        <Footer />
      </Suspense>

      <FloatingWidget />
      <ExitIntentPopup />
      <MobileNav />
    </div>
  );
};

export default App;