import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  Edit3,
  Camera,
  Target,
  Zap,
  Globe,
  Save,
  X,
  Loader2
} from 'lucide-react';
import authService from '../../api/authService';
import { useToast } from '../../context/ToastContext';

const Profile: React.FC = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const data = await authService.getMe();
      setProfile(data);
      
      // Split name for editing
      const names = data.name.split(' ');
      setFormData({
        firstName: names[0] || '',
        lastName: names.slice(1).join(' ') || '',
        email: data.email || ''
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedUser = await authService.updateMe(formData);
      setProfile(updatedUser);
      setIsEditing(false);
      toast('Profile records synchronized.', 'success', 'Identity Updated');
      
      // Update local storage email if it changed (needed for subsequent requests)
      if (formData.email !== localStorage.getItem('email')) {
        localStorage.setItem('email', formData.email);
      }
    } catch (error: any) {
      toast(error.response?.data?.message || 'Failed to update profile.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-teal)]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto animate-fade-in pb-20 px-4 mt-6">
      
      {/* High-Fidelity Header Strip */}
      <div className="relative mb-32">
        <div className="h-48 w-full bg-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl">
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--color-teal),_transparent)]"></div>
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
           <div className="absolute bottom-6 left-10 flex items-center gap-10">
              <div className="flex flex-col">
                 <span className="text-[10px] font-black text-[var(--color-teal)] uppercase tracking-[0.4em] mb-1">Authenticated Intern</span>
                 <h1 className="text-4xl font-serif font-bold text-white tracking-tight italic">Digital Identity</h1>
              </div>
           </div>
        </div>

        {/* Profile Avatar Overlay */}
        <div className="absolute -bottom-20 left-10 flex items-end gap-10">
           <div className="relative group">
              <div className="w-40 h-40 rounded-[2.5rem] bg-white p-2 shadow-2xl">
                 <div className="w-full h-full rounded-[2rem] bg-[var(--color-teal)] flex items-center justify-center text-white font-serif font-black text-6xl shadow-inner relative overflow-hidden">
                    {profile?.name?.split(' ').map((n: any) => n[0]).join('') || 'IB'}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
                       <Camera className="text-white" size={32} />
                    </div>
                 </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-2xl border-4 border-white shadow-lg">
                 <ShieldCheck size={20} />
              </div>
           </div>
           
           <div className="mb-6">
              {isEditing ? (
                <div className="flex gap-4 items-end mb-2">
                   <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">First Name</label>
                      <input 
                        value={formData.firstName}
                        onChange={e => setFormData({...formData, firstName: e.target.value})}
                        className="h-10 px-4 bg-slate-50 border border-slate-200 rounded-xl text-lg font-bold outline-none focus:border-[var(--color-teal)] transition-all"
                      />
                   </div>
                   <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Last Name</label>
                      <input 
                        value={formData.lastName}
                        onChange={e => setFormData({...formData, lastName: e.target.value})}
                        className="h-10 px-4 bg-slate-50 border border-slate-200 rounded-xl text-lg font-bold outline-none focus:border-[var(--color-teal)] transition-all"
                      />
                   </div>
                </div>
              ) : (
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">{profile?.name || 'Aisha Ibrahim'}</h2>
              )}
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    <BookOpen size={14} className="text-[var(--color-teal)]" /> Computer Science Discipline
                 </div>
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                 <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    <MapPin size={14} className="text-[var(--color-teal)]" /> University of Ghana
                 </div>
              </div>
           </div>
        </div>
        
        <div className="absolute bottom-0 right-0 flex gap-4">
           {isEditing ? (
             <>
               <button 
                 onClick={() => setIsEditing(false)}
                 className="h-12 px-8 bg-white border border-slate-200 text-slate-400 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm flex items-center gap-3"
               >
                  <X size={16} /> Discard dispatches
               </button>
               <button 
                 onClick={handleSave}
                 disabled={isSaving}
                 className="h-12 px-8 bg-black text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-[1.02] transition-all flex items-center gap-3 disabled:opacity-50"
               >
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
                  {isSaving ? 'Synchronizing...' : 'Save Records'}
               </button>
             </>
           ) : (
             <>
               <button 
                 onClick={() => setIsEditing(true)}
                 className="h-12 px-8 bg-white border border-slate-200 text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm flex items-center gap-3"
               >
                  <Edit3 size={16} /> Edit Dispatch
               </button>
               <button className="h-12 px-8 bg-[var(--color-teal)] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-teal-500/20 hover:scale-[1.02] transition-all flex items-center gap-3">
                  <Globe size={16} /> Share Profile
               </button>
             </>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Identity Records (Left Column) */}
        <div className="lg:col-span-2 space-y-10">
           
           <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-xl shadow-slate-200/20">
              <div className="flex items-center gap-4 mb-8">
                 <h3 className="text-xl font-heading font-black text-slate-900">Institutional Records</h3>
                 <div className="h-px flex-1 bg-slate-50"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-10">
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                       <User size={18} />
                    </div>
                    <div>
                       <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Full Identity</div>
                       <div className="text-sm font-bold text-slate-700">{profile?.name}</div>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                       <Mail size={18} />
                    </div>
                    <div className="flex-1">
                       <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Scholarship Email</div>
                       {isEditing ? (
                         <input 
                           value={formData.email}
                           onChange={e => setFormData({...formData, email: e.target.value})}
                           className="w-full h-8 bg-slate-50 border border-slate-100 rounded-lg px-3 text-sm font-bold outline-none focus:border-[var(--color-teal)] transition-all"
                         />
                       ) : (
                         <div className="text-sm font-bold text-slate-700">{profile?.email}</div>
                       )}
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                       <Target size={18} />
                    </div>
                    <div>
                       <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Access ID</div>
                       <div className="text-sm font-bold text-slate-700">{profile?.id?.substring(0, 8).toUpperCase() || 'IB-88291'}</div>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                       <Phone size={18} />
                    </div>
                    <div>
                       <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Contact Signal</div>
                       <div className="text-sm font-bold text-slate-700">+233 24 000 0000</div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-xl shadow-slate-200/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform">
                 <Award size={120} className="text-[var(--color-teal)]" />
              </div>
              <div className="flex items-center gap-4 mb-8">
                 <h3 className="text-xl font-heading font-black text-slate-900">Career Credentials</h3>
                 <div className="h-px flex-1 bg-slate-50"></div>
              </div>
              <div className="space-y-6">
                 <div className="p-6 bg-slate-50 rounded-2xl border border-white">
                    <div className="flex justify-between items-start">
                       <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[var(--color-teal)] shadow-sm">
                             <Zap size={24} />
                          </div>
                          <div>
                             <h4 className="text-base font-bold text-slate-900">Senior Web Engineering Intern</h4>
                             <p className="text-xs text-slate-500 font-medium">Verified by Google Developers</p>
                          </div>
                       </div>
                       <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">Synchronized</span>
                    </div>
                 </div>
              </div>
           </div>

        </div>

        {/* Tactical Overview (Right Column) */}
        <div className="space-y-10">
           
           <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                 <h3 className="text-lg font-serif italic mb-6">Institutional Standing</h3>
                 <div className="space-y-6">
                    <div>
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 text-slate-400">
                          <span>Verification Score</span>
                          <span>98%</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--color-teal)] w-[98%] shadow-glow"></div>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 mt-10">
                       <div className="w-12 h-12 rounded-2xl bg-[var(--color-teal)]/20 flex items-center justify-center text-[var(--color-teal)] border border-[var(--color-teal)]/30">
                          <ShieldCheck size={24} />
                       </div>
                       <div>
                          <div className="text-[11px] font-black uppercase tracking-widest">Signal Locked</div>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">Your identity is globally verified for institutional placement.</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-teal)]/10 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
           </div>

           <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-xl shadow-slate-200/20">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Discovery Pulse</h3>
              <div className="space-y-4">
                 {[
                   { label: 'Profile Visibility', value: 'High Accuracy', color: 'text-emerald-500' },
                   { label: 'Transmission Rate', value: 'Instant', color: 'text-[var(--color-teal)]' },
                   { label: 'Security Level', value: 'Tier 1 Encryption', color: 'text-slate-400' }
                 ].map((p, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2">
                       <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{p.label}</span>
                       <span className={`text-[11px] font-black uppercase tracking-widest ${p.color}`}>{p.value}</span>
                    </div>
                 ))}
              </div>
           </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;
