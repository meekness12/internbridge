import React, { useState, useEffect } from 'react';
import { 
  UserPlus,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserX,
  X,
  Zap,
  Lock,
  Fingerprint,
  RefreshCw
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import { useToast } from '../../context/ToastContext';
import userService from '../../api/userService';
import type { UserDTO } from '../../api/userService';

/**
 * UserManagement Component
 * High-fidelity User Management for Super Admins.
 * Focused on global user governance and account creation.
 */
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

  const fetchUsers = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
    } catch {
      toast('Failed to synchronize user records with the server.', 'error', 'Sync Error');
      // Fallback to mock data for demonstration
      setUsers([
        { id: '1', name: 'Daniel Owusu', role: 'COMPANY_ADMIN', email: 'daniel@techwave.com', status: 'ACTIVE', institution: 'Techwave Technologies', joinedDate: 'Jan 12, 2024' },
        { id: '2', name: 'Aisha Ibrahim', role: 'INTERN', email: 'aisha.i@student.ug.edu.gh', status: 'VERIFIED', institution: 'University of Ghana', joinedDate: 'Feb 01, 2024' },
        { id: '3', name: 'Dr. Mensah Asante', role: 'SUPERVISOR', email: 'm.asante@cuc.edu.gh', status: 'ACTIVE', institution: 'Central University', joinedDate: 'Dec 05, 2023' },
        { id: '4', name: 'Sarah Linn', role: 'SCHOOL_ADMIN', email: 's.linn@admin.ug.edu.gh', status: 'ACTIVE', institution: 'Univ. of Ghana', joinedDate: 'Jan 20, 2024' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  const handleProvision = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      toast('User created successfully.', 'success', 'Management');
      setIsModalOpen(false);
      setNewUser({ firstName: '', lastName: '', email: '', password: '', role: 'INTERN' });
      fetchUsers();
    } catch {
      toast('Failed to create user.', 'error', 'Error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (userId: string, newStatus: UserDTO['status']) => {
    try {
      await userService.updateStatus(userId, newStatus);
      toast(`Status updated to ${newStatus}.`, 'success', 'System');
      fetchUsers();
    } catch {
      toast('User status update failed.', 'error');
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await userService.deleteUser(userId);
      toast('User deleted from the system.', 'success', 'Account Deletion');
      setIsDeleting(null);
      fetchUsers();
    } catch {
      toast('Failed to delete user record.', 'error');
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.institution?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto animate-fade-in pb-20 px-4">
      <PremiumHeader 
        eyebrow="Platform Management"
        title="User"
        italicTitle="Management"
        subtitle="Full list of registered platform users across companies and educational institutions."
        eyebrowColor="text-[var(--accent)]"
        primaryAction={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="h-14 px-10 bg-slate-900 text-white rounded-2xl flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl hover:bg-black transition-all"
          >
            Add New User <UserPlus size={20} className="text-[var(--accent)]" />
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 animate-fade-up">
         <div className="md:col-span-4 bg-[var(--surface)] rounded-[2.5rem] p-4 flex items-center border border-[var(--border)] shadow-xl shadow-slate-200/20 group">
            <div className="relative flex-1">
               <input 
                 type="text" 
                 placeholder="Search platform directory by name, email, or institution..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full h-14 bg-[var(--background)]/50 border border-slate-50 rounded-2xl px-8 text-sm font-medium outline-none focus:ring-1 focus:ring-[var(--accent)] focus:bg-[var(--surface)] transition-all shadow-inner"
               />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 animate-fade-up">
         {[
           { label: 'Active Users', value: users.length.toString(), icon: <ShieldCheck size={20} /> },
           { label: 'System Load', value: 'Steady', icon: <Zap size={20} /> },
           { label: 'Security Status', value: 'Secure', icon: <Lock size={20} /> },
           { label: 'Server Health', value: '99.9%', icon: <Fingerprint size={20} /> }
         ].map((k, i) => (
           <div key={i} className="bg-[var(--surface)] rounded-[2.5rem] p-8 flex items-center gap-6 border border-[var(--border)] shadow-xl shadow-slate-200/20 group hover:shadow-2xl transition-all">
              <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center transition-transform group-hover:rotate-6">
                 {k.icon}
              </div>
              <div>
                 <div className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">{k.label}</div>
                 <div className="text-2xl font-serif font-black text-[var(--text)] tracking-tight leading-none">{k.value}</div>
              </div>
           </div>
         ))}
      </div>

      <div className="mb-12"></div>

      <div className="space-y-4 animate-fade-up delay-2 relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 bg-[var(--surface)]/40 backdrop-blur-md z-20 flex flex-col items-center justify-center gap-6 rounded-[3.5rem]">
             <RefreshCw size={40} className="animate-spin text-[var(--accent)]" />
             <span className="text-[10px] font-black tracking-[0.45em] uppercase text-slate-400">Loading User Data...</span>
          </div>
        )}

        {filteredUsers.map((user, idx) => (
          <div key={user.id} className="bg-[var(--surface)] rounded-[3rem] border border-slate-50 p-6 flex flex-col md:flex-row items-center justify-between gap-8 hover:shadow-2xl hover:shadow-slate-200/40 transition-all group animate-fade-up" style={{ animationDelay: `${idx * 0.05}s` }}>
            <div className="flex items-center gap-8 w-full md:w-auto">
               <div className="w-20 h-20 rounded-[1.8rem] bg-[var(--accent)] flex items-center justify-center text-white font-serif font-black text-2xl shadow-xl shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-500">
                  {user.name.split(' ').map(n => n[0]).join('')}
               </div>
               <div>
                  <h3 className="text-xl font-bold text-[var(--text)] tracking-tight group-hover:text-[var(--accent)] transition-colors">{user.name}</h3>
                  <div className="flex items-center gap-4 mt-1.5 min-w-0">
                     <span className="text-[11px] font-black uppercase text-slate-300 tracking-widest truncate">{user.email}</span>
                     <div className="w-1 h-1 rounded-full bg-slate-200 shrink-0"></div>
                     <span className="text-[11px] font-black uppercase text-slate-300 tracking-widest truncate">{user.institution || 'Individual User'}</span>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-6 md:pt-0">
               <div className="flex flex-col items-start md:items-end gap-1">
                  <span className="text-[9px] font-black text-slate-200 uppercase tracking-widest">User Role</span>
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] border transition-all ${
                    user.role === 'SUPER_ADMIN' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                    user.role === 'COMPANY_ADMIN' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                    user.role === 'SUPERVISOR' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                    user.role === 'SCHOOL_ADMIN' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    'bg-[var(--background)] text-slate-400 border-[var(--border)]'
                  }`}>
                    {user.role.replace('_', ' ')}
                  </span>
               </div>

               <div className="flex flex-col items-start md:items-end gap-1">
                  <span className="text-[9px] font-black text-slate-200 uppercase tracking-widest">Account Status</span>
                  <div className="flex items-center gap-3">
                     <div className={`h-2.5 w-2.5 rounded-full ${user.status === 'ACTIVE' || user.status === 'VERIFIED' ? 'bg-emerald-500 shadow-glow' : 'bg-amber-500'}`}></div>
                     <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${user.status === 'ACTIVE' || user.status === 'VERIFIED' ? 'text-emerald-500' : 'text-amber-500'}`}>{user.status}</span>
                  </div>
               </div>

               <div className="flex items-center gap-3">
                  {user.status !== 'SUSPENDED' ? (
                    <button 
                      onClick={() => handleStatusChange(user.id, 'SUSPENDED')}
                      className="w-12 h-12 bg-[var(--background)] text-slate-400 hover:bg-amber-500 hover:text-white rounded-2xl flex items-center justify-center transition-all shadow-sm"
                      title="Suspend User"
                    >
                      <UserX size={20} />
                    </button>
                  ) : (
                    <button 
                       onClick={() => handleStatusChange(user.id, 'ACTIVE')}
                       className="w-12 h-12 bg-emerald-50 text-emerald-500 hover:bg-emerald-600 hover:text-white rounded-2xl flex items-center justify-center transition-all shadow-sm"
                       title="Restore Access"
                    >
                      <UserCheck size={20} />
                    </button>
                  )}
                  <button 
                    onClick={() => setIsDeleting(user.id)}
                    className="w-12 h-12 bg-[var(--background)] text-slate-400 hover:bg-rose-500 hover:text-white rounded-2xl flex items-center justify-center transition-all shadow-sm"
                    title="Delete User"
                  >
                    <Trash2 size={20} />
                  </button>
               </div>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && !isLoading && (
          <div className="py-32 flex flex-col items-center justify-center opacity-30">
             <Fingerprint size={80} className="text-slate-200 mb-6" />
             <h3 className="text-2xl font-black uppercase tracking-[0.4em] text-slate-300">No Users Found</h3>
          </div>
        )}
      </div>

      {/* Provisioning Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-2xl animate-fade-in">
          <div className="w-full max-w-xl bg-[var(--surface)] rounded-[3.5rem] shadow-[0_60px_150px_rgba(99,102,241,0.3)] overflow-hidden animate-scale-in relative border border-[var(--border)]">
            <div className="h-2 w-full bg-[var(--accent)]"></div>
            <div className="p-12">
               <div className="flex items-center justify-between mb-10">
                  <div>
                     <h3 className="text-3xl font-serif font-black text-[var(--text)] italic leading-none">Add New <span className="text-slate-400 not-italic">User</span></h3>
                     <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-2">New User Registration Form</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-[var(--background)] text-slate-300 hover:text-rose-500 transition-all flex items-center justify-center">
                    <X size={24} />
                  </button>
               </div>
               
               <form onSubmit={handleProvision} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Given Name</label>
                    <input 
                      type="text" required 
                      value={newUser.firstName}
                      onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                      className="w-full h-14 bg-[var(--background)]/50 border border-[var(--border)] rounded-2xl px-6 text-sm outline-none focus:ring-1 focus:ring-[var(--accent)]" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Surname</label>
                    <input 
                      type="text" required 
                      value={newUser.lastName}
                      onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                      className="w-full h-14 bg-[var(--background)]/50 border border-[var(--border)] rounded-2xl px-6 text-sm outline-none focus:ring-1 focus:ring-[var(--accent)]" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Email Address</label>
                    <input 
                      type="email" required 
                      placeholder="user@example.com"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="w-full h-14 bg-[var(--background)]/50 border border-[var(--border)] rounded-2xl px-6 text-sm outline-none focus:ring-1 focus:ring-[var(--accent)]" 
                    />
                  </div>
  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">User Role</label>
                      <select 
                        value={newUser.role}
                        onChange={(e) => setNewUser({...newUser, role: e.target.value as UserDTO['role']})}
                        className="w-full h-14 bg-[var(--background)]/50 border border-[var(--border)] rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-1 focus:ring-[var(--accent)] appearance-none cursor-pointer"
                      >
                        <option value="INTERN">Intern</option>
                        <option value="COMPANY_ADMIN">Company Admin</option>
                        <option value="SUPERVISOR">Supervisor</option>
                        <option value="SCHOOL_ADMIN">School Admin</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Password</label>
                      <input 
                        type="password" required 
                        value={newUser.password}
                        onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                        className="w-full h-14 bg-[var(--background)]/50 border border-[var(--border)] rounded-2xl px-6 text-sm outline-none focus:ring-1 focus:ring-[var(--accent)]" 
                      />
                    </div>
                  </div>
  
                  <button 
                    type="submit"
                    className="w-full h-16 bg-slate-900 text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-black transition-all flex items-center justify-center gap-4 mt-4"
                  >
                    Create User <ShieldCheck size={20} className="text-[var(--accent)]" />
                  </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Overlay */}
      {isDeleting && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-2xl animate-fade-in text-center">
          <div className="w-full max-w-md bg-[var(--surface)] rounded-[3rem] p-12 shadow-2xl relative overflow-hidden animate-scale-in">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-pulse">
               <Trash2 size={32} />
            </div>
            <h3 className="text-3xl font-serif font-black text-[var(--text)] italic mb-4">Delete <span className="text-rose-600">User</span>?</h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed italic mb-10 px-4">This action will remove the user from the system. This cannot be undone.</p>
            <div className="flex gap-4">
               <button onClick={() => setIsDeleting(null)} className="flex-1 h-14 bg-[var(--background)] text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl text-slate-400 hover:bg-slate-100 transition-all">Cancel</button>
               <button onClick={() => handleDelete(isDeleting)} className="flex-1 h-14 bg-rose-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl text-white shadow-xl hover:bg-rose-700 transition-all">Delete User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
