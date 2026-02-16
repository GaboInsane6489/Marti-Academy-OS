"use client";

import { Trophy, Lock, CheckCircle2 } from "lucide-react";

export default function BadgeCard({ badge }) {
  const { name, description, isEarned, icon_url } = badge;

  return (
    <div
      className={`group relative bg-zinc-900/40 border p-6 rounded-[2.5rem] transition-all duration-500 overflow-hidden ${
        isEarned
          ? "border-blue-500/30 bg-blue-500/5 shadow-lg shadow-blue-500/10"
          : "border-white/5 grayscale"
      }`}
    >
      {/* Background Icon Watermark */}
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
        <Trophy className="h-24 w-24" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div
            className={`h-14 w-14 rounded-2xl flex items-center justify-center border transition-all duration-500 bg-zinc-900 ${
              isEarned
                ? "border-blue-500/50 text-blue-400 rotate-3"
                : "border-white/10 text-zinc-700"
            }`}
          >
            <Trophy className="h-7 w-7" />
          </div>
          {isEarned ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30">
              <CheckCircle2 className="h-3 w-3 text-blue-400" />
              <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">
                Desbloqueado
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Lock className="h-3 w-3 text-zinc-500" />
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                Bloqueado
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2 mt-auto">
          <h3
            className={`text-xl font-serif transition-colors ${isEarned ? "text-white" : "text-zinc-500"}`}
          >
            {name}
          </h3>
          <p className="text-xs text-zinc-500 font-light leading-relaxed">
            {description}
          </p>
        </div>

        {/* Progress Hint (Optional) */}
        {!isEarned && (
          <div className="mt-6 pt-4 border-t border-white/5">
            <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest italic">
              Continúa tu formación para obtener este mérito.
            </p>
          </div>
        )}
      </div>

      {/* Shine Effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 p-8 pointer-events-none" />
    </div>
  );
}
