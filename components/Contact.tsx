import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, ArrowRight, Navigation, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const serviceAreas = [
  "Atlanta, GA",
  "Bill Arp, GA",
  "Brookhaven, GA",
  "College Park, GA",
  "Douglasville, GA",
  "Fairburn, GA",
  "Hiram, GA",
  "Mableton, GA",
  "Marietta, GA",
  "Powder Springs, GA",
  "Sandy Springs, GA",
  "South Fulton, GA",
  "Villa Rica, GA",
  "Vinings, GA"
];

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    details: ''
  });
  
  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [loadMap, setLoadMap] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Performance: Lazy load map only when in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoadMap(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px" });

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('LOADING');

    try {
      const response = await fetch("https://formsubmit.co/ajax/agstones.pavers@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: `New Lead: ${formData.firstName} ${formData.lastName}`,
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            message: formData.details,
            _template: "table"
        })
      });

      if (response.ok) {
        setStatus('SUCCESS');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', details: '' });
        setTimeout(() => setStatus('IDLE'), 5000);
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      console.error("Form Error:", error);
      setStatus('ERROR');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[#f8f9fa]">
         <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/concrete-seamless.png")` }}></div>
         <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/5 skew-x-12 pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-12 text-center md:text-left fade-in-section">
            <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-sm">Start Your Project</span>
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-brand-dark mt-2">Let's Build Your Vision</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Enhanced Glass Form */}
          <div className="fade-in-section">
            <div className="bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white/60 relative overflow-hidden">
                
                {status === 'SUCCESS' ? (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-xl z-20 flex flex-col items-center justify-center text-center p-8 animate-[fadeIn_0.5s_ease-out]">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-brand-dark mb-2">Request Received!</h3>
                    <p className="text-gray-500">
                      Thank you, {formData.firstName || 'Customer'}. We have received your project details and will contact you shortly.
                    </p>
                    <button 
                      onClick={() => setStatus('IDLE')}
                      className="mt-6 text-sm font-bold text-brand-gold uppercase tracking-widest hover:text-brand-dark transition-colors"
                    >
                      Send Another Request
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-serif text-2xl font-bold text-brand-dark mb-6">Request a Consultation</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label htmlFor="firstName" className="text-xs font-bold text-brand-dark uppercase tracking-widest">First Name</label>
                            <input 
                              id="firstName" 
                              name="firstName" 
                              type="text" 
                              required
                              value={formData.firstName}
                              onChange={handleChange}
                              className="w-full bg-white/50 border border-gray-200/60 rounded-lg p-4 focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all placeholder-gray-400 backdrop-blur-sm" 
                              placeholder="John" 
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="lastName" className="text-xs font-bold text-brand-dark uppercase tracking-widest">Last Name</label>
                            <input 
                              id="lastName" 
                              name="lastName" 
                              type="text" 
                              required
                              value={formData.lastName}
                              onChange={handleChange}
                              className="w-full bg-white/50 border border-gray-200/60 rounded-lg p-4 focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all placeholder-gray-400 backdrop-blur-sm" 
                              placeholder="Doe" 
                            />
                          </div>
                      </div>
                      
                      <div className="space-y-2">
                          <label htmlFor="email" className="text-xs font-bold text-brand-dark uppercase tracking-widest">Email Address</label>
                          <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-white/50 border border-gray-200/60 rounded-lg p-4 focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all placeholder-gray-400 backdrop-blur-sm" 
                            placeholder="john@example.com" 
                          />
                      </div>

                      <div className="space-y-2">
                          <label htmlFor="phone" className="text-xs font-bold text-brand-dark uppercase tracking-widest">Phone Number</label>
                          <input 
                            id="phone" 
                            name="phone" 
                            type="tel" 
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-white/50 border border-gray-200/60 rounded-lg p-4 focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all placeholder-gray-400 backdrop-blur-sm" 
                            placeholder="(555) 000-0000" 
                          />
                      </div>

                      <div className="space-y-2">
                          <label htmlFor="details" className="text-xs font-bold text-brand-dark uppercase tracking-widest">Project Details</label>
                          <textarea 
                            id="details" 
                            name="details" 
                            rows={4} 
                            required
                            value={formData.details}
                            onChange={handleChange}
                            className="w-full bg-white/50 border border-gray-200/60 rounded-lg p-4 focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all placeholder-gray-400 resize-none backdrop-blur-sm" 
                            placeholder="I'm interested in a paver patio with a fire pit..."
                          ></textarea>
                      </div>

                      {status === 'ERROR' && (
                        <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                          <AlertCircle size={16} />
                          <span>Something went wrong. Please call us directly at (678) 428-7630.</span>
                        </div>
                      )}

                      <button 
                        type="submit"
                        disabled={status === 'LOADING'}
                        className="w-full group bg-brand-dark text-white py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-brand-gold transition-all shadow-lg flex items-center justify-center gap-3 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                          {status === 'LOADING' ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Sending Request...
                            </>
                          ) : (
                            <>
                              <span>Submit Request</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                      </button>
                    </form>
                  </>
                )}
            </div>
          </div>

          {/* Enhanced Service Area Layout */}
          <div className="fade-in-section delay-200 flex flex-col gap-6">
             
             {/* Map Container - Full Width in this column */}
             <div ref={mapContainerRef} className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-white/50 group bg-gray-100">
                {loadMap ? (
                  <iframe 
                    title="Map of AGS Stones Location in Duluth, GA"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.857642594639!2d-84.1802526848419!3d34.04753698060684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f59f0f9b0b0b0b%3A0x0!2zMzTCsDAyJzUxLjEiTiA4NMKwMTAnNDEuMCJX!5e0!3m2!1sen!2sus!4v1689000000000!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  ></iframe>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <div className="text-gray-400 flex flex-col items-center">
                       <MapPin size={32} className="mb-2 opacity-50"/>
                       <span className="text-xs uppercase tracking-widest">Loading Map...</span>
                    </div>
                  </div>
                )}
             </div>

             {/* SEO Location List - Glass */}
             <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-sm">
                 <h4 className="font-serif font-bold text-xl text-brand-dark mb-4 flex items-center gap-2">
                    <MapPin className="text-brand-gold" size={24} /> Service Areas
                 </h4>
                 <div className="grid grid-cols-2 md:grid-cols-2 gap-y-3 gap-x-4">
                    {serviceAreas.map((area, index) => (
                       <div key={index} className="flex items-center gap-2 group cursor-default">
                          <MapPin size={14} className="text-red-600 flex-shrink-0 group-hover:scale-125 transition-transform" fill="currentColor" />
                          <span className="text-sm font-bold text-brand-dark underline decoration-gray-300 underline-offset-4 decoration-1 group-hover:decoration-brand-gold transition-all">
                             {area}
                          </span>
                       </div>
                    ))}
                 </div>
                 <p className="mt-6 text-xs text-gray-400 border-t border-gray-200/50 pt-3">
                    Proudly serving Metro Atlanta and surrounding communities.
                 </p>
             </div>

          </div>

        </div>
      </div>
    </section>
  );
};