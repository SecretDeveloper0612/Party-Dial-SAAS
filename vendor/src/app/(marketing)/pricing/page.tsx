'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  ChevronDown, 
  HelpCircle, 
  Zap, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Building2, 
  BarChart3, 
  MessageSquare,
  ArrowRight,
  Star,
  Plus
} from 'lucide-react';

// --- STYLES ---

const gradientStyle = "bg-gradient-to-r from-red-500 via-pink-500 via-purple-500 to-blue-500";
const textGradientStyle = "bg-gradient-to-r from-red-500 via-pink-500 via-purple-500 to-blue-500 bg-clip-text text-fill-transparent text-transparent";

// --- DATA ---

const pricingPlans = [
  {
    id: 1,
    name: "0–50 PAX",
    mrp: 15000,
    price: 12000,
    leads: "20–30 verified leads/month",
    features: ["Basic visibility", "Standard listing", "Lead notifications", "Email support"],
    popular: false,
    cta: "Get Started"
  },
  {
    id: 2,
    name: "50–100 PAX",
    mrp: 20000,
    price: 16000,
    leads: "30–50 verified leads/month",
    features: ["Improved visibility", "WhatsApp alerts", "Standard placement", "Basic analytics"],
    popular: false,
    cta: "Get Started"
  },
  {
    id: 3,
    name: "100–200 PAX",
    mrp: 35000,
    price: 28000,
    leads: "60–90 verified leads/month",
    features: ["Priority listing", "WhatsApp notifications", "Lead insights dashboard", "Faster lead delivery"],
    popular: true,
    cta: "Get Started"
  },
  {
    id: 4,
    name: "200–500 PAX",
    mrp: 57000,
    price: 45000,
    leads: "100–140 verified leads/month",
    features: ["Featured placement", "Priority visibility", "Lead filtering", "Priority support"],
    popular: false,
    cta: "Get Started"
  },
  {
    id: 5,
    name: "500–1000 PAX",
    mrp: 80000,
    price: 65000,
    leads: "150–220 verified leads/month",
    features: ["Premium placement", "High visibility", "Faster response routing", "Support assistance"],
    popular: false,
    cta: "Get Started"
  },
  {
    id: 6,
    name: "1000–2000 PAX",
    mrp: 110000,
    price: 90000,
    leads: "220–300 verified leads/month",
    features: ["Top city visibility", "Premium ranking", "Lead analytics", "Priority handling"],
    popular: false,
    cta: "Get Started"
  },
  {
    id: 7,
    name: "2000–5000 PAX",
    mrp: 180000,
    price: 140000,
    leads: "300–450 verified leads/month",
    features: ["High priority ranking", "Dedicated support", "Advanced analytics", "Premium distribution"],
    popular: false,
    cta: "Get Started"
  },
  {
    id: 8,
    name: "5000+ PAX (ENTERPRISE)",
    mrp: 300000,
    price: 220000,
    leads: "500+ verified leads/month",
    features: ["Exclusive leads", "Dedicated account manager", "Custom promotions", "Highest visibility"],
    popular: false,
    cta: "Contact Sales"
  }
];

const faqs = [
  { question: "How are leads generated?", answer: "Leads are generated through our targeted marketing funnel and venue discovery platform where active customers search for event spaces." },
  { question: "Are leads verified?", answer: "Yes, every lead is pre-qualified with contact verification and event intent check before reaching your dashboard." },
  { question: "Can I upgrade anytime?", answer: "Absolutely. You can upgrade your capacity plan at any time through your partner portal with pro-rated pricing." },
  { question: "How quickly will I receive leads?", answer: "Inquiries are delivered in real-time via WhatsApp and Lead Dashboard instantly as customers submit them." },
  { question: "Is support available?", answer: "Yes, we provide email/chat support for all plans, and dedicated account managers for premium tiers." }
];

