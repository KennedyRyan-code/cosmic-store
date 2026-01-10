import React, { useState } from 'react';
import { SearchIcon, CartIcon, MenuIcon } from './Icons';
import { AppState } from '../types';
import { getPersonalizedPrice } from '../services/pricingService';

interface HeaderProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

const Header: React.FC<HeaderProps> = ({ state, dispatch }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { categories } = state;

  const cartSubtotal = state.cart.reduce((acc, item) => {
    const pricing = getPersonalizedPrice(item, state.user);
    return acc + (pricing.finalPrice * item.quantity);
  }, 0);

  return (
    <header className={`shadow-sm sticky top-0 z-50 transition-colors ${state.user?.preferences?.darkMode ? 'bg-gray-900 border-b border-gray-800' : 'bg-white'}`}>
      <div className={`${state.user?.preferences?.darkMode ? 'bg-blue-900/20' : 'bg-[#002e5b]'} text-white py-2 text-xs transition-colors`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-6 font-medium">
            <span className="flex items-center"><span className="mr-2">📞</span>(+254) 723 722 998</span>
          </div>
          <div className="flex space-x-6 items-center">
            {state.user?.role === 'admin' && (
              <button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'admin' })} className="hover:text-blue-300 font-black tracking-widest">ADMIN DASHBOARD</button>
            )}
            {!state.user ? (
              <div className="flex space-x-2">
                <button onClick={() => dispatch({ type: 'OPEN_AUTH', payload: 'login' })} className="hover:text-blue-300 font-bold uppercase tracking-widest text-[10px]">Login</button>
                <div className="h-4 w-px bg-white/30 self-center"></div>
                <button onClick={() => dispatch({ type: 'OPEN_AUTH', payload: 'signup' })} className="hover:text-blue-300 font-bold uppercase tracking-widest text-[10px]">Sign Up</button>
              </div>
            ) : (
              <div className="relative">
                <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center space-x-3 hover:text-blue-300 transition-colors group">
                  <img src={state.user.avatar} className="w-6 h-6 rounded-full border-2 border-white/20" alt="" />
                  <span className="font-black text-[11px] tracking-widest uppercase">{state.user.name}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl py-3 text-gray-800 border z-20">
                        <button onClick={() => { dispatch({ type: 'SET_VIEW', payload: 'profile' }); setIsUserMenuOpen(false); }} className="w-full text-left px-5 py-2 hover:bg-blue-50 text-sm font-bold">Manage Profile</button>
                        <button onClick={() => { dispatch({ type: 'LOGOUT' }); setIsUserMenuOpen(false); }} className="w-full text-left px-5 py-2 hover:bg-red-50 text-sm font-black text-red-500">Logout Session</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-5 flex items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center space-x-4">
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-blue-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MenuIcon size={24} />
          </button>
          <div className="flex items-center cursor-pointer group" onClick={() => dispatch({ type: 'SET_VIEW', payload: 'home' })}>
            <div className="bg-[#007bff] p-2 rounded-xl mr-2 group-hover:rotate-6 transition-transform sm:p-2.5 sm:mr-3">
              <span className="text-white font-black text-lg italic leading-none sm:text-xl">C</span>
            </div>
            <span className={`font-black text-lg tracking-tighter whitespace-nowrap sm:text-2xl ${state.user?.preferences?.darkMode ? 'text-white' : 'text-[#002e5b]'}`}>COSMIC STORE</span>
          </div>
        </div>

        <div className="flex-1 hidden md:flex w-full max-w-2xl border-2 border-[#007bff] rounded-2xl overflow-hidden shadow-sm">
          <select 
            className="bg-gray-50 px-5 py-3 text-xs font-bold border-r border-gray-200 hidden sm:block outline-none text-gray-600"
            onChange={(e) => dispatch({ type: 'SET_CATEGORY', payload: e.target.value })}
            value={state.selectedCategory || 'All Categories'}
          >
            <option value="All Categories">All Categories</option>
            {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
          </select>
          <input 
            type="text" 
            placeholder="Search premium electronics..." 
            className="flex-1 px-5 py-3 text-sm outline-none bg-white font-medium"
            value={state.searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
          />
          <button className="bg-[#007bff] text-white px-8 py-3 hover:bg-blue-600 transition-all"><SearchIcon size={20} /></button>
        </div>

        <div className="flex items-center space-x-3 md:space-x-6">
          <button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'cart' })} className={`flex items-center space-x-2 md:space-x-3 p-2 md:p-2.5 px-3 md:px-4 rounded-xl transition-all ${state.user?.preferences?.darkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-50 text-[#007bff]'}`}>
            <div className="relative">
              <CartIcon size={20} className="md:w-[22px] md:h-[22px]" />
              <span className="absolute -top-2 -right-3 bg-[#007bff] text-white text-[8px] md:text-[9px] font-black rounded-full w-3.5 h-3.5 md:w-4 md:h-4 flex items-center justify-center border-2 border-white">{state.cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </div>
            <div className="hidden lg:flex flex-col text-left leading-tight">
              <span className="text-[9px] font-black uppercase tracking-widest opacity-60">My Cart</span>
              <span className="text-xs font-black">${cartSubtotal.toFixed(2)}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4">
        <div className="flex w-full border-2 border-[#007bff] rounded-xl overflow-hidden shadow-sm">
          <input 
            type="text" 
            placeholder="Search premium electronics..." 
            className="flex-1 px-4 py-2 text-sm outline-none bg-white font-medium"
            value={state.searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
          />
          <button className="bg-[#007bff] text-white px-4 py-2 hover:bg-blue-600 transition-all"><SearchIcon size={18} /></button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute top-0 left-0 w-64 h-full bg-white shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b flex justify-between items-center">
              <span className="font-black text-[#002e5b] tracking-tighter">NAVIGATION</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400">✕</button>
            </div>
            <div className="p-4 flex flex-col space-y-2">
              {['HOME', 'PRODUCTS', 'BEST SELLERS', 'BLOG', 'CONTACT US'].map(item => (
                <button 
                  key={item} 
                  className="w-full text-left px-4 py-3 text-sm font-black text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                  onClick={() => {
                    if (item === 'HOME') dispatch({ type: 'SET_VIEW', payload: 'home' });
                    if (item === 'PRODUCTS') dispatch({ type: 'SET_VIEW', payload: 'products-list' });
                    if (item === 'BEST SELLERS') dispatch({ type: 'SET_VIEW', payload: 'best-sellers' });
                    if (item === 'BLOG') dispatch({ type: 'SET_VIEW', payload: 'blog' });
                    if (item === 'CONTACT US') dispatch({ type: 'SET_VIEW', payload: 'contact' });
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item}
                </button>
              ))}
              <div className="pt-4 border-t mt-4">
                <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Categories</p>
                {categories.map(cat => (
                  <button 
                    key={cat.id} 
                    className="w-full text-left px-4 py-2 text-xs font-bold text-gray-500 hover:text-blue-500"
                    onClick={() => {
                      dispatch({ type: 'SET_CATEGORY', payload: cat.name });
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="bg-[#007bff] text-white hidden md:block shadow-inner">
        <div className="container mx-auto px-4 flex items-center">
          <div className="bg-[#0056b3] px-8 py-4 flex items-center font-black text-xs tracking-[0.1em] cursor-pointer group hover:bg-[#004494]">
            <MenuIcon size={18} className="mr-3" />
            <span>ALL CATEGORIES</span>
          </div>
          <div className="flex-1 flex justify-center space-x-10 text-[11px] font-black tracking-widest">
            {['HOME', 'PRODUCTS', 'BEST SELLERS', 'BLOG', 'CONTACT US'].map(item => (
              <a 
                key={item} 
                href="#" 
                className="py-4 hover:text-blue-200 transition-all relative group"
                onClick={(e) => {
                    e.preventDefault();
                    if (item === 'HOME') dispatch({ type: 'SET_VIEW', payload: 'home' });
                    if (item === 'PRODUCTS') dispatch({ type: 'SET_VIEW', payload: 'products-list' });
                    if (item === 'BEST SELLERS') dispatch({ type: 'SET_VIEW', payload: 'best-sellers' });
                    if (item === 'BLOG') dispatch({ type: 'SET_VIEW', payload: 'blog' });
                    if (item === 'CONTACT US') dispatch({ type: 'SET_VIEW', payload: 'contact' });
                }}
              >
                {item}
                <span className="absolute bottom-3 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
