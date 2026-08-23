import React, { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-brand-dark">
      <SEO title={`${title} | AGS Stones`} description={`Read our ${title.toLowerCase()} to understand how we protect your data and govern our services.`} />
      <Header forceSolid={true} />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8">{title}</h1>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">Last updated: August 23, 2026</p>
            {isPrivacy ? (
              <>
                <h2 className="text-2xl font-semibold text-brand-dark mt-8 mb-4">1. Information We Collect</h2>
                <p className="mb-6">We collect information you provide directly to us when you request a quote, fill out a form, or communicate with us. This may include your name, email address, phone number, and project details.</p>
                
                <h2 className="text-2xl font-semibold text-brand-dark mt-8 mb-4">2. How We Use Your Information</h2>
                <p className="mb-6">We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices, and respond to your comments and questions.</p>
                
                <h2 className="text-2xl font-semibold text-brand-dark mt-8 mb-4">3. Data Security</h2>
                <p className="mb-6">We implement reasonable security measures to protect the security of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-brand-dark mt-8 mb-4">1. Acceptance of Terms</h2>
                <p className="mb-6">By accessing and using our website and services, you accept and agree to be bound by the terms and provision of this agreement.</p>
                
                <h2 className="text-2xl font-semibold text-brand-dark mt-8 mb-4">2. Description of Service</h2>
                <p className="mb-6">AGS Stones provides hardscaping, masonry, and related outdoor living construction services. Estimates provided online are preliminary and subject to on-site evaluation.</p>
                
                <h2 className="text-2xl font-semibold text-brand-dark mt-8 mb-4">3. Warranties and Liability</h2>
                <p className="mb-6">We stand by our craftsmanship. Specific warranties for projects are provided in the final contract. We shall not be liable for indirect, incidental, or consequential damages.</p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
