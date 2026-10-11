'use client';

import React from 'react';
import { Property, PropertyType } from '@/types/property';
import { SlidersHorizontal } from 'lucide-react';

interface FiltersProps {
  activeType: PropertyType | 'All';
  onTypeChange: (type: PropertyType | 'All') => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  activeType,
  onTypeChange,
}) => {
  const types: (PropertyType | 'All')[] = ['All', 'House', 'Apartment', 'Villa', 'Condo'];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeType === type
                ? 'bg-slate-900 text-white shadow-lg'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto">
        <button className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-slate-400 transition-all">
          <SlidersHorizontal size={18} />
          More Filters
        </button>
        <select className="bg-white px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 focus:outline-none focus:border-slate-900 transition-all">
          <option>Newest First</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};
