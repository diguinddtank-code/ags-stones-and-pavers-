import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Home, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEO title="Page Not Found | AGS Stones" description="The page you are looking for does not exist." />
      <Header forceSolid={true} />
      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-8xl md:text-9xl font-serif font-bold text-brand-dark mb-6">404</h1>
          <h2 className="text-3xl font-serif font-semibold text-brand-dark mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-10 text-lg">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-brand-gold text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-goldHover transition-colors"
          >
            <Home size={20} />
            Back to Homepage
            <ArrowRight size={20} />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};
