import React from 'react';
import { MapPin, Phone, Mail, ArrowRight, Navigation } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-brand-light relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/5 skew-x-12 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-12 text-center md:text-left fade-in-section">
            <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-sm">Start Your Project</span>
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-brand-dark mt-2">Let's Build Your Vision</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Enhanced Form */}
          <div className="fade-in-section">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100">
                <h3 className="font-serif text-2xl font-bold text-brand-dark mb-6">Request a Consultation</h3>
                <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-dark uppercase tracking-widest">First Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all placeholder-gray-400" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-dark uppercase tracking-widest">Last Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all placeholder-gray-400" placeholder="Doe" />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-dark uppercase tracking-widest">Email Address</label>
                    <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all placeholder-gray-400" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-dark uppercase tracking-widest">Phone Number</label>
                    <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all placeholder-gray-400" placeholder="(555) 000-0000" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-dark uppercase tracking-widest">Project Details</label>
                    <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all placeholder-gray-400 resize-none" placeholder="I'm interested in a paver patio with a fire pit..."></textarea>
                </div>

                <button className="w-full group bg-brand-dark text-white py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-brand-gold transition-all shadow-lg flex items-center justify-center gap-3 mt-4">
                    <span>Submit Request</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                </form>
            </div>
          </div>

          {/* Enhanced Map Widget */}
          <div className="flex flex-col gap-6 fade-in-section delay-200 h-full">
             
             {/* Map Container */}
            <div className="relative flex-grow min-h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-200 group">
              {/* The Map */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.857642594639!2d-84.1802526848419!3d34.04753698060684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f59f0f9b0b0b0b%3A0x0!2zMzTCsDAyJzUxLjEiTiA4NMKwMTAnNDEuMCJX!5e0!3m2!1sen!2sus!4v1689000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              ></iframe>

              {/* Overlay Location Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
                 <div className="flex items-start justify-between gap-4">
                    <div>
                        <h4 className="font-serif font-bold text-brand-dark text-lg mb-1">AGS Stones & Pavers</h4>
                        <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                            <MapPin size={14} className="text-brand-gold" /> 
                            4579 Abbotts Bridge Rd, Duluth, GA
                        </p>
                        
                        <div className="flex gap-4 text-sm font-medium">
                            <a href="tel:6784287630" className="flex items-center gap-2 text-brand-dark hover:text-brand-gold transition-colors">
                                <Phone size={14} /> (678) 428-7630
                            </a>
                            <a href="mailto:agstones.pavers@gmail.com" className="hidden sm:flex items-center gap-2 text-brand-dark hover:text-brand-gold transition-colors">
                                <Mail size={14} /> Email Us
                            </a>
                        </div>
                    </div>
                    
                    <a 
                        href="https://www.google.com/maps/dir//4579+Abbotts+Bridge+Rd+Suite+-10,+Duluth,+GA+30097" 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-shrink-0 w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                        title="Get Directions"
                    >
                        <Navigation size={20} />
                    </a>
                 </div>
              </div>
            </div>

            {/* Simple Service Area Text */}
            <p className="text-center text-gray-400 text-sm">
                Proudly Serving: Duluth • Alpharetta • Johns Creek • Suwanee • Roswell • Milton
            </p>

          </div>

        </div>
      </div>
    </section>
  );
};