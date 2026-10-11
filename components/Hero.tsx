'use client';

import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onSearch: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect simulation */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 scale-105"
        style={{
          backgroundImage: "url('/src/assets/images/luxury_modern_home_hero_1789930947841.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-slate-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Find Your Next <br /> <span className="text-white/80 italic font-serif">Perfect Space</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
            Discover a curated collection of premium properties in the most desirable locations across the country.
          </p>

          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl p-2 rounded-2xl border border-white/20 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="flex-1 w-full relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Enter city, neighborhood, or ZIP..."
                  className="w-full bg-white py-4 pl-12 pr-4 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm"
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
              <button className="w-full md:w-auto bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                <Search size={20} />
                Search
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
