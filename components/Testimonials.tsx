import React from 'react';
import { Star, Quote, MapPin, CheckCircle, ArrowRight, Phone } from 'lucide-react';
import { Testimonial } from '../types';

const reviews: Testimonial[] = [
  {
    id: '1',
    name: 'Michael Robinson',
    location: 'Duluth, GA',
    rating: 5,
    text: 'AGS transformed our backyard into a resort. The retaining wall is both functional and beautiful, and the paver patio is flawless.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    location: 'Alpharetta, GA',
    rating: 5,
    text: 'Incredible craftsmanship on our outdoor kitchen. The team was professional, clean, and finished ahead of schedule.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '3',
    name: 'David Chen',
    location: 'Suwanee, GA',
    rating: 5,
    text: 'We hired them for a custom pool deck. The attention to detail with the stone work was amazing. Looks luxury.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '4',
    name: 'Emily Thompson',
    location: 'Johns Creek, GA',
    rating: 5,
    text: 'Best contractor experience I have had in Atlanta. The final driveway looks like a magazine cover.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '5',
    name: 'Robert Garcia',
    location: 'Roswell, GA',
    rating: 5,
    text: 'They fixed a bad retaining wall job from another company and made it look incredible. Highly recommend AGS.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '6',
    name: 'Amanda Lewis',
    location: 'Marietta, GA',
    rating: 5,
    text: 'Our fire pit area is now the family favorite spot. The team cleaned up daily. A class act company.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
  }
];

export const Testimonials: React.FC = () => {
  // Duplicate reviews to create seamless loop
  const marqueeReviews = [...reviews, ...reviews];

  // Schema for aggregate rating
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AGS Stones and Pavers",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": reviews.length,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map(r => ({
      "@type": "Review",
      "author": {
         "@type": "Person",
         "name": r.name
      },
      "reviewRating": {
         "@type": "Rating",
         "ratingValue": r.rating,
         "bestRating": "5"
      },
      "reviewBody": r.text
    }))
  };

  return (
    <section id="testimonials" className="pt-24 pb-12 relative overflow-hidden">
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      {/* BACKGROUND TEXTURE */}
      <div className="absolute inset-0 bg-[#f8f9fa]">
         <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/concrete-seamless.png")` }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="text-center fade-in-section">
           <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-sm">Client Stories</span>
           <h2 className="mt-2 font-serif text-4xl md:text-5xl font-bold text-brand-dark">Loved by Locals</h2>
           <div className="mt-4 flex justify-center items-center gap-2">
              <div className="flex gap-0.5" aria-hidden="true">
                 {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-brand-gold fill-brand-gold" />)}
              </div>
              <span className="text-sm font-bold text-brand-dark">5.0/5 Average Rating</span>
           </div>
        </div>
      </div>

      {/* Marquee Container */}
      <div 
        className="relative w-full overflow-hidden mb-16 z-10" 
        aria-label="Scrolling list of client reviews"
        role="region"
      >
        {/* Gradients to fade edges - Adjusted for new bg */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-[#f8f9fa] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-[#f8f9fa] to-transparent z-10"></div>

        {/* Moving Track */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] py-4">
           {marqueeReviews.map((review, index) => (
             <article 
                key={`${review.id}-${index}`} 
                className="w-[300px] md:w-[400px] mx-4 bg-white/60 backdrop-blur-xl p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/50 flex-shrink-0 transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_20px_50px_-12px_rgba(212,175,55,0.25)] hover:border-brand-gold/40 cursor-default"
             >
                <div className="flex justify-between items-start mb-6">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-gold/20">
                         <img src={review.image} alt={`${review.name} from ${review.location}`} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div>
                         <h3 className="font-bold text-brand-dark leading-tight text-sm">{review.name}</h3>
                         <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                            <MapPin size={10} aria-hidden="true" /> {review.location}
                         </div>
                      </div>
                   </div>
                   <Quote className="text-brand-gold/20 w-6 h-6" aria-hidden="true" />
                </div>
                
                <div className="flex gap-1 mb-3" aria-label={`Rated ${review.rating} out of 5 stars`}>
                   {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-brand-gold fill-brand-gold" aria-hidden="true" />
                   ))}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed italic mb-4 line-clamp-3">"{review.text}"</p>
                
                <div className="pt-3 border-t border-brand-gold/10 flex items-center gap-1.5 text-[10px] font-bold text-green-700 uppercase tracking-wider">
                   <CheckCircle size={12} aria-hidden="true" /> Verified Project
                </div>
             </article>
           ))}
        </div>
      </div>

      {/* STRATEGIC CONVERSION BLOCK - HIGH VISIBILITY CTA */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section relative z-10">
         <div className="relative rounded-3xl overflow-hidden bg-brand-dark shadow-2xl border border-white/10 group">
            {/* Background Effects */}
            <div className="absolute inset-0">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[100px] group-hover:bg-brand-gold/20 transition-all duration-1000"></div>
               <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-900/20 rounded-full blur-[80px]"></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8 md:gap-12">
               
               {/* Left: Persuasion Text */}
               <div className="text-center md:text-left flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest mb-4">
                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                     Limited Availability: Booking Now
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight">
                     Ready to Start <br className="hidden md:block" />
                     <span className="text-brand-gold">Your Project?</span>
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto md:mx-0">
                     Don't wait until the season is over. Secure your spot on our calendar today and let's build the backyard of your dreams.
                  </p>
               </div>

               {/* Right: Action Buttons */}
               <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <a 
                    href="#contact" 
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold text-white font-bold rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-white hover:text-brand-dark hover:scale-105 transition-all duration-300 uppercase tracking-wide text-xs md:text-sm group-hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]"
                  >
                     Get Free Estimate <ArrowRight size={16} />
                  </a>
                  <a 
                    href="tel:6784287630" 
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 uppercase tracking-wide text-xs md:text-sm"
                  >
                     <Phone size={16} /> Call Now
                  </a>
               </div>

            </div>
         </div>
      </div>

    </section>
  );
};