"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Film, Sparkles, ShieldCheck, Zap, 
  ArrowRight, X, Mail, Loader2, Volume2, VolumeX
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import ScriptEditor from "@/components/ScriptEditor";
import ActorStudio from "@/components/ActorStudio";
import RenderStudio from "@/components/RenderStudio";
import WorldBibleView from "@/components/WorldBibleView";
import DirectorTimeline from "@/components/DirectorTimeline";
import { Shot } from "@/lib/types";

export default function Home() {
  const [view, setView] = useState<"landing" | "pricing" | "studio">("landing");
  const [shots, setShots] = useState<Shot[]>([]);
  const [projectType, setProjectType] = useState<"short" | "full" | null>(null);
  const [showVision, setShowVision] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const carouselItems = [
    { id: 1, title: "The Void Arrival", description: "Scene 01: Deep Space Exploration", video: "/1.mov" },
    { id: 2, title: "Identity Lock", description: "Scene 42: Desert Persistence", video: "/3.mov" },
    { id: 3, title: "Physical Peak", description: "Scene 89: Industrial Strength", video: "/2.mov" },
  ];

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, production_interest: projectType || 'full' }]);
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Validation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const Navbar = () => (
    <nav className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-[200] flex items-center justify-between px-6 md:px-10 h-20 bg-black/40 backdrop-blur-3xl rounded-full border border-white/10 pointer-events-auto shadow-2xl">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView("landing")}>
        <div className="relative">
          <img src="/logo.png" alt="AlphaScreen" className="h-10 w-10 md:h-14 md:w-14 object-contain brightness-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
        </div>
        <div className="h-6 w-px bg-white/10" />
        <div className="flex flex-col text-left max-w-[120px] md:max-w-none">
          <span className="text-base md:text-xl font-black tracking-tighter uppercase italic text-white leading-none">AlphaScreen</span>
          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white/80 mt-1.5 truncate">AI Autonomous Movie Generator</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-8">
        <button 
          onClick={() => setView(view === "studio" ? "landing" : "pricing")}
          className="bg-white text-black px-4 md:px-8 py-2 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all transform active:scale-95 whitespace-nowrap"
        >
          {view === "studio" ? "Exit" : "Enter Studio"}
        </button>
      </div>
    </nav>
  );

  const Carousel = () => {
    const [winWidth, setWinWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
      const handleResize = () => setWinWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = winWidth < 768;
    const cardWidth = isMobile ? winWidth * 0.8 : winWidth * 0.45;
    const xOffset = isMobile ? cardWidth * 0.85 : cardWidth * 0.7;

    return (
      <div className="relative w-full h-[380px] md:h-[550px] flex items-center justify-center perspective-2000 overflow-visible mt-12 md:mt-24 px-4">
        <AnimatePresence mode="popLayout">
          {carouselItems.map((item, index) => {
            const position = index - currentIndex;
            const isCenter = index === currentIndex;
            const absPosition = Math.abs(position);
            
            return (
              <motion.div
                key={item.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 30 && currentIndex > 0) setCurrentIndex(currentIndex - 1);
                  if (info.offset.x < -30 && currentIndex < carouselItems.length - 1) setCurrentIndex(currentIndex + 1);
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: absPosition === 0 ? 1 : absPosition === 1 ? 0.6 : 0.05,
                  scale: isCenter ? 1 : 0.75,
                  x: position * xOffset,
                  rotateY: position * -25,
                  z: absPosition * -200,
                  zIndex: 50 - absPosition
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ width: cardWidth }}
                className="absolute aspect-video bg-black rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing border border-white/30 select-none"
                onClick={() => setCurrentIndex(index)}
              >
                <div className="relative h-full flex flex-col pointer-events-none">
                  <video 
                    src={item.video} 
                    autoPlay 
                    muted={isMuted || !isCenter}
                    loop 
                    playsInline 
                    className={`w-full h-full object-cover transition-opacity duration-700 ${isCenter ? 'opacity-100' : 'opacity-20 grayscale'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  
                  {isCenter && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-4 right-4 md:top-8 md:right-8">
                       <div className="bg-accent/20 backdrop-blur-xl border border-accent/40 px-3 py-1 md:px-4 md:py-1.5 rounded-full flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                         <span className="text-[8px] md:text-[10px] font-black uppercase text-accent tracking-widest">Cinema Ready</span>
                       </div>
                    </motion.div>
                  )}

                  <div className="absolute bottom-0 left-0 w-full p-4 md:p-10 text-left">
                    <h3 className="text-xl md:text-4xl font-black uppercase italic tracking-tighter text-white leading-none">{item.title}</h3>
                    <p className="text-white/60 text-[10px] md:text-base font-medium leading-relaxed italic border-l border-accent pl-3 md:pl-4 mt-2">
                      "{item.description}"
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        <div className="absolute bottom-[-60px] flex gap-3">
          {carouselItems.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentIndex(i)}
              className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-8 bg-accent' : 'w-4 bg-white/10'}`} 
            />
          ))}
        </div>
      </div>
    );
  };

  const LandingView = () => (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-16 md:py-24 cinema-bg">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(229,9,20,0.1)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-black" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] px-8 flex flex-col items-center space-y-12 md:space-y-16">
        <Carousel />

        <div className="max-w-4xl text-center space-y-6 md:space-y-8">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase italic leading-[0.9] text-white">
              Cinema <br /><span className="text-accent not-italic">Reimagined.</span>
            </h1>
            <p className="text-white/40 text-xs md:text-lg max-w-xl mx-auto font-medium leading-relaxed tracking-tight">
              Direct high-fidelity, consistent 2-hour movies from a single script. The world's first autonomous cinematic engine.
            </p>
          </div>

          {submitted ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-panel px-12 py-6 rounded-full inline-flex items-center gap-6 border-emerald-500/20 bg-emerald-500/5">
               <ShieldCheck className="w-8 h-8 text-emerald-500" />
               <div className="flex flex-col text-left">
                  <span className="text-lg font-black uppercase italic tracking-widest text-white leading-none">Entry Validated</span>
                  <span className="text-[9px] font-bold uppercase text-white/40 tracking-[0.2em] mt-1">Priority briefing scheduled.</span>
               </div>
            </motion.div>
          ) : (
            <form onSubmit={handleJoinWaitlist} className="relative max-w-2xl mx-auto w-full group">
              <div className="flex flex-col md:flex-row gap-4 p-2 bg-white/5 backdrop-blur-3xl rounded-[2rem] md:rounded-full border border-white/10 shadow-2xl focus-within:border-accent/40 transition-all duration-700">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Professional Email"
                  className="flex-1 bg-transparent py-3.5 md:py-5 px-8 md:px-12 text-xs md:text-base font-medium focus:outline-none placeholder:text-white/20 text-white"
                />
                <button 
                  disabled={loading}
                  className="bg-white text-black px-12 md:px-16 py-3.5 md:py-5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] md:text-sm transition-all hover:bg-accent hover:text-white disabled:opacity-50 active:scale-95 shadow-xl"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Apply Access"}
                </button>
              </div>
              <p className="text-[10px] md:text-[12px] text-white/70 uppercase font-black tracking-[0.3em] mt-8">Get early access. Limited 2026 slots available.</p>
            </form>

          )}
        </div>
      </div>
      
      {/* Floating Sound Control */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[200]">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-4 md:p-5 rounded-full glass border border-white/20 text-white shadow-2xl transform hover:scale-110 active:scale-95 transition-all group"
        >
          {isMuted ? <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-white/40 group-hover:text-white" /> : <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-accent" />}
          <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full scale-50 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );

  const PricingView = () => (
    <div className="min-h-screen pt-48 px-12 pb-20 space-y-24 cinema-bg relative text-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />
      <div className="relative z-10 text-center space-y-10 max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">Choose Your <span className="text-accent italic">Scale.</span></h2>
        <p className="text-white/40 text-base md:text-xl font-medium tracking-tight leading-relaxed max-w-3xl mx-auto">Select your production tier to enter the autonomous environment.</p>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {[
          { title: "Short Epic", price: "$2,599", desc: "30 minutes of high-fidelity cinematic video.", features: ["400+ 4K Shots", "Elite Identity Lock", "Render Cluster", "Atmos Mastering"], type: "short" },
          { title: "Masterpiece", price: "$8,999", desc: "Full 120-minute theatrical production.", features: ["1,500+ Shots", "Full Narrative Bible", "Priority H100 GPUs", "8K Delivery"], type: "full", best: true }
        ].map(tier => (
          <motion.div key={tier.title} whileHover={{ y: -10 }} className={`glass-panel p-10 md:p-20 rounded-[3rem] md:rounded-[4rem] flex flex-col justify-between border-white/20 hover:border-white/40 transition-all duration-700 shadow-2xl ${tier.best ? 'border-accent/40 bg-accent/[0.03]' : ''}`}>
            <div className="space-y-10 text-left">
              <h3 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter text-white">{tier.title}</h3>
              <p className="text-white/40 text-sm md:text-xl leading-relaxed font-medium">{tier.desc}</p>
              <div className="grid grid-cols-1 gap-4 md:gap-6 pt-6">
                {tier.features.map(f => (
                  <div key={f} className="flex items-center gap-4 md:gap-5 text-[10px] md:text-sm font-black uppercase tracking-widest text-white/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" /> {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-12 md:pt-16 border-t border-white/10 text-left">
              <span className="text-3xl md:text-7xl font-black text-white mb-8 md:mb-10 block">{tier.price}</span>
              <button onClick={() => { setProjectType(tier.type as any); setView("landing"); }} className={`w-full ${tier.best ? 'bg-accent text-white' : 'bg-white text-black hover:bg-accent hover:text-white'} py-4 md:py-8 rounded-full font-black uppercase tracking-[0.3em] transition-all transform active:scale-95 shadow-2xl text-[9px] md:text-sm`}>
                {tier.type === "full" ? "Start Full Production" : "Initialize Production"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const StudioView = () => (
    <div className="min-h-screen pt-40 px-8 pb-32">
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-20 px-8 text-left">
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-4">
             <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_#10b981]" />
             <span className="text-[10px] md:text-xs font-black uppercase text-white/40 tracking-[0.4em]">Live Session: {projectType === "full" ? "Masterpiece" : "Short Epic"}</span>
          </div>
          <h2 className="text-3xl md:text-7xl font-black tracking-tighter uppercase italic text-white leading-none">Studio <span className="text-accent italic text-gradient">Environment.</span></h2>
        </div>
        <div className="glass-panel px-8 py-4 rounded-full flex items-center gap-6 shadow-2xl border-white/10 hidden md:flex">
           <Zap className="w-6 h-6 text-accent" />
           <span className="text-xs font-black uppercase tracking-[0.2em] text-white">Engine Ready</span>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto space-y-40 text-left px-4">
        <section className="glass-panel p-1 rounded-[3rem] overflow-hidden shadow-2xl border-white/10">
          <ScriptEditor onShotsGenerated={setShots} />
        </section>
        <AnimatePresence>
          {shots.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-48">
              <section id="timeline"><DirectorTimeline shots={shots} /></section>
              <section id="render"><RenderStudio shots={shots} /></section>
              <section id="bible"><WorldBibleView /></section>
            </motion.div>
          )}
        </AnimatePresence>
        <section id="actors"><ActorStudio /></section>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-white selection:bg-accent overflow-x-hidden">
      <Navbar />
      <AnimatePresence mode="wait">
        {view === "landing" && <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.8}}><LandingView /></motion.div>}
        {view === "pricing" && <motion.div key="pricing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.8}}><PricingView /></motion.div>}
        {view === "studio" && <motion.div key="studio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.8}}><StudioView /></motion.div>}
      </AnimatePresence>
      <footer className="py-12 md:py-16 px-8 md:px-20 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 border-t border-white/5 bg-black z-50 relative text-left">
        <div className="flex items-center gap-4 md:gap-6 group cursor-pointer">
          <img src="/logo.png" className="h-8 w-8 md:h-12 md:w-12 object-contain brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
          <div className="flex flex-col">
            <span className="text-base md:text-xl font-black uppercase tracking-tighter text-white italic leading-none">AlphaScreen PRO</span>
            <span className="text-[7px] md:text-[8px] font-bold text-white/30 uppercase tracking-[0.3em] mt-1 leading-none">The Autonomous Studio v1.0</span>
          </div>
        </div>
        <div className="flex gap-6 md:gap-12 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
           <a href="#" className="hover:text-white transition-colors">Privacy</a>
           <a href="#" className="hover:text-white transition-colors">Terms</a>
           <a href="#" className="hover:text-white transition-colors">Security</a>
        </div>
        <p className="text-[8px] md:text-[9px] font-bold text-white/10 uppercase tracking-[0.3em]">© 2026 AlphaScreen. Disrupting Cinema.</p>
      </footer>
    </main>
  );
}
