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
  AlertCircle
} from 'lucide-react';

import authService from '../api/authService';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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
    <div className="min-h-screen flex bg-[var(--background)] font-sans text-[var(--color-navy)] overflow-hidden">
      
      {/* Left Column: Branding & Stats */}
      <div className="hidden lg:flex flex-col w-[55%] bg-[var(--color-forest)] p-16 relative overflow-hidden">
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(var(--color-gold) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3 mb-24">
          <div className="w-10 h-10 bg-[var(--color-gold)] rounded flex items-center justify-center font-serif font-bold text-black text-xl">
            IB
          </div>
          <span className="font-serif italic text-2xl tracking-tight text-white">InternBridge</span>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-xl">
          <div className="label-mono-accent text-[10px] tracking-[0.2em] mb-6 opacity-60 text-white uppercase font-bold flex items-center gap-4">
            <span className="w-8 h-[1px] bg-white opacity-40"></span>
            Enterprise Internship Platform
          </div>
          <h1 className="text-6xl font-serif text-white leading-[1.1] mb-8">
            Where <em className="italic text-[var(--color-gold)]">talent</em> meets opportunity — tracked, verified, & official.
          </h1>
          <p className="text-lg text-white/60 leading-relaxed mb-16">
            One platform for students, companies, lecturers and institutions. From application to contract to daily logbook – every step is automated, compliant and permanent.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
            <div className="border-r border-white/10 px-4">
              <div className="text-3xl font-serif font-bold text-white mb-1">
                12<span className="text-[var(--color-gold)]">K+</span>
              </div>
              <div className="label-mono text-[9px] tracking-widest uppercase opacity-40 text-white font-bold">Active Students</div>
            </div>
            <div className="border-r border-white/10 px-8">
              <div className="text-3xl font-serif font-bold text-white mb-1">
                840<span className="text-[var(--color-gold)]">+</span>
              </div>
              <div className="label-mono text-[9px] tracking-widest uppercase opacity-40 text-white font-bold">Companies</div>
            </div>
            <div className="px-8">
              <div className="text-3xl font-serif font-bold text-white mb-1">
                98<span className="text-[var(--color-gold)]">%</span>
              </div>
              <div className="label-mono text-[9px] tracking-widest uppercase opacity-40 text-white font-bold">Compliance</div>
            </div>
          </div>

          {/* Practical Live Feed Mockup */}
          <div className="bg-black/20 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div className="label-mono text-[9px] tracking-[0.2em] text-white opacity-40 font-bold uppercase">Live Logbook • Day 47</div>
              <div className="flex items-center gap-2 text-[var(--status-success)] text-[9px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-[var(--status-success)] rounded-full animate-pulse"></span> Supervisor Verified
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3 text-white/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  JWT Authentication Middleware
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">✓ Done</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3 text-white/80">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Spring Security Filter Chain
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center gap-1 font-bold">
                  <Clock size={10} /> Pending
                </span>
              </div>
            </div>
            <div className="px-6 py-5 bg-[var(--color-gold)]/5 border-t border-white/5 flex items-center gap-4">
              <div className="p-2 bg-white/10 rounded">
                <FileText size={18} className="text-white opacity-60" />
              </div>
              <div className="flex-1">
                <div className="label-mono text-[8px] text-[var(--color-gold)] font-bold tracking-[0.2em] uppercase mb-1">Auto-generated Contract</div>
                <div className="text-xs text-white opacity-90 font-bold tracking-tight">INT-2024-00847 • Techwave Technologies</div>
              </div>
              <div className="w-2 h-2 rounded-full bg-[var(--color-gold)]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Sign In Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-[var(--background)]">
        <div className="w-full max-w-[420px]">
          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <div className="label-mono text-[var(--color-gold)] text-[10px] tracking-[0.3em] font-bold uppercase mb-4 opacity-80 flex items-center gap-3 justify-center lg:justify-start">
              <span className="w-6 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
              Welcome back
            </div>
            <h2 className="text-5xl font-serif text-[var(--color-navy)] leading-tight mb-4">
              Sign in to<br />InternBridge
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-[320px]">
              Enter your credentials – your role and dashboard are automatically applied after authentication.
            </p>
          </div>

          {/* Alert Notice */}
          <div className="bg-[#EDF5F2] border border-[#D9EAE4] rounded-xl p-4 flex gap-4 mb-8">
            <ShieldCheck className="text-[var(--color-forest)] shrink-0" size={20} />
            <p className="text-[11px] text-[var(--color-forest)] leading-relaxed font-medium">
              Your access level and features are assigned automatically based on your account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {errorMessage && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-100 flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} /> {errorMessage}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[var(--color-navy)] uppercase tracking-wider block">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-forest)] transition-colors" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@institution.edu.gh" 
                  className="w-full h-12 bg-white border border-[var(--color-border)] rounded-xl pl-11 pr-4 text-sm focus:ring-1 focus:ring-[var(--color-forest)] outline-none transition-all placeholder:text-slate-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-[var(--color-navy)] uppercase tracking-wider block">Password</label>
                <button type="button" className="text-[11px] font-bold text-slate-500 hover:text-[var(--color-forest)] transition-colors">Forgot password?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-forest)] transition-colors" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password" 
                  className="w-full h-12 bg-white border border-[var(--color-border)] rounded-xl pl-11 pr-12 text-sm focus:ring-1 focus:ring-[var(--color-forest)] outline-none transition-all placeholder:text-slate-300"
                  required
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <Eye size={18} />
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer group w-fit">
              <div className="relative flex items-center">
                <input type="checkbox" className="peer appearance-none w-4 h-4 bg-white border border-[var(--color-border)] rounded checked:bg-[var(--color-forest)] transition-all cursor-pointer" />
                <CheckCircle2 size={10} className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <span className="text-xs text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Keep me signed in</span>
            </label>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-14 bg-[var(--color-forest)] hover:bg-[#1B2B24] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[var(--color-forest)]/10 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-border)] opacity-60"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold text-slate-400">
              <span className="px-4 bg-[var(--background)]">or continue with institution</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 h-12 bg-white border border-[var(--color-border)] rounded-xl text-xs font-bold text-[var(--color-navy)] hover:bg-slate-50 transition-all shadow-sm">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 grayscale opacity-70" /> Google Workspace
            </button>
            <button className="flex items-center justify-center gap-3 h-12 bg-white border border-[var(--color-border)] rounded-xl text-xs font-bold text-[var(--color-navy)] hover:bg-slate-50 transition-all shadow-sm">
              <div className="w-4 h-4 rounded-sm border border-[var(--color-navy)]/20 flex items-center justify-center text-[8px] font-black">IB</div> Institution SSO
            </button>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-xs text-slate-500 font-medium">
            Don't have an account? <button className="font-bold text-[var(--color-navy)] hover:underline ml-1">Request access</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
