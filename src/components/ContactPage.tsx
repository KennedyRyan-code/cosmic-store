import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-3">Get in Touch</h2>
        <h1 className="text-5xl font-black text-[#002e5b] tracking-tighter">CONTACT COSMICSTORE</h1>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto font-medium">
          Have a question about a product or an order? Our team of electronics experts is ready to assist you via terminal or physical dispatch.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-4xl mb-6">✓</div>
              <h3 className="text-2xl font-black text-[#002e5b] mb-2">Transmission Received</h3>
              <p className="text-gray-500">Our agents will analyze your request and respond shortly.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-8 text-blue-500 font-black text-xs tracking-widest uppercase hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input required type="text" placeholder="Agent Name" className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none font-bold transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Email Terminal</label>
                  <input required type="email" placeholder="agent@terminal.com" className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none font-bold transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Subject</label>
                <select className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none font-bold transition-all">
                  <option>Product Technical Inquiry</option>
                  <option>Order Status & Tracking</option>
                  <option>Warranty & Returns</option>
                  <option>Business Partnerships</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Detailed Message</label>
                <textarea required rows={5} placeholder="Describe your inquiry in detail..." className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none font-bold transition-all resize-none"></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#002e5b] text-white py-5 rounded-2xl font-black text-sm tracking-widest shadow-xl shadow-blue-900/20 hover:bg-black transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'ENCRYPTING & SENDING...' : 'DISPATCH MESSAGE'}
              </button>
            </form>
          )}
        </div>

        {/* Store Info & Map */}
        <div className="space-y-8">
          <div className="bg-[#002e5b] text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <h3 className="text-xl font-black mb-8 tracking-widest uppercase border-b border-white/10 pb-4">Global Command Center</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <span className="text-2xl mr-4">📍</span>
                <div>
                  <p className="font-black text-sm uppercase tracking-wider mb-1">Physical Address</p>
                  <p className="text-blue-100 text-sm font-medium">84 W. Pearl Dr. Moorhead, MN 56560, United States</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-4">📞</span>
                <div>
                  <p className="font-black text-sm uppercase tracking-wider mb-1">Voice Terminal</p>
                  <p className="text-blue-100 text-sm font-medium">(+84) 123 456 789 / 1800-COSMIC-TECH</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-4">⏰</span>
                <div>
                  <p className="font-black text-sm uppercase tracking-wider mb-1">Operational Hours</p>
                  <p className="text-blue-100 text-sm font-medium">Mon - Fri: 08:00 - 21:00<br />Sat - Sun: 09:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="rounded-[2.5rem] overflow-hidden h-[300px] border border-gray-100 shadow-sm relative group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2730.08272912444!2d-96.7601339!3d46.8671569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52c8c9735d555555%3A0x1d2e5d5555555555!2sMoorhead%2C%20MN%2056560!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
              className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            ></iframe>
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-lg border border-white/50">
              <p className="text-[10px] font-black text-[#002e5b] uppercase tracking-widest">HQ COORDINATES: 46.8672° N, 96.7601° W</p>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Features */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-100 pt-16 max-w-6xl mx-auto">
        {[
          { icon: '🛡️', title: 'SECURE COMMMS', desc: 'End-to-end encrypted technical support channels for professional privacy.' },
          { icon: '🚀', title: 'FAST RESPONSE', desc: 'Typical response time under 4 operational hours for all technical inquiries.' },
          { icon: '💼', title: 'B2B SOLUTIONS', desc: 'Dedicated account managers for corporate and enterprise hardware volume.' }
        ].map((feature, i) => (
          <div key={i} className="text-center group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
            <h4 className="font-black text-[#002e5b] text-sm uppercase tracking-widest mb-2">{feature.title}</h4>
            <p className="text-gray-500 text-xs leading-relaxed font-medium">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;
