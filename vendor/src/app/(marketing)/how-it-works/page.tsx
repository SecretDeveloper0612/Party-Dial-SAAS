'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Zap, 
  MessageSquare,
  TrendingUp,
  ShieldCheck,
  Briefcase,
  Image as ImageIcon,
  Search,
  CheckCircle,
  Calendar,
  Layers,
  Sparkles,
  MousePointer2,
  Clock,
  Phone,
  LayoutDashboard,
  ArrowDownLeft,
  ChevronRight,
  Globe,
  Bell,
  Star,
  Activity
} from 'lucide-react';

const steps = [
  {
    title: "Instant Portal Entry",
    subtitle: "PHASE 01: ONBOARDING",
    description: "Launch your presence in minutes. Our intelligent intake engine captures your venue DNA with minimal effort.",
    icon: <Globe size={24} />,
    color: "#F43F5E",
    bg: "bg-rose-500/10",
    features: ["5-Min Express Setup", "ID Verification", "City-Wide Indexing"],
    stat: "99% Success Rate",
    badge: "Fast Lane"
  },
  {
    title: "Visual Dominance",
    subtitle: "PHASE 02: OPTIMIZATION",
    description: "Our studio-grade profile builder turns your space into a high-conversion digital experience.",
    icon: <ImageIcon size={24} />,
    color: "#3B82F6",
    bg: "bg-blue-500/10",
    features: ["4K Gallery Engine", "Virtual Walkthrough", "Amenity Matrix"],
    stat: "4.8x Higher Clicks",
    badge: "Elite View"
  },
  {
    title: "Lead Distribution",
    subtitle: "PHASE 03: ACTIVATION",
    description: "Real-time, hyper-local leads delivered directly to your device via our proprietary verification grid.",
    icon: <Activity size={24} />,
    color: "#10B981",
    bg: "bg-emerald-500/10",
    features: ["WhatsApp Direct", "Bot-Proof Filtering", "Instant Call-Back"],
    stat: "100% Verified Only",
    badge: "Zero Spam"
  },
  {
    title: "Revenue Command",
    subtitle: "PHASE 04: SCALE",
    description: "Control your entire event ecosystem from a single, unified command center designed for volume.",
    icon: <LayoutDashboard size={24} />,
    color: "#F59E0B",
    bg: "bg-amber-500/10",
    features: ["Intelligent Analytics", "Booking Calendar", "Performance Audit"],
    stat: "+35% ROI Avg.",
    badge: "Scale Up"
  }
];

