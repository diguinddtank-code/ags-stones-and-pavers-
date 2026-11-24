import React, { Component, useEffect, useState, useRef, Suspense, ReactNode, ErrorInfo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { trackCallClick, trackPageView } from './lib/tracking';
import { Hero } from './components/Hero';
import { SEO } from './components/SEO';
import { MotionShell } from './components/motion/MotionShell';
import { RouteMotion } from './components/motion/RouteMotion';
import { MobileActionBar } from './components/MobileActionBar';

// --- COMPONENT CHUNKS ---
const ServiceRibbon = React.lazy(() => import('./components/ServiceRibbon').then(module => ({ default: module.ServiceRibbon })));
const WhyAgs = React.lazy(() => import('./components/WhyAgs').then(module => ({ default: module.WhyAgs })));
const ServiceAreasStrip = React.lazy(() => import('./components/ServiceAreasStrip').then(module => ({ default: module.ServiceAreasStrip })));
const CtaBand = React.lazy(() => import('./components/CtaBand').then(module => ({ default: module.CtaBand })));

const Services = React.lazy(() => import('./components/Services').then(module => ({ default: module.Services })));
const HomeProcess = React.lazy(() => import('./components/HomeProcess').then(module => ({ default: module.HomeProcess })));

const BeforeAfter = React.lazy(() => import('./components/BeforeAfter').then(module => ({ default: module.BeforeAfter })));
const YardStudioTeaser = React.lazy(() => import('./components/YardStudioTeaser').then(module => ({ default: module.YardStudioTeaser })));
const ProjectGallery = React.lazy(() => import('./components/ProjectGallery').then(module => ({ default: module.ProjectGallery })));

const FAQ = React.lazy(() => import('./components/FAQ').then(module => ({ default: module.FAQ })));
const Contact = React.lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));
const Footer = React.lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));


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
  // Prerendered pages ship the full content in the HTML (crawlers see every
  // section) and hydrate it as-is; only a plain client render stays lazy.
  const [isVisible, setIsVisible] = useState(
    () => typeof window === "undefined" || (window as any).__PRERENDERED__ === true
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) return;

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

const Home: React.FC = () => {
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // tel: click conversions are tracked once, app-wide, by the listener in <App />.

  return (
    <div className="font-sans antialiased text-brand-dark bg-slate-50 pb-24 md:pb-0">
      <SEO
        title="Paver Contractor Atlanta | Driveways, Patios & Retaining Walls | AGS Stones"
        description="Licensed paver contractor based in Duluth, serving Metro Atlanta. Paver driveways, patio installation, retaining walls, pool decks and outdoor kitchens by in-house crews. Free on-site estimates."
        canonicalPath="/"
      />
      <Header isHidden={isServiceModalOpen} />
      
      <main>
        {/* CRITICAL: Hero Loads Instantly */}
        <Hero />
        
        {/* PRIORITY 1: Immediate Below Fold */}
        <ErrorBoundary>
          <Suspense fallback={<div className="h-[100vh] bg-[#0f1115] w-full" />}>
             <ServiceRibbon />
          </Suspense>
        </ErrorBoundary>

        {/* PRIORITY 2: Core Services */}
        <LazyBlock minHeight="1000px">
           <ErrorBoundary>
              <Suspense fallback={<div className="h-96 w-full bg-slate-50" />}>
                 <Services onModalChange={setIsServiceModalOpen} />
                 <WhyAgs />
                 <HomeProcess />
              </Suspense>
           </ErrorBoundary>
        </LazyBlock>
        
        {/* PRIORITY 3: Visual Proof */}
        <LazyBlock minHeight="1200px">
           <ErrorBoundary>
              <Suspense fallback={<div className="h-96 w-full bg-white" />}>
                 <ProjectGallery />
                 <BeforeAfter />
                 <ServiceAreasStrip />
                 <YardStudioTeaser />
                 <CtaBand />
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

    </div>
  );
};

const QuotePage = React.lazy(() => import('./pages/QuotePage').then(module => ({ default: module.QuotePage })));
const ServicePage = React.lazy(() => import('./pages/ServicePage').then(module => ({ default: module.ServicePage })));
const ServicesIndexPage = React.lazy(() => import('./pages/ServicesIndexPage').then(module => ({ default: module.ServicesIndexPage })));
const AboutUsPage = React.lazy(() => import('./pages/AboutUsPage').then(module => ({ default: module.AboutUsPage })));
const LocationsPage = React.lazy(() => import('./pages/LocationsPage').then(module => ({ default: module.LocationsPage })));
const BlogIndexPage = React.lazy(() => import('./pages/BlogIndexPage').then(module => ({ default: module.BlogIndexPage })));
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage').then(module => ({ default: module.BlogPostPage })));
const LegalPage = React.lazy(() => import('./pages/LegalPage').then(module => ({ default: module.LegalPage })));
const YardStudioPage = React.lazy(() => import('./pages/YardStudioPage').then(module => ({ default: module.YardStudioPage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

const App: React.FC = () => {
  // Call tracking: one app-wide listener for every tel: link, so each call click
  // is counted exactly once. The link itself opens the dialer (no redirect here).
  useEffect(() => {
    const handleTelClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.('a');
      if (target && target.getAttribute('href')?.startsWith('tel:')) {
        trackCallClick(target.getAttribute('href')!);
      }
    };
    document.addEventListener('click', handleTelClick);
    return () => document.removeEventListener('click', handleTelClick);
  }, []);

  // In-app navigation page views (the first one is sent by gtag('config')).
  const { pathname } = useLocation();
  const firstView = useRef(true);
  useEffect(() => {
    if (firstView.current) {
      firstView.current = false;
      return;
    }
    // Wait a tick so the new page's <title> is in place.
    const t = window.setTimeout(() => trackPageView(pathname), 300);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <ErrorBoundary>
      <MotionShell />
      <MobileActionBar />
      <Suspense fallback={<div className="h-screen w-full bg-slate-50 flex items-center justify-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/design-your-yard" element={<YardStudioPage />} />
          <Route path="/services" element={<ServicesIndexPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
          <Route path="/terms-of-service" element={<LegalPage type="terms" />} />
          <Route path="/service-areas" element={<LocationsPage />} />
          
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />

          {/* Core service hubs */}
          <Route path="/service/:id" element={<ServicePage scope="service" />} />

          {/* Hand-written local pages and generated service + city pages; unknown slugs render a real 404 */}
          <Route path="/:id" element={<ServicePage scope="root" />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <RouteMotion />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
