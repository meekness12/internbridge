import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  RefreshCw
} from 'lucide-react';

import authService from '../api/authService';

import authHero from '../assets/auth-hero.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const data = await authService.login({ email, password });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('role', data.role);
      localStorage.setItem('email', data.email);

      try {
        const profile = await authService.getMe();
        localStorage.setItem('userName', profile.name);
        localStorage.setItem('institution', profile.institution);
        localStorage.setItem('email', profile.email);
        if (profile.companyId) {
          localStorage.setItem('companyId', profile.companyId);
        }
      } catch (e) {
        console.warn('Failed to fetch profile details after login');
      }
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login failure:', error);
      setErrorMessage(
        error.response?.data?.message || 
        'Invalid identity credentials or network protocol failure.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans text-slate-900 overflow-hidden">
      
      {/* Left Column: Illustrative Hero */}
      <div className="hidden lg:flex flex-col w-[60%] bg-[#FFF5EE] relative p-20 items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center animate-fade-in">
           {/* Custom Multi-layered Background shapes */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FDE2D1] rounded-full opacity-50 blur-3xl pointer-events-none"></div>
           
           <img 
             src={authHero} 
             alt="Professional Onboarding" 
             className="relative z-20 w-[480px] h-auto drop-shadow-2xl animate-float" 
           />
           
           <div className="mt-16 space-y-4">
              <h1 className="text-5xl font-bold tracking-tight text-slate-900 break-words max-w-lg mx-auto leading-tight">
                 Elevate your <span className="text-[var(--color-brand)]">career trajectory.</span>
              </h1>
              <p className="text-slate-500 font-medium text-lg max-w-sm mx-auto leading-relaxed">
                 Join the verified registry for global talent and academic excellence.
              </p>
           </div>
        </div>
      </div>

      {/* Right Column: Functional Authentication */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-20 relative bg-white">
        <div className="w-full max-w-[420px] animate-fade-up">
          
          {/* Mobile Identity */}
          <div className="lg:hidden flex justify-center mb-12">
            <div className="w-14 h-14 bg-[var(--color-brand)] rounded-2xl flex items-center justify-center text-white font-serif font-black text-xl shadow-xl">IB</div>
          </div>

          <div className="mb-12">
             <h2 className="text-4xl font-bold text-slate-900 mb-2">Login to your Account</h2>
             <p className="text-slate-400 text-sm font-medium">Verify your credentials to continue your journey.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {errorMessage && (
              <div className="bg-rose-50 text-rose-600 p-4 rounded-xl border border-rose-100 flex items-center gap-3 text-xs font-bold animate-shake">
                <AlertCircle size={18} /> {errorMessage}
              </div>
            )}
            
            {/* Google SSO Placeholder */}
            <button type="button" className="w-full h-14 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-4 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
               <img src="https://www.google.com/favicon.ico" alt="G" className="w-4 h-4" />
               Continue with Google Cloud
            </button>

            <div className="relative flex items-center py-2">
               <div className="flex-grow border-t border-slate-100"></div>
               <span className="flex-shrink mx-4 text-[9px] font-black text-slate-300 uppercase tracking-widest">or sign in with email</span>
               <div className="flex-grow border-t border-slate-100"></div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 block">Email</label>
              <div className="relative group/input">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mail@abc.com" 
                  className="w-full h-14 bg-slate-50 border border-slate-100 rounded-xl px-6 text-sm font-medium focus:bg-white focus:border-[var(--color-brand)] outline-none transition-all placeholder:text-slate-300 shadow-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] block">Password</label>
                <button type="button" className="text-[10px] font-bold text-[var(--color-brand)] hover:underline transition-all">Forgot Password?</button>
              </div>
              <div className="relative group/input">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  className="w-full h-14 bg-slate-50 border border-slate-100 rounded-xl px-6 text-sm font-medium focus:bg-white focus:border-[var(--color-brand)] outline-none transition-all placeholder:text-slate-300 shadow-sm font-mono tracking-widest"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900 transition-colors"
                >
                  {showPassword ? <Sparkles size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" className="peer appearance-none w-4 h-4 bg-white border border-slate-200 rounded checked:bg-[var(--color-brand)] checked:border-[var(--color-brand)] transition-all cursor-pointer" />
                    <CheckCircle2 size={10} className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium group-hover:text-slate-600 transition-colors">Remember Me</span>
                </label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-16 bg-[var(--color-brand)] hover:bg-[#4338CA] text-white rounded-xl text-[12px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all shadow-xl shadow-indigo-500/10 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isLoading ? (
                <RefreshCw size={24} className="animate-spin text-white" />
              ) : (
                <>
                  Login <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-16 text-center">
            <p className="text-sm font-medium text-slate-400">
               Don't have an account?{' '}
               <button 
                 onClick={() => navigate('/register')}
                 className="text-[var(--color-brand)] font-extrabold hover:underline"
               >
                 Create an Account
               </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