const valueProps = [
  { title: "Verified customer leads", desc: "No more junk queries. Every lead is pre-filtered for quality.", icon: <ShieldCheck size={28} /> },
  { title: "Location-based targeting", desc: "Get inquiries from customers looking specifically in your city area.", icon: <Target size={28} /> },
  { title: "High conversion potential", desc: "Connect with high-intent users actively ready to book venues.", icon: <TrendingUp size={28} /> },
  { title: "Easy lead management", desc: "A sleek dashboard to track, manage, and close every event deal.", icon: <BarChart3 size={28} /> },
  { title: "Dedicated support", desc: "Our success team is here to help you grow your venue revenue.", icon: <Users size={28} /> }
];

// --- COMPONENTS ---

// --- SUB-COMPONENTS ---

const GridBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    <div 
      className="absolute inset-0 opacity-[0.03]" 
      style={{ 
        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}
    ></div>
    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent"></div>
  </div>
);

const FloatingProp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [0, -15, 0] }}
    transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
    className={`absolute hidden lg:block ${className}`}
  >
    {children}
  </motion.div>
);

const PricingCard = ({ plan }: { plan: typeof pricingPlans[0] }) => {
  const discount = Math.round(((plan.mrp - plan.price) / plan.mrp) * 100);
  
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`relative h-full flex flex-col p-8 rounded-[32px] bg-white border ${plan.popular ? 'border-2 ring-1 ring-pink-500 shadow-2xl scale-105 z-10' : 'border-slate-100 shadow-sm hover:shadow-xl'}`}
      style={{
        borderImageSource: plan.popular ? 'linear-gradient(to right, #ef4444, #ec4899, #8b5cf6, #3b82f6)' : 'none',
        borderImageSlice: plan.popular ? 1 : 'none'
      }}
    >
      <div className="absolute top-6 right-6">
        <span className={`${gradientStyle} text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg`}>
          Save {discount}%
        </span>
      </div>

      <div className="mb-8 overflow-visible">
        {plan.popular && (
          <div className="flex items-center gap-1.5 text-pink-600 font-bold text-[10px] uppercase tracking-widest mb-3">
             <Star size={12} fill="currentColor" /> MOST POPULAR
          </div>
        )}
        <h3 className="text-xl font-bold text-slate-900 leading-tight mb-4">{plan.name}</h3>
        <div className="space-y-1">
          <p className="text-sm text-slate-400 line-through font-medium leading-none">₹{plan.mrp.toLocaleString()}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tighter">₹{plan.price.toLocaleString()}</span>
            <span className="text-slate-500 text-xs font-medium uppercase tracking-widest">/ yr</span>
          </div>
        </div>
      </div>

      <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="flex items-center gap-2 mb-1">
          <Zap size={14} className="text-pink-500 fill-pink-500" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Monthly Yield</span>
        </div>
        <p className="text-xs font-bold text-slate-900">{plan.leads}</p>
      </div>

      <div className="flex-grow space-y-4 mb-10">
        {plan.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? 'bg-pink-50 text-pink-500' : 'bg-slate-50 text-slate-400'}`}>
              <Check size={12} strokeWidth={3} />
            </div>
            <span className="text-sm font-medium text-slate-600 leading-tight">{feature}</span>
          </div>
        ))}
      </div>

      <button className={`w-full py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
        plan.popular 
          ? `${gradientStyle} text-white shadow-lg shadow-pink-500/20 hover:scale-[1.02] hover:shadow-pink-500/40`
          : 'bg-slate-900 text-white hover:bg-slate-800'
      }`}>
        {plan.cta}
      </button>
    </motion.div>
  );
};

const FaqItem = ({ item }: { item: typeof faqs[0] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <span className="text-sm md:text-base font-bold text-slate-800 leading-tight">{item.question}</span>
        <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-slate-500 text-sm md:text-base font-medium leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function PricingPage() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 selection:bg-pink-500 selection:text-white font-sans antialiased">
      
      {/* 1. HERO HEADER */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-white overflow-hidden border-b border-slate-100">
        <GridBackground />
        
        {/* Animated Props */}
        <FloatingProp delay={0} className="top-1/4 left-[10%] opacity-20 text-red-500"><Star size={48} className="fill-current" /></FloatingProp>
        <FloatingProp delay={1} className="top-1/3 right-[15%] opacity-20 text-blue-500"><Zap size={40} className="fill-current" /></FloatingProp>
        <FloatingProp delay={2} className="bottom-1/4 left-[15%] opacity-20 text-purple-500"><ShieldCheck size={36} className="fill-current" /></FloatingProp>
        <FloatingProp delay={1.5} className="bottom-1/3 right-[10%] opacity-20 text-pink-500"><Plus size={32} className="rotate-45" /></FloatingProp>

        {/* Subtle Background Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-red-500/5 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-10">
               <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] border border-slate-200">
                  <Star size={12} className="text-pink-500 fill-pink-500" /> Trusted by 500+ venues across India
               </span>
            </div>
            <h1 className="text-5xl md:text-8xl font-extrabold text-[#0F172A] leading-[1] mb-12 tracking-tighter">
               Choose the <span className={textGradientStyle}>Right Plan</span> <br /> 
               for Your Venue
            </h1>
            <p className="text-lg md:text-2xl text-slate-500 font-medium mb-16 max-w-2xl mx-auto leading-relaxed">
              Get verified event inquiries and grow your bookings with PartyDial.
            </p>
            <div className="flex justify-center">
              <Link href="/signup" className={`${gradientStyle} text-white px-20 py-6 rounded-full text-base font-bold uppercase tracking-widest shadow-2xl shadow-pink-500/30 hover:scale-110 hover:shadow-pink-500/50 transition-all flex items-center gap-3 group`}>
                Get Started <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. PRICING SECTION (MAIN) */}
      <section className="py-24 md:py-36 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURE COMPARISON TABLE */}
      <section className="py-24 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 uppercase">
             <span className="text-pink-500 text-[11px] font-black tracking-[0.4em] block mb-4">Deep Dive</span>
             <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] leading-tight">Plan Comparison</h2>
          </div>
          
          <div className="overflow-x-auto pb-12 rounded-[32px] border border-slate-100 bg-white shadow-sm">
            <div className="min-w-[1200px]">
               <table className="w-full border-collapse">
                 <thead>
                   <tr>
                     <th className="sticky left-0 z-20 p-8 text-left bg-slate-50 border-b-2 border-slate-100 min-w-[200px]">
                       <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Tiers & Features</span>
                     </th>
                     {pricingPlans.map((plan) => (
                       <th key={plan.id} className={`p-8 text-center border-b-2 border-slate-100 ${plan.popular ? 'bg-pink-50/30' : 'bg-slate-50'}`}>
                         <div className="text-[11px] font-black text-slate-900 uppercase tracking-tighter mb-1">{plan.name}</div>
                         <div className="text-sm font-bold text-pink-500 italic leading-none">₹{plan.price.toLocaleString()}</div>
                       </th>
                     ))}
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {[
                      { label: "Leads per month", vals: ["20-30", "30-50", "60-90", "100-140", "150-220", "220-300", "300-450", "500+"] },
                      { label: "Visibility level", vals: ["Basic", "Improved", "Priority", "Featured", "Premium", "Top City", "High Priority", "Highest"] },
                      { label: "Lead priority", vals: ["Standard", "Standard", "High", "High", "Urgent", "Urgent", "Critical", "Top Priority"] },
                      { label: "Analytics", vals: ["None", "Basic", "Standard", "Advanced", "Advanced", "Full", "Enterprise", "Custom"] },
                      { label: "Support type", vals: ["Email", "Email", "Priority", "Priority", "Dedicated", "Dedicated", "A/C Mgr", "A/C Mgr"] },
                      { label: "Placement level", vals: ["Standard", "Standard", "Featured", "Featured", "Premium", "Prime", "Elite", "Exclusive"] },
                    ].map((row, i) => (
                      <tr key={i} className="group hover:bg-slate-50 transition-colors">
                        <td className="sticky left-0 z-10 p-8 bg-white group-hover:bg-slate-50 font-bold text-sm text-slate-700">{row.label}</td>
                        {row.vals.map((val, idx) => (
                          <td key={idx} className="p-8 text-center text-xs font-medium text-slate-500">{val}</td>
                        ))}
                      </tr>
                    ))}
                 </tbody>
               </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUE SECTION */}
      <section className="py-24 md:py-36 px-6 lg:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 uppercase">
             <h2 className="text-3xl md:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-none italic uppercase">Why Choose <span className={textGradientStyle}>PartyDial?</span></h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {valueProps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-xl transition-all"
              >
                <div className={`${gradientStyle} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-4">{item.title}</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 6. FAQ SECTION */}
      <section className="py-24 md:py-36 px-6 bg-slate-50">
         <div className="max-w-3xl mx-auto">
            <div className="text-center mb-20 uppercase">
               <span className="text-pink-500 text-[11px] font-black tracking-[0.4em] block mb-4">Support Hub</span>
               <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] leading-tight tracking-tight">Got Questions?</h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FaqItem key={i} item={faq} />
              ))}
            </div>
         </div>
      </section>

      {/* 7. FINAL CTA SECTION - PERFORMANCE OPTIMIZED */}
      <section className="py-24 md:py-36 px-6 bg-white overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto lg:px-12 text-center relative z-10">
           <div className="relative rounded-[80px] bg-slate-50 p-16 md:p-32 border border-slate-100 shadow-2xl overflow-hidden group bg-gradient-to-b from-slate-50 to-white">
              
              {/* Hardware-Accelerated Optimized Glow */}
              <div 
                className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[100px] pointer-events-none transition-opacity duration-1000 group-hover:opacity-40"
                style={{ willChange: 'opacity, transform' }}
              ></div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ willChange: 'opacity, transform' }}
              >
                <h2 className="text-4xl md:text-8xl font-black text-[#0F172A] leading-[0.9] tracking-tighter italic uppercase mb-12">
                   Start Receiving <br />
                   <span className={textGradientStyle}>Event Bookings</span> Today
                </h2>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                   <Link href="/signup" className={`${gradientStyle} text-white px-20 py-6 rounded-full text-base font-bold uppercase tracking-widest shadow-2xl shadow-pink-500/20 hover:scale-[1.05] hover:shadow-pink-500/40 transition-all duration-300`}>
                      Get Started
                   </Link>
                   <Link href="/contact" className="px-16 py-6 bg-white border-2 border-slate-200 text-slate-800 rounded-full text-base font-bold uppercase tracking-widest hover:bg-slate-50 transition-all duration-300">
                      Talk to Sales
                   </Link>
                </div>
                
                <div className="mt-16 flex items-center justify-center gap-4 text-slate-400">
                   <ShieldCheck size={20} />
                   <span className="text-[11px] font-black uppercase tracking-widest leading-none">Safe · Secure · High Growth</span>
                   <Zap size={20} />
                </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* MOBILE STICKY CTA */}
      <div className="fixed bottom-6 left-6 right-6 z-[100] md:hidden">
         <Link href="/signup" className={`${gradientStyle} flex items-center justify-between w-full p-4 text-white rounded-[32px] shadow-2xl border border-white/20 group`}>
            <div className="pl-4">
               <div className="text-[8px] font-black uppercase tracking-[0.2em] opacity-80 leading-none mb-1">Growth Awaits</div>
               <div className="text-sm font-black italic uppercase leading-none tracking-tighter">Register Venue</div>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl group-active:scale-95 transition-transform">
               <ArrowRight size={20} />
            </div>
         </Link>
      </div>

    </div>
  );
}
