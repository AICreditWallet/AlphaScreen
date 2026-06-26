"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Film, Sparkles, ShieldCheck, Zap, 
  ArrowRight, X, Mail, Loader2, ChevronRight
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
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleJoinWaitlist = async (e: React.FormEvent, type?: "short" | "full") => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, production_interest: type || projectType }]);
      
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("Waitlist Error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const Navbar = () => (
    <nav className="fixed top-0 w-full z-[200] px-8 md:px-16 h-24 flex items-center justify-between bg-black/40 backdrop-blur-xl pointer-events-auto border-b border-white/5">
      <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setView("landing")}>
        <div className="relative">
          <img src="/logo.png" alt="AlphaScreen" className="w-12 h-12 object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform" />
          <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full scale-50 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-black tracking-tighter uppercase italic leading-none text-white">AlphaScreen</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 mt-1">AI Autonomous Movie Generator</span>
        </div>
      </div>
      
      <div className="flex items-center gap-12">
        <div className="hidden lg:flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.2em] text-white/40">
          <a href="#vision" className="hover:text-white transition-colors" onClick={() => { setView("landing"); setTimeout(() => document.getElementById('vision-video')?.scrollIntoView({behavior:'smooth'}), 100) }}>The Vision</a>
          <a href="#technology" className="hover:text-white transition-colors">Infrastructure</a>
        </div>
        <button 
          onClick={() => setView(view === "studio" ? "landing" : "pricing")}
          className="bg-white text-black px-10 py-3.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all transform active:scale-95 shadow-2xl"
        >
          {view === "studio" ? "Exit Engine" : "Enter Studio"}
        </button>
      </div>
    </nav>
  );

  const LandingView = () => (
    <div className="relative min-h-screen flex flex-col items-center justify-start cinema-bg pt-56 pb-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <video 
          src="/jax-trailer.mov" 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-20 grayscale scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-12"
      >

        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">The Future of Cinema</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter uppercase italic leading-[0.9] text-gradient">
            Cinema <br />
            <span className="text-accent not-italic">Reimagined.</span>
          </h1>
        </div>
        
        <p className="text-white/40 text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed tracking-tight">
          Now anyone can create a 2-hour Hollywood-style movie with just a text prompt. Keep your characters exactly the same, with no million-dollar budget required.
        </p>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-10 rounded-sm border-emerald-500/20 bg-emerald-500/5 text-center space-y-4 max-w-md mx-auto"
          >
            <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-2xl font-black uppercase italic text-white">Entry Validated</h3>
              <p className="text-white/40 text-sm font-medium uppercase tracking-widest">We will contact you for your first production briefing.</p>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <form id="hero-apply" onSubmit={(e) => handleJoinWaitlist(e)} className="relative max-w-xl mx-auto w-full group">
              <div className="flex flex-col md:flex-row gap-3 p-1.5 glass-card rounded-full overflow-hidden focus-within:border-white/20 transition-colors">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email"
                  className="flex-1 bg-transparent py-4 px-8 text-sm font-medium focus:outline-none placeholder:text-white/20 text-white"
                />
                <button 
                  disabled={loading}
                  className="bg-white text-black px-12 py-4 rounded-full font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:bg-accent hover:text-white disabled:opacity-50 active:scale-95 shadow-xl"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Apply Now"}
                </button>
              </div>
            </form>
            <p className="text-[11px] text-white/30 uppercase font-black tracking-[0.3em] animate-pulse">Get early access to the world’s most advanced AI movie generator. Limited 2026 slots available.</p>
          </div>
        )}
        
        <div className="pt-24 pb-12">
          <button 
            onClick={() => document.getElementById('vision-video')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex flex-col items-center gap-4 mx-auto transition-all"
          >
            <span className="text-white/40 group-hover:text-white text-[11px] font-black uppercase tracking-[0.5em] transition-colors">The Vision</span>
            <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent group-hover:from-accent transition-colors" />
          </button>
        </div>
      </motion.div>

      {/* Vision Modal Overlay */}
      <AnimatePresence>
        {showVision && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black flex items-center justify-center"
          >
            <button 
              onClick={() => setShowVision(false)}
              className="absolute top-10 right-10 z-[310] text-white/40 hover:text-white transition-colors glass-card p-3 rounded-full"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
               <video 
                src="/jax-trailer.mov" 
                autoPlay 
                controls 
                className="w-full h-full max-h-[90vh] object-contain shadow-[0_0_100px_rgba(229,9,20,0.1)]"
               />
               <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature Highlight Section */}
      <section id="vision-video" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-40">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">The Death of the <span className="text-accent">Blockbuster Budget</span></h2>
          <p className="text-white/30 text-lg uppercase tracking-[0.3em] font-bold">120 Minutes. 1,500 Shots. Zero Humans.</p>
        </div>
        
        <div 
          onClick={() => setShowVision(true)}
          className="relative group cursor-pointer rounded-sm overflow-hidden shadow-2xl border border-white/5"
        >
          <div className="aspect-video relative overflow-hidden">
             <img src="https://sc02.alicdn.com/kf/Ae09d0a85b5a5472bbff9c110e7559606c.png" className="w-full h-full object-cover opacity-60 grayscale group-hover:scale-105 transition-transform duration-1000" alt="Vision" />
             <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
             
             <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  <Play className="w-10 h-10 fill-current ml-1" />
                </div>
                <div className="text-center">
                  <span className="text-xs font-black uppercase tracking-[0.5em] text-white">Play Reveal</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Core Infrastructure Grid */}
      <section id="technology" className="relative z-10 max-w-7xl mx-auto px-8 pb-40 grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="space-y-8 p-12 glass-card rounded-sm group hover:border-accent/40 transition-colors">
          <div className="w-16 h-16 bg-accent flex items-center justify-center rounded-sm rotate-12 group-hover:rotate-0 transition-transform shadow-[0_0_20px_#E50914]">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Orchestrated Power</h3>
            <p className="text-white/30 text-base leading-relaxed font-medium">1,500+ cinematic shots generated in parallel across a serverless GPU cluster. Turn scripts into films in 72 hours.</p>
          </div>
        </div>
        
        <div className="space-y-8 p-12 glass-card rounded-sm group hover:border-accent/40 transition-colors">
          <div className="w-16 h-16 bg-accent flex items-center justify-center rounded-sm rotate-12 group-hover:rotate-0 transition-transform shadow-[0_0_20px_#E50914]">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Identity Lock</h3>
            <p className="text-white/30 text-base leading-relaxed font-medium">Proprietary facial geometry and vocal DNA locking ensures character consistency for the full theatrical duration.</p>
          </div>
        </div>

        <div className="space-y-8 p-12 glass-card rounded-sm group hover:border-accent/40 transition-colors">
          <div className="w-16 h-16 bg-accent flex items-center justify-center rounded-sm rotate-12 group-hover:rotate-0 transition-transform shadow-[0_0_20px_#E50914]">
            <Film className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Theatrical Grade</h3>
            <p className="text-white/30 text-base leading-relaxed font-medium">Native 4K anamorphic rendering with automated cinematic color grading and Dolby Atmos soundscapes.</p>
          </div>
        </div>
      </section>
    </div>
  );

  const PricingView = () => (
    <div className="min-h-screen pt-48 px-12 pb-20 space-y-24 cinema-bg">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">Choose Your <span className="text-accent">Production</span></h2>
        <p className="text-white/40 text-xl font-medium tracking-tight leading-relaxed">Select the scale of your story to enter the autonomous studio.</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Short Film */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="glass-card p-12 rounded-sm space-y-10 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Professional Tier</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white">Short Epic</h3>
              <p className="text-white/30 text-lg leading-relaxed font-medium">30 minutes of high-fidelity cinematic video. Perfect for independent pilots and proof-of-concepts.</p>
            </div>
            <div className="space-y-4 pt-6">
              {["400+ 4K Cinematic Shots", "Elite Identity Locking", "Dedicated Render Worker", "Dolby Atmos Sync"].map(f => (
                <div key={f} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.1em] text-white/60">
                  <ChevronRight className="w-4 h-4 text-accent" /> {f}
                </div>
              ))}
            </div>
          </div>
          <div className="pt-10 border-t border-white/5">
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-black text-white">$2,599</span>
              <span className="text-xs font-bold text-white/20 uppercase tracking-widest">/ Per Production</span>
            </div>
            <button 
              onClick={() => { setProjectType("short"); setView("landing"); setTimeout(() => document.getElementById('hero-apply')?.scrollIntoView({behavior:'smooth'}), 100) }}
              className="w-full bg-white text-black py-5 rounded-full font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all shadow-xl"
            >
              Apply for Production
            </button>
          </div>
        </motion.div>

        {/* Feature Film */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="glass-card p-12 rounded-sm border-accent/40 bg-accent/[0.02] space-y-10 flex flex-col justify-between relative overflow-hidden shadow-[0_0_50px_rgba(229,9,20,0.05)]"
        >
          <div className="absolute top-0 right-0 bg-accent text-white px-8 py-2 text-[10px] font-black uppercase tracking-[0.2em] -rotate-45 translate-x-10 translate-y-6 shadow-2xl">Standard</div>
          <div className="space-y-6">
             <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full">
              <span className="text-[9px] font-black uppercase tracking-widest text-accent">Feature Tier</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white">The Masterpiece</h3>
              <p className="text-white/30 text-lg leading-relaxed font-medium">Full 120-minute theatrical production. Autonomous editing and global distribution-ready export.</p>
            </div>
            <div className="space-y-4 pt-6">
              {["1,500+ Cinema-Grade Shots", "Full Narrative Continuity Bible", "Priority Multi-GPU Rendering", "Theatrical Mastering"].map(f => (
                <div key={f} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.1em] text-white/60">
                  <ChevronRight className="w-4 h-4 text-accent" /> {f}
                </div>
              ))}
            </div>
          </div>
          <div className="pt-10 border-t border-white/5">
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-black text-white">$8,999</span>
              <span className="text-xs font-bold text-white/20 uppercase tracking-widest">/ Per Production</span>
            </div>
            <button 
              onClick={() => { setProjectType("full"); setView("landing"); setTimeout(() => document.getElementById('hero-apply')?.scrollIntoView({behavior:'smooth'}), 100) }}
              className="w-full bg-accent text-white py-5 rounded-full font-black uppercase tracking-widest hover:bg-accent-hover transition-all shadow-[0_0_30px_rgba(229,9,20,0.3)]"
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
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-16">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
             <span className="text-[11px] font-black uppercase text-white/40 tracking-[0.3em]">Live Session: {projectType === "full" ? "Masterpiece" : "Short Epic"}</span>
          </div>
          <h2 className="text-5xl font-black tracking-tighter uppercase italic text-white leading-none">Autonomous <span className="text-accent">Studio</span></h2>
        </div>
        
        <div className="glass-card px-8 py-4 rounded-full flex items-center gap-4">
           <Zap className="w-5 h-5 text-accent" />
           <span className="text-xs font-black uppercase tracking-[0.2em] text-white">Engine Ready</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-24">
        <section id="editor" className="glass-panel p-1 rounded-sm overflow-hidden shadow-2xl">
          <ScriptEditor onShotsGenerated={setShots} />
        </section>

        <AnimatePresence>
          {shots.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-32">
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
        {view === "landing" && <motion.div key="landing" exit={{ opacity: 0 }} transition={{duration: 0.5}}><LandingView /></motion.div>}
        {view === "pricing" && <motion.div key="pricing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><PricingView /></motion.div>}
        {view === "studio" && <motion.div key="studio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><StudioView /></motion.div>}
      </AnimatePresence>

      <footer className="py-20 px-12 flex flex-col md:flex-row items-center justify-between gap-12 border-t border-white/5 bg-black z-50 relative">
        <div className="flex items-center gap-4 group cursor-pointer">
          <img src="/logo.png" className="w-8 h-8 object-contain" />
          <div className="flex flex-col">
            <span className="text-sm font-black uppercase tracking-tighter text-white">AlphaScreen PRO</span>
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Autonomous Studio v1.0</span>
          </div>
        </div>
        <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
           <a href="#" className="hover:text-white transition-colors">Privacy</a>
           <a href="#" className="hover:text-white transition-colors">Terms</a>
           <a href="#" className="hover:text-white transition-colors">Security</a>
        </div>
        <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest">© 2026 AlphaScreen. Disrupting Cinema.</p>
      </footer>
    </main>
  );
}
