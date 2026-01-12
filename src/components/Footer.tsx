import React from 'react';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[#f8f9fa] pt-16 pb-8 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4">
        {/* Top Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 border-b border-gray-200 pb-16">
          {[
            { icon: '✈️', title: 'FREE SHIPPING WORLDWIDE', desc: 'On all orders over $300' },
            { icon: '🎁', title: 'MEMBERS GIFT WEEKLY', desc: 'Coupons and discounts for you' },
            { icon: '🎧', title: 'FRIENDLY SUPPORT 24/7', desc: 'Call us any time for help' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-start sm:justify-center p-4">
              <span className="text-3xl sm:text-4xl mr-4 sm:mr-6 text-blue-500">{item.icon}</span>
              <div className="text-left">
                <h4 className="font-black text-[10px] sm:text-[11px] text-gray-800 tracking-widest uppercase mb-1">{item.title}</h4>
                <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-6">
              <div className="bg-[#007bff] p-1.5 rounded-sm mr-2">
                <span className="text-white font-black text-lg italic">C</span>
              </div>
              <span className="text-[#002e5b] font-black text-xl tracking-tighter">COSMICSTORE</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-sm mb-6 mx-auto md:mx-0">
              CosmicStore is your one-stop shop for premium electronics. We provide the latest technology at unbeatable prices with world-class support.
            </p>
            <div className="space-y-4 text-xs text-gray-600 flex flex-col items-center md:items-start">
              <p className="flex items-start"><span className="mr-3 mt-1">📍</span> 84 W. Pearl Dr. Moorhead, MN 56560</p>
              <p className="flex items-center"><span className="mr-3">📞</span> (+84) 123 456 789</p>
              <p className="flex items-center"><span className="mr-3">✉️</span> loo_me@yahoo.com</p>
            </div>
          </div>

          {[
            { title: 'CATEGORIES', links: ['Mobile', 'Headphone', 'Laptop', 'Accessories', 'New Arrivals', 'All Categories'] },
            { title: 'INFORMATION', links: ['About Us', 'FAQs', 'Terms of Use', 'Delivery Information', 'Privacy & Policy', 'Order & Returns'] },
            { title: 'MY ACCOUNT', links: ['Login', 'Sign Up', 'My Shopping Cart', 'My Wishlist', 'Checkout', 'Track My Order'] },
          ].map((section, i) => (
            <div key={i} className="text-center md:text-left border-t border-gray-100 pt-8 md:border-0 md:pt-0">
              <h4 className="font-black text-[11px] text-gray-800 mb-6 uppercase tracking-widest">{section.title}</h4>
              <ul className="space-y-3 text-xs text-gray-500">
                {section.links.map(link => (
                  <li key={link}><a href="#" className="hover:text-blue-500 transition-colors uppercase tracking-tight">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter & App Download Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 items-center">
            <div className="lg:col-span-1 text-center md:text-left">
               <h4 className="font-black text-[11px] text-gray-800 mb-4 uppercase tracking-widest">Subscribe To Our Newsletter</h4>
               <div className="flex h-11 border border-gray-200 rounded-sm overflow-hidden max-w-sm mx-auto md:mx-0">
                 <input type="email" placeholder="Enter your email..." className="flex-1 px-4 text-xs outline-none focus:bg-gray-50" />
                 <button className="bg-blue-500 text-white px-6 font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all">Sign Up</button>
               </div>
               <div className="flex justify-center md:justify-start space-x-4 mt-8">
                 {['f', 't', 'g+', 'p'].map(social => (
                   <div key={social} className="w-10 h-10 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-500 cursor-pointer transition-all text-sm font-black uppercase rounded-full">{social}</div>
                 ))}
               </div>
            </div>
            <div className="lg:col-span-2 text-center md:text-left lg:pl-12">
               <h4 className="font-black text-[11px] text-gray-800 mb-6 uppercase tracking-widest">Download The Secure App</h4>
               <div className="flex flex-wrap justify-center md:justify-start gap-4">
                 <button className="flex items-center space-x-3 bg-white border border-gray-100 px-6 py-3 hover:bg-gray-50 transition-all rounded-xl shadow-sm">
                   <span className="text-xl">▶️</span>
                   <div className="text-left"><p className="text-[7px] font-bold text-gray-400 uppercase leading-none mb-1">Get it on</p><p className="text-xs font-black text-gray-800 leading-none">GOOGLE PLAY</p></div>
                 </button>
                 <button className="flex items-center space-x-3 bg-white border border-gray-100 px-6 py-3 hover:bg-gray-50 transition-all rounded-xl shadow-sm">
                   <span className="text-xl">🍎</span>
                   <div className="text-left"><p className="text-[7px] font-bold text-gray-400 uppercase leading-none mb-1">Get it on</p><p className="text-xs font-black text-gray-800 leading-none">APP STORE</p></div>
                 </button>
               </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <p>© 2017 CosmicStore. Designed by LooThemes. All Rights Reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0 opacity-60">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
