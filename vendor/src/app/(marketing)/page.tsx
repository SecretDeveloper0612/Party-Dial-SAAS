'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Zap, 
  ChevronDown, 
  Star, 
  Smartphone, 
  MapPin, 
  Target,
  BarChart3, 
  ShieldCheck, 
  LayoutDashboard,
  MessageSquare,
  Building2,
  Calendar,
  Phone,
  Mail,
  PieChart,
  HelpCircle,
  Clock,
  Briefcase,
  TrendingUp,
  Globe,
  Plus,
  ArrowUpRight,
  Shield,
  Layers,
  Image as ImageIcon,
  PartyPopper,
  Heart,
  Wine,
  Sparkles,
  Baby,
  Gem,
  UsersRound,
  CircleDot
} from 'lucide-react';

// --- DATA ---

const trustedStats = [
  { label: "Venues Listed", value: 500, suffix: "+", icon: <Building2 size={16} /> },
  { label: "Party Inquiries", value: 10000, suffix: "+", icon: <Users size={16} /> },
  { label: "Cities Covered", value: 7, suffix: " Major Cities", icon: <Globe size={16} /> }
];

const howItWorks = [
  {
    title: "Register",
    desc: "Fill out your venue details in under 5 minutes. Our guided form makes the onboarding process quick and easy.",
    step: "01",
    icon: <Briefcase size={22} />,
    accent: "#E91E8C",
    tag: "Takes 5 min"
  },
  {
    title: "Build Profile",
    desc: "Showcase your venue with high-quality photos, pricing, capacity, and event types you host.",
    step: "02",
    icon: <ImageIcon size={22} />,
    accent: "#3B82F6",
    tag: "Stand Out"
  },
  {
    title: "Get Inquiries",
    desc: "Start receiving real-time, verified leads from customers actively searching for venues in your city.",
    step: "03",
    icon: <MessageSquare size={22} />,
    accent: "#10B981",
    tag: "Live Alerts"
  },
  {
    title: "Close Bookings",
    desc: "Connect with customers directly, discuss requirements, and convert inquiries into confirmed bookings.",
    step: "04",
    icon: <TrendingUp size={22} />,
    accent: "#F59E0B",
    tag: "More Revenue"
  }
];

const venueTypes = [
  { name: "Banquet Halls", icon: <Building2 size={20} />, desc: "Grand celebrations" },
  { name: "Luxury Hotels", icon: <Building2 size={20} />, desc: "Premium stays & events" },
  { name: "Restaurants", icon: <Wine size={20} />, desc: "Fine dining & parties" },
  { name: "Cafes & Bistros", icon: <Zap size={20} />, desc: "Cozy gatherings" },
  { name: "Party Lawns", icon: <Sparkles size={20} />, desc: "Outdoor festivities" },
  { name: "Resorts", icon: <Globe size={20} />, desc: "Destination events" },
  { name: "Farmhouses", icon: <Building2 size={20} />, desc: "Private getaways" },
  { name: "Rooftop Venues", icon: <Layers size={20} />, desc: "Skyline celebrations" },
  { name: "Clubs & Lounges", icon: <Zap size={20} />, desc: "Nightlife & music" },
  { name: "Community Halls", icon: <Users size={20} />, desc: "Social gatherings" },
  { name: "Marriage Gardens", icon: <Heart size={20} />, desc: "Timeless weddings" },
  { name: "Convention Centers", icon: <Building2 size={20} />, desc: "Large scale events" }
];

const eventCategories = [
  { name: "Birthdays", icon: <PartyPopper size={28} />, accent: "#F43F5E", bg: "from-rose-500/20 to-pink-500/5", demand: "2.4K+ monthly" },
  { name: "Weddings", icon: <Heart size={28} />, accent: "#8B5CF6", bg: "from-violet-500/20 to-purple-500/5", demand: "3.1K+ monthly" },
  { name: "Corporate", icon: <Building2 size={28} />, accent: "#3B82F6", bg: "from-blue-500/20 to-sky-500/5", demand: "1.8K+ monthly" },
  { name: "Anniversaries", icon: <Wine size={28} />, accent: "#F59E0B", bg: "from-amber-500/20 to-yellow-500/5", demand: "900+ monthly" },
  { name: "Pre-Wedding", icon: <Sparkles size={28} />, accent: "#EC4899", bg: "from-pink-500/20 to-rose-500/5", demand: "1.2K+ monthly" },
  { name: "Kitty Party", icon: <UsersRound size={28} />, accent: "#10B981", bg: "from-emerald-500/20 to-teal-500/5", demand: "700+ monthly" },
  { name: "Baby Shower", icon: <Baby size={28} />, accent: "#F97316", bg: "from-orange-500/20 to-amber-500/5", demand: "600+ monthly" },
  { name: "Engagement", icon: <Gem size={28} />, accent: "#06B6D4", bg: "from-cyan-500/20 to-blue-500/5", demand: "1.0K+ monthly" }
];

