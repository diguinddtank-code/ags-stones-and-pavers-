import React from 'react';
import { Star, Quote, MapPin, CheckCircle } from 'lucide-react';
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

  return (
    <section id="testimonials" className="py-24 bg-brand-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center fade-in-section">
           <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-sm">Client Stories</span>
           <h2 className="mt-2 font-serif text-4xl md:text-5xl font-bold text-brand-dark">Loved by Locals</h2>
           <div className="mt-4 flex justify-center items-center gap-2">
              <div className="flex gap-0.5">
                 {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-brand-gold fill-brand-gold" />)}
              </div>
              <span className="text-sm font-bold text-brand-dark">5.0/5 Average Rating</span>
           </div>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-brand-light to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-brand-light to-transparent z-10"></div>

        {/* Moving Track */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] py-10">
           {marqueeReviews.map((review, index) => (
             <div 
                key={`${review.id}-${index}`} 
                className="w-[300px] md:w-[400px] mx-4 bg-white p-8 rounded-2xl shadow-[0_5px_30px_-5px_rgba(0,0,0,0.05)] border border-gray-100 flex-shrink-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] hover:border-brand-gold/30 cursor-default"
             >
                <div className="flex justify-between items-start mb-6">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-gold/20">
                         <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                         <h4 className="font-bold text-brand-dark leading-tight text-sm">{review.name}</h4>
                         <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                            <MapPin size={10} /> {review.location}
                         </div>
                      </div>
                   </div>
                   <Quote className="text-brand-gold/20 w-6 h-6" />
                </div>
                
                <div className="flex gap-1 mb-3">
                   {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-brand-gold fill-brand-gold" />
                   ))}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed italic mb-4 line-clamp-3">"{review.text}"</p>
                
                <div className="pt-3 border-t border-gray-50 flex items-center gap-1.5 text-[10px] font-bold text-green-700 uppercase tracking-wider">
                   <CheckCircle size={12} /> Verified Project
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="mt-12 text-center">
         <a href="https://www.google.com" target="_blank" rel="noreferrer" className="inline-block px-8 py-3 bg-white border border-gray-200 text-brand-dark font-bold text-sm rounded-full shadow-sm hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all">
            See All Reviews on Google
         </a>
      </div>
    </section>
  );
};