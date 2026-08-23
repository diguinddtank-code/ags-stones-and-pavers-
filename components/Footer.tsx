import React from 'react';
import { Link } from 'react-router-dom';
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
              Atlanta's Premier Hardscape Contractor. Specialists in Pavers, Retaining Walls, and Masonry.
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
            <h4 className="font-bold text-lg mb-6 text-brand-gold">Company & Services</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/services" className="hover:text-white transition-colors">Our Services</Link></li>
              <li><Link to="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/service-areas" className="hover:text-white transition-colors">Service Areas</Link></li>
              <li><Link to="/service/driveway-pavers" className="hover:text-white transition-colors">Paver Driveway Installation</Link></li>
              <li><Link to="/service/retaining-wall-installation" className="hover:text-white transition-colors">Retaining Wall Contractors</Link></li>
              <li><Link to="/service/outdoor-patio-builders" className="hover:text-white transition-colors">Patio Builders Near Me</Link></li>
            </ul>
          </div>

          {/* Keyword Cloud (Strategic Long Tail Capture) */}
          <div>
             <h4 className="font-bold text-lg mb-6 text-brand-gold">Specialized Searches</h4>
             <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/driveway-pavers-atlanta" className="hover:text-brand-gold transition-colors block">Driveway Pavers Atlanta</Link></li>
                <li><Link to="/driveways-pavers-alpharetta-ga" className="hover:text-brand-gold transition-colors block">Driveways & Pavers Alpharetta</Link></li>
                <li><Link to="/outdoor-kitchen-johns-creek-ga" className="hover:text-brand-gold transition-colors block">Outdoor Kitchen Johns Creek</Link></li>
                <li><Link to="/retaining-walls-atlanta" className="hover:text-brand-gold transition-colors block">Retaining Walls Atlanta</Link></li>
                <li><Link to="/pool-deck-pavers-atlanta" className="hover:text-brand-gold transition-colors block">Pool Deck Pavers Atlanta</Link></li>
                <li><Link to="/paver-patio-duluth-ga" className="hover:text-brand-gold transition-colors block">Paver Patio Duluth GA</Link></li>
                <li><Link to="/paving-stone-contractor-roswell" className="hover:text-brand-gold transition-colors block">Paving Stone Contractor Roswell</Link></li>
                <li><Link to="/stone-patio-contractors-alpharetta-ga" className="hover:text-brand-gold transition-colors block">Stone Patio Contractors Alpharetta</Link></li>
                <li><Link to="/hardscape-installation-atlanta" className="hover:text-brand-gold transition-colors block">Hardscape Installation Atlanta</Link></li>
                <li><Link to="/hardscaping-smyrna" className="hover:text-brand-gold transition-colors block">Hardscaping Smyrna</Link></li>
                <li><Link to="/paver-patio-johns-creek-ga" className="hover:text-brand-gold transition-colors block">Paver Patio Johns Creek GA</Link></li>
                <li><Link to="/pavers-alpharetta-ga" className="hover:text-brand-gold transition-colors block">Pavers Alpharetta GA</Link></li>
                <li><Link to="/hardscape-roswell-ga" className="hover:text-brand-gold transition-colors block">Hardscape Roswell GA</Link></li>
                <li><Link to="/patio-installation-johns-creek" className="hover:text-brand-gold transition-colors block">Patio Installation Johns Creek</Link></li>
             </ul>
             <div className="mt-6">
                <h5 className="font-bold text-sm text-brand-gold mb-2">Service Areas</h5>
                <p className="text-xs text-gray-500 leading-relaxed">
                   Duluth • Alpharetta • Roswell • Johns Creek • Suwanee • Milton • Cumming • Sandy Springs • Marietta • Dunwoody • Norcross
                </p>
             </div>
          </div>

          {/* Contact Info (Schema Consistency) */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-brand-gold">Contact Us</h4>
            <address className="not-italic text-gray-400 text-sm space-y-4">
              <p className="flex items-start gap-3">
                 <MapPin size={16} className="text-brand-gold mt-1 flex-shrink-0" />
                 <span>4579 Abbotts Bridge Rd Suite 10<br/>Duluth, GA 30097</span>
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
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/services" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};