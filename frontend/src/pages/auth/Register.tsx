import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authHero from '../../assets/auth-hero.png';
import { 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Globe, 
  RefreshCw,
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--surface)] font-sans text-[var(--text)] overflow-hidden">
      
      {/* Left Column: Illustrative Hero */}
      <div className="hidden lg:flex flex-col w-[60%] bg-[#FFF5EE] relative p-12 items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center animate-fade-in scale-90 xxl:scale-100">
           {/* Custom Background shape */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FDE2D1] rounded-full opacity-50 blur-[100px] pointer-events-none"></div>
           
           <img 
             src={authHero} 
             alt="Registration Journey" 
             className="relative z-20 w-[450px] h-auto drop-shadow-2xl animate-float-slow" 
           />
           
           <div className="mt-12 space-y-4">
              <h1 className="text-5xl font-bold tracking-tight text-[var(--text)] max-w-lg mx-auto leading-tight">
                 Start your <span className="text-[var(--accent)]">verified journey.</span>
              </h1>
              <p className="text-[var(--color-muted)] font-medium text-lg max-w-sm mx-auto leading-relaxed">
                 Join 2,000+ professionals ensuring academic and career excellence.
              </p>
           </div>
        </div>
      </div>

      {/* Right Column: Registration Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-12 relative bg-[var(--surface)] overflow-y-auto">
        <div className="w-full max-w-[440px] animate-fade-up my-auto">
          
          {/* Mobile Identity */}
          <div className="lg:hidden flex justify-center mb-10">
            <div className="w-14 h-14 bg-[var(--accent)] rounded-2xl flex items-center justify-center text-white font-serif font-black text-xl shadow-xl">IB</div>
          </div>

          <div className="mb-10">
             <h2 className="text-4xl font-bold text-[var(--text)] mb-2">Create an account</h2>
             <p className="text-slate-400 text-sm font-medium">Initialize your professional record today.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 block">First Name</label>
                 <input 
                   type="text" 
                   name="firstName"
                   value={formData.firstName}
                   onChange={handleChange}
                   placeholder="e.g. Liam" 
                   className="w-full h-14 bg-[var(--background)] border border-[var(--border)] rounded-xl px-6 text-sm font-medium focus:bg-[var(--surface)] focus:border-[var(--accent)] outline-none transition-all placeholder:text-slate-200"
                   required
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 block">Last Name</label>
                 <input 
                   type="text" 
                   name="lastName"
                   value={formData.lastName}
                   onChange={handleChange}
                   placeholder="e.g. Sterling" 
                   className="w-full h-14 bg-[var(--background)] border border-[var(--border)] rounded-xl px-6 text-sm font-medium focus:bg-[var(--surface)] focus:border-[var(--accent)] outline-none transition-all placeholder:text-slate-200"
                   required
                 />
               </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 block">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="mail@abc.com" 
                className="w-full h-14 bg-[var(--background)] border border-[var(--border)] rounded-xl px-6 text-sm font-medium focus:bg-[var(--surface)] focus:border-[var(--accent)] outline-none transition-all placeholder:text-slate-200"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 block">Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••" 
                className="w-full h-14 bg-[var(--background)] border border-[var(--border)] rounded-xl px-6 text-sm font-medium focus:bg-[var(--surface)] focus:border-[var(--accent)] outline-none transition-all placeholder:text-slate-200 font-mono tracking-widest"
                required
              />
              <p className="text-[9px] text-slate-300 font-bold uppercase tracking-wider ml-1">Must be 12+ characters for security audit.</p>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer group mb-8">
                <div className="relative flex items-center">
                  <input type="checkbox" required className="peer appearance-none w-5 h-5 bg-[var(--surface)] border border-[var(--border)] rounded-lg checked:bg-[var(--accent)] transition-all cursor-pointer shadow-sm" />
                  <CheckCircle2 size={12} className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <span className="text-[10px] text-slate-400 font-medium leading-tight select-none">I agree to the <button type="button" className="text-[var(--accent)] font-extrabold hover:underline">Governance Protocols</button> and Data Privacy policies.</span>
              </label>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-16 bg-[var(--accent)] hover:bg-[#4338CA] text-white rounded-xl text-[12px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all shadow-xl shadow-indigo-500/10 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw size={24} className="animate-spin text-white" />
                ) : (
                  <>
                    Create Account <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Social Proof Footer */}
          <div className="mt-10 text-center border-t border-slate-50 pt-8">
            <div className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4">Secured by Institutional Registry</div>
            <div className="flex justify-center gap-6 grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
               <Globe size={18} />
               <ShieldCheck size={18} />
               <Lock size={18} />
            </div>
          </div>

          {/* Login Redirect */}
          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-slate-400">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-[var(--accent)] font-extrabold hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
