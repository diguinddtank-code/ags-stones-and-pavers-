import React from 'react';
import { Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-serif text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-brand-gold">AGS</span> STONES
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Premier hardscape and outdoor living solutions in Metro Atlanta. We build the foundation for your best memories.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/agsstonesandpavers" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-brand-gold transition-colors text-sm font-bold tracking-wide group"
              >
                <Instagram size={18} />
                <span className="group-hover:text-white">Follow our Work</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-brand-gold transition-colors">Paver Driveways</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Retaining Walls</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Outdoor Kitchens</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Pool Decks</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Fire Pits</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Service Areas</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Duluth</li>
              <li>Johns Creek</li>
              <li>Alpharetta</li>
              <li>Suwanee</li>
              <li>Metro Atlanta</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <address className="not-italic text-gray-400 text-sm space-y-3">
              <p>4579 Abbotts Bridge Rd Suite -10</p>
              <p>Duluth, GA 30097</p>
              <p><a href="tel:6784287630" className="hover:text-brand-gold">(678) 428-7630</a></p>
              <p><a href="mailto:agstones.pavers@gmail.com" className="hover:text-brand-gold">agstones.pavers@gmail.com</a></p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} AGS Stones and Pavers. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};