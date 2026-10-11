'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Filters } from '@/components/Filters';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyDetail } from '@/components/PropertyDetail';
import { FavoritesDrawer } from '@/components/FavoritesDrawer';
import { MOCK_PROPERTIES } from '@/data/mock-properties';
import { Property, PropertyType } from '@/types/property';
import { AnimatePresence, motion } from 'motion/react';

export default function Home() {
  const [activeType, setActiveType] = useState<PropertyType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Initialize favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('estate_favorites');
    if (saved) {
      try {
        setFavoriteIds(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('estate_favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((p) => {
      const matchesType = activeType === 'All' || p.type === activeType;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [activeType, searchQuery]);

  const favorites = useMemo(() => {
    return MOCK_PROPERTIES.filter((p) => favoriteIds.includes(p.id));
  }, [favoriteIds]);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <main className="min-h-screen bg-[#FDFDFD]">
      <Navbar
        favoritesCount={favoriteIds.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      <Hero onSearch={setSearchQuery} />

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col mb-16">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-300 mb-4">
            Curated Listings
          </h2>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight max-w-xl">
              Explore Our Most <br /> <span className="text-slate-400 italic font-serif">Exclusive Properties</span>
            </h3>
            <p className="text-slate-500 text-lg max-w-xs font-medium">
              Filter through thousands of hand-picked luxury spaces to find your next home.
            </p>
          </div>
        </div>

        <Filters
          activeType={activeType}
          onTypeChange={setActiveType}
          priceRange={[0, 10000000]}
          onPriceChange={() => {}}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={favoriteIds.includes(property.id)}
                  onToggleFavorite={toggleFavorite}
                  onClick={setSelectedProperty}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <p className="text-slate-400 text-xl font-medium">No properties found matching your criteria.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-20 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="p-2 rounded-lg bg-white text-slate-900">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">ESTATE</span>
            </div>
            <p className="text-white/50 leading-relaxed font-medium">
              Redefining luxury real estate through architectural excellence and curated experiences.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-8">Navigation</h4>
            <ul className="flex flex-col gap-4 text-white/50 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Properties</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Neighborhoods</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Agents</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Reviews</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8">Support</h4>
            <ul className="flex flex-col gap-4 text-white/50 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8">Newsletter</h4>
            <p className="text-white/50 mb-6 text-sm">Subscribe for exclusive early access to new listings.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex-1 text-sm focus:outline-none focus:ring-1 focus:ring-white/30"
              />
              <button className="bg-white text-slate-900 px-4 py-3 rounded-xl font-bold text-sm hover:bg-white/90 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-sm font-medium">
          <p>© 2026 ESTATE. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white/60">Instagram</a>
            <a href="#" className="hover:text-white/60">Twitter</a>
            <a href="#" className="hover:text-white/60">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <AnimatePresence>
        {selectedProperty && (
          <PropertyDetail
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
            isFavorite={favoriteIds.includes(selectedProperty.id)}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </AnimatePresence>

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={toggleFavorite}
        onPropertyClick={(p) => {
          setIsFavoritesOpen(false);
          setSelectedProperty(p);
        }}
      />
    </main>
  );
}
