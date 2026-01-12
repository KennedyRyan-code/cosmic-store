import React from 'react';
import { Product } from '../types';
import { StarIcon, CartIcon, HeartIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart }) => {
  return (
    <div 
      className="bg-white rounded-sm p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-pointer relative flex flex-col items-center text-center h-full"
      onClick={onClick}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
        {product.isNew && <span className="bg-blue-500 text-white text-[8px] px-1.5 py-0.5 font-black uppercase tracking-widest rounded-sm">New</span>}
        {product.discount && <span className="bg-red-500 text-white text-[8px] px-1.5 py-0.5 font-black uppercase tracking-widest rounded-sm">-{product.discount}%</span>}
      </div>

      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden mb-6 group/img">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover Actions Overlay (Desktop) */}
        <div className="absolute inset-0 bg-white/40 opacity-0 group-hover/img:opacity-100 transition-opacity hidden sm:flex items-center justify-center space-x-2">
           <button onClick={onAddToCart} className="bg-blue-500 text-white p-2.5 rounded-sm shadow-md hover:bg-blue-600 transition-colors"><CartIcon size={14} /></button>
           <button className="bg-white text-gray-700 p-2.5 rounded-sm shadow-md hover:text-blue-500 border border-gray-100 transition-colors"><HeartIcon size={14} /></button>
        </div>
        {/* Mobile Action Bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex sm:hidden space-x-2 z-10">
           <button onClick={onAddToCart} className="bg-blue-500 text-white p-2 rounded-full shadow-lg"><CartIcon size={12} /></button>
           <button className="bg-white text-gray-700 p-2 rounded-full shadow-lg border border-gray-100"><HeartIcon size={12} /></button>
        </div>
      </div>

      {/* Info */}
      <div className="w-full flex flex-col flex-1">
        <span className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] mb-1">{product.category}</span>
        <h3 className="text-[13px] font-bold text-gray-800 line-clamp-2 min-h-[40px] leading-snug group-hover:text-blue-500 transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex justify-center items-center mt-auto mb-3">
          {[...Array(5)].map((_, i) => (
            <StarIcon 
              key={i} 
              fill={i < Math.floor(product.rating) ? "#ffc107" : "none"} 
              className={i < Math.floor(product.rating) ? "text-[#ffc107]" : "text-gray-300"}
              size={11}
            />
          ))}
          <span className="text-[9px] text-gray-400 ml-1 font-bold">({product.reviews})</span>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-center space-x-2">
          <span className="text-blue-500 font-black text-sm">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-gray-300 line-through text-[11px] font-bold">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
