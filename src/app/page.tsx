"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Film, Sparkles, ShieldCheck, Zap, 
  ArrowRight, CreditCard, ChevronRight, X, 
  LayoutDashboard, History, UserCircle, Mail, Loader2
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
        className="relative z-10 text-center space-y-8 px-6 max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-3 h-3 text-accent" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">The Hollywood Disruptor</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase italic leading-[1] text-gradient">
          Hollywood <br />
          <span className="text-accent italic">Autonomous.</span>
        </h1>
        
        <p className="text-white/40 text-lg md:text-xl max-w-xl mx-auto font-medium">
          Generate consistent, 2-hour Hollywood-grade feature films from a single script. No millions required.
        </p>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 rounded-sm border-emerald-500/20 bg-emerald-500/5 text-center space-y-2"
          >
            <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="text-xl font-bold uppercase italic">Application Received</h3>
            <p className="text-white/40 text-sm">We will contact you for your first production briefing.</p>
          </motion.div>
        ) : (
          <form id="hero-apply" onSubmit={(e) => handleJoinWaitlist(e)} className="relative max-w-md mx-auto w-full group scroll-mt-40">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email"
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-accent transition-all"
                />
              </div>
              <button 
                disabled={loading}
                className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(229,9,20,0.3)] disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Apply Now"}
              </button>
            </div>
            <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mt-4">Limited Production Slots Available for 2026</p>
          </form>
        )}
        
        <div className="pt-20">
          <button 
            onClick={() => {
              const el = document.getElementById('vision-video');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-white hover:text-accent text-xs font-black uppercase tracking-[0.4em] flex items-center gap-3 mx-auto transition-all bg-white/5 px-8 py-4 rounded-full border border-white/10 hover:border-accent/50 hover:bg-accent/5"
          >
            Watch the Vision <ArrowRight className="w-4 h-4 rotate-90" />
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
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <button 
              onClick={() => setShowVision(false)}
              className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-10 h-10" />
            </button>
            <div className="max-w-4xl w-full space-y-12 overflow-y-auto max-h-[80vh] no-scrollbar pr-4">
              <div className="space-y-4 text-center">
                <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px]">The Disruptor Vision</span>
                <h2 className="text-5xl font-black uppercase italic tracking-tighter">The Death of the Blockbuster Budget</h2>
              </div>
              
              <div className="grid gap-12">
                 <div className="space-y-4">
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">Scene 01: The Old Guard</p>
                    <p className="text-2xl font-medium text-white/80 leading-relaxed italic">A dark, dusty traditional soundstage. Expensive camera rigs sitting idle. The silence of an industry that cost $200 million to enter.</p>
                 </div>
                 <div className="space-y-4">
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">Scene 02: The Spark</p>
                    <p className="text-2xl font-medium text-white/80 leading-relaxed italic">A single laptop screen glows. A prompt is typed. The code morphs into a high-fidelity 4K shot. One script. Zero crews.</p>
                 </div>
                 <div className="space-y-4">
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">Scene 03: The Result</p>
                    <p className="text-2xl font-medium text-white/80 leading-relaxed italic">A diverse creator hits "MASTER EXPORT." 2 hours of cinematic brilliance. Disrupting cinema for everyone.</p>
                 </div>
              </div>
              <div className="pt-12 text-center">
                 <button 
                  onClick={() => setShowVision(false)}
                  className="bg-accent text-white px-10 py-4 rounded-sm font-black uppercase tracking-widest hover:scale-105 transition-all"
                 >
                   Join the Waitlist
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Disruptor Vision Section */}
      <section id="vision-video" className="relative z-10 w-full max-w-6xl mx-auto px-6 py-40">
        <div 
          onClick={() => setShowVision(true)}
          className="glass-card aspect-video rounded-sm overflow-hidden relative group cursor-pointer border-white/20 hover:border-accent/50 transition-all active:scale-[0.98]"
        >
          <div className="absolute inset-0 bg-[url('https://sc02.alicdn.com/kf/A1a9265e4945f4ec899b32044a8b33441D.png')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center shadow-[0_0_50px_#E50914] group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 fill-current ml-1 text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-black uppercase italic tracking-tighter">The Death of the Blockbuster Budget</h3>
              <p className="text-white/40 text-sm uppercase font-black tracking-[0.2em]">Full Cinematic Reveal</p>
            </div>
          </div>
        </div>
      </section>
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
          className="glass-card p-10 rounded-sm space-y-8 flex flex-col justify-between border-white/5"
        >
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">Professional Tier</span>
            <h3 className="text-3xl font-black uppercase italic tracking-tighter">Short Epic</h3>
            <p className="text-white/40 text-sm leading-relaxed font-medium">For independent pilots and premium proof-of-concepts. 30 minutes of high-fidelity cinematic video.</p>
            <div className="space-y-3 pt-4">
              {["400+ 4K Cinematic Shots", "Elite Identity Locking", "Dedicated Render Worker", "Dolby Digital Atmos Sync"].map(f => (
                <div key={f} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tight text-white/60">
                  <ChevronRight className="w-3 h-3 text-accent" /> {f}
                </div>
              ))}
            </div>
          </div>
          <div className="pt-8 border-t border-white/5">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-black text-gradient">$2,599</span>
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">/ Production</span>
            </div>
            <button 
              onClick={() => {
                setProjectType("short");
                const el = document.getElementById('hero-apply');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full glass-card hover:bg-white hover:text-black py-4 rounded-sm font-black uppercase tracking-widest transition-all"
            >
              Apply for Production
            </button>
          </div>
        </motion.div>

        {/* Feature Film */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="glass-card p-10 rounded-sm border-accent/40 bg-accent/[0.03] space-y-8 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-accent text-white px-6 py-1 text-[8px] font-black uppercase tracking-widest -rotate-45 translate-x-6 translate-y-4 shadow-[0_0_20px_#E50914]">World First</div>
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">Feature Tier</span>
            <h3 className="text-3xl font-black uppercase italic tracking-tighter">The Masterpiece</h3>
            <p className="text-white/40 text-sm leading-relaxed font-medium">Full 120-minute theatrical feature production. Autonomous editing, and global distribution-ready 4K/8K export.</p>
            <div className="space-y-3 pt-4">
              {["1,500+ Cinema-Grade Shots", "Full Narrative Continuity Bible", "Priority Multi-GPU Rendering", "Theatrical Mastering & Export"].map(f => (
                <div key={f} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tight text-white/60">
                  <ChevronRight className="w-3 h-3 text-accent" /> {f}
                </div>
              ))}
            </div>
          </div>
          <div className="pt-8 border-t border-white/5">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-gradient">$8,999</span>
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">/ Production</span>
            </div>
            <button 
              onClick={() => {
                setProjectType("full");
                const el = document.getElementById('hero-apply');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-accent text-white py-4 rounded-sm font-black uppercase tracking-widest hover:bg-accent-hover transition-all shadow-[0_0_30px_rgba(229,9,20,0.3)]"
            >
              Apply for Full Production
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
