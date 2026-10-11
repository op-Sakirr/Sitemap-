'use client';

import React from 'react';
import { Property } from '@/types/property';
import { X, BedDouble, Bath, Square, MapPin, Share2, Heart, Phone } from 'lucide-react';
import { motion } from 'motion/react';

interface PropertyDetailProps {
  property: Property;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const PropertyDetail: React.FC<PropertyDetailProps> = ({
  property,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-slate-950/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-white/80 backdrop-blur-md p-2 rounded-full text-slate-900 hover:bg-white transition-all shadow-sm"
        >
          <X size={24} />
        </button>

        <div className="w-full md:w-3/5 h-64 md:h-auto overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              {property.type}
            </span>
            {property.isFeatured && (
              <span className="bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                Featured
              </span>
            )}
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
            {property.title}
          </h2>

          <div className="flex items-center gap-1.5 text-slate-500 mb-8">
            <MapPin size={18} />
            <span className="text-lg">{property.location}</span>
          </div>

          <div className="flex items-center justify-between py-8 border-y border-slate-100 mb-8">
            <div>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-1">
                Price
              </span>
              <span className="text-4xl font-black text-slate-900">
                ${property.price.toLocaleString()}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => onToggleFavorite(property.id)}
                className={`p-4 rounded-2xl border transition-all ${
                  isFavorite
                    ? 'bg-red-50 text-red-500 border-red-100'
                    : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-200'
                }`}
              >
                <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
              <button className="p-4 rounded-2xl bg-slate-50 text-slate-400 border border-slate-100 hover:border-slate-200 transition-all">
                <Share2 size={24} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="bg-slate-50 p-6 rounded-3xl text-center">
              <BedDouble size={24} className="mx-auto mb-2 text-slate-400" />
              <div className="text-xl font-bold text-slate-900">{property.beds}</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Beds</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl text-center">
              <Bath size={24} className="mx-auto mb-2 text-slate-400" />
              <div className="text-xl font-bold text-slate-900">{property.baths}</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Baths</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl text-center">
              <Square size={24} className="mx-auto mb-2 text-slate-400" />
              <div className="text-xl font-bold text-slate-900">{property.sqft.toLocaleString()}</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Sqft</div>
            </div>
          </div>

          <div className="mb-12">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">
              Description
            </h4>
            <p className="text-slate-600 leading-relaxed text-lg">
              {property.description} This exquisite property offers a perfect blend of luxury, comfort, and sophisticated design. Every detail has been meticulously curated to provide an unparalleled living experience.
            </p>
          </div>

          <button className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
            <Phone size={24} />
            Contact Agent
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
