'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, ShieldCheck, Zap, ArrowRight, CheckCircle2, 
  MessageSquare, Smartphone, Globe, Target, PhoneCall,
  LayoutDashboard, Share2, Shield, Check, Clock
} from 'lucide-react';

export default function ProcessPage() {
  return (
    <div suppressHydrationWarning className="bg-white min-h-screen">
      
      {/* 1. HERO - THE ENGINE */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900 border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-pd-pink text-[10px] font-black uppercase tracking-[0.4em] mb-8"
          >
            <Zap size={12} className="fill-pd-pink/10" /> Transparent Acquisition v4
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black text-white italic uppercase leading-none mb-8"
          >
            How we drive <br />
            <span className="pd-gradient-text not-italic">Hyper-Growth.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-400 text-lg font-medium leading-relaxed"
          >
            From the moment we spend on ads to the second you receive a high-intent call—explore the tech stack that powers India's elite venues.
          </motion.p>
        </div>
        
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pd-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pd-pink/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-20"></div>
      </section>

      {/* 2. THE THREE PILLAR CYCLE */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1440px] mx-auto lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              { 
                title: "Inbound Capture",
                subtitle: "Omnichannel Ads",
                platforms: [
                  { n: "Google Search", icon: <Search size={14} />, c: "from-blue-500 to-green-500" },
                  { n: "Meta / Instagram", icon: <Share2 size={14} />, c: "from-purple-500 to-pink-500" },
                  { n: "Local SEO", icon: <Globe size={14} />, c: "from-sky-500 to-indigo-500" }
                ],
                desc: "We deploy aggressive quarterly budgets into Google Ads and Meta platforms to drive thousands of monthly visitors specifically looking for venues in your region."
              },
              { 
                title: "Quality Verification",
                subtitle: "Zero-Bypass Filtering",
                platforms: [
                  { n: "Mobile OTP", icon: <Smartphone size={14} />, c: "from-emerald-500 to-teal-500" },
                  { n: "Intent Analysis", icon: <Target size={14} />, c: "from-rose-500 to-orange-500" },
                  { n: "Budget Check", icon: <CheckCircle2 size={14} />, c: "from-amber-500 to-yellow-500" }
                ],
                desc: "Every enquiry is pre-qualified. Our system verifies the customer’s WhatsApp number and ensures their budget and event-type match your venue profile."
              },
              { 
                title: "Direct Routing",
                subtitle: "Priority Delivery",
                platforms: [
                  { n: "Real-time WhatsApp", icon: <MessageSquare size={14} />, c: "from-green-500 to-emerald-500" },
                  { n: "Exclusive Calls", icon: <PhoneCall size={14} />, c: "from-blue-600 to-sky-400" },
                  { n: "Partner Dashboard", icon: <LayoutDashboard size={14} />, c: "from-slate-700 to-slate-900" }
                ],
                desc: "Speed to lead is king. We route enquiries directly to your WhatsApp in < 2 seconds, ensuring you are the first one the customer speaks to."
              }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col"
              >
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4 italic">Stage 0{i+1}</div>
                <h3 className="text-2xl font-black text-[#0F172A] uppercase italic mb-1">{pillar.title}</h3>
                <p className="text-[10px] font-bold text-pd-pink uppercase tracking-widest mb-8">{pillar.subtitle}</p>
                
                <div className="space-y-4 mb-10">
                   {pillar.platforms.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all">
                         <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${p.c} text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
                            {p.icon}
                         </div>
                         <span className="text-[11px] font-black uppercase text-slate-600 tracking-wider font-sans">{p.n}</span>
                      </div>
                   ))}
                </div>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DIGITAL HQ DEEP DIVE */}
      <section className="py-24 md:py-32 bg-slate-50 border-y border-slate-100 px-6">
        <div className="max-w-[1440px] mx-auto lg:px-12 lg:grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] uppercase italic mb-8">
              Your <span className="pd-gradient-text not-italic">Digital HQ.</span>
            </h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10">
              Unlike generic listing sites, each PartyDial partner gets a dedicated professional microsite. 
              This isn't just a profile—it's a high-conversion landing page optimized for mobile booking.
            </p>
            
            <div className="space-y-6">
               {[
                 { t: "Exclusive Call Line", d: "Calls from your page go directly to you. We never rotate your leads to competitors." },
                 { t: "Verified Review Engine", d: "Build trust with authentic customer reviews managed directly from your dashboard." },
                 { t: "SEO Booster", d: "Your microsite is indexed by Google, giving you organic visibility beyond our platform." }
               ].map((item, i) => (
                 <div key={i} className="flex gap-4">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-pd-pink/10 text-pd-pink flex items-center justify-center">
                       <CheckCircle2 size={14} />
                    </div>
                    <div>
                       <h4 className="text-sm font-black uppercase italic text-slate-900 mb-1">{item.t}</h4>
                       <p className="text-sm text-slate-500 font-medium">{item.d}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="mt-16 lg:mt-0 relative">
             <div className="aspect-[4/3] bg-white rounded-[40px] shadow-2xl border border-slate-200 p-8 overflow-hidden">
                <div className="flex items-center gap-2 mb-8">
                   <div className="w-3 h-3 rounded-full bg-red-400"></div>
                   <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                   <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="space-y-4">
                   <div className="h-8 w-1/3 bg-slate-100 rounded-lg"></div>
                   <div className="h-40 w-full bg-slate-50 rounded-2xl"></div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-slate-50 rounded-2xl"></div>
                      <div className="h-24 bg-slate-50 rounded-2xl"></div>
                   </div>
                </div>
             </div>
             {/* Floating Mobile Badge */}
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute -bottom-8 -right-8 w-64 bg-slate-900 text-white p-6 rounded-3xl shadow-2xl border border-white/10"
             >
                <div className="flex items-center gap-3 mb-2">
                   <PhoneCall size={16} className="text-emerald-400" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Live Direct Line</span>
                </div>
                <p className="text-xs text-slate-400 font-bold">1:1 Distribution Active</p>
             </motion.div>
          </div>
        </div>
      </section>

      {/* 4. COMPARISON CHART - CLEAN PREMIUM VERSION */}
      <section className="py-24 md:py-32 px-6 bg-slate-900 relative">
         <div className="max-w-[1280px] mx-auto relative z-10">
            <div className="text-center mb-24">
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pd-pink/10 border border-pd-pink/20 text-pd-pink text-[9px] font-black uppercase tracking-[0.4em] mb-8"
               >
                 Growth Standard v4.0
               </motion.div>
               <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic mb-6">
                  Superior <span className="pd-gradient-text not-italic">Acquisition.</span>
               </h2>
               <p className="text-slate-400 font-medium max-w-2xl mx-auto">
                  A side-by-side comparison of why the high-growth venues choose us.
               </p>
            </div>

            {/* CHART GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 rounded-[32px] md:rounded-[48px] overflow-hidden bg-white/[0.02] backdrop-blur-3xl shadow-4xl">
               
               {/* FEATURE HEADER */}
               <div className="hidden md:flex flex-col bg-white/5 border-r border-white/5">
                  <div className="h-32 p-10 flex items-center border-b border-white/5">
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Platform Feature</span>
                  </div>
                  {[
                     { label: "Lead Ownership", icon: <Smartphone size={16} /> },
                     { label: "Verification Level", icon: <ShieldCheck size={16} /> },
                     { label: "Distribution Logic", icon: <Zap size={16} /> },
                     { label: "Branding Depth", icon: <Globe size={14} /> },
                     { label: "Response Speed", icon: <Clock size={16} /> }
                  ].map((f, i) => (
                     <div key={i} className="flex-1 p-10 border-b border-white/5 flex items-center gap-4">
                        <div className="text-pd-pink/40">{f.icon}</div>
                        <span className="text-xs font-black text-slate-200 uppercase italic tracking-wider">{f.label}</span>
                     </div>
                  ))}
               </div>

               {/* OTHERS COLUMN */}
               <div className="flex flex-col border-r border-white/5 opacity-50">
                  <div className="h-32 p-10 flex flex-col justify-center items-center border-b border-white/5 text-center bg-slate-950/40">
                     <span className="text-[9px] font-black text-slate-600 uppercase mb-2">Standard</span>
                     <span className="text-xl font-black text-slate-500 uppercase italic">Others</span>
                  </div>
                  {[
                     "Shared with ~5 others",
                     "Email Only (Unverified)",
                     "Rotating / Scheduled",
                     "Generic Marketplace Profile",
                     "Delayed (30-60 mins)"
                  ].map((v, i) => (
                     <div key={i} className="flex-1 p-10 border-b border-white/5 flex flex-col items-center justify-center text-center">
                        <span className="md:hidden text-[9px] font-black text-slate-500 uppercase mb-4 opacity-50 text-white/40">
                           {["Ownership", "Verification", "Logic", "Branding", "Speed"][i]}
                        </span>
                        <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center mb-4 text-white/40">
                           <Shield size={10} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase">{v}</span>
                     </div>
                  ))}
               </div>

               {/* PARTYDIAL COLUMN (US) */}
               <div className="flex flex-col bg-gradient-to-b from-pd-pink/10 to-transparent border-t-4 md:border-t-0 md:border-l-4 border-pd-pink relative">
                  {/* Glowing Highlight */}
                  <div className="absolute inset-x-0 top-0 h-32 bg-pd-pink/20 blur-[100px] pointer-events-none"></div>
                  
                  <div className="h-32 p-10 flex flex-col justify-center items-center border-b border-white/10 text-center relative z-10 bg-pd-pink/5">
                     <div className="absolute -top-4 px-4 py-1.5 bg-pd-pink text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl">
                        Recommended Track
                     </div>
                      <div className="flex items-center justify-center h-10 w-full px-4">
                         <span className="pd-logo-white text-2xl">PartyDial</span>
                      </div>
                  </div>
                  {[
                     "100% Exclusive (1:1)",
                     "Dual-Layer (OTP + Intent)",
                     "Priority Instant Routing",
                     "Dedicated Digital HQ",
                     "Real-time (< 2 Seconds)"
                  ].map((v, i) => (
                     <div key={i} className="flex-1 p-10 border-b border-white/10 flex flex-col items-center justify-center text-center relative z-10">
                        <span className="md:hidden text-[9px] font-black text-pd-pink uppercase mb-4 opacity-50 tracking-widest leading-relaxed">
                           {["Ownership", "Verification", "Logic", "Branding", "Speed"][i]}
                        </span>
                        <motion.div 
                           whileHover={{ scale: 1.2 }}
                           className="w-8 h-8 rounded-full bg-pd-pink text-white flex items-center justify-center mb-4 shadow-xl shadow-pd-pink/30"
                        >
                           <Check size={14} strokeWidth={4} />
                        </motion.div>
                        <span className="text-[13px] font-black text-white leading-relaxed italic uppercase">{v}</span>
                     </div>
                  ))}
               </div>

            </div>
         </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-24 md:py-32 px-6 text-center">
         <div className="max-w-[1440px] mx-auto lg:px-12">
            <h3 className="text-3xl md:text-5xl font-black text-[#0F172A] uppercase italic mb-12">
               Ready to <span className="pd-gradient-text not-italic">Scale?</span>
            </h3>
            <div className="flex flex-wrap gap-8 justify-center items-center">
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 className="px-12 py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] italic shadow-2xl"
               >
                 Sign Up Now
               </motion.button>
               <span className="text-slate-400 font-black text-[10px] uppercase">or</span>
               <button className="text-pd-pink font-black text-[10px] uppercase tracking-widest hover:underline">Talk to Growth Expert</button>
            </div>
         </div>
      </section>

    </div>
  );
}
