import React from 'react';
import { AppState } from '../types';
import ProductCard from './ProductCard';
import { getPersonalizedPrice } from '../services/pricingService';

interface BestSellersPageProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

const BestSellersPage: React.FC<BestSellersPageProps> = ({ state, dispatch }) => {
  // Best sellers logic: Rating 4.5+ or high review count
  const topProducts = state.products
    .filter(p => p.rating >= 4.5)
    .sort((a, b) => b.reviews - a.reviews);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="bg-[#002e5b] rounded-[3rem] p-16 mb-16 text-white relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>
        
        <div className="relative z-10">
          <span className="bg-[#ffc107] text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block">
            Elite Selection
          </span>
          <h1 className="text-6xl font-black tracking-tighter mb-6">BEST SELLERS</h1>
          <p className="text-blue-100/70 max-w-xl text-lg font-medium leading-relaxed">
            These assets represent the pinnacle of operational reliability, consistently top-rated by our global community of engineers and tech enthusiasts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {topProducts.map((product, idx) => {
          const pricing = getPersonalizedPrice(product, state.user);
          return (
            <div key={product.id} className="relative">
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#ffc107] text-black rounded-full flex items-center justify-center font-black text-xs z-20 shadow-lg border-2 border-white">
                #{idx + 1}
              </div>
              <ProductCard 
                product={{...product, price: pricing.finalPrice}} 
                onClick={() => dispatch({ type: 'SET_PRODUCT', payload: product.id })}
                onAddToCart={(e) => {
                  e.stopPropagation();
                  dispatch({ type: 'ADD_TO_CART', payload: product });
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BestSellersPage;
