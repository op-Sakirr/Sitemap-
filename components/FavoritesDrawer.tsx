'use client';

import React from 'react';
import { Property } from '@/types/property';
import { X, Heart, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Property[];
  onRemoveFavorite: (id: string) => void;
  onPropertyClick: (property: Property) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onPropertyClick,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-[150]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[160] shadow-2xl flex flex-col"
          >
            <div className="p-8 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-3">
                <Heart size={24} className="text-red-500" fill="currentColor" />
                <h2 className="text-2xl font-black text-slate-900">Favorites</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {favorites.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <Heart size={48} className="mb-4 text-slate-200" />
                  <p className="text-slate-400 font-medium">No favorites yet</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {favorites.map((property) => (
                    <motion.div
                      layout
                      key={property.id}
                      className="group relative flex gap-4 bg-slate-50 p-4 rounded-3xl cursor-pointer hover:bg-white hover:shadow-lg transition-all"
                      onClick={() => onPropertyClick(property)}
                    >
                      <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 pr-8">
                        <h4 className="font-bold text-slate-900 truncate mb-1">
                          {property.title}
                        </h4>
                        <p className="text-slate-500 text-sm truncate mb-2">
                          {property.location}
                        </p>
                        <p className="font-black text-slate-900">
                          ${(property.price / 1000).toLocaleString()}k
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFavorite(property.id);
                        }}
                        className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {favorites.length > 0 && (
              <div className="p-8 border-t border-slate-100 bg-slate-50/50">
                <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-colors">
                  Contact About All
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
