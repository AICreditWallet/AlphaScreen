"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Film, Sparkles, ShieldCheck, Zap, 
  ArrowRight, X, Mail, Loader2, ChevronRight,
  Maximize2, ChevronLeft, Search, Plus, Share2, MoreHorizontal
} from "lucide-react";
import { useState } from "react";
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
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const carouselItems = [
    { id: 1, title: "The Void Arrival", description: "Scene 01: Deep Space Exploration", video: "/1.mov", date: "June 2026" },
    { id: 2, title: "Identity Lock", description: "Scene 42: Desert Persistence", video: "/2.mov", date: "June 2026" },
    { id: 3, title: "Physical Peak", description: "Scene 89: Industrial Strength", video: "/3.mov", date: "June 2026" },
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
    } finally {
      setLoading(false);
    }
  };

  const Navbar = () => (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-[200] flex items-center justify-between px-8 h-20 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 pointer-events-auto shadow-2xl overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="flex items-center gap-6 cursor-pointer relative z-10" onClick={() => setView("landing")}>
        <img src="/logo.png" alt="AlphaScreen" className="h-14 w-14 object-contain filter brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
        <div className="h-6 w-px bg-white/10" />
        <div className="flex flex-col">
          <span className="text-xl font-black tracking-tighter uppercase italic text-white leading-none">AlphaScreen</span>
          <span className="text-[7px] font-black uppercase tracking-[0.4em] text-white/40 mt-1">Autonomous Studio</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6 relative z-10">
        <button 
          onClick={() => setView(view === "studio" ? "landing" : "pricing")}
          className="bg-white text-black px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.15em] hover:bg-accent hover:text-white transition-all transform active:scale-95 shadow-xl"
        >
          {view === "studio" ? "Exit" : "Enter Studio"}
        </button>
      </div>
    </nav>
  );

  const Carousel = () => {
    return (
      <div className="relative w-full h-[700px] flex items-center justify-center perspective-2000 overflow-visible mt-20">
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
                  if (info.offset.x > 100 && currentIndex > 0) setCurrentIndex(index - 1);
                  if (info.offset.x < -100 && currentIndex < carouselItems.length - 1) setCurrentIndex(index + 1);
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: absPosition === 0 ? 1 : absPosition === 1 ? 0.6 : 0.2,
                  scale: isCenter ? 1 : 0.85,
                  x: position * 450,
                  rotateY: position * -30,
                  z: absPosition * -200,
                  zIndex: 50 - absPosition
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute w-[500px] aspect-[4/5] glass-panel rounded-[2.5rem] overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing border border-white/20"
                onClick={() => setCurrentIndex(index)}
              >
                <div className="relative h-full flex flex-col">
                  <div className="flex-1 relative overflow-hidden bg-black/40">
                    <video 
                      src={item.video} 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className={`w-full h-full object-cover transition-opacity duration-700 ${isCenter ? 'opacity-100' : 'opacity-40 grayscale'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
                  </div>

                  <div className="p-10 bg-black/40 backdrop-blur-3xl border-t border-white/10 space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white">{item.title}</h3>
                      <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                        <span className="text-[9px] font-black text-white/40 uppercase">Scene {item.id * 12}</span>
                      </div>
                    </div>
                    <p className="text-white/60 text-base font-medium leading-relaxed italic border-l-2 border-accent pl-4">
                      "{item.description}"
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        <div className="absolute bottom-[-100px] flex gap-4">
          {carouselItems.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-700 ${i === currentIndex ? 'w-12 bg-accent shadow-[0_0_15px_#E50914]' : 'w-6 bg-white/10'}`} 
            />
          ))}
        </div>
      </div>
    );
  };

  const LandingView = () => (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-40 cinema-bg">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(229,9,20,0.1)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-8 flex flex-col items-center space-y-32">
        <div className="w-full">
          <Carousel />
        </div>

        <div className="max-w-4xl text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-[6rem] font-black tracking-tighter uppercase italic leading-[0.85] text-white">
              Cinema <br />
              <span className="text-accent not-italic">Reimagined.</span>
            </h1>
            <p className="text-white/40 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed tracking-tight">
              Direct high-fidelity, consistent 2-hour movies from a single script. The world's first autonomous cinematic engine.
            </p>
          </div>

          {submitted ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-panel px-16 py-8 rounded-full inline-flex items-center gap-6 border-emerald-500/20 bg-emerald-500/5 shadow-2xl">
               <ShieldCheck className="w-8 h-8 text-emerald-500" />
               <div className="flex flex-col text-left">
                  <span className="text-base font-black uppercase italic tracking-widest text-white">Entry Validated</span>
                  <span className="text-[10px] font-bold uppercase text-white/40 tracking-[0.2em]">Priority production slot secured for 2026.</span>
               </div>
            </motion.div>
          ) : (
            <div className="space-y-10">
              <form onSubmit={handleJoinWaitlist} className="relative max-w-2xl mx-auto w-full group">
                <div className="flex flex-col md:flex-row gap-4 p-2.5 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 shadow-2xl focus-within:border-accent/40 transition-all duration-500 group-hover:border-white/20">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Professional Email"
                    className="flex-1 bg-transparent py-5 px-10 text-base font-medium focus:outline-none placeholder:text-white/10 text-white"
                  />
                  <button 
                    disabled={loading}
                    className="bg-white text-black px-14 py-5 rounded-full font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:bg-accent hover:text-white disabled:opacity-50 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Apply Access"}
                  </button>
                </div>
              </form>
              <div className="flex flex-wrap items-center justify-center gap-12 opacity-30">
                <div className="flex items-center gap-3"><Zap className="w-4 h-4" /><span className="text-[11px] font-black uppercase tracking-[0.3em]">72h Feature Render</span></div>
                <div className="flex items-center gap-3"><ShieldCheck className="w-4 h-4" /><span className="text-[11px] font-black uppercase tracking-[0.3em]">Identity Lock v3</span></div>
                <div className="flex items-center gap-3"><Sparkles className="w-4 h-4" /><span className="text-[11px] font-black uppercase tracking-[0.3em]">8K Master Export</span></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed left-16 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-10 p-5 glass rounded-full shadow-2xl hidden 2xl:flex scale-110">
         <button className="p-3.5 hover:bg-white/10 rounded-full transition-all text-white/20 hover:text-accent transform hover:scale-110"><Film className="w-6 h-6" /></button>
         <button className="p-3.5 hover:bg-white/10 rounded-full transition-all text-white/20 hover:text-accent transform hover:scale-110"><ShieldCheck className="w-6 h-6" /></button>
         <button className="p-3.5 hover:bg-white/10 rounded-full transition-all text-white/20 hover:text-accent transform hover:scale-110"><Zap className="w-6 h-6" /></button>
      </div>
    </div>
  );

  const PricingView = () => (
    <div className="min-h-screen pt-48 px-12 pb-20 space-y-24 cinema-bg relative">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />
      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
        <h2 className="text-6xl md:text-[5rem] font-black uppercase tracking-tighter text-white leading-none">Choose Your <span className="text-accent italic">Scale.</span></h2>
        <p className="text-white/40 text-xl font-medium tracking-tight leading-relaxed max-w-2xl mx-auto">Select your production tier to enter the autonomous environment.</p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div whileHover={{ y: -15, scale: 1.02 }} className="glass-panel p-16 rounded-[3rem] space-y-12 flex flex-col justify-between border-white/20 hover:border-white/40 transition-all duration-500 shadow-2xl">
          <div className="space-y-8">
            <h3 className="text-5xl font-black uppercase italic tracking-tighter text-white">Short Epic</h3>
            <p className="text-white/40 text-lg leading-relaxed font-medium">30 minutes of high-fidelity cinematic video. Built for independent pilots and proof-of-concepts.</p>
            <div className="grid grid-cols-1 gap-5 pt-8">
              {["400+ 4K Cinematic Shots", "Elite Identity Locking", "Dedicated Render Cluster", "Dolby Atmos Mastering"].map(f => (
                <div key={f} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" /> {f}
                </div>
              ))}
            </div>
          </div>
          <div className="pt-12 border-t border-white/10">
            <div className="flex items-baseline gap-3 mb-10">
              <span className="text-6xl font-black text-white">$2,599</span>
            </div>
            <button 
              onClick={() => { setProjectType("short"); setView("landing"); }}
              className="w-full bg-white text-black py-6 rounded-full font-black uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all transform active:scale-95 shadow-2xl"
            >
              Initialize Production
            </button>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -15, scale: 1.02 }} className="glass-panel p-16 rounded-[3rem] border-accent/40 bg-accent/[0.03] space-y-12 flex flex-col justify-between relative overflow-hidden shadow-[0_0_100px_rgba(229,9,20,0.1)] hover:border-accent transition-all duration-500">
          <div className="absolute top-0 right-0 bg-accent text-white px-12 py-3 text-[11px] font-black uppercase tracking-[0.4em] -rotate-45 translate-x-12 translate-y-8 shadow-2xl">Standard</div>
          <div className="space-y-8">
            <h3 className="text-5xl font-black uppercase italic tracking-tighter text-white">Masterpiece</h3>
            <p className="text-white/40 text-lg leading-relaxed font-medium">Full 120-minute theatrical production. Autonomous narrative continuity and global export.</p>
            <div className="grid grid-cols-1 gap-5 pt-8">
              {["1,500+ Cinema-Grade Shots", "Full Narrative Continuity Bible", "Priority H100 GPU Cluster", "8K Theatrical Delivery"].map(f => (
                <div key={f} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" /> {f}
                </div>
              ))}
            </div>
          </div>
          <div className="pt-12 border-t border-white/10">
            <div className="flex items-baseline gap-3 mb-10">
              <span className="text-6xl font-black text-white">$8,999</span>
            </div>
            <button 
              onClick={() => { setProjectType("full"); setView("landing"); }}
              className="w-full bg-accent text-white py-6 rounded-full font-black uppercase tracking-[0.2em] hover:bg-accent-hover transition-all transform active:scale-95 shadow-[0_0_50px_rgba(229,9,20,0.4)]"
            >
              Start Full Production
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const StudioView = () => (
    <div className="min-h-screen pt-40 px-8 pb-32">
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-16 px-4">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
             <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_#10b981]" />
             <span className="text-xs font-black uppercase text-white/40 tracking-[0.4em]">Live Session: {projectType === "full" ? "Masterpiece" : "Short Epic"}</span>
          </div>
          <h2 className="text-6xl font-black tracking-tighter uppercase italic text-white leading-none">Studio <span className="text-accent italic">Environment.</span></h2>
        </div>
        <div className="glass-panel px-10 py-5 rounded-full flex items-center gap-6 shadow-2xl border-white/10">
           <Zap className="w-6 h-6 text-accent" />
           <span className="text-sm font-black uppercase tracking-[0.3em] text-white">Engine Ready</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto space-y-32">
        <section id="editor" className="glass-panel p-1 rounded-[3rem] overflow-hidden shadow-2xl border-white/10">
          <ScriptEditor onShotsGenerated={setShots} />
        </section>
        <AnimatePresence>
          {shots.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-40">
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
        {view === "landing" && <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.8, ease: [0.22, 1, 0.36, 1]}}><LandingView /></motion.div>}
        {view === "pricing" && <motion.div key="pricing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.8}}><PricingView /></motion.div>}
        {view === "studio" && <motion.div key="studio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.8}}><StudioView /></motion.div>}
      </AnimatePresence>

      <footer className="py-24 px-16 flex flex-col md:flex-row items-center justify-between gap-16 border-t border-white/5 bg-black z-50 relative">
        <div className="flex items-center gap-6 group cursor-pointer">
          <img src="/logo.png" className="h-12 w-12 object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
          <div className="flex flex-col">
            <span className="text-lg font-black uppercase tracking-tighter text-white italic">AlphaScreen PRO</span>
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Autonomous Studio v1.0</span>
          </div>
        </div>
        <div className="flex gap-16 text-xs font-black uppercase tracking-[0.4em] text-white/20">
           <a href="#" className="hover:text-white transition-colors">Privacy</a>
           <a href="#" className="hover:text-white transition-colors">Terms</a>
           <a href="#" className="hover:text-white transition-colors">Security</a>
        </div>
        <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.2em]">© 2026 AlphaScreen. Built for visionaries.</p>
      </footer>
    </main>
  );
}
