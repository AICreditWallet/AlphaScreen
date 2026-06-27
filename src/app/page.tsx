
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Film, Sparkles, ShieldCheck, Zap, 
  ArrowRight, X, Mail, Loader2, ChevronRight,
  Maximize2, ChevronLeft, Volume2, VolumeX
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
  const [isMuted, setIsMuted] = useState(true);
  
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
      alert("Validation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const Navbar = () => (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-[200] flex items-center justify-between px-10 h-24 bg-black/40 backdrop-blur-3xl rounded-full border border-white/10 pointer-events-auto shadow-2xl">
      <div className="flex items-center gap-8 cursor-pointer relative z-10" onClick={() => setView("landing")}>
        <div className="relative group">
          <img src="/logo.png" alt="AlphaScreen" className="h-16 w-16 object-contain filter brightness-125 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full scale-50 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="h-10 w-px bg-white/10" />
        <div className="flex flex-col justify-center text-left">
          <span className="text-2xl font-black tracking-tighter uppercase italic text-white leading-none">AlphaScreen</span>
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 mt-1.5">AI Autonomous Movie Generator</span>
        </div>
      </div>
      
      <div className="flex items-center gap-8 relative z-10">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-4 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all hover:bg-white/10 hover:scale-110 active:scale-95"
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
        <button 
          onClick={() => setView(view === "studio" ? "landing" : "pricing")}
          className="bg-white text-black px-10 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all transform active:scale-95 shadow-2xl"
        >
          {view === "studio" ? "Exit" : "Enter Studio"}
        </button>
      </div>
    </nav>
  );

  const Carousel = () => (
    <div className="relative w-full h-[750px] flex items-center justify-center perspective-2000 overflow-visible mt-12">
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
                if (info.offset.x > 80 && currentIndex > 0) setCurrentIndex(currentIndex - 1);
                if (info.offset.x < -80 && currentIndex < carouselItems.length - 1) setCurrentIndex(currentIndex + 1);
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: absPosition === 0 ? 1 : absPosition === 1 ? 0.6 : 0.1,
                scale: isCenter ? 1 : 0.85,
                x: position * 500,
                rotateY: position * -35,
                z: absPosition * -250,
                zIndex: 50 - absPosition
              }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="absolute w-[550px] aspect-[4/5] glass-panel rounded-[3.5rem] overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing border border-white/20 select-none"
              onClick={() => setCurrentIndex(index)}
            >
              <div className="relative h-full flex flex-col pointer-events-none">
                <div className="flex-1 relative overflow-hidden bg-black/40">
                  <video 
                    src={item.video} 
                    autoPlay 
                    muted={isMuted || !isCenter}
                    loop 
                    playsInline 
                    className={`w-full h-full object-cover transition-opacity duration-1000 ${isCenter ? 'opacity-100' : 'opacity-20 grayscale'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
                </div>

                <div className="p-12 bg-black/60 backdrop-blur-3xl border-t border-white/10 space-y-6">
                  <div className="flex items-center justify-between text-left">
                    <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white leading-none">{item.title}</h3>
                  </div>
                  <p className="text-white/60 text-lg font-medium leading-relaxed italic border-l-2 border-accent pl-6 text-left line-clamp-2">
                    "{item.description}"
                  </p>
                  <div className="flex gap-4 pt-2 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
                    <span className="flex items-center gap-2"><Zap className="w-3 h-3" /> AI Neural Render</span>
                    <span className="flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> Identity Locked</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <div className="absolute bottom-[-120px] flex gap-5">
        {carouselItems.map((_, i) => (
          <button key={i} onClick={() => setCurrentIndex(i)} className={`h-2 rounded-full transition-all duration-700 ${i === currentIndex ? 'w-16 bg-accent shadow-[0_0_20px_#E50914]' : 'w-6 bg-white/10'}`} />
        ))}
      </div>
    </div>
  );

  const LandingView = () => (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-40 cinema-bg">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(229,9,20,0.12)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-black" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] px-8 flex flex-col items-center space-y-40">
        <Carousel />
        <div className="max-w-5xl text-center space-y-16">
          <div className="space-y-8">
            <h1 className="text-7xl md:text-[8rem] font-black tracking-tighter uppercase italic leading-[0.85] text-white">
              Cinema <br /><span className="text-accent not-italic">Reimagined.</span>
            </h1>
            <p className="text-white/40 text-2xl md:text-3xl max-w-4xl mx-auto font-medium leading-relaxed tracking-tight">
              Direct high-fidelity, consistent 2-hour movies from a single script. The world's first autonomous cinematic engine.
            </p>
          </div>

          {submitted ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-panel px-20 py-10 rounded-full inline-flex items-center gap-8 border-emerald-500/20 bg-emerald-500/5">
               <ShieldCheck className="w-10 h-10 text-emerald-500" />
               <div className="flex flex-col text-left">
                  <span className="text-xl font-black uppercase italic tracking-widest text-white">Entry Validated</span>
                  <span className="text-[10px] font-bold uppercase text-white/40 tracking-[0.3em]">Priority production briefing scheduled.</span>
               </div>
            </motion.div>
          ) : (
            <form onSubmit={handleJoinWaitlist} className="relative max-w-3xl mx-auto w-full group">
              <div className="flex flex-col md:flex-row gap-5 p-3 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 shadow-2xl focus-within:border-accent/50 transition-all duration-700">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your professional email" className="flex-1 bg-transparent py-6 px-12 text-lg font-medium focus:outline-none placeholder:text-white/10 text-white" />
                <button disabled={loading} className="bg-white text-black px-16 py-6 rounded-full font-black uppercase tracking-[0.25em] transition-all hover:bg-accent hover:text-white disabled:opacity-50">
                  {loading ? <Loader2 className="w-7 h-7 animate-spin" /> : "Apply Access"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  const PricingView = () => (
    <div className="min-h-screen pt-48 px-12 pb-20 space-y-24 cinema-bg relative text-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />
      <div className="relative z-10 text-center space-y-10 max-w-5xl mx-auto">
        <h2 className="text-7xl md:text-[6rem] font-black uppercase tracking-tighter text-white leading-none">Choose Your <span className="text-accent italic">Scale.</span></h2>
        <p className="text-white/40 text-2xl font-medium tracking-tight leading-relaxed max-w-3xl mx-auto">Select your production tier to enter the autonomous environment.</p>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        {[
          { title: "Short Epic", price: "$2,599", desc: "30 minutes of high-fidelity cinematic video.", features: ["400+ 4K Shots", "Elite Identity Lock", "Render Cluster", "Atmos Mastering"], type: "short" },
          { title: "Masterpiece", price: "$8,999", desc: "Full 120-minute theatrical production.", features: ["1,500+ Shots", "Full Narrative Bible", "Priority H100 GPUs", "8K Delivery"], type: "full", best: true }
        ].map(tier => (
          <motion.div key={tier.title} whileHover={{ y: -20, scale: 1.02 }} className={`glass-panel p-20 rounded-[4rem] flex flex-col justify-between border-white/20 hover:border-white/40 transition-all duration-700 shadow-2xl ${tier.best ? 'border-accent/40 bg-accent/[0.03]' : ''}`}>
            <div className="space-y-10 text-left">
              <h3 className="text-6xl font-black uppercase italic tracking-tighter text-white">{tier.title}</h3>
              <p className="text-white/40 text-xl leading-relaxed font-medium">{tier.desc}</p>
              <div className="grid grid-cols-1 gap-6 pt-10">
                {tier.features.map(f => (
                  <div key={f} className="flex items-center gap-5 text-sm font-black uppercase tracking-widest text-white/70">
                    <div className="w-2 h-2 rounded-full bg-accent" /> {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-16 border-t border-white/10 text-left">
              <span className="text-7xl font-black text-white mb-10 block">{tier.price}</span>
              <button onClick={() => { setProjectType(tier.type as any); setView("landing"); }} className={`w-full ${tier.best ? 'bg-accent text-white hover:bg-accent-hover' : 'bg-white text-black hover:bg-accent hover:text-white'} py-8 rounded-full font-black uppercase tracking-[0.3em] transition-all transform active:scale-95 shadow-2xl text-sm`}>
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
        <div className="space-y-4">
          <div className="flex items-center gap-5">
             <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_20px_#10b981]" />
             <span className="text-sm font-black uppercase text-white/40 tracking-[0.5em]">Live Session: {projectType === "full" ? "Masterpiece" : "Short Epic"}</span>
          </div>
          <h2 className="text-7xl font-black tracking-tighter uppercase italic text-white leading-none">Studio <span className="text-accent italic">Environment.</span></h2>
        </div>
        <div className="glass-panel px-12 py-6 rounded-full flex items-center gap-8 shadow-2xl border-white/10">
           <Zap className="w-6 h-6 text-accent" />
           <span className="text-base font-black uppercase tracking-[0.4em] text-white">Engine Ready</span>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto space-y-40 text-left">
        <section className="glass-panel p-1 rounded-[4rem] overflow-hidden shadow-2xl border-white/10">
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
        {view === "landing" && <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 1}}><LandingView /></motion.div>}
        {view === "pricing" && <motion.div key="pricing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.8}}><PricingView /></motion.div>}
        {view === "studio" && <motion.div key="studio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.8}}><StudioView /></motion.div>}
      </AnimatePresence>
      <footer className="py-32 px-20 flex flex-col md:flex-row items-center justify-between gap-20 border-t border-white/5 bg-black z-50 relative text-left">
        <div className="flex items-center gap-8 group cursor-pointer">
          <img src="/logo.png" className="h-16 w-16 object-contain filter brightness-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
          <div className="flex flex-col">
            <span className="text-2xl font-black uppercase tracking-tighter text-white italic leading-none">AlphaScreen PRO</span>
            <span className="text-xs font-bold text-white/20 uppercase tracking-[0.4em] mt-2">Autonomous Studio v1.0</span>
          </div>
        </div>
        <p className="text-xs font-bold text-white/10 uppercase tracking-[0.4em]">© 2026 AlphaScreen. Built for visionaries.</p>
      </footer>
    </main>
  );
}