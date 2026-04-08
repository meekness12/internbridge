import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  UserPlus,
  ShieldCheck,
  ShieldAlert,
  Mail,
  Trash2,
  UserCheck,
  UserX,
  X,
  Zap,
  ArrowUpRight,
  Database,
  Lock,
  Terminal,
  Fingerprint
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import { useToast } from '../../context/ToastContext';
import userService from '../../api/userService';
import type { UserDTO } from '../../api/userService';

const UserManagement: React.FC = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'INTERN' as UserDTO['role']
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
      toast('Failed to synchronize user records with the central authority.', 'error', 'Protocol Error');
      // Fallback to mock data for demonstration if backend fails in dev
      setUsers([
        { id: '1', name: 'Daniel Owusu', role: 'COMPANY_ADMIN', email: 'daniel@techwave.com', status: 'ACTIVE', institution: 'Techwave Technologies', joinedDate: 'Jan 12, 2024' },
        { id: '2', name: 'Aisha Ibrahim', role: 'INTERN', email: 'aisha.i@student.ug.edu.gh', status: 'VERIFIED', institution: 'University of Ghana', joinedDate: 'Feb 01, 2024' },
        { id: '3', name: 'Dr. Mensah Asante', role: 'SUPERVISOR', email: 'm.asante@cuc.edu.gh', status: 'ACTIVE', institution: 'Central University', joinedDate: 'Dec 05, 2023' },
        { id: '4', name: 'Sarah Linn', role: 'SCHOOL_ADMIN', email: 's.linn@admin.ug.edu.gh', status: 'ACTIVE', institution: 'Univ. of Ghana', joinedDate: 'Jan 20, 2024' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleProvision = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await userService.provisionUser(newUser);
      toast('Identity provisioned successfully. Credential handshake complete.', 'success', 'Governance');
      setIsModalOpen(false);
      setNewUser({ firstName: '', lastName: '', email: '', password: '', role: 'INTERN' });
      fetchUsers();
    } catch (error) {
      toast('Failed to provision new identity. Authorization cluster rejected the request.', 'error', 'Protocol Failure');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (userId: string, newStatus: UserDTO['status']) => {
    try {
      await userService.updateStatus(userId, newStatus);
      toast(`User status updated to ${newStatus}. Policy enforced across all nodes.`, 'success', 'Policy Engine');
      fetchUsers();
    } catch (error) {
      toast('Failed to update user status.', 'error', 'Governance Error');
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await userService.deleteUser(userId);
      toast('Identity purged from central registry successfully.', 'success', 'Account Termination');
      setIsDeleting(null);
      fetchUsers();
    } catch (error) {
      toast('Failed to terminate identity.', 'error', 'System Error');
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.institution?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-fade-in pb-20 max-w-[1400px] mx-auto">
      <PremiumHeader 
        eyebrow="Institutional Oversight"
        title="Identity"
        italicTitle="Registry"
        subtitle="Global directory of verified platform participants across all academic and corporate clusters."
        eyebrowColor="text-rose-600"
        primaryAction={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary h-14 px-10 rounded-2xl flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98]"
          >
            Provision Identity <UserPlus size={20} />
          </button>
        }
      />

      {/* Identity Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-up">
         {[
           { label: 'Verified Nodes', value: users.length.toString(), icon: <Fingerprint size={20} />, color: 'bg-indigo-50 text-indigo-600' },
           { label: 'Active Sessions', value: '84', icon: <Zap size={20} />, color: 'bg-emerald-50 text-emerald-600' },
           { label: 'Policy Violations', value: '0', icon: <ShieldAlert size={20} />, color: 'bg-rose-50 text-rose-600' },
           { label: 'Governance Auth', value: '99.9%', icon: <Lock size={20} />, color: 'bg-amber-50 text-amber-600' }
         ].map((k, i) => (
           <div key={i} className="card p-8 flex items-center gap-6 group hover:translate-y-[-4px] transition-all bg-white border border-slate-100 shadow-xl shadow-black/[0.02]">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${k.color} group-hover:rotate-6 transition-all shadow-inner`}>
                 {k.icon}
              </div>
              <div>
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-1">{k.label}</div>
                 <div className="text-2xl font-serif font-black text-[var(--color-navy)] tracking-tight">{k.value}</div>
              </div>
           </div>
         ))}
      </div>

      {/* Management Toolbar */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between glass-panel glass-light p-6 rounded-3xl border border-white/60 shadow-xl backdrop-blur-md animate-fade-up delay-1">
        <div className="relative group w-full md:w-[500px]">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[var(--color-gold)] transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Query identity by name, protocol ID, or institutional node..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 bg-white/50 border border-slate-100 rounded-[1.5rem] pl-16 pr-6 text-sm font-medium outline-none focus:ring-1 focus:ring-[var(--color-gold)] focus:bg-white transition-all shadow-inner"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
           <button className="flex-1 md:flex-none h-14 px-8 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[var(--color-navy)] flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-lg shadow-black/[0.02]">
             <Filter size={18} className="text-slate-300" /> Advanced Filter
           </button>
           <button className="flex-1 md:flex-none h-14 px-8 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[var(--color-navy)] flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-lg shadow-black/[0.02]">
             Export Ledger <Database size={18} className="text-slate-300" />
           </button>
        </div>
      </div>

      {/* Main Identity Ledger */}
      <div className="glass-panel glass-light overflow-hidden border-white/60 rounded-[3rem] shadow-2xl relative min-h-[500px] animate-fade-up delay-2">
        {isLoading && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-md z-20 flex flex-col items-center justify-center gap-6">
             <RefreshCw size={40} className="animate-spin text-[var(--color-gold)]" />
             <span className="text-[11px] font-black tracking-[0.45em] uppercase text-slate-400">Synchronizing Global Root...</span>
          </div>
        )}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/30 border-b border-slate-100/50">
              <th className="px-10 py-8 text-left text-[10px] font-black font-mono uppercase tracking-[0.4em] text-slate-300">Identity Record</th>
              <th className="px-10 py-8 text-left text-[10px] font-black font-mono uppercase tracking-[0.4em] text-slate-300">Auth Tier</th>
              <th className="px-10 py-8 text-left text-[10px] font-black font-mono uppercase tracking-[0.4em] text-slate-300">Terminal Status</th>
              <th className="px-10 py-8 text-right text-[10px] font-black font-mono uppercase tracking-[0.4em] text-slate-300">Protocol Date</th>
              <th className="px-10 py-8 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/30">
            {filteredUsers.length > 0 ? filteredUsers.map((user, idx) => (
              <tr key={user.id} className="group hover:bg-[var(--color-gold-light)]/5 transition-all animate-fade-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                <td className="px-10 py-10">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[var(--color-navy)] font-serif font-black text-lg shadow-xl group-hover:bg-[var(--color-navy)] group-hover:text-white transition-all duration-500">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-base font-bold text-[var(--color-navy)] tracking-tight group-hover:translate-x-1 transition-transform">{user.name}</div>
                      <div className="text-[11px] text-slate-300 font-mono font-black lowercase tracking-tighter mt-1 italic opacity-60 flex items-center gap-2">
                        <Mail size={12} className="text-[var(--color-gold)]" /> {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-10">
                  <span className={`text-[10px] px-3 py-1 rounded-xl font-black uppercase tracking-widest border transition-all ${
                    user.role === 'SUPER_ADMIN' ? 'bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-600 group-hover:text-white' :
                    user.role === 'COMPANY_ADMIN' ? 'bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-600 group-hover:text-white' :
                    user.role === 'SUPERVISOR' ? 'bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white' :
                    user.role === 'SCHOOL_ADMIN' ? 'bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white' :
                    'bg-slate-50 text-slate-400 border-slate-100'
                  }`}>
                    {user.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-10 py-10">
                  <div className="flex items-center gap-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${user.status === 'ACTIVE' || user.status === 'VERIFIED' ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]'}`}></div>
                    <span className={`text-[10px] font-black uppercase tracking-[0.25em] ${
                      user.status === 'ACTIVE' || user.status === 'VERIFIED' ? 'text-emerald-600' : 
                      user.status === 'SUSPENDED' ? 'text-amber-600' : 'text-slate-400'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </td>
                <td className="px-10 py-10 text-right">
                  <span className="text-[12px] font-mono font-black text-slate-200 uppercase tracking-tighter">{user.joinedDate || 'Sync Required'}</span>
                </td>
                <td className="px-10 py-10 text-right">
                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {user.status !== 'SUSPENDED' ? (
                      <button 
                        onClick={() => handleStatusChange(user.id, 'SUSPENDED')}
                        className="w-11 h-11 bg-amber-50 text-amber-500 hover:bg-amber-600 hover:text-white rounded-xl flex items-center justify-center transition-all shadow-sm" 
                        title="Suspend Identity"
                      >
                        <UserX size={18} />
                      </button>
                    ) : (
                      <button 
                         onClick={() => handleStatusChange(user.id, 'ACTIVE')}
                         className="w-11 h-11 bg-emerald-50 text-emerald-500 hover:bg-emerald-600 hover:text-white rounded-xl flex items-center justify-center transition-all shadow-sm" 
                         title="Activate Identity"
                      >
                        <UserCheck size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => setIsDeleting(user.id)}
                      className="w-11 h-11 bg-rose-50 text-rose-500 hover:bg-rose-600 hover:text-white rounded-xl flex items-center justify-center transition-all shadow-sm" 
                      title="Purge Identity"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button className="w-11 h-11 bg-slate-50 text-slate-400 hover:bg-[var(--color-navy)] hover:text-white rounded-xl flex items-center justify-center transition-all shadow-sm">
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : !isLoading && (
              <tr>
                 <td colSpan={5} className="py-32 text-center">
                    <div className="flex flex-col items-center gap-6 opacity-10">
                       <Fingerprint size={80} className="text-[var(--color-navy)]" />
                       <h3 className="text-2xl font-black uppercase tracking-[0.5em]">Ledger Empty</h3>
                    </div>
                 </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modern Provisioning Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--color-navy)]/90 backdrop-blur-2xl animate-fade-in">
          <div className="w-full max-w-2xl bg-white rounded-[3.5rem] shadow-[0_60px_150px_rgba(0,0,0,0.4)] overflow-hidden border border-white/20 animate-scale-in relative">
            <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-rose-600 via-[var(--color-gold)] to-rose-600"></div>
            
            <div className="p-16">
               <div className="flex items-center justify-between mb-12">
                  <div className="space-y-4">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-[1.5px] bg-rose-600"></div>
                        <span className="text-[11px] font-mono font-black text-rose-600 uppercase tracking-[0.4em]">Administrative Terminal</span>
                     </div>
                     <h3 className="text-4xl font-serif text-[var(--color-navy)] leading-tight font-bold italic">Provision Identity</h3>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-slate-300 hover:bg-rose-50 hover:text-rose-500 transition-all rotate-[-90deg] hover:rotate-0">
                    <X size={32} />
                  </button>
               </div>
               
               <form onSubmit={handleProvision} className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-300 ml-1">Legal Given Name</label>
                    <input 
                      type="text" required 
                      value={newUser.firstName}
                      onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                      placeholder="e.g., Alexander"
                      className="w-full h-16 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-base font-medium outline-none focus:ring-1 focus:ring-[var(--color-gold)] focus:bg-white transition-all shadow-inner" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-300 ml-1">Legal Surname</label>
                    <input 
                      type="text" required 
                      value={newUser.lastName}
                      onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                      placeholder="e.g., Sterling"
                      className="w-full h-16 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-base font-medium outline-none focus:ring-1 focus:ring-[var(--color-gold)] focus:bg-white transition-all shadow-inner" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-300 ml-1">Verified Digital Origin (Email)</label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-[var(--color-gold)] transition-colors" size={20} />
                    <input 
                      type="email" required 
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      placeholder="identity-root@institutional-cluster.edu"
                      className="w-full h-16 bg-slate-50 border border-slate-100 rounded-2xl pl-16 pr-6 text-base font-medium outline-none focus:ring-1 focus:ring-[var(--color-gold)] focus:bg-white transition-all shadow-inner" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-300 ml-1">Cluster Access Tier</label>
                    <div className="relative">
                       <select 
                        value={newUser.role}
                        onChange={(e) => setNewUser({...newUser, role: e.target.value as UserDTO['role']})}
                        className="w-full h-16 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-black uppercase tracking-widest outline-none focus:ring-1 focus:ring-[var(--color-gold)] focus:bg-white transition-all appearance-none cursor-pointer"
                       >
                        <option value="INTERN">Intern Agent</option>
                        <option value="COMPANY_ADMIN">Company Principal</option>
                        <option value="SUPERVISOR">Academic Audit</option>
                        <option value="SCHOOL_ADMIN">Institutional Root</option>
                       </select>
                       <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20"><ArrowUpRight size={20} className="rotate-90" /></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-300 ml-1">Security Hash Pattern</label>
                    <div className="flex gap-3">
                      <input 
                        type="password" required 
                        value={newUser.password || ''}
                        onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                        placeholder="Secure pass-key"
                        className="flex-1 h-16 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-base outline-none focus:ring-1 focus:ring-[var(--color-gold)] focus:bg-white transition-all font-mono" 
                      />
                      <button 
                        type="button"
                        onClick={() => {
                          const pass = Math.random().toString(36).slice(-8) + '@' + Math.floor(100+Math.random()*900) + 'X!';
                          setNewUser({...newUser, password: pass});
                          toast('High-entropy hash generated.', 'success', 'Security');
                        }}
                        className="h-16 px-6 bg-[var(--color-gold-light)]/20 border border-[var(--color-gold-faint)] text-[var(--color-gold)] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--color-gold)] hover:text-white transition-all shadow-lg shadow-[var(--color-gold-light)]/10"
                      >
                        Gen.
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex gap-6">
                  <button 
                    type="submit"
                    className="flex-1 h-16 bg-[var(--color-navy)] text-white rounded-[1.8rem] text-[12px] font-black uppercase tracking-[0.4em] hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(26,48,40,0.3)] flex items-center justify-center gap-4"
                  >
                    Authenticate & Provision <ShieldCheck size={24} className="text-[var(--color-gold)]" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Overlay */}
      {isDeleting && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-red-950/80 backdrop-blur-2xl animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-[3rem] shadow-[0_60px_100px_rgba(220,38,38,0.2)] p-16 border border-red-50 text-center animate-scale-in relative overflow-hidden">
            <div className="w-24 h-24 bg-rose-50 text-rose-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl animate-pulse"><Trash2 size={48} /></div>
            <h3 className="text-4xl font-serif text-[var(--color-navy)] mb-6 font-bold">Terminal <em className="italic text-rose-600">Purge</em>?</h3>
            <p className="text-base text-slate-400 mb-12 px-8 font-medium leading-relaxed italic">Warning: This action will irrevocably decommission the identity from the global register. Protocol sync will cascade to all nodes.</p>
            <div className="flex gap-6">
               <button 
                onClick={() => setIsDeleting(null)}
                className="flex-1 h-16 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:bg-white hover:text-[var(--color-navy)] transition-all"
               >
                 Cancel
               </button>
               <button 
                 onClick={() => handleDelete(isDeleting)}
                 className="flex-1 h-16 bg-rose-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-rose-700 transition-all shadow-2xl shadow-rose-600/30"
               >
                 Purge Root
               </button>
            </div>
            
            <div className="absolute -bottom-10 -right-10 opacity-5">
               <ShieldAlert size={160} className="text-rose-600" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