export default function HowItWorksRedesign() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-white min-h-screen selection:bg-pd-pink selection:text-white overflow-x-hidden">
      
      {/* 1. SUPERIOR HERO SECTION */}
      <section className="relative pt-40 pb-32 lg:pt-56 lg:pb-48 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#F43F5E08,transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,#3B82F608,transparent_40%)]"></div>
        
        {/* Animated Background Mesh */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none -z-10 rotate-3 scale-110 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-100 shadow-sm mb-8">
                  <span className="flex h-2 w-2 rounded-full bg-pd-pink animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">The 2026 Engine</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black text-[#0F172A] leading-[0.85] tracking-tighter mb-8 italic uppercase">
                  Growth <br />
                  <span className="pd-gradient-text not-italic italic">Simplified</span>
                </h1>
                <p className="text-base md:text-xl text-slate-500 font-medium max-w-xl mb-12 leading-relaxed">
                  We&apos;ve engineered the most powerful venue growth platform in India. 
                  Below is the blueprint of how we turn your space into a booking machine.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                   <Link href="/signup" className="pd-btn-primary !px-12 !py-5 shadow-2xl shadow-pd-pink/20 uppercase tracking-widest italic group">
                     List Your Venue <ArrowRight size={18} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                   </Link>
                </div>
              </motion.div>
            </div>

            {/* Floating UI Elements (Hero Visual) */}
            <div className="flex-1 relative w-full max-w-[600px] h-[450px]">
               <motion.div
                 animate={{ y: [0, -20, 0], rotate: [0, 1, 0] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-0 right-0 w-80 h-96 bg-white rounded-[40px] shadow-strong-pd border border-slate-100/50 p-6 z-20"
               >
                 <div className="flex items-center justify-between mb-8">
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-pd-pink"><Bell size={20} /></div>
                    <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-500 text-[9px] font-black uppercase tracking-widest">Live Leads</div>
                 </div>
                 <div className="space-y-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                         <div className="w-8 h-8 rounded-full bg-white text-pd-blue flex items-center justify-center text-[10px] font-bold italic">PD</div>
                         <div className="flex-1">
                            <div className="h-2 w-20 bg-slate-200 rounded-full mb-2"></div>
                            <div className="h-1.5 w-12 bg-slate-100 rounded-full"></div>
                         </div>
                         <Zap size={14} className="text-pd-pink" />
                      </div>
                    ))}
                 </div>
               </motion.div>

               <motion.div
                 animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                 className="absolute bottom-0 left-0 w-64 h-72 bg-pd-pink rounded-[40px] shadow-2xl p-6 z-10 flex flex-col justify-end"
               >
                  <div className="text-white">
                     <div className="text-4xl font-black italic leading-none mb-2">+140%</div>
                     <p className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-80">Revenue Surge</p>
                  </div>
               </motion.div>
               
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pd-blue/5 rounded-full blur-[100px] -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PIPELINE GRID (Refined Bento System) */}
      <section className="py-24 md:py-36 px-6 bg-white relative">
        <div className="max-w-[1440px] mx-auto lg:px-12">
           <div className="text-center mb-24 relative">
              <span className="text-pd-pink text-[11px] font-black uppercase tracking-[0.4em] mb-4 block italic">The Operations Grid</span>
              <h2 className="text-4xl md:text-8xl font-black text-[#0F172A] tracking-tighter leading-[0.8] italic uppercase mb-6">
                Four Phases of <br />
                <span className="pd-gradient-text not-italic font-black italic">Ascension</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pd-pink to-pd-blue mx-auto rounded-full"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  onMouseEnter={() => setActiveStep(i)}
                  className={`relative group p-8 lg:p-10 rounded-[48px] bg-slate-50 border border-slate-100 transition-all duration-700 overflow-hidden cursor-default hover:bg-white hover:shadow-2xl hover:scale-[1.03] flex flex-col h-full`}
                >
                   {/* Massive Background Step Number */}
                   <div className="absolute top-10 right-6 text-9xl font-black text-slate-100/50 group-hover:text-slate-100 transition-colors pointer-events-none select-none italic -z-0">0{i + 1}</div>
                   
                   {/* Background Gradient Accent */}
                   <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-slate-200/20 group-hover:to-white/0 transition-all duration-700"></div>
                   <div className={`absolute -bottom-20 -right-20 w-48 h-48 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700`} style={{ backgroundColor: step.color }}></div>
                   
                   <div className="relative z-10 flex flex-col h-full">
                      <div className={`w-16 h-16 rounded-[22px] ${step.bg} flex items-center justify-center mb-12 transition-all duration-700 group-hover:rotate-[12deg] group-hover:scale-110 shadow-sm group-hover:shadow-lg`} style={{ color: step.color }}>
                        {step.icon}
                      </div>

                      <div className="mb-8 flex-1">
                         <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 mb-2 block uppercase font-mono">{step.subtitle}</span>
                         <h3 className="text-3xl font-black text-[#0F172A] uppercase tracking-tighter italic leading-none mb-6 group-hover:text-pd-pink transition-colors">{step.title}</h3>
                         <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity">{step.description}</p>
                         
                         <ul className="space-y-4">
                            {step.features.map((f, fi) => (
                              <li key={fi} className="flex items-center gap-3 text-[11px] font-bold text-slate-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform duration-500" style={{ transitionDelay: `${fi * 50}ms` }}>
                                 <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.color }}></div>
                                 {f}
                              </li>
                            ))}
                          </ul>
                      </div>

                      <div className="pt-8 border-t border-slate-100/80 flex items-center justify-between mt-auto">
                         <div className="text-lg font-black text-[#0F172A] italic tracking-tight">{step.stat}</div>
                         <div className="px-4 py-1.5 rounded-full bg-slate-100 group-hover:bg-pd-pink text-[9px] font-black text-slate-500 group-hover:text-white uppercase tracking-[0.2em] transition-all duration-500 border border-slate-100 group-hover:border-pd-pink group-hover:shadow-lg group-hover:shadow-pd-pink/20">{step.badge}</div>
                      </div>
                   </div>

                   {/* Subtle border indicator on active */}
                   <motion.div 
                     initial={false}
                     animate={{ opacity: activeStep === i ? 1 : 0 }}
                     className="absolute inset-x-0 top-0 h-1.5 bg-pd-pink z-20"
                   />
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* 3. VERIFICATION ENGINE - DARK INTERACTIVE SECTION */}
      <section className="relative py-28 md:py-48 px-6 bg-[#0B0F19] rounded-[80px] mx-6 mb-32 overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#F43F5E10,transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]"></div>
        
        <div className="max-w-[1440px] mx-auto lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pd-pink/10 border border-pd-pink/20 text-pd-pink text-[10px] font-black uppercase tracking-[0.4em] mb-10 italic">
                 <ShieldCheck size={14} className="animate-pulse" /> Security Protocol
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-10 uppercase italic">
                 Proprietary <br />
                 <span className="pd-gradient-text not-italic">Verification</span> <br />
                 Engine
              </h2>
              <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-lg mb-12">
                 We don&apos;t just deliver inquiries. We deliver intent. Our 24-hour verification grid scrubs every lead for authenticity, budget match, and timing.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                 <div className="p-6 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="text-3xl font-black text-white mb-2 italic">0%</div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Spam Rate</div>
                 </div>
                 <div className="p-6 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="text-3xl font-black text-pd-pink mb-2 italic">100%</div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Genuine Leads</div>
                 </div>
              </div>
           </div>

           <div className="relative">
              {/* SCANNING ANIMATION MOCKUP */}
              <div className="aspect-square relative w-full max-w-[500px] mx-auto rounded-[60px] overflow-hidden border-[12px] border-white/5 bg-slate-900 shadow-2xl">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#3B82F620,transparent_70%)]"></div>
                 
                 {/* Moving Scan Line */}
                 <motion.div
                   animate={{ top: ['0%', '100%'] }}
                   transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                   className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-pd-pink to-transparent shadow-[0_0_20px_rgba(244,63,94,0.8)] z-20"
                 ></motion.div>

                 <div className="p-10 space-y-6 flex flex-col items-center justify-center h-full">
                    {[1,2,3].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.98, 1, 0.98] }}
                        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                        className="w-full h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
                      >
                         <div className="w-4 h-4 rounded-full bg-pd-pink/20 flex items-center justify-center text-pd-pink mr-4">
                            <CheckCircle size={10} />
                         </div>
                         <div className="h-1.5 w-32 bg-white/10 rounded-full"></div>
                      </motion.div>
                    ))}
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-8 flex items-center gap-2">
                       <Activity size={12} className="text-pd-pink" /> Syncing with Lead Node v2.6
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 4. COMPARISON - THE OLD VS NEW WAY */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto lg:px-12">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* The Old Way */}
              <div className="p-12 rounded-[50px] bg-slate-50 border border-slate-100 relative group grayscale hover:grayscale-0 transition-all duration-500">
                 <h4 className="text-2xl font-black text-slate-400 uppercase tracking-tighter mb-10 italic">The Conventional Way</h4>
                 <ul className="space-y-8">
                    {['Relying on foot traffic only', 'Manual booking recording', 'Waiting for passive inquiries', 'Inconsistent lead quality'].map((t, i) => (
                      <li key={i} className="flex items-start gap-4 text-slate-400 font-bold uppercase text-xs tracking-widest">
                         <div className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center mt-[-2px]">×</div>
                         {t}
                      </li>
                    ))}
                 </ul>
              </div>

              {/* The PartyDial Way */}
              <div className="p-12 rounded-[50px] bg-slate-900 text-white relative group overflow-hidden shadow-2xl shadow-pd-blue/30">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-pd-blue blur-[60px] opacity-20"></div>
                 <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-10 italic">The PartyDial Way</h4>
                 <ul className="space-y-8">
                    {['Instant global discovery', 'Automated revenue alerts', 'Verified high-intent leads', 'Full-suite management OS'].map((t, i) => (
                      <li key={i} className="flex items-start gap-4 text-white font-bold uppercase text-xs tracking-widest">
                         <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center mt-[-2px] text-white">✓</div>
                         {t}
                      </li>
                    ))}
                 </ul>
                 <Link href="/signup" className="mt-12 inline-block px-8 py-4 bg-white text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-pd-pink hover:text-white transition-all italic">
                    Upgrade Your Venue
                 </Link>
              </div>
           </div>
        </div>
      </section>

      {/* 5. ELITE FOOTER CTA */}
      <section className="py-32 relative text-center">
         <div className="max-w-4xl mx-auto px-6">
            <Sparkles className="text-pd-pink mx-auto mb-8 w-12 h-12" />
            <h2 className="text-4xl md:text-8xl font-black text-[#0F172A] tracking-tighter leading-none italic uppercase mb-10">
               Your Future <br />
               <span className="pd-gradient-text not-italic italic underline decoration-slate-100 underline-offset-8">Starts Now</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
               <Link href="/signup" className="pd-btn-primary !px-16 !py-6 text-sm uppercase tracking-[0.2em] italic shadow-strong-pd">
                 Initialize Onboarding
               </Link>
               <Link href="/pricing" className="px-12 py-6 bg-slate-50 border border-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:shadow-xl transition-all">
                 Review Capital
               </Link>
            </div>
            
            <div className="mt-20 flex justify-center items-center gap-12">
               <div className="text-center">
                  <div className="text-2xl font-black text-slate-900 italic leading-none mb-1">500+</div>
                  <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Partner Venues</div>
               </div>
               <div className="h-8 w-px bg-slate-200"></div>
               <div className="text-center">
                  <div className="text-2xl font-black text-slate-900 italic leading-none mb-1">1M+</div>
                  <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Leads Generated</div>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}
