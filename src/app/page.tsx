"use client";

import { motion } from "framer-motion";
import { Play, Film, Sparkles, ShieldCheck, Zap, ArrowRight, Menu } from "lucide-react";
import { useState } from "react";
import ScriptEditor from "@/components/ScriptEditor";
import ActorStudio from "@/components/ActorStudio";
import RenderStudio from "@/components/RenderStudio";
import WorldBibleView from "@/components/WorldBibleView";
import DirectorTimeline from "@/components/DirectorTimeline";
import { Shot } from "@/lib/types";

export default function Home() {
  const [appStarted, setAppStarted] = useState(false);
  const [shots, setShots] = useState<Shot[]>([]);

  if (appStarted) {
    return (
      <main className="min-h-screen bg-black text-white selection:bg-accent selection:text-white pb-20">
        <nav className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setAppStarted(false)}>
            <div className="w-8 h-8 bg-accent flex items-center justify-center rounded-sm rotate-12">
              <Film className="w-5 h-5 text-white -rotate-12" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase italic">AlphaScreen</span>
          </div>
          <div className="flex items-center gap-6">
             <button className="text-[10px] font-black uppercase text-white/40 hover:text-white transition-colors">Dashboard</button>
             <button className="text-[10px] font-black uppercase text-white/40 hover:text-white transition-colors">Settings</button>
             <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10" />
          </div>
        </nav>

        <header className="px-8 py-12 max-w-7xl mx-auto space-y-2">
          <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Phase 1: Pre-Production</span>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic">Autonomous <span className="text-accent">Director</span></h1>
          <p className="text-white/40 text-sm max-w-xl font-medium">Orchestrating script, casting, and cinematic rendering for feature-length AI films.</p>
        </header>

        <section id="editor" className="border-t border-white/5 bg-gradient-to-b from-black to-[#050505]">
          <ScriptEditor onShotsGenerated={setShots} />
        </section>

        {shots.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <section id="timeline" className="bg-[#030303] border-t border-white/5">
              <DirectorTimeline shots={shots} />
            </section>
            <section id="render" className="bg-black border-t border-white/5">
              <RenderStudio shots={shots} />
            </section>
            <section id="bible" className="bg-[#050505]">
              <WorldBibleView />
            </section>
          </motion.div>
        )}

        <section id="actors" className="bg-black">
          <ActorStudio />
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-accent overflow-x-hidden">
      {/* Premium Navbar */}
      <nav className="flex items-center justify-between px-12 py-8 absolute top-0 w-full z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-sm rotate-12 shadow-[0_0_20px_#E50914]">
            <Film className="w-6 h-6 text-white -rotate-12" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">AlphaScreen</span>
        </div>
        <div className="hidden md:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
          <a href="#" className="hover:text-white transition-colors">Technology</a>
          <a href="#" className="hover:text-white transition-colors">Showcase</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <button 
            onClick={() => setAppStarted(true)}
            className="bg-white text-black px-6 py-3 rounded-full hover:bg-accent hover:text-white transition-all transform hover:scale-105"
          >
            Launch Studio
          </button>
        </div>
        <Menu className="md:hidden w-6 h-6" />
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">The World's First Autonomous AI Studio</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[calc(-0.05em)] uppercase italic leading-[0.9]">
            Cinema <br />
            <span className="text-accent">Autonomous.</span>
          </h1>
          
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Generate consistent, 2-hour Hollywood-grade feature films from a single script. No millions required.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
            <button 
              onClick={() => setAppStarted(true)}
              className="group bg-accent hover:bg-accent-hover text-white px-10 py-5 rounded-sm font-black uppercase tracking-[0.2em] flex items-center gap-4 transition-all shadow-[0_0_30px_rgba(229,9,20,0.4)] hover:scale-105 active:scale-95"
            >
              Start Your Epic <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/5 border border-white/10 hover:bg-white/10 px-10 py-5 rounded-sm font-black uppercase tracking-[0.2em] flex items-center gap-4 transition-all backdrop-blur-md">
              <Play className="w-5 h-5 fill-current" /> Watch Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-12 py-32 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-6">
          <div className="w-12 h-12 bg-accent/10 border border-accent/20 flex items-center justify-center rounded-sm">
            <Zap className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-2xl font-black uppercase italic tracking-tighter">Hyper-Performance</h3>
          <p className="text-white/30 text-sm leading-relaxed">1,500+ cinematic shots generated in parallel across a serverless GPU cluster.</p>
        </div>
        
        <div className="space-y-6">
          <div className="w-12 h-12 bg-accent/10 border border-accent/20 flex items-center justify-center rounded-sm">
            <ShieldCheck className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-2xl font-black uppercase italic tracking-tighter">Identity Lock</h3>
          <p className="text-white/30 text-sm leading-relaxed">Proprietary FaceID and Vocal DNA locking ensures character consistency for 120 minutes.</p>
        </div>

        <div className="space-y-6">
          <div className="w-12 h-12 bg-accent/10 border border-accent/20 flex items-center justify-center rounded-sm">
            <Sparkles className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-2xl font-black uppercase italic tracking-tighter">4K Master Export</h3>
          <p className="text-white/30 text-sm leading-relaxed">Autonomous Vision QA and upscaling provides ready-to-distribute cinema quality.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-accent" />
          <span className="text-xs font-black uppercase tracking-tighter">AlphaScreen PRO v1.0</span>
        </div>
        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">© 2026 AlphaScreen Studio. All rights reserved.</p>
      </footer>
    </main>
  );
}
