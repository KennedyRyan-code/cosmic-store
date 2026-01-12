import React, { useState } from 'react';
import { AppState } from '../types';
import ProductCard from './ProductCard';
import { getPersonalizedPrice } from '../services/pricingService';

interface ProductsPageProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ state, dispatch }) => {
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');

  const filteredProducts = state.products
    .filter(p => {
      const matchesCategory = !state.selectedCategory || p.category === state.selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(state.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // Newest is default based on array order for this demo
    });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-3">Inventory Manifest</h2>
          <h1 className="text-5xl font-black text-[#002e5b] tracking-tighter">ALL PRODUCTS</h1>
        </div>
        
        <div className="flex items-center space-x-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Sort by:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent border-none outline-none font-bold text-sm text-[#002e5b] pr-4 py-2 cursor-pointer"
          >
            <option value="newest">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
          <p className="text-2xl font-black text-gray-300">NO ASSETS MATCHING YOUR PARAMETERS</p>
          <button 
            onClick={() => dispatch({ type: 'SET_SEARCH', payload: '' })}
            className="mt-6 text-blue-500 font-black text-xs tracking-widest hover:underline"
          >
            CLEAR FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {filteredProducts.map(product => {
            const pricing = getPersonalizedPrice(product, state.user);
            return (
              <ProductCard 
                key={product.id} 
                product={{...product, price: pricing.finalPrice}} 
                onClick={() => dispatch({ type: 'SET_PRODUCT', payload: product.id })}
                onAddToCart={(e) => {
                  e.stopPropagation();
                  dispatch({ type: 'ADD_TO_CART', payload: product });
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
