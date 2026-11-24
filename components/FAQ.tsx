import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Do you offer warranties on your installation?",
    answer: "Ask us to explain the installation coverage that applies to your project and any separate manufacturer warranty for selected materials. Warranty terms can vary by scope and product."
  },
  {
    question: "Do I need a permit for my patio or retaining wall?",
    answer: "Permit and review requirements depend on the project and the local jurisdiction. Check with your city or county before work begins; the estimate discussion can help identify questions to resolve for your scope."
  },
  {
    question: "How long does a typical project take?",
    answer: "Timing depends on the size and complexity of the work, material availability, site access, weather and any required approvals. Ask for the expected schedule when reviewing your project scope."
  },
  {
    question: "What areas of Atlanta do you serve?",
    answer: "AGS Stones and Pavers is based in Duluth and serves homeowners across Metro Atlanta. Visit the service areas page or contact us with your city and project details to confirm availability."
  },
  {
    question: "What should I include when requesting an estimate?",
    answer: "Share your city, the type of work you have in mind, approximate dimensions if known, and any concerns such as slope, drainage or access. Photos can help start the conversation; the next step depends on the project."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
        const fadeEls = sectionRef.current.querySelectorAll('.fade-in-section');
        fadeEls.forEach(el => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Structured Data for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section ref={sectionRef} id="faq" className="py-24 relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      
      {/* BACKGROUND TEXTURE */}
      <div className="absolute inset-0 bg-white" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 fade-in-section">
           <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-dark rounded-lg mb-4 text-brand-gold">
              <HelpCircle size={24} />
           </div>
           <h2 className="font-display text-5xl font-bold uppercase leading-[0.95] text-brand-dark mb-4 md:text-6xl">Paver project questions</h2>
           <p className="text-lg text-slate-600">Straight answers before you book your free estimate.</p>
        </div>

        <div className="space-y-4 fade-in-section">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-xl transition-all duration-300 ${
                  isOpen ? 'border-brand-gold bg-white shadow-lg' : 'border-slate-200 bg-[#f5f2ec] hover:border-brand-gold/50'
                }`}
              >
                <h3>
                  <button 
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-inset rounded-xl cursor-pointer select-none"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span className={`font-display text-xl font-bold ${isOpen ? 'text-brand-dark' : 'text-gray-700'}`}>
                      {faq.question}
                    </span>
                    <span className={`flex-shrink-0 ml-4 p-1 rounded-full border transition-colors ${
                       isOpen ? 'bg-brand-gold text-brand-dark border-brand-gold' : 'border-slate-400 text-slate-500'
                    }`}>
                       {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                </h3>
                
                <div 
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-brand-gold/10 mt-2">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
