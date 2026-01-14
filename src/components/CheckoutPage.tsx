import React, { useState } from 'react';
import { AppState } from '../types';
import { getPersonalizedPrice } from '../services/pricingService';

interface CheckoutPageProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ state, dispatch }) => {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: state.user?.name.split(' ')[0] || '',
    lastName: state.user?.name.split(' ')[1] || '',
    email: state.user?.email || '',
    address: '',
    city: '',
    zip: '',
    country: 'United States'
  });

  const subtotal = state.cart.reduce((acc, item) => {
    const pricing = getPersonalizedPrice(item, state.user);
    return acc + (pricing.finalPrice * item.quantity);
  }, 0);
  const shipping = subtotal > 300 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate SDK Payment Processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      dispatch({ type: 'CLEAR_CART' });
    }, 2500);
  };

  if (step === 'success') {
    return (
      <div className="container mx-auto px-4 py-32 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-8">✓</div>
        <h1 className="text-5xl font-black text-[#002e5b] tracking-tighter mb-4 uppercase italic">Order Confirmed</h1>
        <p className="text-gray-500 font-medium mb-12 max-w-md mx-auto">
          Your payment has been processed securely via CosmicPay SDK. A digital receipt has been dispatched to <span className="text-[#002e5b] font-bold">{formData.email}</span>.
        </p>
        <button 
          onClick={() => dispatch({ type: 'SET_VIEW', payload: 'home' })}
          className="bg-[#002e5b] text-white px-12 py-5 rounded-3xl font-black text-sm tracking-widest uppercase hover:bg-black transition-all shadow-xl shadow-blue-900/20"
        >
          Return to Command Center
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-100 pb-8">
        <div>
          <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2 italic">Phase 03: Transaction</h2>
          <h1 className="text-5xl font-black text-[#002e5b] tracking-tighter uppercase italic">Secure Checkout</h1>
        </div>
        <div className="flex items-center space-x-4 mt-6 md:mt-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 ${step === 'details' ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-200 text-gray-400'}`}>1</div>
          <div className="w-12 h-0.5 bg-gray-100"></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 ${step === 'payment' ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-200 text-gray-400'}`}>2</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Forms */}
        <div className="lg:col-span-7">
          {step === 'details' ? (
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h3 className="text-xl font-black text-[#002e5b] mb-8 uppercase tracking-widest border-b border-gray-50 pb-4">Shipping Protocol</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">First Name</label>
                    <input type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none font-bold focus:ring-2 focus:ring-blue-100 transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Last Name</label>
                    <input type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none font-bold focus:ring-2 focus:ring-blue-100 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Email Terminal</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none font-bold focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Physical Address</label>
                  <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none font-bold focus:ring-2 focus:ring-blue-100 transition-all" placeholder="St. Address, Apt, Suite" />
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">City</label>
                    <input type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none font-bold focus:ring-2 focus:ring-blue-100 transition-all" />
                  </div>
                  <div className="col-span-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Zip Code</label>
                    <input type="text" value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none font-bold focus:ring-2 focus:ring-blue-100 transition-all" />
                  </div>
                  <div className="col-span-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Country</label>
                    <select value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none font-bold focus:ring-2 focus:ring-blue-100 transition-all">
                      <option>United States</option>
                      <option>Vietnam</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                </div>
              </form>
              <button 
                onClick={() => setStep('payment')}
                className="w-full mt-10 bg-[#002e5b] text-white py-5 rounded-3xl font-black text-sm tracking-widest uppercase hover:bg-black transition-all shadow-xl shadow-blue-900/20"
              >
                Continue to Payment Terminal
              </button>
            </div>
          ) : (
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h3 className="text-xl font-black text-[#002e5b] mb-8 uppercase tracking-widest border-b border-gray-50 pb-4">Payment SDK Interface</h3>
              
              <div className="bg-blue-50 rounded-3xl p-8 mb-8 border border-blue-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-[#002e5b] text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">CosmicPay SDK v4.0</div>
                  <div className="text-blue-600 font-black text-xs uppercase tracking-widest italic">Encrypted Connection</div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-blue-100 flex items-center justify-between group cursor-pointer hover:border-blue-500 transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">💳</div>
                      <div>
                        <p className="font-black text-gray-800 text-sm uppercase">Secure Card Entry</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Visa, Mastercard, Amex</p>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                       <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>

                  <div className="bg-white/50 p-6 rounded-2xl border border-gray-100 flex items-center justify-between opacity-60">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">🔵</div>
                      <div>
                        <p className="font-black text-gray-800 text-sm uppercase">PayPal SDK</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Fast Checkout Redirection</p>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-50 rounded-3xl border border-dashed border-gray-200 text-center mb-8">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 italic">Verification Hash</p>
                <code className="text-[11px] font-mono font-bold text-gray-800 break-all">{Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}</code>
              </div>

              <div className="flex space-x-4">
                <button 
                  onClick={() => setStep('details')}
                  className="flex-1 border-2 border-gray-100 text-gray-400 py-5 rounded-3xl font-black text-xs tracking-widest uppercase hover:text-gray-600 hover:border-gray-200 transition-all"
                >
                  Previous Phase
                </button>
                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex-[2] bg-blue-500 text-white py-5 rounded-3xl font-black text-sm tracking-widest uppercase hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50"
                >
                  {isProcessing ? 'AUTHORIZING SDK...' : `Confirm Payment: $${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-[#002e5b] text-white p-10 rounded-[2.5rem] shadow-2xl sticky top-32">
            <h3 className="text-xl font-black mb-8 uppercase tracking-widest border-b border-white/10 pb-4 italic">Operational Manifest</h3>
            <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto custom-scrollbar pr-4">
              {state.cart.map(item => {
                const pricing = getPersonalizedPrice(item, state.user);
                return (
                  <div key={item.id} className="flex justify-between items-center group">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl p-2">
                        <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                      </div>
                      <div>
                        <p className="text-xs font-black truncate w-32 uppercase">{item.name}</p>
                        <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">x {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-black">${(pricing.finalPrice * item.quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>

            <div className="space-y-4 border-t border-white/10 pt-8">
              <div className="flex justify-between text-xs font-bold text-blue-100/60 uppercase tracking-widest">
                <span>Asset Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-blue-100/60 uppercase tracking-widest">
                <span>Shipping Dispatch</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-blue-100/60 uppercase tracking-widest">
                <span>Operational Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-end pt-4">
                <div>
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Final Total</p>
                  <p className="text-4xl font-black tracking-tighter italic text-white">${total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
               <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest mb-2">Security Verification</p>
               <div className="flex items-center justify-center space-x-4 opacity-50">
                  <div className="text-xs">🔒 256-bit SSL</div>
                  <div className="text-xs">🛡️ PCI-DSS v3</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
