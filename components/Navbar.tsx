'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

interface NavbarProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ favoritesCount, onOpenFavorites }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${isScrolled ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
            <Home size={24} />
          </div>
          <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
            ESTATE
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['Buy', 'Rent', 'Sell', 'About'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-sm font-medium hover:opacity-70 transition-opacity ${
                isScrolled ? 'text-slate-600' : 'text-white/90'
              }`}
            >
              {item}
            </Link>
          ))}
          <button
            onClick={onOpenFavorites}
            className={`relative p-2 rounded-full transition-colors ${
              isScrolled ? 'hover:bg-slate-100 text-slate-900' : 'hover:bg-white/10 text-white'
            }`}
          >
            <Heart size={20} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {favoritesCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={onOpenFavorites}
            className={`relative p-2 ${isScrolled ? 'text-slate-900' : 'text-white'}`}
          >
            <Heart size={20} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {favoritesCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 ${isScrolled ? 'text-slate-900' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            {['Buy', 'Rent', 'Sell', 'About'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-lg font-medium text-slate-900 py-2 border-b border-slate-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
