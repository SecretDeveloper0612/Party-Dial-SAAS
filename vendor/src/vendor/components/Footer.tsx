import Link from 'next/link';
import Image from 'next/image';
import { Target, MessageSquare, ShieldCheck, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer suppressHydrationWarning className="bg-slate-900 pt-20 pb-10 px-6 text-white text-center">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="PartyDial" 
                width={120} 
                height={40} 
                className="h-8 w-auto object-contain" 
              />
              <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block"></div>
              <span className="text-pd-red text-xs font-black uppercase tracking-widest">Partner</span>
            </div>
            <p className="max-w-[280px] text-slate-400 text-sm font-medium leading-relaxed">
              Empowering venues and event partners with high-quality leads and smart management tools.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-pd-red mb-8">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="/#benefits" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Benefits</Link></li>
              <li><Link href="/how-it-works" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">How it Works</Link></li>
              <li><Link href="/pricing" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Subscription Plans</Link></li>
              <li><Link href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Merchant App</Link></li>
              <li><Link href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Lead Manager</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-pd-red mb-8">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Partner FAQ</Link></li>
              <li><Link href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Community</Link></li>
              <li><Link href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-pd-red mb-8">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">© 2026 PartyDial</p>
            <div className="hidden md:block w-px h-3 bg-white/10"></div>
            <p className="text-[10px] font-black text-pd-red uppercase tracking-[0.2em]">A Platform by Preet Tech OPC PVT. LTD.</p>
            <div className="hidden md:block w-px h-3 bg-white/10"></div>
            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest italic">All billing and operations managed exclusively by Preet Tech</p>
          </div>
          <div className="flex gap-8">
            <Zap size={18} className="text-white/20" />
            <Target size={18} className="text-white/20" />
            <ShieldCheck size={18} className="text-white/20" />
            <MessageSquare size={18} className="text-white/20" />
          </div>
        </div>
      </div>
    </footer>
  );
}
