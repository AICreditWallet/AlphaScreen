"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Film, Sparkles, ShieldCheck, Zap, 
  ArrowRight, CreditCard, ChevronRight, X, 
  LayoutDashboard, History, UserCircle
} from "lucide-react";
import { useState } from "react";
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

  // --- SUB-COMPONENTS ---

  const Navbar = () => (
    <nav className="fixed top-0 w-full z-[100] px-12 py-8 flex items-center justify-between pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-auto cursor-pointer" onClick={() => setView("landing")}>
        <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-sm rotate-12 shadow-[0_0_20px_#E50914]">
          <Film className="w-6 h-6 text-white -rotate-12" />
        </div>
        <span className="text-2xl font-black tracking-tighter uppercase italic">AlphaScreen</span>
      </div>
      
      <div className="flex items-center gap-8 pointer-events-auto">
        {view === "landing" && (
          <div className="hidden md:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mr-8">
            <a href="#" className="hover:text-white transition-colors">Technology</a>
            <a href="#" className="hover:text-white transition-colors">Vision</a>
          </div>
        )}
        <button 
          onClick={() => setView(view === "studio" ? "landing" : "pricing")}
          className="glass-card px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
        >
          {view === "studio" ? "Exit Studio" : "Launch Studio"}
        </button>
      </div>
    </nav>
  );

  // --- VIEWS ---

  const LandingView = () => (
    <div className="relative min-h-screen flex flex-col items-center justify-center cinema-bg">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop')] bg-cover bg-center opacity-10 grayscale" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center space-y-8 px-6"
      >
        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-3 h-3 text-accent" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">The Netflix Disruptor</span>
        </div>
        
        <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase italic leading-[0.8] text-gradient">
          Cinema <br />
          <span className="text-accent italic">Autonomous.</span>
        </h1>
        
        <p className="text-white/40 text-lg md:text-xl max-w-xl mx-auto font-medium">
          The first AI engine capable of generating full-length Hollywood feature films from a single script.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-10">
          <button 
            onClick={() => setView("pricing")}
            className="bg-accent hover:bg-accent-hover text-white px-12 py-5 rounded-sm font-black uppercase tracking-[0.2em] flex items-center gap-4 transition-all shadow-[0_0_40px_rgba(229,9,20,0.3)] hover:scale-105"
          >
            Start Your Epic <ArrowRight className="w-5 h-5" />
          </button>
          <button className="glass-card px-12 py-5 rounded-sm font-black uppercase tracking-[0.2em] flex items-center gap-4 hover:bg-white/5 transition-all">
            Watch Vision
          </button>
        </div>
      </motion.div>
    </div>
  );

  const PricingView = () => (
    <div className="min-h-screen pt-40 px-12 pb-20 space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-black uppercase tracking-tighter">Choose Your <span className="text-accent">Production</span></h2>
        <p className="text-white/40 font-medium">Select the scale of your story to enter the studio.</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Short Film */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="glass-card p-10 rounded-sm space-y-8 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">Studio Entry</span>
            <h3 className="text-3xl font-black uppercase italic">Short Epic</h3>
            <p className="text-white/40 text-sm">Up to 30 minutes of high-fidelity cinematic video. Perfect for pilots, shorts, and proof-of-concepts.</p>
            <div className="space-y-3 pt-4">
              {["400+ 4K Shots", "Identity Lock V1", "Standard Render Queue", "Dolby Digital Sync"].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs font-bold uppercase tracking-tight text-white/60">
                  <ChevronRight className="w-3 h-3 text-accent" /> {f}
                </div>
              ))}
            </div>
          </div>
          <div className="pt-8 border-t border-white/5">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-black">$499</span>
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">/ Per Movie</span>
            </div>
            <button 
              onClick={() => { setProjectType("short"); setView("studio"); }}
              className="w-full bg-white text-black py-4 rounded-sm font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all"
            >
              Enter Studio
            </button>
          </div>
        </motion.div>

        {/* Feature Film */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="glass-card p-10 rounded-sm border-accent/30 bg-accent/[0.02] space-y-8 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 text-[8px] font-black uppercase tracking-widest -rotate-45 translate-x-4 translate-y-2">Hollywood Standard</div>
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">Feature Scale</span>
            <h3 className="text-3xl font-black uppercase italic">The Masterpiece</h3>
            <p className="text-white/40 text-sm">Full 2-hour feature length production. Unlimited shots, autonomous editing, and theatrical 4K export.</p>
            <div className="space-y-3 pt-4">
              {["1,500+ 4K Shots", "Full Narrative World Bible", "Priority GPU Render", "Global Distribution Export"].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs font-bold uppercase tracking-tight text-white/60">
                  <ChevronRight className="w-3 h-3 text-accent" /> {f}
                </div>
              ))}
            </div>
          </div>
          <div className="pt-8 border-t border-white/5">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-black">$1,999</span>
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">/ Per Movie</span>
            </div>
            <button 
              onClick={() => { setProjectType("full"); setView("studio"); }}
              className="w-full bg-accent text-white py-4 rounded-sm font-black uppercase tracking-widest hover:bg-accent-hover transition-all shadow-[0_0_20px_rgba(229,9,20,0.3)]"
            >
              Start Production
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const StudioView = () => (
    <div className="min-h-screen pt-32 px-8 pb-32">
      {/* Studio Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-12">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">Live Session: {projectType === "full" ? "Masterpiece" : "Short Epic"}</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter uppercase italic">Autonomous <span className="text-accent">Studio</span></h2>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="glass-card px-4 py-2 rounded-sm flex items-center gap-3">
             <CreditCard className="w-4 h-4 text-accent" />
             <span className="text-[10px] font-black uppercase tracking-widest">Credits: Unlimited</span>
          </div>
        </div>
      </div>

      <div className="space-y-20">
        <section id="editor" className="glass-panel rounded-sm">
          <ScriptEditor onShotsGenerated={setShots} />
        </section>

        <AnimatePresence>
          {shots.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-20">
              <section id="timeline">
                <DirectorTimeline shots={shots} />
              </section>
              <section id="render">
                <RenderStudio shots={shots} />
              </section>
              <section id="bible">
                <WorldBibleView />
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        <section id="actors">
          <ActorStudio />
        </section>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-white selection:bg-accent overflow-x-hidden">
      <Navbar />
      <AnimatePresence mode="wait">
        {view === "landing" && <motion.div key="landing" exit={{ opacity: 0, y: -20 }}><LandingView /></motion.div>}
        {view === "pricing" && <motion.div key="pricing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><PricingView /></motion.div>}
        {view === "studio" && <motion.div key="studio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><StudioView /></motion.div>}
      </AnimatePresence>

      <footer className="py-12 px-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 bg-black z-50 relative">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-accent" />
          <span className="text-xs font-black uppercase tracking-tighter">AlphaScreen PRO v1.0</span>
        </div>
        <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest text-white/20">
           <a href="#">Privacy</a>
           <a href="#">Terms of Production</a>
           <a href="#">Security</a>
        </div>
        <p className="text-[9px] font-bold text-white/10 uppercase tracking-widest">© 2026 AlphaScreen. Disrupting Cinema.</p>
      </footer>
    </main>
  );
}
