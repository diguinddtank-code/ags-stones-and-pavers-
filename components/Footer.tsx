import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin } from 'lucide-react';
import { BUSINESS } from '../lib/business';

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
              Hardscape and stone work from a Duluth contractor serving homeowners across Metro Atlanta.
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
                href="https://www.facebook.com/profile.php?id=61594750743609" 
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
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog & Guides</Link></li>
              <li><Link to="/design-your-yard" className="hover:text-white transition-colors">3D Yard Studio</Link></li>
              <li><Link to="/service/driveway-pavers" className="hover:text-white transition-colors">Paver Driveway Installation</Link></li>
              <li><Link to="/service/retaining-wall-installation" className="hover:text-white transition-colors">Retaining Wall Installation</Link></li>
              <li><Link to="/service/outdoor-patio-builders" className="hover:text-white transition-colors">Outdoor Patio Installation</Link></li>
            </ul>
          </div>

          {/* Helpful service shortcuts */}
          <div>
             <h4 className="font-bold text-lg mb-6 text-brand-gold">Explore Services</h4>
             <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/service/driveway-pavers" className="hover:text-brand-gold transition-colors block">Driveways</Link></li>
                <li><Link to="/service/outdoor-patio-builders" className="hover:text-brand-gold transition-colors block">Patios</Link></li>
                <li><Link to="/service/retaining-wall-installation" className="hover:text-brand-gold transition-colors block">Retaining walls</Link></li>
                <li><Link to="/service/pool-deck-pavers" className="hover:text-brand-gold transition-colors block">Pool decks</Link></li>
                <li><Link to="/service/masonry-fireplaces" className="hover:text-brand-gold transition-colors block">Stonework & outdoor kitchens</Link></li>
                <li><Link to="/service-areas" className="hover:text-brand-gold transition-colors block">All service areas</Link></li>
             </ul>
             <div className="mt-6">
                <h5 className="font-bold text-sm text-brand-gold mb-2">Service Areas</h5>
                <p className="text-xs text-gray-500 leading-relaxed">
                   {BUSINESS.areaServed.map((area) => area.name).join(' · ')}
                </p>
             </div>
          </div>

          {/* Contact Info (Schema Consistency) */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-brand-gold">Contact Us</h4>
            <address className="not-italic text-gray-400 text-sm space-y-4">
              <p className="flex items-start gap-3">
                 <MapPin size={16} className="text-brand-gold mt-1 flex-shrink-0" />
                 <span>{BUSINESS.address.street}<br/>{BUSINESS.address.city}, {BUSINESS.address.region} {BUSINESS.address.postalCode}</span>
              </p>
              <p>
                 <a href={BUSINESS.phoneHref} className="hover:text-white block font-medium text-base text-gray-300">{BUSINESS.phoneDisplay}</a>
                 <span className="text-xs text-green-500 block mt-1">● Available Mon-Fri</span>
              </p>
              <p><a href={`mailto:${BUSINESS.email}`} className="hover:text-white underline decoration-gray-600 underline-offset-4">{BUSINESS.email}</a></p>
            </address>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} AGS Stones and Pavers LLC. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