const successStories = [
  { name: "Grand Imperial", location: "Delhi", text: "PartyDial helped us increase weekend bookings by 35% in 6 months. Their verified lead system is top-notch.", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=400" },
  { name: "The Sky Lawn", location: "Mumbai", text: "Their dashboard makes lead management effortless. We've closed more corporate events than ever before.", img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=400" },
  { name: "Royal Palms", location: "Bangalore", text: "The real-time WhatsApp alerts are a game-changer. We respond to inquiries in minutes now.", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400" },
  { name: "City View Banquet", location: "Chandigarh", text: "Being listed as a verified partner has boosted our credibility significantly. Leads are high-intent.", img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=400" },
  { name: "Emerald Resort", location: "Jaipur", text: "The seasonal demand analytics helped us price our weekend slots better. Highly recommended for owners.", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400" }
];

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10px 0px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const CursorZoomImage = ({ src, alt, height, priority = false }: { src: string, alt: string, height: string, priority?: boolean }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setMousePos({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${height} rounded-[32px] overflow-hidden shadow-2xl group cursor-none`}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.25 : 1,
          x: isHovered ? (0.5 - mousePos.x) * 60 : 0,
          y: isHovered ? (0.5 - mousePos.y) * 60 : 0,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.5 }}
        className="relative w-full h-full"
      >
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className="object-cover" 
          priority={priority}
        />
      </motion.div>
      
      {/* Lens effect / Cursor follower */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              left: `${mousePos.x * 100}%`,
              top: `${mousePos.y * 100}%`,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.5 }}
            className="absolute w-20 h-20 border-2 border-white/40 rounded-full pointer-events-none z-30 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-[2px]"
          >
             <div className="w-1.5 h-1.5 bg-white rounded-full shadow-lg"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const features = [
  { title: 'Smart Dashboard', desc: 'Centralized command for lead management, revenue tracking, and venue operations.', icon: <LayoutDashboard size={24} />, accent: '#F43F5E', stats: '200% Growth', img: '/dashboard-preview.png' },
  { title: 'Real-Time Alerts', desc: 'Never miss a lead. Instant WhatsApp and SMS push notifications for every query.', icon: <Zap size={24} />, accent: '#10B981', stats: '< 5s Latency', img: '/alerts-preview.png' },
  { title: 'Verified Contacts', desc: 'Every inquiry is pre-qualified. We only deliver leads with high intent to book.', icon: <Phone size={24} />, accent: '#8B5CF6', stats: '99% Verified', img: '/dashboard-preview.png' },
  { title: 'Booking Calendar', desc: 'A dedicated digital space to visualize your events and availability smoothly.', icon: <Calendar size={24} />, accent: '#F59E0B', stats: 'Smart Sync', img: '/dashboard-preview.png' },
  { title: 'Smart Analytics', desc: 'Understand your market. Deep insights into conversion rates and peak traffic.', icon: <PieChart size={24} />, accent: '#3B82F6', stats: 'AI Insights', img: '/dashboard-preview.png' },
  { title: 'Elite Support', desc: 'Direct access to our senior partner success team whenever you need it.', icon: <Shield size={24} />, accent: '#EC4899', stats: '24/7 Priority', img: '/dashboard-preview.png' }
];

const FeatureHub = () => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelected((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-auto lg:min-h-[500px]">
      {/* Vertical Navigation Sidebar */}
      <div className="w-full lg:w-72 flex flex-row lg:flex-col gap-2 p-2 bg-slate-50/50 rounded-[40px] border border-slate-100/50 overflow-x-auto lg:overflow-visible no-scrollbar">
        {features.map((f, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`flex flex-row lg:flex-col items-center lg:items-start gap-3 lg:gap-2 p-3 lg:p-4 rounded-[30px] text-left transition-all duration-500 flex-shrink-0 group ${
              selected === i 
                ? 'bg-white text-slate-900 shadow-xl border border-slate-100 scale-[1.02] z-10' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <div 
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${selected === i ? 'shadow-lg rotate-0' : 'rotate-3 grayscale opacity-60'}`}
              style={{ backgroundColor: selected === i ? `${f.accent}15` : 'transparent', color: selected === i ? f.accent : 'inherit' }}
            >
              {f.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">{f.title}</span>
              <span className={`text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block ${selected === i ? 'text-pd-pink opacity-100' : 'text-slate-400'}`}>
                 {f.stats}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Flagship Showcase Area */}
      <div className="flex-1 bg-white rounded-[40px] border border-slate-100/30 shadow-sm relative overflow-hidden flex flex-col justify-center p-8 md:p-12 lg:p-20">
        
        {/* Animated Background Pulse */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected + 'bg'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
            style={{ backgroundColor: features[selected].accent }}
          ></motion.div>
        </AnimatePresence>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selected}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ willChange: "transform, opacity" }}
              className="flex-[0.35] text-center lg:text-left min-w-[280px]"
            >
              <div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest mb-6 shadow-sm border"
                style={{ backgroundColor: `${features[selected].accent}08`, color: features[selected].accent, borderColor: `${features[selected].accent}15` }}
              >
                <Zap size={12} /> Global Priority Performance
              </div>
              <h4 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0F172A] uppercase tracking-tighter leading-tight mb-6 italic">
                {features[selected].title}
              </h4>
              <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed max-w-sm mb-8">
                {features[selected].desc}
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                 {['Next-Gen', 'Sync'].map((tag, i) => (
                    <div key={i} className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                       <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: features[selected].accent }}></div>
                       {tag}
                    </div>
                 ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex-[0.65] relative aspect-video w-full max-w-[750px] hidden md:block group">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selected + 'img'}
                initial={{ opacity: 0, scale: 0.98, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.02, x: -20 }}
                transition={{ duration: 0.4 }}
                style={{ willChange: "transform, opacity" }}
                className="w-full h-full"
              >
                 <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-perfect border border-slate-100 group-hover:scale-[1.01] transition-transform duration-700">
                    <Image 
                      src={features[selected].img} 
                      alt={features[selected].title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/10 to-transparent pointer-events-none"></div>
                 </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PartnerLandingPage() {
  const router = useRouter();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('auth_session')) {
      router.push('/dashboard');
    }
  }, [router]);


  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div suppressHydrationWarning className="bg-slate-50 min-h-screen text-slate-800 selection:bg-pd-pink selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="relative z-10 py-8 lg:py-12"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-8">
              <Shield size={12} className="text-pd-blue" /> Verified Partner Program
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#0F172A] leading-tight mb-8 tracking-tight italic px-1">
              Get More <span className="pd-gradient-text uppercase">Party Bookings</span> <br /> 
              for Your Venue
            </h1>
            <p className="text-base md:text-lg text-slate-500 font-medium mb-12 max-w-xl leading-relaxed">
              List your venue on PartyDial and receive verified, high-intent party inquiries from customers in your city daily.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link href="/signup" className="pd-btn-primary !text-sm !px-12 !py-4 bg-pd-red lowercase italic tracking-normal">
                list your venue
              </Link>
              <Link href="#how-it-works" className="px-12 py-4 bg-white border border-slate-200 text-slate-700 rounded-[12px] text-sm font-bold hover:bg-slate-50 transition-all">
                Get Started
              </Link>
            </div>
            
            <div className="mt-16 flex gap-10 items-center flex-wrap">
               <div className="flex items-center gap-3">
                 <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm"><Image src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="user" width={32} height={32} /></div>)}
                 </div>
                 <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest italic">Trusted by 500+ Owners</span>
               </div>
               <div className="flex items-center gap-1.5 text-[11px) font-bold text-slate-400 uppercase tracking-widest italic">
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} className="fill-pd-pink text-pd-pink" />)}
                  <span className="ml-1">4.8/5 Rating</span>
               </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="relative"
          >
             <div className="grid grid-cols-2 gap-6 origin-center">
               <div className="space-y-6">
                 <CursorZoomImage 
                   src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800" 
                   alt="Venue" 
                   height="h-56" 
                   priority 
                 />
                 <CursorZoomImage 
                   src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" 
                   alt="Party" 
                   height="h-72" 
                   priority 
                 />
               </div>
               <div className="space-y-6 pt-16">
                 <CursorZoomImage 
                   src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800" 
                   alt="Event" 
                   height="h-72" 
                   priority 
                 />
                 <CursorZoomImage 
                   src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=2000" 
                   alt="Gala" 
                   height="h-56" 
                   priority 
                 />
               </div>
             </div>

          </motion.div>
        </div>
      </section>


      {/* 3. HOW IT WORKS */}
      <section id="how-it-works" className="relative py-28 px-6 overflow-hidden bg-white">
        <div className="max-w-[1440px] mx-auto lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-100 bg-slate-50 text-[10px] font-black uppercase tracking-[0.3em] text-pink-500 mb-6">
              <Zap size={10} className="text-pink-500" /> Onboarding Process
            </span>
            <h3 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-5 tracking-tight leading-tight">
              Get Started in <span style={{ background: 'linear-gradient(90deg, #E91E8C, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>4 Simple Steps</span>
            </h3>
            <p className="text-slate-500 text-sm font-medium max-w-md mx-auto leading-relaxed">
              From registration to your first booking — it&apos;s faster than you think.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {howItWorks.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group flex flex-col rounded-[28px] p-7 border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:border-slate-200 transition-all cursor-default overflow-hidden"
              >
                {/* Hover Glow Accent */}
                <div 
                  className="absolute -top-10 -right-10 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none z-0"
                  style={{ backgroundColor: item.accent }}
                />

                <div className="relative z-10 flex items-center justify-between mb-8">
                  <span className="text-5xl font-black leading-none transition-all duration-500 group-hover:opacity-50" style={{ color: `${item.accent}30` }}>
                    {item.step}
                  </span>
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-black/5"
                    style={{ background: item.accent }}
                  >
                    {item.icon}
                  </div>
                </div>
                <span
                  className="relative z-10 self-start mb-4 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all duration-300 group-hover:bg-pd-pink group-hover:text-white group-hover:border-pd-pink"
                  style={{ color: item.accent, borderColor: `${item.accent}40`, background: `${item.accent}12` }}
                >
                  {item.tag}
                </span>
                <h4 className="relative z-10 text-base font-bold text-slate-900 mb-3 tracking-tight transition-colors group-hover:text-pd-pink">{item.title}</h4>
                <p className="relative z-10 text-xs text-slate-500 font-medium leading-relaxed transition-colors group-hover:text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHO CAN JOIN - PREMIUM 2-COLUMN SPLIT */}
      <section className="relative py-28 px-6 bg-white overflow-hidden">
        {/* Designer Accents */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-slate-50/50 -z-10 translate-x-32 skew-x-12"></div>
        <div className="absolute top-1/2 left-0 w-24 h-[1px] bg-pd-pink opacity-30 -translate-y-1/2"></div>
        
        <div className="max-w-[1440px] mx-auto lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-center">
             
             {/* LEFT SIDE: DETAILS & POINTS */}
             <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="flex-1"
             >
                <div className="inline-flex items-center gap-2 mb-8">
                  <span className="w-12 h-[2px] bg-pd-pink"></span>
                  <span className="text-pd-pink text-[10px] font-black uppercase tracking-[0.4em]">Partner Program</span>
                </div>
                
                <h2 className="text-4xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter mb-8">
                   Expand Your <br />
                   <span className="text-pd-pink italic">Venue&apos;s</span> Reach
                </h2>
                
                <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-xl mb-12">
                   Join India&apos;s most exclusive event ticketing and venue discovery platform. 
                   We connect premium spaces with high-intent celebratees every single day.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                   {venueTypes.map((venue, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-4 group cursor-default"
                      >
                         <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-pd-blue group-hover:bg-pd-pink group-hover:text-white transition-all duration-300">
                            {venue.icon}
                         </div>
                         <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors tracking-tight">{venue.name}</span>
                      </motion.div>
                   ))}
                </div>

                <div className="mt-16 pt-12 border-t border-slate-100 flex flex-wrap gap-8 items-center">
                    <Link href="/signup" className="px-10 py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] italic hover:bg-pd-pink transition-all shadow-xl shadow-slate-900/10">
                       List Now
                    </Link>
                    <div className="flex items-center gap-3">
                       <ShieldCheck size={20} className="text-emerald-500" />
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Instant Verification <br />Available</span>
                    </div>
                </div>
             </motion.div>

             {/* RIGHT SIDE: IMAGE COMPOSITION (Designer Layout) */}
             <div className="flex-1 relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="relative z-10"
                >
                   {/* Main Image Frame */}
                   <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-[60px] overflow-hidden shadow-strong-pd border-[12px] border-white max-w-[500px] ml-auto">
                      <Image 
                        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200" 
                        alt="Event Setup" 
                        fill 
                        className="object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                   </div>

                   {/* Floating Secondary Image (Tilted) */}
                   <motion.div 
                     initial={{ opacity: 0, rotate: -10, y: 50 }}
                     whileInView={{ opacity: 1, rotate: -5, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.3, duration: 1 }}
                     className="absolute -bottom-10 -left-12 w-64 h-80 rounded-[40px] overflow-hidden border-[8px] border-white shadow-2xl hidden md:block z-20"
                   >
                      <Image 
                        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600" 
                        alt="Celebrate" 
                        fill 
                        className="object-cover" 
                      />
                      <div className="absolute inset-0 bg-pd-pink/10 mix-blend-multiply"></div>
                   </motion.div>

                   {/* Badge Overlays */}
                   <motion.div 
                     animate={{ y: [0, -10, 0] }}
                     transition={{ duration: 4, repeat: Infinity }}
                     className="absolute top-10 -left-6 bg-white p-5 rounded-3xl shadow-xl border border-slate-50 z-30 flex items-center gap-4"
                   >
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center"><CheckCircle2 size={24} /></div>
                      <div>
                         <div className="text-[10px] font-black text-slate-800 uppercase tracking-widest leading-none mb-1">Top Rated</div>
                         <div className="text-[14px] font-black text-slate-900 leading-none">Verified Space</div>
                      </div>
                   </motion.div>

                   <div className="absolute bottom-20 -right-4 bg-pd-pink text-white p-6 rounded-[40px] shadow-2xl z-30 flex flex-col items-center justify-center">
                      <div className="text-3xl font-black leading-none mb-1">500+</div>
                      <div className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80">Listings</div>
                   </div>
                </motion.div>

                {/* Decorative Pattern Background */}
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] pointer-events-none -z-10 rotate-12"></div>
             </div>

          </div>
        </div>
      </section>

      {/* 5. EVENT CATEGORIES - INFINITE MOSAIC CAROUSEL */}
      <section id="categories" className="relative py-28 px-6 bg-slate-50 overflow-hidden">
        {/* Abstract Background Accents */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-active-blue/10 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pd-pink/10 rounded-full blur-[100px] opacity-20"></div>

        <div className="max-w-[1440px] mx-auto lg:px-12 relative z-10">
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-slate-100 text-pd-pink text-[11px] font-black uppercase tracking-[0.4em] mb-6">
                <Target size={12} className="fill-pd-pink/10" /> Market Segments
             </div>
             <h3 className="text-4xl md:text-6xl font-black text-[#0F172A] tracking-tighter leading-none mb-6">
                Most Popular <span className="pd-gradient-text italic">Searches</span>
             </h3>
             <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
                Connect with thousands of customers actively searching for these high-demand event types in your city every month.
             </p>
          </div>
        </div>

        {/* Infinite Carousel Container */}
        <div className="relative group/carousel">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="flex gap-6 w-max px-6 py-10"
            style={{ willChange: "transform" }}
          >
            {[...eventCategories, ...eventCategories].map((evt, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative w-[280px] md:w-[320px] p-8 rounded-[48px] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer flex flex-col items-center justify-center text-center group"
              >
                  {/* Background Gradient Flash */}
                  <div 
                    className="absolute inset-x-0 bottom-0 h-1.5 group-hover:h-full transition-all duration-500 opacity-10 group-hover:opacity-100" 
                    style={{ background: `linear-gradient(to top, ${evt.accent}20, transparent)` }}
                  ></div>
                  
                  <div 
                    className="w-20 h-20 rounded-[32px] flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-[10deg] shadow-lg border-2 border-slate-50 group-hover:bg-white" 
                    style={{ color: evt.accent, backgroundColor: `${evt.accent}08` }}
                  >
                    {evt.icon}
                  </div>
                  
                  <h4 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-2 leading-none">
                    {evt.name}
                  </h4>
                  
                  <div className="flex flex-col items-center gap-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{evt.demand}</span>
                      <div className="px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100 text-[9px] font-black text-emerald-500 uppercase tracking-widest group-hover:bg-pd-pink group-hover:text-white group-hover:border-pd-pink transition-colors">
                        Trending Hot
                      </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={20} style={{ color: evt.accent }} />
                  </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Side Fading Edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent pointer-events-none z-20"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent pointer-events-none z-20"></div>
        </div>
      </section>

      {/* 6. MERCHANT FEATURES - COMPACT INTERACTIVE HUB */}
      <section id="features" className="relative py-16 px-6 bg-slate-50 overflow-hidden">
        <div className="max-w-[1440px] mx-auto lg:px-12 relative z-10">
          
          <div className="text-center mb-10">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border border-slate-100 text-pd-pink text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                <ShieldCheck size={12} className="fill-pd-pink/10" /> Venue Operating System
             </div>
             <h3 className="text-3xl md:text-5xl font-black text-[#0F172A] tracking-tighter leading-tight py-2 mb-4">
                Operations <span className="pd-gradient-text italic">Redefined</span>
             </h3>
          </div>

          {/* Interactive Feature Hub */}
          <div className="bg-white rounded-[48px] p-3 shadow-xl border border-slate-100/50">
             <FeatureHub />
          </div>

        </div>
      </section>

      {/* 8. LEAD PIPELINE - PULSE PATHWAY DESIGN */}
      <section className="py-24 md:py-32 px-6 bg-white overflow-hidden border-t border-slate-50">
        <div className="max-w-[1440px] mx-auto lg:px-12 relative">
          
          <div className="text-center mb-24 relative z-10">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pd-pink/5 text-pd-pink text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                <CircleDot size={12} className="animate-pulse" /> The Conversion Engine
             </div>
             <h3 className="text-4xl md:text-7xl font-black text-[#0F172A] tracking-tighter leading-none italic uppercase">
                How Your Leads <span className="pd-gradient-text not-italic">Reach You</span>
             </h3>
          </div>

          <div className="relative flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-0">
             {/* Background Connecting Line (Desktop) */}
             <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] border-t-2 border-dashed border-slate-100 -translate-y-1/2 z-0">
                <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: '100%' }}
                   viewport={{ once: true }}
                   transition={{ duration: 2, ease: "easeInOut" }}
                   className="h-full bg-gradient-to-r from-pd-pink via-pd-blue to-emerald-500 absolute top-0 left-0"
                ></motion.div>
             </div>
             {[
               { step: '01', label: 'Search', icon: <Users size={24} />, accent: '#F43F5E', desc: 'Customers discover', details: 'Users find your venue via our high-traffic directory and smart discovery filters.' },
               { step: '02', label: 'Submit', icon: <MessageSquare size={24} />, accent: '#8B5CF6', desc: 'Inquiry received', details: 'Forms are submitted instantly with event dates and headcount requirements.' },
               { step: '03', label: 'Verify', icon: <ShieldCheck size={24} />, accent: '#3B82F6', desc: 'Pre-qualified lead', details: 'Our system validates user intent to ensure 100% genuine, high-quality leads.' },
               { step: '04', label: 'Deliver', icon: <Zap size={24} />, accent: '#10B981', desc: 'Direct notification', details: 'Receive real-time notifications via WhatsApp and SMS immediately.' },
               { step: '05', label: 'Close', icon: <TrendingUp size={24} />, accent: '#F59E0B', desc: 'Confirmed booking', details: 'Track calls, send proposals and secure bookings through integrated tools.' }
             ].map((s, i) => (
                <motion.div 
                   key={i}
                   initial={{ opacity: 0, scale: 0.8 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6, delay: i * 0.15 }}
                   className="flex flex-col items-center text-center relative z-10 group"
                >
                   {/* Background Decorative Step Number */}
                   <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-8xl md:text-9xl font-black text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none select-none italic -z-10">{s.step}</div>
                   
                   <div className="relative">
                      {/* Detailed Info Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-48 p-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-50">
                         <p className="text-[11px] font-bold text-slate-600 leading-relaxed">{s.details}</p>
                         <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-slate-100 rotate-45 -mt-1.5"></div>
                      </div>

                      <div 
                        className="w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center bg-white shadow-2xl border-4 relative overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                        style={{ borderColor: s.accent }}
                      >
                         <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: s.accent }}></div>
                         <div style={{ color: s.accent }}>{s.icon}</div>
                      </div>
                      
                      {/* Pulse Ring */}
                      <div className="absolute inset-0 rounded-full animate-ping opacity-20 border-2" style={{ borderColor: s.accent }}></div>
                   </div>

                   <div className="mt-8">
                      <h4 className="text-lg md:text-2xl font-black text-slate-900 uppercase tracking-tighter mb-1 transition-colors">{s.label}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{s.desc}</p>
                   </div>
                   
                   {/* Vertical Line for Mobile */}
                   {i < 4 && <div className="lg:hidden w-px h-12 bg-slate-100 my-4"></div>}
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 9. SUCCESS STORIES */}
      <section className="py-24 bg-white border-t border-slate-50 overflow-hidden">
        <div className="max-w-[1440px] mx-auto mb-16 px-6 lg:px-12 text-center">
            <h3 className="text-2xl font-black italic uppercase tracking-widest text-[#0F172A]">Real Success Stories</h3>
        </div>
        <div className="relative">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex gap-8 w-max px-6"
            style={{ willChange: "transform" }}
          >
             {[...successStories, ...successStories].map((t, i) => (
               <div 
                 key={i}
                 className="w-[400px] p-8 bg-slate-50 rounded-[32px] border border-slate-100 flex-shrink-0"
               >
                  <div className="flex gap-4 items-center mb-6">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                       <Image src={t.img} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                       <div className="text-sm font-bold text-slate-900">{t.name}</div>
                       <div className="text-[10px] text-slate-400 uppercase">{t.location}</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 italic">&quot;{t.text}&quot;</p>
               </div>
             ))}
          </motion.div>
          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>
      </section>

      {/* 10. NATIONAL EXPANSION - DISCOVERY HUB */}
      <section className="relative py-28 md:py-36 px-6 overflow-hidden bg-white border-y border-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,#F43F5E08,transparent_50%)]"></div>
        <div className="max-w-[1440px] mx-auto lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pd-blue/5 text-pd-blue text-[10px] font-black uppercase tracking-[0.4em] mb-8 border border-pd-blue/10">
                <Globe size={12} className="animate-spin-slow" /> Expanding Nationally
              </div>
              <h3 className="text-4xl md:text-7xl font-black text-[#0F172A] leading-[0.9] tracking-tighter mb-8 uppercase italic">
                Powering <br />
                <span className="pd-gradient-text not-italic">India&apos;s Elite</span> <br />
                Venues
              </h3>
              <p className="text-slate-500 text-sm md:text-base font-medium max-w-sm leading-relaxed mb-12">
                Join the fastest growing event operations network. Currently dominating key hubs and expanding our footprint every month.
              </p>
              
              <div suppressHydrationWarning className="flex flex-wrap gap-3 mb-10">
                {["Delhi", "Mumbai", "Bangalore", "Dehradun", "Chandigarh", "Jaipur", "Lucknow"].map((city, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-3 px-4 py-2 bg-slate-50 hover:bg-white rounded-full border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div suppressHydrationWarning className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-pd-blue border border-slate-100 group-hover:bg-pd-blue group-hover:text-white transition-colors">
                      <MapPin size={12} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">{city}</span>
                  </motion.div>
                ))}
              </div>

              <div suppressHydrationWarning className="flex gap-12 items-center p-6 bg-slate-50 rounded-[32px] border border-slate-100 w-fit">
                 <div>
                    <div className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-1">1,200+</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none">Global Partners</div>
                 </div>
                 <div className="w-px h-10 bg-slate-200"></div>
                 <div>
                    <div className="text-3xl font-black text-emerald-500 tracking-tighter leading-none mb-1">140%</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none">Growth YoY</div>
                 </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square w-full max-w-[600px] mx-auto group">
                 <div className="absolute inset-0 bg-pd-blue/5 rounded-full blur-[100px] animate-pulse"></div>
                 <div className="relative w-full h-full rounded-[48px] overflow-hidden shadow-perfect border border-slate-100 bg-white p-2">
                    <Image 
                      src="/india-map-preview.png" 
                      alt="National Data Map" 
                      fill 
                      className="object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                    />
                    
                    {/* Live Dash Overlay */}
                    <div className="absolute top-6 left-6 flex items-center gap-3 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50">
                       <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10B981]"></div>
                       <span className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em]">National Live Status</span>
                    </div>

                    <div className="absolute bottom-6 right-6 p-6 bg-slate-900/95 backdrop-blur-md rounded-[32px] shadow-2xl border border-white/10 text-white min-w-[200px]">
                       <div className="text-[10px] font-bold text-pd-pink uppercase tracking-widest mb-2 italic">Active Regions</div>
                       <div className="space-y-3">
                          {[1, 2].map(i => (
                             <div key={i} className="flex justify-between items-center">
                                <span className="text-xs font-black uppercase tracking-tighter opacity-70">Region {i === 1 ? 'North' : 'South'}</span>
                                <div className="h-1 flex-1 mx-4 bg-white/10 rounded-full overflow-hidden">
                                   <motion.div 
                                     initial={{ width: 0 }}
                                     whileInView={{ width: i === 1 ? '85%' : '60%' }}
                                     transition={{ duration: 1.5, delay: 0.5 }}
                                     className={`h-full ${i === 1 ? 'bg-pd-pink' : 'bg-pd-blue'}`}
                                   ></motion.div>
                                </div>
                                <span className="text-xs font-black">{i === 1 ? '85' : '65'}%</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 11. FAQ - PREMIUM REDESIGN */}
      <section suppressHydrationWarning className="py-24 md:py-40 px-6 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent"></div>
        <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] bg-pd-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-pd-blue animate-pulse"></div>
                Knowledge Base
              </div>
              <h3 className="text-5xl md:text-7xl font-black italic text-[#0F172A] tracking-tighter uppercase leading-[0.85]">
                Curious <br />
                about <span className="pd-gradient-text not-italic">growth?</span>
              </h3>
              <p className="text-slate-500 text-lg font-medium max-w-sm leading-relaxed">
                Everything you need to know about the most powerful event engine in the country.
              </p>
              
              <div className="pt-12 hidden lg:block">
                 <div className="p-8 bg-slate-900 rounded-[32px] text-white relative overflow-hidden group shadow-2xl">
                    <div className="relative z-10">
                       <h4 className="text-sm font-black italic uppercase tracking-widest mb-4">Still have doubts?</h4>
                       <p className="text-slate-400 text-xs mb-8">Our partner success team is available 24/7 to help you dominate your city.</p>
                       <button className="px-8 py-3 bg-pd-pink text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform">Get Expert Help</button>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pd-pink/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                 </div>
              </div>
            </div>

            {/* Right Column: Accordion */}
            <div className="lg:col-span-7 space-y-4">
               {[
                 { q: "How do I list my venue?", a: "Registering is easy. Fill out our partner onboarding form with your basic venue details. Our verification team reviews all applications within 24-48 hours to ensure our quality standards are met." },
                 { q: "How do I receive leads?", a: "Every inquiry is delivered instantly. We notify you via real-time WhatsApp alerts, SMS, and email. You can also view, track, and manage all your conversations through the Partner Dashboard." },
                 { q: "Can I update pricing?", a: "Yes, you have full control. Update your pricing, seasonal availability, event capacity, and high-quality photo gallery at any time through your dashboard." },
                 { q: "Is there a listing fee?", a: "We offer several ways to grow. From organic free listings with standard visibility to premium growth plans that guarantee high-intent lead volume. Contact us to find your perfect fit." }
               ].map((f, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className={`rounded-[32px] border transition-all duration-500 overflow-hidden ${activeFaq === i ? 'bg-slate-50/50 border-pd-blue/30 shadow-2xl' : 'bg-white border-slate-100 hover:border-pd-blue/20 shadow-sm'}`}
                 >
                   <button 
                     onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                     className="w-full p-8 flex items-center justify-between text-left group"
                   >
                     <div className="flex items-center gap-6">
                        <span className={`text-[10px] font-black tracking-[0.2em] transition-colors ${activeFaq === i ? 'text-pd-blue' : 'text-slate-300'}`}>0{i + 1}</span>
                        <span className={`text-lg md:text-xl font-bold tracking-tight transition-all duration-500 ${activeFaq === i ? 'text-pd-blue translate-x-1' : 'text-slate-900 group-hover:text-pd-blue group-hover:translate-x-1'}`}>{f.q}</span>
                     </div>
                     <div className={`flex-shrink-0 w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-700 ${activeFaq === i ? 'bg-[#0F172A] border-[#0F172A] text-white rotate-180' : 'bg-slate-50 border-slate-100 text-slate-400 rotate-0 group-hover:bg-pd-blue group-hover:border-pd-blue group-hover:text-white'}`}>
                        <ChevronDown size={20} strokeWidth={2.5} />
                     </div>
                   </button>

                   <AnimatePresence initial={false}>
                      {activeFaq === i && (
                         <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                           className="overflow-hidden"
                         >
                           <div className="px-8 pb-10 pl-[4.5rem] lg:pl-[4.5rem]">
                              <div className="h-[2px] w-12 bg-pd-blue mb-8 rounded-full"></div>
                              <p className="text-base md:text-lg text-slate-500 leading-relaxed font-medium max-w-2xl">
                                 {f.a}
                              </p>
                              <div className="mt-8 flex gap-4">
                                 <button className="text-[10px] font-black uppercase tracking-widest text-pd-blue hover:underline">Learn More</button>
                                 <div className="w-1 h-1 rounded-full bg-slate-300 self-center"></div>
                                 <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:underline">Related Topics</button>
                              </div>
                           </div>
                         </motion.div>
                      )}
                   </AnimatePresence>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA - SPLIT VISUAL SHOWCASE */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto lg:px-12">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="bg-slate-50 border border-white rounded-[64px] p-12 md:p-20 relative overflow-hidden shadow-perfect-pd flex flex-col lg:flex-row items-center gap-16"
           >
              {/* Left Content */}
              <div className="flex-1 text-left relative z-10">
                 <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-pd-blue/10 text-pd-blue text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                    <Shield size={14} /> Global Priority Partner
                 </div>
                 <h3 className="text-5xl md:text-7xl font-black italic text-[#0F172A] uppercase tracking-tighter leading-[0.85] mb-8">
                    Ready to join <br />
                    the <span className="pd-gradient-text not-italic">Leaders?</span>
                 </h3>
                 <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-xl mb-12">
                    India's most powerful venue growth engine. Stop waiting for leads and start <span className="text-pd-pink font-bold italic">commanding them.</span>
                 </p>
                 <div className="flex flex-wrap gap-6 items-center">
                    <Link href="/signup" className="px-14 py-6 bg-[#0F172A] text-white rounded-[24px] text-xs font-black uppercase tracking-[0.3em] italic hover:bg-pd-pink transition-all duration-500 shadow-2xl shadow-pd-pink/10 hover:shadow-pd-pink/30 hover:scale-105 active:scale-95">
                       List Your Venue
                    </Link>
                    <div className="flex flex-col">
                       <span className="text-xs font-black text-slate-900 leading-none">500+ Active Venues</span>
                       <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">National verification</span>
                    </div>
                 </div>
              </div>

              {/* Right Visual: Floating Success Badge */}
              <div className="flex-1 relative w-full max-w-[500px] aspect-square flex items-center justify-center">
                 <div className="absolute inset-0 bg-pd-pink/5 rounded-full blur-[100px] animate-pulse"></div>
                 
                 {/* The "Elite Achievement" Card */}
                 <motion.div 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative w-80 h-[400px] bg-white rounded-[40px] shadow-strong-pd border border-white p-8 overflow-hidden group/card"
                 >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pd-blue/5 rounded-full blur-3xl group-hover/card:bg-pd-blue/10 transition-colors"></div>
                    
                    <div className="relative z-10 flex flex-col h-full justify-between">
                       <div>
                          <div className="w-14 h-14 rounded-2xl bg-pd-pink flex items-center justify-center text-white shadow-xl shadow-pd-pink/20 mb-6">
                             <TrendingUp size={28} />
                          </div>
                          <div className="text-[10px] font-black text-pd-pink uppercase tracking-widest leading-none mb-2">Verified Growth</div>
                          <div className="text-3xl font-black italic lrading-none text-slate-900">140% <span className="text-sm font-bold opacity-30 not-italic">YoY</span></div>
                       </div>
                       
                       <div className="space-y-4">
                          <div className="h-[2px] w-full bg-slate-50 overflow-hidden">
                             <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                transition={{ duration: 2, delay: 0.5 }}
                                className="h-full bg-pd-blue"
                             ></motion.div>
                          </div>
                          <div className="flex justify-between items-end">
                             <div>
                                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Status</div>
                                <div className="text-sm font-black text-emerald-500 uppercase tracking-tight italic">Elite Tier</div>
                             </div>
                             <div className="w-12 h-12 rounded-full border-4 border-slate-50 p-1">
                                <Image src="/india-map-preview.png" alt="Region" width={40} height={40} className="rounded-full object-cover" />
                             </div>
                          </div>
                       </div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-pd-blue/5 to-transparent pointer-events-none"></div>
                 </motion.div>

                 {/* Secondary Floating Elements */}
                 <motion.div 
                    animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-10 right-0 w-40 p-4 bg-slate-900 shadow-2xl rounded-2xl border border-white/10 text-white z-20"
                 >
                    <div className="flex items-center gap-3">
                       <div className="w-6 h-6 rounded-full bg-pd-blue flex items-center justify-center"><CheckCircle2 size={12} /></div>
                       <span className="text-[9px] font-black uppercase tracking-widest">Instant Live</span>
                    </div>
                 </motion.div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* 13. REGISTRATION - SMART HUB */}
      <section id="register" suppressHydrationWarning className="py-24 px-6 bg-slate-50/50 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pd-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pd-pink/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-white rounded-[60px] p-8 md:p-16 border border-slate-100 shadow-perfect-pd relative z-10"
        >
           <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              {/* Left Column: Benefits */}
              <div className="flex-1">
                 <div className="mb-12">
                    <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] uppercase italic leading-[0.9] tracking-tighter mb-6">
                       Start your <br />
                       <span className="pd-gradient-text not-italic">Legacy.</span>
                    </h2>
                    <p className="text-slate-500 font-medium max-w-sm">Complete this form and our partner success team will reach out within 24 hours.</p>
                 </div>

                 <div className="space-y-6">
                    {[
                       { icon: <ShieldCheck className="text-emerald-500" />, title: "Instant Verification", desc: "Fast-track onboarding for premium venues." },
                       { icon: <Zap className="text-amber-500" />, title: "Live in 24h", desc: "Get your first inquiry by this time tomorrow." },
                       { icon: <Globe className="text-blue-500" />, title: "National Footprint", desc: "Showcase your venue to a PAN India audience." }
                    ].map((item, i) => (
                       <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-4 p-4 rounded-3xl bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-slate-100 group"
                       >
                          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">{item.icon}</div>
                          <div>
                             <div className="text-[10px] font-black uppercase tracking-widest text-[#0F172A]">{item.title}</div>
                             <div className="text-[9px] font-bold text-slate-400 mt-1 uppercase leading-tight">{item.desc}</div>
                          </div>
                       </motion.div>
                    ))}
                 </div>
              </div>

              {/* Right Column: The Form */}
              <div className="flex-1 bg-slate-50/30 rounded-[40px] p-8 md:p-12 border border-slate-100">
                 <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Application Sent!"); }}>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">VENUE DETAILS</label>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input required className="w-full h-14 bg-white border border-slate-100 rounded-2xl px-6 text-sm font-bold focus:border-pd-pink focus:shadow-lg focus:shadow-pd-pink/5 transition-all outline-none" placeholder="Venue Name" />
                          <input required className="w-full h-14 bg-white border border-slate-100 rounded-2xl px-6 text-sm font-bold focus:border-pd-pink focus:shadow-lg focus:shadow-pd-pink/5 transition-all outline-none" placeholder="Owner Name" />
                       </div>
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">CONTACT INFO</label>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input required className="w-full h-14 bg-white border border-slate-100 rounded-2xl px-6 text-sm font-bold focus:border-pd-pink focus:shadow-lg focus:shadow-pd-pink/5 transition-all outline-none" placeholder="City" />
                          <input required className="w-full h-14 bg-white border border-slate-100 rounded-2xl px-6 text-sm font-bold focus:border-pd-pink focus:shadow-lg focus:shadow-pd-pink/5 transition-all outline-none" placeholder="Phone Number" />
                       </div>
                    </div>
                    <motion.button 
                       whileHover={{ scale: 1.02 }}
                       whileTap={{ scale: 0.98 }}
                       className="w-full h-16 bg-pd-red text-white rounded-3xl text-sm font-black uppercase tracking-[0.4em] italic shadow-2xl shadow-pd-red/30 hover:bg-active-red transition-all"
                    >
                       Submit Application
                    </motion.button>
                    <p className="text-[9px] font-bold text-slate-400 text-center uppercase tracking-widest mt-6">Secure Partner Verification System</p>
                 </form>
              </div>
           </div>
        </motion.div>
      </section>


      <AnimatePresence>
        {showSticky && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 p-3 z-50 lg:hidden pointer-events-none"
          >
             <Link href="/signup" className="w-full block text-center py-4 bg-pd-red text-white text-sm font-black rounded-xl shadow-2xl pointer-events-auto">
                LIST YOUR VENUE
             </Link>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
