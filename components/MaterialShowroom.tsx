import React, { useState } from 'react';
import { Layers, Check, Info } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  features: string[];
}

const materials: Material[] = [
  {
    id: 'travertine',
    name: 'Premium Travertine',
    category: 'Natural Stone',
    description: 'A classic favorite for pool decks. Travertine remains cool to the touch even in Atlanta summers and offers a non-slip luxury texture.',
    image: 'https://images.unsplash.com/photo-1621256133234-29e2f41d4517?q=80&w=1600&auto=format&fit=crop',
    features: ['Heat Resistant', 'Non-Slip Surface', 'Timeless Aesthetic']
  },
  {
    id: 'pavers',
    name: 'Interlocking Pavers',
    category: 'Engineered',
    description: 'Versatile and durable. Engineered pavers offer unlimited pattern possibilities and superior load-bearing strength for driveways.',
    image: 'https://images.unsplash.com/photo-1596527914909-328670cb6658?q=80&w=1600&auto=format&fit=crop',
    features: ['Crack Resistant', 'High Load Bearing', 'Modern Patterns']
  },
  {
    id: 'slate',
    name: 'Bluestone Slate',
    category: 'Natural Stone',
    description: 'Deep, rich tones that create a sophisticated contrast. Perfect for walkways and patios that require a natural, organic look.',
    image: 'https://images.unsplash.com/photo-1518640027989-d1c5d80bd3ca?q=80&w=1600&auto=format&fit=crop',
    features: ['Natural Variation', 'Organic Look', 'Durable']
  },
  {
    id: 'porcelain',
    name: 'Outdoor Porcelain',
    category: 'Modern',
    description: 'The ultimate in modern low-maintenance living. Stain-resistant, fade-resistant, and ultra-sleek for contemporary homes.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1600&auto=format&fit=crop',
    features: ['Stain Proof', 'Zero Maintenance', 'Ultra Modern']
  }
];

export const MaterialShowroom: React.FC = () => {
  const [activeMaterial, setActiveMaterial] = useState<Material>(materials[0]);

  return (
    <section id="materials" className="py-24 bg-brand-dark text-white relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16 fade-in-section">
           <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-sm">Material Library</span>
           <h2 className="mt-2 font-serif text-4xl md:text-5xl font-bold">Curated Stone Selection</h2>
           <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
             We only work with the finest materials. Explore our most popular options to find the perfect match for your home's architecture.
           </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start fade-in-section">
          
          {/* Menu */}
          <div className="lg:col-span-4 flex flex-col gap-3">
             {materials.map((mat) => (
                <button
                  key={mat.id}
                  onClick={() => setActiveMaterial(mat)}
                  className={`group relative p-6 rounded-xl text-left transition-all duration-300 border ${
                    activeMaterial.id === mat.id 
                    ? 'bg-white/10 border-brand-gold/50 shadow-lg' 
                    : 'bg-transparent border-white/5 hover:bg-white/5 hover:border-white/20'
                  }`}
                >
                   <div className="flex justify-between items-center mb-1">
                      <span className={`font-serif text-xl font-bold ${activeMaterial.id === mat.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                        {mat.name}
                      </span>
                      {activeMaterial.id === mat.id && <Layers className="text-brand-gold w-5 h-5 animate-pulse" />}
                   </div>
                   <span className="text-xs font-bold uppercase tracking-widest text-brand-gold/80">{mat.category}</span>
                </button>
             ))}
             
             <div className="mt-8 p-6 bg-brand-accent/20 rounded-xl border border-brand-accent/30 hidden lg:block">
                <div className="flex gap-3 mb-3">
                   <Info className="text-brand-gold w-6 h-6 flex-shrink-0" />
                   <p className="text-sm text-gray-300 italic">
                      "Not sure which to choose? During our consultation, we bring physical samples to your home so you can see them in your lighting."
                   </p>
                </div>
             </div>
          </div>

          {/* Display Area */}
          <div className="lg:col-span-8">
             <div className="relative aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10">
                {/* Image Transition Wrapper */}
                <div key={activeMaterial.id} className="absolute inset-0 animate-[fadeIn_0.5s_ease-out]">
                   <img 
                     src={activeMaterial.image} 
                     alt={activeMaterial.name} 
                     className="w-full h-full object-cover opacity-80"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                </div>

                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                   <div className="animate-[slideUp_0.5s_ease-out_0.1s_both]">
                      <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">{activeMaterial.name}</h3>
                      <p className="text-gray-200 text-lg leading-relaxed mb-6 max-w-2xl">
                        {activeMaterial.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-3">
                         {activeMaterial.features.map((feature, i) => (
                            <span key={i} className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold text-brand-gold border border-white/10 flex items-center gap-2">
                               <Check className="w-3 h-3" /> {feature}
                            </span>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};