import React, { Component, useEffect, useState, useRef, Suspense, ReactNode, ErrorInfo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';

// --- COMPONENT CHUNKS ---
const ZParallaxShowcase = React.lazy(() => import('./components/ZParallaxShowcase').then(module => ({ default: module.ZParallaxShowcase })));

const Services = React.lazy(() => import('./components/Services').then(module => ({ default: module.Services })));
const Testimonials = React.lazy(() => import('./components/Testimonials').then(module => ({ default: module.Testimonials })));
const WhyChooseUs = React.lazy(() => import('./components/WhyChooseUs').then(module => ({ default: module.WhyChooseUs })));

const BeforeAfter = React.lazy(() => import('./components/BeforeAfter').then(module => ({ default: module.BeforeAfter })));
const LocalProjects = React.lazy(() => import('./components/LocalProjects').then(module => ({ default: module.LocalProjects })));
const DayNightSlider = React.lazy(() => import('./components/DayNightSlider').then(module => ({ default: module.DayNightSlider })));

const FAQ = React.lazy(() => import('./components/FAQ').then(module => ({ default: module.FAQ })));
const Contact = React.lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));
const Footer = React.lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));

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

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

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
    // 1. Immediate mobile check
    if (typeof window !== 'undefined' && window.scrollY > 100) {
       setIsVisible(true);
       return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "400px" });

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

  return (
    <div className="font-sans antialiased text-brand-dark bg-slate-50 pb-24 md:pb-0">
      <Header isHidden={isServiceModalOpen} />
      
      <main>
        {/* CRITICAL: Hero Loads Instantly */}
        <Hero />
        
        {/* PRIORITY 1: Immediate Below Fold */}
        <ErrorBoundary>
          <Suspense fallback={<div className="h-[100vh] bg-[#0f1115] w-full" />}>
             <ZParallaxShowcase />
          </Suspense>
        </ErrorBoundary>

        {/* PRIORITY 2: Core Services */}
        <LazyBlock minHeight="1000px">
           <ErrorBoundary>
              <Suspense fallback={<div className="h-96 w-full bg-slate-50" />}>
                 <Services onModalChange={setIsServiceModalOpen} />
                 <Testimonials />
                 <WhyChooseUs />
              </Suspense>
           </ErrorBoundary>
        </LazyBlock>
        
        {/* PRIORITY 3: Visual Proof */}
        <LazyBlock minHeight="1200px">
           <ErrorBoundary>
              <Suspense fallback={<div className="h-96 w-full bg-white" />}>
                 <BeforeAfter />
                 <LocalProjects />
                 <DayNightSlider />
              </Suspense>
           </ErrorBoundary>
        </LazyBlock>

        {/* PRIORITY 4: Trust & Contact */}
        <LazyBlock minHeight="1000px">
           <ErrorBoundary>
              <Suspense fallback={<div className="h-96 w-full bg-brand-light" />}>
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

      <Suspense fallback={null}>
         <FloatingWidget />
         <MobileNav />
         <ExitIntentPopup />
      </Suspense>
    </div>
  );
};

export default App;