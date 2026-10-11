'use client';

import React from 'react';
import { BedDouble, Bath, Square, Heart, MapPin } from 'lucide-react';
import { Property } from '@/types/property';
import { motion } from 'motion/react';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onClick,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
      onClick={() => onClick(property)}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
            isFavorite
              ? 'bg-red-500 text-white'
              : 'bg-white/70 text-slate-900 hover:bg-white'
          }`}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full">
          {property.type}
        </div>
        
        {property.isFeatured && (
          <div className="absolute bottom-4 left-4 bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
            Featured
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-900 line-clamp-1 leading-tight">
            {property.title}
          </h3>
          <span className="text-xl font-black text-slate-900">
            ${(property.price / 1000000).toFixed(1)}M
          </span>
        </div>

        <div className="flex items-center gap-1 text-slate-500 text-sm mb-6">
          <MapPin size={14} className="flex-shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4 border-t border-slate-50">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-slate-900 font-semibold text-sm">
              <BedDouble size={16} className="text-slate-400" />
              {property.beds}
            </div>
            <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Beds</span>
          </div>
          <div className="flex flex-col gap-1 border-x border-slate-100 px-4">
            <div className="flex items-center gap-1.5 text-slate-900 font-semibold text-sm">
              <Bath size={16} className="text-slate-400" />
              {property.baths}
            </div>
            <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Baths</span>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <div className="flex items-center gap-1.5 text-slate-900 font-semibold text-sm">
              <Square size={16} className="text-slate-400" />
              {property.sqft.toLocaleString()}
            </div>
            <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider text-right">Sqft</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
