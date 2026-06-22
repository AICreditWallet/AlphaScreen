"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, Film, Maximize2, Download, Mic2, Volume2, ShieldCheck } from "lucide-react";
import { Shot } from "@/lib/types";

interface RenderStudioProps {
  shots: Shot[];
}

export default function RenderStudio({ shots }: RenderStudioProps) {
  const [renderStatus, setRenderStatus] = useState<Record<string, "idle" | "rendering" | "verifying" | "completed">>(
    {}
  );
  const [audioStatus, setAudioStatus] = useState<Record<string, "idle" | "generating" | "ready">>(
    {}
  );
  const [qaResults, setQaResults] = useState<Record<string, { status: string; score: number; feedback: string[] }>>({});

  const triggerRender = (shotId: string) => {
    setRenderStatus((prev) => ({ ...prev, [shotId]: "rendering" }));
    
    // Step 1: Visual Rendering
    setTimeout(() => {
      setRenderStatus((prev) => ({ ...prev, [shotId]: "verifying" }));
      
      // Step 2: Autonomous Vision QA
      setTimeout(() => {
        setRenderStatus((prev) => ({ ...prev, [shotId]: "completed" }));
        setQaResults((prev) => ({
          ...prev,
          [shotId]: {
            status: "PASS",
            score: 98,
            feedback: ["Visual consistency locked", "Lighting matches World Bible", "Anamorphic focus correct"]
          }
        }));
      }, 2000);
    }, 4000);
  };

  const triggerAudio = (shotId: string) => {
    setAudioStatus((prev) => ({ ...prev, [shotId]: "generating" }));
    setTimeout(() => {
      setAudioStatus((prev) => ({ ...prev, [shotId]: "ready" }));
    }, 2000);
  };

  if (shots.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 border-t border-white/5">
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold uppercase tracking-tighter flex items-center gap-3">
            <Film className="w-6 h-6 text-accent" /> Production Floor
          </h2>
          <p className="text-white/40 text-xs uppercase tracking-widest font-medium">Visual Rendering & Performance Sync</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-black bg-white/10 flex items-center justify-center text-[8px] font-bold">
                A{i}
              </div>
            ))}
          </div>
          <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Cast Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {shots.map((shot) => (
          <div key={shot.id} className="group bg-card border border-white/5 rounded-sm overflow-hidden flex flex-col transition-all hover:border-white/10">
            {/* Video Viewport */}
            <div className="aspect-video bg-black relative flex items-center justify-center overflow-hidden">
              {renderStatus[shot.id] === "completed" || renderStatus[shot.id] === "verifying" ? (
                <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105" 
                     style={{ backgroundImage: `url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop')` }} />
              ) : (
                <div className="text-center space-y-3 opacity-20">
                  <Film className="w-12 h-12 mx-auto" />
                </div>
              )}

              {/* Identity & Status Badges */}
              <div className="absolute top-4 left-4 z-40 flex flex-col gap-2">
                <span className="bg-black/80 backdrop-blur-md px-2 py-1 rounded-sm text-[10px] font-black border border-white/10 uppercase italic">
                  Shot {shot.shotNumber}
                </span>
                
                {qaResults[shot.id] && (
                  <div className="group/qa relative">
                    <span className={`px-2 py-1 rounded-sm text-[8px] font-black border uppercase flex items-center gap-1 backdrop-blur-md ${
                      qaResults[shot.id].status === "PASS" ? "bg-emerald-500/20 border-emerald-500/20 text-emerald-500" : "bg-accent/20 border-accent/20 text-accent"
                    }`}>
                      <ShieldCheck className="w-3 h-3" /> QA {qaResults[shot.id].status}
                    </span>
                    {/* QA Hover Details */}
                    <div className="absolute top-full left-0 mt-2 w-48 bg-black/90 border border-white/10 p-3 rounded-sm opacity-0 group-hover/qa:opacity-100 transition-opacity pointer-events-none z-50">
                       <p className="text-[8px] font-black text-white/40 uppercase mb-2 tracking-widest">Vision QA Report</p>
                       <div className="space-y-1.5">
                         {qaResults[shot.id].feedback.map((f, i) => (
                           <p key={i} className="text-[9px] text-white/70 leading-tight flex items-start gap-1.5">
                             <div className="w-1 h-1 rounded-full bg-accent mt-1 shrink-0" /> {f}
                           </p>
                         ))}
                       </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Rendering/Verifying Overlays */}
              {renderStatus[shot.id] === "rendering" && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="w-10 h-10 text-accent animate-spin" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent animate-pulse">Rendering 4K Cinema...</p>
                </div>
              )}

              {renderStatus[shot.id] === "verifying" && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-30 flex flex-col items-center justify-center space-y-4">
                  <ShieldCheck className="w-10 h-10 text-emerald-500 animate-pulse" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Autonomous Vision QA...</p>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            </div>

            {/* Dialogue & Performance Controls */}
            <div className="p-8 flex-1 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold uppercase tracking-tight">{shot.cameraAngle}</h3>
                  <div className="flex items-center gap-3">
                    {renderStatus[shot.id] !== "completed" ? (
                      <button 
                        onClick={() => triggerRender(shot.id)}
                        disabled={renderStatus[shot.id] === "rendering" || renderStatus[shot.id] === "verifying"}
                        className="bg-accent hover:bg-accent-hover px-6 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all"
                      >
                        {renderStatus[shot.id] === "rendering" ? "Processing..." : renderStatus[shot.id] === "verifying" ? "Verifying..." : "Render Video"}
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-sm transition-all">
                          <Download className="w-4 h-4 text-white/40" />
                        </button>
                        <span className="text-[10px] font-black uppercase text-emerald-500">Production Ready</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dialogue Box */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-sm relative group">
                  <div className="absolute -top-3 left-4 bg-black px-2 flex items-center gap-1.5">
                    <Mic2 className="w-3 h-3 text-accent" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/60">Dialogue / Performance</span>
                  </div>
                  <textarea 
                    className="bg-transparent w-full text-sm text-white/80 italic leading-relaxed focus:outline-none resize-none h-16"
                    placeholder="Enter character dialogue for lip-sync..."
                    defaultValue={shot.dialogue?.text || "The world is changing, and we are the spark."}
                  />
                  <div className="flex items-center justify-between mt-4">
                     <div className="flex items-center gap-2">
                        <span className="text-[8px] text-white/30 font-bold uppercase">Actor: Commander Jax</span>
                     </div>
                     <button 
                      onClick={() => triggerAudio(shot.id)}
                      disabled={audioStatus[shot.id] === "generating"}
                      className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                        audioStatus[shot.id] === "ready" ? "text-emerald-500" : "text-accent hover:underline"
                      }`}
                     >
                       {audioStatus[shot.id] === "generating" ? (
                         <Loader2 className="w-3 h-3 animate-spin" />
                       ) : audioStatus[shot.id] === "ready" ? (
                         <><Volume2 className="w-3 h-3" /> Voice Generated</>
                       ) : (
                         "Generate Voice & Sync"
                       )}
                     </button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-6">
                  <div className="space-y-1">
                    <p className="text-[8px] text-white/20 uppercase font-black">Lighting Mode</p>
                    <p className="text-[10px] text-white/60 font-medium">{shot.lighting}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] text-white/20 uppercase font-black">Motion Intensity</p>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={`w-3 h-1 rounded-full ${i <= 3 ? 'bg-accent' : 'bg-white/10'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <button className="bg-white/5 hover:bg-white/10 p-3 rounded-sm text-white/40 transition-all">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
