"use client";

import { useState } from "react";
import { Users, Plus, UserCircle, ShieldCheck, Zap, Mic2 } from "lucide-react";
import { CharacterProfile } from "@/lib/types";

export default function ActorStudio() {
  const [actors, setActors] = useState<CharacterProfile[]>([
    {
      id: "1",
      name: "Commander Jax",
      role: "Lead Protagonist",
      physicalDescription: "Mid-40s, weathered face, short buzz cut, piercing blue eyes.",
      loraTrigger: "jax_hero_v1",
      voiceId: "ElevenLabs_British_Deep_Hero"
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 border-t border-white/5">
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold uppercase tracking-tighter flex items-center gap-3">
            <Users className="w-6 h-6 text-accent" /> Actor Locker
          </h2>
          <p className="text-white/40 text-xs uppercase tracking-widest font-medium">Digital Cast Management & Face Locking</p>
        </div>
        <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all">
          <Plus className="w-4 h-4" /> Recruit New Actor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actors.map((actor) => (
          <div key={actor.id} className="group bg-card border border-white/5 rounded-sm overflow-hidden hover:border-accent/30 transition-all">
            <div className="aspect-[3/4] bg-white/5 relative flex items-center justify-center overflow-hidden">
               {/* Placeholder for Character Portrait */}
              <UserCircle className="w-20 h-20 text-white/10 group-hover:text-accent/20 transition-colors" />
              
              <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                <div className="bg-accent/10 border border-accent/20 px-2 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-accent" />
                  <span className="text-[8px] font-black uppercase text-accent">Identity Locked</span>
                </div>
                {actor.voiceId && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full flex items-center gap-1">
                    <Mic2 className="w-3 h-3 text-emerald-500" />
                    <span className="text-[8px] font-black uppercase text-emerald-500">Voice Sync On</span>
                  </div>
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-bold text-lg leading-tight">{actor.name}</h3>
                <p className="text-[10px] text-white/40 uppercase font-medium">{actor.role}</p>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-[10px] text-white/50 leading-relaxed line-clamp-2 italic">
                "{actor.physicalDescription}"
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-[8px] text-white/30 uppercase font-black tracking-widest flex items-center gap-1">
                  <Zap className="w-2 h-2 text-accent" /> LoRA: {actor.loraTrigger}
                </span>
                <button className="text-[8px] text-accent uppercase font-black hover:underline">Edit Profile</button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty Slot */}
        <button className="border border-dashed border-white/10 rounded-sm aspect-[3/4] flex flex-col items-center justify-center group hover:border-white/20 transition-all">
          <Plus className="w-8 h-8 text-white/10 group-hover:text-white/30 transition-all mb-2" />
          <span className="text-[10px] text-white/20 uppercase font-black tracking-widest">Add Support Cast</span>
        </button>
      </div>
    </div>
  );
}
