import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50 animate-[slideUp_0.5s_ease-out]">
      <div className="max-w-6xl mx-auto bg-brand-dark text-white p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
        <div className="flex-1 text-sm md:text-base text-gray-300">
          <p>
            We use cookies to improve your experience on our site and to analyze our traffic. By continuing to use our site, you consent to our use of cookies. 
            Read our <Link to="/privacy-policy" className="text-brand-gold hover:underline">Privacy Policy</Link> for more information.
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <button 
            onClick={acceptCookies}
            className="bg-brand-gold text-white px-8 py-3 rounded-full font-bold hover:bg-brand-goldHover transition-colors"
          >
            Accept
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="p-3 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
