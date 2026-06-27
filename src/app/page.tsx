"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Film, Sparkles, ShieldCheck, Zap, 
  ArrowRight, X, Mail, Loader2, ChevronRight,
  Maximize2, ChevronLeft, Volume2, VolumeX
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
    { id: 2, title: "Physical Peak", description: "Scene 89: Industrial Strength", video: "/3.mov" },
    { id: 3, title: "Identity Lock", description: "Scene 42: Desert Persistence", video: "/2.mov" },
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
    <nav className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-[200] flex items-center justify-between px-6 md:px-10 h-20 md:h-24 bg-black/40 backdrop-blur-3xl rounded-full border border-white/20 pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
      <div className="flex items-center gap-4 md:gap-8 cursor-pointer relative z-10" onClick={() => setView("landing")}>
        <div className="relative group">
          <img src="/logo.png" alt="AlphaScreen" className="h-14 w-14 md:h-20 md:w-20 object-contain filter brightness-125 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-50 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="h-8 w-px bg-white/20" />
        <div className="flex flex-col justify-center text-left">
          <span className="text-lg md:text-2xl font-black tracking-tighter uppercase italic text-white leading-none">AlphaScreen</span>
          <span className="text-[7px] md:text-[11px] font-black uppercase tracking-[0.4em] text-white/90 mt-2">AI Autonomous Movie Generator</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 md:gap-8 relative z-10">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-3 md:p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-95 shadow-lg"
        >
          {isMuted ? <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-white/60" /> : <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-white" />}
        </button>
        <button 
          onClick={() => setView(view === "studio" ? "landing" : "pricing")}
          className="bg-white text-black px-6 md:px-10 py-2.5 md:py-3.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all transform active:scale-95 shadow-2xl"
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
    const cardWidth = isMobile ? winWidth * 0.9 : 750;
    const xOffset = isMobile ? cardWidth * 0.95 : 680;

    return (
      <div className="relative w-full h-[550px] md:h-[750px] flex items-center justify-center perspective-2000 overflow-visible mt-24 md:mt-12 px-4">
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
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 50 && currentIndex > 0) setCurrentIndex(currentIndex - 1);
                  if (info.offset.x < -50 && currentIndex < carouselItems.length - 1) setCurrentIndex(currentIndex + 1);
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: absPosition === 0 ? 1 : absPosition === 1 ? 0.7 : 0.1,
                  scale: isCenter ? 1 : 0.85,
                  x: position * xOffset,
                  rotateY: position * -25,
                  z: absPosition * -300,
                  zIndex: 50 - absPosition
                }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                style={{ width: cardWidth }}
                className="absolute aspect-video bg-black rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)] cursor-grab active:cursor-grabbing border-2 border-white/80 select-none"
                onClick={() => setCurrentIndex(index)}
              >
                <div className="relative h-full w-full pointer-events-none">
                  <video 
                    src={item.video} 
                    autoPlay 
                    muted={isMuted || !isCenter}
                    loop 
                    playsInline 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isCenter ? 'opacity-100' : 'opacity-20 grayscale'}`}
                  />
                  
                  {/* Subtle Gradient Overlays to protect text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />
                  
                  {/* Status Badge */}
                  {isCenter && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-6 right-6 md:top-10 md:right-10">
                       <div className="bg-accent/40 backdrop-blur-2xl border border-accent/60 px-4 py-1.5 rounded-full flex items-center gap-3 shadow-2xl">
                         <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_#E50914]" />
                         <span className="text-[10px] font-black uppercase text-white tracking-widest">Cinema Ready</span>
                       </div>
                    </motion.div>
                  )}

                  {/* High-End Information Overlay at the bottom */}
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 space-y-3 md:space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-2xl md:text-5xl font-black uppercase italic tracking-tighter text-white leading-none">{item.title}</h3>
                      <div className="flex items-center gap-3">
                         <div className="h-px w-8 md:w-12 bg-accent" />
                         <p className="text-white/90 text-sm md:text-xl font-medium tracking-tight uppercase italic">{item.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-6 pt-2 text-[8px] md:text-[12px] font-black uppercase tracking-[0.4em] text-white/40">
                      <span className="flex items-center gap-2.5"><Zap className="w-4 h-4 text-accent" /> AI Neural Render</span>
                      <span className="flex items-center gap-2.5"><ShieldCheck className="w-4 h-4 text-accent" /> Identity Locked</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* Navigation Indicator */}
        <div className="absolute bottom-[-80px] md:bottom-[-120px] flex gap-4 md:gap-6">
          {carouselItems.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentIndex(i)}
              className={`h-2 md:h-2.5 rounded-full transition-all duration-700 ${i === currentIndex ? 'w-16 md:w-24 bg-accent shadow-[0_0_30px_#E50914]' : 'w-6 md:w-10 bg-white/10'}`} 
            />
          ))}
        </div>
      </div>
    );
  };

  const LandingView = () => (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-32 md:py-40 cinema-bg">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(229,9,20,0.15)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-black" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] px-4 md:px-8 flex flex-col items-center space-y-32 md:space-y-48">
        <Carousel />
        
        <div className="max-w-6xl text-center space-y-12 md:space-y-20">
          <div className="space-y-6 md:space-y-10 px-4">
            <h1 className="text-5xl md:text-[9rem] font-black tracking-tighter uppercase italic leading-[0.85] text-white text-gradient">
              Cinema <br /><span className="text-accent not-italic">Reimagined.</span>
            </h1>
            <p className="text-white/50 text-xl md:text-4xl max-w-5xl mx-auto font-medium leading-relaxed tracking-tight">
              Direct high-fidelity, consistent 2-hour movies from a single script. The world's first autonomous cinematic engine.
            </p>
          </div>

          {submitted ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-panel px-12 md:px-20 py-8 md:py-10 rounded-full inline-flex items-center gap-6 md:gap-10 border-emerald-500/40 bg-emerald-500/5 shadow-[0_0_150px_rgba(16,185,129,0.1)]">
               <ShieldCheck className="w-10 h-10 md:w-16 md:h-16 text-emerald-500" />
               <div className="flex flex-col text-left">
                  <span className="text-xl md:text-3xl font-black uppercase italic tracking-widest text-white text-gradient leading-none">Entry Validated</span>
                  <span className="text-[10px] md:text-xs font-bold uppercase text-white/50 tracking-[0.4em] mt-2">Priority production briefing scheduled.</span>
               </div>
            </motion.div>
          ) : (
            <div className="space-y-12 md:space-y-16 px-4">
              <form onSubmit={handleJoinWaitlist} className="relative max-w-4xl mx-auto w-full group">
                <div className="flex flex-col md:flex-row gap-4 p-2.5 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] md:rounded-full border border-white/20 shadow-[0_0_150px_rgba(0,0,0,0.9)] focus-within:border-accent/60 transition-all duration-700">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Professional Email"
                    className="flex-1 bg-transparent py-5 md:py-7 px-8 md:px-14 text-lg md:text-2xl font-medium focus:outline-none placeholder:text-white/20 text-white"
                  />
                  <button 
                    disabled={loading}
                    className="bg-white text-black px-12 md:px-20 py-5 md:py-7 rounded-full font-black uppercase tracking-[0.3em] text-xs md:text-base transition-all hover:bg-accent hover:text-white disabled:opacity-50 active:scale-95 shadow-2xl"
                  >
                    {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : "Apply Access"}
                  </button>
                </div>
              </form>
              <div className="flex flex-wrap items-center justify-center gap-10 md:gap-24 opacity-40">
                <div className="flex items-center gap-3"><Zap className="w-5 h-5 md:w-7 md:h-7 text-accent" /><span className="text-xs md:text-base font-black uppercase tracking-[0.5em]">72h Render</span></div>
                <div className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 md:w-7 md:h-7 text-accent" /><span className="text-xs md:text-base font-black uppercase tracking-[0.5em]">Identity v3</span></div>
                <div className="flex items-center gap-3"><Sparkles className="w-5 h-5 md:w-7 md:h-7 text-accent" /><span className="text-xs md:text-base font-black uppercase tracking-[0.5em]">8K Master</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const PricingView = () => (
    <div className="min-h-screen pt-48 px-8 md:px-12 pb-20 space-y-24 cinema-bg relative text-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />
      <div className="relative z-10 text-center space-y-10 max-w-5xl mx-auto">
        <h2 className="text-6xl md:text-[7rem] font-black uppercase tracking-tighter text-white leading-none">Choose Your <span className="text-accent italic">Scale.</span></h2>
        <p className="text-white/40 text-xl md:text-3xl font-medium tracking-tight leading-relaxed max-w-3xl mx-auto">Select your production tier to enter the autonomous environment.</p>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 px-4">
        {[
          { title: "Short Epic", price: "$2,599", desc: "30 minutes of high-fidelity cinematic video. Built for independent pilots and proof-of-concepts.", features: ["400+ 4K Shots", "Elite Identity Lock", "Render Cluster", "Atmos Mastering"], type: "short" },
          { title: "Masterpiece", price: "$8,999", desc: "Full 120-minute theatrical production. Autonomous narrative continuity and global export.", features: ["1,500+ Shots", "Full Narrative Bible", "Priority H100 GPUs", "8K Delivery"], type: "full", best: true }
        ].map(tier => (
          <motion.div key={tier.title} whileHover={{ y: -20, scale: 1.02 }} className={`glass-panel p-10 md:p-24 rounded-[3.5rem] md:rounded-[6rem] flex flex-col justify-between border-2 border-white/20 hover:border-white/50 transition-all duration-700 shadow-2xl ${tier.best ? 'border-accent/40 bg-accent/[0.04]' : ''}`}>
            <div className="space-y-10 md:space-y-16 text-left">
              <h3 className="text-4xl md:text-8xl font-black uppercase italic tracking-tighter text-white leading-none">{tier.title}</h3>
              <p className="text-white/50 text-lg md:text-3xl leading-relaxed font-medium">{tier.desc}</p>
              <div className="grid grid-cols-1 gap-5 md:gap-8 pt-6">
                {tier.features.map(f => (
                  <div key={f} className="flex items-center gap-5 md:gap-8 text-xs md:text-xl font-black uppercase tracking-widest text-white/80">
                    <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-accent" /> {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-16 md:pt-24 border-t border-white/20 text-left">
              <span className="text-5xl md:text-[8rem] font-black text-white mb-10 md:mb-20 block leading-none">{tier.price}</span>
              <button onClick={() => { setProjectType(tier.type as any); setView("landing"); }} className={`w-full ${tier.best ? 'bg-accent text-white hover:bg-accent-hover' : 'bg-white text-black hover:bg-accent hover:text-white'} py-6 md:py-10 rounded-full font-black uppercase tracking-[0.4em] transition-all transform active:scale-95 shadow-2xl text-xs md:text-xl`}>
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
      <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between mb-24 gap-12 px-4 text-left">
        <div className="space-y-6">
          <div className="flex items-center gap-6">
             <div className="w-5 h-5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_25px_#10b981]" />
             <span className="text-base font-black uppercase text-white/40 tracking-[0.6em]">Live Session: {projectType === "full" ? "Masterpiece" : "Short Epic"}</span>
          </div>
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic text-white leading-none text-gradient">Studio <span className="text-accent italic">Environment.</span></h2>
        </div>
        <div className="glass-panel px-16 py-8 rounded-full flex items-center gap-10 shadow-[0_0_100px_rgba(229,9,20,0.2)] border-white/20">
           <Zap className="w-10 h-10 text-accent animate-pulse" />
           <span className="text-xl font-black uppercase tracking-[0.5em] text-white">Engine Ready</span>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto space-y-48 text-left px-4">
        <section className="glass-panel p-2 rounded-[5rem] overflow-hidden shadow-2xl border-white/20">
          <ScriptEditor onShotsGenerated={setShots} />
        </section>
        <AnimatePresence>
          {shots.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-64">
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
        {view === "landing" && <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 1.2}}><LandingView /></motion.div>}
        {view === "pricing" && <motion.div key="pricing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{duration: 1}}><PricingView /></motion.div>}
        {view === "studio" && <motion.div key="studio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 1}}><StudioView /></motion.div>}
      </AnimatePresence>
      <footer className="py-40 px-8 md:px-24 flex flex-col md:flex-row items-center justify-between gap-24 border-t border-white/10 bg-black z-50 relative text-left">
        <div className="flex items-center gap-10 group cursor-pointer">
          <img src="/logo.png" className="h-20 w-20 md:h-32 md:w-32 object-contain filter brightness-110 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]" />
          <div className="flex flex-col">
            <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white italic leading-none">AlphaScreen PRO</span>
            <span className="text-sm font-bold text-white/30 uppercase tracking-[0.5em] mt-4">The Autonomous Studio v1.0</span>
          </div>
        </div>
        <p className="text-sm md:text-lg font-bold text-white/10 uppercase tracking-[0.6em]">© 2026 AlphaScreen. Disrupting Cinema.</p>
      </footer>
    </main>
  );
}
