"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Film, Sparkles, ShieldCheck, Zap, 
  ArrowRight, X, Mail, Loader2, ChevronRight,
  Maximize2, ChevronLeft, Search, Plus, Share2, MoreHorizontal
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
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
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-[200] flex items-center justify-between px-8 h-16 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 pointer-events-auto shadow-2xl">
      <div className="flex items-center gap-6 cursor-pointer group" onClick={() => setView("landing")}>
        <img src="/logo.png" alt="AlphaScreen" className="h-10 w-10 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
        <div className="h-4 w-px bg-white/10" />
        <span className="text-lg font-black tracking-tighter uppercase italic text-white/90">AlphaScreen</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
          <Search className="w-3.5 h-3.5 text-white/40" />
          <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Discover</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-full bg-white/5 border border-white/5 text-white/60 hover:text-white transition-colors">
            <Plus className="w-4 h-4" />
          </button>
          <button className="p-2.5 rounded-full bg-white/5 border border-white/5 text-white/60 hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setView(view === "studio" ? "landing" : "pricing")}
            className="ml-2 bg-white text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] hover:bg-accent hover:text-white transition-all transform active:scale-95 shadow-lg"
          >
            {view === "studio" ? "Exit" : "Enter Studio"}
          </button>
        </div>
      </div>
    </nav>
  );

  const Carousel = () => {
    return (
      <div className="relative w-full h-[600px] flex items-center justify-center perspective-1000 overflow-visible">
        <AnimatePresence mode="popLayout">
          {carouselItems.map((item, index) => {
            const isCenter = index === currentIndex;
            const isLeft = index < currentIndex;
            const isRight = index > currentIndex;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8, x: isLeft ? -300 : 300, rotateY: isLeft ? 45 : -45 }}
                animate={{ 
                  opacity: 1, 
                  scale: isCenter ? 1 : 0.8,
                  x: isCenter ? 0 : isLeft ? -350 : 350,
                  rotateY: isCenter ? 0 : isLeft ? 35 : -35,
                  z: isCenter ? 0 : -200,
                  zIndex: isCenter ? 50 : 10
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-[450px] aspect-[4/5] glass-panel rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer"
                onClick={() => setCurrentIndex(index)}
              >
                {/* Card Content */}
                <div className="relative h-full flex flex-col">
                  <div className="flex-1 relative overflow-hidden bg-black/40">
                    <video 
                      src={item.video} 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className={`w-full h-full object-cover transition-opacity duration-500 ${isCenter ? 'opacity-90' : 'opacity-40 grayscale'}`}
                    />
                    
                    {/* Card Actions */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
                      <button className="p-2.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-white hover:text-black transition-all">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2 hover:bg-white hover:text-black transition-all">
                        <Maximize2 className="w-3 h-3" /> Expand
                      </button>
                      <button className="p-2.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-white hover:text-black transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-8 bg-black/60 backdrop-blur-2xl border-t border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">{item.title}</h3>
                      <span className="text-[10px] font-bold text-white/40 uppercase">{item.date}</span>
                    </div>
                    <p className="text-white/60 text-sm font-medium leading-relaxed italic">
                      "{item.description}"
                    </p>
                    <div className="flex gap-2 pt-2 text-[8px] font-black uppercase tracking-widest text-white/20">
                      <span>Medium: AI Neural Rendering</span>
                      <span>•</span>
                      <span>Character Lock: Active</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* Navigation Dots */}
        <div className="absolute bottom-[-60px] flex gap-3">
          {carouselItems.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-8 bg-accent' : 'w-4 bg-white/10'}`} 
            />
          ))}
        </div>
      </div>
    );
  };

  const LandingView = () => (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-40">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,_rgba(229,9,20,0.15)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-black" />
        {/* Subtle blur overlay mimicking a museum/gallery */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-10 blur-3xl scale-125" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-8 flex flex-col items-center space-y-24">
        {/* Visual Proof Carousel */}
        <div className="w-full">
          <Carousel />
        </div>

        {/* Hero Message */}
        <div className="max-w-4xl text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-[5rem] font-black tracking-tighter uppercase italic leading-[0.9] text-white">
              Cinema <br />
              <span className="text-accent not-italic">Reimagined.</span>
            </h1>
            <p className="text-white/40 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed tracking-tight">
              Create high-fidelity, consistent 2-hour movies with just a script. No millions required.
            </p>
          </div>

          {/* Form / Lead Capture */}
          {submitted ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-panel px-12 py-6 rounded-full inline-flex items-center gap-4 border-emerald-500/20">
               <ShieldCheck className="w-6 h-6 text-emerald-500" />
               <span className="text-sm font-black uppercase italic tracking-widest text-white">Application Received. We'll be in touch.</span>
            </motion.div>
          ) : (
            <div className="space-y-8">
              <form onSubmit={handleJoinWaitlist} className="relative max-w-2xl mx-auto w-full">
                <div className="flex flex-col md:flex-row gap-3 p-2 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 shadow-2xl focus-within:border-accent/40 transition-colors">
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
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">120 Min Features</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Identity Lock v3</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Theatrical 4K</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Side Pill (as per sample) */}
      <div className="fixed left-12 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-6 p-4 glass rounded-full shadow-2xl hidden xl:flex">
         <button className="p-3 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"><Film className="w-5 h-5" /></button>
         <button className="p-3 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"><ShieldCheck className="w-5 h-5" /></button>
         <button className="p-3 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"><Zap className="w-5 h-5" /></button>
      </div>
    </div>
  );

  const PricingView = () => (
    <div className="min-h-screen pt-48 px-12 pb-20 space-y-24 glass-dark">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">Choose Your <span className="text-accent">Production</span></h2>
        <p className="text-white/40 text-xl font-medium tracking-tight leading-relaxed">Select the scale of your story to enter the autonomous studio.</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Short Film */}
        <motion.div whileHover={{ y: -10 }} className="glass p-12 rounded-[2rem] space-y-10 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white">Short Epic</h3>
            <p className="text-white/30 text-lg leading-relaxed font-medium">30 minutes of high-fidelity cinematic video. Perfect for pilots and proof-of-concepts.</p>
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
            </div>
            <button 
              onClick={() => { setProjectType("short"); setView("landing"); }}
              className="w-full bg-white text-black py-5 rounded-full font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all shadow-xl"
            >
              Apply for Production
            </button>
          </div>
        </motion.div>

        {/* Feature Film */}
        <motion.div whileHover={{ y: -10 }} className="glass p-12 rounded-[2rem] border-accent/40 bg-accent/[0.02] space-y-10 flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="space-y-6">
            <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white">The Masterpiece</h3>
            <p className="text-white/30 text-lg leading-relaxed font-medium">Full 120-minute theatrical production. Autonomous editing and global distribution-ready export.</p>
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
            </div>
            <button 
              onClick={() => { setProjectType("full"); setView("landing"); }}
              className="w-full bg-accent text-white py-5 rounded-full font-black uppercase tracking-widest hover:bg-accent-hover transition-all shadow-xl"
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
          <h2 className="text-5xl font-black tracking-tighter uppercase italic text-white leading-none text-gradient">Studio <span className="text-accent italic">Environment.</span></h2>
        </div>
        <div className="glass-panel px-8 py-4 rounded-full flex items-center gap-4">
           <Zap className="w-5 h-5 text-accent" />
           <span className="text-xs font-black uppercase tracking-[0.2em] text-white">Engine Ready</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto space-y-24">
        <section id="editor" className="glass-panel p-1 rounded-[2rem] overflow-hidden shadow-2xl">
          <ScriptEditor onShotsGenerated={setShots} />
        </section>
        <AnimatePresence>
          {shots.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-32">
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
        {view === "landing" && <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.5}}><LandingView /></motion.div>}
        {view === "pricing" && <motion.div key="pricing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{duration: 0.5}}><PricingView /></motion.div>}
        {view === "studio" && <motion.div key="studio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.5}}><StudioView /></motion.div>}
      </AnimatePresence>

      <footer className="py-20 px-12 flex flex-col md:flex-row items-center justify-between gap-12 border-t border-white/5 bg-black z-50 relative">
        <div className="flex items-center gap-4 group cursor-pointer">
          <img src="/logo.png" className="h-8 w-8 object-contain" />
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
