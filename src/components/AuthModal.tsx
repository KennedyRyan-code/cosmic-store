import React, { useState, useEffect } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (user: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, mode: initialMode, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/signup';
      const body: any = { email, password };
      if (mode === 'signup') body.name = name;

      const response = await fetch(`/api${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Save user to local storage
      localStorage.setItem('cosmic_user', JSON.stringify(data));
      onSuccess(data);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockUser = {
        id: 'g' + Math.random().toString(36).substr(2, 4),
        name: 'Google User',
        email: 'user@google.com',
        role: 'user',
        avatar: 'https://i.pravatar.cc/150?u=google',
        loyaltyPoints: 100,
        location: 'California, USA',
        preferences: { newsletter: true, darkMode: false }
      };
      onSuccess(mockUser);
      setIsLoading(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex border-b">
          <button 
            className={`flex-1 py-5 font-extrabold text-sm tracking-widest transition-all ${mode === 'login' ? 'text-[#007bff] bg-blue-50/50' : 'text-gray-400 hover:text-gray-600'}`}
            onClick={() => { setMode('login'); setError(''); }}
          >
            LOGIN
          </button>
          <button 
            className={`flex-1 py-5 font-extrabold text-sm tracking-widest transition-all ${mode === 'signup' ? 'text-[#007bff] bg-blue-50/50' : 'text-gray-400 hover:text-gray-600'}`}
            onClick={() => { setMode('signup'); setError(''); }}
          >
            SIGN UP
          </button>
        </div>

        <div className="p-10">
          <h2 className="text-3xl font-extrabold text-[#002e5b] mb-2">
            {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-gray-500 text-sm mb-10 leading-relaxed">
            {mode === 'login' ? 'Great to see you again! Please log in to your account.' : 'Join the elite community of CosmicStore shoppers today.'}
          </p>

          <button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 border-2 border-gray-100 py-3.5 rounded-2xl mb-8 hover:bg-gray-50 hover:border-blue-100 transition-all disabled:opacity-50 group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-bold text-gray-700">Continue with Google</span>
          </button>

          <div className="relative mb-10 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <span className="relative bg-white px-6 text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">OR LOGIN WITH EMAIL</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}
            {mode === 'signup' && (
              <div>
                <label className="block text-[10px] font-black text-gray-400 mb-1.5 uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#007bff] focus:bg-white rounded-2xl outline-none transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-[10px] font-black text-gray-400 mb-1.5 uppercase tracking-widest">Email Address / Admin User</label>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#007bff] focus:bg-white rounded-2xl outline-none transition-all"
                placeholder="example@email.com or Admin"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-[10px] font-black text-gray-400 mb-1.5 uppercase tracking-widest">Password</label>
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#007bff] focus:bg-white rounded-2xl outline-none transition-all"
                placeholder="••••••••"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-11 text-gray-400 hover:text-[#007bff]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#007bff] text-white py-5 rounded-2xl font-black text-sm tracking-widest shadow-xl shadow-blue-500/30 hover:bg-blue-600 transition-all disabled:opacity-50 active:scale-[0.98]"
            >
              {isLoading ? 'SECURELY LOGGING IN...' : (mode === 'login' ? 'ACCESS ACCOUNT' : 'CREATE FREE ACCOUNT')}
            </button>
          </form>

          <button 
            onClick={onClose}
            className="w-full mt-6 text-gray-400 text-[11px] hover:text-red-500 font-black uppercase tracking-widest transition-colors"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;