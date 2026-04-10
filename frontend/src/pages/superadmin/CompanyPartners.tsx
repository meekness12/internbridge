import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  ArrowUpRight,
  MapPin,
  Globe,
  FileCheck,
  RefreshCw,
  Building2,
  Filter,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  X,
  ShieldCheck
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import systemService from '../../api/systemService';
import userService from '../../api/userService';
import type { CompanyDTO } from '../../api/systemService';
import { useToast } from '../../context/ToastContext';

/**
 * CompanyPartners Component
 * High-fidelity Company Partners for Super Admins.
 * Focused on partner management and institutional growth.
 */
const CompanyPartners: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState<CompanyDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPartner, setNewPartner] = useState({
    companyName: '',
    industry: '',
    adminFirstName: '',
    adminLastName: '',
    email: '',
    password: ''
  });

  const fetchCompanies = async () => {
    try {
      setIsLoading(true);
      const data = await systemService.getCompanies();
      setCompanies(data);
    } catch (error) {
      toast('Failed to synchronize partner directory.', 'error', 'Error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [toast]);

  const handleProvision = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      // Use the generic userService.provisionUser but mapping company-specific fields
      await userService.provisionUser({
        firstName: newPartner.adminFirstName,
        lastName: newPartner.adminLastName,
        email: newPartner.email,
        password: newPartner.password,
        role: 'COMPANY_ADMIN',
        institution: newPartner.companyName,
        // @ts-ignore - added industry to DTO in backend, but frontend type might need update
        industry: newPartner.industry 
      });

      toast(`${newPartner.companyName} has been provisioned as a corporate partner.`, 'success', 'Onboarding Complete');
      setIsModalOpen(false);
      setNewPartner({ companyName: '', industry: '', adminFirstName: '', adminLastName: '', email: '', password: '' });
      fetchCompanies();
    } catch (error) {
      toast('Failed to provision new partner identity.', 'error', 'Provisioning Failed');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="max-w-[1400px] mx-auto animate-fade-in pb-20 px-4">
      <PremiumHeader 
        eyebrow="Corporate Alliances"
        title="Partner"
        italicTitle="Network"
        subtitle="Global oversight of verified industry partners, corporate residency benchmarks, and institutional expansion."
        eyebrowColor="text-[var(--color-teal)]"
        primaryAction={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="h-14 px-10 bg-slate-900 text-white rounded-2xl flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl hover:bg-black transition-all"
          >
            Add Partner <Plus size={20} className="text-[var(--color-teal)]" />
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 animate-fade-up">
         {[
           { label: 'Active Partners', value: companies.length.toString(), icon: <Building2 size={24} /> },
           { label: 'Growth Rate', value: '+12.4%', icon: <TrendingUp size={24} /> },
           { label: 'Placement Rate', value: '94.2%', icon: <Briefcase size={24} /> },
           { label: 'Partner Score', value: 'Optimal', icon: <CheckCircle2 size={24} /> }
         ].map((k, i) => (
           <div key={i} className="bg-white border border-slate-50 p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/20 flex flex-col group hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-slate-50 text-[var(--color-teal)] rounded-2xl flex items-center justify-center mb-10 shadow-inner group-hover:rotate-6 transition-transform">
                 {k.icon}
              </div>
              <div>
                 <div className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2">{k.label}</div>
                 <div className="text-4xl font-serif font-black text-slate-900 tracking-tight leading-none">{k.value}</div>
              </div>
           </div>
         ))}
      </div>

      <div className="mb-12"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 min-h-[400px] animate-fade-up delay-2">
        {isLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-40 gap-6 opacity-30">
             <RefreshCw size={50} className="text-[var(--color-teal)] animate-spin" />
             <span className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">Loading Partners...</span>
          </div>
        ) : (
          (companies.length > 0 ? companies : [
            { id: '1', name: 'Techwave Technologies', industry: 'Software Engineering', location: 'Accra, GH', status: 'VERIFIED', rating: '4.9', interns: 12 },
            { id: '2', name: 'Global Finance Corp', industry: 'Financial Services', location: 'London, UK', status: 'VERIFIED', rating: '4.7', interns: 8 },
            { id: '3', name: 'EcoPower Systems', industry: 'Sustainable Energy', location: 'Berlin, DE', status: 'PENDING', rating: '4.5', interns: 4 },
          ]).filter(c => 
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            c.industry.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((company, idx) => (
            <div key={company.id} className="bg-white rounded-[3.5rem] border border-slate-50 p-10 hover:shadow-2xl hover:shadow-slate-200/30 transition-all group relative overflow-hidden flex flex-col justify-between animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div className="w-20 h-20 bg-slate-50 rounded-[1.8rem] flex items-center justify-center text-slate-900 font-serif font-black text-3xl border border-slate-100 group-hover:bg-slate-900 group-hover:text-[var(--color-teal)] transition-all duration-500 shadow-inner overflow-hidden">
                    {company.logo || company.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] border transition-all ${
                    company.status === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.1)]' :
                    company.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                    'bg-rose-50 text-rose-600 border-rose-100'
                  }`}>
                    {company.status}
                  </span>
                </div>

                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-[var(--color-teal)] transition-all duration-500 flex items-center gap-4">
                    {company.name}
                    {company.status === 'VERIFIED' && <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"><FileCheck size={12} className="text-white" /></div>}
                  </h3>
                  <div className="flex items-center gap-2 mb-8">
                     <span className="text-[10px] font-mono font-black text-slate-300 uppercase tracking-widest">{company.industry}</span>
                     <div className="w-1 h-1 rounded-full bg-slate-100"></div>
                     <span className="text-[10px] font-mono font-black text-slate-200 uppercase tracking-tighter">PR-ID-{idx + 10}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-50">
                       <MapPin size={18} className="text-[var(--color-teal)] opacity-30" /> 
                       <span className="text-xs font-bold text-slate-500">{company.location}</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-50">
                       <Globe size={18} className="text-[var(--color-teal)] opacity-30" /> 
                       <span className="text-xs font-bold text-slate-500 truncate">{company.website || `www.${company.name.toLowerCase().split(' ')[0]}.com`}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                <div className="flex gap-12">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black text-slate-200 uppercase tracking-widest">Active Interns</span>
                    <span className="text-2xl font-serif font-black text-slate-900 italic tracking-tighter">{company.interns || 0}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black text-slate-200 uppercase tracking-widest">Growth Index</span>
                    <span className="text-2xl font-serif font-black text-slate-900 italic tracking-tighter">{company.rating || '4.0'}</span>
                  </div>
                </div>
                <button className="h-14 w-14 rounded-2xl bg-slate-950 text-[var(--color-teal)] flex items-center justify-center group-hover:scale-110 transition-all shadow-xl shadow-black/10">
                  <ArrowUpRight size={24} />
                </button>
              </div>
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-teal)]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))
        )}

        {!isLoading && companies.length === 0 && (
          <div className="col-span-full py-32 flex flex-col items-center justify-center opacity-30">
             <Building2 size={80} className="text-slate-200 mb-6" />
             <h3 className="text-2xl font-black uppercase tracking-[0.4em] text-slate-300">No Partners Found</h3>
          </div>
        )}
      </div>

      {/* Add Partner Provisioning Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-2xl animate-fade-in">
          <div className="bg-white rounded-[3.5rem] w-full max-w-2xl overflow-hidden shadow-[0_60px_150px_rgba(13,148,136,0.3)] animate-scale-in relative border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="absolute top-0 left-0 w-full h-[6px] bg-[var(--color-teal)]"></div>
            
            <div className="p-16">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h3 className="text-3xl font-serif font-black text-slate-900 italic leading-none">Partner <span className="text-slate-400 not-italic">Onboarding</span></h3>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-2">Provision New Corporate Identity</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 hover:bg-rose-50 hover:text-rose-600 transition-all">
                  <X size={28} />
                </button>
              </div>

              <form onSubmit={handleProvision} className="space-y-8">
                {/* Section 1: Organization Data */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-slate-50"></div>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-200">Organization profile</span>
                    <div className="h-px flex-1 bg-slate-50"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Company Name</label>
                      <input 
                        required type="text" 
                        value={newPartner.companyName}
                        onChange={(e) => setNewPartner({...newPartner, companyName: e.target.value})}
                        placeholder="e.g. Global Tech Solutions"
                        className="w-full h-16 bg-slate-50/50 border border-slate-100 rounded-2xl px-6 text-sm font-medium outline-none focus:ring-1 focus:ring-[var(--color-teal)] focus:bg-white transition-all shadow-inner" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Industry / Sector</label>
                      <input 
                        required type="text" 
                        value={newPartner.industry}
                        onChange={(e) => setNewPartner({...newPartner, industry: e.target.value})}
                        placeholder="e.g. Fintech, Logistics..."
                        className="w-full h-16 bg-slate-50/50 border border-slate-100 rounded-2xl px-6 text-sm font-medium outline-none focus:ring-1 focus:ring-[var(--color-teal)] focus:bg-white transition-all shadow-inner" 
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Administrative Identity */}
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-slate-50"></div>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-200">Admin credentials</span>
                    <div className="h-px flex-1 bg-slate-50"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Admin First Name</label>
                      <input 
                        required type="text" 
                        value={newPartner.adminFirstName}
                        onChange={(e) => setNewPartner({...newPartner, adminFirstName: e.target.value})}
                        className="w-full h-16 bg-slate-50/50 border border-slate-100 rounded-2xl px-6 text-sm font-medium outline-none focus:ring-1 focus:ring-[var(--color-teal)] focus:bg-white transition-all shadow-inner" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Admin Last Name</label>
                      <input 
                        required type="text" 
                        value={newPartner.adminLastName}
                        onChange={(e) => setNewPartner({...newPartner, adminLastName: e.target.value})}
                        className="w-full h-16 bg-slate-50/50 border border-slate-100 rounded-2xl px-6 text-sm font-medium outline-none focus:ring-1 focus:ring-[var(--color-teal)] focus:bg-white transition-all shadow-inner" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Work Email</label>
                      <input 
                        required type="email" 
                        value={newPartner.email}
                        onChange={(e) => setNewPartner({...newPartner, email: e.target.value})}
                        placeholder="admin@company.com"
                        className="w-full h-16 bg-slate-50/50 border border-slate-100 rounded-2xl px-6 text-sm font-medium outline-none focus:ring-1 focus:ring-[var(--color-teal)] focus:bg-white transition-all shadow-inner" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Secure Password</label>
                      <input 
                        required type="password" 
                        value={newPartner.password}
                        onChange={(e) => setNewPartner({...newPartner, password: e.target.value})}
                        className="w-full h-16 bg-slate-50/50 border border-slate-100 rounded-2xl px-6 text-sm font-medium outline-none focus:ring-1 focus:ring-[var(--color-teal)] focus:bg-white transition-all shadow-inner" 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full h-20 bg-slate-900 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.45em] shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                  >
                    {isLoading ? <RefreshCw className="animate-spin text-[var(--color-teal)]" size={24} /> : <ShieldCheck size={24} className="text-[var(--color-teal)]" />}
                    {isLoading ? 'Processing Provisioning...' : 'Provision Partner'}
                  </button>
                  <p className="text-center mt-6 text-[9px] font-black text-slate-200 uppercase tracking-widest">
                    Authorized Super Admin Action Only
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyPartners;
