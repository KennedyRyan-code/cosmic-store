import React, { useReducer, useEffect, useState } from 'react';
import { AppState, ViewState, Product, CartItem, Review, User, BlogPost, Category, Advertisement } from './types';
import { PRODUCTS, BLOG_POSTS, CATEGORIES } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import BrandSection from './components/BrandSection';
import { DealOfTheDay, BlogsAndTestimonials } from './components/HomeSections';
import ProductCard from './components/ProductCard';
import BlogPage from './components/BlogPage';
import ProductsPage from './components/ProductsPage';
import BestSellersPage from './components/BestSellersPage';
import ContactPage from './components/ContactPage';
import CheckoutPage from './components/CheckoutPage';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';
import ProductDetail from './components/ProductDetail';
import UserProfile from './components/UserProfile';
import { getPersonalizedPrice } from './services/pricingService';




const BACKEND_URL = '/api';

type Action = 
  | { type: 'SET_VIEW', payload: ViewState }
  | { type: 'SET_PRODUCT', payload: string }
  | { type: 'SET_BLOG', payload: string }
  | { type: 'SET_CATEGORY', payload: string }
  | { type: 'SET_SEARCH', payload: string }
  | { type: 'ADD_TO_CART', payload: Product }
  | { type: 'REMOVE_FROM_CART', payload: string }
  | { type: 'UPDATE_QUANTITY', payload: { id: string, quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_REVIEW', payload: { productId: string, review: Review } }
  | { type: 'OPEN_AUTH', payload: 'login' | 'signup' }
  | { type: 'CLOSE_AUTH' }
  | { type: 'SET_USER', payload: User | null }
  | { type: 'UPDATE_USER', payload: Partial<User> }
  | { type: 'SYNC_CART', payload: CartItem[] }
  | { type: 'SET_PRODUCTS', payload: Product[] }
  | { type: 'SET_BLOGS', payload: BlogPost[] }
  | { type: 'SET_CATEGORIES', payload: Category[] }
  | { type: 'SET_ADVERTISEMENTS', payload: Advertisement[] }
  | { type: 'LOGOUT' }
  | { type: 'ADD_PRODUCT', payload: Product }
  | { type: 'UPDATE_PRODUCT', payload: Product }
  | { type: 'DELETE_PRODUCT', payload: string }
  | { type: 'ADD_BLOG', payload: BlogPost }
  | { type: 'UPDATE_BLOG', payload: BlogPost }
  | { type: 'DELETE_BLOG', payload: string }
  | { type: 'ADD_CATEGORY', payload: Category }
  | { type: 'UPDATE_CATEGORY', payload: Category }
  | { type: 'DELETE_CATEGORY', payload: string }
  | { type: 'ADD_AD', payload: Advertisement }
  | { type: 'UPDATE_AD', payload: Advertisement }
  | { type: 'DELETE_AD', payload: string };

const initialState: AppState = {
  view: 'home',
  products: PRODUCTS,
  blogs: BLOG_POSTS,
  categories: CATEGORIES.map((c, i) => ({ id: i.toString(), name: c })),
  advertisements: [],
  cart: [],
  user: null,
  searchQuery: '',
  recentlyViewed: [],
  productReviews: {},
  isAuthModalOpen: false,
  authMode: 'login'
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, view: action.payload };
    case 'SET_PRODUCT':
      return { 
        ...state, 
        selectedProductId: action.payload, 
        view: 'product-detail',
        recentlyViewed: [...new Set([action.payload, ...state.recentlyViewed])].slice(0, 5)
      };
    case 'SET_BLOG':
      return {
        ...state,
        selectedBlogId: action.payload,
        view: 'blog-detail'
      };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload === 'All Categories' ? undefined : action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'ADD_TO_CART': {
      const existing = state.cart.find((item: CartItem) => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item: CartItem) => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item)
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((item: CartItem) => item.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item: CartItem) => item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item)
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'SYNC_CART':
      return { ...state, cart: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_BLOGS':
      return { ...state, blogs: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_ADVERTISEMENTS':
      return { ...state, advertisements: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [action.payload, ...state.products] };
    case 'UPDATE_PRODUCT':
      return { ...state, products: state.products.map((p: Product) => p.id === action.payload.id ? action.payload : p) };
    case 'DELETE_PRODUCT':
      return { ...state, products: state.products.filter((p: Product) => p.id !== action.payload) };
    case 'ADD_BLOG':
      return { ...state, blogs: [action.payload, ...state.blogs] };
    case 'UPDATE_BLOG':
      return { ...state, blogs: state.blogs.map((b: BlogPost) => b.id === action.payload.id ? action.payload : b) };
    case 'DELETE_BLOG':
      return { ...state, blogs: state.blogs.filter((b: BlogPost) => b.id !== action.payload) };
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };
    case 'UPDATE_CATEGORY':
      return { ...state, categories: state.categories.map((c: Category) => c.id === action.payload.id ? action.payload : c) };
    case 'DELETE_CATEGORY':
      return { ...state, categories: state.categories.filter((c: Category) => c.id !== action.payload) };
    case 'ADD_AD':
      return { ...state, advertisements: [...state.advertisements, action.payload] };
    case 'UPDATE_AD':
      return { ...state, advertisements: state.advertisements.map((ad: Advertisement) => ad.id === action.payload.id ? action.payload : ad) };
    case 'DELETE_AD':
      return { ...state, advertisements: state.advertisements.filter((ad: Advertisement) => ad.id !== action.payload) };
    case 'OPEN_AUTH':
      return { ...state, isAuthModalOpen: true, authMode: action.payload };
    case 'CLOSE_AUTH':
      return { ...state, isAuthModalOpen: false };
    case 'SET_USER':
      return { ...state, user: action.payload }; 
    case 'UPDATE_USER':
      return state.user ? { ...state, user: { ...state.user, ...action.payload } } : state;
    case 'LOGOUT':
      localStorage.removeItem('cosmic_user');
      return { ...state, user: null, view: 'home' };
    default:
      return state;
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, blogRes, catRes, adRes] = await Promise.all([
          fetch(`${BACKEND_URL}/products`),
          fetch(`${BACKEND_URL}/blogs`),
          fetch(`${BACKEND_URL}/categories`),
          fetch(`${BACKEND_URL}/advertisements`)
        ]);

        if (prodRes.ok) dispatch({ type: 'SET_PRODUCTS', payload: await prodRes.json() });
        if (blogRes.ok) dispatch({ type: 'SET_BLOGS', payload: await blogRes.json() });
        if (catRes.ok) dispatch({ type: 'SET_CATEGORIES', payload: await catRes.json() });
        if (adRes.ok) dispatch({ type: 'SET_ADVERTISEMENTS', payload: await adRes.json() });
      } catch (err) {
        console.warn('Backend unavailable');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const savedUser = localStorage.getItem('cosmic_user');
    const savedCart = localStorage.getItem('cosmic_cart');
    if (savedUser) dispatch({ type: 'UPDATE_USER', payload: JSON.parse(savedUser) });
    if (savedCart) dispatch({ type: 'SYNC_CART', payload: JSON.parse(savedCart) });
  }, [state.cart.length === 0 ? 'empty' : 'not-empty']); // Simplified dependency

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-6 font-black text-[#002e5b] tracking-widest text-sm uppercase animate-pulse italic">CosmicStore Core Initializing...</p>
      </div>
    );
  }

  const cartSubtotal = state.cart.reduce((acc: number, item: CartItem) => {
    const pricing = getPersonalizedPrice(item, state.user);
    return acc + (pricing.finalPrice * item.quantity);
  }, 0);

  return (
    <div className={`min-h-screen flex flex-col ${state.user?.preferences?.darkMode ? 'dark bg-gray-900 text-white' : ''}`}>
      <Header state={state} dispatch={dispatch} />
      
      <main className="flex-1 bg-gray-50/30">
        {state.view === 'home' && (
          <>
            <Hero ads={state.advertisements} />
            <BrandSection />
            <section className="container mx-auto px-4 py-12">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-100 pb-2">
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em]">Featured Products</h3>
                <div className="flex space-x-8 text-[11px] font-black tracking-widest uppercase mt-4 md:mt-0">
                  {['Mobile', 'Headphone', 'Laptop', 'All'].map(tab => (
                    <button 
                      key={tab} 
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 border-b-2 transition-all ${activeTab === tab ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {state.products.filter((product: Product) => {
                    if (activeTab === 'All') return true;
                    if (activeTab === 'Mobile') return product.category === 'Smartphones';
                    if (activeTab === 'Laptop') return product.category === 'Laptops';
                    if (activeTab === 'Headphone') return product.category === 'Headphones';
                    return true;
                }).slice(0, 8).map((product: Product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={() => dispatch({ type: 'SET_PRODUCT', payload: product.id })}
                    onAddToCart={(e) => {
                        e.stopPropagation();
                        dispatch({ type: 'ADD_TO_CART', payload: product });
                    }}
                  />
                ))}
              </div>
            </section>
            <DealOfTheDay products={state.products} dispatch={dispatch} />
            <BlogsAndTestimonials dispatch={dispatch} />
          </>
        )}

        {state.view === 'product-detail' && state.selectedProductId && (
             <ProductDetail 
                product={state.products.find(p => p.id === state.selectedProductId)!} 
                dispatch={dispatch}
                relatedProducts={state.products.filter(p => p.category === state.products.find((sp: Product) => sp.id === state.selectedProductId)?.category && p.id !== state.selectedProductId)}
             />
        )}

        {state.view === 'products-list' && <ProductsPage state={state} dispatch={dispatch} />}
        {state.view === 'best-sellers' && <BestSellersPage state={state} dispatch={dispatch} />}
        {state.view === 'blog' && <BlogPage blogs={state.blogs} />}
        {state.view === 'blog-detail' && <BlogPage blogs={state.blogs} selectedBlogId={state.selectedBlogId} onBack={() => dispatch({ type: 'SET_VIEW', payload: 'blog' })} />}
        {state.view === 'contact' && <ContactPage />}
        {state.view === 'checkout' && <CheckoutPage state={state} dispatch={dispatch} />}
        {state.view === 'cart' && (
            <section className="container mx-auto px-4 py-12">
              <h1 className="text-4xl font-black text-[#002e5b] mb-12 tracking-tighter uppercase italic">Secure Cart</h1>
              {state.cart.length === 0 ? (
                  <div className="bg-white p-24 rounded-sm shadow-sm border border-gray-100 text-center">
                      <div className="text-8xl mb-6">📦</div>
                      <h2 className="text-2xl font-black text-gray-800">Your manifest is currently empty.</h2>
                      <button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'home' })} className="mt-8 bg-blue-500 text-white px-12 py-4 rounded-sm font-black tracking-widest hover:bg-blue-600 transition-all uppercase">BACK TO CATALOG</button>
                  </div>
              ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                      <div className="lg:col-span-2 space-y-4">
                          {state.cart.map((item: CartItem) => (
                              <div key={item.id} className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex items-center gap-6">
                                  <img src={item.image} className="w-20 h-20 object-contain" />
                                  <div className="flex-1">
                                      <div className="flex justify-between">
                                          <h3 className="font-bold text-sm text-gray-800">{item.name}</h3>
                                          <button className="text-red-400 hover:text-red-600" onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}>Remove</button>
                                      </div>
                                      <div className="mt-4 flex items-center justify-between">
                                          <div className="flex items-center bg-gray-50 border p-1">
                                              <button className="w-6 h-6 flex items-center justify-center font-black" onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: Math.max(1, item.quantity - 1) } })}>-</button>
                                              <span className="px-4 text-xs font-bold">{item.quantity}</span>
                                              <button className="w-6 h-6 flex items-center justify-center font-black" onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}>+</button>
                                          </div>
                                          <span className="text-lg font-black text-blue-500">${(item.price * item.quantity).toFixed(2)}</span>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                      <div className="bg-[#002e5b] text-white p-8 rounded-sm shadow-md h-fit">
                          <h3 className="text-lg font-black mb-6 tracking-widest border-b border-white/10 pb-4 uppercase">Order Overview</h3>
                          <div className="flex justify-between mb-8">
                              <span className="text-[10px] font-bold uppercase tracking-widest">Estimated Total</span>
                              <span className="text-xl font-black text-white">${cartSubtotal.toFixed(2)}</span>
                          </div>
                          <button 
                            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'checkout' })}
                            className="w-full bg-blue-500 text-white py-4 rounded-sm font-black tracking-widest uppercase hover:bg-blue-600 transition-all"
                          >
                            Proceed to Secure Checkout
                          </button>
                      </div>
                  </div>
              )}
            </section>
        )}
        {state.view === 'admin' && <AdminDashboard state={state} dispatch={dispatch} />}
        {state.view === 'profile' && state.user && <UserProfile user={state.user} onLogout={() => dispatch({ type: 'LOGOUT' })} onUpdate={(updates) => dispatch({ type: 'UPDATE_USER', payload: updates })} />}
      </main>

      <Footer />
      <AuthModal 
        isOpen={state.isAuthModalOpen} 
        mode={state.authMode} 
        onClose={() => dispatch({ type: 'CLOSE_AUTH' })} 
        onSuccess={(user) => {
          dispatch({ type: 'SET_USER', payload: user });
          if (user.role === 'admin') {
            dispatch({ type: 'SET_VIEW', payload: 'admin' });
          }
        }} 
      />
    </div>
  );
};

export default App;