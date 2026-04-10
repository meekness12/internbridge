import React, { useState } from 'react';
import { 
  Bell, 
  Shield, 
  Eye, 
  Smartphone, 
  Mail, 
  Lock, 
  LogOut,
  Zap,
  Globe,
  Database,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const Settings: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'privacy' | 'notifications' | 'data'>('privacy');

  const handleUpdate = () => {
    toast('Security preferences synchronized.', 'success', 'Terminal Updated');
  };

  const menuItems = [
    { id: 'privacy', label: 'Privacy & Security', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Dispatch Control', icon: <Bell size={18} /> },
    { id: 'data', label: 'Institutional Data', icon: <Database size={18} /> },
  ];

  return (
    <div className="max-w-[1000px] mx-auto animate-fade-in pb-20 px-4 mt-6">
      <div className="flex flex-col mb-12">
         <div className="flex items-center gap-3 mb-2">
            <div className="h-[1px] w-8 bg-[var(--color-brand)] opacity-30"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-brand)]">Configuration Terminal</span>
         </div>
         <h1 className="text-5xl font-serif font-bold text-slate-900 leading-tight">Settings <em className="italic text-slate-400 font-normal">& Privacy</em></h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         
         {/* Navigation Rail (Left) */}
         <div className="space-y-2">
            {menuItems.map((item) => (
               <button
                 key={item.id}
                 onClick={() => setActiveTab(item.id as any)}
                 className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all group ${
                   activeTab === item.id 
                     ? 'bg-white border border-slate-100 shadow-xl shadow-slate-200/40 text-slate-900 font-bold' 
                     : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                 }`}
               >
                  <div className="flex items-center gap-4 text-xs uppercase tracking-widest">
                     <span className={activeTab === item.id ? 'text-[var(--color-brand)]' : 'text-slate-300 group-hover:text-slate-400'}>
                        {item.icon}
                     </span>
                     {item.label}
                  </div>
                  {activeTab === item.id && <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] shadow-[0_0_10px_var(--color-teal)]"></div>}
               </button>
            ))}
         </div>

         {/* Content Workspace (Right) */}
         <div className="lg:col-span-3 space-y-10">
            
            {activeTab === 'privacy' && (
               <div className="animate-fade-up">
                  <div className="bg-white rounded-[3rem] border border-slate-100 p-12 shadow-2xl shadow-slate-200/20 space-y-10">
                     <div>
                        <h3 className="text-xl font-heading font-black text-slate-900 mb-2">Authentication Control</h3>
                        <p className="text-xs text-slate-400 font-medium tracking-wide">Manage your institutional access points and credential integrity.</p>
                     </div>

                     <div className="space-y-6">
                        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-white">
                           <div className="flex gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 shadow-sm">
                                 <Lock size={20} />
                              </div>
                              <div>
                                 <h4 className="text-sm font-bold text-slate-900">Digital Key Rotation</h4>
                                 <p className="text-[11px] text-slate-400 font-medium">Last updated 4 months prior</p>
                              </div>
                           </div>
                           <button onClick={handleUpdate} className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white transition-all">Update Key</button>
                        </div>

                        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-white">
                           <div className="flex gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[var(--color-brand)] shadow-sm">
                                 <Smartphone size={20} />
                              </div>
                              <div>
                                 <h4 className="text-sm font-bold text-slate-900">Biometric Verification</h4>
                                 <p className="text-[11px] text-slate-400 font-medium">Secondary layer for secure dispatches</p>
                              </div>
                           </div>
                           <div className="w-12 h-6 bg-emerald-500 rounded-full p-1 cursor-pointer">
                              <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
                           </div>
                        </div>
                     </div>

                     <div className="pt-10 border-t border-slate-50">
                        <h3 className="text-xl font-heading font-black text-slate-900 mb-2">Public Signal</h3>
                        <p className="text-xs text-slate-400 font-medium tracking-wide mb-8">Control how your institutional record is broadcast to vetted partners.</p>
                        
                        <div className="grid grid-cols-2 gap-6">
                           <div className="p-6 bg-slate-50 rounded-[2rem] border border-white relative overflow-hidden group">
                              <Eye className="absolute -top-4 -right-4 text-slate-200/50 group-hover:scale-110 transition-transform" size={80} />
                              <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-2 relative z-10">Visibility Protocol</h4>
                              <p className="text-[11px] text-slate-400 font-medium relative z-10">Your profile is visible to 14 verified University partners.</p>
                           </div>
                           <div className="p-6 bg-slate-50 rounded-[2rem] border border-white relative overflow-hidden group">
                              <Zap className="absolute -top-4 -right-4 text-slate-200/50 group-hover:scale-110 transition-transform" size={80} />
                              <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-2 relative z-10">Direct Connect</h4>
                              <p className="text-[11px] text-slate-400 font-medium relative z-10">Allow vetted recruiters to signal you directly via Internal Dispatch.</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {activeTab === 'notifications' && (
               <div className="animate-fade-up">
                  <div className="bg-white rounded-[3rem] border border-slate-100 p-12 shadow-2xl shadow-slate-200/20">
                     <div className="mb-10">
                        <h3 className="text-xl font-heading font-black text-slate-900 mb-2">Dispatch Control</h3>
                        <p className="text-xs text-slate-400 font-medium tracking-wide">Configure how external signals reach your terminal.</p>
                     </div>

                     <div className="space-y-4">
                        {[
                          { label: 'Placement Alerts', icon: <Briefcase />, desc: 'Instant dispatch when a matching internship is posted.' },
                          { label: 'Application Tracking', icon: <Zap />, desc: 'Synchronized updates on your transmission status.' },
                          { label: 'System Broadcasts', icon: <Globe />, desc: 'Global institutional updates and scholarship news.' }
                        ].map((n, i) => (
                           <div key={i} className="flex items-center justify-between p-8 hover:bg-slate-50 rounded-[2.5rem] border border-transparent hover:border-slate-50 transition-all group">
                              <div className="flex gap-6">
                                 <div className="w-14 h-14 rounded-2xl bg-white border border-slate-50 flex items-center justify-center text-slate-300 group-hover:text-[var(--color-brand)] shadow-sm transition-colors">
                                    {React.cloneElement(n.icon as any, { size: 24 })}
                                 </div>
                                 <div>
                                    <h4 className="text-sm font-bold text-slate-900 mb-1">{n.label}</h4>
                                    <p className="text-[11px] text-slate-400 font-medium max-w-sm">{n.desc}</p>
                                 </div>
                              </div>
                              <div className="w-14 h-7 bg-slate-100 rounded-full p-1 cursor-pointer transition-all hover:bg-slate-200">
                                 <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}

            {activeTab === 'data' && (
               <div className="animate-fade-up">
                  <div className="bg-white rounded-[3rem] border border-slate-100 p-12 shadow-2xl shadow-slate-200/20">
                     <div className="mb-10">
                        <h3 className="text-xl font-heading font-black text-slate-900 mb-2">Institutional Data Preservation</h3>
                        <p className="text-xs text-slate-400 font-medium tracking-wide">Manage your digital scholarship and data records.</p>
                     </div>

                     <div className="space-y-6">
                        <div className="p-10 border border-slate-100 border-dashed rounded-[3rem] text-center">
                           <Database size={48} className="mx-auto text-slate-100 mb-6" />
                           <h4 className="text-lg font-bold text-slate-900 mb-2">Request Full History Export</h4>
                           <p className="text-[11px] text-slate-400 font-medium uppercase tracking-[0.2em] mb-8">Synchronized archive of all dispatches and contracts</p>
                           <button onClick={() => toast('Export request transmitted.', 'success')} className="h-14 px-10 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-[1.02] transition-all">Transmit Request</button>
                        </div>
                        
                        <div className="flex items-center justify-between p-10 bg-rose-50 rounded-[3rem] border border-rose-100 border-dashed">
                           <div className="flex gap-6">
                              <div className="w-16 h-16 rounded-[2rem] bg-white flex items-center justify-center text-rose-500 shadow-xl shadow-rose-200/50">
                                 <Trash2 size={28} />
                              </div>
                              <div>
                                 <h4 className="text-base font-bold text-rose-900 mb-1">Decommission Account</h4>
                                 <p className="text-[11px] text-rose-600 font-medium">Permanently erase your institutional record and placement history.</p>
                              </div>
                           </div>
                           <button className="h-12 px-8 bg-white border-2 border-rose-200 text-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all active:scale-95 shadow-lg shadow-rose-500/5">Begin Destruction</button>
                        </div>
                     </div>
                  </div>
               </div>
            )}

         </div>
      </div>
    </div>
  );
};

export default Settings;
