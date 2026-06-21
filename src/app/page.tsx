"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Plus, Film, Users, Zap, Search } from "lucide-react";
import ScriptEditor from "@/components/ScriptEditor";
import ActorStudio from "@/components/ActorStudio";
import RenderStudio from "@/components/RenderStudio";
import WorldBibleView from "@/components/WorldBibleView";
import DirectorTimeline from "@/components/DirectorTimeline";
import { Shot } from "@/lib/types";

export default function Home() {
  const [shots, setShots] = useState<Shot[]>([]);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-accent selection:text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent flex items-center justify-center rounded-sm rotate-12">
            <Film className="w-5 h-5 text-white -rotate-12" />
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase italic">AlphaScreen</span>
        </div>
        
        <div className="flex items-center gap-6 text-sm font-medium text-white/60">
          <a href="#" className="hover:text-white transition-colors">Projects</a>
          <a href="#" className="hover:text-white transition-colors">Actors</a>
          <a href="#" className="hover:text-white transition-colors">World Bible</a>
          <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all flex items-center gap-2">
            <Search className="w-4 h-4" /> Search
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[60vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale cinema-mask" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center space-y-6"
        >
          <h1 className="text-7xl font-black tracking-tighter uppercase italic">
            Director's <span className="text-accent">Desk</span>
          </h1>
          <p className="text-white/50 text-xl max-w-xl mx-auto font-medium leading-relaxed">
            Generate feature-length films with consistent characters and cinematic quality.
          </p>
          
          <div className="flex items-center justify-center gap-4 pt-4">
            <button className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(229,9,20,0.4)]">
              <Plus className="w-5 h-5" /> Start New Production
            </button>
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-sm font-bold uppercase tracking-widest flex items-center gap-3 transition-all backdrop-blur-sm">
              <Play className="w-5 h-5" /> Quick Demo
            </button>
          </div>
        </motion.div>
      </header>

      {/* Script Editor Section */}
      <section id="editor" className="border-t border-white/5 bg-gradient-to-b from-black to-[#0a0a0a]">
        <ScriptEditor onShotsGenerated={setShots} />
      </section>

      {/* Production Floor Section (Only shown when shots exist) */}
      {shots.length > 0 && (
        <>
          <section id="timeline" className="bg-[#030303] border-t border-white/5">
            <DirectorTimeline shots={shots} />
          </section>

          <section id="render" className="bg-black border-t border-white/5">
            <RenderStudio shots={shots} />
          </section>
          
          <section id="bible" className="bg-[#050505]">
            <WorldBibleView />
          </section>
        </>
      )}

      {/* Actor Studio Section */}
      <section id="actors" className="bg-black">
        <ActorStudio />
      </section>

      {/* Active Projects Grid */}
      <section className="max-w-7xl mx-auto px-8 py-16 border-t border-white/5">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-bold uppercase tracking-tighter flex items-center gap-3">
            <Film className="w-6 h-6 text-accent" /> Active Productions
          </h2>
          <div className="h-px flex-1 mx-8 bg-white/10" />
          <span className="text-white/40 text-sm uppercase font-medium">Recent Activity</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group relative aspect-video bg-card border border-white/5 rounded-sm overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <div className="absolute bottom-6 left-6 z-20 space-y-1">
                <span className="text-[10px] font-black uppercase text-accent tracking-[0.2em]">In Production</span>
                <h3 className="text-lg font-bold uppercase tracking-tight">Project Genesis-0{i}</h3>
                <div className="flex items-center gap-4 text-xs text-white/40 pt-2">
                  <span className="flex items-center gap-1.5"><Users className="w-3 h-3" /> 4 Actors</span>
                  <span className="flex items-center gap-1.5"><Zap className="w-3 h-3" /> 128 Shots</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-30">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black transform scale-0 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
