import React from 'react';
import { BLOG_POSTS, TESTIMONIALS } from '../constants';
import { StarIcon, CartIcon, HeartIcon } from './Icons';
import { Product } from '../types';

interface DealOfTheDayProps {
  products: Product[];
  dispatch: React.Dispatch<any>;
}

export const DealOfTheDay: React.FC<DealOfTheDayProps> = ({ products, dispatch }) => {
  if (!products || products.length < 2) return null;

  const deal = products[0];
  const bestPrice = products[1];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Deal of the Day */}
        <div className="bg-white p-6 sm:p-10 border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow duration-500">
          <div className="flex justify-between items-center mb-10 border-b border-gray-50 pb-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Special Offer</h3>
            <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100">Deal Of The Day</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            <div className="flex-1 flex items-center justify-center bg-gray-50/50 rounded-[2.5rem] p-6 group">
               <img src={deal.image} className="w-full h-48 sm:h-56 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" alt={deal.name} />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-2">{deal.category}</span>
              <h4 className="text-xl font-black text-[#002e5b] mb-4 leading-tight tracking-tight">{deal.name}</h4>
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-blue-600 font-black text-3xl">${deal.price}</span>
                <span className="text-gray-300 line-through text-sm font-bold">${deal.originalPrice}</span>
              </div>
              <ul className="text-xs text-gray-500 space-y-3 mb-8">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span> High-Resolution Display</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span> Professional Grade Camera</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span> Extended Battery Life</li>
              </ul>
              <div className="flex space-x-3">
                <button 
                  onClick={() => dispatch({ type: 'ADD_TO_CART', payload: deal })}
                  className="flex-1 bg-[#002e5b] text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                >
                  <CartIcon size={14} /> Add To Cart
                </button>
                <button className="p-4 border border-gray-100 text-gray-400 hover:text-blue-500 rounded-2xl hover:bg-blue-50 transition-all flex items-center justify-center shadow-sm">
                  <HeartIcon size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 flex justify-center items-center space-x-6">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Offers End In:</span>
             <div className="flex space-x-3 text-center">
               {['08', '14', '22', '45'].map((val, i) => (
                 <div key={i} className="flex flex-col">
                   <div className="bg-white border border-gray-100 text-[#002e5b] font-black px-3 py-2 rounded-xl text-sm shadow-sm">{val}</div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Best Price */}
        <div className="bg-white p-6 sm:p-10 border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow duration-500 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-50 rounded-full opacity-50"></div>
          <div className="flex justify-between items-center mb-10 border-b border-gray-50 pb-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Value Pick</h3>
            <div className="flex space-x-1.5">
              <button className="w-2 h-2 rounded-full bg-blue-500"></button>
              <button className="w-2 h-2 rounded-full bg-gray-100 hover:bg-blue-200 transition-colors"></button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-10">
             <div className="flex-1 relative group w-full">
               <div className="absolute top-0 left-0 z-10">
                 <span className="bg-[#ff4757] text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg animate-bounce">SAVE 50%</span>
               </div>
               <div className="bg-gray-50/50 rounded-[2.5rem] p-6 flex justify-center">
                 <img src={bestPrice.image} className="w-full h-44 sm:h-52 object-contain mix-blend-multiply group-hover:rotate-6 transition-transform duration-700" alt={bestPrice.name} />
               </div>
             </div>
             <div className="flex-1 w-full">
               <h4 className="text-xl font-black text-[#002e5b] mb-4 leading-tight tracking-tight">{bestPrice.name}</h4>
               <div className="flex items-center text-yellow-400 mb-6 space-x-1">
                 {[...Array(5)].map((_, i) => <StarIcon key={i} size={12} fill={i < 4 ? 'currentColor' : 'none'} className={i < 4 ? "text-yellow-400" : "text-gray-200"} />)}
                 <span className="text-[10px] text-gray-400 font-black ml-2 mt-0.5">4.8 (120+)</span>
               </div>
               <div className="flex items-center space-x-4 mb-8">
                 <span className="text-blue-600 font-black text-3xl">${bestPrice.price}</span>
                 <span className="text-gray-300 line-through text-sm font-bold">${bestPrice.originalPrice}</span>
               </div>
               <button 
                 onClick={() => dispatch({ type: 'ADD_TO_CART', payload: bestPrice })}
                 className="w-full bg-[#007bff] text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#002e5b] transition-all shadow-lg active:scale-95"
               >
                 <CartIcon size={14} /> Add To Cart
               </button>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface BlogsAndTestimonialsProps {
  dispatch: React.Dispatch<any>;
}

export const BlogsAndTestimonials: React.FC<BlogsAndTestimonialsProps> = ({ dispatch }) => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Recent Blogs */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-10 border-b border-gray-50 pb-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Latest Intel</h3>
            <button 
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'blog' })}
              className="text-[#007bff] font-black text-[10px] tracking-widest uppercase hover:text-[#002e5b] transition-colors flex items-center group"
            >
              View Journal <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
            {BLOG_POSTS.slice(0, 2).map(post => (
              <div 
                key={post.id} 
                className="group cursor-pointer flex flex-col" 
                onClick={() => dispatch({ type: 'SET_BLOG', payload: post.id })}
              >
                <div className="aspect-[16/10] overflow-hidden mb-6 rounded-[2rem] shadow-sm relative border border-gray-50">
                  <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={post.title} />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-[#002e5b] uppercase tracking-widest shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <h4 className="text-lg font-black text-[#002e5b] mb-3 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight">{post.title}</h4>
                <div className="flex items-center text-[9px] text-gray-400 font-black uppercase tracking-[0.1em] mb-4">
                  <span>{post.date}</span>
                  <span className="mx-2 opacity-30">|</span>
                  <span className="text-blue-500">{post.author}</span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-medium mb-6">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 inline-block">
                        Read Report →
                    </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-10 border-b border-gray-50 pb-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Client Logs</h3>
          </div>
          <div className="bg-white p-10 border border-gray-100 rounded-[2.5rem] text-center shadow-sm hover:shadow-xl transition-all duration-500 flex-1 flex flex-col justify-center border-t-4 border-t-blue-500">
            <div className="relative inline-block mb-8">
                <img src={TESTIMONIALS[0].avatar} className="w-20 h-20 rounded-full mx-auto border-4 border-gray-50 shadow-md" alt={TESTIMONIALS[0].user} />
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white italic">"</div>
            </div>
            <h5 className="font-black text-[#002e5b] text-base mb-1 tracking-tight">{TESTIMONIALS[0].user}</h5>
            <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.2em] mb-6">{TESTIMONIALS[0].role}</p>
            <div className="flex justify-center text-yellow-400 mb-8 space-x-1">
              {[...Array(5)].map((_, i) => <StarIcon key={i} size={14} fill="currentColor" />)}
            </div>
            <p className="text-[13px] text-gray-500 italic leading-relaxed font-medium mb-10">
              "{TESTIMONIALS[0].comment}"
            </p>
            <div className="mt-auto flex justify-center items-center space-x-3">
              <button className="w-8 h-1 bg-[#002e5b] rounded-full transition-all hover:w-12"></button>
              <button className="w-2 h-2 bg-gray-200 rounded-full hover:bg-blue-300 transition-all"></button>
              <button className="w-2 h-2 bg-gray-200 rounded-full hover:bg-blue-300 transition-all"></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
