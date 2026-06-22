"use client";

import { Book, Globe, Clock, CloudRain, AlertTriangle } from "lucide-react";

export default function WorldBibleView() {
  // Mock data for the World Bible
  const worldState = {
    timeOfDay: "Night (02:00 AM)",
    weather: "Heavy Rain / Cyberpunk Fog",
    continuityAlerts: [
      "Hero's suit is drenched (Scene 1, Shot 2)",
      "Left headlight of Pursuit Car is broken",
    ],
    characters: [
      { name: "Hero", status: "Wounded (Left Shoulder)", outfit: "Black Tactical Suit (Wet)" },
      { name: "The Ghost", status: "Healthy", outfit: "White Kimono / Cyber-mask" },
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 border-t border-white/5">
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold uppercase tracking-tighter flex items-center gap-3">
            <Book className="w-6 h-6 text-accent" /> Autonomous World Bible
          </h2>
          <p className="text-white/40 text-xs uppercase tracking-widest font-medium">Narrative Continuity & Asset Tracking</p>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-[10px] text-emerald-500 font-black uppercase flex items-center gap-1.5">
             <Globe className="w-3 h-3" /> Live Continuity Sync
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Global Environment */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-6">
          <h3 className="text-xs font-black uppercase text-white/40 tracking-[0.2em] border-b border-white/5 pb-3">Environment</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-white/40 flex items-center gap-2"><Clock className="w-3 h-3" /> Time</span>
              <span className="text-sm font-medium">{worldState.timeOfDay}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-white/40 flex items-center gap-2"><CloudRain className="w-3 h-3" /> Weather</span>
              <span className="text-sm font-medium">{worldState.weather}</span>
            </div>
          </div>
        </div>

        {/* Character Status */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-6">
          <h3 className="text-xs font-black uppercase text-white/40 tracking-[0.2em] border-b border-white/5 pb-3">Character Continuity</h3>
          <div className="space-y-4">
            {worldState.characters.map((char, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{char.name}</span>
                  <span className="text-[8px] bg-accent/10 text-accent px-2 py-0.5 rounded-full font-black uppercase border border-accent/20">Active</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-black/30 p-2 rounded-sm">
                    <p className="text-[8px] uppercase text-white/20 font-black mb-1">Status</p>
                    <p className="text-[10px] text-white/60 truncate">{char.status}</p>
                  </div>
                  <div className="bg-black/30 p-2 rounded-sm">
                    <p className="text-[8px] uppercase text-white/20 font-black mb-1">Outfit</p>
                    <p className="text-[10px] text-white/60 truncate">{char.outfit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continuity Alerts */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-6">
          <h3 className="text-xs font-black uppercase text-white/40 tracking-[0.2em] border-b border-white/5 pb-3">Consistency Alerts</h3>
          <div className="space-y-3">
            {worldState.continuityAlerts.map((alert, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-accent/5 border border-accent/10 rounded-sm">
                <AlertTriangle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <p className="text-[10px] text-white/70 leading-relaxed uppercase font-medium">{alert}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
