import React from 'react';
import { Advertisement } from '../types';

interface HeroProps {
  ads: Advertisement[];
}

const Hero: React.FC<HeroProps> = ({ ads }) => {
  const heroAds = ads.filter(ad => ad.adType === 'hero');
  const sideAds = ads.filter(ad => ad.adType === 'side');
  const bannerAds = ads.filter(ad => ad.adType === 'banner');

  // Fallback if no ads are in DB
  const mainHero = heroAds[0] || {
    title: 'THE BEST SMARTPHONE',
    subtitle: 'For your Money',
    price: '$50.99',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop'
  };

  const sideTop = sideAds[0] || {
    title: 'Samsung Note 9',
    saleText: 'SALE 50%',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=400&auto=format&fit=crop'
  };

  const sideBottom = sideAds[1] || {
    title: 'Macbook Pro Retina',
    subtitle: 'The big thing is now for you.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop'
  };

  const mainBanner = bannerAds[0] || {
    title: 'Save on a New MacBook For Travel',
    subtitle: 'The big thing is now already here.',
    saleText: 'Sale 20%',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=600&auto=format&fit=crop'
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Hero */}
          <div className="lg:col-span-2 bg-[#f4f7f9] relative rounded-sm overflow-hidden group h-[300px] sm:h-[400px] border border-gray-100">
            <div className="absolute inset-0 flex items-center px-6 sm:px-12 z-10 bg-gradient-to-r from-[#f4f7f9] via-[#f4f7f9]/60 to-transparent lg:bg-none">
              <div className="max-w-[200px] sm:max-w-xs">
                <h2 className="text-gray-900 font-bold text-xl sm:text-3xl leading-tight mb-2 uppercase tracking-tight">{mainHero.title}</h2>
                <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 font-medium">{mainHero.subtitle}</p>
                {mainHero.price && <div className="text-xl sm:text-2xl font-black text-blue-500 mb-4 sm:mb-6">{mainHero.price}</div>}
                <button className="bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-full text-[10px] sm:text-xs font-black tracking-widest hover:bg-blue-600 transition-all uppercase">Shop Now</button>
              </div>
            </div>
            <img src={mainHero.image} alt="Hero" className="absolute right-[-20%] sm:right-0 top-0 h-full w-4/5 sm:w-2/3 object-contain transition-transform duration-700 group-hover:scale-105 opacity-80 sm:opacity-90" />
          </div>

          {/* Side Ads */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-sm border border-gray-100 flex flex-col justify-between h-[188px] relative group overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{sideTop.title}</h3>
                <p className="text-lg font-bold text-gray-800 leading-tight"><span className="text-red-500">{sideTop.saleText}</span></p>
              </div>
              <img src={sideTop.image} className="absolute right-[-20px] bottom-[-20px] w-32 h-32 object-contain group-hover:scale-110 transition-transform" />
            </div>
            <div className="bg-white p-6 rounded-sm border border-gray-100 flex flex-col justify-between h-[188px] relative group overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{sideBottom.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{sideBottom.subtitle}</p>
                <button className="text-blue-500 font-black text-[10px] tracking-widest uppercase hover:underline">Shop Now</button>
              </div>
              <img src={sideBottom.image} className="absolute right-[-10px] bottom-[-10px] w-36 h-36 object-contain group-hover:scale-110 transition-transform" />
            </div>
          </div>

          {/* Blue Banner Ad */}
          <div className="lg:col-span-1 bg-[#238ec5] rounded-sm p-6 sm:p-8 text-white relative overflow-hidden h-[300px] sm:h-[400px] flex flex-col justify-center">
            <div className="relative z-10">
              <span className="text-[9px] sm:text-[10px] font-black tracking-widest uppercase mb-2 block">{mainBanner.saleText}</span>
              <h3 className="text-xl sm:text-2xl font-black leading-none mb-4 uppercase">{mainBanner.title}</h3>
              <p className="text-[10px] sm:text-xs text-blue-100 mb-6 sm:mb-8 max-w-[150px]">{mainBanner.subtitle}</p>
              <button className="bg-black text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-sm text-[9px] sm:text-[10px] font-black tracking-widest uppercase hover:bg-gray-900 transition-all">Shop Now</button>
            </div>
            <img src={mainBanner.image} className="absolute right-[-40px] sm:right-[-80px] bottom-0 w-[180px] sm:w-[240px] opacity-40" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
