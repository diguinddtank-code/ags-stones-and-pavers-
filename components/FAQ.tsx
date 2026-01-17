import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Do you offer warranties on your installation?",
    answer: "Yes, we stand firmly behind our work. AGS Stones provides a 5-Year Craftsmanship Warranty on all hardscape installations. This covers any issues related to settlement or workmanship. Material warranties vary by manufacturer (e.g., Belgard, Techo-Bloc) and often carry lifetime guarantees."
  },
  {
    question: "Do I need a permit for my patio or retaining wall?",
    answer: "It depends on the scope and location. Generally, retaining walls over 4 feet tall and large impervious surface additions require permits in cities like Duluth, Alpharetta, and Roswell. AGS Stones handles the entire permitting process for you, ensuring your project is 100% code-compliant."
  },
  {
    question: "How long does a typical project take?",
    answer: "Most standard patio or driveway projects are completed within 3-5 days. Larger outdoor living projects involving kitchens, fire features, and extensive landscaping may take 2-3 weeks. We provide a detailed timeline during your consultation and stick to it."
  },
  {
    question: "What areas of Atlanta do you serve?",
    answer: "We are based in Duluth and primarily serve the North Metro Atlanta area, including Alpharetta, Johns Creek, Suwanee, Roswell, Milton, Cumming, Sandy Springs, and Marietta."
  },
  {
    question: "Can you provide a 3D design before we start?",
    answer: "Absolutely. We believe you should see it before you build it. We offer professional 3D renderings that show exactly how the hardscape, plants, and lighting will look in your specific yard. This service is often credited back towards the project cost upon contract signing."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
    <section id="faq" className="py-24 bg-white">
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 fade-in-section">
           <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-gold/10 rounded-full mb-4 text-brand-gold">
              <HelpCircle size={24} />
           </div>
           <h2 className="font-serif text-4xl font-bold text-brand-dark mb-4">Frequently Asked Questions</h2>
           <p className="text-gray-500">Everything you need to know about your hardscape project.</p>
        </div>

        <div className="space-y-4 fade-in-section">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen ? 'border-brand-gold bg-brand-gold/5 shadow-md' : 'border-gray-200 bg-white hover:border-brand-gold/30'
                }`}
              >
                <h3>
                  <button 
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-inset rounded-2xl cursor-pointer select-none"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span className={`font-serif text-lg font-bold ${isOpen ? 'text-brand-dark' : 'text-gray-700'}`}>
                      {faq.question}
                    </span>
                    <span className={`flex-shrink-0 ml-4 p-1 rounded-full border transition-colors ${
                       isOpen ? 'bg-brand-gold text-white border-brand-gold' : 'border-gray-300 text-gray-400'
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