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
  X
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
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Identity Governance"
        title="User"
        italicTitle="Directory"
        subtitle="Global registry of verified platform participants across all institutional clusters"
        eyebrowColor="text-[var(--color-navy)]"
        primaryAction={
          <button 
            onClick={() => setIsModalOpen(true)}
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
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Governance Role</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Protocol Status</th>
              <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Verification Date</th>
              <th className="px-8 py-5 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredUsers.map((user) => (
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
                  <span className={`text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest border ${
                    user.role === 'SUPER_ADMIN' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                    user.role === 'COMPANY_ADMIN' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                    user.role === 'SUPERVISOR' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                    user.role === 'SCHOOL_ADMIN' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    'bg-slate-50 text-slate-400 border-slate-100'
                  }`}>
                    {user.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <span className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                      user.status === 'ACTIVE' || user.status === 'VERIFIED' ? 'text-emerald-600' : 
                      user.status === 'SUSPENDED' ? 'text-amber-600' : 'text-slate-400'
                    }`}>
                      {user.status === 'ACTIVE' || user.status === 'VERIFIED' ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                      {user.status}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <span className="text-[11px] font-mono font-bold text-slate-300 uppercase">{user.joinedDate}</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    {user.status !== 'SUSPENDED' ? (
                      <button 
                        onClick={() => handleStatusChange(user.id, 'SUSPENDED')}
                        className="p-2 text-amber-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg" 
                        title="Suspend Identity"
                      >
                        <UserX size={16} />
                      </button>
                    ) : (
                      <button 
                         onClick={() => handleStatusChange(user.id, 'ACTIVE')}
                         className="p-2 text-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg" 
                         title="Activate Identity"
                      >
                        <UserCheck size={16} />
                      </button>
                    )}
                    <button 
                      onClick={() => setIsDeleting(user.id)}
                      className="p-2 text-rose-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg" 
                      title="Purge Identity"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button className="p-2 text-slate-300 hover:text-[var(--color-navy)] hover:bg-slate-100 rounded-lg"><MoreVertical size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Provision Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20 animate-slide-up">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-[var(--color-navy)] text-white rounded-2xl flex items-center justify-center shadow-lg"><UserPlus size={24} /></div>
                 <div>
                    <h3 className="text-xl font-serif text-[var(--color-navy)]">Provision <em className="italic">Identity</em></h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Governance Protocol</p>
                 </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-300 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleProvision} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">First Name</label>
                  <input 
                    type="text" required 
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                    placeholder="Enter first name"
                    className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-5 text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)]" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Last Name</label>
                  <input 
                    type="text" required 
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                    placeholder="Enter last name"
                    className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-5 text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)]" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Secure Email Identity</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input 
                    type="email" required 
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    placeholder="identity@domain.com"
                    className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-5 text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)]" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Governance Role</label>
                <select 
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value as UserDTO['role']})}
                  className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)] appearance-none"
                >
                  <option value="INTERN">Intern Agent</option>
                  <option value="COMPANY_ADMIN">Company Administrator</option>
                  <option value="SUPERVISOR">Academic Supervisor</option>
                  <option value="SCHOOL_ADMIN">Institutional Lead</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Secure Password Protocol</label>
                <div className="flex gap-2">
                  <input 
                    type="text" required 
                    value={newUser.password || ''}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    placeholder="Enter secure password"
                    className="flex-1 h-12 bg-slate-50 border border-slate-100 rounded-xl px-5 text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)] font-mono" 
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      const pass = Math.random().toString(36).slice(-8) + '!' + Math.floor(Math.random()*100);
                      setNewUser({...newUser, password: pass});
                      toast('Secure hash generated locally.', 'success', 'Security');
                    }}
                    className="h-12 px-4 bg-slate-100 text-slate-500 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-all shadow-sm"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 h-12 border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all font-mono"
                >
                  ABORT
                </button>
                <button 
                  type="submit"
                  className="flex-[2] h-12 bg-[var(--color-navy)] text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3"
                >
                  <ShieldCheck size={18} /> INITIATE PROVISIONING
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {isDeleting && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-red-950/20 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 border border-red-100 text-center animate-bounce-in">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm"><Trash2 size={32} /></div>
            <h3 className="text-xl font-serif text-[var(--color-navy)] mb-2">Purge <em className="italic text-red-600">Identity</em>?</h3>
            <p className="text-xs text-slate-400 mb-8 px-4 font-medium leading-relaxed">Warning: This action will irrevocably remove the identity from the platform registry. All access tokens will be invalidated immediately.</p>
            <div className="flex gap-3">
               <button 
                onClick={() => setIsDeleting(null)}
                className="flex-1 h-11 border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all"
               >
                 Cancel
               </button>
               <button 
                 onClick={() => handleDelete(isDeleting)}
                 className="flex-1 h-11 bg-red-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-200"
               >
                 Purge
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
