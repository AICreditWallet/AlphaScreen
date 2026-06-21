"use client";

import { useState } from "react";
import { Film, Music, Mic2, Play, ChevronRight, LayoutGrid, List, Clock, Zap, Layers } from "lucide-react";
import { Shot } from "@/lib/types";

interface DirectorTimelineProps {
  shots: Shot[];
}

export default function DirectorTimeline({ shots }: DirectorTimelineProps) {
  const [activeLayer, setActiveLayer] = useState<"visuals" | "audio" | "effects">("visuals");

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 border-t border-white/5 bg-[#030303]">
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold uppercase tracking-tighter flex items-center gap-3">
            <Layers className="w-6 h-6 text-accent" /> Master Assembly Timeline
          </h2>
          <p className="text-white/40 text-xs uppercase tracking-widest font-medium">2-Hour Feature Film Orchestration</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-sm border border-white/10">
          <button 
            onClick={() => setActiveLayer("visuals")}
            className={`px-4 py-2 rounded-sm text-[10px] font-black uppercase transition-all ${activeLayer === "visuals" ? "bg-accent text-white" : "text-white/40 hover:text-white"}`}
          >
            Visuals
          </button>
          <button 
            onClick={() => setActiveLayer("audio")}
            className={`px-4 py-2 rounded-sm text-[10px] font-black uppercase transition-all ${activeLayer === "audio" ? "bg-accent text-white" : "text-white/40 hover:text-white"}`}
          >
            Audio
          </button>
          <button 
            onClick={() => setActiveLayer("effects")}
            className={`px-4 py-2 rounded-sm text-[10px] font-black uppercase transition-all ${activeLayer === "effects" ? "bg-accent text-white" : "text-white/40 hover:text-white"}`}
          >
            SFX / VFX
          </button>
        </div>
      </div>

      {/* The Sequencer */}
      <div className="relative border border-white/10 rounded-sm bg-black overflow-hidden">
        {/* Timeline Header / Rulers */}
        <div className="h-10 border-b border-white/10 flex items-center px-4 bg-white/5">
          <div className="flex items-center gap-8 w-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex flex-col gap-1 w-24">
                <div className="h-2 w-px bg-white/20" />
                <span className="text-[8px] font-mono text-white/30">{i}:00:00</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tracks */}
        <div className="p-4 space-y-4 min-h-[400px]">
          {/* Visual Track */}
          <div className="flex items-start gap-4">
            <div className="w-24 shrink-0 py-2 space-y-1">
              <span className="text-[10px] font-black uppercase text-white/20 flex items-center gap-2"><Film className="w-3 h-3" /> Track A1</span>
              <p className="text-[8px] text-white/40 uppercase font-bold">4K Visuals</p>
            </div>
            <div className="flex-1 flex gap-1 items-center overflow-x-auto custom-scrollbar pb-2">
              {shots.map((shot, idx) => (
                <div 
                  key={idx} 
                  className={`h-16 shrink-0 rounded-sm border flex flex-col justify-end p-2 group cursor-pointer transition-all ${
                    idx === 0 ? "w-48 bg-accent/20 border-accent/40" : "w-32 bg-white/5 border-white/10 hover:border-white/30"
                  }`}
                >
                  <span className="text-[8px] font-black uppercase opacity-40 group-hover:opacity-100 transition-opacity">Shot {shot.shotNumber}</span>
                  <p className="text-[9px] font-bold truncate text-white/60">{shot.cameraAngle}</p>
                </div>
              ))}
              <div className="h-16 w-32 shrink-0 rounded-sm border border-dashed border-white/5 flex items-center justify-center opacity-20">
                <span className="text-[8px] font-black uppercase">Awaiting Script...</span>
              </div>
            </div>
          </div>

          {/* Dialogue Track */}
          <div className="flex items-start gap-4">
            <div className="w-24 shrink-0 py-2 space-y-1">
              <span className="text-[10px] font-black uppercase text-white/20 flex items-center gap-2"><Mic2 className="w-3 h-3" /> Audio A1</span>
              <p className="text-[8px] text-white/40 uppercase font-bold">Dialogue</p>
            </div>
            <div className="flex-1 flex gap-1 items-center overflow-x-auto">
               {shots.map((shot, idx) => (
                <div key={idx} className={`h-10 shrink-0 rounded-sm border flex items-center justify-center ${
                  idx === 0 ? "w-48 bg-emerald-500/10 border-emerald-500/20" : "w-32 bg-white/5 border-white/5"
                }`}>
                  <div className="flex gap-0.5 items-center">
                    {[...Array(6)].map((_, j) => (
                      <div key={j} className={`w-0.5 rounded-full ${idx === 0 ? 'bg-emerald-500' : 'bg-white/10'}`} style={{ height: `${Math.random() * 10 + 5}px` }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Score Track */}
          <div className="flex items-start gap-4">
            <div className="w-24 shrink-0 py-2 space-y-1">
              <span className="text-[10px] font-black uppercase text-white/20 flex items-center gap-2"><Music className="w-3 h-3" /> Music B1</span>
              <p className="text-[8px] text-white/40 uppercase font-bold">Atmosphere</p>
            </div>
            <div className="flex-1 h-12 bg-white/5 border border-white/5 rounded-sm flex items-center px-4 relative overflow-hidden group">
               <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="flex gap-0.5 items-center w-full">
                 {[...Array(120)].map((_, j) => (
                   <div key={j} className="flex-1 h-px bg-white/20" style={{ height: `${Math.random() * 20 + 2}px` }} />
                 ))}
               </div>
               <span className="absolute left-4 text-[8px] font-black uppercase text-white/40 group-hover:text-white transition-colors">Cinematic Orchestral Main Theme - "Genesis"</span>
            </div>
          </div>
        </div>

        {/* Timeline Footer / Stats */}
        <div className="h-12 border-t border-white/10 flex items-center justify-between px-6 bg-white/5">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-white/40" />
              <span className="text-sm font-mono font-bold tracking-tighter">00:04:12:15</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase text-white/30">
              <span className="flex items-center gap-1.5"><Film className="w-3 h-3" /> 24 FPS</span>
              <span className="flex items-center gap-1.5"><Zap className="w-3 h-3" /> 4K Anamorphic</span>
            </div>
          </div>
          <button className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(229,9,20,0.3)]">
            Export Master Print
          </button>
        </div>
      </div>

      {/* Scene Overview Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-sm hover:border-white/30 transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-accent uppercase tracking-widest">Scene 0{i}</span>
              <ChevronRight className="w-3 h-3 text-white/20" />
            </div>
            <h4 className="text-xs font-bold uppercase truncate">The Desert Arrival</h4>
            <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
               <div className={`h-full bg-accent ${i === 1 ? 'w-full' : 'w-0'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
