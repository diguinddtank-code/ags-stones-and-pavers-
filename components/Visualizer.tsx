import React, { useState } from 'react';
import { Sparkles, Loader2, Image as ImageIcon, Wand2 } from 'lucide-react';
import { generateDesignConcept } from '../services/geminiService';
import { LoadingState } from '../types';

export const Visualizer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setStatus(LoadingState.LOADING);
    try {
      const imageUrl = await generateDesignConcept(prompt);
      setGeneratedImage(imageUrl);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <section id="ai-design" className="py-32 bg-[#fafaf9] text-brand-dark relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 fade-in-section">
           <div className="inline-flex items-center gap-2 border border-brand-gold/30 px-3 py-1 rounded-full bg-white mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">Beta Feature</span>
           </div>
           <h2 className="font-serif text-5xl font-bold mb-4 text-brand-dark">Imagine the Impossible</h2>
           <p className="text-gray-500 max-w-2xl mx-auto text-lg">
             Don't just guess what your new patio will look like. Describe it, and let our AI engine render a photorealistic concept instantly.
           </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-8 shadow-xl fade-in-section">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-brand-dark">
               <Wand2 className="text-brand-gold" /> Design Controls
            </h3>
            
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label htmlFor="prompt" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Your Vision
                </label>
                <textarea
                  id="prompt"
                  rows={6}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-brand-dark placeholder-gray-400 focus:ring-1 focus:ring-brand-gold focus:border-brand-gold transition-all outline-none resize-none text-sm leading-relaxed"
                  placeholder="Example: A luxurious travertine pool deck with a sunken fire pit lounge area, surrounded by lush hydrangeas, sunset lighting..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <div className="pt-4 border-t border-gray-100">
                 <button
                  type="submit"
                  disabled={status === LoadingState.LOADING || !prompt}
                  className="group w-full py-4 bg-brand-dark hover:bg-brand-gold text-white font-bold rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === LoadingState.LOADING ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Rendering...
                    </>
                  ) : (
                    <>
                      Generate Concept
                      <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
            
            {status === LoadingState.ERROR && (
               <p className="mt-4 text-red-500 text-xs bg-red-50 p-3 rounded-lg border border-red-100">
                  Generation failed. Please try a different prompt or check API connectivity.
               </p>
            )}
          </div>

          <div className="lg:col-span-3 relative fade-in-section delay-200 h-full min-h-[400px]">
             <div className="h-full aspect-video md:aspect-auto w-full bg-white rounded-3xl border border-gray-200 overflow-hidden flex items-center justify-center relative shadow-2xl">
                {generatedImage ? (
                  <img 
                    src={generatedImage} 
                    alt="AI Generated Design" 
                    className="w-full h-full object-cover animate-in fade-in zoom-in duration-700"
                  />
                ) : (
                  <div className="text-center p-8 opacity-40">
                     <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                     <p className="text-xl font-serif text-gray-400">Waiting for inspiration...</p>
                  </div>
                )}
                
                {/* Status Overlay */}
                {status === LoadingState.LOADING && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20">
                     <div className="text-center">
                        <Loader2 className="w-10 h-10 text-brand-gold animate-spin mx-auto mb-3" />
                        <p className="text-brand-gold text-sm tracking-widest uppercase animate-pulse">Dreaming up your design...</p>
                     </div>
                  </div>
                )}
             </div>
             
             {/* Decorative Frame Elements */}
             <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-brand-gold/30 rounded-tr-3xl"></div>
             <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-brand-gold/30 rounded-bl-3xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
};