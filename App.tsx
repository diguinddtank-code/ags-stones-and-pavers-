import React, { useEffect, useState, useRef, Suspense, Component, ReactNode, ErrorInfo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';

// --- COMPONENT CHUNKS ---
const ZParallaxShowcase = React.lazy(() => import('./components/ZParallaxShowcase').then(module => ({ default: module.ZParallaxShowcase })));

// Block 1: Core Value Proposition
const Services = React.lazy(() => import('./components/Services').then(module => ({ default: module.Services })));
const WhyChooseUs = React.lazy(() => import('./components/WhyChooseUs').then(module => ({ default: module.WhyChooseUs })));

// Block 2: Visual Proof
const BeforeAfter = React.lazy(() => import('./components/BeforeAfter').then(module => ({ default: module.BeforeAfter })));
const LocalProjects = React.lazy(() => import('./components/LocalProjects').then(module => ({ default: module.LocalProjects })));
const DayNightSlider = React.lazy(() => import('./components/DayNightSlider').then(module => ({ default: module.DayNightSlider })));

// Block 3: Trust & Conversion
const Testimonials = React.lazy(() => import('./components/Testimonials').then(module => ({ default: module.Testimonials })));
const FAQ = React.lazy(() => import('./components/FAQ').then(module => ({ default: module.FAQ })));
const Contact = React.lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));
const Footer = React.lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));

// Aux
const MobileNav = React.lazy(() => import('./components/MobileNav').then(module => ({ default: module.MobileNav })));
const FloatingWidget = React.lazy(() => import('./components/FloatingWidget').then(module => ({ default: module.FloatingWidget })));
const ExitIntentPopup = React.lazy(() => import('./components/ExitIntentPopup').then(module => ({ default: module.ExitIntentPopup })));

// --- ERROR BOUNDARY ---
interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Prevents the entire site from crashing if one lazy chunk fails to load
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-8 text-center text-gray-500 text-sm">Content temporarily unavailable. Please refresh.</div>;
    }
    return this.props.children;
  }
}

// --- LIGHTWEIGHT LAZY WRAPPER ---
const LazyBlock: React.FC<{ children: React.ReactNode, minHeight?: string }> = ({ children, minHeight = "500px" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Immediate mobile check to avoid waiting
    if (typeof window !== 'undefined' && window.scrollY > 200) {
       // If user already scrolled down on reload, show immediately
       setIsVisible(true);
       return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "600px" }); // Huge margin to load well before user arrives

    if (ref.current) observer.observe(ref.current);
    
    // Safety fallback
    const timer = setTimeout(() => setIsVisible(true), 3000);
    
    return () => {
        observer.disconnect();
        clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? 'auto' : minHeight }}>
      {isVisible ? children : null}
    </div>
  );
};

const App: React.FC = () => {
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Global Animation Observer (Optimized: Single Instance)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    // Attach to body to catch new elements as they hydrate
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
    return () => { observer.disconnect(); mutationObserver.disconnect(); }
  }, []);

  return (
    <div className="font-sans antialiased text-brand-dark bg-slate-50 pb-24 md:pb-0">
      <Header isHidden={isServiceModalOpen} />
      
      <main>
        {/* CRITICAL: Hero Loads Instantly */}
        <Hero />
        
        {/* PRIORITY 1: Immediate Below Fold (No LazyBlock wrapper to prevent gaps) */}
        <ErrorBoundary>
          <Suspense fallback={<div className="h-[85vh] bg-[#0f1115] w-full" />}>
             <ZParallaxShowcase />
          </Suspense>
        </ErrorBoundary>

        {/* PRIORITY 2: Core Services (Batched) */}
        <LazyBlock minHeight="1000px">
           <ErrorBoundary>
              <Suspense fallback={<div className="h-96 w-full bg-slate-50 animate-pulse" />}>
                 <Services onModalChange={setIsServiceModalOpen} />
                 <WhyChooseUs />
              </Suspense>
           </ErrorBoundary>
        </LazyBlock>
        
        {/* PRIORITY 3: Visual Proof (Batched) */}
        <LazyBlock minHeight="1200px">
           <ErrorBoundary>
              <Suspense fallback={<div className="h-96 w-full bg-white" />}>
                 <BeforeAfter />
                 <LocalProjects />
                 <DayNightSlider />
              </Suspense>
           </ErrorBoundary>
        </LazyBlock>

        {/* PRIORITY 4: Trust & Contact (Batched) */}
        <LazyBlock minHeight="1000px">
           <ErrorBoundary>
              <Suspense fallback={<div className="h-96 w-full bg-brand-light" />}>
                 <Testimonials />
                 <FAQ />
                 <Contact />
              </Suspense>
           </ErrorBoundary>
        </LazyBlock>
      </main>
      
      <LazyBlock minHeight="300px">
         <ErrorBoundary>
            <Suspense fallback={<div className="h-40 w-full bg-brand-dark" />}>
               <Footer />
            </Suspense>
         </ErrorBoundary>
      </LazyBlock>

      {/* AUXILIARY: Load last, completely separate */}
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