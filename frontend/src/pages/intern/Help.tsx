import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  HelpCircle, 
  Zap, 
  ShieldCheck, 
  ExternalLink,
  Send,
  LifeBuoy,
  FileText,
  Target
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const Help: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    { 
      q: 'How do I synchronize my institutional documents?', 
      a: 'Navigate to the Profile section and click "Institutional Records" to upload or sync your verified credentials directly with the university database.' 
    },
    { 
      q: 'What is the "Finalized Signal" in notifications?', 
      a: 'A Finalized Signal indicating that your dispatch has been encrypted and officially recorded in the institutional ledger. This happens once you acknowledge the alert.' 
    },
    { 
      q: 'Can I apply for multiple placements simultaneously?', 
      a: 'Yes, our terminal supports up to 5 active transmissions. Once a placement is confirmed, other active dispatches will be automatically stabilized.' 
    }
  ];

  return (
    <div className="max-w-[1000px] mx-auto animate-fade-in pb-20 px-4 mt-6">
      
      {/* Search Header */}
      <div className="text-center mb-20">
         <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-[var(--accent)] opacity-30"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--accent)]">Support Terminal</span>
            <div className="h-[1px] w-8 bg-[var(--accent)] opacity-30"></div>
         </div>
         <h1 className="text-6xl font-serif font-bold text-[var(--text)] leading-tight mb-8 italic">Knowledge <span className="font-normal italic text-slate-400">Hub</span></h1>
         
         <div className="max-w-xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[var(--accent)] transition-colors" size={24} />
            <input 
              type="text" 
              placeholder="Search for institutional dispatches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-20 bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] pl-16 pr-8 text-lg font-medium outline-none focus:ring-4 focus:ring-[var(--accent)]/5 focus:border-[var(--accent)] transition-all shadow-2xl shadow-slate-200/40"
            />
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         
         {/* Main FAQ Content */}
         <div className="lg:col-span-2 space-y-12">
            
            <section>
               <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-xl font-heading font-black text-[var(--text)] uppercase tracking-widest">Priority Dispatch</h3>
                  <div className="h-px flex-1 bg-[var(--background)]"></div>
               </div>
               
               <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="bg-[var(--surface)] rounded-[2.5rem] border border-slate-50 p-8 shadow-xl shadow-slate-200/20 hover:shadow-2xl transition-all group">
                       <div className="flex gap-6">
                          <div className="w-12 h-12 rounded-2xl bg-[var(--background)] flex items-center justify-center shrink-0 text-slate-300 group-hover:text-[var(--accent)] transition-colors">
                             <HelpCircle size={24} />
                          </div>
                          <div>
                             <h4 className="text-lg font-bold text-[var(--text)] mb-2 leading-snug">{faq.q}</h4>
                             <p className="text-sm text-[var(--color-muted)] font-medium leading-relaxed">{faq.a}</p>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            <section>
               <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-xl font-heading font-black text-[var(--text)] uppercase tracking-widest">Document Registry</h3>
                  <div className="h-px flex-1 bg-[var(--background)]"></div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Placement Guidelines', icon: <FileText /> },
                    { label: 'Institution Policy', icon: <ShieldCheck /> },
                    { label: 'Tech Documentation', icon: <Zap /> },
                    { label: 'Student Agreement', icon: <BookOpen /> }
                  ].map((doc, i) => (
                    <button key={i} className="flex items-center justify-between p-6 bg-[var(--background)] rounded-[2rem] border border-white hover:bg-[var(--surface)] hover:shadow-xl transition-all group">
                       <div className="flex items-center gap-4">
                          <div className="text-slate-300 group-hover:text-[var(--accent)] transition-colors">
                             {React.cloneElement(doc.icon as React.ReactElement<{ size: number }>, { size: 20 })}
                          </div>
                          <span className="text-xs font-black uppercase tracking-widest text-[var(--color-muted)]">{doc.label}</span>
                       </div>
                       <ExternalLink size={16} className="text-slate-200" />
                    </button>
                  ))}
               </div>
            </section>
         </div>

         {/* Support Signal Sidebox */}
         <div className="space-y-10">
            
            <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="relative z-10">
                  <div className="w-16 h-16 rounded-[2rem] bg-[var(--accent)] flex items-center justify-center mb-8 shadow-xl shadow-teal-500/20 group-hover:scale-110 transition-transform">
                     <LifeBuoy size={32} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold italic mb-4">Direct Signal</h3>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-8 leading-relaxed">Transmit a high-priority support request to our institutional specialists.</p>
                  
                  <div className="space-y-4">
                     <input type="text" placeholder="Subject Dispatch" className="w-full h-12 bg-[var(--surface)]/5 border border-white/10 rounded-2xl px-4 text-xs font-medium outline-none focus:border-[var(--accent)] transition-all" />
                     <textarea placeholder="Elaborate on your signal..." rows={3} className="w-full bg-[var(--surface)]/5 border border-white/10 rounded-2xl p-4 text-xs font-medium outline-none focus:border-[var(--accent)] transition-all resize-none"></textarea>
                     <button onClick={() => toast('Support signal locked and transmitted.', 'success')} className="w-full h-14 bg-[var(--accent)] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl shadow-teal-500/10">
                        Transmit Signal <Send size={16} />
                     </button>
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="bg-[var(--surface)] rounded-[3rem] border border-[var(--border)] p-10 shadow-xl shadow-slate-200/20 text-center">
               <Target size={48} className="mx-auto text-slate-100 mb-6" />
               <h4 className="text-sm font-black uppercase tracking-widest text-[var(--text)] mb-2">Institutional Sync</h4>
               <p className="text-[11px] text-slate-400 font-medium mb-6 leading-relaxed">Average signal response window is approximately 1.4 hours elapsed.</p>
               <button className="text-[11px] font-black uppercase tracking-widest text-[var(--accent)] hover:underline">View System Status</button>
            </div>

         </div>

      </div>
    </div>
  );
};

export default Help;
