import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, BookOpen, HelpCircle } from 'lucide-react';
import type { Faq } from '../lib/serviceFaqs';

export interface LinkItem {
  name: string;
  path: string;
}

interface Props {
  faqs: Faq[];
  faqHeading: string;
  areaHeading: string;
  areaLinks: LinkItem[];
  guides: LinkItem[];
}

// Server-rendered FAQ (<details>, no JS needed) that backs the FAQPage schema,
// plus crawlable internal links to local pages and blog guides.
export const ServiceSeoExtras: React.FC<Props> = ({ faqs, faqHeading, areaHeading, areaLinks, guides }) => (
  <>
    <section className="py-24 md:py-32 px-6 bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white border border-gray-200 rounded-full mb-4 text-brand-gold shadow-sm">
            <HelpCircle size={24} />
          </div>
          <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-sm mb-4 block">FAQ</span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-dark font-medium">{faqHeading}</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-[0_15px_45px_rgba(0,0,0,0.02)] open:border-brand-gold/40 transition-colors"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-serif text-lg md:text-xl font-bold text-brand-dark">
                <h3 className="m-0">{faq.q}</h3>
                <span className="shrink-0 text-brand-gold text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-[#4a5568] leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {(areaLinks.length > 0 || guides.length > 0) && (
      <section className="py-20 md:py-28 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20">
          {areaLinks.length > 0 && (
            <div>
              <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-xs mb-3 flex items-center gap-2">
                <MapPin size={14} /> Local Service Pages
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-dark font-medium mb-8">{areaHeading}</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {areaLinks.map((l) => (
                  <li key={l.path}>
                    <Link
                      to={l.path}
                      className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-gray-100 text-sm font-semibold text-brand-dark hover:border-brand-gold/40 hover:text-brand-gold transition-colors"
                    >
                      {l.name}
                      <ArrowRight size={14} className="text-brand-gold group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {guides.length > 0 && (
            <div>
              <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-xs mb-3 flex items-center gap-2">
                <BookOpen size={14} /> Homeowner Guides
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-dark font-medium mb-8">Plan Your Project</h2>
              <ul className="space-y-3">
                {guides.map((g) => (
                  <li key={g.path}>
                    <Link
                      to={g.path}
                      className="group flex items-start justify-between gap-4 px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 text-brand-dark hover:border-brand-gold/40 transition-colors"
                    >
                      <span className="font-serif text-lg leading-snug group-hover:text-brand-gold transition-colors">{g.name}</span>
                      <ArrowRight size={16} className="text-brand-gold mt-1 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/blog" className="inline-flex items-center gap-2 pt-2 text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-gold transition-colors">
                    All guides <ArrowRight size={14} className="text-brand-gold" />
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>
    )}
  </>
);
