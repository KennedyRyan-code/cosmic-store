import React, { useState } from 'react';
import { Product } from '../types';
import { CartIcon, StarIcon } from './Icons';

interface ProductDetailProps {
  product: Product;
  dispatch: React.Dispatch<any>;
  relatedProducts: Product[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, dispatch, relatedProducts }) => {
  const [activeTab, setActiveTab] = useState<'desc' | 'reviews'>('desc');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in zoom-in duration-300">
      <button 
        onClick={() => dispatch({ type: 'SET_VIEW', payload: 'home' })}
        className="mb-8 text-gray-500 hover:text-[#002e5b] font-bold text-xs uppercase tracking-widest flex items-center"
      >
        ← Back to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden group">
             <img src={product.image} className="w-full h-96 object-contain transition-transform duration-500 group-hover:scale-110" alt={product.name} />
             {product.discount && (
                <span className="absolute top-6 left-6 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  -{product.discount}% OFF
                </span>
             )}
          </div>
        </div>

        {/* Info Section */}
        <div>
          <h1 className="text-4xl font-black text-[#002e5b] mb-4 tracking-tighter loading-none">{product.name}</h1>
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex text-yellow-400 text-sm">
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
            </div>
            <span className="text-xs font-bold text-gray-400 tracking-widest">({product.reviews} VERIFIED REVIEWS)</span>
          </div>

          <div className="flex items-end space-x-4 mb-8 border-b border-gray-100 pb-8">
            <span className="text-5xl font-black text-[#007bff]">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
                <span className="text-xl font-bold text-gray-300 line-through mb-2">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8 text-sm">
            {product.description || "Experience premium quality with this state-of-the-art device, designed for performance and reliability."}
          </p>

          <div className="flex space-x-4 mb-8">
            <div className="flex items-center bg-white border-2 border-gray-100 rounded-xl px-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-12 font-black text-gray-400 hover:text-blue-500">-</button>
                <span className="w-8 text-center font-black text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-12 font-black text-gray-400 hover:text-blue-500">+</button>
            </div>
            <button 
                onClick={() => {
                    for(let i=0; i<quantity; i++) dispatch({ type: 'ADD_TO_CART', payload: product });
                }}
                className="flex-1 bg-[#007bff] text-white rounded-xl font-black text-xs tracking-widest uppercase hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center space-x-3"
            >
                <CartIcon size={20} />
                <span>Add to Cart</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <div className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>In Stock: {product.stock} units</div>
            <div className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Free Shipping</div>
            <div className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>2 Year Warranty</div>
            <div className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>Official Dealer</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         <div className="lg:col-span-2">
            <div className="flex space-x-8 border-b border-gray-100 mb-8">
                {['desc', 'reviews'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`pb-4 text-xs font-black tracking-widest uppercase border-b-2 transition-all ${activeTab === tab ? 'border-[#007bff] text-[#007bff]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                        {tab === 'desc' ? 'Description' : 'Customer Reviews'}
                    </button>
                ))}
            </div>
            
            {activeTab === 'desc' ? (
                <div className="prose prose-sm max-w-none text-gray-600">
                    <p>{product.description}</p>
                    <ul className="list-disc pl-5 mt-4 space-y-2">
                        {product.tags?.map(tag => <li key={tag} className="capitalize">{tag} feature included</li>)}
                    </ul>
                </div>
            ) : (
                <div className="bg-gray-50 rounded-2xl p-8 text-center">
                    <p className="text-gray-500 font-medium italic">Reviews coming soon...</p>
                </div>
            )}
         </div>

         {/* Related Products Sidebar */}
         <div>
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6">Related Products</h3>
            <div className="space-y-4">
                {relatedProducts.slice(0, 3).map(p => (
                    <div key={p.id} className="group flex items-center space-x-4 bg-white p-4 rounded-xl border border-transparent hover:border-gray-100 shadow-sm cursor-pointer transition-all" onClick={() => dispatch({ type: 'SET_PRODUCT', payload: p.id })}>
                        <img src={p.image} className="w-16 h-16 object-contain" alt={p.name} />
                        <div>
                            <h4 className="font-bold text-xs text-gray-800 line-clamp-1 group-hover:text-blue-500">{p.name}</h4>
                            <span className="text-[#007bff] font-black text-xs">${p.price}</span>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default ProductDetail;
