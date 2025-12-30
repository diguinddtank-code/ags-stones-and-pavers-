import React from 'react';
import { Instagram, Facebook, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10 border-t border-white/10" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-serif text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-brand-gold">AGS</span> STONES
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Atlanta's Premier Hardscape Contractor. We build the foundation for your best memories with warranty-backed craftsmanship.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/agsstonesandpavers" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-brand-gold transition-colors text-sm font-bold tracking-wide group"
                aria-label="Follow AGS Stones on Instagram"
              >
                <Instagram size={18} />
                <span className="group-hover:text-white">Instagram</span>
              </a>
               <a 
                href="https://www.facebook.com/agsstonesandpavers" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-brand-gold transition-colors text-sm font-bold tracking-wide group"
                aria-label="Follow AGS Stones on Facebook"
              >
                <Facebook size={18} />
                <span className="group-hover:text-white">Facebook</span>
              </a>
            </div>
          </div>

          {/* Services Links (SEO Silo) */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-brand-gold">Our Services</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#services" className="hover:text-white transition-colors">Paver Driveways</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Retaining Walls</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Outdoor Kitchens</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Pool Decks</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Stone Fire Pits</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Patio Design</a></li>
            </ul>
          </div>

          {/* Service Areas (SEO Keyword Cloud) */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-brand-gold">Serving Metro Atlanta</h4>
            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
               {['Duluth', 'Johns Creek', 'Alpharetta', 'Suwanee', 'Roswell', 'Milton', 'Cumming', 'Sandy Springs', 'Marietta', 'Dunwoody', 'Norcross', 'Buford'].map((city) => (
                  <span key={city} className="bg-white/5 px-2 py-1 rounded-sm border border-white/5 hover:border-brand-gold/50 transition-colors cursor-default">
                     {city}
                  </span>
               ))}
            </div>
            <p className="mt-4 text-xs text-gray-500 italic">
               Top-rated in Fulton, Gwinnett, and Forsyth Counties.
            </p>
          </div>

          {/* Contact Info (Schema Consistency) */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-brand-gold">Contact Us</h4>
            <address className="not-italic text-gray-400 text-sm space-y-4">
              <p className="flex items-start gap-3">
                 <MapPin size={16} className="text-brand-gold mt-1 flex-shrink-0" />
                 <span>4579 Abbotts Bridge Rd Suite -10<br/>Duluth, GA 30097</span>
              </p>
              <p>
                 <a href="tel:6784287630" className="hover:text-white block font-medium text-base text-gray-300">(678) 428-7630</a>
                 <span className="text-xs text-green-500 block mt-1">● Available Mon-Sat</span>
              </p>
              <p><a href="mailto:agstones.pavers@gmail.com" className="hover:text-white underline decoration-gray-600 underline-offset-4">agstones.pavers@gmail.com</a></p>
            </address>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} AGS Stones and Pavers LLC. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#sitemap" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};