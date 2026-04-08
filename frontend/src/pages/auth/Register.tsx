import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Globe, 
  Sparkles,
  Zap,
  Fingerprint,
  RefreshCw,
  Building2,
  Trophy
} from 'lucide-react';

/**
 * Register Component
 * Step 1 of the Progressive Onboarding flow.
 * Collects core user details (First Name, Last Name, Email, Password).
 */
const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    try {
      console.log('Registering user in terminal:', formData);
      // Actual implementation would call authService.register
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // On success, redirect to step 2 (onboarding)
      navigate('/onboarding');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FDFCF9] font-sans text-[var(--color-navy)] overflow-hidden relative">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[var(--color-gold-light)]/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[var(--color-forest)]/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Left Column: Value Proposition & Institutional Trust */}
      <div className="hidden lg:flex flex-col w-[45%] bg-[var(--color-navy)] p-20 relative overflow-hidden shadow-[20px_0_100px_rgba(0,0,0,0.2)] z-10">
        {/* Subtle Branding Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        
        {/* Logo Section */}
        <div className="relative z-20 flex items-center gap-4 mb-24 group animate-fade-in" onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
          <div className="w-12 h-12 bg-[var(--color-gold)] rounded-2xl flex items-center justify-center font-serif font-black text-black text-xl shadow-2xl group-hover:rotate-12 transition-transform duration-500">
            IB
          </div>
          <span className="font-serif italic text-2xl tracking-tight text-white font-bold">InternBridge</span>
        </div>

        {/* Value Prop Content */}
        <div className="relative z-20 mt-10">
          <div className="flex items-center gap-4 mb-8 animate-fade-up">
             <div className="h-[1px] w-12 bg-[var(--color-gold)]"></div>
             <span className="text-[10px] font-mono font-black text-[var(--color-gold)] uppercase tracking-[0.4em]">Onboarding Phase 01</span>
          </div>
          
          <h1 className="text-6xl font-serif text-white leading-[1.0] mb-8 animate-fade-up delay-1">
            Initialize your <em className="italic text-slate-400">Professional</em> <br />
            <span className="text-[var(--color-gold)]">Identity.</span>
          </h1>

          <p className="text-lg text-white/50 leading-relaxed max-w-md mb-20 font-medium animate-fade-up delay-2">
            Join the global ecosystem connecting academic excellence with industry innovation. Your path to verified excellence starts here.
          </p>

          {/* Benefits Grid */}
          <div className="space-y-8 animate-fade-up delay-3">
             {[
               { icon: <ShieldCheck size={20} />, title: "Institutional Compliance", desc: "Every placement is verified by academic supervisors." },
               { icon: <Building2 size={20} />, title: "Industry Partnerships", desc: "Access to top-tier corporate internship programs." },
               { icon: <Trophy size={20} />, title: "Digital Credentials", desc: "Verified skill assessment and performance recording." }
             ].map((item, i) => (
               <div key={i} className="flex gap-6 items-start group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[var(--color-gold)] group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-navy)] transition-all duration-500 border border-white/10">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 tracking-tight">{item.title}</h4>
                    <p className="text-white/30 text-xs leading-relaxed max-w-[280px]">{item.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Background Visual */}
        <div className="absolute bottom-0 right-0 p-10 opacity-5 pointer-events-none translate-y-1/4">
           <Fingerprint size={450} className="text-white" />
        </div>
      </div>

      {/* Right Column: Registration Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-12 bg-[#FDFCF9] relative z-20">
        <div className="w-full max-w-[500px] animate-fade-in delay-2">
          
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
               <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)]"></div>
               <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300">Identity Provisioning</span>
            </div>
            <h2 className="text-5xl font-serif text-[var(--color-navy)] leading-[0.95] mb-6 font-bold">
               Create your <em className="italic text-slate-400">Record</em>
            </h2>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm">
               Begin your professional journey by establishing a verified record in our global identity registry.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] ml-2 block">Given Name</label>
                <div className="relative group/input">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within/input:text-[var(--color-gold)] transition-colors h-4 w-4" />
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="e.g. Liam" 
                    className="w-full h-14 bg-white border border-slate-100 rounded-[1.2rem] pl-14 pr-6 text-sm font-medium focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition-all placeholder:text-slate-200 shadow-xl shadow-black/[0.01]"
                    required
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] ml-2 block">Surname</label>
                <div className="relative group/input">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within/input:text-[var(--color-gold)] transition-colors h-4 w-4" />
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Sterling" 
                    className="w-full h-14 bg-white border border-slate-100 rounded-[1.2rem] pl-14 pr-6 text-sm font-medium focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition-all placeholder:text-slate-200 shadow-xl shadow-black/[0.01]"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] ml-2 block">Institutional Email</label>
              <div className="relative group/input">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within/input:text-[var(--color-gold)] transition-colors h-4 w-4" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="identity@institution.edu" 
                  className="w-full h-14 bg-white border border-slate-100 rounded-[1.2rem] pl-14 pr-6 text-sm font-medium focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition-all placeholder:text-slate-200 shadow-xl shadow-black/[0.01]"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] ml-2 block">Secure Passphrase</label>
              <div className="relative group/input">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within/input:text-[var(--color-gold)] transition-colors h-4 w-4" />
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••" 
                  className="w-full h-14 bg-white border border-slate-100 rounded-[1.2rem] pl-14 pr-6 text-sm font-medium focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition-all placeholder:text-slate-200 shadow-xl shadow-black/[0.01] font-mono"
                  required
                />
              </div>
              <p className="text-[9px] text-slate-300 font-bold uppercase tracking-wider ml-2">Must contain 12+ characters for security audit.</p>
            </div>

            <div className="pt-4">
              <label className="flex items-center gap-3 cursor-pointer group px-2 mb-8">
                <div className="relative flex items-center">
                  <input type="checkbox" required className="peer appearance-none w-5 h-5 bg-white border border-slate-100 rounded-lg checked:bg-[var(--color-navy)] transition-all cursor-pointer shadow-sm" />
                  <CheckCircle2 size={12} className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <span className="text-[10px] text-slate-400 font-medium leading-tight">I agree to the <button type="button" className="text-[var(--color-gold)] font-black uppercase tracking-widest hover:underline">Governance Protocols</button> and Data Privacy policies.</span>
              </label>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-16 bg-[var(--color-navy)] hover:bg-black text-white rounded-[1.5rem] text-[12px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all shadow-[0_30px_60px_rgba(26,48,40,0.2)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw size={20} className="animate-spin text-[var(--color-gold)]" />
                ) : (
                  <>
                    Initialize Account <ArrowRight size={20} className="text-[var(--color-gold)]" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Social Proof Footer */}
          <div className="mt-12 text-center border-t border-slate-50 pt-10">
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-6">Secured by Institutional SSO</div>
            <div className="flex justify-center gap-6 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
               <Globe size={20} />
               <ShieldCheck size={20} />
               <Lock size={20} />
            </div>
          </div>

          {/* Login Redirect */}
          <div className="mt-12 text-center">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
              Already localized?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-[var(--color-navy)] hover:text-[var(--color-gold)] font-black transition-colors"
              >
                Enter Workspace
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
