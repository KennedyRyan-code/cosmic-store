import React from 'react';
import { BRANDS } from '../constants';

const BrandSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-2">
        <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em]">Bestseller Brands</h3>
        <div className="flex space-x-2">
          <button className="p-1 border border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-500 transition-all"><svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg></button>
          <button className="p-1 border border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-500 transition-all"><svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60 hover:opacity-100 transition-opacity">
        {BRANDS.map(brand => (
          <div key={brand.name} className="flex justify-center p-4 grayscale hover:grayscale-0 transition-all cursor-pointer">
            <img src={brand.logo} alt={brand.name} className="h-8 object-contain" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandSection;
