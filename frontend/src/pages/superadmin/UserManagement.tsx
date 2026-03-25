import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  UserPlus,
  ShieldCheck,
  ShieldAlert,
  Mail,
  Building
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
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleProvision = async () => {
    toast('Security handshake initiated. Provisioning new administrative identity...', 'success', 'Identity Governance');
    // In real implementation:
    // await userService.provisionUser({ ... });
    // fetchUsers();
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Identity Governance"
        title="User"
        italicTitle="Directory"
        subtitle="Global registry of verified platform participants across all institutional clusters"
        eyebrowColor="text-[var(--color-navy)]"
        primaryAction={
          <button 
            onClick={handleProvision}
            className="h-11 px-6 bg-[var(--color-navy)] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center gap-3 hover:bg-black transition-all shadow-lg shadow-black/10"
          >
            <UserPlus size={18} /> Provision User
          </button>
        }
      />

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-gold)] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email, or protocol ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-5 text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)] transition-all"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none h-11 px-5 flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={16} /> Filters
          </button>
          <button className="flex-1 md:flex-none h-11 px-5 flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
            Export Records
          </button>
        </div>
      </div>

      <div className="card overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
               <div className="w-10 h-10 border-2 border-[var(--color-navy)] border-t-transparent rounded-full animate-spin"></div>
               <span className="label-mono text-[10px] uppercase font-black tracking-widest text-[var(--color-navy)]">Syncing Central Registry...</span>
            </div>
          </div>
        )}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Identity</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Institutional Cluster</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Governance Role</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Protocol Status</th>
              <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Verification Date</th>
              <th className="px-8 py-5 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user) => (
              <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-cream-2)] border border-slate-200 flex items-center justify-center text-[var(--color-navy)] font-bold text-xs group-hover:bg-white group-hover:border-[var(--color-gold)] transition-all">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[var(--color-navy)]">{user.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono font-bold lowercase opacity-60 tracking-tighter flex items-center gap-1">
                        <Mail size={10} /> {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-navy)] opacity-70 uppercase tracking-tighter">
                    <Building size={14} className="text-slate-300" /> {user.institution || 'Individual Agent'}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest border ${
                    user.role === 'SUPER_ADMIN' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                    user.role === 'COMPANY_ADMIN' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                    user.role === 'SUPERVISOR' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                    'bg-slate-50 text-slate-400 border-slate-100'
                  }`}>
                    {user.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    {(user.status === 'VERIFIED' || user.status === 'ACTIVE') ? <ShieldCheck size={14} className="text-emerald-500" /> : <ShieldAlert size={14} className="text-amber-500" />}
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{user.status}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <span className="text-[11px] font-mono font-bold text-slate-300 uppercase">{user.joinedDate}</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="text-slate-300 hover:text-[var(--color-navy)] transition-colors"><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
