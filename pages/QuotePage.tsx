import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Lock, ShieldCheck } from 'lucide-react';
import { SEO } from '../components/SEO';

const servicesOptions = [
  { id: 'driveway', label: 'Driveway Pavers' },
  { id: 'patio', label: 'Outdoor Patio' },
  { id: 'retaining', label: 'Retaining Wall' },
  { id: 'pool', label: 'Pool Deck' },
  { id: 'fire', label: 'Fire Features' },
  { id: 'other', label: 'Other/Custom' },
];

export const QuotePage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    
    // Extract form data
    const formData = new FormData(e.currentTarget);
    const data = {
        access_key: "faed6a10-57e8-4faa-b1ec-74c37345ea30",
        name: formData.get('fullName'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        subject: `New Quote Request: ${formData.get('fullName')}`,
        message: `Zip Code: ${formData.get('zip')}\nSelected Service: ${selectedService || 'Unspecified'}\n\nProject Details:\n${formData.get('details')}`
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const resData = await response.json().catch(() => ({}));

      if (response.ok && (resData.success === "true" || resData.success === true)) {
        setIsSuccess(true);
      } else {
        console.error("Form delivery issue:", resData);
        setErrorMessage(resData.message || "Erro de envio com o Web3Forms. Por favor, tente novamente ou ligue para (678) 428-7630.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Erro de rede. Verifique sua conexão ou tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col relative overflow-hidden font-sans">
      <SEO 
        title="Get a Free Estimate | AGS Stones and Pavers"
        description="Request a free, factory-direct estimate for your hardscaping project. Driveways, patios, retaining walls, and custom stone work in your area."
      />

      {/* BACKGROUND VIDEO LAYER - Static, no parallax to save GPU */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
          className="w-full h-full object-cover object-center scale-105"
        >
          <source src="https://storage.googleapis.com/msgsndr/yRboz8P4zFeLUF6bAk8i/media/680a5a6f1eba4b32d1925215.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen p-4 md:p-8">
        
        {/* Top Header / Back Button */}
        <div className="mb-8">
           <Link to="/" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors border border-white/20">
              <ArrowLeft size={16} /> Back to Home
           </Link>
        </div>

        {/* Page Titles */}
        <div className="max-w-4xl mx-auto text-center mb-12 mt-4 md:mt-12">
           <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-brand-gold font-bold mb-4 drop-shadow-lg leading-tight">
             Premium <span className="text-white">Hardscaping &</span>
             <span className="text-white block mt-2">Masonry</span>
           </h1>
           <p className="text-gray-200 text-lg md:text-xl font-medium tracking-wide">
             Lock in your exclusive factory-direct estimate. Experience luxury design
             <br className="hidden md:block" /> without the retail markup.
           </p>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[65rem] mx-auto bg-[#f8f9fa] rounded-[2rem] p-8 md:p-14 shadow-2xl relative overflow-hidden mb-12">
          
          {isSuccess ? (
            <div className="text-center py-20 animate-[fade-up_0.5s_ease-out]">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle2 className="w-10 h-10 text-green-600" />
               </div>
               <h3 className="text-3xl font-serif font-bold text-brand-dark mb-4">Request Received</h3>
               <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                 Thank you for reaching out. One of our project specialists will contact you shortly to schedule your on-site consultation.
               </p>
               <button onClick={() => setIsSuccess(false)} className="text-brand-dark font-bold uppercase tracking-widest text-sm border-b-2 border-brand-dark pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
                 Submit Another Request
               </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="animate-[fade-up_0.5s_ease-out]">
              
              <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8 pb-4">
                 <div className="flex items-center gap-4">
                    <div className="h-[2px] w-12 bg-brand-gold"></div>
                    <span className="text-brand-gold font-bold tracking-[0.15em] uppercase text-sm">Estimate Request</span>
                 </div>
                 <div className="flex items-center gap-2 text-[#8c98a4] text-xs font-bold tracking-widest uppercase mt-4 md:mt-0">
                    <Lock size={14} /> Secure
                 </div>
              </div>

              {/* Step 1: Project Type */}
              <div className="mb-10">
                 <label className="block text-[#8c98a4] font-bold tracking-widest uppercase text-xs mb-4">
                    Project Type
                 </label>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {servicesOptions.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedService(service.id)}
                        className={`py-5 px-3 rounded-2xl text-[15px] font-bold transition-all border-2 ${
                          selectedService === service.id 
                            ? 'bg-brand-gold/5 border-brand-gold text-brand-gold shadow-sm' 
                            : 'bg-white border-[#eef0f2] text-[#4a5568] hover:border-gray-300'
                        }`}
                      >
                        {service.label}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Step 2: Contact Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                 <div>
                    <input 
                      type="text" 
                      name="fullName"
                      required
                      placeholder="Full Name" 
                      className="w-full bg-white border border-[#eef0f2] rounded-2xl px-6 py-5 text-[#4a5568] placeholder-[#a0aec0] focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors text-[15px]"
                    />
                 </div>
                 <div>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      placeholder="Phone Number" 
                      className="w-full bg-white border border-[#eef0f2] rounded-2xl px-6 py-5 text-[#4a5568] placeholder-[#a0aec0] focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors text-[15px]"
                    />
                 </div>
                 <div>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="Email Address" 
                      className="w-full bg-white border border-[#eef0f2] rounded-2xl px-6 py-5 text-[#4a5568] placeholder-[#a0aec0] focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors text-[15px]"
                    />
                 </div>
                 <div>
                    <input 
                      type="text" 
                      name="zip"
                      required
                      placeholder="Zip Code" 
                      className="w-full bg-white border border-[#eef0f2] rounded-2xl px-6 py-5 text-[#4a5568] placeholder-[#a0aec0] focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors text-[15px]"
                    />
                 </div>
              </div>

              <div className="mb-8">
                 <textarea 
                   rows={4}
                   name="details"
                   required
                   placeholder="Tell us about your project (dimensions, stone preference, etc...)" 
                   className="w-full bg-white border border-[#eef0f2] rounded-2xl px-6 py-5 text-[#4a5568] placeholder-[#a0aec0] focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors resize-none text-[15px]"
                 ></textarea>
              </div>

              {errorMessage && (
                <div className="mb-6 p-5 bg-red-50 border border-red-200 text-red-800 rounded-2xl flex flex-col gap-1.5 shadow-sm text-[14px]">
                  <span className="font-bold text-red-900 block">❌ Envio Falhou</span>
                  <p className="leading-relaxed opacity-95">{errorMessage}</p>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#eb5d1e] hover:bg-[#d45119] text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-lg hover:shadow-xl flex justify-center items-center gap-2 disabled:opacity-70 mt-2"
              >
                {isSubmitting ? 'Processing...' : 'Get My Free Quote'} 
                {!isSubmitting && <span className="text-2xl leading-none font-light">→</span>}
              </button>
              
              <div className="flex items-center justify-center gap-6 mt-6 text-[#4a5568] text-[10px] font-bold uppercase tracking-widest">
                 <span className="flex items-center gap-1.5"><Lock size={12} className="text-green-600" /> 100% Secure</span>
                 <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                 <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-blue-600" /> Fast Response</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
