import React, { Component, useEffect, useState, useRef, Suspense, ReactNode, ErrorInfo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SEO } from './components/SEO';

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

  // GLOBAL CONVERSION TRACKING LISTENER
  // This intercepts any click on a "tel:" link across the entire app
  // and fires the Google Ads conversion event.
  useEffect(() => {
    const handleTelClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.href.startsWith('tel:')) {
        const gtagReport = (window as any).gtag_report_conversion;
        if (typeof gtagReport === 'function') {
          // Default browser behavior for tel: is fine, just report
          gtagReport(target.href);
        }
      }
    };

    document.addEventListener('click', handleTelClick);
    return () => document.removeEventListener('click', handleTelClick);
  }, []);

  return (
    <div className="font-sans antialiased text-brand-dark bg-slate-50 pb-24 md:pb-0">
      <SEO
        title="Paver Installation, Retaining Walls & Patio Contractors in Atlanta | AGS Stones"
        description="Duluth-based hardscape contractor for driveway pavers, paver patios, retaining walls, pool decks and outdoor kitchens across Atlanta, Alpharetta, Johns Creek and Roswell. Free estimates."
        canonicalPath="/"
      />
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
         <ExitIntentPopup />
         <CookieBanner />
      </Suspense>
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
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));
const CookieBanner = React.lazy(() => import('./components/CookieBanner').then(module => ({ default: module.CookieBanner })));

const App: React.FC = () => {
  // GLOBAL CONVERSION TRACKING LISTENER
  // Intercepts any click on a "tel:" link across the entire app
  // and fires the Google Ads + Meta Pixel conversion events.
  useEffect(() => {
    const handleTelClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.href.startsWith('tel:')) {
        const gtagReport = (window as any).gtag_report_conversion;
        if (typeof gtagReport === 'function') {
          gtagReport(target.href);
        } else if ((window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            send_to: 'AW-16885125181/Au3NCM3fmugbEL2guvM-',
            event_category: 'Contact',
            event_label: 'Call Click',
          });
        }
        if ((window as any).fbq) {
          (window as any).fbq('track', 'Contact');
        }
      }
    };

    document.addEventListener('click', handleTelClick);
    return () => document.removeEventListener('click', handleTelClick);
  }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="h-screen w-full bg-slate-50 flex items-center justify-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<QuotePage />} />
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
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;