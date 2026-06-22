"use client";

import { useState } from "react";
import { Loader2, Film, Sparkles } from "lucide-react";
import { Shot } from "@/lib/types";

interface ScriptEditorProps {
  onShotsGenerated: (shots: Shot[]) => void;
}

export default function ScriptEditor({ onShotsGenerated }: ScriptEditorProps) {
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [shots, setShots] = useState<Shot[]>([]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-shots", {
        method: "POST",
        body: JSON.stringify({ script }),
      });
      const data = await res.json();
      setShots(data.shots);
      onShotsGenerated(data.shots);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto px-8 py-12">
      {/* Input Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold uppercase tracking-tighter flex items-center gap-2">
            <Film className="w-5 h-5 text-accent" /> Script Input
          </h2>
          <span className="text-[10px] text-white/30 uppercase font-black tracking-widest">v1.0 Script Engine</span>
        </div>
        
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Paste your movie script here... e.g. 'Interior. A dimly lit laboratory. Dr. Aris stares at a glowing blue vial...'"
          className="w-full h-[500px] bg-card border border-white/10 rounded-sm p-6 text-white/80 focus:outline-none focus:border-accent transition-colors font-mono text-sm leading-relaxed resize-none"
        />
        
        <button
          onClick={handleGenerate}
          disabled={loading || !script}
          className="w-full bg-accent hover:bg-accent-hover disabled:bg-white/5 disabled:text-white/20 py-4 rounded-sm font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Sparkles className="w-5 h-5" /> Generate Cinematic Shots
            </>
          )}
        </button>
      </div>

      {/* Output Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold uppercase tracking-tighter flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" /> Storyboard Output
        </h2>
        
        <div className="h-[500px] overflow-y-auto space-y-4 pr-4 custom-scrollbar">
          {shots.length === 0 && !loading && (
            <div className="h-full flex flex-col items-center justify-center border border-dashed border-white/10 rounded-sm text-white/20">
              <Film className="w-12 h-12 mb-4 opacity-10" />
              <p className="text-sm font-medium">Your shot list will appear here.</p>
            </div>
          )}
          
          {shots.map((shot, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4 hover:border-white/20 transition-all">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-[10px] font-black uppercase text-accent">Shot {shot.shotNumber}</span>
                <span className="text-[10px] text-white/40 uppercase">{shot.cameraAngle}</span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed italic">"{shot.visualDescription}"</p>
              <div className="bg-black/40 p-3 rounded-sm">
                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Technical Prompt</p>
                <p className="text-[10px] font-mono text-white/60 line-clamp-2">{shot.prompt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
