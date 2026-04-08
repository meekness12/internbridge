import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Zap,
  Fingerprint,
  Globe,
  Sparkles,
  RefreshCw
} from 'lucide-react';

import authService from '../api/authService';

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
    <div className="min-h-screen flex bg-[#FDFCF9] font-sans text-[var(--color-navy)] overflow-hidden relative">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[var(--color-gold-light)]/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[var(--color-forest)]/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Left Column: The "Grand Portal" Branding */}
      <div className="hidden lg:flex flex-col w-[50%] bg-[var(--color-navy)] p-20 relative overflow-hidden shadow-[20px_0_100px_rgba(0,0,0,0.2)] z-10">
        {/* Editorial Pattern Override */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        
        {/* Logo Section */}
        <div className="relative z-20 flex items-center gap-4 mb-32 group animate-fade-in">
          <div className="w-14 h-14 bg-[var(--color-gold)] rounded-2xl flex items-center justify-center font-serif font-black text-black text-2xl shadow-2xl group-hover:scale-110 transition-transform duration-700">
            IB
          </div>
          <div className="flex flex-col">
             <span className="font-serif italic text-3xl tracking-tight text-white font-bold">InternBridge</span>
             <span className="text-[9px] font-mono text-[var(--color-gold)] uppercase tracking-[0.5em] font-black opacity-60">Global Governance</span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 mt-auto">
          <div className="flex items-center gap-4 mb-10 animate-fade-up">
             <div className="h-[1px] w-12 bg-[var(--color-gold)]"></div>
             <span className="text-[10px] font-mono font-black text-[var(--color-gold)] uppercase tracking-[0.4em]">Institutional Tier Access</span>
          </div>
          
          <h1 className="text-7xl font-serif text-white leading-[0.95] mb-12 animate-fade-up delay-1">
            Where <em className="italic text-slate-400">talents</em> find their <br />
            <span className="text-[var(--color-gold)]">Global Path.</span>
          </h1>

          <p className="text-xl text-white/40 leading-relaxed max-w-lg mb-16 font-medium animate-fade-up delay-2">
            The unified protocol for student placements, corporate talent acquisition, and academic oversight.
          </p>

          {/* Verification Badge */}
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 flex items-center gap-10 animate-fade-up delay-3 shadow-2xl">
             <div className="flex -space-x-4">
                {[1,2,3].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-[var(--color-navy)] bg-slate-200 overflow-hidden shadow-xl">
                    <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="User" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-[var(--color-navy)] bg-[var(--color-gold)] flex items-center justify-center text-[10px] font-black text-black shadow-xl">
                  +2k
                </div>
             </div>
             <div className="h-10 w-[1px] bg-white/10"></div>
             <div>
                <div className="flex items-center gap-2 text-white font-bold mb-1">
                   <ShieldCheck size={16} className="text-emerald-500" />
                   <span className="text-sm tracking-tight">Enterprise Verified</span>
                </div>
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black">99.9% Compliance Rating</div>
             </div>
          </div>
        </div>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
           <Globe size={400} className="text-white" />
        </div>
      </div>

      {/* Right Column: High-Fidelity Gate */}
      <div className="flex-1 flex flex-col justify-center items-center p-12 bg-[#FDFCF9] relative z-20">
        <div className="w-full max-w-[480px] animate-fade-in delay-2">
          
          {/* Form Header */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-2.5 h-2.5 bg-[var(--color-gold)] rounded-full shadow-[0_0_15px_rgba(184,131,26,0.6)]"></div>
               <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300">Identity Authentication</span>
            </div>
            <h2 className="text-6xl font-serif text-[var(--color-navy)] leading-[0.9] mb-6 font-bold">
               Access the <em className="italic text-slate-400">Hub</em>
            </h2>
            <p className="text-slate-400 text-base font-medium leading-relaxed">
               Securely authenticate your institutional credentials to enter the InternBridge workspace.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {errorMessage && (
              <div className="bg-rose-50 text-rose-600 p-5 rounded-[1.5rem] border border-rose-100 flex items-center gap-4 text-sm font-bold animate-shake">
                <AlertCircle size={22} /> {errorMessage}
              </div>
            )}
            
            <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 block">Terminal Email</label>
              <div className="relative group/input">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within/input:text-[var(--color-gold)] transition-colors h-5 w-5" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="identity-root@institution.edu" 
                  className="w-full h-16 bg-white border border-slate-100 rounded-[1.5rem] pl-16 pr-6 text-base font-medium focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition-all placeholder:text-slate-200 shadow-xl shadow-black/[0.02] focus:bg-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] block">Security Hash</label>
                <button type="button" className="text-[10px] font-black text-[var(--color-gold)] hover:opacity-70 transition-opacity uppercase tracking-widest">Protocol Reset?</button>
              </div>
              <div className="relative group/input">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within/input:text-[var(--color-gold)] transition-colors h-5 w-5" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  className="w-full h-16 bg-white border border-slate-100 rounded-[1.5rem] pl-16 pr-16 text-base font-medium focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition-all placeholder:text-slate-200 shadow-xl shadow-black/[0.02] font-mono tracking-widest"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200 hover:text-[var(--color-navy)] transition-colors"
                >
                  {showPassword ? <Sparkles size={20} className="text-[var(--color-gold)]" /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" className="peer appearance-none w-5 h-5 bg-white border border-slate-100 rounded-lg checked:bg-[var(--color-navy)] transition-all cursor-pointer shadow-sm" />
                    <CheckCircle2 size={12} className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                  <span className="text-[11px] text-slate-400 font-black uppercase tracking-widest group-hover:text-slate-600 transition-colors">Persistent Session</span>
                </label>
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm border border-emerald-100">
                   <Fingerprint size={12} /> Secure Link
                </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-16 bg-[var(--color-navy)] hover:bg-black text-white rounded-[1.5rem] text-[12px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all shadow-[0_30px_60px_rgba(26,48,40,0.25)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? (
                <RefreshCw size={24} className="animate-spin text-[var(--color-gold)]" />
              ) : (
                <>
                  Enter Workspace <ArrowRight size={20} className="text-[var(--color-gold)]" />
                </>
              )}
            </button>
          </form>

          {/* Institutional Divider */}
          <div className="relative my-16">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.4em] font-black text-slate-200">
              <span className="px-6 bg-[#FDFCF9]">External Authority</span>
            </div>
          </div>

          {/* Institutional SSO */}
          <div className="grid grid-cols-2 gap-6">
            <button className="flex items-center justify-center gap-4 h-16 bg-white border border-slate-100 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest text-[var(--color-navy)] hover:bg-slate-50 transition-all shadow-xl shadow-black/[0.02]">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 grayscale opacity-40 group-hover:grayscale-0 transition-all" /> Google Cloud
            </button>
            <button className="flex items-center justify-center gap-4 h-16 bg-white border border-slate-100 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest text-[var(--color-navy)] hover:bg-slate-50 transition-all shadow-xl shadow-black/[0.02]">
              <div className="w-5 h-5 rounded-lg bg-[var(--color-navy)] flex items-center justify-center text-[8px] font-black text-white">IB</div> Institution SSO
            </button>
          </div>

          {/* Footer Navigation */}
          <div className="mt-16 text-center">
            <div className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">New to the platform?</div>
            <button 
              onClick={() => navigate('/register')}
              className="group inline-flex items-center gap-2 text-sm font-bold text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-all"
            >
              Request Access Credentials
              <div className="h-[1px] w-4 bg-[var(--color-navy)] group-hover:w-8 group-hover:bg-[var(--color-gold)] transition-all"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
