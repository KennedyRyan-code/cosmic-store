import React, { useState } from 'react';
import { User } from '../types';

interface UserProfileProps {
  user: User;
  onLogout: () => void;
  onUpdate: (updates: Partial<User>) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout, onUpdate }) => {
  const [isNewsletter, setIsNewsletter] = useState(user.preferences?.newsletter ?? true);
  const [isDarkMode, setIsDarkMode] = useState(user.preferences?.darkMode ?? false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API delay
    setTimeout(() => {
      onUpdate({
        preferences: {
          newsletter: isNewsletter,
          darkMode: isDarkMode
        }
      });
      setIsSaving(false);
      alert("Preferences saved successfully!");
    }, 600);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-br from-[#002e5b] to-[#001a33] p-16 text-white relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-10 relative z-10">
            <div className="relative group">
                <img src={user.avatar} className="w-40 h-40 rounded-full border-8 border-white/10 shadow-2xl transition-transform group-hover:scale-105 duration-500" alt={user.name} />
                <button className="absolute bottom-2 right-2 bg-white text-blue-600 p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                </button>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-black tracking-tight">{user.name}</h1>
              <p className="text-blue-300 text-lg font-medium mt-1">{user.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start mt-6 gap-3">
                <span className="bg-white/10 border border-white/20 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                  ⭐ VIP {user.loyaltyPoints > 1000 ? 'GOLD' : 'MEMBER'}
                </span>
                <span className="bg-white/10 border border-white/20 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                  🪙 {user.loyaltyPoints} POINTS
                </span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-10 hidden md:block">
            <button 
              onClick={onLogout}
              className="bg-red-500/20 hover:bg-red-500 text-white px-8 py-3 rounded-2xl font-black text-xs tracking-widest transition-all border border-red-500/50 hover:border-transparent active:scale-95"
            >
              LOGOUT SESSION
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 divide-x divide-gray-100">
          <div className="p-10 md:col-span-1 bg-gray-50/50">
            <nav className="space-y-3">
              {[
                { label: 'General Info', icon: '👤', active: true },
                { label: 'Security', icon: '🔒' },
                { label: 'Order History', icon: '📦' },
                { label: 'My Wishlist', icon: '❤️' },
                { label: 'Payment Methods', icon: '💳' },
              ].map(item => (
                <button 
                  key={item.label}
                  className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm ${item.active ? 'bg-white shadow-xl shadow-blue-500/5 text-[#007bff]' : 'text-gray-400 hover:text-gray-600 hover:bg-white'}`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-16 md:col-span-3">
            <div className="max-w-2xl">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-black text-[#002e5b]">Profile Settings</h2>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last updated: Today</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-16">
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Display Name</label>
                        <p className="text-lg font-bold text-gray-800 border-b-2 border-gray-50 pb-2">{user.name}</p>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Primary Email</label>
                        <p className="text-lg font-bold text-gray-800 border-b-2 border-gray-50 pb-2">{user.email}</p>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Saved Location</label>
                        <p className="text-lg font-bold text-gray-800 border-b-2 border-gray-50 pb-2">{user.location}</p>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Account Status</label>
                        <p className="text-lg font-bold text-green-500 flex items-center border-b-2 border-gray-50 pb-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Verified
                        </p>
                    </div>
                </div>

                <div className="space-y-12">
                    <div>
                        <h3 className="text-xl font-black text-[#002e5b] mb-8">Personalized Experience</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl group hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-blue-50 cursor-pointer" onClick={() => setIsNewsletter(!isNewsletter)}>
                                <div className="flex items-center space-x-6">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${isNewsletter ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-400'}`}>✉️</div>
                                    <div>
                                        <p className="font-black text-gray-800">Email Marketing</p>
                                        <p className="text-xs text-gray-500 font-medium">Be the first to know about upcoming flash sales and tech drops.</p>
                                    </div>
                                </div>
                                <div className={`w-14 h-8 rounded-full transition-colors relative ${isNewsletter ? 'bg-blue-500' : 'bg-gray-300'}`}>
                                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${isNewsletter ? 'left-7' : 'left-1'}`}></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl group hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-blue-50 cursor-pointer" onClick={() => setIsDarkMode(!isDarkMode)}>
                                <div className="flex items-center space-x-6">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${isDarkMode ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-400'}`}>🌙</div>
                                    <div>
                                        <p className="font-black text-gray-800">Interface Mode</p>
                                        <p className="text-xs text-gray-500 font-medium">Switch to dark theme for a cinematic shopping experience.</p>
                                    </div>
                                </div>
                                <div className={`w-14 h-8 rounded-full transition-colors relative ${isDarkMode ? 'bg-indigo-500' : 'bg-gray-300'}`}>
                                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${isDarkMode ? 'left-7' : 'left-1'}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-16 pt-10 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-xs text-gray-400 font-bold max-w-xs">Data security is our priority. Your preferences are encrypted end-to-end.</p>
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-[#007bff] text-white px-12 py-5 rounded-[1.5rem] font-black text-sm tracking-widest shadow-2xl shadow-blue-500/30 hover:bg-blue-600 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                    >
                        {isSaving ? 'SAVING...' : 'PERSIST CHANGES'}
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center md:hidden">
        <button 
            onClick={onLogout}
            className="text-red-500 font-black text-xs tracking-widest uppercase py-4"
        >
            Logout session
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
